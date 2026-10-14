import type { OnboardingTask } from '../types'

export const onboardingTasks: OnboardingTask[] = [
  {
    id: 'ob-offer', title: 'Offer accepted', status: 'Done', owner: 'Talent Acquisition', dependsOn: [], due: 'Day −21',
    type: 'Human approval', system: 'HRIS', control: 'Signed offer and background check on file',
    risk: 'Starting without completed screening', changeIntervention: 'Pre-day-1 welcome comms',
    detail: 'Offer signed and screening complete. This is the trigger for every downstream onboarding step.',
  },
  {
    id: 'ob-hr', title: 'HR record & onboarding workflow', status: 'Done', owner: 'HR Operations (Sam Rivera)', dependsOn: ['ob-offer'], due: 'Day −14',
    type: 'Automated', system: 'HRIS → Serval → ServiceNow', control: 'Worker record is the source of truth for identity and role',
    risk: 'Wrong department or cost centre drives wrong access', changeIntervention: 'Pre-day-1 welcome comms',
    detail: 'The HRIS hire event starts the onboarding workflow. Department, location, and job code come from the worker record and are not typed by hand.',
  },
  {
    id: 'ob-equip', title: 'Equipment (laptop, peripherals)', status: 'Delayed', owner: 'End User Services', dependsOn: ['ob-hr'], due: 'Day 1',
    type: 'Automated', system: 'ServiceNow (REQ0031877)', control: 'Asset tagged to employee before hand-off',
    risk: 'Employee idle or working on a loaner without standard controls', changeIntervention: 'Day-1 assistant walkthrough',
    detail: 'Standard finance laptop is back-ordered at the New York depot. A loaner is in use. The assistant flags this as a bottleneck and gives a revised date (Day 5).',
  },
  {
    id: 'ob-account', title: 'Account provisioned (email, Teams, SSO)', status: 'Done', owner: 'Identity provider (automated)', dependsOn: ['ob-hr'], due: 'Day 1',
    type: 'Automated', system: 'Identity provider', control: 'Birthright access only; MFA enrolment enforced on first sign-in',
    risk: 'Over-provisioning on day 1', changeIntervention: 'Day-1 assistant walkthrough',
    detail: 'Birthright accounts created from the worker record. MFA enrolled on first sign-in.',
  },
  {
    id: 'ob-needs', title: 'Access needs assessed', status: 'Not started', owner: 'Assistant + Alex Morgan (manager)', dependsOn: ['ob-account'], due: 'Day 3',
    type: 'Employee action', system: 'Serval', control: 'Role-based access model for Corporate Finance analysts',
    risk: 'Copying a colleague’s access ("make me like Sam")', changeIntervention: 'Access approval explainer',
    detail: 'The assistant proposes the access a Corporate Finance analyst typically needs, based on the role model, and asks Jordan to confirm. Nothing is granted at this step.',
  },
  {
    id: 'ob-apps', title: 'Finance apps requested (FinReport read-only)', status: 'Not started', owner: 'Alex Morgan (manager approval)', dependsOn: ['ob-needs'], due: 'Day 4',
    type: 'Human approval', system: 'Serval workflow → ServiceNow RITM', control: 'Manager approval; provisioning only after approval',
    risk: 'Access granted without approval or with excess privilege', changeIntervention: 'Access approval explainer',
    detail: 'FinReport read-only is birthright-eligible for the role but still needs manager approval. Provisioning runs only after approval and is logged.',
  },
  {
    id: 'ob-training', title: 'Mandatory compliance training', status: 'In progress', owner: 'Jordan Taylor', dependsOn: ['ob-account'], due: 'Day 10',
    type: 'Employee action', system: 'LMS', control: 'Completion tracked; some app access depends on it',
    risk: 'Regulatory training overdue', changeIntervention: 'Training rationale',
    detail: '3 modules assigned: Code of Conduct (done), Information Security Essentials (in progress), Market Abuse & Insider Information (not started, due Day 10).',
  },
  {
    id: 'ob-manager', title: 'Manager intro & week-1 check-in', status: 'Not started', owner: 'Alex Morgan', dependsOn: ['ob-hr'], due: 'Day 5',
    type: 'Human approval', system: 'Teams calendar', control: 'Manager confirms role expectations and access are right',
    risk: 'New hire unclear on expectations', changeIntervention: 'Day-7 pulse survey',
    detail: 'Alex gets a prompt in Teams with Jordan’s onboarding status so the check-in starts from facts.',
  },
  {
    id: 'ob-30', title: 'Day-30 feedback', status: 'Not started', owner: 'HR Operations', dependsOn: ['ob-manager'], due: 'Day 30',
    type: 'Employee action', system: 'Survey tool', control: 'Feedback routed to process owners, not just HR',
    risk: 'Onboarding problems never reach the people who can fix them', changeIntervention: 'Day-30 employee + manager checkpoint',
    detail: 'Short survey for Jordan and Alex. Results feed the onboarding process owner’s improvement backlog.',
  },
]

export const changeSupport = [
  { stage: 'Pre-day 1', intervention: 'Welcome comms with what to expect and how to get help', audience: 'New hire', behavior: 'Arrives knowing the assistant is the front door', owner: 'HR Ops + Change team', risk: 'Day-1 anxiety; calls to the wrong team' },
  { stage: 'Day 1', intervention: 'Guided assistant walkthrough (5 minutes)', audience: 'New hire', behavior: 'Uses the assistant first for questions and status', owner: 'Service Desk + Change team', risk: 'Falls back to emailing colleagues' },
  { stage: 'Day 3', intervention: 'Access approval explainer', audience: 'New hire + manager', behavior: 'Requests minimum access; manager approves in Teams', owner: 'IAM + Change team', risk: '"Make me like Sam" requests; approvals stuck in email' },
  { stage: 'Week 1', intervention: 'Training rationale ("why this module, by when")', audience: 'New hire', behavior: 'Completes mandatory training on time', owner: 'Compliance Learning', risk: 'Overdue regulatory training' },
  { stage: 'Day 7', intervention: 'Pulse survey (3 questions)', audience: 'New hire', behavior: 'Reports friction early', owner: 'HR Ops', risk: 'Problems surface only at exit interviews' },
  { stage: 'Day 30', intervention: 'Employee + manager checkpoint', audience: 'New hire + manager', behavior: 'Joint review of what worked', owner: 'HR Ops + process owners', risk: 'Onboarding process never improves' },
]
