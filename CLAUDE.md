# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project summary
Static client-side webcam app using MediaPipe Face Landmarker for real-time head tracking, facial landmarks (478 3D points), blendshapes (52 coefficients), and heuristic expression classification. Runs entirely in the browser on GitHub Pages — no server, no backend, no dynamic hosting. Models load from Google/jsdelivr CDNs.

## Commands
```bash
npm run dev       # start Vite dev server (hot reload)
npm run build     # build to dist/ for GitHub Pages deployment
npm run preview   # serve the dist/ output locally
```

No linter or test runner is configured. This is a static browser app — manual browser testing is the primary validation method.

## Deployment
`vite.config.js` sets `base: './'` for relative asset paths, which is required for GitHub Pages. Run `npm run build` and push the `dist/` output.

## Architecture
The app is a static, no-backend webcam tracking demo targeting Android Chrome and desktop browsers. MediaPipe inference is offloaded to a Web Worker to avoid blocking the main thread.

### Data flow
1. **`src/inference-worker.js`** — Web Worker that holds the three MediaPipe landmarkers (Face, Hand, Pose). Receives `{type:'frame', bitmap, timestamp}` messages from the main thread, runs all three models, and posts results back.
2. **`src/tracker.js`** — Main-thread render loop. Captures video frames using `requestVideoFrameCallback`, sends `ImageBitmap` to the worker, receives results, and drives all downstream updates. Owns `state` (tracking session state) and `trackingVars` (stream/worker handles).
3. **`src/main.js`** — Entry point. Handles camera start/stop, calibration, event listeners, and `init()`. Imports from all other modules.

### Module responsibilities
| File | Responsibility |
|---|---|
| `src/constants.js` | All magic numbers, model URLs, landmark index maps (`LM`), and connector arrays |
| `src/geometry.js` | Face bounds, head-pose matrix → Euler angles, face-width-based distance estimate |
| `src/motion.js` | Head-pose change over time → speed, event detection (nod/shake/tilt/headbang), bout tracking |
| `src/expressions.js` | MediaPipe blendshape map → derived expression values and 7 basic emotion scores |
| `src/attention.js` | Iris position within eye socket + head-pose → gaze direction and camera-attention estimate |
| `src/overlay.js` | Canvas drawing: landmark connectors on the full video feed, head close-up crop and overlay |
| `src/avatar.js` | Three.js avatar: head (expression-driven), body rig (pose-world landmarks), and hands |
| `src/ui.js` | DOM element references and UI update helpers |
| `src/utils.js` | Pure math helpers (`clamp`, `lerp`, `mean`, etc.) and display formatters |

### Key design facts
- **Inference is throttled**: Face runs every `desiredInferenceIntervalMs` (33 ms desktop / 50 ms mobile); Hand and Pose run less often (`HAND_UPDATE_INTERVAL_MS = 140 ms`, `POSE_UPDATE_INTERVAL_MS = 100 ms`). Results are cached in `state.cachedFaceResult` etc. between runs.
- **Head close-up**: `overlay.js` computes a pixel-space crop from face bounds (and shoulder landmarks when visible), smooths it with `lerp` at `HEAD_CROP_SMOOTHING = 0.34`, and renders a cropped video frame onto `headFeedCanvas`. Landmark overlays are composited from the hidden full-frame overlay canvas.
- **Avatar hand-side resolution**: In `avatar.js`, pose wrist image landmarks are used to assign left/right hand sides by proximity, falling back to MediaPipe handedness labels. Handedness labels are inverted (`"left"` → `"right"`) because the selfie feed is mirrored.
- **Head pose sign convention**: `geometry.js` extracts Euler angles from the facial transformation matrix. `avatar.js` applies them as `rotation.set(-pitch, yaw, roll)` (pitch negated) — this is the currently implemented convention but has not been fully live-validated; avatar direction may still need sign corrections after real-device testing.
- **Neutral pose calibration**: `motionConfig.neutralRotation` stores a reference rotation captured by the user. All motion events are relative to this. If not set, the first valid frame sets it automatically.

## Known issues (from readme.txt)
- Avatar yaw/pitch sign correctness and left/right hand mapping still need live browser validation
- Android performance is untested; assume it is a risk area
- Head crop smoothing and landmark alignment under movement need real-device confirmation

## Constraints — follow strictly
- **Static hosting only.** No change may introduce server dependencies, build-time APIs, or dynamic hosting requirements. Every output must work as static files on GitHub Pages.
- **Single HTML page.** All routes, UI panels, and features live in one page.
- **No new heavyweight dependencies.** Don't add libraries over 50KB without asking first. Prefer vanilla JS and browser APIs.
- **Preserve existing behaviour.** When refactoring, user-visible output must remain identical unless the prompt explicitly asks for a change.
- **Keep modules focused.** Each file has one responsibility. Don't let ui.js compute things or tracker.js update DOM.
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
- Don't update DOM text on every frame — throttle text readouts to 200ms+
- Don't import all of Three.js — use specific module imports or replace with 2D canvas
- Don't gate features on network calls — everything must work offline after initial model load
- MediaPipe results contain nested arrays — always null-check: `result?.faceLandmarks?.[0]`

## Working instructions
- Before starting any task, identify which files are relevant and read only those. Do not read the entire codebase unless the task explicitly requires it.
- Don't describe what you see in the code. Skip preamble like "I can see that the file currently does X." Just make the change.
- Don't ask clarifying questions when the prompt is specific. If it says what to do, do it.
- When a prompt says "add" or "implement", create the code. Don't suggest alternatives unless something is technically impossible.
- Commit with a short message after each completed prompt.
