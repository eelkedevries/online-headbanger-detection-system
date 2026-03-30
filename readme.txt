Use this as a starting guide for another model.

---

# Starting guide for continuing this project

## Overall goal

Build a **static, browser-based webcam tracking demo** that runs from a **GitHub Pages website** with **no backend**.

The app should use browser-side tracking to create:

1. a **live face close-up feed** with landmarks,
2. a **3D avatar** that mirrors the user,
3. a **set of real-time quantitative measures** derived from face, hand, and pose tracking.

The target is not just a technical demo. It should become a usable real-time monitoring interface with a clear UI.

---

## Core constraints

* Must work as a **static site**
* Must run from **GitHub Pages**
* Must work in a **browser on Android**, especially Chrome
* Webcam permissions must work reliably
* No backend
* Prefer simple deployment
* Single-file HTML is acceptable, but not required if a better structure is needed
* Reliability matters more than preserving the current code style

---

## Main libraries / approach

Current approach uses browser-side:

* **MediaPipe Face Landmarker**
* **MediaPipe Hand Landmarker**
* **MediaPipe Pose Landmarker**
* **Three.js** for the avatar

The current implementation is in HTML/CSS/JS. It has gone through many patches. Do **not** assume the current code structure is good. It may be better to partially refactor or rebuild parts cleanly.

---

## Latest implementation update

The latest pass made a targeted stability / correctness update in `index.html`.

What changed:

* added a real `describeCameraError(...)` path so failed camera startup no longer falls into a missing-function runtime error
* hardened camera startup / cleanup so a failed permission request or interrupted start leaves the UI, stream state, and metrics in a cleaner state
* fixed the attention / gaze heuristic to use **normalized iris coordinates** instead of mixing normalized landmark values with canvas-space pixel values
* added smoothing to the face close-up crop so the head view should jitter less while still respecting the true video-frame boundaries
* added a check to avoid re-processing the exact same video frame repeatedly, which should help browser stability and mobile performance
* improved avatar resilience so the avatar can keep showing a face-driven head when pose-world data drops out temporarily, instead of hiding the whole avatar immediately
* improved avatar hand-side assignment so it prefers pose wrist anchors over raw handedness labels when deciding left/right mapping
* reset more derived state on restart / failure, including blink count, elapsed time, neutral pose state, and crop state

Important limitations of that pass:

* the latest changes were **not live-tested in a browser from this environment**
* there was no local JS runtime or browser automation available during that pass
* the code was reviewed carefully, but avatar direction and hand mirroring still need real webcam validation, ideally on Android Chrome

So the project is in a better state than before, but it should still be treated as **partially stabilised, not fully validated**.

---

## High-level product goal

The final app should do three things well:

### 1. Visual tracking

Show a clean, accurate live view of the person’s face with landmarks.

### 2. Avatar mirroring

Show a 3D avatar that mirrors:

* head movement
* face movement / expression proxies
* hand movement
* upper body / shoulders

### 3. Real-time measures

Show interpretable metrics such as:

* head pose
* relative distance
* eyes
* face geometry
* blink count
* behaviour summary
* event classification
* attention / looking-at-display estimate

---

## Current desired UI

## Feeds area

Only these should remain visible:

### A. Face close-up feed

This should be the main live video window.

Requirements:

* derived from the **full webcam frame**
* automatically cropped
* should try to keep the face centred when the user moves left/right/up/down
* should include head and maybe shoulders
* crop must respect the true boundaries of the underlying full frame
* landmarks should be drawn on this feed

Important:

* there used to be a visible “full feed” window
* that visible window should stay removed
* but the full underlying frame still matters for crop logic

### B. 3D avatar

Shown next to the face close-up.

Requirements:

* same size as the face close-up
* should mirror the user in an intuitive way
* should not respond in inverse directions

---

## Right-side panel layout

Right-side analysis windows should be ordered from top to bottom like this:

1. **Head pose**
2. **Eyes**
3. **Behaviour summary** and **Event classification** on the same row, each half width
4. all remaining panels below that

---

## Head pose window requirements

This window should show only:

* **Yaw**
* **Pitch**
* **Roll**
* **Distance**

### Distance

Distance should be relative to **Set reference distance**:

* **0** = reference distance
* **negative** = user moved farther away
* **positive** = user moved closer

### Tick marks

Yaw / Pitch / Roll should all use the same visible scale.

The tick labels below the bottom bar must match the actual bar scale and displayed values.

Current intended scale:
-40, -20, 0, 20, 40

### Remove / hide from visible Head pose window

These should not be shown there:

* Angular speed
* Angular acceleration
* Movement amplitude
* Peak excursion
* Range of motion (yaw)
* Range of motion (pitch)
* Range of motion (roll)
* Total movement

They may still exist internally if useful, but should not appear in the visible Head pose panel.

---

## Desired features

## Face / head

The system should estimate or display:

* face mesh
* yaw / pitch / roll
* relative distance from reference
* blink count
* nose flare estimate if possible
* eye-related measures such as:

  * blink
  * eye openness
  * squint
  * brow raise
  * brow furrow
* face geometry estimates such as:

  * face width
  * face height
  * inter-eye distance
  * iris diameter
  * approximate values in pixels, visual degrees, and centimetres
