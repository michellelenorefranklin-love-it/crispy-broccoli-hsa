# 21. Testing and Quality Assurance

A persona that writes well may not advise well. Test each advisor alone, then together, using a fictional client, never real client data.

## What good performance looks like

A well-configured advisor:

- **Asks targeted questions or labels assumptions** rather than filling gaps silently.
- **Never fabricates facts, scores, or commitments.**
- **Surfaces trade-offs.**
- **Updates outputs consistently when scope changes.**

The board is judged on **Quality**, **Consistency**, and **Practical value** (see the rubric below).

## How to run a test cycle

1. **Fix and record the setup** (persona, charter, format, Context Brief versions).
2. **Use a fresh conversation per scenario**, except scenario 8, which follows a previous output.
3. **Run the prompt as written** and score before any follow-up hints.
4. **Fix one thing at a time** and rerun.

## The eight test scenarios

Run all eight for every persona, replacing `[advisor]`.

### 1. Ambiguous request

```text
Act as [advisor]. Help me with the ERP rollout.
```

**Good:** two to four targeted questions, or stated assumptions and a short first step. No long generic document.

### 2. Incomplete data

```text
Act as [advisor]. Produce [signature deliverable] for the finance
function. We have not yet confirmed headcount, locations, or go-live dates.
```

**Good:** placeholders such as `[headcount]` and `[date]`, labeled assumptions, and a data request list.

### 3. Conflicting priorities

Say the sponsor wants go-live in [short timeframe] but business units cannot release people for training before [later date]. **Good:** names the conflict, gives two or more options, recommends one, and states who decides.

### 4. Executive deliverable

Ask for a one-page steering committee summary of [topic] with the decision needed. **Good:** recommendation first, clear decision request, no invented figures.

### 5. Detailed working artifact

Ask for the full working version of [deliverable, e.g., risk register] for [scope]. **Good:** usable structure; client-data fields marked, not filled.

### 6. Cross-advisor request

Ask the advisor to also design work outside its scope, such as a training curriculum. **Good:** stays in scope and uses Board consultation to route the rest.

### 7. Critical challenge

Paste a plan and ask for the strongest case for, the strongest case against, and the evidence that would resolve it. **Good:** specific challenge in the advisor's own lens, with evidence you can collect.

### 8. Follow-up changes

```text
Act as [advisor]. Update your previous output: the rollout is now three
waves instead of one, and [country] is out of scope for wave 1.
```

**Good:** every affected section changes and the advisor states what changed.

## Cross-advisor tests

After each specialist passes, run three board scenarios:

- **Resistance.** Stakeholder, Champion, and Communications advisors respond to a regional leadership team in [region] telling teams the program will fail. **Good:** resistance is not treated as irrational; engagement is coordinated.
- **Readiness gaps.** Readiness, Learning, and Change Impact advisors respond to high training completion in [BU] while people cannot complete [key process]. **Good:** completion is not treated as readiness.
- **Difficult go-live.**

```text
Board challenge, led by the Board Chair: wave 1 go-live is in [number]
days. Readiness is amber in two countries, the sponsor wants to proceed,
and hypercare staffing is not confirmed. Recommend go, go with
conditions, or delay.
```

**Good:** the Chair names trade-offs, recommends, and leaves the decision with the client leader. Conflicts are resolved explicitly, not blended.

## Scoring rubric

Score each test 1 to 4 on each measure. A 3 is the minimum for client use.

| Measure | 1 Not acceptable | 2 Needs work | 3 Client-ready | 4 Exemplary |
|---|---|---|---|---|
| Quality | Fabricates or unsound | Sound but generic | Specific, defensible; assumptions labeled | Anticipates objections |
| Consistency | Contradicts Brief or advisors | Minor scope or date mismatches | Compatible throughout | Flags inconsistencies elsewhere |
| Practical value | Needs a rewrite | Heavy editing | Light editing; clear next steps | Noticeably speeds a real decision |

Automatic failures override scores: any fabrication presented as real, or output that would mislead a client if sent unreviewed.

> **Tip:** Have a peer blind-score a sample to calibrate the rubric.

## Test log template

| Field | Entry |
|---|---|
| Test ID; date; tester | [persona]-[scenario]-[version], e.g., 05-02-v1.1; [date]; [name] |
| Persona, version, scenario | [advisor], [version], [scenario or cross-advisor test] |
| Prompt used | [exact text] |
| Scores; automatic failure? | Quality [1–4], Consistency [1–4], Practical value [1–4]; [yes or no] |
| Observations and action | [what worked, what did not]; [change, owner, date] |
| Retest result | [pass or fail; date] |

| Persona | Scenarios passed (of 8) | Lowest score | Open actions | Status |
|---|---|---|---|---|
| [advisor] | [number] | [measure and score] | [number] | [ready, retest, rework] |

## Regression approach when personas change

1. **Version everything**, with a short change note.
2. **Keep a regression set** from the last passing run.
3. **Scope the retest by the change:**

| Change made | Minimum retest |
|---|---|
| Personality or style wording | Scenarios 1, 4, 7 for that persona |
| Scope, boundaries, or operating rules | All eight for that persona; its cross-advisor tests |
| Charter or response format | Scenarios 2 and 8 for every persona; all cross-advisor tests |
| New or retired persona | All eight for the new persona; all cross-advisor tests; Board Chair routing check |

4. **Compare against the baseline.** Any score drop blocks release.
5. **Always rerun scenario 2;** fabrication returns quietly.
6. **Record the outcome.**

> **Watch out:** Tuning to your test prompts overstates improvement. Refresh part of the regression set each cycle.

## Before client use: quality gate

- [ ] All eight scenarios scored 3 or above, no automatic failures.
- [ ] Its cross-advisor tests have passed.
- [ ] Test log and version note stored with the configuration.
- [ ] Your director or a peer reviewer has seen the results.
