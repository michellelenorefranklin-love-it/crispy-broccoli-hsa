import { useDemo } from '../store/store'

export interface Notes {
  question: string
  audience: string
  points: string[]
}

/** Presenter notes per screen (used when exploring outside the guided demo). */
export const routeNotes: Record<string, Notes> = {
  '/employee': {
    question: '“What will this actually feel like for our employees?”',
    audience: 'Executive sponsors, HR, service desk leaders',
    points: [
      'One front door for onboarding, access, IT issues, and training, in Teams or the portal.',
      'Every answer shows a plain-language status strip: what it understood, what it checked, whether approval is needed.',
      'Four action types: Inform, Recommend, Initiate workflow, Execute approved action. That split is the backbone of the responsible-AI story.',
      'Turn on “Behind the scenes” to show the workflow, owner, risk tier, ServiceNow record, and audit events behind any answer.',
    ],
  },
  '/onboarding': {
    question: '“How does onboarding get coordinated across HR, IT, and the manager?”',
    audience: 'HR, IT leadership, hiring managers',
    points: [
      'Every step has an owner, a type (automated, employee action, human approval), a control, and a linked change intervention.',
      'The assistant flags the laptop delay as a bottleneck instead of letting Jordan find out on day 5.',
      'Change support is built into each stage, not bolted on at go-live.',
    ],
  },
  '/access': {
    question: '“Can AI grant access? Who is accountable?”',
    audience: 'IAM, security, risk & compliance, app owners',
    points: [
      'AI assists; authorized humans decide. Provisioning runs only after every required approval.',
      'Switch scenarios: Standard (manager only), Elevated (manager + app owner + IAM, time-bound), Blocked (SoD conflict).',
      'Switch to Alex or Dana and actually approve. Jordan’s status, the audit trail, and the executive metrics update live.',
      'Approval rules can be tightened here, never loosened below the policy floor.',
    ],
  },
  '/support': {
    question: '“What happens to the service desk?”',
    audience: 'Service desk leaders, IT leadership, Information Security',
    points: [
      'VPN: knowledge → guided steps → safe diagnostic → resolved, or escalated with full context.',
      'Password: identity verification gate first. MFA cannot be skipped.',
      'High-risk: possible compromise stops self-service and goes straight to Security.',
      'Priya’s console: less repetitive triage, more complex work. The service desk does not disappear.',
    ],
  },
  '/workflow': {
    question: '“If every team can build workflows, how do we avoid chaos — and bottlenecks?”',
    audience: 'Process owners, AI governance, platform team, risk',
    points: [
      'Federated model: central team owns guardrails; process owners own business rules; certified builders build within permissions.',
      'Risk tier drives the review lane. Low = fast lane, High = enhanced review. Proportionate, not uniform.',
      'Team Onboarding walks HR Ops onto the platform: needs, roles, training, comms, first workflow, release, ownership.',
      'Try raising a workflow to High: reviews are added and execution is restricted. It can’t be lowered past policy.',
    ],
  },
  '/change': {
    question: '“What do people need to adopt this and keep using it?”',
    audience: 'Change team, HR, managers, sponsors',
    points: [
      'Six workstreams, with responsible AI as a cross-cutting band.',
      'The heatmap is editable. Use it live to capture the room’s view of impact.',
      'Failure-mode simulator: the same workflow, launched with and without OCM. It can work technically and still fail operationally.',
    ],
  },
  '/value': {
    question: '“What value will we see, and how will we know it’s real?”',
    audience: 'Executive sponsors, finance, CIO',
    points: [
      'Every number is illustrative. The model shows its formulas and assumptions; edit them live.',
      'Time released ≠ capacity redeployed ≠ cashable savings ≠ realized benefit. No headcount conversion.',
      'Each efficiency metric is paired with a balancing metric. Speed doesn’t count if quality or controls get worse.',
    ],
  },
  '/architecture': {
    question: '“How do Serval and ServiceNow fit together?”',
    audience: 'IT leadership, architecture, platform owners',
    points: [
      'Toggle Overlay ↔ Consolidated to discuss which system is the system of record for tickets, catalog, and access.',
      'We are not resolving this today. It is a decision for the Client, informed by discovery.',
      'Every box is tagged: publicly described, conceptual, or needs validation.',
    ],
  },
  '/current-state': {
    question: '“Why change?”',
    audience: 'Everyone',
    points: ['These are hypotheses to validate in discovery, not findings about the Client.', 'Ask: “What makes you believe that?”'],
  },
  '/decisions': {
    question: '“What do we need to do next?”',
    audience: 'Executive sponsors and workstream leads',
    points: ['These are the action items the Client asked for: decisions, assumptions, discovery questions, pilot steps, each with an owner.', 'Close by agreeing owners and dates for the top three decisions.'],
  },
}

