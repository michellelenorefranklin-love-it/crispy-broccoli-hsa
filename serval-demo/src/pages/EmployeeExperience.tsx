import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CalendarCheck, KeyRound, LifeBuoy, Search, ShieldCheck, MapPin, Briefcase, UserRound, ChevronRight, CheckCircle2, Circle } from 'lucide-react'
import { useDemo } from '../store/store'
import { people } from '../data/people'
import { Assistant } from '../components/Assistant'
import { ActionBadge, Avatar, Badge, Button, Card, Drawer, PageHeader, Prov, Status } from '../components/ui'
import type { ActionClass } from '../types'
import { cn } from '../lib/util'

const actionClasses: { a: ActionClass; what: string; example: string; control: string }[] = [
  { a: 'Inform', what: 'Answers from approved knowledge and live records.', example: '“What training do I need?”', control: 'Approved sources only; flags stale articles.' },
  { a: 'Recommend', what: 'Suggests a next step; the employee decides.', example: 'Guided VPN steps; alternatives to a blocked request.', control: 'No change made to any system.' },
  { a: 'Initiate workflow', what: 'Starts a governed workflow that may need approval.', example: 'Submitting a FinReport access request.', control: 'Policy checks + routing to the right approver.' },
  { a: 'Execute approved action', what: 'Carries out an action only once policy and approvals allow.', example: 'Provisioning after Alex approves; reset link after MFA.', control: 'Never before approval; always audited.' },
]

const raiBehaviours: { key: string; label: string; prompt: string; intent?: string }[] = [
  { key: 'Insufficient', label: 'Insufficient information → asks a clarifying question', prompt: 'I need access to FinReport' },
  { key: 'Conflicting', label: 'Conflicting policies → stops, explains, routes', prompt: 'I need to post journals in FinReport for quarter-end close' },
  { key: 'Unauthorized', label: 'Unauthorized access → declines, explains, offers a path', prompt: 'Can you give me access to the payments release system too?' },
  { key: 'Workflow failure', label: 'Workflow failure → tells you, creates an incident', prompt: 'Still not connecting', intent: 'vpn-broken' },
  { key: 'outdated', label: 'Possibly outdated knowledge → flags article age', prompt: 'My VPN isn’t connecting' },
  { key: 'human', label: '“Talk to a human” → honoured immediately', prompt: 'Connect me to a human' },
  { key: 'Sensitive', label: 'Sensitive / high-risk → escalates, no self-service', prompt: 'I got a weird MFA prompt I didn’t trigger and now FinReport looks different' },
]

