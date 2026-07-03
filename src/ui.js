import { TIERS } from './constants.js';
import { formatDurationMs } from './utils.js';

// ── Element references ─────────────────────────────────────────────────────
export const video = document.getElementById('video');
export const overlayCanvas = document.getElementById('overlayCanvas');
export const gaugeCanvas = document.getElementById('gaugeCanvas');
export const cameraBtn = document.getElementById('cameraBtn');
export const statusLine = document.getElementById('statusLine');
export const trackChip = document.getElementById('trackChip');
export const fpsChip = document.getElementById('fpsChip');
export const banner = document.getElementById('banner');
export const bannerText = document.getElementById('bannerText');
export const bangCountEl = document.getElementById('bangCount');
export const tierLabelEl = document.getElementById('tierLabel');
export const dangerNoteEl = document.getElementById('dangerNote');
export const toastEl = document.getElementById('toast');

const statEls = {
  bpm: document.getElementById('statBpm'),
  amplitude: document.getElementById('statAmp'),
  speed: document.getElementById('statSpeed'),
  style: document.getElementById('statStyle'),
  combo: document.getElementById('statCombo'),
  bestCombo: document.getElementById('statBestCombo'),
  bangsPerMinute: document.getElementById('statBangsMin'),
  time: document.getElementById('statTime')
};

// ── Text update throttle (keep DOM writes off the per-frame hot path) ──────
const TEXT_UPDATE_INTERVAL_MS = 150;
let _lastTextUpdate = -Infinity;
let _textUpdateDue = false;

export function tickTextThrottle(now) {
  _textUpdateDue = now - _lastTextUpdate >= TEXT_UPDATE_INTERVAL_MS;
  if (_textUpdateDue) _lastTextUpdate = now;
}

export function isTextUpdateDue() {
  return _textUpdateDue;
}

export function forceTextUpdate() {
  _textUpdateDue = true;
  _lastTextUpdate = -Infinity;
}

// ── Status line ────────────────────────────────────────────────────────────
export function setStatus(text, kind = 'info') {
  statusLine.textContent = text;
  statusLine.dataset.kind = kind;
}

// ── Camera button ──────────────────────────────────────────────────────────
export function setCameraButton(running, disabled = false) {
  cameraBtn.disabled = disabled;
  cameraBtn.textContent = running ? '■ STOP CAMERA' : '▶ START CAMERA';
  cameraBtn.classList.toggle('running', running);
  document.body.classList.toggle('cam-on', running); // gates the LIVE chip
}

// ── Video chips ────────────────────────────────────────────────────────────
let _lastHasFace = null;
export function updateTrackingChip(hasFace) {
  if (hasFace === _lastHasFace) return;
  _lastHasFace = hasFace;
  trackChip.textContent = hasFace ? '◉ TARGET LOCKED' : '○ NO TARGET';
  trackChip.classList.toggle('locked', hasFace);
}

export function updateFpsChip(fps) {
  if (!isTextUpdateDue()) return;
  fpsChip.textContent = `${Math.round(fps)} FPS`;
}

export function resetVideoChips() {
  _lastHasFace = null;
  fpsChip.textContent = '0 FPS';
  trackChip.textContent = '○ NO TARGET';
  trackChip.classList.remove('locked');
}

// ── Detection banner ───────────────────────────────────────────────────────
let _lastBannerState = '';
export function updateBanner(snapshot) {
  const nextState = snapshot.danger ? 'danger' : snapshot.detected ? 'detected' : 'idle';
  if (nextState === _lastBannerState) return;
  _lastBannerState = nextState;
  banner.classList.toggle('detected', nextState !== 'idle');
  banner.classList.toggle('danger', nextState === 'danger');
  bannerText.textContent = nextState === 'idle' ? 'NO HEADBANGING DETECTED' : 'HEADBANGING DETECTED';
  document.body.classList.toggle('danger-mode', nextState === 'danger');
}

export function resetBannerState() {
  _lastBannerState = '';
}

// ── Counter ────────────────────────────────────────────────────────────────
export function updateCounter(count) {
  const text = String(count);
  if (bangCountEl.textContent !== text) bangCountEl.textContent = text;
}

export function popCounter() {
  bangCountEl.classList.remove('pop');
  void bangCountEl.offsetWidth; // restart the pop animation
  bangCountEl.classList.add('pop');
}

// ── Tier label under the gauge ─────────────────────────────────────────────
let _lastTier = -1;
let _lastDanger = null;
export function updateTier(tier, danger) {
  if (tier === _lastTier && danger === _lastDanger) return;
  _lastTier = tier;
  _lastDanger = danger;
  tierLabelEl.textContent = TIERS[tier].label;
  tierLabelEl.style.color = TIERS[tier].color;
  dangerNoteEl.classList.toggle('visible', danger);
}

// ── Stats grid ─────────────────────────────────────────────────────────────
export function updateStats(snapshot, sessionStartTime, now) {
  if (!isTextUpdateDue()) return;
  statEls.bpm.textContent = snapshot.bpm > 0 ? `${Math.round(Math.min(snapshot.bpm, 300))}` : '–';
  statEls.amplitude.textContent = `${snapshot.amplitude.toFixed(0)}°`;
  statEls.speed.textContent = `${snapshot.peakSpeed.toFixed(0)}°/s`;
  statEls.style.textContent = snapshot.style;
  statEls.combo.textContent = `×${snapshot.combo}`;
  statEls.bestCombo.textContent = `×${snapshot.bestCombo}`;
  statEls.bangsPerMinute.textContent = String(snapshot.bangsPerMinute);
  statEls.time.textContent = sessionStartTime != null ? formatDurationMs(now - sessionStartTime) : '0:00';
}

// ── Hype toasts ────────────────────────────────────────────────────────────
const COMBO_MILESTONES = new Map([
  [10, '🤘 10 BANG COMBO — STAY METAL'],
  [25, '🔥 25 COMBO — THE PIT APPROVES'],
  [50, '⚡ 50 COMBO — ABSOLUTE UNIT'],
  [100, '☠ 100 COMBO — SEEK A CHIROPRACTOR'],
]);
const COUNT_MILESTONES = new Map([
  [1, 'FIRST BLOOD 🤘'],
  [50, '50 BANGS — CERTIFIED HEADBANGER'],
  [100, '100 BANGS — HALL OF FAME'],
  [500, '500 BANGS — MEDICALLY INADVISABLE'],
]);

export function showToast(text) {
  toastEl.textContent = text;
  toastEl.classList.remove('show');
  void toastEl.offsetWidth;
  toastEl.classList.add('show');
}

export function onBang(snapshot) {
  popCounter();
  const countMsg = COUNT_MILESTONES.get(snapshot.count);
  const comboMsg = COMBO_MILESTONES.get(snapshot.combo);
  if (countMsg) showToast(countMsg);
  else if (comboMsg) showToast(comboMsg);
}
