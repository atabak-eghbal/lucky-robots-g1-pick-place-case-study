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
- **VLA Roadmap:** living OpenVLA/OpenVLA-style research branch. Step 12 documented the scaffold; Step 13 validated the 7D action adapter with 9 unit tests plus a passing environment smoke test; Step 14 validated FSM demonstration recording with 554 JSONL records, 554 image frames, and a rollout reaching DONE; Step 15 validated the replay harness and showed that arm-only 7D replay is insufficient for the full humanoid task, with mean palm error ~0.264 m and no attachment. The next step is hybrid replay/schema upgrade before OpenVLA inference.
- **Key lessons:** normalization pitfalls, always-on reacher constraints, accuracy limits, turn-rate
  behavior, and vision freeze strategy.
- **Results + limitations:** milestone table, plot placeholders, and clear caveats about kinematic
  grasping and sim-only validation.

## Tone goals
Professional, technical, and portfolio-ready. Be explicit about tradeoffs, avoid exaggerated
claims, and keep the focus on engineering decisions.
