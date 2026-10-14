import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, AlertTriangle, MessageCircleQuestion } from 'lucide-react'
import { Avatar, Badge, Button, Callout, Card, Illustrative, PageHeader, Prov } from '../components/ui'
import { cn } from '../lib/util'

interface Touch { day: string; lane: string; action: string; pain: string }

const lanes = ['Jordan (new analyst)', 'HR', 'IT service desk', 'Manager', 'FinReport owner', 'Facilities / EUS']

const touches: Touch[] = [
  { day: 'Day −3', lane: 'HR', action: 'Welcome email with a 14-link checklist', pain: 'No single view of what happens when' },
  { day: 'Day 1', lane: 'Facilities / EUS', action: 'Laptop not ready; loaner issued', pain: 'No status visibility on equipment' },
  { day: 'Day 1', lane: 'IT service desk', action: 'Calls to ask which access to request', pain: 'Unclear access; repeated questions become tickets' },
  { day: 'Day 2', lane: 'Manager', action: 'Asked to approve by email, then again in the portal', pain: 'Inconsistent approval paths' },
  { day: 'Day 2', lane: 'FinReport owner', action: 'Request bounced: wrong role selected', pain: 'Rework; no guidance on minimum access' },
  { day: 'Day 3', lane: 'IT service desk', action: '“Any update on my ticket?” — third chase', pain: 'Service desk buried in status triage' },
  { day: 'Day 4', lane: 'HR', action: 'Asks HR who owns training enrolment', pain: 'Ownership unclear across teams' },
  { day: 'Day 6', lane: 'FinReport owner', action: 'Access finally granted — no notification', pain: 'Days to full access; productivity lost' },
]
const days = ['Day −3', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 6']

const stats = [
  { label: 'Teams contacted to get set up', value: '5+' },
  { label: 'Days to full access', value: '6–10' },
  { label: 'Tickets that are status questions', value: '~25%' },
  { label: 'Different approval paths in week 1', value: '3' },
  { label: 'Time to first productive day', value: '2 wks' },
]

const framing = [
  { k: 'Why', q: 'Why is this change happening, and what does success look like?' },
  { k: 'Who', q: 'Who will be most affected, and how?' },
  { k: 'How', q: 'What will people need to adopt it and sustain it?' },
]

export default function CurrentState() {
  const nav = useNavigate()
  const [sel, setSel] = useState<number | null>(null)
  const jordanLane = lanes[0]

  return (
    <div>
      <PageHeader
        title="Today: getting set up as a new analyst"
        subtitle="An illustrative current-state journey for Jordan Taylor, day 1 to day 6. Built to test with the room, not to describe the Client."
        prov="validate"
        actions={<Button variant="primary" onClick={() => nav('/employee')}>See the future state <ArrowRight size={14} /></Button>}
      />

      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-lg border border-warn-100 bg-warn-50 px-4 py-2.5">
        <AlertTriangle size={16} className="text-warn-700" />
        <p className="text-sm font-semibold text-warn-700">Hypotheses to validate in discovery</p>
        <p className="text-[0.82rem] text-slate-700">Not findings about the Client. Every touchpoint and number below needs evidence.</p>
      </div>

      <div className="mb-1.5"><Illustrative>Illustrative pain indicators — hypotheses, not Client data.</Illustrative></div>
      <div className="mb-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-slate-200 bg-white px-3.5 py-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[0.75rem] font-medium text-slate-500">{s.label}</p>
            </div>
            <p className="mt-1 text-xl font-semibold tabular text-ink-900">{s.value}</p>
            <div className="mt-1"><Prov kind="validate" /></div>
          </div>
        ))}
      </div>

      <Card title="Jordan’s first week — touchpoints and pain points" subtitle="Select a touchpoint to see the pain point." className="mb-5" actions={<Illustrative>Illustrative journey</Illustrative>}>
        <div className="overflow-x-auto">
          <div className="min-w-[820px]">
            <div className="grid grid-cols-[150px_repeat(6,minmax(0,1fr))] gap-1 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">
              <div />
              {days.map((d) => <div key={d} className="px-1 pb-1">{d}</div>)}
            </div>
            {lanes.map((lane) => (
              <div key={lane} className={cn('grid grid-cols-[150px_repeat(6,minmax(0,1fr))] gap-1 border-t border-slate-100 py-1.5', lane === jordanLane && 'bg-slate-50')}>
                <div className="flex items-center gap-2 pr-2 text-[0.8rem] font-medium text-ink-900">
                  {lane === jordanLane && <Avatar initials="JT" size="sm" />}
                  {lane}
                </div>
                {days.map((d) => {
                  if (lane === jordanLane) {
                    const n = touches.filter((t) => t.day === d).length
                    return <div key={d} className="flex items-center px-1 text-[0.75rem] text-slate-500">{n > 0 ? `${n} contact${n > 1 ? 's' : ''}` : '—'}</div>
                  }
                  const items = touches.map((t, i) => ({ t, i })).filter(({ t }) => t.day === d && t.lane === lane)
                  return (
                    <div key={d} className="space-y-1">
                      {items.map(({ t, i }) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSel(sel === i ? null : i)}
                          aria-pressed={sel === i}
                          className={cn('w-full rounded-md border px-2 py-1.5 text-left text-[0.75rem] leading-snug transition-colors',
                            sel === i ? 'border-bad-600 bg-bad-50 text-ink-900' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300')}
                        >
                          {t.action}
                          {sel === i && <span className="mt-1 flex items-start gap-1 font-medium text-bad-700"><AlertTriangle size={11} className="mt-0.5 shrink-0" /> {t.pain}</span>}
                        </button>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {Array.from(new Set(touches.map((t) => t.pain))).map((p) => <Badge key={p} tone="bad">{p}</Badge>)}
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card title="Framing the change">
          <div className="space-y-2.5">
            {framing.map((f) => (
              <div key={f.k} className="flex items-start gap-3">
                <span className="w-12 shrink-0 rounded bg-ink-800 px-2 py-1 text-center text-[0.75rem] font-semibold text-white">{f.k}</span>
                <p className="text-sm text-slate-700">{f.q}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Ask the room">
          <div className="flex items-start gap-3">
            <MessageCircleQuestion size={22} className="mt-0.5 shrink-0 text-accent-600" />
            <div>
              <p className="text-lg font-semibold text-ink-900">“What makes you believe that?”</p>
              <p className="mt-1 text-sm text-slate-600">Use it on every touchpoint and number above. If the answer is data, capture the source. If it is anecdote, it becomes a discovery question.</p>
            </div>
          </div>
          <div className="mt-4">
            <Callout tone="neutral">Next: the same person, the same day 3 — in the future state.</Callout>
          </div>
          <div className="mt-3 flex justify-end">
            <Button variant="primary" onClick={() => nav('/employee')}>See the future state <ArrowRight size={14} /></Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
