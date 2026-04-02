import { MAX_BAR_ANGLE, MAX_DISTANCE_DELTA_CM, LOW_QUALITY_THRESHOLD } from './constants.js';
import { clamp, formatAngle, formatPct01, formatSignedCm } from './utils.js';
import { getAdaptiveNeutralThreshold } from './expressions.js';

// ── Canvas / video elements ────────────────────────────────────────────────
export const video = document.getElementById("video");
export const headFeedCanvas = document.getElementById("headFeedCanvas");
export const headOverlay = document.getElementById("headOverlay");
export const avatar3dEl = document.getElementById("avatar3d");

// ── Buttons / status ───────────────────────────────────────────────────────
export const startBtn = document.getElementById("startBtn");
export const stopBtn = document.getElementById("stopBtn");
export const calibrateBtn = document.getElementById("calibrateBtn");
export const distanceRefBtn = document.getElementById("distanceRefBtn");

// ── Feature toggles ────────────────────────────────────────────────────────
export const handToggle = document.getElementById("handToggle");
export const poseToggle = document.getElementById("poseToggle");
export const statusEl = document.getElementById("status");
export const startupLogEl = document.getElementById("startupLog");

// ── Model failure notices ──────────────────────────────────────────────────
export const faceRetryBtn = document.getElementById("faceRetryBtn");
const _modelNoticeEls = {
  face: document.getElementById("faceModelNotice"),
  hand: document.getElementById("handModelNotice"),
  pose: document.getElementById("poseModelNotice"),
};
const _modelToggleLabels = {
  hand: handToggle?.closest('label'),
  pose: poseToggle?.closest('label'),
};

// ── Head pose ──────────────────────────────────────────────────────────────
export const yawValue = document.getElementById("yawValue");
export const pitchValue = document.getElementById("pitchValue");
export const rollValue = document.getElementById("rollValue");
export const headDistanceValue = document.getElementById("headDistanceValue");
export const yawBar = document.getElementById("yawBar");
export const pitchBar = document.getElementById("pitchBar");
export const rollBar = document.getElementById("rollBar");
export const headDistanceBar = document.getElementById("headDistanceBar");

// ── Tracking / action / fps ────────────────────────────────────────────────
export const trackingState = document.getElementById("trackingState");
export const trackingHint = document.getElementById("trackingHint");
export const currentActionEl = document.getElementById("currentAction");
export const fpsValue = document.getElementById("fpsValue");

// ── Attention ──────────────────────────────────────────────────────────────
export const lookingAtCameraValue = document.getElementById("lookingAtCameraValue");
export const lookingAwayValue = document.getElementById("lookingAwayValue");
export const gazeHorizontalValue = document.getElementById("gazeHorizontalValue");
export const gazeVerticalValue = document.getElementById("gazeVerticalValue");
export const attentionHint = document.getElementById("attentionHint");

// ── Frequency ──────────────────────────────────────────────────────────────
export const nodFreqValue = document.getElementById("nodFreqValue");
export const shakeFreqValue = document.getElementById("shakeFreqValue");
export const tiltFreqValue = document.getElementById("tiltFreqValue");
export const headbangFreqValue = document.getElementById("headbangFreqValue");

// ── Distance ───────────────────────────────────────────────────────────────
export const distanceValue = document.getElementById("distanceValue");
export const distanceHint = document.getElementById("distanceHint");
export const distanceMode = document.getElementById("distanceMode");
export const faceWidthPx = document.getElementById("faceWidthPx");
export const faceHeightPx = document.getElementById("faceHeightPx");
export const interEyePxValue = document.getElementById("interEyePxValue");
export const irisDiameterPxValue = document.getElementById("irisDiameterPxValue");

// ── Geometry ───────────────────────────────────────────────────────────────
export const mouthWidthValue = document.getElementById("mouthWidthValue");
export const mouthHeightValue = document.getElementById("mouthHeightValue");
export const mouthAspectValue = document.getElementById("mouthAspectValue");
export const geomFaceWidthEstimate = document.getElementById("geomFaceWidthEstimate");
export const geomFaceHeightEstimate = document.getElementById("geomFaceHeightEstimate");
export const geomInterEyeEstimate = document.getElementById("geomInterEyeEstimate");
export const geomIrisEstimate = document.getElementById("geomIrisEstimate");
export const earLeftValue = document.getElementById("earLeftValue");
export const earRightValue = document.getElementById("earRightValue");
export const browLeftValue = document.getElementById("browLeftValue");
export const browRightValue = document.getElementById("browRightValue");
export const faceRatioValue = document.getElementById("faceRatioValue");
export const faceX = document.getElementById("faceX");
export const faceY = document.getElementById("faceY");

