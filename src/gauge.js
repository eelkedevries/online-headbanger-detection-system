import { MAX_RENDER_DPR, TIERS, DEG2RAD } from './constants.js';
import { clamp } from './utils.js';

// Speedometer-style intensity gauge: a 240° arc split into tier zones, a
// glowing spring-damped needle, and a digital score readout. The static face
// (zones, ticks, labels) is cached on an offscreen canvas and only the needle
// layer is redrawn each frame.

const SWEEP_START_DEG = 150;   // gauge zero (bottom-left)
const SWEEP_TOTAL_DEG = 240;
const NEEDLE_SPRING = 0.09;
const NEEDLE_DAMPING = 0.80;

const gauge = {
  canvas: null,
  ctx: null,
  face: null,          // offscreen static layer
  width: 0,
  height: 0,
  dpr: 1,
  target: 0,
  value: 0,
  velocity: 0,
  tier: 0,
  danger: false
};

export function initGauge(canvasEl) {
  gauge.canvas = canvasEl;
  gauge.ctx = canvasEl.getContext('2d');
  resizeGauge();
  // The cached face layer bakes in tick numerals and zone labels, but the web
  // fonts load asynchronously — the first draw uses fallback faces. Rebuild the
  // face once the real fonts arrive so its typography matches the live readout.
  document.fonts?.ready.then(() => {
    gauge.width = 0;
    gauge.height = 0;
    resizeGauge();
  });
}

export function setGaugeTarget(score, tier, danger) {
  gauge.target = clamp(score, 0, 100);
  gauge.tier = tier;
  gauge.danger = danger;
}

function scoreToAngleRad(score) {
  return (SWEEP_START_DEG + (score / 100) * SWEEP_TOTAL_DEG) * DEG2RAD;
}

// Smallest arc radius worth drawing; below this the stage is not yet measured
// or is too short to render a legible gauge, so callers skip drawing.
const MIN_RADIUS = 18;

function geometryFor(width, height) {
  const cx = width / 2;
  const cy = height * 0.56;
  const outer = Math.min(width / 2, height * 0.52);
  // Keep the arc small enough that zone labels drawn outside it stay on-canvas
  const radius = outer * 0.78;
  return { cx, cy, radius, labelRadius: outer * 0.92 };
}

