# 19. Use Case: The First 30 Days of a Global ERP Program

This chapter turns the Mode 4 prompt, "Guide me through the first 30 days of an OCM engagement," into a week-by-week plan. The client and every number here are fictional and illustrative.

## The scenario

You are the new OCM lead on a global ERP implementation for a fictional enterprise, across multiple business units and countries, with a phased deployment and wave dates to be confirmed. The known challenge is limited visibility into impacts, readiness, and stakeholder concerns. Your priority is OCM strategy and baseline assessments, and your role is human in the loop: you frame, validate, decide, and deliver.

The month has one milestone: **the OCM strategy and baselines are ready for client review.**

> **Watch out:** Week boundaries are illustrative, not a fixed method. Use the sequence and handoffs; flex the calendar.

## The 30-day plan at a glance

| Weeks | Phase | Lead advisors | Core outputs |
|---|---|---|---|
| 1–2 | Understand | 1 Vision, 2 Stakeholder, 3 Experience | Case for change and WIIFM; stakeholder map; illustrative personas |
| 2–3 | Assess | 4 Readiness, 5 Impact | Impact assessment and risk register; readiness framework and baseline |
| 3–4 | Plan | 6 Champions, 7 Comms, 8 Learning, 10 Analytics | Champion network; communications and training strategies; adoption measurement framework |
| End of week 4 | Milestone | Board Chair | Strategy and baselines ready for client review |

The Board Chair coordinates throughout; call any advisor, such as Advisor 9, whenever a concern arises.

Two handoffs hold the plan together:

- **Change Impact feeds Training and Readiness** (Advisor 5 to Advisors 8 and 4).
- **Stakeholder personas feed Communications** (Advisors 2 and 3 to Advisor 7).

## Before day one: set up the board

1. **Start the Client Change Context Brief** (v0.1); mark unknowns and assumptions (see Chapter 5).
2. **Load the Board Operating Charter and the nine-section response format.**
3. **Confirm your data and anonymization rules** (see Chapter 22).
4. **Open an assumption log** with an owner and confirm-or-retire date per assumption.

```text
Act as the Board Chair. Guide me through the first 30 days of an OCM
engagement on a phased global ERP program. Context Brief v0.1: [paste].
For each week, give the advisors, mode, inputs I must bring, expected
outputs, and validation points. Label every assumption.
```

## Week 1: Understand the case and the people

**Lead advisors:** 1 Change Vision & Business Value Strategist, 2 Stakeholder Intelligence & Engagement Strategist, 3 Employee Experience & Change Journey Designer. **Modes:** solo for first drafts; cross-functional for the joint view.

### What you bring

Anonymized program charter, business case extracts, and steering papers; the units, countries, and functions in scope; and notes from early sponsor conversations.

### Activities and prompts

Run each advisor solo using its source prompt, with explicit challenge:

```text
Act as the Change Vision & Business Value Strategist. Draft a case for
change for our global ERP program and challenge any benefit we cannot yet
evidence. Use only the materials below. For each benefit, state whether it
is evidenced, assumed, or missing, and propose the baseline, target, and
owner needed to prove it. Add provisional WIIFM statements for [groups].
```

For Advisor 2, use "Build a stakeholder map for the ERP program and flag where sponsor alignment looks weakest," segmented by impact, influence, support, and resistance, with no motives inferred without evidence. For Advisor 3, use "Create three illustrative personas for ERP end users and map their journey from awareness to sustained use," and ask it to label every trait as a hypothesis and say which to validate first.

### Outputs by end of week 1

Case for change v0.1 with evidence status per benefit and provisional WIIFM; stakeholder map v0.1; three illustrative personas; updated assumption log.

### Human validation checkpoint 1

This is workflow step 4: you validate with real data.

- [ ] Confirm with the sponsor which benefits they own.
- [ ] Review the stakeholder map with the program lead: who is missing or mislabeled?
- [ ] Test persona hypotheses in [number] conversations with real employees.
- [ ] Update the Context Brief to v0.2.

> **Tip:** Never share the raw stakeholder map with the client. Share the engagement approach, not the political analysis.

## Week 2: Finish understanding, start assessing

**Lead advisors:** 2 and 3 (refine), 5 Change Impact, Risk & Mitigation Architect, 4 Business Readiness & Operational Transition Expert. **Modes:** cross-functional for audiences; solo for impact and readiness.

### Activities and prompts

**Reconcile stakeholders and personas (Advisors 2 and 3).** This produces the audience structure Communications will use.

Ask them to merge stakeholder map v0.2 and persona set v0.2 into one segmentation, noting disagreements, flagging underserved segments, and making each segment's needs explicit.

**Start the impact assessment (Advisor 5)** with the best-documented function, often finance. Use the source prompt, "Draft an impact assessment for the finance function in a global ERP rollout, with a starter risk register," and ask it to keep impacts, risks, and issues distinct and mark every rating provisional.

**Frame readiness (Advisor 4)** now, so criteria are ready when impacts are known. Use "Design a readiness assessment for a phased global rollout and propose go/no-go criteria," working by business unit, country, and wave, and ask what evidence each criterion requires.

### Outputs by end of week 2

Unified audience segmentation; impact assessment v0.1 with starter risk register; readiness framework draft (criteria, scale, thresholds, cadence).

### Human validation checkpoint 2

- [ ] Validate impact ratings with a process owner per function.
- [ ] Confirm risks and issues are separate and each risk has a client owner.
- [ ] Check readiness criteria are observable, not opinion-based.
- [ ] Update the Context Brief to v0.3, confirming the shared deployment assumption.

