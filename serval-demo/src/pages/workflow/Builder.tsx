import { useState, type ReactNode } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { Badge, Button, Callout, Card, Field, inputCls, Locked, Prov, RiskBadge, Segmented, Status } from '../../components/ui'
import { useDemo } from '../../store/store'
import { people } from '../../data/people'
import { hrTeamMembers, requiredReviewsForTier, tierOrder } from '../../data/governance'
import { cn } from '../../lib/util'
import type { RiskTier, WorkflowDefinition } from '../../types'
import { generateFromText, hasOwner, kindLabel, reviewsComplete, toDefinition } from './helpers'

const DEFAULT_TEXT = 'When a new hire in Corporate Finance starts, request FinReport read access and assign compliance training'
const approvalOptions = ['Manager', 'App owner', 'IAM', 'Security/risk', 'Process owner', 'HR Ops reviewer', 'AI Governance sign-off']
const thresholdOptions = ['Low confidence or user asks', 'Any exception', 'Any non-birthright access', 'Always — human approval before execution']
const releaseOptions: WorkflowDefinition['releaseStatus'][] = ['Sandbox', 'In review', 'Pilot', 'Production', 'Retired']
const testOptions: WorkflowDefinition['testStatus'][] = ['Not started', 'In progress', 'Passed', 'Failed']

