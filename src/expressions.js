import { clamp, mean, stdDev } from './utils.js';
import {
  EMOTION_EMA_ALPHA,
  NEUTRAL_BASELINE_FRAMES,
  NEUTRAL_THRESHOLD_MIN,
  NEUTRAL_THRESHOLD_MAX,
  LOW_QUALITY_THRESHOLD,
  EMOTION_PROTOTYPES,
  EXPRESSION_FEATURE_FLOOR,
  EXPRESSION_FEATURE_CEILING,
  EXPRESSION_COVERAGE_FLOOR,
  EXPRESSION_SWITCH_MARGIN,
  EXPRESSION_NEUTRAL_MARGIN,
  EXPRESSION_LOW_QUALITY_FLOOR,
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

const BASIC_EXPRESSION_KEYS = ['neutral', 'happiness', 'sadness', 'fear', 'disgust', 'anger', 'surprise', 'contempt'];

// ── Module state for EMA and adaptive neutral threshold ────────────────────
let _emaScores = null;
let _dominantKey = 'neutral';
const _neutralBuffer = new Float32Array(NEUTRAL_BASELINE_FRAMES);
let _neutralBufferIdx = 0;
let _neutralBufferCount = 0;

function _normalizeFeature(value, floor = EXPRESSION_FEATURE_FLOOR, ceiling = EXPRESSION_FEATURE_CEILING) {
  if (!Number.isFinite(value)) return 0;
  return clamp((value - floor) / Math.max(ceiling - floor, 1e-6), 0, 1);
}

function _weightedMean(features, weights) {
  const entries = Object.entries(weights ?? {});
  if (!entries.length) return 0;
  let total = 0;
  let sum = 0;
  for (const [key, weight] of entries) {
    total += weight;
    sum += (features[key] ?? 0) * weight;
  }
  return total > 0 ? sum / total : 0;
}

function _weightedCoverage(features, weights) {
  const entries = Object.entries(weights ?? {});
  if (!entries.length) return 0;
  let total = 0;
  let sum = 0;
  for (const [key, weight] of entries) {
    const activation = features[key] ?? 0;
    const covered = clamp((activation - EXPRESSION_COVERAGE_FLOOR) / Math.max(1 - EXPRESSION_COVERAGE_FLOOR, 1e-6), 0, 1);
    total += weight;
    sum += covered * weight;
  }
  return total > 0 ? sum / total : 0;
}

function _extractEmotionFeatures(blend) {
  const smileLeft = blend.mouthSmileLeft ?? 0;
  const smileRight = blend.mouthSmileRight ?? 0;
  const blink = mean([blend.eyeBlinkLeft ?? 0, blend.eyeBlinkRight ?? 0]);

  return {
    smile: _normalizeFeature(mean([smileLeft, smileRight])),
    smileAsymmetry: _normalizeFeature(Math.abs(smileLeft - smileRight), 0.04, 0.45),
    dimple: _normalizeFeature(mean([blend.mouthDimpleLeft ?? 0, blend.mouthDimpleRight ?? 0]), 0.05, 0.55),
    frown: _normalizeFeature(mean([blend.mouthFrownLeft ?? 0, blend.mouthFrownRight ?? 0]), 0.05, 0.65),
    browInnerUp: _normalizeFeature(blend.browInnerUp ?? 0),
    browOuterUp: _normalizeFeature(mean([blend.browOuterUpLeft ?? 0, blend.browOuterUpRight ?? 0])),
    browDown: _normalizeFeature(mean([blend.browDownLeft ?? 0, blend.browDownRight ?? 0])),
    eyeWide: _normalizeFeature(mean([blend.eyeWideLeft ?? 0, blend.eyeWideRight ?? 0]), 0.05, 0.7),
    squint: _normalizeFeature(mean([blend.eyeSquintLeft ?? 0, blend.eyeSquintRight ?? 0]), 0.05, 0.75),
    lipPress: _normalizeFeature(mean([blend.mouthPressLeft ?? 0, blend.mouthPressRight ?? 0]), 0.05, 0.8),
    lipStretch: _normalizeFeature(mean([blend.mouthStretchLeft ?? 0, blend.mouthStretchRight ?? 0]), 0.05, 0.8),
    jawOpen: _normalizeFeature(blend.jawOpen ?? 0, 0.08, 0.85),
    noseSneer: _normalizeFeature(mean([blend.noseSneerLeft ?? 0, blend.noseSneerRight ?? 0]), 0.04, 0.65),
    upperLipRaise: _normalizeFeature(mean([blend.mouthUpperUpLeft ?? 0, blend.mouthUpperUpRight ?? 0]), 0.05, 0.7),
    lowerShrug: _normalizeFeature(blend.mouthShrugLower ?? 0, 0.05, 0.65),
    cheekRaise: _normalizeFeature(mean([blend.cheekSquintLeft ?? 0, blend.cheekSquintRight ?? 0]), 0.05, 0.7),
    cheekPuff: _normalizeFeature(blend.cheekPuff ?? 0, 0.08, 0.75),
    blink: _normalizeFeature(blink, 0.12, 0.8),
    eyeOpen: clamp(1 - _normalizeFeature(blink, 0.12, 0.8), 0, 1),
    neutralHint: _normalizeFeature(blend._neutral ?? 0, 0.02, 0.8),
  };
}

function _scoreEmotion(features, proto) {
  const evidence = _weightedMean(features, proto.positive);
  const coverage = _weightedCoverage(features, proto.positive);
  const contradiction = _weightedMean(features, proto.suppressors);
  const intensityGate = clamp((evidence - 0.12) / 0.55, 0, 1);
  return clamp(
    evidence * (0.35 + 0.65 * coverage) * intensityGate * (1 - 0.85 * contradiction),
    0,
    1,
  );
}

function _scoreContempt(features) {
  const unilateralSmile = features.smileAsymmetry * clamp(1 - features.smile * 0.55, 0, 1);
  const lipTension = mean([features.lipPress, 1 - features.jawOpen]);
  return clamp(unilateralSmile * (0.75 + 0.25 * lipTension), 0, 1);
}

function _getQualityReliability(qualityScore = 1) {
  if (!Number.isFinite(qualityScore)) return 1;
  return clamp(
    (qualityScore - EXPRESSION_LOW_QUALITY_FLOOR) / Math.max(1 - EXPRESSION_LOW_QUALITY_FLOOR, 1e-6),
    0,
    1,
  );
}

function _scoreNeutral(features, nonNeutralScores) {
  const expressiveLoad = _weightedMean(features, {
    smile: 0.65,
    dimple: 0.2,
    frown: 0.7,
    browInnerUp: 0.45,
    browOuterUp: 0.45,
    browDown: 0.8,
    eyeWide: 0.65,
    squint: 0.55,
    lipPress: 0.55,
    lipStretch: 0.55,
    jawOpen: 0.7,
    noseSneer: 0.55,
    upperLipRaise: 0.35,
    cheekPuff: 0.25,
  });
  const relaxedFace = clamp(
    0.24 * (1 - features.jawOpen) +
    0.18 * (1 - features.browDown) +
    0.16 * (1 - features.frown) +
    0.14 * (1 - features.smile) +
    0.1 * (1 - features.eyeWide) +
    0.1 * (1 - features.squint) +
    0.08 * (1 - features.lipPress),
    0,
    1,
  );
  const activeEmotion = Math.max(...nonNeutralScores, 0);
  return clamp(
    0.48 * (1 - activeEmotion) +
    0.32 * (1 - expressiveLoad) +
    0.12 * relaxedFace +
    0.08 * features.neutralHint,
    0,
    1,
  );
}

function _updateNeutralThresholdBuffer(scores, qualityScore) {
  if (qualityScore < LOW_QUALITY_THRESHOLD) return;
  const frameMax = Math.max(
    scores.happiness,
    scores.sadness,
    scores.fear,
    scores.disgust,
    scores.anger,
    scores.surprise,
    scores.contempt,
  );
  if (frameMax > 0.24) return;
  _neutralBuffer[_neutralBufferIdx] = frameMax;
  _neutralBufferIdx = (_neutralBufferIdx + 1) % NEUTRAL_BASELINE_FRAMES;
  if (_neutralBufferCount < NEUTRAL_BASELINE_FRAMES) _neutralBufferCount++;
}

function _selectDominant(scores) {
  const threshold = getAdaptiveNeutralThreshold();
  const nonNeutralKeys = BASIC_EXPRESSION_KEYS.filter(key => key !== 'neutral');
  let topKey = 'neutral';
  let topScore = -Infinity;
  let secondScore = -Infinity;

  for (const key of nonNeutralKeys) {
    const score = scores[key] ?? 0;
    if (score > topScore) {
      secondScore = topScore;
      topScore = score;
      topKey = key;
    } else if (score > secondScore) {
      secondScore = score;
    }
  }

  let dominant = 'neutral';
  if (
    topScore >= threshold &&
    topScore - secondScore >= EXPRESSION_SWITCH_MARGIN
  ) {
    dominant = topKey;
  }

  if (_dominantKey !== dominant) {
    const previousScore = scores[_dominantKey] ?? 0;
    if (_dominantKey === 'neutral' && dominant !== 'neutral') {
      if ((scores[dominant] ?? 0) < threshold + EXPRESSION_SWITCH_MARGIN) {
        dominant = 'neutral';
      }
    } else if (_dominantKey !== 'neutral' && dominant === 'neutral') {
      if (previousScore >= threshold - EXPRESSION_NEUTRAL_MARGIN) {
        dominant = _dominantKey;
      }
    } else if (_dominantKey !== 'neutral' && dominant !== 'neutral') {
      if ((scores[dominant] ?? 0) < previousScore + EXPRESSION_SWITCH_MARGIN) {
        dominant = _dominantKey;
      }
    }
  }

  _dominantKey = dominant;
  return dominant;
}

function _formatDominantLabel(key) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function deriveBasicExpressions(blend, qualityScore = 1) {
  const features = _extractEmotionFeatures(blend);
  const reliability = _getQualityReliability(qualityScore);
  const reliabilityScale = 0.25 + 0.75 * reliability;

  const rawScores = {
    happiness: _scoreEmotion(features, EMOTION_PROTOTYPES.happiness) * reliabilityScale,
    sadness: _scoreEmotion(features, EMOTION_PROTOTYPES.sadness) * reliabilityScale,
    fear: _scoreEmotion(features, EMOTION_PROTOTYPES.fear) * reliabilityScale,
    disgust: _scoreEmotion(features, EMOTION_PROTOTYPES.disgust) * reliabilityScale,
    anger: _scoreEmotion(features, EMOTION_PROTOTYPES.anger) * reliabilityScale,
    surprise: _scoreEmotion(features, EMOTION_PROTOTYPES.surprise) * reliabilityScale,
    contempt: _scoreContempt(features) * reliabilityScale,
  };
  rawScores.neutral = clamp(_scoreNeutral(features, Object.values(rawScores)) + (1 - reliability) * 0.18, 0, 1);

  if (_emaScores === null) {
    _emaScores = {};
    for (const key of BASIC_EXPRESSION_KEYS) {
      _emaScores[key] = rawScores[key] ?? 0;
    }
  } else {
    const a = EMOTION_EMA_ALPHA;
    const b = 1 - a;
    for (const key of BASIC_EXPRESSION_KEYS) {
      _emaScores[key] = a * (rawScores[key] ?? 0) + b * (_emaScores[key] ?? 0);
    }
  }

  const scores = {};
  for (const key of BASIC_EXPRESSION_KEYS) {
    scores[key] = clamp(_emaScores[key] ?? 0, 0, 1);
  }

  _updateNeutralThresholdBuffer(scores, qualityScore);
  return {
    ...scores,
    dominant: _formatDominantLabel(_selectDominant(scores)),
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
  _dominantKey = 'neutral';
  _neutralBufferIdx = 0;
  _neutralBufferCount = 0;
  // Float32Array already zeroed; _neutralBufferCount sentinel prevents stale reads
}
