import type { Permission, Role, Team, WorkflowDefinition, WorkflowStep, RiskTier, ReviewLane, LifecycleStage } from '../types'

export const teams: Team[] = [
  { id: 'sd', name: 'IT Service Desk', services: ['Incidents', 'How-to', 'Device issues'], onboardingStatus: 'Live',
    topDrivers: [{ label: 'Password / unlock', volume: 2100, automatable: true }, { label: 'VPN / connectivity', volume: 1400, automatable: true }, { label: 'Software install', volume: 900, automatable: true }] },
  { id: 'cf', name: 'Corporate Finance', services: ['FinReport access', 'Reporting support'], onboardingStatus: 'Requester only',
    topDrivers: [{ label: 'FinReport access', volume: 380, automatable: true }, { label: 'Report refresh errors', volume: 210, automatable: false }] },
  { id: 'hr', name: 'HR Operations', services: ['Employee data changes', 'Letters', 'Leave questions', 'Onboarding'], onboardingStatus: 'Onboarding (this demo)',
    topDrivers: [
      { label: 'Address / personal-details change', volume: 1240, automatable: true },
      { label: 'Employment verification letter', volume: 860, automatable: true },
      { label: 'Leave balance question', volume: 1530, automatable: true },
      { label: 'Benefits enrolment question', volume: 640, automatable: false },
      { label: 'Manager change / reorg', volume: 410, automatable: false },
    ] },
  { id: 'iam', name: 'IAM', services: ['Access requests', 'Access reviews', 'SoD exceptions'], onboardingStatus: 'Live',
    topDrivers: [{ label: 'Application access', volume: 3200, automatable: true }, { label: 'Access review follow-ups', volume: 700, automatable: false }] },
  { id: 'sec', name: 'Information Security', services: ['Security incidents', 'Phishing reports'], onboardingStatus: 'Live (escalation target)',
    topDrivers: [{ label: 'Suspicious email', volume: 950, automatable: false }, { label: 'MFA anomalies', volume: 120, automatable: false }] },
  { id: 'aig', name: 'AI Governance', services: ['Guardrails', 'Release controls', 'Monitoring'], onboardingStatus: 'Central team',
    topDrivers: [] },
]

export const roles: Role[] = [
  { id: 'requester', name: 'Requester', purpose: 'Use the assistant to get help and request services',
    permitted: ['Ask questions', 'Submit requests', 'See own status', 'Ask for a human'], buildPermissions: 'None',
    dataBoundaries: 'Own records only', approvalAuthority: 'None', productionDeploy: 'No', requiredTraining: 'Responsible-AI basics (10 min)',
    accountableOwner: 'Employee’s manager', escalation: 'Service desk' },
  { id: 'builder', name: 'Team Workflow Builder', purpose: 'Build workflows for the team’s own services within assigned permissions',
    permitted: ['Build in sandbox', 'Use approved components', 'Run tests', 'Submit for review'], buildPermissions: 'Sandbox; own team’s catalog only',
    dataBoundaries: 'Team’s data domains as granted; no privileged-access actions', approvalAuthority: 'None', productionDeploy: 'No — submits to review lane',
    requiredTraining: 'Builder certification (process design, data permissions, testing, exceptions, approval boundaries, ownership)',
    accountableOwner: 'Process owner', escalation: 'Platform team' },
  { id: 'owner', name: 'Process Owner', purpose: 'Own business rules, approval paths, SLAs, and exceptions for a process',
    permitted: ['Define rules and approval paths', 'Approve Standard-lane releases', 'Own post-release performance'], buildPermissions: 'Review and edit team workflows',
    dataBoundaries: 'Process domain', approvalAuthority: 'Standard-lane releases; business exceptions', productionDeploy: 'Approves; platform deploys',
    requiredTraining: 'Process ownership & AI risk tiers', accountableOwner: 'Business line leader', escalation: 'AI Governance Lead' },
  { id: 'admin', name: 'Platform Admin', purpose: 'Run the platform: integrations, components, environments, releases',
    permitted: ['Manage connectors', 'Publish reusable components', 'Execute releases', 'Monitor'], buildPermissions: 'All environments',
    dataBoundaries: 'Configuration, not business data', approvalAuthority: 'Technical release readiness', productionDeploy: 'Yes, after approvals',
    requiredTraining: 'Platform admin + change control', accountableOwner: 'Head of Service Management', escalation: 'CIO office' },
  { id: 'risk', name: 'Security/Risk Approver', purpose: 'Review High-tier workflows and privileged actions',
    permitted: ['Enhanced-lane review', 'Set control requirements', 'Block release'], buildPermissions: 'Read-only',
    dataBoundaries: 'Read access to workflow definitions and audit', approvalAuthority: 'Enhanced-lane releases', productionDeploy: 'No',
    requiredTraining: 'AI risk review method', accountableOwner: 'CISO / CRO delegate', escalation: 'Risk committee' },
  { id: 'aigov', name: 'AI Governance Lead', purpose: 'Set guardrails, tiers, and lifecycle controls; monitor the portfolio',
    permitted: ['Define risk tiers and policy floors', 'Approve new components', 'Recertify / retire workflows'], buildPermissions: 'Read-only',
    dataBoundaries: 'Portfolio metadata and audit', approvalAuthority: 'Guardrail changes', productionDeploy: 'No',
    requiredTraining: 'AI governance framework', accountableOwner: 'CIO', escalation: 'Technology risk committee' },
]

