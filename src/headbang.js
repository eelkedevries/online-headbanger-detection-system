import {
  SIGNAL_WINDOW_MS, SWING_HYSTERESIS_DEG, MAX_FRAME_GAP_MS,
  SWING_MIN_DEGREES, REVERSAL_REFRACTORY_MS,
  BANG_MIN_DEGREES, BANG_MIN_SPEED, BANG_MIN_INTERVAL_MS,
  COMBO_TIMEOUT_MS, RHYTHM_MIN_BEATS, SCORE_SMOOTHING,
  ONE_EURO_MIN_CUTOFF, ONE_EURO_BETA, ONE_EURO_DCUTOFF, PITCH_DOMINANCE_BIAS,
  AMP_NORM_DEGREES, SPEED_NORM_DPS, TEMPO_NORM_BPM,
  DETECT_ON_SCORE, DETECT_OFF_SCORE, DETECT_HOLD_MS,
  DANGER_AMPLITUDE_DEG, DANGER_BPM, DANGER_SCORE, TIERS
} from './constants.js';
import { clamp, lerp, RingBuffer } from './utils.js';

// ── One-euro low-pass coefficient ──────────────────────────────────────────
function oneEuroAlpha(cutoffHz, dtSec) {
  const tau = 1 / (2 * Math.PI * cutoffHz);
  return 1 / (1 + tau / dtSec);
}

// ── Per-axis oscillation tracker ───────────────────────────────────────────
// Watches one head-pose Euler angle over time. The raw angle is unwrapped
// (to survive ±180° matrix wrap) and one-euro filtered (to reject tracker
// jitter without lagging real bangs). Reversals are found by peak detection:
// a turning point is confirmed once the angle retreats SWING_HYSTERESIS_DEG
// from the running extreme, and the "swing" is the true peak-to-peak travel
// between successive turning points. A full nod/shake cycle is two swings.
function createAxisTracker() {
  return {
    samples: new RingBuffer(256),    // { t, angle, speed }
    reversals: new RingBuffer(64),   // { t, swing, peakSpeed, direction }
    // one-euro / unwrap state
    unwrapOffset: 0,                 // accumulated ±360 unwrap correction
    lastRawInput: null,              // previous raw (wrapped) input, for unwrap
    rawPrev: null,                   // previous unwrapped raw angle
    xHat: null,                      // filtered angle
    dxHat: 0,                        // filtered derivative
    tPrev: null,
    // reversal state (peak detection)
    direction: 0,                    // current travel direction (+1/-1/0)
    anchor: null,                    // start angle before direction is known
    curExtreme: null,                // most extreme angle reached in this direction
    lastExtreme: null,               // extreme at the previous turning point
    lastReversalTime: -Infinity,
    swingPeakSpeed: 0                // max speed since the last turning point
  };
}

function resetAxisMotion(tracker) {
  tracker.unwrapOffset = 0;
  tracker.lastRawInput = null;
  tracker.rawPrev = null;
  tracker.xHat = null;
  tracker.dxHat = 0;
  tracker.tPrev = null;
  tracker.direction = 0;
  tracker.anchor = null;
  tracker.curExtreme = null;
  tracker.lastExtreme = null;
  tracker.lastReversalTime = -Infinity;
  tracker.swingPeakSpeed = 0;
}

function pruneAxis(tracker, now) {
  while (tracker.samples.length > 0 && now - tracker.samples.first().t > SIGNAL_WINDOW_MS) {
    tracker.samples.shift();
  }
  while (tracker.reversals.length > 0 && now - tracker.reversals.first().t > SIGNAL_WINDOW_MS) {
    tracker.reversals.shift();
  }
}

