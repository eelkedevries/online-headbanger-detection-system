import {
  video, startBtn, stopBtn, calibrateBtn, distanceRefBtn,
  handToggle, poseToggle,
  trackingState, trackingHint, fpsValue, elapsedTimeValue, neutralState,
  movingTimeValue, stillTimeValue, movementBoutsValue, avgBoutValue,
  maxHeadSpeedValue, movementLoadValue, yawBalanceValue,
  nodFreqValue, shakeFreqValue, tiltFreqValue, headbangFreqValue,
  eventNodCount, eventShakeCount, eventTiltLeftCount, eventTiltRightCount, eventHeadbangCount,
  blinkCountValue, talkingStateValue, yawningStateValue, currentActionEl,
  addLog, setStatus, resetPoseUI, resolutionValue
} from './ui.js';
import {
  resizeHeadView, clearHeadView,
  resetSmoothedHeadCrop
} from './overlay.js';
import { distanceRef, currentFaceWidthPxFromResult } from './geometry.js';
import { motionConfig, finalizeBout, startCalibrationCollection } from './motion.js';
import { initAvatar3D, resizeAvatar3D, updateAvatar3D } from './avatar.js';
import {
  trackingVars, state,
  logRuntimeError, initInferenceWorker, resetCachedTaskResults,
  renderLoop, stopFrameScheduling, releaseCameraStream, clearMetricsForNoFace,
  loadHandModel, loadPoseModel, getCurrentFps
} from './tracker.js';
import { describeCameraError } from './utils.js';
import { initRecorder } from './recorder.js';

// ── Derived state reset ────────────────────────────────────────────────────
function resetDerivedState() {
  state.prevPose = null;
  state.prevTime = null;
  state.prevSpeed = 0;
  state.totalMovement = 0;
  state.movingTimeMs = 0;
  state.stillTimeMs = 0;
  state.maxHeadSpeed = 0;
  state.history.clear();
  state.leftYawMotion = 0;
  state.rightYawMotion = 0;
  state.isMoving = false;
  state.boutStartTime = null;
  state.boutDurationsMs.clear();
  state.boutAxisMotion = { yaw: 0, pitch: 0, roll: 0 };
  state.boutRollNet = 0;
  state.boutPeakSpeed = 0;
  state.currentAction = "Still";
  state.eventCounts = { nodding: 0, shaking: 0, tiltLeft: 0, tiltRight: 0, headbanging: 0 };
  state.blinkCount = 0;
  state.blinkClosed = false;
  state.sessionStartTime = null;
  state.jawHistory.clear();
  state.talkingState = false;
  state.yawningState = false;
  state.yawnThresholdStartTime = null;
  motionConfig.neutralRotation = null;
  motionConfig.calibrating = false;
  motionConfig.calibBuffer = [];
  motionConfig.calibMode = null;
  motionConfig._calibPrevRot = null;
  distanceRef.referenceFaceWidthPx = null;
  distanceRef.referenceDistanceCm = 50;
  distanceRef.referenceIsDefault = true;
  resetSmoothedHeadCrop();
  currentActionEl.textContent = "Still";
  movingTimeValue.textContent = "0.0 s";
  stillTimeValue.textContent = "0.0 s";
  movementBoutsValue.textContent = "0";
  avgBoutValue.textContent = "0.0 s";
  maxHeadSpeedValue.textContent = "0.0 °/s";
  movementLoadValue.textContent = "0.0 °";
  yawBalanceValue.textContent = "–";
  nodFreqValue.textContent = "0.00 Hz";
  shakeFreqValue.textContent = "0.00 Hz";
  tiltFreqValue.textContent = "0.00 Hz";
  headbangFreqValue.textContent = "0.00 Hz";
  eventNodCount.textContent = "0";
  eventShakeCount.textContent = "0";
  eventTiltLeftCount.textContent = "0";
  eventTiltRightCount.textContent = "0";
  eventHeadbangCount.textContent = "0";
  blinkCountValue.textContent = "0";
  elapsedTimeValue.textContent = "0:00";
  neutralState.textContent = "Not set";
  talkingStateValue.textContent = "–";
  yawningStateValue.textContent = "–";
}

