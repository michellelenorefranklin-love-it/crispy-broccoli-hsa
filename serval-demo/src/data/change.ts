import type { ChangeImpact, Communication, LearningPath, Stakeholder, ChangeDegree } from '../types'
import { clientConfig } from '../config/client'

export const stakeholders: Stakeholder[] = [
  { id: 'emp', name: 'General employees', group: 'Workforce' },
  { id: 'nh', name: 'New hires', group: 'Workforce' },
  { id: 'mgr', name: 'Managers', group: 'Workforce' },
  { id: 'sd', name: 'Service desk', group: 'Service teams' },
  { id: 'hr', name: 'HR operations', group: 'Service teams' },
  { id: 'po', name: 'Process owners', group: 'Operating model' },
  { id: 'wb', name: 'Workflow builders', group: 'Operating model' },
  { id: 'ao', name: 'App owners', group: 'Control owners' },
  { id: 'iam', name: 'IAM', group: 'Control owners' },
  { id: 'risk', name: 'Security, risk & compliance', group: 'Control owners' },
  { id: 'pa', name: 'Platform admins', group: 'Technology' },
  { id: 'exec', name: 'Executive sponsors', group: 'Leadership' },
]

export const useCases: ChangeImpact['useCase'][] = ['Onboarding', 'Access', 'IT Support', 'Workflow building']

const D: Record<string, ChangeDegree[]> = {
  emp: ['Low', 'Medium', 'High', 'Low'],
  nh: ['High', 'High', 'Medium', 'Low'],
  mgr: ['Medium', 'High', 'Low', 'Low'],
  sd: ['Medium', 'Medium', 'High', 'Medium'],
  hr: ['High', 'Low', 'Low', 'High'],
  po: ['Medium', 'Medium', 'Medium', 'High'],
  wb: ['Low', 'Low', 'Low', 'High'],
  ao: ['Low', 'High', 'Low', 'Medium'],
  iam: ['Medium', 'High', 'Low', 'Medium'],
  risk: ['Low', 'High', 'Medium', 'High'],
  pa: ['Medium', 'Medium', 'Medium', 'High'],
  exec: ['Low', 'Medium', 'Low', 'Medium'],
}

const specific: Record<string, Partial<ChangeImpact>> = {
  'mgr|Access': { behaviorChange: 'Approves access in Teams with a clear summary, instead of replying to email threads', concern: '“I’ll be accountable for approvals I don’t understand”', comms: 'Manager briefing + access-approval explainer', training: 'Manager path: approving access (15 min)', owner: 'IAM + Change lead' },
  'sd|IT Support': { behaviorChange: 'Less repetitive triage; picks up escalations with full context; curates knowledge and gives automation feedback', concern: '“Is AI replacing my job?”', comms: 'Service desk note + team listening session', training: 'Service desk path: working with AI summaries', owner: 'Service Desk Manager' },
  'nh|Onboarding': { behaviorChange: 'Uses the assistant as the single front door from day 1', concern: '“Who do I ask when the assistant can’t help?”', comms: 'Pre-day-1 welcome + day-1 walkthrough', training: 'Employee path (15 min)', owner: 'HR Ops + Change lead' },
  'wb|Workflow building': { behaviorChange: 'Builds within assigned permissions; every workflow ships with a named owner and tests', concern: '“The review process will slow us down”', comms: 'Builder onboarding pack', training: 'Builder certification (gates build rights)', owner: 'Platform team' },
  'risk|Access': { behaviorChange: 'Sets policy floors once; reviews High-tier changes instead of every request', concern: '“AI will approve things it shouldn’t”', comms: 'Responsible-AI guide + control walkthrough', training: 'Risk path: AI risk tiers and audit evidence', owner: 'AI Governance Lead' },
  'hr|Workflow building': { behaviorChange: 'HR Ops builds and owns its own workflows on the platform', concern: '“We don’t have capacity to build and run workflows”', comms: 'Team onboarding session', training: 'Builder + process-owner paths', owner: 'HR Ops lead' },
  'emp|IT Support': { behaviorChange: 'Starts with the assistant; asks for a human when needed', concern: '“I’ll be stuck in a bot loop”', comms: 'Employee announcement (what changes / what doesn’t)', training: 'Quick-reference guide', owner: 'Change lead' },
  'ao|Access': { behaviorChange: 'Approves elevated access with full context; recertifies time-bound access', concern: '“More approvals landing on me”', comms: 'App-owner briefing', training: 'App owner path (20 min)', owner: 'IAM' },
}

