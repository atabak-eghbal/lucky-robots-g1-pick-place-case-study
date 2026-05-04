# Repo Snapshot: lucky-robots-g1-pick-place-case-study

## Repo Tree

```text
lucky-robots-g1-pick-place-case-study
├── assets
├── notes
│   └── source-brief.md
├── pages
│   ├── code
│   │   ├── common-controller.html
│   │   ├── common-grasp.html
│   │   ├── common-onnx-policy.html
│   │   ├── common-scene.html
│   │   ├── config-simulation.html
│   │   ├── dev-log.html
│   │   ├── policies-base.html
│   │   ├── policies-fsm-core.html
│   │   ├── policies-fsm.html
│   │   ├── policies-keyboard.html
│   │   ├── run.html
│   │   ├── scripts-smoke-env.html
│   │   └── scripts-test-fsm-approach.html
│   ├── architecture.html
│   ├── challenge.html
│   ├── fsm-baseline.html
│   ├── implementation-deep-dive.html
│   ├── lessons.html
│   ├── limitations-next-steps.html
│   ├── references.html
│   ├── results.html
│   └── visual-oracle.html
├── index.html
├── README.md
├── repo_snapshot.md
├── script.js
└── style.css
```

## File Contents

---

## FILE: `README.md`

```md
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

## Terminology used in this report

| Term | Meaning |
|------|---------|
| Manual baseline | The original keyboard-controlled MuJoCo demo shipped with the challenge |
| GT FSM baseline | The autonomous controller implemented in this submission |
| Visual Oracle | The architectural perception extension; not implemented in this submission |
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

---

## FILE: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Engineering a Modular Pick-and-Place Baseline for the Unitree G1 Humanoid</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero" id="top">
        <div class="hero-content">
          <p class="eyebrow">Engineering Submission — Lucky Robots G1 Take-Home Challenge</p>
          <h1>Engineering a Modular Pick-and-Place Baseline for the Unitree G1 Humanoid</h1>
          <p class="subtitle">
            Ground-truth FSM baseline converting a manual MuJoCo demo into an autonomous
            pick-and-place controller, with an architectural design for a Visual Oracle perception
            extension.
          </p>
          <ul class="badge-list">
            <li>MuJoCo</li>
            <li>Unitree G1</li>
            <li>ONNX Runtime</li>
            <li>Finite-State Machine</li>
            <li>Depth Back-Projection</li>
            <li>Visual Oracle</li>
          </ul>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="pages/challenge.html">Challenge</a>
            <a href="pages/architecture.html">Architecture</a>
            <a href="pages/fsm-baseline.html">FSM Baseline</a>
            <a href="pages/visual-oracle.html">Visual Oracle</a>
            <a href="pages/lessons.html">Lessons</a>
            <a href="pages/results.html">Results</a>
            <a href="pages/implementation-deep-dive.html">Implementation</a>
            <a href="pages/limitations-next-steps.html">Limitations</a>
            <a href="pages/references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content post">
        <section>
          <h2>Executive summary</h2>
          <p>
            This submission converts the original manual keyboard-controlled MuJoCo demo for the
            Unitree G1 humanoid into an autonomous pick-and-place controller. The primary deliverable
            is the <strong>ground-truth FSM baseline (GT FSM)</strong>: a 12-state finite-state
            machine that coordinates the walker and right-reacher ONNX policies, attaches objects
            kinematically, and completes the end-to-end pick-and-place sequence in simulation.
          </p>
          <p>
            A <strong>Visual Oracle</strong> perception extension is documented as an architectural
            follow-on for source-side localization. It is explicitly out of scope for the implemented
            baseline and is treated throughout this report as <em>future / proposed</em>, not as completed
            functionality.
          </p>
          <p>
            The GT FSM baseline is scoped as a debuggable baseline, not a production robotics stack.
            Every threshold and timeout is tied to an observation in the development log. Simulation-only
            caveats — kinematic grasping, no hardware transfer, and incomplete post-release validation —
            are stated explicitly rather than hidden behind a polished clip.
          </p>
        </section>
      
        <section>
          <h2>Reviewer guide</h2>
          <p>
            This site is structured as an engineering report, not a demo showcase. Use the path that matches
            your available time.
          </p>
          <table class="milestone-table">
            <thead>
              <tr>
                <th>Reading path</th>
                <th>Pages</th>
                <th>What you will learn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>3 min</strong></td>
                <td><a href="pages/results.html">Results</a></td>
                <td>What was built, what is actually supported by evidence, and the key caveats.</td>
              </tr>
              <tr>
                <td><strong>10 min</strong></td>
                <td>
                  <a href="pages/fsm-baseline.html">FSM Baseline</a> +
                  <a href="pages/lessons.html">Lessons</a> +
                  <a href="pages/results.html">Results</a>
                </td>
                <td>The control decomposition, the key engineering decisions, and the validated milestones.</td>
              </tr>
              <tr>
                <td><strong>20 min</strong></td>
                <td>
                  <a href="pages/implementation-deep-dive.html">Implementation</a> +
                  <a href="pages/architecture.html">Architecture</a> +
                  <a href="pages/limitations-next-steps.html">Limitations</a> +
                  <a href="pages/video-walkthrough.html">Video Walkthrough</a>
                </td>
                <td>File-by-file code auditability, module boundaries, evidence provenance, and next steps.</td>
              </tr>
            </tbody>
          </table>
        </section>
      
        <section>
          <h2>Contribution statement</h2>
          <h3>What changed from the manual baseline</h3>
          <p>
            The challenge repository shipped a keyboard-controlled MuJoCo demo. This submission replaces
            manual input with an explicit 12-state FSM that drives locomotion, source approach, hover,
            descent, kinematic attachment, source lift, target transport, release, and retraction.
          </p>
      
          <h3>What is implemented</h3>
          <ul class="bullet-list">
            <li>Shared runtime orchestration in <code>run.py</code>.</li>
            <li>Walker / right-reacher composition in <code>common/controller.py</code>.</li>
            <li>Kinematic grasp backend in <code>common/grasp.py</code>.</li>
            <li>GT FSM sequencing and geometry logic in <code>policies/fsm_core.py</code>.</li>
            <li>Headless smoke and integration checks in <code>scripts/</code>.</li>
          </ul>
      
          <h3>What is intentionally limited</h3>
          <ul class="bullet-list">
            <li>Grasping is kinematic attachment, not physical finger-contact grasping.</li>
            <li>Final post-release table membership is not robustly validated after settling.</li>
            <li>The Visual Oracle is documented architecturally but not implemented in this submission.</li>
            <li>All results are simulation-only in MuJoCo; no hardware transfer has been attempted.</li>
          </ul>
        </section>
      
        <section>
          <h2>Evidence legend</h2>
          <div class="evidence-legend">
            <div class="evidence-legend-item">
              <span class="status-badge status-verified">Verified</span>
              <span>Confirmed by headless smoke test or a logged development run.</span>
            </div>
            <div class="evidence-legend-item">
              <span class="status-badge status-visual">Visually verified</span>
              <span>Observed in a reference MuJoCo run, but not fully confirmed by an end-state checker.</span>
            </div>
            <div class="evidence-legend-item">
              <span class="status-badge status-future">Future / proposed</span>
              <span>Architectural extension or research direction; not implemented in this submission.</span>
            </div>
          </div>
        </section>
      
        <section>
          <h2>What is proven, what is visual, what is future</h2>
          <div class="card-grid">
            <article class="card">
              <h3><span class="status-badge status-verified">Verified</span></h3>
              <p>
                Environment readiness, source-side approach, hover and descend behaviour, kinematic attach,
                source lift, and target-side transport logic are all supported by DEV_LOG entries or headless
                checks.
              </p>
            </article>
            <article class="card">
              <h3><span class="status-badge status-visual">Visually verified</span></h3>
              <p>
                Final blue-table placement is best presented as visually successful in simulation, with a
                known caveat around when table-membership is evaluated relative to post-release settling.
              </p>
            </article>
            <article class="card">
              <h3><span class="status-badge status-future">Future / proposed</span></h3>
              <p>
                The Visual Oracle source-localization layer, more robust release validation, and broader
                perception / learned-policy upgrades belong in the future-work band.
              </p>
            </article>
          </div>
        </section>
      
        <section>
          <h2>Why this approach</h2>
          <ul class="bullet-list">
            <li><strong>Problem decomposition:</strong> perception, locomotion, manipulation, grasp, and sequencing are separated behind explicit interfaces.</li>
            <li><strong>Methodological reasoning:</strong> thresholds are derived from measurements, not guessed.</li>
            <li><strong>Adaptability:</strong> the report surfaces failed assumptions, including the normalization and target-side false-positive bugs.</li>
            <li><strong>Technical depth:</strong> non-obvious policy interactions, including the always-on reacher requirement, are documented explicitly.</li>
            <li><strong>Communication:</strong> the site distinguishes implemented work from architecture and future work on every reviewer-facing page.</li>
          </ul>
        </section>
      
        <section>
          <h2>Key evidence from the development log</h2>
          <ul class="bullet-list">
            <li>Headless smoke test passed for scene load, camera names, body names, site names, joints, and ONNX warmup.</li>
            <li>Walker double-normalization bug found and corrected by passing raw observations to the walker policy.</li>
            <li>Right reacher must run continuously to preserve the walker's expected arm-joint distribution.</li>
            <li>Reacher accuracy floor plateaued around 12–13 cm, which set hover, descend, and attach thresholds.</li>
            <li>Kinematic attach was observed at 0.128 m with a 0.030 m snap offset.</li>
            <li>Target-side placement initially produced a false positive and required a more honest validation story.</li>
          </ul>
        </section>
      
        <section>
          <h2>Artifact manifest</h2>
          <div class="code-note">
            <strong>Replace before submission</strong>
            <p>
              Set the three external links below once. Do not leave reviewer-facing <code>TBD</code> markers
              anywhere else in the site.
            </p>
            <ul class="bullet-list">
              <li>Implementation repository: <a href="{{REPO_URL}}">{{REPO_URL}}</a></li>
              <li>Demo video: <a href="{{VIDEO_URL}}">{{VIDEO_URL}}</a></li>
              <li>Write-up PDF: <a href="{{WRITEUP_URL}}">{{WRITEUP_URL}}</a></li>
            </ul>
          </div>
      
          <div class="card-grid">
            <a class="card card-link" href="pages/results.html">
              <h3>Results</h3>
              <p>Milestone table with evidence status and reproducible figures.</p>
            </a>
            <a class="card card-link" href="pages/implementation-deep-dive.html">
              <h3>Implementation</h3>
              <p>Audit-oriented entry point to the GT FSM source files.</p>
            </a>
            <a class="card card-link" href="pages/video-walkthrough.html">
              <h3>Video Walkthrough</h3>
              <p>Reviewer-facing 7–8 minute script and on-screen sequence.</p>
            </a>
            <a class="card card-link" href="pages/references.html">
              <h3>References</h3>
              <p>Official docs, official research pages, and future-work references.</p>
            </a>
          </div>
        </section>
      </main>

    </div>
    <script src="script.js"></script>
  </body>
</html>
```

---

## FILE: `notes/source-brief.md`

```md
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
- **Key lessons:** normalization pitfalls, always-on reacher constraints, accuracy limits, turn-rate
  behavior, and vision freeze strategy.
- **Results + limitations:** milestone table, plot placeholders, and clear caveats about kinematic
  grasping and sim-only validation.

## Tone goals
Professional, technical, and portfolio-ready. Be explicit about tradeoffs, avoid exaggerated
claims, and keep the focus on engineering decisions.
```

---

## FILE: `pages/architecture.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Architecture | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Architecture</p>
          <h1>System Decomposition and Runtime Architecture</h1>
          <p class="subtitle">A modular view of the baseline’s runtime, policies, and helpers.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="./challenge.html">Challenge</a>
            <a href="./architecture.html">Architecture</a>
            <a href="./fsm-baseline.html">FSM Baseline</a>
            <a href="./visual-oracle.html">Visual Oracle</a>
            <a href="./lessons.html">Lessons</a>
            <a href="./results.html">Results</a>
            <a href="./implementation-deep-dive.html">Implementation</a>
            <a href="./limitations-next-steps.html">Limitations</a>
            <a href="./references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content post">
        <section>
          <p>
            This page describes the system decomposition and runtime architecture of the GT FSM
            baseline. Each module is labelled with its implementation status.
          </p>
          <div class="evidence-legend">
            <div class="evidence-legend-item">
              <span class="module-status module-status--impl">Implemented</span>
              <span>Present in the GT FSM baseline submitted here.</span>
            </div>
            <div class="evidence-legend-item">
              <span class="module-status module-status--arch">Architectural</span>
              <span>Designed; not implemented in this submission.</span>
            </div>
            <div class="evidence-legend-item">
              <span class="module-status module-status--future">Future</span>
              <span>Identified next step; not designed in detail here.</span>
            </div>
          </div>
        </section>

        <section>
          <h2>System decomposition</h2>
          <p>
            The baseline is decomposed into five narrow, testable modules so each subsystem can be
            tuned in isolation while still supporting end-to-end runs. Each module exposes explicit
            logs and thresholds for repeatable debugging.
          </p>
          <div class="card-grid">
            <article class="card">
              <h3>Perception <span class="module-status module-status--arch">Architectural</span></h3>
              <p>
                Depth + segmentation back-projection to recover a source-side object pose. Used by
                the Visual Oracle extension. Ground-truth lookup (direct simulation state read) is
                used in the GT FSM baseline instead.
              </p>
            </article>
            <article class="card">
              <h3>Locomotion <span class="module-status module-status--impl">Implemented</span></h3>
              <p>ONNX walker policy handles coarse navigation and stance stability.</p>
            </article>
            <article class="card">
              <h3>Manipulation <span class="module-status module-status--impl">Implemented</span></h3>
              <p>
                ONNX right reacher overlays arm motion while the walker continues to step. Runs
                unconditionally (always-on) to keep arm joints inside the training distribution.
              </p>
            </article>
            <article class="card">
              <h3>Grasp <span class="module-status module-status--impl">Implemented</span></h3>
              <p>
                Kinematic attachment backend for deterministic pickup and release. This is a
                simulation shortcut, not physical finger contact.
              </p>
            </article>
            <article class="card">
              <h3>Sequencing <span class="module-status module-status--impl">Implemented</span></h3>
              <p>
                12-state finite-state machine coordinates phases, exit conditions, debounce, and
                timeout fallbacks.
              </p>
            </article>
          </div>
        </section>

        <section>
          <h2>Runtime module layout</h2>
          <p>
            The runtime keeps policy logic separate from control plumbing so each layer can be
            instrumented independently. The core flow is orchestration → policy decisions →
            control synthesis → simulation feedback.
          </p>
          <ul class="bullet-list">
            <li>
              <strong>run.py</strong>
              <span class="module-status module-status--impl">Implemented</span>
              — runtime orchestrator and entry point.
            </li>
            <li>
              <strong>common/controller.py</strong>
              <span class="module-status module-status--impl">Implemented</span>
              — walker/reacher controller layer; assembles observation vectors and dispatches ONNX
              policy calls.
            </li>
            <li>
              <strong>common/grasp.py</strong>
              <span class="module-status module-status--impl">Implemented</span>
              — kinematic grasp backend; handles attach, carry, and release.
            </li>
            <li>
              <strong>policies/fsm_core.py</strong>
              <span class="module-status module-status--impl">Implemented</span>
              — ground-truth FSM baseline; 12 states driven by empirically-tuned thresholds.
            </li>
            <li>
              <strong>policies/fsm_visual_oracle.py</strong>
              <span class="module-status module-status--arch">Architectural</span>
              — Visual Oracle extension; replaces ground-truth pose lookup with camera-estimated
              pose. Not in this submission.
            </li>
            <li>
              <strong>vision/geometry.py</strong>
              <span class="module-status module-status--arch">Architectural</span>
              — depth back-projection helpers. Not in this submission.
            </li>
            <li>
              <strong>vision/observer.py</strong>
              <span class="module-status module-status--arch">Architectural</span>
              — EMA observer wrapping the depth back-projection. Not in this submission.
            </li>
          </ul>
          <figure class="figure">
            <img
              src="../assets/architecture.svg"
              alt="Architecture diagram showing the runtime orchestrator feeding policy, controller, ONNX policies, and MuJoCo simulation with a vision observer input."
              loading="lazy"
            />
            <figcaption>
              Runtime orchestration from policy decisions to controller output, with the Vision
              Observer feeding the FSM and Visual Oracle layers. Modules marked Architectural are
              shown for completeness; they are not implemented in this submission.
            </figcaption>
          </figure>
        </section>

        <section>
          <h2>Key design decisions</h2>
          <p>
            The decomposition was chosen to satisfy specific engineering requirements, each
            traceable to a development-log observation:
          </p>
          <ul class="bullet-list">
            <li>
              <strong>Always-on reacher:</strong> Running the right reacher unconditionally prevents
              arm-joint drift outside the training distribution. Gating it on reach phases produced
              recovery failures.
            </li>
            <li>
              <strong>Separate grasp module:</strong> Isolating kinematic attachment from the
              controller layer makes it easy to swap for a contact-physics backend without touching
              policy logic.
            </li>
            <li>
              <strong>Single source-pose interface:</strong> Both the GT FSM and the Visual Oracle
              extension read source position through one function. Switching between ground-truth
              and camera-estimated pose is a one-line change in that function.
            </li>
            <li>
              <strong>Explicit FSM over learned planner:</strong> An explicit state machine exposes
              every transition threshold and timeout as a named parameter. This makes failure
              diagnosis and threshold tuning repeatable.
            </li>
          </ul>
        </section>
      </main>
    </div>
    <script src="../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/challenge.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Challenge | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Challenge</p>
          <h1>The G1 Pick-and-Place Task</h1>
          <p class="subtitle">Why this autonomous baseline is harder than it first appears.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="./challenge.html">Challenge</a>
            <a href="./architecture.html">Architecture</a>
            <a href="./fsm-baseline.html">FSM Baseline</a>
            <a href="./visual-oracle.html">Visual Oracle</a>
            <a href="./lessons.html">Lessons</a>
            <a href="./results.html">Results</a>
            <a href="./implementation-deep-dive.html">Implementation</a>
            <a href="./limitations-next-steps.html">Limitations</a>
            <a href="./references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content post">
        <section>
          <p>
            This page frames the starting conditions, the task scope, and why autonomous
            pick-and-place on a humanoid is harder than simply reaching for a cylinder. It also
            distinguishes what is implemented in this submission from what is designed at the
            architectural level and what remains future work.
          </p>
        </section>

        <section>
          <h2>Starting conditions: the manual baseline</h2>
          <p>
            The Lucky Robots G1 challenge repository shipped a <strong>manual baseline</strong>: a
            keyboard-controlled MuJoCo demo for the Unitree G1 humanoid. It included walker and
            reacher ONNX policies, a full robot model, a configured scene with source and target
            tables, and multi-camera visibility. The human operator sent velocity and arm-target
            commands at each timestep; no autonomy was present.
          </p>
          <p>
            The task was to convert that manual baseline into an autonomous controller — without
            hiding where the system still fails.
          </p>
        </section>

        <section>
          <h2>What the GT FSM baseline delivers</h2>
          <p>
            The <strong>ground-truth FSM baseline (GT FSM)</strong> is the primary deliverable of
            this submission. It replaces manual input with a 12-state finite-state machine that
            drives the robot through the full pick-and-place sequence:
          </p>
          <ul class="bullet-list">
            <li>Settle and stabilize stance.</li>
            <li>Approach the source table using the walker ONNX policy.</li>
            <li>Hover and descend the arm to the cylinder using the always-on right reacher.</li>
            <li>Attach the cylinder kinematically once within grasp range.</li>
            <li>Lift and carry the object while walking to the target table.</li>
            <li>Lower, release, and retract.</li>
          </ul>
          <p>
            "Ground-truth" means the source object pose is read directly from the simulation state
            rather than estimated from camera data. This is an intentional baseline choice: it
            isolates sequencing and policy-coordination correctness from perception correctness.
          </p>
        </section>

        <section>
          <h2>What is architectural: the Visual Oracle</h2>
          <p>
            The <strong>Visual Oracle</strong> is a camera-based source-localization layer designed
            to replace the ground-truth pose lookup for source-side phases. It uses deterministic
            depth back-projection and EMA smoothing to estimate the cylinder's position from the
            robot's head camera. The architecture is documented in the
            <a href="./visual-oracle.html">Visual Oracle</a> appendix.
          </p>
          <p>
            The Visual Oracle is an architectural design in this submission. It is not implemented.
            Integrating it requires changing the source-pose lookup in one FSM function; the
            sequencing logic and policy-coordination plumbing are otherwise unchanged.
          </p>
        </section>

        <section>
          <h2>Future research roadmap</h2>
          <p>
            The following are identified as high-value next steps but are not included in this
            submission:
          </p>
          <ul class="bullet-list">
            <li>Physical finger-contact grasping to replace kinematic attachment.</li>
            <li>Programmatic post-release on-table confirmation.</li>
            <li>Visual Oracle implementation and integration testing.</li>
            <li>Sim-to-real transfer: calibration, domain randomization, and hardware trials.</li>
          </ul>
          <p>
            See the <a href="./limitations-next-steps.html">Limitations &amp; Next Steps</a>
            appendix for the full gap list and prioritization.
          </p>
        </section>

        <section>
          <h2>Why this problem is hard</h2>
          <ul class="bullet-list">
            <li>Humanoid locomotion and manipulation must be coordinated concurrently, not staged.</li>
            <li>The reacher expects pelvis-frame targets, so world-frame goals require careful transforms.</li>
            <li>Learned policies have narrow operating envelopes and drift under small distribution shifts.</li>
            <li>Grasping is contact-rich, and fingertip alignment matters more than global pose accuracy.</li>
            <li>Perception timing interacts with gait, causing jitter or occlusion at the worst moments.</li>
            <li>The reacher accuracy floor (~12–13 cm radial error) is large relative to the cylinder diameter; thresholds must be set empirically, not analytically.</li>
          </ul>
        </section>
      </main>
    </div>
    <script src="../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/common-controller.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>common/controller.py — Walker/Reacher Controller | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · common/controller.py</p>
          <h1>common/controller.py — Walker/Reacher Controller</h1>
          <p class="subtitle">Composes locomotion and arm-reaching ONNX policies, assembles observations, applies rate-limiting, and writes final joint commands into MuJoCo. The most operationally critical module in the stack.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → common/controller.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./run.html">← run.py</a>
            <a href="./common-grasp.html">common/grasp.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <!-- ─── Sticky sidebar ──────────────────────────────────── -->
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> common/controller.py</p>
              <p><strong>Lines:</strong> ~397</p>
              <p>
                <code>WalkerReacherController</code> is the translation layer between high-level velocity/reach commands and raw MuJoCo actuator writes. It owns the observation assembly, PD gain tables, and the critical discovery that the walker ONNX must receive <em>raw</em> (not externally normalized) observations.
              </p>
            </div>

            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#class-init">Class definition &amp; __init__</a></li>
                <li><a href="#joint-mappings">_build_joint_mappings()</a></li>
                <li><a href="#reacher-mappings">_build_reacher_mappings()</a></li>
                <li><a href="#pd-gains">_compute_pd_gains()</a></li>
                <li><a href="#keyboard">Keyboard input handlers</a></li>
                <li><a href="#state-helpers">Base state helpers</a></li>
                <li><a href="#joint-helpers">Joint position/velocity helpers</a></li>
                <li><a href="#palm-helpers">Palm position/orientation helpers</a></li>
                <li><a href="#step">step() — central control tick</a></li>
                <li><a href="#pd-apply">Actuator caching &amp; apply_pd_control()</a></li>
                <li><a href="#full-file">Full source file ↓</a></li>
              </ul>
            </nav>

            <div class="code-section">
              <a href="#full-file" style="color: var(--accent); font-weight: 600; text-decoration: none;">Jump to full file ↓</a>
            </div>
          </aside>

          <!-- ─── Main content ──────────────────────────────────── -->
          <div class="code-main">

            <!-- 1. Class init -->
            <section class="code-section" id="class-init">
              <h3>Class definition and __init__</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Store all policy references and initialize the mutable state variables that the control loop reads and writes each tick. This is also where mode-switching state (walk vs reach) lives.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> <code>model</code>, <code>data</code> (MuJoCo handles), four ONNX policy callables, <code>config</code> dict. <strong>Out:</strong> a fully wired controller ready for <code>step()</code> calls.</p>
                <h4>Invariants</h4>
                <p>
                  <code>vel_max_angular = 1.0</code> rad/s is the physical limit of the walker — commanding above this has no extra effect but commanding below 0.25 (25% of max) was discovered (Step 6) to produce near-zero actual turn rate. The FSM uses 1.0 for Phase 1 turns to ensure the robot actually rotates.<br>
                  <code>arm_max_delta = 0.012</code> rad/tick is the per-joint rate limiter on arm motion. At 50 Hz this limits arm velocity to 0.6 rad/s.
                </p>
                <h4>Failure modes</h4>
                <p><code>right_reacher_policy=None</code> is a valid state — the controller simply skips the reacher step in <code>step()</code>. The FSM path always passes a reacher.</p>
                <h4>Why it matters</h4>
                <p>The controller is the only code that directly touches MuJoCo's <code>data.ctrl</code>. Everything else issues high-level commands that flow through here. Keeping this boundary clean makes it safe to swap policies or add new modes without touching physics.</p>
              </div>
              <div class="code-block"><pre><code>class WalkerReacherController:
  """Full G1 controller with locomotion mode switching and arm reaching."""

  # GLFW key codes
  KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT = 265, 264, 263, 262
  KEY_SEMICOLON, KEY_APOSTROPHE = 59, 39
  KEY_COMMA, KEY_PERIOD, KEY_SLASH, KEY_BACKSLASH = 44, 46, 47, 92
  KEY_COMMA_GRIP = 44  # , = Grip toggle

  WALKER_HEIGHT = 0.80

  def __init__(self, model, data, walker, croucher, rotator, config,
               right_reacher=None):
    self.model = model
    self.data = data
    self.walker_policy = walker
    self.croucher_policy = croucher
    self.rotator_policy = rotator
    self.right_reacher_policy = right_reacher
    self.config = config

    # Input mode: WALK or REACH (. toggles)
    self.input_mode = "walk"

    # Walk state
    self.lin_vel_x = 0.0
    self.lin_vel_y = 0.0
    self.ang_vel_z = 0.0
    self.vel_step_linear = 0.2
    self.vel_step_angular = 0.2
    self.vel_max_linear = 2.0
    self.vel_max_angular = 1.0

    # Reach state
    self.reach_active = False
    self.reach_target = np.array([0.3, -0.2, 0.2], dtype=np.float32)
    self.reach_orientation = np.zeros(3, dtype=np.float32)
    self.reach_step = 0.05
    self.last_arm_action = np.zeros(7, dtype=np.float32)
    self.last_arm_target = None
    self.arm_max_delta = 0.012

    self.last_action = np.zeros(29, dtype=np.float32)

    # Right hand grip state
    self.grip_closed = False

    self._build_joint_mappings()
    self._build_reacher_mappings()
    self._compute_pd_gains()
    self._cache_actuator_ids()
    self._cache_finger_actuators()</code></pre></div>
            </section>

            <!-- 2. Joint mappings -->
            <section class="code-section" id="joint-mappings">
              <h3>_build_joint_mappings() — qpos/qvel index tables</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Build lookup tables from joint names to their <code>qpos</code> and <code>qvel</code> array indices. Also extract default joint positions and per-joint action scales from the config. Identify which joints belong to arms so they can be zeroed before the reacher overlay.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> <code>self.config["joint_names"]</code>, <code>config["default_joint_pos"]</code>, <code>config["action_scales"]</code>. <strong>Out:</strong> <code>self.joint_qpos_indices</code>, <code>self.joint_qvel_indices</code>, <code>self.default_joint_pos</code>, <code>self.action_scales</code>, <code>self.arm_indices</code>.</p>
                <h4>Invariants</h4>
                <p>
                  MuJoCo's qpos layout: indices 0–6 are the pelvis freejoint (pos + quat), indices 7+ are body joints in model order. The formula <code>qpos_index = 7 + i</code> assumes joint ordering in <code>joint_names</code> matches the model's joint ordering exactly — enforced by <code>model_config.json</code>.<br>
                  <code>arm_indices</code> includes both left and right arm joints. The reacher overlay writes only <code>right_arm_indices</code>; the left arm columns remain at <code>default_joint_pos</code>.
                </p>
                <h4>Failure modes</h4>
                <p>A joint in config that does not exist in the model is silently skipped in the default_pos loop. A missing action scale would cause a KeyError — all 29 joints must have entries.</p>
                <h4>Why it matters</h4>
                <p>Done once at init so <code>step()</code> can do O(1) array index lookups at 50 Hz without string lookups or <code>mj_name2id</code> calls.</p>
              </div>
              <div class="code-block"><pre><code>def _build_joint_mappings(self):
  self.joint_names = self.config["joint_names"]
  self.num_joints = len(self.joint_names)
  self.joint_qpos_indices = {n: 7 + i for i, n in enumerate(self.joint_names)}
  self.joint_qvel_indices = {n: 6 + i for i, n in enumerate(self.joint_names)}

  self.default_joint_pos = np.zeros(self.num_joints, dtype=np.float32)
  for name, value in self.config["default_joint_pos"].items():
    if name in self.joint_names:
      self.default_joint_pos[self.joint_names.index(name)] = value

  self.action_scales = np.array(
    [self.config["action_scales"][n] for n in self.joint_names], dtype=np.float32
  )

  arm_patterns = ["shoulder_pitch", "shoulder_roll", "shoulder_yaw",
                  "elbow", "wrist_roll", "wrist_pitch", "wrist_yaw"]
  self.arm_indices = []
  for i, name in enumerate(self.joint_names):
    if any(p in name for p in arm_patterns):
      self.arm_indices.append(i)</code></pre></div>
            </section>

            <!-- 3. Reacher mappings -->
            <section class="code-section" id="reacher-mappings">
              <h3>_build_reacher_mappings() — right arm index subset</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Build the right-arm-specific index arrays used by the reacher overlay: which joints of the full 29-joint vector are right arm joints, their action scales, and their default positions. Also cache the palm site ID.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> <code>config["right_reacher"]</code> sub-dict (optional). <strong>Out:</strong> <code>self.right_arm_joint_names</code>, <code>self.right_arm_indices</code>, <code>self.arm_action_scales</code>, <code>self.arm_default_pos</code>, <code>self.right_palm_site_id</code>.</p>
                <h4>Invariants</h4>
                <p>The reacher ONNX outputs 7 values corresponding to the 7 right-arm joints in the exact order specified by <code>right_arm_joint_names</code>. Reordering would silently assign wrong actuator values. <code>right_palm_site_id</code> is used in both the observation assembly (palm position) and in <code>KinematicAttachment</code> (passed out via <code>ctrl.right_palm_site_id</code>).</p>
                <h4>Failure modes</h4>
                <p>If a right-arm joint name is not in the full <code>joint_names</code> list the index comprehension silently skips it, producing a shorter <code>right_arm_indices</code> list and causing shape mismatches later.</p>
                <h4>Why it matters</h4>
                <p>Separating right-arm indices from the full 29-joint list is what makes the walker/reacher overlay possible: walker writes 29 targets, reacher overwrites only the 7 right-arm columns.</p>
              </div>
              <div class="code-block"><pre><code>def _build_reacher_mappings(self):
  rc = self.config.get("right_reacher", {})
  self.right_arm_joint_names = rc.get("arm_joint_names", [
    "right_shoulder_pitch_joint", "right_shoulder_roll_joint",
    "right_shoulder_yaw_joint", "right_elbow_joint",
    "right_wrist_roll_joint", "right_wrist_pitch_joint",
    "right_wrist_yaw_joint",
  ])
  self.right_arm_indices = [
    self.joint_names.index(n) for n in self.right_arm_joint_names
    if n in self.joint_names
  ]
  arm_scales = rc.get("arm_action_scales", {})
  self.arm_action_scales = np.array([
    arm_scales.get(n, self.action_scales[self.joint_names.index(n)])
    for n in self.right_arm_joint_names
  ], dtype=np.float32)
  arm_defaults = rc.get("arm_default_pos", {})
  self.arm_default_pos = np.array([
    arm_defaults.get(n, self.default_joint_pos[self.joint_names.index(n)])
    for n in self.right_arm_joint_names
  ], dtype=np.float32)
  self.right_palm_site_id = mujoco.mj_name2id(
    self.model, mujoco.mjtObj.mjOBJ_SITE, "right_palm"
  )</code></pre></div>
            </section>

            <!-- 4. PD gains -->
            <section class="code-section" id="pd-gains">
              <h3>_compute_pd_gains() — actuator PD constants</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Populate per-joint kp (proportional gain), kd (derivative gain), and effort limit arrays based on actuator class. The class-to-gain mapping mirrors the physical G1 actuator hardware specifications.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> <code>self.joint_names</code>. <strong>Out:</strong> <code>self.kp</code>, <code>self.kd</code>, <code>self.effort_limit</code> (all shape [num_joints]).</p>
                <h4>Invariants</h4>
                <p>
                  The 5 actuator classes are: <code>5020</code> (shoulder/elbow/wrist_roll — S=14.25, D=0.91, E=25N·m), <code>7520_14</code> (hip_pitch/yaw, waist_yaw — heavier hip joints), <code>7520_22</code> (hip_roll/knee — highest effort), <code>4010</code> (wrist_pitch/yaw — light), and ankles/waist_pitch/roll (2× the 5020 values).<br>
                  These gains are <em>not</em> used to write torques directly — MuJoCo's position actuators use them internally. The array is built for documentation and potential external use.
                </p>
                <h4>Failure modes</h4>
                <p>None — the <code>else</code> fallback assigns <code>S5020</code> to any unrecognized joint name.</p>
                <h4>Why it matters</h4>
                <p>The ONNX policies were trained with these specific gain values. Using different gains changes the effective stiffness of each joint and can cause the robot to behave very differently from training, leading to falls.</p>
              </div>
              <div class="code-block"><pre><code>def _compute_pd_gains(self):
  S5020, D5020, E5020 = 14.2506, 0.9072, 25.0
  S7520_14, D7520_14, E7520_14 = 40.1792, 2.5579, 88.0
  S7520_22, D7520_22, E7520_22 = 99.0984, 6.3088, 139.0
  S4010, D4010, E4010 = 16.7783, 1.0681, 5.0

  self.kp = np.zeros(self.num_joints, dtype=np.float32)
  self.kd = np.zeros(self.num_joints, dtype=np.float32)
  self.effort_limit = np.zeros(self.num_joints, dtype=np.float32)

  for i, name in enumerate(self.joint_names):
    if "elbow" in name or "shoulder" in name or "wrist_roll" in name:
      self.kp[i], self.kd[i], self.effort_limit[i] = S5020, D5020, E5020
    elif "hip_pitch" in name or "hip_yaw" in name or name == "waist_yaw_joint":
      self.kp[i], self.kd[i], self.effort_limit[i] = S7520_14, D7520_14, E7520_14
    elif "hip_roll" in name or "knee" in name:
      self.kp[i], self.kd[i], self.effort_limit[i] = S7520_22, D7520_22, E7520_22
    elif "wrist_pitch" in name or "wrist_yaw" in name:
      self.kp[i], self.kd[i], self.effort_limit[i] = S4010, D4010, E4010
    elif "ankle" in name or name in ("waist_pitch_joint", "waist_roll_joint"):
      self.kp[i], self.kd[i], self.effort_limit[i] = S5020 * 2, D5020 * 2, E5020 * 2
    else:
      self.kp[i], self.kd[i], self.effort_limit[i] = S5020, D5020, E5020</code></pre></div>
            </section>

            <!-- 5. Keyboard handlers -->
            <section class="code-section" id="keyboard">
              <h3>Keyboard input handlers — key_callback, _handle_walk_key, _handle_reach_key</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Process GLFW key events and update the walk velocity commands or reach target position. The <code>.</code> key toggles between WALK and REACH modes. Grip is toggled with <code>,</code> regardless of mode.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> GLFW keycode integer. <strong>Out:</strong> mutates <code>lin_vel_x/y</code>, <code>ang_vel_z</code>, <code>reach_target</code>, <code>reach_active</code>, <code>grip_closed</code>, <code>input_mode</code>.</p>
                <h4>Invariants</h4>
                <p>Walk velocities are clamped to <code>±vel_max_linear</code> and <code>±vel_max_angular</code>. Reach targets are clamped to the reacher's training workspace: x ∈ [−0.30, 0.60], y ∈ [−0.60, 0.30], z ∈ [−0.40, 0.60]. The keyboard path is the original manual control — never changes autonomous FSM behavior.</p>
                <h4>Failure modes</h4>
                <p>Unknown keycodes reach the <code>return</code> fallback without any side effect. Mode-switching without a reacher policy loaded prints a warning and returns without changing mode.</p>
                <h4>Why it matters</h4>
                <p>The keyboard path was kept intact as a regression check. Running <code>python run.py --policy keyboard</code> allows manual verification that the robot still responds correctly after any refactor.</p>
              </div>
              <div class="code-block"><pre><code>def key_callback(self, key: int) -&gt; None:
  if key == self.KEY_COMMA_GRIP:
    self.grip_closed = not self.grip_closed
    print(f"[GRIP] Right hand: {'CLOSED' if self.grip_closed else 'OPEN'}")
    return

  if key == self.KEY_PERIOD:
    if self.right_reacher_policy is None:
      print("[WARN] No right reacher policy loaded")
      return
    if self.input_mode == "walk":
      self.input_mode = "reach"
      self.reach_active = True
      self.reach_target[:] = [0.3, -0.2, 0.2]
      self.reach_orientation[:] = 0.0
      self.last_arm_target = self._get_arm_joint_positions() + self.arm_default_pos
      print("[MODE] &gt;&gt;&gt; REACH — arrows move hand, ;/' = up/down, \\ = reset target")
    else:
      self.input_mode = "walk"
      self.reach_active = False
      if self.last_arm_target is not None:
        self.frozen_arm_pos = self.last_arm_target.copy()
      self.last_arm_target = None
      print("[MODE] &gt;&gt;&gt; WALK — arm holds position, arrows move robot")
    return

  if self.input_mode == "walk":
    self._handle_walk_key(key)
  else:
    self._handle_reach_key(key)

def _handle_walk_key(self, key: int) -&gt; None:
  if key == self.KEY_UP:
    self.lin_vel_x = np.clip(self.lin_vel_x + self.vel_step_linear, -self.vel_max_linear, self.vel_max_linear)
  elif key == self.KEY_DOWN:
    self.lin_vel_x = np.clip(self.lin_vel_x - self.vel_step_linear, -self.vel_max_linear, self.vel_max_linear)
  elif key == self.KEY_LEFT:
    self.lin_vel_y = np.clip(self.lin_vel_y + self.vel_step_linear, -self.vel_max_linear, self.vel_max_linear)
  elif key == self.KEY_RIGHT:
    self.lin_vel_y = np.clip(self.lin_vel_y - self.vel_step_linear, -self.vel_max_linear, self.vel_max_linear)
  elif key == self.KEY_SEMICOLON:
    self.ang_vel_z = np.clip(self.ang_vel_z + self.vel_step_angular, -self.vel_max_angular, self.vel_max_angular)
  elif key == self.KEY_APOSTROPHE:
    self.ang_vel_z = np.clip(self.ang_vel_z - self.vel_step_angular, -self.vel_max_angular, self.vel_max_angular)
  elif key == self.KEY_BACKSLASH or key == self.KEY_SLASH:
    self.lin_vel_x = self.lin_vel_y = self.ang_vel_z = 0.0

def _handle_reach_key(self, key: int) -&gt; None:
  if key == self.KEY_UP:
    self.reach_target[0] = np.clip(self.reach_target[0] + self.reach_step, -0.3, 0.6)
  elif key == self.KEY_DOWN:
    self.reach_target[0] = np.clip(self.reach_target[0] - self.reach_step, -0.3, 0.6)
  elif key == self.KEY_LEFT:
    self.reach_target[1] = np.clip(self.reach_target[1] + self.reach_step, -0.6, 0.3)
  elif key == self.KEY_RIGHT:
    self.reach_target[1] = np.clip(self.reach_target[1] - self.reach_step, -0.6, 0.3)
  elif key == self.KEY_SEMICOLON:
    self.reach_target[2] = np.clip(self.reach_target[2] + self.reach_step, -0.4, 0.6)
  elif key == self.KEY_APOSTROPHE:
    self.reach_target[2] = np.clip(self.reach_target[2] - self.reach_step, -0.4, 0.6)
  elif key == self.KEY_BACKSLASH or key == self.KEY_SLASH:
    self.reach_target[:] = [0.3, -0.2, 0.2]
    self.reach_orientation[:] = 0.0</code></pre></div>
            </section>

            <!-- 6. Base state helpers -->
            <section class="code-section" id="state-helpers">
              <h3>Base state helpers — pose, velocity, projected gravity</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Extract the three base-state observation components that go into the walker's observation vector: linear velocity in the pelvis frame, angular velocity in the body frame, and projected gravity direction.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>_get_base_pose():</strong> returns (pos, quat) from qpos[0:7]. <strong>_get_base_velocities():</strong> returns (lin_vel_pelvis, ang_vel_body). <strong>_get_projected_gravity():</strong> returns the gravity vector [0,0,-1] expressed in the pelvis frame.</p>
                <h4>Invariants</h4>
                <p>
                  <code>_quat_apply_inverse</code> computes q⁻¹·v using the cross-product form: <code>v - w·t + cross(xyz, t)</code> where <code>t = 2·cross(xyz, v)</code>. This is the passive rotation (world → body frame). It avoids creating a full 3×3 rotation matrix.<br>
                  The walker was trained with linear velocity expressed in the pelvis frame and angular velocity in the body frame. Using world-frame velocities would break the policy.
                </p>
                <h4>Failure modes</h4>
                <p>Quaternion normalization is not checked here — MuJoCo maintains unit quaternions internally so this is safe. If <code>data.qpos</code> is corrupted (e.g., after an invalid reset) the returned values will be wrong but no crash occurs.</p>
                <h4>Why it matters</h4>
                <p>These three components form the first 9 values of the 99-D walker observation. Getting the frame convention wrong (world vs body) was a common source of policy failures in early experiments.</p>
              </div>
              <div class="code-block"><pre><code>def _get_base_pose(self):
  return self.data.qpos[:3].copy(), self.data.qpos[3:7].copy()

@staticmethod
def _quat_apply_inverse(quat, vec):
  w, xyz = quat[0], quat[1:4]
  t = np.cross(xyz, vec) * 2
  return vec - w * t + np.cross(xyz, t)

def _get_base_velocities(self):
  lin_vel_world = self.data.qvel[:3].copy()
  ang_vel_body = self.data.qvel[3:6].copy()
  _, quat = self._get_base_pose()
  return self._quat_apply_inverse(quat, lin_vel_world), ang_vel_body

def _get_projected_gravity(self):
  _, quat = self._get_base_pose()
  return self._quat_apply_inverse(quat, np.array([0.0, 0.0, -1.0]))</code></pre></div>
            </section>

            <!-- 7. Joint helpers -->
            <section class="code-section" id="joint-helpers">
              <h3>Joint position and velocity helpers</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Read current joint positions (relative to default) and velocities for all 29 joints, and for the 7 right-arm joints separately. These form the main body of the walker and reacher observation vectors.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>Out (joint pos):</strong> <code>float32[29]</code> — <code>qpos[7+i] - default_joint_pos[i]</code> for each joint. Policy sees deviation from default, not absolute angle. <strong>Out (joint vel):</strong> <code>float32[29]</code> — raw qvel for each joint. <strong>Right arm variants:</strong> same but for the 7-element right-arm subset.</p>
                <h4>Invariants</h4>
                <p>Joint positions are relative to <code>default_joint_pos</code> — the policy was trained with this offset applied. Using absolute angles would cause the "zero" observation to correspond to a crouched pose rather than the default standing pose.</p>
                <h4>Failure modes</h4>
                <p>If a joint name is missing from the qpos/qvel index dicts (shouldn't happen after init) the index lookup raises a KeyError. Caught implicitly at init time.</p>
                <h4>Why it matters</h4>
                <p>The walker observation is 99-D: [lin_vel(3), ang_vel(3), gravity(3), joint_pos(29), joint_vel(29), last_action(29), cmd(3)]. The 29+29 middle section comes entirely from these helpers.</p>
              </div>
              <div class="code-block"><pre><code>def _get_joint_positions(self):
  pos = np.zeros(self.num_joints, dtype=np.float32)
  for i, n in enumerate(self.joint_names):
    pos[i] = self.data.qpos[self.joint_qpos_indices[n]] - self.default_joint_pos[i]
  return pos

def _get_joint_velocities(self):
  vel = np.zeros(self.num_joints, dtype=np.float32)
  for i, n in enumerate(self.joint_names):
    vel[i] = self.data.qvel[self.joint_qvel_indices[n]]
  return vel

def _get_arm_joint_positions(self):
  pos = np.zeros(len(self.right_arm_indices), dtype=np.float32)
  for i, idx in enumerate(self.right_arm_indices):
    n = self.joint_names[idx]
    pos[i] = self.data.qpos[self.joint_qpos_indices[n]] - self.arm_default_pos[i]
  return pos

def _get_arm_joint_velocities(self):
  vel = np.zeros(len(self.right_arm_indices), dtype=np.float32)
  for i, idx in enumerate(self.right_arm_indices):
    vel[i] = self.data.qvel[self.joint_qvel_indices[self.joint_names[idx]]]
  return vel</code></pre></div>
            </section>

            <!-- 8. Palm helpers -->
            <section class="code-section" id="palm-helpers">
              <h3>Palm position and orientation helpers</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Compute palm position and orientation in the pelvis frame — the two feedback signals the reacher policy uses to servo the arm toward the reach target.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>_get_palm_pos_in_pelvis():</strong> <code>float32[3]</code> — world palm position rotated into pelvis frame. <strong>_get_palm_orientation_in_pelvis():</strong> <code>float32[3]</code> — roll/pitch/yaw Euler angles of the palm relative to the pelvis.</p>
                <h4>Invariants</h4>
                <p>
                  Palm position uses the <code>right_palm</code> site (a small marker on the robot's right hand) not a body origin — this gives a geometrically accurate end-effector position.<br>
                  Orientation uses quaternion composition: <code>rel = pelvis_inv * palm_quat</code> where <code>pelvis_inv</code> is the conjugate quaternion of the pelvis orientation. The relative quaternion is then converted to Euler angles.
                </p>
                <h4>Failure modes</h4>
                <p>The <code>mju_mat2Quat</code> call can produce a non-unit quaternion if the rotation matrix is slightly non-orthogonal due to float accumulation. In practice MuJoCo maintains orthogonal site rotation matrices so this is not an issue.</p>
                <h4>Why it matters</h4>
                <p>The reacher observation is 36-D: [reach_target(3), reach_orientation(3), palm_pos(3), palm_orientation(3), arm_joint_pos(7), arm_joint_vel(7), last_arm_action(7), proj_gravity(3)]. Palm position and orientation together form 6 of those dimensions.</p>
              </div>
              <div class="code-block"><pre><code>def _get_palm_pos_in_pelvis(self):
  palm_world = self.data.site_xpos[self.right_palm_site_id].copy()
  pos, quat = self._get_base_pose()
  return self._quat_apply_inverse(quat, palm_world - pos)

def _get_palm_orientation_in_pelvis(self):
  mat = self.data.site_xmat[self.right_palm_site_id].reshape(3, 3)
  palm_q = np.zeros(4)
  mujoco.mju_mat2Quat(palm_q, mat.flatten())
  _, pelvis_q = self._get_base_pose()
  pinv = np.array([pelvis_q[0], -pelvis_q[1], -pelvis_q[2], -pelvis_q[3]])
  w1, x1, y1, z1 = pinv
  w2, x2, y2, z2 = palm_q
  rel = np.array([
    w1*w2 - x1*x2 - y1*y2 - z1*z2,
    w1*x2 + x1*w2 + y1*z2 - z1*y2,
    w1*y2 - x1*z2 + y1*w2 + z1*x2,
    w1*z2 + x1*y2 - y1*x2 + z1*w2,
  ])
  w, x, y, z = rel
  roll = np.arctan2(2*(w*x + y*z), 1 - 2*(x*x + y*y))
  sinp = np.clip(2*(w*y - z*x), -1, 1)
  pitch = np.arcsin(sinp)
  yaw = np.arctan2(2*(w*z + x*y), 1 - 2*(y*y + z*z))
  return np.array([roll, pitch, yaw], dtype=np.float32)</code></pre></div>
            </section>

            <!-- 9. step() -->
            <section class="code-section" id="step">
              <h3>step() — the central control tick</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Compute joint position targets for all 29 joints in one tick. The walker policy provides a full-body baseline; the reacher overlays the right-arm columns unconditionally. Returns <code>target_pos</code> which run.py passes to <code>apply_pd_control()</code>.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>Reads:</strong> current MuJoCo state via all helper methods. <strong>Reads:</strong> <code>lin_vel_x/y</code>, <code>ang_vel_z</code> (walk commands set by FSM or keyboard), <code>reach_target</code>, <code>reach_orientation</code> (arm target set by FSM). <strong>Returns:</strong> <code>float32[29]</code> target joint positions.</p>
                <h4>Invariants</h4>
                <p>
                  <strong>Walker observation (99-D):</strong> <code>[lin_vel(3), ang_vel(3), proj_gravity(3), joint_pos(29), joint_vel(29), last_action(29), cmd(3)]</code><br>
                  <strong>Walker outputs raw actions:</strong> <code>target_pos = default_joint_pos + action * action_scales</code><br>
                  <strong>Walker arm columns zeroed:</strong> all arm indices (both left and right) are reset to default before the reacher writes the right arm. This prevents the walker from fighting the reacher.<br>
                  <strong>Reacher always runs:</strong> even when <code>reach_active=False</code> the reacher executes every tick to hold the arm in carry pose. The walker was trained with arms at a specific position — letting them hang at default degrades walking quality.<br>
                  <strong>Rate limiting:</strong> <code>arm_max_delta = 0.012</code> rad/tick applied per-joint to prevent jerk. The first call (when <code>last_arm_target is None</code>) skips rate limiting to allow immediate arm positioning.
                </p>
                <h4>Failure modes</h4>
                <p>
                  Passing normalized observations to the walker (external mean/std scaling) doubles-normalizes since the ONNX bakes its own normalization internally. This was the root cause of the robot falling in early Step 6 experiments — raw observations are mandatory.<br>
                  If the reacher is None, the right arm hangs at its walker-default position. With carry pose not actively maintained, walker stability degrades noticeably.
                </p>
                <h4>Why it matters</h4>
                <p>This is where locomotion and manipulation are fused. The insight that the reacher must run unconditionally (discovered in Step 6 debugging) is implemented here and is the single most important correctness invariant in the codebase. Reverting to a gated reacher causes the robot to walk very slowly or not at all.</p>
              </div>
              <div class="code-block"><pre><code>def step(self) -&gt; np.ndarray:
  # Build walker observation (always runs — keeps legs stable)
  lin_vel, ang_vel = self._get_base_velocities()
  proj_gravity = self._get_projected_gravity()
  joint_pos = self._get_joint_positions()
  joint_vel = self._get_joint_velocities()

  cmd = np.array([self.lin_vel_x, self.lin_vel_y, self.ang_vel_z], dtype=np.float32)

  obs = np.concatenate([
    lin_vel, ang_vel, proj_gravity, joint_pos, joint_vel, self.last_action, cmd,
  ]).astype(np.float32)

  # Walker policy (handles legs, waist, standing, walking, turning).
  # The ONNX bakes in its own obs normalisation — pass raw obs directly.
  action = self.walker_policy(obs)
  target_pos = self.default_joint_pos + action * self.action_scales

  # Zero walker arm outputs — reacher writes these columns.
  # Left arm: always at default (no left-arm reacher).
  for idx in self.arm_indices:
    target_pos[idx] = self.default_joint_pos[idx]

  # Reacher always runs so the right arm is actively controlled (carry
  # pose during walking, reach pose during grasping). This matches the
  # solution's architecture: the arm must be in a known pose so the
  # walker's joint-position obs match the trained distribution.
  if self.right_reacher_policy is not None:
    reacher_obs = np.concatenate([
      self.reach_target,
      self.reach_orientation,
      self._get_palm_pos_in_pelvis(),
      self._get_palm_orientation_in_pelvis(),
      self._get_arm_joint_positions(),
      self._get_arm_joint_velocities(),
      self.last_arm_action,
      proj_gravity.astype(np.float32),
    ]).astype(np.float32)

    arm_action = self.right_reacher_policy(reacher_obs)
    arm_target = self.arm_default_pos + arm_action * self.arm_action_scales

    if self.last_arm_target is not None:
      delta = np.clip(arm_target - self.last_arm_target, -self.arm_max_delta, self.arm_max_delta)
      arm_target = self.last_arm_target + delta
    self.last_arm_target = arm_target.copy()

    for i, full_idx in enumerate(self.right_arm_indices):
      target_pos[full_idx] = arm_target[i]
    self.last_arm_action = arm_action.copy()

  self.last_action = action.copy()
  return target_pos</code></pre></div>
            </section>

            <!-- 10. Actuator caching and apply_pd_control -->
            <section class="code-section" id="pd-apply">
              <h3>Actuator caching and apply_pd_control()</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Cache actuator IDs at init to avoid repeated name lookups in the control loop. <code>apply_pd_control()</code> writes the target positions to <code>data.ctrl</code> and applies the finger positions for grip.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>_cache_actuator_ids():</strong> populates <code>self.actuator_ids</code> list (one per body joint). <strong>_cache_finger_actuators():</strong> populates <code>self.right_finger_actuators</code> list of (actuator_id, closed_target) pairs. <strong>apply_pd_control(target_pos):</strong> writes all 29 body joint targets plus 7 finger joint targets to <code>data.ctrl</code>.</p>
                <h4>Invariants</h4>
                <p>
                  Finger targets: thumb curls inward (0.8 rad), index and middle curl fully (1.4/1.5 rad). When <code>grip_closed=False</code>, all fingers go to 0.0 (open hand).<br>
                  <code>act_id &gt;= 0</code> guard: <code>mj_name2id</code> returns −1 for missing names. Any missing actuator is silently skipped rather than raising an error.
                </p>
                <h4>Failure modes</h4>
                <p>If an actuator name has changed in the XML, the ID cache returns −1 and that joint never gets a command. The joint will go limp (back to its natural equilibrium) which may cause balance issues for body joints.</p>
                <h4>Why it matters</h4>
                <p>Finger control exists entirely outside the ONNX policies. The grip is a binary open/closed commanded by the FSM; it does not servo or feel contact forces. This is the fundamental limitation of the kinematic attachment grasp strategy.</p>
              </div>
              <div class="code-block"><pre><code>def _cache_actuator_ids(self):
  """Cache actuator IDs once at init instead of looking up every step."""
  self.actuator_ids = []
  for name in self.joint_names:
    self.actuator_ids.append(
      mujoco.mj_name2id(self.model, mujoco.mjtObj.mjOBJ_ACTUATOR, name)
    )

def _cache_finger_actuators(self):
  """Cache right hand finger actuator IDs and their closed targets."""
  self.right_finger_actuators = []
  finger_closed = {
    "right_hand_thumb_0_joint":  0.8,
    "right_hand_thumb_1_joint": -0.9,
    "right_hand_thumb_2_joint": -1.5,
    "right_hand_index_0_joint":  1.4,
    "right_hand_index_1_joint":  1.5,
    "right_hand_middle_0_joint": 1.4,
    "right_hand_middle_1_joint": 1.5,
  }
  for name, closed_val in finger_closed.items():
    aid = mujoco.mj_name2id(self.model, mujoco.mjtObj.mjOBJ_ACTUATOR, name)
    if aid &gt;= 0:
      self.right_finger_actuators.append((aid, closed_val))

def apply_pd_control(self, target_pos):
  for i, act_id in enumerate(self.actuator_ids):
    if act_id &gt;= 0:
      self.data.ctrl[act_id] = target_pos[i]
  for act_id, closed_val in self.right_finger_actuators:
    self.data.ctrl[act_id] = closed_val if self.grip_closed else 0.0</code></pre></div>
            </section>

            <!-- Full file appendix -->
            <section class="code-section" id="full-file">
              <h3>Full source file</h3>
              <p>Complete HTML-escaped source of <code>common/controller.py</code>.</p>
              <details class="code-details">
                <summary>
                  <span>Expand full controller.py</span>
                  <code>~397 lines</code>
                </summary>
                <div class="code-block"><pre><code>"""Low-level walker + reacher controller for the G1 robot."""

from __future__ import annotations

from typing import Literal

import mujoco
import numpy as np


class WalkerReacherController:
  """Full G1 controller with locomotion mode switching and arm reaching."""

  KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT = 265, 264, 263, 262
  KEY_SEMICOLON, KEY_APOSTROPHE = 59, 39
  KEY_COMMA, KEY_PERIOD, KEY_SLASH, KEY_BACKSLASH = 44, 46, 47, 92
  KEY_LEFT_BRACKET, KEY_RIGHT_BRACKET = 91, 93
  KEY_KP_8, KEY_KP_2, KEY_KP_6, KEY_KP_4, KEY_KP_7, KEY_KP_1, KEY_KP_5 = (
    328, 322, 326, 324, 327, 321, 325
  )
  KEY_U, KEY_J, KEY_Y, KEY_H, KEY_9, KEY_0, KEY_R = 85, 74, 89, 72, 57, 48, 82
  KEY_COMMA_GRIP = 44

  WALKER_HEIGHT = 0.80

  def __init__(self, model, data, walker, croucher, rotator, config,
               right_reacher=None):
    self.model = model
    self.data = data
    self.walker_policy = walker
    self.croucher_policy = croucher
    self.rotator_policy = rotator
    self.right_reacher_policy = right_reacher
    self.config = config

    self.input_mode: Literal["walk", "reach"] = "walk"

    self.lin_vel_x = 0.0
    self.lin_vel_y = 0.0
    self.ang_vel_z = 0.0
    self.vel_step_linear = 0.2
    self.vel_step_angular = 0.2
    self.vel_max_linear = 2.0
    self.vel_max_angular = 1.0

    self.reach_active = False
    self.reach_target = np.array([0.3, -0.2, 0.2], dtype=np.float32)
    self.reach_orientation = np.zeros(3, dtype=np.float32)
    self.reach_step = 0.05
    self.last_arm_action = np.zeros(7, dtype=np.float32)
    self.last_arm_target = None
    self.arm_max_delta = 0.012

    self.last_action = np.zeros(29, dtype=np.float32)

    self.grip_closed = False

    self._build_joint_mappings()
    self._build_reacher_mappings()
    self._compute_pd_gains()
    self._cache_actuator_ids()
    self._cache_finger_actuators()

    print("\n=== G1 Table Red Block Controller ===")
    print("  .         : Toggle WALK / REACH mode")
    print("  --- WALK mode ---")
    print("  Arrows    : Walk forward/back, strafe left/right")
    print("  ; / '     : Turn left / right")
    print("  \\         : Stop")
    print("  --- REACH mode ---")
    print("  Up/Down   : Reach forward / backward")
    print("  Left/Right: Reach left / right")
    print("  ; / '     : Reach up / down")
    print("  \\         : Reset reach to default")
    print("  --- Always ---")
    print("  ,         : Toggle grip (close/open right hand)")
    print("  Space     : Reset robot")
    print("=" * 40)

  def _build_joint_mappings(self):
    self.joint_names = self.config["joint_names"]
    self.num_joints = len(self.joint_names)
    self.joint_qpos_indices = {n: 7 + i for i, n in enumerate(self.joint_names)}
    self.joint_qvel_indices = {n: 6 + i for i, n in enumerate(self.joint_names)}

    self.default_joint_pos = np.zeros(self.num_joints, dtype=np.float32)
    for name, value in self.config["default_joint_pos"].items():
      if name in self.joint_names:
        self.default_joint_pos[self.joint_names.index(name)] = value

    self.action_scales = np.array(
      [self.config["action_scales"][n] for n in self.joint_names], dtype=np.float32
    )

    arm_patterns = ["shoulder_pitch", "shoulder_roll", "shoulder_yaw",
                    "elbow", "wrist_roll", "wrist_pitch", "wrist_yaw"]
    self.arm_indices = []
    for i, name in enumerate(self.joint_names):
      if any(p in name for p in arm_patterns):
        self.arm_indices.append(i)

  def _build_reacher_mappings(self):
    rc = self.config.get("right_reacher", {})
    self.right_arm_joint_names = rc.get("arm_joint_names", [
      "right_shoulder_pitch_joint", "right_shoulder_roll_joint",
      "right_shoulder_yaw_joint", "right_elbow_joint",
      "right_wrist_roll_joint", "right_wrist_pitch_joint",
      "right_wrist_yaw_joint",
    ])
    self.right_arm_indices = [
      self.joint_names.index(n) for n in self.right_arm_joint_names
      if n in self.joint_names
    ]
    arm_scales = rc.get("arm_action_scales", {})
    self.arm_action_scales = np.array([
      arm_scales.get(n, self.action_scales[self.joint_names.index(n)])
      for n in self.right_arm_joint_names
    ], dtype=np.float32)
    arm_defaults = rc.get("arm_default_pos", {})
    self.arm_default_pos = np.array([
      arm_defaults.get(n, self.default_joint_pos[self.joint_names.index(n)])
      for n in self.right_arm_joint_names
    ], dtype=np.float32)
    self.right_palm_site_id = mujoco.mj_name2id(
      self.model, mujoco.mjtObj.mjOBJ_SITE, "right_palm"
    )

  def _compute_pd_gains(self):
    S5020, D5020, E5020 = 14.2506, 0.9072, 25.0
    S7520_14, D7520_14, E7520_14 = 40.1792, 2.5579, 88.0
    S7520_22, D7520_22, E7520_22 = 99.0984, 6.3088, 139.0
    S4010, D4010, E4010 = 16.7783, 1.0681, 5.0

    self.kp = np.zeros(self.num_joints, dtype=np.float32)
    self.kd = np.zeros(self.num_joints, dtype=np.float32)
    self.effort_limit = np.zeros(self.num_joints, dtype=np.float32)

    for i, name in enumerate(self.joint_names):
      if "elbow" in name or "shoulder" in name or "wrist_roll" in name:
        self.kp[i], self.kd[i], self.effort_limit[i] = S5020, D5020, E5020
      elif "hip_pitch" in name or "hip_yaw" in name or name == "waist_yaw_joint":
        self.kp[i], self.kd[i], self.effort_limit[i] = S7520_14, D7520_14, E7520_14
      elif "hip_roll" in name or "knee" in name:
        self.kp[i], self.kd[i], self.effort_limit[i] = S7520_22, D7520_22, E7520_22
      elif "wrist_pitch" in name or "wrist_yaw" in name:
        self.kp[i], self.kd[i], self.effort_limit[i] = S4010, D4010, E4010
      elif "ankle" in name or name in ("waist_pitch_joint", "waist_roll_joint"):
        self.kp[i], self.kd[i], self.effort_limit[i] = S5020 * 2, D5020 * 2, E5020 * 2
      else:
        self.kp[i], self.kd[i], self.effort_limit[i] = S5020, D5020, E5020

  def key_callback(self, key: int) -&gt; None:
    if key == self.KEY_COMMA_GRIP:
      self.grip_closed = not self.grip_closed
      print(f"[GRIP] Right hand: {'CLOSED' if self.grip_closed else 'OPEN'}")
      return

    if key == self.KEY_PERIOD:
      if self.right_reacher_policy is None:
        print("[WARN] No right reacher policy loaded")
        return
      if self.input_mode == "walk":
        self.input_mode = "reach"
        self.reach_active = True
        self.reach_target[:] = [0.3, -0.2, 0.2]
        self.reach_orientation[:] = 0.0
        self.last_arm_target = self._get_arm_joint_positions() + self.arm_default_pos
        print("[MODE] &gt;&gt;&gt; REACH — arrows move hand, ;/' = up/down, \\ = reset target")
      else:
        self.input_mode = "walk"
        self.reach_active = False
        if self.last_arm_target is not None:
          self.frozen_arm_pos = self.last_arm_target.copy()
        self.last_arm_target = None
        print("[MODE] &gt;&gt;&gt; WALK — arm holds position, arrows move robot")
      return

    if self.input_mode == "walk":
      self._handle_walk_key(key)
    else:
      self._handle_reach_key(key)

  def _handle_walk_key(self, key: int) -&gt; None:
    if key == self.KEY_UP:
      self.lin_vel_x = np.clip(self.lin_vel_x + self.vel_step_linear, -self.vel_max_linear, self.vel_max_linear)
    elif key == self.KEY_DOWN:
      self.lin_vel_x = np.clip(self.lin_vel_x - self.vel_step_linear, -self.vel_max_linear, self.vel_max_linear)
    elif key == self.KEY_LEFT:
      self.lin_vel_y = np.clip(self.lin_vel_y + self.vel_step_linear, -self.vel_max_linear, self.vel_max_linear)
    elif key == self.KEY_RIGHT:
      self.lin_vel_y = np.clip(self.lin_vel_y - self.vel_step_linear, -self.vel_max_linear, self.vel_max_linear)
    elif key == self.KEY_SEMICOLON:
      self.ang_vel_z = np.clip(self.ang_vel_z + self.vel_step_angular, -self.vel_max_angular, self.vel_max_angular)
    elif key == self.KEY_APOSTROPHE:
      self.ang_vel_z = np.clip(self.ang_vel_z - self.vel_step_angular, -self.vel_max_angular, self.vel_max_angular)
    elif key == self.KEY_BACKSLASH or key == self.KEY_SLASH:
      self.lin_vel_x = self.lin_vel_y = self.ang_vel_z = 0.0
      print("[WALK] STOPPED")
      return
    else:
      return
    print(f"[WALK] vel: x={self.lin_vel_x:.1f} y={self.lin_vel_y:.1f} yaw={self.ang_vel_z:.1f}")

  def _handle_reach_key(self, key: int) -&gt; None:
    if key == self.KEY_UP:
      self.reach_target[0] = np.clip(self.reach_target[0] + self.reach_step, -0.3, 0.6)
    elif key == self.KEY_DOWN:
      self.reach_target[0] = np.clip(self.reach_target[0] - self.reach_step, -0.3, 0.6)
    elif key == self.KEY_LEFT:
      self.reach_target[1] = np.clip(self.reach_target[1] + self.reach_step, -0.6, 0.3)
    elif key == self.KEY_RIGHT:
      self.reach_target[1] = np.clip(self.reach_target[1] - self.reach_step, -0.6, 0.3)
    elif key == self.KEY_SEMICOLON:
      self.reach_target[2] = np.clip(self.reach_target[2] + self.reach_step, -0.4, 0.6)
    elif key == self.KEY_APOSTROPHE:
      self.reach_target[2] = np.clip(self.reach_target[2] - self.reach_step, -0.4, 0.6)
    elif key == self.KEY_BACKSLASH or key == self.KEY_SLASH:
      self.reach_target[:] = [0.3, -0.2, 0.2]
      self.reach_orientation[:] = 0.0
      print("[REACH] Target reset to default")
      return
    else:
      return
    print(f"[REACH] target: fwd={self.reach_target[0]:.2f} side={self.reach_target[1]:.2f} up={self.reach_target[2]:.2f}")

  def _get_base_pose(self):
    return self.data.qpos[:3].copy(), self.data.qpos[3:7].copy()

  @staticmethod
  def _quat_apply_inverse(quat, vec):
    w, xyz = quat[0], quat[1:4]
    t = np.cross(xyz, vec) * 2
    return vec - w * t + np.cross(xyz, t)

  def _get_base_velocities(self):
    lin_vel_world = self.data.qvel[:3].copy()
    ang_vel_body = self.data.qvel[3:6].copy()
    _, quat = self._get_base_pose()
    return self._quat_apply_inverse(quat, lin_vel_world), ang_vel_body

  def _get_projected_gravity(self):
    _, quat = self._get_base_pose()
    return self._quat_apply_inverse(quat, np.array([0.0, 0.0, -1.0]))

  def _get_joint_positions(self):
    pos = np.zeros(self.num_joints, dtype=np.float32)
    for i, n in enumerate(self.joint_names):
      pos[i] = self.data.qpos[self.joint_qpos_indices[n]] - self.default_joint_pos[i]
    return pos

  def _get_joint_velocities(self):
    vel = np.zeros(self.num_joints, dtype=np.float32)
    for i, n in enumerate(self.joint_names):
      vel[i] = self.data.qvel[self.joint_qvel_indices[n]]
    return vel

  def _get_arm_joint_positions(self):
    pos = np.zeros(len(self.right_arm_indices), dtype=np.float32)
    for i, idx in enumerate(self.right_arm_indices):
      n = self.joint_names[idx]
      pos[i] = self.data.qpos[self.joint_qpos_indices[n]] - self.arm_default_pos[i]
    return pos

  def _get_arm_joint_velocities(self):
    vel = np.zeros(len(self.right_arm_indices), dtype=np.float32)
    for i, idx in enumerate(self.right_arm_indices):
      vel[i] = self.data.qvel[self.joint_qvel_indices[self.joint_names[idx]]]
    return vel

  def _get_palm_pos_in_pelvis(self):
    palm_world = self.data.site_xpos[self.right_palm_site_id].copy()
    pos, quat = self._get_base_pose()
    return self._quat_apply_inverse(quat, palm_world - pos)

  def _get_palm_orientation_in_pelvis(self):
    mat = self.data.site_xmat[self.right_palm_site_id].reshape(3, 3)
    palm_q = np.zeros(4)
    mujoco.mju_mat2Quat(palm_q, mat.flatten())
    _, pelvis_q = self._get_base_pose()
    pinv = np.array([pelvis_q[0], -pelvis_q[1], -pelvis_q[2], -pelvis_q[3]])
    w1, x1, y1, z1 = pinv
    w2, x2, y2, z2 = palm_q
    rel = np.array([
      w1*w2 - x1*x2 - y1*y2 - z1*z2,
      w1*x2 + x1*w2 + y1*z2 - z1*y2,
      w1*y2 - x1*z2 + y1*w2 + z1*x2,
      w1*z2 + x1*y2 - y1*x2 + z1*w2,
    ])
    w, x, y, z = rel
    roll = np.arctan2(2*(w*x + y*z), 1 - 2*(x*x + y*y))
    sinp = np.clip(2*(w*y - z*x), -1, 1)
    pitch = np.arcsin(sinp)
    yaw = np.arctan2(2*(w*z + x*y), 1 - 2*(y*y + z*z))
    return np.array([roll, pitch, yaw], dtype=np.float32)

  def step(self) -&gt; np.ndarray:
    lin_vel, ang_vel = self._get_base_velocities()
    proj_gravity = self._get_projected_gravity()
    joint_pos = self._get_joint_positions()
    joint_vel = self._get_joint_velocities()

    cmd = np.array([self.lin_vel_x, self.lin_vel_y, self.ang_vel_z], dtype=np.float32)

    obs = np.concatenate([
      lin_vel, ang_vel, proj_gravity, joint_pos, joint_vel, self.last_action, cmd,
    ]).astype(np.float32)

    action = self.walker_policy(obs)
    target_pos = self.default_joint_pos + action * self.action_scales

    for idx in self.arm_indices:
      target_pos[idx] = self.default_joint_pos[idx]

    if self.right_reacher_policy is not None:
      reacher_obs = np.concatenate([
        self.reach_target,
        self.reach_orientation,
        self._get_palm_pos_in_pelvis(),
        self._get_palm_orientation_in_pelvis(),
        self._get_arm_joint_positions(),
        self._get_arm_joint_velocities(),
        self.last_arm_action,
        proj_gravity.astype(np.float32),
      ]).astype(np.float32)

      arm_action = self.right_reacher_policy(reacher_obs)
      arm_target = self.arm_default_pos + arm_action * self.arm_action_scales

      if self.last_arm_target is not None:
        delta = np.clip(arm_target - self.last_arm_target, -self.arm_max_delta, self.arm_max_delta)
        arm_target = self.last_arm_target + delta
      self.last_arm_target = arm_target.copy()

      for i, full_idx in enumerate(self.right_arm_indices):
        target_pos[full_idx] = arm_target[i]
      self.last_arm_action = arm_action.copy()

    self.last_action = action.copy()
    return target_pos

  def _cache_actuator_ids(self):
    """Cache actuator IDs once at init instead of looking up every step."""
    self.actuator_ids = []
    for name in self.joint_names:
      self.actuator_ids.append(
        mujoco.mj_name2id(self.model, mujoco.mjtObj.mjOBJ_ACTUATOR, name)
      )

  def _cache_finger_actuators(self):
    """Cache right hand finger actuator IDs and their closed targets."""
    self.right_finger_actuators = []
    finger_closed = {
      "right_hand_thumb_0_joint":  0.8,
      "right_hand_thumb_1_joint": -0.9,
      "right_hand_thumb_2_joint": -1.5,
      "right_hand_index_0_joint":  1.4,
      "right_hand_index_1_joint":  1.5,
      "right_hand_middle_0_joint": 1.4,
      "right_hand_middle_1_joint": 1.5,
    }
    for name, closed_val in finger_closed.items():
      aid = mujoco.mj_name2id(self.model, mujoco.mjtObj.mjOBJ_ACTUATOR, name)
      if aid &gt;= 0:
        self.right_finger_actuators.append((aid, closed_val))

  def apply_pd_control(self, target_pos):
    for i, act_id in enumerate(self.actuator_ids):
      if act_id &gt;= 0:
        self.data.ctrl[act_id] = target_pos[i]
    for act_id, closed_val in self.right_finger_actuators:
      self.data.ctrl[act_id] = closed_val if self.grip_closed else 0.0</code></pre></div>
              </details>
            </section>

          </div>
        </div>
      </main>
    </div>
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/common-grasp.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>common/grasp.py — Grasp Backend | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · common/grasp.py</p>
          <h1>common/grasp.py — Grasp Backend</h1>
          <p class="subtitle">Abstract grasp interface and kinematic-attachment implementation: teleport-welds the cylinder to the palm, disables its collisions, and zeroes its velocity every physics step to prevent drift.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → common/grasp.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./common-controller.html">← common/controller.py</a>
            <a href="./common-onnx-policy.html">common/onnx_policy.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> common/grasp.py</p>
              <p><strong>Lines:</strong> ~137</p>
              <p>The grasp backend isolates "is the object held?" from the FSM. <code>GraspBackend</code> is an ABC; <code>KinematicAttachment</code> implements it as a physics shortcut — no contact forces, just position teleportation every step.</p>
            </div>
            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#abstract">GraspBackend ABC</a></li>
                <li><a href="#kinematic-init">KinematicAttachment.__init__</a></li>
                <li><a href="#tick">tick() — state machine</a></li>
                <li><a href="#release-pub">release() — force detach</a></li>
                <li><a href="#attach">_attach() — snap + collision disable</a></li>
                <li><a href="#update-pose">_update_pose() — teleport every step</a></li>
                <li><a href="#release-priv">_release() — restore physics</a></li>
                <li><a href="#full-file">Full source file ↓</a></li>
              </ul>
            </nav>
            <div class="code-section">
              <a href="#full-file" style="color:var(--accent);font-weight:600;text-decoration:none;">Jump to full file ↓</a>
            </div>
          </aside>

          <div class="code-main">

            <section class="code-section" id="abstract">
              <h3>GraspBackend — abstract interface</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4><p>Define the minimal contract any grasp implementation must satisfy. The FSM queries only <code>attached</code> and calls <code>tick()</code> — it never knows how attachment works.</p>
                <h4>Inputs / Outputs</h4><p><strong>attached:</strong> bool property. <strong>tick(grip_closed):</strong> called after every <code>mj_step()</code>, returns current attached state. <strong>release():</strong> force-detach unconditionally.</p>
                <h4>Invariants</h4><p><code>tick()</code> must be called after <em>every</em> physics step, not just each control tick. With 4× decimation there are 4 physics steps per control tick — all 4 must call <code>tick()</code>.</p>
                <h4>Failure modes</h4><p>If <code>tick()</code> is called only at control rate, the cylinder drifts under gravity between corrections — ~0.8 mm per control tick accumulating into visible float over a 300-tick carry phase.</p>
                <h4>Why it matters</h4><p>The ABC enables swapping in a contact-force-based grasp without touching the FSM. The FSM only checks <code>grasp_backend.attached</code>.</p>
              </div>
              <div class="code-block"><pre><code>class GraspBackend(ABC):
    """Abstract grasp backend — called every physics tick from the main loop."""

    @property
    @abstractmethod
    def attached(self) -&gt; bool:
        """True while the object is kinematically attached."""

    @abstractmethod
    def tick(self, grip_closed: bool) -&gt; bool:
        """Update attachment state. Returns True if currently attached.

        Must be called after every mujoco.mj_step() so the cylinder pose is
        corrected before the next integration step.
        """

    @abstractmethod
    def release(self) -&gt; None:
        """Force-detach the object and restore its physics."""</code></pre></div>
            </section>

            <section class="code-section" id="kinematic-init">
              <h3>KinematicAttachment.__init__ — address caching</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4><p>Pre-compute all MuJoCo array addresses for fast per-step operation: freejoint qpos/qvel addresses, IDs of all cylinder geoms, and their original collision bitmasks for restoration on release.</p>
                <h4>Inputs / Outputs</h4><p><strong>In:</strong> <code>model</code>, <code>data</code>, <code>palm_site_id</code>, <code>obj_body_id</code>. <strong>Out:</strong> fully wired KinematicAttachment instance.</p>
                <h4>Invariants</h4><p>The cylinder body must have a freejoint as its first joint. <code>body_jntadr[obj_body_id]</code> gives the joint index; <code>jnt_qposadr</code> and <code>jnt_dofadr</code> give the 7-element position and 6-element velocity start addresses.</p>
                <h4>Failure modes</h4><p>A body with no joints (static body) causes <code>body_jntadr</code> to return −1 and the qpos address lookup is wrong. The cylinder must be dynamic with a freejoint.</p>
                <h4>Why it matters</h4><p>All lookups happen once at init. <code>_update_pose()</code> (hot path, 200 Hz) uses only direct array index arithmetic.</p>
              </div>
              <div class="code-block"><pre><code>    ATTACH_DIST: float = 0.13  # m: auto-attach when palm within this distance
    SNAP_DIST:   float = 0.03  # m: clamp palm-local offset so object sits in hand

    def __init__(
        self,
        model,
        data,
        palm_site_id: int,
        obj_body_id: int,
    ) -&gt; None:
        self._model    = model
        self._data     = data
        self._palm_id  = palm_site_id
        self._obj_id   = obj_body_id

        jnt_id = int(model.body_jntadr[obj_body_id])
        self._qposadr = int(model.jnt_qposadr[jnt_id])
        self._qveladr = int(model.jnt_dofadr[jnt_id])

        self._geom_ids = [
            i for i in range(model.ngeom)
            if int(model.geom_bodyid[i]) == obj_body_id
        ]
        self._orig_contype     = {g: int(model.geom_contype[g])     for g in self._geom_ids}
        self._orig_conaffinity = {g: int(model.geom_conaffinity[g]) for g in self._geom_ids}

        self._is_attached    = False
        self._local_offset   = np.zeros(3, dtype=np.float64)</code></pre></div>
            </section>

            <section class="code-section" id="tick">
              <h3>tick() — three-branch state machine</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4><p>Evaluate one physics step. If not attached and grip closed and palm close enough → attach. If attached and grip opened → release. If attached and grip still closed → update pose.</p>
                <h4>Inputs / Outputs</h4><p><strong>In:</strong> <code>grip_closed</code> bool from controller state. <strong>Returns:</strong> current <code>_is_attached</code>.</p>
                <h4>Invariants</h4><p>Attach fires when <code>‖palm − obj‖ ≤ 0.13 m</code> AND <code>grip_closed = True</code>. The reacher's ~12 cm accuracy floor means the palm typically stops at exactly 12–13 cm — matching the threshold by design.</p>
                <h4>Failure modes</h4><p>If palm never gets within 0.13 m when grip closes, attachment never fires. The FSM's <code>CLOSE_GRIP_TIMEOUT = 100</code> ticks handles this case by advancing anyway.</p>
                <h4>Why it matters</h4><p>The three-branch structure is intentionally simple. All coordination complexity lives in the FSM.</p>
              </div>
              <div class="code-block"><pre><code>    def tick(self, grip_closed: bool) -&gt; bool:
        if not self._is_attached:
            if grip_closed:
                palm = self._data.site_xpos[self._palm_id].copy()
                obj  = self._data.xpos[self._obj_id].copy()
                if float(np.linalg.norm(palm - obj)) &lt;= self.ATTACH_DIST:
                    self._attach(palm, obj)
        else:
            if not grip_closed:
                self._release()
            else:
                self._update_pose()
        return self._is_attached</code></pre></div>
            </section>

            <section class="code-section" id="release-pub">
              <h3>release() — public force-detach</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4><p>Unconditionally release the object. Used by the test harness and emergency cleanup paths where waiting for the grip to open through <code>tick()</code> is not desirable.</p>
                <h4>Invariants</h4><p>Safe to call multiple times — the <code>if attached</code> guard prevents double-release. After release the cylinder resumes normal physics from its current world position with zero velocity.</p>
              </div>
              <div class="code-block"><pre><code>    def release(self) -&gt; None:
        if self._is_attached:
            self._release()</code></pre></div>
            </section>

            <section class="code-section" id="attach">
              <h3>_attach() — snap and collision disable</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4><p>Compute palm-local offset, clamp it to SNAP_DIST so the cylinder sits visually in the hand, disable cylinder collisions to prevent contact impulses, then teleport the cylinder into position immediately.</p>
                <h4>Inputs / Outputs</h4><p><strong>In:</strong> <code>palm_pos</code>, <code>obj_pos</code> already read in <code>tick()</code>. <strong>Side effects:</strong> sets <code>_local_offset</code>, zeroes contype/conaffinity for all cylinder geoms, sets <code>_is_attached = True</code>, calls <code>_update_pose()</code>.</p>
                <h4>Invariants</h4><p><code>local = palm_rot.T @ (obj_pos - palm_pos)</code> stores the offset in the palm's own local frame so it rotates with the palm. SNAP_DIST = 0.03 m — observed attachment: real gap 0.128 m snapped to 0.030 m; cylinder jumps ~10 cm visibly but stably.</p>
                <h4>Failure modes</h4><p>If collision disable is skipped, the teleported cylinder geoms overlap the hand geoms. MuJoCo resolves this as a large contact impulse that can knock the robot over in one step.</p>
                <h4>Why it matters</h4><p>The snap + collision disable pair is what makes kinematic attachment stable. They must both fire atomically in <code>_attach()</code>.</p>
              </div>
              <div class="code-block"><pre><code>    def _attach(self, palm_pos: np.ndarray, obj_pos: np.ndarray) -&gt; None:
        palm_rot = self._data.site_xmat[self._palm_id].reshape(3, 3).copy()
        local = palm_rot.T @ (obj_pos - palm_pos)
        d = float(np.linalg.norm(local))
        if d &gt; self.SNAP_DIST:
            local = local * (self.SNAP_DIST / d)
        self._local_offset = local

        for g in self._geom_ids:
            self._model.geom_contype[g]     = 0
            self._model.geom_conaffinity[g] = 0

        self._is_attached = True
        snap = float(np.linalg.norm(self._local_offset))
        print(f"[GRASP] attached  dist={float(np.linalg.norm(palm_pos - obj_pos)):.3f} m"
              f"  snap_offset={snap:.3f} m")
        self._update_pose()</code></pre></div>
            </section>

            <section class="code-section" id="update-pose">
              <h3>_update_pose() — teleport every physics step (hot path)</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4><p>Recompute the cylinder's world position from the current palm pose and stored local offset. Write directly to <code>data.qpos</code>. Zero the freejoint velocity to prevent gravity accumulation.</p>
                <h4>Inputs / Outputs</h4><p><strong>Reads:</strong> <code>site_xpos[palm_id]</code>, <code>site_xmat[palm_id]</code>. <strong>Writes:</strong> <code>qpos[qposadr:qposadr+3]</code> (position), <code>qpos[qposadr+3:qposadr+7]</code> (identity quaternion), <code>qvel[qveladr:qveladr+6] = 0</code>.</p>
                <h4>Invariants</h4><p><code>new_pos = palm_pos + palm_rot @ local_offset</code>. Quaternion is always identity — cylinder orientation is not tracked. This is correct for a cylinder (radially symmetric). Velocity zeroing prevents gravity accumulation: at 200 Hz, gravity adds 9.81 × 0.005 = 0.049 m/s per step. Without zeroing this reaches 14.7 m/s after a 300-step phase, causing a violent launch on release.</p>
                <h4>Failure modes</h4><p>If called only at control rate (50 Hz) rather than physics rate (200 Hz), drift between corrections is 4× larger — visible floating during long carry phases.</p>
                <h4>Why it matters</h4><p>This is the hottest method in the file — 200 calls per second. Its simplicity (2 matrix ops, 3 array writes) is intentional.</p>
              </div>
              <div class="code-block"><pre><code>    def _update_pose(self) -&gt; None:
        palm_pos = self._data.site_xpos[self._palm_id].copy()
        palm_rot = self._data.site_xmat[self._palm_id].reshape(3, 3).copy()
        new_pos  = palm_pos + palm_rot @ self._local_offset
        self._data.qpos[self._qposadr    :self._qposadr + 3] = new_pos
        self._data.qpos[self._qposadr + 3:self._qposadr + 7] = [1.0, 0.0, 0.0, 0.0]
        self._data.qvel[self._qveladr    :self._qveladr + 6] = 0.0</code></pre></div>
            </section>

            <section class="code-section" id="release-priv">
              <h3>_release() — restore physics</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4><p>Restore original collision bitmasks, zero cylinder velocity, and clear the attached flag. The cylinder then resumes normal physics from its current position.</p>
                <h4>Invariants</h4><p>Velocity is zeroed on release so the cylinder falls cleanly from wherever the palm was, rather than launching due to any velocity residual from palm motion. Collision restore happens before <code>_is_attached = False</code> so the cylinder is immediately responsive to contact once physics resumes.</p>
                <h4>Failure modes</h4><p>If original contype/conaffinity values were modified externally between attach and release, the restored values will be wrong. Nothing else modifies these in this codebase.</p>
              </div>
              <div class="code-block"><pre><code>    def _release(self) -&gt; None:
        for g in self._geom_ids:
            self._model.geom_contype[g]     = self._orig_contype[g]
            self._model.geom_conaffinity[g] = self._orig_conaffinity[g]
        self._data.qvel[self._qveladr:self._qveladr + 6] = 0.0
        self._is_attached = False
        print("[GRASP] released")</code></pre></div>
            </section>

            <section class="code-section" id="full-file">
              <h3>Full source file</h3>
              <p>Complete HTML-escaped source of <code>common/grasp.py</code>.</p>
              <details class="code-details">
                <summary><span>Expand full grasp.py</span><code>~137 lines</code></summary>
                <div class="code-block"><pre><code>"""Grasp backend interface and kinematic-attachment implementation."""

from __future__ import annotations

from abc import ABC, abstractmethod

import numpy as np


class GraspBackend(ABC):
    """Abstract grasp backend — called every physics tick from the main loop."""

    @property
    @abstractmethod
    def attached(self) -&gt; bool:
        """True while the object is kinematically attached."""

    @abstractmethod
    def tick(self, grip_closed: bool) -&gt; bool:
        """Update attachment state. Returns True if currently attached.

        Must be called after every mujoco.mj_step() so the cylinder pose is
        corrected before the next integration step.
        """

    @abstractmethod
    def release(self) -&gt; None:
        """Force-detach the object and restore its physics."""


class KinematicAttachment(GraspBackend):
    """Teleport-weld the cylinder to the palm while the grip is closed.

    Simulation shortcut: bypasses contact forces. The cylinder is placed at a
    fixed palm-local offset (snapped to SNAP_DIST if the hand closed far away)
    and its freejoint velocity is zeroed every tick so it does not drift between
    teleportations.

    Collisions are disabled while attached to prevent geom-overlap impulses from
    destabilising the robot.
    """

    ATTACH_DIST: float = 0.13  # m: auto-attach when palm is within this distance
    SNAP_DIST:   float = 0.03  # m: clamp palm-local offset so object sits in hand

    def __init__(
        self,
        model,
        data,
        palm_site_id: int,
        obj_body_id: int,
    ) -&gt; None:
        self._model    = model
        self._data     = data
        self._palm_id  = palm_site_id
        self._obj_id   = obj_body_id

        # Freejoint addressing (first joint of the body; must be a freejoint).
        jnt_id = int(model.body_jntadr[obj_body_id])
        self._qposadr = int(model.jnt_qposadr[jnt_id])
        self._qveladr = int(model.jnt_dofadr[jnt_id])

        # Geoms belonging to this body — used to toggle collisions.
        self._geom_ids = [
            i for i in range(model.ngeom)
            if int(model.geom_bodyid[i]) == obj_body_id
        ]
        self._orig_contype     = {g: int(model.geom_contype[g])     for g in self._geom_ids}
        self._orig_conaffinity = {g: int(model.geom_conaffinity[g]) for g in self._geom_ids}

        self._is_attached    = False
        self._local_offset   = np.zeros(3, dtype=np.float64)

    # ------------------------------------------------------------------ #
    # Public API
    # ------------------------------------------------------------------ #

    @property
    def attached(self) -&gt; bool:
        return self._is_attached

    def tick(self, grip_closed: bool) -&gt; bool:
        if not self._is_attached:
            if grip_closed:
                palm = self._data.site_xpos[self._palm_id].copy()
                obj  = self._data.xpos[self._obj_id].copy()
                if float(np.linalg.norm(palm - obj)) &lt;= self.ATTACH_DIST:
                    self._attach(palm, obj)
        else:
            if not grip_closed:
                self._release()
            else:
                self._update_pose()
        return self._is_attached

    def release(self) -&gt; None:
        if self._is_attached:
            self._release()

    # ------------------------------------------------------------------ #
    # Private helpers
    # ------------------------------------------------------------------ #

    def _attach(self, palm_pos: np.ndarray, obj_pos: np.ndarray) -&gt; None:
        palm_rot = self._data.site_xmat[self._palm_id].reshape(3, 3).copy()
        local = palm_rot.T @ (obj_pos - palm_pos)
        d = float(np.linalg.norm(local))
        if d &gt; self.SNAP_DIST:
            local = local * (self.SNAP_DIST / d)
        self._local_offset = local

        for g in self._geom_ids:
            self._model.geom_contype[g]     = 0
            self._model.geom_conaffinity[g] = 0

        self._is_attached = True
        snap = float(np.linalg.norm(self._local_offset))
        print(f"[GRASP] attached  dist={float(np.linalg.norm(palm_pos - obj_pos)):.3f} m"
              f"  snap_offset={snap:.3f} m")
        self._update_pose()

    def _update_pose(self) -&gt; None:
        palm_pos = self._data.site_xpos[self._palm_id].copy()
        palm_rot = self._data.site_xmat[self._palm_id].reshape(3, 3).copy()
        new_pos  = palm_pos + palm_rot @ self._local_offset
        self._data.qpos[self._qposadr    :self._qposadr + 3] = new_pos
        self._data.qpos[self._qposadr + 3:self._qposadr + 7] = [1.0, 0.0, 0.0, 0.0]
        self._data.qvel[self._qveladr    :self._qveladr + 6] = 0.0

    def _release(self) -&gt; None:
        for g in self._geom_ids:
            self._model.geom_contype[g]     = self._orig_contype[g]
            self._model.geom_conaffinity[g] = self._orig_conaffinity[g]
        self._data.qvel[self._qveladr:self._qveladr + 6] = 0.0
        self._is_attached = False
        print("[GRASP] released")</code></pre></div>
              </details>
            </section>

          </div>
        </div>
      </main>
    </div>
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/common-onnx-policy.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>common/onnx_policy.py — CPU ONNX Inference Wrapper | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · common/onnx_policy.py</p>
          <h1>common/onnx_policy.py — CPU ONNX Inference Wrapper</h1>
          <p class="subtitle">A 34-line wrapper that loads any ONNX model onto CPU, exposes it as a callable, and handles the shape coercion between NumPy's 1D observation vectors and ONNX Runtime's expected (1, N) float32 batches.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → common/onnx_policy.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./scripts-test-fsm-approach.html">← scripts/test_fsm_approach.py</a>
            <a href="./common-scene.html">common/scene.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> common/onnx_policy.py</p>
              <p><strong>Lines:</strong> ~34</p>
              <p>Shared by walker, croucher, rotator, and right_reacher. All four models are instantiated as <code>ONNXPolicy</code> objects with different paths and input dimensions. The wrapper enforces CPU-only execution and single-threaded inference to avoid non-determinism.</p>
            </div>
            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#chunk-init">__init__ — session construction</a></li>
                <li><a href="#chunk-call">__call__ — inference</a></li>
                <li><a href="#full-file">Full file appendix</a></li>
              </ul>
              <a href="#full-file" class="jump-link">Jump to full file ↓</a>
            </nav>
          </aside>

          <div class="code-main">

            <!-- ─── Chunk 1: __init__ ─────────────────────────────────────── -->
            <section class="code-section" id="chunk-init">
              <h3>__init__ — session construction</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Load the ONNX model into an <code>InferenceSession</code> pinned to CPU. Cache the input and output tensor names so they don't need to be queried on every inference call.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>model_path:</strong> <code>str | Path</code> — path to the <code>.onnx</code> file. Converted to string because ONNX Runtime doesn't accept <code>Path</code> objects directly.</p>
                <h4>Invariants</h4>
                <p><code>intra_op_num_threads = 1</code> and <code>inter_op_num_threads = 1</code> force single-threaded inference. This is required for deterministic output — ONNX Runtime's multi-threaded reduction operators can produce floating-point differences across runs, which would make the walker policy non-reproducible.<br>
                <code>providers=["CPUExecutionProvider"]</code> prevents ONNX Runtime from attempting to load CUDA/CoreML providers that may not be installed, which would cause a warning or error on startup.</p>
                <h4>Why it matters</h4>
                <p>All four ONNX models (walker 99D→29D, reacher 36D→7D, croucher 101D→29D, rotator 99D→29D) use this same wrapper. Centralising the session construction means any session-options fix applies to all models at once.</p>
              </div>
              <div class="code-block">
                <pre><code>"""ONNX policy wrapper for CPU inference."""

from __future__ import annotations

from pathlib import Path

import numpy as np
import onnxruntime as ort


class ONNXPolicy:
  """Thin CPU-only ONNX inference wrapper.

  Expects a 1D or (1, N) float32 observation and returns the first output row.
  """

  def __init__(self, model_path: str | Path):
    sess_options = ort.SessionOptions()
    sess_options.intra_op_num_threads = 1
    sess_options.inter_op_num_threads = 1
    self.session = ort.InferenceSession(
      str(model_path), sess_options, providers=["CPUExecutionProvider"]
    )
    self.input_name = self.session.get_inputs()[0].name
    self.output_name = self.session.get_outputs()[0].name</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 2: __call__ ─────────────────────────────────────── -->
            <section class="code-section" id="chunk-call">
              <h3>__call__ — inference</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Accept a 1D or batched observation, coerce it to <code>float32</code> shape <code>(1, N)</code>, run inference, and return the first (and only) output row as a 1D array.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>obs:</strong> <code>np.ndarray</code> — shape <code>(N,)</code> or <code>(1, N)</code>. If 1D, reshaped to <code>(1, N)</code>.<br>
                <strong>Returns:</strong> <code>np.ndarray</code> shape <code>(M,)</code> — the policy's action vector. For walker: 29 joint targets. For reacher: 7 right-arm joint targets.</p>
                <h4>Invariants</h4>
                <p><code>obs.astype(np.float32)</code> is called unconditionally — if the observation was computed in float64 (NumPy's default), this ensures the ONNX session receives float32 as expected. Passing float64 to a float32 ONNX graph raises a runtime type error.<br>
                The return value is <code>[0][0]</code>: <code>[0]</code> selects the first output tensor from the output list, <code>[0]</code> selects the first (and only) row from the <code>(1, M)</code> batch dimension.</p>
                <h4>Critical note — do NOT normalize the walker observation</h4>
                <p>The walker ONNX model bakes its own input normalization (mean/std) inside the graph. Passing pre-normalized observations would double-normalize and cause the robot to immediately fall. The raw 99D observation must be passed directly — this is why <code>WalkerReacherController.step()</code> constructs the obs from raw MuJoCo state without any scaling.</p>
              </div>
              <div class="code-block">
                <pre><code>  def __call__(self, obs: np.ndarray) -&gt; np.ndarray:
    if obs.ndim == 1:
      obs = obs.reshape(1, -1)
    obs = obs.astype(np.float32)
    return self.session.run([self.output_name], {self.input_name: obs})[0][0]</code></pre>
              </div>
            </section>

            <!-- ─── Full file appendix ─────────────────────────────────────── -->
            <section class="code-section" id="full-file">
              <h3>Full file — common/onnx_policy.py</h3>
              <details class="code-details">
                <summary>Expand full source (~34 lines)</summary>
                <div class="code-block">
                  <pre><code>"""ONNX policy wrapper for CPU inference."""

from __future__ import annotations

from pathlib import Path

import numpy as np
import onnxruntime as ort


class ONNXPolicy:
  """Thin CPU-only ONNX inference wrapper.

  Expects a 1D or (1, N) float32 observation and returns the first output row.
  """

  def __init__(self, model_path: str | Path):
    sess_options = ort.SessionOptions()
    sess_options.intra_op_num_threads = 1
    sess_options.inter_op_num_threads = 1
    self.session = ort.InferenceSession(
      str(model_path), sess_options, providers=["CPUExecutionProvider"]
    )
    self.input_name = self.session.get_inputs()[0].name
    self.output_name = self.session.get_outputs()[0].name

  def __call__(self, obs: np.ndarray) -&gt; np.ndarray:
    if obs.ndim == 1:
      obs = obs.reshape(1, -1)
    obs = obs.astype(np.float32)
    return self.session.run([self.output_name], {self.input_name: obs})[0][0]</code></pre>
                </div>
              </details>
            </section>

          </div><!-- .code-main -->
        </div><!-- .code-page-layout -->
      </main>

      <footer class="site-footer">
        <p>Lucky Robots G1 Pick-and-Place Case Study</p>
      </footer>
    </div><!-- .page -->
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/common-scene.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>common/scene.py — Scene Helpers | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · common/scene.py</p>
          <h1>common/scene.py — Scene Helpers</h1>
          <p class="subtitle">Two utilities that make the simulation reproducible: <code>CameraRenderer</code> wraps MuJoCo's offscreen renderer for named cameras, and <code>reset_robot</code> sets a deterministic initial joint pose from the config file.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → common/scene.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./common-onnx-policy.html">← common/onnx_policy.py</a>
            <a href="./policies-base.html">policies/base.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> common/scene.py</p>
              <p><strong>Lines:</strong> ~50</p>
              <p>Pure utilities — no mutable state beyond what MuJoCo holds. <code>CameraRenderer</code> is used by <code>run.py</code> when <code>--cameras</code> is enabled. <code>reset_robot</code> is called by both <code>run.py</code> and the headless test script.</p>
            </div>
            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#chunk-camera">CameraRenderer</a></li>
                <li><a href="#chunk-reset">reset_robot()</a></li>
                <li><a href="#full-file">Full file appendix</a></li>
              </ul>
              <a href="#full-file" class="jump-link">Jump to full file ↓</a>
            </nav>
          </aside>

          <div class="code-main">

            <!-- ─── Chunk 1: CameraRenderer ──────────────────────────────── -->
            <section class="code-section" id="chunk-camera">
              <h3>CameraRenderer</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Wrap <code>mujoco.Renderer</code> to provide a simple <code>render(camera_name) -&gt; np.ndarray</code> API. The renderer is allocated once at construction (allocating GPU/CPU render buffers) and reused for every frame — avoiding per-frame allocation overhead.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>width/height:</strong> default 320×240 — sufficient for debugging visualization, small enough to not dominate simulation wall-clock time.<br>
                <strong>render(camera_name):</strong> returns a copy of the RGB array — the copy is required because MuJoCo reuses the internal render buffer on the next call.</p>
                <h4>Invariants</h4>
                <p><code>update_scene(data, camera=camera_name)</code> must be called before <code>render()</code> — it synchronises the renderer's scene graph with the current physics state. Omitting it would render a stale frame.<br>
                The <code>.copy()</code> call is mandatory. Without it, the returned array is a view into a buffer that gets overwritten by the next <code>update_scene</code> call.</p>
                <h4>Why it matters</h4>
                <p>Camera rendering is optional in <code>run.py</code> (controlled by <code>--no-cameras</code>). By isolating it here, the headless test can skip creating a <code>CameraRenderer</code> entirely — avoiding any display dependency in CI.</p>
              </div>
              <div class="code-block">
                <pre><code>"""Scene helpers for deterministic reset and camera rendering."""

from __future__ import annotations

from typing import Iterable

import mujoco
import numpy as np


class CameraRenderer:
  """Offscreen renderer for robot-mounted cameras using mujoco.Renderer."""

  def __init__(self, model, data, width: int = 320, height: int = 240):
    self.model = model
    self.data = data
    self.renderer = mujoco.Renderer(model, height, width)

  def render(self, camera_name: str) -&gt; np.ndarray:
    """Render from a named camera, return RGB array (H, W, 3)."""
    self.renderer.update_scene(self.data, camera=camera_name)
    return self.renderer.render().copy()</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 2: reset_robot ──────────────────────────────────── -->
            <section class="code-section" id="chunk-reset">
              <h3>reset_robot()</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Set the robot to a deterministic initial pose by writing <code>base_pos</code>, <code>base_quat</code>, and per-joint positions from the config into <code>data.qpos</code>, then call <code>mj_forward</code> to compute all derived quantities (site positions, body positions, contact forces).</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>base_pos:</strong> default <code>(-0.6, 0.0, 0.76)</code> — places the robot 0.6 m behind the source table at standing height.<br>
                <strong>base_quat:</strong> default <code>(1, 0, 0, 0)</code> — identity orientation (facing +x).<br>
                <strong>reset_data:</strong> if True, calls <code>mj_resetData</code> first to clear all velocities and accumulated state. Set False when the model was just freshly loaded (data already zeroed).</p>
                <h4>Invariants</h4>
                <p><code>data.qpos[7 + idx] = value</code> — MuJoCo's <code>qpos</code> layout: indices 0–2 are root position, 3–6 are root quaternion, indices 7 onward are joint positions in the order defined by the model. The config's <code>joint_names</code> list is used to map joint names to the correct <code>qpos</code> index.<br>
                Joints not present in the config's <code>default_joint_pos</code> dict retain their current <code>qpos</code> value (or zero after <code>mj_resetData</code>).</p>
                <h4>Why it matters</h4>
                <p>Using the config's <code>default_joint_pos</code> (not hardcoded values) means the reset pose stays consistent with the walker policy's expected carry pose. If the walker was re-trained with different default arm positions, updating the config is sufficient.</p>
              </div>
              <div class="code-block">
                <pre><code>def reset_robot(
  model,
  data,
  config: dict,
  joint_names: Iterable[str],
  *,
  base_pos: tuple[float, float, float] = (-0.6, 0.0, 0.76),
  base_quat: tuple[float, float, float, float] = (1.0, 0.0, 0.0, 0.0),
  reset_data: bool = True,
) -&gt; None:
  """Reset the robot to a deterministic pose and forward the model.

  joint_names should be the full ordered joint list from the config/model.
  """
  if reset_data:
    mujoco.mj_resetData(model, data)
  joint_names_list = list(joint_names)
  joint_index = {name: idx for idx, name in enumerate(joint_names_list)}
  data.qpos[0:3] = base_pos
  data.qpos[3:7] = base_quat
  for name, value in config["default_joint_pos"].items():
    idx = joint_index.get(name)
    if idx is not None:
      data.qpos[7 + idx] = value
  mujoco.mj_forward(model, data)</code></pre>
              </div>
            </section>

            <!-- ─── Full file appendix ─────────────────────────────────────── -->
            <section class="code-section" id="full-file">
              <h3>Full file — common/scene.py</h3>
              <details class="code-details">
                <summary>Expand full source (~50 lines)</summary>
                <div class="code-block">
                  <pre><code>"""Scene helpers for deterministic reset and camera rendering."""

from __future__ import annotations

from typing import Iterable

import mujoco
import numpy as np


class CameraRenderer:
  """Offscreen renderer for robot-mounted cameras using mujoco.Renderer."""

  def __init__(self, model, data, width: int = 320, height: int = 240):
    self.model = model
    self.data = data
    self.renderer = mujoco.Renderer(model, height, width)

  def render(self, camera_name: str) -&gt; np.ndarray:
    """Render from a named camera, return RGB array (H, W, 3)."""
    self.renderer.update_scene(self.data, camera=camera_name)
    return self.renderer.render().copy()


def reset_robot(
  model,
  data,
  config: dict,
  joint_names: Iterable[str],
  *,
  base_pos: tuple[float, float, float] = (-0.6, 0.0, 0.76),
  base_quat: tuple[float, float, float, float] = (1.0, 0.0, 0.0, 0.0),
  reset_data: bool = True,
) -&gt; None:
  """Reset the robot to a deterministic pose and forward the model.

  joint_names should be the full ordered joint list from the config/model.
  """
  if reset_data:
    mujoco.mj_resetData(model, data)
  joint_names_list = list(joint_names)
  joint_index = {name: idx for idx, name in enumerate(joint_names_list)}
  data.qpos[0:3] = base_pos
  data.qpos[3:7] = base_quat
  for name, value in config["default_joint_pos"].items():
    idx = joint_index.get(name)
    if idx is not None:
      data.qpos[7 + idx] = value
  mujoco.mj_forward(model, data)</code></pre>
                </div>
              </details>
            </section>

          </div><!-- .code-main -->
        </div><!-- .code-page-layout -->
      </main>

      <footer class="site-footer">
        <p>Lucky Robots G1 Pick-and-Place Case Study</p>
      </footer>
    </div><!-- .page -->
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/config-simulation.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simulation Configuration — g1.xml, scene.xml, model_config.json | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation</p>
          <h1>Simulation Configuration — g1.xml, scene.xml, model_config.json</h1>
          <p class="subtitle">The robot, scene, and policy I/O contract that every script relies on.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → g1.xml, scene.xml, model_config.json
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./scripts-test-fsm-approach.html">Previous file</a>
            <a href="./dev-log.html">Next file</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>Configuration overview</h2>
              <p>These files lock down physics, camera names, joint order, and policy dimensions.</p>
            </div>
            <div class="code-section">
              <h2>Consistency notes</h2>
              <ul class="bullet-list">
                <li>timestep 0.005 → 200 Hz physics.</li>
                <li>decimation=4 → 50 Hz control.</li>
                <li>right_palm site anchors reaching and grasping.</li>
                <li>model_config joint order must match ONNX outputs.</li>
              </ul>
            </div>
          </aside>

          <div class="code-main">
            <div class="file-tabs">
              <div class="file-tab-buttons">
                <button class="file-tab-button" data-tab-target="g1-physics">g1.xml physics and robot</button>
                <button class="file-tab-button" data-tab-target="g1-cameras">g1.xml cameras/sites</button>
                <button class="file-tab-button" data-tab-target="scene">scene.xml tables/cylinder</button>
                <button class="file-tab-button" data-tab-target="config">model_config.json joint contract</button>
                <button class="file-tab-button" data-tab-target="why">Why config consistency matters</button>
              </div>

              <div class="file-tab-panel" data-tab-panel="g1-physics">
                <section class="code-section">
                  <h2>g1.xml physics and robot</h2>
                  <p>
                    The timestep defines the physics rate, which interacts with the controller decimation.
                  </p>
                  <div class="code-block">
                    <pre><code>&lt;option integrator="implicitfast" timestep="0.005" gravity="0 0 -9.81"/&gt;
&lt;camera name="head_cam" .../&gt;
&lt;site name="right_palm" .../&gt;
&lt;camera name="wrist_cam" .../&gt;</code></pre>
                  </div>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="g1-cameras">
                <section class="code-section">
                  <h2>g1.xml cameras/sites</h2>
                  <p>
                    Named cameras and the right_palm site are required by the smoke tests, controller, and
                    grasp backend.
                  </p>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="scene">
                <section class="code-section">
                  <h2>scene.xml tables/cylinder</h2>
                  <p>
                    scene.xml defines the source and target tables plus the freejoint cylinder object.
                  </p>
                  <div class="code-block">
                    <pre><code>&lt;body name="table" .../&gt;        &lt;!-- source table --&gt;
&lt;body name="table_white" .../&gt; &lt;!-- target table --&gt;
&lt;body name="red_block" ...&gt;
  &lt;freejoint/&gt;
&lt;/body&gt;
&lt;camera name="overhead" .../&gt;</code></pre>
                  </div>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="config">
                <section class="code-section">
                  <h2>model_config.json joint contract</h2>
                  <p>
                    The joint order and policy I/O dimensions must match the ONNX models exactly.
                  </p>
                  <div class="code-block">
                    <pre><code>{
  "joint_names": ["left_hip_pitch_joint", "...", "right_wrist_yaw_joint"],
  "walker": {"input_dim": 99, "output_dim": 29},
  "right_reacher": {"input_dim": 36, "output_dim": 7}
}</code></pre>
                  </div>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="why">
                <section class="code-section">
                  <h2>Why config consistency matters</h2>
                  <p>
                    Any mismatch in joint order, camera names, or timestep breaks downstream logic. Keeping
                    these files aligned is the difference between a runnable baseline and hours of
                    debugging.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/dev-log.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DEV_LOG.md — Engineering Evidence | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation</p>
          <h1>DEV_LOG.md — Engineering Evidence</h1>
          <p class="subtitle">Short evidence snippets that shaped the baseline design decisions.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → DEV_LOG.md
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./config-simulation.html">Previous file</a>
            <a href="./run.html">Next file</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> DEV_LOG.md</p>
              <p>
                The engineering log captures the reasoning behind thresholds, refactors, and test
                artifacts.
              </p>
            </div>
            <div class="code-section">
              <h2>Evidence themes</h2>
              <ul class="bullet-list">
                <li>Modular refactor checkpoints.</li>
                <li>Smoke test validation records.</li>
                <li>Normalization pitfalls and reacher accuracy limits.</li>
                <li>Kinematic grasp tuning evidence.</li>
              </ul>
            </div>
          </aside>

          <div class="code-main">
            <div class="file-tabs">
              <div class="file-tab-buttons">
                <button class="file-tab-button" data-tab-target="skeleton">Modular skeleton</button>
                <button class="file-tab-button" data-tab-target="smoke">Smoke test evidence</button>
                <button class="file-tab-button" data-tab-target="normalization">Normalization trap</button>
                <button class="file-tab-button" data-tab-target="always">Always-on reacher</button>
                <button class="file-tab-button" data-tab-target="accuracy">Reacher accuracy floor</button>
                <button class="file-tab-button" data-tab-target="grasp">Kinematic grasp evidence</button>
                <button class="file-tab-button" data-tab-target="false">Target-side false positive</button>
              </div>

              <div class="file-tab-panel" data-tab-panel="skeleton">
                <section class="code-section">
                  <h2>Modular skeleton</h2>
                  <p>
                    DEV_LOG captures the extraction of run.py, controller logic, and the FSM into separate
                    modules so each piece could be debugged independently.
                  </p>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="smoke">
                <section class="code-section">
                  <h2>Smoke test evidence</h2>
                  <p>
                    The log records when the environment, cameras, and ONNX policies first passed the
                    headless smoke test, establishing a known-good baseline.
                  </p>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="normalization">
                <section class="code-section">
                  <h2>Normalization trap</h2>
                  <p>
                    The normalization issue proved the ONNX models already normalize internally, so raw
                    observations must be passed to the walker.
                  </p>
                  <div class="code-block">
                    <pre><code>raw zeros        → action max=0.628
normalized zeros → action max=14.78</code></pre>
                  </div>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="always">
                <section class="code-section">
                  <h2>Always-on reacher</h2>
                  <p>
                    DEV_LOG notes that the right reacher must run even when reach_active is false to keep
                    arm joints inside the training distribution.
                  </p>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="accuracy">
                <section class="code-section">
                  <h2>Reacher accuracy floor</h2>
                  <p>
                    The reacher plateaued around 0.12–0.13 m, which shaped hover and descend thresholds
                    near the grasp window.
                  </p>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="grasp">
                <section class="code-section">
                  <h2>Kinematic grasp evidence</h2>
                  <p>
                    The attachment snap distance was tuned to the measured reacher accuracy floor.
                  </p>
                  <div class="code-block">
                    <pre><code>Attach: dist=0.128 m
snap_offset=0.030 m</code></pre>
                  </div>
                </section>
              </div>

              <div class="file-tab-panel" data-tab-panel="false">
                <section class="code-section">
                  <h2>Target-side false positive</h2>
                  <p>
                    Early success checks only used reach windows and produced false positives, so world
                    proximity and yaw gating were added to the target approach.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/policies-base.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>policies/base.py — Policy Interface and Data Contract | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · policies/base.py</p>
          <h1>policies/base.py — Policy Interface and Data Contract</h1>
          <p class="subtitle">Defines the shared vocabulary between every policy and the controller: the <code>PolicyOutput</code> dataclass encoding the four command fields, and the <code>BasePolicy</code> ABC that all policies implement.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → policies/base.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./common-scene.html">← common/scene.py</a>
            <a href="./policies-keyboard.html">policies/keyboard.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> policies/base.py</p>
              <p><strong>Lines:</strong> ~41</p>
              <p>The contract layer. <code>FSMPolicy</code>, <code>KeyboardPolicy</code>, and any future policy are guaranteed to emit a <code>PolicyOutput</code> from <code>step()</code>. The controller reads four specific fields — no knowledge of which policy is running.</p>
            </div>
            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#chunk-types">Type aliases</a></li>
                <li><a href="#chunk-output">PolicyOutput dataclass</a></li>
                <li><a href="#chunk-base">BasePolicy ABC</a></li>
                <li><a href="#full-file">Full file appendix</a></li>
              </ul>
              <a href="#full-file" class="jump-link">Jump to full file ↓</a>
            </nav>
          </aside>

          <div class="code-main">

            <!-- ─── Chunk 1: Type aliases ──────────────────────────────────── -->
            <section class="code-section" id="chunk-types">
              <h3>Type aliases</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Give names to the two most common tuple types used in the policy layer — a 3-tuple walk command and a 3-tuple reach target. These aliases make function signatures self-documenting without requiring a full class.</p>
                <h4>Why it matters</h4>
                <p>At 3 elements, a raw <code>tuple[float, float, float]</code> is ambiguous — it could be a position, a velocity command, or a quaternion component. Naming it <code>WalkCommand</code> or <code>ReachTarget</code> communicates semantic intent in type signatures.</p>
              </div>
              <div class="code-block">
                <pre><code>"""Policy interfaces and data contracts for high-level control."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass

WalkCommand = tuple[float, float, float]
ReachTarget = tuple[float, float, float]</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 2: PolicyOutput ─────────────────────────────────── -->
            <section class="code-section" id="chunk-output">
              <h3>PolicyOutput dataclass</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>An immutable value object carrying the four command fields emitted each tick by any policy. Using <code>frozen=True</code> prevents accidental mutation after construction — policies must emit a new <code>PolicyOutput</code> each tick, not mutate an existing one.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>walk_cmd:</strong> <code>(lin_vel_x, lin_vel_y, ang_vel_z)</code> — locomotion command in m/s, m/s, rad/s.<br>
                <strong>reach_target:</strong> <code>(x, y, z)</code> — target position in pelvis frame (metres).<br>
                <strong>reach_active:</strong> <code>bool</code> — whether the right-arm reacher ONNX should be applied this tick. Defaults <code>False</code> so old keyboard policy tests don't need to set it.<br>
                <strong>grip_closed:</strong> <code>bool</code> — whether the right-hand grip actuator should be commanded closed.</p>
                <h4>Invariants</h4>
                <p><code>reach_active=False</code> default is a backward-compatibility choice from Step 5: the keyboard policy was introduced before reaching was implemented, and it should never activate the reacher. All existing keyboard policy tests remain valid without modification.</p>
                <h4>Why it matters</h4>
                <p>By making <code>PolicyOutput</code> frozen and explicitly typed, the type checker catches any policy that forgets to set a field, and any code that tries to modify a returned command. The FSM's <code>_close_grip_command</code> must construct a new <code>PolicyOutput</code> to override <code>grip_closed</code> — it cannot mutate the original.</p>
              </div>
              <div class="code-block">
                <pre><code>@dataclass(frozen=True)
class PolicyOutput:
  """High-level command output from a policy step.

  walk_cmd: (lin_vel_x, lin_vel_y, ang_vel_z)
  reach_target: (x, y, z) target coordinates in pelvis frame
  reach_active: True to run the right-arm reacher ONNX overlay
  grip_closed: True when the right-hand grip should be closed
  """

  walk_cmd: WalkCommand
  reach_target: ReachTarget
  grip_closed: bool
  reach_active: bool = False</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 3: BasePolicy ───────────────────────────────────── -->
            <section class="code-section" id="chunk-base">
              <h3>BasePolicy ABC</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Define the minimal interface for all policies: an optional <code>handle_key</code> hook (for interactive policies like <code>KeyboardPolicy</code>) and an abstract <code>step()</code> method. The simulation loop calls <code>policy.step()</code> without knowing which concrete policy is running.</p>
                <h4>Invariants</h4>
                <p><code>handle_key</code> has a default no-op implementation — autonomous policies (<code>FSMPolicy</code>) simply inherit it and never override it. The simulation loop can call <code>policy.handle_key(keycode)</code> unconditionally without checking the policy type.</p>
                <h4>Why it matters</h4>
                <p>The ABC pattern here is the entire reason <code>run.py</code> can support both <code>--policy keyboard</code> and <code>--policy fsm</code> with a single code path. The simulation loop never imports <code>FSMPolicy</code> or <code>KeyboardPolicy</code> — it only calls the <code>BasePolicy</code> interface.</p>
              </div>
              <div class="code-block">
                <pre><code>class BasePolicy(ABC):
  """Abstract interface for policies that emit high-level commands."""

  def handle_key(self, keycode: int) -&gt; None:
    """Optional keyboard hook for interactive policies."""
    pass

  @abstractmethod
  def step(self) -&gt; PolicyOutput:
    """Return the latest policy output."""</code></pre>
              </div>
            </section>

            <!-- ─── Full file appendix ─────────────────────────────────────── -->
            <section class="code-section" id="full-file">
              <h3>Full file — policies/base.py</h3>
              <details class="code-details">
                <summary>Expand full source (~41 lines)</summary>
                <div class="code-block">
                  <pre><code>"""Policy interfaces and data contracts for high-level control."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass

WalkCommand = tuple[float, float, float]
ReachTarget = tuple[float, float, float]


@dataclass(frozen=True)
class PolicyOutput:
  """High-level command output from a policy step.

  walk_cmd: (lin_vel_x, lin_vel_y, ang_vel_z)
  reach_target: (x, y, z) target coordinates in pelvis frame
  reach_active: True to run the right-arm reacher ONNX overlay
  grip_closed: True when the right-hand grip should be closed
  """

  walk_cmd: WalkCommand
  reach_target: ReachTarget
  grip_closed: bool
  reach_active: bool = False


class BasePolicy(ABC):
  """Abstract interface for policies that emit high-level commands."""

  def handle_key(self, keycode: int) -&gt; None:
    """Optional keyboard hook for interactive policies."""
    pass

  @abstractmethod
  def step(self) -&gt; PolicyOutput:
    """Return the latest policy output."""</code></pre>
                </div>
              </details>
            </section>

          </div><!-- .code-main -->
        </div><!-- .code-page-layout -->
      </main>

      <footer class="site-footer">
        <p>Lucky Robots G1 Pick-and-Place Case Study</p>
      </footer>
    </div><!-- .page -->
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/policies-fsm-core.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>policies/fsm_core.py — Autonomous Task Brain | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · policies/fsm_core.py</p>
          <h1>policies/fsm_core.py — Autonomous Task Brain</h1>
          <p class="subtitle">The 750-line state machine that sequences all 12 phases of pick-and-place, computes world-frame geometry, converts targets to pelvis-frame reach commands, and manages every timeout and debounce counter.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → policies/fsm_core.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./policies-fsm.html">← policies/fsm.py</a>
            <a href="./scripts-smoke-env.html">scripts/smoke_env.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> policies/fsm_core.py</p>
              <p><strong>Lines:</strong> ~748</p>
              <p>Pure FSM — no controller dependency. Reads MuJoCo model/data for GT geometry and emits a <code>PolicyOutput</code> each tick. Never calls <code>data.ctrl</code>.</p>
            </div>
            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#constants-source">Tuning constants — source approach</a></li>
                <li><a href="#constants-target">Tuning constants — target approach &amp; workspace</a></li>
                <li><a href="#state-enum">FSMState enum</a></li>
                <li><a href="#init">FSMCore.__init__</a></li>
                <li><a href="#tick-dispatch">tick() + _dispatch() + _transition()</a></li>
                <li><a href="#settle-approach">_settle() + _approach_source()</a></li>
                <li><a href="#hover-descend">_hover_source() + _descend_source()</a></li>
                <li><a href="#grip-lift">_close_grip() + _lift_source()</a></li>
                <li><a href="#approach-target">_approach_target()</a></li>
                <li><a href="#hover-lower">_hover_target() + _lower_target()</a></li>
                <li><a href="#open-retract-done">_open_grip() + _retract() + _done()</a></li>
                <li><a href="#gt-geometry">GT geometry helpers</a></li>
                <li><a href="#table-reach">Table surface + reach conversion</a></li>
                <li><a href="#target-geometry">Target table geometry</a></li>
                <li><a href="#on-table">_cylinder_on_target_table()</a></li>
                <li><a href="#approach-cmd">_approach_walk_cmd()</a></li>
                <li><a href="#target-nav">_target_approach_walk_cmd() + _near_target_waypoint()</a></li>
                <li><a href="#full-file">Full source file ↓</a></li>
              </ul>
            </nav>
            <div class="code-section">
              <a href="#full-file" style="color:var(--accent);font-weight:600;text-decoration:none;">Jump to full file ↓</a>
            </div>
          </aside>

          <div class="code-main">

            <!-- 1. Constants - source approach -->
            <section class="code-section" id="constants-source">
              <h3>Tuning constants — source-side approach</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>All control parameters are defined at module level as named constants. This makes every timeout, threshold, and velocity limit visible and tunable without reading the state handler code.</p>
                <h4>Key constants</h4>
                <p><strong>CARRY_POSE = (0.3, -0.2, 0.2):</strong> pelvis-frame reach target used as the arm's "idle" position during walking. The right arm must be in this pose (not hanging) for the walker ONNX to perform well — it was trained with the arm carried.<br>
                <strong>SETTLE_TICKS = 150:</strong> 3 seconds at 50 Hz before any motion begins. Gives the controller time to stabilize after initialization.<br>
                <strong>Reach window (REACH_X_MIN..MAX, REACH_Y_MIN..MAX):</strong> tightened from initial over-sized values (Step 6). The window defines when the cylinder is "reachable" in the pelvis frame. X ∈ [0.20, 0.38], Y ∈ [−0.14, 0.02].<br>
                <strong>Staircase vx:</strong> VX_FAST/MED/SLOW = 0.35/0.22/0.12 m/s. Steps down as the cylinder enters range to avoid overshoot. Proportional control was found to overshoot the window at low x_err.</p>
                <h4>Why it matters</h4>
                <p>Every constant here was validated empirically against headless test runs. Changing any timeout or threshold without matching empirical data is likely to break the pipeline at the affected phase.</p>
              </div>
              <div class="code-block"><pre><code># Safe carry-pose: right arm held clear of the legs while walking.
CARRY_POSE: tuple[float, float, float] = (0.3, -0.2, 0.2)

# Ticks in SETTLE before beginning autonomous task (~3 s at 50 Hz).
SETTLE_TICKS = 150

# ---- Approach: staircase forward speeds ----
APPROACH_TARGET_X = 0.34   # m forward — cylinder at reach when this close

REACH_X_MIN, REACH_X_MAX = 0.20, 0.38   # x reachability window
REACH_Y_MIN, REACH_Y_MAX = -0.14, 0.02  # y reachability window

REACH_DEBOUNCE = 8   # consecutive in-window ticks before APPROACH → HOVER

VX_FAST, VX_MED, VX_SLOW = 0.35, 0.22, 0.12   # staircase vx (m/s)
K_VY,  VY_CAP  = 1.8, 0.18   # vy: proportional toward y = -0.05
K_WZ,  WZ_CAP  = 1.2, 0.25   # wz: arctan2-based yaw

# ---- Hover and grasp heights above table surface ----
HOVER_SOURCE_HEIGHT = 0.18   # m: pre-grasp hover above table top
GRASP_HEIGHT        = 0.06   # m: cylinder mid-body height above table top

# ---- Palm-to-target distance thresholds ----
# The reacher has an ~12 cm accuracy floor; thresholds must stay &gt;= this.
HOVER_SOURCE_THRESHOLD   = 0.14   # m
DESCEND_SOURCE_THRESHOLD = 0.12   # m

# ---- Per-state timeouts (control ticks at 50 Hz) ----
HOVER_SOURCE_TIMEOUT   = 200   # ~4 s fallback if threshold never met
DESCEND_SOURCE_TIMEOUT = 300   # ~6 s fallback
CLOSE_GRIP_TIMEOUT     = 100   # ~2 s: advance to LIFT even if not yet attached
LIFT_SOURCE_TIMEOUT    = 200   # ~4 s: declare done if arm never clears table

# ---- General reach-state debounce ----
DEBOUNCE_REACH = 6   # consecutive ticks palm must be within threshold

# ---- Lift success criterion ----
LIFT_DONE_CLEARANCE = 0.25  # m above table top — cylinder visibly off the surface</code></pre></div>
            </section>

            <!-- 2. Constants - target approach -->
            <section class="code-section" id="constants-target">
              <h3>Tuning constants — target approach, placement, and workspace</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Target-side navigation required three rounds of tuning (Steps 9–10). These constants encode the final validated values along with explanatory comments on why each was chosen.</p>
                <h4>Key decisions</h4>
                <p><strong>VX_P1 = 0.12, WZ_P1 = 1.0:</strong> Phase 1 turns CW to face −y. WZ_CAP = 0.25 was initially used but produced ~0 effective turn rate. WZ = 1.0 (full vel_max_angular) is required for the walker to actually rotate.<br>
                <strong>PHASE1_ALIGN_TOL = 0.40 rad:</strong> The walker's turn rate drops asymptotically as yaw approaches −π/2. The robot can reliably reach |yaw+π/2| &lt; 0.40 in ~378 ticks but cannot reach 0.20 within the 900-tick timeout. Restored to 0.40 after a failed attempt with 0.20.<br>
                <strong>TARGET_STAND_DIST = 0.24 m:</strong> Stands 0.24 m "north" of the drop point. Max arm extension = 0.24 + 0.08 = 0.32 m, within the practical ~0.38 m reach.<br>
                <strong>_REACH_LOW / _REACH_HIGH:</strong> The reacher's training workspace bounds in pelvis frame. Targets outside are clipped before being sent.</p>
                <h4>Why it matters</h4>
                <p>The target-side navigation was the hardest part of the pipeline to get right. Three separate bug rounds were needed. These constants represent the stable configuration — each has a comment explaining the empirical reason for its value.</p>
              </div>
              <div class="code-block"><pre><code># ---- Target table approach ----
TARGET_NEAR_EDGE_INSET  = 0.05   # m inward from near edge of target table
TARGET_REACH_DEBOUNCE   = 8      # consecutive in-window ticks → HOVER_TARGET
TARGET_APPROACH_TIMEOUT = 900    # ~18 s fallback (large turn required)

# ---- Target table placement ----
HOVER_TARGET_HEIGHT    = 0.18   # m above target surface for pre-place hover
PLACE_HEIGHT           = 0.06   # m above target surface for release
HOVER_TARGET_THRESHOLD = 0.14   # m palm-to-hover-point
LOWER_TARGET_THRESHOLD = 0.14   # m palm-to-place-point
HOVER_TARGET_TIMEOUT   = 200    # ~4 s
LOWER_TARGET_TIMEOUT   = 300    # ~6 s
OPEN_GRIP_TIMEOUT      = 100    # ~2 s: wait for kinematic release
RETRACT_TIMEOUT        = 200    # ~4 s: arm clear of target table

# Table-membership margins for _cylinder_on_target_table().
ON_TABLE_XY_MARGIN = 0.05   # m: allow up to 5 cm outside geom footprint
ON_TABLE_Z_MAX     = 0.20   # m above surface: cap for height sanity check

# Phase 1 of target approach: turn CW to face -y before driving toward standing waypoint.
# WZ_CAP=0.25 was only 25% of vel_max_angular — produced near-zero actual turn rate.
# WZ_P1=1.0 (vel_max_angular) creates tight turning circle: R = VX_P1/WZ_P1 = 0.12 m.
VX_P1 = 0.12   # m/s: minimum effective forward speed for the walker
WZ_P1 = 1.0    # rad/s: full angular rate so the robot actually turns
# PHASE1_ALIGN_TOL: walker turn rate drops asymptotically as yaw approaches -pi/2.
# Empirically: walker can reach |yaw+pi/2| &lt; 0.40 in ~378 ticks but NOT 0.20 in timeout.
PHASE1_ALIGN_TOL = 0.40   # rad: exit Phase 1 when |yaw - (-pi/2)| &lt; this

# Standing waypoint: robot stops TARGET_STAND_DIST m "north" of the drop point.
# Max arm extension at stop = TARGET_STAND_DIST + TARGET_APPROACH_DIST_THRESH = 0.32 m.
TARGET_STAND_DIST = 0.24   # m: standing distance from drop point

# World-frame proximity to the standing waypoint required before HOVER_TARGET.
# Replaces pelvis-frame reach-window check, which fires too early mid-turn.
TARGET_APPROACH_DIST_THRESH = 0.08   # m: pelvis must be within this of the waypoint

# ---- Reacher workspace bounds in pelvis frame ----
_REACH_LOW  = np.array([-0.30, -0.60, -0.40], dtype=np.float32)
_REACH_HIGH = np.array([ 0.60,  0.30,  0.60], dtype=np.float32)</code></pre></div>
            </section>

            <!-- 3. State enum -->
            <section class="code-section" id="state-enum">
              <h3>FSMState enum — 12-state task sequence</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Enumerate all possible states with <code>auto()</code> values. Using an Enum rather than string constants prevents typos and enables exhaustive dispatch in <code>_dispatch()</code>.</p>
                <h4>State sequence and purpose</h4>
                <p>
                  <strong>SETTLE:</strong> Hold still ~3 s, arm in carry pose.<br>
                  <strong>APPROACH_SOURCE:</strong> Walk toward cylinder until it enters the pelvis-frame reach window.<br>
                  <strong>HOVER_SOURCE:</strong> Raise arm to hover_height above cylinder (table_z + 0.18 m).<br>
                  <strong>DESCEND_SOURCE:</strong> Lower arm to grasp_height (table_z + 0.06 m).<br>
                  <strong>CLOSE_GRIP:</strong> Close fingers; wait for KinematicAttachment to confirm.<br>
                  <strong>LIFT_SOURCE:</strong> Return arm to carry pose; confirm cylinder left table.<br>
                  <strong>APPROACH_TARGET:</strong> Walk/turn to target table placement corridor.<br>
                  <strong>HOVER_TARGET:</strong> Move arm above drop point while stopped.<br>
                  <strong>LOWER_TARGET:</strong> Descend arm to release height (target_z + 0.06 m).<br>
                  <strong>OPEN_GRIP:</strong> Open fingers; wait for kinematic detach.<br>
                  <strong>RETRACT:</strong> Return arm to carry pose, clear of target table.<br>
                  <strong>DONE:</strong> Hold carry pose indefinitely.
                </p>
                <h4>Why it matters</h4>
                <p>The state enum is the complete task decomposition. Each state is a coherent unit of behavior with clear entry/exit conditions. This granularity was the key insight that made the pipeline debuggable — each state could be tested in isolation via the headless test script.</p>
              </div>
              <div class="code-block"><pre><code>class FSMState(Enum):
    SETTLE          = auto()
    APPROACH_SOURCE = auto()
    HOVER_SOURCE    = auto()
    DESCEND_SOURCE  = auto()
    CLOSE_GRIP      = auto()   # close fingers; wait for backend to confirm attach
    LIFT_SOURCE     = auto()   # raise arm to carry pose; confirm cylinder left table
    APPROACH_TARGET = auto()   # walk/turn toward target-table placement corridor
    HOVER_TARGET    = auto()   # move arm above drop point, stop walking
    LOWER_TARGET    = auto()   # descend arm to release height
    OPEN_GRIP       = auto()   # open fingers; wait for kinematic detach
    RETRACT         = auto()   # raise arm to carry pose
    DONE            = auto()</code></pre></div>
            </section>

            <!-- 4. init -->
            <section class="code-section" id="init">
              <h3>FSMCore.__init__ — MuJoCo ID cache and state init</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Cache all MuJoCo body/geom/site IDs needed by the geometry helpers. Print a diagnostic line confirming all IDs resolved correctly. Initialize all state variables.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> <code>model</code>, <code>data</code> (read-only for geometry). <strong>Out:</strong> FSMCore ready to receive <code>tick()</code> calls.</p>
                <h4>IDs cached</h4>
                <p>
                  <code>_rb_id</code>: red_block body (for cylinder world position).<br>
                  <code>_tbl_id</code>: source table body (fallback for surface_z).<br>
                  <code>_palm_id</code>: right_palm site (for palm world position).<br>
                  <code>_tbl_geom_id</code>: table_top geom (preferred for surface_z — uses actual geom half-height).<br>
                  <code>_tbl_white_id</code>: target table body.<br>
                  <code>_tbl_white_geom_id</code>: table_white_top geom (for target surface_z and drop point).
                </p>
                <h4>Failure modes</h4>
                <p>If any name lookup returns −1 (name not in model) the ID is stored as −1. All geometry helpers check <code>&gt;= 0</code> before using geom IDs and fall back to body-centre + offset. This prevents crashes on model changes at the cost of slightly less accurate geometry.</p>
                <h4>Why it matters</h4>
                <p>The diagnostic print at init confirms every ID resolved before the simulation starts. This was essential for debugging — a −1 ID causes silent wrong geometry rather than a crash.</p>
              </div>
              <div class="code-block"><pre><code>class FSMCore:
    """Tick-driven state machine that emits a high-level PolicyOutput each step.

    Holds references to MuJoCo model/data for GT geometry; never modifies them.
    """

    def __init__(self, model, data) -&gt; None:
        self._model = model
        self._data  = data

        # ---- MuJoCo ID cache ----
        self._rb_id             = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "red_block")
        self._tbl_id            = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "table")
        self._palm_id           = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_SITE, "right_palm")
        self._tbl_geom_id       = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_GEOM, "table_top")
        self._tbl_white_id      = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "table_white")
        self._tbl_white_geom_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_GEOM, "table_white_top")

        self.state             = FSMState.SETTLE
        self._tick_total       = 0
        self._tick_state       = 0
        self._reach_count      = 0     # general-purpose debounce counter
        self._attached         = False
        self._target_drop_pt: np.ndarray | None = None  # frozen at APPROACH_TARGET entry

        print(
            f"[FSM] init  state={self.state.name}"
            f"  rb={self._rb_id}  tbl={self._tbl_id}"
            f"  palm={self._palm_id}  tbl_geom={self._tbl_geom_id}"
            f"  tbl_white={self._tbl_white_id}  tbl_white_geom={self._tbl_white_geom_id}"
        )</code></pre></div>
            </section>

            <!-- 5. tick + dispatch + transition -->
            <section class="code-section" id="tick-dispatch">
              <h3>tick() + _dispatch() + _transition()</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p><code>tick()</code> is the public entry point — called once per control tick by FSMPolicy. It stores the attachment state, dispatches to the current state handler, and increments both tick counters. <code>_transition()</code> handles all state changes, logging world-state snapshots at each transition point.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>tick(attached):</strong> <code>attached</code> is the grasp backend's confirmed attachment state. Returns <code>PolicyOutput</code>. <strong>_dispatch():</strong> routes to per-state handlers by checking <code>self.state</code>. <strong>_transition(new):</strong> logs transition + entry geometry, updates <code>self.state</code>, resets <code>_tick_state</code> and <code>_reach_count</code>.</p>
                <h4>Invariants</h4>
                <p>
                  <code>_tick_state</code> is reset to 0 on every transition. State handlers use it to count ticks since entry and compare against timeouts. First call in a new state has <code>_tick_state == 0</code>.<br>
                  <code>_reach_count</code> is a general debounce counter reset on every transition. Each state handler increments it when its threshold condition is true and clears it when false.<br>
                  Tick counters are incremented <em>after</em> <code>_dispatch()</code> returns — so <code>_tick_state == 0</code> on the first tick in any state.
                </p>
                <h4>Failure modes</h4>
                <p>If <code>_transition()</code> is called from within a state handler, the handler still returns a PolicyOutput for the current tick. The new state handler runs on the <em>next</em> tick. This means transition-tick behavior is defined by the transitioning state, not the new state.</p>
                <h4>Why it matters</h4>
                <p>The <code>_transition()</code> method prints a complete world-state snapshot (positions, distances, heights) at every state change. This log was essential for debugging — it lets you trace exactly what the robot saw when it made each decision.</p>
              </div>
              <div class="code-block"><pre><code>    def tick(self, attached: bool = False) -&gt; PolicyOutput:
        """Advance the FSM by one control tick.

        attached: True when the grasp backend reports the cylinder is welded
                  to the palm this tick.
        """
        self._attached = attached
        out = self._dispatch()
        self._tick_total += 1
        self._tick_state += 1
        return out

    def _dispatch(self) -&gt; PolicyOutput:
        if self.state == FSMState.SETTLE:          return self._settle()
        if self.state == FSMState.APPROACH_SOURCE: return self._approach_source()
        if self.state == FSMState.HOVER_SOURCE:    return self._hover_source()
        if self.state == FSMState.DESCEND_SOURCE:  return self._descend_source()
        if self.state == FSMState.CLOSE_GRIP:      return self._close_grip()
        if self.state == FSMState.LIFT_SOURCE:     return self._lift_source()
        if self.state == FSMState.APPROACH_TARGET: return self._approach_target()
        if self.state == FSMState.HOVER_TARGET:    return self._hover_target()
        if self.state == FSMState.LOWER_TARGET:    return self._lower_target()
        if self.state == FSMState.OPEN_GRIP:       return self._open_grip()
        if self.state == FSMState.RETRACT:         return self._retract()
        return self._done()

    def _transition(self, new: FSMState) -&gt; None:
        print(f"[FSM] {self.state.name} → {new.name}  (t={self._tick_total})")
        # Log world geometry at the moment of entry.
        if new == FSMState.HOVER_SOURCE:
            hover = self._source_hover_world()
            tbl_z = self._table_surface_z()
            dist  = float(np.linalg.norm(self._palm_world() - hover))
            print(f"[FSM]   hover_world=({hover[0]:.3f},{hover[1]:.3f},{hover[2]:.3f})"
                  f"  table_z={tbl_z:.4f}  entry_palm_dist={dist:.3f}")
        elif new == FSMState.APPROACH_TARGET:
            self._target_drop_pt = self._target_drop_world()  # freeze drop point
            tgt_z = self._target_surface_z()
            p = self._target_drop_pt
            ppos = self._data.qpos[:3]
            yaw  = self._pelvis_yaw()
            print(f"[FSM]   drop_world=({p[0]:.3f},{p[1]:.3f},{p[2]:.3f})"
                  f"  target_z={tgt_z:.4f}  pelvis=({ppos[0]:.3f},{ppos[1]:.3f})  yaw={yaw:.3f}")
        elif new == FSMState.DONE:
            cyl      = self._cylinder_world()
            tgt_z    = self._target_surface_z()
            on_table = self._cylinder_on_target_table()
            print(f"[FSM]   cyl_z={cyl[2]:.3f}  target_z={tgt_z:.3f}"
                  f"  clearance={cyl[2]-tgt_z:.3f}  on_target_table={on_table}")
        # (additional elif branches for other states omitted for brevity — see full file)
        self.state        = new
        self._tick_state  = 0
        self._reach_count = 0</code></pre></div>
            </section>

            <!-- 6. Settle + Approach source -->
            <section class="code-section" id="settle-approach">
              <h3>_settle() + _approach_source() — stabilize then walk to cylinder</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p><code>_settle()</code> holds the robot still for SETTLE_TICKS (150 ticks ≈ 3 s) before any motion. <code>_approach_source()</code> walks toward the cylinder using staircase speeds until it is in the pelvis-frame reach window for REACH_DEBOUNCE consecutive ticks.</p>
                <h4>Inputs / Outputs</h4>
                <p>Both return a <code>PolicyOutput</code>. SETTLE always outputs <code>walk_cmd=(0,0,0)</code>, <code>reach_target=CARRY_POSE</code>, <code>reach_active=False</code>, <code>grip_closed=False</code>. APPROACH_SOURCE outputs a walk command from <code>_approach_walk_cmd(cyl)</code> when outside the window, zero when inside.</p>
                <h4>Invariants</h4>
                <p>
                  SETTLE transition fires when <code>_tick_state &gt;= SETTLE_TICKS</code>.<br>
                  APPROACH debounce: <code>_reach_count</code> increments each tick the cylinder is in the window. Resets on any tick it is out. Transitions at REACH_DEBOUNCE = 8 consecutive in-window ticks.<br>
                  The arm is in carry pose but <code>reach_active=False</code> during these states — the controller still runs the reacher unconditionally to maintain carry pose.
                </p>
                <h4>Failure modes</h4>
                <p>If the cylinder is placed far outside the X reach window (e.g., x &gt; 0.38 m in pelvis frame when stopped) the robot can stop too early. The staircase goes to vx=0 when x_err &lt; 0.04, which can be above the actual reach window entry.</p>
                <h4>Why it matters</h4>
                <p>SETTLE buys time for ONNX JIT, physics initialization, and the robot to reach a stable standing pose. Removing it causes the robot to start walking before the policies have converged and the first few control outputs can be noisy enough to cause a fall.</p>
              </div>
              <div class="code-block"><pre><code>    def _settle(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print(f"[FSM] SETTLE  holding {SETTLE_TICKS} ticks "
                  f"(~{SETTLE_TICKS / 50:.0f} s) before approach")
        if self._tick_state &gt;= SETTLE_TICKS:
            self._transition(FSMState.APPROACH_SOURCE)
        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=CARRY_POSE,
            reach_active=False,
            grip_closed=False,
        )

    def _approach_source(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] APPROACH_SOURCE  walking toward red cylinder")
        cyl = self._cylinder_in_pelvis()
        if self._in_reach_window(cyl):
            self._reach_count += 1
            walk_cmd: tuple[float, float, float] = (0.0, 0.0, 0.0)
        else:
            self._reach_count = 0
            walk_cmd = self._approach_walk_cmd(cyl)
        if self._reach_count &gt;= REACH_DEBOUNCE:
            print(f"[FSM] cylinder in reach window: "
                  f"pelvis_frame=({cyl[0]:.3f},{cyl[1]:.3f},{cyl[2]:.3f})")
            self._transition(FSMState.HOVER_SOURCE)
        return PolicyOutput(
            walk_cmd=walk_cmd,
            reach_target=CARRY_POSE,
            reach_active=False,
            grip_closed=False,
        )</code></pre></div>
            </section>

            <!-- 7. Hover + Descend -->
            <section class="code-section" id="hover-descend">
              <h3>_hover_source() + _descend_source() — arm positioning</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Move the arm from carry pose to a point above the cylinder (hover), then lower it to grasp height. Both states stop the robot (<code>walk_cmd=(0,0,0)</code>) and activate the reacher.</p>
                <h4>Inputs / Outputs</h4>
                <p>Both compute a world-space target (<code>_source_hover_world()</code> or <code>_source_grasp_world()</code>), convert to pelvis-frame via <code>_reach_from_world(..., right_bias=-0.03)</code>, and return it as <code>reach_target</code>. Transition fires when <code>palm_dist &lt; threshold</code> for DEBOUNCE_REACH ticks, or after timeout.</p>
                <h4>Invariants</h4>
                <p>
                  <code>right_bias=-0.03</code>: clamps the pelvis-frame y coordinate to ≤ −0.03, keeping the target 3 cm to the robot's right. The source cylinder is slightly to the right in pelvis frame (y ≈ 0.02–0.03), which would put it on the left arm's side; this bias corrects that.<br>
                  Both states have threshold + timeout dual-exit. DESCEND exits via timeout in most runs — the reacher's ~12 cm accuracy floor means it cannot reliably close the gap below 0.12 m from 0.14 m above.
                </p>
                <h4>Failure modes</h4>
                <p>If the robot is positioned slightly off from the cylinder, hover_world.z may be correct but the XY is wrong. The reacher reaches toward the cylinder's XY as reported by MuJoCo, so this is self-correcting unless the cylinder has moved.</p>
                <h4>Why it matters</h4>
                <p>The two-phase approach (hover then descend) was key to reliable grasping. Going directly to grasp height without first hovering caused the arm to sometimes collide with the table edge on the way down.</p>
              </div>
              <div class="code-block"><pre><code>    def _hover_source(self) -&gt; PolicyOutput:
        hover = self._source_hover_world()
        reach = self._reach_from_world(hover, right_bias=-0.03)
        palm  = self._palm_world()
        dist  = float(np.linalg.norm(palm - hover))

        if dist &lt; HOVER_SOURCE_THRESHOLD:
            self._reach_count += 1
        else:
            self._reach_count = 0

        if self._reach_count &gt;= DEBOUNCE_REACH:
            print(f"[FSM] HOVER_SOURCE → threshold met  palm_dist={dist:.3f}")
            self._transition(FSMState.DESCEND_SOURCE)
        elif self._tick_state &gt;= HOVER_SOURCE_TIMEOUT:
            print(f"[FSM] HOVER_SOURCE → timeout  palm_dist={dist:.3f}")
            self._transition(FSMState.DESCEND_SOURCE)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=False,
        )

    def _descend_source(self) -&gt; PolicyOutput:
        grasp = self._source_grasp_world()
        reach = self._reach_from_world(grasp, right_bias=-0.03)
        palm  = self._palm_world()
        dist  = float(np.linalg.norm(palm - grasp))

        if dist &lt; DESCEND_SOURCE_THRESHOLD:
            self._reach_count += 1
        else:
            self._reach_count = 0

        if self._reach_count &gt;= DEBOUNCE_REACH:
            print(f"[FSM] DESCEND_SOURCE → threshold met  palm_dist={dist:.3f}")
            self._transition(FSMState.CLOSE_GRIP)
        elif self._tick_state &gt;= DESCEND_SOURCE_TIMEOUT:
            print(f"[FSM] DESCEND_SOURCE → timeout  palm_dist={dist:.3f}")
            self._transition(FSMState.CLOSE_GRIP)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=False,
        )</code></pre></div>
            </section>

            <!-- 8. Close grip + Lift -->
            <section class="code-section" id="grip-lift">
              <h3>_close_grip() + _lift_source() — grasp and raise</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p><code>_close_grip()</code> sets <code>grip_closed=True</code> and waits for the grasp backend to confirm attachment. <code>_lift_source()</code> returns the arm to CARRY_POSE and waits for the palm to clear the table by LIFT_DONE_CLEARANCE.</p>
                <h4>Inputs / Outputs</h4>
                <p>CLOSE_GRIP: transitions immediately when <code>self._attached</code> (passed in from FSMPolicy) or after timeout. LIFT_SOURCE: transitions when <code>palm[2] &gt;= table_z + LIFT_DONE_CLEARANCE</code> or after timeout. Both output CARRY_POSE reach target.</p>
                <h4>Invariants</h4>
                <p>
                  In practice CLOSE_GRIP transitions after 1 tick — KinematicAttachment fires on the first physics step with grip closed and palm within 0.13 m.<br>
                  LIFT_SOURCE almost always exits via timeout. The reacher converges toward CARRY_POSE but the clearance threshold (0.25 m above table) is rarely met — the arm ends up ~0.14 m above table when timeout fires. This is acceptable because the cylinder is visually off the table.
                </p>
                <h4>Failure modes</h4>
                <p>If attachment never fires (palm was not close enough when grip closed), CLOSE_GRIP runs for 100 ticks and then transitions to LIFT_SOURCE anyway. The cylinder is not attached, so it stays on the table. LIFT_SOURCE still executes without a cylinder attached — this is the graceful fallback path for failed grasps.</p>
                <h4>Why it matters</h4>
                <p>The <code>_attached</code> flag is what separates this from a purely time-based grasp. The FSM knows whether the cylinder is actually held and can report that at DONE. The FSMPolicy additionally enforces grip closure throughout the carry phase via <code>_close_grip_command()</code>.</p>
              </div>
              <div class="code-block"><pre><code>    def _close_grip(self) -&gt; PolicyOutput:
        grasp = self._source_grasp_world()
        reach = self._reach_from_world(grasp, right_bias=-0.03)

        if self._attached:
            print(f"[FSM] CLOSE_GRIP → attached at t={self._tick_total}")
            self._transition(FSMState.LIFT_SOURCE)
        elif self._tick_state &gt;= CLOSE_GRIP_TIMEOUT:
            print(f"[FSM] CLOSE_GRIP → timeout (not attached)  t={self._tick_total}")
            self._transition(FSMState.LIFT_SOURCE)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=True,
        )

    def _lift_source(self) -&gt; PolicyOutput:
        palm  = self._palm_world()
        tbl_z = self._table_surface_z()

        if palm[2] &gt;= tbl_z + LIFT_DONE_CLEARANCE:
            print(f"[FSM] LIFT_SOURCE → approach target"
                  f"  palm_z={palm[2]:.3f}  clearance={palm[2] - tbl_z:.3f}")
            self._transition(FSMState.APPROACH_TARGET)
        elif self._tick_state &gt;= LIFT_SOURCE_TIMEOUT:
            print(f"[FSM] LIFT_SOURCE → timeout → approach target  palm_z={palm[2]:.3f}")
            self._transition(FSMState.APPROACH_TARGET)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=CARRY_POSE,
            reach_active=True,
            grip_closed=True,
        )</code></pre></div>
            </section>

            <!-- 9. Approach target -->
            <section class="code-section" id="approach-target">
              <h3>_approach_target() — two-phase navigation to target table</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Walk the robot from the source table area to the placement corridor near the target table. The drop point is frozen in world coordinates at state entry. Navigation uses two phases: Phase 1 turns CW until the robot faces −y; Phase 2 drives forward to the standing waypoint.</p>
                <h4>Inputs / Outputs</h4>
                <p>Calls <code>_target_approach_walk_cmd(drop_pelvis)</code> which internally detects which phase to use via <code>_pelvis_yaw()</code>. Transitions to HOVER_TARGET when <code>_near_target_waypoint()</code> is true for TARGET_REACH_DEBOUNCE ticks, or after TARGET_APPROACH_TIMEOUT (900 ticks ≈ 18 s).</p>
                <h4>Invariants</h4>
                <p>
                  <code>self._target_drop_pt</code> is frozen in <code>_transition(FSMState.APPROACH_TARGET)</code> — not in the handler. It must not change during the approach since the robot is moving toward it.<br>
                  The carry pose and grip_closed=True are maintained throughout — the cylinder rides the palm during the entire transport.<br>
                  In all test runs, the robot reached the correct position via Phase 1 timeout rather than waypoint proximity (Phase 2 never fully executed due to the asymptotic turn rate issue). The resulting position still placed the arm within reach.
                </p>
                <h4>Failure modes</h4>
                <p>
                  Using the pelvis-frame reach window check (as in Step 9 initial attempt) fires too early mid-turn: the drop point's pelvis-frame coordinates can accidentally satisfy the window when the robot is still far from the table.<br>
                  The current fix uses a world-frame proximity + yaw gate (<code>_near_target_waypoint()</code>) which requires both conditions simultaneously.
                </p>
                <h4>Why it matters</h4>
                <p>This was the most difficult state to implement correctly. Three rounds of bug fixes were needed, each revealing a new failure mode. The final solution is conservative — it relies on timeout rather than precision waypoint tracking — but produces a physically correct placement.</p>
              </div>
              <div class="code-block"><pre><code>    def _approach_target(self) -&gt; PolicyOutput:
        if self._tick_state == 1:
            print("[FSM] APPROACH_TARGET  walking toward target table")
        drop = self._target_drop_in_pelvis()
        if self._near_target_waypoint():
            self._reach_count += 1
            walk_cmd: tuple[float, float, float] = (0.0, 0.0, 0.0)
        else:
            self._reach_count = 0
            walk_cmd = self._target_approach_walk_cmd(drop)
        if self._reach_count &gt;= TARGET_REACH_DEBOUNCE:
            ppos = self._data.qpos[:3]
            yaw  = self._pelvis_yaw()
            print(f"[FSM] near target waypoint: "
                  f"pelvis=({ppos[0]:.3f},{ppos[1]:.3f})  yaw={yaw:.3f}  "
                  f"drop_pelvis=({drop[0]:.3f},{drop[1]:.3f},{drop[2]:.3f})")
            self._transition(FSMState.HOVER_TARGET)
        elif self._tick_state &gt;= TARGET_APPROACH_TIMEOUT:
            ppos = self._data.qpos[:3]
            print(f"[FSM] APPROACH_TARGET → timeout  "
                  f"drop_pelvis=({drop[0]:.3f},{drop[1]:.3f})  "
                  f"pelvis=({ppos[0]:.3f},{ppos[1]:.3f})")
            self._transition(FSMState.HOVER_TARGET)
        return PolicyOutput(
            walk_cmd=walk_cmd,
            reach_target=CARRY_POSE,
            reach_active=True,
            grip_closed=True,
        )</code></pre></div>
            </section>

            <!-- 10. Hover + Lower target -->
            <section class="code-section" id="hover-lower">
              <h3>_hover_target() + _lower_target() — placement descent</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Mirror of the source-side HOVER_SOURCE + DESCEND_SOURCE sequence but for the target table. Arm moves from carry pose to hover height above the frozen drop point, then descends to release height.</p>
                <h4>Inputs / Outputs</h4>
                <p>HOVER_TARGET: computes <code>_target_hover_world()</code> = drop_pt_xy + target_z + 0.18. LOWER_TARGET: computes <code>_target_place_world()</code> = drop_pt_xy + target_z + 0.06. Both convert to pelvis frame via <code>_reach_from_world</code>. Robot is stopped (<code>walk_cmd=(0,0,0)</code>), grip stays closed.</p>
                <h4>Invariants</h4>
                <p>
                  The drop point used here is the frozen <code>_target_drop_pt</code> from APPROACH_TARGET entry. If the robot moved slightly during navigation (which it does), the arm target is still computed from the correct world-frame drop location.<br>
                  HOVER_TARGET exits in 26 ticks via threshold (palm_dist = 0.120 &lt; 0.14) in the validated run. LOWER_TARGET exits via timeout (palm_dist = 0.183 — reacher cannot get the arm quite close enough to the lower target).
                </p>
                <h4>Failure modes</h4>
                <p>If the robot's final position from APPROACH_TARGET leaves the drop_pt too far in pelvis frame (e.g., pelvis-x &gt; 0.50), the reacher cannot reach it and HOVER_TARGET will timeout with palm_dist still large. The arm never gets close enough to release cleanly onto the table surface.</p>
                <h4>Why it matters</h4>
                <p>The hover→lower structure prevents arm collision with the target table edge, mirrors the source-side approach, and gives the reacher time to converge at each height before descending further.</p>
              </div>
              <div class="code-block"><pre><code>    def _hover_target(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] HOVER_TARGET  moving arm above drop point")
        hover = self._target_hover_world()
        reach = self._reach_from_world(hover, right_bias=-0.03)
        palm  = self._palm_world()
        dist  = float(np.linalg.norm(palm - hover))

        if dist &lt; HOVER_TARGET_THRESHOLD:
            self._reach_count += 1
        else:
            self._reach_count = 0

        if self._reach_count &gt;= DEBOUNCE_REACH:
            print(f"[FSM] HOVER_TARGET → threshold met  palm_dist={dist:.3f}")
            self._transition(FSMState.LOWER_TARGET)
        elif self._tick_state &gt;= HOVER_TARGET_TIMEOUT:
            print(f"[FSM] HOVER_TARGET → timeout  palm_dist={dist:.3f}")
            self._transition(FSMState.LOWER_TARGET)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=True,
        )

    def _lower_target(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] LOWER_TARGET  descending arm to release height")
        place = self._target_place_world()
        reach = self._reach_from_world(place, right_bias=-0.03)
        palm  = self._palm_world()
        dist  = float(np.linalg.norm(palm - place))

        if dist &lt; LOWER_TARGET_THRESHOLD:
            self._reach_count += 1
        else:
            self._reach_count = 0

        if self._reach_count &gt;= DEBOUNCE_REACH:
            print(f"[FSM] LOWER_TARGET → threshold met  palm_dist={dist:.3f}")
            self._transition(FSMState.OPEN_GRIP)
        elif self._tick_state &gt;= LOWER_TARGET_TIMEOUT:
            print(f"[FSM] LOWER_TARGET → timeout  palm_dist={dist:.3f}")
            self._transition(FSMState.OPEN_GRIP)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=True,
        )</code></pre></div>
            </section>

            <!-- 11. Open grip + Retract + Done -->
            <section class="code-section" id="open-retract-done">
              <h3>_open_grip() + _retract() + _done() — release and finish</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p><code>_open_grip()</code> sets <code>grip_closed=False</code> and waits for the grasp backend to confirm detachment. <code>_retract()</code> returns the arm to carry pose and waits for clearance above the target table. <code>_done()</code> holds carry pose indefinitely.</p>
                <h4>Inputs / Outputs</h4>
                <p>OPEN_GRIP transitions when <code>not self._attached</code> or after timeout. RETRACT transitions when <code>palm[2] &gt;= target_z + LIFT_DONE_CLEARANCE</code> or after RETRACT_TIMEOUT. DONE outputs CARRY_POSE with <code>grip_closed=False</code>.</p>
                <h4>Invariants</h4>
                <p>
                  OPEN_GRIP outputs <code>grip_closed=False</code>. FSMPolicy's <code>_close_grip_command()</code> guard is bypassed for OPEN_GRIP, RETRACT, and DONE — this bypass was added in Step 10 to fix the bug where the guard prevented intentional release.<br>
                  After release, the cylinder falls from its current position (typically 8 cm above target surface) and settles on the table. The ~1.7 cm drop is within tolerance.<br>
                  DONE's <code>_cylinder_on_target_table()</code> is evaluated immediately — but in the test script this fires before the cylinder has settled. The test script exits as PASS/FAIL based on this snapshot, which can report False even when visual inspection confirms success (cylinder still mid-air at DONE entry tick).
                </p>
                <h4>Failure modes</h4>
                <p>If the FSMPolicy's <code>_close_grip_command()</code> guard is not exempted for OPEN_GRIP (as was the case in the initial Step 10), <code>grip_closed=True</code> will override the FSM's <code>grip_closed=False</code> and the cylinder will never release.</p>
                <h4>Why it matters</h4>
                <p>The release sequence (open → retract → done) defines what "success" looks like. DONE means the task is complete but the simulation continues — the cylinder physics resume and it settles onto the table in subsequent steps.</p>
              </div>
              <div class="code-block"><pre><code>    def _open_grip(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] OPEN_GRIP  releasing cylinder")
        place = self._target_place_world()
        reach = self._reach_from_world(place, right_bias=-0.03)

        if not self._attached:
            print(f"[FSM] OPEN_GRIP → released  t={self._tick_total}")
            self._transition(FSMState.RETRACT)
        elif self._tick_state &gt;= OPEN_GRIP_TIMEOUT:
            print(f"[FSM] OPEN_GRIP → timeout  attached={self._attached}  t={self._tick_total}")
            self._transition(FSMState.RETRACT)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=False,
        )

    def _retract(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] RETRACT  raising arm to carry pose")
        palm  = self._palm_world()
        tgt_z = self._target_surface_z()

        if palm[2] &gt;= tgt_z + LIFT_DONE_CLEARANCE:
            print(f"[FSM] RETRACT → arm clear  palm_z={palm[2]:.3f}")
            self._transition(FSMState.DONE)
        elif self._tick_state &gt;= RETRACT_TIMEOUT:
            print(f"[FSM] RETRACT → timeout  palm_z={palm[2]:.3f}")
            self._transition(FSMState.DONE)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=CARRY_POSE,
            reach_active=True,
            grip_closed=False,
        )

    def _done(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] DONE  task complete — holding carry pose")
        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=CARRY_POSE,
            reach_active=True,
            grip_closed=False,
        )</code></pre></div>
            </section>

            <!-- 12. GT geometry helpers -->
            <section class="code-section" id="gt-geometry">
              <h3>GT geometry helpers — pelvis pose, yaw, world→pelvis transform</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>These low-level helpers read MuJoCo state and perform the coordinate-frame math needed by all state handlers. The "GT" (ground truth) prefix means they use simulation data directly rather than sensor estimates.</p>
                <h4>Methods</h4>
                <p><strong>_pelvis_pose():</strong> returns (pos[3], quat[4]) from qpos[0:7]. <strong>_pelvis_yaw():</strong> extracts yaw angle from pelvis quaternion using the standard formula. <strong>_world_to_pelvis():</strong> rotates a world-frame vector into the pelvis frame using quaternion inverse rotation (cross-product form). <strong>_cylinder_world():</strong> <code>data.xpos[rb_id]</code>. <strong>_cylinder_in_pelvis():</strong> applies _world_to_pelvis to cylinder world position. <strong>_palm_world():</strong> <code>data.site_xpos[palm_id]</code>.</p>
                <h4>Invariants</h4>
                <p>
                  <code>_world_to_pelvis</code> implements the passive rotation q⁻¹·v: <code>v - w·t + cross(xyz, t)</code> where <code>t = 2·cross(xyz, v−pos)</code>. This is the same formula used in <code>WalkerReacherController._quat_apply_inverse()</code>.<br>
                  <code>_pelvis_yaw()</code> extracts only the Z-rotation from the quaternion. This is correct when the pelvis is approximately upright (small roll/pitch), which is always true during stable walking.
                </p>
                <h4>Failure modes</h4>
                <p>If the robot falls, pelvis roll/pitch become large and <code>_pelvis_yaw()</code> becomes inaccurate. The yaw-based Phase 1 check in APPROACH_TARGET can behave incorrectly if the robot is tilted. In practice the robot never tilts significantly while the FSM is running because the FSM stops walking during arm states.</p>
              </div>
              <div class="code-block"><pre><code>    def _pelvis_pose(self) -&gt; tuple[np.ndarray, np.ndarray]:
        return self._data.qpos[:3].copy(), self._data.qpos[3:7].copy()

    def _pelvis_yaw(self) -&gt; float:
        """Extract yaw (Z-rotation) from the pelvis quaternion."""
        qw, qx, qy, qz = (float(self._data.qpos[3]), float(self._data.qpos[4]),
                           float(self._data.qpos[5]), float(self._data.qpos[6]))
        return np.arctan2(2.0 * (qw * qz + qx * qy),
                          1.0 - 2.0 * (qy * qy + qz * qz))

    @staticmethod
    def _world_to_pelvis(
        pelvis_pos: np.ndarray,
        pelvis_quat: np.ndarray,
        vec_world: np.ndarray,
    ) -&gt; np.ndarray:
        """Rotate world-frame point into pelvis frame: q⁻¹(v − p)."""
        v   = vec_world - pelvis_pos
        w   = pelvis_quat[0]
        xyz = pelvis_quat[1:4]
        t   = np.cross(xyz, v) * 2.0
        return v - w * t + np.cross(xyz, t)

    def _cylinder_world(self) -&gt; np.ndarray:
        return self._data.xpos[self._rb_id].copy()

    def _cylinder_in_pelvis(self) -&gt; np.ndarray:
        pos, quat = self._pelvis_pose()
        return self._world_to_pelvis(pos, quat, self._cylinder_world())

    def _palm_world(self) -&gt; np.ndarray:
        return self._data.site_xpos[self._palm_id].copy()</code></pre></div>
            </section>

            <!-- 13. Table surface + reach conversion -->
            <section class="code-section" id="table-reach">
              <h3>Table surface height + source hover/grasp + reach conversion</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Compute absolute world-space heights for the source table surface and the hover/grasp points above it. Convert world-space arm targets to clipped pelvis-frame reach commands.</p>
                <h4>Methods</h4>
                <p>
                  <strong>_table_surface_z():</strong> <code>geom_xpos[tbl_geom_id][2] + geom_size[tbl_geom_id][2]</code> — geom centre Z plus half-height. Falls back to body centre + 0.02 if geom ID is −1. Measured value: 0.7330 m.<br>
                  <strong>_source_hover_world():</strong> cylinder XY + Z = table_z + HOVER_SOURCE_HEIGHT (0.18 m). Measures 0.9130 m Z.<br>
                  <strong>_source_grasp_world():</strong> cylinder XY + Z = table_z + GRASP_HEIGHT (0.06 m). Measures 0.7930 m Z.<br>
                  <strong>_clip_reach_target():</strong> clips to <code>_REACH_LOW / _REACH_HIGH</code> workspace bounds.<br>
                  <strong>_reach_from_world():</strong> <code>_world_to_pelvis()</code> → clamp y to right_bias → clip.
                </p>
                <h4>Invariants</h4>
                <p>Using geom-based surface height (not body centre + hardcoded offset) is more accurate because the table body origin may not be at the surface. The geom half-height directly gives the actual surface elevation. The right_bias parameter defaults to −0.08 m for general use but is overridden to −0.03 for source-side targets where the cylinder is near the centre.</p>
                <h4>Failure modes</h4>
                <p>If the geom ID lookup returns −1 (geom renamed), the fallback adds a hardcoded 0.02 m offset to the body centre, which may be inaccurate for table variants. The smoke_env.py check catches this before the FSM runs.</p>
              </div>
              <div class="code-block"><pre><code>    def _table_surface_z(self) -&gt; float:
        if self._tbl_geom_id &gt;= 0:
            return float(
                self._data.geom_xpos[self._tbl_geom_id][2]
                + self._model.geom_size[self._tbl_geom_id][2]
            )
        return float(self._data.xpos[self._tbl_id][2]) + 0.02

    def _source_hover_world(self) -&gt; np.ndarray:
        p = self._cylinder_world().copy()
        p[2] = self._table_surface_z() + HOVER_SOURCE_HEIGHT
        return p

    def _source_grasp_world(self) -&gt; np.ndarray:
        p = self._cylinder_world().copy()
        p[2] = self._table_surface_z() + GRASP_HEIGHT
        return p

    @staticmethod
    def _clip_reach_target(reach: np.ndarray) -&gt; np.ndarray:
        """Clip a pelvis-frame reach target to the reacher's workspace."""
        return np.clip(reach, _REACH_LOW, _REACH_HIGH).astype(np.float32)

    def _reach_from_world(
        self, world_point: np.ndarray, right_bias: float = -0.08
    ) -&gt; np.ndarray:
        """Convert world point → clipped pelvis-frame reach target.

        right_bias clamps y so the target is at least this far to the
        robot's right (y &lt;= right_bias in pelvis frame).
        """
        pos, quat = self._pelvis_pose()
        local = self._world_to_pelvis(pos, quat, world_point).copy().astype(np.float32)
        local[1] = min(float(local[1]), right_bias)
        return self._clip_reach_target(local)</code></pre></div>
            </section>

            <!-- 14. Target geometry -->
            <section class="code-section" id="target-geometry">
              <h3>Target table geometry — surface, drop point, hover/place world positions</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Compute world-space positions for all target-side arm targets. The drop point is computed once and frozen at APPROACH_TARGET entry; all subsequent target-side states reference the frozen value.</p>
                <h4>Methods</h4>
                <p>
                  <strong>_target_surface_z():</strong> same pattern as source — geom-based surface height. Measured: 0.633 m.<br>
                  <strong>_target_drop_world():</strong> geom_center_x, near_edge_y − TARGET_NEAR_EDGE_INSET (0.05 m), target_surface_z. Near edge = gy + hy (least-negative y = robot side). Measured: (−0.300, −0.600, 0.633).<br>
                  <strong>_target_drop_in_pelvis():</strong> applies <code>_world_to_pelvis</code> to the frozen drop point.<br>
                  <strong>_target_hover_world():</strong> frozen drop XY + target_z + HOVER_TARGET_HEIGHT (0.18).<br>
                  <strong>_target_place_world():</strong> frozen drop XY + target_z + PLACE_HEIGHT (0.06).
                </p>
                <h4>Invariants</h4>
                <p><code>_target_drop_pt</code> is frozen in <code>_transition(APPROACH_TARGET)</code>. If it were recomputed live, the robot would chase a moving target as the robot position changes (the pelvis-frame computation changes as the robot moves). Freezing it in world coordinates is essential.</p>
                <h4>Failure modes</h4>
                <p>If <code>_tbl_white_geom_id</code> is −1 the fallback uses body centre + offset for both surface_z and drop point. The step-10 debug revealed that the fallback used Python negative indexing (<code>xpos[-1]</code>) when the body ID was also −1, reading an arbitrary body position. Fixed by adding a guard for <code>tbl_white_id &gt;= 0</code>.</p>
              </div>
              <div class="code-block"><pre><code>    def _target_surface_z(self) -&gt; float:
        if self._tbl_white_geom_id &gt;= 0:
            return float(
                self._data.geom_xpos[self._tbl_white_geom_id][2]
                + self._model.geom_size[self._tbl_white_geom_id][2]
            )
        return float(self._data.xpos[self._tbl_white_id][2]) + 0.02

    def _target_drop_world(self) -&gt; np.ndarray:
        if self._tbl_white_geom_id &gt;= 0:
            gx  = float(self._data.geom_xpos[self._tbl_white_geom_id][0])
            gy  = float(self._data.geom_xpos[self._tbl_white_geom_id][1])
            near_edge_y = gy + float(self._model.geom_size[self._tbl_white_geom_id][1])
            drop_y = near_edge_y - TARGET_NEAR_EDGE_INSET
            drop_z = self._target_surface_z()
            return np.array([gx, drop_y, drop_z], dtype=np.float64)
        c = self._data.xpos[self._tbl_white_id].copy()
        return np.array([c[0], c[1] + 0.20, c[2] + 0.02], dtype=np.float64)

    def _target_drop_in_pelvis(self) -&gt; np.ndarray:
        pos, quat = self._pelvis_pose()
        return self._world_to_pelvis(pos, quat, self._target_drop_pt)

    def _target_hover_world(self) -&gt; np.ndarray:
        p = self._target_drop_pt.copy()
        p[2] = self._target_surface_z() + HOVER_TARGET_HEIGHT
        return p

    def _target_place_world(self) -&gt; np.ndarray:
        p = self._target_drop_pt.copy()
        p[2] = self._target_surface_z() + PLACE_HEIGHT
        return p</code></pre></div>
            </section>

            <!-- 15. on_target_table -->
            <section class="code-section" id="on-table">
              <h3>_cylinder_on_target_table() — placement verification</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Check whether the cylinder is resting on the target table. Used in transition logging and as the pass/fail criterion in the test script. Two checks: Z-range and XY footprint.</p>
                <h4>Inputs / Outputs</h4>
                <p>Returns True iff: (1) cylinder Z ∈ (target_z − 0.01, target_z + ON_TABLE_Z_MAX), AND (2) cylinder XY within geom footprint + ON_TABLE_XY_MARGIN = 0.05 m.</p>
                <h4>Invariants</h4>
                <p>The check is evaluated at DONE entry when the cylinder may still be mid-air (just released, physics not yet settled). The test script exits immediately at DONE — so the on_table check can report False even when the cylinder visually lands on the table in subsequent simulation steps.</p>
                <h4>Failure modes</h4>
                <p>Step 10 bug: when <code>tbl_white_geom_id = −1</code> AND <code>tbl_white_id = −1</code>, the body fallback used <code>self._data.xpos[-1]</code> — Python's negative index returned the last body in the model at an arbitrary world position, giving spurious True. Fixed by guarding <code>if self._tbl_white_id &gt;= 0</code> and returning False when both IDs are −1.</p>
                <h4>Why it matters</h4>
                <p>This is the ground-truth success criterion. It's only as good as the geom ID lookup — if the geom/body IDs are wrong, the check is wrong. smoke_env.py validates that these names exist before the FSM runs.</p>
              </div>
              <div class="code-block"><pre><code>    def _cylinder_on_target_table(self) -&gt; bool:
        cyl   = self._cylinder_world()
        tgt_z = self._target_surface_z()
        if not (tgt_z - 0.01 &lt;= cyl[2] &lt;= tgt_z + ON_TABLE_Z_MAX):
            return False
        if self._tbl_white_geom_id &gt;= 0:
            gx = float(self._data.geom_xpos[self._tbl_white_geom_id][0])
            gy = float(self._data.geom_xpos[self._tbl_white_geom_id][1])
            hx = float(self._model.geom_size[self._tbl_white_geom_id][0])
            hy = float(self._model.geom_size[self._tbl_white_geom_id][1])
            return (abs(cyl[0] - gx) &lt;= hx + ON_TABLE_XY_MARGIN and
                    abs(cyl[1] - gy) &lt;= hy + ON_TABLE_XY_MARGIN)
        if self._tbl_white_id &gt;= 0:
            c = self._data.xpos[self._tbl_white_id]
            return (abs(cyl[0] - c[0]) &lt;= 0.40 and abs(cyl[1] - c[1]) &lt;= 0.30)
        return False</code></pre></div>
            </section>

            <!-- 16. Source approach walk command -->
            <section class="code-section" id="approach-cmd">
              <h3>_approach_walk_cmd() — staircase velocity toward cylinder</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Compute the (vx, vy, wz) walk command to drive toward the cylinder. Uses a staircase speed schedule for vx to prevent overshoot, proportional vy for lateral alignment, and arctan2-based wz for heading.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> <code>cyl</code> — cylinder position in pelvis frame. <strong>Returns:</strong> (vx, vy, wz) tuple.</p>
                <h4>Design decisions (Step 6)</h4>
                <p>
                  <strong>Staircase vx:</strong> x_err &gt; 0.18 → 0.35; &gt; 0.10 → 0.22; &gt; 0.04 → 0.12; else 0. Proportional control overshoots the reach window at low x_err; staircase steps to zero smoothly.<br>
                  <strong>vy = K_VY × (cyl.y − (−0.05)):</strong> targets pelvis-frame y = −0.05 (the right arm's natural sweet spot). Capped at ±VY_CAP = ±0.18 m/s.<br>
                  <strong>wz = K_WZ × arctan2(cyl.y, max(cyl.x, 0.15)):</strong> arctan2-based heading avoids the coupled oscillation that occurred with proportional error × yaw control. The max(cyl.x, 0.15) prevents large wz when the cylinder is directly to the side.
                </p>
                <h4>Failure modes</h4>
                <p>If the cylinder is behind the robot (cyl.x &lt; 0), the staircase gives vx = 0 and the robot stops. wz would be near ±π/2, causing a large turn. In practice the spawn positions ensure the cylinder is always in front.</p>
              </div>
              <div class="code-block"><pre><code>    def _approach_walk_cmd(self, cyl: np.ndarray) -&gt; tuple[float, float, float]:
        """Staircase vx + proportional vy/wz toward cylinder."""
        x_err = cyl[0] - APPROACH_TARGET_X
        if x_err &gt; 0.18:
            vx = VX_FAST
        elif x_err &gt; 0.10:
            vx = VX_MED
        elif x_err &gt; 0.04:
            vx = VX_SLOW
        else:
            vx = 0.0
        y_err = cyl[1] - (-0.05)
        vy = float(np.clip(K_VY * y_err, -VY_CAP, VY_CAP))
        wz = float(np.clip(
            K_WZ * np.arctan2(cyl[1], max(cyl[0], 0.15)),
            -WZ_CAP, WZ_CAP,
        ))
        return (vx, vy, wz)</code></pre></div>
            </section>

            <!-- 17. Target approach walk command + near waypoint -->
            <section class="code-section" id="target-nav">
              <h3>_target_approach_walk_cmd() + _near_target_waypoint()</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p><code>_target_approach_walk_cmd()</code> produces the walk command for both Phase 1 (CW turn) and Phase 2 (drive to standing waypoint). <code>_near_target_waypoint()</code> checks the combined exit condition: yaw aligned AND close to waypoint.</p>
                <h4>Phase 1 details</h4>
                <p>Condition: <code>|yaw + π/2| &gt; PHASE1_ALIGN_TOL (0.40 rad)</code>. Command: <code>(VX_P1=0.12, 0, −WZ_P1=−1.0)</code>. Turns CW (negative wz). The robot cannot use vx=0 for a pure spin — the walker requires forward motion to stay stable. Turning radius R = VX_P1/WZ_P1 = 0.12 m.</p>
                <h4>Phase 2 details</h4>
                <p>Compute world-frame error to standing waypoint <code>(drop_x, drop_y + TARGET_STAND_DIST)</code>. Decompose into forward (cos/sin of yaw) and lateral components. Apply staircase vx based on total distance, proportional vy for lateral, and proportional wz for bearing alignment.</p>
                <h4>_near_target_waypoint() details</h4>
                <p>Returns True when: (1) <code>|yaw + π/2| &lt; PHASE1_ALIGN_TOL</code> (facing roughly −y), AND (2) world-frame distance from pelvis to standing waypoint &lt; TARGET_APPROACH_DIST_THRESH (0.08 m). Uses world-frame proximity rather than pelvis-frame reach window to avoid the false-positive that caused the initial Step 9 failure.</p>
                <h4>Failure modes</h4>
                <p>In all test runs Phase 2 never executes — the robot times out in Phase 1 at yaw ≈ −1.17 rad (0.40 rad off from −π/2). The timeout position (~(−0.34, −0.19)) happens to be close enough to the target table that HOVER_TARGET succeeds anyway. Phase 2 represents over-engineering for precision that the current reacher cannot fully exploit.</p>
              </div>
              <div class="code-block"><pre><code>    def _target_approach_walk_cmd(self, drop_pelvis: np.ndarray) -&gt; tuple[float, float, float]:
        pelvis_pos = self._data.qpos[:3]
        yaw = self._pelvis_yaw()

        # ---- Phase 1: CW turn until facing -y --------------------------------
        if abs(yaw + np.pi / 2) &gt; PHASE1_ALIGN_TOL:
            return (VX_P1, 0.0, -WZ_P1)

        # ---- Phase 2: drive toward standing waypoint -------------------------
        drop_w  = self._target_drop_pt
        stand_x = float(drop_w[0])
        stand_y = float(drop_w[1]) + TARGET_STAND_DIST   # e.g. -0.60 + 0.24 = -0.36

        ex = stand_x - float(pelvis_pos[0])
        ey = stand_y - float(pelvis_pos[1])
        dist = float(np.sqrt(ex * ex + ey * ey))

        bearing  = float(np.arctan2(ey, ex))
        a_err    = (bearing - yaw + np.pi) % (2.0 * np.pi) - np.pi

        cos_y, sin_y = float(np.cos(yaw)), float(np.sin(yaw))
        left_err = -ex * sin_y + ey * cos_y

        if dist &gt; 0.35:   vx = VX_FAST
        elif dist &gt; 0.18: vx = VX_MED
        else:             vx = VX_SLOW
        vy = float(np.clip(K_VY * left_err, -VY_CAP, VY_CAP))
        wz = float(np.clip(K_WZ * a_err,   -WZ_CAP, WZ_CAP))
        return (vx, vy, wz)

    def _near_target_waypoint(self) -&gt; bool:
        yaw = self._pelvis_yaw()
        if abs(yaw + np.pi / 2) &gt; PHASE1_ALIGN_TOL:
            return False
        pelvis = self._data.qpos[:3]
        drop_w = self._target_drop_pt
        stand_x = float(drop_w[0])
        stand_y = float(drop_w[1]) + TARGET_STAND_DIST
        ex = stand_x - float(pelvis[0])
        ey = stand_y - float(pelvis[1])
        return float(np.sqrt(ex * ex + ey * ey)) &lt; TARGET_APPROACH_DIST_THRESH

    def _in_reach_window(self, cyl: np.ndarray) -&gt; bool:
        return (REACH_X_MIN &lt; cyl[0] &lt; REACH_X_MAX and
                REACH_Y_MIN &lt; cyl[1] &lt; REACH_Y_MAX)</code></pre></div>
            </section>

            <!-- Full file -->
            <section class="code-section" id="full-file">
              <h3>Full source file</h3>
              <p>Complete HTML-escaped source of <code>policies/fsm_core.py</code>. ~748 lines.</p>
              <details class="code-details">
                <summary><span>Expand full fsm_core.py</span><code>~748 lines</code></summary>
                <div class="code-block"><pre><code>"""Pure FSM state machine — no controller dependency."""

from __future__ import annotations

from enum import Enum, auto

import mujoco
import numpy as np

from .base import PolicyOutput

# --------------------------------------------------------------------------- #
# Tuning constants
# --------------------------------------------------------------------------- #

CARRY_POSE: tuple[float, float, float] = (0.3, -0.2, 0.2)
SETTLE_TICKS = 150
APPROACH_TARGET_X = 0.34

REACH_X_MIN, REACH_X_MAX = 0.20, 0.38
REACH_Y_MIN, REACH_Y_MAX = -0.14, 0.02

REACH_DEBOUNCE = 8

VX_FAST, VX_MED, VX_SLOW = 0.35, 0.22, 0.12
K_VY,  VY_CAP  = 1.8, 0.18
K_WZ,  WZ_CAP  = 1.2, 0.25

HOVER_SOURCE_HEIGHT = 0.18
GRASP_HEIGHT        = 0.06

HOVER_SOURCE_THRESHOLD   = 0.14
DESCEND_SOURCE_THRESHOLD = 0.12

HOVER_SOURCE_TIMEOUT   = 200
DESCEND_SOURCE_TIMEOUT = 300
CLOSE_GRIP_TIMEOUT     = 100
LIFT_SOURCE_TIMEOUT    = 200

DEBOUNCE_REACH = 6

LIFT_DONE_CLEARANCE = 0.25

TARGET_NEAR_EDGE_INSET  = 0.05
TARGET_REACH_DEBOUNCE   = 8
TARGET_APPROACH_TIMEOUT = 900

HOVER_TARGET_HEIGHT    = 0.18
PLACE_HEIGHT           = 0.06
HOVER_TARGET_THRESHOLD = 0.14
LOWER_TARGET_THRESHOLD = 0.14
HOVER_TARGET_TIMEOUT   = 200
LOWER_TARGET_TIMEOUT   = 300
OPEN_GRIP_TIMEOUT      = 100
RETRACT_TIMEOUT        = 200

ON_TABLE_XY_MARGIN = 0.05
ON_TABLE_Z_MAX     = 0.20

VX_P1 = 0.12
WZ_P1 = 1.0
PHASE1_ALIGN_TOL = 0.40

TARGET_STAND_DIST = 0.24
TARGET_APPROACH_DIST_THRESH = 0.08

_REACH_LOW  = np.array([-0.30, -0.60, -0.40], dtype=np.float32)
_REACH_HIGH = np.array([ 0.60,  0.30,  0.60], dtype=np.float32)


# --------------------------------------------------------------------------- #
# State enumeration
# --------------------------------------------------------------------------- #

class FSMState(Enum):
    SETTLE          = auto()
    APPROACH_SOURCE = auto()
    HOVER_SOURCE    = auto()
    DESCEND_SOURCE  = auto()
    CLOSE_GRIP      = auto()
    LIFT_SOURCE     = auto()
    APPROACH_TARGET = auto()
    HOVER_TARGET    = auto()
    LOWER_TARGET    = auto()
    OPEN_GRIP       = auto()
    RETRACT         = auto()
    DONE            = auto()


# --------------------------------------------------------------------------- #
# Core machine
# --------------------------------------------------------------------------- #

class FSMCore:
    """Tick-driven state machine that emits a high-level PolicyOutput each step.

    Holds references to MuJoCo model/data for GT geometry; never modifies them.
    """

    def __init__(self, model, data) -&gt; None:
        self._model = model
        self._data  = data

        self._rb_id             = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "red_block")
        self._tbl_id            = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "table")
        self._palm_id           = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_SITE, "right_palm")
        self._tbl_geom_id       = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_GEOM, "table_top")
        self._tbl_white_id      = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "table_white")
        self._tbl_white_geom_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_GEOM, "table_white_top")

        self.state             = FSMState.SETTLE
        self._tick_total       = 0
        self._tick_state       = 0
        self._reach_count      = 0
        self._attached         = False
        self._target_drop_pt: np.ndarray | None = None

        print(
            f"[FSM] init  state={self.state.name}"
            f"  rb={self._rb_id}  tbl={self._tbl_id}"
            f"  palm={self._palm_id}  tbl_geom={self._tbl_geom_id}"
            f"  tbl_white={self._tbl_white_id}  tbl_white_geom={self._tbl_white_geom_id}"
        )

    def tick(self, attached: bool = False) -&gt; PolicyOutput:
        self._attached = attached
        out = self._dispatch()
        self._tick_total += 1
        self._tick_state += 1
        return out

    def _dispatch(self) -&gt; PolicyOutput:
        if self.state == FSMState.SETTLE:          return self._settle()
        if self.state == FSMState.APPROACH_SOURCE: return self._approach_source()
        if self.state == FSMState.HOVER_SOURCE:    return self._hover_source()
        if self.state == FSMState.DESCEND_SOURCE:  return self._descend_source()
        if self.state == FSMState.CLOSE_GRIP:      return self._close_grip()
        if self.state == FSMState.LIFT_SOURCE:     return self._lift_source()
        if self.state == FSMState.APPROACH_TARGET: return self._approach_target()
        if self.state == FSMState.HOVER_TARGET:    return self._hover_target()
        if self.state == FSMState.LOWER_TARGET:    return self._lower_target()
        if self.state == FSMState.OPEN_GRIP:       return self._open_grip()
        if self.state == FSMState.RETRACT:         return self._retract()
        return self._done()

    def _transition(self, new: FSMState) -&gt; None:
        print(f"[FSM] {self.state.name} → {new.name}  (t={self._tick_total})")
        if new == FSMState.HOVER_SOURCE:
            hover = self._source_hover_world()
            tbl_z = self._table_surface_z()
            dist  = float(np.linalg.norm(self._palm_world() - hover))
            print(f"[FSM]   hover_world=({hover[0]:.3f},{hover[1]:.3f},{hover[2]:.3f})"
                  f"  table_z={tbl_z:.4f}  entry_palm_dist={dist:.3f}")
        elif new == FSMState.DESCEND_SOURCE:
            grasp = self._source_grasp_world()
            dist  = float(np.linalg.norm(self._palm_world() - grasp))
            print(f"[FSM]   grasp_world=({grasp[0]:.3f},{grasp[1]:.3f},{grasp[2]:.3f})"
                  f"  entry_palm_dist={dist:.3f}")
        elif new == FSMState.CLOSE_GRIP:
            dist = float(np.linalg.norm(self._palm_world() - self._cylinder_world()))
            print(f"[FSM]   palm_to_cyl={dist:.3f} m")
        elif new == FSMState.LIFT_SOURCE:
            palm = self._palm_world()
            cyl  = self._cylinder_world()
            print(f"[FSM]   palm_z={palm[2]:.3f}  cyl_z={cyl[2]:.3f}  attached={self._attached}")
        elif new == FSMState.APPROACH_TARGET:
            self._target_drop_pt = self._target_drop_world()
            tgt_z = self._target_surface_z()
            p = self._target_drop_pt
            dist = float(np.linalg.norm(self._palm_world() - p))
            ppos = self._data.qpos[:3]
            yaw  = self._pelvis_yaw()
            print(f"[FSM]   drop_world=({p[0]:.3f},{p[1]:.3f},{p[2]:.3f})"
                  f"  target_z={tgt_z:.4f}  palm_dist={dist:.3f}"
                  f"  pelvis=({ppos[0]:.3f},{ppos[1]:.3f})  yaw={yaw:.3f}")
        elif new == FSMState.HOVER_TARGET:
            p    = self._target_drop_in_pelvis()
            palm = self._palm_world()
            print(f"[FSM]   drop_pelvis=({p[0]:.3f},{p[1]:.3f},{p[2]:.3f})"
                  f"  palm_z={palm[2]:.3f}")
        elif new == FSMState.LOWER_TARGET:
            hover = self._target_hover_world()
            palm  = self._palm_world()
            print(f"[FSM]   palm_dist_to_hover={np.linalg.norm(palm-hover):.3f}")
        elif new == FSMState.OPEN_GRIP:
            palm  = self._palm_world()
            cyl   = self._cylinder_world()
            tgt_z = self._target_surface_z()
            print(f"[FSM]   palm_z={palm[2]:.3f}  cyl_z={cyl[2]:.3f}"
                  f"  height_above_target={cyl[2]-tgt_z:.3f}")
        elif new == FSMState.RETRACT:
            cyl      = self._cylinder_world()
            tgt_z    = self._target_surface_z()
            on_table = self._cylinder_on_target_table()
            print(f"[FSM]   cyl_z={cyl[2]:.3f}  on_target_table={on_table}")
        elif new == FSMState.DONE:
            cyl      = self._cylinder_world()
            tgt_z    = self._target_surface_z()
            on_table = self._cylinder_on_target_table()
            print(f"[FSM]   cyl_z={cyl[2]:.3f}  target_z={tgt_z:.3f}"
                  f"  clearance={cyl[2]-tgt_z:.3f}  on_target_table={on_table}")
        self.state        = new
        self._tick_state  = 0
        self._reach_count = 0

    # ------------------------------------------------------------------ #
    # State handlers
    # ------------------------------------------------------------------ #

    def _settle(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print(f"[FSM] SETTLE  holding {SETTLE_TICKS} ticks "
                  f"(~{SETTLE_TICKS / 50:.0f} s) before approach")
        if self._tick_state &gt;= SETTLE_TICKS:
            self._transition(FSMState.APPROACH_SOURCE)
        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=CARRY_POSE,
            reach_active=False,
            grip_closed=False,
        )

    def _approach_source(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] APPROACH_SOURCE  walking toward red cylinder")
        cyl = self._cylinder_in_pelvis()
        if self._in_reach_window(cyl):
            self._reach_count += 1
            walk_cmd: tuple[float, float, float] = (0.0, 0.0, 0.0)
        else:
            self._reach_count = 0
            walk_cmd = self._approach_walk_cmd(cyl)
        if self._reach_count &gt;= REACH_DEBOUNCE:
            print(f"[FSM] cylinder in reach window: "
                  f"pelvis_frame=({cyl[0]:.3f},{cyl[1]:.3f},{cyl[2]:.3f})")
            self._transition(FSMState.HOVER_SOURCE)
        return PolicyOutput(
            walk_cmd=walk_cmd,
            reach_target=CARRY_POSE,
            reach_active=False,
            grip_closed=False,
        )

    def _hover_source(self) -&gt; PolicyOutput:
        hover = self._source_hover_world()
        reach = self._reach_from_world(hover, right_bias=-0.03)
        palm  = self._palm_world()
        dist  = float(np.linalg.norm(palm - hover))

        if dist &lt; HOVER_SOURCE_THRESHOLD:
            self._reach_count += 1
        else:
            self._reach_count = 0

        if self._reach_count &gt;= DEBOUNCE_REACH:
            print(f"[FSM] HOVER_SOURCE → threshold met  palm_dist={dist:.3f}")
            self._transition(FSMState.DESCEND_SOURCE)
        elif self._tick_state &gt;= HOVER_SOURCE_TIMEOUT:
            print(f"[FSM] HOVER_SOURCE → timeout  palm_dist={dist:.3f}")
            self._transition(FSMState.DESCEND_SOURCE)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=False,
        )

    def _descend_source(self) -&gt; PolicyOutput:
        grasp = self._source_grasp_world()
        reach = self._reach_from_world(grasp, right_bias=-0.03)
        palm  = self._palm_world()
        dist  = float(np.linalg.norm(palm - grasp))

        if dist &lt; DESCEND_SOURCE_THRESHOLD:
            self._reach_count += 1
        else:
            self._reach_count = 0

        if self._reach_count &gt;= DEBOUNCE_REACH:
            print(f"[FSM] DESCEND_SOURCE → threshold met  palm_dist={dist:.3f}")
            self._transition(FSMState.CLOSE_GRIP)
        elif self._tick_state &gt;= DESCEND_SOURCE_TIMEOUT:
            print(f"[FSM] DESCEND_SOURCE → timeout  palm_dist={dist:.3f}")
            self._transition(FSMState.CLOSE_GRIP)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=False,
        )

    def _close_grip(self) -&gt; PolicyOutput:
        grasp = self._source_grasp_world()
        reach = self._reach_from_world(grasp, right_bias=-0.03)

        if self._attached:
            print(f"[FSM] CLOSE_GRIP → attached at t={self._tick_total}")
            self._transition(FSMState.LIFT_SOURCE)
        elif self._tick_state &gt;= CLOSE_GRIP_TIMEOUT:
            print(f"[FSM] CLOSE_GRIP → timeout (not attached)  t={self._tick_total}")
            self._transition(FSMState.LIFT_SOURCE)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=True,
        )

    def _lift_source(self) -&gt; PolicyOutput:
        palm  = self._palm_world()
        tbl_z = self._table_surface_z()

        if palm[2] &gt;= tbl_z + LIFT_DONE_CLEARANCE:
            print(f"[FSM] LIFT_SOURCE → approach target"
                  f"  palm_z={palm[2]:.3f}  clearance={palm[2] - tbl_z:.3f}")
            self._transition(FSMState.APPROACH_TARGET)
        elif self._tick_state &gt;= LIFT_SOURCE_TIMEOUT:
            print(f"[FSM] LIFT_SOURCE → timeout → approach target  palm_z={palm[2]:.3f}")
            self._transition(FSMState.APPROACH_TARGET)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=CARRY_POSE,
            reach_active=True,
            grip_closed=True,
        )

    def _approach_target(self) -&gt; PolicyOutput:
        if self._tick_state == 1:
            print("[FSM] APPROACH_TARGET  walking toward target table")
        drop = self._target_drop_in_pelvis()
        if self._near_target_waypoint():
            self._reach_count += 1
            walk_cmd: tuple[float, float, float] = (0.0, 0.0, 0.0)
        else:
            self._reach_count = 0
            walk_cmd = self._target_approach_walk_cmd(drop)
        if self._reach_count &gt;= TARGET_REACH_DEBOUNCE:
            ppos = self._data.qpos[:3]
            yaw  = self._pelvis_yaw()
            print(f"[FSM] near target waypoint: "
                  f"pelvis=({ppos[0]:.3f},{ppos[1]:.3f})  yaw={yaw:.3f}  "
                  f"drop_pelvis=({drop[0]:.3f},{drop[1]:.3f},{drop[2]:.3f})")
            self._transition(FSMState.HOVER_TARGET)
        elif self._tick_state &gt;= TARGET_APPROACH_TIMEOUT:
            ppos = self._data.qpos[:3]
            print(f"[FSM] APPROACH_TARGET → timeout  "
                  f"drop_pelvis=({drop[0]:.3f},{drop[1]:.3f})  "
                  f"pelvis=({ppos[0]:.3f},{ppos[1]:.3f})")
            self._transition(FSMState.HOVER_TARGET)
        return PolicyOutput(
            walk_cmd=walk_cmd,
            reach_target=CARRY_POSE,
            reach_active=True,
            grip_closed=True,
        )

    def _hover_target(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] HOVER_TARGET  moving arm above drop point")
        hover = self._target_hover_world()
        reach = self._reach_from_world(hover, right_bias=-0.03)
        palm  = self._palm_world()
        dist  = float(np.linalg.norm(palm - hover))

        if dist &lt; HOVER_TARGET_THRESHOLD:
            self._reach_count += 1
        else:
            self._reach_count = 0

        if self._reach_count &gt;= DEBOUNCE_REACH:
            print(f"[FSM] HOVER_TARGET → threshold met  palm_dist={dist:.3f}")
            self._transition(FSMState.LOWER_TARGET)
        elif self._tick_state &gt;= HOVER_TARGET_TIMEOUT:
            print(f"[FSM] HOVER_TARGET → timeout  palm_dist={dist:.3f}")
            self._transition(FSMState.LOWER_TARGET)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=True,
        )

    def _lower_target(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] LOWER_TARGET  descending arm to release height")
        place = self._target_place_world()
        reach = self._reach_from_world(place, right_bias=-0.03)
        palm  = self._palm_world()
        dist  = float(np.linalg.norm(palm - place))

        if dist &lt; LOWER_TARGET_THRESHOLD:
            self._reach_count += 1
        else:
            self._reach_count = 0

        if self._reach_count &gt;= DEBOUNCE_REACH:
            print(f"[FSM] LOWER_TARGET → threshold met  palm_dist={dist:.3f}")
            self._transition(FSMState.OPEN_GRIP)
        elif self._tick_state &gt;= LOWER_TARGET_TIMEOUT:
            print(f"[FSM] LOWER_TARGET → timeout  palm_dist={dist:.3f}")
            self._transition(FSMState.OPEN_GRIP)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=True,
        )

    def _open_grip(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] OPEN_GRIP  releasing cylinder")
        place = self._target_place_world()
        reach = self._reach_from_world(place, right_bias=-0.03)

        if not self._attached:
            print(f"[FSM] OPEN_GRIP → released  t={self._tick_total}")
            self._transition(FSMState.RETRACT)
        elif self._tick_state &gt;= OPEN_GRIP_TIMEOUT:
            print(f"[FSM] OPEN_GRIP → timeout  attached={self._attached}  t={self._tick_total}")
            self._transition(FSMState.RETRACT)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=reach,
            reach_active=True,
            grip_closed=False,
        )

    def _retract(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] RETRACT  raising arm to carry pose")
        palm  = self._palm_world()
        tgt_z = self._target_surface_z()

        if palm[2] &gt;= tgt_z + LIFT_DONE_CLEARANCE:
            print(f"[FSM] RETRACT → arm clear  palm_z={palm[2]:.3f}")
            self._transition(FSMState.DONE)
        elif self._tick_state &gt;= RETRACT_TIMEOUT:
            print(f"[FSM] RETRACT → timeout  palm_z={palm[2]:.3f}")
            self._transition(FSMState.DONE)

        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=CARRY_POSE,
            reach_active=True,
            grip_closed=False,
        )

    def _done(self) -&gt; PolicyOutput:
        if self._tick_state == 0:
            print("[FSM] DONE  task complete — holding carry pose")
        return PolicyOutput(
            walk_cmd=(0.0, 0.0, 0.0),
            reach_target=CARRY_POSE,
            reach_active=True,
            grip_closed=False,
        )

    # ------------------------------------------------------------------ #
    # GT geometry helpers
    # ------------------------------------------------------------------ #

    def _pelvis_pose(self) -&gt; tuple[np.ndarray, np.ndarray]:
        return self._data.qpos[:3].copy(), self._data.qpos[3:7].copy()

    def _pelvis_yaw(self) -&gt; float:
        qw, qx, qy, qz = (float(self._data.qpos[3]), float(self._data.qpos[4]),
                           float(self._data.qpos[5]), float(self._data.qpos[6]))
        return np.arctan2(2.0 * (qw * qz + qx * qy),
                          1.0 - 2.0 * (qy * qy + qz * qz))

    @staticmethod
    def _world_to_pelvis(
        pelvis_pos: np.ndarray,
        pelvis_quat: np.ndarray,
        vec_world: np.ndarray,
    ) -&gt; np.ndarray:
        """Rotate world-frame point into pelvis frame: q⁻¹(v − p)."""
        v   = vec_world - pelvis_pos
        w   = pelvis_quat[0]
        xyz = pelvis_quat[1:4]
        t   = np.cross(xyz, v) * 2.0
        return v - w * t + np.cross(xyz, t)

    def _cylinder_world(self) -&gt; np.ndarray:
        return self._data.xpos[self._rb_id].copy()

    def _cylinder_in_pelvis(self) -&gt; np.ndarray:
        pos, quat = self._pelvis_pose()
        return self._world_to_pelvis(pos, quat, self._cylinder_world())

    def _palm_world(self) -&gt; np.ndarray:
        return self._data.site_xpos[self._palm_id].copy()

    def _table_surface_z(self) -&gt; float:
        if self._tbl_geom_id &gt;= 0:
            return float(
                self._data.geom_xpos[self._tbl_geom_id][2]
                + self._model.geom_size[self._tbl_geom_id][2]
            )
        return float(self._data.xpos[self._tbl_id][2]) + 0.02

    def _source_hover_world(self) -&gt; np.ndarray:
        p = self._cylinder_world().copy()
        p[2] = self._table_surface_z() + HOVER_SOURCE_HEIGHT
        return p

    def _source_grasp_world(self) -&gt; np.ndarray:
        p = self._cylinder_world().copy()
        p[2] = self._table_surface_z() + GRASP_HEIGHT
        return p

    @staticmethod
    def _clip_reach_target(reach: np.ndarray) -&gt; np.ndarray:
        return np.clip(reach, _REACH_LOW, _REACH_HIGH).astype(np.float32)

    def _reach_from_world(
        self, world_point: np.ndarray, right_bias: float = -0.08
    ) -&gt; np.ndarray:
        pos, quat = self._pelvis_pose()
        local = self._world_to_pelvis(pos, quat, world_point).copy().astype(np.float32)
        local[1] = min(float(local[1]), right_bias)
        return self._clip_reach_target(local)

    def _target_surface_z(self) -&gt; float:
        if self._tbl_white_geom_id &gt;= 0:
            return float(
                self._data.geom_xpos[self._tbl_white_geom_id][2]
                + self._model.geom_size[self._tbl_white_geom_id][2]
            )
        return float(self._data.xpos[self._tbl_white_id][2]) + 0.02

    def _target_drop_world(self) -&gt; np.ndarray:
        if self._tbl_white_geom_id &gt;= 0:
            gx  = float(self._data.geom_xpos[self._tbl_white_geom_id][0])
            gy  = float(self._data.geom_xpos[self._tbl_white_geom_id][1])
            near_edge_y = gy + float(self._model.geom_size[self._tbl_white_geom_id][1])
            drop_y = near_edge_y - TARGET_NEAR_EDGE_INSET
            drop_z = self._target_surface_z()
            return np.array([gx, drop_y, drop_z], dtype=np.float64)
        c = self._data.xpos[self._tbl_white_id].copy()
        return np.array([c[0], c[1] + 0.20, c[2] + 0.02], dtype=np.float64)

    def _target_drop_in_pelvis(self) -&gt; np.ndarray:
        pos, quat = self._pelvis_pose()
        return self._world_to_pelvis(pos, quat, self._target_drop_pt)

    def _target_hover_world(self) -&gt; np.ndarray:
        p = self._target_drop_pt.copy()
        p[2] = self._target_surface_z() + HOVER_TARGET_HEIGHT
        return p

    def _target_place_world(self) -&gt; np.ndarray:
        p = self._target_drop_pt.copy()
        p[2] = self._target_surface_z() + PLACE_HEIGHT
        return p

    def _cylinder_on_target_table(self) -&gt; bool:
        cyl   = self._cylinder_world()
        tgt_z = self._target_surface_z()
        if not (tgt_z - 0.01 &lt;= cyl[2] &lt;= tgt_z + ON_TABLE_Z_MAX):
            return False
        if self._tbl_white_geom_id &gt;= 0:
            gx = float(self._data.geom_xpos[self._tbl_white_geom_id][0])
            gy = float(self._data.geom_xpos[self._tbl_white_geom_id][1])
            hx = float(self._model.geom_size[self._tbl_white_geom_id][0])
            hy = float(self._model.geom_size[self._tbl_white_geom_id][1])
            return (abs(cyl[0] - gx) &lt;= hx + ON_TABLE_XY_MARGIN and
                    abs(cyl[1] - gy) &lt;= hy + ON_TABLE_XY_MARGIN)
        if self._tbl_white_id &gt;= 0:
            c = self._data.xpos[self._tbl_white_id]
            return (abs(cyl[0] - c[0]) &lt;= 0.40 and abs(cyl[1] - c[1]) &lt;= 0.30)
        return False

    # ------------------------------------------------------------------ #
    # Approach commander
    # ------------------------------------------------------------------ #

    def _approach_walk_cmd(self, cyl: np.ndarray) -&gt; tuple[float, float, float]:
        x_err = cyl[0] - APPROACH_TARGET_X
        if x_err &gt; 0.18:
            vx = VX_FAST
        elif x_err &gt; 0.10:
            vx = VX_MED
        elif x_err &gt; 0.04:
            vx = VX_SLOW
        else:
            vx = 0.0
        y_err = cyl[1] - (-0.05)
        vy = float(np.clip(K_VY * y_err, -VY_CAP, VY_CAP))
        wz = float(np.clip(
            K_WZ * np.arctan2(cyl[1], max(cyl[0], 0.15)),
            -WZ_CAP, WZ_CAP,
        ))
        return (vx, vy, wz)

    def _target_approach_walk_cmd(self, drop_pelvis: np.ndarray) -&gt; tuple[float, float, float]:
        pelvis_pos = self._data.qpos[:3]
        yaw = self._pelvis_yaw()

        if abs(yaw + np.pi / 2) &gt; PHASE1_ALIGN_TOL:
            return (VX_P1, 0.0, -WZ_P1)

        drop_w  = self._target_drop_pt
        stand_x = float(drop_w[0])
        stand_y = float(drop_w[1]) + TARGET_STAND_DIST

        ex = stand_x - float(pelvis_pos[0])
        ey = stand_y - float(pelvis_pos[1])
        dist = float(np.sqrt(ex * ex + ey * ey))

        bearing  = float(np.arctan2(ey, ex))
        a_err    = (bearing - yaw + np.pi) % (2.0 * np.pi) - np.pi

        cos_y, sin_y = float(np.cos(yaw)), float(np.sin(yaw))
        left_err = -ex * sin_y + ey * cos_y

        if dist &gt; 0.35:   vx = VX_FAST
        elif dist &gt; 0.18: vx = VX_MED
        else:             vx = VX_SLOW
        vy = float(np.clip(K_VY * left_err, -VY_CAP, VY_CAP))
        wz = float(np.clip(K_WZ * a_err,   -WZ_CAP, WZ_CAP))
        return (vx, vy, wz)

    def _near_target_waypoint(self) -&gt; bool:
        yaw = self._pelvis_yaw()
        if abs(yaw + np.pi / 2) &gt; PHASE1_ALIGN_TOL:
            return False
        pelvis = self._data.qpos[:3]
        drop_w = self._target_drop_pt
        stand_x = float(drop_w[0])
        stand_y = float(drop_w[1]) + TARGET_STAND_DIST
        ex = stand_x - float(pelvis[0])
        ey = stand_y - float(pelvis[1])
        return float(np.sqrt(ex * ex + ey * ey)) &lt; TARGET_APPROACH_DIST_THRESH

    def _in_reach_window(self, cyl: np.ndarray) -&gt; bool:
        return (REACH_X_MIN &lt; cyl[0] &lt; REACH_X_MAX and
                REACH_Y_MIN &lt; cyl[1] &lt; REACH_Y_MAX)</code></pre></div>
              </details>
            </section>

          </div>
        </div>
      </main>
    </div>
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/policies-fsm.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>policies/fsm.py — FSM Adapter and Grip Safety | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · policies/fsm.py</p>
          <h1>policies/fsm.py — FSM Adapter and Grip Safety</h1>
          <p class="subtitle">The thin adapter layer between FSMCore's pure state-machine outputs and the controller's mutable command state. Also contains the grip-safety guard that prevents mid-carry drops — a guard whose bugfix was the critical Step 10 discovery.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → policies/fsm.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./policies-fsm-core.html">← policies/fsm_core.py</a>
            <a href="./scripts-smoke-env.html">scripts/smoke_env.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> policies/fsm.py</p>
              <p><strong>Lines:</strong> ~57</p>
              <p>A 57-line glue layer. <code>FSMPolicy</code> owns an <code>FSMCore</code>, calls <code>tick()</code> each step, then writes the resulting command into the controller's public attributes so <code>ctrl.step()</code> picks them up. The single non-trivial method is <code>_close_grip_command()</code> — the grip-safety guard.</p>
            </div>
            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#chunk-header">Module header &amp; _RELEASE_STATES</a></li>
                <li><a href="#chunk-init">FSMPolicy.__init__</a></li>
                <li><a href="#chunk-step">step() — command bridge</a></li>
                <li><a href="#chunk-grip-guard">_close_grip_command() — grip safety</a></li>
                <li><a href="#full-file">Full file appendix</a></li>
              </ul>
              <a href="#full-file" class="jump-link">Jump to full file ↓</a>
            </nav>
          </aside>

          <div class="code-main">

            <!-- ─── Chunk 1: Header ─────────────────────────────────────────── -->
            <section class="code-section" id="chunk-header">
              <h3>Module header &amp; _RELEASE_STATES</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Import the two policy-layer types (<code>BasePolicy</code>, <code>PolicyOutput</code>) and the FSM internals (<code>FSMCore</code>, <code>FSMState</code>). Define the frozen set of states where <code>grip_closed=False</code> is intentional and must not be overridden.</p>
                <h4>Inputs / Outputs</h4>
                <p>No runtime I/O. <code>_RELEASE_STATES</code> is a module-level constant — three <code>FSMState</code> members that represent intentional release phases.</p>
                <h4>Invariants</h4>
                <p><code>_RELEASE_STATES</code> must include every state where FSMCore actively opens the grip. Currently: <code>OPEN_GRIP</code>, <code>RETRACT</code>, <code>DONE</code>. Adding a new release state to <code>FSMCore</code> without adding it here would cause the grip guard to re-close the grip during release.</p>
                <h4>Failure modes</h4>
                <p>Step 10 bug: original code omitted <code>OPEN_GRIP</code> from this set. The grip guard then clamped <code>grip_closed=True</code> for the entire OPEN_GRIP state, preventing the cylinder from being released over the target table. Fix: add <code>FSMState.OPEN_GRIP</code> to <code>_RELEASE_STATES</code>.</p>
                <h4>Why it matters</h4>
                <p>Making the exemption list a named module constant forces future engineers to acknowledge the decision — you can't miss it. Using <code>frozenset</code> makes membership tests O(1) and prevents accidental mutation.</p>
              </div>
              <div class="code-block">
                <pre><code>"""FSM-driven policy: wraps FSMCore and applies its output to the controller."""

from __future__ import annotations

from .base import BasePolicy, PolicyOutput
from .fsm_core import FSMCore, FSMState

# States where grip_closed=False is intentional — do not override.
_RELEASE_STATES = frozenset({FSMState.OPEN_GRIP, FSMState.RETRACT, FSMState.DONE})</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 2: __init__ ──────────────────────────────────────── -->
            <section class="code-section" id="chunk-init">
              <h3>FSMPolicy.__init__</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Wire together the three collaborating objects: the <code>WalkerReacherController</code>, the optional <code>GraspBackend</code>, and the <code>FSMCore</code> (which is created fresh here, taking the MuJoCo model and data from the controller).</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>controller:</strong> <code>WalkerReacherController</code> — provides <code>.model</code>, <code>.data</code>, and mutable command state (<code>lin_vel_x</code>, <code>reach_target</code>, etc.).<br>
                <strong>grasp_backend:</strong> optional <code>GraspBackend</code> — provides <code>.attached</code> boolean; may be <code>None</code> for testing without grasp.</p>
                <h4>Invariants</h4>
                <p><code>FSMCore</code> receives the live <code>model</code> and <code>data</code> references so it can read MuJoCo state (body positions, etc.) at tick time. These must not be replaced later — <code>FSMCore</code> caches the references, not snapshots.</p>
                <h4>Why it matters</h4>
                <p>By accepting <code>grasp_backend=None</code>, the policy can be instantiated in test harnesses without a full simulation, enabling unit tests of pure FSM logic.</p>
              </div>
              <div class="code-block">
                <pre><code>class FSMPolicy(BasePolicy):
    """Autonomous policy driven by FSMCore.

    Calls fsm.tick() each step, then writes the resulting command into
    the controller so that ctrl.step() picks it up immediately.

    grasp_backend (optional): a GraspBackend whose .attached state is forwarded
    to FSMCore each tick and whose grip_closed override is applied to the output.
    """

    def __init__(self, controller, grasp_backend=None) -&gt; None:
        self._ctrl  = controller
        self._grasp = grasp_backend
        self._fsm   = FSMCore(controller.model, controller.data)</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 3: step() ───────────────────────────────────────── -->
            <section class="code-section" id="chunk-step">
              <h3>step() — the command bridge</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Each control tick: (1) query the grasp attachment state, (2) advance the FSM by one tick, (3) run the grip-safety guard, (4) write all four command fields into the controller's mutable state. Returns the <code>PolicyOutput</code> to the caller (the simulation loop) for logging.</p>
                <h4>Inputs / Outputs</h4>
                <p>No explicit inputs (reads live simulation state through <code>self._fsm</code> / <code>self._grasp</code>). Returns a <code>PolicyOutput(walk_cmd, reach_target, reach_active, grip_closed)</code>.</p>
                <h4>Invariants</h4>
                <p>The <code>_ctrl</code> fields must be written <strong>before</strong> <code>ctrl.step()</code> is called — the simulation loop in <code>run.py</code> calls <code>policy.step()</code> first, then <code>ctrl.step()</code>, so this ordering is correct.<br>
                <code>reach_target[:]</code> uses in-place slice assignment — this preserves the existing numpy array rather than replacing the reference, which matters because <code>ctrl.step()</code> reads the same array object.</p>
                <h4>Failure modes</h4>
                <p>If <code>_close_grip_command</code> returns a modified <code>PolicyOutput</code>, the controller's <code>grip_closed</code> is set from the corrected value, not the raw FSM output. The returned <code>out</code> (used for logging) reflects the final effective command.</p>
                <h4>Why it matters</h4>
                <p>This is the only place where <code>FSMCore</code>'s immutable <code>PolicyOutput</code> is translated into mutable controller state. Keeping this translation explicit and co-located prevents the controller from getting stale commands if <code>FSMCore</code> skips a tick.</p>
              </div>
              <div class="code-block">
                <pre><code>    def step(self) -&gt; PolicyOutput:
        attached = self._grasp.attached if self._grasp is not None else False
        out = self._fsm.tick(attached=attached)
        out = self._close_grip_command(out)
        # Push FSM output into controller state before ctrl.step() runs.
        self._ctrl.lin_vel_x, self._ctrl.lin_vel_y, self._ctrl.ang_vel_z = out.walk_cmd
        self._ctrl.reach_target[:] = out.reach_target
        self._ctrl.reach_active    = out.reach_active
        self._ctrl.grip_closed     = out.grip_closed
        return out</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 4: _close_grip_command ──────────────────────────── -->
            <section class="code-section" id="chunk-grip-guard">
              <h3>_close_grip_command() — grip safety guard</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>If the cylinder is attached and FSMCore happens to emit <code>grip_closed=False</code> during a state that is not an intentional release (e.g., the very first tick of LIFT_SOURCE), override it back to <code>True</code>. This prevents a transient single-tick grip opening from dropping the cylinder mid-carry.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>out:</strong> the raw <code>PolicyOutput</code> from <code>FSMCore.tick()</code>.<br>
                Returns either <code>out</code> unchanged (passthrough) or a new <code>PolicyOutput</code> with <code>grip_closed=True</code>.</p>
                <h4>Invariants</h4>
                <p>The guard activates only when all three conditions hold simultaneously:<br>
                (1) <code>self._grasp.attached</code> — cylinder is physically attached.<br>
                (2) <code>not out.grip_closed</code> — FSM emitted an open-grip command.<br>
                (3) <code>self._fsm.state not in _RELEASE_STATES</code> — current state is not an intentional release.</p>
                <h4>Failure modes &amp; Step 10 bugfix</h4>
                <p><strong>Step 10 bug:</strong> The original <code>_RELEASE_STATES</code> was <code>frozenset({FSMState.RETRACT, FSMState.DONE})</code> — missing <code>FSMState.OPEN_GRIP</code>. During OPEN_GRIP the cylinder was still attached (KinematicAttachment only releases on a <em>falling-edge</em> of <code>grip_closed</code>). So <code>self._grasp.attached</code> was <code>True</code>, <code>out.grip_closed</code> was <code>False</code>, and the guard re-clamped it to <code>True</code> every tick — the cylinder never released.</p>
                <p><strong>Fix:</strong> Add <code>FSMState.OPEN_GRIP</code> to <code>_RELEASE_STATES</code>. The guard now passes through the FSM's intentional <code>grip_closed=False</code> during OPEN_GRIP, allowing <code>KinematicAttachment.release()</code> to fire.</p>
                <h4>Why it matters</h4>
                <p>Without this guard, a single-tick <code>grip_closed=False</code> during LIFT_SOURCE (possible if the FSM takes one tick to latch its carry state) would cause <code>KinematicAttachment</code> to release the cylinder. The guard trades a small risk of a stuck grip for a much larger risk of a premature drop.</p>
              </div>
              <div class="code-block">
                <pre><code>    def _close_grip_command(self, out: PolicyOutput) -&gt; PolicyOutput:
        """Keep grip closed while carrying — but not during intentional release.

        Prevents a single-tick grip opening caused by FSM state-transition timing
        from accidentally dropping the cylinder mid-carry.  The guard is bypassed
        in OPEN_GRIP / RETRACT / DONE so the FSM can actually release the object.
        """
        if (self._grasp is not None
                and self._grasp.attached
                and not out.grip_closed
                and self._fsm.state not in _RELEASE_STATES):
            return PolicyOutput(
                walk_cmd=out.walk_cmd,
                reach_target=out.reach_target,
                reach_active=out.reach_active,
                grip_closed=True,
            )
        return out</code></pre>
              </div>
            </section>

            <!-- ─── Full file appendix ─────────────────────────────────────── -->
            <section class="code-section" id="full-file">
              <h3>Full file — policies/fsm.py</h3>
              <details class="code-details">
                <summary>Expand full source (~57 lines)</summary>
                <div class="code-block">
                  <pre><code>"""FSM-driven policy: wraps FSMCore and applies its output to the controller."""

from __future__ import annotations

from .base import BasePolicy, PolicyOutput
from .fsm_core import FSMCore, FSMState

# States where grip_closed=False is intentional — do not override.
_RELEASE_STATES = frozenset({FSMState.OPEN_GRIP, FSMState.RETRACT, FSMState.DONE})


class FSMPolicy(BasePolicy):
    """Autonomous policy driven by FSMCore.

    Calls fsm.tick() each step, then writes the resulting command into
    the controller so that ctrl.step() picks it up immediately.

    grasp_backend (optional): a GraspBackend whose .attached state is forwarded
    to FSMCore each tick and whose grip_closed override is applied to the output.
    """

    def __init__(self, controller, grasp_backend=None) -&gt; None:
        self._ctrl  = controller
        self._grasp = grasp_backend
        self._fsm   = FSMCore(controller.model, controller.data)

    def step(self) -&gt; PolicyOutput:
        attached = self._grasp.attached if self._grasp is not None else False
        out = self._fsm.tick(attached=attached)
        out = self._close_grip_command(out)
        # Push FSM output into controller state before ctrl.step() runs.
        self._ctrl.lin_vel_x, self._ctrl.lin_vel_y, self._ctrl.ang_vel_z = out.walk_cmd
        self._ctrl.reach_target[:] = out.reach_target
        self._ctrl.reach_active    = out.reach_active
        self._ctrl.grip_closed     = out.grip_closed
        return out

    def _close_grip_command(self, out: PolicyOutput) -&gt; PolicyOutput:
        """Keep grip closed while carrying — but not during intentional release.

        Prevents a single-tick grip opening caused by FSM state-transition timing
        from accidentally dropping the cylinder mid-carry.  The guard is bypassed
        in OPEN_GRIP / RETRACT / DONE so the FSM can actually release the object.
        """
        if (self._grasp is not None
                and self._grasp.attached
                and not out.grip_closed
                and self._fsm.state not in _RELEASE_STATES):
            return PolicyOutput(
                walk_cmd=out.walk_cmd,
                reach_target=out.reach_target,
                reach_active=out.reach_active,
                grip_closed=True,
            )
        return out</code></pre>
                </div>
              </details>
            </section>

          </div><!-- .code-main -->
        </div><!-- .code-page-layout -->
      </main>

      <footer class="site-footer">
        <p>Lucky Robots G1 Pick-and-Place Case Study</p>
      </footer>
    </div><!-- .page -->
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/policies-keyboard.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>policies/keyboard.py — Keyboard-Driven Manual Policy | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · policies/keyboard.py</p>
          <h1>policies/keyboard.py — Keyboard-Driven Manual Policy</h1>
          <p class="subtitle">The original manual control path, preserved as a <code>BasePolicy</code> subclass. Delegates all state to the controller and serves as the baseline that proves the controller interface works before adding any autonomy.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → policies/keyboard.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./policies-base.html">← policies/base.py</a>
            <a href="./policies-fsm-core.html">policies/fsm_core.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> policies/keyboard.py</p>
              <p><strong>Lines:</strong> ~32</p>
              <p>Introduced in Step 2 alongside <code>BasePolicy</code>. Wraps the pre-existing keyboard-driven controller state into the policy contract. No new logic — purely a protocol adapter. Passing <code>--policy keyboard</code> to <code>run.py</code> uses this class.</p>
            </div>
            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#chunk-init">__init__</a></li>
                <li><a href="#chunk-handle-key">handle_key()</a></li>
                <li><a href="#chunk-step">step()</a></li>
                <li><a href="#full-file">Full file appendix</a></li>
              </ul>
              <a href="#full-file" class="jump-link">Jump to full file ↓</a>
            </nav>
          </aside>

          <div class="code-main">

            <!-- ─── Chunk 1: __init__ ─────────────────────────────────────── -->
            <section class="code-section" id="chunk-init">
              <h3>__init__</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Store a reference to the controller. No additional state — the keyboard policy is entirely stateless; all command state lives in the controller's public attributes (<code>lin_vel_x</code>, <code>reach_target</code>, etc.).</p>
                <h4>Why it matters</h4>
                <p>By storing only a reference (not copying state), keyboard commands set via <code>key_callback</code> are immediately visible to <code>step()</code> on the same tick — there's no buffering delay.</p>
              </div>
              <div class="code-block">
                <pre><code>"""Keyboard-driven policy wrapper for manual control."""

from __future__ import annotations

from .base import BasePolicy, PolicyOutput


class KeyboardPolicy(BasePolicy):
  """Policy wrapper that delegates keyboard input to the controller."""

  def __init__(self, controller):
    self._controller = controller</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 2: handle_key ───────────────────────────────────── -->
            <section class="code-section" id="chunk-handle-key">
              <h3>handle_key()</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Forward MuJoCo viewer keyboard events to the controller's <code>key_callback</code> method. The simulation loop calls <code>policy.handle_key(keycode)</code> inside MuJoCo's key callback — this override makes it reach the controller.</p>
                <h4>Invariants</h4>
                <p>The simulation loop calls <code>handle_key</code> on <em>any</em> policy. For <code>FSMPolicy</code>, <code>handle_key</code> is the no-op inherited from <code>BasePolicy</code>. For <code>KeyboardPolicy</code>, it forwards to the controller. This means the loop never needs to branch on policy type to handle key events.</p>
              </div>
              <div class="code-block">
                <pre><code>  def handle_key(self, keycode: int) -&gt; None:
    """Forward keyboard events to the controller."""
    self._controller.key_callback(keycode)</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 3: step ─────────────────────────────────────────── -->
            <section class="code-section" id="chunk-step">
              <h3>step()</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Read the controller's current public command state and package it into a <code>PolicyOutput</code>. The controller's <code>lin_vel_x</code>, <code>lin_vel_y</code>, <code>ang_vel_z</code>, <code>reach_target</code>, <code>grip_closed</code>, and <code>reach_active</code> attributes are the single source of truth — this method just exposes them as the policy contract type.</p>
                <h4>Inputs / Outputs</h4>
                <p>No inputs. Returns a <code>PolicyOutput</code> built from the controller's current state. <code>reach_target</code> is read as a tuple (immutable snapshot) — the controller's array is not aliased into the output, preventing the frozen dataclass constraint from conflicting with the controller's mutable numpy array.</p>
                <h4>Why it matters</h4>
                <p>This method exists to satisfy the <code>BasePolicy</code> ABC — the simulation loop reads <code>policy.step()</code> for logging (printing walk_cmd, reach_active, etc.) regardless of policy type. Without this, the keyboard policy would have no way to expose its current state to the logging layer.</p>
              </div>
              <div class="code-block">
                <pre><code>  def step(self) -&gt; PolicyOutput:
    """Expose the controller's current high-level command state."""
    walk_cmd = (
      self._controller.lin_vel_x,
      self._controller.lin_vel_y,
      self._controller.ang_vel_z,
    )
    reach_target = tuple(self._controller.reach_target)
    return PolicyOutput(
      walk_cmd=walk_cmd,
      reach_target=reach_target,
      grip_closed=self._controller.grip_closed,
      reach_active=self._controller.reach_active,
    )</code></pre>
              </div>
            </section>

            <!-- ─── Full file appendix ─────────────────────────────────────── -->
            <section class="code-section" id="full-file">
              <h3>Full file — policies/keyboard.py</h3>
              <details class="code-details">
                <summary>Expand full source (~32 lines)</summary>
                <div class="code-block">
                  <pre><code>"""Keyboard-driven policy wrapper for manual control."""

from __future__ import annotations

from .base import BasePolicy, PolicyOutput


class KeyboardPolicy(BasePolicy):
  """Policy wrapper that delegates keyboard input to the controller."""

  def __init__(self, controller):
    self._controller = controller

  def handle_key(self, keycode: int) -&gt; None:
    """Forward keyboard events to the controller."""
    self._controller.key_callback(keycode)

  def step(self) -&gt; PolicyOutput:
    """Expose the controller's current high-level command state."""
    walk_cmd = (
      self._controller.lin_vel_x,
      self._controller.lin_vel_y,
      self._controller.ang_vel_z,
    )
    reach_target = tuple(self._controller.reach_target)
    return PolicyOutput(
      walk_cmd=walk_cmd,
      reach_target=reach_target,
      grip_closed=self._controller.grip_closed,
      reach_active=self._controller.reach_active,
    )</code></pre>
                </div>
              </details>
            </section>

          </div><!-- .code-main -->
        </div><!-- .code-page-layout -->
      </main>

      <footer class="site-footer">
        <p>Lucky Robots G1 Pick-and-Place Case Study</p>
      </footer>
    </div><!-- .page -->
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/run.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>run.py — Runtime Orchestration | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · run.py</p>
          <h1>run.py — Runtime Orchestration</h1>
          <p class="subtitle">The thin entry point that wires model loading, ONNX policies, controller, policy selection, simulation stepping, and the grasp backend into one real-time loop.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → run.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./dev-log.html">← DEV_LOG</a>
            <a href="./common-controller.html">common/controller.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <!-- ─── Sticky sidebar ──────────────────────────────────── -->
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> run.py</p>
              <p><strong>Lines:</strong> ~285</p>
              <p>
                Intentionally thin orchestration layer. Loads the scene and
                policies, selects keyboard or FSM mode, then runs the real-time
                decimated control loop. All heavyweight logic lives in
                <code>common/</code> and <code>policies/</code>.
              </p>
            </div>

            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#imports">Imports &amp; module boundary</a></li>
                <li><a href="#armature">set_armature()</a></li>
                <li><a href="#bridge">Policy output bridge</a></li>
                <li><a href="#scene-load">Scene &amp; config loading</a></li>
                <li><a href="#policy-wiring">Policy / controller / grasp wiring</a></li>
                <li><a href="#warmup">ONNX warmup</a></li>
                <li><a href="#cameras">Camera renderer setup</a></li>
                <li><a href="#sim-loop">Simulation loop</a></li>
                <li><a href="#full-file">Full source file ↓</a></li>
              </ul>
            </nav>

            <div class="code-section">
              <a href="#full-file" style="color: var(--accent); font-weight: 600; text-decoration: none;">Jump to full file ↓</a>
            </div>
          </aside>

          <!-- ─── Main content ──────────────────────────────────── -->
          <div class="code-main">

            <!-- 1. Imports -->
            <section class="code-section" id="imports">
              <h3>Imports and module boundary</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Import statements define the refactor boundary. Every heavyweight concern (controller logic, grasp backend, ONNX loading, scene reset, policies) has been extracted into a separate module. run.py only imports — it does not reimplement.</p>
                <h4>Inputs / Outputs</h4>
                <p>No runtime I/O at import time. <code>SCRIPT_DIR</code> anchors all relative paths so the script works regardless of working directory.</p>
                <h4>Invariants</h4>
                <p>All paths are constructed relative to <code>SCRIPT_DIR = Path(__file__).resolve().parent</code>, not the CWD. This keeps the script relocatable.</p>
                <h4>Failure modes</h4>
                <p>If <code>mujoco</code> or <code>onnxruntime</code> is not installed the import fails immediately with a clear <code>ModuleNotFoundError</code>. <code>cv2</code> (opencv) is deferred and caught later — camera windows are optional.</p>
                <h4>Why it matters</h4>
                <p>The import list is the dependency manifest. Seeing it tells you exactly what subsystems are active in a given run mode.</p>
              </div>
              <div class="code-block"><pre><code>import argparse
import json
import time
from pathlib import Path

import mujoco
import numpy as np

from common.controller import WalkerReacherController
from common.grasp import KinematicAttachment
from common.onnx_policy import ONNXPolicy
from common.scene import CameraRenderer, reset_robot
from policies.fsm import FSMPolicy
from policies.keyboard import KeyboardPolicy

SCRIPT_DIR = Path(__file__).resolve().parent</code></pre></div>
            </section>

            <!-- 2. set_armature -->
            <section class="code-section" id="armature">
              <h3>set_armature() — per-joint rotational inertia</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Writes motor armature values (effective rotor inertia) into the MuJoCo model after loading. This matches the G1's physical actuator specs and is required for the pre-trained ONNX policies to produce stable motion — the policies were trained with these exact inertia values.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> <code>model</code> (MjModel), <code>joint_names</code> list in the same order as <code>model_config.json</code>. <strong>Out:</strong> mutates <code>model.dof_armature[6+i]</code> for each joint (DOF 0–5 are the freejoint of the pelvis, DOFs 6+ are the 29 body joints).</p>
                <h4>Invariants</h4>
                <p>Armature must be set <em>before</em> any simulation step. The mapping <code>dof = 6 + i</code> assumes joint ordering matches <code>joint_names</code> exactly — a reordering would silently assign wrong inertia.</p>
                <h4>Failure modes</h4>
                <p>If <code>joint_names</code> is missing an entry, the corresponding DOF gets the default <code>ARM_5020</code> value (the fallback <code>else</code> branch). No crash, but potentially wrong physics for that joint.</p>
                <h4>Why it matters</h4>
                <p>Without matching armature the ONNX policies produce unstable oscillation. This was one of the first things audited in Step 1. Armature is also duplicated in <code>test_fsm_approach.py</code> so headless tests run with identical physics.</p>
              </div>
              <div class="code-block"><pre><code>def set_armature(model, joint_names):
  ARM_5020 = 0.00360972
  ARM_7520_14 = 0.01017752
  ARM_7520_22 = 0.02510192
  ARM_4010 = 0.00425000
  ARM_2x5020 = 0.00721945

  for i, name in enumerate(joint_names):
    dof = 6 + i
    if "elbow" in name or "shoulder" in name or "wrist_roll" in name:
      model.dof_armature[dof] = ARM_5020
    elif "hip_pitch" in name or "hip_yaw" in name or name == "waist_yaw_joint":
      model.dof_armature[dof] = ARM_7520_14
    elif "hip_roll" in name or "knee" in name:
      model.dof_armature[dof] = ARM_7520_22
    elif "wrist_pitch" in name or "wrist_yaw" in name:
      model.dof_armature[dof] = ARM_4010
    elif "ankle" in name or name in ("waist_pitch_joint", "waist_roll_joint"):
      model.dof_armature[dof] = ARM_2x5020
    else:
      model.dof_armature[dof] = ARM_5020</code></pre></div>
            </section>

            <!-- 3. Policy output bridge -->
            <section class="code-section" id="bridge">
              <h3>_apply_policy_output() — command bridge</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>One-way bridge from a <code>PolicyOutput</code> value object into the mutable controller state fields that <code>ctrl.step()</code> reads. This keeps <code>PolicyOutput</code> immutable and prevents run.py from reaching into FSM internals.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> <code>ctrl</code> (WalkerReacherController), <code>out</code> (PolicyOutput namedtuple). <strong>Out:</strong> mutates <code>ctrl.lin_vel_x/y</code>, <code>ctrl.ang_vel_z</code>, <code>ctrl.reach_target</code>, <code>ctrl.reach_active</code>, <code>ctrl.grip_closed</code>.</p>
                <h4>Invariants</h4>
                <p>Called once per control tick, before <code>ctrl.step()</code>. The FSMPolicy also does this internally via the same assignment pattern (the run.py call is for the keyboard path where FSMPolicy is not used).</p>
                <h4>Failure modes</h4>
                <p>None — pure field assignment. A shape mismatch in <code>reach_target</code> would raise a NumPy broadcast error at the <code>[:]</code> assignment.</p>
                <h4>Why it matters</h4>
                <p>Decouples the policy interface (what to command) from the controller state format (how to command it). Adding a new policy type only requires producing a valid <code>PolicyOutput</code>; the bridge handles the rest.</p>
              </div>
              <div class="code-block"><pre><code>def _apply_policy_output(ctrl, out) -> None:
  """Write a PolicyOutput into controller state before ctrl.step() runs."""
  ctrl.lin_vel_x, ctrl.lin_vel_y, ctrl.ang_vel_z = out.walk_cmd
  ctrl.reach_target[:] = out.reach_target
  ctrl.reach_active    = out.reach_active
  ctrl.grip_closed     = out.grip_closed</code></pre></div>
            </section>

            <!-- 4. Scene & config loading -->
            <section class="code-section" id="scene-load">
              <h3>Scene and config loading</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Parse CLI args, load <code>model_config.json</code>, construct the MuJoCo model and data objects, apply armature, and reset to the spawn pose. This is all done before any simulation step runs.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> CLI args (<code>--policy</code>, <code>--no-cameras</code>, <code>--cam-fps</code>); <code>model_config.json</code> on disk; <code>scene.xml</code> (which includes <code>g1.xml</code>). <strong>Out:</strong> initialized <code>model</code>, <code>data</code>, <code>config</code>, <code>joint_names</code>.</p>
                <h4>Invariants</h4>
                <p><code>model.opt.timestep = 0.005</code> (200 Hz) must be set <em>after</em> model load because the scene.xml may not override the default. The training timestep is 0.005 s — this must match or policy outputs will be wrong. <code>reset_data=False</code> on the first call preserves any XML-defined initial state already set by <code>mj_resetData</code> inside model creation.</p>
                <h4>Failure modes</h4>
                <p>Missing <code>scene.xml</code> or <code>model_config.json</code> raises immediately. A malformed XML triggers a MuJoCo compile error with a descriptive message.</p>
                <h4>Why it matters</h4>
                <p>The 200 Hz timestep with 4× decimation gives 50 Hz control, matching the training environment. Any deviation breaks the policy because the observation velocities are in per-second units but computed over the wrong window.</p>
              </div>
              <div class="code-block"><pre><code>parser = argparse.ArgumentParser(description="G1 Table Red Block — MuJoCo standalone")
parser.add_argument("--no-cameras", action="store_true", help="Disable camera windows")
parser.add_argument("--cam-fps", type=int, default=10, help="Camera render FPS (default: 10)")
parser.add_argument(
  "--policy",
  choices=["keyboard", "fsm"],
  default="keyboard",
  help="Control policy to use (default: keyboard)",
)
args = parser.parse_args()

# Load config
config_path = SCRIPT_DIR / "model_config.json"
with open(config_path) as f:
  config = json.load(f)
joint_names = config["joint_names"]

# Load scene
xml_path = SCRIPT_DIR / "scene.xml"
print(f"Loading scene: {xml_path}")
model = mujoco.MjModel.from_xml_path(str(xml_path))
model.opt.timestep = 0.005  # 200 Hz — must match training
set_armature(model, joint_names)

data = mujoco.MjData(model)

# Init robot pose — spawn behind the table, facing it
reset_robot(model, data, config, joint_names, reset_data=False)</code></pre></div>
            </section>

            <!-- 5. Policy/controller/grasp wiring -->
            <section class="code-section" id="policy-wiring">
              <h3>Policy / controller / grasp wiring</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Instantiate ONNX wrappers, build the controller, then branch on <code>--policy</code> to create either the autonomous FSM path (with <code>KinematicAttachment</code>) or the manual keyboard path.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>In:</strong> loaded <code>model</code>, <code>data</code>, <code>config</code>. <strong>Out:</strong> <code>ctrl</code>, <code>policy</code>, <code>grasp_backend</code> (None for keyboard mode).</p>
                <h4>Invariants</h4>
                <p><code>KinematicAttachment</code> needs the palm site ID from the controller (<code>ctrl.right_palm_site_id</code>) so the controller must be created first. The grasp backend holds references to <code>model</code> and <code>data</code> — these must be the same objects used everywhere.</p>
                <h4>Failure modes</h4>
                <p>If <code>right_reacher.onnx</code> is missing the <code>if rr_path.exists()</code> guard prevents a crash — <code>right_reacher</code> is None and the controller skips the reacher step. The arm will hang at default pose.</p>
                <h4>Why it matters</h4>
                <p>The two-path structure (keyboard vs FSM) means the manual path remains runnable at all times for regression testing. The grasp backend is only wired when the FSM is active, keeping physics clean during keyboard exploration.</p>
              </div>
              <div class="code-block"><pre><code>print("Loading ONNX policies...")
walker = ONNXPolicy(str(SCRIPT_DIR / "walker.onnx"))
croucher = ONNXPolicy(str(SCRIPT_DIR / "croucher.onnx"))
rotator = ONNXPolicy(str(SCRIPT_DIR / "rotator.onnx"))

right_reacher = None
rr_path = SCRIPT_DIR / "right_reacher.onnx"
if rr_path.exists():
  right_reacher = ONNXPolicy(str(rr_path))
  print("  Right reacher loaded.")

# Create controller
ctrl = WalkerReacherController(model, data, walker, croucher, rotator, config,
                               right_reacher=right_reacher)

grasp_backend = None
if args.policy == "fsm":
  rb_body_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "red_block")
  grasp_backend = KinematicAttachment(model, data, ctrl.right_palm_site_id, rb_body_id)
  policy = FSMPolicy(ctrl, grasp_backend=grasp_backend)
  print("Policy: FSM (autonomous) + KinematicAttachment grasp backend")
else:
  policy = KeyboardPolicy(ctrl)
  print("Policy: keyboard (manual)")</code></pre></div>
            </section>

            <!-- 6. ONNX warmup -->
            <section class="code-section" id="warmup">
              <h3>ONNX warmup</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Run a dummy forward pass through each ONNX model before the real-time loop starts. ONNX Runtime performs JIT compilation on the first call; without warmup this latency spike appears inside the time-critical control loop.</p>
                <h4>Inputs / Outputs</h4>
                <p>Dummy zero tensors of the correct input dimension: 99-D for walker/rotator, 101-D for croucher, 36-D for reacher. Outputs are discarded.</p>
                <h4>Invariants</h4>
                <p>Must be called after policy objects exist but before the viewer loop starts (viewer uses real-time deadlines). Dimensions must match what the ONNX was trained with — smoke_env.py validates these at startup.</p>
                <h4>Failure modes</h4>
                <p>Wrong input dimension raises an ONNX Runtime shape error immediately. This would indicate a model file mismatch.</p>
                <h4>Why it matters</h4>
                <p>Without warmup the first control tick incurs 200–500ms of JIT latency. In a real-time viewer loop this causes the robot to receive a stale action for the first several frames and fall.</p>
              </div>
              <div class="code-block"><pre><code>print("Warming up policies...")
_dummy99  = np.zeros((1, 99),  dtype=np.float32)
_dummy101 = np.zeros((1, 101), dtype=np.float32)
_dummy36  = np.zeros((1, 36),  dtype=np.float32)
walker(_dummy99)
croucher(_dummy101)
rotator(_dummy99)
if right_reacher:
  right_reacher(_dummy36)
print("  Policies warm.")</code></pre></div>
            </section>

            <!-- 7. Camera renderer setup -->
            <section class="code-section" id="cameras">
              <h3>Camera renderer setup</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Optionally initialize an offscreen OpenCV-based renderer for the head and wrist cameras. Camera rendering is intentionally optional and rate-limited to avoid slowing down the physics loop.</p>
                <h4>Inputs / Outputs</h4>
                <p>Creates a <code>CameraRenderer(model, data, 320, 240)</code> if <code>--no-cameras</code> is not set and <code>cv2</code> is importable. Calls <code>render("head_cam")</code> and <code>render("wrist_cam")</code> once to compile shaders before the loop starts.</p>
                <h4>Invariants</h4>
                <p>Camera rendering is gated at <code>cam_interval = 1.0 / cam_fps</code> (default 10 fps) to keep overhead low. The physics loop still runs at 200 Hz regardless.</p>
                <h4>Failure modes</h4>
                <p>Missing <code>opencv-python</code> is caught and both camera windows are silently disabled. Any renderer initialization failure is also caught and falls back gracefully — physics continues without camera output.</p>
                <h4>Why it matters</h4>
                <p>The cameras exist because the challenge brief asks about vision-based approaches. Even when not used for control, having the camera feed visible helps debug whether the robot is looking at the right thing.</p>
              </div>
              <div class="code-block"><pre><code>cam_renderer = None
cv2 = None
show_head_cam = not args.no_cameras
show_wrist_cam = not args.no_cameras
if not args.no_cameras:
  try:
    import cv2 as _cv2
    cv2 = _cv2
    cam_renderer = CameraRenderer(model, data, 320, 240)
    cam_renderer.render("head_cam")
    cam_renderer.render("wrist_cam")
    print("  Camera renderer ready (head_cam, wrist_cam).")
  except ImportError:
    print("  [WARN] opencv-python not installed — camera windows disabled.")
    show_head_cam = show_wrist_cam = False
  except Exception as e:
    print(f"  [WARN] Camera renderer init failed: {e}")
    show_head_cam = show_wrist_cam = False</code></pre></div>
            </section>

            <!-- 8. Simulation loop -->
            <section class="code-section" id="sim-loop">
              <h3>Simulation loop — real-time control with decimation</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>The core loop advances physics at 200 Hz wall-clock time while only calling the policy at every 4th step (50 Hz). A catch-up limiter prevents the loop from trying to compensate for large wall-clock gaps (e.g., pausing the viewer).</p>
                <h4>Inputs / Outputs</h4>
                <p>Loop variables: <code>sim_time</code> (simulated time in seconds), <code>control_step</code> (physics steps), <code>target_pos</code> (last computed joint targets). The viewer <code>v.sync()</code> call updates the 3D display.</p>
                <h4>Invariants</h4>
                <p>
                  <strong>Policy order each control tick:</strong> <code>policy.step()</code> → <code>_apply_policy_output()</code> → <code>ctrl.step()</code> (computes joint targets) → <code>ctrl.apply_pd_control()</code> → <code>mujoco.mj_step()</code> → <code>grasp_backend.tick()</code>.<br>
                  <strong>Decimation:</strong> <code>ctrl.step()</code> is called every 4 physics steps. <code>apply_pd_control()</code> and <code>mj_step()</code> run every step.<br>
                  <strong>Grasp backend</strong> is called <em>after</em> every physics step so the cylinder teleportation happens before the next integration step integrates any velocity drift.
                </p>
                <h4>Failure modes</h4>
                <p>If wall time gets 50ms ahead of sim time the catch-up is capped at <code>max_catchup = 0.05</code> seconds. Without this cap, a viewer pause or slow frame causes the loop to sprint through many physics steps at once, producing non-real-time behavior.</p>
                <h4>Why it matters</h4>
                <p>This is the central timing contract. Every design decision in the controller and FSM assumes 50 Hz control ticks (200 Hz physics ÷ 4). Any change to decimation must be propagated to all timeout constants defined in fsm_core.py.</p>
              </div>
              <div class="code-block"><pre><code>with viewer.launch_passive(model, data, key_callback=on_key) as v:
  t0 = time.time()
  while v.is_running():
    # Handle spacebar reset
    if state["reset"]:
      reset_robot(model, data, config, joint_names)
      ctrl.last_action[:] = 0
      ctrl.last_arm_action[:] = 0
      ctrl.lin_vel_x = ctrl.lin_vel_y = ctrl.ang_vel_z = 0.0
      ctrl.reach_active = False
      ctrl.last_arm_target = None
      ctrl.frozen_arm_pos = None
      ctrl.grip_closed = False
      ctrl.input_mode = "walk"
      target_pos = ctrl.default_joint_pos.copy()
      state["reset"] = False
      print("[RESET] Robot reset → WALK mode")

    # Step physics in real time
    wall = time.time() - t0
    max_catchup = 0.05
    if wall - sim_time &gt; max_catchup:
      sim_time = wall - max_catchup
    while sim_time &lt; wall:
      if control_step % decimation == 0:
        _apply_policy_output(ctrl, policy.step())
        target_pos = ctrl.step()
      ctrl.apply_pd_control(target_pos)
      mujoco.mj_step(model, data)
      if grasp_backend is not None:
        grasp_backend.tick(ctrl.grip_closed)
      control_step += 1
      sim_time += model.opt.timestep

    v.sync()

    # Render camera views at lower FPS
    if cam_renderer and cv2 and (show_head_cam or show_wrist_cam):
      now = time.time()
      if now - last_cam_render &gt;= cam_interval:
        last_cam_render = now
        if show_head_cam:
          img = cam_renderer.render("head_cam")
          cv2.imshow("Head Camera", cv2.cvtColor(img, cv2.COLOR_RGB2BGR))
        if show_wrist_cam:
          img = cam_renderer.render("wrist_cam")
          cv2.imshow("Wrist Camera", cv2.cvtColor(img, cv2.COLOR_RGB2BGR))
        cv2.waitKey(1)</code></pre></div>
            </section>

            <!-- Full file appendix -->
            <section class="code-section" id="full-file">
              <h3>Full source file</h3>
              <p>Complete HTML-escaped source of <code>run.py</code>. Identical to the repo; nothing paraphrased or omitted.</p>
              <details class="code-details">
                <summary>
                  <span>Expand full run.py</span>
                  <code>~285 lines</code>
                </summary>
                <div class="code-block"><pre><code>#!/usr/bin/env python3
"""G1 Table Red Block — standalone MuJoCo scene with walker + reacher policies.

Controls (press keys in the GLFW viewer window):
  Arrow Keys   : Walk forward/back, strafe left/right
  ; / '        : Turn left / right
  ,            : Toggle crouch mode
  [ / ]        : Height down / up
  \\           : Stop (zero velocity)
  /            : Toggle arm freeze
  .            : Toggle reach mode (right arm)
  Space        : Reset robot + zero velocity
  C            : Cycle camera view in main window
  1            : Toggle head camera window
  2            : Toggle wrist camera window

Prerequisites:
  pip install mujoco onnxruntime numpy opencv-python

Usage:
  python run.py
  python run.py --no-cameras    # Disable camera windows (faster)
"""

import argparse
import json
import time
from pathlib import Path

import mujoco
import numpy as np

from common.controller import WalkerReacherController
from common.grasp import KinematicAttachment
from common.onnx_policy import ONNXPolicy
from common.scene import CameraRenderer, reset_robot
from policies.fsm import FSMPolicy
from policies.keyboard import KeyboardPolicy

SCRIPT_DIR = Path(__file__).resolve().parent


# --------------------------------------------------------------------------- #
# Armature setup
# --------------------------------------------------------------------------- #
def set_armature(model, joint_names):
  ARM_5020 = 0.00360972
  ARM_7520_14 = 0.01017752
  ARM_7520_22 = 0.02510192
  ARM_4010 = 0.00425000
  ARM_2x5020 = 0.00721945

  for i, name in enumerate(joint_names):
    dof = 6 + i
    if "elbow" in name or "shoulder" in name or "wrist_roll" in name:
      model.dof_armature[dof] = ARM_5020
    elif "hip_pitch" in name or "hip_yaw" in name or name == "waist_yaw_joint":
      model.dof_armature[dof] = ARM_7520_14
    elif "hip_roll" in name or "knee" in name:
      model.dof_armature[dof] = ARM_7520_22
    elif "wrist_pitch" in name or "wrist_yaw" in name:
      model.dof_armature[dof] = ARM_4010
    elif "ankle" in name or name in ("waist_pitch_joint", "waist_roll_joint"):
      model.dof_armature[dof] = ARM_2x5020
    else:
      model.dof_armature[dof] = ARM_5020


# --------------------------------------------------------------------------- #
# Policy helpers
# --------------------------------------------------------------------------- #
def _apply_policy_output(ctrl, out) -> None:
  """Write a PolicyOutput into controller state before ctrl.step() runs."""
  ctrl.lin_vel_x, ctrl.lin_vel_y, ctrl.ang_vel_z = out.walk_cmd
  ctrl.reach_target[:] = out.reach_target
  ctrl.reach_active    = out.reach_active
  ctrl.grip_closed     = out.grip_closed


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def main():
  parser = argparse.ArgumentParser(description="G1 Table Red Block — MuJoCo standalone")
  parser.add_argument("--no-cameras", action="store_true", help="Disable camera windows")
  parser.add_argument("--cam-fps", type=int, default=10, help="Camera render FPS (default: 10)")
  parser.add_argument(
    "--policy",
    choices=["keyboard", "fsm"],
    default="keyboard",
    help="Control policy to use (default: keyboard)",
  )
  args = parser.parse_args()

  # Load config
  config_path = SCRIPT_DIR / "model_config.json"
  with open(config_path) as f:
    config = json.load(f)
  joint_names = config["joint_names"]

  # Load scene
  xml_path = SCRIPT_DIR / "scene.xml"
  print(f"Loading scene: {xml_path}")
  model = mujoco.MjModel.from_xml_path(str(xml_path))
  model.opt.timestep = 0.005  # 200 Hz — must match training
  set_armature(model, joint_names)

  data = mujoco.MjData(model)

  # Init robot pose — spawn behind the table, facing it
  reset_robot(model, data, config, joint_names, reset_data=False)

  # Load policies
  print("Loading ONNX policies...")
  walker = ONNXPolicy(str(SCRIPT_DIR / "walker.onnx"))
  croucher = ONNXPolicy(str(SCRIPT_DIR / "croucher.onnx"))
  rotator = ONNXPolicy(str(SCRIPT_DIR / "rotator.onnx"))

  right_reacher = None
  rr_path = SCRIPT_DIR / "right_reacher.onnx"
  if rr_path.exists():
    right_reacher = ONNXPolicy(str(rr_path))
    print("  Right reacher loaded.")

  # Create controller
  ctrl = WalkerReacherController(model, data, walker, croucher, rotator, config,
                                 right_reacher=right_reacher)

  grasp_backend = None
  if args.policy == "fsm":
    rb_body_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "red_block")
    grasp_backend = KinematicAttachment(model, data, ctrl.right_palm_site_id, rb_body_id)
    policy = FSMPolicy(ctrl, grasp_backend=grasp_backend)
    print("Policy: FSM (autonomous) + KinematicAttachment grasp backend")
  else:
    policy = KeyboardPolicy(ctrl)
    print("Policy: keyboard (manual)")

  # Warm up ONNX models (first call triggers JIT compilation)
  print("Warming up policies...")
  _dummy99 = np.zeros((1, 99), dtype=np.float32)
  _dummy101 = np.zeros((1, 101), dtype=np.float32)
  _dummy36 = np.zeros((1, 36), dtype=np.float32)
  walker(_dummy99)
  croucher(_dummy101)
  rotator(_dummy99)
  if right_reacher:
    right_reacher(_dummy36)
  print("  Policies warm.")

  # Camera renderer (offscreen, for head/wrist cam windows)
  cam_renderer = None
  cv2 = None
  show_head_cam = not args.no_cameras
  show_wrist_cam = not args.no_cameras
  if not args.no_cameras:
    try:
      import cv2 as _cv2
      cv2 = _cv2
      cam_renderer = CameraRenderer(model, data, 320, 240)
      cam_renderer.render("head_cam")
      cam_renderer.render("wrist_cam")
      print("  Camera renderer ready (head_cam, wrist_cam).")
    except ImportError:
      print("  [WARN] opencv-python not installed — camera windows disabled.")
      print("  Install with: pip install opencv-python")
      show_head_cam = show_wrist_cam = False
    except Exception as e:
      print(f"  [WARN] Camera renderer init failed: {e}")
      show_head_cam = show_wrist_cam = False

  # Print controls
  print(f"\n{'='*50}")
  print("G1 TABLE RED BLOCK — MuJoCo Standalone")
  print(f"{'='*50}")
  print("  .          Toggle WALK / REACH mode")
  print("  --- WALK mode ---")
  print("  Arrows     Walk fwd/back, strafe L/R")
  print("  ; / '      Turn left / right")
  print("  \\          Stop")
  print("  --- REACH mode ---")
  print("  Up/Down    Reach forward / backward")
  print("  Left/Right Reach left / right")
  print("  ; / '      Reach up / down")
  print("  \\          Reset reach target")
  print("  --- Always ---")
  print("  Space      Reset robot")
  print(f"{'='*50}\n")

  # Mutable state for key callback
  state = {"reset": False}

  def on_key(keycode: int) -&gt; None:
    if keycode == 32:  # Space
      state["reset"] = True
    else:
      policy.handle_key(keycode)

  # ------------------------------------------------------------------- #
  # Simulation loop using launch_passive (MuJoCo's built-in viewer)
  # ------------------------------------------------------------------- #
  from mujoco import viewer

  decimation = 4
  control_step = 0
  target_pos = ctrl.default_joint_pos.copy()
  sim_time = 0.0
  last_cam_render = 0.0
  cam_interval = 1.0 / args.cam_fps

  print("Launching MuJoCo viewer...")

  with viewer.launch_passive(model, data, key_callback=on_key) as v:
    t0 = time.time()
    while v.is_running():
      if state["reset"]:
        reset_robot(model, data, config, joint_names)
        ctrl.last_action[:] = 0
        ctrl.last_arm_action[:] = 0
        ctrl.lin_vel_x = ctrl.lin_vel_y = ctrl.ang_vel_z = 0.0
        ctrl.reach_active = False
        ctrl.last_arm_target = None
        ctrl.frozen_arm_pos = None
        ctrl.grip_closed = False
        ctrl.input_mode = "walk"
        target_pos = ctrl.default_joint_pos.copy()
        state["reset"] = False
        print("[RESET] Robot reset → WALK mode")

      wall = time.time() - t0
      max_catchup = 0.05
      if wall - sim_time &gt; max_catchup:
        sim_time = wall - max_catchup
      while sim_time &lt; wall:
        if control_step % decimation == 0:
          _apply_policy_output(ctrl, policy.step())
          target_pos = ctrl.step()
        ctrl.apply_pd_control(target_pos)
        mujoco.mj_step(model, data)
        if grasp_backend is not None:
          grasp_backend.tick(ctrl.grip_closed)
        control_step += 1
        sim_time += model.opt.timestep

      v.sync()

      if cam_renderer and cv2 and (show_head_cam or show_wrist_cam):
        now = time.time()
        if now - last_cam_render &gt;= cam_interval:
          last_cam_render = now
          if show_head_cam:
            img = cam_renderer.render("head_cam")
            cv2.imshow("Head Camera", cv2.cvtColor(img, cv2.COLOR_RGB2BGR))
          if show_wrist_cam:
            img = cam_renderer.render("wrist_cam")
            cv2.imshow("Wrist Camera", cv2.cvtColor(img, cv2.COLOR_RGB2BGR))
          cv2.waitKey(1)

  if cv2:
    try:
      cv2.destroyAllWindows()
    except Exception:
      pass
  print("Done.")


if __name__ == "__main__":
  main()</code></pre></div>
              </details>
            </section>

          </div>
        </div>
      </main>
    </div>
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/scripts-smoke-env.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>scripts/smoke_env.py — Headless Environment Smoke Test | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · scripts/smoke_env.py</p>
          <h1>scripts/smoke_env.py — Headless Environment Smoke Test</h1>
          <p class="subtitle">A 231-line pre-flight checklist run before debugging any FSM behaviour. Loads the scene, validates every camera, body, site, joint, and ONNX model, and exits non-zero on the first required check failure — so CI catches environment rot before it wastes a debugging session.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → scripts/smoke_env.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./policies-fsm.html">← policies/fsm.py</a>
            <a href="./scripts-test-fsm-approach.html">scripts/test_fsm_approach.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> scripts/smoke_env.py</p>
              <p><strong>Lines:</strong> ~231</p>
              <p>Standalone test script with no policy or FSM imports. Run with <code>python scripts/smoke_env.py</code>. Exits 0 on full pass, 1 on any required failure. Optional ONNX models (croucher, rotator) are reported but never fail the run.</p>
            </div>
            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#chunk-constants">Constants &amp; manifest lists</a></li>
                <li><a href="#chunk-helpers">Helper utilities: _check() &amp; section()</a></li>
                <li><a href="#chunk-config">§1 Config validation</a></li>
                <li><a href="#chunk-scene">§2 MuJoCo scene load</a></li>
                <li><a href="#chunk-assets">§3–6 Cameras, Bodies, Sites, Joints</a></li>
                <li><a href="#chunk-onnx">§7–8 ONNX warmup (required + optional)</a></li>
                <li><a href="#chunk-summary">Summary &amp; exit</a></li>
                <li><a href="#full-file">Full file appendix</a></li>
              </ul>
              <a href="#full-file" class="jump-link">Jump to full file ↓</a>
            </nav>
          </aside>

          <div class="code-main">

            <!-- ─── Chunk 1: Constants ─────────────────────────────────────── -->
            <section class="code-section" id="chunk-constants">
              <h3>Constants &amp; manifest lists</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Hard-code the complete set of assets the FSM depends on so any deletion or rename is caught immediately. No logic here — just declarative manifests.</p>
                <h4>Inputs / Outputs</h4>
                <p>No runtime I/O. These constants are referenced by the check loops below.</p>
                <h4>Invariants</h4>
                <p><code>REQUIRED_CAMERAS</code> includes all 5 named cameras in <code>scene.xml</code>. <code>REQUIRED_BODIES</code> must include <code>red_block</code> and <code>table_white</code> — these are referenced by name in <code>FSMCore</code> geometry lookups. <code>REQUIRED_ONNX</code> maps each model to its exact expected input dimension: walker=99, right_reacher=36. A dimension mismatch would produce a runtime crash during warmup.</p>
                <h4>Why it matters</h4>
                <p>Having the required dimensions listed here (not inferred from the model files) means the smoke test catches an accidentally overwritten ONNX file — a corrupted file might still load but produce a different output shape.</p>
              </div>
              <div class="code-block">
                <pre><code>#!/usr/bin/env python3
"""Headless smoke test: validate scene loading and ONNX warmup.

Exits 0 on full pass, 1 on any required check failure.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

REQUIRED_CAMERAS = ["head_cam", "wrist_cam", "overhead", "side_view", "tracking"]
REQUIRED_BODIES  = ["pelvis", "red_block", "table", "table_white"]
REQUIRED_SITES   = ["right_palm", "imu_in_pelvis", "left_foot", "right_foot"]

REQUIRED_ONNX = {
    "walker":        ("walker.onnx",        99),
    "right_reacher": ("right_reacher.onnx", 36),
}
OPTIONAL_ONNX = {
    "croucher": ("croucher.onnx",  101),
    "rotator":  ("rotator.onnx",    99),
}</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 2: Helpers ───────────────────────────────────────── -->
            <section class="code-section" id="chunk-helpers">
              <h3>Helper utilities: _check() &amp; section()</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p><code>_check(label, ok, detail)</code> — prints a uniform <code>[PASS]</code>/<code>[FAIL]</code> line and returns the boolean result so callers can branch on it. <code>section(title)</code> — prints a section header line for readable terminal output.</p>
                <h4>Invariants</h4>
                <p>By returning <code>ok</code>, <code>_check</code> allows the check call to double as both reporting and branching: <code>if not _check(...): failures.append(...)</code>. Every failure is appended to <code>failures</code> in <code>main()</code> — the summary at the end prints the complete list, so a single run shows all problems.</p>
                <h4>Why it matters</h4>
                <p>The consistent <code>[PASS]</code>/<code>[FAIL]</code> prefix makes the output greppable in CI logs. Running the entire script (not stopping at first failure) is valuable — a missing joint and a wrong input dimension are independent problems you want to see simultaneously.</p>
              </div>
              <div class="code-block">
                <pre><code>def _check(label: str, ok: bool, detail: str = "") -&gt; bool:
    status = "PASS" if ok else "FAIL"
    suffix = f"  ({detail})" if detail else ""
    print(f"  [{status}] {label}{suffix}")
    return ok


def section(title: str) -&gt; None:
    print(f"\n--- {title} ---")</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 3: Config ────────────────────────────────────────── -->
            <section class="code-section" id="chunk-config">
              <h3>§1 Config validation</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Verify <code>model_config.json</code> exists, parses cleanly, and contains the <code>joint_names</code>, <code>walker</code>, and <code>croucher</code> blocks. If the config is missing, set <code>config={}</code> and continue — later sections degrade gracefully.</p>
                <h4>Failure modes</h4>
                <p>If <code>model_config.json</code> is missing, the joint validation section (§6) silently passes (empty joint list). This is acceptable — the missing-config failure is already recorded and the summary will show it.</p>
              </div>
              <div class="code-block">
                <pre><code>def main() -&gt; int:
    failures: list[str] = []

    # ------------------------------------------------------------------ #
    # 1. Config
    # ------------------------------------------------------------------ #
    section("Config")
    config_path = ROOT / "model_config.json"
    config_ok = _check("model_config.json exists", config_path.exists())
    if not config_ok:
        failures.append("model_config.json missing")
        config = {}
    else:
        with open(config_path) as f:
            config = json.load(f)
        joint_names = config.get("joint_names", [])
        _check("joint_names present", bool(joint_names), f"{len(joint_names)} joints")
        for key in ("walker", "croucher"):
            present = key in config
            _check(f"config['{key}'] block", present)
            if not present:
                failures.append(f"config missing '{key}' block")</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 4: Scene load ────────────────────────────────────── -->
            <section class="code-section" id="chunk-scene">
              <h3>§2 MuJoCo scene load</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Import MuJoCo (fail-fast if not installed), load <code>scene.xml</code>, create a <code>MjData</code>, and run one forward pass. A forward pass is required before reading any derived quantities (site positions, body positions) — without it, all position arrays contain stale zeros.</p>
                <h4>Failure modes</h4>
                <p>If <code>scene.xml</code> or MuJoCo itself is not available, the script exits immediately with code 1 — subsequent checks all depend on a live model and data. Using early-exit here rather than recording a failure and continuing prevents a cascade of confusing <code>NameError</code> exceptions in the asset checks.</p>
                <h4>Why it matters</h4>
                <p>Calling <code>mujoco.mj_forward()</code> at startup catches XML validation errors and missing mesh files (which only materialise at load time, not at parse time). A script that merely opens the XML file wouldn't catch a bad mesh reference.</p>
              </div>
              <div class="code-block">
                <pre><code>    # ------------------------------------------------------------------ #
    # 2. MuJoCo scene
    # ------------------------------------------------------------------ #
    section("MuJoCo scene")
    try:
        import mujoco
    except ImportError as exc:
        print(f"  [FAIL] mujoco import failed: {exc}")
        failures.append("mujoco not importable")
        _print_summary(failures)
        return 1

    xml_path = ROOT / "scene.xml"
    xml_ok = _check("scene.xml exists", xml_path.exists())
    if not xml_ok:
        failures.append("scene.xml missing")
        _print_summary(failures)
        return 1

    try:
        model = mujoco.MjModel.from_xml_path(str(xml_path))
        data  = mujoco.MjData(model)
        mujoco.mj_forward(model, data)
        _check("scene loaded + forward pass", True)
    except Exception as exc:
        _check("scene loaded", False, str(exc))
        failures.append(f"scene load failed: {exc}")
        _print_summary(failures)
        return 1</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 5: Assets ───────────────────────────────────────── -->
            <section class="code-section" id="chunk-assets">
              <h3>§3–6 Cameras, Bodies, Sites, Joints</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Iterate each manifest list and call <code>mujoco.mj_name2id()</code> to verify the named entity exists in the loaded model. A return value of <code>-1</code> means not found. Joints are validated by cross-referencing the <code>joint_names</code> list from the config against the MuJoCo model — this catches a JSON/XML mismatch (config says a joint exists but it was renamed in the XML).</p>
                <h4>Invariants</h4>
                <p><code>mj_name2id</code> is the authoritative way to check MuJoCo name resolution. It does not raise on not-found — it returns -1, so the check must guard <code>cid &gt;= 0</code>. All failures are appended to the shared <code>failures</code> list; the loop continues to expose all missing assets at once.</p>
                <h4>Why it matters</h4>
                <p>Without this check, a typo in a camera name in <code>scene.xml</code> would only surface when the simulation tries to render — typically mid-experiment, not at startup. Running the smoke test first turns a mysterious render crash into a clear <code>[FAIL] camera 'overhead' NOT FOUND</code>.</p>
              </div>
              <div class="code-block">
                <pre><code>    # ------------------------------------------------------------------ #
    # 3. Cameras
    # ------------------------------------------------------------------ #
    section("Cameras")
    for cam in REQUIRED_CAMERAS:
        cid = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_CAMERA, cam)
        ok  = cid &gt;= 0
        _check(f"camera '{cam}'", ok, f"id={cid}" if ok else "NOT FOUND")
        if not ok:
            failures.append(f"camera '{cam}' missing")

    # ------------------------------------------------------------------ #
    # 4. Bodies
    # ------------------------------------------------------------------ #
    section("Bodies")
    for body in REQUIRED_BODIES:
        bid = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, body)
        ok  = bid &gt;= 0
        _check(f"body '{body}'", ok, f"id={bid}" if ok else "NOT FOUND")
        if not ok:
            failures.append(f"body '{body}' missing")

    # ------------------------------------------------------------------ #
    # 5. Sites
    # ------------------------------------------------------------------ #
    section("Sites")
    for site in REQUIRED_SITES:
        sid = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_SITE, site)
        ok  = sid &gt;= 0
        _check(f"site '{site}'", ok, f"id={sid}" if ok else "NOT FOUND")
        if not ok:
            failures.append(f"site '{site}' missing")

    # ------------------------------------------------------------------ #
    # 6. Joints from config
    # ------------------------------------------------------------------ #
    section("Config joints in model")
    joint_names = config.get("joint_names", [])
    missing_joints = []
    for jname in joint_names:
        jid = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_JOINT, jname)
        if jid &lt; 0:
            missing_joints.append(jname)
    if missing_joints:
        _check(f"all {len(joint_names)} joints present", False,
               f"missing: {missing_joints}")
        failures.append(f"missing joints: {missing_joints}")
    else:
        _check(f"all {len(joint_names)} joints present", True)</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 6: ONNX ─────────────────────────────────────────── -->
            <section class="code-section" id="chunk-onnx">
              <h3>§7–8 ONNX warmup (required + optional)</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>For each required ONNX model: verify the file exists, load it with the same <code>SessionOptions</code> used in production (1 thread per op), run one forward pass with a zero-filled observation of the expected input dimension, and check the output shape. Optional models (croucher, rotator) are given a softer treatment: INFO if absent, WARN if load fails — never a counted failure.</p>
                <h4>Invariants</h4>
                <p>The dummy input is always <code>np.zeros((1, input_dim), dtype=np.float32)</code>. This exercises the ONNX runtime session creation and graph compilation, which are the expensive parts — actual numeric content doesn't matter for shape validation.<br>
                <code>intra_op_num_threads = 1</code> and <code>inter_op_num_threads = 1</code> must match production settings to catch any session-option-dependent initialization errors.</p>
                <h4>Failure modes</h4>
                <p>If <code>onnxruntime</code> cannot be imported, the script exits early with code 1. This is the correct behaviour — an ONNX import failure means the entire environment is unusable, not just one model. For optional models, load failures are printed as <code>[WARN]</code> and don't contribute to the failure count.</p>
                <h4>Why it matters</h4>
                <p>ONNX warmup failures are the most common reason a new environment doesn't work. A corrupted walker.onnx file looks identical to a valid file in terms of file size — the smoke test catches it immediately by running inference, not just checking existence.</p>
              </div>
              <div class="code-block">
                <pre><code>    # ------------------------------------------------------------------ #
    # 7. ONNX — required
    # ------------------------------------------------------------------ #
    section("ONNX (required)")
    try:
        import numpy as np
        import onnxruntime as ort
        ort_ok = True
    except ImportError as exc:
        print(f"  [FAIL] onnxruntime import failed: {exc}")
        failures.append("onnxruntime not importable")
        _print_summary(failures)
        return 1

    for label, (fname, input_dim) in REQUIRED_ONNX.items():
        path = ROOT / fname
        exists = path.exists()
        _check(f"{fname} exists", exists)
        if not exists:
            failures.append(f"{fname} missing")
            continue
        try:
            sess_opts = ort.SessionOptions()
            sess_opts.intra_op_num_threads = 1
            sess_opts.inter_op_num_threads = 1
            sess = ort.InferenceSession(
                str(path), sess_opts, providers=["CPUExecutionProvider"]
            )
            in_name  = sess.get_inputs()[0].name
            out_name = sess.get_outputs()[0].name
            dummy = np.zeros((1, input_dim), dtype=np.float32)
            out   = sess.run([out_name], {in_name: dummy})[0]
            _check(
                f"{label} warmup",
                True,
                f"in={input_dim} out={out.shape[1]}",
            )
        except Exception as exc:
            _check(f"{label} warmup", False, str(exc))
            failures.append(f"{label} warmup failed: {exc}")

    # ------------------------------------------------------------------ #
    # 8. ONNX — optional (report only, never fail)
    # ------------------------------------------------------------------ #
    section("ONNX (optional)")
    for label, (fname, input_dim) in OPTIONAL_ONNX.items():
        path = ROOT / fname
        exists = path.exists()
        if not exists:
            print(f"  [INFO] {fname} not present (optional)")
            continue
        try:
            sess_opts = ort.SessionOptions()
            sess_opts.intra_op_num_threads = 1
            sess_opts.inter_op_num_threads = 1
            sess = ort.InferenceSession(
                str(path), sess_opts, providers=["CPUExecutionProvider"]
            )
            in_name  = sess.get_inputs()[0].name
            out_name = sess.get_outputs()[0].name
            dummy = np.zeros((1, input_dim), dtype=np.float32)
            out   = sess.run([out_name], {in_name: dummy})[0]
            print(f"  [OK  ] {label}: in={input_dim} out={out.shape[1]}")
        except Exception as exc:
            print(f"  [WARN] {label} load/warmup failed: {exc}")</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 7: Summary ──────────────────────────────────────── -->
            <section class="code-section" id="chunk-summary">
              <h3>Summary &amp; exit</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Print a clearly formatted summary block — all failures listed, or a single PASS line — and return the appropriate exit code. <code>_print_summary</code> is a standalone function so it can be called from early-exit paths (e.g., scene load failure) without duplicating the formatting.</p>
                <h4>Why it matters</h4>
                <p>The <code>sys.exit(main())</code> pattern ensures the return value from <code>main()</code> is directly used as the process exit code. CI can check <code>$?</code> without parsing the output text.</p>
              </div>
              <div class="code-block">
                <pre><code>    # ------------------------------------------------------------------ #
    # Summary
    # ------------------------------------------------------------------ #
    _print_summary(failures)
    return 1 if failures else 0


def _print_summary(failures: list[str]) -&gt; None:
    print("\n" + "=" * 50)
    if failures:
        print(f"RESULT: FAIL  ({len(failures)} issue(s))")
        for f in failures:
            print(f"  - {f}")
    else:
        print("RESULT: PASS  — repo is ready for FSM work")
    print("=" * 50)


if __name__ == "__main__":
    sys.exit(main())</code></pre>
              </div>
            </section>

            <!-- ─── Full file appendix ─────────────────────────────────────── -->
            <section class="code-section" id="full-file">
              <h3>Full file — scripts/smoke_env.py</h3>
              <details class="code-details">
                <summary>Expand full source (~231 lines)</summary>
                <div class="code-block">
                  <pre><code>#!/usr/bin/env python3
"""Headless smoke test: validate scene loading and ONNX warmup.

Exits 0 on full pass, 1 on any required check failure.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

REQUIRED_CAMERAS = ["head_cam", "wrist_cam", "overhead", "side_view", "tracking"]
REQUIRED_BODIES  = ["pelvis", "red_block", "table", "table_white"]
REQUIRED_SITES   = ["right_palm", "imu_in_pelvis", "left_foot", "right_foot"]

REQUIRED_ONNX = {
    "walker":        ("walker.onnx",        99),
    "right_reacher": ("right_reacher.onnx", 36),
}
OPTIONAL_ONNX = {
    "croucher": ("croucher.onnx",  101),
    "rotator":  ("rotator.onnx",    99),
}


# --------------------------------------------------------------------------- #

def _check(label: str, ok: bool, detail: str = "") -&gt; bool:
    status = "PASS" if ok else "FAIL"
    suffix = f"  ({detail})" if detail else ""
    print(f"  [{status}] {label}{suffix}")
    return ok


def section(title: str) -&gt; None:
    print(f"\n--- {title} ---")


# --------------------------------------------------------------------------- #

def main() -&gt; int:
    failures: list[str] = []

    # ------------------------------------------------------------------ #
    # 1. Config
    # ------------------------------------------------------------------ #
    section("Config")
    config_path = ROOT / "model_config.json"
    config_ok = _check("model_config.json exists", config_path.exists())
    if not config_ok:
        failures.append("model_config.json missing")
        config = {}
    else:
        with open(config_path) as f:
            config = json.load(f)
        joint_names = config.get("joint_names", [])
        _check("joint_names present", bool(joint_names), f"{len(joint_names)} joints")
        for key in ("walker", "croucher"):
            present = key in config
            _check(f"config['{key}'] block", present)
            if not present:
                failures.append(f"config missing '{key}' block")

    # ------------------------------------------------------------------ #
    # 2. MuJoCo scene
    # ------------------------------------------------------------------ #
    section("MuJoCo scene")
    try:
        import mujoco
    except ImportError as exc:
        print(f"  [FAIL] mujoco import failed: {exc}")
        failures.append("mujoco not importable")
        _print_summary(failures)
        return 1

    xml_path = ROOT / "scene.xml"
    xml_ok = _check("scene.xml exists", xml_path.exists())
    if not xml_ok:
        failures.append("scene.xml missing")
        _print_summary(failures)
        return 1

    try:
        model = mujoco.MjModel.from_xml_path(str(xml_path))
        data  = mujoco.MjData(model)
        mujoco.mj_forward(model, data)
        _check("scene loaded + forward pass", True)
    except Exception as exc:
        _check("scene loaded", False, str(exc))
        failures.append(f"scene load failed: {exc}")
        _print_summary(failures)
        return 1

    # ------------------------------------------------------------------ #
    # 3. Cameras
    # ------------------------------------------------------------------ #
    section("Cameras")
    for cam in REQUIRED_CAMERAS:
        cid = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_CAMERA, cam)
        ok  = cid &gt;= 0
        _check(f"camera '{cam}'", ok, f"id={cid}" if ok else "NOT FOUND")
        if not ok:
            failures.append(f"camera '{cam}' missing")

    # ------------------------------------------------------------------ #
    # 4. Bodies
    # ------------------------------------------------------------------ #
    section("Bodies")
    for body in REQUIRED_BODIES:
        bid = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, body)
        ok  = bid &gt;= 0
        _check(f"body '{body}'", ok, f"id={bid}" if ok else "NOT FOUND")
        if not ok:
            failures.append(f"body '{body}' missing")

    # ------------------------------------------------------------------ #
    # 5. Sites
    # ------------------------------------------------------------------ #
    section("Sites")
    for site in REQUIRED_SITES:
        sid = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_SITE, site)
        ok  = sid &gt;= 0
        _check(f"site '{site}'", ok, f"id={sid}" if ok else "NOT FOUND")
        if not ok:
            failures.append(f"site '{site}' missing")

    # ------------------------------------------------------------------ #
    # 6. Joints from config
    # ------------------------------------------------------------------ #
    section("Config joints in model")
    joint_names = config.get("joint_names", [])
    missing_joints = []
    for jname in joint_names:
        jid = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_JOINT, jname)
        if jid &lt; 0:
            missing_joints.append(jname)
    if missing_joints:
        _check(f"all {len(joint_names)} joints present", False,
               f"missing: {missing_joints}")
        failures.append(f"missing joints: {missing_joints}")
    else:
        _check(f"all {len(joint_names)} joints present", True)

    # ------------------------------------------------------------------ #
    # 7. ONNX — required
    # ------------------------------------------------------------------ #
    section("ONNX (required)")
    try:
        import numpy as np
        import onnxruntime as ort
        ort_ok = True
    except ImportError as exc:
        print(f"  [FAIL] onnxruntime import failed: {exc}")
        failures.append("onnxruntime not importable")
        _print_summary(failures)
        return 1

    for label, (fname, input_dim) in REQUIRED_ONNX.items():
        path = ROOT / fname
        exists = path.exists()
        _check(f"{fname} exists", exists)
        if not exists:
            failures.append(f"{fname} missing")
            continue
        try:
            sess_opts = ort.SessionOptions()
            sess_opts.intra_op_num_threads = 1
            sess_opts.inter_op_num_threads = 1
            sess = ort.InferenceSession(
                str(path), sess_opts, providers=["CPUExecutionProvider"]
            )
            in_name  = sess.get_inputs()[0].name
            out_name = sess.get_outputs()[0].name
            dummy = np.zeros((1, input_dim), dtype=np.float32)
            out   = sess.run([out_name], {in_name: dummy})[0]
            _check(
                f"{label} warmup",
                True,
                f"in={input_dim} out={out.shape[1]}",
            )
        except Exception as exc:
            _check(f"{label} warmup", False, str(exc))
            failures.append(f"{label} warmup failed: {exc}")

    # ------------------------------------------------------------------ #
    # 8. ONNX — optional (report only, never fail)
    # ------------------------------------------------------------------ #
    section("ONNX (optional)")
    for label, (fname, input_dim) in OPTIONAL_ONNX.items():
        path = ROOT / fname
        exists = path.exists()
        if not exists:
            print(f"  [INFO] {fname} not present (optional)")
            continue
        try:
            sess_opts = ort.SessionOptions()
            sess_opts.intra_op_num_threads = 1
            sess_opts.inter_op_num_threads = 1
            sess = ort.InferenceSession(
                str(path), sess_opts, providers=["CPUExecutionProvider"]
            )
            in_name  = sess.get_inputs()[0].name
            out_name = sess.get_outputs()[0].name
            dummy = np.zeros((1, input_dim), dtype=np.float32)
            out   = sess.run([out_name], {in_name: dummy})[0]
            print(f"  [OK  ] {label}: in={input_dim} out={out.shape[1]}")
        except Exception as exc:
            print(f"  [WARN] {label} load/warmup failed: {exc}")

    # ------------------------------------------------------------------ #
    # Summary
    # ------------------------------------------------------------------ #
    _print_summary(failures)
    return 1 if failures else 0


def _print_summary(failures: list[str]) -&gt; None:
    print("\n" + "=" * 50)
    if failures:
        print(f"RESULT: FAIL  ({len(failures)} issue(s))")
        for f in failures:
            print(f"  - {f}")
    else:
        print("RESULT: PASS  — repo is ready for FSM work")
    print("=" * 50)


if __name__ == "__main__":
    sys.exit(main())</code></pre>
                </div>
              </details>
            </section>

          </div><!-- .code-main -->
        </div><!-- .code-page-layout -->
      </main>

      <footer class="site-footer">
        <p>Lucky Robots G1 Pick-and-Place Case Study</p>
      </footer>
    </div><!-- .page -->
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/code/scripts-test-fsm-approach.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>scripts/test_fsm_approach.py — Headless FSM Integration Test | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation · scripts/test_fsm_approach.py</p>
          <h1>scripts/test_fsm_approach.py — Headless FSM Integration Test</h1>
          <p class="subtitle">The authoritative end-to-end harness. Runs the full pipeline — walker, reacher, grasp attachment, FSM — for up to 3 000 control ticks without a viewer, then checks whether the cylinder landed on the target table. Exits 0 for PASS, 1 for FAIL or timeout.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../../index.html">Home</a>
            <a href="../challenge.html">Challenge</a>
            <a href="../architecture.html">Architecture</a>
            <a href="../fsm-baseline.html">FSM Baseline</a>
            <a href="../visual-oracle.html">Visual Oracle</a>
            <a href="../lessons.html">Lessons</a>
            <a href="../results.html">Results</a>
            <a href="../implementation-deep-dive.html">Implementation</a>
            <a href="../limitations-next-steps.html">Limitations</a>
            <a href="../references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content">
        <div class="breadcrumb">
          <a href="../implementation-deep-dive.html">Implementation</a> → scripts/test_fsm_approach.py
        </div>

        <div class="code-subnav">
          <a href="../implementation-deep-dive.html">↩ Back to Implementation Overview</a>
          <div class="next-prev-nav">
            <a href="./scripts-smoke-env.html">← scripts/smoke_env.py</a>
            <a href="./common-onnx-policy.html">common/onnx_policy.py →</a>
          </div>
        </div>

        <div class="code-page-layout">
          <aside class="code-sidebar">
            <div class="code-section">
              <h2>File overview</h2>
              <p><strong>Path:</strong> scripts/test_fsm_approach.py</p>
              <p><strong>Lines:</strong> ~130</p>
              <p>A mirror of <code>run.py</code>'s simulation loop — same physics timestep, same decimation, same grasp tick — stripped of all viewer/camera overhead. This is the script used to validate every FSM step (Steps 6–10) before checking in.</p>
            </div>
            <nav class="code-section">
              <h2>Contents</h2>
              <ul class="toc-list">
                <li><a href="#chunk-imports">Imports &amp; path setup</a></li>
                <li><a href="#chunk-armature">set_armature() — physics fidelity</a></li>
                <li><a href="#chunk-setup">Scene, controller, policy wiring</a></li>
                <li><a href="#chunk-loop">Simulation loop</a></li>
                <li><a href="#chunk-done">DONE verdict &amp; diagnostic printout</a></li>
                <li><a href="#chunk-timeout">Timeout &amp; fall detection</a></li>
                <li><a href="#full-file">Full file appendix</a></li>
              </ul>
              <a href="#full-file" class="jump-link">Jump to full file ↓</a>
            </nav>
          </aside>

          <div class="code-main">

            <!-- ─── Chunk 1: Imports ───────────────────────────────────────── -->
            <section class="code-section" id="chunk-imports">
              <h3>Imports &amp; path setup</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Add the repo root to <code>sys.path</code> so the script can be run from any working directory without installing the package. Import every collaborating module explicitly — this makes the dependency graph of the integration test immediately visible.</p>
                <h4>Inputs / Outputs</h4>
                <p><code>ROOT = Path(__file__).resolve().parent.parent</code> resolves to the repo root regardless of where the script is invoked from. All asset paths (ONNX, XML, config) are computed relative to ROOT.</p>
                <h4>Why it matters</h4>
                <p>Importing <code>FSMState</code> directly (not just <code>FSMPolicy</code>) enables the DONE detection in the loop — <code>if state == FSMState.DONE</code> — without string comparison.</p>
              </div>
              <div class="code-block">
                <pre><code>#!/usr/bin/env python3
"""Headless integration test: full pick-and-place pipeline through DONE."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import mujoco
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from common.controller import WalkerReacherController
from common.grasp import KinematicAttachment
from common.onnx_policy import ONNXPolicy
from common.scene import reset_robot
from policies.fsm import FSMPolicy
from policies.fsm_core import FSMState</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 2: set_armature ─────────────────────────────────── -->
            <section class="code-section" id="chunk-armature">
              <h3>set_armature() — physics fidelity</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Patch MuJoCo's <code>dof_armature</code> values after loading the model. Armature adds virtual inertia to each joint DOF to improve numerical stability and reduce joint vibration. The values here match those used in training — without them the walker policy produces a subtly different gait that can destabilise the carry phase.</p>
                <h4>Inputs / Outputs</h4>
                <p><strong>model:</strong> <code>mujoco.MjModel</code> — mutated in place.<br>
                <strong>joint_names:</strong> ordered list from config — maps index <code>i</code> to DOF <code>6 + i</code> (the first 6 DOFs are the floating base).</p>
                <h4>Invariants</h4>
                <p>Armature values are in kg·m². The five constants (ARM_5020 through ARM_2x5020) are derived from the physical motor specifications of the G1's actuators. The <code>else</code> clause defaults to ARM_5020 — a conservative safe value for any unclassified joint (e.g., finger joints not listed in the config).</p>
                <h4>Why it matters</h4>
                <p>This function is duplicated verbatim from <code>run.py</code>. The duplication is intentional — the test must simulate physics identically to production, and a shared helper would require packaging the test's dependencies as a library. Any edit to this function must be applied in both files.</p>
              </div>
              <div class="code-block">
                <pre><code>def set_armature(model, joint_names):
    ARM_5020    = 0.00360972
    ARM_7520_14 = 0.01017752
    ARM_7520_22 = 0.02510192
    ARM_4010    = 0.00425000
    ARM_2x5020  = 0.00721945
    for i, name in enumerate(joint_names):
        dof = 6 + i
        if "elbow" in name or "shoulder" in name or "wrist_roll" in name:
            model.dof_armature[dof] = ARM_5020
        elif "hip_pitch" in name or "hip_yaw" in name or name == "waist_yaw_joint":
            model.dof_armature[dof] = ARM_7520_14
        elif "hip_roll" in name or "knee" in name:
            model.dof_armature[dof] = ARM_7520_22
        elif "wrist_pitch" in name or "wrist_yaw" in name:
            model.dof_armature[dof] = ARM_4010
        elif "ankle" in name or name in ("waist_pitch_joint", "waist_roll_joint"):
            model.dof_armature[dof] = ARM_2x5020
        else:
            model.dof_armature[dof] = ARM_5020</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 3: Setup ─────────────────────────────────────────── -->
            <section class="code-section" id="chunk-setup">
              <h3>Scene, controller, policy wiring</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Load all four ONNX policies, create the controller, wire up the grasp backend, create the FSM policy, and run one warmup call per ONNX model. The warmup call pre-compiles the ONNX graph so the first real inference call doesn't have an anomalous latency spike.</p>
                <h4>Inputs / Outputs</h4>
                <p>All ONNX files are loaded from <code>ROOT</code>. <code>KinematicAttachment</code> requires the <code>right_palm_site_id</code> (from the controller) and the <code>rb_body_id</code> (from a direct MuJoCo name lookup for <code>red_block</code>).</p>
                <h4>Invariants</h4>
                <p><code>reset_robot(... reset_data=False)</code> — the model is freshly loaded so <code>mj_resetData</code> would redundantly clear everything. Setting <code>reset_data=False</code> skips the redundant clear and goes straight to setting joint positions from the config.<br>
                <code>model.opt.timestep = 0.005</code> is set explicitly after loading — this ensures the 200 Hz physics rate even if the XML was edited.</p>
                <h4>Why it matters</h4>
                <p>The grasp backend receives the same <code>right_palm_site_id</code> as in production — this site drives the attachment logic. Using a different site ID here would produce a test that passes but doesn't exercise the real code path.</p>
              </div>
              <div class="code-block">
                <pre><code>def main():
    config_path = ROOT / "model_config.json"
    with open(config_path) as f:
        config = json.load(f)
    joint_names = config["joint_names"]

    model = mujoco.MjModel.from_xml_path(str(ROOT / "scene.xml"))
    model.opt.timestep = 0.005
    set_armature(model, joint_names)
    data  = mujoco.MjData(model)
    reset_robot(model, data, config, joint_names, reset_data=False)

    walker        = ONNXPolicy(str(ROOT / "walker.onnx"))
    croucher      = ONNXPolicy(str(ROOT / "croucher.onnx"))
    rotator       = ONNXPolicy(str(ROOT / "rotator.onnx"))
    right_reacher = ONNXPolicy(str(ROOT / "right_reacher.onnx"))

    ctrl = WalkerReacherController(model, data, walker, croucher, rotator,
                                   config, right_reacher=right_reacher)

    rb_body_id    = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "red_block")
    grasp_backend = KinematicAttachment(model, data, ctrl.right_palm_site_id, rb_body_id)
    policy        = FSMPolicy(ctrl, grasp_backend=grasp_backend)

    # Warm up ONNX
    walker(np.zeros((1, 99), dtype=np.float32))
    croucher(np.zeros((1, 101), dtype=np.float32))
    rotator(np.zeros((1, 99), dtype=np.float32))
    right_reacher(np.zeros((1, 36), dtype=np.float32))</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 4: Loop ─────────────────────────────────────────── -->
            <section class="code-section" id="chunk-loop">
              <h3>Simulation loop</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Run the control loop at 50 Hz (control tick) with 4× physics decimation (200 Hz). The structure exactly mirrors <code>run.py</code>'s loop — policy, controller, physics, grasp tick — so the test validates the same execution order as production.</p>
                <h4>Inputs / Outputs</h4>
                <p><code>MAX_CTRL_TICKS = 3000</code> corresponds to ~60 s of simulation time at 50 Hz. This is the budget for the full pick-and-place pipeline. If DONE is not reached in this budget, the test reports a timeout FAIL.</p>
                <h4>Invariants</h4>
                <p><strong>Loop order matters:</strong><br>
                1. <code>policy.step()</code> — advances FSM, writes commands into controller.<br>
                2. <code>ctrl.step()</code> — runs ONNX policies, computes target joint positions.<br>
                3. Inner loop: <code>ctrl.apply_pd_control()</code> → <code>mujoco.mj_step()</code> → <code>grasp_backend.tick()</code>.<br>
                <code>grasp_backend.tick()</code> must be called <strong>after</strong> every <code>mj_step</code> — not just at the outer tick rate. It teleports the attached body every physics step to prevent gravity/collision drift.</p>
                <h4>Failure modes</h4>
                <p>If <code>grasp_backend.tick()</code> were called only at the outer 50 Hz rate, the cylinder would drift ~0.049 m per physics step during carry (gravity × dt²), accumulating a visible drop between ticks. At 200 Hz, drift is ~0.006 m per step — still needs zeroing, but manageable.</p>
              </div>
              <div class="code-block">
                <pre><code>    decimation     = 4
    MAX_CTRL_TICKS = 3000   # ~60 s: full pipeline through DONE

    target_pos = ctrl.default_joint_pos.copy()

    for tick in range(MAX_CTRL_TICKS):
        out = policy.step()
        target_pos = ctrl.step()
        for _ in range(decimation):
            ctrl.apply_pd_control(target_pos)
            mujoco.mj_step(model, data)
            grasp_backend.tick(ctrl.grip_closed)

        state = policy._fsm.state</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 5: DONE verdict ──────────────────────────────────── -->
            <section class="code-section" id="chunk-done">
              <h3>DONE verdict &amp; diagnostic printout</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>When the FSM reaches <code>FSMState.DONE</code>, run the success check: <code>fsm._cylinder_on_target_table()</code>. Print a rich diagnostic block showing all relevant world-frame coordinates before calling <code>sys.exit(0)</code> on pass or <code>sys.exit(1)</code> on fail.</p>
                <h4>Inputs / Outputs</h4>
                <p>Reads from the FSMCore's private geometry helpers — <code>_cylinder_world()</code>, <code>_palm_world()</code>, <code>_target_drop_pt</code>, <code>_target_surface_z()</code>, <code>_cylinder_on_target_table()</code> — which all use live MuJoCo data. These are the same helpers the FSM uses internally to make state-transition decisions, so the test is checking the exact quantities the FSM acted on.</p>
                <h4>Invariants</h4>
                <p><code>_target_drop_pt</code> is the frozen world-frame point captured at <code>APPROACH_TARGET</code> entry. The diagnostic prints it explicitly so a failing test can show whether the drop point was computed correctly and whether the cylinder landed near it.</p>
                <h4>Why it matters</h4>
                <p>Calling <code>sys.exit(0 if on_tbl else 1)</code> immediately on reaching DONE (rather than breaking the loop and checking afterward) means the test runs for the minimum number of ticks — the loop doesn't spin for the remaining budget after success.</p>
              </div>
              <div class="code-block">
                <pre><code>        if state == FSMState.DONE:
            fsm   = policy._fsm
            cyl   = fsm._cylinder_world()
            palm  = fsm._palm_world()
            drop  = fsm._target_drop_pt
            tgt_z = fsm._target_surface_z()
            on_tbl = fsm._cylinder_on_target_table()
            verdict = "PASS" if on_tbl else "FAIL"
            print(f"\n{verdict} — reached DONE at control tick {tick + 1}")
            print(f"  palm_world      : ({palm[0]:.3f}, {palm[1]:.3f}, {palm[2]:.3f})")
            print(f"  cyl_world       : ({cyl[0]:.3f}, {cyl[1]:.3f}, {cyl[2]:.3f})")
            print(f"  drop_world      : ({drop[0]:.3f}, {drop[1]:.3f}, {drop[2]:.3f})")
            print(f"  target_z        : {tgt_z:.3f}")
            print(f"  cyl_clearance   : {cyl[2]-tgt_z:.3f} m")
            print(f"  on_target_table : {on_tbl}")
            print(f"  attached        : {grasp_backend.attached}")
            sys.exit(0 if on_tbl else 1)</code></pre>
              </div>
            </section>

            <!-- ─── Chunk 6: Timeout ──────────────────────────────────────── -->
            <section class="code-section" id="chunk-timeout">
              <h3>Timeout &amp; fall detection</h3>
              <div class="code-deep-notes">
                <h4>Intent</h4>
                <p>Two failure paths outside the DONE check: (1) robot fell — pelvis z drops below 0.40 m, which means the walker policy lost balance; (2) global timeout — 3 000 ticks elapsed without reaching DONE. Both print a diagnostic block and exit 1.</p>
                <h4>Invariants</h4>
                <p><code>data.qpos[2]</code> is the pelvis z position in world frame (the floating base z DOF). The threshold 0.40 m is well below normal walking height (~0.76 m) but above the floor, so it unambiguously indicates a fall rather than a deliberate crouch.<br>
                The fall check is inside the per-tick loop and fires immediately — it doesn't wait for the full 3 000 ticks if the robot falls at tick 50.</p>
                <h4>Why it matters</h4>
                <p>The timeout diagnostic prints the last FSM state, cylinder position, drop point, and on-table result. This is the primary debugging tool when the pipeline stalls — it answers "what was the FSM doing when time ran out?" without needing to re-run with a viewer.</p>
              </div>
              <div class="code-block">
                <pre><code>        pz = float(data.qpos[2])
        if pz &lt; 0.40:
            print(f"\nFAIL — robot fell (pelvis z={pz:.3f}) at tick {tick + 1}")
            sys.exit(1)

    # Timeout
    fsm   = policy._fsm
    cyl_w = fsm._cylinder_world()
    drop  = fsm._target_drop_pt
    drop_str = f"({drop[0]:.3f},{drop[1]:.3f},{drop[2]:.3f})" if drop is not None else "None"
    print(f"\n=== TIMEOUT after {MAX_CTRL_TICKS} ticks ===")
    print(f"  state           : {fsm.state.name}")
    print(f"  cyl_world       : ({cyl_w[0]:.3f}, {cyl_w[1]:.3f}, {cyl_w[2]:.3f})")
    print(f"  drop_world      : {drop_str}")
    print(f"  on_target_table : {fsm._cylinder_on_target_table()}")
    print(f"  attached        : {grasp_backend.attached}")
    print("\nFAIL — did not reach DONE")
    sys.exit(1)


if __name__ == "__main__":
    main()</code></pre>
              </div>
            </section>

            <!-- ─── Full file appendix ─────────────────────────────────────── -->
            <section class="code-section" id="full-file">
              <h3>Full file — scripts/test_fsm_approach.py</h3>
              <details class="code-details">
                <summary>Expand full source (~130 lines)</summary>
                <div class="code-block">
                  <pre><code>#!/usr/bin/env python3
"""Headless integration test: full pick-and-place pipeline through DONE."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import mujoco
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from common.controller import WalkerReacherController
from common.grasp import KinematicAttachment
from common.onnx_policy import ONNXPolicy
from common.scene import reset_robot
from policies.fsm import FSMPolicy
from policies.fsm_core import FSMState


def set_armature(model, joint_names):
    ARM_5020    = 0.00360972
    ARM_7520_14 = 0.01017752
    ARM_7520_22 = 0.02510192
    ARM_4010    = 0.00425000
    ARM_2x5020  = 0.00721945
    for i, name in enumerate(joint_names):
        dof = 6 + i
        if "elbow" in name or "shoulder" in name or "wrist_roll" in name:
            model.dof_armature[dof] = ARM_5020
        elif "hip_pitch" in name or "hip_yaw" in name or name == "waist_yaw_joint":
            model.dof_armature[dof] = ARM_7520_14
        elif "hip_roll" in name or "knee" in name:
            model.dof_armature[dof] = ARM_7520_22
        elif "wrist_pitch" in name or "wrist_yaw" in name:
            model.dof_armature[dof] = ARM_4010
        elif "ankle" in name or name in ("waist_pitch_joint", "waist_roll_joint"):
            model.dof_armature[dof] = ARM_2x5020
        else:
            model.dof_armature[dof] = ARM_5020


def main():
    config_path = ROOT / "model_config.json"
    with open(config_path) as f:
        config = json.load(f)
    joint_names = config["joint_names"]

    model = mujoco.MjModel.from_xml_path(str(ROOT / "scene.xml"))
    model.opt.timestep = 0.005
    set_armature(model, joint_names)
    data  = mujoco.MjData(model)
    reset_robot(model, data, config, joint_names, reset_data=False)

    walker        = ONNXPolicy(str(ROOT / "walker.onnx"))
    croucher      = ONNXPolicy(str(ROOT / "croucher.onnx"))
    rotator       = ONNXPolicy(str(ROOT / "rotator.onnx"))
    right_reacher = ONNXPolicy(str(ROOT / "right_reacher.onnx"))

    ctrl = WalkerReacherController(model, data, walker, croucher, rotator,
                                   config, right_reacher=right_reacher)

    rb_body_id    = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "red_block")
    grasp_backend = KinematicAttachment(model, data, ctrl.right_palm_site_id, rb_body_id)
    policy        = FSMPolicy(ctrl, grasp_backend=grasp_backend)

    # Warm up ONNX
    walker(np.zeros((1, 99), dtype=np.float32))
    croucher(np.zeros((1, 101), dtype=np.float32))
    rotator(np.zeros((1, 99), dtype=np.float32))
    right_reacher(np.zeros((1, 36), dtype=np.float32))

    decimation     = 4
    MAX_CTRL_TICKS = 3000   # ~60 s: full pipeline through DONE

    target_pos = ctrl.default_joint_pos.copy()

    for tick in range(MAX_CTRL_TICKS):
        out = policy.step()
        target_pos = ctrl.step()
        for _ in range(decimation):
            ctrl.apply_pd_control(target_pos)
            mujoco.mj_step(model, data)
            grasp_backend.tick(ctrl.grip_closed)

        state = policy._fsm.state

        if state == FSMState.DONE:
            fsm   = policy._fsm
            cyl   = fsm._cylinder_world()
            palm  = fsm._palm_world()
            drop  = fsm._target_drop_pt
            tgt_z = fsm._target_surface_z()
            on_tbl = fsm._cylinder_on_target_table()
            verdict = "PASS" if on_tbl else "FAIL"
            print(f"\n{verdict} — reached DONE at control tick {tick + 1}")
            print(f"  palm_world      : ({palm[0]:.3f}, {palm[1]:.3f}, {palm[2]:.3f})")
            print(f"  cyl_world       : ({cyl[0]:.3f}, {cyl[1]:.3f}, {cyl[2]:.3f})")
            print(f"  drop_world      : ({drop[0]:.3f}, {drop[1]:.3f}, {drop[2]:.3f})")
            print(f"  target_z        : {tgt_z:.3f}")
            print(f"  cyl_clearance   : {cyl[2]-tgt_z:.3f} m")
            print(f"  on_target_table : {on_tbl}")
            print(f"  attached        : {grasp_backend.attached}")
            sys.exit(0 if on_tbl else 1)

        pz = float(data.qpos[2])
        if pz &lt; 0.40:
            print(f"\nFAIL — robot fell (pelvis z={pz:.3f}) at tick {tick + 1}")
            sys.exit(1)

    # Timeout
    fsm   = policy._fsm
    cyl_w = fsm._cylinder_world()
    drop  = fsm._target_drop_pt
    drop_str = f"({drop[0]:.3f},{drop[1]:.3f},{drop[2]:.3f})" if drop is not None else "None"
    print(f"\n=== TIMEOUT after {MAX_CTRL_TICKS} ticks ===")
    print(f"  state           : {fsm.state.name}")
    print(f"  cyl_world       : ({cyl_w[0]:.3f}, {cyl_w[1]:.3f}, {cyl_w[2]:.3f})")
    print(f"  drop_world      : {drop_str}")
    print(f"  on_target_table : {fsm._cylinder_on_target_table()}")
    print(f"  attached        : {grasp_backend.attached}")
    print("\nFAIL — did not reach DONE")
    sys.exit(1)


if __name__ == "__main__":
    main()</code></pre>
                </div>
              </details>
            </section>

          </div><!-- .code-main -->
        </div><!-- .code-page-layout -->
      </main>

      <footer class="site-footer">
        <p>Lucky Robots G1 Pick-and-Place Case Study</p>
      </footer>
    </div><!-- .page -->
    <script src="../../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/fsm-baseline.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FSM Baseline | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">FSM Baseline</p>
          <h1>Finite-State Machine Sequencing</h1>
          <p class="subtitle">Explicit phases that keep locomotion, reaching, and grasping debuggable.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="./challenge.html">Challenge</a>
            <a href="./architecture.html">Architecture</a>
            <a href="./fsm-baseline.html">FSM Baseline</a>
            <a href="./visual-oracle.html">Visual Oracle</a>
            <a href="./lessons.html">Lessons</a>
            <a href="./results.html">Results</a>
            <a href="./implementation-deep-dive.html">Implementation</a>
            <a href="./limitations-next-steps.html">Limitations</a>
            <a href="./references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content post">
        <section>
          <h2>FSM Baseline</h2>
          <p>
            The first autonomous version used an explicit finite-state machine so each phase could
            be tuned independently. The state ordering also makes timeouts and fallback paths
            visible during debugging.
          </p>
          <div class="code-block">
            <pre>
SETTLE
APPROACH_SOURCE
HOVER_SOURCE
DESCEND_SOURCE
CLOSE_GRIP
LIFT_SOURCE
APPROACH_TARGET
HOVER_TARGET
LOWER_TARGET
OPEN_GRIP
RETRACT
DONE</pre>
          </div>
          <p class="small">
            FSMs were selected over end-to-end RL because they make locomotion, perception, and
            grasping failures separable and traceable within a short development cycle.
          </p>
          <figure class="figure">
            <img
              src="../assets/fsm-diagram.svg"
              alt="Finite-state machine diagram showing source approach, grasp, transport, and placement phases."
              loading="lazy"
            />
            <figcaption>
              FSM sequencing with debounce, timeout fallback, attach/release events, and frozen
              vision estimates during the close-grip window.
            </figcaption>
          </figure>
        </section>

        <section>
          <h2>State table</h2>
          <table class="milestone-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Purpose</th>
                <th>Exit condition</th>
                <th>Risk handled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SETTLE</td>
                <td>Stabilize the sim and controller before commanding motion.</td>
                <td>Settle timeout elapses.</td>
                <td>Initial drift or unstable gait.</td>
              </tr>
              <tr>
                <td>APPROACH_SOURCE</td>
                <td>Walk into the source-side reach corridor.</td>
                <td>Source window held for the debounce period.</td>
                <td>Overshoot and lateral drift.</td>
              </tr>
              <tr>
                <td>HOVER_SOURCE</td>
                <td>Move the palm above the cylinder.</td>
                <td>Palm distance inside hover window.</td>
                <td>Early descent from a misaligned pose.</td>
              </tr>
              <tr>
                <td>DESCEND_SOURCE</td>
                <td>Lower the palm to grasp height.</td>
                <td>Grasp-height window reached or timeout.</td>
                <td>Table collision or occlusion jitter.</td>
              </tr>
              <tr>
                <td>CLOSE_GRIP</td>
                <td>Close fingers and attempt attachment.</td>
                <td>Attachment confirmed or timeout.</td>
                <td>Missed grasp attempts.</td>
              </tr>
              <tr>
                <td>LIFT_SOURCE</td>
                <td>Lift the object into a stable carry pose.</td>
                <td>Carry pose reached.</td>
                <td>Dragging or premature release.</td>
              </tr>
              <tr>
                <td>APPROACH_TARGET</td>
                <td>Navigate to the target table.</td>
                <td>Target stand waypoint reached.</td>
                <td>Mis-navigation and yaw drift.</td>
              </tr>
              <tr>
                <td>HOVER_TARGET</td>
                <td>Align the palm above the target surface.</td>
                <td>Palm distance inside hover window.</td>
                <td>Placement offset from misalignment.</td>
              </tr>
              <tr>
                <td>LOWER_TARGET</td>
                <td>Lower the object for release.</td>
                <td>Release-height window reached.</td>
                <td>Collision with the table surface.</td>
              </tr>
              <tr>
                <td>OPEN_GRIP</td>
                <td>Open the hand and detach the object.</td>
                <td>Grip open for the debounce period.</td>
                <td>Sticky attachment or delayed release.</td>
              </tr>
              <tr>
                <td>RETRACT</td>
                <td>Return the arm to a safe carry pose.</td>
                <td>Arm pose reset confirmed.</td>
                <td>Arm collisions after release.</td>
              </tr>
              <tr>
                <td>DONE</td>
                <td>Hold the final pose and stop commanding motion.</td>
                <td>Terminal state.</td>
                <td>Uncontrolled motion after success.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
    <script src="../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/implementation-deep-dive.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Implementation Deep Dive | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Implementation Deep Dive</p>
          <h1>Implementation Deep Dive</h1>
          <p class="subtitle">
            The full codebase, chunk by chunk. Each page breaks one source file into annotated sections with intent, invariants, and failure modes — then provides the complete HTML-escaped source in a collapsible appendix.
          </p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="./challenge.html">Challenge</a>
            <a href="./architecture.html">Architecture</a>
            <a href="./fsm-baseline.html">FSM Baseline</a>
            <a href="./visual-oracle.html">Visual Oracle</a>
            <a href="./lessons.html">Lessons</a>
            <a href="./results.html">Results</a>
            <a href="./implementation-deep-dive.html">Implementation</a>
            <a href="./limitations-next-steps.html">Limitations</a>
            <a href="./references.html">References</a>
          </div>
        </div>
      </nav>

    <main class="content post">
      <section>
        <h2>Implementation appendix</h2>
        <p>
          This appendix turns the Step 1–10 implementation snapshot into an audit-friendly code report.
          The intent is not to summarize the code loosely. The intent is to let a reviewer inspect the
          actual implementation without leaving the site.
        </p>
        <div class="code-note">
          <strong>Scope boundary</strong>
          <p>
            This appendix covers the implemented ground-truth FSM baseline only. The Visual Oracle remains
            architectural unless corresponding source files are actually added to the repository.
          </p>
        </div>
      </section>
    
      <section>
        <h2>How every code page should read</h2>
        <ol class="bullet-list">
          <li><strong>File overview:</strong> purpose, runtime role, and why the file matters.</li>
          <li><strong>Chunked walkthrough:</strong> original-order sections with anchors for direct linking.</li>
          <li><strong>Per-chunk notes:</strong> intent, inputs / outputs, invariants, subtle points, and failure modes.</li>
          <li><strong>Exact full source appendix:</strong> one HTML-escaped full-file block on the same page, represented exactly once.</li>
          <li><strong>Evidence note:</strong> which DEV_LOG milestones or tests make this file important.</li>
        </ol>
        <p class="small">
          Replace snippet-only tabbed narration with search-friendly anchored sections. Tabs are acceptable
          for a quick skim, but they should not be the only way the code is presented.
        </p>
      </section>
    
      <section>
        <h2>Reviewer reading order</h2>
        <table class="milestone-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Why open it</th>
              <th>Required chunk anchors</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="./code/run.html"><code>run.py</code></a></td>
              <td>Shows the orchestration boundary and policy-to-controller bridge.</td>
              <td><code>#imports</code>, <code>#setup</code>, <code>#policy-bridge</code>, <code>#sim-loop</code>, <code>#full-file</code></td>
            </tr>
            <tr>
              <td><a href="./code/common-controller.html"><code>common/controller.py</code></a></td>
              <td>Most important low-level file; encodes raw walker obs, always-on reacher, and PD output.</td>
              <td><code>#init</code>, <code>#mappings</code>, <code>#state-helpers</code>, <code>#step</code>, <code>#pd-control</code>, <code>#full-file</code></td>
            </tr>
            <tr>
              <td><a href="./code/common-grasp.html"><code>common/grasp.py</code></a></td>
              <td>Shows deterministic attach/release semantics and simulation shortcuts explicitly.</td>
              <td><code>#interface</code>, <code>#attach</code>, <code>#update-pose</code>, <code>#release</code>, <code>#full-file</code></td>
            </tr>
            <tr>
              <td><a href="./code/policies-fsm-core.html"><code>policies/fsm_core.py</code></a></td>
              <td>Main autonomous logic; every threshold, timeout, and target-side caveat lives here.</td>
              <td><code>#constants</code>, <code>#state-enum</code>, <code>#tick-dispatch</code>, <code>#geometry</code>, <code>#source-states</code>, <code>#target-states</code>, <code>#validation</code>, <code>#full-file</code></td>
            </tr>
            <tr>
              <td><a href="./code/policies-fsm.html"><code>policies/fsm.py</code></a></td>
              <td>Thin adapter that proves the FSM is isolated from the grasp backend implementation.</td>
              <td><code>#adapter</code>, <code>#grip-guard</code>, <code>#full-file</code></td>
            </tr>
            <tr>
              <td><a href="./code/scripts-smoke-env.html"><code>scripts/smoke_env.py</code></a></td>
              <td>Best reviewer-facing proof that environment assumptions were checked before FSM work started.</td>
              <td><code>#checks</code>, <code>#scene</code>, <code>#onnx</code>, <code>#summary</code>, <code>#full-file</code></td>
            </tr>
            <tr>
              <td><a href="./code/scripts-test-fsm-approach.html"><code>scripts/test_fsm_approach.py</code></a></td>
              <td>Headless task runner; essential for understanding what was verified versus visually inspected.</td>
              <td><code>#harness</code>, <code>#loop</code>, <code>#stop-conditions</code>, <code>#summary</code>, <code>#full-file</code></td>
            </tr>
          </tbody>
        </table>
      </section>
    
      <section>
        <h2>File manifest</h2>
        <div class="implementation-grid">
          <article class="directory-card">
            <span class="directory-label">Runtime</span>
            <h3><a href="./code/run.html">run.py</a></h3>
            <p>CLI, model loading, controller construction, policy selection, simulation loop, viewer loop.</p>
          </article>
    
          <article class="directory-card">
            <span class="directory-label">common/</span>
            <h3>Controller and grasp layers</h3>
            <ul class="bullet-list">
              <li><a href="./code/common-controller.html"><strong>controller.py</strong></a> — walker/reacher composition and final actuator targets</li>
              <li><a href="./code/common-grasp.html"><strong>grasp.py</strong></a> — kinematic attachment backend</li>
              <li><a href="./code/common-onnx-policy.html"><strong>onnx_policy.py</strong></a> — ONNX Runtime wrapper</li>
              <li><a href="./code/common-scene.html"><strong>scene.py</strong></a> — reset and camera helpers</li>
            </ul>
          </article>
    
          <article class="directory-card">
            <span class="directory-label">policies/</span>
            <h3>High-level decisions</h3>
            <ul class="bullet-list">
              <li><a href="./code/policies-base.html"><strong>base.py</strong></a> — policy contract and command packet</li>
              <li><a href="./code/policies-keyboard.html"><strong>keyboard.py</strong></a> — preserved manual path</li>
              <li><a href="./code/policies-fsm.html"><strong>fsm.py</strong></a> — adapter between runtime, FSM, and grasp backend</li>
              <li><a href="./code/policies-fsm-core.html"><strong>fsm_core.py</strong></a> — autonomous sequencing and geometry logic</li>
            </ul>
          </article>
    
          <article class="directory-card">
            <span class="directory-label">Validation</span>
            <h3>Reproducibility checks</h3>
            <ul class="bullet-list">
              <li><a href="./code/scripts-smoke-env.html"><strong>smoke_env.py</strong></a> — environment readiness</li>
              <li><a href="./code/scripts-test-fsm-approach.html"><strong>test_fsm_approach.py</strong></a> — headless integration harness</li>
              <li><a href="./code/dev-log.html"><strong>DEV_LOG.md</strong></a> — decision and evidence record</li>
            </ul>
          </article>
        </div>
      </section>
    
      <section>
        <h2>Required code-page contract</h2>
        <div class="code-note">
          <strong>Apply this to every <code>pages/code/*.html</code> file</strong>
          <p>
            Each page should contain one anchored table of contents, chunked explanations in original order,
            and one raw full-file appendix with the exact file contents HTML-escaped. Do not paraphrase or
            silently edit the source when rendering the appendix.
          </p>
        </div>
        <p class="small">
          If you only make one structural improvement to the code appendix, make it this one. It changes the
          site from “good walkthrough” to “auditable submission”.
        </p>
      </section>
    </main>


      <footer class="site-footer">
        <p>Lucky Robots G1 Pick-and-Place Case Study</p>
      </footer>
    </div>
    <script src="../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/lessons.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lessons | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Lessons</p>
          <h1>Key Engineering Lessons</h1>
          <p class="subtitle">The decisions, pitfalls, and insights that shaped the baseline.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="./challenge.html">Challenge</a>
            <a href="./architecture.html">Architecture</a>
            <a href="./fsm-baseline.html">FSM Baseline</a>
            <a href="./visual-oracle.html">Visual Oracle</a>
            <a href="./lessons.html">Lessons</a>
            <a href="./results.html">Results</a>
            <a href="./implementation-deep-dive.html">Implementation</a>
            <a href="./limitations-next-steps.html">Limitations</a>
            <a href="./references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content post">
        <section>
          <p>
            These lessons capture the key decisions and failure modes that emerged while converting
            the manual demo into a modular baseline.
          </p>
        </section>

        <section>
          <h2>Key Engineering Lessons</h2>
          <div class="callout-grid">
            <article class="callout callout--failure">
              <span class="callout-label">Failure Mode</span>
              <h3>The Normalization Trap</h3>
              <p>
                The walker ONNX policy already applied internal normalization. Adding external
                normalization double-normalized observations, destabilized the gait, and caused
                hard-to-trace drift.
              </p>
            </article>
            <article class="callout callout--decision">
              <span class="callout-label">Design Decision</span>
              <h3>The Always-On Reacher</h3>
              <p>
                The walker observes arm joint positions, so the right reacher had to run
                unconditionally. Keeping the arm in a known carry pose prevented
                out-of-distribution walking behavior.
              </p>
            </article>
            <article class="callout callout--limitation">
              <span class="callout-label">Limitation</span>
              <h3>The Reacher Accuracy Floor</h3>
              <p>
                The right reacher had a practical accuracy floor of ~12 cm. Grasp thresholds and
                timeout fallbacks were tuned around that floor instead of assuming perfect
                convergence.
              </p>
            </article>
            <article class="callout callout--evidence">
              <span class="callout-label">Evidence</span>
              <h3>The Asymptotic Turn-Rate Problem</h3>
              <p>
                Target-side navigation required empirical tuning because the walker’s effective
                angular response slowed as it aligned with the desired heading, stretching
                approach time.
              </p>
            </article>
            <article class="callout callout--failure">
              <span class="callout-label">Validation Bug</span>
              <h3>Target-Side False Positive</h3>
              <p>
                Early target-approach success checks relied only on reach-window distance. This
                produced false positives before the robot was correctly positioned. World proximity
                and yaw-alignment gating were added to prevent premature state transitions.
              </p>
            </article>
            <article class="callout callout--insight">
              <span class="callout-label">Key Insight</span>
              <h3>The Visual Oracle Freeze</h3>
              <p>
                The vision estimate is designed to be frozen during descent and close-grip phases to
                avoid self-occlusion jitter and preserve a consistent grasp target.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
    <script src="../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/limitations-next-steps.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Limitations and Next Steps | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Limitations</p>
          <h1>Limitations and Next Steps</h1>
          <p class="subtitle">Known gaps and follow-on work for the baseline stack.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="./challenge.html">Challenge</a>
            <a href="./architecture.html">Architecture</a>
            <a href="./fsm-baseline.html">FSM Baseline</a>
            <a href="./visual-oracle.html">Visual Oracle</a>
            <a href="./lessons.html">Lessons</a>
            <a href="./results.html">Results</a>
            <a href="./implementation-deep-dive.html">Implementation</a>
            <a href="./limitations-next-steps.html">Limitations</a>
            <a href="./references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content post">
        <section>
          <h2>Limitations</h2>
          <ul class="bullet-list">
            <li>The baseline is a debuggable modular controller, not a production-ready robotics stack.</li>
            <li>Kinematic grasping is a simulation shortcut that hides contact dynamics and finger forces.</li>
            <li>The Visual Oracle is an architectural design, not an implemented module in this submission.</li>
            <li>Target-side alignment relies on empirical threshold tuning, not closed-loop pose feedback.</li>
            <li>Post-DONE on-table validation is not implemented; placement success was confirmed by visual inspection of the simulation.</li>
            <li>The wrist camera is not exploited in the current baseline.</li>
            <li>Sim-to-real transfer has not been attempted and will require additional validation.</li>
          </ul>
        </section>

        <section>
          <h2>Next Steps</h2>
          <ul class="bullet-list">
            <li>Implement the Visual Oracle: RGB segmentation, depth back-projection, EMA smoothing, and freeze logic.</li>
            <li>Add post-DONE proximity checks to programmatically confirm on-table placement.</li>
            <li>Add contact-aware grasping with slip detection and physical release validation.</li>
            <li>Refine target-side navigation with closed-loop yaw and distance feedback.</li>
            <li>Apply domain randomization and sensor noise for robustness evaluation.</li>
            <li>Expand dashboards for timing, failure recovery, and pose drift metrics.</li>
          </ul>
        </section>
      </main>
    </div>
    <script src="../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/references.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>References | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">References</p>
          <h1>Sources and Supporting Links</h1>
          <p class="subtitle">Reference material for the baseline and its tooling.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="./challenge.html">Challenge</a>
            <a href="./architecture.html">Architecture</a>
            <a href="./fsm-baseline.html">FSM Baseline</a>
            <a href="./visual-oracle.html">Visual Oracle</a>
            <a href="./lessons.html">Lessons</a>
            <a href="./results.html">Results</a>
            <a href="./implementation-deep-dive.html">Implementation</a>
            <a href="./limitations-next-steps.html">Limitations</a>
            <a href="./references.html">References</a>
          </div>
        </div>
      </nav>

<main class="content post">
  <section>
    <h2>Submission artefacts to fill manually</h2>
    <div class="code-note">
      <strong>Replace these before submission</strong>
      <ul class="bullet-list">
        <li>Challenge repository: <a href="{{CHALLENGE_REPO_URL}}">{{CHALLENGE_REPO_URL}}</a></li>
        <li>Implementation repository: <a href="{{REPO_URL}}">{{REPO_URL}}</a></li>
        <li>Demo video: <a href="{{VIDEO_URL}}">{{VIDEO_URL}}</a></li>
        <li>Final PDF write-up: <a href="{{WRITEUP_URL}}">{{WRITEUP_URL}}</a></li>
      </ul>
    </div>
  </section>

  <section>
    <h2>Official tooling sources</h2>
    <ul class="bullet-list">
      <li><a href="https://mujoco.readthedocs.io/en/stable/">MuJoCo Documentation</a></li>
      <li><a href="https://mujoco.readthedocs.io/en/stable/programming/simulation.html">MuJoCo Simulation Programming Guide</a></li>
      <li><a href="https://onnxruntime.ai/docs/">ONNX Runtime Documentation</a></li>
      <li><a href="https://onnxruntime.ai/docs/api/python/api_summary.html">ONNX Runtime Python API Summary</a></li>
      <li><a href="https://www.unitree.com/g1/">Unitree G1 Official Product Page</a></li>
      <li><a href="https://support.unitree.com/home/en/G1_developer">Unitree G1 Developer Guide</a></li>
    </ul>
  </section>

  <section>
    <h2>Research appendix</h2>
    <table class="milestone-table">
      <thead>
        <tr>
          <th>Band</th>
          <th>Project / paper</th>
          <th>Why it matters for this repo</th>
          <th>How to position it in the blog</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Near-term</td>
          <td>SAM 2</td>
          <td>Promptable image/video segmentation for source-object masking from head or wrist camera streams.</td>
          <td>Use as the front end for a future perception stack; do not imply it is currently integrated.</td>
        </tr>
        <tr>
          <td>Near-term</td>
          <td>FoundationPose</td>
          <td>6D pose estimation and tracking of novel objects from CAD or a few reference images.</td>
          <td>Use as the cleanest path from segmented cylinder pixels to a world-frame grasp target.</td>
        </tr>
        <tr>
          <td>Near-term</td>
          <td>OpenVLA</td>
          <td>Open learned-policy baseline for comparing explicit FSM control against a VLA approach.</td>
          <td>Position as a comparison target or later-stage alternative, not a drop-in replacement today.</td>
        </tr>
        <tr>
          <td>Strategic</td>
          <td>GR00T N1 / N1.6</td>
          <td>Open humanoid foundation-model direction with reasoning + action framing.</td>
          <td>Use as horizon context for whole-body learned humanoid control.</td>
        </tr>
        <tr>
          <td>Strategic</td>
          <td>Helix 02</td>
          <td>Directional evidence that full-body pixel-to-action loco-manipulation is becoming practical.</td>
          <td>Use as industry context only; do not present company demos as proof for this repo.</td>
        </tr>
        <tr>
          <td>Strategic</td>
          <td>Human-to-robot transfer in VLAs</td>
          <td>Explains why camera data and human video can become valuable even before a full learned policy is deployed.</td>
          <td>Use in the future-work section to motivate data collection and camera logging.</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>Use of external visuals</h2>
    <p>
      Prefer official project hero images, schematic figures, or paper figures from the sources above.
      Add a one-line caption under every image explaining why it is relevant to this submission.
      Keep company demo visuals in a “strategic context” band, not in the evidence section for the
      implemented baseline.
    </p>
  </section>
</main>

    </div>
    <script src="../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/results.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Results | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Results</p>
          <h1>Simulation Milestones</h1>
          <p class="subtitle">What the autonomous baseline demonstrated in MuJoCo.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="./challenge.html">Challenge</a>
            <a href="./architecture.html">Architecture</a>
            <a href="./fsm-baseline.html">FSM Baseline</a>
            <a href="./visual-oracle.html">Visual Oracle</a>
            <a href="./lessons.html">Lessons</a>
            <a href="./results.html">Results</a>
            <a href="./implementation-deep-dive.html">Implementation</a>
            <a href="./limitations-next-steps.html">Limitations</a>
            <a href="./references.html">References</a>
          </div>
        </div>
      </nav>

<main class="content post">
  <section>
    <h2>Results summary</h2>
    <p>
      This page distinguishes four kinds of outcome: verified readiness checks, verified source-side
      and transport milestones, visually verified target-side placement, and future / proposed work.
      That distinction is deliberate. It reflects the actual evidence in the Step 1–10 development log.
    </p>

    <div class="evidence-legend">
      <div class="evidence-legend-item">
        <span class="status-badge status-verified">Verified</span>
        <span>Confirmed by headless script or logged development run.</span>
      </div>
      <div class="evidence-legend-item">
        <span class="status-badge status-visual">Visually verified</span>
        <span>Observed in reference MuJoCo playback, but not fully settled-and-checked programmatically.</span>
      </div>
      <div class="evidence-legend-item">
        <span class="status-badge status-future">Future / proposed</span>
        <span>Architectural extension or planned upgrade; not implemented in this submission.</span>
      </div>
    </div>
  </section>

  <section>
    <h2>What is proven</h2>
    <ul class="bullet-list">
      <li>Environment readiness: scene, cameras, bodies, sites, joints, and ONNX models loaded and warmed successfully.</li>
      <li>Source-side walk-in: the robot reached the source reach corridor and transitioned into hover.</li>
      <li>Hover and descend behaviour: the palm approached the object within the empirically reachable range.</li>
      <li>Kinematic grasp and source lift: attachment triggered at the practical reacher floor and the object left the source table.</li>
      <li>Target-side transport: the robot carried the attached cylinder while maintaining the carry pose.</li>
    </ul>
  </section>

  <section>
    <h2>What is visually verified</h2>
    <p>
      Final blue-table placement should be presented as visually successful in simulation, not as a fully
      verified end-state checker result. The development log records that the first target-side PASS was a
      false positive. A later run visually landed the cylinder on the blue table, but the DONE-time
      checker still observed the cylinder before full post-release settling.
    </p>
  </section>

  <section>
    <h2>What remains future / proposed</h2>
    <ul class="bullet-list">
      <li>Visual Oracle source localization integration</li>
      <li>Post-release settle-and-check validation</li>
      <li>Physical grasping instead of kinematic attachment</li>
      <li>Robustness across scene variation, noise, and hardware transfer</li>
    </ul>
  </section>

  <section>
    <h2>Milestone table</h2>
    <table class="milestone-table">
      <thead>
        <tr>
          <th>Milestone</th>
          <th>Status</th>
          <th>What is supported</th>
          <th>Caveat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Headless smoke test</td>
          <td><span class="status-badge status-verified">Verified</span></td>
          <td>Scene, camera names, body names, site names, joints, and ONNX warmups all passed.</td>
          <td>Validates environment readiness, not task success.</td>
        </tr>
        <tr>
          <td>Source approach</td>
          <td><span class="status-badge status-verified">Verified</span></td>
          <td>FSM reached <code>HOVER_SOURCE</code>; cylinder pelvis-frame position was logged inside the reach corridor.</td>
          <td>Ground-truth object pose was used for this baseline.</td>
        </tr>
        <tr>
          <td>Hover and descend</td>
          <td><span class="status-badge status-verified">Verified</span></td>
          <td>Hover threshold was met; descend timed out at the practical reacher floor of roughly 12–13 cm.</td>
          <td>That floor constrains source-side and target-side reach quality.</td>
        </tr>
        <tr>
          <td>Kinematic grasp</td>
          <td><span class="status-badge status-verified">Verified</span></td>
          <td>Attach fired at 0.128 m with a 0.030 m snap offset.</td>
          <td>Simulation shortcut, not contact-rich finger grasping.</td>
        </tr>
        <tr>
          <td>Source lift</td>
          <td><span class="status-badge status-verified">Verified</span></td>
          <td>The cylinder tracked the palm and cleared the source table.</td>
          <td>Lift completion depended on timeout fallback rather than ideal reacher convergence.</td>
        </tr>
        <tr>
          <td>Target transport</td>
          <td><span class="status-badge status-verified">Verified</span></td>
          <td>The robot transported the attached object while maintaining the carry pose.</td>
          <td>Target-side approach logic required several rounds of correction.</td>
        </tr>
        <tr>
          <td>Target release and placement</td>
          <td><span class="status-badge status-visual">Visually verified</span></td>
          <td>Later post-fix runs visually landed the cylinder on the blue table near the near edge.</td>
          <td>DONE-time table-membership was timing-sensitive; a post-settle check is still needed.</td>
        </tr>
        <tr>
          <td>Visual Oracle source localization</td>
          <td><span class="status-badge status-future">Future / proposed</span></td>
          <td>Architecture documented separately as a ground-truth replacement for source-side phases.</td>
          <td>Not implemented in the Step 1–10 baseline.</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>Failure analysis that should stay visible</h2>
    <div class="callout-grid">
      <article class="callout callout--failure">
        <span class="callout-label">False positive</span>
        <h3>Premature target-side success</h3>
        <p>
          Pelvis-frame reach-window logic allowed the FSM to stop walking while the world-frame robot
          pose was still wrong for the target table.
        </p>
      </article>

      <article class="callout callout--decision">
        <span class="callout-label">Correction</span>
        <h3>World proximity and yaw gating</h3>
        <p>
          The target-side stopping condition was hardened with world-frame waypoint distance and yaw
          alignment instead of relying only on pelvis-frame reach geometry.
        </p>
      </article>

      <article class="callout callout--limitation">
        <span class="callout-label">Remaining caveat</span>
        <h3>Post-release settle timing</h3>
        <p>
          A visually successful placement can still look false at the exact instant DONE is entered if the
          cylinder has not finished settling onto the table.
        </p>
      </article>
    </div>
  </section>

  <section>
    <h2>Reproducible figures</h2>

    <figure class="figure">
      <img
        src="../assets/fig-state-duration-timeline.svg"
        alt="FSM state-duration timeline generated from DEV_LOG values."
        loading="lazy"
      />
      <figcaption>
        Nominal full-pipeline state durations from the first fully specified Step 10 timing sequence.
        Caption this explicitly as a nominal logged run, not as the final fully validated placement run.
      </figcaption>
    </figure>

    <figure class="figure">
      <img
        src="../assets/fig-reacher-accuracy-floor.svg"
        alt="Measured palm-distance checkpoints showing the practical reacher floor."
        loading="lazy"
      />
      <figcaption>
        Palm-distance checkpoints from the source-side hover, descend, and close-grip sequence, showing
        why thresholds were tuned around a practical 12–13 cm floor.
      </figcaption>
    </figure>

    <figure class="figure">
      <img
        src="../assets/fig-attach-distance-threshold.svg"
        alt="Attach distance, threshold, and snap offset comparison."
        loading="lazy"
      />
      <figcaption>
        Kinematic grasp metrics: observed attach distance, attach threshold, and clamp-limited snap offset.
      </figcaption>
    </figure>

    <p class="small">
      Provenance: generate all three figures directly from DEV_LOG values. Do not keep decorative plots
      whose underlying time-series values are not available in the snapshot.
    </p>
  </section>
</main>

    </div>
    <script src="../script.js"></script>
  </body>
</html>
```

---

## FILE: `pages/visual-oracle.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Visual Oracle | Lucky Robots G1 Pick-and-Place</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="page">
      <header class="hero hero--subpage">
        <div class="hero-content">
          <p class="eyebrow">Visual Oracle</p>
          <h1>Deterministic Perception Loop</h1>
          <p class="subtitle">Depth back-projection and smoothing for source localization.</p>
        </div>
      </header>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-content">
          <span class="nav-title">Lucky Robots G1</span>
          <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="./challenge.html">Challenge</a>
            <a href="./architecture.html">Architecture</a>
            <a href="./fsm-baseline.html">FSM Baseline</a>
            <a href="./visual-oracle.html">Visual Oracle</a>
            <a href="./lessons.html">Lessons</a>
            <a href="./results.html">Results</a>
            <a href="./implementation-deep-dive.html">Implementation</a>
            <a href="./limitations-next-steps.html">Limitations</a>
            <a href="./references.html">References</a>
          </div>
        </div>
      </nav>

      <main class="content post">
        <section>
          <h2>Visual Oracle — architectural design</h2>
          <div class="code-note">
            <strong>Implementation status:</strong> The Visual Oracle pipeline below is a designed
            architectural target. The ground-truth FSM baseline (Steps 1–10) uses a direct
            ground-truth lookup for source localization. Visual Oracle implementation files
            (<code>policies/fsm_visual_oracle.py</code>, <code>vision/observer.py</code>,
            <code>vision/geometry.py</code>) are not part of this submission and are future work.
            This page documents the design so the extension path is clear.
          </div>
          <p>
            The baseline started with a ground-truth lookup to validate motion control. The Visual
            Oracle design replaces that lookup by estimating the cylinder pose from RGB segmentation
            and depth back-projection, then smoothing the estimate with an EMA.
          </p>
          <p>
            The estimator is designed to be lightweight and deterministic — not a learned detector.
            The pose would be frozen during descent and close-grip phases to avoid self-occlusion
            jitter and preserve a consistent grasp target.
          </p>
          <figure class="figure">
            <img
              src="../assets/visual-oracle.svg"
              alt="Visual Oracle pipeline diagram showing camera inputs, masking, back-projection, smoothing, freezing, and FSM target output."
              loading="lazy"
            />
            <figcaption>
              Designed Visual Oracle pipeline from camera input to EMA-smoothed and frozen target
              pose for source-side reaching. This is an architectural design; see implementation
              status note above.
            </figcaption>
          </figure>
        </section>

        <section>
          <h2>Why the freeze strategy matters</h2>
          <p>
            As the arm descends toward the cylinder, the wrist-mounted camera begins to occlude the
            object or move rapidly. Updating the EMA target during that window would shift the reacher
            goal mid-descent, causing instability. The design freezes the estimate once the FSM
            transitions into DESCEND_SOURCE, so the reacher tracks a fixed world-frame point through
            grasp closure.
          </p>
          <p>
            This tradeoff accepts a static pose during the last few centimeters in exchange for
            deterministic, jitter-free behavior in the close-grip window.
          </p>
        </section>
      </main>
    </div>
    <script src="../script.js"></script>
  </body>
</html>
```

---

## FILE: `script.js`

```javascript
if (document.body) {
  document.body.classList.add("js-enabled");
}

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));

if (navLinks.length) {
  const currentUrl = new URL(window.location.href);

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    const linkUrl = new URL(href, currentUrl);
    if (linkUrl.pathname === currentUrl.pathname) {
      link.classList.add("active");
    }
  });
}

document.querySelectorAll(".file-tabs").forEach((tabs) => {
  const buttons = tabs.querySelectorAll("[data-tab-target]");
  const panels = tabs.querySelectorAll("[data-tab-panel]");
  if (!buttons.length || !panels.length) {
    return;
  }

  const hasActiveButton = tabs.querySelector(".file-tab-button.active");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tabTarget;
      buttons.forEach((btn) => btn.classList.toggle("active", btn === button));
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.tabPanel === target);
      });
    });

    if (index === 0 && !hasActiveButton) {
      button.classList.add("active");
    }
  });

  if (!tabs.querySelector(".file-tab-panel.active") && panels.length) {
    panels[0].classList.add("active");
  }
});
```

---

## FILE: `style.css`

```css
:root {
  color-scheme: light;
  --bg: #f6f7fb;
  --surface: #ffffff;
  --ink: #161b22;
  --muted: #5f6b7a;
  --border: #e1e5ea;
  --accent: #1f6feb;
  --accent-soft: #e7f0ff;
  --callout: #f0f7f4;
  --code: #f2f4f7;
  --shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  font-size: 16px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.65;
}

.page {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #ffffff 0%, #eef3ff 100%);
  padding: 4rem 6vw 3rem;
  border-bottom: 1px solid var(--border);
}

.hero--subpage {
  padding: 2.5rem 6vw 2rem;
}

.hero--subpage h1 {
  font-size: clamp(1.8rem, 2.4vw, 2.6rem);
}

.hero--subpage .subtitle {
  margin-bottom: 0;
}

.hero-content {
  max-width: 980px;
  margin: 0 auto;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: var(--muted);
  margin-bottom: 0.8rem;
}

h1 {
  font-size: clamp(2.2rem, 3vw, 3.2rem);
  margin: 0 0 1rem;
}

.subtitle {
  color: var(--muted);
  font-size: 1.1rem;
  margin: 0 0 2rem;
}

.badge-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
}

.badge-list li {
  background: var(--accent-soft);
  color: var(--accent);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.top-nav {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 6vw;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
}

.nav-title {
  font-weight: 700;
  color: var(--ink);
  margin-right: 0.35rem;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-links a.active,
.nav-links a:hover {
  background: var(--accent-soft);
  color: var(--accent);
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 6vw 4rem;
}

.toc {
  position: sticky;
  top: 2rem;
  align-self: start;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: var(--shadow);
}

.toc-toggle {
  display: none;
  width: 100%;
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  font-weight: 600;
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

.toc-list a {
  text-decoration: none;
  color: var(--muted);
  font-size: 0.95rem;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;
}

.toc-list a.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.post {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 2rem;
  box-shadow: var(--shadow);
}

h2 {
  margin-top: 0;
  font-size: 1.6rem;
}

h3 {
  margin-top: 0;
}

.bullet-list {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--muted);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.card {
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.2rem;
  background: #fdfdfd;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.card-link:hover {
  border-color: var(--accent);
  box-shadow: 0 12px 24px rgba(31, 111, 235, 0.15);
  transform: translateY(-2px);
}

.card p {
  color: var(--muted);
}

.figure {
  margin-top: 1.5rem;
}

.figure img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #f8faff;
}

.figure figcaption {
  margin-top: 0.6rem;
  color: var(--muted);
  font-size: 0.95rem;
}

.code-block {
  background: var(--code);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  margin: 1.2rem 0;
  border: 1px solid var(--border);
  font-family: "SFMono-Regular", "Menlo", "Consolas", monospace;
  font-size: 0.9rem;
  color: #1f2937;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
  min-width: max-content;
}

.code-details {
  border: 1px solid var(--border);
  border-radius: 16px;
  background: #fdfdfd;
  overflow: hidden;
}

.code-details + .code-details {
  margin-top: 1rem;
}

.code-details summary {
  cursor: pointer;
  list-style: none;
  padding: 1rem 1.2rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  background: #f8f9fc;
  border-bottom: 1px solid var(--border);
}

.code-details summary::-webkit-details-marker {
  display: none;
}

.code-details summary span {
  font-weight: 700;
  color: var(--ink);
}

.code-details summary code {
  color: var(--accent);
  background: var(--accent-soft);
  padding: 0.2rem 0.45rem;
  border-radius: 8px;
  font-size: 0.8rem;
}

.code-details[open] summary {
  border-bottom: 1px solid var(--border);
}

.code-details > p,
.code-details > .code-block,
.code-details > .code-deep-notes,
.code-details > .mini-card-grid {
  margin-left: 1.2rem;
  margin-right: 1.2rem;
}

.code-details > p:first-of-type {
  margin-top: 1rem;
}

.code-deep-notes {
  background: #fbfcff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1.2rem;
}

.code-deep-notes h4 {
  margin: 0.8rem 0 0.25rem;
}

.code-deep-notes h4:first-child {
  margin-top: 0;
}

.code-deep-notes p {
  margin: 0 0 0.7rem;
  color: var(--muted);
}

.mini-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1.2rem;
}

.mini-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem;
  background: #ffffff;
}

.mini-card h4 {
  margin: 0 0 0.4rem;
}

.mini-card p {
  margin: 0;
  color: var(--muted);
}

.code-details .code-block pre {
  white-space: pre;
}

.code-walkthrough-grid {
  display: grid;
  gap: 1.4rem;
  margin-top: 1.5rem;
}

.code-card {
  border: 1px solid var(--border);
  border-radius: 16px;
  background: #fdfdfd;
  padding: 1.3rem;
}

.code-card-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.code-card-header h3 {
  margin: 0;
}

.code-card-meta {
  color: var(--muted);
  font-family: "SFMono-Regular", "Menlo", "Consolas", monospace;
  font-size: 0.85rem;
}

.code-card .code-block {
  margin: 1rem 0;
  overflow-x: auto;
}

.code-card .code-block pre {
  white-space: pre;
}

.code-explanation {
  color: var(--muted);
  margin-bottom: 0;
}

.code-note {
  border-left: 4px solid var(--accent);
  background: var(--accent-soft);
  padding: 0.8rem 1rem;
  border-radius: 10px;
  color: #1f3f75;
  margin-top: 1rem;
  font-size: 0.95rem;
}

.small {
  color: var(--muted);
  font-size: 0.95rem;
}

.callout-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.callout {
  border-radius: 16px;
  padding: 1.2rem 1.3rem;
  border: 1px solid;
  display: grid;
  gap: 0.6rem;
}

.callout-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
}

.callout p {
  color: var(--muted);
  margin: 0;
}

.callout h3 {
  margin: 0;
}

.callout--decision {
  background: #eef6ff;
  border-color: #cfe2ff;
}

.callout--decision .callout-label {
  color: #1d4ed8;
}

.callout--insight {
  background: #effaf2;
  border-color: #c9ebd4;
}

.callout--insight .callout-label {
  color: #15803d;
}

.callout--failure {
  background: #fff2f0;
  border-color: #ffd6cc;
}

.callout--failure .callout-label {
  color: #c2410c;
}

.callout--evidence {
  background: #fff8e6;
  border-color: #ffe0a3;
}

.callout--evidence .callout-label {
  color: #b45309;
}

.callout--limitation {
  background: #f6f4f8;
  border-color: #e2d7f1;
}

.callout--limitation .callout-label {
  color: #6d28d9;
}

.milestone-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.2rem;
  font-size: 0.95rem;
}

.milestone-table th,
.milestone-table td {
  border-bottom: 1px solid var(--border);
  padding: 0.8rem 0.6rem;
  text-align: left;
  vertical-align: top;
}

.milestone-table th {
  background: #f8f9fc;
  font-weight: 600;
}

.plot-placeholder {
  margin-top: 1.5rem;
}

.plot-frame {
  border: 2px dashed #c7d2fe;
  border-radius: 12px;
  padding: 1.4rem;
  color: #3f4c6b;
  background: #f8f9ff;
  font-weight: 600;
  text-align: center;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plot-placeholder figcaption {
  margin-top: 0.6rem;
  color: var(--muted);
  font-size: 0.95rem;
}

/* Evidence / claim-status legend badges */
.status-badge {
  display: inline-block;
  padding: 0.18rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  vertical-align: middle;
}

.status-verified {
  background: #effaf2;
  color: #15803d;
  border: 1px solid #c9ebd4;
}

.status-visual {
  background: #e7f0ff;
  color: #1d4ed8;
  border: 1px solid #cfe2ff;
}

.status-future {
  background: #f6f4f8;
  color: #6d28d9;
  border: 1px solid #e2d7f1;
}

.evidence-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0 0.5rem;
}

.evidence-legend-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  color: var(--muted);
}

/* Module status markers used in architecture cards */
.module-status {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0.1rem 0.45rem;
  border-radius: 6px;
  margin-left: 0.4rem;
  vertical-align: middle;
}

.module-status--impl {
  background: #effaf2;
  color: #15803d;
  border: 1px solid #c9ebd4;
}

.module-status--arch {
  background: #e7f0ff;
  color: #1d4ed8;
  border: 1px solid #cfe2ff;
}

.module-status--future {
  background: #f6f4f8;
  color: #6d28d9;
  border: 1px solid #e2d7f1;
}

@media (max-width: 900px) {
  .nav-title {
    flex-basis: 100%;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 3rem 6vw 2.5rem;
  }

  section {
    padding: 1.5rem;
  }
}

.implementation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.directory-card {
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.2rem;
  background: #fdfdfd;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.directory-card:hover {
  border-color: var(--accent);
  box-shadow: 0 12px 24px rgba(31, 111, 235, 0.15);
  transform: translateY(-2px);
}

.directory-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--muted);
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

.code-page-layout {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: start;
}

.code-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: sticky;
  top: 1.5rem;
}

.code-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.code-subnav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.8rem 1rem;
  box-shadow: var(--shadow);
}

.code-subnav a {
  text-decoration: none;
  color: var(--accent);
  font-weight: 600;
}

.breadcrumb {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.breadcrumb a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}

.file-tabs {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: var(--shadow);
}

.file-tab-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.file-tab-button {
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.file-tab-button.active {
  background: var(--accent-soft);
  color: var(--accent);
  border-color: var(--accent);
}

.file-tab-panel {
  display: block;
}

.js-enabled .file-tab-panel {
  display: none;
}

.file-tab-panel.active {
  display: block;
}

.code-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.6rem;
  box-shadow: var(--shadow);
}

.next-prev-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
}

@media (max-width: 900px) {
  .code-page-layout {
    grid-template-columns: 1fr;
  }

  .code-sidebar {
    position: static;
  }
}
```