export const permissionMatrix: Permission[] = (() => {
  const levels: Record<string, Record<string, Permission['level']>> = {
    requester: { sd: 'Use', cf: 'Use', hr: 'Use', iam: 'Use', sec: 'Use', aig: 'Use' },
    builder: { sd: 'Build + submit', cf: 'None', hr: 'Build + submit', iam: 'Build (sandbox)', sec: 'None', aig: 'None' },
    owner: { sd: 'Approve', cf: 'Approve', hr: 'Approve', iam: 'Approve', sec: 'Approve', aig: 'None' },
    admin: { sd: 'Administer', cf: 'Administer', hr: 'Administer', iam: 'Administer', sec: 'Administer', aig: 'Administer' },
    risk: { sd: 'Approve', cf: 'Approve', hr: 'Approve', iam: 'Approve', sec: 'Approve', aig: 'Approve' },
    aigov: { sd: 'Use', cf: 'Use', hr: 'Use', iam: 'Use', sec: 'Use', aig: 'Administer' },
  }
  return Object.entries(levels).flatMap(([roleId, row]) => Object.entries(row).map(([teamId, level]) => ({ roleId, teamId, level })))
})()

export const standardSteps = (): WorkflowStep[] => [
  { id: 's1', label: 'Request received', kind: 'trigger' },
  { id: 's2', label: 'Intent classified', kind: 'ai' },
  { id: 's3', label: 'Policy checked', kind: 'policy' },
  { id: 's4', label: 'Approval required?', kind: 'approval' },
  { id: 's5', label: 'Execute approved action', kind: 'action' },
  { id: 's6', label: 'Record outcome', kind: 'record' },
  { id: 's7', label: 'Notify employee', kind: 'notify' },
]

export const tierOrder: RiskTier[] = ['Low', 'Medium', 'High']
export const laneForTier: Record<RiskTier, ReviewLane> = { Low: 'Fast lane', Medium: 'Standard', High: 'Enhanced' }
export const requiredReviewsForTier: Record<RiskTier, string[]> = {
  Low: ['Automated checks (pre-approved pattern)'],
  Medium: ['Process-owner review'],
  High: ['Process-owner review', 'Security/risk review', 'AI Governance sign-off'],
}

export const lifecycle: LifecycleStage[] = [
  'Design', 'Risk assessment', 'Process-owner review', 'Security/privacy review', 'Test', 'Approve', 'Controlled release', 'Monitor', 'Recertify / retire',
]

export const seedWorkflows: WorkflowDefinition[] = [
  { id: 'wf-finreport-ro', name: 'FinReport read-only access', team: 'IAM', owner: 'Marcus Lee', riskTier: 'Medium', policyFloor: 'Medium',
    approvals: ['Manager'], humanThreshold: 'Any non-birthright role', dataScope: 'Identity, role model', testStatus: 'Passed', releaseStatus: 'Production',
    lane: 'Standard', stage: 'Monitor', steps: standardSteps(), daysInStage: 41 },
  { id: 'wf-finreport-jit', name: 'FinReport journal posting (JIT)', team: 'IAM', owner: 'Dana Brooks', riskTier: 'High', policyFloor: 'High',
    approvals: ['Manager', 'App owner', 'IAM'], humanThreshold: 'Always', dataScope: 'Identity, role model, SoD rules', testStatus: 'Passed', releaseStatus: 'Production',
    lane: 'Enhanced', stage: 'Monitor', steps: standardSteps(), daysInStage: 18 },
  { id: 'wf-vpn', name: 'VPN guided troubleshooting', team: 'IT Service Desk', owner: 'Priya Shah', riskTier: 'Low', policyFloor: 'Low',
    approvals: [], humanThreshold: 'Diagnostic fails or user asks', dataScope: 'Device posture (read-only)', testStatus: 'Passed', releaseStatus: 'Production',
    lane: 'Fast lane', stage: 'Monitor', steps: standardSteps(), daysInStage: 63 },
  { id: 'wf-onboarding', name: 'New-hire onboarding orchestration', team: 'HR Operations', owner: 'Sam Rivera', riskTier: 'Medium', policyFloor: 'Medium',
    approvals: ['Manager (access items)'], humanThreshold: 'Any access item; any exception', dataScope: 'Worker record (non-sensitive fields)', testStatus: 'Passed', releaseStatus: 'Pilot',
    lane: 'Standard', stage: 'Controlled release', steps: standardSteps(), daysInStage: 9 },
  { id: 'wf-letter', name: 'Employment verification letter', team: 'HR Operations', owner: 'Sam Rivera', riskTier: 'Medium', policyFloor: 'Medium',
    approvals: ['HR Ops reviewer (first 50)'], humanThreshold: 'Non-standard wording', dataScope: 'Worker record (title, dates)', testStatus: 'In progress', releaseStatus: 'In review',
    lane: 'Standard', stage: 'Process-owner review', steps: standardSteps(), daysInStage: 12 },
  { id: 'wf-payroll-bank', name: 'Payroll bank-detail change', team: 'HR Operations', owner: 'Unassigned', riskTier: 'High', policyFloor: 'High',
    approvals: ['HR Ops', 'Security/risk'], humanThreshold: 'Always', dataScope: 'Bank details (sensitive)', testStatus: 'Not started', releaseStatus: 'In review',
    lane: 'Enhanced', stage: 'Security/privacy review', steps: standardSteps(), daysInStage: 23 },
  { id: 'wf-sw', name: 'Standard software install', team: 'IT Service Desk', owner: 'Priya Shah', riskTier: 'Low', policyFloor: 'Low',
    approvals: [], humanThreshold: 'Non-catalog software', dataScope: 'Device inventory', testStatus: 'Passed', releaseStatus: 'Production',
    lane: 'Fast lane', stage: 'Monitor', steps: standardSteps(), daysInStage: 88 },
  { id: 'wf-policy-faq', name: 'Travel policy Q&A', team: 'Finance Ops', owner: 'Finance Ops process owner', riskTier: 'Low', policyFloor: 'Low',
    approvals: [], humanThreshold: 'Unanswered or low-confidence', dataScope: 'Approved knowledge only', testStatus: 'Passed', releaseStatus: 'Pilot',
    lane: 'Fast lane', stage: 'Test', steps: standardSteps(), daysInStage: 3 },
]

