import { FaceLandmarker } from '@mediapipe/tasks-vision';
import { MAX_RENDER_DPR, HEAD_CROP_SMOOTHING, POSE_CONNECTIONS_UI, HAND_CONNECTIONS_UI } from './constants.js';
import { clamp, lerp } from './utils.js';
import { video, overlay, headFeedCanvas, headOverlay } from './ui.js';
import { getFaceBounds } from './geometry.js';

// ── Canvas contexts ────────────────────────────────────────────────────────
export const ctx = overlay.getContext("2d");
export const headFeedCtx = headFeedCanvas.getContext("2d");
export const headOverlayCtx = headOverlay.getContext("2d");

// ── Module-level state ─────────────────────────────────────────────────────
let videoDrawRect = null;
let smoothedHeadCrop = null;

export const overlayConfig = { showFaceIds: false };

// ── Video draw rect ────────────────────────────────────────────────────────
export function updateVideoDrawRect() {
  const canvasWidth = overlay.clientWidth || overlay.parentElement?.clientWidth || 1;
  const canvasHeight = overlay.clientHeight || overlay.parentElement?.clientHeight || 1;
  const videoWidth = video.videoWidth || 1280;
  const videoHeight = video.videoHeight || 720;
  const scale = Math.min(canvasWidth / videoWidth, canvasHeight / videoHeight);
  const drawWidth = videoWidth * scale;
  const drawHeight = videoHeight * scale;
  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2;
  videoDrawRect = { x, y, width: drawWidth, height: drawHeight };
  return videoDrawRect;
}

export function getVideoDrawRect() {
  return videoDrawRect ?? updateVideoDrawRect();
}

