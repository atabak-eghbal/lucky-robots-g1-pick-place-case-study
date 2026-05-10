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
- **VLA Roadmap:** living OpenVLA/OpenVLA-style research branch. Step 12 documented the scaffold; Step 13 validated the 7D action adapter; Step 14 recorded FSM teacher demonstrations; Step 15 validated replay tooling; Step 16 proved G1-native teacher-command replay is faithful while hybrid-7D fails; Step 17 exported a G1-native supervised dataset with 2665 records and an 8D action vector; Step 18 audited the dataset and produced a 2130/535 phase-temporal train/validation split; Step 19 created derived training views; Step 20 added batch demonstration collection; Step 21 combined successful demos into a 5330-record G1-native dataset; Step 22 partially validated scenario perturbations but revealed FSM fragility; Step 23A added a scripted keyboard teacher MVP that automates the original manual-control idea and records VLA-style demos; Step 24 added a contact-aware physical grasp backend; Step 25 added contact-guided grasp closure; Step 26 added table-assisted caging plus continuous grip-fraction control and grasp-comparison tooling; and Step 27 added a hybrid contact-gated grasp path (contact-guided probe then kinematic transport). Step 27 is currently the best working result: hybrid contact-guided grasp. The robot uses a physical/contact-guided probe/cage phase before kinematic transport. The report should explicitly state that kinematic attachment remains a simulation shortcut, but that it is now a contact-gated shortcut rather than a blind snap.
- **Physical grasp branch:** contact-aware metrics, contact-guided closure, continuous grip fraction, and table-assisted caging. Current status: near pickup but slipping during lift.
- **Hybrid grasp branch:** after failed pure physical/contact-only attempts, the project adopts a contact-gated hybrid method. Physical probe/cage provides evidence that the hand reached the object; kinematic transport provides stable lift and placement. This is an honest simulation-engineering compromise.
- **Video evidence gallery:** include four recordings with clear framing by workstream — Work 1 FSM baseline (reliable completed baseline), Work 2 scripted keyboard teacher infrastructure, Work 3 current physical-grasp experiment (near pickup / slipping during lift; not solved), and Work 4 — Hybrid contact-guided grasp: latest working result, contact/probe first, kinematic transport after confirmation.
- **Key lessons:** normalization pitfalls, always-on reacher constraints, accuracy limits, turn-rate
  behavior, and vision freeze strategy.
- **Results + limitations:** milestone table, plot placeholders, and clear caveats about kinematic
  grasping and sim-only validation.

## Tone goals
Professional, technical, and portfolio-ready. Be explicit about tradeoffs, avoid exaggerated
claims, and keep the focus on engineering decisions.
