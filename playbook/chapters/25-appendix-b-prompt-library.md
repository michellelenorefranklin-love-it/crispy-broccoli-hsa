# Appendix B. Prompt Library

These prompts work with the board configured as described in Appendix A. Replace bracketed placeholders with your own details. Attach the current Client Change Context Brief before you use any of them. The global ERP examples refer to the fictional client used throughout this playbook.

## Anatomy of a strong prompt

Most weak outputs trace back to a thin request. Before you send a prompt, check that it names five things.

| Element | What to include | Example |
|---|---|---|
| Advisor or mode | Who should answer, and how many | "Act as the Operational Realist" |
| Task | The deliverable or question | "Propose go/no-go criteria" |
| Context | The Context Brief plus any new facts | "Wave 1 covers [BU name] in [country]" |
| Audience | Who will read the output | "For the steering committee" |
| Constraints | Length, format, what to avoid | "One page; label assumptions" |

## Prompts by operating mode

### Mode 1: Solo advisor

Use when: you need one expert to draft one deliverable.

```text
Act as the Change Impact Advisor and develop an impact assessment for a
global ERP implementation. Use the attached Context Brief. Label every
assumption and list the questions I need to answer before this goes to
the client.
```

Use when: you want a first draft fast and will validate it yourself.

```text
Act as the [advisor name]. Draft a [deliverable] for [audience] at the
[lifecycle stage] stage. Keep it to [length]. Use the standard response
format, and include only the sections that add value.
```

Use when: you want a deliverable you can show at a decision point.

```text
Act as the Commercial Challenger. Draft executive talking points for the
[sponsor role] on why [change] matters now. Flag every benefit we cannot
yet evidence and suggest how we could evidence it.
```

### Mode 2: Cross-functional

Use when: a problem spans two to four disciplines.

```text
Have the Stakeholder, Employee Experience, and Communications advisors
develop an engagement strategy for frontline employees. Each advisor
contributes from their discipline, then the Board Chair combines the
inputs into one strategy and flags any conflicting assumptions.
```

Use when: one deliverable depends on another and you need the handoff to hold.

```text
Have the Change Impact Advisor summarize the top impacts for [persona or
BU], then have the Learning Engineer and the Operational Realist show how
each impact flows into the training plan and readiness criteria. Show the
traceability in a table.
```

### Mode 3: Board challenge

Use when: you are about to take a recommendation to a sponsor.

```text
Challenge my go-live readiness recommendation: strongest case for,
strongest case against, and the evidence that would resolve it.
My recommendation: [paste recommendation and supporting evidence].
```

Use when: you suspect the plan is internally inconsistent.

```text
Board Chair: ask each relevant advisor to independently stress-test
[strategy or plan]. Report where advisors disagree, which assumptions
conflict with the Context Brief, and the single decision I must make
first.
```

Use when: you need to prepare for a hostile question from a stakeholder.

```text
Act as the Political Navigator. Play the role of [stakeholder group] and
raise the three strongest objections to [proposal]. Then step out of role
and tell me how to respond to each, and what evidence would help.
```

### Mode 4: End-to-end engagement

Use when: you are starting an engagement and want a structured path.

```text
Guide me through the first 30 days of an OCM engagement. Use the attached
Context Brief. For each week, name the lead advisors, the deliverables,
the handoffs between them, and what I must validate with real
stakeholders before moving on.
```

Use when: you need to re-plan mid-engagement.

```text
Board Chair: we are now in [lifecycle stage]. Review what we have
produced so far, identify gaps against this stage, and propose the next
[number] weeks of work with lead advisors and decisions required.
```

## Prompts by lifecycle stage

### Discovery and assessment

Use when: you need a baseline view of stakeholders, impacts, and readiness.

```text
Have Advisors 1 to 5 each give me the three questions they most need
answered in discovery, and the source I should use to answer each. Then
the Board Chair consolidates them into one discovery interview guide.
```

Use when: you need early, honest signals about sponsorship.

```text
Act as the Political Navigator. Using the attached stakeholder list,
flag where sponsor alignment looks weakest and what evidence I should
gather in my next three sponsor conversations to confirm or refute it.
```

