# Assumptions and known limitations

This is a proof of concept for discussion. Every assumption below is reversible and should be confirmed in discovery.

## Build assumptions

| # | Assumption | Why | How to change |
|---|---|---|---|
| B1 | The demo lives in `serval-demo/` rather than the repo root. | The repo already holds an unrelated playbook and app; the spec assumed an empty repo. | Move the folder; nothing depends on its location. |
| B2 | The static build is one self-contained HTML file (`dist/index.html`). | Browsers block ES-module scripts on `file://`; inlining avoids that so the file opens with a double-click. | Remove `viteSingleFile()` from `vite.config.ts` for a normal multi-file build. |
| B3 | State is kept in the browser's localStorage so a page refresh doesn't lose the story. | Presenters refresh by accident. | **Reset demo** in the top bar restores all seeded data. |
| B4 | The assistant is scripted: keyword matching picks the nearest intent. | No API keys or network allowed; behaviour must be identical every run. | Add intents in `src/engine/assistant.ts`. |
| B5 | "Microsoft Teams" appears as a channel indicator and one Teams-style approval card. | Spec asks for portal plus one Teams mock. | — |
| B6 | Demo clock starts at 09:12 on Jordan's day 3 and advances one minute per event. | Gives the audit trail believable, deterministic timestamps. | `clock` in the store. |
| B7 | Client name is "the Client". | Default in spec. | `src/config/client.ts` (`name`, `displayName`, `shortName`, `logoUrl`). |

## Scenario assumptions (fictional, for illustration)

- Jordan's role (Financial Analyst, Corporate Finance) is birthright-eligible for FinReport read-only with manager approval.
- Journal posting is privileged: manager + app owner + IAM, time-bound (30-day just-in-time window by default).
- Journal posting plus payment release is a segregation-of-duties conflict; payment release is restricted to Treasury Operations.
- Three risk tiers (Low / Medium / High) and three review lanes (Fast / Standard / Enhanced). These are illustrative; they must be mapped to the Client's risk taxonomy.
- Policy floors: manager approval on all access, IAM review on privileged access, SoD blocking, provisioning only after approvals, and full audit. The demo lets you tighten rules, never loosen these.
- Federated operating model with three rings (central platform & AI governance, process owners, team builders). This is a proposed model for discussion.

## What the demo does not claim

- Anything about the Client's ServiceNow configuration, APIs, data, or customisations.
- Which Serval features the Client will license, or how they will be configured.
- A final integration architecture. The Overlay ↔ Consolidated toggle is there to surface the decision, not answer it.
- Any Client policy, control design, or regulatory interpretation.
- Any measured benefit. All metrics, cycle times, volumes, and savings are illustrative.

## Provenance tags

- **Publicly described**: a capability Serval or ServiceNow describes publicly (e.g. AI helpdesk agent in Teams/Slack/email/portal; automation layer over ServiceNow with two-way sync; natural-language workflow builder producing deterministic, auditable workflows; just-in-time access, identity governance, access reviews; automation suggestions from ticket history). Not verified in the Client's environment.
- **Conceptual**: a plausible future state shown for discussion.
- **Needs validation**: requires Client or vendor confirmation before it can be treated as design.

## Known limitations

- The assistant understands a fixed set of intents. Unmatched questions get an honest "I'd rather not guess; I can route that to a person".
- Integrations, provisioning, MFA, diagnostics, and incident creation are simulated. No real system is touched.
- The layout is optimised for 1280×800 and 1440×900 and works on tablets; it is not designed for phones.
- Edits to comms, impacts, and workflows persist in localStorage only. They are not exported anywhere except via copy-to-clipboard.
- Some decision-screen statuses (Open / Agreed / Parked) are held only for the current page visit.
