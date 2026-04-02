import { HISTORY_WINDOW_MS } from './constants.js';
import {
  video, fpsValue, currentActionEl, elapsedTimeValue,
  talkingStateValue, yawningStateValue, trackingState, trackingHint,
  eyeMetricEls, addLog, setStatus, updateMiniMetric, updateAttentionUI,
  updateTrackingState, updatePoseUI, updateEyesUI, updateBasicExpressionsUI,
  tickTextThrottle, updateQualityUI
} from './ui.js';
import { updateQuality, getQuality, isQualityLow, resetQuality } from './quality.js';
import { updateVideoDrawRect, clearHeadView, resetSmoothedHeadCrop, drawHeadView } from './overlay.js';
import { calculateGeometry, updateDistanceUI, updateGeometryUI, distanceRef } from './geometry.js';
import { getBlendshapeMap, deriveExpressions, deriveBasicExpressions, resetExpressionState } from './expressions.js';
import { estimateAttention } from './attention.js';
import { estimatePose, updateMotionState, updateBlinkCount, updateTalkingYawning, finalizeBout, pruneHistory } from './motion.js';
import { updateAvatar3D } from './avatar.js';
import { formatDurationMs } from './utils.js';

// ── Tracking loop variables ────────────────────────────────────────────────
export const trackingVars = {
  mediaStream: null,
  animationFrameId: null,
  lastVideoTime: -1,
  desiredInferenceIntervalMs: 66,
  worker: null
};

// ── Central tracking state ─────────────────────────────────────────────────
export const state = {
  videoFrameCallbackId: null,
  prevPose: null,
  prevSpeed: 0,
  prevTime: null,
  totalMovement: 0,
  movingTimeMs: 0,
  stillTimeMs: 0,
  maxHeadSpeed: 0,
  history: [],
  leftYawMotion: 0,
  rightYawMotion: 0,
  isMoving: false,
  boutStartTime: null,
  boutDurationsMs: [],
  boutAxisMotion: { yaw: 0, pitch: 0, roll: 0 },
  boutRollNet: 0,
  boutPeakSpeed: 0,
  currentAction: "Still",
  eventCounts: { nodding: 0, shaking: 0, tiltLeft: 0, tiltRight: 0, headbanging: 0 },
  blinkCount: 0,
  blinkClosed: false,
  sessionStartTime: null,
  fpsHistory: [],
  lastRuntimeError: "",
  lastRuntimeErrorTime: -Infinity,
  lastHandLabelTime: -Infinity,
  cachedFaceResult: null,
  cachedHandResult: null,
  cachedPoseResult: null,
  lastInferenceTimestamp: -Infinity,
  loggedFirstFrame: false,
  jawHistory: [],
  talkingState: false,
  yawningState: false,
  yawnThresholdStartTime: null,
  modelsReady: false,
  currentResultSeq: 0,
  lastRenderedResultSeq: 0
};

// ── Logging ────────────────────────────────────────────────────────────────
export function logRuntimeError(message) {
  const now = performance.now();
  if (message !== state.lastRuntimeError || now - state.lastRuntimeErrorTime > 2000) {
    addLog(message, "error");
    state.lastRuntimeError = message;
    state.lastRuntimeErrorTime = now;
  }
}

// ── FPS counter ────────────────────────────────────────────────────────────
export function updateFps(now = performance.now()) {
  state.fpsHistory.push(now);

  while (state.fpsHistory.length > 0 && now - state.fpsHistory[0] > 1500) {
    state.fpsHistory.shift();
  }

  if (state.fpsHistory.length >= 2) {
    const elapsed = state.fpsHistory[state.fpsHistory.length - 1] - state.fpsHistory[0];
    if (elapsed > 0) {
      const fps = ((state.fpsHistory.length - 1) * 1000) / elapsed;
      fpsValue.textContent = String(Math.round(fps));
      return;
    }
  }

  fpsValue.textContent = "0";
}

