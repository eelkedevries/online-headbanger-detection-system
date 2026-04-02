import { FaceLandmarker } from '@mediapipe/tasks-vision';
import { MAX_RENDER_DPR, HEAD_CROP_SMOOTHING } from './constants.js';
import { clamp, lerp } from './utils.js';
import { video, headFeedCanvas, headOverlay } from './ui.js';
import { getFaceBounds } from './geometry.js';

// ── Canvas contexts ────────────────────────────────────────────────────────
export const headFeedCtx = headFeedCanvas.getContext("2d");
export const headOverlayCtx = headOverlay.getContext("2d");

// ── Module-level state ─────────────────────────────────────────────────────
let videoDrawRect = null;
let smoothedHeadCrop = null;
const _reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ── Video draw rect ────────────────────────────────────────────────────────
// Returns a rect in video-native pixel coordinates so that geometry.js
// measurements (face width, mouth width, etc.) are in native video pixels.
export function updateVideoDrawRect() {
  const videoWidth = video.videoWidth || 1280;
  const videoHeight = video.videoHeight || 720;
  videoDrawRect = { x: 0, y: 0, width: videoWidth, height: videoHeight };
  return videoDrawRect;
}

export function getVideoDrawRect() {
  return videoDrawRect ?? updateVideoDrawRect();
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

  drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, crop, { color: "rgba(230, 240, 255, 0.95)", lineWidth: 1.8 });

  if (!_reducedMotion.matches) {
    drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, crop, { color: "rgba(120, 140, 150, 0.35)", lineWidth: 0.65 });
    drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, crop, { color: "rgba(70, 110, 255, 0.95)", lineWidth: 1.7 });
    drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, crop, { color: "rgba(70, 255, 110, 0.95)", lineWidth: 1.7 });
    drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, crop, { color: "rgba(70, 110, 255, 0.95)", lineWidth: 1.3 });
    drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, crop, { color: "rgba(70, 255, 110, 0.95)", lineWidth: 1.3 });
    drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, crop, { color: "rgba(35, 70, 255, 0.98)", lineWidth: 1.7 });
    drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, crop, { color: "rgba(40, 220, 70, 0.98)", lineWidth: 1.7 });
    drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, crop, { color: "rgba(255, 210, 160, 0.9)", lineWidth: 1.4 });
    drawHeadConnectorSet(faceLandmarks, FaceLandmarker.FACE_LANDMARKS_NOSE, crop, { color: "rgba(255, 90, 90, 0.78)", lineWidth: 1.2 });
  }

  if (!_reducedMotion.matches) {
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
}
