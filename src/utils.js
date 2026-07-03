export class RingBuffer {
  constructor(capacity) {
    this._buf = new Array(capacity);
    this._cap = capacity;
    this._head = 0;
    this._size = 0;
  }

  push(item) {
    if (this._size < this._cap) {
      this._buf[(this._head + this._size) % this._cap] = item;
      this._size++;
    } else {
      this._buf[this._head] = item;
      this._head = (this._head + 1) % this._cap;
    }
  }

  shift() {
    if (!this._size) return undefined;
    const item = this._buf[this._head];
    this._head = (this._head + 1) % this._cap;
    this._size--;
    return item;
  }

  get length() {
    return this._size;
  }

  first() {
    return this._size ? this._buf[this._head] : undefined;
  }

  last() {
    return this._size ? this._buf[(this._head + this._size - 1) % this._cap] : undefined;
  }

  toArray() {
    const out = new Array(this._size);
    for (let i = 0; i < this._size; i++) {
      out[i] = this._buf[(this._head + i) % this._cap];
    }
    return out;
  }

  clear() {
    this._head = 0;
    this._size = 0;
  }
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(start, end, amount) {
  return start + (end - start) * amount;
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

export function formatDurationMs(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
