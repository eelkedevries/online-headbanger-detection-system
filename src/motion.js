import {
  MOVING_THRESHOLD, HEADBANG_SPEED_THRESHOLD, HISTORY_WINDOW_MS, MOTION_WINDOW_MS,
  JAW_HISTORY_MS, TALKING_RANGE_THRESHOLD, TALKING_MIN_MEAN,
  YAWN_OPEN_THRESHOLD, YAWN_SUSTAINED_MS
} from './constants.js';
import { mean } from './utils.js';
import {
  neutralState, maxHeadSpeedValue, currentActionEl,
  movingTimeValue, stillTimeValue, movementBoutsValue, avgBoutValue,
  movementLoadValue, yawBalanceValue,
  eventNodCount, eventShakeCount, eventTiltLeftCount, eventTiltRightCount, eventHeadbangCount,
  nodFreqValue, shakeFreqValue, tiltFreqValue, headbangFreqValue,
  blinkCountValue, talkingStateValue, yawningStateValue, isTextUpdateDue
} from './ui.js';
import { matrixToRotation3x3, multiply3, transpose3, rotationToEulerDegrees } from './geometry.js';
import { state } from './tracker.js';

// ── Shared neutral rotation (mutated by main.js via motionConfig) ──────────
export const motionConfig = { neutralRotation: null };

// ── Pose estimation ────────────────────────────────────────────────────────
export function estimatePose(result) {
  const rotation = matrixToRotation3x3(result?.facialTransformationMatrixes?.[0]);
  if (!rotation) return null;
  if (!motionConfig.neutralRotation) {
    motionConfig.neutralRotation = rotation;
    neutralState.textContent = "Auto-set from first tracked frame";
  }
  const relative = multiply3(rotation, transpose3(motionConfig.neutralRotation));
  return rotationToEulerDegrees(relative);
}

// ── History helpers ────────────────────────────────────────────────────────
export function getWindowHistory(ms = HISTORY_WINDOW_MS) {
  const now = performance.now();
  return state.history.filter(item => now - item.t <= ms);
}

export function pruneHistory(now, ms = HISTORY_WINDOW_MS) {
  state.history = state.history.filter(item => now - item.t <= ms);
}

// ── Frequency estimation ───────────────────────────────────────────────────
export function estimateFrequency(samples, property, minProminence, minIntervalMs) {
  if (samples.length < 5) return 0;
  const values = samples.map(s => s[property]);
  const meanVal = mean(values);
  const centered = values.map(v => Math.abs(v - meanVal));
  const peaks = [];
  for (let i = 1; i < centered.length - 1; i += 1) {
    if (centered[i] > minProminence && centered[i] > centered[i - 1] && centered[i] >= centered[i + 1]) {
      const t = samples[i].t;
      if (!peaks.length || t - peaks[peaks.length - 1] >= minIntervalMs) {
        peaks.push(t);
      }
    }
  }
  if (peaks.length < 2) return 0;
  const durationSec = (peaks[peaks.length - 1] - peaks[0]) / 1000;
  return durationSec > 0 ? (peaks.length - 1) / durationSec : 0;
}

// ── Instant action classification ──────────────────────────────────────────
export function classifyInstantAction(pose, vel, speed) {
  const absYaw = Math.abs(vel.yaw);
  const absPitch = Math.abs(vel.pitch);
  const absRoll = Math.abs(vel.roll);
  if (speed < MOVING_THRESHOLD) return "Still";
  if (absPitch >= absYaw && absPitch >= absRoll) {
    if (speed >= HEADBANG_SPEED_THRESHOLD && Math.abs(pose.pitch) > 8) return "Headbanging";
    return "Nodding";
  }
  if (absYaw >= absPitch && absYaw >= absRoll) return "Shaking";
  return "Tilting";
}

// ── Bout finalisation ──────────────────────────────────────────────────────
export function finalizeBout(now) {
  if (!state.isMoving || state.boutStartTime == null) return;
  const duration = now - state.boutStartTime;
  state.boutDurationsMs.push(duration);
  const { yaw, pitch, roll } = state.boutAxisMotion;
  let label;
  if (pitch >= yaw && pitch >= roll) {
    label = state.boutPeakSpeed >= HEADBANG_SPEED_THRESHOLD ? "headbanging" : "nodding";
  } else if (yaw >= pitch && yaw >= roll) {
    label = "shaking";
  } else {
    label = state.boutRollNet >= 0 ? "tiltRight" : "tiltLeft";
  }
  state.eventCounts[label] += 1;
  state.isMoving = false;
  state.boutStartTime = null;
  state.boutAxisMotion = { yaw: 0, pitch: 0, roll: 0 };
  state.boutRollNet = 0;
  state.boutPeakSpeed = 0;
}

