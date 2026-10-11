# 8. The Board Chair Playbook

The Board Chair is the Chief Change Strategist function. It synthesizes advice, resolves conflicts between advisors, and prepares executive decisions. It coordinates every lifecycle stage, and it is the default operating mode of the board. It is not an eleventh specialist. The Chair has no discipline of its own to defend; its job is to make ten disciplines produce one coherent answer you can act on.

In a prompt-only setup, you invoke the Chair by asking for it. In practice, you also play part of the Chair role yourself: the Chair frames the decision, and you make it.

## What the Chair does and does not do

| The Chair does | The Chair does not |
|---|---|
| Route requests to the right advisors and mode | Replace a specialist advisor's analysis |
| Synthesize multiple advisor outputs into one view | Average conflicting positions into a vague compromise |
| Name conflicts and classify them | Hide disagreement to make the output look tidy |
| Frame decisions with options, trade-offs, and a recommendation | Make the decision or commit the client |
| Check outputs for consistency with the Context Brief | Introduce new assumptions without labeling them |
| Prepare executive-ready language | Present board views as the client's or sponsor's views |

## The synthesis method

Use these six steps whenever two or more advisors have contributed. You can ask the Chair to follow them explicitly.

1. **Restate the question and the decision it supports.** If the advisors answered different questions, the synthesis starts by saying so.
2. **Extract each advisor's recommendation in one line.** Put them side by side. This makes agreement and disagreement visible at a glance.
3. **Check every output against the Context Brief.** Flag any assumption about scope, timeline, population, or deployment approach that differs from the brief or from another advisor.
4. **Identify where advisors agree and why.** Agreement backed by different evidence from different disciplines is strong. Agreement resting on the same unvalidated assumption is weak; say which it is.
5. **Identify where advisors conflict, and classify each conflict** using the protocol below.
6. **Produce one integrated recommendation**, with the conflicts that remain open, the evidence that would close them, and the decisions required.

> **Tip:** Ask the Chair to show its working: "List each advisor's position in one line before you synthesize." It takes seconds to read and lets you see whether the synthesis is faithful.

## Conflict-resolution protocol

Disagreement between advisors is a feature. The distinct personalities exist to create useful debate rather than ten generic consultants. The Chair's job is not to end the debate but to turn it into a decision.

### Step 1: State the conflict plainly

Name the advisors, their positions, and the point of disagreement in a sentence each. "The Business Readiness & Operational Transition Expert recommends delaying wave 1; the Pilot, Deployment & Hypercare Strategist recommends proceeding with extended hypercare."

### Step 2: Classify the conflict

| Conflict type | What it looks like | How to resolve it |
|---|---|---|
| Fact | Advisors rely on different information | Get the real data; the lead validates |
| Assumption | Advisors assume different things the brief does not settle | Agree a working assumption, record it in the brief, and confirm it with the client |
| Priority | Both are right, but objectives compete | Escalate to whoever owns the priority (often the sponsor) with a clear trade-off |
| Risk appetite | Advisors weigh the same risk differently | Make the risk explicit and let the accountable executive choose |
| Scope | Advisors disagree about whose discipline owns the issue | Apply the Charter boundaries; the Chair assigns a lead |

### Step 3: Ask each side for its evidence and its tipping point

Each advisor states the evidence behind its position and what evidence would change its mind. This is the same discipline as a board challenge, and it often shows that the conflict is narrower than it looked.

### Step 4: Recommend, do not average

The Chair recommends a position and explains why, or, where the conflict is genuinely about priority or risk appetite, frames it as a decision for the lead or sponsor. A compromise is acceptable only when it is a real option with its own rationale, not a midpoint between two views.

### Step 5: Record the outcome

Once you or the client decide, record the decision and any new or confirmed assumption in the Context Brief, and ask the affected advisors to update their outputs.

## Common conflicts

The table lists conflicts you should expect, and how the Chair typically frames them. Use it to anticipate debate before it surprises you in front of a sponsor.

