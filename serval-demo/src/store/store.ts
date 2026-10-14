import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  AccessRequest, AccessScenario, Approval, AuditEvent, ChangeImpact, ChatMessage, Communication, Incident,
  OnboardingTask, PersonaId, RiskTier, ServiceRequest, WorkflowDefinition,
} from '../types'
import { onboardingTasks } from '../data/onboarding'
import { accessTemplates, ritmNumbers } from '../data/access'
import { seedIncidents, vpnIncident, securityIncident } from '../data/support'
import { seedWorkflows, tierOrder, laneForTier, requiredReviewsForTier, teamOnboardingSteps } from '../data/governance'
import { seedImpacts, seedCommunications } from '../data/change'
import { defaultBenefitInputs, type BenefitInputs } from '../data/value'
import { people } from '../data/people'
import { fmtClock, uid } from '../lib/util'
import { respond, welcomeMessage } from '../engine/assistant'

export type IntegrationModel = 'overlay' | 'consolidated'

export interface ApprovalRules {
  /** Tightening only: add app-owner approval to Standard requests. */
  standardAppOwner: boolean
  /** Just-in-time window for elevated access, in days. Max is the policy ceiling (30). */
  jitDays: 30 | 14 | 7
  /** Tightening only: require a written justification of at least 20 characters. */
  detailedJustification: boolean
}

export interface TeamOnboardingState {
  step: number
  completed: string[]
  assignments: Record<string, string>
  certified: Record<string, boolean>
  commsSent: boolean
  sandboxBuilt: boolean
  tier: RiskTier | null
  testsPassed: boolean
  released: boolean
  ownerAccepted: boolean
  reviewScheduled: boolean
  selectedServices: string[]
}

export interface DemoState {
  // Presenter + display settings
  showProvenance: boolean
  fontScale: number
  notesOpen: boolean
  behindScenes: boolean
  integrationModel: IntegrationModel
  approverView: PersonaId
  approvalRules: ApprovalRules
  ocmOn: boolean
  demo: { active: boolean; step: number }
  clock: number

  // Shared world
  chat: ChatMessage[]
  chatContext: string | null
  onboarding: OnboardingTask[]
  accessRequests: AccessRequest[]
  incidents: Incident[]
  serviceRequests: ServiceRequest[]
  audit: AuditEvent[]
  workflows: WorkflowDefinition[]
  teamOnb: TeamOnboardingState
  impacts: ChangeImpact[]
  comms: Communication[]
  benefit: BenefitInputs
  selfServiceResolved: number
  humanHandoffs: number

  // Actions
  reset: () => void
  set: (patch: Partial<DemoState>) => void
  now: () => string
  log: (e: Omit<AuditEvent, 'id' | 'ts'>) => void
  send: (text: string, intent?: string) => void
  submitAccess: (scenario: AccessScenario, via?: 'assistant' | 'portal') => AccessRequest
  decide: (requestId: string, approvalId: string, decision: 'Approved' | 'Rejected' | 'Info requested', comment?: string) => void
  provideInfo: (requestId: string) => void
  setTask: (id: string, patch: Partial<OnboardingTask>) => void
  openIncident: (kind: 'vpn' | 'security' | 'handoff', summary?: string) => Incident
  updateIncident: (id: string, patch: Partial<Incident>) => void
  updateWorkflow: (id: string, patch: Partial<WorkflowDefinition>) => string | null
  addWorkflow: (wf: WorkflowDefinition) => void
  setTeamOnb: (patch: Partial<TeamOnboardingState>) => void
  completeTeamStep: (id: string) => void
  updateImpact: (stakeholderId: string, useCase: ChangeImpact['useCase'], patch: Partial<ChangeImpact>) => void
  updateComm: (id: string, patch: Partial<Communication>) => void
  setBenefit: (patch: Partial<BenefitInputs>) => void
}

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v))

const seedAudit = (): AuditEvent[] => [
  { id: 'ae-1', ts: 'Day −14', actor: 'HRIS', actorType: 'System', action: 'Hire event published', object: 'Worker record — Jordan Taylor', system: 'HRIS' },
  { id: 'ae-2', ts: 'Day −14', actor: 'Onboarding workflow', actorType: 'System', action: 'Onboarding workflow started', object: 'wf-onboarding v3', system: 'Serval' },
  { id: 'ae-3', ts: 'Day −10', actor: 'Onboarding workflow', actorType: 'System', action: 'Equipment request created', object: 'REQ0031877', system: 'ServiceNow' },
  { id: 'ae-4', ts: 'Day 1', actor: 'Identity provider', actorType: 'System', action: 'Birthright accounts provisioned; MFA enrolled', object: 'jordan.taylor (fictional)', system: 'IdP' },
]

