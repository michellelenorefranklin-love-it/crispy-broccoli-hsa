import { useState } from 'react'
import { Check, Pencil, ThumbsDown, CircleCheck, ArrowLeft, Sparkles, BookOpen, ArrowRight, ShieldAlert, UserCheck, Flag } from 'lucide-react'
import { AuditTrail } from '../../components/Assistant'
import { Avatar, Badge, Button, Callout, Card, Field, Illustrative, Locked, Prov, Stat, Status, inputCls } from '../../components/ui'
import { useDemo } from '../../store/store'
import { cn } from '../../lib/util'
import type { Incident } from '../../types'
import type { ScenarioId } from './Journey'

const PRIYA = { actor: 'Priya Shah', actorType: 'Human' as const, system: 'ServiceNow' }

function Detail({ inc }: { inc: Incident }) {
  const updateIncident = useDemo((s) => s.updateIncident)
  const log = useDemo((s) => s.log)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(inc.aiSummary)
  const [resolving, setResolving] = useState(false)
  const [outcome, setOutcome] = useState('Fixed by service desk; knowledge article updated')
  const isSecurity = /security/i.test(inc.assignmentGroup)
  const resolved = inc.status === 'Resolved'

  const accept = () => {
    updateIncident(inc.id, { humanReview: 'AI summary accepted by Priya Shah', status: inc.status === 'Awaiting human review' || inc.status === 'New' ? 'In progress' : inc.status })
    log({ ...PRIYA, action: 'Accepted AI summary', object: inc.id })
  }
  const saveCorrection = () => {
    if (!draft.trim()) return
    updateIncident(inc.id, { aiSummary: draft.trim(), humanReview: 'Summary corrected by Priya Shah' })
    log({ ...PRIYA, action: 'Corrected AI summary (correction fed back to automation owner)', object: inc.id })
    setEditing(false)
  }
  const resolve = () => {
    const text = outcome.trim() || 'Resolved by service desk'
    updateIncident(inc.id, { status: 'Resolved', outcome: text, humanReview: inc.humanReview.startsWith('Pending') || inc.humanReview === 'Not started' ? 'Reviewed by Priya Shah' : inc.humanReview })
    log({ ...PRIYA, action: `Resolved incident: ${text}`, object: inc.id })
    setResolving(false)
  }
  const unhelpful = () => {
    updateIncident(inc.id, { humanReview: 'Summary marked unhelpful — feedback sent to automation owner' })
    log({ ...PRIYA, action: 'Marked AI summary unhelpful; feedback sent to automation owner', object: inc.id })
  }

  return (
    <Card
      title={<span className="flex flex-wrap items-center gap-2">{inc.id} <Badge tone={inc.priority === 'P1' ? 'bad' : 'neutral'}>{inc.priority}</Badge> <Status s={inc.status} /></span>}
      subtitle={`${inc.title} · ${inc.requester}`}
    >
      <div className="space-y-3 text-sm">
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500"><Sparkles size={12} className="text-accent-600" /> AI summary <Prov kind="public" /></p>
          {editing ? (
            <div className="space-y-2">
              <textarea className={cn(inputCls, 'min-h-[96px]')} value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Corrected summary" />
              <div className="flex gap-2">
                <Button size="sm" variant="primary" onClick={saveCorrection} disabled={!draft.trim()}>Save correction</Button>
                <Button size="sm" variant="ghost" onClick={() => { setEditing(false); setDraft(inc.aiSummary) }}>Cancel</Button>
              </div>
            </div>
          ) : (
            <p className="rounded-md bg-slate-50 px-3 py-2 text-slate-800">{inc.aiSummary}</p>
          )}
        </div>
        <dl className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
          {[
            [<BookOpen size={12} />, 'Suggested article', inc.suggestedArticle],
            [<ArrowRight size={12} />, 'Recommended next step', inc.nextStep],
            [<Flag size={12} />, 'Escalation reason', inc.escalationReason],
            [<UserCheck size={12} />, 'Human review', inc.humanReview],
            [<CircleCheck size={12} />, 'Outcome', inc.outcome],
            [<ShieldAlert size={12} />, 'Assignment · channel', `${inc.assignmentGroup} · ${inc.channel}`],
          ].map(([icon, k, v]) => (
            <div key={k as string}>
              <dt className="flex items-center gap-1 text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">{icon}{k}</dt>
              <dd className="text-[0.85rem] text-slate-800">{v}</dd>
            </div>
          ))}
        </dl>

        {isSecurity && (
          <Callout tone="bad" title="Security-owned incident">Priya can review and annotate, but containment and closure are SOC decisions. The service desk does not resolve possible compromises.</Callout>
        )}

        {resolving && (
          <Field label="Outcome">
            <div className="flex flex-wrap gap-2">
              <input className={cn(inputCls, 'flex-1')} value={outcome} onChange={(e) => setOutcome(e.target.value)} aria-label="Outcome" />
              <Button size="sm" variant="success" onClick={resolve}>Confirm resolve</Button>
              <Button size="sm" variant="ghost" onClick={() => setResolving(false)}>Cancel</Button>
            </div>
          </Field>
        )}

        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
          <Button size="sm" variant="primary" onClick={accept} disabled={editing}><Check size={13} /> Accept AI summary</Button>
          <Button size="sm" onClick={() => { setDraft(inc.aiSummary); setEditing(true) }} disabled={editing}><Pencil size={13} /> Correct summary</Button>
          {isSecurity ? (
            <Locked>Resolve: SOC only</Locked>
          ) : resolved ? (
            <Badge tone="ok">Resolved</Badge>
          ) : (
            <Button size="sm" variant="success" onClick={() => setResolving(true)} disabled={resolving}><CircleCheck size={13} /> Resolve</Button>
          )}
          <Button size="sm" variant="ghost" onClick={unhelpful}><ThumbsDown size={13} /> Mark summary unhelpful</Button>
        </div>
        <p className="text-[0.72rem] text-slate-500">Each action updates the ServiceNow record (two-way sync <Prov kind="public" />, client configuration <Prov kind="validate" />) and is written to the audit trail.</p>
      </div>
    </Card>
  )
}