// ── Overlay resize / clear ─────────────────────────────────────────────────
export function resizeOverlay() {
  const stage = overlay.parentElement;
  const rect = stage.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
  const nextWidth = Math.max(1, Math.round(rect.width * dpr));
  const nextHeight = Math.max(1, Math.round(rect.height * dpr));
  if (overlay.width !== nextWidth || overlay.height !== nextHeight) {
    overlay.width = nextWidth;
    overlay.height = nextHeight;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  updateVideoDrawRect();
}

export function clearOverlay() {
  ctx.clearRect(0, 0, overlay.width, overlay.height);
}

// ── Head view resize / clear ───────────────────────────────────────────────
export function resizeHeadView() {
  const stage = headFeedCanvas.parentElement;
  const rect = stage.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
  const nextWidth = Math.max(1, Math.round(rect.width * dpr));
  const nextHeight = Math.max(1, Math.round(rect.height * dpr));

  if (headFeedCanvas.width !== nextWidth || headFeedCanvas.height !== nextHeight) {
    headFeedCanvas.width = nextWidth;
    headFeedCanvas.height = nextHeight;
  }
  if (headOverlay.width !== nextWidth || headOverlay.height !== nextHeight) {
    headOverlay.width = nextWidth;
    headOverlay.height = nextHeight;
  }

  headFeedCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  headOverlayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export function clearHeadView() {
  headFeedCtx.clearRect(0, 0, headFeedCanvas.width, headFeedCanvas.height);
  headOverlayCtx.clearRect(0, 0, headOverlay.width, headOverlay.height);
}

// ── Head crop smoothing ────────────────────────────────────────────────────
export function resetSmoothedHeadCrop() {
  smoothedHeadCrop = null;
}

function clampHeadCropToFrame(crop, videoWidth, videoHeight) {
  const size = clamp(crop.size, 1, Math.min(videoWidth, videoHeight));
  return {
    x: clamp(crop.x, 0, Math.max(0, videoWidth - size)),
    y: clamp(crop.y, 0, Math.max(0, videoHeight - size)),
    size
  };
}

function smoothHeadCrop(crop, videoWidth, videoHeight) {
  const clampedCrop = clampHeadCropToFrame(crop, videoWidth, videoHeight);
  const previousCrop = smoothedHeadCrop;
  if (!previousCrop) {
    smoothedHeadCrop = clampedCrop;
    return clampedCrop;
  }

  const nextCrop = clampHeadCropToFrame({
    x: lerp(previousCrop.x, clampedCrop.x, HEAD_CROP_SMOOTHING),
    y: lerp(previousCrop.y, clampedCrop.y, HEAD_CROP_SMOOTHING),
    size: lerp(previousCrop.size, clampedCrop.size, Math.min(0.48, HEAD_CROP_SMOOTHING + 0.08))
  }, videoWidth, videoHeight);

  smoothedHeadCrop = nextCrop;
  return nextCrop;
}

// ── Head crop calculation ──────────────────────────────────────────────────
function getHeadCropPixels(faceLandmarks, poseResult) {
  if (!faceLandmarks || video.readyState < 2) return null;

  const videoWidth = video.videoWidth || 1280;
  const videoHeight = video.videoHeight || 720;
  const faceBounds = getFaceBounds(faceLandmarks);

  let left = faceBounds.minX * videoWidth;
  let right = faceBounds.maxX * videoWidth;
  let top = faceBounds.minY * videoHeight;
  let bottom = faceBounds.maxY * videoHeight;

  const faceWidth = Math.max(1, right - left);
  const faceHeight = Math.max(1, bottom - top);

  left -= faceWidth * 0.42;
  right += faceWidth * 0.42;
  top -= faceHeight * 0.54;
  bottom += faceHeight * 0.72;

  const poseLandmarks = poseResult?.landmarks?.[0];
  if (poseLandmarks?.[11] && poseLandmarks?.[12]) {
    const ls = poseLandmarks[11];
    const rs = poseLandmarks[12];
    if ((ls.visibility ?? 1) > 0.35 && (rs.visibility ?? 1) > 0.35) {
      const shoulderLeft = Math.min(ls.x, rs.x) * videoWidth;
      const shoulderRight = Math.max(ls.x, rs.x) * videoWidth;
      const shoulderY = Math.max(ls.y, rs.y) * videoHeight;
      left = Math.min(left, shoulderLeft - faceWidth * 0.22);
      right = Math.max(right, shoulderRight + faceWidth * 0.22);
      bottom = Math.max(bottom, shoulderY + faceHeight * 0.26);
    }
  }

  let size = Math.max(right - left, bottom - top);
  size = Math.min(size * 1.02, Math.min(videoWidth, videoHeight));

  const faceCenterX = ((faceBounds.minX + faceBounds.maxX) / 2) * videoWidth;
  const faceCenterY = ((faceBounds.minY + faceBounds.maxY) / 2) * videoHeight;
  const desiredFaceX = 0.50;
  const desiredFaceY = 0.43;

  let x = faceCenterX - size * desiredFaceX;
  let y = faceCenterY - size * desiredFaceY;

  x = clamp(x, 0, Math.max(0, videoWidth - size));
  y = clamp(y, 0, Math.max(0, videoHeight - size));

  return smoothHeadCrop({ x, y, size }, videoWidth, videoHeight);
}

// ── Head landmark mapping ──────────────────────────────────────────────────
function mapHeadPoint(landmark, crop, width, height) {
  return {
    x: ((landmark.x * (video.videoWidth || 1280)) - crop.x) / crop.size * width,
    y: ((landmark.y * (video.videoHeight || 720)) - crop.y) / crop.size * height
  };
}

function drawHeadConnectorSet(landmarks, connectorSet, crop, options = {}) {
  if (!Array.isArray(connectorSet) || connectorSet.length === 0) return;
  const width = headOverlay.clientWidth;
  const height = headOverlay.clientHeight;
  headOverlayCtx.save();
  headOverlayCtx.lineJoin = "round";
  headOverlayCtx.lineCap = "round";
  headOverlayCtx.strokeStyle = options.color ?? "rgba(255,255,255,0.85)";
  headOverlayCtx.lineWidth = options.lineWidth ?? 1.5;
  headOverlayCtx.beginPath();
  for (const connection of connectorSet) {
    const start = connection.start ?? connection[0];
    const end = connection.end ?? connection[1];
    if (start == null || end == null || !landmarks[start] || !landmarks[end]) continue;
    const p1 = mapHeadPoint(landmarks[start], crop, width, height);
    const p2 = mapHeadPoint(landmarks[end], crop, width, height);
    headOverlayCtx.moveTo(p1.x, p1.y);
    headOverlayCtx.lineTo(p2.x, p2.y);
  }
  headOverlayCtx.stroke();
  headOverlayCtx.restore();
}

// ── Head view drawing ──────────────────────────────────────────────────────
export function drawHeadView(faceLandmarks, poseResult) {
  resizeHeadView();
  clearHeadView();

  if (!faceLandmarks || video.readyState < 2) return;
  const crop = getHeadCropPixels(faceLandmarks, poseResult);
  if (!crop) return;

  const width = headFeedCanvas.clientWidth || headFeedCanvas.parentElement.clientWidth || 1;
  const height = headFeedCanvas.clientHeight || headFeedCanvas.parentElement.clientHeight || 1;

  headFeedCtx.drawImage(
    video,
    crop.x, crop.y, crop.size, crop.size,
    0, 0, width, height
  );

  const drawRect = getVideoDrawRect();
  const cssScale = drawRect.width / (video.videoWidth || 1280);
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
  const overlaySrcX = (drawRect.x + crop.x * cssScale) * dpr;
  const overlaySrcY = (drawRect.y + crop.y * cssScale) * dpr;
  const overlaySrcSize = crop.size * cssScale * dpr;

  headOverlayCtx.drawImage(
    overlay,
    overlaySrcX, overlaySrcY, overlaySrcSize, overlaySrcSize,
    0, 0, width, height
  );

  drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, crop, { color: "rgba(230, 240, 255, 0.95)", lineWidth: 1.8 });
  drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, crop, { color: "rgba(70, 110, 255, 0.95)", lineWidth: 1.7 });
  drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, crop, { color: "rgba(70, 255, 110, 0.95)", lineWidth: 1.7 });
  drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, crop, { color: "rgba(70, 110, 255, 0.95)", lineWidth: 1.3 });
  drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, crop, { color: "rgba(70, 255, 110, 0.95)", lineWidth: 1.3 });
  drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, crop, { color: "rgba(255, 210, 160, 0.9)", lineWidth: 1.4 });

  const poseLandmarks = poseResult?.landmarks?.[0];
  if (poseLandmarks?.[11] && poseLandmarks?.[12]) {
    const ls = poseLandmarks[11];
    const rs = poseLandmarks[12];
    if ((ls.visibility ?? 1) > 0.35 && (rs.visibility ?? 1) > 0.35) {
      const p1 = mapHeadPoint(ls, crop, width, height);
      const p2 = mapHeadPoint(rs, crop, width, height);
      headOverlayCtx.save();
      headOverlayCtx.strokeStyle = "rgba(110, 225, 255, 0.8)";
      headOverlayCtx.lineWidth = 2;
      headOverlayCtx.beginPath();
      headOverlayCtx.moveTo(p1.x, p1.y);
      headOverlayCtx.lineTo(p2.x, p2.y);
      headOverlayCtx.stroke();
      headOverlayCtx.restore();
    }
  }
}

