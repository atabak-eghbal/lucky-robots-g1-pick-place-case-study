# Lucky Robots G1 Pick-and-Place — Engineering Report

## What this submission is

This repository is the engineering report for the Lucky Robots G1 pick-and-place take-home
challenge. It documents the conversion of a manual keyboard-controlled MuJoCo demo into an
autonomous pick-and-place controller for the Unitree G1 humanoid.

**Ground-truth FSM baseline (GT FSM — implemented):** A 12-state finite-state machine that
coordinates the walker and right-reacher ONNX policies, handles kinematic grasp attachment, and
completes the end-to-end pick-and-place sequence in simulation. Every threshold and timeout is
derived from a development-log observation, not guessed.

**Visual Oracle perception extension (architectural — not implemented in this submission):**
A camera-based source-localization layer using depth back-projection and EMA smoothing, designed
to replace the ground-truth pose lookup for source-side phases. The architecture is documented in
the Visual Oracle appendix; the implementation is out of scope for this submission.

The report is evidence-first. Known simulation-only caveats and implementation gaps are stated
explicitly throughout.

The report includes a VLA Roadmap page that is updated as the research branch evolves. It now documents the Step 12 research scaffold, validated Step 13 action adapter, validated Step 14 FSM Demonstration Recorder, validated Step 15 replay harness, validated Step 16 Hybrid Replay / Schema Upgrade, and validated Step 17 G1-Native VLA Dataset Exporter.

Step 16 produced the most important VLA design finding so far. A sparse `record-every 5` command stream could not reproduce the teacher rollout, even in teacher-command mode, which exposed a timing mismatch. Re-recording at every control tick fixed the replay fidelity issue: `teacher-command` replay achieved 0.0 m mean/max/final palm error, attached the object, and reported 1902 attached steps. However, `hybrid-7d` replay still failed with mean palm error about 0.230 m and no attachment. This shows that relative 7D palm deltas are not yet a reliable action target for the G1 stack.

Step 17 exported the replay-faithful FSM teacher data into a model-ready supervised dataset. The exporter produced 2665 records from the every-tick demonstration, with an 8D action vector: `[walk_x, walk_y, walk_yaw, reach_x, reach_y, reach_z, reach_active, grip_closed]`. The copied-image export also succeeded with 2665 images. This creates the clean bridge from the FSM teacher to future learned-policy experiments.

The next milestone is Step 18: audit the exported dataset, summarize phase/action distributions, and create train/validation splits before attempting OpenVLA shadow inference or fine-tuning.

## Terminology used in this report

| Term | Meaning |
|------|---------|
| Manual baseline | The original keyboard-controlled MuJoCo demo shipped with the challenge |
| GT FSM baseline | The autonomous controller implemented in this submission |
| Visual Oracle | The architectural perception extension; not implemented in this submission |
| VLA Roadmap | Living research roadmap for OpenVLA-style extensions, covering validated scaffold, adapter, demonstration recording, replay diagnostics, hybrid replay/schema upgrade, G1-native dataset export, and the next dataset audit/split step |
| Future roadmap | Work identified as next steps; not included in this submission |

## Evidence status

Claims carry one of three status levels:

- **Verified** — confirmed by headless smoke test output or a logged development run
- **Visually verified** — observed in a reference MuJoCo run; not programmatically confirmed
- **Future / proposed** — documented architecture or planned next step; not implemented

## How to view locally

Open `index.html` directly in a browser, or run a simple local server:

```bash
python -m http.server
