export const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
export const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm";

export const RAD2DEG = 180 / Math.PI;
export const DEG2RAD = Math.PI / 180;
export const MAX_RENDER_DPR = typeof window !== 'undefined'
  ? (window.matchMedia('(max-width: 900px)').matches ? 1.25 : 2)
  : 2;

// ── Headbang detection tuning ──────────────────────────────────────────────
export const SIGNAL_WINDOW_MS = 2000;      // analysis window for amplitude/tempo
export const SWING_HYSTERESIS_DEG = 2.5;   // retreat from an extreme that confirms a turning point
export const MAX_FRAME_GAP_MS = 250;       // discard velocity across pauses
export const SWING_MIN_DEGREES = 4;        // peak-to-peak swing that counts as a beat
export const REVERSAL_REFRACTORY_MS = 90;  // per-axis min gap between reversals
export const BANG_MIN_DEGREES = 16;        // swing amplitude for a counted bang
export const BANG_MIN_SPEED = 115;         // °/s peak speed within a bang swing
export const BANG_MIN_INTERVAL_MS = 240;   // global refractory (~250 bpm ceiling)
export const COMBO_TIMEOUT_MS = 2000;      // gap that breaks a bang combo
export const RHYTHM_MIN_BEATS = 3;         // beats in window before "rhythmic"
export const SCORE_SMOOTHING = 0.18;       // per-inference-frame lerp factor

// One-euro filter on the raw head-pose angles. Adaptive low-pass: light
// smoothing when the head is near-still (kills tracker jitter that would
// otherwise fake tiny reversals), effectively transparent once it moves fast
// (so real bangs, ~1.5–3 Hz, pass through with negligible amplitude loss).
// The rest cutoff sits above the bang band on purpose; the speed term lifts it
// far higher during motion. See headbang.js.
export const ONE_EURO_MIN_CUTOFF = 5.0;    // Hz — cutoff at rest
export const ONE_EURO_BETA = 0.4;          // speed coefficient (raises cutoff)
export const ONE_EURO_DCUTOFF = 1.0;       // Hz — cutoff for the speed estimate

// Pitch is the canonical up-down headbang axis, so bias axis dominance towards
// it a little; roll (ear-to-shoulder) and yaw (side-to-side) still count.
export const PITCH_DOMINANCE_BIAS = 1.12;

// Normalisation ceilings for the 0–100 intensity score
export const AMP_NORM_DEGREES = 45;
export const SPEED_NORM_DPS = 350;
export const TEMPO_NORM_BPM = 160;

// Detection banner hysteresis (score thresholds)
export const DETECT_ON_SCORE = 50;
export const DETECT_OFF_SCORE = 42;
export const DETECT_HOLD_MS = 700;

// BMJ (2008) injury-risk heuristic: >75° range at heavy-metal tempo
export const DANGER_AMPLITUDE_DEG = 75;
export const DANGER_BPM = 130;
export const DANGER_SCORE = 88;

// Intensity tiers driving the speedometer, banner and labels.
// `min` is the inclusive lower bound on the 0–100 intensity score.
// Colours follow the eelkedevries.com cosmic palette: a cool iris → warm gold
// → alarm-red ramp (calm to extreme), with a muted grey at rest.
export const TIERS = Object.freeze([
  Object.freeze({ min: 0,  label: 'STANDING STILL',        gauge: 'STILL', color: '#8a8f9c' }),
  Object.freeze({ min: 10, label: 'NODDING',               gauge: 'NOD',   color: '#6ba6e4' }),
  Object.freeze({ min: 30, label: 'VIGOROUS NODDING',      gauge: 'VIG+',  color: '#6fd0c0' }),
  Object.freeze({ min: 50, label: 'LIGHT HEADBANGING',     gauge: 'BANG',  color: '#e8b43a' }),
  Object.freeze({ min: 70, label: 'INTENSIVE HEADBANGING', gauge: 'HARD',  color: '#ef8f3c' }),
  Object.freeze({ min: 88, label: 'TOTAL ANNIHILATION',    gauge: 'MAX',   color: '#e5484d' }),
]);

// Semantic status colours (also from the cosmic palette).
export const COLOR_OK = '#74c081';       // green: headbanging detected
export const COLOR_IDLE = '#e57a7a';     // soft red: no headbanging
export const COLOR_DANGER = '#ff5c5c';   // bright red: neck-hazard zone
export const COLOR_GOLD = '#e8b43a';
export const COLOR_IRIS = '#6ba6e4';

// MediaPipe FACEMESH_FACE_OVAL connector pairs, hardcoded so the main-thread
// bundle does not need to import the full tasks-vision module.
export const FACE_OVAL_CONNECTORS = Object.freeze([
  [10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389],
  [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397],
  [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152],
  [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172],
  [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162],
  [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]
]);

export const LM = {
  noseTip: 1
};
