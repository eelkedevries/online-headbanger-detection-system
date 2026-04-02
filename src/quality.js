import { LM, LOW_QUALITY_THRESHOLD } from './constants.js';
import { clamp } from './utils.js';
import { getFaceBounds } from './geometry.js';

// Face bbox area (normalized) considered "full confidence" — ~20%×20% of frame
const CONFIDENCE_FULL_AREA = 0.04;

// Ring buffer for nose-tip jitter measurement
const JITTER_BUFFER_SIZE = 20;
// RMS displacement above this in normalized coords → "fully jittery"
const JITTER_MAX_NORM = 0.03;

const _noseTipX = new Float32Array(JITTER_BUFFER_SIZE);
const _noseTipY = new Float32Array(JITTER_BUFFER_SIZE);
let _bufIdx = 0;
let _bufCount = 0;

const _quality = { score: 1, jitter: 0, inFrame: 1, confidence: 1, hint: '' };

function _computeJitter() {
  const n = Math.min(_bufCount, JITTER_BUFFER_SIZE);
  if (n < 3) return 0;
  let mx = 0;
  let my = 0;
  for (let i = 0; i < n; i++) { mx += _noseTipX[i]; my += _noseTipY[i]; }
  mx /= n; my /= n;
  let v = 0;
  for (let i = 0; i < n; i++) {
    const dx = _noseTipX[i] - mx;
    const dy = _noseTipY[i] - my;
    v += dx * dx + dy * dy;
  }
  return Math.sqrt(v / n);
}

// Call every frame when a face is present. Updates and returns the quality object.
export function updateQuality(result) {
  const landmarks = result?.faceLandmarks?.[0];
  if (!landmarks) return _quality;

  // 1. Nose-tip jitter
  const nose = landmarks[LM.noseTip];
  _noseTipX[_bufIdx] = nose.x;
  _noseTipY[_bufIdx] = nose.y;
  _bufIdx = (_bufIdx + 1) % JITTER_BUFFER_SIZE;
  if (_bufCount < JITTER_BUFFER_SIZE) _bufCount++;

  const rawJitter = _computeJitter();
  const jitterNorm = clamp(rawJitter / JITTER_MAX_NORM, 0, 1);
  _quality.jitter = rawJitter;

  // 2. Face-in-frame ratio: what fraction of the face bbox is within [0,1]×[0,1]
  const b = getFaceBounds(landmarks);
  const clampedW = clamp(b.maxX, 0, 1) - clamp(b.minX, 0, 1);
  const clampedH = clamp(b.maxY, 0, 1) - clamp(b.minY, 0, 1);
  const inFrame = (b.width > 0 && b.height > 0)
    ? clamp((clampedW * clampedH) / (b.width * b.height), 0, 1)
    : 1;
  _quality.inFrame = inFrame;

  // 3. Detection confidence: face bbox area proxy — tiny/distant face → noisy landmarks
  const faceArea = b.width * b.height;
  const confidence = clamp(faceArea / CONFIDENCE_FULL_AREA, 0, 1);
  _quality.confidence = confidence;

  // Composite score
  _quality.score = clamp(
    0.35 * (1 - jitterNorm) + 0.35 * inFrame + 0.30 * confidence,
    0, 1
  );

  if (jitterNorm > 0.65) {
    _quality.hint = 'Hold still for better tracking accuracy';
  } else if (inFrame < 0.75) {
    _quality.hint = 'Move closer to the centre of the frame';
  } else if (confidence < 0.5) {
    _quality.hint = 'Move closer to the camera';
  } else if (_quality.score < LOW_QUALITY_THRESHOLD) {
    _quality.hint = 'Tracking quality is low';
  } else {
    _quality.hint = '';
  }

  return _quality;
}

export function getQuality() { return _quality; }

export function isQualityLow() { return _quality.score < LOW_QUALITY_THRESHOLD; }

// Call when face is lost or tracking stops. Resets score to 1 so panels don't
// stay dimmed while "Searching" — the no-face UI state handles that separately.
export function resetQuality() {
  _bufIdx = 0;
  _bufCount = 0;
  _quality.score = 1;
  _quality.jitter = 0;
  _quality.inFrame = 1;
  _quality.confidence = 1;
  _quality.hint = '';
}
