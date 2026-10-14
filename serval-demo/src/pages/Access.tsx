import { useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Ban, Bot, Check, CircleDashed, Clock, Cog, FileText, Hourglass, Info, MessageSquare, OctagonX, RotateCcw, Send, ShieldAlert, ShieldCheck, User, UserCheck, X,
} from 'lucide-react'
import { pendingFor, useDemo } from '../store/store'
import { accessTemplates } from '../data/access'
import { people } from '../data/people'
import { clientConfig } from '../config/client'
import type { AccessRequest, AccessScenario, Approval, ApprovalRole, PersonaId } from '../types'
import { AuditTrail } from '../components/Assistant'
import {
  Avatar, Badge, Button, Callout, Card, ControlsFootnote, Field, Illustrative, Locked, PageHeader, Prov, RiskBadge, Segmented, Select, Status, Toggle, inputCls,
} from '../components/ui'
import { cn } from '../lib/util'

const SCENARIOS: AccessScenario[] = ['standard', 'elevated', 'blocked']
const isScenario = (v: string | null): v is AccessScenario => !!v && (SCENARIOS as string[]).includes(v)

type StepState = 'todo' | 'done' | 'flag' | 'pending' | 'info' | 'waiting' | 'blocked' | 'na' | 'notpermitted'
type Actor = 'Employee' | 'AI' | 'Automated' | 'Human'
interface FlowStep { label: string; actor: Actor; state: StepState; note: string }

const stateMeta: Record<StepState, { label: string; Icon: typeof Check; cls: string; ring: string }> = {
  todo: { label: 'Not yet submitted', Icon: CircleDashed, cls: 'text-slate-400', ring: 'border-slate-200 bg-white' },
  done: { label: 'Done', Icon: Check, cls: 'text-ok-600', ring: 'border-ok-100 bg-ok-50/50' },
  flag: { label: 'Flagged for approvers', Icon: ShieldAlert, cls: 'text-warn-600', ring: 'border-warn-100 bg-warn-50/60' },
  pending: { label: 'Pending', Icon: Hourglass, cls: 'text-warn-600', ring: 'border-warn-100 bg-warn-50 ring-1 ring-warn-100' },
  info: { label: 'Info requested', Icon: Info, cls: 'text-info-600', ring: 'border-info-100 bg-info-50' },
  waiting: { label: 'Waiting', Icon: Clock, cls: 'text-slate-400', ring: 'border-slate-200 bg-white' },
  blocked: { label: 'Blocked', Icon: OctagonX, cls: 'text-bad-600', ring: 'border-bad-100 bg-bad-50 ring-1 ring-bad-100' },
  na: { label: 'Not required', Icon: CircleDashed, cls: 'text-slate-300', ring: 'border-dashed border-slate-200 bg-slate-50/50' },
  notpermitted: { label: 'Not permitted', Icon: Ban, cls: 'text-bad-600', ring: 'border-bad-100 bg-bad-50' },
}

const actorMeta: Record<Actor, { Icon: typeof Bot; cls: string }> = {
  Employee: { Icon: User, cls: 'text-slate-500' },
  AI: { Icon: Bot, cls: 'text-accent-700' },
  Automated: { Icon: Cog, cls: 'text-slate-500' },
  Human: { Icon: UserCheck, cls: 'text-info-700' },
}

const apState = (a?: Approval): StepState =>
  !a ? 'na' : a.status === 'Approved' ? 'done' : a.status === 'Pending' ? 'pending' : a.status === 'Info requested' ? 'info' : a.status === 'Rejected' ? 'blocked' : 'waiting'
const checkState = (r?: 'pass' | 'review' | 'fail'): StepState => (r === 'fail' ? 'blocked' : r === 'review' ? 'flag' : 'done')

