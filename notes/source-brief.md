# Source Brief: Modular Pick-and-Place Baseline Case Study

## Narrative summary
This case study documents how a manual Unitree G1 MuJoCo demo was converted into a modular
pick-and-place baseline. The focus is on clear system decomposition, an explicit FSM sequence, a
lightweight Visual Oracle for source localization, and honest reporting of what the simulation
baseline can and cannot do.

## Core story beats
- **Challenge framing:** move a red cylinder between tables using a humanoid in simulation.
- **Modular stack:** separate perception, locomotion, manipulation, grasping, and sequencing.
- **FSM baseline:** explicit states with timeouts and deterministic transitions for debugging.
- **Visual Oracle:** deterministic depth back-projection with EMA smoothing and frozen estimates.
- **VLA Roadmap:** living OpenVLA/OpenVLA-style research branch. Step 12 documented the scaffold; Step 13 validated the 7D action adapter; Step 14 recorded FSM teacher demonstrations; Step 15 validated replay tooling; Step 16 proved G1-native teacher-command replay is faithful while hybrid-7D fails; Step 17 exported a G1-native supervised dataset with 2665 records and an 8D action vector; Step 18 audited the dataset and produced a 2130/535 phase-temporal train/validation split; Step 19 created derived training views, reducing idle-heavy records from 159 to 10, preserving rare grip transitions, and writing normalized sample weights; Step 20 added batch demonstration collection and a manifest contract; Step 21 combined successful demos into a single 5330-record G1-native dataset with row-level provenance; Step 22 partially validated scenario perturbations by recording five unique scenario IDs and red-cylinder offsets, but also revealed FSM teacher fragility under ±2 cm perturbations. The next step is explicit task-success metrics and a perturbation robustness gate before OpenVLA inference or fine-tuning.
- **Key lessons:** normalization pitfalls, always-on reacher constraints, accuracy limits, turn-rate
  behavior, and vision freeze strategy.
- **Results + limitations:** milestone table, plot placeholders, and clear caveats about kinematic
  grasping and sim-only validation.

## Tone goals
Professional, technical, and portfolio-ready. Be explicit about tradeoffs, avoid exaggerated
claims, and keep the focus on engineering decisions.
