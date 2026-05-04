# Lucky Robots G1 Pick-and-Place — Video Script

## Tone

This should sound like a design review, not a sales demo. Be confident, but exact.

Do not say:
- production-ready
- robust
- solved
- real-world-ready
- fully validated placement

Do say:
- simulation-only baseline
- GT FSM baseline
- visually successful placement
- post-release validation caveat
- future Visual Oracle extension

## Opening

"This submission turns the original manual MuJoCo demo into a modular autonomous baseline for
G1 pick-and-place. I'll show the best result first, then walk through the engineering decisions,
evidence, and limitations."

## Segment 1 — Challenge

"The task was simple to state: move the red cylinder from the source table to the target table.
The hard part was coordinating humanoid locomotion, reaching, grasping, release, and validation
while using pretrained ONNX policies with narrow operating envelopes."

## Segment 2 — Architecture

"I split the stack into runtime orchestration, policy logic, controller synthesis, grasp handling,
and validation. This made each failure easier to isolate. The Visual Oracle is shown as the
future perception layer, but the implemented baseline uses ground-truth simulation pose."

## Segment 3 — Engineering lessons

"The first important finding was that the walker policy expects raw observations. External
normalization double-normalized the input and destabilized the gait."

"The second finding was that the right reacher has to run continuously. If it only runs during
reach states, the arm drifts outside the walker's expected observation distribution."

"The third finding was the reacher accuracy floor. It plateaued around 12–13 cm, so the thresholds
and timeouts had to be set around that empirical limit."

## Segment 4 — Code walkthrough

"`run.py` is the orchestration layer. It loads the scene, models, controller, policy, and grasp
backend."

"`common/controller.py` is the operational core. It composes the walker and reacher outputs and
writes final actuator commands."

"`common/grasp.py` is deliberately isolated because kinematic attachment is a simulation shortcut.
A future physical grasp backend could replace it behind the same interface."

"`policies/fsm_core.py` is the main sequencing logic. The states, thresholds, timeouts, and target
guards are explicit so failures can be reproduced and corrected."

## Segment 5 — Results

"I split results into verified, visually verified, and future/proposed. Environment readiness,
source approach, hover, descend, attach, lift, and target transport are supported by logs or
headless checks. Final target placement is visually successful in simulation, but the post-release
settle-and-check validation is still a caveat."

## Segment 6 — Failure analysis

"The most important correction was the target-side false positive. A pelvis-frame reach-window
check allowed the FSM to stop walking too early. I corrected this with world-frame proximity and
yaw gating, and I kept that failure visible in the report because it explains why the final
validation story is careful."

## Closing

"The value of this work is that it establishes a debuggable autonomy baseline. Each subsystem —
locomotion, reaching, grasping, release validation, and future perception — can now be upgraded
without losing traceability."
