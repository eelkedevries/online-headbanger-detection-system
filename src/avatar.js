import * as THREE from 'three';
import { MAX_RENDER_DPR, BODY_CONNECTIONS, HAND_CONNECTIONS_UI, AVATAR_JOINTS } from './constants.js';
import { avatar3dEl } from './ui.js';

// ── Module-level avatar state ──────────────────────────────────────────────
let avatarRenderer = null;
let avatarScene = null;
let avatarCamera = null;
let avatarRoot = null;
let avatarHeadGroup = null;
let avatarFaceParts = null;
let avatarBoneLine = null;
let avatarNeckLine = null;
const avatarHandLines = { left: null, right: null };
const avatarHandJoints = { left: [], right: [] };
const avatarJointMeshes = new Map();

// ── Initialisation ─────────────────────────────────────────────────────────
export function initAvatar3D() {
  if (!avatar3dEl || avatarRenderer) return;

  avatarScene = new THREE.Scene();
  avatarScene.background = new THREE.Color(0x0b1118);

  avatarCamera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
  avatarCamera.position.set(0, 0.10, 2.25);
  avatarCamera.lookAt(0, 0.15, 0);

  avatarRenderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "low-power" });
  avatarRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR));
  avatar3dEl.appendChild(avatarRenderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.82);
  avatarScene.add(ambient);

  const key = new THREE.DirectionalLight(0xbdd8ff, 1.15);
  key.position.set(1.2, 2.0, 2.2);
  avatarScene.add(key);

  const fill = new THREE.DirectionalLight(0x7ab8ff, 0.35);
  fill.position.set(-1.4, 0.5, 1.0);
  avatarScene.add(fill);

  avatarRoot = new THREE.Group();
  avatarScene.add(avatarRoot);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(0.9, 48),
    new THREE.MeshBasicMaterial({ color: 0x0f1722, transparent: true, opacity: 0.65 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.95;
  avatarScene.add(floor);

  const boneGeometry = new THREE.BufferGeometry();
  boneGeometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(BODY_CONNECTIONS.length * 2 * 3), 3));
  avatarBoneLine = new THREE.LineSegments(
    boneGeometry,
    new THREE.LineBasicMaterial({ color: 0xaed3ff, transparent: true, opacity: 0.95 })
  );
  avatarRoot.add(avatarBoneLine);

  const neckGeometry = new THREE.BufferGeometry();
  neckGeometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(2 * 3), 3));
  avatarNeckLine = new THREE.Line(
    neckGeometry,
    new THREE.LineBasicMaterial({ color: 0xcfe6ff, transparent: true, opacity: 0.95 })
  );
  avatarRoot.add(avatarNeckLine);

  const jointGeo = new THREE.SphereGeometry(0.03, 16, 16);
  const majorMat = new THREE.MeshStandardMaterial({ color: 0xe5f2ff, roughness: 0.55, metalness: 0.08 });
  const minorMat = new THREE.MeshStandardMaterial({ color: 0x9cc9ff, roughness: 0.7, metalness: 0.04 });

  for (const idx of AVATAR_JOINTS) {
    const mesh = new THREE.Mesh(jointGeo, [11, 12, 23, 24].includes(idx) ? majorMat : minorMat);
    mesh.visible = false;
    avatarRoot.add(mesh);
    avatarJointMeshes.set(idx, mesh);
  }

  const createHandVisual = (side, color) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(HAND_CONNECTIONS_UI.length * 2 * 3), 3));
    const line = new THREE.LineSegments(
      geo,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 })
    );
    line.visible = false;
    avatarRoot.add(line);
    avatarHandLines[side] = line;

    const joints = [];
    const jointGeoSmall = new THREE.SphereGeometry(0.012, 10, 10);
    const jointMat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.04 });
    for (let i = 0; i < 21; i += 1) {
      const joint = new THREE.Mesh(jointGeoSmall, jointMat);
      joint.visible = false;
      avatarRoot.add(joint);
      joints.push(joint);
    }
    avatarHandJoints[side] = joints;
  };

  createHandVisual("left", 0x7df0ad);
  createHandVisual("right", 0x8ec5ff);

  avatarHeadGroup = new THREE.Group();
  avatarHeadGroup.rotation.order = 'YXZ';
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xdcecff, roughness: 0.45, metalness: 0.06 })
  );
  head.scale.set(0.95, 1.12, 0.92);
  avatarHeadGroup.add(head);

  const eyeGeo = new THREE.SphereGeometry(0.012, 12, 12);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x121826, roughness: 0.4, metalness: 0.1 });
  const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
  const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
  leftEye.position.set(-0.045, 0.018, 0.12);
  rightEye.position.set(0.045, 0.018, 0.12);
  avatarHeadGroup.add(leftEye);
  avatarHeadGroup.add(rightEye);

  const browGeo = new THREE.BoxGeometry(0.07, 0.008, 0.012);
  const browMat = new THREE.MeshStandardMaterial({ color: 0x6d7fa0, roughness: 0.6, metalness: 0.03 });
  const leftBrow = new THREE.Mesh(browGeo, browMat);
  const rightBrow = new THREE.Mesh(browGeo, browMat);
  leftBrow.position.set(-0.048, 0.066, 0.11);
  rightBrow.position.set(0.048, 0.066, 0.11);
  leftBrow.rotation.z = -0.12;
  rightBrow.rotation.z = 0.12;
  avatarHeadGroup.add(leftBrow);
  avatarHeadGroup.add(rightBrow);

  const noseBridge = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.012, 0.06, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0xc8d8ee, roughness: 0.52, metalness: 0.04 })
  );
  noseBridge.position.set(0, -0.005, 0.128);
  noseBridge.rotation.z = Math.PI / 2;
  avatarHeadGroup.add(noseBridge);

  const nostrilGeo = new THREE.SphereGeometry(0.008, 8, 8);
  const nostrilMat = new THREE.MeshStandardMaterial({ color: 0x8ea2c3, roughness: 0.5, metalness: 0.03 });
  const leftNostril = new THREE.Mesh(nostrilGeo, nostrilMat);
  const rightNostril = new THREE.Mesh(nostrilGeo, nostrilMat);
  leftNostril.position.set(-0.016, -0.03, 0.125);
  rightNostril.position.set(0.016, -0.03, 0.125);
  avatarHeadGroup.add(leftNostril);
  avatarHeadGroup.add(rightNostril);

  const jawGroup = new THREE.Group();
  jawGroup.position.set(0, -0.03, 0.02);
  const jaw = new THREE.Mesh(
    new THREE.SphereGeometry(0.108, 20, 20),
    new THREE.MeshStandardMaterial({ color: 0xd8e7fa, roughness: 0.5, metalness: 0.04 })
  );
  jaw.scale.set(0.82, 0.56, 0.74);
  jaw.position.set(0, -0.068, 0.058);
  jawGroup.add(jaw);

  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.028, 0.004, 8, 24, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0x7c92b3, roughness: 0.6, metalness: 0.02 })
  );
  mouth.rotation.x = Math.PI;
  mouth.position.set(0, -0.025, 0.108);
  jawGroup.add(mouth);
  avatarHeadGroup.add(jawGroup);

  avatarFaceParts = { head, leftEye, rightEye, leftBrow, rightBrow, noseBridge, leftNostril, rightNostril, jawGroup, jaw, mouth };
  avatarRoot.add(avatarHeadGroup);
  resizeAvatar3D();
  renderAvatar3D();
}

