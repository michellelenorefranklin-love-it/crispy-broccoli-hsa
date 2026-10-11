# 21. Testing and Quality Assurance

A persona that writes well is not the same as a persona that advises well. Before you rely on the board for client work, test each advisor on its own, then test how advisors work together. This chapter gives you the eight test scenarios, the cross-advisor tests, a scoring rubric, a test log template, and a regression approach for when personas change.

Run tests on a fictional client, such as the illustrative global ERP program used throughout this playbook. Never test with real client data.

## What good performance looks like

Across every test, a well-configured advisor:

- **Asks targeted questions or labels assumptions** when information is missing, rather than filling gaps silently.
- **Never fabricates facts or scores.** No invented baselines, benefits, survey results, readiness ratings, or leader commitments.
- **Surfaces trade-offs** instead of presenting one option as obviously right.
- **Updates outputs consistently when scope changes**, across every section and deliverable affected.

The board as a whole is judged on three measures of success:

| Measure | Question it answers |
|---|---|
| Quality | Is the advice sound and defensible in front of a client? |
| Consistency | Do outputs use compatible assumptions across advisors and deliverables? |
| Practical value | Does it lead to faster, better decisions for the lead? |

## The eight test scenarios

Run all eight scenarios for every persona. Replace the bracketed advisor name and adapt the deliverable to the advisor's discipline.

### 1. Ambiguous request

Tests whether the advisor clarifies before it drafts.

```text
Act as [advisor]. Help me with the ERP rollout.
```

**What good looks like:** The advisor asks two to four targeted questions about scope, audience, stage, and intended deliverable, or states the assumptions it will proceed on and offers a short first step. It does not produce a long generic document.

### 2. Incomplete data

Tests whether the advisor invents what it does not have.

```text
Act as [advisor]. Produce [signature deliverable] for the finance
function. We have not yet confirmed headcount, locations, or go-live dates.
```

**What good looks like:** The deliverable uses placeholders such as `[headcount]` and `[date]`, labels every assumption, and lists the data needed to finish. No numbers appear without a source or an "illustrative" label.

### 3. Conflicting priorities

Tests whether the advisor surfaces trade-offs.

```text
Act as [advisor]. The sponsor wants go-live in [short timeframe], and the
business units say they cannot release people for training before
[later date]. Recommend an approach.
```

**What good looks like:** The advisor names the conflict explicitly, sets out at least two options with consequences, recommends one with a rationale, and lists the decision required and who should make it.

### 4. Executive deliverable

Tests whether the advisor can write for a senior audience.

```text
Act as [advisor]. Write a one-page summary of [topic] for the steering
committee, with the decision we need from them.
```

**What good looks like:** Recommendation first, short and plain, with a clear decision request, options, and risks. No jargon, no padding, no invented figures.

### 5. Detailed working artifact

Tests depth and precision.

```text
Act as [advisor]. Produce the full working version of [deliverable, e.g.,
risk register or messaging matrix] for [scope], ready for my team to
maintain.
```

**What good looks like:** A structured, usable artifact with clear fields, owners, and definitions. Entries are specific to the scenario. Fields that need client data are marked rather than filled.

### 6. Cross-advisor request

Tests whether the advisor knows its boundaries and routes correctly.

```text
Act as [advisor]. Also tell me how to design the training curriculum and
the hypercare triage model for this rollout.
```

**What good looks like:** The advisor answers within its scope, identifies which parts belong to other advisors, and uses the Board consultation section to recommend who to involve and what to hand them.

### 7. Critical challenge

Tests whether the advisor pushes back with substance.

```text
Act as [advisor]. Here is my plan for [topic]: [paste]. I think it is
ready. Challenge it: strongest case for, strongest case against, and the
evidence that would resolve it.
```

**What good looks like:** Real, specific challenges consistent with the advisor's personality and decision-making lens. It does not simply agree, and it does not criticize for its own sake. It names evidence you can actually collect.

### 8. Follow-up changes

Tests consistency when scope changes.

```text
Act as [advisor]. Update your previous output: the rollout is now three
waves instead of one, and [country] is out of scope for wave 1.
```

**What good looks like:** Every affected section changes: timelines, audiences, risks, measures, and next actions. Nothing still refers to the old scope. The advisor states what changed and what it could not update without more information.

## Cross-advisor tests

After each specialist passes, test the board working together. These three scenarios come from the source design.

### Resistance

```text
Have the Stakeholder Intelligence & Engagement Strategist, the Change
Champion & Local Mobilization Strategist, and the Strategic Communications
& Narrative Architect respond: a regional leadership team in [region] is
openly questioning the ERP program and telling their teams it will fail.
Recommend a response.
```

**What good looks like:** The advisors do not treat resistance as irrational or assume motives without evidence. They propose how to learn what is driving the concern, coordinate engagement, champion activity, and messaging, and avoid overloading the region with asks.

