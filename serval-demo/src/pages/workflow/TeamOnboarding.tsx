import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, CheckCircle2, Circle, Lock, RotateCcw, Unlock } from 'lucide-react'
import { Badge, Button, Callout, Card, Illustrative, Locked, Prov, RiskBadge, Segmented, Status } from '../../components/ui'
import { useDemo, type TeamOnboardingState } from '../../store/store'
import { hrTeamMembers, laneForTier, requiredReviewsForTier, standardSteps, teamOnboardingSteps, teams } from '../../data/governance'
import { cn, fmtNum } from '../../lib/util'
import { clientPossessive } from '../../config/client'
import type { RiskTier, WorkflowDefinition } from '../../types'
import { kindLabel } from './helpers'

const initialTeamOnb: TeamOnboardingState = {
  step: 0, completed: [], assignments: {}, certified: {}, commsSent: false, sandboxBuilt: false, tier: null,
  testsPassed: false, released: false, ownerAccepted: false, reviewScheduled: false, selectedServices: [],
}

const hr = teams.find((t) => t.id === 'hr')!
const slots = [
  { key: 'builder', label: 'Team Workflow Builder (primary)', builds: true },
  { key: 'backup', label: 'Team Workflow Builder (backup)', builds: true },
  { key: 'owner', label: 'Process Owner — HR data changes', builds: false },
]
const candidates = hrTeamMembers.filter((m) => !m.name.includes('agents')).map((m) => m.name)

const addressDetails: Record<string, string> = {
  s1: 'Employee asks to change home address (assistant, portal, or Teams)',
  s2: 'Classified as personal-details change: address',
  s3: 'Identity verified (MFA); field allowed for self-service; country rules applied',
  s4: 'No approval for standard address; HR Ops review if country or tax jurisdiction changes',
  s5: 'Update worker record (address fields only); flag payroll if jurisdiction changes',
  s6: 'HR case closed with audit event; before/after values retained',
  s7: 'Confirm to employee; notify payroll only when tax jurisdiction changes',
}
const testCases = ['Standard domestic address change', 'Cross-state move (tax jurisdiction changes → HR review)', 'Identity check fails → stop and route to HR Ops', 'Employee asks for a human → handoff with context']

