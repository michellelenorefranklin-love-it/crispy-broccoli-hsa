import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle, ArrowRight, Check, CircleDashed, Clock, Hourglass, Link2, MessageSquareQuote, OctagonX, Send, ShieldCheck, Sparkles, UserCheck, Workflow, Zap,
} from 'lucide-react'
import { useDemo } from '../store/store'
import { changeSupport } from '../data/onboarding'
import type { OnboardingTask, TaskStatus, TaskType } from '../types'
import { Assistant, AuditTrail } from '../components/Assistant'
import { Badge, Button, Callout, Card, Drawer, Illustrative, PageHeader, Prov, Stat, Status } from '../components/ui'
import { cn } from '../lib/util'

const SCENARIO_TEXT = "I'm starting in Corporate Finance and need everything set up to do my job."

const statusIcon: Record<TaskStatus, { Icon: typeof Check; cls: string }> = {
  Done: { Icon: Check, cls: 'bg-ok-600 text-white' },
  'In progress': { Icon: Clock, cls: 'bg-warn-50 text-warn-700 ring-1 ring-warn-100' },
  'Pending approval': { Icon: Hourglass, cls: 'bg-warn-50 text-warn-700 ring-1 ring-warn-100' },
  Blocked: { Icon: OctagonX, cls: 'bg-bad-600 text-white' },
  Delayed: { Icon: AlertTriangle, cls: 'bg-bad-50 text-bad-700 ring-1 ring-bad-100' },
  'Not started': { Icon: CircleDashed, cls: 'bg-slate-100 text-slate-400 ring-1 ring-slate-200' },
}

const typeMeta: Record<TaskType, { Icon: typeof Zap; tone: 'neutral' | 'accent' | 'info' }> = {
  Automated: { Icon: Zap, tone: 'neutral' },
  'Employee action': { Icon: UserCheck, tone: 'info' },
  'Human approval': { Icon: ShieldCheck, tone: 'accent' },
}

/** Related screen for each step, so the drawer can jump to where it is shown in depth. */
const related: Record<string, { label: string; to: string }> = {
  'ob-offer': { label: 'See integration architecture', to: '/architecture' },
  'ob-hr': { label: 'See integration architecture', to: '/architecture' },
  'ob-equip': { label: 'Open IT support view', to: '/support' },
  'ob-account': { label: 'See integration architecture', to: '/architecture' },
  'ob-needs': { label: 'Open Access & Permissions', to: '/access?scenario=standard' },
  'ob-apps': { label: 'Open the FinReport request', to: '/access?scenario=standard' },
  'ob-training': { label: 'Open learning paths', to: '/change?tab=learning' },
  'ob-manager': { label: 'Open manager communications', to: '/change?tab=comms' },
  'ob-30': { label: 'See adoption and value metrics', to: '/value' },
}

const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length >= 5)
/** Loose match between a change-support stage and a task's linked intervention. */
const stageMatches = (stageIdx: number, t: OnboardingTask) => {
  const target = t.changeIntervention.toLowerCase()
  return words(changeSupport[stageIdx].intervention).some((w) => target.includes(w))
}