export default function EmployeeExperience() {
  const jordan = people.jordan
  const onboarding = useDemo((s) => s.onboarding)
  const requests = useDemo((s) => s.accessRequests)
  const incidents = useDemo((s) => s.incidents)
  const serviceRequests = useDemo((s) => s.serviceRequests)
  const chat = useDemo((s) => s.chat)
  const send = useDemo((s) => s.send)
  const [raiOpen, setRaiOpen] = useState(false)
  const nav = useNavigate()

  const done = onboarding.filter((t) => t.status === 'Done').length
  const pct = Math.round((done / onboarding.length) * 100)
  const myIncidents = incidents.filter((i) => i.requester.startsWith('Jordan'))
  const shown = new Set(chat.map((m) => m.rai).filter(Boolean) as string[])

  const ask = (t: string, intent?: string) => send(t, intent)

  const quick = [
    { icon: CalendarCheck, label: 'Complete onboarding', sub: 'Personalised checklist', run: () => ask('Help me get started') },
    { icon: KeyRound, label: 'Request application access', sub: 'Minimum access, right approver', run: () => ask('I need access to FinReport') },
    { icon: LifeBuoy, label: 'Resolve an IT issue', sub: 'Guided fix or a person', run: () => ask('My VPN isn’t connecting') },
    { icon: Search, label: 'Check request status', sub: 'Live from the records', run: () => ask('Where is my access request?') },
    { icon: ShieldCheck, label: 'Learn about responsible AI', sub: 'What it can and can’t do', run: () => setRaiOpen(true) },
  ]

  const next: { label: string; run: () => void; tag: string }[] = []
  if (!requests.some((r) => r.scenario === 'standard')) next.push({ label: 'Request FinReport read-only access', run: () => ask('Running reports (read-only)', 'finreport-ro'), tag: 'Access' })
  const pendingStd = requests.find((r) => r.scenario === 'standard' && r.status === 'Pending approval')
  if (pendingStd) next.push({ label: `Waiting on ${pendingStd.nextOwner} for ${pendingStd.ritm}`, run: () => ask('Where is my access request?'), tag: 'Status' })
  next.push({ label: 'Finish Information Security Essentials (40 min)', run: () => ask('What training do I need?'), tag: 'Training' })
  next.push({ label: 'Laptop arrives Day 5 — check status', run: () => ask('When will my laptop arrive?', 'laptop'), tag: 'Equipment' })

  return (
    <div>
      <PageHeader
        title="Good morning, Jordan"
        subtitle="One front door for onboarding, access, IT support, and training. The assistant informs, recommends, and starts workflows; authorized people still decide."
        prov="conceptual"
        actions={<Button variant="secondary" onClick={() => setRaiOpen(true)}><ShieldCheck size={15} /> How the assistant behaves</Button>}
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {quick.map((q) => (
          <button key={q.label} onClick={q.run} className="group flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left shadow-card transition-colors hover:border-accent-200 hover:bg-accent-50/40">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-ink-800 group-hover:bg-accent-100 group-hover:text-accent-700"><q.icon size={16} /></span>
            <span className="min-w-0">
              <span className="block text-[0.85rem] font-semibold leading-tight text-ink-900">{q.label}</span>
              <span className="mt-0.5 block text-[0.75rem] text-slate-500">{q.sub}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Assistant height="h-[640px]" />

        <div className="space-y-4">
          <Card bodyClass="p-4">
            <div className="flex items-center gap-3">
              <Avatar initials={jordan.initials} size="lg" />
              <div className="min-w-0">
                <p className="font-semibold text-ink-900">{jordan.name}</p>
                <p className="text-[0.8rem] text-slate-600">{jordan.title}</p>
              </div>
              <Badge tone="accent" className="ml-auto">New hire · Day {jordan.day}</Badge>
            </div>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[0.8rem]">
              <dt className="flex items-center gap-1 text-slate-500"><Briefcase size={12} /> Team</dt><dd className="text-slate-800">{jordan.department}</dd>
              <dt className="flex items-center gap-1 text-slate-500"><MapPin size={12} /> Location</dt><dd className="text-slate-800">{jordan.location}</dd>
              <dt className="flex items-center gap-1 text-slate-500"><UserRound size={12} /> Manager</dt><dd className="text-slate-800">{people.alex.name}</dd>
            </dl>
          </Card>

          <Card title="Onboarding progress" actions={<Link to="/onboarding" className="text-[0.8rem] font-medium text-accent-700 hover:underline">Timeline</Link>}>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-semibold tabular text-ink-900">{pct}%</p>
              <p className="text-[0.8rem] text-slate-500">{done} of {onboarding.length} steps done</p>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-accent-600 transition-all" style={{ width: `${pct}%` }} /></div>
            <ul className="mt-3 space-y-1">
              {onboarding.filter((t) => t.status !== 'Done').slice(0, 4).map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-2 text-[0.8rem]">
                  <span className="truncate text-slate-700">{t.title}</span><Status s={t.status} />
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Recommended next actions">
            <ul className="space-y-1">
              {next.slice(0, 4).map((n) => (
                <li key={n.label}>
                  <button onClick={n.run} className="flex w-full items-center gap-2 rounded-md px-1.5 py-1.5 text-left text-[0.82rem] text-slate-700 hover:bg-slate-50">
                    <Badge tone="neutral" className="w-[4.6rem] justify-center">{n.tag}</Badge>
                    <span className="flex-1">{n.label}</span>
                    <ChevronRight size={14} className="text-slate-400" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="My open requests" subtitle="Live status from the request records" actions={<Prov kind="validate" />}>
            <ul className="space-y-2 text-[0.8rem]">
              {requests.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-2">
                  <Link to={`/access?scenario=${r.scenario}`} className="min-w-0 hover:underline">
                    <span className="font-mono text-[0.72rem] text-slate-500">{r.ritm}</span>
                    <span className="block truncate text-slate-800">{r.app} · {r.role}</span>
                  </Link>
                  <Status s={r.status} />
                </li>
              ))}
              {myIncidents.map((i) => (
                <li key={i.id} className="flex items-start justify-between gap-2">
                  <Link to={`/support?scenario=${i.priority === 'P1' ? 'security' : 'vpn'}`} className="min-w-0 hover:underline">
                    <span className="font-mono text-[0.72rem] text-slate-500">{i.id}</span>
                    <span className="block truncate text-slate-800">{i.title}</span>
                  </Link>
                  <Status s={i.status} />
                </li>
              ))}
              {serviceRequests.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-2">
                  <Link to="/onboarding" className="min-w-0 hover:underline">
                    <span className="font-mono text-[0.72rem] text-slate-500">{r.id}</span>
                    <span className="block truncate text-slate-800">{r.title}</span>
                  </Link>
                  <Status s="Delayed" />
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card className="mt-5" title="Responsible-AI behaviours in this demo" subtitle="Each one is scripted somewhere in the app. Click to try it in the assistant above." actions={<Badge tone={shown.size >= 7 ? 'ok' : 'neutral'}>{Math.min(shown.size, 7)} of 7 shown this session</Badge>}>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {raiBehaviours.map((b) => {
            const seen = [...shown].some((s) => s.toLowerCase().includes(b.key.toLowerCase()))
            return (
              <button key={b.key} onClick={() => ask(b.prompt, b.intent)} className={cn('flex items-start gap-2 rounded-md border px-2.5 py-2 text-left text-[0.8rem] hover:bg-slate-50', seen ? 'border-ok-100 bg-ok-50/50' : 'border-slate-200')}>
                {seen ? <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-ok-600" /> : <Circle size={14} className="mt-0.5 shrink-0 text-slate-300" />}
                <span className="text-slate-700">{b.label}</span>
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-[0.75rem] text-slate-500">“Workflow failure” appears after the VPN steps when Jordan says it’s still not connecting.</p>
      </Card>

      <Drawer open={raiOpen} onClose={() => setRaiOpen(false)} title="How the assistant behaves" subtitle="Responsible-AI guide (illustrative draft — requires Client review)">
        <p className="text-sm text-slate-700">Every action is classified. This distinction is how employees, approvers, and auditors know what the AI did and what a person decided.</p>
        <div className="mt-4 space-y-3">
          {actionClasses.map((c) => (
            <div key={c.a} className="rounded-md border border-slate-200 p-3">
              <ActionBadge a={c.a} />
              <p className="mt-1.5 text-sm text-slate-800">{c.what}</p>
              <p className="mt-1 text-[0.8rem] text-slate-500">Example: {c.example}</p>
              <p className="mt-1 text-[0.8rem] text-slate-500">Control: {c.control}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-5 text-sm font-semibold text-ink-900">What you should know</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
          <li>• Don’t paste passwords, client data, or account numbers into chat. The assistant never asks for them.</li>
          <li>• The assistant can be wrong. If an answer looks wrong or out of date, say so and ask for a person.</li>
          <li>• “Connect me to a human” works at any time, and your context goes with you.</li>
          <li>• Security concerns always go straight to a person.</li>
        </ul>
        <div className="mt-5 flex gap-2">
          <Button variant="secondary" onClick={() => { setRaiOpen(false); nav('/change?tab=comms') }}>See the comms draft</Button>
          <Button variant="secondary" onClick={() => { setRaiOpen(false); nav('/workflow?tab=tiers') }}>See risk tiers</Button>
        </div>
      </Drawer>
    </div>
  )
}
