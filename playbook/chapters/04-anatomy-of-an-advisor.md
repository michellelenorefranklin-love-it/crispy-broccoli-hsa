# 4. Anatomy of an Advisor

Every advisor on the board is built from the same eight elements. The standard structure makes advisors predictable to work with and easy to compare. The distinct content inside each element is what gives them different personalities, and that is what creates useful debate rather than ten generic consultants.

This chapter explains the eight elements, shows each one with an example from a real advisor profile, explains why the eighth element matters most, and gives you a checklist for designing, tuning, or extending a persona.

## The eight elements

| # | Element | What it defines |
|---|---|---|
| 1 | Professional identity | The background and expertise the advisor speaks from |
| 2 | Mission | The outcome the advisor exists to achieve |
| 3 | Scope and boundaries | What the advisor owns and what it must not do |
| 4 | Decision-making lens | The core question and standard the advisor applies to every problem |
| 5 | Core capabilities | The analysis and work the advisor can perform |
| 6 | Deliverables | The artifacts the advisor produces |
| 7 | Personality and challenge style | How the advisor communicates and how it pushes back |
| 8 | Operating rules | The rules that govern behavior, especially when data is missing |

### 1. Professional identity

The identity tells the model which body of expertise to draw on. A specific background produces specific advice.

> **Example:** The Systems Thinker (Advisor 5) has a background in business analysis, process transformation, enterprise systems, and risk management. That is why it frames impacts across people, process, technology, roles, and behaviors rather than as a general list of "changes."

### 2. Mission

The mission is one sentence stating the outcome the advisor exists to deliver. It keeps the advisor focused on purpose rather than activity.

> **Example:** The Learning Engineer (Advisor 8) exists to ensure people can demonstrate the skills needed in the future state. Note the word "demonstrate": the mission itself rules out judging success by attendance.

### 3. Scope and boundaries

Scope states what the advisor owns. Boundaries state what it must not do or claim. Together they prevent overlap and overreach.

> **Example:** The Grassroots Mobilizer (Advisor 6) owns network purpose, governance, sizing rationale, and selection criteria. Its boundary: champions do not replace managers, training, or the help desk, and there is no universal champion ratio.

### 4. Decision-making lens

The lens is the core question the advisor asks of every problem, plus the standard its answers follow. It is how the advisor thinks.

> **Example:** The Operational Realist (Advisor 4) asks, "Can the business operate successfully when the change goes live?" Its standard is readiness by wave, evidence and gaps, critical risks, and the required decision.

### 5. Core capabilities

Capabilities list the analysis the advisor can perform. They tell you what you can ask for.

> **Example:** The Evidence-Based Investigator (Advisor 10) can build a measurement framework with leading and lagging indicators and design dashboards segmented by business unit, geography, role, and wave.

### 6. Deliverables

Deliverables are the named artifacts the advisor produces. Naming them lets you request outputs precisely.

> **Example:** The Calm Incident Commander (Advisor 9) delivers a pilot charter, launch checklist, hypercare model, and lessons-learned log.

### 7. Personality and challenge style

Personality sets the advisor's tone. Challenge style sets what it pushes back on. This element is what makes the board a thinking partner rather than a drafting service.

> **Example:** The Commercial Challenger (Advisor 1) is confident, commercially minded, articulate, and constructively challenging. It pushes you from activity thinking to business outcomes. The Political Navigator (Advisor 2) is perceptive, diplomatic, and discreet, and it asks whose view is missing.

### 8. Operating rules

Operating rules govern how the advisor behaves, especially what it does when information is missing or uncertain.

> **Example:** The Empathy Architect (Advisor 3) never presents fictional persona traits as researched fact and labels hypotheses. The Narrative Craftsman (Advisor 7) never invents brand standards or unapproved leader commitments and labels its voice as provisional.

## Who they are, what they do, how they think

The eight elements fall into three groups. Use this grouping when you review a persona or explain the design to a colleague.

| Group | Elements | What it answers | If it is weak |
|---|---|---|---|
| Who they are | 1 Professional identity, 2 Mission, 7 Personality and challenge style | Whose voice is this, and what does it care about? | Advisors sound alike and do not challenge |
| What they do | 3 Scope and boundaries, 5 Core capabilities, 6 Deliverables | What can I ask for, and what is out of bounds? | Advisors overlap, overreach, or produce vague outputs |
| How they think | 4 Decision-making lens, 8 Operating rules | How does it reason, and how does it behave under uncertainty? | Outputs are polished but generic, or invent client context |

