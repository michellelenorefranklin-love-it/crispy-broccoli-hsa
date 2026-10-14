# From POC to a controlled pilot

A recommended path. Timings are indicative and depend on the Client's decisions and governance cadence.

## 0. Before leaving the room (today)

- Agree owners for the five decisions on the Decisions screen (integration model, scope, AI decision boundaries, federated governance, channel retirement).
- Name an executive sponsor and a day-to-day lead.
- Confirm who joins discovery: service management, IAM, HR Ops, a process owner, risk, and the change lead.

## 1. Discovery (≈ 2–3 weeks)

- **Baselines:** resolution time, access-request cycle time, onboarding delays, satisfaction, repeat incidents, plus volume by category from ServiceNow history.
- **Current-state journeys:** validate (or disprove) the hypotheses on the Current State screen with real employees.
- **Stakeholder map and impact assessment:** start from the demo heatmap; add knowledge and content owners.
- **Technical validation with Serval and the ServiceNow platform team:** integration model, connectors, two-way sync, audit export, data handling.
- **Decision rights:** draft who may build, approve, deploy, and own each workflow.
- **Exit:** use cases, baselines, and pilot scope agreed.

## 2. Design (≈ 3–4 weeks)

- Co-design the future employee journey with representative users.
- Map the three illustrative risk tiers to the Client's taxonomy; set policy floors and review-lane SLAs.
- Define roles: requester, team workflow builder, process owner, platform admin, security/risk approver, AI governance lead.
- Draft comms and learning paths from the demo's starting drafts. Plan the builder certification.
- **Exit:** operating model approved for the pilot; control design reviewed by Risk.

## 3. Build and test (≈ 4–6 weeks)

- Configure 3–5 pilot workflows, e.g. FinReport read-only access, VPN troubleshooting, onboarding orchestration, one HR Ops workflow.
- Onboard HR Operations as the first federated builder team. Use the Team Onboarding flow as the checklist.
- Test controls as well as functionality: approvals, SoD blocks, identity verification, escalation, audit evidence.
- Run user acceptance and change-readiness checks; recruit champions.
- **Exit:** control and UX tests passed; every workflow has a named owner.

## 4. Controlled pilot (≈ 8–12 weeks)

- **Population:** one business unit (e.g. Corporate Finance, a few hundred people) plus new hires in that unit.
- **Channels:** Teams and portal; existing channels stay open during the pilot.
- **Measures:** adoption, self-service completion, access cycle time, onboarding task completion. Each is paired with its balancing metric: repeat incidents, resolution quality, satisfaction, control exceptions.
- **Cadence:** weekly pilot review and fortnightly steering update. Hypercare from the service desk.
- **Exit:** targets met without control regressions; go / adjust / stop decision.

## 5. Scale decision

- Wave plan by business unit and use case.
- Channel retirement plan.
- Next federated teams (Finance Ops, Legal, Procurement).
- Benefits realization report signed off by the business owners.

## Risks to manage from day one

| Risk | Mitigation |
|---|---|
| The workflow works technically but people keep using old routes | Manager briefings, champion network, channel plan, workaround monitoring |
| Bottlenecks move into Security/Risk review | Proportionate lanes, pre-approved patterns, review SLAs |
| Workflows without owners | Ownership as a release gate; 90-day reviews |
| Over-claiming value | Baselines first; balancing metrics; business validation; no headcount conversion |
| Trust erodes after an early AI error | Visible "talk to a human"; feedback loop; fast fixes during hypercare |
