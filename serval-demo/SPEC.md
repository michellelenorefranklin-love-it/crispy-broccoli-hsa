# SPEC — AI Employee Experience & Change Transformation Demo (Serval AI + ServiceNow)

Source of truth for the build, condensed from the brief supplied by the consulting team. Sections 1–4 are kept close to the original wording; 5–11 are summarized.

## 1. Purpose

Build an interactive, executive-ready proof of concept (POC) that a management consultant will present to a financial services client (~45,000 employees) that already runs ServiceNow and is planning to implement Serval AI.

The demo must tell one story:

> "AI transformation succeeds when technology, process, people, and governance evolve together."

It is not a chatbot demo. It follows one employee through onboarding, an access request, and an IT issue, then pulls back the curtain to show the workflow ownership, controls, change management, and value measurement behind each interaction.

Audiences in the room: executive sponsors, IT leadership, service desk leaders, HR, business process owners, identity & access management (IAM), security/risk/compliance, and the change team. Every screen should answer a question one of them would ask.

## 2. Product context (use this, don't invent beyond it)

Publicly described Serval capabilities — reflect these, and label everything else as conceptual:

- AI-native service management platform. Can run as a full ITSM platform or as an automation layer over ServiceNow with two-way sync.
- AI helpdesk agent for employees, available in channels like Microsoft Teams, Slack, email, and a web portal (can be embedded in a ServiceNow portal).
- Automation agent / workflow builder: admins describe workflows in natural language; Serval generates deterministic, testable, auditable workflows. Approvals, permissions, and access policies are embedded in each workflow/tool.
- Access management: just-in-time access, identity governance, user access reviews.
- Suggests new automations from historical ticket patterns.
- Expands from IT/Security into HR, Finance, Legal, Operations on the same platform.

Not known / must not be claimed: the client's ServiceNow configuration, APIs, or data; which Serval features the client will license; final integration architecture; client policies; real benefit numbers. All integrations are mocked.

Key strategic tension the demo should surface (not resolve): will Serval be an automation layer over ServiceNow (ServiceNow stays system of record) or progressively replace parts of ServiceNow? Build an "Integration model" toggle (Overlay ↔ Consolidated) in the architecture view that changes which system is shown as the system of record for tickets, catalog, and access — so the client can discuss both.

## 3. What the client has told us (must be visibly addressed)

| Client statement | Where the demo addresses it |
|---|---|
| Defining what teams need to do their job | Team Onboarding flow (§7.5) — needs-definition step |
| Looking at access levels | Access & Permissions (§7.3) + role/permission matrix (§7.5) |
| What does the process look like | Workflow lifecycle + "behind the scenes" panels on every journey |
| Each team will have access to build their own workflows | Federated Workflow Studio (§7.5) |
| Defining what our action items look like | Discussion screen: decisions, owners, next steps (§8, Act 7) |
| Developing comms sent to teams | Communications Center (§7.6D) |
| When people get on the platform — what role they will have | Role catalog + role assignment in Team Onboarding |
| Onboarding for teams | Team Onboarding flow — a first-class use case, not a footnote |
| Limiting the bottlenecks | Proportionate review lanes + bottleneck view (§7.5) |
| Governance largely owned by process teams | Federated model: process owners own business rules; central team owns guardrails |
| Business value functionality exists within the tool | Executive Value Dashboard (§7.7), framed as "measured in-platform, validated by the business" |

Add a small "You told us" chip on relevant screens linking each feature back to the statement above.

## 4. Non-negotiables

- Runs fully offline. No API keys, no backend, no external calls. Deterministic scripted assistant responses. Also produce a static build (`npm run build` → `dist/`) that can be opened/served locally.
- Persistent "Simulated environment — illustrative only" banner.
- Every capability carries a provenance tag: Publicly described, Conceptual, or Needs validation. A global toggle shows/hides these tags.
- AI never bypasses controls in the demo. No simulated path skips an approval, identity check, policy check, or audit event. Editable settings can tighten controls; they cannot make a high-risk action run unreviewed.
- All data fictional. Client is "the Client" by default; client name and logo configurable in `src/config/client.ts`.
- No dead buttons.
- Every number labeled illustrative. No reduced-ticket-volume → headcount conversion.

## 5. Tech stack

React + TypeScript + Vite + Tailwind CSS + Lucide icons; shadcn/ui-style components copied in; Recharts; Zustand; React Router (hash router). Premium enterprise SaaS design: navy/slate/white, one restrained accent, generous whitespace, optimized for 1440×900 and 1280×800.

Presenter features: Reset demo; keyboard →/← advance/rewind guided demo, Esc exits, P toggles presenter notes; presenter notes drawer per screen; font-size bump control.

## 6. Shared scenario & data

Persona: Jordan Taylor — Financial Analyst, Corporate Finance, New York. Manager: Alex Morgan. New hire, day 3. Supporting cast (fictional): Priya Shah (Service Desk Analyst), Marcus Lee (IAM Lead), Dana Brooks (FinReport app owner), Sam Rivera (HR Ops workflow builder), Elena Novak (AI Governance Lead), Chris Okafor (Exec Sponsor, CIO). Mock systems: ServiceNow, HRIS, identity provider, FinReport, VPN, LMS. Actions in one section must update others.

## 7. Sections

Employee Experience · Onboarding · Access & Permissions · IT Support · Workflow & Governance · Change & Adoption · Executive Value · Architecture, plus a top-bar "Start Executive Demo" button. (Full section detail as supplied in the original brief: assistant with reasoning strip, action badges and behind-the-scenes panel; onboarding timeline with change support; access flow with three scenarios, decision summary, approver persona switching, AI/automated/human split, configurable rules, who-changes-how; IT support VPN/password/high-risk plus service desk console; federated model, roles matrix, Team Onboarding, workflow builder, risk tiers, review lanes and bottleneck radar, lifecycle; change workstreams, impact heatmap, employee change journey, change early and often, communications center, learning center, failure-mode simulator; executive metrics, benefits model, balancing metrics, benefits realization; layered architecture with integration model toggle and questions to validate.)

## 8. Executive Demo Mode (8–12 minutes)

1. The current-state problem (hypotheses to validate) · 2. Future-state experience · 3. Controlled access (Standard, then Blocked SoD) · 4. IT support (VPN, then high-risk to Security) · 5. Behind the scenes (Workflow Studio, Team Onboarding glimpse) · 6. The human change journey (failure-mode simulator, comms, learning) · 7. Value, risk, and decisions (value dashboard → discussion screen).

## 9. Responsible AI behaviors to script

Insufficient information · conflicting policies · unauthorized access request · workflow failure · possibly outdated knowledge · "talk to a human" · sensitive/high-risk request. Footer note: final policy decisions, regulatory interpretation, control design, and risk acceptance remain with authorized Client stakeholders.

## 10–11. Build sequence and definition of done

Commit after each phase; run build + typecheck + lint each time. Deliverables: README.md, DEMO_SCRIPT.md, ASSUMPTIONS.md, VALIDATION_QUESTIONS.md, PILOT_NEXT_STEPS.md.