## Why element 8 matters most

Without operating rules, a persona produces polished but generic documents or invents client context. Both failures are dangerous because they look like good work.

A language model will fill gaps. If you ask for a readiness assessment without readiness data, a persona with no operating rules will often supply plausible scores. If you ask for a case for change without financial data, it may supply plausible benefits. The output reads well, and nothing in it is true for your client.

Operating rules stop this. A well-written set does four things:

1. **Forbids fabrication.** No invented facts, scores, baselines, financial benefits, quotes, or commitments.
2. **Defines behavior when data is missing.** Ask targeted questions, or proceed with clearly labeled assumptions.
3. **Separates facts from assumptions** in every output so you can see what needs validating.
4. **Ties the advisor to the shared context.** Work from the Client Change Context Brief and flag anything that conflicts with it.

These rules echo the Board Operating Charter's principles: business-outcome focus, facts separated from assumptions, no fabricated data, and client-specific advice. The charter sets them for the whole board. Each advisor's element 8 applies them to its own discipline.

> **Watch out:** When you test a persona, the first thing to check is element 8. Give it an incomplete request and see what happens. If it asks questions or labels assumptions, the rules are working. If it produces confident specifics you never supplied, fix element 8 before using that persona on a live engagement. Chapter 21, "Testing and Quality Assurance," gives the full set of test scenarios.

## Persona-design checklist

Use this checklist when you review an existing persona or write a new one. Appendix A, "Persona Configuration Prompts," contains the full configuration text for all ten advisors.

- [ ] **Identity** names a specific professional background, not "an expert in change."
- [ ] **Mission** is one sentence stating an outcome, not a list of activities.
- [ ] **Scope** lists what the advisor owns, and **boundaries** state at least one thing it must never do or claim.
- [ ] **Lens** includes a single core question and a standard structure for answers.
- [ ] **Capabilities** are specific enough that you could write a request against each one.
- [ ] **Deliverables** are named artifacts you would recognize on an engagement.
- [ ] **Personality** includes three or four distinct traits, and **challenge style** names what the advisor pushes back on.
- [ ] **Operating rules** forbid fabrication, define behavior when data is missing, and require labeled assumptions.
- [ ] The persona references the Client Change Context Brief and the standard nine-section response format.
- [ ] The persona's challenge style is distinct from the others on the board.

## How to tune or extend a persona

You will adjust personas as you use them. Tune when an advisor behaves in a way you do not want. Extend when a client needs depth the standard persona does not cover.

### Tuning

Diagnose which element is causing the problem, then change only that element.

| Symptom | Likely element | Adjustment |
|---|---|---|
| Output is generic and could apply to any client | 8 Operating rules | Require use of Context Brief details and questions when they are missing |
| Advisor invents numbers or commitments | 8 Operating rules | Strengthen the no-fabrication rule with discipline-specific examples |
| Advisor agrees with everything | 7 Personality and challenge style | Name what it must challenge and require at least one challenge per response |
| Advisor drifts into another discipline | 3 Scope and boundaries | Add a boundary and a routing rule to the relevant advisor |
| Deliverables are vague or unstructured | 6 Deliverables, 4 Lens | Specify the deliverable structure and the answer standard |
| Tone does not suit the audience | 7 Personality | Adjust traits for executive or working-level audiences |

> **Tip:** Change one element at a time and rerun the same test prompt. If you change several at once, you will not know which change fixed the problem.

### Extending

Extend a persona when a client context needs specialist depth, for example a regulated industry or a works council environment in [country].

1. **Add, do not replace.** Add industry or regional context to identity and capabilities. Keep the original mission and lens.
2. **Add boundaries with the depth.** If you add regulatory knowledge, add a rule that the advisor flags legal or regulatory points for verification rather than stating them as settled.
3. **Keep client-specific content out of the persona.** Client facts belong in the Context Brief. Keep generic, reusable persona text separate from client-specific information so personas remain reusable across engagements.
4. **Retest.** Run the eight test scenarios from Chapter 21 on the extended persona before live use.

> **Watch out:** Resist adding an eleventh advisor. Most needs can be met by extending an existing persona or by a cross-functional request. If you do add one, give it all eight elements, a distinct challenge style, and defined "works with" partners, and confirm with your director that it does not duplicate an existing scope.

## Before you move on

- [ ] You can name the eight elements and group them into who, what, and how.
- [ ] You can explain why operating rules matter most.
- [ ] You know how to test element 8 with an incomplete request.
- [ ] You can diagnose a persona problem to a single element.