function drawFace(ctx, width, height) {
  const { cx, cy, radius, labelRadius } = geometryFor(width, height);
  ctx.clearRect(0, 0, width, height);
  if (radius < MIN_RADIUS) return; // stage too small / not measured yet

  // Zone arcs. Cap the band width so an inner arc radius never goes negative
  // on a short stage.
  const zoneWidth = Math.min(Math.max(radius * 0.13, 7), radius * 0.4);
  for (let i = 0; i < TIERS.length; i++) {
    const from = scoreToAngleRad(TIERS[i].min);
    const to = scoreToAngleRad(i + 1 < TIERS.length ? TIERS[i + 1].min : 100);
    ctx.beginPath();
    ctx.arc(cx, cy, radius - zoneWidth / 2, from, to);
    ctx.strokeStyle = TIERS[i].color;
    ctx.globalAlpha = 0.88;
    ctx.lineWidth = zoneWidth;
    ctx.lineCap = 'butt';
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Inner rim
  ctx.beginPath();
  ctx.arc(cx, cy, radius - zoneWidth - 2, scoreToAngleRad(0), scoreToAngleRad(100));
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // On a small gauge (mobile), numeric ticks and zone labels crowd the arc;
  // the tier name shown below the gauge already conveys the zone, so drop them.
  const showText = radius >= 62;

  // Ticks every 10, majors every 20
  for (let score = 0; score <= 100; score += 10) {
    const angle = scoreToAngleRad(score);
    const major = score % 20 === 0;
    const outer = radius - zoneWidth - 4;
    const inner = outer - (major ? radius * 0.09 : radius * 0.05);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
    ctx.lineTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.strokeStyle = major ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)';
    ctx.lineWidth = major ? 2 : 1;
    ctx.stroke();
    if (major && showText) {
      const textRadius = inner - radius * 0.085;
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.font = `${Math.max(9, Math.round(radius * 0.085))}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(score), cx + Math.cos(angle) * textRadius, cy + Math.sin(angle) * textRadius);
    }
  }

  // Zone labels at mid-zone, just outside the arc. Edge labels align inward
  // so they never run off the canvas; the two bottom zones sit below the arc
  // ends instead, where there is free space. A dark outline keeps any label
  // readable even where it brushes the coloured arc.
  if (!showText) return;
  ctx.font = `600 ${Math.max(9, Math.round(radius * 0.1))}px 'Lexend', sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(10, 10, 15, 0.88)';
  ctx.lineJoin = 'round';
  for (let i = 0; i < TIERS.length; i++) {
    const zoneEnd = i + 1 < TIERS.length ? TIERS[i + 1].min : 100;
    const mid = (TIERS[i].min + zoneEnd) / 2;
    const angle = scoreToAngleRad(mid);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    let x, y;
    if (Math.abs(cos) > 0.8 && sin > 0.2) {
      // The sweep is symmetric, so both arc ends share the start angle's
      // |cos| and sin; pick the side matching the zone.
      const endCos = Math.abs(Math.cos(SWEEP_START_DEG * DEG2RAD));
      const endSin = Math.sin(SWEEP_START_DEG * DEG2RAD);
      x = cx + Math.sign(cos) * endCos * radius;
      y = cy + endSin * radius + radius * 0.18;
      ctx.textAlign = 'center';
    } else {
      x = cx + cos * labelRadius;
      y = cy + sin * labelRadius;
      ctx.textAlign = cos < -0.35 ? 'left' : cos > 0.35 ? 'right' : 'center';
    }
    ctx.fillStyle = TIERS[i].color;
    ctx.strokeText(TIERS[i].gauge, x, y);
    ctx.fillText(TIERS[i].gauge, x, y);
  }
}

export function resizeGauge() {
  if (!gauge.canvas) return;
  const rect = gauge.canvas.parentElement.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (width === gauge.width && height === gauge.height) return;

  gauge.width = width;
  gauge.height = height;
  gauge.dpr = dpr;
  gauge.canvas.width = width;
  gauge.canvas.height = height;

  gauge.face = document.createElement('canvas');
  gauge.face.width = width;
  gauge.face.height = height;
  const faceCtx = gauge.face.getContext('2d');
  faceCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawFace(faceCtx, width / dpr, height / dpr);
}

export function renderGauge(now) {
  if (!gauge.ctx || !gauge.face) return;
  const ctx = gauge.ctx;
  const width = gauge.width / gauge.dpr;
  const height = gauge.height / gauge.dpr;
  const { cx, cy, radius } = geometryFor(width, height);

  // Spring-damper needle physics for a lively wobble
  gauge.velocity = gauge.velocity * NEEDLE_DAMPING + (gauge.target - gauge.value) * NEEDLE_SPRING;
  gauge.value = clamp(gauge.value + gauge.velocity, 0, 105);

  ctx.setTransform(gauge.dpr, 0, 0, gauge.dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  if (radius < MIN_RADIUS) return; // stage too small / not measured yet
  ctx.drawImage(gauge.face, 0, 0, width, height);

  const tierColor = TIERS[gauge.tier].color;

  // Danger strobe ring
  if (gauge.danger) {
    const pulse = 0.5 + 0.5 * Math.sin(now / 90);
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 3, scoreToAngleRad(0), scoreToAngleRad(100));
    ctx.strokeStyle = `rgba(255, 92, 92, ${0.25 + 0.55 * pulse})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Needle
  const angle = scoreToAngleRad(clamp(gauge.value, 0, 100));
  const tipX = cx + Math.cos(angle) * (radius - radius * 0.16);
  const tipY = cy + Math.sin(angle) * (radius - radius * 0.16);
  const tailX = cx - Math.cos(angle) * (radius * 0.14);
  const tailY = cy - Math.sin(angle) * (radius * 0.14);

  ctx.save();
  ctx.shadowColor = tierColor;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(tipX, tipY);
  ctx.strokeStyle = tierColor;
  ctx.lineWidth = Math.max(2.5, radius * 0.035);
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();

  // Hub
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(4, radius * 0.07), 0, Math.PI * 2);
  ctx.fillStyle = '#0a0a0f';
  ctx.fill();
  ctx.strokeStyle = tierColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Digital intensity readout under the hub
  ctx.fillStyle = tierColor;
  ctx.font = `700 ${Math.max(14, Math.round(radius * 0.24))}px 'JetBrains Mono', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(String(Math.round(gauge.value)), cx, cy + radius * 0.16);
  ctx.fillStyle = 'rgba(154, 154, 164, 0.75)';
  ctx.font = `600 ${Math.max(8, Math.round(radius * 0.072))}px 'Lexend', sans-serif`;
  ctx.fillText('INTENSITY', cx, cy + radius * 0.42);
}
