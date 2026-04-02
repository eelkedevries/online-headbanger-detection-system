export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

export function mean(values) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

export function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export function describeCameraError(error) {
  switch (error?.name) {
    case "NotAllowedError":
      return "Camera access was blocked. Allow camera access in the browser and try again.";
    case "NotFoundError":
      return "No camera was found on this device.";
    case "NotReadableError":
      return "The camera is already in use by another app or browser tab.";
    case "OverconstrainedError":
      return "The requested camera settings were not available on this device.";
    case "SecurityError":
      return "Camera access is only available in a secure browser context.";
    case "AbortError":
      return "Camera start was interrupted before the stream became ready.";
    default:
      return error?.message || "Unknown camera error.";
  }
}

export function formatAngle(value) {
  return `${value >= 0 ? "" : "-"}${Math.abs(value).toFixed(1)}°`;
}

export function formatPct01(value) {
  return `${Math.round(clamp(value, 0, 1) * 100)}%`;
}

export function formatDurationMs(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatSignedCm(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)} cm`;
}

export function averageNormalizedPoint(landmarks, indices) {
  let x = 0;
  let y = 0;
  let count = 0;
  for (const idx of indices) {
    const point = landmarks[idx];
    if (!point) continue;
    x += point.x;
    y += point.y;
    count += 1;
  }
  return count ? { x: x / count, y: y / count } : null;
}
