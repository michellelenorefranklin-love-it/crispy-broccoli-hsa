# 7. Four Operating Modes

The board can work in four ways, from a single expert drafting one deliverable to the whole board guiding an engagement from discovery to sustained adoption. Choosing the right mode matters. Too small a mode misses cross-discipline effects; too large a mode buries a simple request in debate. The guidance from the source is clear: start simple, with one advisor, then expand.

| Mode | Who is involved | Purpose |
|---|---|---|
| 1. Solo advisor | One expert | Draft a specific deliverable |
| 2. Cross-functional | Two to four advisors | Tackle a shared problem |
| 3. Board challenge | Several advisors, independently | Stress-test a strategy or recommendation |
| 4. End-to-end engagement | The whole board, coordinated by the Chair | Guide discovery to strategy, design, deployment, and sustained adoption |

In every mode the Board Chair function coordinates, the Charter applies, and the Context Brief is the shared foundation. In every mode, you decide.

## Mode 1: Solo advisor

**When to use it.** You need one deliverable that sits clearly within one discipline: a stakeholder map, an impact assessment, a readiness framework, a pilot charter. It is also the right mode when you are new to the board, testing a persona, or short on time.

**How to set it up.**

1. Load the Charter and the current Context Brief.
2. Name the advisor by number and full name.
3. State the deliverable, the audience, and the decision it supports.
4. Say whether the advisor should ask questions first or proceed on labeled assumptions.
5. Ask for the standard response format, with the Board consultation section included so you can see what other advisors should review.

**Prompt pattern.**

```text
Act as the [Advisor number and name]. Using Context Brief v[x.x], develop a
[deliverable] for [scope/audience]. It will be used to [decision or purpose]
by [date]. Ask me up to [three] questions before you draft. Respond in the
standard format and include Board consultation.
```

Source example: "Act as the Change Impact Advisor and develop an impact assessment for a global ERP implementation."

**Expected output.** A recommendation, a first-draft deliverable with placeholders where data is missing, labeled assumptions, specific risks, next actions, and a note naming which advisors should review the draft.

**Pitfalls.**

- Asking a solo advisor a question that belongs to several disciplines, then treating its answer as complete.
- Ignoring the Board consultation section. That is where the advisor tells you its output affects someone else's work.
- Accepting a polished draft without checking assumptions, because one advisor's confident tone feels authoritative.

> **Tip:** Mode 1 is the best way to learn each advisor's personality and challenge style. Run each advisor solo at least once before combining them.

## Mode 2: Cross-functional

**When to use it.** A problem genuinely spans two to four disciplines, and the deliverable needs their combined thinking: an engagement strategy for a hard-to-reach population, a readiness approach that depends on impact data, a launch plan that combines communications and champions.

**How to set it up.**

1. Name the advisors (two to four) and the shared problem.
2. Name one advisor as lead author, so there is a single integrated draft.
3. Give each contributor a specific question to answer.
4. Ask the Chair to synthesize and to surface any disagreements rather than blend them.
5. Use the "works with" pairings from the advisor profiles to choose combinations that naturally fit.

**Prompt pattern.**

```text
Have the [Advisor A], [Advisor B], and [Advisor C] develop a [deliverable]
for [audience/problem], using Context Brief v[x.x]. [Advisor A] leads and
produces the integrated draft. [Advisor B]: focus on [question].
[Advisor C]: focus on [question]. Board Chair: synthesize, show where the
advisors disagree, and list the decisions I need to make.
```

Source example: "Have the Stakeholder, Employee Experience, and Communications advisors develop an engagement strategy for frontline employees."

**Expected output.** One integrated recommendation and deliverable, a short note from each contributor on its angle, a list of disagreements with the evidence on each side, and decisions required.

**Pitfalls.**

- Calling more than four advisors. Beyond four, you usually need Mode 3 or Mode 4, or a tighter question.
- Getting three separate documents stapled together instead of one integrated draft. Name a lead author.
- Consensus that hides real trade-offs. If the advisors agree on everything, ask the Chair what each would have argued alone.

### Useful cross-functional combinations

| Shared problem | Advisors | Lead |
|---|---|---|
| Frontline engagement strategy | 2 Stakeholder, 3 Employee Experience, 7 Communications | 2 |
| Impact-driven training plan | 5 Change Impact, 8 Learning, 4 Readiness | 8 |
| Local launch mobilization | 6 Champions, 7 Communications, 2 Stakeholder | 6 |
| Value and adoption measures | 1 Vision, 10 Adoption Analytics | 10 |
| Go-live and stabilization plan | 4 Readiness, 9 Pilot and Hypercare, 10 Adoption Analytics | 9 |

## Mode 3: Board challenge

**When to use it.** You have a recommendation or strategy and you need it stress-tested before it goes to an executive. Typical moments: go/no-go, a change to the wave plan, a request for more budget, a strategy you are about to present to the steering committee. This mode directly addresses one of the failure modes from Chapter 1: untested go-live confidence.

**How to set it up.**

1. State your recommendation and the evidence you have, in a few sentences.
2. Name the advisors whose disciplines are most exposed to the decision.
3. Ask each advisor to respond independently, without seeing the others' views first.
4. Ask for the strongest case for, the strongest case against, and the evidence that would resolve it.
5. Ask the Chair to synthesize and to frame the decision for the executive.

**Prompt pattern.**

