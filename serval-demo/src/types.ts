// Shared domain types. All data in this demo is fictional.

export type Provenance = 'public' | 'conceptual' | 'validate'
export type RiskTier = 'Low' | 'Medium' | 'High'
export type ActionClass = 'Inform' | 'Recommend' | 'Initiate workflow' | 'Execute approved action'
export type PersonaId = 'jordan' | 'alex' | 'dana' | 'marcus' | 'priya' | 'sam' | 'elena' | 'chris'

export interface Employee {
  id: PersonaId
  name: string
  initials: string
  title: string
  department: string
  location: string
  managerId?: PersonaId
}

export interface Persona extends Employee {
  blurb: string
  /** Day number since start, for new hires. */
  day?: number
  channels: string[]
}

export type TaskStatus = 'Done' | 'In progress' | 'Pending approval' | 'Blocked' | 'Delayed' | 'Not started'
export type TaskType = 'Automated' | 'Employee action' | 'Human approval'

export interface OnboardingTask {
  id: string
  title: string
  status: TaskStatus
  owner: string
  dependsOn: string[]
  due: string
  type: TaskType
  control: string
  risk: string
  changeIntervention: string
  detail: string
  system: string
}

export type ApprovalRole = 'Manager' | 'App owner' | 'IAM' | 'Security'
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'Info requested' | 'Waiting'

export interface Approval {
  id: string
  role: ApprovalRole
  approverId: PersonaId
  status: ApprovalStatus
  decidedAt?: string
  comment?: string
}

export type AccessScenario = 'standard' | 'elevated' | 'blocked'
export type AccessStatus =
  | 'Draft'
  | 'Pending approval'
  | 'Info requested'
  | 'Approved — provisioning'
  | 'Provisioned'
  | 'Rejected'
  | 'Blocked — routed to IAM'

export interface AccessRequest {
  id: string
  ritm: string
  scenario: AccessScenario
  app: string
  role: string
  justification: string
  minimumAccess: string
  riskTier: RiskTier
  policyOutcome: string
  policyChecks: { label: string; result: 'pass' | 'fail' | 'review' }[]
  status: AccessStatus
  approvals: Approval[]
  timeBound?: string
  recertification?: string
  createdAt: string
  requesterId: PersonaId
  nextAction: string
  nextOwner: string
}

export interface ServiceRequest {
  id: string
  title: string
  status: string
  updated: string
  kind: 'Request' | 'Incident' | 'Access' | 'Handoff'
}

export type IncidentStatus = 'New' | 'In progress' | 'Resolved' | 'Escalated' | 'Awaiting human review'

export interface Incident {
  id: string
  title: string
  requester: string
  priority: 'P1' | 'P2' | 'P3' | 'P4'
  status: IncidentStatus
  assignmentGroup: string
  channel: string
  aiSummary: string
  suggestedArticle: string
  nextStep: string
  escalationReason: string
  humanReview: string
  outcome: string
  opened: string
}

export interface AuditEvent {
  id: string
  ts: string
  actor: string
  actorType: 'AI agent' | 'Human' | 'System'
  action: string
  object: string
  system: string
}

export type StepKind = 'trigger' | 'ai' | 'policy' | 'approval' | 'action' | 'record' | 'notify'
export interface WorkflowStep {
  id: string
  label: string
  kind: StepKind
  detail?: string
}

export type ReviewLane = 'Fast lane' | 'Standard' | 'Enhanced'
export type LifecycleStage =
  | 'Design'
  | 'Risk assessment'
  | 'Process-owner review'
  | 'Security/privacy review'
  | 'Test'
  | 'Approve'
  | 'Controlled release'
  | 'Monitor'
  | 'Recertify / retire'

export interface WorkflowDefinition {
  id: string
  name: string
  team: string
  owner: string
  riskTier: RiskTier
  /** Lowest tier policy allows for this workflow. */
  policyFloor: RiskTier
  approvals: string[]
  humanThreshold: string
  dataScope: string
  testStatus: 'Not started' | 'In progress' | 'Passed' | 'Failed'
  releaseStatus: 'Sandbox' | 'In review' | 'Pilot' | 'Production' | 'Retired'
  lane: ReviewLane
  stage: LifecycleStage
  steps: WorkflowStep[]
  daysInStage: number
  prompt?: string
}

export interface Team {
  id: string
  name: string
  services: string[]
  topDrivers: { label: string; volume: number; automatable: boolean }[]
  onboardingStatus: string
}

export interface Role {
  id: string
  name: string
  purpose: string
  permitted: string[]
  buildPermissions: string
  dataBoundaries: string
  approvalAuthority: string
  productionDeploy: string
  requiredTraining: string
  accountableOwner: string
  escalation: string
}

export interface Permission {
  roleId: string
  teamId: string
  level: 'None' | 'Use' | 'Build (sandbox)' | 'Build + submit' | 'Approve' | 'Administer'
}

export interface Stakeholder {
  id: string
  name: string
  group: string
}

export type ChangeDegree = 'Low' | 'Medium' | 'High'
export interface ChangeImpact {
  stakeholderId: string
  useCase: 'Onboarding' | 'Access' | 'IT Support' | 'Workflow building'
  degree: ChangeDegree
  behaviorChange: string
  concern: string
  comms: string
  training: string
  owner: string
}

export interface Communication {
  id: string
  title: string
  audience: string
  timing: string
  sender: string
  objective: string
  keyMessage: string
  cta: string
  feedback: string
  body: string
}

export interface LearningPath {
  id: string
  audience: string
  objectives: string[]
  modules: { title: string; minutes: number }[]
  practice: string
  proficiency: string
  resources: string[]
  gatesBuildRights?: boolean
}

export interface AdoptionMetric {
  id: string
  label: string
  value: string
  trend: string
  good: 'up' | 'down'
  balancing?: string
  group: 'Experience' | 'Efficiency' | 'Quality' | 'Adoption' | 'Control health'
}

export interface BenefitHypothesis {
  id: string
  hypothesis: string
  baseline: string
  target: string
  dataSource: string
  owner: string
  cadence: string
  adoptionDependency: string
  balancingMetric: string
}

export interface Assumption {
  id: string
  text: string
  area: string
  validateWith: string
}

export interface Decision {
  id: string
  decision: string
  why: string
  owner: string
  by: string
  kind: 'Decision' | 'Assumption to validate' | 'Discovery question' | 'Pilot next step'
}

export interface ChatChip {
  label: string
  /** Text sent when clicked. */
  send?: string
  /** Internal intent key. */
  intent?: string
}

export type ReasonStepStatus = 'done' | 'needed' | 'skipped' | 'stopped'
export interface ReasonStep {
  label: string
  value: string
  status: ReasonStepStatus
}

export interface BehindScenes {
  workflow: string
  owner: string
  riskTier: RiskTier
  approvals: string[]
  record: string
  auditEvents: string[]
}

export interface ChatMessage {
  id: string
  from: 'user' | 'assistant' | 'system'
  text: string
  ts: string
  actionClass?: ActionClass
  reasoning?: ReasonStep[]
  bullets?: string[]
  chips?: ChatChip[]
  behind?: BehindScenes
  callout?: { tone: 'info' | 'warn' | 'bad' | 'ok'; title: string; body: string }
  /** Behavior from spec §9 this message demonstrates. */
  rai?: string
}