### Strategy and design

Use when: you are turning discovery findings into an OCM strategy.

```text
Using our validated discovery findings [attach], have the Readiness,
Champion, Communications, Learning, and Analytics advisors draft their
strategy components. The Board Chair checks that timelines and scope
match the Context Brief.
```

### Build and preparation

Use when: you are producing working artifacts for deployment.

```text
Act as the Grassroots Mobilizer, the Narrative Craftsman, and the
Learning Engineer. Produce a build checklist for wave [number]: what each
advisor's assets need, who approves them, and the latest date each must
be ready.
```

### Pilot and deployment

Use when: you are preparing a launch or scale-up decision.

```text
Have the Operational Realist and the Calm Incident Commander jointly
draft go/no-go criteria for [wave or pilot]. Separate criteria that need
demonstrated evidence from those that rely on reported status.
```

### Hypercare and sustained adoption

Use when: you are stabilizing after go-live and planning reinforcement.

```text
Act as the Calm Incident Commander and the Evidence-Based Investigator.
Using [hypercare data], classify issues as defects, knowledge gaps,
process failures, or access problems, and recommend hypercare exit
criteria and the adoption indicators to track after exit.
```

Use when: you need to report adoption results to the sponsor.

```text
Act as the Evidence-Based Investigator. Using [adoption data], summarize
what the results show, what they do not show, and the action each
finding should trigger. Do not infer causation from correlation.
```

## Follow-up and iteration prompts

### Scope change

Use when: scope, timeline, or assumptions change after deliverables exist.

```text
The Context Brief has changed: [describe change]. Board Chair: identify
every deliverable we have produced that this affects, and have each
owning advisor update its output consistently. List what changed and why.
```

### Tighten for executives

Use when: a draft is sound but too long or too detailed for a sponsor.

```text
Rewrite this for [executive role] in under [number] words. Lead with the
recommendation and the decision required. Keep only the evidence that
supports the decision. Move detail to an appendix.
```

### Label assumptions

Use when: you cannot tell which statements are facts.

```text
Go back through your last response. Label every statement as FACT (from
me or the Context Brief), ASSUMPTION, or HYPOTHESIS. For each assumption,
tell me how to validate it and who could confirm it.
```

### Ask before drafting

Use when: your request is ambiguous and you want questions, not guesses.

```text
Before you draft anything, ask me up to five targeted questions that
would most change your recommendation. Do not proceed until I answer.
```

### Second opinion

Use when: you want to test one advisor's output against another discipline.

```text
Have the [second advisor] review the [first advisor]'s output from their
discipline. Name what they would keep, what they would change, and any
risk the first advisor missed.
```

### Check consistency

Use when: several advisors have produced deliverables and you need them to agree.

```text
Board Chair: compare the timeline, scope, audiences, and success measures
across [list deliverables]. Show any inconsistency in a table with the
deliverable, the conflicting assumption, and the recommended fix.
```

### Turn into a reusable template

Use when: an output worked well and you want to reuse its structure.

```text
Convert this deliverable into a generic template. Remove all
client-specific facts, replace them with [placeholders], and add a short
note on how to complete each section.
```

### Localize

Use when: a deliverable built for one region must work in another.

```text
Adapt this [deliverable] for [country or BU]. Flag anything that may need
local legal, works council, language, or cultural review, and list what
you changed and what still needs a local reviewer.
```

### Prepare for the conversation

Use when: you are about to present an output to a sponsor or steering group.

```text
I am presenting this to [audience] on [date]. List the five questions
they are most likely to ask, a short answer to each based only on our
validated facts, and where I should say "we do not know yet".
```

### Coach me

Use when: you want to build your own capability, not just get a draft.

```text
Explain the reasoning behind your recommendation as you would to a
practitioner building their skills. What would an experienced specialist
look for that I might miss, and what question should I ask the sponsor?
```

> **Tip:** Save the prompts that work well for your clients into your own library, with the context in which each worked. That becomes one of the reusable assets in Phase 4 of the roadmap (see Chapter 23).