export interface DemoStep {
  act: number
  actTitle: string
  title: string
  route: string
  minutes: number
  say: string
  points: string[]
  question: string
  action?: { label: string; run: () => void }
  enter?: () => void
}

const S = () => useDemo.getState()

export const demoSteps: DemoStep[] = [
  {
    act: 1, actTitle: 'The current-state problem', title: 'Today: five teams, no status, repeated questions', route: '/current-state', minutes: 1,
    say: 'Before we show the future, here’s a hypothesis about today. Jordan, a new analyst, has to chase five teams to get set up.',
    points: ['Label: hypotheses to validate in discovery.', 'Ask the room: “Does this match what you see? What makes you believe that?”'],
    question: 'Why change?',
  },
  {
    act: 2, actTitle: 'The future-state experience', title: 'Jordan asks for help getting started', route: '/employee', minutes: 1,
    say: 'Same person, same day 3. Jordan asks one question in plain language.',
    points: ['Point to the status strip: understood → checked policy → proposed → approval needed.', 'Note the action badge: “Initiate workflow”, not “Execute”.', 'Turn on Behind the scenes.'],
    question: 'What will this feel like for employees?',
    action: { label: 'Ask “Help me get started”', run: () => { S().set({ behindScenes: true }); S().send('Help me get started') } },
  },
  {
    act: 2, actTitle: 'The future-state experience', title: 'The checklist, live on the onboarding timeline', route: '/onboarding', minutes: 0.5,
    say: 'Everything the assistant did is reflected on the onboarding timeline: FinReport is pending Alex’s approval, the laptop is flagged as a bottleneck.',
    points: ['Click a step to show owner, control, and linked change intervention.'],
    question: 'How is onboarding coordinated?',
  },
  {
    act: 3, actTitle: 'Controlled access', title: 'Standard request: Alex approves in Teams', route: '/access?scenario=standard', minutes: 1,
    say: 'Now the part that matters most for a financial services firm: who actually decides.',
    points: ['Show the three columns: what AI does, what’s automated under policy, what stays with a human.', 'Switch to Alex, approve, and watch Jordan’s status and the audit trail update.'],
    question: 'Can AI grant access?',
    enter: () => { S().submitAccess('standard', 'assistant'); S().set({ approverView: 'alex' }) },
  },
  {
    act: 3, actTitle: 'Controlled access', title: 'Blocked: segregation-of-duties conflict', route: '/access?scenario=blocked', minutes: 1,
    say: 'Jordan now asks for payments release. The assistant can’t, and says why in plain language.',
    points: ['It stops before submission, routes to IAM, and offers alternatives.', 'Switch to Marcus (IAM): only a human can uphold or review. No path grants the conflicting role.'],
    question: 'What happens when someone asks for something they shouldn’t have?',
    enter: () => { S().submitAccess('blocked', 'assistant'); S().set({ approverView: 'marcus' }) },
  },
  {
    act: 4, actTitle: 'IT support', title: 'VPN: guided fix or escalation with context', route: '/support?scenario=vpn', minutes: 0.75,
    say: 'Jordan’s VPN fails. The assistant uses device context and knowledge, and flags that the article is 14 months old.',
    points: ['Choose “Still not connecting” to show the diagnostic, the failed renewal, and INC0091734.', 'No silent failure.'],
    question: 'What happens when automation fails?',
    action: { label: 'Ask about the VPN', run: () => S().send('My VPN isn’t connecting') },
  },
  {
    act: 4, actTitle: 'IT support', title: 'High-risk: possible compromise goes to Security', route: '/support?scenario=security&view=console', minutes: 0.75,
    say: 'A different kind of request. The assistant recognises a possible compromise and stops self-service.',
    points: ['P1 to Security Operations with clear instructions for Jordan.', 'Priya’s console shows AI summaries, escalation reasons, and human review. Her role shifts; it doesn’t disappear.'],
    question: 'What does the service desk do now?',
    action: { label: 'Report the suspicious MFA prompt', run: () => S().send('I got a weird MFA prompt I didn’t trigger and now FinReport looks different') },
  },
  {
    act: 5, actTitle: 'Behind the scenes', title: 'Who owns it, who can build it', route: '/workflow?tab=model', minutes: 0.5,
    say: 'Behind each of those interactions is a workflow with a named owner. Here’s the proposed federated model.',
    points: ['Governance largely owned by process teams, as you told us.', 'Central team owns guardrails and release controls.'],
    question: 'Who owns the workflows?',
  },
  {
    act: 5, actTitle: 'Behind the scenes', title: 'Proportionate review lanes', route: '/workflow?tab=lanes', minutes: 0.5,
    say: 'Bottlenecks come from unclear decision rights, not from controls. Three lanes, scaled to risk.',
    points: ['Fast lane for Low tier; Enhanced for privileged and sensitive work.', 'Bottleneck radar shows where work queues.'],
    question: 'How do we limit bottlenecks?',
  },
  {
    act: 5, actTitle: 'Behind the scenes', title: 'Team Onboarding: HR Ops joins as builders', route: '/workflow?tab=onboarding', minutes: 0.5,
    say: 'Onboarding a team is a use case in its own right: define needs, assign roles, train, communicate, build, release, own.',
    points: ['Builder certification gates build rights.', 'Every workflow has a named owner and a 90-day review.'],
    question: 'How do teams get onto the platform?',
  },
  {
    act: 6, actTitle: 'The human change journey', title: 'Same workflow, with and without OCM', route: '/change?tab=failure', minutes: 0.75,
    say: 'A workflow can work technically and still fail operationally. Toggle OCM off.',
    points: ['Without OCM: colleagues still grant access informally, approvals stall in inboxes, builders ship without owners.', 'With OCM: adoption climbs, workarounds fall, ownership is clear.'],
    question: 'Why invest in change management?',
    enter: () => S().set({ ocmOn: false }),
  },
  {
    act: 6, actTitle: 'The human change journey', title: 'Comms and learning paths, ready to edit', route: '/change?tab=comms', minutes: 0.75,
    say: 'The comms and learning are drafted already. Managers get a briefing; builders get more than tool training.',
    points: ['Drafts are illustrative and need Client review.', 'Copy any draft to the clipboard.'],
    question: 'What will we send, and to whom?',
  },
  {
    act: 7, actTitle: 'Value, risk, and decisions', title: 'Value with balancing metrics', route: '/value', minutes: 0.75,
    say: 'Value is measured in-platform and validated by the business. Every efficiency metric is paired with a balancing metric.',
    points: ['Edit an assumption live. Formulas are visible.', 'Never converted to headcount.'],
    question: 'How will we know it’s working?',
  },
  {
    act: 7, actTitle: 'Value, risk, and decisions', title: 'Decisions, owners, next steps', route: '/decisions', minutes: 0.75,
    say: 'Here are the action items: the decisions only you can make, what to validate, and a recommended pilot path.',
    points: ['Agree owners for the top three decisions before leaving the room.'],
    question: 'What do we do next?',
  },
]

export const demoMinutes = demoSteps.reduce((a, s) => a + s.minutes, 0)
