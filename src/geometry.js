import { RAD2DEG, DEG2RAD, DEFAULT_CAMERA_HORIZONTAL_FOV_DEG, LM } from './constants.js';
import { clamp, dist, mean } from './utils.js';
import {
  distanceValue, distanceHint, distanceMode,
  faceWidthPx, faceHeightPx, interEyePxValue, irisDiameterPxValue,
  geomFaceWidthEstimate, geomFaceHeightEstimate, geomInterEyeEstimate, geomIrisEstimate,
  mouthWidthValue, mouthHeightValue, mouthAspectValue,
  earLeftValue, earRightValue, browLeftValue, browRightValue,
  faceRatioValue, faceX, faceY,
  updateHeadDistanceDelta, isTextUpdateDue
} from './ui.js';
import { getVideoDrawRect } from './overlay.js';

// ── Shared distance reference (mutated by main.js via distanceRef) ─────────
export const distanceRef = {
  referenceDistanceCm: 50,
  referenceFaceWidthPx: null,
  referenceIsDefault: true
};

// ── Matrix / rotation helpers ──────────────────────────────────────────────
export function matrixToRotation3x3(matrixObject) {
  if (!matrixObject) return null;
  const raw = Array.from(matrixObject.data ?? matrixObject);
  if (raw.length < 12) return null;
  return [
    [raw[0], raw[1], raw[2]],
    [raw[4], raw[5], raw[6]],
    [raw[8], raw[9], raw[10]]
  ];
}

export function transpose3(matrix) {
  return [
    [matrix[0][0], matrix[1][0], matrix[2][0]],
    [matrix[0][1], matrix[1][1], matrix[2][1]],
    [matrix[0][2], matrix[1][2], matrix[2][2]]
  ];
}

export function multiply3(a, b) {
  const out = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      out[row][col] = a[row][0] * b[0][col] + a[row][1] * b[1][col] + a[row][2] * b[2][col];
    }
  }
  return out;
}

export function rotationToEulerDegrees(r) {
  const sy = Math.sqrt(r[0][0] * r[0][0] + r[1][0] * r[1][0]);
  const singular = sy < 1e-6;
  let x, y, z;
  if (!singular) {
    x = Math.atan2(r[2][1], r[2][2]);
    y = Math.atan2(-r[2][0], sy);
    z = Math.atan2(r[1][0], r[0][0]);
  } else {
    x = Math.atan2(-r[1][2], r[1][1]);
    y = Math.atan2(-r[2][0], sy);
    z = 0;
  }
  return { pitch: x * RAD2DEG, yaw: y * RAD2DEG, roll: z * RAD2DEG };
}

// ── Landmark helpers ───────────────────────────────────────────────────────
export function getFaceBounds(landmarks) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const point of landmarks) {
    if (point.x < minX) minX = point.x;
    if (point.x > maxX) maxX = point.x;
    if (point.y < minY) minY = point.y;
    if (point.y > maxY) maxY = point.y;
  }
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
}

export function getPoint(landmarks, idx) {
  const rect = getVideoDrawRect();
  return {
    x: rect.x + landmarks[idx].x * rect.width,
    y: rect.y + landmarks[idx].y * rect.height
  };
}

export function averagePoint(landmarks, indices) {
  let x = 0;
  let y = 0;
  for (const idx of indices) {
    const point = getPoint(landmarks, idx);
    x += point.x;
    y += point.y;
  }
  return { x: x / indices.length, y: y / indices.length };
}

// ── Distance estimation ────────────────────────────────────────────────────
export function getEstimatedDistanceCm(geometry) {
  if (!geometry || !distanceRef.referenceFaceWidthPx || geometry.faceWidth <= 0) return null;
  return distanceRef.referenceDistanceCm * (distanceRef.referenceFaceWidthPx / geometry.faceWidth);
}

export function getVisualDegreesFromPx(px, axis = "diag") {
  const rect = getVideoDrawRect();
  const width = Math.max(rect.width, 1e-6);
  const height = Math.max(rect.height, 1e-6);
  const aspect = width / height;
  const horizontalFovDeg = DEFAULT_CAMERA_HORIZONTAL_FOV_DEG;
  const verticalFovDeg = 2 * Math.atan(Math.tan((horizontalFovDeg * DEG2RAD) / 2) / Math.max(aspect, 1e-6)) * RAD2DEG;

  if (axis === "x") return px * horizontalFovDeg / width;
  if (axis === "y") return px * verticalFovDeg / height;
  const avgDegPerPx = mean([horizontalFovDeg / width, verticalFovDeg / height]);
  return px * avgDegPerPx;
}

