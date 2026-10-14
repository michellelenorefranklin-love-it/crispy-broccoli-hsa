# Demo script: 10 minutes, 7 acts

**Before the room fills:** open the demo, click **Reset demo** twice, and set text size to 110–120% for a projector. Press **P** to check presenter notes, then close them.

**Start:** click **Start Executive Demo** (top right). The bar at the bottom shows act, step, and a one-line prompt. Use **→ / ←** or Next/Back. Where a step has a green action button (e.g. *Ask "Help me get started"*), click it to run that interaction. **Esc** exits at any time; **Resume demo** picks up where you left off.

The one sentence to land: **"AI transformation succeeds when technology, process, people, and governance evolve together."**

---

## Act 1 — The current-state problem (1 min)

**Screen:** Current state (hypotheses)

- *Say:* "Before the future, a hypothesis about today. Jordan is a new analyst in Corporate Finance on day 3. To get set up, Jordan contacts five or more teams, isn't sure what access to ask for, and has no way to see status."
- Point to the **Hypotheses to validate in discovery** label. *Ask the room:* "Does this match what you see? What makes you believe that?"
- Note the Why / Who / How framing. That's where discovery starts.

## Act 2 — The future-state experience (1.5 min)

**Step 2 · Employee Experience.** Click **Ask "Help me get started"**. (The step turns on *Behind the scenes*.)

- *Say:* "Same person, same day. One question in plain language."
- Point to the **status strip** under the reply: *Understood intent → Checked policy → Proposed action → Approval needed → Submitted → Next steps*. "This isn't the model's internal reasoning. It's a plain-language receipt."
- Point to the **action badge**: *Initiate workflow*, not *Execute*. "The assistant started a request. It didn't grant anything."
- Point to **Behind the scenes**: workflow, owner, risk tier, approver, ServiceNow record (RITM0048213), audit events.
- Right column: open requests now show the FinReport request pending Alex.

**Step 3 · Onboarding.** *Say:* "Everything the assistant did is on the onboarding timeline." FinReport is *Pending approval*; the laptop is flagged *Delayed* as a bottleneck. Click a step to show owner, control, and linked change intervention.

## Act 3 — Controlled access (2 min)

**Step 4 · Access, Standard.**

- *Say:* "This is the part that matters most for a financial services firm: who actually decides."
- Show the **three columns**: what AI does · what's automated under approved policy · what stays with an authorized human.
- In the approver panel (**Alex Morgan**, the Teams-style card), click **Approve**. Then point out:
  - Jordan's side updates (*Provisioned*), and Jordan gets a message in the assistant.
  - The **audit trail** shows each event with its actor (AI agent / human / system).
  - Provisioning happens **only after** approval.
- Optional: show **Approval rules**. You can tighten them (e.g. add the app owner to Standard requests, shorten the JIT window); policy floors are locked.

**Step 5 · Access, Blocked (SoD).**

- *Say:* "Now Jordan asks for payments release. The assistant can't do it, and says why in plain language."
- Point to the policy explanation, the failed SoD check, the alternatives offered, and *routed to IAM*.
- The approver panel switches to **Marcus Lee (IAM)**. There's no *Approve* button: only *Uphold block* or *Request info*. "An exception goes through formal risk acceptance, not through a chatbot." Click **Uphold block**.

## Act 4 — IT support (1.5 min)

**Step 6 · IT Support, VPN.** Click **Ask about the VPN**.

- Point out device context, the knowledge article, and the **flag that the article is 14 months old** (outdated-knowledge behaviour).
- Click **Still not connecting**. The safe diagnostic finds an expired certificate; the automatic renewal **fails**, and the assistant says so. It creates **INC0091734** with full context. "No silent failures." (Alternatively click *That fixed it* to show self-service resolution.)

**Step 7 · High-risk + console.** Click **Report the suspicious MFA prompt**.

- *Say:* "A different kind of request. The assistant recognises a possible compromise and stops self-service." P1 **INC0091802** goes to Security Operations, with clear instructions for Jordan.
- In **Priya's console**: AI summaries, suggested articles, escalation reasons, and human review status. Open the new incident. *Say:* "Priya's work shifts from repetitive triage to complex troubleshooting, exceptions, and knowledge curation. The service desk doesn't disappear."

## Act 5 — Behind the scenes (1.5 min)

**Step 8 · Federated model.** "Every interaction you saw runs on a workflow with a named owner." Three rings: central platform and AI governance own guardrails; **process owners own the business rules** (as you told us); certified team builders build within permissions. *Proposed model for discussion.*

**Step 9 · Review lanes.** "Bottlenecks come from unclear decision rights, not from controls." Fast lane / Standard / Enhanced, scaled to risk. Point at the **bottleneck radar**: security review is where work queues, and the remedy is pre-approved patterns and SLAs.

**Step 10 · Team Onboarding.** "Onboarding a team is a use case in its own right." Walk the tracker: define needs (automation opportunities from ticket history) → assign roles → **certification gates build rights** → comms pack → first workflow in sandbox → risk tier and review lane → controlled release → named owner and 90-day review.

Optional live moment: in **Builder**, raise a workflow to **High**. Reviews are added and execution is restricted, and you can't lower it below the policy floor.

## Act 6 — The human change journey (1.5 min)

**Step 11 · Failure-mode simulator.** The step opens with **Without OCM**. "Same workflow, technically working. Employees still message colleagues for access, approvals stall in inboxes, builders ship without owners." Toggle **With OCM**: adoption climbs, workarounds fall, ownership is clear. Land it: **"A workflow can work technically and still fail operationally."**

**Step 12 · Comms and learning.** Comms are drafted for each audience: executive, employee, manager, service desk, builder, access explainer, responsible-AI guide, and pilot invite. Each one is editable, with a copy button. Mention: builders learn process design, data permissions, testing, exceptions, approval boundaries, and ownership, not just the tool.

## Act 7 — Value, risk, and decisions (1.5 min)

**Step 13 · Executive Value.** "Measured in-platform, validated by the business."

- The **session strip** shows what happened in this demo: requests, approvals, audit events.
- Every efficiency metric is **paired with a balancing metric**. Speed doesn't count if quality, repeat incidents, satisfaction, or control health get worse.
- Change one assumption in the benefits model. The **formulas are visible**, and time released, capacity redeployable, cashable savings, and realized benefit are kept separate. **No headcount conversion.**

**Step 14 · Decisions & next steps.** "These are the action items you asked for."

- Decisions only the Client can make (integration model, scope, AI decision boundaries, federated governance, channel retirement), assumptions to validate, priority discovery questions, and pilot next steps, each with a suggested owner.
- Close: "Can we agree owners for the top three decisions before we leave?" Use **Copy as action list** to paste into the meeting notes.

---

## If you have more time

- **Architecture:** toggle **Overlay ↔ Consolidated** and ask which system should be the record for tickets, catalog, and access. Don't resolve it in the room.
- **Change impact heatmap:** click a cell and edit it live with the room's input.
- **Elevated access:** shows a policy conflict (training prerequisite vs. quarter-end access), three sequential approvers, and time-bound access.
- **Password reset:** shows the identity-verification gate; MFA can't be skipped.
- **"Connect me to a human"** works at any point and hands Priya a summary.

## Recovering mid-demo

- Something looks off: **Reset demo** (click twice), then **Start Executive Demo**. Steps re-create the state they need.
- Jumped ahead by accident: **←** or **Back**.
- Lost the bar: **Resume demo** in the top bar.
