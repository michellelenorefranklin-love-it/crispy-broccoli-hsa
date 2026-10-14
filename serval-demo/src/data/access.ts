import type { AccessRequest, AccessScenario, ApprovalRole, PersonaId } from '../types'

export interface AccessTemplate {
  scenario: AccessScenario
  label: string
  utterance: string
  app: string
  role: string
  justification: string
  minimumAccess: string
  riskTier: AccessRequest['riskTier']
  policyOutcome: string
  policyChecks: AccessRequest['policyChecks']
  approvers: { role: ApprovalRole; approverId: PersonaId }[]
  timeBound?: string
  recertification?: string
  blocked?: boolean
  split: { ai: string[]; automated: string[]; human: string[] }
  policyPlain: string
  alternatives?: string[]
}

export const accessTemplates: Record<AccessScenario, AccessTemplate> = {
  standard: {
    scenario: 'standard',
    label: 'Standard',
    utterance: 'I need access to FinReport so I can run the month-end variance reports.',
    app: 'FinReport',
    role: 'Report Viewer (read-only)',
    justification: 'Month-end variance reporting for Corporate Finance',
    minimumAccess: 'Read-only, Corporate Finance cost centres only',
    riskTier: 'Medium',
    policyOutcome: 'Birthright-eligible for role. Manager approval required.',
    policyChecks: [
      { label: 'Role eligibility (Financial Analyst, Corporate Finance)', result: 'pass' },
      { label: 'Access policy: read-only reporting', result: 'pass' },
      { label: 'Segregation of duties', result: 'pass' },
      { label: 'Mandatory training prerequisite', result: 'pass' },
    ],
    approvers: [{ role: 'Manager', approverId: 'alex' }],
    split: {
      ai: ['Understands the request and maps it to FinReport + Report Viewer', 'Explains what access is and isn’t included', 'Gives Jordan live status'],
      automated: ['Eligibility and policy checks', 'Routing to the manager in Teams', 'Provisioning after approval', 'ServiceNow record + audit trail'],
      human: ['Alex Morgan decides whether Jordan needs it'],
    },
    policyPlain: 'Analysts in Corporate Finance can be given read-only reporting with their manager’s approval.',
  },
  elevated: {
    scenario: 'elevated',
    label: 'Elevated',
    utterance: 'I need to post journals in FinReport for the quarter-end close.',
    app: 'FinReport',
    role: 'Journal Preparer (write / journal posting)',
    justification: 'Q3 close — prepare and post accrual journals',
    minimumAccess: 'Journal posting for Corporate Finance entities; 30-day just-in-time window',
    riskTier: 'High',
    policyOutcome: 'Privileged. Manager + app owner + IAM review. Time-bound.',
    policyChecks: [
      { label: 'Role eligibility (Financial Analyst, Corporate Finance)', result: 'review' },
      { label: 'Access policy: privileged financial write access', result: 'review' },
      { label: 'Segregation of duties', result: 'pass' },
      { label: 'Mandatory training prerequisite (Market Abuse module)', result: 'review' },
    ],
    approvers: [
      { role: 'Manager', approverId: 'alex' },
      { role: 'App owner', approverId: 'dana' },
      { role: 'IAM', approverId: 'marcus' },
    ],
    timeBound: '30 days (just-in-time)',
    recertification: 'Recertify on expiry; included in quarterly user access review',
    split: {
      ai: ['Identifies this as privileged write access', 'Explains why three approvals are needed', 'Proposes a 30-day window instead of standing access'],
      automated: ['Sequenced routing: manager → app owner → IAM', 'Time-bound provisioning and automatic expiry', 'Recertification scheduling', 'Audit trail'],
      human: ['Alex confirms the business need', 'Dana confirms the role in FinReport', 'Marcus confirms the identity-governance position'],
    },
    policyPlain: 'Posting journals is privileged financial access. It needs the app owner and IAM as well as the manager, and it expires.',
  },
  blocked: {
    scenario: 'blocked',
    label: 'Blocked (SoD)',
    utterance: 'Can you give me access to the payments release system too?',
    app: 'PayRelease (payments release)',
    role: 'Payment Releaser',
    justification: 'Not provided',
    minimumAccess: 'n/a — request cannot proceed',
    riskTier: 'High',
    policyOutcome: 'Segregation-of-duties conflict. Cannot proceed. Routed to IAM.',
    policyChecks: [
      { label: 'Role eligibility (Financial Analyst, Corporate Finance)', result: 'fail' },
      { label: 'Segregation of duties: journal posting + payment release', result: 'fail' },
      { label: 'Access policy: payments release restricted to Treasury Operations', result: 'fail' },
    ],
    approvers: [{ role: 'IAM', approverId: 'marcus' }],
    blocked: true,
    split: {
      ai: ['Recognises the conflict before anything is submitted', 'Explains the policy in plain language', 'Offers legitimate alternatives'],
      automated: ['Policy and SoD check', 'Routing to IAM with full context', 'Audit record of the attempt'],
      human: ['Marcus Lee (IAM) reviews; only IAM can consider an exception', 'Risk acceptance stays with authorised stakeholders'],
    },
    policyPlain: 'The same person should not be able to post a journal and release the payment it supports. That’s a segregation-of-duties rule, and the assistant can’t override it.',
    alternatives: [
      'Ask Treasury Operations to release the payment',
      'View payment status read-only in FinReport (already in your role)',
      'Ask IAM to review whether your role should change',
    ],
  },
}

export const ritmNumbers: Record<AccessScenario, string> = {
  standard: 'RITM0048213',
  elevated: 'RITM0048227',
  blocked: 'RITM0048231',
}