// ── Resolution management ──────────────────────────────────────────────────
const _RES_DESKTOP = [
  { width: 640, height: 480 },
  { width: 1280, height: 720 },
  { width: 1920, height: 1080 },
];
const _RES_MOBILE = [
  { width: 640, height: 480 },
  { width: 960, height: 540 },
];
const _RES_LS_KEY = 'headbanger_resolution_tier';
const _RES_UPGRADE_FRAMES = 60;
const _RES_DROP_FPS = 15;
const _RES_DROP_MS = 3000;

const _res = {
  tiers: _RES_DESKTOP,
  tierIdx: 0,
  mobile: false,
  seqAtStart: 0,
  upgradeChecked: false,
  lowFpsSince: null,
  intervalId: null,
};

function _resUpdateUI() {
  resolutionValue.textContent = `${video.videoWidth || _res.tiers[_res.tierIdx].width}×${video.videoHeight || _res.tiers[_res.tierIdx].height}`;
}

async function _resApplyTier(idx) {
  if (!trackingVars.mediaStream) return;
  const tier = _res.tiers[idx];
  const tracks = trackingVars.mediaStream.getVideoTracks();
  if (!tracks.length) return;
  try {
    await tracks[0].applyConstraints({ width: { ideal: tier.width }, height: { ideal: tier.height } });
    _res.tierIdx = idx;
    localStorage.setItem(_RES_LS_KEY, String(idx));
    _resUpdateUI();
    addLog(`Resolution changed to ${video.videoWidth}×${video.videoHeight} (tier ${idx}).`);
  } catch (err) {
    addLog(`Resolution change failed: ${err?.message || String(err)}`, 'warn');
  }
}

function _resCheck() {
  if (!trackingVars.mediaStream) return;
  const now = performance.now();
  const fps = getCurrentFps();
  const targetFps = _res.mobile ? 20 : 30;
  const framesElapsed = state.currentResultSeq - _res.seqAtStart;

  // One-time upgrade after UPGRADE_FRAMES frames, if FPS is at or above target
  if (!_res.upgradeChecked && framesElapsed >= _RES_UPGRADE_FRAMES) {
    _res.upgradeChecked = true;
    if (fps >= targetFps && _res.tierIdx < _res.tiers.length - 1) {
      _resApplyTier(_res.tierIdx + 1);
      return;
    }
  }

  // Ongoing downgrade if FPS stays below 15 for 3 s
  if (fps > 0 && fps < _RES_DROP_FPS) {
    if (_res.lowFpsSince === null) {
      _res.lowFpsSince = now;
    } else if (now - _res.lowFpsSince >= _RES_DROP_MS) {
      _res.lowFpsSince = null;
      if (_res.tierIdx > 0) {
        _resApplyTier(_res.tierIdx - 1);
      }
    }
  } else {
    _res.lowFpsSince = null;
  }
}