function buildFlow(scenario: AccessScenario, req: AccessRequest | undefined): FlowStep[] {
  const t = accessTemplates[scenario]
  const base: [string, Actor][] = [
    ['Natural-language request', 'Employee'], ['AI identifies app, role, justification', 'AI'], ['Role-eligibility check', 'Automated'], ['Policy check', 'Automated'],
    ['Manager approval', 'Human'], ['App-owner approval', 'Human'], ['SoD / risk check', 'Automated'], ['Decision', 'Human'],
    ['Provisioning', 'Automated'], ['Confirmation + audit record', 'Automated'],
  ]
  if (!req) {
    const notes = ['Jordan asks in plain language', 'Maps to app + minimum role', 'Against role model', 'Access policy', 'Always required', scenario === 'elevated' ? 'Required for privileged' : 'If policy requires', 'Before anything is granted', 'Approve / reject / return', 'Only after approvals', 'ServiceNow + audit trail']
    return base.map(([label, actor], i) => ({ label, actor, state: 'todo', note: notes[i] }))
  }
  const find = (role: ApprovalRole) => req.approvals.find((a) => a.role === role)
  const chk = (k: RegExp) => req.policyChecks.find((c) => k.test(c.label))?.result
  const mgr = find('Manager')
  const own = find('App owner')
  const iam = find('IAM')
  const blockedScn = scenario === 'blocked'
  const sodRes = chk(/segregation/i)
  const sodState: StepState = sodRes === 'fail' ? 'blocked' : iam && !blockedScn ? apState(iam) : 'done'
  const decision: StepState =
    req.status === 'Provisioned' ? 'done' : req.status === 'Rejected' ? 'blocked' : req.status === 'Info requested' ? 'info' : 'pending'
  const decisionNote =
    req.status === 'Provisioned' ? 'Approved' : req.status === 'Rejected' ? (blockedScn ? 'Block upheld' : 'Rejected') : req.status === 'Info requested' ? 'Returned for info' : 'Awaiting decision'
  const prov: StepState = blockedScn || req.status === 'Rejected' ? 'notpermitted' : req.status === 'Provisioned' ? 'done' : 'waiting'
  const nm = (a?: Approval) => (a ? people[a.approverId].name : '')
  return [
    { label: base[0][0], actor: 'Employee', state: 'done', note: `Submitted ${req.createdAt}` },
    { label: base[1][0], actor: 'AI', state: 'done', note: `${req.app} · ${req.role.split(' (')[0]}` },
    { label: base[2][0], actor: 'Automated', state: checkState(chk(/eligibility/i)), note: chk(/eligibility/i) === 'fail' ? 'Not eligible for role' : chk(/eligibility/i) === 'review' ? 'Needs review' : 'Eligible' },
    { label: base[3][0], actor: 'Automated', state: checkState(chk(/access policy/i)), note: t.policyOutcome.split('.')[0] },
    { label: base[4][0], actor: 'Human', state: blockedScn ? 'na' : apState(mgr), note: blockedScn ? 'Not reached' : `${nm(mgr)} · ${mgr?.status ?? ''}` },
    { label: base[5][0], actor: 'Human', state: apState(own), note: own ? `${nm(own)} · ${own.status}` : blockedScn ? 'Not reached' : 'Not required by policy' },
    { label: base[6][0], actor: 'Automated', state: sodState, note: sodRes === 'fail' ? `Conflict — routed to ${nm(iam) || 'IAM'}` : iam && !blockedScn ? `SoD pass · IAM: ${nm(iam)} ${iam.status}` : 'SoD pass' },
    { label: base[7][0], actor: 'Human', state: decision, note: decisionNote },
    { label: base[8][0], actor: 'Automated', state: prov, note: prov === 'notpermitted' ? (blockedScn ? 'Not permitted — SoD' : 'Nothing provisioned') : prov === 'done' ? (req.timeBound ? `Time-bound: ${req.timeBound}` : 'Provisioned (simulated)') : 'Only after all approvals' },
    { label: base[9][0], actor: 'Automated', state: req.status === 'Provisioned' || req.status === 'Rejected' ? 'done' : 'waiting', note: req.ritm },
  ]
}

function submitAsJordan(scenario: AccessScenario) {
  const send = useDemo.getState().send
  if (scenario === 'standard') send('Running reports (read-only)', 'finreport-ro')
  else send(accessTemplates[scenario].utterance)
}