// ── Metrics reset when face is lost ───────────────────────────────────────
export function clearMetricsForNoFace() {
  updateTrackingState(false);
  resetSmoothedHeadCrop();
  resetExpressionState();
  currentActionEl.textContent = "Still";
  updateDistanceUI(null);
  updateGeometryUI(null);
  updateAttentionUI(null);
  for (const key of Object.keys(eyeMetricEls)) updateMiniMetric(key, 0);
  updateBasicExpressionsUI(null);
  talkingStateValue.textContent = "–";
  yawningStateValue.textContent = "–";
}

// ── Core frame processing ──────────────────────────────────────────────────
// isNewResult: true when the result objects are fresh from the worker (gate
// motion-state accumulation so it runs at inference rate, not rAF rate).
export function processFrame(result, poseResult, handResult, now, isNewResult = true) {
  tickTextThrottle(now);
  const landmarks = result?.faceLandmarks?.[0];
  const hasFace = Boolean(landmarks);
  updateTrackingState(hasFace);

  if (hasFace) {
    updateQuality(result);
  } else {
    resetQuality();
  }
  updateQualityUI(getQuality(), hasFace);

  if (!hasFace) {
    clearMetricsForNoFace();
    clearHeadView();
    updateAttentionUI(null);
    if (state.sessionStartTime != null) {
      elapsedTimeValue.textContent = formatDurationMs(now - state.sessionStartTime);
    }
    updateAvatar3D(null, poseResult, handResult, null);
    return;
  }

  drawHeadView(landmarks, poseResult);

  const geometry = calculateGeometry(landmarks);
  if (geometry && distanceRef.referenceFaceWidthPx == null) {
    distanceRef.referenceFaceWidthPx = geometry.faceWidth;
  }
  updateDistanceUI(geometry);
  updateGeometryUI(geometry);

  const blend = getBlendshapeMap(result);
  const expressions = deriveExpressions(blend);
  updateEyesUI(expressions);
  updateBasicExpressionsUI(deriveBasicExpressions(blend));
  if (isNewResult) updateTalkingYawning(blend, now);
  updateBlinkCount(expressions);

  const pose = estimatePose(result);
  const attention = estimateAttention(landmarks, pose);
  updateAttentionUI(attention);

  if (!pose) {
    if (state.sessionStartTime != null) {
      elapsedTimeValue.textContent = formatDurationMs(now - state.sessionStartTime);
    }
    updateAvatar3D(null, poseResult, handResult, expressions);
    return;
  }

  updatePoseUI(pose);
  updateAvatar3D(pose, poseResult, handResult, expressions);

  if (state.sessionStartTime != null) {
    elapsedTimeValue.textContent = formatDurationMs(now - state.sessionStartTime);
  }

  if (isNewResult) {
    if (state.prevPose && state.prevTime != null) {
      const dtSec = Math.max((now - state.prevTime) / 1000, 1 / 120);
      const dtMs = now - state.prevTime;
      const deltaYaw = pose.yaw - state.prevPose.yaw;
      const deltaPitch = pose.pitch - state.prevPose.pitch;
      const deltaRoll = pose.roll - state.prevPose.roll;
      const vel = {
        yaw: deltaYaw / dtSec,
        pitch: deltaPitch / dtSec,
        roll: deltaRoll / dtSec
      };
      const speed = Math.hypot(vel.yaw, vel.pitch, vel.roll);
      const accel = Math.abs(speed - state.prevSpeed) / dtSec;

      state.totalMovement += Math.hypot(deltaYaw, deltaPitch, deltaRoll);
      state.history.push({
        t: now,
        pose: { ...pose },
        speed,
        pitchSignal: pose.pitch,
        yawSignal: pose.yaw,
        rollSignal: pose.roll
      });
      pruneHistory(now);
      if (!isQualityLow()) updateMotionState(pose, vel, speed, accel, dtMs, now);
      state.prevSpeed = speed;
    } else {
      state.history.push({
        t: now,
        pose: { ...pose },
        speed: 0,
        pitchSignal: pose.pitch,
        yawSignal: pose.yaw,
        rollSignal: pose.roll
      });
      pruneHistory(now);
    }

    state.prevPose = { ...pose };
    state.prevTime = now;
  }
}

