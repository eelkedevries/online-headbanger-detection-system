import { MAX_RENDER_DPR, FACE_OVAL_CONNECTORS, LM, TIERS } from './constants.js';
import { clamp } from './utils.js';
import { video, overlayCanvas } from './ui.js';
import { getFaceBounds } from './geometry.js';

// Draws the detection graphics over the mirrored live video feed: targeting
// brackets around the face, a glowing nose-tip motion trail, and shockwave
// rings on each counted bang. The <video> is mirrored with CSS, so all x
// coordinates are mirrored here in code (text would flip if the canvas
// itself were CSS-mirrored).

const overlayCtx = overlayCanvas.getContext('2d');
const _reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const TRAIL_MS = 850;
const SHOCKWAVE_MS = 480;

const trail = [];        // { x, y, t } in canvas CSS pixels
const shockwaves = [];   // { x, y, t }
let boxWidth = 0;
let boxHeight = 0;

// Measures the stage via getBoundingClientRect (a layout read) — call it only
// on resize, never per frame. drawOverlay uses the cached boxWidth/boxHeight.
export function resizeOverlay() {
  const rect = overlayCanvas.parentElement.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (overlayCanvas.width !== width || overlayCanvas.height !== height) {
    overlayCanvas.width = width;
    overlayCanvas.height = height;
  }
  boxWidth = rect.width;
  boxHeight = rect.height;
  overlayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export function clearOverlay() {
  overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  trail.length = 0;
  shockwaves.length = 0;
}

// Maps a normalised landmark to canvas CSS pixels, accounting for
// object-fit: cover cropping and the CSS mirror on the video element.
function mapPoint(nx, ny) {
  const videoWidth = video.videoWidth || 1280;
  const videoHeight = video.videoHeight || 720;
  const scale = Math.max(boxWidth / videoWidth, boxHeight / videoHeight);
  const offsetX = (boxWidth - videoWidth * scale) / 2;
  const offsetY = (boxHeight - videoHeight * scale) / 2;
  return {
    x: boxWidth - (offsetX + nx * videoWidth * scale),
    y: offsetY + ny * videoHeight * scale
  };
}

function drawBrackets(topLeft, bottomRight, color, alpha) {
  const left = Math.min(topLeft.x, bottomRight.x);
  const right = Math.max(topLeft.x, bottomRight.x);
  const top = topLeft.y;
  const bottom = bottomRight.y;
  const arm = clamp((right - left) * 0.22, 10, 48);

  overlayCtx.save();
  overlayCtx.strokeStyle = color;
  overlayCtx.globalAlpha = alpha;
  overlayCtx.lineWidth = 2.5;
  overlayCtx.lineCap = 'round';
  overlayCtx.shadowColor = color;
  overlayCtx.shadowBlur = 8;
  overlayCtx.beginPath();
  overlayCtx.moveTo(left, top + arm); overlayCtx.lineTo(left, top); overlayCtx.lineTo(left + arm, top);
  overlayCtx.moveTo(right - arm, top); overlayCtx.lineTo(right, top); overlayCtx.lineTo(right, top + arm);
  overlayCtx.moveTo(right, bottom - arm); overlayCtx.lineTo(right, bottom); overlayCtx.lineTo(right - arm, bottom);
  overlayCtx.moveTo(left + arm, bottom); overlayCtx.lineTo(left, bottom); overlayCtx.lineTo(left, bottom - arm);
  overlayCtx.stroke();
  overlayCtx.restore();
  return { left, right, top, bottom };
}

function drawFaceOval(landmarks, color) {
  overlayCtx.save();
  overlayCtx.strokeStyle = color;
  overlayCtx.globalAlpha = 0.28;
  overlayCtx.lineWidth = 1.2;
  overlayCtx.beginPath();
  for (const [startIdx, endIdx] of FACE_OVAL_CONNECTORS) {
    const a = landmarks[startIdx];
    const b = landmarks[endIdx];
    if (!a || !b) continue;
    const p1 = mapPoint(a.x, a.y);
    const p2 = mapPoint(b.x, b.y);
    overlayCtx.moveTo(p1.x, p1.y);
    overlayCtx.lineTo(p2.x, p2.y);
  }
  overlayCtx.stroke();
  overlayCtx.restore();
}

// Two whole-path strokes (a wide low-alpha glow pass, then a bright thin core)
// instead of one blurred stroke per segment. Canvas shadowBlur is a per-stroke
// blur pass and is punishingly slow on mobile GPUs — the fake glow reads the
// same and costs two strokes total regardless of trail length.
function drawTrail(color) {
  if (trail.length < 2) return;
  overlayCtx.save();
  overlayCtx.lineCap = 'round';
  overlayCtx.lineJoin = 'round';
  overlayCtx.strokeStyle = color;

  overlayCtx.beginPath();
  overlayCtx.moveTo(trail[0].x, trail[0].y);
  for (let i = 1; i < trail.length; i++) overlayCtx.lineTo(trail[i].x, trail[i].y);
  overlayCtx.globalAlpha = 0.22;
  overlayCtx.lineWidth = 9;
  overlayCtx.stroke();
  overlayCtx.globalAlpha = 0.9;
  overlayCtx.lineWidth = 2.5;
  overlayCtx.stroke();

  overlayCtx.restore();
}

export function spawnShockwave() {
  const last = trail[trail.length - 1];
  if (!last) return;
  shockwaves.push({ x: last.x, y: last.y, t: performance.now() });
  if (shockwaves.length > 6) shockwaves.shift();
}

function drawShockwaves(now, color) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const age = (now - shockwaves[i].t) / SHOCKWAVE_MS;
    if (age >= 1) {
      shockwaves.splice(i, 1);
      continue;
    }
    const radius = 18 + age * Math.min(boxWidth, boxHeight) * 0.32;
    overlayCtx.save();
    overlayCtx.beginPath();
    overlayCtx.arc(shockwaves[i].x, shockwaves[i].y, radius, 0, Math.PI * 2);
    overlayCtx.strokeStyle = color;
    overlayCtx.globalAlpha = clamp(1 - age, 0, 1) * 0.7;
    overlayCtx.lineWidth = 3 * (1 - age) + 0.5;
    overlayCtx.stroke();
    overlayCtx.restore();
  }
}