export default function Access() {
  const [params, setParams] = useSearchParams()
  const scenario: AccessScenario = isScenario(params.get('scenario')) ? (params.get('scenario') as AccessScenario) : 'standard'
  const setScenario = (s: AccessScenario) => setParams({ scenario: s }, { replace: true })
  const accessRequests = useDemo((s) => s.accessRequests)
  const req = accessRequests.find((r) => r.scenario === scenario)
  const t = accessTemplates[scenario]
  const flow = useMemo(() => buildFlow(scenario, req), [scenario, req])

  return (
    <div>
      <PageHeader
        title="Access & permissions"
        subtitle="The assistant helps Jordan ask for the right access. Authorised people decide. Provisioning happens only after every required approval, and every step is audited."
        told={['access', 'roles']}
        actions={
          <Segmented<AccessScenario>
            value={scenario}
            onChange={setScenario}
            options={[{ id: 'standard', label: 'Standard' }, { id: 'elevated', label: 'Elevated' }, { id: 'blocked', label: 'Blocked (SoD)' }]}
          />
        }
      />

      <Callout tone="neutral" icon={<ShieldCheck size={14} />} title="AI assistance is not authorisation">
        {t.policyPlain}
      </Callout>

      {/* Flow */}
      <Card
        className="mt-4"
        title={<span className="flex flex-wrap items-center gap-2">Request flow — {t.label} <Prov kind="public" /></span>}
        subtitle="Just-in-time access, identity governance, and access reviews as publicly described. Step states are live."
        actions={req ? <Status s={req.status} /> : <Badge>Not yet submitted</Badge>}
      >
        <ol className="grid grid-cols-2 gap-2 md:grid-cols-5">
          {flow.map((s, i) => {
            const m = stateMeta[s.state]
            const a = actorMeta[s.actor]
            return (
              <li key={s.label} className={cn('rounded-md border px-2.5 py-2', m.ring)}>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[0.66rem] font-semibold tabular text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                  <span className={cn('inline-flex items-center gap-0.5 text-[0.64rem] font-medium uppercase tracking-wide', a.cls)}><a.Icon size={10} />{s.actor}</span>
                </div>
                <p className="mt-1 text-[0.8rem] font-semibold leading-snug text-ink-900">{s.label}</p>
                <p className={cn('mt-1 flex items-center gap-1 text-[0.72rem] font-medium', m.cls)}><m.Icon size={11} />{m.label}</p>
                <p className="mt-0.5 text-[0.7rem] leading-snug text-slate-500">{s.note}</p>
              </li>
            )
          })}
        </ol>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Left: decision summary + audit */}
        <div className="min-w-0 space-y-5">
          {req ? <DecisionSummary req={req} /> : <SubmitPanel scenario={scenario} />}
          <Card title="Audit trail" subtitle={req ? `Every event on ${req.ritm}` : 'Appears when the request is submitted'}>
            <AuditTrail filter={(o) => !!req && o.includes(req.ritm)} limit={10} />
          </Card>
        </div>
        {/* Right: approver + Jordan */}
        <div className="min-w-0 space-y-5">
          <ApproverPanel scenario={scenario} req={req} />
          <JordanPanel req={req} scenario={scenario} />
        </div>
      </div>

      {/* Split */}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <SplitCol title="What AI does" Icon={Bot} items={t.split.ai} tone="accent" />
        <SplitCol title="What’s automated under approved policy" Icon={Cog} items={t.split.automated} tone="neutral" />
        <SplitCol title="What stays with an authorised human" Icon={UserCheck} items={t.split.human} tone="info" />
      </div>

      <RulesCard />
      <WhoChanges />
      <ControlsFootnote />
    </div>
  )
}

function SplitCol({ title, Icon, items, tone }: { title: string; Icon: typeof Bot; items: string[]; tone: 'accent' | 'neutral' | 'info' }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
      <p className="flex items-center gap-2 text-[0.9rem] font-semibold text-ink-900">
        <span className={cn('inline-flex h-7 w-7 items-center justify-center rounded-md', tone === 'accent' ? 'bg-accent-50 text-accent-700' : tone === 'info' ? 'bg-info-50 text-info-700' : 'bg-slate-100 text-slate-600')}><Icon size={15} /></span>
        {title}
      </p>
      <ul className="mt-3 space-y-1.5 text-[0.84rem] text-slate-700">
        {items.map((x) => <li key={x} className="flex gap-2"><Check size={13} className="mt-0.5 shrink-0 text-slate-400" />{x}</li>)}
      </ul>
    </div>
  )
}