// ── Task result cache reset ────────────────────────────────────────────────
export function resetCachedTaskResults() {
  state.lastHandLabelTime = -Infinity;
  state.cachedFaceResult = null;
  state.cachedHandResult = null;
  state.cachedPoseResult = null;
  state.loggedFirstFrame = false;
  state.currentResultSeq = 0;
  state.lastRenderedResultSeq = 0;
  if (trackingVars.worker) {
    trackingVars.worker.postMessage({ type: 'reset' });
  }
}

// ── Worker initialisation ──────────────────────────────────────────────────
export function initInferenceWorker({ onReady, onError }) {
  const worker = new Worker(new URL('./inference-worker.js', import.meta.url), { type: 'module' });
  trackingVars.worker = worker;

  worker.onmessage = (e) => {
    const msg = e.data;
    if (msg.type === 'ready') {
      state.modelsReady = true;
      onReady();
    } else if (msg.type === 'error') {
      onError(msg.message);
    } else if (msg.type === 'inferenceError') {
      logRuntimeError(`Inference error: ${msg.message}`);
    } else if (msg.type === 'result') {
      state.cachedFaceResult = msg.face;
      if (msg.hand !== null) state.cachedHandResult = msg.hand;
      if (msg.pose !== null) state.cachedPoseResult = msg.pose;
      state.currentResultSeq++;
      updateFps(msg.timestamp);
    }
  };

  worker.onerror = (e) => {
    onError(e.message || 'Worker error');
  };

  worker.postMessage({ type: 'init' });
}

// ── Per-frame bitmap capture and dispatch ──────────────────────────────────
function sendFrameToWorker(timestamp) {
  if (!state.loggedFirstFrame) {
    addLog("Processing live camera frames.");
    state.loggedFirstFrame = true;
  }
  createImageBitmap(video).then(bitmap => {
    trackingVars.worker.postMessage({ type: 'frame', bitmap, timestamp }, [bitmap]);
  }).catch(err => {
    logRuntimeError(`Bitmap capture error: ${err?.message || String(err)}`);
  });
}

// ── Tracking loop ──────────────────────────────────────────────────────────
export function runTrackingLoop(timestamp) {
  if (!trackingVars.mediaStream) return;

  trackingVars.animationFrameId = requestAnimationFrame(runTrackingLoop);

  if (video.readyState < 2) return;

  updateVideoDrawRect();

  // Render every rAF tick using latest available results.
  // isNewResult gates motion-state accumulation to inference rate.
  const isNewResult = state.currentResultSeq !== state.lastRenderedResultSeq;
  processFrame(state.cachedFaceResult, state.cachedPoseResult, state.cachedHandResult, timestamp, isNewResult);
  if (isNewResult) state.lastRenderedResultSeq = state.currentResultSeq;

  // Throttle how often we send frames to the worker
  if (timestamp - state.lastInferenceTimestamp < trackingVars.desiredInferenceIntervalMs) return;
  const currentVideoTime = video.currentTime;
  if (currentVideoTime === trackingVars.lastVideoTime) return;
  state.lastInferenceTimestamp = timestamp;
  trackingVars.lastVideoTime = currentVideoTime;
  sendFrameToWorker(timestamp);
}

export function stopFrameScheduling() {
  if (state.videoFrameCallbackId != null && typeof video.cancelVideoFrameCallback === "function") {
    video.cancelVideoFrameCallback(state.videoFrameCallbackId);
    state.videoFrameCallbackId = null;
  }
  cancelAnimationFrame(trackingVars.animationFrameId);
  trackingVars.animationFrameId = null;
}

export function renderLoop() {
  stopFrameScheduling();
  state.lastInferenceTimestamp = -Infinity;
  trackingVars.animationFrameId = requestAnimationFrame(runTrackingLoop);
}

export function releaseCameraStream() {
  stopFrameScheduling();
  trackingVars.lastVideoTime = -1;
  if (trackingVars.mediaStream) {
    trackingVars.mediaStream.getTracks().forEach(track => track.stop());
    trackingVars.mediaStream = null;
  }
  video.pause();
  video.srcObject = null;
}
