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

The report includes a VLA Roadmap page that is updated as the research branch evolves. It now documents the Step 12 research scaffold, validated Step 13 action adapter, validated Step 14 FSM Demonstration Recorder, validated Step 15 replay harness, validated Step 16 Hybrid Replay / Schema Upgrade, validated Step 17 G1-Native VLA Dataset Exporter, validated Step 18 Dataset Audit + Train/Validation Split, validated Step 19 Dataset Filtering / Sample Weighting / Training Views, validated Step 20 Multi-Demo Collection + Batch Manifest, validated Step 21 Combined Batch Dataset Exporter, and partially validated Step 22 Scenario Perturbations / Multi-Seed Demo Diversity.

Step 19 created safer derived training views without modifying the original exported dataset. It produced a full view with 2665 records, a filtered no-idle view with 2516 records, and a sample-weight manifest with 2665 weights. The filtered view reduced idle-heavy records from 159 to 10 while preserving the rare `CLOSE_GRIP` and `OPEN_GRIP` transitions. The sample weights are normalized to mean 1.0 and capped at 20.0.

Step 20 added a batch recording layer for FSM teacher demonstrations. A dry run produced a manifest without running simulation, and a real no-image batch collected two successful demonstrations. The batch manifest reported num_requested=2, num_completed=2, num_failed=0, successful_done_demos=2, and total_steps=5532. Each demo reached DONE and produced 2766 records. This validates the multi-demo collection infrastructure, but the current demos are still deterministic, so it does not prove rollout diversity or learned-policy generalization.

Step 21 converted the Step 20 batch output into one combined G1-native dataset. It selected two successful demonstrations and produced a 5,330-record `dataset.jsonl`, plus `summary.json` and `source_manifest.json`. Every row preserves provenance through `batch_id`, `demo_id`, and `demo_sample_index`. The existing audit pipeline succeeded, producing a 4,263 / 1,067 train/validation split and identifying two idle-heavy runs. The training-view pipeline also succeeded, producing 5,022 filtered records while preserving rare `CLOSE_GRIP` and `OPEN_GRIP` transitions. All 87 unit tests passed and the smoke test passed. This validates the batch-to-dataset infrastructure, but because the two source demos are deterministic repeats, it does not prove data diversity or generalization.

Step 22 introduced controlled scenario perturbations and multi-seed metadata. The new scenario config produced five source-cylinder offset scenarios: nominal, +2 cm x, -2 cm x, +2 cm y, and -2 cm y. The batch manifest now records `scenario_id`, `seed`, and `red_block_xy_offset_m`, and the diversity inspector confirmed five unique scenarios with x/y offset ranges of `[-0.02, 0.02]` and `all_offsets_identical=false`. This validates the scenario-diversity infrastructure.

However, Step 22 also exposed FSM teacher fragility. Only four of five perturbed demos reached FSM `DONE`, and several demos that reached `DONE` did not actually place the object on the target table. Therefore Step 22 should be treated as partially validated: the metadata and diversity pipeline works, but the system needs stricter task-success metrics before perturbed demos are treated as training-quality data.

The next milestone is Step 23: add task-success metrics and a perturbation robustness gate. Step 23 should separate recorder success, FSM `DONE`, and true task success by tracking object attachment, final object position, object-on-target status, final clearance, and failure reasons. This should happen before OpenVLA shadow inference, fine-tuning, or learned-policy claims.

## Terminology used in this report

| Term | Meaning |
|------|---------|
| Manual baseline | The original keyboard-controlled MuJoCo demo shipped with the challenge |
| GT FSM baseline | The autonomous controller implemented in this submission |
| Visual Oracle | The architectural perception extension; not implemented in this submission |
| VLA Roadmap | Living research roadmap for OpenVLA-style extensions, covering validated scaffold, adapter, demonstration recording, replay diagnostics, hybrid replay/schema upgrade, G1-native dataset export, dataset audit/split, training-view generation, batch demonstration collection, combined batch dataset export, partially validated scenario perturbations, and the next task-success metric gate |
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