export const seedImpacts: ChangeImpact[] = stakeholders.flatMap((s) =>
  useCases.map((u, i) => {
    const sp = specific[`${s.id}|${u}`] ?? {}
    const degree = D[s.id][i]
    return {
      stakeholderId: s.id,
      useCase: u,
      degree,
      behaviorChange: sp.behaviorChange ?? (degree === 'Low' ? 'Awareness of the new front door; little change to daily work' : `Works differently in ${u.toLowerCase()} — new channel, new status visibility, new hand-offs`),
      concern: sp.concern ?? (degree === 'High' ? '“What does this mean for my role?”' : '“How do I get help if it doesn’t work?”'),
      comms: sp.comms ?? (degree === 'Low' ? 'Employee announcement' : 'Targeted briefing'),
      training: sp.training ?? (degree === 'High' ? 'Role-based learning path' : 'Quick-reference guide'),
      owner: sp.owner ?? 'Change lead',
    }
  }),
)

export const journeyStages = [
  { stage: 'Discover', know: 'Something is changing, and why', leaders: 'Why this matters for clients and colleagues', support: 'Listening sessions, exec announcement', measure: 'Awareness pulse' },
  { stage: 'Understand', know: 'What changes and what doesn’t for me', leaders: 'What it means for our team', support: 'Journey demos, manager briefings', measure: 'Understanding pulse; questions logged' },
  { stage: 'Prepare', know: 'My role, my access, where to get help', leaders: 'What I expect from you, and my support', support: 'Team onboarding sessions, learning paths', measure: 'Training completion; readiness checklist' },
  { stage: 'Practice', know: 'How to use it safely, including when to ask a human', leaders: 'Try it; tell us what breaks', support: 'Sandbox, quick-reference guides, responsible-AI guidance', measure: 'Proficiency checks' },
  { stage: 'Adopt', know: 'The assistant is the front door', leaders: 'Recognise good use; stop old workarounds', support: 'Champion network, office hours', measure: 'Active use; workaround rate' },
  { stage: 'Reinforce', know: 'It keeps getting better because of my feedback', leaders: 'Share wins and fixes', support: 'Surveys, reinforcement, recognition', measure: 'Satisfaction; trust; sustained use' },
]

export const programPhases = [
  { phase: 'Discovery', change: 'Stakeholder map, listening sessions, current-state journeys', decisions: 'Scope, integration model, sponsors', stakeholders: 'Sponsors, process owners, IAM, risk', risk: 'Solving the wrong problem', evidence: 'Validated pain points with baselines', exit: 'Use cases and baselines agreed' },
  { phase: 'Design', change: 'Change impact assessment, role definitions, comms strategy', decisions: 'Decision rights, risk tiers, review lanes', stakeholders: 'Process owners, AI governance, HR', risk: 'Roles undefined at launch', evidence: 'Impact heatmap signed off', exit: 'Operating model approved for pilot' },
  { phase: 'Build', change: 'Learning paths, builder certification, champion recruitment', decisions: 'Pilot cohort, success measures', stakeholders: 'Builders, platform team, champions', risk: 'Builders untrained; no owners', evidence: 'Certified builders; owners named', exit: 'Workflows owned and tested' },
  { phase: 'Test', change: 'User testing with real employees; comms tested', decisions: 'Go / no-go criteria', stakeholders: 'Pilot users, risk, service desk', risk: 'Controls untested with real behaviour', evidence: 'Test results incl. control tests', exit: 'Control and UX tests passed' },
  { phase: 'Pilot', change: 'Manager briefings, office hours, pulse surveys', decisions: 'Scale / adjust / stop', stakeholders: 'Pilot teams, managers', risk: 'Workarounds persist unseen', evidence: 'Adoption + balancing metrics', exit: 'Targets met without control regressions' },
  { phase: 'Launch', change: 'Exec + employee announcements, champions active', decisions: 'Wave plan', stakeholders: 'All impacted groups', risk: 'Service desk overwhelmed', evidence: 'Readiness checklist per wave', exit: 'Wave readiness confirmed' },
  { phase: 'Stabilize', change: 'Hypercare, rapid fixes, feedback loops', decisions: 'Hypercare exit', stakeholders: 'Service desk, process owners', risk: 'Early trust lost', evidence: 'Incident trend; satisfaction', exit: 'Stable for 4 weeks' },
  { phase: 'Optimize', change: 'Reinforcement, new team onboarding, benefits review', decisions: 'Next teams and use cases', stakeholders: 'Sponsors, process owners', risk: 'Benefits claimed, not realised', evidence: 'Benefits realisation report', exit: 'Business signs off realised value' },
]

