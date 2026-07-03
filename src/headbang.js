import {
  SIGNAL_WINDOW_MS, VELOCITY_DEADBAND, MAX_FRAME_GAP_MS,
  SWING_MIN_DEGREES, BANG_MIN_DEGREES, BANG_MIN_SPEED, BANG_MIN_INTERVAL_MS,
  COMBO_TIMEOUT_MS, RHYTHM_MIN_BEATS, SCORE_SMOOTHING,
  AMP_NORM_DEGREES, SPEED_NORM_DPS, TEMPO_NORM_BPM,
  DETECT_ON_SCORE, DETECT_OFF_SCORE, DETECT_HOLD_MS,
  DANGER_AMPLITUDE_DEG, DANGER_BPM, DANGER_SCORE, TIERS
} from './constants.js';
import { clamp, lerp, RingBuffer } from './utils.js';

// ── Per-axis oscillation tracker ───────────────────────────────────────────
// Watches one Euler angle over time and records direction reversals. A
// "swing" is the angular travel between two consecutive reversals; a full
// nod/shake cycle consists of two swings.
function createAxisTracker() {
  return {
    samples: new RingBuffer(256),    // { t, angle, speed }
    reversals: new RingBuffer(64),   // { t, swing, peakSpeed, direction }
    prevAngle: null,
    prevTime: null,
    direction: 0,
    lastReversalAngle: null,
    swingPeakSpeed: 0
  };
}

function resetAxisMotion(tracker) {
  tracker.prevAngle = null;
  tracker.prevTime = null;
  tracker.direction = 0;
  tracker.lastReversalAngle = null;
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

// Returns a reversal event { swing, peakSpeed, direction } or null.
function updateAxis(tracker, angle, now) {
  if (tracker.prevTime != null && now - tracker.prevTime > MAX_FRAME_GAP_MS) {
    resetAxisMotion(tracker);
  }
  if (tracker.prevAngle == null) {
    tracker.prevAngle = angle;
    tracker.prevTime = now;
    tracker.samples.push({ t: now, angle, speed: 0 });
    pruneAxis(tracker, now);
    return null;
  }

  const dtSec = Math.max((now - tracker.prevTime) / 1000, 1 / 240);
  const velocity = (angle - tracker.prevAngle) / dtSec;
  const speed = Math.abs(velocity);
  tracker.prevAngle = angle;
  tracker.prevTime = now;
  tracker.samples.push({ t: now, angle, speed });
  pruneAxis(tracker, now);

  const direction = velocity > VELOCITY_DEADBAND ? 1
    : velocity < -VELOCITY_DEADBAND ? -1
    : tracker.direction;
  tracker.swingPeakSpeed = Math.max(tracker.swingPeakSpeed, speed);

  let event = null;
  if (tracker.direction === 0 && direction !== 0) {
    tracker.direction = direction;
    tracker.lastReversalAngle = angle;
    tracker.swingPeakSpeed = speed;
  } else if (direction !== 0 && direction !== tracker.direction) {
    const swing = Math.abs(angle - (tracker.lastReversalAngle ?? angle));
    event = { t: now, swing, peakSpeed: tracker.swingPeakSpeed, direction: tracker.direction };
    if (swing >= SWING_MIN_DEGREES) tracker.reversals.push(event);
    tracker.direction = direction;
    tracker.lastReversalAngle = angle;
    tracker.swingPeakSpeed = speed;
  }
  return event;
}

// ── Per-axis window metrics ────────────────────────────────────────────────
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
  if (beats.length >= 2) {
    const intervals = [];
    for (let i = 1; i < beats.length; i++) intervals.push(beats[i].t - beats[i - 1].t);
    intervals.sort((a, b) => a - b);
    const median = intervals[Math.floor(intervals.length / 2)];
    // Two reversals per full head cycle, so the beat period is half a cycle.
    if (median > 0) bpm = 60000 / (2 * median);
  }
  return { amplitude, peakSpeed, bpm, beatCount: beats.length };
}

