import { mean, clamp } from './utils.js';

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

export function deriveBasicExpressions(blend) {
  const g = (name) => blend[name] ?? 0;

  // Happiness: bilateral smile + cheek raise (Duchenne marker)
  const happiness = (
    g("mouthSmileLeft") * 0.40 + g("mouthSmileRight") * 0.40 +
    g("cheekSquintLeft") * 0.28 + g("cheekSquintRight") * 0.28
  ) / 1.36;

  // Sadness: inner-brow oblique raise + mouth corners down + lip shrug
  const sadness = (
    g("browInnerUp") * 0.38 + g("mouthFrownLeft") * 0.38 +
    g("mouthFrownRight") * 0.38 + g("mouthShrugLower") * 0.12
  ) / 1.26;

  // Fear: all brows raised + wide eyes + mouth-corner stretch + jaw drop
  const fear = (
    g("browInnerUp") * 0.28 + g("browOuterUpLeft") * 0.20 + g("browOuterUpRight") * 0.20 +
    g("eyeWideLeft") * 0.38 + g("eyeWideRight") * 0.38 +
    g("mouthStretchLeft") * 0.18 + g("mouthStretchRight") * 0.18 +
    g("jawOpen") * 0.12
  ) / 1.92;

  // Disgust: nose wrinkle (sneer) + brow lower + upper-lip raise + mouth corners down
  const disgust = (
    g("noseSneerLeft") * 0.42 + g("noseSneerRight") * 0.42 +
    g("browDownLeft") * 0.18 + g("browDownRight") * 0.18 +
    g("mouthUpperUpLeft") * 0.14 + g("mouthUpperUpRight") * 0.14 +
    g("mouthFrownLeft") * 0.10 + g("mouthFrownRight") * 0.10
  ) / 1.68;

  // Anger: brow lowering + eye squint + nose + lip press
  const anger = (
    g("browDownLeft") * 0.38 + g("browDownRight") * 0.38 +
    g("eyeSquintLeft") * 0.22 + g("eyeSquintRight") * 0.22 +
    g("noseSneerLeft") * 0.14 + g("noseSneerRight") * 0.14 +
    g("mouthPressLeft") * 0.14 + g("mouthPressRight") * 0.14
  ) / 1.76;

  // Surprise: all brows raised + wide eyes + jaw drop
  const surprise = (
    g("browOuterUpLeft") * 0.28 + g("browOuterUpRight") * 0.28 +
    g("browInnerUp") * 0.22 +
    g("eyeWideLeft") * 0.28 + g("eyeWideRight") * 0.28 +
    g("jawOpen") * 0.38
  ) / 1.72;

  // Contempt: unilateral smile asymmetry suppressed when both sides are high (happiness)
  const smileL = g("mouthSmileLeft");
  const smileR = g("mouthSmileRight");
  const smileAsymmetry = Math.abs(smileL - smileR);
  const contempt = clamp(smileAsymmetry * 1.6 * clamp(1 - (smileL + smileR) * 0.75, 0, 1), 0, 1);

  return {
    happiness: clamp(happiness, 0, 1),
    sadness:   clamp(sadness,   0, 1),
    fear:      clamp(fear,      0, 1),
    disgust:   clamp(disgust,   0, 1),
    anger:     clamp(anger,     0, 1),
    surprise:  clamp(surprise,  0, 1),
    contempt
  };
}
