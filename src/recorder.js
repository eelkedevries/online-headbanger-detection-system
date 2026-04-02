// MediaPipe Face Landmarker 52 blendshape names (ARKit convention)
const BLENDSHAPE_NAMES = [
  '_neutral',
  'browDownLeft', 'browDownRight', 'browInnerUp', 'browOuterUpLeft', 'browOuterUpRight',
  'cheekPuff', 'cheekSquintLeft', 'cheekSquintRight',
  'eyeBlinkLeft', 'eyeBlinkRight',
  'eyeLookDownLeft', 'eyeLookDownRight', 'eyeLookInLeft', 'eyeLookInRight',
  'eyeLookOutLeft', 'eyeLookOutRight', 'eyeLookUpLeft', 'eyeLookUpRight',
  'eyeSquintLeft', 'eyeSquintRight', 'eyeWideLeft', 'eyeWideRight',
  'jawForward', 'jawLeft', 'jawOpen', 'jawRight',
  'mouthClose', 'mouthDimpleLeft', 'mouthDimpleRight',
  'mouthFrownLeft', 'mouthFrownRight', 'mouthFunnel', 'mouthLeft',
  'mouthLowerDownLeft', 'mouthLowerDownRight',
  'mouthPressLeft', 'mouthPressRight', 'mouthPucker', 'mouthRight',
  'mouthRollLower', 'mouthRollUpper', 'mouthShrugLower', 'mouthShrugUpper',
  'mouthSmileLeft', 'mouthSmileRight', 'mouthStretchLeft', 'mouthStretchRight',
  'mouthUpperUpLeft', 'mouthUpperUpRight',
  'noseSneerLeft', 'noseSneerRight',
];

const EXPR_KEYS = ['neutral', 'happiness', 'sadness', 'fear', 'disgust', 'anger', 'surprise', 'contempt'];

const CSV_HEADERS = [
  'timestamp_ms', 'yaw', 'pitch', 'roll',
  ...BLENDSHAPE_NAMES,
  ...EXPR_KEYS,
  'dominant', 'speed', 'action', 'blink', 'talking', 'yawning', 'quality',
];

let _recording = false;
let _rows = [];

const _recordBtn = document.getElementById('recordBtn');
const _downloadBtn = document.getElementById('downloadBtn');
const _frameCountEl = document.getElementById('recordFrameCount');

export function initRecorder() {
  _recordBtn.addEventListener('click', () => {
    if (_recording) {
      _recording = false;
      _recordBtn.textContent = 'Record';
      _recordBtn.classList.remove('recording');
      _downloadBtn.disabled = _rows.length === 0;
    } else {
      _rows = [];
      _recording = true;
      _recordBtn.textContent = 'Stop recording';
      _recordBtn.classList.add('recording');
      _downloadBtn.disabled = true;
      _frameCountEl.textContent = '0 frames';
    }
  });

  _downloadBtn.addEventListener('click', _downloadCsv);
}

export function isRecording() {
  return _recording;
}

// Called from tracker.js processFrame when pose and blend are available.
export function recordFrame(timestamp, pose, blend, basicExpr, speed, action, blinkState, talkingState, yawningState, qualityScore) {
  if (!_recording) return;
  const dominant = basicExpr?.dominant ?? 'Neutral';

  const values = [
    timestamp.toFixed(1),
    pose.yaw.toFixed(2), pose.pitch.toFixed(2), pose.roll.toFixed(2),
  ];

  for (const name of BLENDSHAPE_NAMES) {
    values.push((blend?.[name] ?? 0).toFixed(4));
  }

  for (const key of EXPR_KEYS) {
    values.push((basicExpr?.[key] ?? 0).toFixed(4));
  }

  values.push(
    dominant,
    speed.toFixed(2),
    action,
    blinkState ? '1' : '0',
    talkingState ? '1' : '0',
    yawningState ? '1' : '0',
    qualityScore.toFixed(3),
  );

  _rows.push(values);
  _frameCountEl.textContent = `${_rows.length} frames`;
}

function _downloadCsv() {
  if (_rows.length === 0) return;

  const lines = [CSV_HEADERS.join(',')];
  for (const row of _rows) {
    lines.push(row.join(','));
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `headtracking_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
