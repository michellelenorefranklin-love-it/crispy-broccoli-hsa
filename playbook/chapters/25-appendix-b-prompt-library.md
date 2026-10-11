# Appendix B. Prompt Library

These prompts assume the board is configured as in Appendix A. Replace bracketed placeholders and attach the current Client Change Context Brief first. Global ERP examples refer to the fictional client used throughout this playbook.

## Anatomy of a strong prompt

Most weak outputs trace back to a thin request. Check that your prompt names five things.

| Element | What to include | Example |
|---|---|---|
| Advisor or mode | Who should answer | "Act as the Operational Realist" |
| Task | The deliverable or question | "Propose go/no-go criteria" |
| Context | The Brief plus new facts | "Wave 1 covers [BU name] in [country]" |
| Audience | Who will read it | "For the steering committee" |
| Constraints | Length, format, what to avoid | "One page; label assumptions" |

## Prompts by operating mode

### Mode 1: Solo advisor

Use when: you need one expert to draft one deliverable.

```text
Act as the Change Impact Advisor and develop an impact assessment for a
global ERP implementation. Use the attached Context Brief. Label every
assumption and list the questions I must answer before this goes to the
client.
```

Use when: you want a fast first draft you will validate yourself.

```text
Act as the [advisor name]. Draft a [deliverable] for [audience] at the
[lifecycle stage] stage. Keep it to [length]. Use the standard response
format, and include only the sections that add value.
```

### Mode 2: Cross-functional

Use when: a problem spans two to four disciplines.

```text
Have the Stakeholder, Employee Experience, and Communications advisors
develop an engagement strategy for frontline employees. The Board Chair
combines the inputs and flags any conflicting assumptions.
```

### Mode 3: Board challenge

Use when: you are about to take a recommendation to a sponsor.

```text
Challenge my go-live readiness recommendation: strongest case for,
strongest case against, and the evidence that would resolve it.
My recommendation: [paste recommendation and supporting evidence].
```

Use when: you need to prepare for a hostile stakeholder question.

```text
Act as the Political Navigator. Play [stakeholder group] and raise the
three strongest objections to [proposal]. Then step out of role and tell
me how to respond to each, and what evidence would help.
```

### Mode 4: End-to-end engagement

Use when: you are starting an engagement and want a structured path.

```text
Guide me through the first 30 days of an OCM engagement. For each week,
name the lead advisors, deliverables, handoffs, and what I must validate
with real stakeholders before moving on.
```

## Prompts by lifecycle stage

### Discovery and assessment

Use when: you need a baseline view of stakeholders, impacts, and readiness.

```text
Have Advisors 1 to 5 each give me the three questions they most need
answered in discovery and the source for each. The Board Chair
consolidates them into one discovery interview guide.
```

### Strategy and design

Use when: you are turning discovery findings into an OCM strategy.

```text
Using our validated discovery findings [attach], have the Readiness,
Champion, Communications, Learning, and Analytics advisors draft their
strategy components. The Board Chair checks timelines and scope against
the Context Brief.
```

### Build and preparation

Use when: you are producing working artifacts for deployment.

```text
Act as the Grassroots Mobilizer, the Narrative Craftsman, and the
Learning Engineer. Produce a build checklist for wave [number]: assets
needed, approvers, and the latest ready date for each.
```

### Pilot and deployment

Use when: you are preparing a launch or scale-up decision.

```text
Have the Operational Realist and the Calm Incident Commander draft
go/no-go criteria for [wave or pilot]. Separate criteria needing
demonstrated evidence from those relying on reported status.
```

### Hypercare and sustained adoption

Use when: you are stabilizing after go-live and planning reinforcement.

```text
Act as the Calm Incident Commander and the Evidence-Based Investigator.
Using [hypercare data], classify issues as defects, knowledge gaps,
process failures, or access problems; recommend hypercare exit criteria
and the adoption indicators to track after exit.
```

## Follow-up and iteration prompts

### Scope change

```text
The Context Brief has changed: [describe change]. Board Chair: identify
every deliverable this affects and have each owning advisor update it
consistently. List what changed and why.
```

### Tighten for executives

```text
Rewrite this for [executive role] in under [number] words. Lead with the
recommendation and the decision required. Move detail to an appendix.
```

### Label assumptions

```text
Go back through your last response. Label every statement as FACT (from
me or the Context Brief), ASSUMPTION, or HYPOTHESIS. For each assumption,
tell me how to validate it and who could confirm it.
```

### Second opinion

```text
Have the [second advisor] review the [first advisor]'s output from their
discipline. Name what they would keep, what they would change, and any
risk the first advisor missed.
```

### Check consistency

```text
Board Chair: compare timeline, scope, audiences, and success measures
across [list deliverables]. Show each inconsistency in a table with the
deliverable, the conflicting assumption, and the recommended fix.
```

### Prepare for the conversation

```text
I am presenting this to [audience] on [date]. List the five questions
they are most likely to ask, a short answer to each based only on
validated facts, and where I should say "we do not know yet".
```

### Coach me

```text
Explain the reasoning behind your recommendation as you would to a
practitioner building their skills. What would an experienced specialist
look for that I might miss, and what question should I ask the sponsor?
```

> **Tip:** Save prompts that work into your own library, with the context in which each worked. That becomes a reusable asset in Phase 4 of the roadmap (see Chapter 23).
