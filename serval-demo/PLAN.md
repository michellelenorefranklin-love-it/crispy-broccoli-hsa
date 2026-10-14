# Build plan

## Repo inspection

The repository already holds an unrelated OCM playbook (`/playbook`) and a board-room demo (`/app`). To avoid disturbing them, this demo lives in its own folder, `serval-demo/`, with its own `package.json`. Nothing outside that folder is changed.

## Architecture

| Layer | Files | Notes |
|---|---|---|
| Config | `src/config/client.ts` | Client name, logo, workforce size: one place to change |
| Types | `src/types.ts` | All domain types from spec §6 |
| Mock data | `src/data/*.ts` | People, onboarding, access templates, support, governance, change, value, client statements |
| Shared state | `src/store/store.ts` | Zustand store, persisted to localStorage, with **Reset**. Cross-section actions: `submitAccess`, `decide`, `openIncident`, `updateWorkflow`, … |
| Assistant | `src/engine/assistant.ts` | Deterministic keyword → intent matcher; each reply carries reasoning strip, action class, behind-the-scenes data, and side effects through store actions |
| UI kit | `src/components/ui.tsx` | shadcn-style primitives (Card, Badge, Tabs, Drawer, Prov tag, You-told-us chip, …) |
| Shell | `src/components/Shell.tsx` | Banner, top bar, grouped nav, presenter notes, guided-demo bar, keyboard |
| Guided demo | `src/demo/script.ts` | 14 steps across 7 acts; per-screen presenter notes |
| Pages | `src/pages/*.tsx` | One per section, plus Current state and Decisions |

## Phases

1. Scaffold, tokens, shell, banner, provenance, presenter controls, config ✔
2. Typed mock data + shared store ✔
3. Employee Experience + assistant engine ✔
4. Onboarding, Access (approver personas), IT Support (console) ✔
5. Workflow & Governance Studio (Team Onboarding, builder, lanes) ✔
6. Change & Adoption (failure-mode simulator) ✔
7. Executive Value + Architecture ✔
8. Executive Demo Mode ✔
9. QA: every control, reset, 1280×800, keyboard, contrast, static build ✔

## Static build

`vite-plugin-singlefile` inlines all JS and CSS into `dist/index.html`. The page opens straight from disk (`file://`), with no server and no network. The hash router keeps deep links working from a file.
