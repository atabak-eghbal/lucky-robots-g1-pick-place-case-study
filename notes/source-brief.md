# Source Brief: Modular Pick-and-Place Baseline Case Study

## Goal
Build a single-page technical blog post for a GitHub Pages-style portfolio site about engineering a modular pick-and-place baseline for the Unitree G1 humanoid.

## Title & Subtitle
- **Title:** Engineering a Modular Pick-and-Place Baseline for the Unitree G1 Humanoid
- **Subtitle:** A technical case study on turning a manual MuJoCo robot demo into an autonomous FSM and Visual Oracle pipeline.

## Constraints
- Use only `index.html`, `style.css`, `script.js`, `assets/`, and `notes/source-brief.md`.
- No React, build system, or external CDN dependencies.
- The site must run locally by opening `index.html`.
- Clean, technical, readable design with a light background and a sticky desktop TOC.
- Responsive layout with cards, callouts, and code-style blocks.
- Use placeholders for diagrams and plots; avoid fabricated numbers.

## Required Sections
1. Hero with badges: MuJoCo, Unitree G1, ONNX Runtime, Finite-State Machine, Depth Back-Projection, Visual Oracle.
2. The Challenge: move a red cylinder between tables; original repo had manual control, ONNX policies, model, scene, cameras.
3. Why This Is Hard: coordination, pelvis-frame targets, contact-rich grasping, empirical policy behavior, timing.
4. System Decomposition: perception, locomotion, manipulation, grasp, sequencing; include modular diagram placeholder.
5. Architecture: cite run.py, controller, grasp backend, FSM files, perception layer; include layered diagram placeholder.
6. FSM Baseline: list states; explain why FSM vs end-to-end RL; include state diagram placeholder.
7. Visual Oracle: ground-truth lookup, depth+segmentation back-projection, EMA smoothing, freeze during descent; include pipeline placeholder.
8. Key Engineering Lessons: five callouts with provided titles.
9. Results: milestone table with provided rows; include three plot placeholders.
10. Limitations: honest list provided in the prompt.
11. Next Steps: future work list provided in the prompt.
12. Closing: concise reflection statement provided in the prompt.