// ── Behaviour summary ──────────────────────────────────────────────────────
export const movingTimeValue = document.getElementById("movingTimeValue");
export const stillTimeValue = document.getElementById("stillTimeValue");
export const movementBoutsValue = document.getElementById("movementBoutsValue");
export const avgBoutValue = document.getElementById("avgBoutValue");
export const maxHeadSpeedValue = document.getElementById("maxHeadSpeedValue");
export const movementLoadValue = document.getElementById("movementLoadValue");
export const yawBalanceValue = document.getElementById("yawBalanceValue");

// ── Event counts ───────────────────────────────────────────────────────────
export const eventNodCount = document.getElementById("eventNodCount");
export const eventShakeCount = document.getElementById("eventShakeCount");
export const eventTiltLeftCount = document.getElementById("eventTiltLeftCount");
export const eventTiltRightCount = document.getElementById("eventTiltRightCount");
export const eventHeadbangCount = document.getElementById("eventHeadbangCount");
export const blinkCountValue = document.getElementById("blinkCountValue");
export const elapsedTimeValue = document.getElementById("elapsedTimeValue");
export const neutralState = document.getElementById("neutralState");

// ── Eye / brow metrics ─────────────────────────────────────────────────────
export const eyeMetricEls = {
  blink:      { value: document.getElementById("exprBlinkValue"),      bar: document.getElementById("exprBlinkBar")      },
  eyeOpen:    { value: document.getElementById("exprOpenValue"),       bar: document.getElementById("exprOpenBar")       },
  browRaise:  { value: document.getElementById("exprBrowRaiseValue"),  bar: document.getElementById("exprBrowRaiseBar")  },
  browFurrow: { value: document.getElementById("exprBrowFurrowValue"), bar: document.getElementById("exprBrowFurrowBar") },
  squint:     { value: document.getElementById("exprSquintValue"),     bar: document.getElementById("exprSquintBar")     }
};

// ── Basic expressions ──────────────────────────────────────────────────────
export const basicExprEls = {
  happiness: { value: document.getElementById("basicHappinessValue"), bar: document.getElementById("basicHappinessBar") },
  sadness:   { value: document.getElementById("basicSadnessValue"),   bar: document.getElementById("basicSadnessBar")   },
  fear:      { value: document.getElementById("basicFearValue"),      bar: document.getElementById("basicFearBar")      },
  disgust:   { value: document.getElementById("basicDisgustValue"),   bar: document.getElementById("basicDisgustBar")   },
  anger:     { value: document.getElementById("basicAngerValue"),     bar: document.getElementById("basicAngerBar")     },
  surprise:  { value: document.getElementById("basicSurpriseValue"),  bar: document.getElementById("basicSurpriseBar")  },
  contempt:  { value: document.getElementById("basicContemptValue"),  bar: document.getElementById("basicContemptBar")  }
};
export const dominantExprValue = document.getElementById("dominantExprValue");

// ── Talking / yawning ──────────────────────────────────────────────────────
export const talkingStateValue = document.getElementById("talkingStateValue");
export const yawningStateValue = document.getElementById("yawningStateValue");

// ── Resolution display ─────────────────────────────────────────────────────
export const resolutionValue = document.getElementById("resolutionValue");

// ── Quality indicator ──────────────────────────────────────────────────────
export const qualityBarFill = document.getElementById("qualityBarFill");
export const qualityBarTrack = document.getElementById("qualityBarTrack");
export const qualityScore = document.getElementById("qualityScore");
export const qualityLabel = document.getElementById("qualityLabel");
export const qualityHint = document.getElementById("qualityHint");

// ── Panels that dim on low quality ────────────────────────────────────────
const _dimPanels = [
  document.getElementById("panelEyes"),
  document.getElementById("panelExpressions"),
  document.getElementById("panelAttention"),
  document.getElementById("panelGeometry")
];

// ═══════════════════════════════════════════════════════════════════════════
// Text-update throttle
// Tier 1 (every rAF): canvas overlays + pose/expression bars
// Tier 2 (~200 ms):   all text readouts
// ═══════════════════════════════════════════════════════════════════════════

const TEXT_UPDATE_INTERVAL_MS = 200;
let _textUpdateDue = false;
let _lastTextUpdate = -Infinity;