function drawLabel(text, x, y, color) {
  overlayCtx.save();
  overlayCtx.font = "600 12px 'Lexend', sans-serif";
  overlayCtx.fillStyle = color;
  overlayCtx.textAlign = 'left';
  overlayCtx.textBaseline = 'bottom';
  overlayCtx.shadowColor = 'rgba(0,0,0,0.9)';
  overlayCtx.shadowBlur = 4;
  overlayCtx.fillText(text, x, y);
  overlayCtx.restore();
}

export function drawOverlay(landmarks, detectionSnapshot, now) {
  if (boxWidth === 0) return; // stage not measured yet (resizeOverlay pending)
  overlayCtx.clearRect(0, 0, boxWidth, boxHeight);

  // Age out old trail points every frame regardless of tracking state.
  while (trail.length > 0 && now - trail[0].t > TRAIL_MS) trail.shift();

  if (!landmarks) {
    // Idle scan line while searching for a face
    if (!_reducedMotion.matches && video.readyState >= 2) {
      const y = (now / 6) % boxHeight;
      overlayCtx.save();
      overlayCtx.strokeStyle = 'rgba(107, 166, 228, 0.32)';
      overlayCtx.lineWidth = 1.5;
      overlayCtx.beginPath();
      overlayCtx.moveTo(0, y);
      overlayCtx.lineTo(boxWidth, y);
      overlayCtx.stroke();
      overlayCtx.restore();
    }
    trail.length = 0;
    return;
  }

  const tier = detectionSnapshot?.tier ?? 0;
  const danger = detectionSnapshot?.danger ?? false;
  const color = TIERS[tier].color;

  const bounds = getFaceBounds(landmarks);
  const pad = 0.06;
  const topLeft = mapPoint(bounds.minX - pad, bounds.minY - pad * 1.4);
  const bottomRight = mapPoint(bounds.maxX + pad, bounds.maxY + pad);

  // Only record a trail point when the nose actually moved. Between inference
  // results drawOverlay reuses cached landmarks, so pushing every frame would
  // pile up zero-length duplicates that add cost without changing the picture.
  const nose = landmarks[LM.noseTip];
  if (nose) {
    const p = mapPoint(nose.x, nose.y);
    const last = trail[trail.length - 1];
    if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 0.75) {
      trail.push({ x: p.x, y: p.y, t: now });
      if (trail.length > 96) trail.shift();
    }
  }

  drawFaceOval(landmarks, color);
  if (!_reducedMotion.matches) drawTrail(color);
  drawShockwaves(now, color);

  const strobe = danger && !_reducedMotion.matches ? 0.45 + 0.55 * Math.abs(Math.sin(now / 90)) : 0.95;
  const box = drawBrackets(topLeft, bottomRight, danger ? '#ff5c5c' : color, strobe);

  const label = danger
    ? '⚠ NECK HAZARD'
    : (detectionSnapshot?.detected ? 'HEADBANGER LOCKED' : 'TARGET LOCKED');
  drawLabel(label, box.left, box.top - 6, danger ? '#ff5c5c' : color);
}
