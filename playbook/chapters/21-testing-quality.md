# 21. Testing and Quality Assurance

A persona that writes well does not necessarily advise well. Test each advisor alone, then together, before client use. Use a fictional client, such as the illustrative ERP program; never real client data.

## What good performance looks like

A well-configured advisor:

- **Asks targeted questions or labels assumptions** rather than filling gaps silently.
- **Never fabricates facts or scores**: no invented baselines, benefits, survey results, ratings, or leader commitments.
- **Surfaces trade-offs** instead of presenting one option as obviously right.
- **Updates outputs consistently when scope changes**, across every affected section.

The board is judged on three measures of success: **Quality** (is the advice sound and defensible?), **Consistency** (are assumptions compatible across advisors and deliverables?), and **Practical value** (does it lead to faster, better decisions?).

## How to run a test cycle

1. **Fix the setup** (persona, charter, response format, fictional Context Brief) and record all four versions.
2. **Use a fresh conversation per scenario**, except scenario 8, which follows a previous output.
3. **Run the prompt as written** and score before giving any follow-up hints.
4. **Score immediately** against the rubric.
5. **Fix one thing at a time**, rerun the failing scenario, then apply the regression approach below.

## The eight test scenarios

Run all eight for every persona, replacing `[advisor]` and adapting the deliverable to the discipline.

### 1. Ambiguous request

```text
Act as [advisor]. Help me with the ERP rollout.
```

**Good:** two to four targeted questions on scope, audience, stage, and deliverable, or stated assumptions and a short first step. No long generic document.

### 2. Incomplete data

```text
Act as [advisor]. Produce [signature deliverable] for the finance
function. We have not yet confirmed headcount, locations, or go-live dates.
```

**Good:** placeholders such as `[headcount]` and `[date]`, labeled assumptions, and a list of data needed. No unsourced or unlabeled numbers.

### 3. Conflicting priorities

Say the sponsor wants go-live in [short timeframe] but business units cannot release people for training before [later date]. **Good:** names the conflict, gives at least two options with consequences, recommends one, and states the decision required and who makes it.

### 4. Executive deliverable

Ask for a one-page steering committee summary of [topic] with the decision needed. **Good:** recommendation first, plain language, clear decision request, options, and risks; no invented figures.

### 5. Detailed working artifact

Ask for the full working version of [deliverable, e.g., risk register] for [scope]. **Good:** usable structure with fields, owners, and definitions; client-data fields marked, not filled.

### 6. Cross-advisor request

Ask the advisor to also design work outside its scope, such as the training curriculum and hypercare triage model. **Good:** answers within scope and uses Board consultation to say who to involve and what to hand them.

### 7. Critical challenge

Paste a plan and ask for the strongest case for, the strongest case against, and the evidence that would resolve it. **Good:** specific challenge in the advisor's own lens; neither agreement nor criticism for its own sake; evidence you can actually collect.

### 8. Follow-up changes

```text
Act as [advisor]. Update your previous output: the rollout is now three
waves instead of one, and [country] is out of scope for wave 1.
```

**Good:** every affected section changes, nothing refers to the old scope, and the advisor states what changed and what it could not update.

## Cross-advisor tests

After each specialist passes, run the three source scenarios with the board:

- **Resistance.** Stakeholder, Champion, and Communications advisors respond to a regional leadership team in [region] telling teams the ERP program will fail. **Good:** resistance is not treated as irrational; they propose how to learn its drivers and coordinate engagement without overloading the region.
- **Readiness gaps.** Readiness, Learning, and Change Impact advisors respond to high training completion in [BU] while supervised practice shows people cannot complete [key process]. **Good:** completion is not treated as readiness; gaps trace to specific impacts with targeted remediation.
- **Difficult go-live.**

```text
Board challenge, led by the Board Chair: wave 1 go-live is in [number]
days. Readiness is amber in two countries, the sponsor wants to proceed,
and hypercare staffing is not confirmed. Recommend go, go with
conditions, or delay.
```

**Good:** the Board Chair names trade-offs, presents options with evidence, recommends, and leaves the decision with the accountable client leader. In every test, check that assumptions match and conflicts are resolved explicitly, not blended.

## Scoring rubric

Score each test 1 to 4 on each measure. A 3 is the minimum for client use.

| Measure | 1 Not acceptable | 2 Needs work | 3 Client-ready | 4 Exemplary |
|---|---|---|---|---|
| Quality | Fabricates or unsound | Sound but generic | Specific, defensible; assumptions labeled | Anticipates objections |
| Consistency | Contradicts Brief or advisors | Minor scope or date mismatches | Compatible throughout | Flags inconsistencies elsewhere |
| Practical value | Needs a rewrite | Heavy editing | Light editing; clear next steps | Noticeably speeds a real decision |

Two automatic failures override scores: any fabricated fact, figure, score, quote, or commitment presented as real, and any output that would mislead a client if sent unreviewed.

> **Tip:** Have a peer blind-score a sample; where you differ by over a point, sharpen the rubric.

## Test log template

Keep one log per persona version, stored with the configuration.

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

Any persona, charter, or format change can break another behavior.

1. **Version everything**, with a short change note.
2. **Keep a regression set**: the exact prompts and scored outputs from the last passing run.
3. **Scope the retest by the change:**

| Change made | Minimum retest |
|---|---|
| Personality or style wording | Scenarios 1, 4, 7 for that persona |
| Scope, boundaries, or operating rules | All eight for that persona; its cross-advisor tests |
| Charter or response format | Scenarios 2 and 8 for every persona; all cross-advisor tests |
| New or retired persona | All eight for the new persona; all cross-advisor tests; Board Chair routing check |

4. **Compare against the baseline.** Any score drop or new automatic failure blocks release.
5. **Always rerun scenario 2.** Fabrication is the failure most likely to return quietly.
6. **Record the outcome** and tell other users what changed.

> **Watch out:** Tuning on your test prompts shows improvement that is not real. Refresh part of the regression set each cycle with someone else's prompts.

## Before client use: quality gate

- [ ] All eight scenarios scored 3 or above on every measure, with no automatic failures.
- [ ] Its cross-advisor tests have passed.
- [ ] Test log and version note stored with the configuration.
- [ ] Your director or a peer reviewer has seen the results.