export function TeamOnboarding() {
  const s = useDemo((st) => st.teamOnb)
  const setTeamOnb = useDemo((st) => st.setTeamOnb)
  const completeTeamStep = useDemo((st) => st.completeTeamStep)
  const [view, setView] = useState(s.step)
  const viewIdx = Math.min(view, s.step)
  const step = teamOnboardingSteps[viewIdx]
  const done = s.completed.includes(step.id)
  const allDone = s.completed.length === teamOnboardingSteps.length

  const gate = gateFor(step.id, s)

  const pass = () => {
    completeTeamStep(step.id)
    setView(Math.min(teamOnboardingSteps.length - 1, viewIdx + 1))
  }
  const reset = () => {
    setTeamOnb({ ...initialTeamOnb })
    useDemo.getState().removeWorkflow('wf-address')
    setView(0)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-ink-900">HR Operations</span>
          <Badge tone="accent">Onboarding as a workflow-building team</Badge>
          <span className="text-slate-500 tabular">{s.completed.length} of {teamOnboardingSteps.length} gates passed</span>
        </div>
        <Button size="sm" variant="ghost" onClick={reset}><RotateCcw size={14} /> Reset team onboarding</Button>
      </div>

      <ol className="grid grid-cols-7 gap-1.5">
        {teamOnboardingSteps.map((t, i) => {
          const isDone = s.completed.includes(t.id)
          const reachable = i <= s.step
          const active = i === viewIdx
          return (
            <li key={t.id}>
              <button
                disabled={!reachable}
                onClick={() => setView(i)}
                className={cn(
                  'flex h-full w-full flex-col gap-1 rounded-md border px-2.5 py-2 text-left transition-colors',
                  active ? 'border-ink-800 bg-white shadow-card' : 'border-slate-200 bg-white hover:bg-slate-50',
                  !reachable && 'cursor-not-allowed bg-slate-50 opacity-60 hover:bg-slate-50',
                )}
              >
                <span className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500">
                  {isDone ? <CheckCircle2 size={14} className="text-ok-600" /> : reachable ? <Circle size={14} className="text-accent-600" /> : <Lock size={12} />}
                  Step {i + 1}
                </span>
                <span className="text-[0.8rem] font-medium leading-snug text-ink-900">{t.title}</span>
              </button>
            </li>
          )
        })}
      </ol>
      <div className="h-1 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full bg-accent-600 transition-all" style={{ width: `${(s.completed.length / teamOnboardingSteps.length) * 100}%` }} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
        <Card
          title={`${viewIdx + 1}. ${step.title}`}
          subtitle={step.summary}
          actions={done ? <Badge tone="ok" icon={<Check size={12} />}>Gate passed</Badge> : <Badge tone="warn">Gate open</Badge>}
        >
          <div className="space-y-4">
            {step.id === 'needs' && <NeedsStep s={s} />}
            {step.id === 'roles' && <RolesStep s={s} locked={done} />}
            {step.id === 'training' && <TrainingStep s={s} locked={done} />}
            {step.id === 'comms' && <CommsStep s={s} />}
            {step.id === 'build' && <BuildStep s={s} />}
            {step.id === 'release' && <ReleaseStep s={s} />}
            {step.id === 'post' && <PostStep s={s} />}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <div className="text-sm">
                <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Readiness gate · owner: {step.owner}</p>
                <p className="mt-0.5 text-slate-800">{step.gate}</p>
                {!done && !gate.ok && <p className="mt-0.5 text-[0.8rem] text-warn-700">{gate.why}</p>}
              </div>
              {done ? (
                viewIdx < teamOnboardingSteps.length - 1 && <Button size="sm" onClick={() => setView(viewIdx + 1)}>Next step</Button>
              ) : (
                <Button variant="primary" disabled={!gate.ok} onClick={pass}>Pass gate</Button>
              )}
            </div>
            {allDone && viewIdx === teamOnboardingSteps.length - 1 && (
              <Callout tone="ok" title="HR Operations is live as a workflow-building team">
                First workflow in controlled release with a named owner, monitoring, and a 90-day review. Each gate is recorded in the audit trail.
              </Callout>
            )}
          </div>
        </Card>

        <TeamPanel s={s} />
      </div>
    </div>
  )
}

function gateFor(id: string, s: TeamOnboardingState): { ok: boolean; why: string } {
  switch (id) {
    case 'needs': return { ok: s.selectedServices.length > 0, why: 'Select at least one service or request type.' }
    case 'roles': {
      const a = s.assignments
      if (slots.some((sl) => !a[sl.key])) return { ok: false, why: 'Every role needs a named person.' }
      if (a.builder === a.backup) return { ok: false, why: 'Primary and backup builder must be different people.' }
      if (a.owner === a.builder || a.owner === a.backup) return { ok: false, why: 'The process owner cannot also build: builders don’t approve their own work.' }
      return { ok: true, why: '' }
    }
    case 'training': {
      const people = Array.from(new Set(Object.values(s.assignments)))
      const missing = people.filter((p) => !isCertified(s, p))
      return { ok: people.length > 0 && missing.length === 0, why: missing.length ? `Not yet certified: ${missing.join(', ')}.` : 'Assign roles first.' }
    }
    case 'comms': return { ok: s.commsSent, why: 'Send the comms pack to the team.' }
    case 'build': return { ok: s.sandboxBuilt, why: 'Build the workflow in the sandbox.' }
    case 'release': return { ok: s.released, why: 'Assess risk, complete reviews, pass tests, and release to the pilot group.' }
    case 'post': return { ok: s.ownerAccepted && s.reviewScheduled, why: 'Owner must accept and the 90-day review must be scheduled.' }
    default: return { ok: false, why: '' }
  }
}

const isCertified = (s: TeamOnboardingState, name: string) =>
  s.certified[name] ?? hrTeamMembers.find((m) => m.name === name)?.certified ?? false