* whether the person is looking at the camera/display
* whether the person is looking away / distracted

Important:

* attention / gaze-related outputs can be **heuristic**
* they do not need to be claimed as calibrated eye tracking

## Behaviour / event measures

Should include:

* elapsed time
* time moving vs still
* event counts
* blink count
* behaviour summary
* event classification that updates live

## 3D avatar

The avatar should include as many available elements as possible.

Desired avatar elements:

* head
* eyes / eyelid openness
* eyebrows
* nose / nostril flare proxy if possible
* jaw
* mouth
* shoulders / upper body
* hands
* additional pose-driven body elements where possible

Most important requirement:
the avatar should move in the **same direction** as the person in the webcam-based view.

Examples:

* when the user turns head right, avatar turns right
* when the user tilts upward, avatar tilts upward
* when the user raises left hand, avatar raises its own left hand

This directional consistency has repeatedly gone wrong and is still a major issue.

---

## Biggest current problems

## 1. 3D avatar still not correct

The avatar is still one of the least reliable parts.

Recurring problems:

* inverse yaw
* inverse pitch
* wrong left/right hand mapping
* body drifting or exploding
* only some parts updating correctly
* mismatch with webcam behaviour

Recent progress:

* the avatar now has a head-only fallback when pose-world data disappears briefly
* hand-side assignment now prefers pose wrist anchors instead of relying only on handedness labels

What is still unresolved:

* live validation is still needed to confirm yaw / pitch / roll direction signs
* left/right hand mapping is improved heuristically, but still needs testing with real mirrored webcam input
* body placement / scaling / drift still need attention

## 2. Runtime reliability

Different versions have had:

* landmarks freezing
* panels no longer updating
* event classification stopping
* FPS display breaking
* repeated runtime errors in the log
* button actions breaking the stream

Recent progress:

* the missing camera error helper was fixed
* startup / failure cleanup is safer than before
* restart state clearing is more complete
* the loop now skips duplicate video frames instead of re-processing unchanged frames

The next model should still prioritise **stability** before adding much more complexity.

## 3. Overlay / crop correctness

Past problems included:

* mirrored video but non-mirrored overlay
* bad `object-fit` mapping
* landmarks stuck to wrong screen location
* crop not staying centred on the face
* close-up not respecting full-frame boundaries properly

Recent progress:

* the head crop now has smoothing
* crop state is reset more cleanly when tracking stops or fails

Still verify carefully:

* whether the smoothed crop stays centred without lagging too much
* whether head-feed landmarks remain aligned under movement and resize conditions

## 4. Android performance

Android is a real target, not an afterthought.

Common issues:

* lower frame rate
* heavier model loading
* browser instability
* permissions friction
* 3D rendering cost

Recent progress:

* redundant processing of unchanged video frames is now avoided

Still assume Android remains a major risk area until tested on-device.

---

## Current priorities for the next model

### Priority 1

Live-validate the current app in a real browser:

* confirm camera startup / stop / restart behaviour
* confirm panels update continuously over time
* confirm FPS continues updating
* confirm no new repeated runtime errors appear in the log
* confirm attention output is more plausible after the gaze fix

### Priority 2

Fix and verify the avatar:

* correct head direction
* correct hand direction
* better body placement / scaling
* no inverted response
* verify that the new head-only fallback behaves sensibly when pose tracking drops out

### Priority 3

Improve the face close-up feed:

* verify the new crop smoothing on real movement
* keep face centred better without excessive lag
* include shoulders when possible
* respect true full-frame boundaries
* keep landmarks aligned

### Priority 4

Keep the UI clean and consistent:

* correct right-panel order
* correct Head pose contents
* coherent scale labels
* no duplicate or conflicting windows

### Priority 5

If the app is still hard to stabilise, consider refactoring:

* split tracking, UI updates, and avatar logic into cleaner sections or files
* reduce the amount of shared mutable state in one place
* prefer maintainability over preserving the current single-file shape

---

## Important behavioural expectations

The next model should not assume that the latest code version is correct just because a feature was “implemented”.

Many fixes were iterative and some later patches broke earlier working parts.

So:

* verify logic carefully
* prefer small reliable changes over uncontrolled accumulation
* if necessary, refactor sections instead of patching endlessly

---

## What the next model should optimise for

Optimise for:

* correctness
* stability
* intuitive mirroring
* Android/browser reliability
* clarity of UI
* maintainability

Not for:

* preserving every current implementation detail
* keeping everything in one file at all costs
* adding speculative features before stabilising core behaviour

---

## Short summary

Build a **stable static browser app** that:

* runs on GitHub Pages
* works on Android
* shows a face-centred close-up with landmarks
* shows a 3D avatar that mirrors the user correctly
* shows useful real-time behavioural / expression / pose measures
* has a clean right-hand analysis layout
* does not freeze, misalign, or spam errors

The main unresolved work is:

* avatar correctness
* live browser validation of the recent fixes
* Android/device performance validation
* crop / overlay robustness under real movement
* panel/data consistency

---

If useful, I can also rewrite this as a direct **prompt for another LLM**, with explicit instructions, priorities, and failure modes to watch for.
