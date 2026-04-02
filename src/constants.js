export const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
export const HAND_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
export const POSE_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";
export const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm";

export const RAD2DEG = 180 / Math.PI;
export const DEG2RAD = Math.PI / 180;
export const MAX_BAR_ANGLE = 180;
export const MAX_DISTANCE_DELTA_CM = 20;
export const DEFAULT_CAMERA_HORIZONTAL_FOV_DEG = 60;
export const HISTORY_WINDOW_MS = 10000;
export const MOTION_WINDOW_MS = 8000;
export const MOVING_THRESHOLD = 18;
export const HEADBANG_SPEED_THRESHOLD = 110;
export const HAND_UPDATE_INTERVAL_MS = 140;
export const POSE_UPDATE_INTERVAL_MS = 100;
export const HAND_TEXT_UPDATE_INTERVAL_MS = 180;
export const HEAD_CROP_SMOOTHING = 0.34;
export const JAW_HISTORY_MS = 2000;
export const TALKING_RANGE_THRESHOLD = 0.18;
export const TALKING_MIN_MEAN = 0.04;
export const YAWN_OPEN_THRESHOLD = 0.52;
export const YAWN_SUSTAINED_MS = 1800;
export const LOW_QUALITY_THRESHOLD = 0.5;
export const CALIB_FRAMES_TARGET = 30;
export const CALIB_JITTER_MAX = 0.001;  // Frobenius‖²; rejects frames above ~10°/s at 30 fps
export const MAX_RENDER_DPR = typeof window !== 'undefined'
  ? (window.matchMedia('(max-width: 900px)').matches ? 1.25 : 2)
  : 2;

export const EMOTION_EMA_ALPHA = 0.3;
export const NEUTRAL_BASELINE_FRAMES = 90;  // ~3s at 30fps
export const NEUTRAL_THRESHOLD_MIN = 0.05;
export const NEUTRAL_THRESHOLD_MAX = 0.30;

// Sparse FACS AU–to–blendshape prototype vectors for cosine similarity.
// weights: blendshape activations that define the emotion at full expression.
// magnitude: precomputed L2 norm over the non-zero entries (used in _cosineSim).
export const EMOTION_PROTOTYPES = Object.freeze({
  happiness: Object.freeze({
    weights: Object.freeze({ mouthSmileLeft:1.0, mouthSmileRight:1.0, cheekSquintLeft:0.7, cheekSquintRight:0.7, mouthDimpleLeft:0.3, mouthDimpleRight:0.3 }),
    magnitude: Math.hypot(1.0, 1.0, 0.7, 0.7, 0.3, 0.3),
  }),
  sadness: Object.freeze({
    weights: Object.freeze({ browInnerUp:1.0, mouthFrownLeft:0.8, mouthFrownRight:0.8, mouthShrugLower:0.4, eyeSquintLeft:0.3, eyeSquintRight:0.3 }),
    magnitude: Math.hypot(1.0, 0.8, 0.8, 0.4, 0.3, 0.3),
  }),
  fear: Object.freeze({
    weights: Object.freeze({ browInnerUp:0.9, browOuterUpLeft:0.7, browOuterUpRight:0.7, eyeWideLeft:1.0, eyeWideRight:1.0, mouthStretchLeft:0.6, mouthStretchRight:0.6, jawOpen:0.4 }),
    magnitude: Math.hypot(0.9, 0.7, 0.7, 1.0, 1.0, 0.6, 0.6, 0.4),
  }),
  disgust: Object.freeze({
    weights: Object.freeze({ noseSneerLeft:1.0, noseSneerRight:1.0, browDownLeft:0.5, browDownRight:0.5, mouthUpperUpLeft:0.5, mouthUpperUpRight:0.5, mouthFrownLeft:0.3, mouthFrownRight:0.3 }),
    magnitude: Math.hypot(1.0, 1.0, 0.5, 0.5, 0.5, 0.5, 0.3, 0.3),
  }),
  anger: Object.freeze({
    weights: Object.freeze({ browDownLeft:1.0, browDownRight:1.0, eyeSquintLeft:0.6, eyeSquintRight:0.6, noseSneerLeft:0.4, noseSneerRight:0.4, mouthPressLeft:0.5, mouthPressRight:0.5 }),
    magnitude: Math.hypot(1.0, 1.0, 0.6, 0.6, 0.4, 0.4, 0.5, 0.5),
  }),
  surprise: Object.freeze({
    weights: Object.freeze({ browOuterUpLeft:1.0, browOuterUpRight:1.0, browInnerUp:0.8, eyeWideLeft:0.9, eyeWideRight:0.9, jawOpen:1.0 }),
    magnitude: Math.hypot(1.0, 1.0, 0.8, 0.9, 0.9, 1.0),
  }),
});

export const BODY_CONNECTIONS = [
  [11, 12],
  [11, 13], [13, 15],
  [12, 14], [14, 16],
  [11, 23], [12, 24],
  [23, 24],
  [23, 25], [25, 27], [27, 31],
  [24, 26], [26, 28], [28, 32]
];

export const HAND_CONNECTIONS_UI = Object.freeze([
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]
]);

export const POSE_CONNECTIONS_UI = Object.freeze([
  [0, 1], [1, 2], [2, 3], [3, 7],
  [0, 4], [4, 5], [5, 6], [6, 8],
  [9, 10],
  [11, 12],
  [11, 13], [13, 15],
  [15, 17], [15, 19], [15, 21], [17, 19],
  [12, 14], [14, 16],
  [16, 18], [16, 20], [16, 22], [18, 20],
  [11, 23], [12, 24], [23, 24],
  [23, 25], [24, 26],
  [25, 27], [26, 28],
  [27, 29], [28, 30],
  [29, 31], [30, 32],
  [27, 31], [28, 32]
]);

export const AVATAR_JOINTS = [0, 7, 8, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28, 31, 32];

export const LM = {
  noseTip: 1,
  mouthLeft: 61,
  mouthRight: 291,
  mouthTop: 13,
  mouthBottom: 14,
  leftEyeOuter: 33,
  leftEyeInner: 133,
  leftEyeTop: 159,
  leftEyeBottom: 145,
  rightEyeOuter: 362,
  rightEyeInner: 263,
  rightEyeTop: 386,
  rightEyeBottom: 374,
  leftBrow: [70, 63, 105, 66, 107],
  rightBrow: [336, 296, 334, 293, 300],
  leftIris: [468, 469, 470, 471, 472],
  rightIris: [473, 474, 475, 476, 477]
};
