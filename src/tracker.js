import { HISTORY_WINDOW_MS } from './constants.js';
import {
  video, fpsValue, currentActionEl, elapsedTimeValue,
  talkingStateValue, yawningStateValue, trackingState, trackingHint,
  eyeMetricEls, addLog, setStatus, updateMiniMetric, updateAttentionUI,
  updateTrackingState, updatePoseUI, updateEyesUI, updateBasicExpressionsUI,
  tickTextThrottle, updateQualityUI,
  showModelDisabledUI, hideModelDisabledUI
} from './ui.js';
import { updateQuality, getQuality, isQualityLow, resetQuality } from './quality.js';
import { updateVideoDrawRect, clearHeadView, resetSmoothedHeadCrop, drawHeadView } from './overlay.js';
import { calculateGeometry, updateDistanceUI, updateGeometryUI, distanceRef } from './geometry.js';
import { getBlendshapeMap, deriveExpressions, deriveBasicExpressions, resetExpressionState } from './expressions.js';
import { estimateAttention } from './attention.js';
import { estimatePose, updateMotionState, updateBlinkCount, updateTalkingYawning, finalizeBout, pruneHistory } from './motion.js';
import { updateAvatar3D } from './avatar.js';
import { formatDurationMs, RingBuffer } from './utils.js';
import { recordFrame } from './recorder.js';

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
  history: new RingBuffer(512),
  leftYawMotion: 0,
  rightYawMotion: 0,
  isMoving: false,
  boutStartTime: null,
  boutDurationsMs: new RingBuffer(500),
  boutAxisMotion: { yaw: 0, pitch: 0, roll: 0 },
  boutRollNet: 0,
  boutPeakSpeed: 0,
  currentAction: "Still",
  eventCounts: { nodding: 0, shaking: 0, tiltLeft: 0, tiltRight: 0, headbanging: 0 },
  blinkCount: 0,
  blinkClosed: false,
  sessionStartTime: null,
  fpsHistory: new RingBuffer(128),
  lastRuntimeError: "",
  lastRuntimeErrorTime: -Infinity,
  lastHandLabelTime: -Infinity,
  cachedFaceResult: null,
  cachedHandResult: null,
  cachedPoseResult: null,
  lastInferenceTimestamp: -Infinity,
  loggedFirstFrame: false,
  jawHistory: new RingBuffer(128),
  talkingState: false,
  yawningState: false,
  yawnThresholdStartTime: null,
  modelsReady: false,
  handEnabled: false,
  poseEnabled: false,
  handModelLoaded: false,
  poseModelLoaded: false,
  currentResultSeq: 0,
  lastRenderedResultSeq: 0,
  modelFailureCounts: { face: 0, hand: 0, pose: 0 },
  modelDisabled: { face: false, hand: false, pose: false },
  lastModelErrorLogTime: { face: -Infinity, hand: -Infinity, pose: -Infinity },
  modelDisabledAt: { face: null, hand: null, pose: null }
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

const MODEL_ERROR_LOG_INTERVAL_MS = 5000;
const MODEL_FAILURE_THRESHOLD = 5;
const MODEL_AUTO_RETRY_MS = 30000;

function logModelError(model, message) {
  const now = performance.now();
  if (now - state.lastModelErrorLogTime[model] >= MODEL_ERROR_LOG_INTERVAL_MS) {
    addLog(`Inference error (${model}): ${message}`, 'error');
    state.lastModelErrorLogTime[model] = now;
  }
}

function disableModel(model) {
  state.modelDisabled[model] = true;
  state.modelDisabledAt[model] = performance.now();
  state.modelFailureCounts[model] = 0;
  if (trackingVars.worker) trackingVars.worker.postMessage({ type: 'disableModel', model });
  addLog(`${model} model disabled after repeated inference failures.`, 'error');
  showModelDisabledUI(model);
  // Also reflect in enabled state for hand/pose
  if (model === 'hand') state.handEnabled = false;
  if (model === 'pose') state.poseEnabled = false;
}

export function retryModel(model) {
  state.modelDisabled[model] = false;
  state.modelDisabledAt[model] = null;
  state.modelFailureCounts[model] = 0;
  state.lastModelErrorLogTime[model] = -Infinity;
  if (trackingVars.worker) trackingVars.worker.postMessage({ type: 'enableModel', model });
  addLog(`${model} model re-enabled.`);
  hideModelDisabledUI(model);
}

