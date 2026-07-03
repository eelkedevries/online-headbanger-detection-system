# Online Headbanger Detection System

A static, browser-based webcam app that detects headbanging in real time and
counts every bang. Point your webcam at your face, press START CAMERA, and
bang your head.

Live at: https://eelkedevries.com/online-headbanger-detection-system/

It is a tongue-in-cheek experiment, not a scientific or medical instrument.

## What it does

- Tracks head pose in the browser using MediaPipe Face Landmarker, running in
  a Web Worker (nothing leaves the device).
- Analyses pitch/yaw oscillation (amplitude, angular speed, tempo) and maps it
  onto a 0-100 intensity score.
- Classifies the current tier: STANDING STILL, NODDING, VIGOROUS NODDING,
  LIGHT HEADBANGING, INTENSIVE HEADBANGING, TOTAL ANNIHILATION - shown on a
  speedometer-style gauge with a spring-loaded needle.
- Shows a green HEADBANGING DETECTED / red NO HEADBANGING DETECTED banner.
- Counts individual headbangs (with combo streaks and milestone toasts) and
  reports tempo (BPM), amplitude, peak speed, style (up-down, side-to-side,
  windmill), bangs per minute, and session time.
- Flags the BMJ (2008;337:a2825) injury-risk zone (~75 degrees at heavy-metal
  tempo) as a flashing NECK HAZARD warning.

The tier definitions are loosely based on the observation that there is no
agreed scientific cut-off between nodding and headbanging - the boundary is
one of force, abruptness and cultural context, so the thresholds here are
tuned for fun, not for publication.

## Architecture

See CLAUDE.md for the module map and design constraints. In short:
index.html (single viewport-locked page) + src/*.js ES modules, Vite build,
MediaPipe from CDN, static hosting only.

## Development

    npm run dev       # Vite dev server
    npm run build     # build to dist/
    npm run preview   # serve dist/ locally

A push to main builds and deploys via .github/workflows/deploy-site.yml.

## Known gaps

- Detection thresholds are tuned from first principles and want live-webcam
  validation across faces, lighting and cameras.
- Android performance is untested.
