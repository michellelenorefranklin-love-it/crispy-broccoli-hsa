# Speaker script — Future of Work | AI Employee Experience

<!-- Generated from src/demo/speakerScript.ts by `npm run docs:script`. Edit that file, not this one. -->

Seven acts, 14 steps, about 12 minutes plus discussion. The same script appears inside the demo: press **P** during the guided demo, or open the printable version at `#/speaker-script` (link in the presenter notes and the left sidebar).

> **AI transformation succeeds when technology, process, people, and governance evolve together.**

Land this sentence at the start and the end. Every act is evidence for it.

## Run of show

| Act | What the room sees | Time |
|---|---|---|
| — | Opening (before you click anything) | 0:30 |
| 1 | The current-state problem | 1:00 |
| 2 | The future-state experience | 1:45 |
| 3 | Controlled access | 2:00 |
| 4 | IT support | 1:30 |
| 5 | Behind the scenes | 1:45 |
| 6 | The human change journey | 1:30 |
| 7 | Value, risk, and decisions | 1:30 |
| | **Total, then discussion** | **11:30** |

## Before you present

**The day before**

- [ ] Rehearse once end to end with a timer. Aim for about 11 minutes and leave 10–20 minutes for discussion.
- [ ] Set the client name and logo in src/config/client.ts only if the client has approved it; otherwise keep “the Client”.
- [ ] Copy dist/index.html to a USB stick as a fallback. It is one self-contained file and needs no internet.
- [ ] Print this script, or plan to open it on your laptop screen in a second window (see “Two-screen setup”).

**15 minutes before**

- [ ] Open the demo in Chrome or Edge and go full screen (F11 on Windows, Ctrl+Cmd+F on Mac). Browser zoom 100%.
- [ ] Click “Reset demo” in the top bar, then click it again to confirm. Do this before every session.
- [ ] Set text size with A− / A+ (110–120% for a projector, 100% for a laptop huddle).
- [ ] Leave “Provenance on”: the tags are part of the credibility story.
- [ ] Close presenter notes if open (press P). Test → and Esc once, then Reset again.
- [ ] Turn off notifications. If the client Wi-Fi is unreliable, switch to airplane mode: the demo runs fully offline.

**Two-screen setup (recommended)**

1. Extend (not mirror) your display so the projector shows only the demo window.
2. Run the demo on the projector screen.
3. On your laptop screen, open a second window at the same file with #/speaker-script at the end of the address, or use the “Open speaker script” link in the presenter notes. This page is read-only and safe to keep open.
4. If you can only mirror, print this script instead. The bottom demo bar always shows the act, the step, and a one-line prompt.

## Controls

| Control | What it does |
|---|---|
| Start Executive Demo | Starts the guided walkthrough (top right). After you exit, it reads “Resume demo”. |
| Green button in the bottom bar | Runs that step’s interaction for you, such as Jordan asking a question. Each step’s button works once. |
| →  /  Next | Next step (moves to the right screen and sets up the scenario). |
| ←  /  Back | Previous step. |
| P | Presenter notes on or off. During the demo they show this script for the current step. Don’t press it while the room can see your screen unless you mean to. |
| Esc | Closes an open side panel first; otherwise exits the guided demo. |
| Reset demo (click twice) | Restores all seeded data. Use it between sessions or to recover. |

## Opening · 0:30

**Do:** Stay on the Employee Experience screen. Don’t click anything yet.

**Say:**

> Thank you for the time. In our conversations you’ve told us you’re working through what teams need to do their jobs, what access levels should look like, who gets to build workflows, how to keep governance with the process teams, and how to avoid bottlenecks.
>
> So rather than slides, we’re going to follow one new employee, Jordan, through the first week. Then we’ll pull back the curtain on what has to be true behind each moment: the process, the controls, the people side, and how you’d measure value.
>

## Act 1 · The current-state problem

### Step 1. Today: five teams, no status, repeated questions

*Screen: Current state (hypotheses) · ~60s · starts at 0:30*

**Do:**

1. Click “Start Executive Demo” (top right).
2. Click two or three touchpoints in the swimlane, e.g. “Asked to approve by email, then again in the portal”, to reveal the pain point.

**Say:**

> Let’s start with a hypothesis about today, and I want to stress the word hypothesis.
>
> This is Jordan Taylor, a financial analyst in Corporate Finance, in the first few days. To get set up, Jordan touches HR, the service desk, the manager, the FinReport owner, and facilities: five or more teams. Jordan isn’t sure which access to ask for. The manager is asked to approve by email and then again in a portal. And nobody can tell Jordan where things stand, so Jordan asks again, and every one of those questions becomes a ticket.
>
> Does this match what you see? And what makes you believe that?

