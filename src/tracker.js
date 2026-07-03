import {
  video, tickTextThrottle, updateTrackingChip, updateFpsChip,
  updateBanner, updateCounter, updateTier, updateStats, onBang, setStatus
} from './ui.js';
import { drawOverlay, spawnShockwave } from './overlay.js';
import { estimatePose } from './geometry.js';
import { updateDetection, decayDetection, getDetectionSnapshot } from './headbang.js';
import { setGaugeTarget } from './gauge.js';
import { RingBuffer } from './utils.js';

// ── Tracking loop variables ────────────────────────────────────────────────
export const trackingVars = {
  mediaStream: null,
  animationFrameId: null,
  lastVideoTime: -1,
  desiredInferenceIntervalMs: 33,
  worker: null
};

// ── Central tracking state ─────────────────────────────────────────────────
export const state = {
  modelsReady: false,
  sessionStartTime: null,
  cachedFaceResult: null,
  lastInferenceTimestamp: -Infinity,
  currentResultSeq: 0,
  lastRenderedResultSeq: 0,
  fpsHistory: new RingBuffer(128),
  faceFailureCount: 0,
  faceDisabled: false,
  faceDisabledAt: null,
  lastInferenceErrorLogTime: -Infinity
};

const MODEL_FAILURE_THRESHOLD = 5;
const MODEL_AUTO_RETRY_MS = 30000;

// ── FPS counter ────────────────────────────────────────────────────────────
export function getCurrentFps() {
  const h = state.fpsHistory;
  if (h.length < 2) return 0;
  const elapsed = h.last() - h.first();
  if (elapsed <= 0) return 0;
  return ((h.length - 1) * 1000) / elapsed;
}

function recordInferenceTick(now) {
  state.fpsHistory.push(now);
  while (state.fpsHistory.length > 0 && now - state.fpsHistory.first() > 1500) {
    state.fpsHistory.shift();
  }
}

// ── Face model failure handling ────────────────────────────────────────────
function handleInferenceError(message) {
  const now = performance.now();
  if (now - state.lastInferenceErrorLogTime >= 5000) {
    console.error(`Face inference error: ${message}`);
    state.lastInferenceErrorLogTime = now;
  }
  state.faceFailureCount++;
  if (state.faceFailureCount >= MODEL_FAILURE_THRESHOLD && !state.faceDisabled) {
    state.faceDisabled = true;
    state.faceDisabledAt = now;
    state.faceFailureCount = 0;
    trackingVars.worker?.postMessage({ type: 'disableModel' });
    setStatus('The face model hit repeated errors — retrying automatically in 30 s.', 'warn');
  }
}

setInterval(() => {
  if (state.faceDisabled && state.faceDisabledAt != null &&
      performance.now() - state.faceDisabledAt >= MODEL_AUTO_RETRY_MS) {
    state.faceDisabled = false;
    state.faceDisabledAt = null;
    trackingVars.worker?.postMessage({ type: 'enableModel' });
    setStatus('Face model re-enabled.', 'ok');
  }
}, 2000);

// ── Core frame processing ──────────────────────────────────────────────────
// Runs every rAF tick with the latest cached result; isNewResult gates
// detection updates to inference rate.
export function processFrame(result, now, isNewResult) {
  tickTextThrottle(now);
  const landmarks = result?.faceLandmarks?.[0];
  const pose = landmarks ? estimatePose(result) : null;
  updateTrackingChip(Boolean(pose));

  let snapshot;
  if (isNewResult) {
    snapshot = pose ? updateDetection(pose, now) : decayDetection(now);
    if (snapshot.bangEvents > 0) {
      onBang(snapshot);
      spawnShockwave();
    }
  } else {
    snapshot = getDetectionSnapshot();
  }

  drawOverlay(pose ? landmarks : null, snapshot, now);
  setGaugeTarget(snapshot.score, snapshot.tier, snapshot.danger);
  updateBanner(snapshot);
  updateCounter(snapshot.count);
  updateTier(snapshot.tier, snapshot.danger);
  updateStats(snapshot, state.sessionStartTime, now);
  updateFpsChip(getCurrentFps());
}

// ── Task result cache reset ────────────────────────────────────────────────
export function resetCachedTaskResults() {
  state.cachedFaceResult = null;
  state.currentResultSeq = 0;
  state.lastRenderedResultSeq = 0;
  trackingVars.worker?.postMessage({ type: 'reset' });
}

// ── Worker initialisation ──────────────────────────────────────────────────
export function initInferenceWorker({ onReady, onError }) {
  // Tear down any previous worker so a retry starts from a clean slate.
  if (trackingVars.worker) {
    trackingVars.worker.terminate();
    trackingVars.worker = null;
  }
  state.modelsReady = false;
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
      handleInferenceError(msg.message);
    } else if (msg.type === 'result') {
      state.cachedFaceResult = msg.face;
      state.currentResultSeq++;
      recordInferenceTick(msg.timestamp);
    }
  };

  worker.onerror = (e) => {
    onError(e.message || 'Worker error');
  };

  worker.postMessage({ type: 'init' });
}

// ── Per-frame bitmap capture and dispatch ──────────────────────────────────
function sendFrameToWorker(timestamp) {
  createImageBitmap(video).then(bitmap => {
    trackingVars.worker.postMessage({ type: 'frame', bitmap, timestamp }, [bitmap]);
  }).catch(err => {
    console.error(`Bitmap capture error: ${err?.message || String(err)}`);
  });
}

// ── Tracking loop ──────────────────────────────────────────────────────────
export function runTrackingLoop(timestamp) {
  if (!trackingVars.mediaStream) return;

  trackingVars.animationFrameId = requestAnimationFrame(runTrackingLoop);

  if (video.readyState < 2) return;

  const isNewResult = state.currentResultSeq !== state.lastRenderedResultSeq;
  processFrame(state.cachedFaceResult, timestamp, isNewResult);
  if (isNewResult) state.lastRenderedResultSeq = state.currentResultSeq;

  if (timestamp - state.lastInferenceTimestamp < trackingVars.desiredInferenceIntervalMs) return;
  const currentVideoTime = video.currentTime;
  if (currentVideoTime === trackingVars.lastVideoTime) return;
  state.lastInferenceTimestamp = timestamp;
  trackingVars.lastVideoTime = currentVideoTime;
  sendFrameToWorker(timestamp);
}

export function stopFrameScheduling() {
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
