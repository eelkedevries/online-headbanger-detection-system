import { MAX_RENDER_DPR, BODY_CONNECTIONS, HAND_CONNECTIONS_UI, AVATAR_JOINTS, DEG2RAD } from './constants.js';
import { avatar3dEl } from './ui.js';

// ── Module-level state ─────────────────────────────────────────────────────
let avatarCanvas = null;
let avatarCtx = null;
let avatarDpr = 1;

// Virtual camera constants matching the former Three.js camera setup:
// position (0, 0.10, 2.25), lookAt (0, 0.15, 0), FOV 32°
const CAM_Z = 2.25;
const CAM_LOOK_Y = 0.15;
const CAM_FOV_RAD = 32 * DEG2RAD;

const MAJOR_JOINTS = new Set([11, 12, 23, 24]);

// ── Initialisation ─────────────────────────────────────────────────────────
export function initAvatar3D() {
  if (!avatar3dEl || avatarCanvas) return;
  avatarCanvas = document.createElement('canvas');
  avatarCanvas.style.cssText = 'width:100%;height:100%;display:block;';
  avatar3dEl.appendChild(avatarCanvas);
  avatarCtx = avatarCanvas.getContext('2d');
  avatarDpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
  resizeAvatar3D();
}

export function resizeAvatar3D() {
  if (!avatarCanvas || !avatar3dEl) return;
  const W = Math.max(1, avatar3dEl.clientWidth);
  const H = Math.max(1, avatar3dEl.clientHeight);
  avatarCanvas.width = W * avatarDpr;
  avatarCanvas.height = H * avatarDpr;
  avatarCanvas.style.width = W + 'px';
  avatarCanvas.style.height = H + 'px';
  drawFrame(null, null, null, null);
}

// ── Perspective projection ─────────────────────────────────────────────────
function getFocalLength(canvasLogicalW) {
  // f maps 1 world unit to pixels at the lookAt plane
  return (canvasLogicalW / 2) / Math.tan(CAM_FOV_RAD / 2);
}

function project(p, cx, cy, f) {
  const dz = CAM_Z - p.z;
  return {
    sx: cx + (p.x * f) / dz,
    sy: cy - ((p.y - CAM_LOOK_Y) * f) / dz
  };
}

// ── Utility helpers ────────────────────────────────────────────────────────
function isFinitePoseLandmark(lm) {
  return lm &&
    Number.isFinite(lm.x) &&
    Number.isFinite(lm.y) &&
    Number.isFinite(lm.z);
}

function averagePoints(points) {
  let x = 0, y = 0, z = 0;
  for (const p of points) { x += p.x; y += p.y; z += p.z; }
  const n = points.length;
  return { x: x / n, y: y / n, z: z / n };
}