export default function Onboarding() {
  const tasks = useDemo((s) => s.onboarding)
  const chat = useDemo((s) => s.chat)
  const nav = useNavigate()
  const [openId, setOpenId] = useState<string | null>(null)
  const [stage, setStage] = useState<number | null>(null)

  const byId = useMemo(() => Object.fromEntries(tasks.map((t) => [t.id, t])), [tasks])
  const counts = useMemo(() => ({
    done: tasks.filter((t) => t.status === 'Done').length,
    progress: tasks.filter((t) => t.status === 'In progress').length,
    approval: tasks.filter((t) => t.status === 'Pending approval').length,
    bottleneck: tasks.filter((t) => t.status === 'Delayed' || t.status === 'Blocked').length,
  }), [tasks])
  const bottlenecks = tasks.filter((t) => t.status === 'Delayed' || t.status === 'Blocked')
  const sent = chat.some((m) => m.from === 'user' && m.text === SCENARIO_TEXT)
  const open = openId ? byId[openId] : null

  return (
    <div>
      <PageHeader
        title="New-hire onboarding"
        subtitle="One orchestrated journey for Jordan Taylor across HR, IT, the manager, and compliance. Every step has an owner, a control, and a change intervention."
        told={['needs', 'process']}
        prov="conceptual"
        actions={<span className="inline-flex items-center gap-1.5 text-[0.8rem] text-slate-500"><Workflow size={14} /> Triggered by HRIS hire event <Prov kind="validate" /></span>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Done" value={counts.done} sub={`of ${tasks.length} steps`} tone="ok" />
        <Stat label="In progress" value={counts.progress} sub="Employee working on it" tone={counts.progress ? 'warn' : 'neutral'} />
        <Stat label="Awaiting approval" value={counts.approval} sub="A person must decide" tone={counts.approval ? 'warn' : 'neutral'} />
        <Stat label="Bottlenecks" value={counts.bottleneck} sub="Delayed or blocked" tone={counts.bottleneck ? 'bad' : 'ok'} />
      </div>
      <div className="mt-1.5"><Illustrative>Illustrative — counts reflect the simulated journey and update live.</Illustrative></div>

      {bottlenecks.length > 0 && (
        <div className="mt-4">
          <Callout tone="warn" icon={<AlertTriangle size={15} />} title={`Bottleneck: ${bottlenecks.map((b) => b.title).join(', ')}`}>
            {bottlenecks[0].detail} Owner: {bottlenecks[0].owner}.{' '}
            <button className="font-medium text-ink-800 underline underline-offset-2" onClick={() => setOpenId(bottlenecks[0].id)}>View step</button>
          </Callout>
        </div>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        {/* Timeline */}
        <Card
          className="lg:col-span-7"
          title="Jordan’s onboarding timeline"
          subtitle={stage === null ? 'Click any step for full detail.' : `Highlighting steps supported by: ${changeSupport[stage].intervention}`}
          actions={stage !== null ? <Button size="sm" variant="ghost" onClick={() => setStage(null)}>Clear highlight</Button> : undefined}
          bodyClass="p-0"
        >
          <ol>
            {tasks.map((t, i) => {
              const si = statusIcon[t.status]
              const tm = typeMeta[t.type]
              const hit = stage !== null && stageMatches(stage, t)
              const dim = stage !== null && !hit
              return (
                <li key={t.id} className={cn('relative transition-opacity', dim && 'opacity-40')}>
                  {i < tasks.length - 1 && <span className="absolute left-[1.9rem] top-10 h-[calc(100%-1.5rem)] w-px bg-slate-200" aria-hidden />}
                  <button
                    onClick={() => setOpenId(t.id)}
                    className={cn('flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left hover:bg-slate-50', hit && 'bg-accent-50/60 ring-1 ring-inset ring-accent-200')}
                  >
                    <span className={cn('relative z-10 mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full', si.cls)}><si.Icon size={14} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-ink-900">{t.title}</span>
                        <Status s={t.status} />
                        <Badge tone={tm.tone} icon={<tm.Icon size={11} />}>{t.type}</Badge>
                      </span>
                      <span className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[0.78rem] text-slate-500">
                        <span>Owner: <span className="text-slate-700">{t.owner}</span></span>
                        <span>Due: <span className="tabular text-slate-700">{t.due}</span></span>
                        {t.dependsOn.length > 0 && <span>After: <span className="text-slate-700">{t.dependsOn.map((d) => byId[d]?.title ?? d).join(', ')}</span></span>}
                      </span>
                      <span className="mt-1.5 grid gap-x-4 gap-y-0.5 text-[0.76rem] sm:grid-cols-3">
                        <span className="text-slate-600"><span className="font-medium text-slate-500">Control · </span>{t.control}</span>
                        <span className="text-slate-600"><span className="font-medium text-slate-500">Risk · </span>{t.risk}</span>
                        <span className="text-slate-600"><span className="font-medium text-slate-500">Change · </span>{t.changeIntervention}</span>
                      </span>
                    </span>
                    <ArrowRight size={14} className="mt-1 shrink-0 text-slate-300" />
                  </button>
                </li>
              )
            })}
          </ol>
        </Card>

        {/* Scenario */}
        <div className="space-y-4 lg:col-span-5">
          <Card title="Try it: Jordan asks for help" subtitle="One sentence starts the orchestration">
            <div className="flex gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5">
              <MessageSquareQuote size={16} className="mt-0.5 shrink-0 text-slate-400" />
              <p className="text-sm text-slate-800"><span className="font-medium">Jordan says:</span> “{SCENARIO_TEXT}”</p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button variant="primary" onClick={() => useDemo.getState().send(SCENARIO_TEXT)}>
                <Send size={14} /> {sent ? 'Send again as Jordan' : 'Send as Jordan'}
              </Button>
              {sent && <Badge tone="ok" icon={<Check size={11} />}>Sent — see the reply and timeline update</Badge>}
            </div>
            <p className="mt-3 text-[0.75rem] font-medium uppercase tracking-wide text-slate-500">What the assistant does</p>
            <ul className="mt-1.5 space-y-1.5 text-[0.84rem] text-slate-700">
              {[
                'Builds a personalised checklist from Jordan’s role and worker record',
                'Starts what it is allowed to start (requests, reminders, scheduling)',
                'Shows what needs manager or app-owner approval, and who decides',
                'Surfaces mandatory training and its deadlines',
                'Flags the delayed laptop as a bottleneck and notifies the owner',
                'Offers a human at any point, with context passed on',
              ].map((x) => (
                <li key={x} className="flex gap-2"><Sparkles size={13} className="mt-0.5 shrink-0 text-accent-600" />{x}</li>
              ))}
            </ul>
          </Card>
          <Assistant height="h-[520px]" title="Jordan’s assistant" compactPrompts />
        </div>
      </div>

      {/* Change support */}
      <Card
        className="mt-5"
        title="Change support at each stage"
        subtitle="Select a stage to highlight the onboarding steps it supports. Technology alone does not change behaviour."
        actions={<Prov kind="conceptual" />}
      >
        <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {changeSupport.map((c, i) => {
            const n = tasks.filter((t) => stageMatches(i, t)).length
            const on = stage === i
            return (
              <button
                key={c.stage}
                onClick={() => setStage(on ? null : i)}
                aria-pressed={on}
                className={cn('rounded-md border px-3 py-2.5 text-left transition-colors', on ? 'border-accent-500 bg-accent-50 ring-1 ring-accent-500' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50')}
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500">{c.stage}</p>
                <p className="mt-0.5 text-[0.84rem] font-medium leading-snug text-ink-900">{c.intervention}</p>
                <p className="mt-1 text-[0.72rem] text-slate-500">{n} linked step{n === 1 ? '' : 's'}</p>
              </button>
            )
          })}
        </div>
        {stage !== null && (
          <dl className="mt-3 grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-[0.84rem] sm:grid-cols-2 lg:grid-cols-4">
            <Detail label="Audience" value={changeSupport[stage].audience} />
            <Detail label="Desired behaviour" value={changeSupport[stage].behavior} />
            <Detail label="Owner" value={changeSupport[stage].owner} />
            <Detail label="Risk mitigated" value={changeSupport[stage].risk} />
          </dl>
        )}
      </Card>

      <Drawer open={!!open} onClose={() => setOpenId(null)} title={open?.title ?? ''} subtitle={open ? `${open.type} · Due ${open.due}` : undefined}>
        {open && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Status s={open.status} />
              <Badge tone={typeMeta[open.type].tone}>{open.type}</Badge>
            </div>
            <p className="text-sm text-slate-700">{open.detail}</p>
            <dl className="grid gap-3 sm:grid-cols-2">
              <Detail label="Owner" value={open.owner} />
              <Detail label="System" value={open.system} />
              <Detail label="Control" value={open.control} />
              <Detail label="Risk if missed" value={open.risk} />
              <Detail label="Depends on" value={open.dependsOn.length ? open.dependsOn.map((d) => `${byId[d]?.title ?? d} (${byId[d]?.status ?? '—'})`).join('; ') : 'Nothing — first step'} />
              <Detail label="Change intervention" value={open.changeIntervention} />
            </dl>
            {open.type === 'Human approval' && (
              <Callout tone="info" icon={<ShieldCheck size={14} />} title="A person decides this step">
                The assistant can prepare and route, but cannot complete this step on anyone’s behalf.
              </Callout>
            )}
            <div>
              <p className="mb-1.5 text-[0.75rem] font-medium uppercase tracking-wide text-slate-500">Audit events for Jordan’s onboarding</p>
              <AuditTrail limit={5} filter={(o) => /jordan|REQ0031877|RITM0048213|onboarding/i.test(o)} />
            </div>
            {related[open.id] && (
              <Button variant="primary" onClick={() => { setOpenId(null); nav(related[open.id].to) }}>
                <Link2 size={14} /> {related[open.id].label}
              </Button>
            )}
          </div>
        )}
      </Drawer>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-[0.85rem] text-slate-800">{value}</dd>
    </div>
  )
}
