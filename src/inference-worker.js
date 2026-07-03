// Load MediaPipe from CDN so Vite does not bundle it — bundling breaks WASM loading.
import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/vision_bundle.mjs';
import { MODEL_URL, WASM_URL } from './constants.js';

// Module workers don't support importScripts(), so MediaPipe falls back to
// self.import(). Polyfill it using fetch + indirect eval so the loaded WASM
// loader script runs in the global scope (var ModuleFactory lands on self).
if (typeof self.import === 'undefined') {
  self.import = async (url) => {
    const res = await fetch(url);
    const text = await res.text();
    globalThis.eval(text); // indirect eval: global scope, non-strict — var becomes self.ModuleFactory
  };
}

let faceLandmarker = null;
let lastProcessedTimestamp = -Infinity;
let faceDisabled = false;

self.onmessage = async (e) => {
  const msg = e.data;

  if (msg.type === 'init') {
    try {
      const fileset = await FilesetResolver.forVisionTasks(WASM_URL);
      faceLandmarker = await FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: 'VIDEO',
        numFaces: 1,
        minFaceDetectionConfidence: 0.5,
        minFacePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: true
      });
      self.postMessage({ type: 'ready' });
    } catch (err) {
      self.postMessage({ type: 'error', message: err?.message || String(err) });
    }
    return;
  }

  if (msg.type === 'disableModel') {
    faceDisabled = true;
    return;
  }

  if (msg.type === 'enableModel') {
    faceDisabled = false;
    return;
  }

  if (msg.type === 'frame') {
    const { bitmap, timestamp } = msg;

    // Guard against out-of-order or duplicate timestamps
    if (timestamp <= lastProcessedTimestamp) {
      bitmap.close();
      return;
    }
    lastProcessedTimestamp = timestamp;

    let faceResult = null;
    if (!faceDisabled && faceLandmarker) {
      try {
        faceResult = faceLandmarker.detectForVideo(bitmap, timestamp);
      } catch (err) {
        self.postMessage({ type: 'inferenceError', message: err?.message || String(err) });
      }
    }

    bitmap.close();
    self.postMessage({ type: 'result', face: faceResult, timestamp });
    return;
  }

  if (msg.type === 'reset') {
    lastProcessedTimestamp = -Infinity;
  }
};