const initial = () => ({
  showProvenance: true,
  fontScale: 1,
  notesOpen: false,
  behindScenes: false,
  integrationModel: 'overlay' as IntegrationModel,
  approverView: 'alex' as PersonaId,
  approvalRules: { standardAppOwner: false, jitDays: 30, detailedJustification: false } as ApprovalRules,
  ocmOn: true,
  demo: { active: false, step: 0 },
  clock: 12,
  chat: [welcomeMessage()],
  chatContext: null as string | null,
  onboarding: clone(onboardingTasks),
  accessRequests: [] as AccessRequest[],
  incidents: clone(seedIncidents),
  serviceRequests: [
    { id: 'REQ0031877', title: 'Standard finance laptop', status: 'Delayed — back-ordered (revised Day 5)', updated: 'Day 2', kind: 'Request' },
  ] as ServiceRequest[],
  audit: seedAudit(),
  workflows: clone(seedWorkflows),
  teamOnb: {
    step: 0, completed: [], assignments: {}, certified: {}, commsSent: false, sandboxBuilt: false, tier: null,
    testsPassed: false, released: false, ownerAccepted: false, reviewScheduled: false, selectedServices: [],
  } as TeamOnboardingState,
  impacts: clone(seedImpacts),
  comms: clone(seedCommunications),
  benefit: { ...defaultBenefitInputs },
  selfServiceResolved: 0,
  humanHandoffs: 0,
})

const pushChat = (msgs: ChatMessage[], add: ChatMessage[]) => [...msgs, ...add].slice(-80)