// Call once per processFrame tick. Sets the gate for all text writes that frame.
export function tickTextThrottle(now) {
  _textUpdateDue = now - _lastTextUpdate >= TEXT_UPDATE_INTERVAL_MS;
  if (_textUpdateDue) _lastTextUpdate = now;
}

// Used by geometry.js and motion.js to check the gate without calling tick.
export function isTextUpdateDue() {
  return _textUpdateDue;
}

// ═══════════════════════════════════════════════════════════════════════════
// UI update functions (no external state dependencies)
// ═══════════════════════════════════════════════════════════════════════════

export function addLog(message, level = "info") {
  if (!startupLogEl) return;
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const line = document.createElement("span");
  line.className = `log-line ${level}`.trim();
  line.textContent = `[${time}] ${message}`;
  startupLogEl.appendChild(line);
  startupLogEl.scrollTop = startupLogEl.scrollHeight;
}

export function setStatus(message, kind = "") {
  statusEl.textContent = message;
  statusEl.className = `status ${kind}`.trim();
}

export function setBar(barEl, value, maxAbsValue = MAX_BAR_ANGLE) {
  const limited = clamp(value, -maxAbsValue, maxAbsValue);
  const percent = Math.abs(limited) / maxAbsValue * 50;
  barEl.style.left = limited >= 0 ? "50%" : `${50 - percent}%`;
  barEl.style.width = `${percent}%`;
  barEl.parentElement.setAttribute('aria-valuenow', Math.round(limited));
}

// Bar always updates; text only when due.
export function updateMiniMetric(name, value01) {
  const v = clamp(value01, 0, 1);
  const pct = Math.round(v * 100);
  eyeMetricEls[name].bar.style.width = `${pct}%`;
  eyeMetricEls[name].bar.parentElement.setAttribute('aria-valuenow', pct);
  if (_textUpdateDue) eyeMetricEls[name].value.textContent = formatPct01(v);
}

// Bar always updates; text only when due. NaN path is immediate (state reset).
export function updateHeadDistanceDelta(deltaCm) {
  if (!Number.isFinite(deltaCm)) {
    headDistanceValue.textContent = "–";
    setBar(headDistanceBar, 0, MAX_DISTANCE_DELTA_CM);
    return;
  }
  setBar(headDistanceBar, deltaCm, MAX_DISTANCE_DELTA_CM);
  if (_textUpdateDue) headDistanceValue.textContent = formatSignedCm(deltaCm);
}

export function resetPoseUI() {
  yawValue.textContent = "0.0°";
  pitchValue.textContent = "0.0°";
  rollValue.textContent = "0.0°";
  headDistanceValue.textContent = "–";
  setBar(yawBar, 0);
  setBar(pitchBar, 0);
  setBar(rollBar, 0);
  setBar(headDistanceBar, 0, MAX_DISTANCE_DELTA_CM);
  headDistanceBar.parentElement.setAttribute('aria-valuenow', 0);
}

// Bars always update; text only when due.
export function updatePoseUI(pose) {
  setBar(yawBar, pose.yaw);
  setBar(pitchBar, pose.pitch);
  setBar(rollBar, pose.roll);
  if (_textUpdateDue) {
    yawValue.textContent = formatAngle(pose.yaw);
    pitchValue.textContent = formatAngle(pose.pitch);
    rollValue.textContent = formatAngle(pose.roll);
  }
}

// Bars always update; text only when due.
export function updateEyesUI(expr) {
  updateMiniMetric("blink", expr.blink);
  updateMiniMetric("eyeOpen", expr.eyeOpen);
  updateMiniMetric("squint", expr.squint);
  updateMiniMetric("browRaise", expr.browRaise);
  updateMiniMetric("browFurrow", expr.browFurrow);
}

// Null path is immediate. Has-data: bars always, text only when due.
export function updateBasicExpressionsUI(basicExpr) {
  if (!basicExpr) {
    for (const els of Object.values(basicExprEls)) {
      els.bar.style.width = "0%";
      els.bar.parentElement.setAttribute('aria-valuenow', 0);
      els.value.textContent = "0%";
    }
    dominantExprValue.textContent = "–";
    return;
  }

  const dominantThreshold = getAdaptiveNeutralThreshold();
  let dominantKey = null;
  let dominantScore = dominantThreshold;

  for (const [key, els] of Object.entries(basicExprEls)) {
    const score = basicExpr[key];
    const pct = Math.round(score * 100);
    els.bar.style.width = `${pct}%`;
    els.bar.parentElement.setAttribute('aria-valuenow', pct);
    if (_textUpdateDue) {
      els.value.textContent = `${pct}%`;
      if (score > dominantScore) { dominantScore = score; dominantKey = key; }
    }
  }

  if (_textUpdateDue) {
    dominantExprValue.textContent = dominantKey
      ? dominantKey.charAt(0).toUpperCase() + dominantKey.slice(1)
      : "Neutral";
  }
}