// ── Detection state ────────────────────────────────────────────────────────
const pitchTracker = createAxisTracker();
const yawTracker = createAxisTracker();
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
  resetAxisMotion(pitchTracker);
  resetAxisMotion(yawTracker);
  pitchTracker.samples.clear();
  pitchTracker.reversals.clear();
  yawTracker.samples.clear();
  yawTracker.reversals.clear();
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

// Called at inference rate with the raw head-pose Euler angles. Returns the
// current detection snapshot; `bangEvents` is the number of new bangs this
// update (0 or 1), for triggering one-shot UI effects.
export function updateDetection(pose, now) {
  const pitchEvent = updateAxis(pitchTracker, pose.pitch, now);
  const yawEvent = updateAxis(yawTracker, pose.yaw, now);

  const pitch = axisMetrics(pitchTracker);
  const yaw = axisMetrics(yawTracker);
  // Slight bias towards pitch: up-down is the canonical headbang axis.
  const pitchDominant = pitch.amplitude * 1.15 >= yaw.amplitude;
  const dominant = pitchDominant ? pitch : yaw;
  const rhythmic = dominant.beatCount >= RHYTHM_MIN_BEATS;

  if (!rhythmic) {
    detection.style = '—';
  } else if (
    Math.min(pitch.amplitude, yaw.amplitude) >= BANG_MIN_DEGREES * 0.8 &&
    Math.min(pitch.amplitude, yaw.amplitude) / Math.max(pitch.amplitude, yaw.amplitude, 1e-6) > 0.55
  ) {
    detection.style = 'WINDMILL';
  } else {
    detection.style = pitchDominant ? 'UP-DOWN' : 'SIDE-TO-SIDE';
  }

  let rawScore;
  if (rhythmic) {
    const ampNorm = clamp(dominant.amplitude / AMP_NORM_DEGREES, 0, 1);
    const speedNorm = clamp(dominant.peakSpeed / SPEED_NORM_DPS, 0, 1);
    const tempoNorm = clamp(dominant.bpm / TEMPO_NORM_BPM, 0, 1);
    rawScore = 100 * (0.45 * ampNorm + 0.35 * speedNorm + 0.20 * tempoNorm);
  } else {
    // Let the needle twitch with any motion so the gauge feels alive.
    rawScore = 12 * clamp(dominant.peakSpeed / SPEED_NORM_DPS, 0, 1);
  }

  // Danger is judged from the physical motion only (amplitude + tempo), never
  // from the score. Feeding the score back into `danger` would self-sustain:
  // danger floors rawScore, which keeps the score high, which keeps danger on
  // forever — even after the head goes still. Amplitude and BPM both fall to
  // zero within one signal window once motion stops, so danger clears cleanly.
  detection.danger = dominant.amplitude >= DANGER_AMPLITUDE_DEG && dominant.bpm >= DANGER_BPM;
  if (detection.danger) rawScore = Math.max(rawScore, DANGER_SCORE + 4);

  applyScore(rawScore, now);

  detection.bpm = rhythmic ? dominant.bpm : 0;
  detection.amplitude = dominant.amplitude;
  detection.peakSpeed = dominant.peakSpeed;
  detection.maxSpeed = Math.max(detection.maxSpeed, dominant.peakSpeed);

  // Count each full cycle once: a cycle contains exactly one negative-
  // direction swing, so only that swing increments the counter. Only the
  // dominant axis counts, and a global refractory interval stops windmill
  // motion from double-counting across axes.
  const dominantEvent = pitchDominant ? pitchEvent : yawEvent;
  let bangEvents = 0;
  if (
    dominantEvent &&
    dominantEvent.direction === -1 &&
    dominantEvent.swing >= BANG_MIN_DEGREES &&
    dominantEvent.peakSpeed >= BANG_MIN_SPEED
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
  resetAxisMotion(pitchTracker);
  resetAxisMotion(yawTracker);
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