const BEFORE = [
  { label: 'Password & account resets', pct: 30, repetitive: true },
  { label: 'Manual triage & routing', pct: 25, repetitive: true },
  { label: 'Status chasing', pct: 15, repetitive: true },
  { label: 'Complex troubleshooting', pct: 20, repetitive: false },
  { label: 'Exceptions & escalations', pct: 10, repetitive: false },
]
const AFTER = [
  { label: 'Resets, triage & status (residual)', pct: 15, repetitive: true },
  { label: 'Complex troubleshooting', pct: 35, repetitive: false },
  { label: 'Exceptions & escalations', pct: 20, repetitive: false },
  { label: 'Knowledge curation', pct: 15, repetitive: false },
  { label: 'Automation feedback & review', pct: 15, repetitive: false },
]
const shade = ['bg-ink-700', 'bg-ink-600', 'bg-accent-600', 'bg-accent-500', 'bg-accent-200']

function DayBar({ title, rows }: { title: string; rows: typeof BEFORE }) {
  let hi = 0
  return (
    <div>
      <p className="mb-1 text-[0.75rem] font-medium text-slate-600">{title}</p>
      <div className="flex h-3 overflow-hidden rounded">
        {rows.map((r) => (
          <span key={r.label} title={`${r.label}: ${r.pct}%`} style={{ width: `${r.pct}%` }} className={r.repetitive ? 'bg-slate-300' : shade[hi++ % shade.length]} />
        ))}
      </div>
      <ul className="mt-1.5 space-y-0.5">
        {rows.map((r) => (
          <li key={r.label} className="flex justify-between gap-2 text-[0.75rem] text-slate-600">
            <span className={cn(r.repetitive && 'text-slate-400')}>{r.label}</span>
            <span className="tabular">{r.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Console({ scenario, onBack }: { scenario: ScenarioId; onBack: () => void }) {
  const incidents = useDemo((s) => s.incidents)
  const selfServ = useDemo((s) => s.selfServiceResolved)
  const preferred = scenario === 'security' ? 'INC0091802' : scenario === 'vpn' ? 'INC0091734' : undefined
  const [selId, setSelId] = useState<string | undefined>(undefined)
  const sel = incidents.find((i) => i.id === selId) ?? incidents.find((i) => i.id === preferred) ?? incidents[0]

  const open = incidents.filter((i) => i.status !== 'Resolved')
  const awaitingReview = incidents.filter((i) => i.status === 'Awaiting human review' || /^(pending|not started)/i.test(i.humanReview)).length
  const seededAssistant = incidents.filter((i) => i.outcome === 'Resolved by assistant').length
  const p1 = open.filter((i) => i.priority === 'P1').length

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Avatar initials="PS" />
          <div>
            <p className="text-sm font-semibold text-ink-900">Priya Shah · Service Desk L1/L2</p>
            <p className="text-[0.78rem] text-slate-500">ServiceNow queue with assistant context attached <Prov kind="public" /></p>
          </div>
        </div>
        <Button size="sm" variant="ghost" onClick={onBack}><ArrowLeft size={13} /> Back to Jordan’s journey</Button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="In queue" value={open.length} sub="Open incidents" />
        <Stat label="Awaiting human review" value={awaitingReview} tone={awaitingReview ? 'warn' : 'neutral'} sub="AI output not yet checked" />
        <Stat label="Resolved by assistant" value={selfServ + seededAssistant} tone="ok" sub="Today, this demo session" />
        <Stat label="P1 open" value={p1} tone={p1 ? 'bad' : 'neutral'} sub="Security-owned" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]">
        <div className="min-w-0 space-y-4">
          <Card title="Queue" subtitle="Newest first. Incidents raised from Jordan’s conversations appear here live." bodyClass="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-[0.82rem]">
                <thead className="bg-slate-50 text-[0.72rem] uppercase tracking-wide text-slate-500">
                  <tr>{['ID', 'Title', 'Requester', 'Priority', 'Status', 'Channel', 'Opened'].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {incidents.map((i) => (
                    <tr
                      key={i.id}
                      onClick={() => setSelId(i.id)}
                      className={cn('cursor-pointer border-t border-slate-100 hover:bg-slate-50', sel?.id === i.id && 'bg-accent-50/60 hover:bg-accent-50/60')}
                      aria-selected={sel?.id === i.id}
                    >
                      <td className="whitespace-nowrap px-3 py-2 font-mono text-[0.78rem] text-ink-900">{i.id}</td>
                      <td className="px-3 py-2 text-slate-800">{i.title}</td>
                      <td className="px-3 py-2 text-slate-600">{i.requester}</td>
                      <td className="px-3 py-2"><Badge tone={i.priority === 'P1' ? 'bad' : 'neutral'}>{i.priority}</Badge></td>
                      <td className="px-3 py-2"><Status s={i.status} /></td>
                      <td className="whitespace-nowrap px-3 py-2 text-slate-600">{i.channel}</td>
                      <td className="px-3 py-2 tabular text-slate-600">{i.opened}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {sel && <Detail key={sel.id} inc={sel} />}

          {sel && (
            <Card title="Audit trail for this record" subtitle="AI, system and human actions">
              <AuditTrail filter={(o) => o.includes(sel.id)} limit={8} />
            </Card>
          )}
        </div>

        <Card title="How Priya’s role changes" subtitle="The service desk doesn’t disappear: the work changes.">
          <ul className="space-y-1.5 text-[0.82rem] text-slate-700">
            {[
              ['Less repetitive triage', 'Classification, routing and context gathering arrive done.'],
              ['More complex troubleshooting', 'Time goes to the issues automation can’t fix.'],
              ['Exception handling', 'Judgement calls stay with people.'],
              ['Knowledge curation', 'Stale articles (like KB0012044) get flagged to owners.'],
              ['Automation feedback', 'Corrections and “unhelpful” flags tune the assistant.'],
            ].map(([t, d]) => (
              <li key={t}><span className="font-medium text-ink-900">{t}.</span> {d}</li>
            ))}
          </ul>
          <div className="mt-4 space-y-3 border-t border-slate-100 pt-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">A typical day</p>
            <DayBar title="Today" rows={BEFORE} />
            <DayBar title="With the assistant" rows={AFTER} />
            <p className="text-[0.72rem] text-slate-500"><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-slate-300" />Repetitive work</p>
            <Illustrative>Illustrative split for discussion. Not a client baseline, and not a headcount reduction.</Illustrative>
          </div>
        </Card>
      </div>
    </div>
  )
}