// ── Camera start ───────────────────────────────────────────────────────────
async function startCamera() {
  if (!state.modelsReady) {
    addLog("Camera start requested before the models were ready.", "warn");
    setStatus("The models are still loading. Please wait a moment.", "warn");
    return;
  }
  if (trackingVars.mediaStream) {
    setStatus("Camera is already running.", "ok");
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    addLog("Camera APIs are unavailable in this browser context.", "error");
    setStatus("This browser does not expose camera access to the page.", "warn");
    return;
  }
  try {
    startBtn.disabled = true;
    stopBtn.disabled = true;
    calibrateBtn.disabled = true;
    distanceRefBtn.disabled = true;
    setStatus("Requesting camera access…");
    addLog("Requesting camera access…");
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    _res.mobile = mobile;
    _res.tiers = mobile ? _RES_MOBILE : _RES_DESKTOP;
    const savedIdx = parseInt(localStorage.getItem(_RES_LS_KEY) ?? '0', 10);
    _res.tierIdx = (Number.isFinite(savedIdx) && savedIdx >= 0 && savedIdx < _res.tiers.length) ? savedIdx : 0;
    const startTier = _res.tiers[_res.tierIdx];
    const constraints = {
      audio: false,
      video: {
        facingMode: "user",
        width: { ideal: startTier.width },
        height: { ideal: startTier.height }
      }
    };
    trackingVars.desiredInferenceIntervalMs = mobile ? 50 : 33;
    resetDerivedState();
    trackingVars.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    state.sessionStartTime = performance.now();
    video.srcObject = trackingVars.mediaStream;
    await video.play();
    resetCachedTaskResults();
    _res.seqAtStart = state.currentResultSeq;
    _res.upgradeChecked = false;
    _res.lowFpsSince = null;
    clearInterval(_res.intervalId);
    _res.intervalId = setInterval(_resCheck, 500);
    state.fpsHistory.clear();
    fpsValue.textContent = "0";
    state.lastInferenceTimestamp = -Infinity;
    renderLoop();
    addLog(`Tracking loop started (${mobile ? "mobile" : "desktop"} profile, target ≈ ${Math.round(1000 / trackingVars.desiredInferenceIntervalMs)} face fps; hands/pose throttled).`);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    calibrateBtn.disabled = false;
    distanceRefBtn.disabled = false;
    _resUpdateUI();
    addLog(`Camera stream started (${video.videoWidth || "?"}×${video.videoHeight || "?"}).`);
    setStatus("Camera started. Look straight at the camera and click 'Set neutral pose'. Use 'Set reference distance' if you want an approximate centimetre estimate.", "ok");
  } catch (error) {
    releaseCameraStream();
    clearHeadView();
    updateAvatar3D(null, null, null, null);
    resetPoseUI();
    resetCachedTaskResults();
    resetDerivedState();
    clearMetricsForNoFace();
    trackingState.textContent = "Waiting";
    trackingHint.textContent = "Camera stream is off until access succeeds.";
    fpsValue.textContent = "0";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    calibrateBtn.disabled = true;
    distanceRefBtn.disabled = true;
    addLog(`Camera start failed: ${error?.name || "Error"} — ${describeCameraError(error)}`, "error");
    setStatus(`Could not start the camera: ${describeCameraError(error)}`, "warn");
  }
}

// ── Camera stop ────────────────────────────────────────────────────────────
function stopCamera() {
  clearInterval(_res.intervalId);
  _res.intervalId = null;
  releaseCameraStream();
  if (state.isMoving) finalizeBout(performance.now());
  clearHeadView();
  updateAvatar3D(null, null, null, null);
  resetPoseUI();
  resetCachedTaskResults();
  resetDerivedState();
  clearMetricsForNoFace();
  trackingState.textContent = "Stopped";
  trackingHint.textContent = "Camera stream is off.";
  state.fpsHistory.clear();
  fpsValue.textContent = "0";
  resolutionValue.textContent = "–";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  calibrateBtn.disabled = true;
  distanceRefBtn.disabled = true;
  addLog("Camera stopped.");
  setStatus("Camera stopped.");
}

// ── Calibration ────────────────────────────────────────────────────────────
function calibrateNeutralPose() {
  if (!state.modelsReady || video.readyState < 2 || !state.cachedFaceResult) {
    setStatus("Wait until a live face frame has been processed, then try again.", "warn");
    return;
  }
  startCalibrationCollection('manual');
  addLog("Neutral pose collection started — hold still.");
  setStatus("Hold still. Collecting stable frames for neutral pose…");
}

function setReferenceDistance() {
  if (!state.modelsReady || video.readyState < 2 || !state.cachedFaceResult) {
    setStatus("Wait until a live face frame has been processed, then try again.", "warn");
    return;
  }
  const faceWidth = currentFaceWidthPxFromResult(state.cachedFaceResult);
  if (!faceWidth) {
    setStatus("No face was detected in the latest live frame. Look at the camera and try again.", "warn");
    return;
  }
  const answer = window.prompt("Current face-to-camera distance in cm:", String(distanceRef.referenceDistanceCm));
  if (answer === null) return;
  const value = Number(answer);
  if (!Number.isFinite(value) || value <= 0) {
    setStatus("Please enter a positive distance in centimetres.", "warn");
    return;
  }
  distanceRef.referenceDistanceCm = value;
  distanceRef.referenceFaceWidthPx = faceWidth;
  distanceRef.referenceIsDefault = false;
  addLog(`Reference distance stored from the latest live frame (${value.toFixed(1)} cm).`);
  setStatus("Reference distance stored. The distance readout now uses that calibration.", "ok");
}