export function resizeAvatar3D() {
  if (!avatarRenderer || !avatar3dEl || !avatarCamera) return;
  const width = Math.max(1, avatar3dEl.clientWidth);
  const height = Math.max(1, avatar3dEl.clientHeight);
  avatarRenderer.setSize(width, height, false);
  avatarCamera.aspect = width / height;
  avatarCamera.updateProjectionMatrix();
  renderAvatar3D();
}

function renderAvatar3D() {
  if (!avatarRenderer || !avatarScene || !avatarCamera) return;
  avatarRenderer.render(avatarScene, avatarCamera);
}

// ── Utility helpers ────────────────────────────────────────────────────────
function isFinitePoseLandmark(landmark) {
  return landmark &&
    Number.isFinite(landmark.x) &&
    Number.isFinite(landmark.y) &&
    Number.isFinite(landmark.z);
}

function averageThreePoints(points) {
  const out = new THREE.Vector3();
  for (const p of points) out.add(p);
  return out.multiplyScalar(1 / points.length);
}

function distance3(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
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
  if (!isFinitePoseLandmark(world[11]) || !isFinitePoseLandmark(world[12]) || !isFinitePoseLandmark(world[23]) || !isFinitePoseLandmark(world[24])) {
    return null;
  }

  const hipCenter = {
    x: (world[23].x + world[24].x) / 2,
    y: (world[23].y + world[24].y) / 2,
    z: (world[23].z + world[24].z) / 2
  };

  const shoulderDx = world[11].x - world[12].x;
  const shoulderDy = world[11].y - world[12].y;
  const shoulderDz = world[11].z - world[12].z;
  const shoulderWidth = Math.sqrt(shoulderDx * shoulderDx + shoulderDy * shoulderDy + shoulderDz * shoulderDz);

  const scale = Math.max(shoulderWidth, 0.08);
  const factor = 0.42;

  return world.map((landmark) => {
    if (!isFinitePoseLandmark(landmark)) return null;
    return new THREE.Vector3(
      ((landmark.x - hipCenter.x) / scale) * factor,
      -((landmark.y - hipCenter.y) / scale) * factor - 0.58,
      -((landmark.z - hipCenter.z) / scale) * factor
    );
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

  return worldLandmarks.map((landmark) => {
    if (!isFinitePoseLandmark(landmark)) return null;
    return new THREE.Vector3(
      anchor.x + ((landmark.x - wrist.x) / palmWidth) * factor,
      anchor.y - ((landmark.y - wrist.y) / palmWidth) * factor,
      anchor.z - ((landmark.z - wrist.z) / palmWidth) * factor
    );
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
    for (const side of ["left", "right"]) {
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
    const label = handedness?.[handIndex]?.[0]?.categoryName?.toLowerCase?.() ?? "";
    if (label === "left") {
      assignments[handIndex] = "right";
      continue;
    }
    if (label === "right") {
      assignments[handIndex] = "left";
      continue;
    }

    const wrist = hands[handIndex]?.[0];
    assignments[handIndex] = wrist && wrist.x > 0.5 ? "left" : "right";
  }

  return assignments;
}

// ── Avatar visibility helpers ──────────────────────────────────────────────
function hideAvatarHandVisuals(side) {
  if (avatarHandLines[side]) avatarHandLines[side].visible = false;
  avatarHandJoints[side].forEach((joint) => { joint.visible = false; });
}

function hideAvatarRigVisuals() {
  if (avatarBoneLine) avatarBoneLine.visible = false;
  if (avatarNeckLine) avatarNeckLine.visible = false;
  avatarJointMeshes.forEach((mesh) => { mesh.visible = false; });
  hideAvatarHandVisuals("left");
  hideAvatarHandVisuals("right");
}

function getAvatarFallbackHeadCenter() {
  if (avatarHeadGroup?.visible) return avatarHeadGroup.position.clone();
  return new THREE.Vector3(0, 0.18, 0);
}

// ── Head update ────────────────────────────────────────────────────────────
function updateAvatarHead(facePose, expr, headCenter) {
  if (!avatarHeadGroup) return;

  avatarHeadGroup.visible = true;
  avatarHeadGroup.position.copy(headCenter ?? getAvatarFallbackHeadCenter());

  if (facePose) {
    avatarHeadGroup.rotation.set(
      THREE.MathUtils.degToRad(-facePose.pitch),
      THREE.MathUtils.degToRad(facePose.yaw),
      THREE.MathUtils.degToRad(facePose.roll)
    );
  } else {
    avatarHeadGroup.rotation.set(0, 0, 0);
  }

  if (!avatarFaceParts) return;

  const eyeOpen = expr?.eyeOpen ?? 1;
  const browRaise = expr?.browRaise ?? 0;
  const browFurrow = expr?.browFurrow ?? 0;
  const jawOpen = expr?.jawOpen ?? 0;
  const smile = expr?.smile ?? 0;
  const lipStretch = expr?.lipStretch ?? 0;
  const noseFlare = expr?.noseFlare ?? 0;

  avatarFaceParts.leftEye.scale.y = 0.25 + eyeOpen * 0.95;
  avatarFaceParts.rightEye.scale.y = 0.25 + eyeOpen * 0.95;

  avatarFaceParts.leftBrow.position.y = 0.066 + browRaise * 0.035;
  avatarFaceParts.rightBrow.position.y = 0.066 + browRaise * 0.035;
  avatarFaceParts.leftBrow.position.x = -0.048 + browFurrow * 0.01;
  avatarFaceParts.rightBrow.position.x = 0.048 - browFurrow * 0.01;

  avatarFaceParts.leftNostril.position.x = -0.016 - noseFlare * 0.014;
  avatarFaceParts.rightNostril.position.x = 0.016 + noseFlare * 0.014;

  avatarFaceParts.jawGroup.rotation.x = jawOpen * 0.55;
  avatarFaceParts.mouth.scale.x = 1 + smile * 0.55 + lipStretch * 0.25;
  avatarFaceParts.mouth.scale.y = 1 + jawOpen * 1.25;
  avatarFaceParts.mouth.position.y = -0.025 - jawOpen * 0.02;
}

function renderHeadOnlyAvatar(facePose, expr) {
  // Keep face-driven motion visible even when the pose model drops out for a few frames.
  const shouldShowHead = Boolean(facePose || expr);
  avatarRoot.visible = shouldShowHead;
  hideAvatarRigVisuals();
  if (shouldShowHead) {
    updateAvatarHead(facePose, expr, getAvatarFallbackHeadCenter());
  } else if (avatarHeadGroup) {
    avatarHeadGroup.visible = false;
  }
  renderAvatar3D();
}

// ── Hand update ────────────────────────────────────────────────────────────
function updateAvatarHand(side, worldLandmarks, anchor) {
  const line = avatarHandLines[side];
  const joints = avatarHandJoints[side];
  if (!line || !joints) return;

  const mapped = normaliseHandWorldLandmarks(worldLandmarks, anchor);
  if (!mapped) {
    line.visible = false;
    joints.forEach((joint) => { joint.visible = false; });
    return;
  }

  const positions = line.geometry.attributes.position.array;
  let offset = 0;
  for (const [a, b] of HAND_CONNECTIONS_UI) {
    const p1 = mapped[a];
    const p2 = mapped[b];
    if (p1 && p2) {
      positions[offset++] = p1.x;
      positions[offset++] = p1.y;
      positions[offset++] = p1.z;
      positions[offset++] = p2.x;
      positions[offset++] = p2.y;
      positions[offset++] = p2.z;
    } else {
      const fallback = p1 || p2 || anchor;
      positions[offset++] = fallback.x;
      positions[offset++] = fallback.y;
      positions[offset++] = fallback.z;
      positions[offset++] = fallback.x;
      positions[offset++] = fallback.y;
      positions[offset++] = fallback.z;
    }
  }
  line.geometry.attributes.position.needsUpdate = true;
  line.visible = true;

  for (let i = 0; i < joints.length; i += 1) {
    const joint = joints[i];
    const p = mapped[i];
    joint.visible = Boolean(p);
    if (p) joint.position.copy(p);
  }
}

// ── Main avatar update ─────────────────────────────────────────────────────
export function updateAvatar3D(facePose, poseResult, handResult, expr) {
  if (!avatarRoot) return;

  const world = getPoseWorldLandmarks(poseResult);
  const mapped = normalisePoseWorldLandmarks(world);

  if (!world || !mapped) {
    renderHeadOnlyAvatar(facePose, expr);
    return;
  }

  avatarRoot.visible = true;
  avatarBoneLine.visible = true;
  avatarNeckLine.visible = true;

  const bonePositions = avatarBoneLine.geometry.attributes.position.array;
  let offset = 0;
  for (const [a, b] of BODY_CONNECTIONS) {
    const lm1 = world[a];
    const lm2 = world[b];
    const p1 = mapped[a];
    const p2 = mapped[b];
    const visible1 = (lm1?.visibility ?? 1) > 0.35 && p1;
    const visible2 = (lm2?.visibility ?? 1) > 0.35 && p2;

    if (visible1 && visible2) {
      bonePositions[offset++] = p1.x;
      bonePositions[offset++] = p1.y;
      bonePositions[offset++] = p1.z;
      bonePositions[offset++] = p2.x;
      bonePositions[offset++] = p2.y;
      bonePositions[offset++] = p2.z;
    } else {
      const fallback = visible1 ? p1 : (visible2 ? p2 : new THREE.Vector3(0, -0.58, 0));
      bonePositions[offset++] = fallback.x;
      bonePositions[offset++] = fallback.y;
      bonePositions[offset++] = fallback.z;
      bonePositions[offset++] = fallback.x;
      bonePositions[offset++] = fallback.y;
      bonePositions[offset++] = fallback.z;
    }
  }
  avatarBoneLine.geometry.attributes.position.needsUpdate = true;

  for (const idx of AVATAR_JOINTS) {
    const mesh = avatarJointMeshes.get(idx);
    if (!mesh) continue;
    const lm = world[idx];
    const p = mapped[idx];
    mesh.visible = Boolean(p) && (lm?.visibility ?? 1) > 0.35;
    if (mesh.visible) mesh.position.copy(p);
  }

  const leftShoulder = mapped[11];
  const rightShoulder = mapped[12];
  const leftHip = mapped[23];
  const rightHip = mapped[24];

  if (!(leftShoulder && rightShoulder && leftHip && rightHip)) {
    renderHeadOnlyAvatar(facePose, expr);
    return;
  }

  const shoulderMid = averageThreePoints([leftShoulder, rightShoulder]);
  const headAnchor = (mapped[7] && mapped[8])
    ? averageThreePoints([mapped[7], mapped[8]])
    : (mapped[0] ? mapped[0].clone() : shoulderMid.clone().add(new THREE.Vector3(0, -0.28, 0)));

  const headCenter = headAnchor.clone();
  headCenter.y += 0.06;

  updateAvatarHead(facePose, expr, headCenter);

  const neckPositions = avatarNeckLine.geometry.attributes.position.array;
  neckPositions[0] = shoulderMid.x;
  neckPositions[1] = shoulderMid.y;
  neckPositions[2] = shoulderMid.z;
  neckPositions[3] = headCenter.x;
  neckPositions[4] = headCenter.y - 0.11;
  neckPositions[5] = headCenter.z;
  avatarNeckLine.geometry.attributes.position.needsUpdate = true;

  let leftHandSeen = false;
  let rightHandSeen = false;
  const handWorldSets = getHandWorldLandmarks(handResult);
  const handSides = resolveAvatarHandSides(handResult, poseResult);

  for (let i = 0; i < handWorldSets.length; i += 1) {
    const handWorld = handWorldSets[i];
    const side = handSides[i];
    if (!side) continue;
    const wristAnchor = side === "left"
      ? (mapped[15] ?? mapped[13] ?? mapped[11])
      : (mapped[16] ?? mapped[14] ?? mapped[12]);
    updateAvatarHand(side, handWorld, wristAnchor);
    if (side === "left") leftHandSeen = true;
    if (side === "right") rightHandSeen = true;
  }

  if (!leftHandSeen) {
    hideAvatarHandVisuals("left");
  }
  if (!rightHandSeen) {
    hideAvatarHandVisuals("right");
  }

  renderAvatar3D();
}