/* ---------- Step 1: needs ---------- */
function NeedsStep({ s }: { s: TeamOnboardingState }) {
  const setTeamOnb = useDemo((st) => st.setTeamOnb)
  const toggle = (svc: string) => setTeamOnb({
    selectedServices: s.selectedServices.includes(svc) ? s.selectedServices.filter((x) => x !== svc) : [...s.selectedServices, svc],
  })
  const max = Math.max(...hr.topDrivers.map((d) => d.volume))
  return (
    <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
      <div>
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Services & request types in scope</p>
        <div className="space-y-1.5">
          {hr.services.map((svc) => (
            <label key={svc} className="flex cursor-pointer items-center gap-2 text-sm text-slate-800">
              <input type="checkbox" className="h-4 w-4 accent-accent-600" checked={s.selectedServices.includes(svc)} onChange={() => toggle(svc)} />
              {svc}
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Top ticket drivers · automation opportunities from ticket history</p>
          <Prov kind="public" />
        </div>
        <ul className="space-y-2">
          {hr.topDrivers.map((d) => (
            <li key={d.label} className="text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-800">{d.label}</span>
                <span className="flex items-center gap-2">
                  <span className="text-slate-500 tabular">{fmtNum(d.volume)}/qtr</span>
                  {d.automatable ? <Badge tone="accent">Automation candidate</Badge> : <Badge>Human-led</Badge>}
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                <div className={cn('h-full rounded-full', d.automatable ? 'bg-accent-500' : 'bg-slate-400')} style={{ width: `${(d.volume / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-2"><Illustrative>Volumes illustrative. Serval is described as suggesting automations from ticket patterns; {clientPossessive} ticket data would drive the real list.</Illustrative></div>
      </div>
    </div>
  )
}

/* ---------- Step 2: roles ---------- */
function RolesStep({ s, locked }: { s: TeamOnboardingState; locked: boolean }) {
  const setTeamOnb = useDemo((st) => st.setTeamOnb)
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-[0.72rem] uppercase tracking-wide text-slate-500">
              <th className="py-2 pr-3 font-medium">Platform role</th>
              <th className="py-2 pr-3 font-medium">Named person</th>
              <th className="py-2 font-medium">Access level (HR Ops)</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((sl) => (
              <tr key={sl.key} className="border-b border-slate-100 last:border-0">
                <td className="py-2 pr-3 font-medium text-ink-900">{sl.label}</td>
                <td className="py-2 pr-3">
                  <select
                    disabled={locked}
                    className="h-8 w-52 rounded-md border border-slate-300 bg-white px-2 text-sm disabled:bg-slate-50"
                    value={s.assignments[sl.key] ?? ''}
                    onChange={(e) => setTeamOnb({ assignments: { ...s.assignments, [sl.key]: e.target.value } })}
                  >
                    <option value="">Select a person…</option>
                    {candidates.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </td>
                <td className="py-2 text-slate-600">{sl.builds ? 'Build + submit (after certification)' : 'Approve — Standard-lane releases'}</td>
              </tr>
            ))}
            <tr>
              <td className="py-2 pr-3 font-medium text-ink-900">Requester + fulfiller</td>
              <td className="py-2 pr-3 text-slate-600">HR Ops agents (24)</td>
              <td className="py-2 text-slate-600">Use</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Callout tone="neutral">Builders work in the sandbox on HR Ops’ own catalog only, with no privileged-access actions. Accountable owner for the role set: HR Ops lead. Escalation: Platform team.</Callout>
    </div>
  )
}

/* ---------- Step 3: training ---------- */
function TrainingStep({ s, locked }: { s: TeamOnboardingState; locked: boolean }) {
  const setTeamOnb = useDemo((st) => st.setTeamOnb)
  const log = useDemo((st) => st.log)
  const assigned = slots.filter((sl) => s.assignments[sl.key])
  const toggle = (name: string) => {
    const next = !isCertified(s, name)
    setTeamOnb({ certified: { ...s.certified, [name]: next } })
    log({ actor: 'Learning platform', actorType: 'System', action: next ? 'Builder certification recorded' : 'Certification withdrawn', object: name, system: 'LMS' })
  }
  if (!assigned.length) return <Callout tone="warn">Assign roles in step 2 first.</Callout>
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">Certification covers process design, data permissions, testing, exceptions, approval boundaries, and ownership. Build rights stay locked until it is recorded.</p>
      <ul className="divide-y divide-slate-100 rounded-md border border-slate-200">
        {assigned.map((sl) => {
          const name = s.assignments[sl.key]
          const cert = isCertified(s, name)
          return (
            <li key={sl.key} className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-ink-900">{name}</p>
                <p className="text-[0.78rem] text-slate-500">{sl.label} · {sl.builds ? 'Builder certification' : 'Process ownership & AI risk tiers'}</p>
              </div>
              <div className="flex items-center gap-3">
                {sl.builds && (cert
                  ? <span className="inline-flex items-center gap-1 text-[0.78rem] text-ok-700"><Unlock size={12} /> Build rights: sandbox</span>
                  : <Locked>Build rights locked</Locked>)}
                <Status s={cert ? 'Passed' : 'Not started'} />
                <Button size="sm" disabled={locked} onClick={() => toggle(name)}>{cert ? 'Withdraw' : 'Record certification'}</Button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ---------- Step 4: comms ---------- */
function CommsStep({ s }: { s: TeamOnboardingState }) {
  const setTeamOnb = useDemo((st) => st.setTeamOnb)
  const log = useDemo((st) => st.log)
  const send = () => {
    setTeamOnb({ commsSent: true })
    log({ actor: 'Change team', actorType: 'Human', action: 'Team comms pack sent to HR Operations (simulated)', object: 'HR Ops comms pack', system: 'Teams / email' })
  }
  return (
    <div className="space-y-3">
      <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
        <p className="font-semibold text-ink-900">HR Operations: what’s changing and how to get help</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700">
          <li>Employees can ask the assistant for address changes, letters, and leave balances — in Teams or the portal.</li>
          <li>HR Ops builders (named) configure workflows in a sandbox; nothing reaches employees without review.</li>
          <li>Agents still own exceptions and sensitive cases; the assistant hands off with context.</li>
          <li>How to get help: Platform team channel; office hours Tuesdays.</li>
          <li>Feedback: thumbs up/down in the assistant and a monthly pulse to HR Ops.</li>
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" disabled={s.commsSent} onClick={send}>{s.commsSent ? 'Comms pack sent' : 'Send comms pack (simulated)'}</Button>
        <Link to="/change?tab=comms" className="text-sm font-medium text-accent-700 hover:underline">Open the full pack in Communications Center →</Link>
      </div>
    </div>
  )
}

/* ---------- Step 5: build ---------- */
function BuildStep({ s }: { s: TeamOnboardingState }) {
  const setTeamOnb = useDemo((st) => st.setTeamOnb)
  const addWorkflow = useDemo((st) => st.addWorkflow)
  const builder = s.assignments.builder
  const certified = builder ? isCertified(s, builder) : false
  const steps = standardSteps().map((st) => ({ ...st, detail: addressDetails[st.id] }))
  const build = () => {
    const wf: WorkflowDefinition = {
      id: 'wf-address', name: 'Employee address change', team: 'HR Operations', owner: 'Sam Rivera', riskTier: 'Medium', policyFloor: 'Medium',
      approvals: ['HR Ops review (jurisdiction change)'], humanThreshold: 'Tax jurisdiction changes or identity check fails', dataScope: 'Worker record — address fields (personal data)',
      testStatus: 'In progress', releaseStatus: 'Sandbox', lane: 'Standard', stage: 'Test', steps, daysInStage: 0,
      prompt: 'When an employee asks to change their home address, verify identity, update the worker record, and tell payroll if the tax jurisdiction changes.',
    }
    addWorkflow(wf)
    setTeamOnb({ sandboxBuilt: true })
  }
  return (
    <div className="space-y-3">
      <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm italic text-slate-700">
        “When an employee asks to change their home address, verify identity, update the worker record, and tell payroll if the tax jurisdiction changes.”
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" disabled={!certified || s.sandboxBuilt} onClick={build}>{s.sandboxBuilt ? 'Built in sandbox' : 'Build “Employee address change” in sandbox'}</Button>
        {!certified && <Locked>{builder ? `${builder} is not certified — build rights locked` : 'Assign and certify a builder first'}</Locked>}
        <Prov kind="public" />
      </div>
      {s.sandboxBuilt && (
        <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
          <ol className="space-y-1.5">
            {steps.map((st, i) => (
              <li key={st.id} className="flex gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-800 text-[0.7rem] font-semibold text-white">{i + 1}</span>
                <div>
                  <p className="font-medium text-ink-900">{st.label} <span className="ml-1 text-[0.72rem] font-normal text-slate-500">{kindLabel[st.kind]}</span></p>
                  <p className="text-[0.8rem] text-slate-600">{st.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div>
            <p className="mb-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Sandbox test cases</p>
            <ul className="space-y-1 text-[0.8rem] text-slate-700">{testCases.map((t) => <li key={t} className="flex gap-1.5"><Check size={13} className="mt-0.5 shrink-0 text-ok-600" />{t}</li>)}</ul>
            <p className="mt-2 text-[0.75rem] text-slate-500">Added to the portfolio as <span className="font-medium">wf-address</span> (Sandbox).</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- Step 6: release ---------- */
function ReleaseStep({ s }: { s: TeamOnboardingState }) {
  const setTeamOnb = useDemo((st) => st.setTeamOnb)
  const updateWorkflow = useDemo((st) => st.updateWorkflow)
  const log = useDemo((st) => st.log)
  const wf = useDemo((st) => st.workflows.find((w) => w.id === 'wf-address'))
  const [note, setNote] = useState<string | null>(null)
  const [reviews, setReviews] = useState<string[]>([])
  const tier = s.tier
  const required = tier ? requiredReviewsForTier[tier] : []
  const reviewsDone = s.testsPassed || (tier !== null && required.every((r) => reviews.includes(r)))

  const pick = (t: RiskTier) => {
    let actual: RiskTier = t === 'Low' ? 'Medium' : t
    let msg: string | null = null
    if (wf) {
      msg = updateWorkflow('wf-address', { riskTier: t })
      actual = useDemo.getState().workflows.find((w) => w.id === 'wf-address')?.riskTier ?? actual
    }
    if (t === 'Low') msg = 'Address change involves personal data, so the policy floor is Medium. The tier can be raised, not lowered below the floor — snapped to Medium.'
    setNote(msg)
    setReviews([])
    setTeamOnb({ tier: actual, testsPassed: false, released: false })
  }
  const runTests = () => {
    if (wf) updateWorkflow('wf-address', { testStatus: 'Passed' })
    log({ actor: 'Workflow Studio', actorType: 'System', action: `${testCases.length}/${testCases.length} sandbox test cases passed`, object: 'Employee address change', system: 'Serval' })
    setTeamOnb({ testsPassed: true })
  }
  const release = () => {
    if (wf) updateWorkflow('wf-address', { testStatus: 'Passed', releaseStatus: 'Pilot', stage: 'Controlled release' })
    setTeamOnb({ released: true })
  }

  if (!wf && !s.sandboxBuilt) return <Callout tone="warn">Build the workflow in step 5 first.</Callout>
  return (
    <div className="space-y-4">
      <Sub n={1} title="Risk assessment" done={!!tier}>
        <div className="flex flex-wrap items-center gap-3">
          <Segmented<RiskTier> options={[{ id: 'Low', label: 'Low' }, { id: 'Medium', label: 'Medium' }, { id: 'High', label: 'High' }]} value={tier ?? ('' as RiskTier)} onChange={pick} />
          {tier && <><RiskBadge tier={tier} /><span className="text-sm text-slate-600">Review lane: <span className="font-medium text-ink-900">{laneForTier[tier]}</span></span></>}
          <Locked>Policy floor: Medium (personal data)</Locked>
        </div>
        {note && <div className="mt-2"><Callout tone="warn" title="Policy floor applied">{note}</Callout></div>}
      </Sub>
      <Sub n={2} title="Required reviews" done={!!tier && reviewsDone}>
        {!tier ? <p className="text-sm text-slate-500">Choose a tier to see the required reviews.</p> : (
          <ul className="space-y-1.5">
            {required.map((r) => {
              const ok = s.testsPassed || reviews.includes(r)
              return (
                <li key={r} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2">{ok ? <CheckCircle2 size={14} className="text-ok-600" /> : <Circle size={14} className="text-slate-400" />}{r}</span>
                  <Button size="sm" disabled={ok} onClick={() => {
                    setReviews([...reviews, r])
                    log({ actor: r.includes('Process') ? 'Taylor Brooks-Kim' : r.includes('Security') ? 'Marcus Lee' : r.includes('Governance') ? 'Elena Novak' : 'Policy engine', actorType: r.startsWith('Automated') ? 'System' : 'Human', action: `${r}: approved`, object: 'Employee address change', system: 'Serval' })
                  }}>{ok ? 'Recorded' : 'Record outcome (simulated)'}</Button>
                </li>
              )
            })}
          </ul>
        )}
      </Sub>
      <Sub n={3} title="Run tests" done={s.testsPassed}>
        <Button disabled={!tier || !reviewsDone || s.testsPassed} onClick={runTests}>{s.testsPassed ? 'Tests passed' : `Run ${testCases.length} test cases`}</Button>
      </Sub>
      <Sub n={4} title="Controlled release to pilot group" done={s.released}>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" disabled={!s.testsPassed || s.released} onClick={release}>{s.released ? 'Released to pilot' : 'Release to pilot (HR Ops + 200 employees)'}</Button>
          {wf && <span className="flex items-center gap-1.5 text-sm text-slate-600">wf-address: <Status s={wf.releaseStatus} /> <Status s={`Tests ${wf.testStatus.toLowerCase()}`} /></span>}
        </div>
      </Sub>
    </div>
  )
}

/* ---------- Step 7: post ---------- */
function PostStep({ s }: { s: TeamOnboardingState }) {
  const setTeamOnb = useDemo((st) => st.setTeamOnb)
  const log = useDemo((st) => st.log)
  const wf = useDemo((st) => st.workflows.find((w) => w.id === 'wf-address'))
  const owner = wf?.owner ?? 'Sam Rivera'
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-md border border-slate-200 p-3">
        <p className="text-sm font-medium text-ink-900">Named owner accepts accountability</p>
        <p className="mt-0.5 text-[0.8rem] text-slate-600">{owner} owns outcomes, exceptions, and changes for “Employee address change”. Process owner: {s.assignments.owner ?? 'Taylor Brooks-Kim'}.</p>
        <Button className="mt-2" size="sm" disabled={s.ownerAccepted} onClick={() => { setTeamOnb({ ownerAccepted: true }); log({ actor: owner, actorType: 'Human', action: 'Accepted workflow ownership', object: 'Employee address change', system: 'Serval' }) }}>
          {s.ownerAccepted ? 'Ownership accepted' : 'Record owner acceptance'}
        </Button>
      </div>
      <div className="rounded-md border border-slate-200 p-3">
        <p className="text-sm font-medium text-ink-900">90-day review</p>
        <p className="mt-0.5 text-[0.8rem] text-slate-600">Outcome, exception, and override data reviewed with AI Governance; recertify, change, or retire.</p>
        <Button className="mt-2" size="sm" disabled={s.reviewScheduled} onClick={() => { setTeamOnb({ reviewScheduled: true }); log({ actor: 'AI Governance', actorType: 'System', action: '90-day review scheduled', object: 'Employee address change', system: 'Serval' }) }}>
          {s.reviewScheduled ? 'Scheduled — Day +90' : 'Schedule 90-day review'}
        </Button>
      </div>
    </div>
  )
}

function Sub({ n, title, done, children }: { n: number; title: string; done: boolean; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-semibold', done ? 'bg-ok-600 text-white' : 'bg-slate-200 text-slate-600')}>
        {done ? <Check size={12} /> : n}
      </span>
      <div className="min-w-0 flex-1">
        <p className="mb-1.5 text-sm font-medium text-ink-900">{title}</p>
        {children}
      </div>
    </div>
  )
}

function TeamPanel({ s }: { s: TeamOnboardingState }) {
  const roleOf = (name: string) => slots.filter((sl) => s.assignments[sl.key] === name).map((sl) => sl.label.split(' (')[0].split(' —')[0]).join(', ')
  return (
    <Card title="HR Operations team" subtitle={hr.onboardingStatus}>
      <ul className="space-y-2.5">
        {hrTeamMembers.map((m) => {
          const assigned = roleOf(m.name)
          const cert = isCertified(s, m.name)
          return (
            <li key={m.name} className="text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-ink-900">{m.name}</span>
                {cert ? <Badge tone="ok">Certified</Badge> : <Badge>Not certified</Badge>}
              </div>
              <p className="text-[0.78rem] text-slate-500">{assigned || m.role}</p>
            </li>
          )
        })}
      </ul>
      <div className="mt-4 border-t border-slate-100 pt-3 text-[0.8rem] text-slate-600">
        <p className="font-medium text-ink-900">In scope</p>
        <p>{s.selectedServices.length ? s.selectedServices.join(', ') : 'Not yet defined'}</p>
      </div>
    </Card>
  )
}
