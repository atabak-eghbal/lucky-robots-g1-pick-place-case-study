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

The report includes a VLA Roadmap page that is updated as the research branch evolves. It now documents the full progression from the FSM baseline and VLA data pipeline through scripted keyboard teachers, contact-aware physical grasping, table-assisted caging, and the current hybrid contact-guided grasp result.

Step 19 created safer derived training views without modifying the original exported dataset. It produced a full view with 2665 records, a filtered no-idle view with 2516 records, and a sample-weight manifest with 2665 weights. The filtered view reduced idle-heavy records from 159 to 10 while preserving the rare `CLOSE_GRIP` and `OPEN_GRIP` transitions. The sample weights are normalized to mean 1.0 and capped at 20.0.

Step 20 added a batch recording layer for FSM teacher demonstrations. A dry run produced a manifest without running simulation, and a real no-image batch collected two successful demonstrations. The batch manifest reported num_requested=2, num_completed=2, num_failed=0, successful_done_demos=2, and total_steps=5532. Each demo reached DONE and produced 2766 records. This validates the multi-demo collection infrastructure, but the current demos are still deterministic, so it does not prove rollout diversity or learned-policy generalization.

Step 21 converted the Step 20 batch output into one combined G1-native dataset. It selected two successful demonstrations and produced a 5,330-record `dataset.jsonl`, plus `summary.json` and `source_manifest.json`. Every row preserves provenance through `batch_id`, `demo_id`, and `demo_sample_index`. The existing audit pipeline succeeded, producing a 4,263 / 1,067 train/validation split and identifying two idle-heavy runs. The training-view pipeline also succeeded, producing 5,022 filtered records while preserving rare `CLOSE_GRIP` and `OPEN_GRIP` transitions. All 87 unit tests passed and the smoke test passed. This validates the batch-to-dataset infrastructure, but because the two source demos are deterministic repeats, it does not prove data diversity or generalization.

Step 22 introduced controlled scenario perturbations and multi-seed metadata. The new scenario config produced five red-cylinder offset scenarios: nominal, +2 cm x, -2 cm x, +2 cm y, and -2 cm y. The batch manifest now records `scenario_id`, `seed`, and `red_block_xy_offset_m`, and the diversity inspector confirmed five unique scenarios with x/y offset ranges of `[-0.02, 0.02]` and `all_offsets_identical=false`. This validates the scenario-diversity infrastructure.

However, Step 22 also exposed FSM teacher fragility. Only four of five perturbed demos reached FSM `DONE`, and several demos that reached `DONE` did not actually place the object on the target table. Therefore Step 22 should be treated as partially validated: the metadata and diversity pipeline works, but the system needs stricter task-success metrics before perturbed demos are treated as training-quality data.

Step 23A added a scripted keyboard teacher as a second teacher source. The goal was to automate the original manual keyboard-control idea with a deterministic JSON macro that drives the G1 controller through walking, reaching, gripping, lifting, and release commands. The implementation added a scripted plan, plan validator, plan inspector, and scripted demo recorder. The recorder successfully produced VLA-style demo logs and rendered camera frames. However, visual inspection showed that the first open-loop macro did not pick up the cylinder, so Step 23A should be treated as partially validated infrastructure, not a successful teacher demonstration.

Step 24 introduced a contact-aware physical grasp backend that observes real MuJoCo finger-object contacts without teleporting the cylinder. Step 25 used that backend to build a contact-guided grasp policy, exposing a key failure mode: direct or binary finger closure can push the small cylinder away before it is secured. Step 26 responded by adding continuous grip-fraction control, a table-assisted caging script, object-motion metrics, and a grasp-run comparison tool. The result is meaningful progress toward a physical grasp: the robot can approach and nearly pick up the cylinder, but the object can still slip during lift. Therefore the physical grasp path is documented as an active research branch, while the kinematic/FSM teacher remains the reliable data-generation baseline.

Current final status for this phase: the strongest working result is a hybrid contact-guided grasp. The robot first performs a staged physical probe/cage using continuous grip fractions and contact/proximity feedback. After that confirmation stage, the object is kinematically attached to the palm for reliable transport and released back into physics at the target. This is not a pure physical dexterous grasp, but it is an honest and practical engineering compromise after multiple physical-only attempts exposed persistent slipping during lift.

## Video evidence

- **Work 1 — FSM baseline (reliable completed baseline):**
  https://youtu.be/4FKgn35iU-Y?si=TiO-xRAxPQBCLsaj
- **Work 2 — Scripted keyboard teacher (teacher-generation infrastructure):**
  https://youtu.be/Lw88uj7FiFo?si=Bw5gZGO6kQ3KBkY4
- **Work 3 — Physical grasp experiment (current experiment):**
  https://youtu.be/tIisPTbTaQo?si=AseZ2_7o_rqtnKLQ
- **Work 4 — Hybrid contact-guided grasp (latest working result):**
  https://www.youtube.com/watch?v=rhKuY6O_H5o

Work 3 is reported as video evidence of current physical-grasp progress (near pickup / slipping during lift), not as a fully solved grasp result.

Work 4 is the current best result: it demonstrates the hybrid contact-guided approach that works reliably enough for the task while still carrying a clearly labeled kinematic transport shortcut.

## Terminology used in this report

| Term | Meaning |
|------|---------|
| Manual baseline | The original keyboard-controlled MuJoCo demo shipped with the challenge |
| GT FSM baseline | The autonomous controller implemented in this submission |
| Visual Oracle | The architectural perception extension; not implemented in this submission |
| VLA Roadmap | Living research roadmap for OpenVLA-style extensions, covering validated scaffold, adapter, demonstration recording, replay diagnostics, hybrid replay/schema upgrade, G1-native dataset export, dataset audit/split, training-view generation, batch demonstration collection, combined batch dataset export, partially validated scenario perturbations, partially validated scripted-keyboard teacher infrastructure, and Steps 24–27 grasp infrastructure (contact-aware backend, contact-guided policy, table-assisted caging, and hybrid contact-gated transport) |
| Contact-aware physical grasp | Physical/contact-aware grasp backend that uses real MuJoCo contacts without teleporting or disabling object physics |
| Continuous grip fraction | Controller support for gradual finger closure with a continuous grip target instead of binary open/close only |
| Table-assisted caging | Scripted strategy that uses table support plus gradual closure to cage the cylinder before lift |
| Hybrid contact-gated grasp | A grasp strategy that uses physical contact/cage probing to verify object interaction, then switches to kinematic attachment for reliable transport. |
| Contact-guided probe | The staged approach/cage phase that uses continuous grip fraction and contact/proximity evidence before committing to transport. |
| Kinematic transport | The post-contact phase where the cylinder is rigidly attached to the palm to prevent slip during walking/lift/placement. |
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
```
