import { RAD2DEG } from './constants.js';

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

// Head-pose angles straight from the facial transformation matrix. The zero
// point is arbitrary, but headbang analysis only uses oscillation (peak-to-
// peak range and angular velocity), which is offset-invariant — so no neutral
// pose calibration is needed.
export function estimatePose(result) {
  const rotation = matrixToRotation3x3(result?.facialTransformationMatrixes?.[0]);
  if (!rotation) return null;
  return rotationToEulerDegrees(rotation);
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