**Point at:** The amber “Hypotheses to validate in discovery” banner · The pain tiles, each tagged “Needs validation” · The Why / Who / How panel

**Transition:** *“Hold that picture. Now: same person, same day 3, different experience.”*

**If asked — Are these your numbers or ours?** Neither yet. They’re placeholders to test. In discovery we replace each one with your baseline, or drop it if it isn’t true here.

## Act 2 · The future-state experience

### Step 2. Jordan asks for help getting started

*Screen: Employee Experience · ~75s · starts at 1:30*

**Do:**

1. Press → (or Next).
2. Click the green “Ask “Help me get started”” button in the bottom bar. It also turns on “Behind the scenes”.
3. Scroll the chat to the reply. Point to the status strip, then the “Initiate workflow” badge, then the dashed “Behind the scenes” box.

**Say:**

> Jordan opens the assistant. Here it’s in the portal; the same assistant can sit in Microsoft Teams. One sentence: “Help me get started.”
>
> It builds a checklist for a Corporate Finance analyst, starts what it is allowed to start, and is explicit about what it is not allowed to do.
>
> Look at this strip. It isn’t the AI’s inner monologue; it’s a plain-language receipt: what it understood, which policy it checked, what it proposed, whether approval is needed, and what it submitted.
>
> And this badge says “Initiate workflow”, not “Execute”. It raised the FinReport request. It did not grant anything. Alex, Jordan’s manager, still decides.
>
> With “Behind the scenes” on, you can see the workflow it used, who owns that workflow, its risk tier, the ServiceNow record it created, and the audit events.

**Point at:** Status strip under the reply · “Initiate workflow” badge · Behind the scenes: owner, risk tier, RITM0048213 · Right column: “My open requests” shows RITM0048213 and the delayed laptop

**Transition:** *“That one sentence touched four teams’ processes. Here’s how it shows up on Jordan’s onboarding.”*

**If asked — What are the four action types?** Inform, Recommend, Initiate workflow, and Execute approved action. The last one happens only after policy and the required approvals allow it.

### Step 3. The checklist, live on the onboarding timeline

*Screen: Onboarding · ~30s · starts at 2:45*

**Do:**

1. Press →.
2. Click the timeline step “Finance apps requested (FinReport read-only)” to open its detail panel. Press Esc to close it.

**Say:**

> Every step in onboarding has an owner; a type, meaning automated, employee action, or human approval; a control; and the change intervention that supports it.
>
> FinReport is now pending Alex’s approval. The laptop is back-ordered, so the assistant flagged it as a bottleneck and gave Jordan a revised date, instead of Jordan finding out on day 5.

**Point at:** Amber bottleneck callout · “Awaiting approval” tile · Change support cards at the bottom (pre-day-1 comms, day-7 pulse survey, day-30 checkpoint)

**Transition:** *“Now the moment that matters most for a financial services firm: who actually decides on access.”*

## Act 3 · Controlled access

### Step 4. Standard request: Alex approves in Teams

*Screen: Access & Permissions — Standard · ~60s · starts at 3:15*

**Do:**

1. Press →. The approver view is already set to “Alex · Manager” (the Teams-style card).
2. Optional: type a short comment such as “Approved for month-end”.
3. Click “Approve”.
4. Point to “Jordan’s side, live”: it changes to Provisioned. Then scroll down to the Audit trail and the three columns.

**Say:**

> AI assistance is not authorisation. The three columns further down make that explicit: what the AI does, what is automated under approved policy, and what stays with an authorised human.
>
> Here is Alex’s approval card, in Teams rather than an email thread, with the app, the role, the justification, and the policy result. I’ll approve as Alex.
>
> Watch Jordan’s side: provisioned, and Jordan gets a message. Provisioning ran only after the approval. Every step is in the audit trail, labelled by who did it: AI agent, human, or system.

**Point at:** Teams approval card · Jordan’s side, live → Provisioned · Audit trail rows tagged AI agent / Human / System · Approval rules card: the locked policy floors

**Transition:** *“That’s the easy case. Let’s see what happens when Jordan asks for something they shouldn’t have.”*

**If asked — Could low-risk requests just auto-approve?** Rules here can be tightened. Loosening them is a policy decision for your IAM and risk teams, not a demo setting, so the floors are locked.

**If asked — What about privileged access?** Switch to “Elevated”: journal posting needs manager, app owner, and IAM approval, and it expires after 30 days.

### Step 5. Blocked: segregation-of-duties conflict

