// Load MediaPipe from CDN so Vite does not bundle it — bundling breaks WASM loading.
import { FaceLandmarker, HandLandmarker, PoseLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/vision_bundle.mjs';
import { MODEL_URL, HAND_MODEL_URL, POSE_MODEL_URL, WASM_URL, HAND_UPDATE_INTERVAL_MS, POSE_UPDATE_INTERVAL_MS } from './constants.js';

let fileset = null;
let faceLandmarker = null;
let handLandmarker = null;
let poseLandmarker = null;
let lastHandProcessTime = -Infinity;
let lastPoseProcessTime = -Infinity;
let lastProcessedTimestamp = -Infinity;

let faceDisabled = false;
let handDisabled = false;
let poseDisabled = false;

self.onmessage = async (e) => {
  const msg = e.data;

  if (msg.type === 'init') {
    try {
      fileset = await FilesetResolver.forVisionTasks(WASM_URL);
      faceLandmarker = await FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: 'VIDEO',
        numFaces: 1,
        minFaceDetectionConfidence: 0.5,
        minFacePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
        outputFaceBlendshapes: true,
        outputFacialTransformationMatrixes: true
      });
      self.postMessage({ type: 'ready' });
    } catch (err) {
      self.postMessage({ type: 'error', message: err?.message || String(err) });
    }
    return;
  }

  if (msg.type === 'loadModel') {
    const { model } = msg;
    try {
      if (model === 'hand' && !handLandmarker) {
        handLandmarker = await HandLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: HAND_MODEL_URL },
          runningMode: 'VIDEO',
          numHands: 2,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
      } else if (model === 'pose' && !poseLandmarker) {
        poseLandmarker = await PoseLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: POSE_MODEL_URL },
          runningMode: 'VIDEO',
          numPoses: 1,
          minPoseDetectionConfidence: 0.5,
          minPosePresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
      }
      self.postMessage({ type: 'modelReady', model });
    } catch (err) {
      self.postMessage({ type: 'modelError', model, message: err?.message || String(err) });
    }
    return;
  }

  if (msg.type === 'disableModel') {
    if (msg.model === 'face') faceDisabled = true;
    else if (msg.model === 'hand') handDisabled = true;
    else if (msg.model === 'pose') poseDisabled = true;
    return;
  }

  if (msg.type === 'enableModel') {
    if (msg.model === 'face') faceDisabled = false;
    else if (msg.model === 'hand') handDisabled = false;
    else if (msg.model === 'pose') poseDisabled = false;
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
    let handResult = null;
    let poseResult = null;

    if (!faceDisabled && faceLandmarker) {
      try {
        faceResult = faceLandmarker.detectForVideo(bitmap, timestamp);
      } catch (err) {
        self.postMessage({ type: 'inferenceError', model: 'face', message: err?.message || String(err) });
      }
    }

    if (!handDisabled && handLandmarker && timestamp - lastHandProcessTime >= HAND_UPDATE_INTERVAL_MS) {
      try {
        handResult = handLandmarker.detectForVideo(bitmap, timestamp);
        lastHandProcessTime = timestamp;
      } catch (err) {
        self.postMessage({ type: 'inferenceError', model: 'hand', message: err?.message || String(err) });
      }
    }

    if (!poseDisabled && poseLandmarker && timestamp - lastPoseProcessTime >= POSE_UPDATE_INTERVAL_MS) {
      try {
        poseResult = poseLandmarker.detectForVideo(bitmap, timestamp);
        lastPoseProcessTime = timestamp;
      } catch (err) {
        self.postMessage({ type: 'inferenceError', model: 'pose', message: err?.message || String(err) });
      }
    }

    bitmap.close();
    self.postMessage({ type: 'result', face: faceResult, hand: handResult, pose: poseResult, timestamp });
    return;
  }

  if (msg.type === 'reset') {
    lastHandProcessTime = -Infinity;
    lastPoseProcessTime = -Infinity;
    lastProcessedTimestamp = -Infinity;
  }
};