export const useDemo = create<DemoState>()(
  persist(
    (set, get) => ({
      ...initial(),

      reset: () => {
        const keep = { showProvenance: get().showProvenance, fontScale: get().fontScale }
        set({ ...initial(), ...keep })
      },
      set: (patch) => set(patch),

      now: () => {
        const c = get().clock + 1
        set({ clock: c })
        return fmtClock(c)
      },

      log: (e) => {
        const ts = get().now()
        set((s) => ({ audit: [{ ...e, id: uid('ae'), ts }, ...s.audit].slice(0, 200) }))
      },

      send: (text, intent) => {
        const ts = get().now()
        const userMsg: ChatMessage = { id: uid('m'), from: 'user', text, ts }
        set((s) => ({ chat: pushChat(s.chat, [userMsg]) }))
        const replies = respond({ text, intent }, get)
        set((s) => ({ chat: pushChat(s.chat, replies) }))
      },

      submitAccess: (scenario, via = 'assistant') => {
        const existing = get().accessRequests.find((r) => r.scenario === scenario && !['Rejected'].includes(r.status))
        if (existing) return existing
        const t = accessTemplates[scenario]
        const rules = get().approvalRules
        const approvers = [...t.approvers]
        if (scenario === 'standard' && rules.standardAppOwner) approvers.push({ role: 'App owner', approverId: 'dana' })
        const approvals: Approval[] = approvers.map((a, i) => ({
          id: uid('ap'), role: a.role, approverId: a.approverId, status: i === 0 ? 'Pending' : 'Waiting',
        }))
        const ts = get().now()
        const req: AccessRequest = {
          id: uid('ar'), ritm: ritmNumbers[scenario], scenario, app: t.app, role: t.role, justification: t.justification,
          minimumAccess: scenario === 'elevated' ? t.minimumAccess.replace('30-day', `${rules.jitDays}-day`) : t.minimumAccess,
          riskTier: t.riskTier, policyOutcome: t.policyOutcome, policyChecks: clone(t.policyChecks),
          status: t.blocked ? 'Blocked — routed to IAM' : 'Pending approval', approvals,
          timeBound: t.timeBound ? `${rules.jitDays} days (just-in-time)` : undefined, recertification: t.recertification,
          createdAt: ts, requesterId: 'jordan',
          nextAction: t.blocked ? 'IAM review of SoD conflict' : `${approvals[0].role} decision`,
          nextOwner: people[approvals[0].approverId].name,
        }
        set((s) => ({ accessRequests: [req, ...s.accessRequests] }))
        const L = get().log
        L({ actor: 'Serval assistant', actorType: 'AI agent', action: `Classified request (${via}): ${t.app} — ${t.role}`, object: req.ritm, system: 'Serval' })
        L({ actor: 'Policy engine', actorType: 'System', action: `Eligibility + policy + SoD checks: ${t.blocked ? 'FAILED (SoD conflict)' : t.riskTier === 'High' ? 'review required' : 'passed'}`, object: req.ritm, system: 'Serval' })
        if (t.blocked) {
          L({ actor: 'Access workflow', actorType: 'System', action: 'Request stopped before submission; routed to IAM with context', object: req.ritm, system: 'ServiceNow' })
        } else {
          L({ actor: 'Access workflow', actorType: 'System', action: `Request record created; routed to ${req.nextOwner} (${approvals[0].role})`, object: req.ritm, system: 'ServiceNow' })
        }
        if (scenario === 'standard') get().setTask('ob-apps', { status: 'Pending approval' })
        return req
      },

      decide: (requestId, approvalId, decision, comment) => {
        const req = get().accessRequests.find((r) => r.id === requestId)
        if (!req) return
        const ap = req.approvals.find((a) => a.id === approvalId)
        if (!ap || (ap.status !== 'Pending')) return
        const ts = get().now()
        const approver = people[ap.approverId].name
        const approvals = req.approvals.map((a) => (a.id === approvalId ? { ...a, status: decision, decidedAt: ts, comment } : a))
        let status: AccessRequest['status'] = req.status
        let nextAction = req.nextAction
        let nextOwner = req.nextOwner
        const L = get().log
        const sys: ChatMessage[] = []

        if (req.scenario === 'blocked') {
          // IAM can uphold the block or ask for information. No path in the demo grants a SoD-conflicting role.
          if (decision === 'Rejected') {
            status = 'Rejected'; nextAction = 'Closed — block upheld; alternatives offered'; nextOwner = '—'
            L({ actor: approver, actorType: 'Human', action: 'Upheld SoD block. Exception not granted.', object: req.ritm, system: 'ServiceNow' })
            sys.push({ id: uid('m'), from: 'system', ts, text: `Update on ${req.ritm}: Marcus Lee (IAM) reviewed your request for ${req.app} and upheld the segregation-of-duties block. Treasury Operations can release payments for you, or IAM can review your role if your responsibilities change.`, actionClass: 'Inform' })
          } else {
            status = 'Info requested'; nextAction = 'Jordan to explain the business need'; nextOwner = 'Jordan Taylor'
            L({ actor: approver, actorType: 'Human', action: 'Requested more information on business need', object: req.ritm, system: 'ServiceNow' })
            sys.push({ id: uid('m'), from: 'system', ts, text: `Marcus Lee (IAM) asked for more detail on why you need ${req.app}. The SoD block stays in place while IAM reviews.`, actionClass: 'Inform', chips: [{ label: 'Provide more detail', intent: `info:${req.id}` }] })
          }
        } else if (decision === 'Approved') {
          L({ actor: approver, actorType: 'Human', action: `${ap.role} approval: APPROVED${comment ? ` — “${comment}”` : ''}`, object: req.ritm, system: ap.approverId === 'alex' ? 'Teams → ServiceNow' : 'ServiceNow' })
          const idx = approvals.findIndex((a) => a.id === approvalId)
          const next = approvals.slice(idx + 1).find((a) => a.status === 'Waiting')
          if (next) {
            next.status = 'Pending'
            status = 'Pending approval'; nextAction = `${next.role} decision`; nextOwner = people[next.approverId].name
            L({ actor: 'Access workflow', actorType: 'System', action: `Routed to ${nextOwner} (${next.role})`, object: req.ritm, system: 'ServiceNow' })
            sys.push({ id: uid('m'), from: 'system', ts, text: `Update on ${req.ritm}: ${approver} approved. Next: ${nextOwner} (${next.role}).`, actionClass: 'Inform' })
          } else {
            status = 'Provisioned'; nextAction = req.timeBound ? `Access expires in ${req.timeBound.split(' ')[0]} days; recertification scheduled` : 'Included in next user access review'; nextOwner = req.timeBound ? 'Dana Brooks (recertify)' : 'Alex Morgan (UAR)'
            L({ actor: 'Access workflow', actorType: 'System', action: 'All required approvals recorded — provisioning released', object: req.ritm, system: 'Serval' })
            L({ actor: 'Identity provider connector', actorType: 'System', action: `Provisioned ${req.role}${req.timeBound ? ` (expires in ${req.timeBound.split(' ')[0]} days)` : ''} (simulated)`, object: req.ritm, system: 'IdP' })
            L({ actor: 'Access workflow', actorType: 'System', action: 'Request closed; employee notified', object: req.ritm, system: 'ServiceNow' })
            sys.push({ id: uid('m'), from: 'system', ts, text: `Done: you now have ${req.app} — ${req.role}.${req.timeBound ? ` This access is time-bound (${req.timeBound}).` : ''} It may take a few minutes to appear. ${req.ritm} is closed.`, actionClass: 'Execute approved action', callout: { tone: 'ok', title: 'Executed only after approval', body: `Provisioning ran after ${approvals.map((a) => a.role).join(' + ')} approval${approvals.length > 1 ? 's' : ''}. Every step is in the audit trail.` } })
            if (req.scenario === 'standard') get().setTask('ob-apps', { status: 'Done' })
          }
        } else if (decision === 'Rejected') {
          status = 'Rejected'; nextAction = 'Closed — employee notified with reason'; nextOwner = '—'
          approvals.forEach((a) => { if (a.status === 'Waiting') a.status = 'Waiting' })
          L({ actor: approver, actorType: 'Human', action: `${ap.role} approval: REJECTED${comment ? ` — “${comment}”` : ''}`, object: req.ritm, system: 'ServiceNow' })
          sys.push({ id: uid('m'), from: 'system', ts, text: `Update on ${req.ritm}: ${approver} declined this request${comment ? `: “${comment}”` : ''}. Nothing was provisioned. Ask me if you'd like help with an alternative.`, actionClass: 'Inform', chips: [{ label: 'Connect me to a human', send: 'Connect me to a human' }] })
          if (req.scenario === 'standard') get().setTask('ob-apps', { status: 'Blocked' })
        } else {
          status = 'Info requested'; nextAction = 'Jordan to add detail'; nextOwner = 'Jordan Taylor'
          L({ actor: approver, actorType: 'Human', action: `${ap.role}: requested more information`, object: req.ritm, system: 'ServiceNow' })
          sys.push({ id: uid('m'), from: 'system', ts, text: `${approver} needs more detail before deciding on ${req.ritm}: which reports or entities do you need, and for how long?`, actionClass: 'Inform', chips: [{ label: 'Provide more detail', intent: `info:${req.id}` }] })
        }
        set((s) => ({
          accessRequests: s.accessRequests.map((r) => (r.id === requestId ? { ...r, approvals, status, nextAction, nextOwner } : r)),
          chat: pushChat(s.chat, sys),
        }))
      },

      provideInfo: (requestId) => {
        const req = get().accessRequests.find((r) => r.id === requestId)
        if (!req || req.status !== 'Info requested') return
        const ap = req.approvals.find((a) => a.status === 'Info requested')
        const approvals = req.approvals.map((a) => (a.status === 'Info requested' ? { ...a, status: 'Pending' as const, comment: undefined } : a))
        const justification = req.scenario === 'blocked'
          ? 'Asked to release vendor payments while Treasury colleague is on leave'
          : `${req.justification}. Entities: US Corporate (CF-100, CF-140). Needed through quarter-end.`
        set((s) => ({
          accessRequests: s.accessRequests.map((r) => (r.id === requestId ? {
            ...r, approvals, justification,
            status: r.scenario === 'blocked' ? 'Blocked — routed to IAM' : 'Pending approval',
            nextAction: ap ? `${ap.role} decision` : r.nextAction, nextOwner: ap ? people[ap.approverId].name : r.nextOwner,
          } : r)),
        }))
        get().log({ actor: 'Jordan Taylor', actorType: 'Human', action: 'Added detail to justification; returned to approver', object: req.ritm, system: 'Serval' })
      },

      setTask: (id, patch) => set((s) => ({ onboarding: s.onboarding.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),

      openIncident: (kind, summary) => {
        const ts = get().now()
        if (kind === 'handoff') {
          const inc: Incident = {
            id: `INC00918${String(10 + get().humanHandoffs).padStart(2, '0')}`, title: 'Live handoff from assistant — Jordan Taylor', requester: 'Jordan Taylor (Corporate Finance)',
            priority: 'P3', status: 'Awaiting human review', assignmentGroup: 'Service Desk L1', channel: 'Web portal', opened: ts,
            aiSummary: summary ?? 'Employee asked for a person. Context passed: day-3 new hire, onboarding in progress.',
            suggestedArticle: '—', nextStep: 'Join the conversation; context already attached.', escalationReason: 'Employee asked for a human', humanReview: 'Priya Shah notified', outcome: '—',
          }
          set((s) => ({ incidents: [inc, ...s.incidents], humanHandoffs: s.humanHandoffs + 1 }))
          get().log({ actor: 'Serval assistant', actorType: 'AI agent', action: 'Handed off to human with conversation summary', object: inc.id, system: 'ServiceNow' })
          return inc
        }
        const base = kind === 'vpn' ? vpnIncident : securityIncident
        const existing = get().incidents.find((i) => i.id === base.id)
        if (existing) return existing
        const inc = { ...base, opened: ts }
        set((s) => ({ incidents: [inc, ...s.incidents] }))
        get().log({ actor: 'Serval assistant', actorType: 'AI agent', action: kind === 'vpn' ? 'Escalated with full context; incident created' : 'Stopped self-service; P1 security incident raised', object: inc.id, system: 'ServiceNow' })
        if (kind === 'security') get().log({ actor: 'Security workflow', actorType: 'System', action: 'SOC on-call paged (simulated)', object: inc.id, system: 'ServiceNow' })
        return inc
      },

      updateIncident: (id, patch) => set((s) => ({ incidents: s.incidents.map((i) => (i.id === id ? { ...i, ...patch } : i)) })),

      updateWorkflow: (id, patch) => {
        const wf = get().workflows.find((w) => w.id === id)
        if (!wf) return null
        let note: string | null = null
        const next = { ...wf, ...patch }
        if (patch.riskTier) {
          if (tierOrder.indexOf(patch.riskTier) < tierOrder.indexOf(wf.policyFloor)) {
            next.riskTier = wf.policyFloor
            note = `Policy floor for this workflow is ${wf.policyFloor}. The tier can be raised, not lowered below the floor.`
          }
          next.lane = laneForTier[next.riskTier]
          const reviews = requiredReviewsForTier[next.riskTier]
          if (next.riskTier === 'High') {
            next.humanThreshold = 'Always — human approval before execution'
            next.approvals = Array.from(new Set([...next.approvals, ...reviews.filter((r) => r !== 'Process-owner review'), 'Process owner']))
            if (next.releaseStatus === 'Production' || next.releaseStatus === 'Pilot') next.releaseStatus = 'In review'
            note = note ?? 'High tier: security/risk review and AI Governance sign-off added; execution restricted until reviews pass.'
          }
        }
        set((s) => ({ workflows: s.workflows.map((w) => (w.id === id ? next : w)) }))
        get().log({ actor: 'Workflow Studio', actorType: 'Human', action: `Workflow updated: ${Object.keys(patch).join(', ')}`, object: wf.name, system: 'Serval' })
        return note
      },

      addWorkflow: (wf) => {
        set((s) => ({ workflows: [wf, ...s.workflows.filter((w) => w.id !== wf.id)] }))
        get().log({ actor: 'Workflow Studio', actorType: 'AI agent', action: 'Generated deterministic workflow from description (sandbox)', object: wf.name, system: 'Serval' })
      },

      setTeamOnb: (patch) => set((s) => ({ teamOnb: { ...s.teamOnb, ...patch } })),
      completeTeamStep: (id) => {
        const s = get().teamOnb
        if (s.completed.includes(id)) return
        const completed = [...s.completed, id]
        const step = Math.min(teamOnboardingSteps.length - 1, teamOnboardingSteps.findIndex((t) => t.id === id) + 1)
        set({ teamOnb: { ...s, completed, step } })
        const st = teamOnboardingSteps.find((t) => t.id === id)
        get().log({ actor: st?.owner ?? 'Platform team', actorType: 'Human', action: `Team onboarding gate passed: ${st?.gate}`, object: 'HR Operations', system: 'Serval' })
      },

      updateImpact: (stakeholderId, useCase, patch) =>
        set((s) => ({ impacts: s.impacts.map((i) => (i.stakeholderId === stakeholderId && i.useCase === useCase ? { ...i, ...patch } : i)) })),
      updateComm: (id, patch) => set((s) => ({ comms: s.comms.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
      setBenefit: (patch) => set((s) => ({ benefit: { ...s.benefit, ...patch } })),
    }),
    {
      name: 'serval-ee-demo-v1',
      version: 1,
      storage: createJSONStorage(() => {
        try {
          const k = '__t'
          localStorage.setItem(k, k)
          localStorage.removeItem(k)
          return localStorage
        } catch {
          const mem: Record<string, string> = {}
          return { getItem: (k) => mem[k] ?? null, setItem: (k, v) => { mem[k] = v }, removeItem: (k) => { delete mem[k] } }
        }
      }),
      partialize: (s) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { demo, notesOpen, ...rest } = s
        return rest
      },
    },
  ),
)

export const jordanRequests = (s: DemoState) => s.accessRequests.filter((r) => r.requesterId === 'jordan')
export const pendingFor = (s: DemoState, who: PersonaId) =>
  s.accessRequests.flatMap((r) => r.approvals.filter((a) => a.approverId === who && a.status === 'Pending').map((a) => ({ req: r, approval: a })))