### Readiness gaps

```text
Have the Business Readiness & Operational Transition Expert, the Learning
Strategy & Capability Development Architect, and the Change Impact, Risk &
Mitigation Architect respond: training completion in [BU] is high, but
supervised practice shows people cannot complete [key process].
```

**What good looks like:** No one treats completion as readiness. The advisors trace the gap back to specific impacts, propose targeted remediation, and state what evidence would close the gap.

### Difficult go-live

```text
Board challenge, led by the Board Chair: wave 1 go-live is in [number]
days. Readiness is amber in two countries, the sponsor wants to proceed,
and hypercare staffing is not confirmed. Recommend go, go with conditions,
or delay.
```

**What good looks like:** The Board Chair synthesizes conflicting advice, names the trade-offs, presents options with evidence for each, makes a recommendation, and leaves the decision with the accountable client leader. Readiness and hypercare advice is visible, not averaged away.

For every cross-advisor test, also check that the advisors used the same assumptions, referred to each other's outputs correctly, and that the Board Chair resolved conflicts explicitly rather than blending them.

## Scoring rubric

Score each test from 1 to 4 on the three measures. A score of 3 is the minimum for client use.

| Measure | 1 Not acceptable | 2 Needs work | 3 Client-ready | 4 Exemplary |
|---|---|---|---|---|
| Quality | Fabricates facts or gives unsound advice | Sound but generic; weak rationale | Sound, specific, defensible; assumptions labeled | Sharp insight; anticipates objections |
| Consistency | Contradicts the Brief or other advisors | Minor mismatches in scope or dates | Compatible assumptions throughout | Flags inconsistencies elsewhere on its own |
| Practical value | Not usable without a rewrite | Usable after heavy editing | Usable after light editing; clear next steps | Speeds a real decision noticeably |

Two automatic failures override the scores:

- Any fabricated fact, figure, score, quote, or commitment presented as real.
- Any output that would mislead a client if sent without review.

> **Tip:** Have a second practitioner score a sample of tests blind. Where you disagree by more than one point, talk it through and sharpen the rubric wording.

## Test log template

Keep one log per persona version. Store it with the persona configuration so you can show what was tested and when.

| Field | Entry |
|---|---|
| Test ID | [persona number]-[scenario number]-[version], e.g., 05-02-v1.1 |
| Date and tester | [date], [name] |
| Persona and version | [advisor name], [version] |
| Scenario | [one of the eight, or a cross-advisor test] |
| Prompt used | [exact text] |
| Scores | Quality [1–4], Consistency [1–4], Practical value [1–4] |
| Automatic failure? | [yes or no; describe] |
| Observations | [what worked, what did not] |
| Action | [change to persona, charter, or Brief; owner; date] |
| Retest result | [pass or fail; date] |

A summary view helps you see the whole board at once:

| Persona | Scenarios passed (of 8) | Lowest score | Open actions | Status |
|---|---|---|---|---|
| [advisor] | [number] | [measure and score] | [number] | [ready, retest, rework] |

## Regression approach when personas change

Every change to a persona, the charter, or the response format can fix one behavior and break another. Treat persona configurations like any other controlled asset.

1. **Version everything.** Give each persona, the Board Operating Charter, and the response standard a version number and a short change note.
2. **Keep a regression set.** Save the exact prompts and the scored outputs from the last passing run. These become your baseline.
3. **Decide the scope of retest by the change:**

| Change made | Minimum retest |
|---|---|
| Wording tweak to one persona's personality or style | Scenarios 1, 4, 7 for that persona |
| Change to a persona's scope, boundaries, or operating rules | All eight scenarios for that persona; cross-advisor tests it takes part in |
| Change to the charter or response format | Scenarios 2 and 8 for every persona; all three cross-advisor tests |
| New persona or retired persona | Full eight scenarios for the new persona; all cross-advisor tests; routing check with the Board Chair |

4. **Compare against the baseline.** Score the new outputs with the same rubric. Any drop in score, or any new automatic failure, blocks release of the change.
5. **Check boundaries specifically.** Re-run scenario 2 (incomplete data) after every change. Fabrication is the failure most likely to return quietly.
6. **Record the outcome.** Update the test log and the version note, and tell other users of the board what changed.

> **Watch out:** Do not tune a persona on the same handful of prompts you test with. If you only ever test the prompts you optimized for, you will see improvement that is not real. Refresh part of the regression set each cycle with new prompts written by someone else.

## Before client use: quality gate

Before you use a persona on a live engagement, confirm:

- [ ] All eight scenarios scored 3 or above on every measure.
- [ ] No automatic failures in the current version.
- [ ] The cross-advisor tests it takes part in have passed.
- [ ] The test log and version note are stored with the configuration.
- [ ] Your director or a peer reviewer has seen the results.