export function getCmFromVisualDegrees(angleDeg, distanceCm) {
  if (!Number.isFinite(angleDeg) || !Number.isFinite(distanceCm) || distanceCm <= 0) return null;
  return 2 * distanceCm * Math.tan((angleDeg * DEG2RAD) / 2);
}

export function formatMeasurementEstimate(px, axis, distanceCm) {
  const angleDeg = getVisualDegreesFromPx(px, axis);
  const sizeCm = getCmFromVisualDegrees(angleDeg, distanceCm);
  const pxText = `${px.toFixed(px >= 100 ? 0 : 1)} px`;
  const angleText = Number.isFinite(angleDeg) ? `${angleDeg.toFixed(1)}°` : "–";
  const cmText = Number.isFinite(sizeCm) ? `${sizeCm.toFixed(1)} cm` : "–";
  return `${pxText} | ${angleText} | ${cmText}`;
}

export function currentFaceWidthPxFromResult(result) {
  const landmarks = result?.faceLandmarks?.[0];
  if (!landmarks) return null;
  const rect = getVideoDrawRect();
  return getFaceBounds(landmarks).width * rect.width;
}

// ── Face geometry calculation ──────────────────────────────────────────────
export function calculateGeometry(landmarks) {
  const rect = getVideoDrawRect();
  const bounds = getFaceBounds(landmarks);
  const faceWidth = bounds.width * rect.width;
  const faceHeight = bounds.height * rect.height;
  const faceCenterX = ((bounds.minX + bounds.maxX) / 2 - 0.5) * 100;
  const faceCenterY = ((bounds.minY + bounds.maxY) / 2 - 0.5) * 100;

  const mouthLeft = getPoint(landmarks, LM.mouthLeft);
  const mouthRight = getPoint(landmarks, LM.mouthRight);
  const mouthTop = getPoint(landmarks, LM.mouthTop);
  const mouthBottom = getPoint(landmarks, LM.mouthBottom);
  const mouthWidth = dist(mouthLeft, mouthRight);
  const mouthHeight = dist(mouthTop, mouthBottom);
  const mouthAspect = mouthHeight / Math.max(mouthWidth, 1e-6);

  const leftEyeOuter = getPoint(landmarks, LM.leftEyeOuter);
  const leftEyeInner = getPoint(landmarks, LM.leftEyeInner);
  const leftEyeTop = getPoint(landmarks, LM.leftEyeTop);
  const leftEyeBottom = getPoint(landmarks, LM.leftEyeBottom);
  const rightEyeOuter = getPoint(landmarks, LM.rightEyeOuter);
  const rightEyeInner = getPoint(landmarks, LM.rightEyeInner);
  const rightEyeTop = getPoint(landmarks, LM.rightEyeTop);
  const rightEyeBottom = getPoint(landmarks, LM.rightEyeBottom);

  const leftEyeWidth = dist(leftEyeOuter, leftEyeInner);
  const rightEyeWidth = dist(rightEyeOuter, rightEyeInner);
  const leftEyeHeight = dist(leftEyeTop, leftEyeBottom);
  const rightEyeHeight = dist(rightEyeTop, rightEyeBottom);
  const leftEAR = leftEyeHeight / Math.max(leftEyeWidth, 1e-6);
  const rightEAR = rightEyeHeight / Math.max(rightEyeWidth, 1e-6);

  const leftIrisCenter = averagePoint(landmarks, LM.leftIris);
  const rightIrisCenter = averagePoint(landmarks, LM.rightIris);
  const interEye = dist(leftIrisCenter, rightIrisCenter);

  const irisDiameter = mean([
    dist(getPoint(landmarks, 469), getPoint(landmarks, 471)),
    dist(getPoint(landmarks, 474), getPoint(landmarks, 476)),
    dist(getPoint(landmarks, 470), getPoint(landmarks, 472)),
    dist(getPoint(landmarks, 475), getPoint(landmarks, 477))
  ]);

  const leftEyeCenter = { x: (leftEyeOuter.x + leftEyeInner.x) / 2, y: (leftEyeTop.y + leftEyeBottom.y) / 2 };
  const rightEyeCenter = { x: (rightEyeOuter.x + rightEyeInner.x) / 2, y: (rightEyeTop.y + rightEyeBottom.y) / 2 };
  const leftBrowY = mean(LM.leftBrow.map(idx => getPoint(landmarks, idx).y));
  const rightBrowY = mean(LM.rightBrow.map(idx => getPoint(landmarks, idx).y));
  const leftBrowHeight = (leftEyeCenter.y - leftBrowY) / Math.max(faceHeight, 1e-6);
  const rightBrowHeight = (rightEyeCenter.y - rightBrowY) / Math.max(faceHeight, 1e-6);

  return {
    faceWidth,
    faceHeight,
    faceRatio: faceWidth / Math.max(faceHeight, 1e-6),
    faceCenterX,
    faceCenterY,
    mouthWidth,
    mouthHeight,
    mouthAspect,
    leftEAR,
    rightEAR,
    interEye,
    irisDiameter,
    leftBrowHeight,
    rightBrowHeight
  };
}