// ── Main overlay drawing ───────────────────────────────────────────────────
export function drawConnectorSet(landmarks, connectorSet, options = {}) {
  if (!Array.isArray(connectorSet) || connectorSet.length === 0) return;
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = options.color ?? "rgba(255,255,255,0.85)";
  ctx.lineWidth = options.lineWidth ?? 1.5;
  ctx.beginPath();
  for (const connection of connectorSet) {
    if (!connection) continue;
    const start = connection.start ?? connection[0];
    const end = connection.end ?? connection[1];
    if (start == null || end == null || !landmarks[start] || !landmarks[end]) continue;
    const p1 = getPoint(landmarks, start);
    const p2 = getPoint(landmarks, end);
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
  }
  ctx.stroke();
  ctx.restore();
}

export function drawCircle(x, y, radius, strokeStyle, lineWidth, fillStyle = null) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle && lineWidth > 0) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function getPoint(landmarks, idx) {
  const rect = getVideoDrawRect();
  return {
    x: rect.x + landmarks[idx].x * rect.width,
    y: rect.y + landmarks[idx].y * rect.height
  };
}

export function drawLandmarkPoints(landmarks, indices = null, options = {}) {
  const ids = indices ?? landmarks.map((_, i) => i);
  const radius = options.radius ?? 1.6;
  ctx.save();
  ctx.fillStyle = options.fillStyle ?? "rgba(255, 70, 70, 0.92)";
  for (const idx of ids) {
    const p = getPoint(landmarks, idx);
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawLandmarkLabels(landmarks, indices = null, options = {}) {
  const ids = indices ?? landmarks.map((_, i) => i);
  ctx.save();
  ctx.font = options.font ?? "9px system-ui, sans-serif";
  ctx.fillStyle = options.fillStyle ?? "rgba(255, 58, 58, 0.92)";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  for (const idx of ids) {
    const p = getPoint(landmarks, idx);
    ctx.fillText(String(idx), p.x + 2.5, p.y - 2.5);
  }
  ctx.restore();
}

export function getFaceOvalPoints(landmarks) {
  const ovalConnections = FaceLandmarker.FACE_LANDMARKS_FACE_OVAL;
  const seen = new Set();
  const indices = [];
  for (const connection of ovalConnections) {
    const start = connection.start ?? connection[0];
    if (!seen.has(start)) {
      seen.add(start);
      indices.push(start);
    }
  }
  return indices.map(index => getPoint(landmarks, index));
}

export function getFaceLabelIndices() {
  const keep = new Set([
    1, 4, 5, 6, 8, 9, 10, 13, 14, 17,
    33, 61, 78, 91, 95, 98, 127, 133, 145, 152,
    159, 168, 172, 178, 181, 185, 191, 195, 197,
    234, 263, 291, 308, 314, 317, 323, 356, 362,
    374, 386, 389, 402, 409, 454, 468, 473
  ]);
  return [...keep];
}

export function drawFaceGrid(landmarks) {
  const ovalPoints = getFaceOvalPoints(landmarks);
  if (ovalPoints.length < 3) return;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const point of ovalPoints) {
    if (point.x < minX) minX = point.x;
    if (point.x > maxX) maxX = point.x;
    if (point.y < minY) minY = point.y;
    if (point.y > maxY) maxY = point.y;
  }

  const cols = 6;
  const rows = 8;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(ovalPoints[0].x, ovalPoints[0].y);
  for (let i = 1; i < ovalPoints.length; i += 1) ctx.lineTo(ovalPoints[i].x, ovalPoints[i].y);
  ctx.closePath();
  ctx.clip();
  ctx.strokeStyle = "rgba(175, 205, 255, 0.20)";
  ctx.lineWidth = 0.9;
  for (let c = 1; c < cols; c += 1) {
    const x = minX + (maxX - minX) * (c / cols);
    ctx.beginPath();
    ctx.moveTo(x, minY);
    ctx.lineTo(x, maxY);
    ctx.stroke();
  }
  for (let r = 1; r < rows; r += 1) {
    const y = minY + (maxY - minY) * (r / rows);
    ctx.beginPath();
    ctx.moveTo(minX, y);
    ctx.lineTo(maxX, y);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawFace(landmarks) {
  const featureStyle = {
    tesselation: { color: "rgba(120, 140, 150, 0.52)", lineWidth: 0.65 },
    oval: { color: "rgba(255, 255, 255, 0.95)", lineWidth: 1.5 },
    leftBrow: { color: "rgba(55, 95, 255, 0.98)", lineWidth: 1.8 },
    rightBrow: { color: "rgba(85, 255, 120, 0.98)", lineWidth: 1.8 },
    leftEye: { color: "rgba(55, 95, 255, 0.98)", lineWidth: 1.8 },
    rightEye: { color: "rgba(85, 255, 120, 0.98)", lineWidth: 1.8 },
    irisLeft: { color: "rgba(35, 70, 255, 0.98)", lineWidth: 1.7 },
    irisRight: { color: "rgba(40, 220, 70, 0.98)", lineWidth: 1.7 },
    lips: { color: "rgba(255, 255, 255, 0.9)", lineWidth: 1.35 },
    nose: { color: "rgba(255, 90, 90, 0.78)", lineWidth: 1.2 }
  };

  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, featureStyle.tesselation);
  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, featureStyle.oval);
  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, featureStyle.leftBrow);
  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, featureStyle.rightBrow);
  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, featureStyle.leftEye);
  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, featureStyle.rightEye);
  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, featureStyle.irisLeft);
  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, featureStyle.irisRight);
  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, featureStyle.lips);
  drawConnectorSet(landmarks, FaceLandmarker.FACE_LANDMARKS_NOSE, featureStyle.nose);
  if (overlayConfig.showFaceIds) {
    drawLandmarkPoints(landmarks, getFaceLabelIndices(), { radius: 1.35, fillStyle: "rgba(255, 52, 52, 0.96)" });
    drawLandmarkLabels(landmarks, getFaceLabelIndices(), { font: "10px system-ui, sans-serif", fillStyle: "rgba(255, 52, 52, 0.96)" });
  }
}