// ── Motion state update (includes DOM updates) ─────────────────────────────
export function updateMotionState(pose, vel, speed, accel, dtMs, now) {
  state.maxHeadSpeed = Math.max(state.maxHeadSpeed, speed);
  state.currentAction = classifyInstantAction(pose, vel, speed);

  const isMovingNow = speed >= MOVING_THRESHOLD;
  if (isMovingNow) {
    state.movingTimeMs += dtMs;
    if (!state.isMoving) {
      state.isMoving = true;
      state.boutStartTime = now;
      state.boutAxisMotion = { yaw: 0, pitch: 0, roll: 0 };
      state.boutRollNet = 0;
      state.boutPeakSpeed = speed;
    }
    state.boutAxisMotion.yaw += Math.abs(vel.yaw) * (dtMs / 1000);
    state.boutAxisMotion.pitch += Math.abs(vel.pitch) * (dtMs / 1000);
    state.boutAxisMotion.roll += Math.abs(vel.roll) * (dtMs / 1000);
    state.boutRollNet += vel.roll * (dtMs / 1000);
    state.boutPeakSpeed = Math.max(state.boutPeakSpeed, speed);
  } else {
    state.stillTimeMs += dtMs;
    if (state.isMoving) finalizeBout(now);
  }

  if (vel.yaw >= 0) state.rightYawMotion += vel.yaw * (dtMs / 1000);
  else state.leftYawMotion += Math.abs(vel.yaw) * (dtMs / 1000);

  if (isTextUpdateDue()) {
    maxHeadSpeedValue.textContent = `${state.maxHeadSpeed.toFixed(1)} °/s`;
    currentActionEl.textContent = state.currentAction;
    movingTimeValue.textContent = `${(state.movingTimeMs / 1000).toFixed(1)} s`;
    stillTimeValue.textContent = `${(state.stillTimeMs / 1000).toFixed(1)} s`;
    movementBoutsValue.textContent = `${state.boutDurationsMs.length + (state.isMoving ? 1 : 0)}`;
    avgBoutValue.textContent = `${(mean(state.boutDurationsMs) / 1000 || 0).toFixed(1)} s`;
    movementLoadValue.textContent = `${state.totalMovement.toFixed(1)} °`;
    const maxYawSide = Math.max(state.leftYawMotion, state.rightYawMotion);
    yawBalanceValue.textContent = maxYawSide > 0 ? `${(100 * Math.min(state.leftYawMotion, state.rightYawMotion) / maxYawSide).toFixed(0)}%` : "–";
    eventNodCount.textContent = String(state.eventCounts.nodding);
    eventShakeCount.textContent = String(state.eventCounts.shaking);
    eventTiltLeftCount.textContent = String(state.eventCounts.tiltLeft);
    eventTiltRightCount.textContent = String(state.eventCounts.tiltRight);
    eventHeadbangCount.textContent = String(state.eventCounts.headbanging);
    const motionHistory = getWindowHistory(MOTION_WINDOW_MS);
    nodFreqValue.textContent = `${estimateFrequency(motionHistory, 'pitchSignal', 3.5, 220).toFixed(2)} Hz`;
    shakeFreqValue.textContent = `${estimateFrequency(motionHistory, 'yawSignal', 3.5, 220).toFixed(2)} Hz`;
    tiltFreqValue.textContent = `${estimateFrequency(motionHistory, 'rollSignal', 2.0, 220).toFixed(2)} Hz`;
    headbangFreqValue.textContent = `${estimateFrequency(motionHistory, 'pitchSignal', 7.0, 150).toFixed(2)} Hz`;
  }
}

// ── Blink counting ─────────────────────────────────────────────────────────
export function updateBlinkCount(expr) {
  if (!expr) return;
  if (!state.blinkClosed && expr.blink >= 0.62) {
    state.blinkClosed = true;
    state.blinkCount += 1;
  } else if (state.blinkClosed && expr.blink <= 0.28) {
    state.blinkClosed = false;
  }
  if (isTextUpdateDue()) blinkCountValue.textContent = String(state.blinkCount);
}

// ── Talking / yawning detection ────────────────────────────────────────────
export function updateTalkingYawning(blend, now) {
  const jawOpen = blend.jawOpen ?? 0;

  // Maintain rolling jaw history
  state.jawHistory.push({ t: now, v: jawOpen });
  if (state.jawHistory.length > 1 && state.jawHistory[0].t < now - JAW_HISTORY_MS) {
    state.jawHistory = state.jawHistory.filter(item => now - item.t <= JAW_HISTORY_MS);
  }

  // Yawning: sustained jaw open above threshold
  if (jawOpen >= YAWN_OPEN_THRESHOLD) {
    if (state.yawnThresholdStartTime == null) state.yawnThresholdStartTime = now;
    state.yawningState = (now - state.yawnThresholdStartTime) >= YAWN_SUSTAINED_MS;
  } else {
    state.yawnThresholdStartTime = null;
    state.yawningState = false;
  }

  // Talking: rapid jaw oscillation (range over 1.5 s window exceeds threshold)
  // Suppressed while yawning to avoid false positives as mouth opens/closes.
  if (!state.yawningState) {
    const recent = state.jawHistory.filter(item => now - item.t <= 1500);
    if (recent.length >= 4) {
      const vals = recent.map(item => item.v);
      const range = Math.max(...vals) - Math.min(...vals);
      const meanJaw = vals.reduce((a, b) => a + b, 0) / vals.length;
      state.talkingState = range >= TALKING_RANGE_THRESHOLD && meanJaw > TALKING_MIN_MEAN;
    }
  } else {
    state.talkingState = false;
  }

  if (isTextUpdateDue()) {
    talkingStateValue.textContent = state.talkingState ? "Yes" : "No";
    yawningStateValue.textContent = state.yawningState ? "Yes" : "No";
  }
}