// Filter one raw angle: unwrap then one-euro. Returns { angle, velocity }.
function filterAxis(tracker, rawAngle, now) {
  // Unwrap against the previous raw input so a ±360/±180 jump near a matrix
  // singularity does not read as an enormous instantaneous velocity.
  if (tracker.lastRawInput != null) {
    let d = rawAngle - tracker.lastRawInput;
    while (d > 180) { tracker.unwrapOffset -= 360; d -= 360; }
    while (d < -180) { tracker.unwrapOffset += 360; d += 360; }
  }
  tracker.lastRawInput = rawAngle;
  const x = rawAngle + tracker.unwrapOffset;

  if (tracker.xHat == null) {
    tracker.xHat = x;
    tracker.rawPrev = x;
    tracker.dxHat = 0;
    tracker.tPrev = now;
    return { angle: x, velocity: 0 };
  }

  const dtSec = clamp((now - tracker.tPrev) / 1000, 1 / 240, MAX_FRAME_GAP_MS / 1000);
  const dxRaw = (x - tracker.rawPrev) / dtSec;
  const edx = tracker.dxHat + oneEuroAlpha(ONE_EURO_DCUTOFF, dtSec) * (dxRaw - tracker.dxHat);
  const cutoff = ONE_EURO_MIN_CUTOFF + ONE_EURO_BETA * Math.abs(edx);
  const prevXHat = tracker.xHat;
  const newXHat = prevXHat + oneEuroAlpha(cutoff, dtSec) * (x - prevXHat);
  const velocity = (newXHat - prevXHat) / dtSec;

  tracker.rawPrev = x;
  tracker.dxHat = edx;
  tracker.xHat = newXHat;
  tracker.tPrev = now;
  return { angle: newXHat, velocity };
}

// Records a turning point at `tracker.curExtreme`. Returns the event or null
// (swing too small, or inside the per-axis refractory).
function recordReversal(tracker, newDirection, now, speed) {
  const swing = Math.abs(tracker.curExtreme - (tracker.lastExtreme ?? tracker.curExtreme));
  let event = null;
  if (swing >= SWING_MIN_DEGREES && now - tracker.lastReversalTime >= REVERSAL_REFRACTORY_MS) {
    event = { t: now, swing, peakSpeed: tracker.swingPeakSpeed, direction: tracker.direction };
    tracker.reversals.push(event);
    tracker.lastReversalTime = now;
  }
  tracker.lastExtreme = tracker.curExtreme;
  tracker.direction = newDirection;
  tracker.curExtreme = tracker.xHat;
  tracker.swingPeakSpeed = speed;
  return event;
}

// Advance one axis. Returns a completed-reversal event
// { t, swing, peakSpeed, direction } or null.
function updateAxis(tracker, rawAngle, now) {
  if (tracker.tPrev != null && now - tracker.tPrev > MAX_FRAME_GAP_MS) {
    resetAxisMotion(tracker);
  }
  const { angle, velocity } = filterAxis(tracker, rawAngle, now);
  const speed = Math.abs(velocity);
  tracker.samples.push({ t: now, angle, speed });
  pruneAxis(tracker, now);
  tracker.swingPeakSpeed = Math.max(tracker.swingPeakSpeed, speed);

  // Establish an initial travel direction once the angle has moved clear of
  // its start by the hysteresis band.
  if (tracker.direction === 0) {
    if (tracker.anchor == null) tracker.anchor = angle;
    if (angle - tracker.anchor >= SWING_HYSTERESIS_DEG) {
      tracker.direction = 1;
      tracker.curExtreme = angle;
      tracker.lastExtreme = tracker.anchor;
      tracker.swingPeakSpeed = speed;
    } else if (tracker.anchor - angle >= SWING_HYSTERESIS_DEG) {
      tracker.direction = -1;
      tracker.curExtreme = angle;
      tracker.lastExtreme = tracker.anchor;
      tracker.swingPeakSpeed = speed;
    }
    return null;
  }

  // Extend the current extreme, or confirm a turning point once the angle
  // retreats from that extreme by the hysteresis band.
  if (tracker.direction === 1) {
    if (angle > tracker.curExtreme) tracker.curExtreme = angle;
    else if (tracker.curExtreme - angle >= SWING_HYSTERESIS_DEG) {
      return recordReversal(tracker, -1, now, speed);
    }
  } else {
    if (angle < tracker.curExtreme) tracker.curExtreme = angle;
    else if (angle - tracker.curExtreme >= SWING_HYSTERESIS_DEG) {
      return recordReversal(tracker, 1, now, speed);
    }
  }
  return null;
}