```text
Board challenge. My recommendation: [recommendation]. My evidence: [evidence].
[Advisors X, Y, Z]: respond independently. Each give the strongest case for,
the strongest case against, and the evidence that would resolve it. Do not
soften your view to agree with the others. Board Chair: synthesize, identify
whether the disagreements are about facts, assumptions, or risk appetite, and
frame the decision I should put to [executive/committee].
```

Source example: "Challenge my go-live readiness recommendation: strongest case for, strongest case against, and the evidence that would resolve it."

**Expected output.** Independent positions from each advisor, a clear list of the evidence that would settle the question, a Chair synthesis, and a decision framing you can adapt into an executive memo (Chapter 8 has the template).

**Pitfalls.**

- Asking for a challenge but sharing only the evidence that supports your view. Give the board what you have, including the weak spots.
- Treating the "case against" as a reason to abandon the recommendation. The point is to know which evidence matters, then go and get it.
- Running a challenge on every small decision. Save it for decisions with real consequences.

> **Watch out:** A board challenge is not a vote. Three advisors for and one against does not mean "go." The one dissenting view may hold the evidence that matters most.

## Mode 4: End-to-end engagement

**When to use it.** You want the board to guide you through a whole phase or the whole lifecycle: discovery, strategy, design, deployment, and sustained adoption. It is most useful at the start of an engagement, when you need a sequenced plan of what to do, in what order, with which advisor, and with what handoffs.

**How to set it up.**

1. Make sure the Context Brief is as complete as you can make it, with open questions listed.
2. Ask the Chair to lead and to sequence the work by lifecycle stage.
3. Ask for handoffs between advisors to be explicit (for example, Change Impact feeding Training and Readiness; stakeholder personas feeding Communications).
4. Ask for milestones and decision points, not just activities.
5. Work through the plan one stage at a time, using Modes 1 to 3 inside each stage.

**Prompt pattern.**

```text
Board Chair: guide me through [period or phase] of this engagement, using
Context Brief v[x.x]. Sequence the work by stage, name the lead advisor for
each deliverable, show the handoffs between advisors, and identify the
milestones and decisions I need to prepare for. Flag what you need from me
before each stage begins.
```

Source example: "Guide me through the first 30 days of an OCM engagement."

**Expected output.** A staged plan showing deliverables, lead advisors, handoffs, milestones, and decision points, with the inputs you must provide at each stage. Chapter 19 shows this mode applied to the first 30 days of the fictional global ERP program: understand, assess, then plan, ending with strategy and baselines ready for client review.

**Pitfalls.**

- Treating the plan as a fixed method. Week boundaries and sequences are illustrative; adjust to the client.
- Asking for everything at once. Use the end-to-end plan to sequence work, then produce deliverables one stage at a time.
- Expecting the board to run autonomously. A persona prompt can simulate all four modes in one conversation or custom assistant, but parallel execution, scheduled monitoring, persistent shared artifacts, and automated handoffs require an orchestration layer or connected tools. In a prompt-only setup, you are the orchestrator.

## Mode selection guide

| If you need to... | Use | Why |
|---|---|---|
| Produce one deliverable in one discipline | Mode 1 | Fastest, clearest accountability |
| Learn or test an advisor | Mode 1 | Isolates one persona's behavior |
| Solve a problem that spans disciplines | Mode 2 | Combines perspectives in one draft |
| Keep deliverables consistent across disciplines | Mode 2 | Forces shared assumptions and handoffs |
| Pressure-test a recommendation before an executive sees it | Mode 3 | Surfaces the strongest objections and the evidence that resolves them |
| Prepare a go/no-go or other high-stakes decision | Mode 3 | Makes trade-offs explicit |
| Plan a phase or a new engagement | Mode 4 | Sequences deliverables, owners, and handoffs |
| Re-plan after a major scope or timeline change | Mode 4 | Re-sequences work from the updated brief |

## Escalation path: from Mode 1 to Mode 4

Start simple and escalate only when the request needs it. The signals below tell you when to move up a mode.

| From | To | Escalate when |
|---|---|---|
| Mode 1 | Mode 2 | The advisor's Board consultation section names other advisors whose input would change the recommendation; or the deliverable feeds another discipline directly |
| Mode 2 | Mode 3 | The output will support a significant executive decision; or advisors disagree and the disagreement affects risk |
| Mode 3 | Mode 4 | The challenge reveals that several deliverables or the sequence of work need to change; or the Context Brief has a major version change |
| Any mode | Back down | The question has narrowed to one discipline, or the debate has stopped adding new evidence |

A typical progression looks like this: you ask the Change Impact, Risk & Mitigation Architect (Advisor 5) for an impact assessment (Mode 1). Its Board consultation note flags that impacts drive training and readiness, so you bring in Advisors 8 and 4 to align the plan (Mode 2). Before presenting the wave 1 readiness position to the sponsor, you run a board challenge with Advisors 4, 9, and 10 (Mode 3). When the sponsor moves the go-live date, you ask the Chair to re-sequence the remaining work (Mode 4).

> **Tip:** Record which mode you used for each major deliverable. Over time you will see your own patterns, such as defaulting to Mode 1 when a challenge was needed, and you can correct them.

## Mode checklist

Before you run any mode, check:

- [ ] The Charter and current Context Brief are loaded.
- [ ] You have named the advisor or advisors, and a lead where more than one is involved.
- [ ] The request states the decision or purpose the output supports.
- [ ] You have chosen the smallest mode that fits the question.
- [ ] You know how you will validate the output with real data before it reaches the client.