| Conflict | Advisor positions | Underlying tension | Chair's typical framing |
|---|---|---|---|
| Go-live timing | Readiness (4): readiness is not demonstrated, delay. Hypercare (9): launch with stronger hypercare and a clear exit | Demonstrated capability versus learning in production | Go/no-go decision with explicit criteria, the gaps, and what extra hypercare can and cannot cover |
| Employee load | Communications (7): more touchpoints to prevent silence and rumors. Champions (6): local agents and employees are already overloaded | Message coverage versus capacity | Agree a combined channel and champion calendar; cut or merge low-value touchpoints |
| Benefits claims | Vision (1): bold value story to secure sponsorship. Analytics (10): claims cannot yet be evidenced | Persuasion versus defensibility | Use evidenced benefits now; label others as hypotheses with a measurement plan |
| Training versus readiness | Learning (8): curriculum complete on schedule. Readiness (4): training completion is not readiness | Activity completed versus capability demonstrated | Add competency validation evidence to readiness criteria |
| Persona confidence | Employee Experience (3): personas are hypotheses. Communications (7): needs firm segments to tailor messages | Speed versus research rigor | Tailor to provisional personas, labeled as such, and validate with real users before scale |
| Resistance interpretation | Stakeholder (2): concerns signal legitimate issues. Impact (5): the group's impact is low, so concerns are overstated | Perceived versus analyzed impact | Test the impact assessment with the group; treat the gap as a finding, not resistance |
| Adoption signal | Hypercare (9): ticket volume is falling, stabilize and exit. Analytics (10): usage data alone does not prove adoption | Operational stability versus sustained behavior change | Exit hypercare against combined criteria: stability, capability, and adoption indicators |

## Preparing executive decisions

The Chair's most valuable output for your career is the executive decision. Coaching on how to advise executives at decision points is one of the things OCM leads at your career stage most often lack (Chapter 1). The Chair gives you a structured first draft; you supply the judgment, the relationship, and the delivery.

### Principles for executive decisions

- Lead with what you are asking the executive to decide, then your recommendation.
- Give real options, including the option of doing nothing or deferring, where it is genuine.
- Make trade-offs explicit in business terms, not OCM terms.
- Separate what is known from what is assumed.
- Name the evidence that would change the recommendation.
- Keep it short. Detail goes in an appendix.

### Decision memo template

| Field | Content |
|---|---|
| Decision required | One sentence: what must be decided |
| Decision owner and deadline | [Executive role], by [date] |
| Recommendation | The recommended option in one or two sentences |
| Context | Two or three sentences on why this decision is needed now |
| Options | Option A, Option B, Option C (including defer, if genuine) |
| Trade-offs | For each option: business benefit, risk, cost or effort, people impact |
| Evidence | What is confirmed, with source |
| Assumptions | What is assumed, and how and when it will be confirmed |
| Strongest case against the recommendation | The best objection, stated fairly |
| What would change the recommendation | Specific evidence or events |
| Risks if approved | Top risks and mitigations, with owners |
| Next steps if approved | Actions, owners, and dates |
| Board advisors consulted | Which advisors contributed (for your reference; remove before sending if not appropriate) |

> **Example:** For the fictional global ERP program, an illustrative decision might read: "Decision required: approve go-live for wave 1 [BU name] on [date], or defer to [date]. Recommendation: proceed, conditional on [readiness criterion] reaching [threshold] by [date], with hypercare extended to [number] weeks." Every bracketed item must be filled from validated data before the memo is sent.

> **Watch out:** Never send a Chair-drafted memo without checking that every number is real and every commitment has been agreed. The memo carries your name, not the board's.

## Prompts for the Chair

```text
Board Chair: route this request. Tell me which advisor should lead, which
should contribute and on what question, and which operating mode you
recommend. Request: [request]. Context Brief v[x.x].
```

```text
Board Chair: synthesize the outputs from [Advisors X, Y, Z]. First list each
advisor's recommendation in one line. Then flag any assumption that differs
from Context Brief v[x.x] or between advisors. Then give one integrated
recommendation, the open conflicts, and the decisions I need to make.
```

```text
Board Chair: [Advisor A] and [Advisor B] disagree on [issue]. Classify the
conflict as fact, assumption, priority, risk appetite, or scope. Ask each to
state its evidence and what would change its view. Then recommend a position
or frame it as a decision for [lead/sponsor]. Do not average the positions.
```

```text
Board Chair: prepare a decision memo for [executive role] on [decision],
using the board's decision memo template. Lead with the decision required and
the recommendation. Include the strongest case against and what would change
the recommendation. Use placeholders for any data I have not confirmed.
```

## Chair checklist

Before you act on a Chair synthesis or take a decision memo to an executive:

- [ ] Each advisor's position is represented faithfully.
- [ ] Every assumption that differs from the Context Brief is flagged and resolved.
- [ ] Conflicts are classified, not blended.
- [ ] The recommendation is clear and the decision owner is named.
- [ ] The strongest case against is stated fairly.
- [ ] Every number and commitment is validated or shown as a placeholder.
- [ ] You can defend the recommendation in your own words without the board.
