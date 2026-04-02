import { LM } from './constants.js';
import { clamp, averageNormalizedPoint } from './utils.js';

export function estimateAttention(landmarks, pose) {
  const leftIris = averageNormalizedPoint(landmarks, LM.leftIris);
  const rightIris = averageNormalizedPoint(landmarks, LM.rightIris);
  if (!leftIris || !rightIris) return null;

  const leftMinX = Math.min(landmarks[LM.leftEyeOuter].x, landmarks[LM.leftEyeInner].x);
  const leftMaxX = Math.max(landmarks[LM.leftEyeOuter].x, landmarks[LM.leftEyeInner].x);
  const rightMinX = Math.min(landmarks[LM.rightEyeOuter].x, landmarks[LM.rightEyeInner].x);
  const rightMaxX = Math.max(landmarks[LM.rightEyeOuter].x, landmarks[LM.rightEyeInner].x);
  const leftMinY = Math.min(landmarks[LM.leftEyeTop].y, landmarks[LM.leftEyeBottom].y);
  const leftMaxY = Math.max(landmarks[LM.leftEyeTop].y, landmarks[LM.leftEyeBottom].y);
  const rightMinY = Math.min(landmarks[LM.rightEyeTop].y, landmarks[LM.rightEyeBottom].y);
  const rightMaxY = Math.max(landmarks[LM.rightEyeTop].y, landmarks[LM.rightEyeBottom].y);

  const leftHorizRatio = (leftIris.x - leftMinX) / Math.max(1e-6, leftMaxX - leftMinX);
  const rightHorizRatio = (rightIris.x - rightMinX) / Math.max(1e-6, rightMaxX - rightMinX);

  const leftVertRatio = (leftIris.y - leftMinY) / Math.max(1e-6, leftMaxY - leftMinY);
  const rightVertRatio = (rightIris.y - rightMinY) / Math.max(1e-6, rightMaxY - rightMinY);

  const gazeHoriz = (((leftHorizRatio - 0.5) + (rightHorizRatio - 0.5)) / 2) * 2;
  const gazeVert = (((leftVertRatio - 0.5) + (rightVertRatio - 0.5)) / 2) * 2;

  const combinedHoriz = (pose?.yaw ?? 0) / 22 + gazeHoriz * 1.15;
  const combinedVert = (pose?.pitch ?? 0) / 16 + gazeVert * 0.9;

  const lookingAtCamera = Math.abs(combinedHoriz) < 0.95 && Math.abs(combinedVert) < 0.95;
  const lookingAway = Math.abs(combinedHoriz) > 1.35 || Math.abs(combinedVert) > 1.2;

  return {
    lookingAtCamera,
    lookingAway,
    gazeHoriz,
    gazeVert,
    confidence: clamp(1 - (Math.abs(combinedHoriz) + Math.abs(combinedVert)) / 2.4, 0, 1)
  };
}