export function Builder({ initialId }: { initialId: string | null }) {
  const workflows = useDemo((s) => s.workflows)
  const addWorkflow = useDemo((s) => s.addWorkflow)
  const [text, setText] = useState(DEFAULT_TEXT)
  const [preview, setPreview] = useState<WorkflowDefinition | null>(() => workflows.find((w) => w.id === 'wf-generated') ?? null)
  const [selId, setSelId] = useState<string>(() => (initialId && workflows.some((w) => w.id === initialId) ? initialId : workflows[0]?.id ?? ''))

  const generate = () => {
    const def = toDefinition(generateFromText(text), text)
    addWorkflow(def)
    setPreview(def)
    setSelId(def.id)
  }
  const sel = workflows.find((w) => w.id === selId)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Describe the workflow" subtitle="Plain language in; a deterministic, testable, auditable workflow out." actions={<Prov kind="public" />}>
          <textarea className={cn(inputCls, 'h-28 resize-none')} value={text} onChange={(e) => setText(e.target.value)} />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button variant="primary" disabled={!text.trim()} onClick={generate}><Sparkles size={14} /> Generate workflow</Button>
            <span className="text-[0.78rem] text-slate-500">Same text, same workflow. Approvals and permissions are embedded, not optional.</span>
          </div>
        </Card>
        <Card title={preview ? preview.name : 'Generated workflow'} subtitle={preview ? `${preview.team} · owner: ${preview.owner} · sandbox` : 'Generate to see the step sequence.'} actions={preview && <RiskBadge tier={preview.riskTier} />}>
          {preview ? (
            <ol className="space-y-1">
              {preview.steps.map((st, i) => (
                <li key={st.id} className="flex gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-800 text-[0.68rem] font-semibold text-white">{i + 1}</span>
                  <div className="min-w-0">
                    <span className="font-medium text-ink-900">{st.label}</span>
                    <span className="ml-1.5 text-[0.7rem] uppercase tracking-wide text-slate-400">{kindLabel[st.kind]}</span>
                    <p className="text-[0.8rem] text-slate-600">{st.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : <p className="text-sm text-slate-500">No workflow generated yet.</p>}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <Card title="Workflows" subtitle={`${workflows.length} in the portfolio`} bodyClass="p-0">
          <ul className="max-h-[560px] divide-y divide-slate-100 overflow-y-auto">
            {workflows.map((w) => (
              <li key={w.id}>
                <button onClick={() => setSelId(w.id)} className={cn('w-full px-4 py-2.5 text-left', selId === w.id ? 'bg-accent-50/70' : 'hover:bg-slate-50')}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-ink-900">{w.name}</span>
                    <RiskBadge tier={w.riskTier} />
                  </div>
                  <p className="mt-0.5 text-[0.75rem] text-slate-500">
                    {w.team} · <span className={cn(!hasOwner(w) && 'font-semibold text-bad-700')}>{w.owner}</span> · {w.releaseStatus}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </Card>
        {sel ? <Settings key={sel.id + (sel.prompt ?? "")} wf={sel} /> : <Card><p className="text-sm text-slate-500">Select a workflow.</p></Card>}
      </div>
    </div>
  )
}

function Settings({ wf }: { wf: WorkflowDefinition }) {
  const updateWorkflow = useDemo((s) => s.updateWorkflow)
  const [note, setNote] = useState<{ tone: 'info' | 'warn'; text: string } | null>(null)
  const [scope, setScope] = useState(wf.dataScope)
  const [addAp, setAddAp] = useState('')

  const apply = (patch: Partial<WorkflowDefinition>, fallback?: string) => {
    const n = updateWorkflow(wf.id, patch)
    setNote(n ? { tone: 'warn', text: n } : fallback ? { tone: 'info', text: fallback } : null)
  }
  const ownerOptions = Array.from(new Set([
    ...(hasOwner(wf) ? [] : ['Unassigned']), wf.owner, ...Object.values(people).map((p) => p.name), ...hrTeamMembers.filter((m) => !m.name.includes('agents')).map((m) => m.name),
  ]))
  const released = wf.releaseStatus === 'Pilot' || wf.releaseStatus === 'Production'
  const reviewsOk = wf.riskTier !== 'High' || reviewsComplete(wf)
  const prodBlock = wf.testStatus !== 'Passed' ? 'Tests must pass first.' : !reviewsOk ? 'High tier: required reviews are not complete.' : !hasOwner(wf) ? 'A named owner is required before release.' : null
  const pilotBlock = !hasOwner(wf) ? 'A named owner is required before release.' : !reviewsOk ? 'High tier: required reviews are not complete.' : null
  const blockFor = (r: WorkflowDefinition['releaseStatus']) => (r === 'Production' ? prodBlock : r === 'Pilot' ? pilotBlock : null)
  const reviews = requiredReviewsForTier[wf.riskTier]
  const highLocked = wf.riskTier === 'High'
  const thresholds = Array.from(new Set([...thresholdOptions, wf.humanThreshold]))

  return (
    <Card
      title={wf.name}
      subtitle={`${wf.team} · ${wf.lane} lane · stage: ${wf.stage}`}
      actions={<><Status s={wf.releaseStatus} /><RiskBadge tier={wf.riskTier} /></>}
    >
      <div className="space-y-4">
        {note && <Callout tone={note.tone} title={note.tone === 'warn' ? 'Policy applied' : 'Updated'}>{note.text}</Callout>}
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Owner" hint={!hasOwner(wf) ? <span className="font-medium text-bad-700">No named owner — release is blocked.</span> : released ? 'Released workflows always keep a named owner.' : undefined}>
            <select className={cn(inputCls, 'h-8 py-0')} value={wf.owner} onChange={(e) => apply({ owner: e.target.value }, `Owner set to ${e.target.value}.`)}>
              {ownerOptions.map((o) => <option key={o} value={o} disabled={o === 'Unassigned'}>{o}</option>)}
            </select>
          </Field>
          <Field label="Risk tier" hint={<Locked>Policy floor: {wf.policyFloor} — can be raised, not lowered below</Locked>}>
            <Segmented<RiskTier>
              options={tierOrder.map((t) => ({ id: t, label: <span className={cn(tierOrder.indexOf(t) < tierOrder.indexOf(wf.policyFloor) && 'opacity-50')}>{t}</span> }))}
              value={wf.riskTier}
              onChange={(t) => t !== wf.riskTier && apply({ riskTier: t }, `Tier set to ${t}; routed to the ${t === 'Low' ? 'Fast' : t === 'Medium' ? 'Standard' : 'Enhanced'} lane.`)}
            />
          </Field>
          <Field label="Approvals" hint={<Locked>Approvals can be added here; removing one needs a process-owner change request</Locked>}>
            <div className="flex flex-wrap items-center gap-1.5">
              {wf.approvals.length ? wf.approvals.map((a) => <Badge key={a}>{a}</Badge>) : <span className="text-sm text-slate-500">None (pre-approved pattern)</span>}
            </div>
            <div className="mt-2 flex gap-2">
              <select className={cn(inputCls, 'h-8 py-0')} value={addAp} onChange={(e) => setAddAp(e.target.value)}>
                <option value="">Add an approval…</option>
                {approvalOptions.filter((a) => !wf.approvals.includes(a)).map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <Button size="sm" disabled={!addAp} onClick={() => { apply({ approvals: [...wf.approvals, addAp] }, `${addAp} approval added.`); setAddAp('') }}><Plus size={13} /> Add</Button>
            </div>
          </Field>
          <Field label="Human-intervention threshold" hint={highLocked ? <Locked>High tier: human approval before every execution</Locked> : undefined}>
            <select disabled={highLocked} className={cn(inputCls, 'h-8 py-0 disabled:bg-slate-50')} value={wf.humanThreshold} onChange={(e) => apply({ humanThreshold: e.target.value }, 'Threshold updated.')}>
              {thresholds.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Data scope" hint="Changes to data scope are re-checked at the next review.">
            <div className="flex gap-2">
              <input className={inputCls} value={scope} onChange={(e) => setScope(e.target.value)} />
              <Button size="sm" className="h-8" disabled={scope.trim() === wf.dataScope || !scope.trim()} onClick={() => apply({ dataScope: scope.trim() }, 'Data scope saved; flagged for re-review.')}>Save</Button>
            </div>
          </Field>
          <Field label="Test status">
            <select className={cn(inputCls, 'h-8 py-0')} value={wf.testStatus} onChange={(e) => {
              const t = e.target.value as WorkflowDefinition['testStatus']
              if (t !== 'Passed' && wf.releaseStatus === 'Production') apply({ testStatus: t, releaseStatus: 'In review' }, 'Tests no longer passing: release moved back to In review.')
              else apply({ testStatus: t }, `Test status: ${t}.`)
            }}>
              {testOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Release status" hint={prodBlock ? <Locked>Production unavailable — {prodBlock}</Locked> : 'Production available: tests passed and required reviews complete.'}>
            <select className={cn(inputCls, 'h-8 py-0')} value={wf.releaseStatus} onChange={(e) => apply({ releaseStatus: e.target.value as WorkflowDefinition['releaseStatus'] }, `Release status: ${e.target.value}.`)}>
              {releaseOptions.map((o) => {
                const b = blockFor(o)
                return <option key={o} value={o} disabled={!!b && o !== wf.releaseStatus}>{o}{b && o !== wf.releaseStatus ? ` — blocked` : ''}</option>
              })}
            </select>
          </Field>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Required reviews for {wf.riskTier} tier</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {reviews.map((r) => <Row key={r} ok={reviewsComplete(wf)}>{r}</Row>)}
          </ul>
          <p className="mt-2 text-[0.75rem] text-slate-500">Reviews count as complete once the workflow has passed the Approve stage. Raising the tier to High adds Security/risk review and AI Governance sign-off and restricts execution until they pass.</p>
        </div>
      </div>
    </Card>
  )
}

function Row({ ok, children }: { ok: boolean; children: ReactNode }) {
  return <li><Badge tone={ok ? 'ok' : 'warn'}>{ok ? '✓ ' : '○ '}{children}</Badge></li>
}