*Screen: Access & Permissions — Blocked (SoD) · ~60s · starts at 4:15*

**Do:**

1. Press →.
2. Click the green “Ask for payments-release access” button in the bottom bar.
3. Read Jordan’s side: the assistant declines, explains, and offers alternatives.
4. In the approver view (now “Marcus · IAM”), point out there is no Approve button. Click “Uphold block”.

**Say:**

> Jordan now asks for access to the payments release system. The assistant can’t help, and it says why in plain language: the same person shouldn’t be able to post a journal and release the payment it supports. That is segregation of duties.
>
> It stopped before anything was submitted, sent the context to IAM, and offered legitimate alternatives.
>
> On Marcus’s side in IAM, notice there is no approve button. Marcus can uphold the block or ask for more information. An exception would go through your formal risk-acceptance process, not through a chatbot. I’ll uphold it, and Jordan is told.

**Point at:** Failed SoD check in red · “Provisioning: Not permitted” in the flow · Approver card with only “Uphold block” and “Request info”

**Transition:** *“Access is one half of Jordan’s week. The other half is when things break.”*

## Act 4 · IT support

### Step 6. VPN: guided fix, then escalation with context

*Screen: IT Support — VPN · ~45s · starts at 5:15*

**Do:**

1. Press →.
2. Click the green “Ask about the VPN” button.
3. Point at the amber warning that the article was last reviewed 14 months ago.
4. Click “Still not connecting” (a chip in the chat, or the button on the left tracker).
5. Point at incident INC0091734.

**Say:**

> Jordan’s VPN won’t connect. The assistant pulls device context and finds the knowledge article, and it flags that the article is fourteen months old so Jordan knows to treat it with care.
>
> Jordan tries the steps and it’s still broken. The assistant runs a safe, read-only diagnostic, finds an expired certificate, and tries the automated renewal. That workflow fails.
>
> The important part: it tells Jordan. No silent failure. It opens an incident with everything already tried, so Jordan won’t have to repeat it.

**Point at:** “Heads up: KB0012044 was last reviewed 14 months ago” · Status strip showing the failed renewal · Incident INC0091734 in the tracker

**Transition:** *“Now a different kind of request, one the assistant should not try to solve at all.”*

**If asked — Can it resolve things too, not just escalate?** Yes. Click “That fixed it” instead and it closes as a self-service resolution, logged and checked against repeat incidents.

### Step 7. High-risk: possible compromise goes to Security

*Screen: IT Support — Service desk console · ~45s · starts at 6:00*

**Do:**

1. Press →. The screen opens on Priya’s service desk console.
2. Click the green “Report the suspicious MFA prompt” button.
3. Click the new P1 row INC0091802 in the queue. Point to the AI summary and the escalation reason.
4. Optional: click INC0091734 and “Accept AI summary” to show human review.

**Say:**

> Jordan reports an MFA prompt they didn’t trigger, and FinReport looks different. The assistant recognises a possible compromise, stops self-service entirely, raises a priority-one incident with Security Operations, and tells Jordan exactly what to do and what happens next.
>
> Over on Priya’s console in the service desk, every escalation arrives with an AI summary, what has been tried, a suggested next step, and why it was escalated. Priya reviews and corrects those summaries, and that feedback improves the automation.
>
> Her work shifts from repetitive triage to complex troubleshooting and exceptions. The service desk doesn’t disappear. The work changes.

**Point at:** P1 row INC0091802, Security Operations · “Resolve: SOC only” lock on the P1 · “How Priya’s role changes” panel

**Transition:** *“Everything you’ve just seen ran on a workflow. Who owns those workflows, and who is allowed to build them?”*

**If asked — What does this mean for headcount?** We deliberately don’t convert time into headcount. Whether released capacity is redeployed is your decision, measured after go-live.

## Act 5 · Behind the scenes

### Step 8. Who owns it, who can build it

*Screen: Workflow & Governance — Operating model · ~30s · starts at 6:45*

**Do:**

1. Press →.
2. Click each of the three rings in turn.

**Say:**

> You told us governance is largely owned by the process teams, and that each team will build its own workflows. Here is a proposed model for that.
>
> The central platform and AI governance team owns the guardrails: standards, reusable components, monitoring, and release controls. Process owners own the business rules: approval paths, SLAs, and exceptions. Certified team builders configure within the permissions they’re given. And every workflow has a named owner after release.

**Point at:** “You told us” chips · “Proposed model for discussion” label · Portfolio health strip: % with named owners

**Transition:** *“The obvious worry: if everything is reviewed, everything slows down.”*

### Step 9. Proportionate review lanes