const C = clientConfig.displayName
export const seedCommunications: Communication[] = [
  { id: 'c-exec', title: 'Executive announcement', audience: 'All employees', timing: 'Launch −4 weeks', sender: 'Chris Okafor, CIO', objective: 'Explain why, and what it means for clients and colleagues', keyMessage: 'Getting help should be simple, fast, and safe.', cta: 'Watch the 3-minute journey demo', feedback: 'Pulse survey + Q&A channel',
    body: `${C} is introducing a new way to get help with IT, access, and onboarding. Starting with a pilot group, you'll be able to ask an assistant in Teams or the portal and see the status of your requests in one place.\n\nThis is about making it easier to do your job, not replacing the people who support you. Every access decision still goes through the right approvers, and you can reach a person at any time.\n\nWe'll start small, learn from you, and expand only when it's working well.` },
  { id: 'c-emp', title: 'Employee announcement', audience: 'Pilot employees', timing: 'Launch −1 week', sender: 'Service Management lead', objective: 'Prepare employees to use it on day one', keyMessage: 'Ask the assistant first; a human is always one step away.', cta: 'Try “Where is my request?” in Teams', feedback: 'Thumbs up/down on every answer',
    body: `What changes: You can ask the assistant for help with IT issues, access requests, and onboarding tasks, in Teams or the portal.\n\nWhat doesn't change: Approvals, security checks, and your service desk are all still there. The assistant can't grant access on its own.\n\nHow to get help: Type "connect me to a human" at any time, or call the service desk as usual.` },
  { id: 'c-mgr', title: 'Manager briefing', audience: 'People managers (pilot)', timing: 'Launch −2 weeks', sender: 'Business line leaders', objective: 'Managers approve confidently and model the behaviour', keyMessage: 'You’ll approve access in Teams, with a clear summary of what’s being asked and why.', cta: 'Attend a 20-minute briefing', feedback: 'Manager office hours',
    body: `From launch, access requests for your team arrive in Teams with the app, role, justification, and policy outcome. You approve, reject, or ask for more information there.\n\nPlease stop granting access informally ("use my login", "I'll ask IT to copy Sam's access"). The new route is faster and keeps you covered at audit.` },
  { id: 'c-sd', title: 'Service desk note', audience: 'Service desk', timing: 'Launch −3 weeks', sender: 'Service Desk Manager', objective: 'Explain how the role changes and why it matters', keyMessage: 'Less repetitive triage; more complex problem-solving and knowledge ownership.', cta: 'Join the listening session', feedback: 'Weekly team retro',
    body: `Escalations will arrive with an AI summary, steps already tried, and a suggested next step. Please review summaries rather than trust them blindly, and flag bad ones; that feedback improves the system.\n\nYour expertise is still needed. The goal is to take repetitive triage off your plate, not to remove the service desk.` },
  { id: 'c-wb', title: 'Workflow-builder onboarding', audience: 'Team workflow builders', timing: 'Team onboarding week', sender: 'Platform team', objective: 'Builders know their boundaries and responsibilities', keyMessage: 'You can build for your team, within guardrails, with a named owner.', cta: 'Complete builder certification', feedback: 'Builder community channel',
    body: `Welcome to the builder community. Once certified, you can build workflows for your team in the sandbox using approved components.\n\nEvery workflow needs a named owner, test cases, and a risk tier. Low-tier workflows use the fast lane; higher tiers get proportionate review.` },
  { id: 'c-access', title: 'Access-request explainer', audience: 'All employees', timing: 'At first access request', sender: 'IAM', objective: 'Set expectations on approvals', keyMessage: 'The assistant helps you ask for the right access; authorised people decide.', cta: 'Request only what you need', feedback: 'Rating after request closes',
    body: `When you ask for access, the assistant works out the app, role, and the minimum access you need, and checks it against policy.\n\nYour manager — and for some apps, the app owner and IAM — then decides. Privileged access is time-bound. You'll see the status of your request at every step.` },
  { id: 'c-rai', title: 'Responsible-AI guide', audience: 'All employees', timing: 'Launch', sender: 'AI Governance Lead', objective: 'Build calibrated trust', keyMessage: 'The assistant can inform, recommend, and start workflows. It cannot bypass controls.', cta: 'Read the 1-page guide', feedback: 'Report a bad answer button',
    body: `Four kinds of action: Inform (answers from approved knowledge), Recommend (suggests a next step), Initiate workflow (starts a request that may need approval), Execute approved action (only when policy and approvals allow).\n\nIf an answer looks wrong or outdated, say so. Security concerns always go straight to a person.` },
  { id: 'c-pilot', title: 'Pilot invite', audience: 'Pilot cohort', timing: 'Pilot −3 weeks', sender: 'Sponsor + Change lead', objective: 'Recruit engaged pilot users', keyMessage: 'Help shape how 45,000 colleagues will get help.', cta: 'Accept the pilot invite', feedback: 'Pilot feedback sessions',
    body: `You've been invited to join the pilot for a new way to get help with IT, access, and onboarding. We need your honest feedback, especially when things don't work.\n\nTime commitment: about 30 minutes in week one, then normal use.` },
]