export const laneStats: Record<ReviewLane, { median: string; target: string; queued: number; desc: string; reviewers: string }> = {
  'Fast lane': { median: '2 days', target: '≤ 3 days', queued: 3, desc: 'Low tier, pre-approved patterns and reusable components. Automated checks; no extra review.', reviewers: 'Automated checks + platform release' },
  Standard: { median: '9 days', target: '≤ 10 days', queued: 7, desc: 'Medium tier. Process owner reviews business rules, approval paths, and exceptions.', reviewers: 'Process owner' },
  Enhanced: { median: '21 days', target: '≤ 20 days', queued: 4, desc: 'High tier: privileged access, sensitive financial data, security decisions, material impact.', reviewers: 'Process owner + Security/risk + AI Governance' },
}

export const bottleneckRadar = [
  { stage: 'Risk assessment', queued: 2, avgDays: 3 },
  { stage: 'Process-owner review', queued: 6, avgDays: 8 },
  { stage: 'Security/privacy review', queued: 4, avgDays: 14 },
  { stage: 'Test', queued: 3, avgDays: 4 },
  { stage: 'Approve', queued: 1, avgDays: 2 },
  { stage: 'Controlled release', queued: 2, avgDays: 5 },
]

export interface TeamOnboardingStep {
  id: string
  title: string
  summary: string
  gate: string
  owner: string
}

export const teamOnboardingSteps: TeamOnboardingStep[] = [
  { id: 'needs', title: 'Define what the team needs', summary: 'Services offered, request types, top ticket drivers, and automation opportunities from ticket history.', gate: 'Service catalogue agreed with process owner', owner: 'HR Ops process owner' },
  { id: 'roles', title: 'Assign roles & access levels', summary: 'Named people get platform roles with explicit build, data, and approval boundaries.', gate: 'Every role has a named person and an accountable owner', owner: 'Platform team + HR Ops lead' },
  { id: 'training', title: 'Role-based training', summary: 'Builder certification gates build rights. Process owners complete ownership training.', gate: 'Builder certification passed', owner: 'Learning + Platform team' },
  { id: 'comms', title: 'Team comms pack', summary: 'What changes for HR Ops and for employees, how to get help, where to give feedback.', gate: 'Comms pack approved by HR Ops lead', owner: 'Change team' },
  { id: 'build', title: 'Build first workflow in sandbox', summary: '“Employee address change” — built from a reusable pattern in the sandbox.', gate: 'Workflow passes test cases in sandbox', owner: 'Sam Rivera (builder)' },
  { id: 'release', title: 'Risk assessment → review lane → test → controlled release', summary: 'Tier assessed, routed to the right lane, tested, released to a pilot group.', gate: 'Required reviews complete; release approved', owner: 'Process owner + Platform team' },
  { id: 'post', title: 'Post-launch ownership', summary: 'Named owner, monitoring dashboard, 90-day review on the calendar.', gate: 'Owner accepted; 90-day review scheduled', owner: 'HR Ops process owner' },
]

export const hrTeamMembers = [
  { name: 'Sam Rivera', role: 'Team Workflow Builder', certified: false },
  { name: 'Taylor Brooks-Kim', role: 'Process Owner (HR data changes)', certified: true },
  { name: 'Morgan Ellis', role: 'Team Workflow Builder', certified: false },
  { name: 'HR Ops agents (24)', role: 'Requester + fulfiller', certified: true },
]
