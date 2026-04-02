import { FaceLandmarker, HandLandmarker, PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { MODEL_URL, HAND_MODEL_URL, POSE_MODEL_URL, WASM_URL, HAND_UPDATE_INTERVAL_MS, POSE_UPDATE_INTERVAL_MS } from './constants.js';

let fileset = null;
let faceLandmarker = null;
let handLandmarker = null;
let poseLandmarker = null;
let lastHandProcessTime = -Infinity;
let lastPoseProcessTime = -Infinity;
let lastProcessedTimestamp = -Infinity;

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

  if (msg.type === 'frame') {
    const { bitmap, timestamp } = msg;

    // Guard against out-of-order or duplicate timestamps
    if (timestamp <= lastProcessedTimestamp) {
      bitmap.close();
      return;
    }
    lastProcessedTimestamp = timestamp;

    try {
      const faceResult = faceLandmarker.detectForVideo(bitmap, timestamp);

      let handResult = null;
      if (handLandmarker && timestamp - lastHandProcessTime >= HAND_UPDATE_INTERVAL_MS) {
        handResult = handLandmarker.detectForVideo(bitmap, timestamp);
        lastHandProcessTime = timestamp;
      }

      let poseResult = null;
      if (poseLandmarker && timestamp - lastPoseProcessTime >= POSE_UPDATE_INTERVAL_MS) {
        poseResult = poseLandmarker.detectForVideo(bitmap, timestamp);
        lastPoseProcessTime = timestamp;
      }

      bitmap.close();
      self.postMessage({ type: 'result', face: faceResult, hand: handResult, pose: poseResult, timestamp });
    } catch (err) {
      bitmap.close();
      self.postMessage({ type: 'inferenceError', message: err?.message || String(err) });
    }
    return;
  }

  if (msg.type === 'reset') {
    lastHandProcessTime = -Infinity;
    lastPoseProcessTime = -Infinity;
    lastProcessedTimestamp = -Infinity;
  }
};
