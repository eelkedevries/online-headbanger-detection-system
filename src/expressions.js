import { clamp, mean, stdDev } from './utils.js';
import {
  EMOTION_EMA_ALPHA,
  NEUTRAL_BASELINE_FRAMES,
  NEUTRAL_THRESHOLD_MIN,
  NEUTRAL_THRESHOLD_MAX,
  EMOTION_PROTOTYPES,
} from './constants.js';

export function getBlendshapeMap(result) {
  const categories = result?.faceBlendshapes?.[0]?.categories ?? [];
  return Object.fromEntries(categories.map(item => [item.categoryName, item.score]));
}

export function deriveExpressions(blend) {
  const blink = mean([blend.eyeBlinkLeft ?? 0, blend.eyeBlinkRight ?? 0]);
  const eyeOpen = 1 - blink;
  const browRaise = mean([blend.browInnerUp ?? 0, blend.browOuterUpLeft ?? 0, blend.browOuterUpRight ?? 0]);
  const browFurrow = mean([blend.browDownLeft ?? 0, blend.browDownRight ?? 0]);
  const smile = mean([blend.mouthSmileLeft ?? 0, blend.mouthSmileRight ?? 0]);
  const lipPress = mean([blend.mouthPressLeft ?? 0, blend.mouthPressRight ?? 0]);
  const lipStretch = mean([blend.mouthStretchLeft ?? 0, blend.mouthStretchRight ?? 0]);
  const cheekPuff = blend.cheekPuff ?? 0;
  const jawOpen = blend.jawOpen ?? 0;
  const noseFlare = mean([blend.noseSneerLeft ?? 0, blend.noseSneerRight ?? 0]);
  const squint = mean([blend.eyeSquintLeft ?? 0, blend.eyeSquintRight ?? 0]);
  return { blink, eyeOpen, browRaise, browFurrow, smile, lipPress, lipStretch, cheekPuff, jawOpen, noseFlare, squint };
}

// ── Module state for EMA and adaptive neutral threshold ────────────────────
let _emaScores = null;
const _neutralBuffer = new Float32Array(NEUTRAL_BASELINE_FRAMES);
let _neutralBufferIdx = 0;
let _neutralBufferCount = 0;

// Focused cosine similarity: projects onto the prototype's non-zero subspace.
// Ignores unrelated blendshapes so eye-gaze noise etc. doesn't dilute scores.
function _cosineSim(blend, proto) {
  let dot = 0;
  let liveMagSq = 0;
  for (const [name, protoVal] of Object.entries(proto.weights)) {
    const v = blend[name] ?? 0;
    dot += v * protoVal;
    liveMagSq += v * v;
  }
  const liveMag = Math.sqrt(liveMagSq);
  if (liveMag === 0 || proto.magnitude === 0) return 0;
  return dot / (liveMag * proto.magnitude);
}

export function deriveBasicExpressions(blend) {
  const rawH  = _cosineSim(blend, EMOTION_PROTOTYPES.happiness);
  const rawSa = _cosineSim(blend, EMOTION_PROTOTYPES.sadness);
  const rawF  = _cosineSim(blend, EMOTION_PROTOTYPES.fear);
  const rawD  = _cosineSim(blend, EMOTION_PROTOTYPES.disgust);
  const rawA  = _cosineSim(blend, EMOTION_PROTOTYPES.anger);
  const rawSu = _cosineSim(blend, EMOTION_PROTOTYPES.surprise);

  if (_emaScores === null) {
    _emaScores = { happiness: rawH, sadness: rawSa, fear: rawF, disgust: rawD, anger: rawA, surprise: rawSu };
  } else {
    const a = EMOTION_EMA_ALPHA;
    const b = 1 - a;
    _emaScores.happiness = a * rawH  + b * _emaScores.happiness;
    _emaScores.sadness   = a * rawSa + b * _emaScores.sadness;
    _emaScores.fear      = a * rawF  + b * _emaScores.fear;
    _emaScores.disgust   = a * rawD  + b * _emaScores.disgust;
    _emaScores.anger     = a * rawA  + b * _emaScores.anger;
    _emaScores.surprise  = a * rawSu + b * _emaScores.surprise;
  }

  // Track peak activation per frame for adaptive neutral threshold
  const frameMax = Math.max(
    _emaScores.happiness, _emaScores.sadness, _emaScores.fear,
    _emaScores.disgust, _emaScores.anger, _emaScores.surprise,
  );
  _neutralBuffer[_neutralBufferIdx] = frameMax;
  _neutralBufferIdx = (_neutralBufferIdx + 1) % NEUTRAL_BASELINE_FRAMES;
  if (_neutralBufferCount < NEUTRAL_BASELINE_FRAMES) _neutralBufferCount++;

  // Contempt: unchanged asymmetry formula (unilateral smile suppressed when bilateral)
  const smileL = blend.mouthSmileLeft  ?? 0;
  const smileR = blend.mouthSmileRight ?? 0;
  const smileAsymmetry = Math.abs(smileL - smileR);
  const contempt = clamp(smileAsymmetry * 1.6 * clamp(1 - (smileL + smileR) * 0.75, 0, 1), 0, 1);

  return {
    happiness: clamp(_emaScores.happiness, 0, 1),
    sadness:   clamp(_emaScores.sadness,   0, 1),
    fear:      clamp(_emaScores.fear,      0, 1),
    disgust:   clamp(_emaScores.disgust,   0, 1),
    anger:     clamp(_emaScores.anger,     0, 1),
    surprise:  clamp(_emaScores.surprise,  0, 1),
    contempt,
  };
}

export function getAdaptiveNeutralThreshold() {
  if (_neutralBufferCount === 0) return NEUTRAL_THRESHOLD_MIN;
  const filled = _neutralBuffer.subarray(0, _neutralBufferCount);
  const m = mean(filled);
  return clamp(m + stdDev(filled, m), NEUTRAL_THRESHOLD_MIN, NEUTRAL_THRESHOLD_MAX);
}

export function resetExpressionState() {
  _emaScores = null;
  _neutralBufferIdx = 0;
  _neutralBufferCount = 0;
  // Float32Array already zeroed; _neutralBufferCount sentinel prevents stale reads
}
