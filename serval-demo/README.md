# Future of Work | AI Employee Experience — Serval AI + ServiceNow demo

An interactive, offline proof of concept for an executive workshop with a financial services client (~45,000 employees) that runs ServiceNow and plans to implement Serval AI.

> **AI transformation succeeds when technology, process, people, and governance evolve together.**

The demo follows one fictional employee, Jordan Taylor (Financial Analyst, day 3), through onboarding, an access request, and an IT issue. It then shows what sits behind each interaction: workflow ownership, controls, change management, and value measurement.

**Everything is simulated.** No API keys, no backend, no network calls. All people and data are fictional and every number is illustrative.

## Quick start

Requires Node 18+.

```sh
cd serval-demo
npm install
npm run dev          # http://localhost:5173
```

## Present without a network (static build)

```sh
npm run build        # typecheck + build → dist/index.html (one self-contained file)
```

Then either:

- **double-click `dist/index.html`**: it opens from disk with no server, or
- `npm run preview` → http://localhost:4173

Copy `dist/index.html` to a USB stick as a fallback. It needs nothing else.

## Other commands

| Command | What it does |
|---|---|
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run build` | Typecheck + static single-file build |

## Presenting

| Control | Where | What it does |
|---|---|---|
| **Start Executive Demo** | Top bar | Guided 14-step, 7-act walkthrough (~10 min). Each step can run its own action (e.g. "Ask 'Help me get started'") |
| **→ / ←** | Keyboard (in guided demo) | Next / previous step |
| **Esc** | Keyboard | Exit the guided demo (closes a drawer first if one is open) |
| **P** | Keyboard | Toggle presenter notes (talking points + the client question each screen answers) |
| **A− / A+** | Top bar | Text size for large rooms (90–140%) |
| **Provenance on/off** | Top bar | Show or hide *Publicly described / Conceptual / Needs validation* tags |
| **Reset demo** | Top bar (click twice) | Restores all seeded data. Use it before every session |

State persists in the browser (localStorage), so an accidental refresh keeps the story. Reset clears it.

See **[DEMO_SCRIPT.md](DEMO_SCRIPT.md)** for the click-by-click talk track.

## Customise for a client

Edit **`src/config/client.ts`**: client name (default "the Client"), short wordmark, optional logo (`logoUrl`, a data URI or a file under `public/`), and workforce size. Only use a client's name or logo with their approval.

## What's inside

| Section | Highlights |
|---|---|
| Employee Experience | Scripted assistant with reasoning strip, action badges (Inform / Recommend / Initiate workflow / Execute approved action), "Behind the scenes" panel, live requests, all seven responsible-AI behaviours |
| Onboarding | Nine-step timeline with owners, controls, and change interventions; bottleneck flag; change support per stage |
| Access & Permissions | Standard / Elevated / Blocked (SoD) scenarios; live approvals as Alex, Dana, or Marcus (Teams-style card); audit trail; rules you can tighten but not loosen |
| IT Support | VPN (resolve or escalate on workflow failure), password (MFA gate), possible compromise (P1 to Security); Priya's service desk console |
| Workflow & Governance | Federated model, roles matrix, **Team Onboarding** (HR Ops, end to end), NL workflow builder, risk tiers, review lanes + bottleneck radar, lifecycle |
| Change & Adoption | Six workstreams, editable impact heatmap, employee change journey, change early and often, comms center, learning center, failure-mode simulator |
| Executive Value | Live session metrics, paired balancing metrics, editable benefits model with visible formulas (no headcount conversion), benefits realization |
| Architecture | Layered diagram, Overlay ↔ Consolidated toggle, questions to validate |
| Current state / Decisions | Act 1 hypotheses; Act 7 decisions, assumptions, discovery questions, and pilot steps with owners |

## Project docs

- [SPEC.md](SPEC.md): build brief
- [PLAN.md](PLAN.md): architecture and build phases
- [DEMO_SCRIPT.md](DEMO_SCRIPT.md): 10-minute talk track
- [ASSUMPTIONS.md](ASSUMPTIONS.md): assumptions and known limitations
- [VALIDATION_QUESTIONS.md](VALIDATION_QUESTIONS.md): questions for the Client, Serval, and the ServiceNow platform team
- [PILOT_NEXT_STEPS.md](PILOT_NEXT_STEPS.md): path from POC to a controlled pilot

## Code map

```
src/
  config/client.ts      client name/logo (one place)
  types.ts              domain types
  data/                 fictional seed data
  store/store.ts        shared state + cross-section actions (Zustand)
  engine/assistant.ts   deterministic scripted assistant
  components/           UI kit, shell, assistant panel
  demo/script.ts        guided demo steps + presenter notes
  pages/                one file (or folder) per section
```