// ── Distance UI ────────────────────────────────────────────────────────────
export function updateDistanceUI(geometry) {
  if (!geometry) {
    distanceValue.textContent = "–";
    distanceMode.textContent = "Proxy only";
    faceWidthPx.textContent = "–";
    faceHeightPx.textContent = "–";
    interEyePxValue.textContent = "–";
    irisDiameterPxValue.textContent = "–";
    updateHeadDistanceDelta(Number.NaN);
    return;
  }

  const estimatedCm = getEstimatedDistanceCm(geometry);
  if (Number.isFinite(estimatedCm)) {
    const deltaCm = distanceRef.referenceDistanceCm - estimatedCm;
    updateHeadDistanceDelta(deltaCm);
    if (isTextUpdateDue()) {
      faceWidthPx.textContent = `${geometry.faceWidth.toFixed(0)} px`;
      faceHeightPx.textContent = `${geometry.faceHeight.toFixed(0)} px`;
      interEyePxValue.textContent = `${geometry.interEye.toFixed(0)} px`;
      irisDiameterPxValue.textContent = `${geometry.irisDiameter.toFixed(1)} px`;
      distanceValue.textContent = `${estimatedCm.toFixed(1)} cm`;
      distanceHint.textContent = "Approximate calibrated estimate from apparent face size.";
      distanceMode.textContent = distanceRef.referenceIsDefault ? "Default (50 cm)" : "Calibrated";
    }
  } else {
    const proxy = geometry.faceWidth / 100;
    updateHeadDistanceDelta(Number.NaN);
    if (isTextUpdateDue()) {
      faceWidthPx.textContent = `${geometry.faceWidth.toFixed(0)} px`;
      faceHeightPx.textContent = `${geometry.faceHeight.toFixed(0)} px`;
      interEyePxValue.textContent = `${geometry.interEye.toFixed(0)} px`;
      irisDiameterPxValue.textContent = `${geometry.irisDiameter.toFixed(1)} px`;
      distanceValue.textContent = `${proxy.toFixed(2)}×`;
      distanceHint.textContent = "Relative proximity proxy only. Larger value means closer to the camera.";
      distanceMode.textContent = "Proxy only";
    }
  }
}

// ── Geometry UI ────────────────────────────────────────────────────────────
export function updateGeometryUI(geometry) {
  if (!geometry) {
    geomFaceWidthEstimate.textContent = "–";
    geomFaceHeightEstimate.textContent = "–";
    geomInterEyeEstimate.textContent = "–";
    geomIrisEstimate.textContent = "–";
    mouthWidthValue.textContent = "–";
    mouthHeightValue.textContent = "–";
    mouthAspectValue.textContent = "–";
    earLeftValue.textContent = "–";
    earRightValue.textContent = "–";
    browLeftValue.textContent = "–";
    browRightValue.textContent = "–";
    faceRatioValue.textContent = "–";
    faceX.textContent = "–";
    faceY.textContent = "–";
    return;
  }

  if (!isTextUpdateDue()) return;
  const estimatedDistanceCm = getEstimatedDistanceCm(geometry);
  geomFaceWidthEstimate.textContent = formatMeasurementEstimate(geometry.faceWidth, "x", estimatedDistanceCm);
  geomFaceHeightEstimate.textContent = formatMeasurementEstimate(geometry.faceHeight, "y", estimatedDistanceCm);
  geomInterEyeEstimate.textContent = formatMeasurementEstimate(geometry.interEye, "x", estimatedDistanceCm);
  geomIrisEstimate.textContent = formatMeasurementEstimate(geometry.irisDiameter, "diag", estimatedDistanceCm);
  mouthWidthValue.textContent = formatMeasurementEstimate(geometry.mouthWidth, "x", estimatedDistanceCm);
  mouthHeightValue.textContent = formatMeasurementEstimate(geometry.mouthHeight, "y", estimatedDistanceCm);
  mouthAspectValue.textContent = geometry.mouthAspect.toFixed(3);
  earLeftValue.textContent = geometry.leftEAR.toFixed(3);
  earRightValue.textContent = geometry.rightEAR.toFixed(3);
  browLeftValue.textContent = geometry.leftBrowHeight.toFixed(3);
  browRightValue.textContent = geometry.rightBrowHeight.toFixed(3);
  faceRatioValue.textContent = geometry.faceRatio.toFixed(3);
  faceX.textContent = `${geometry.faceCenterX.toFixed(1)}%`;
  faceY.textContent = `${geometry.faceCenterY.toFixed(1)}%`;
}