function distance3(a, b) {
  const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function getPoseWorldLandmarks(poseResult) {
  return poseResult?.worldLandmarks?.[0] ?? null;
}

function getPoseImageLandmarks(poseResult) {
  return poseResult?.landmarks?.[0] ?? null;
}

function getHandWorldLandmarks(handResult) {
  return handResult?.worldLandmarks ?? [];
}

function getHandednessLabels(handResult) {
  return handResult?.handedness ?? [];
}

function getVisiblePoseAnchor2D(poseLandmarks, primaryIndex, fallbackIndex) {
  const primary = poseLandmarks?.[primaryIndex];
  if (primary && (primary.visibility ?? 1) > 0.25) return primary;
  const fallback = poseLandmarks?.[fallbackIndex];
  if (fallback && (fallback.visibility ?? 1) > 0.25) return fallback;
  return null;
}

// ── Normalisation ──────────────────────────────────────────────────────────
function normalisePoseWorldLandmarks(world) {
  if (!world || !world[11] || !world[12] || !world[23] || !world[24]) return null;
  if (!isFinitePoseLandmark(world[11]) || !isFinitePoseLandmark(world[12]) ||
      !isFinitePoseLandmark(world[23]) || !isFinitePoseLandmark(world[24])) return null;

  const hipCenter = {
    x: (world[23].x + world[24].x) / 2,
    y: (world[23].y + world[24].y) / 2,
    z: (world[23].z + world[24].z) / 2
  };
  const dx = world[11].x - world[12].x;
  const dy = world[11].y - world[12].y;
  const dz = world[11].z - world[12].z;
  const shoulderWidth = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const scale = Math.max(shoulderWidth, 0.08);
  const factor = 0.42;

  return world.map((lm) => {
    if (!isFinitePoseLandmark(lm)) return null;
    return {
      x: ((lm.x - hipCenter.x) / scale) * factor,
      y: -((lm.y - hipCenter.y) / scale) * factor - 0.58,
      z: -((lm.z - hipCenter.z) / scale) * factor
    };
  });
}

function normaliseHandWorldLandmarks(worldLandmarks, anchor) {
  if (!Array.isArray(worldLandmarks) || worldLandmarks.length < 21 || !anchor) return null;
  const wrist = worldLandmarks[0];
  const indexMcp = worldLandmarks[5];
  const pinkyMcp = worldLandmarks[17];
  if (!isFinitePoseLandmark(wrist) || !isFinitePoseLandmark(indexMcp) || !isFinitePoseLandmark(pinkyMcp)) return null;
  const palmWidth = Math.max(distance3(indexMcp, pinkyMcp), 0.025);
  const factor = 0.18;
  return worldLandmarks.map((lm) => {
    if (!isFinitePoseLandmark(lm)) return null;
    return {
      x: anchor.x + ((lm.x - wrist.x) / palmWidth) * factor,
      y: anchor.y - ((lm.y - wrist.y) / palmWidth) * factor,
      z: anchor.z - ((lm.z - wrist.z) / palmWidth) * factor
    };
  });
}

// ── Hand side resolution ───────────────────────────────────────────────────
function resolveAvatarHandSides(handResult, poseResult) {
  const hands = handResult?.landmarks ?? [];
  const handedness = getHandednessLabels(handResult);
  const poseLandmarks = getPoseImageLandmarks(poseResult);
  const assignments = new Array(hands.length).fill(null);

  const poseAnchors = poseLandmarks ? {
    left: getVisiblePoseAnchor2D(poseLandmarks, 15, 11),
    right: getVisiblePoseAnchor2D(poseLandmarks, 16, 12)
  } : { left: null, right: null };

  const candidates = [];
  for (let handIndex = 0; handIndex < hands.length; handIndex += 1) {
    const wrist = hands[handIndex]?.[0];
    if (!wrist) continue;
    // Pose wrists are more reliable than handedness labels when selfie previews are mirrored.
    for (const side of ['left', 'right']) {
      const anchor = poseAnchors[side];
      if (!anchor) continue;
      candidates.push({
        handIndex,
        side,
        distance: Math.hypot((wrist.x - anchor.x) * 1.6, wrist.y - anchor.y)
      });
    }
  }

  candidates.sort((a, b) => a.distance - b.distance);
  const assignedHands = new Set();
  const assignedSides = new Set();
  for (const candidate of candidates) {
    if (assignedHands.has(candidate.handIndex) || assignedSides.has(candidate.side)) continue;
    assignments[candidate.handIndex] = candidate.side;
    assignedHands.add(candidate.handIndex);
    assignedSides.add(candidate.side);
  }

  for (let handIndex = 0; handIndex < hands.length; handIndex += 1) {
    if (assignments[handIndex]) continue;
    const label = handedness?.[handIndex]?.[0]?.categoryName?.toLowerCase?.() ?? '';
    if (label === 'left') { assignments[handIndex] = 'right'; continue; }
    if (label === 'right') { assignments[handIndex] = 'left'; continue; }
    const wrist = hands[handIndex]?.[0];
    assignments[handIndex] = wrist && wrist.x > 0.5 ? 'left' : 'right';
  }

  return assignments;
}

// ── Head drawing ───────────────────────────────────────────────────────────
function drawHead(ctx, sx, sy, screenRadius, facePose, expr) {
  const pitch = facePose ? -facePose.pitch * DEG2RAD : 0;
  const yaw   = facePose ?  facePose.yaw   * DEG2RAD : 0;
  const roll  = facePose ?  facePose.roll  * DEG2RAD : 0;

  const eyeOpen    = expr?.eyeOpen    ?? 1;
  const browRaise  = expr?.browRaise  ?? 0;
  const browFurrow = expr?.browFurrow ?? 0;
  const jawOpen    = expr?.jawOpen    ?? 0;
  const smile      = expr?.smile      ?? 0;
  const lipStretch = expr?.lipStretch ?? 0;
  const noseFlare  = expr?.noseFlare  ?? 0;

  // Foreshortening: yaw compresses horizontal axis, pitch compresses vertical
  const yawFactor   = Math.max(Math.cos(yaw), 0.1);
  const pitchFactor = Math.max(Math.cos(pitch), 0.3);

  // Scale factor: feature offsets in Three.js used 0.15 as the head sphere radius
  const s = screenRadius / 0.15;

  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(roll);

  // Head oval (Three.js head.scale = (0.95, 1.12, 0.92))
  ctx.save();
  ctx.scale(yawFactor, 1);
  ctx.beginPath();
  ctx.ellipse(0, 0, screenRadius * 0.95, screenRadius * 1.12, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#dcecff';
  ctx.fill();
  ctx.restore();

  // Jaw shape (jaw.scale = (0.82, 0.56, 0.74), jawGroup.rotation.x = jawOpen * 0.55)
  if (jawOpen > 0.05) {
    const jawShift = jawOpen * 0.068 * s * pitchFactor;
    ctx.save();
    ctx.scale(yawFactor * 0.82, 1);
    ctx.beginPath();
    ctx.ellipse(0, 0.03 * s + jawShift, screenRadius * 0.95, screenRadius * 0.56, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#d8e7fa';
    ctx.fill();
    ctx.restore();
  }

  // Eyes — (±0.045, 0.018) in Three.js local space; canvas y is inverted
  const eyeXOff = 0.045 * s * yawFactor;
  const eyeY    = -0.018 * s * pitchFactor;
  const eyeRx   = Math.max(0.018 * s * yawFactor, 1);
  const eyeRy   = Math.max(0.012 * (0.25 + eyeOpen * 0.95) * s, 1);
  ctx.fillStyle = '#121826';
  for (const sign of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(sign * eyeXOff, eyeY, eyeRx, eyeRy, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Eyebrows — (±0.048, 0.066) with slight inner-arch tilt
  const browY     = -(0.066 + browRaise * 0.035) * s * pitchFactor;
  const browHalfW = 0.035 * s * yawFactor;
  const tiltSin   = Math.sin(0.12);
  const tiltCos   = Math.cos(0.12);
  ctx.strokeStyle = '#6d7fa0';
  ctx.lineWidth   = Math.max(1.5, 0.008 * s);
  ctx.lineCap     = 'round';
  for (const sign of [-1, 1]) {
    const bx = sign * (0.048 - sign * browFurrow * 0.01) * s * yawFactor;
    // Inner end higher (arch inward): left brow rotation.z = -0.12, right = +0.12
    ctx.beginPath();
    ctx.moveTo(bx - sign * browHalfW * tiltCos, browY + sign * browHalfW * tiltSin);
    ctx.lineTo(bx + sign * browHalfW * tiltCos, browY - sign * browHalfW * tiltSin);
    ctx.stroke();
  }

  // Nose tip dot — small, centred slightly below eye line
  const noseTipY = 0.005 * s * pitchFactor;
  ctx.fillStyle = '#8ea2c3';
  ctx.beginPath();
  ctx.arc(0, noseTipY, Math.max(0.012 * s, 2), 0, Math.PI * 2);
  ctx.fill();

  // Nostrils — (±0.016, -0.03) but note Three.js y: y=-0.03 → canvas +0.03
  const nostrilY = 0.03 * s * pitchFactor;
  const nostrilX = (0.016 + noseFlare * 0.014) * s * yawFactor;
  for (const sign of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(sign * nostrilX, nostrilY, Math.max(0.008 * s, 1.5), 0, Math.PI * 2);
    ctx.fill();
  }

  // Mouth — TorusGeometry(r=0.028) + scale driven by smile/jawOpen
  // Three.js jaw group at y=-0.03, mouth at y=-0.025 within group → net y=-0.055
  // Three.js y = -0.055 → canvas y = +0.055 (below centre)
  const mouthCY = (0.055 + jawOpen * 0.02) * s * pitchFactor;
  const mouthRx = Math.max((0.028 * (1 + smile * 0.55 + lipStretch * 0.25)) * s * yawFactor, 3);
  const mouthRy = Math.max(0.028 * (0.15 + jawOpen * 1.25) * s, 1.5);
  ctx.strokeStyle = '#7c92b3';
  ctx.lineWidth   = Math.max(1.5, 0.008 * s);
  if (jawOpen > 0.08) {
    // Open mouth: filled dark interior + outline ellipse
    ctx.beginPath();
    ctx.ellipse(0, mouthCY, mouthRx, mouthRy, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0d1520';
    ctx.fill();
    ctx.stroke();
  } else {
    // Closed smile: lower-half arc (0 → π draws the bottom semicircle in canvas coords)
    ctx.beginPath();
    ctx.ellipse(0, mouthCY, mouthRx, mouthRy * 2, 0, 0, Math.PI);
    ctx.stroke();
  }

  ctx.restore();
}

// ── Main draw ──────────────────────────────────────────────────────────────
function drawAvatarFrame(ctx, W, H, facePose, poseResult, handResult, expr) {
  ctx.fillStyle = '#0b1118';
  ctx.fillRect(0, 0, W, H);

  // Floor disc (decorative, near bottom)
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = '#0f1722';
  ctx.beginPath();
  ctx.ellipse(W / 2, H * 0.91, W * 0.38, H * 0.045, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const cx = W / 2;
  const cy = H / 2;
  const f  = getFocalLength(W);

  const world  = getPoseWorldLandmarks(poseResult);
  const mapped = normalisePoseWorldLandmarks(world);
  const hasPose = Boolean(world && mapped);

  // Default head position (used when pose is absent)
  let headCenter3d = { x: 0, y: 0.18, z: 0 };

  if (hasPose) {
    // Body bones
    ctx.strokeStyle = '#aed3ff';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.95;
    for (const [a, b] of BODY_CONNECTIONS) {
      const lm1 = world[a], lm2 = world[b];
      const p1  = mapped[a], p2  = mapped[b];
      if (!p1 || !p2) continue;
      if ((lm1?.visibility ?? 1) <= 0.35 || (lm2?.visibility ?? 1) <= 0.35) continue;
      const s1 = project(p1, cx, cy, f);
      const s2 = project(p2, cx, cy, f);
      ctx.beginPath();
      ctx.moveTo(s1.sx, s1.sy);
      ctx.lineTo(s2.sx, s2.sy);
      ctx.stroke();
    }

    // Joint dots
    for (const idx of AVATAR_JOINTS) {
      const lm = world[idx];
      const p  = mapped[idx];
      if (!p || (lm?.visibility ?? 1) <= 0.35) continue;
      const { sx, sy } = project(p, cx, cy, f);
      const isMajor = MAJOR_JOINTS.has(idx);
      const worldR  = isMajor ? 0.03 : 0.018;
      const r = Math.max(worldR * f / (CAM_Z - p.z), 2);
      ctx.fillStyle = isMajor ? '#e5f2ff' : '#9cc9ff';
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Head position and neck
    const leftShoulder  = mapped[11];
    const rightShoulder = mapped[12];
    if (leftShoulder && rightShoulder) {
      const shoulderMid = averagePoints([leftShoulder, rightShoulder]);
      const headAnchor  = (mapped[7] && mapped[8])
        ? averagePoints([mapped[7], mapped[8]])
        : (mapped[0]
            ? { ...mapped[0] }
            : { x: shoulderMid.x, y: shoulderMid.y - 0.28, z: shoulderMid.z });
      headCenter3d = { x: headAnchor.x, y: headAnchor.y + 0.06, z: headAnchor.z };

      const sShoulder  = project(shoulderMid, cx, cy, f);
      const sNeckBase  = project(
        { x: headCenter3d.x, y: headCenter3d.y - 0.11, z: headCenter3d.z },
        cx, cy, f
      );
      ctx.strokeStyle = '#cfe6ff';
      ctx.lineWidth   = 1.5;
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      ctx.moveTo(sShoulder.sx, sShoulder.sy);
      ctx.lineTo(sNeckBase.sx, sNeckBase.sy);
      ctx.stroke();
    }

    // Hands
    const handWorldSets = getHandWorldLandmarks(handResult);
    const handSides     = resolveAvatarHandSides(handResult, poseResult);
    const HAND_COLORS   = { left: '#7df0ad', right: '#8ec5ff' };

    for (let i = 0; i < handWorldSets.length; i += 1) {
      const side = handSides[i];
      if (!side) continue;
      const wristAnchor = side === 'left'
        ? (mapped[15] ?? mapped[13] ?? mapped[11])
        : (mapped[16] ?? mapped[14] ?? mapped[12]);
      const handMapped = normaliseHandWorldLandmarks(handWorldSets[i], wristAnchor);
      if (!handMapped) continue;

      ctx.strokeStyle = HAND_COLORS[side];
      ctx.lineWidth   = 1;
      ctx.globalAlpha = 0.95;
      for (const [a, b] of HAND_CONNECTIONS_UI) {
        const p1 = handMapped[a], p2 = handMapped[b];
        if (!p1 || !p2) continue;
        const s1 = project(p1, cx, cy, f);
        const s2 = project(p2, cx, cy, f);
        ctx.beginPath();
        ctx.moveTo(s1.sx, s1.sy);
        ctx.lineTo(s2.sx, s2.sy);
        ctx.stroke();
      }

      ctx.fillStyle = HAND_COLORS[side];
      for (const p of handMapped) {
        if (!p) continue;
        const { sx, sy } = project(p, cx, cy, f);
        const r = Math.max(0.012 * f / (CAM_Z - p.z), 1.5);
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Head (shown if face or expression data is present)
  const showHead = Boolean(facePose || expr);
  if (showHead) {
    ctx.globalAlpha = 1;
    const { sx: hsx, sy: hsy } = project(headCenter3d, cx, cy, f);
    const screenRadius = 0.15 * f / (CAM_Z - headCenter3d.z);
    drawHead(ctx, hsx, hsy, screenRadius, facePose, expr);
  }

  ctx.globalAlpha = 1;
}

function drawFrame(facePose, poseResult, handResult, expr) {
  if (!avatarCtx || !avatarCanvas) return;
  const W = avatarCanvas.width / avatarDpr;
  const H = avatarCanvas.height / avatarDpr;
  avatarCtx.save();
  avatarCtx.scale(avatarDpr, avatarDpr);
  drawAvatarFrame(avatarCtx, W, H, facePose, poseResult, handResult, expr);
  avatarCtx.restore();
}

// ── Public API ─────────────────────────────────────────────────────────────
export function updateAvatar3D(facePose, poseResult, handResult, expr) {
  drawFrame(facePose, poseResult, handResult, expr);
}