> **Watch out:** This is where incoherence creeps in. If Advisor 4 assumes three waves over twelve months and Advisor 1's narrative still says "one global go-live," fix the Context Brief and re-issue it to every advisor.

## Week 3: Complete the assessment, start planning

**Lead advisors:** 5 and 4 (complete), then 6 Change Champion & Local Mobilization Strategist and 8 Learning Strategy & Capability Development Architect.

### Handoff 1: Change Impact to Training and Readiness

Make this handoff explicit, in one prompt, so each training need and readiness criterion traces to a specific impact.

```text
Have the Change Impact, Risk & Mitigation Architect hand off impact
assessment v0.3 to the Learning and Readiness advisors. Learning: run a
training needs analysis for ERP finance users and outline a
train-the-trainer approach. Readiness: map each high-rated impact to a
readiness criterion and baseline measure. Show a table: impact ID, role,
training need, readiness criterion. Flag impacts with no response.
```

| Impact ID | Affected role | Training need | Readiness criterion |
|---|---|---|---|
| *Illustrative:* FIN-03 | Accounts payable clerk | Three-way match in new system | Supervised match completed on test data |
| *Illustrative:* FIN-07 | Regional controller | New close calendar and approvals | Mock close run within [threshold] |

### Readiness baseline

Ask Advisor 4 for a baseline plan: who is assessed, how, and when. The board designs the instrument; you collect the evidence.

### Champion network (Advisor 6)

Use the source prompt, "Recommend a champion network model for a multi-country rollout and justify how you sized it," with the audience segmentation attached. Ask it to state the assumed time commitment, flag overload, and avoid any universal ratio.

### Outputs by end of week 3

Impact assessment v0.3 with risk register and mitigation tracker; training needs analysis and train-the-trainer outline; readiness baseline plan; champion network draft.

### Human validation checkpoint 3

- [ ] Confirm traceability with the client training lead and a readiness owner.
- [ ] Test champion time commitments with line managers in one country or more.
- [ ] Check every high-rated impact has a response and owner.

## Week 4: Plan and prepare for client review

**Lead advisors:** 7 Strategic Communications & Narrative Architect, 8 (finalize), 10 Adoption Analytics & Change Insights Strategist, then the Board Chair. **Modes:** cross-functional, board challenge, Board Chair synthesis.

### Handoff 2: Personas to Communications

Ask Advisor 7 to use the unified segmentation and personas to draft a communications strategy and 90-day messaging matrix: audience, sender, channel, timing, call to action, and measure for each item, in a provisional voice, coordinated with Advisor 6 and flagging message saturation.

### Adoption measurement framework (Advisor 10)

Ask for leading and lagging indicators linked to the case-for-change success measures and readiness criteria. For each metric: what it measures, how it is calculated, its limits, and the action it triggers. Every baseline stays "to be collected" unless you supplied real data.

### Board challenge

Run Mode 3 on the whole package: strongest case that it is ready for client review, strongest case against, the evidence that resolves it, and a check that every deliverable uses Context Brief v0.4.

### Board Chair synthesis

```text
Act as the Board Chair. Synthesize all advisor outputs into one OCM
strategy summary for client review. Resolve conflicts between advisors and
show how. List the sponsor decisions needed, with options and a
recommendation for each. Separate confirmed facts from assumptions.
```

### Outputs by end of week 4

Communications strategy and messaging matrix; learning strategy; adoption measurement framework; integrated strategy summary and decision list; Context Brief v0.4.

### Human validation checkpoint 4

- [ ] Read every deliverable yourself; you own what goes to the client.
- [ ] Remove sensitive content, such as raw stakeholder positions.
- [ ] Confirm every figure, baseline, and commitment has a source.
- [ ] Pre-wire key decisions with the sponsor.

## Handoff and validation summary

| Week | From | To | What you validate |
|---|---|---|---|
| 1 | Advisors 1–3 | You | Benefits, stakeholder positions, personas |
| 2 | Advisors 2–5 | Advisor 7; you | Segments, impact ratings, criteria |
| 3 | Advisor 5 | Advisors 8, 4 | Traceability, champion load |
| 4 | All, Board Chair | You | Coherence, decisions, sources |

## End-of-month milestone review

Run the milestone as a working session, not a document readout.

### Suggested agenda (90 minutes, adjust to your client)

| Time | Item | Owner | Purpose |
|---|---|---|---|
| 10 min | Objectives and changes since kickoff | OCM lead | Confirm scope |
| 30 min | Case for change, stakeholders, and audiences | OCM lead with sponsor | Confirm the why and sponsor roles |
| 25 min | Impacts, top risks, readiness framework | OCM lead with process owners | Confirm what changes and mitigation owners |
| 15 min | Champions, comms, training, measurement | OCM lead | Confirm approach and resourcing asks |
| 10 min | Decisions required and next 30 days | Sponsor | Make or schedule each decision |

### Decisions to request (examples)

- Approve the case for change and success-measure owners.
- Approve readiness criteria, baseline collection, and champion time commitments.
- Confirm sponsor roles and wave assumptions by [date].

> **Example:** If wave dates are unconfirmed, present an explicit assumption, such as "illustrative: three waves over [number] months," and ask the sponsor to confirm or replace it by [date].

## After the review: feed the loop

The workflow's feedback loop returns new learning to the Context Brief:

1. Record decisions and changes in the Brief; increment the version.
2. Re-issue it; affected advisors update outputs consistently.
3. Retire or confirm logged assumptions.
4. Plan the next 30 days, typically detailed design and build and preparation.

```text
Act as the Board Chair. Here is Context Brief v1.0, updated after the
milestone review with decisions and requested changes. Identify affected
deliverables, ask each responsible advisor to update consistently, and
propose the plan for the next 30 days.
```