function SubmitPanel({ scenario }: { scenario: AccessScenario }) {
  const t = accessTemplates[scenario]
  return (
    <Card title="Jordan’s request" subtitle="Nothing submitted yet for this scenario">
      <div className="flex gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5">
        <Avatar initials="JT" size="sm" />
        <p className="text-sm text-slate-800">“{t.utterance}”</p>
      </div>
      {scenario === 'standard' && (
        <p className="mt-2 text-[0.8rem] text-slate-500">FinReport has two roles, so the assistant asks one clarifying question. Jordan answers “Running reports (read-only)”.</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button variant="primary" onClick={() => submitAsJordan(scenario)}><Send size={14} /> Submit as Jordan</Button>
        <Button variant="ghost" size="sm" onClick={() => useDemo.getState().submitAccess(scenario, 'portal')}><FileText size={13} /> Use the portal form instead</Button>
      </div>
      <p className="mt-3 text-[0.78rem] text-slate-500">Same controls whichever channel Jordan uses: chat, Teams, or the portal.</p>
    </Card>
  )
}

const checkIcon = { pass: <Check size={13} className="text-ok-600" />, review: <ShieldAlert size={13} className="text-warn-600" />, fail: <X size={13} className="text-bad-600" /> }

function DecisionSummary({ req }: { req: AccessRequest }) {
  const canResubmit = req.status === 'Rejected'
  return (
    <Card
      title={<span className="flex flex-wrap items-center gap-2">Decision summary <span className="font-mono text-[0.8rem] font-normal text-slate-500">{req.ritm}</span></span>}
      subtitle="ServiceNow requested item (simulated)"
      actions={<RiskBadge tier={req.riskTier} />}
    >
      <dl className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
        <Row label="Application" value={req.app} />
        <Row label="Role" value={req.role} />
        <Row label="Justification" value={req.justification} />
        <Row label="Minimum access" value={req.minimumAccess} />
        {req.timeBound && <Row label="Time-bound" value={req.timeBound} />}
        {req.recertification && <Row label="Recertification" value={req.recertification} />}
      </dl>

      <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">Policy outcome</p>
      <p className="mt-0.5 text-sm text-slate-800">{req.policyOutcome}</p>
      <ul className="mt-2 space-y-1">
        {req.policyChecks.map((c) => (
          <li key={c.label} className="flex items-center gap-2 text-[0.82rem] text-slate-700">
            {checkIcon[c.result]}<span className="flex-1">{c.label}</span>
            <span className={cn('text-[0.7rem] font-medium uppercase', c.result === 'pass' ? 'text-ok-700' : c.result === 'review' ? 'text-warn-700' : 'text-bad-700')}>{c.result}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">Approvals required</p>
      <ul className="mt-1.5 divide-y divide-slate-100 rounded-md border border-slate-200">
        {req.approvals.map((a) => (
          <li key={a.id} className="flex items-center gap-2.5 px-2.5 py-2">
            <Avatar initials={people[a.approverId].initials} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-[0.84rem] font-medium text-ink-900">{people[a.approverId].name} <span className="font-normal text-slate-500">· {a.role}</span></p>
              {a.comment && <p className="text-[0.75rem] italic text-slate-500">“{a.comment}”</p>}
            </div>
            {a.decidedAt && <span className="text-[0.72rem] tabular text-slate-400">{a.decidedAt}</span>}
            <Status s={a.status} />
          </li>
        ))}
      </ul>

      <div className="mt-4 grid gap-3 rounded-md bg-slate-50 px-3 py-2.5 sm:grid-cols-3">
        <Row label="Status" value={<Status s={req.status} />} />
        <Row label="Next action" value={req.nextAction} />
        <Row label="Owner" value={req.nextOwner} />
      </div>
      {canResubmit && (
        <div className="mt-3 flex items-center gap-2">
          <Button size="sm" onClick={() => submitAsJordan(req.scenario)}><RotateCcw size={13} /> Ask again as Jordan</Button>
          <span className="text-[0.75rem] text-slate-500">Creates a new request; the rejected one stays on record.</span>
        </div>
      )}
    </Card>
  )
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-[0.85rem] text-slate-800">{value}</dd>
    </div>
  )
}

function ApproverPanel({ scenario, req }: { scenario: AccessScenario; req?: AccessRequest }) {
  const who = useDemo((s) => s.approverView)
  const accessRequests = useDemo((s) => s.accessRequests)
  const setS = useDemo((s) => s.set)
  const pending = useMemo(() => pendingFor({ ...useDemo.getState(), accessRequests }, who), [accessRequests, who])
  const sorted = [...pending].sort((a, b) => Number(b.req.scenario === scenario) - Number(a.req.scenario === scenario))
  const waitingOn = req?.approvals.find((a) => a.status === 'Pending')

  return (
    <Card
      title="Approver view"
      subtitle="Switch persona to act as the accountable human"
      actions={
        <Segmented<PersonaId>
          size="sm"
          value={who}
          onChange={(v) => setS({ approverView: v })}
          options={[{ id: 'alex', label: 'Alex · Manager' }, { id: 'dana', label: 'Dana · App owner' }, { id: 'marcus', label: 'Marcus · IAM' }]}
        />
      }
    >
      <div className="mb-3 flex items-center gap-2.5">
        <Avatar initials={people[who].initials} />
        <div>
          <p className="text-sm font-semibold text-ink-900">{people[who].name}</p>
          <p className="text-[0.75rem] text-slate-500">{people[who].title} · {people[who].blurb}</p>
        </div>
      </div>
      {sorted.length === 0 ? (
        <div className="rounded-md border border-dashed border-slate-300 px-4 py-6 text-center">
          <p className="text-sm font-medium text-slate-700">Nothing awaiting you</p>
          <p className="mt-1 text-[0.8rem] text-slate-500">
            {!req ? 'Submit Jordan’s request to see it arrive here.'
              : waitingOn ? `This request is waiting on ${people[waitingOn.approverId].name} (${waitingOn.role}).`
                : req.status === 'Info requested' ? 'Waiting on Jordan to add detail.'
                  : `This request is ${req.status.toLowerCase()}.`}
          </p>
          {waitingOn && waitingOn.approverId !== who && (
            <Button size="sm" className="mt-3" onClick={() => setS({ approverView: waitingOn.approverId })}>Switch to {people[waitingOn.approverId].name}</Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map(({ req: r, approval }) => <ApprovalCard key={approval.id} req={r} approval={approval} who={who} />)}
        </div>
      )}
    </Card>
  )
}

function ApprovalCard({ req, approval, who }: { req: AccessRequest; approval: Approval; who: PersonaId }) {
  const [comment, setComment] = useState('')
  const decide = (d: 'Approved' | 'Rejected' | 'Info requested') => useDemo.getState().decide(req.id, approval.id, d, comment.trim() || undefined)
  const teams = who === 'alex'
  const blocked = req.scenario === 'blocked'
  const failed = req.policyChecks.filter((c) => c.result !== 'pass')
  return (
    <div className={cn('overflow-hidden rounded-md border', teams ? 'border-[#C5C7EE]' : 'border-slate-200')}>
      {teams ? (
        <div className="flex items-center justify-between bg-[#5B5FC7] px-3 py-1.5 text-white">
          <span className="flex items-center gap-1.5 text-[0.78rem] font-semibold"><MessageSquare size={13} /> Approvals · Microsoft Teams</span>
          <span className="flex items-center gap-1.5 text-[0.68rem] opacity-90">Teams approval card (mock) <Prov kind="conceptual" className="!border-white/60 !text-white" /></span>
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-1.5">
          <span className="text-[0.78rem] font-semibold text-slate-700">{blocked ? 'IAM exception queue' : 'Approval task'} · ServiceNow (simulated)</span>
          <span className="font-mono text-[0.72rem] text-slate-500">{req.ritm}</span>
        </div>
      )}
      <div className="bg-white px-3 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Avatar initials="JT" size="sm" />
          <p className="text-sm font-semibold text-ink-900">Jordan Taylor requests {req.app}</p>
          <RiskBadge tier={req.riskTier} />
          <Badge>{accessTemplates[req.scenario].label}</Badge>
        </div>
        <dl className="mt-2 grid gap-x-4 gap-y-1.5 text-[0.8rem] sm:grid-cols-2">
          <Row label="Role" value={req.role} />
          <Row label="Your decision as" value={approval.role} />
          <Row label="Justification" value={req.justification} />
          <Row label="Minimum access" value={req.minimumAccess} />
        </dl>
        {failed.length > 0 && (
          <ul className="mt-2 space-y-0.5">
            {failed.map((c) => <li key={c.label} className="flex items-center gap-1.5 text-[0.76rem] text-slate-700">{checkIcon[c.result]}{c.label}</li>)}
          </ul>
        )}
        {blocked && (
          <Callout tone="bad" icon={<OctagonX size={14} />} title="Segregation-of-duties conflict">
            There is no approve option here. An exception would go through {clientConfig.name}’s formal risk-acceptance process, outside the assistant, with its own accountable sign-off.
          </Callout>
        )}
        <div className="mt-3">
          <Field label="Comment (optional)">
            <input className={inputCls} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={blocked ? 'e.g. Treasury Ops can release this payment' : 'e.g. Approved for month-end reporting'} />
          </Field>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {blocked ? (
            <Button variant="danger" size="sm" onClick={() => decide('Rejected')}><Ban size={13} /> Uphold block</Button>
          ) : (
            <>
              <Button variant="success" size="sm" onClick={() => decide('Approved')}><Check size={13} /> Approve</Button>
              <Button variant="danger" size="sm" onClick={() => decide('Rejected')}><X size={13} /> Reject</Button>
            </>
          )}
          <Button size="sm" onClick={() => decide('Info requested')}><Info size={13} /> Request info</Button>
        </div>
      </div>
    </div>
  )
}

function JordanPanel({ req, scenario }: { req?: AccessRequest; scenario: AccessScenario }) {
  const chat = useDemo((s) => s.chat)
  const recent = chat.slice(-4)
  return (
    <Card title="Jordan’s side, live" subtitle="What Jordan sees in chat as approvers act" actions={<Avatar initials="JT" size="sm" />}>
      <div className="flex flex-wrap items-center gap-2 rounded-md bg-slate-50 px-3 py-2">
        <span className="text-[0.8rem] text-slate-500">My {accessTemplates[scenario].label.toLowerCase()} request:</span>
        {req ? (
          <>
            <Status s={req.status} />
            <span className="text-[0.8rem] text-slate-600">Next: {req.nextAction} · {req.nextOwner}</span>
          </>
        ) : <Badge>Not submitted</Badge>}
      </div>
      {req?.status === 'Info requested' && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-info-100 bg-info-50 px-3 py-2">
          <Info size={14} className="text-info-700" />
          <span className="flex-1 text-[0.82rem] text-slate-700">An approver asked for more detail.</span>
          <Button size="sm" variant="primary" onClick={() => useDemo.getState().send('Provide more detail', 'info:' + req.id)}>Provide more detail as Jordan</Button>
        </div>
      )}
      <ul className="mt-3 space-y-2">
        {recent.map((m) => (
          <li key={m.id} className={cn('flex gap-2', m.from === 'user' && 'justify-end')}>
            {m.from !== 'user' && <span className="mt-0.5 text-slate-400">{m.from === 'system' ? <Cog size={13} /> : <Bot size={13} />}</span>}
            <div className={cn('max-w-[88%] rounded-md px-2.5 py-1.5 text-[0.8rem]', m.from === 'user' ? 'bg-ink-800 text-white' : m.from === 'system' ? 'border border-slate-200 bg-slate-50 text-slate-700' : 'border border-slate-200 bg-white text-slate-800')}>
              <p className="line-clamp-3">{m.text}</p>
              <p className={cn('mt-0.5 text-[0.66rem] tabular', m.from === 'user' ? 'text-white/60' : 'text-slate-400')}>{m.from === 'user' ? 'Jordan' : m.from === 'system' ? 'Workflow update' : 'Assistant'} · {m.ts}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function RulesCard() {
  const rules = useDemo((s) => s.approvalRules)
  const setS = useDemo((s) => s.set)
  const update = (patch: Partial<typeof rules>, what: string) => {
    setS({ approvalRules: { ...rules, ...patch } })
    useDemo.getState().log({ actor: 'Marcus Lee', actorType: 'Human', action: `Approval rule changed: ${what}`, object: 'Access policy configuration', system: 'Serval' })
  }
  const floors = [
    'Manager approval on all access',
    'IAM review on privileged access',
    'SoD check blocks conflicting access',
    'Provisioning only after all approvals',
    'Every step audited',
  ]
  return (
    <Card
      className="mt-5"
      title={<span className="flex flex-wrap items-center gap-2">Approval rules <Prov kind="validate" /></span>}
      subtitle={`Subject to ${clientConfig.name}’s security and compliance policies. Rules can be tightened, never loosened below the floor. Changes apply to new requests.`}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">Configurable (tighten only)</p>
          <Toggle checked={rules.standardAppOwner} onChange={(v) => update({ standardAppOwner: v }, `app-owner approval on Standard requests ${v ? 'ON' : 'OFF'}`)} label="Require app-owner approval for Standard requests" />
          <Toggle checked={rules.detailedJustification} onChange={(v) => update({ detailedJustification: v }, `detailed justification ${v ? 'required' : 'not required'}`)} label="Require detailed justification" />
          <div className="max-w-xs">
            <Field label="Just-in-time window for elevated access" hint="Policy ceiling is 30 days; shorter windows are allowed.">
              <Select
                value={String(rules.jitDays) as '30' | '14' | '7'}
                onChange={(v) => update({ jitDays: Number(v) as 30 | 14 | 7 }, `JIT window set to ${v} days`)}
                options={[{ value: '30', label: '30 days (ceiling)' }, { value: '14', label: '14 days' }, { value: '7', label: '7 days' }]}
              />
            </Field>
          </div>
        </div>
        <div>
          <p className="text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">Policy floors (locked)</p>
          <ul className="mt-2 space-y-2">
            {floors.map((f) => <li key={f}><Locked>{f}</Locked></li>)}
          </ul>
          <p className="mt-3 text-[0.78rem] text-slate-500">Floors are owned by IAM, InfoSec, and Risk & Compliance. Process teams can add steps; they cannot remove these.</p>
        </div>
      </div>
    </Card>
  )
}

const whoRows = [
  ['Employees', 'Ask colleagues or email IT; copy someone else’s access', 'Ask the assistant in plain language; request minimum access; track status in one place'],
  ['Managers', 'Approve from email chains, often days later', 'Approve inside Teams with context; decide on need, not on technical role names'],
  ['App owners', 'Rarely see who has access until audit time', 'Approve elevated roles and recertify time-bound access when it expires'],
  ['IAM', 'Hand-process every request and chase approvals', 'Set policy once; handle exceptions and SoD reviews; tune rules from data'],
  ['InfoSec', 'Discover over-provisioning after the fact', 'Define guardrails up front; monitor AI actions in the audit trail'],
  ['Risk & compliance', 'Sample evidence manually for reviews', 'Use the audit record as evidence; own risk acceptance outside the assistant'],
  ['Process owners', 'Workarounds hide where the process breaks', 'Use request and approval data to fix friction; fewer informal “ask a colleague” grants'],
]

function WhoChanges() {
  return (
    <Card className="mt-5" title="Who changes how" subtitle="The control model only works if behaviour changes too" actions={<Prov kind="conceptual" />} bodyClass="p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[0.82rem]">
          <thead className="bg-slate-50 text-[0.68rem] uppercase tracking-wide text-slate-500">
            <tr><th className="px-4 py-2">Group</th><th className="px-4 py-2">Today</th><th className="px-4 py-2">With the assistant</th></tr>
          </thead>
          <tbody>
            {whoRows.map(([g, a, b]) => (
              <tr key={g} className="border-t border-slate-100 align-top">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-ink-900">{g}</td>
                <td className="px-4 py-2 text-slate-500">{a}</td>
                <td className="px-4 py-2 text-slate-800">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2"><Illustrative>Illustrative — validate with each stakeholder group during discovery.</Illustrative></div>
    </Card>
  )
}