*Screen: Workflow & Governance — Review lanes · ~30s · starts at 7:15*

**Do:**

1. Press →.
2. Point across the three lanes, then at the bottleneck chart.

**Say:**

> Bottlenecks usually come from unclear decision rights, not from controls. So review scales with risk.
>
> Low-risk workflows built from pre-approved patterns go through a fast lane. Routine requests get a process-owner review. Privileged access and sensitive financial data get the enhanced review.
>
> The radar shows where work is queuing; in this example, security review. The remedy is reusable patterns and review SLAs, not removing the review.

**Point at:** Median cycle time per lane (illustrative) · Security/privacy review hotspot

**Transition:** *“You also asked how teams get onto the platform in the first place.”*

### Step 10. Team Onboarding: HR Ops joins as builders

*Screen: Workflow & Governance — Team onboarding · ~45s · starts at 7:45*

**Do:**

1. Press →.
2. In step 1, tick two services (e.g. “Employee data changes” and “Letters”). Click “Pass gate”.
3. Point at the locked tiles to the right: each step opens only when the previous gate passes. Step 3 (“Role-based training”) is where certification unlocks build rights.

**Say:**

> Onboarding a team is a use case in its own right. Here is HR Operations.
>
> First, define what the team needs: its services and top ticket drivers. Serval can suggest automation opportunities from ticket history. Then assign named people to roles, then train them, and certification is what unlocks build rights.
>
> Then the team gets its comms pack, builds its first workflow in a sandbox, goes through the review lane its risk tier requires, and is released to a pilot group. The last gate is ownership: a named owner and a 90-day review on the calendar.

**Point at:** Seven-step tracker with readiness gates · “Automation candidate” tags on ticket drivers · Certification status per person

**Transition:** *“So far: technology and process. Here’s where most programmes actually fail: people.”*

## Act 6 · The human change journey

### Step 11. Same workflow, with and without OCM

*Screen: Change & Adoption — Failure-mode simulator · ~45s · starts at 8:30*

**Do:**

1. Press →. The screen opens on “Without OCM”.
2. Point at the green “Workflow: working ✓” tile.
3. Click “With OCM” and let the numbers and the chart change.

**Say:**

> This is the same access workflow, launched twice. Technically it works both times; see the tile.
>
> Without change management, employees keep messaging colleagues for access, approvals sit in managers’ inboxes, the service desk still gets “where’s my request?” calls, and builders ship workflows with no owner.
>
> With it (manager briefings, comms, champions, training), adoption climbs, workarounds fall, and ownership is clear. A workflow can work technically and still fail operationally.

**Point at:** “Workflow: working ✓” in both modes · Informal access grants per week · Adoption curve

**Transition:** *“None of that has to start from a blank page.”*

### Step 12. Comms and learning paths, ready to edit

*Screen: Change & Adoption — Communications · ~45s · starts at 9:15*

**Do:**

1. Press →.
2. Click the “Manager briefing” draft. Click “Copy draft”.
3. Click the “Learning paths” tab and point at the workflow-builder path.

**Say:**

> You mentioned developing the comms for the teams. Every audience has a draft here: the executive announcement; the employee announcement, covering what changes, what doesn’t, and how to get help; managers; the service desk; workflow builders; the access explainer; the responsible-AI guide; and the pilot invite.
>
> They’re illustrative drafts for your review, editable here, and one click to copy.
>
> And the learning paths: workflow builders learn process design, data permissions, testing, exceptions, approval boundaries, and ownership. Navigating the tool is only a small part of it.

**Point at:** “Illustrative draft — requires client review” banner · Builder curriculum split (tool navigation is a minority) · “Gates build rights” badge

**Transition:** *“Finally: how would you know it’s working?”*

## Act 7 · Value, risk, and decisions

### Step 13. Value with balancing metrics

*Screen: Executive Value · ~45s · starts at 10:00*

**Do:**

1. Press →.
2. Point at the “From this demo session” strip: it counted what you just did.
3. Turn on “Simulate: repeat incidents rise to 9%” and show the self-service gain marked “Not counted”. Turn it off again.
4. Optional: change one assumption in the benefits model (e.g. adoption %) and show the formulas update.

**Say:**

> You said business value needs to live in the tool. This is measured in-platform and validated by the business.
>
> The top strip is live from what we just did: the approvals, the audit events, the incidents.
>
> Every efficiency metric is paired with a balancing metric. If I simulate repeat incidents rising, the self-service gain stops counting.
>
> The benefits model shows its formulas and keeps four things separate: time released, capacity you could redeploy, cashable savings, and realised benefit, which stays blank until your business owner confirms it. We never convert this into headcount.

