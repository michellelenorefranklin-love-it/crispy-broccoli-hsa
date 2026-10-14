import type { LifecycleStage, RiskTier, StepKind, WorkflowDefinition, WorkflowStep } from '../../types'
import { laneForTier, lifecycle, requiredReviewsForTier, standardSteps, tierOrder } from '../../data/governance'

export const hasOwner = (w: WorkflowDefinition) => !!w.owner && w.owner !== 'Unassigned'

/** Reviews are complete once a workflow has reached the Approve stage or later. */
export const reviewsComplete = (w: WorkflowDefinition) => lifecycle.indexOf(w.stage) >= lifecycle.indexOf('Approve')

export const stageIndex = (s: LifecycleStage) => lifecycle.indexOf(s)

export const kindLabel: Record<StepKind, string> = {
  trigger: 'Trigger', ai: 'AI classification', policy: 'Policy check', approval: 'Approval gate', action: 'Action', record: 'Record', notify: 'Notify',
}

export const stageGuide: Record<LifecycleStage, { accountable: string; evidence: string; exit: string }> = {
  Design: { accountable: 'Team workflow builder', evidence: 'Process map, intended outcome, data used, named owner', exit: 'Design reviewed with process owner; owner named' },
  'Risk assessment': { accountable: 'Process owner (with AI Governance method)', evidence: 'Tier questionnaire: data sensitivity, action type, impact', exit: 'Tier and policy floor recorded; lane assigned' },
  'Process-owner review': { accountable: 'Process owner', evidence: 'Business rules, approval paths, SLAs, exceptions', exit: 'Process owner sign-off' },
  'Security/privacy review': { accountable: 'Security/Risk approver', evidence: 'Data-flow, permissions, privileged-action controls, privacy assessment', exit: 'Controls accepted or conditions set (High tier only)' },
  Test: { accountable: 'Builder + platform team', evidence: 'Test cases incl. exceptions, approval paths, and failure modes', exit: 'All test cases pass in sandbox' },
  Approve: { accountable: 'Approver(s) for the lane', evidence: 'Review outcomes, test results, rollback plan', exit: 'Release approved for the lane' },
  'Controlled release': { accountable: 'Platform admin + process owner', evidence: 'Pilot group, success measures, monitoring in place', exit: 'Pilot measures met; go/no-go to production' },
  Monitor: { accountable: 'Named workflow owner', evidence: 'Outcome, exception, and override dashboards; audit sampling', exit: 'Ongoing; triggers recertification on change or drift' },
  'Recertify / retire': { accountable: 'Workflow owner + AI Governance', evidence: '90-day / annual recertification; usage and incident history', exit: 'Recertified, changed, or retired with record' },
}

const apps = ['FinReport', 'Workday', 'SAP', 'Salesforce', 'Concur', 'VPN', 'Teams', 'payroll']
const teamWords: [RegExp, string][] = [
  [/corporate finance/i, 'Corporate Finance'], [/\bhr\b|human resources|payroll/i, 'HR Operations'], [/service desk|\bit\b/i, 'IT Service Desk'],
  [/treasury/i, 'Treasury Operations'], [/finance/i, 'Finance Ops'],
]

export interface Generated {
  name: string
  team: string
  tier: RiskTier
  approvals: string[]
  dataScope: string
  steps: WorkflowStep[]
}

/** Deterministic: the same text always yields the same workflow. */
export function generateFromText(text: string): Generated {
  const t = text.trim()
  const team = teamWords.find(([re]) => re.test(t))?.[1] ?? 'Unassigned team'
  const app = apps.find((a) => t.toLowerCase().includes(a.toLowerCase()))
  const access = /access|provision|grant/i.test(t)
  const level = /admin|write|post|journal|privileged/i.test(t) ? 'write/privileged' : /read/i.test(t) ? 'read-only' : 'standard'
  const training = /training/i.test(t) ? (/compliance/i.test(t) ? 'compliance training' : 'role training') : null
  const sensitive = /bank|payment|journal|privileged|admin|salary|security/i.test(t)
  const personal = /address|personal|employee data|leave|benefit/i.test(t)
  const tier: RiskTier = sensitive || level === 'write/privileged' ? 'High' : access || personal ? 'Medium' : 'Low'
  const trigger = /new hire|starts|joiner/i.test(t) ? `Hire event: new hire${team !== 'Unassigned team' ? ` in ${team}` : ''} starts (HRIS)` : 'Employee request via assistant or portal'
  const intents = [access && `Access request — ${app ?? 'application'} (${level})`, training && `Learning assignment — ${training}`, personal && 'Employee data change']
    .filter(Boolean).join('; ') || 'Information request'
  const approvals = tier === 'High' ? ['Manager', 'App owner', 'Security/risk'] : access ? ['Manager'] : []
  const actions = [access && `Provision ${app ?? 'application'} ${level} access`, training && `Enrol in ${training}`, personal && 'Update HR record'].filter(Boolean).join('; ') || 'Answer from approved knowledge'
  const base = standardSteps()
  const detail: Record<string, string> = {
    s1: trigger,
    s2: intents,
    s3: `Eligibility (department${team !== 'Unassigned team' ? ` = ${team}` : ''}), role model, SoD rules — ${tier} tier`,
    s4: approvals.length ? `Yes — ${approvals.join(' → ')} before execution` : 'No — pre-approved pattern; automated checks only',
    s5: `${actions} — only after the approval gate passes`,
    s6: 'ServiceNow record updated; audit event written',
    s7: `Notify ${/new hire/i.test(t) ? 'new hire and manager' : 'employee'} in Teams with status and next step`,
  }
  const name = [team !== 'Unassigned team' ? team : null, /new hire/i.test(t) ? 'new-hire' : null, [access && `${app ?? ''} access`.trim(), training && 'training'].filter(Boolean).join(' & ') || 'request']
    .filter(Boolean).join(' ')
  return {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    team, tier, approvals,
    dataScope: [access && 'Identity, role model', training && 'Learning catalogue', personal && 'Worker record'].filter(Boolean).join('; ') || 'Approved knowledge only',
    steps: base.map((s) => ({ ...s, detail: detail[s.id] })),
  }
}

export const toDefinition = (g: Generated, text: string): WorkflowDefinition => ({
  id: 'wf-generated', name: g.name, team: g.team, owner: 'Unassigned', riskTier: g.tier, policyFloor: g.tier,
  approvals: g.approvals, humanThreshold: g.tier === 'High' ? 'Always — human approval before execution' : g.approvals.length ? 'Any non-birthright access' : 'Low confidence or user asks',
  dataScope: g.dataScope, testStatus: 'Not started', releaseStatus: 'Sandbox', lane: laneForTier[g.tier], stage: 'Design', steps: g.steps, daysInStage: 0, prompt: text,
})

export const tierAtLeast = (a: RiskTier, b: RiskTier) => tierOrder.indexOf(a) >= tierOrder.indexOf(b)
export { requiredReviewsForTier, laneForTier, lifecycle }