export const learningPaths: LearningPath[] = [
  { id: 'lp-emp', audience: 'Employees', objectives: ['Use the assistant for help and status', 'Know when to ask a human', 'Spot and report a bad answer'], modules: [{ title: 'Your new front door', minutes: 5 }, { title: 'Asking for access the right way', minutes: 5 }, { title: 'Responsible AI in 5 minutes', minutes: 5 }], practice: 'Ask three practice questions in the sandbox', proficiency: '3-question check', resources: ['Quick-reference guide', 'Responsible-AI guide'] },
  { id: 'lp-mgr', audience: 'Managers', objectives: ['Approve access with confidence', 'Model the new behaviour', 'Support the team through change'], modules: [{ title: 'Approving access in Teams', minutes: 10 }, { title: 'What changes for your team', minutes: 10 }], practice: 'Approve, reject, and request info on sample requests', proficiency: 'Scenario check (approve vs. reject)', resources: ['Manager briefing', 'FAQ'] },
  { id: 'lp-sd', audience: 'Service desk', objectives: ['Work from AI summaries critically', 'Curate knowledge', 'Feed back on automations'], modules: [{ title: 'Reading and correcting AI summaries', minutes: 20 }, { title: 'Knowledge ownership', minutes: 15 }, { title: 'Automation feedback loop', minutes: 10 }], practice: 'Triage 10 sample escalations', proficiency: 'Supervisor-observed shift', resources: ['Console guide', 'Escalation matrix'] },
  { id: 'lp-po', audience: 'Process owners', objectives: ['Own rules, approval paths, SLAs, exceptions', 'Run Standard-lane reviews', 'Run 90-day reviews'], modules: [{ title: 'Process ownership on the platform', minutes: 30 }, { title: 'Risk tiers and review lanes', minutes: 20 }], practice: 'Review a sample workflow submission', proficiency: 'Review checklist sign-off', resources: ['Review checklist', 'Tier guide'] },
  { id: 'lp-wb', audience: 'Workflow builders', gatesBuildRights: true, objectives: ['Design processes, not just flows', 'Respect data permissions and approval boundaries', 'Test, handle exceptions, and hand over ownership'], modules: [{ title: 'Process design fundamentals', minutes: 30 }, { title: 'Data permissions & boundaries', minutes: 25 }, { title: 'Testing & exception handling', minutes: 30 }, { title: 'Approval boundaries & risk tiers', minutes: 20 }, { title: 'Ownership & lifecycle', minutes: 15 }, { title: 'Tool navigation', minutes: 20 }], practice: 'Build and test “Employee address change” in sandbox', proficiency: 'Certification: build review + test pass', resources: ['Pattern library', 'Builder community'] },
  { id: 'lp-pa', audience: 'Platform admins', objectives: ['Manage connectors and environments', 'Run controlled releases', 'Monitor and roll back'], modules: [{ title: 'Environments & release control', minutes: 40 }, { title: 'Connectors & two-way sync', minutes: 40 }, { title: 'Monitoring & rollback', minutes: 30 }], practice: 'Release and roll back a sandbox workflow', proficiency: 'Release drill', resources: ['Runbooks'] },
  { id: 'lp-risk', audience: 'Risk & compliance', objectives: ['Apply AI risk tiers', 'Review High-tier workflows', 'Use audit evidence'], modules: [{ title: 'AI risk tiers & policy floors', minutes: 30 }, { title: 'Reading audit trails', minutes: 20 }], practice: 'Enhanced-lane review of a sample workflow', proficiency: 'Review sign-off', resources: ['Control library', 'Audit evidence guide'] },
]
