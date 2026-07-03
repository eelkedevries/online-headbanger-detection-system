import {
  video, cameraBtn, setStatus, setCameraButton,
  resetVideoChips, resetBannerState, updateBanner, updateCounter,
  updateTier, updateStats, forceTextUpdate, gaugeCanvas
} from './ui.js';
import { resizeOverlay, clearOverlay } from './overlay.js';
import { initGauge, resizeGauge, renderGauge, setGaugeTarget } from './gauge.js';
import { resetDetection, getDetectionSnapshot } from './headbang.js';
import {
  trackingVars, state,
  initInferenceWorker, resetCachedTaskResults,
  renderLoop, stopFrameScheduling, releaseCameraStream
} from './tracker.js';
import { describeCameraError } from './utils.js';

// ── UI reset to the idle state ─────────────────────────────────────────────
function resetDetectionUI() {
  resetDetection();
  resetBannerState();
  const snapshot = getDetectionSnapshot();
  forceTextUpdate();
  updateBanner(snapshot);
  updateCounter(snapshot.count);
  updateTier(snapshot.tier, snapshot.danger);
  updateStats(snapshot, null, performance.now());
  setGaugeTarget(0, 0, false);
  resetVideoChips();
  clearOverlay();
}

// ── Camera start / stop ────────────────────────────────────────────────────
async function startCamera() {
  if (!state.modelsReady) {
    // If the model failed to load, let a click retry it; otherwise it is still
    // in flight.
    if (workerFailed) {
      bootWorker(1);
    } else {
      setStatus('The detection model is still loading — one moment.', 'warn');
    }
    return;
  }
  if (trackingVars.mediaStream) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    setStatus('This browser does not expose camera access to the page.', 'warn');
    return;
  }
  try {
    setCameraButton(false, true);
    setStatus('Requesting camera access…');
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    trackingVars.desiredInferenceIntervalMs = mobile ? 50 : 33;
    resetDetectionUI();
    trackingVars.mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = trackingVars.mediaStream;
    await video.play();
    resetCachedTaskResults();
    state.fpsHistory.clear();
    state.sessionStartTime = performance.now();
    renderLoop();
    setCameraButton(true, false);
    setStatus('Sensor online. Face the camera and BANG YOUR HEAD.', 'ok');
  } catch (error) {
    releaseCameraStream();
    resetCachedTaskResults();
    resetDetectionUI();
    setCameraButton(false, false);
    setStatus(`Could not start the camera: ${describeCameraError(error)}`, 'warn');
  }
}

function stopCamera() {
  releaseCameraStream();
  resetCachedTaskResults();
  resetDetectionUI();
  state.sessionStartTime = null;
  state.fpsHistory.clear();
  setCameraButton(false, false);
  setStatus('Camera stopped. The counter has been reset — start again to redeem yourself.');
}

function toggleCamera() {
  if (trackingVars.mediaStream) stopCamera();
  else startCamera();
}

// ── Gauge render loop (runs even when the camera is off, for the needle) ───
function gaugeLoop(now) {
  try {
    renderGauge(now);
  } catch (err) {
    console.error(`Gauge render error: ${err?.message || String(err)}`);
  }
  requestAnimationFrame(gaugeLoop);
}

// ── Model worker boot, with retry for transient CDN failures ───────────────
const MAX_WORKER_ATTEMPTS = 4;
let workerFailed = false;

function bootWorker(attempt) {
  workerFailed = false;
  setCameraButton(false, true);
  setStatus(attempt > 1
    ? `Retrying model load (attempt ${attempt}/${MAX_WORKER_ATTEMPTS})…`
    : 'Loading the face-tracking model…');

  initInferenceWorker({
    onReady() {
      workerFailed = false;
      setCameraButton(false, false);
      setStatus('System armed. Press START CAMERA to begin detection.', 'ok');
    },
    onError(message) {
      if (attempt < MAX_WORKER_ATTEMPTS) {
        const backoffMs = 1500 * attempt;
        setStatus(`Model load failed (${message}). Retrying in ${Math.round(backoffMs / 1000)}s…`, 'warn');
        setTimeout(() => bootWorker(attempt + 1), backoffMs);
      } else {
        workerFailed = true;
        // Leave the button enabled so a click can trigger a manual retry.
        setCameraButton(false, false);
        setStatus(`Could not load the detection model: ${message}. Check your connection and press the button to retry.`, 'warn');
      }
    }
  });
}

// ── Initialisation ─────────────────────────────────────────────────────────
function init() {
  // Boot the model first so a rendering hiccup can never block it.
  bootWorker(1);
  try {
    initGauge(gaugeCanvas);
    resizeOverlay();
    resetDetectionUI();
  } catch (err) {
    console.error(`UI init error: ${err?.message || String(err)}`);
  }
  requestAnimationFrame(gaugeLoop);
}

// ── Event listeners ────────────────────────────────────────────────────────
cameraBtn.addEventListener('click', toggleCamera);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopFrameScheduling();
  } else if (trackingVars.mediaStream) {
    renderLoop();
  }
});

window.addEventListener('resize', () => {
  resizeOverlay();
  resizeGauge();
}, { passive: true });

const stageObserver = new ResizeObserver(() => {
  resizeOverlay();
  resizeGauge();
});
stageObserver.observe(video.parentElement);
stageObserver.observe(gaugeCanvas.parentElement);

window.addEventListener('error', (event) => {
  console.error(`Unhandled error: ${event.message}`);
});
window.addEventListener('unhandledrejection', (event) => {
  console.error(`Unhandled rejection: ${event.reason?.message || String(event.reason)}`);
});

init();