**Point at:** Live session strip · “Balanced by” line on each efficiency tile · The four benefit stages and their formulas

**Transition:** *“Which brings us to what we need from you.”*

### Step 14. Decisions, owners, next steps

*Screen: Decisions & next steps · ~45s · starts at 10:45*

**Do:**

1. Press →.
2. Walk the four sections top to bottom. Set an item to “Agreed” live if the room agrees an owner.
3. Click “Copy as action list” and paste it into your meeting notes afterwards.
4. Press Esc to exit the guided demo and take questions.

**Say:**

> These are the action items you asked us to define.
>
> Five decisions only you can make: the integration model, the scope, what AI may decide on its own, what teams can configure themselves, and which support channels you retire. Then the assumptions we’d validate, the discovery questions we’d start with, and a recommended path to a controlled pilot, each with a suggested owner.
>
> Could we agree owners for the top three decisions before we leave today?

**Point at:** Decisions section · Suggested owners, to be confirmed · “Copy as action list”

## Closing

> To close where we started: AI transformation succeeds when technology, process, people, and governance evolve together.
>
> What you saw is a simulation. The next step is a short discovery to make it true for you: real baselines, real journeys, and the decisions on this screen.

## Questions you’re likely to get

**Is this the real Serval product?**  
No. It’s a simulation built around capabilities Serval describes publicly, tagged “Publicly described”. Anything tagged “Conceptual” or “Needs validation” is ours to confirm with you and the vendor.

**Will Serval replace ServiceNow?**  
That’s a decision for you, and it’s on the Decisions screen. The Architecture view toggles between overlay, where ServiceNow stays the system of record, and progressive consolidation, so you can discuss both.

**Can the AI approve access?**  
No. It can inform, recommend, and initiate. It executes only after the required approvals, and policy floors such as SoD blocks can’t be switched off.

**What if it gives a wrong answer?**  
It answers from approved knowledge, flags stale articles, says when it isn’t sure, and offers a person at any time. Wrong answers are reported and fixed through the knowledge owner.

**What happens to the service desk?**  
The work changes rather than disappears: less repetitive triage, more complex troubleshooting, exception handling, knowledge curation, and automation feedback.

**What’s the ROI?**  
We show the model and its formulas, not a promise. Value is confirmed against your baselines, with balancing metrics, and validated by the business owner after go-live.

**What about data privacy?**  
It’s on the validation list: where data is processed and stored, retention, and model-training terms need confirmation with Serval and your risk team.

**How fast could we pilot?**  
PILOT_NEXT_STEPS.md has an indicative path: about 2–3 weeks of discovery, then design, build and test, and an 8–12 week controlled pilot in one business unit.

## Shorter and longer versions

| Version | Length | Steps | How |
|---|---|---|---|
| Executive short version | 5 min | Steps 2, 4, 5, 7, 11, 14 | Use → to move through; skip optional clicks. Lead with the core message and end on decisions. |
| Full guided demo | 10–11 min | All 14 steps | The default. Leave 10–20 minutes for discussion afterwards. |
| IAM / risk deep dive | +10 min | After step 5 | Switch Access to “Elevated” and approve as Alex, Dana, and Marcus in turn. Tighten an approval rule. Show the audit trail and Workflow → Risk tiers. |
| HR / process owners deep dive | +10 min | After step 10 | Pass every Team Onboarding gate, then show the Builder: raise a workflow to High risk and show it can’t go back below the policy floor. |
| Service desk deep dive | +5 min | After step 7 | Run the password scenario (MFA gate), then correct an AI summary and mark one unhelpful in Priya’s console. |
| Architecture discussion | +5–10 min | After step 13 | Open Architecture, toggle Overlay ↔ Consolidated, and work through the “Questions to validate”. |

## If something goes wrong

| Problem | Fix |
|---|---|
| Clicked the wrong thing / state looks odd | Press ← then → to re-enter the step. If it’s still wrong, click Reset demo twice and then Start Executive Demo. Steps set up what they need. |
| The green action button is greyed out | It has already run for this step. Use the chips in the chat instead, or just narrate. |
| Demo bar disappeared | You pressed Esc. Click “Resume demo” in the top bar. |
| Someone asks the assistant something off-script | Type it in. Unknown questions get an honest “I’d rather not guess, I can route that to a person”, which is a good responsible-AI moment. |
| Projector cuts off the edges | Lower the text size with A−, or browser zoom to 90%. |
| Laptop dies | Open dist/index.html from the USB stick on any laptop. No install, no internet. |

*All people, data, and integrations in the demo are fictional or simulated. Numbers are illustrative.*