// Auto-retry any disabled model after MODEL_AUTO_RETRY_MS cooldown.
setInterval(() => {
  const now = performance.now();
  for (const model of ['face', 'hand', 'pose']) {
    if (state.modelDisabled[model] && state.modelDisabledAt[model] != null) {
      if (now - state.modelDisabledAt[model] >= MODEL_AUTO_RETRY_MS) {
        addLog(`Auto-retrying ${model} model after 30s cooldown.`);
        retryModel(model);
      }
    }
  }
}, 2000);

// ── FPS counter ────────────────────────────────────────────────────────────
export function getCurrentFps() {
  const h = state.fpsHistory;
  if (h.length < 2) return 0;
  const elapsed = h.last() - h.first();
  if (elapsed <= 0) return 0;
  return ((h.length - 1) * 1000) / elapsed;
}

export function updateFps(now = performance.now()) {
  state.fpsHistory.push(now);

  while (state.fpsHistory.length > 0 && now - state.fpsHistory.first() > 1500) {
    state.fpsHistory.shift();
  }

  if (state.fpsHistory.length >= 2) {
    const elapsed = state.fpsHistory.last() - state.fpsHistory.first();
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
  const basicExpr = deriveBasicExpressions(blend);
  updateBasicExpressionsUI(basicExpr);
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

  recordFrame(
    now, pose, blend, basicExpr,
    state.prevSpeed, state.currentAction,
    state.blinkClosed, state.talkingState, state.yawningState,
    getQuality().score,
  );
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
const _modelReadyCallbacks = new Map(); // 'hand'|'pose' → { subscribers: [{resolve,reject}] }

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
      const model = msg.model || 'face';
      logModelError(model, msg.message);
      state.modelFailureCounts[model]++;
      if (state.modelFailureCounts[model] >= MODEL_FAILURE_THRESHOLD && !state.modelDisabled[model]) {
        disableModel(model);
      }
    } else if (msg.type === 'result') {
      state.cachedFaceResult = msg.face;
      if (msg.hand !== null && state.handEnabled) state.cachedHandResult = msg.hand;
      if (msg.pose !== null && state.poseEnabled) state.cachedPoseResult = msg.pose;
      state.currentResultSeq++;
      updateFps(msg.timestamp);
    } else if (msg.type === 'modelReady') {
      if (msg.model === 'hand') state.handModelLoaded = true;
      if (msg.model === 'pose') state.poseModelLoaded = true;
      addLog(`${msg.model === 'hand' ? 'Hand' : 'Pose'} model ready.`);
      const entry = _modelReadyCallbacks.get(msg.model);
      if (entry) { entry.subscribers.forEach(s => s.resolve()); _modelReadyCallbacks.delete(msg.model); }
    } else if (msg.type === 'modelError') {
      addLog(`Model load failed (${msg.model}): ${msg.message}`, 'error');
      const entry = _modelReadyCallbacks.get(msg.model);
      if (entry) { entry.subscribers.forEach(s => s.reject(new Error(msg.message))); _modelReadyCallbacks.delete(msg.model); }
    }
  };

  worker.onerror = (e) => {
    onError(e.message || 'Worker error');
  };

  worker.postMessage({ type: 'init' });
}

export function loadHandModel() {
  if (state.handModelLoaded) return Promise.resolve();
  if (_modelReadyCallbacks.has('hand')) {
    return new Promise((resolve, reject) => _modelReadyCallbacks.get('hand').subscribers.push({ resolve, reject }));
  }
  return new Promise((resolve, reject) => {
    _modelReadyCallbacks.set('hand', { subscribers: [{ resolve, reject }] });
    trackingVars.worker.postMessage({ type: 'loadModel', model: 'hand' });
  });
}

export function loadPoseModel() {
  if (state.poseModelLoaded) return Promise.resolve();
  if (_modelReadyCallbacks.has('pose')) {
    return new Promise((resolve, reject) => _modelReadyCallbacks.get('pose').subscribers.push({ resolve, reject }));
  }
  return new Promise((resolve, reject) => {
    _modelReadyCallbacks.set('pose', { subscribers: [{ resolve, reject }] });
    trackingVars.worker.postMessage({ type: 'loadModel', model: 'pose' });
  });
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
