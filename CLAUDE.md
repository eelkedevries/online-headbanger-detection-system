# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project summary
Static client-side webcam app: a real-time **headbang detection console**. MediaPipe Face Landmarker (in a Web Worker) tracks head pose; the app analyses pitch/yaw oscillation to classify intensity (nodding → vigorous nodding → light headbanging → intensive headbanging), counts individual headbangs, and shows it all on a single-viewport dashboard with a speedometer-style gauge. Runs entirely in the browser, served as static files at https://eelkedevries.com/online-headbanger-detection-system/ — no server, no backend, no dynamic hosting. Models load from Google/jsdelivr CDNs. It is a deliberately tongue-in-cheek experiment, not a scientific instrument.

## Commands
```bash
npm run dev       # start Vite dev server (hot reload)
npm run build     # build to dist/ for static deployment
npm run preview   # serve the dist/ output locally
```

No linter or test runner is configured. This is a static browser app — manual browser testing is the primary validation method.

## Deployment
`vite.config.js` sets `base: './'` for relative asset paths, so the build works from any subfolder. A push to `main` triggers `.github/workflows/deploy-site.yml`, which builds `dist/` and rsyncs it over SSH into the `/online-headbanger-detection-system/` subfolder of the eelkedevries.com document root. The required repository secrets are listed in the workflow header; `scripts/setup-deploy-secrets.sh` sets them via the GitHub CLI.

## Architecture
The app targets Android Chrome and desktop browsers. MediaPipe inference is offloaded to a Web Worker to avoid blocking the main thread. The whole UI is one viewport-locked page (no scrolling).

### Data flow
1. **`src/inference-worker.js`** — Web Worker holding the MediaPipe Face Landmarker. Receives `{type:'frame', bitmap, timestamp}` messages, runs face detection (landmarks + facial transformation matrix; blendshapes disabled), posts results back.
2. **`src/tracker.js`** — Main-thread render loop. Sends `ImageBitmap` frames to the worker at inference rate, receives results, and on each rAF tick derives head-pose Euler angles, feeds the detection engine, and drives the overlay/gauge/UI updates. Owns `state` and `trackingVars`.
3. **`src/main.js`** — Entry point. Camera start/stop, worker init, resize/visibility listeners, and the always-running gauge render loop.

### Module responsibilities
| File | Responsibility |
|---|---|
| `src/constants.js` | Model URLs, detection tuning thresholds, tier definitions (`TIERS`), face-oval connectors |
| `src/geometry.js` | Facial transformation matrix → Euler angles (`estimatePose`), face bounds |
| `src/headbang.js` | The detection engine: per-axis oscillation tracking, intensity score (0–100), tier/banner state, bang counting, combo/tempo stats |
| `src/gauge.js` | Canvas speedometer: zone arcs, ticks, labels, spring-damped needle, digital readout |
| `src/overlay.js` | Canvas drawing over the video feed: targeting brackets, face oval, nose-tip motion trail, bang shockwaves |
| `src/ui.js` | DOM element references and UI update helpers (banner, counter, tier label, stats, toasts) |
| `src/utils.js` | `RingBuffer`, `clamp`, `lerp`, camera-error and duration formatters |

### Key design facts
- **Inference is throttled** to `desiredInferenceIntervalMs` (33 ms desktop / 50 ms mobile); rendering runs every rAF tick using the latest cached result. Detection state only advances on new inference results.
- **No neutral-pose calibration.** Detection uses raw Euler angles from the facial transformation matrix; oscillation analysis (peak-to-peak amplitude, angular velocity, reversal tempo) is offset-invariant, so no zeroing step is needed.
- **Detection model** (`src/headbang.js`): each axis (pitch, yaw) tracks direction reversals; a "swing" is the travel between reversals. Amplitude/peak-speed/tempo over a 2 s window produce a smoothed 0–100 intensity score, mapped onto tiers in `TIERS`. A bang is a negative-direction swing ≥ `BANG_MIN_DEGREES` at ≥ `BANG_MIN_SPEED`, with a global refractory interval; only the dominant axis counts. The banner ("HEADBANGING DETECTED") uses score hysteresis (`DETECT_ON_SCORE`/`DETECT_OFF_SCORE` + hold time). The danger tier reflects the BMJ (2008) heuristic (~75° at metal tempo).
- **Mirroring**: the `<video>` is mirrored with CSS; `overlay.js` mirrors x coordinates in code instead of CSS-mirroring the canvas, so overlay text stays readable. The overlay maps normalised landmarks through the `object-fit: cover` transform.
- **The gauge render loop runs continuously** (independent of the camera) so the spring-damped needle settles naturally when tracking stops.
- **tasks-vision is not imported on the main thread** — the face-oval connector list is hardcoded in `constants.js`; only the worker loads MediaPipe (from the CDN, not bundled).

## Known issues
- Detection thresholds (`BANG_MIN_DEGREES`, `BANG_MIN_SPEED`, tier boundaries) are tuned from first principles and need live-webcam validation
- Android performance is untested; assume it is a risk area

## Constraints — follow strictly
- **Static hosting only.** No change may introduce server dependencies, build-time APIs, or dynamic hosting requirements. Every output must work as static files served from a plain web-server subfolder.
- **Single HTML page, single viewport.** All UI lives in one page that must fit the viewport with no horizontal or vertical scrolling.
- **No new heavyweight dependencies.** Don't add libraries over 50KB without asking first. Prefer vanilla JS and browser APIs.
- **Preserve existing behaviour.** When refactoring, user-visible output must remain identical unless the prompt explicitly asks for a change.
- **Keep modules focused.** Each file has one responsibility. Don't let ui.js compute things or tracker.js update DOM directly (it calls ui.js helpers).
- **Imports at top, exports named.** No default exports. No circular dependencies.
- **CSS stays in index.html** unless it grows past 500 lines, then extract to src/styles.css.
- **Test after every change.** Run `npm run build` to verify Vite compiles without errors.

## Code style
- Vanilla JS, ES modules, no TypeScript, no JSX
- `const` by default, `let` when reassignment is needed, no `var`
- Semicolons (match existing codebase)
- Functions over classes unless state encapsulation genuinely helps
- Descriptive variable names, no abbreviations except established ones (ctx, el, idx, lm, px, ms)
- Comments only for "why", not "what"

## Common pitfalls to avoid
- Don't put `detectForVideo()` on the main thread — it blocks UI (already in worker; keep it there)
- Don't use `.filter()` or `.shift()` on arrays that update every frame — use ring buffers
- Don't update DOM text on every frame — throttle text readouts (see `tickTextThrottle` in ui.js)
- Don't import `@mediapipe/tasks-vision` on the main thread — it drags the full bundle in; needed constants are hardcoded in constants.js
- Don't gate features on network calls — everything must work offline after initial model load
- MediaPipe results contain nested arrays — always null-check: `result?.faceLandmarks?.[0]`

## Working instructions
- Before starting any task, identify which files are relevant and read only those. Do not read the entire codebase unless the task explicitly requires it.
- Don't describe what you see in the code. Skip preamble like "I can see that the file currently does X." Just make the change.
- Don't ask clarifying questions when the prompt is specific. If it says what to do, do it.
- When a prompt says "add" or "implement", create the code. Don't suggest alternatives unless something is technically impossible.
- Commit with a short message after each completed prompt.