// Null path is immediate. Has-data: all text, only when due.
export function updateAttentionUI(attention) {
  if (!attention) {
    lookingAtCameraValue.textContent = "–";
    lookingAwayValue.textContent = "–";
    gazeHorizontalValue.textContent = "–";
    gazeVerticalValue.textContent = "–";
    attentionHint.textContent = "Heuristic estimate from head orientation and iris position.";
    return;
  }
  if (!_textUpdateDue) return;

  lookingAtCameraValue.textContent = attention.lookingAtCamera ? "Likely yes" : "Likely no";
  lookingAwayValue.textContent = attention.lookingAway ? "Likely yes" : "Likely no";

  const horizLabel = attention.gazeHoriz > 0.22 ? "Right" : (attention.gazeHoriz < -0.22 ? "Left" : "Centred");
  const vertLabel = attention.gazeVert > 0.18 ? "Down" : (attention.gazeVert < -0.18 ? "Up" : "Centred");

  gazeHorizontalValue.textContent = horizLabel;
  gazeVerticalValue.textContent = vertLabel;
  attentionHint.textContent = `Heuristic estimate. Confidence: ${Math.round(attention.confidence * 100)}%.`;
}

// hasFace: whether a face is currently detected.
// quality: { score, hint } from quality.js.
// Bar updates every frame; text/hint respects the 200ms throttle.
export function updateQualityUI(quality, hasFace) {
  const isLow = hasFace && quality.score < LOW_QUALITY_THRESHOLD;

  for (const panel of _dimPanels) {
    if (panel) panel.classList.toggle('metric--dim', isLow);
  }

  if (!hasFace) {
    qualityBarFill.style.width = '0%';
    qualityBarTrack.setAttribute('aria-valuenow', 0);
    if (_textUpdateDue) {
      qualityScore.textContent = '–';
      qualityLabel.textContent = '';
      qualityHint.textContent = '';
    }
    return;
  }

  const pct = Math.round(quality.score * 100);
  qualityBarFill.style.width = `${pct}%`;
  qualityBarTrack.setAttribute('aria-valuenow', pct);
  qualityBarFill.style.backgroundColor = quality.score >= 0.7
    ? 'var(--ok)' : quality.score >= LOW_QUALITY_THRESHOLD
    ? 'var(--warn)' : '#e03131';

  if (_textUpdateDue) {
    qualityScore.textContent = `${pct}%`;
    qualityLabel.textContent = quality.score >= 0.7 ? 'Good' : quality.score >= LOW_QUALITY_THRESHOLD ? 'Fair' : 'Poor';
    qualityHint.textContent = quality.hint;
  }
}

// ── Model failure UI ───────────────────────────────────────────────────────
export function showModelDisabledUI(model) {
  const notice = _modelNoticeEls[model];
  if (notice) notice.hidden = false;
  if (model === 'face' && faceRetryBtn) faceRetryBtn.hidden = false;
  if (model === 'hand' && _modelToggleLabels.hand) _modelToggleLabels.hand.hidden = true;
  if (model === 'pose' && _modelToggleLabels.pose) _modelToggleLabels.pose.hidden = true;
}

export function hideModelDisabledUI(model) {
  const notice = _modelNoticeEls[model];
  if (notice) notice.hidden = true;
  if (model === 'face' && faceRetryBtn) faceRetryBtn.hidden = true;
  if (model === 'hand' && _modelToggleLabels.hand) _modelToggleLabels.hand.hidden = false;
  if (model === 'pose' && _modelToggleLabels.pose) _modelToggleLabels.pose.hidden = false;
}

// Immediate — called on face-lost to clear all metrics at once.
export function updateTrackingState(hasFace) {
  if (hasFace) {
    trackingState.textContent = "Tracking";
    trackingHint.textContent = "One face detected.";
  } else {
    trackingState.textContent = "Searching";
    trackingHint.textContent = "No face currently detected.";
  }
}
