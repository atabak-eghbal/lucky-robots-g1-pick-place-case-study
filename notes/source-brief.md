# Source Brief: Lucky Robots G1 Pick-and-Place Engineering Report

## Narrative summary

This report documents how the original manual Unitree G1 MuJoCo demo was converted into a
ground-truth finite-state-machine baseline for pick-and-place. The emphasis is on decomposition,
evidence, debugging, and honest scope control.

The implemented deliverable is the GT FSM baseline. The Visual Oracle is an architectural extension,
not an implemented component in this submission.

## Core story beats

- **Original baseline:** manual keyboard-controlled MuJoCo simulation with pretrained walker and reacher ONNX policies.
- **Implemented contribution:** autonomous GT FSM baseline coordinating locomotion, reaching, kinematic grasping, transport, release, and retraction.
- **Engineering discoveries:** raw walker observations, always-on right reacher, empirical reacher accuracy floor, kinematic attach threshold, target-side false-positive correction.
- **Evidence model:** verified, visually verified, and future/proposed claims are separated throughout.
- **Known limitations:** kinematic grasping, simulation-only validation, incomplete post-release settle checker, no hardware transfer.
- **Future direction:** Visual Oracle implementation, post-release validation, physical grasping, robustness testing, and learned-policy comparisons.

## Tone goals

Reviewer-facing, precise, evidence-first, and technically honest. Avoid portfolio language, hype,
or claims that blur implemented work with future work.