export function drawPoseOverlay(poseResult) {
  const landmarks = poseResult?.landmarks?.[0];
  if (!landmarks) return;
  drawConnectorSet(landmarks, POSE_CONNECTIONS_UI, { color: "rgba(110, 225, 255, 0.9)", lineWidth: 2.0 });
  ctx.save();
  ctx.fillStyle = "rgba(230, 248, 255, 0.95)";
  for (let i = 0; i < landmarks.length; i += 1) {
    const lm = landmarks[i];
    if ((lm.visibility ?? 1) < 0.35) continue;
    const p = getPoint(landmarks, i);
    ctx.beginPath();
    ctx.arc(p.x, p.y, i < 11 ? 2.2 : 2.8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawHandOverlay(handResult) {
  const hands = handResult?.landmarks ?? [];
  const handedness = handResult?.handedness ?? [];
  for (let h = 0; h < hands.length; h += 1) {
    const landmarks = hands[h];
    const label = handedness[h]?.[0]?.categoryName ?? "";
    const isLeft = label.toLowerCase() === "left";
    const lineColor = isLeft ? "rgba(70, 220, 120, 0.95)" : "rgba(90, 180, 255, 0.95)";
    const pointColor = isLeft ? "rgba(186, 255, 208, 0.95)" : "rgba(210, 236, 255, 0.95)";
    drawConnectorSet(landmarks, HAND_CONNECTIONS_UI, { color: lineColor, lineWidth: 2.0 });
    ctx.save();
    ctx.fillStyle = pointColor;
    for (let i = 0; i < landmarks.length; i += 1) {
      const p = getPoint(landmarks, i);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
    const wrist = getPoint(landmarks, 0);
    ctx.fillStyle = lineColor;
    ctx.font = "12px system-ui, sans-serif";
    ctx.fillText(label, wrist.x + 6, wrist.y - 10);
    ctx.restore();
  }
}
