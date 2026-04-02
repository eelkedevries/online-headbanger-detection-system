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

export const EMOTION_EMA_ALPHA = 0.22;
export const NEUTRAL_BASELINE_FRAMES = 120;  // ~4s at 30fps
export const NEUTRAL_THRESHOLD_MIN = 0.12;
export const NEUTRAL_THRESHOLD_MAX = 0.42;
export const EXPRESSION_FEATURE_FLOOR = 0.08;
export const EXPRESSION_FEATURE_CEILING = 0.78;
export const EXPRESSION_COVERAGE_FLOOR = 0.24;
export const EXPRESSION_SWITCH_MARGIN = 0.08;
export const EXPRESSION_NEUTRAL_MARGIN = 0.05;
export const EXPRESSION_LOW_QUALITY_FLOOR = 0.32;

// Heuristic blendshape prototypes. Positive channels add evidence for an
// expression; suppressors reduce confidence when a contradictory pattern is
// present. This is intentionally conservative to avoid overcalling emotion.
export const EMOTION_PROTOTYPES = Object.freeze({
  happiness: Object.freeze({
    positive: Object.freeze({ smile: 1.0, cheekRaise: 0.8, dimple: 0.35 }),
    suppressors: Object.freeze({ frown: 0.8, lipPress: 0.45, browDown: 0.35, noseSneer: 0.2 }),
  }),
  sadness: Object.freeze({
    positive: Object.freeze({ browInnerUp: 0.85, frown: 0.95, lowerShrug: 0.45, squint: 0.15 }),
    suppressors: Object.freeze({ smile: 0.9, eyeWide: 0.45, jawOpen: 0.25, cheekRaise: 0.35 }),
  }),
  fear: Object.freeze({
    positive: Object.freeze({ eyeWide: 0.95, browInnerUp: 0.8, browOuterUp: 0.65, lipStretch: 0.7, jawOpen: 0.35 }),
    suppressors: Object.freeze({ smile: 0.6, lipPress: 0.65, squint: 0.55 }),
  }),
  disgust: Object.freeze({
    positive: Object.freeze({ noseSneer: 1.0, upperLipRaise: 0.7, browDown: 0.5, frown: 0.3 }),
    suppressors: Object.freeze({ smile: 0.65, jawOpen: 0.25, eyeWide: 0.2 }),
  }),
  anger: Object.freeze({
    positive: Object.freeze({ browDown: 1.0, lipPress: 0.8, noseSneer: 0.55, squint: 0.45 }),
    suppressors: Object.freeze({ smile: 1.0, browOuterUp: 0.55, browInnerUp: 0.35, eyeWide: 0.55, jawOpen: 0.35 }),
  }),
  surprise: Object.freeze({
    positive: Object.freeze({ browOuterUp: 0.95, browInnerUp: 0.65, eyeWide: 0.9, jawOpen: 0.85 }),
    suppressors: Object.freeze({ squint: 0.6, lipPress: 0.45, frown: 0.25 }),
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