// ── Initialisation ─────────────────────────────────────────────────────────
async function init() {
  try {
    addLog("Booting page.");
    initRecorder();
    addLog("Initialising 3D preview…");
    initAvatar3D();
    addLog("3D preview initialised.");

    resizeAvatar3D();
    resetPoseUI();
    resetDerivedState();
    clearMetricsForNoFace();

    addLog("Starting inference worker and loading MediaPipe models…");
    initInferenceWorker({
      onReady() {
        addLog("Face model ready.");
        setStatus("Face model ready. Click 'Start camera'.", "ok");
        startBtn.disabled = false;
        distanceRefBtn.disabled = true;
      },
      onError(message) {
        startBtn.disabled = true;
        stopBtn.disabled = true;
        calibrateBtn.disabled = true;
        distanceRefBtn.disabled = true;
        addLog(`Model load failed: ${message}`, "error");
        setStatus(`Could not load the MediaPipe models: ${message}`, "warn");
      }
    });
  } catch (error) {
    startBtn.disabled = true;
    stopBtn.disabled = true;
    calibrateBtn.disabled = true;
    distanceRefBtn.disabled = true;
    addLog(`Initialisation failed: ${error?.message || String(error)}`, "error");
    setStatus(`Initialisation error: ${error?.message || String(error)}`, "warn");
    console.error(error);
  }
}

// ── Event listeners ────────────────────────────────────────────────────────
video.addEventListener("loadedmetadata", () => {
  addLog(`Video metadata loaded (${video.videoWidth || "?"}×${video.videoHeight || "?"}).`);
});
video.addEventListener("resize", () => {
  addLog(`Video resized (${video.videoWidth || "?"}×${video.videoHeight || "?"}).`);
  if (trackingVars.mediaStream) _resUpdateUI();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    addLog("Page hidden. Pausing tracking loop.");
    stopFrameScheduling();
  } else if (trackingVars.mediaStream) {
    addLog("Page visible again. Resuming tracking loop.");
    renderLoop();
  }
});

startBtn.addEventListener("click", startCamera);
stopBtn.addEventListener("click", stopCamera);
calibrateBtn.addEventListener("click", calibrateNeutralPose);
distanceRefBtn.addEventListener("click", setReferenceDistance);

handToggle.addEventListener('change', async () => {
  if (handToggle.checked) {
    handToggle.disabled = true;
    try {
      await loadHandModel();
      state.handEnabled = true;
      addLog('Hand tracking enabled.');
    } catch (err) {
      handToggle.checked = false;
      addLog(`Could not load hand model: ${err?.message || String(err)}`, 'error');
    } finally {
      handToggle.disabled = false;
    }
  } else {
    state.handEnabled = false;
    state.cachedHandResult = null;
    addLog('Hand tracking disabled.');
  }
});

poseToggle.addEventListener('change', async () => {
  if (poseToggle.checked) {
    poseToggle.disabled = true;
    try {
      await loadPoseModel();
      state.poseEnabled = true;
      addLog('Pose tracking enabled.');
    } catch (err) {
      poseToggle.checked = false;
      addLog(`Could not load pose model: ${err?.message || String(err)}`, 'error');
    } finally {
      poseToggle.disabled = false;
    }
  } else {
    state.poseEnabled = false;
    state.cachedPoseResult = null;
    addLog('Pose tracking disabled.');
  }
});
window.addEventListener("resize", resizeHeadView, { passive: true });
window.addEventListener("resize", resizeAvatar3D, { passive: true });

const stageObserver = new ResizeObserver(() => {
  resizeHeadView();
  resizeAvatar3D();
});
const headStageEl = document.getElementById("headFeedCanvas")?.parentElement;
if (headStageEl) stageObserver.observe(headStageEl);
const avatar3dObsEl = document.getElementById("avatar3d");
if (avatar3dObsEl) stageObserver.observe(avatar3dObsEl);

window.addEventListener("error", (event) => {
  logRuntimeError(`Unhandled error: ${event.message}`);
});
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason?.message || String(event.reason);
  logRuntimeError(`Unhandled rejection: ${reason}`);
});

init();