// ── Per-axis window metrics ────────────────────────────────────────────────
function median(sorted) {
  const n = sorted.length;
  if (n === 0) return 0;
  const mid = n >> 1;
  return n % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function axisMetrics(tracker) {
  const samples = tracker.samples.toArray();
  let minAngle = Infinity;
  let maxAngle = -Infinity;
  let peakSpeed = 0;
  for (const s of samples) {
    if (s.angle < minAngle) minAngle = s.angle;
    if (s.angle > maxAngle) maxAngle = s.angle;
    if (s.speed > peakSpeed) peakSpeed = s.speed;
  }
  const amplitude = samples.length >= 2 ? maxAngle - minAngle : 0;

  const beats = tracker.reversals.toArray();
  let bpm = 0;
  if (beats.length >= 3) {
    const intervals = [];
    for (let i = 1; i < beats.length; i++) intervals.push(beats[i].t - beats[i - 1].t);
    intervals.sort((a, b) => a - b);
    // Trim the extremes before the median so one glitchy interval cannot drag
    // the tempo.
    const trimmed = intervals.length >= 5 ? intervals.slice(1, -1) : intervals;
    const med = median(trimmed);
    if (med > 0) bpm = 60000 / (2 * med); // two reversals per head cycle
  }
  return { amplitude, peakSpeed, bpm, beatCount: beats.length };
}

// ── Detection state ────────────────────────────────────────────────────────
const AXES = ['pitch', 'yaw', 'roll'];
const trackers = { pitch: createAxisTracker(), yaw: createAxisTracker(), roll: createAxisTracker() };
const bangTimes = new RingBuffer(512);

const detection = {
  score: 0,
  tier: 0,
  detected: false,
  danger: false,
  count: 0,
  combo: 0,
  bestCombo: 0,
  bpm: 0,
  amplitude: 0,
  peakSpeed: 0,
  maxSpeed: 0,
  bangsPerMinute: 0,
  style: '—',
  lastBangTime: -Infinity,
  lastAboveOnScore: -Infinity
};

export function resetDetection() {
  for (const axis of AXES) {
    resetAxisMotion(trackers[axis]);
    trackers[axis].samples.clear();
    trackers[axis].reversals.clear();
  }
  bangTimes.clear();
  detection.score = 0;
  detection.tier = 0;
  detection.detected = false;
  detection.danger = false;
  detection.count = 0;
  detection.combo = 0;
  detection.bestCombo = 0;
  detection.bpm = 0;
  detection.amplitude = 0;
  detection.peakSpeed = 0;
  detection.maxSpeed = 0;
  detection.bangsPerMinute = 0;
  detection.style = '—';
  detection.lastBangTime = -Infinity;
  detection.lastAboveOnScore = -Infinity;
}

function tierForScore(score) {
  let tier = 0;
  for (let i = 0; i < TIERS.length; i++) {
    if (score >= TIERS[i].min) tier = i;
  }
  return tier;
}

function pruneBangTimes(now) {
  while (bangTimes.length > 0 && now - bangTimes.first() > 60000) {
    bangTimes.shift();
  }
}

function registerBang(now) {
  if (now - detection.lastBangTime < BANG_MIN_INTERVAL_MS) return 0;
  detection.combo = now - detection.lastBangTime <= COMBO_TIMEOUT_MS ? detection.combo + 1 : 1;
  detection.bestCombo = Math.max(detection.bestCombo, detection.combo);
  detection.lastBangTime = now;
  detection.count += 1;
  bangTimes.push(now);
  return 1;
}

function applyScore(rawScore, now) {
  detection.score = clamp(lerp(detection.score, rawScore, SCORE_SMOOTHING), 0, 100);
  if (detection.score >= DETECT_ON_SCORE) {
    detection.detected = true;
    detection.lastAboveOnScore = now;
  } else if (
    detection.detected &&
    detection.score < DETECT_OFF_SCORE &&
    now - detection.lastAboveOnScore > DETECT_HOLD_MS
  ) {
    detection.detected = false;
  }
  detection.tier = tierForScore(detection.score);
}

function classifyStyle(m, dominantAxis, rhythmic) {
  if (!rhythmic) return '—';
  const amps = [m.pitch.amplitude, m.yaw.amplitude, m.roll.amplitude];
  const maxAmp = Math.max(...amps);
  if (maxAmp <= 0) return '—';
  const significant = amps.filter(a => a / maxAmp > 0.55).length;
  if (significant >= 2) return 'WINDMILL';
  if (dominantAxis === 'pitch') return 'UP-DOWN';
  if (dominantAxis === 'yaw') return 'SIDE-TO-SIDE';
  return 'TILT';
}

// Called at inference rate with the raw head-pose Euler angles {pitch,yaw,roll}
// in degrees. Returns the detection snapshot; `bangEvents` is the number of new
// bangs this update (0 or 1) for one-shot UI effects.
export function updateDetection(pose, now) {
  const events = {
    pitch: updateAxis(trackers.pitch, pose.pitch, now),
    yaw: updateAxis(trackers.yaw, pose.yaw, now),
    roll: updateAxis(trackers.roll, pose.roll, now)
  };
  const m = {
    pitch: axisMetrics(trackers.pitch),
    yaw: axisMetrics(trackers.yaw),
    roll: axisMetrics(trackers.roll)
  };

  // Dominant axis by weighted amplitude (pitch biased as the canonical axis).
  const weight = { pitch: PITCH_DOMINANCE_BIAS, yaw: 1, roll: 1 };
  let dominantAxis = 'pitch';
  let bestEnergy = -Infinity;
  for (const axis of AXES) {
    const energy = m[axis].amplitude * weight[axis];
    if (energy > bestEnergy) { bestEnergy = energy; dominantAxis = axis; }
  }
  const dom = m[dominantAxis];
  const rhythmic = dom.beatCount >= RHYTHM_MIN_BEATS;

  detection.style = classifyStyle(m, dominantAxis, rhythmic);

  let rawScore;
  if (rhythmic) {
    const ampNorm = clamp(dom.amplitude / AMP_NORM_DEGREES, 0, 1);
    const speedNorm = clamp(dom.peakSpeed / SPEED_NORM_DPS, 0, 1);
    const tempoNorm = clamp(dom.bpm / TEMPO_NORM_BPM, 0, 1);
    rawScore = 100 * (0.45 * ampNorm + 0.35 * speedNorm + 0.20 * tempoNorm);
  } else {
    // Let the needle twitch with any motion so the gauge feels alive.
    rawScore = 12 * clamp(dom.peakSpeed / SPEED_NORM_DPS, 0, 1);
  }

  // Danger is judged from physical motion only (never from the score), so it
  // clears once the head goes still — feeding score back would self-sustain.
  detection.danger = dom.amplitude >= DANGER_AMPLITUDE_DEG && dom.bpm >= DANGER_BPM;
  if (detection.danger) rawScore = Math.max(rawScore, DANGER_SCORE + 4);

  applyScore(rawScore, now);

  detection.bpm = rhythmic ? dom.bpm : 0;
  detection.amplitude = dom.amplitude;
  detection.peakSpeed = dom.peakSpeed;
  detection.maxSpeed = Math.max(detection.maxSpeed, dom.peakSpeed);

  // Count each full cycle once on the dominant axis: a cycle contains exactly
  // one negative-direction reversal. The global refractory stops windmill
  // motion from double-counting when the dominant axis flips between frames.
  const domEvent = events[dominantAxis];
  let bangEvents = 0;
  if (
    domEvent &&
    domEvent.direction === -1 &&
    domEvent.swing >= BANG_MIN_DEGREES &&
    domEvent.peakSpeed >= BANG_MIN_SPEED
  ) {
    bangEvents = registerBang(now);
  }
  if (detection.combo > 0 && now - detection.lastBangTime > COMBO_TIMEOUT_MS) {
    detection.combo = 0;
  }

  pruneBangTimes(now);
  detection.bangsPerMinute = bangTimes.length;

  return { ...detection, bangEvents };
}

// Called at inference rate while no face is visible: bleed the score off and
// forget stale motion so velocities do not spike on reacquisition.
export function decayDetection(now) {
  for (const axis of AXES) resetAxisMotion(trackers[axis]);
  applyScore(0, now);
  detection.danger = false;
  detection.bpm = 0;
  detection.amplitude = 0;
  detection.peakSpeed = 0;
  detection.style = '—';
  if (detection.combo > 0 && now - detection.lastBangTime > COMBO_TIMEOUT_MS) {
    detection.combo = 0;
  }
  pruneBangTimes(now);
  detection.bangsPerMinute = bangTimes.length;
  return { ...detection, bangEvents: 0 };
}

export function getDetectionSnapshot() {
  return { ...detection, bangEvents: 0 };
}
