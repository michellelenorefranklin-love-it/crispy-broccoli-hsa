import type { ReactNode } from 'react'
import {
  Wifi, KeyRound, ShieldAlert, Play, CheckCircle2, Circle, XCircle, AlertTriangle, CircleDot, Smartphone,
  Phone, Bell, MessageSquare, ArrowRight, Monitor,
} from 'lucide-react'
import { Assistant } from '../../components/Assistant'
import { Badge, Button, Callout, Card, Prov } from '../../components/ui'
import { useDemo } from '../../store/store'
import { cn } from '../../lib/util'
import type { ChatMessage, Provenance } from '../../types'

export type ScenarioId = 'vpn' | 'password' | 'security'

const RUN: Record<ScenarioId, string> = {
  vpn: 'My VPN isn’t connecting and I can’t access my finance applications',
  password: 'I’m locked out and need to reset my password',
  security: 'I got a weird MFA prompt I didn’t trigger and now FinReport looks different.',
}

const PROMPTS: Record<ScenarioId, string[]> = {
  vpn: ['My VPN isn’t connecting', 'Connect me to a human'],
  password: [RUN.password, 'Connect me to a human'],
  security: [RUN.security, 'Where is my request?'],
}

interface ScenarioMeta {
  letter: string
  title: string
  icon: ReactNode
  summary: string
  steps: string[]
  rai: string
  controls: string[]
}

const META: Record<ScenarioId, ScenarioMeta> = {
  vpn: {
    letter: 'A', title: 'VPN issue', icon: <Wifi size={16} />,
    summary: 'Resolve in self-service where it is safe; escalate with full context where it is not.',
    steps: ['Intent', 'Device context', 'Knowledge (KB0012044)', 'Guided steps', 'Safe diagnostic', 'Resolve or escalate', 'Interaction summary'],
    rai: 'Outdated knowledge is flagged, not hidden. Workflow failure is told to the employee and becomes an incident: no silent failure.',
    controls: ['Read-only device diagnostics', 'No device-admin actions by the assistant', 'Incident carries everything tried', 'Article owner notified of staleness'],
  },
  password: {
    letter: 'B', title: 'Account / password', icon: <KeyRound size={16} />,
    summary: 'Identity verification comes before anything else. The assistant cannot skip it.',
    steps: ['Request', 'Identity gate (MFA)', 'Verified or not', 'Reset link to device, or human callback'],
    rai: 'Account actions require verified identity. Passwords are never shown or typed into chat; MFA is never bypassed.',
    controls: ['MFA challenge before any account action', 'Reset happens on the registered device', 'No MFA → human verification by callback', 'Every step audited'],
  },
  security: {
    letter: 'C', title: 'High-risk: possible compromise', icon: <ShieldAlert size={16} />,
    summary: 'The assistant recognises a possible compromise, stops self-service and routes straight to Security.',
    steps: ['Report', 'Self-service stopped', 'P1 to Security Operations', 'Clear instructions to Jordan', 'SOC takes over'],
    rai: 'Sensitive or high-risk requests escalate immediately. No troubleshooting, no reassurance the assistant cannot back up.',
    controls: ['No self-service on security events', 'SOC analyst decides all actions', 'Session revocation is a human decision', 'P1 paging is automatic'],
  },
}

const PROV: { label: string; kind: Provenance }[] = [
  { label: 'AI helpdesk agent (portal, Teams)', kind: 'public' },
  { label: 'ServiceNow incident creation via two-way sync', kind: 'public' },
  { label: 'Safe diagnostics + device context', kind: 'validate' },
  { label: `ServiceNow client configuration (groups, priorities)`, kind: 'validate' },
]

type StageState = 'done' | 'current' | 'todo' | 'failed' | 'warn'
interface Stage { label: string; detail?: string; state: StageState }

const lastIdx = (chat: ChatMessage[], pred: (m: ChatMessage) => boolean) => {
  for (let i = chat.length - 1; i >= 0; i--) if (pred(chat[i])) return i
  return -1
}

function Tracker({ stages }: { stages: Stage[] }) {
  return (
    <ol className="space-y-0">
      {stages.map((s, i) => {
        const Icon = s.state === 'done' ? CheckCircle2 : s.state === 'failed' ? XCircle : s.state === 'warn' ? AlertTriangle : s.state === 'current' ? CircleDot : Circle
        const c = s.state === 'done' ? 'text-ok-600' : s.state === 'failed' ? 'text-bad-600' : s.state === 'warn' ? 'text-warn-600' : s.state === 'current' ? 'text-accent-600' : 'text-slate-300'
        return (
          <li key={i} className="relative flex gap-3 pb-3 last:pb-0">
            {i < stages.length - 1 && <span className="absolute left-[9px] top-5 h-full w-px bg-slate-200" />}
            <Icon size={19} className={cn('relative z-10 shrink-0 bg-white', c)} />
            <div className="min-w-0">
              <p className={cn('text-sm font-medium', s.state === 'todo' ? 'text-slate-400' : 'text-ink-900')}>{s.label}</p>
              {s.detail && <p className={cn('text-[0.78rem]', s.state === 'todo' ? 'text-slate-400' : 'text-slate-600')}>{s.detail}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function useVpn() {
  const chat = useDemo((s) => s.chat)
  const inc = useDemo((s) => s.incidents.find((i) => i.id === 'INC0091734'))
  const iUser = lastIdx(chat, (m) => m.from === 'user' && /vpn/i.test(m.text))
  const iSteps = lastIdx(chat, (m) => m.from === 'assistant' && !!m.callout?.title.includes('KB0012044'))
  const iFixed = lastIdx(chat, (m) => m.callout?.title === 'Resolved in self-service')
  const iBroken = lastIdx(chat, (m) => m.from === 'assistant' && m.text.includes('certificate has expired'))
  const started = iSteps >= 0
  const fixed = started && iFixed > iSteps
  const broken = (started && iBroken > iSteps) || (!started && !!inc)
  const awaiting = started && !fixed && !broken
  const stages: Stage[] = [
    { label: 'Intent recognised', detail: 'VPN not connecting; finance apps unreachable', state: started || broken || iUser >= 0 ? 'done' : 'current' },
    { label: 'Context gathered', detail: 'Loaner LT-NY-4471 · New York · no password change in 24h', state: started || broken ? 'done' : 'todo' },
    { label: 'Knowledge retrieved: KB0012044', detail: 'Flagged: last reviewed 14 months ago; owner notified', state: started || broken ? 'warn' : 'todo' },
    { label: 'Guided steps', detail: awaiting ? 'Waiting for Jordan: did it work?' : 'Trusted network · restart client · refresh certificate', state: awaiting ? 'current' : started || broken ? 'done' : 'todo' },
  ]
  if (fixed) {
    stages.push({ label: 'Resolved in self-service', detail: 'No incident needed; repeat-incident check in 7 days', state: 'done' })
  } else if (broken) {
    stages.push(
      { label: 'Safe diagnostic (read-only)', detail: 'Device certificate expired', state: 'done' },
      { label: 'Certificate renewal workflow failed', detail: 'Jordan told immediately; no silent failure', state: 'failed' },
      { label: `Escalated: ${inc?.id ?? 'INC0091734'}`, detail: `P3 · ${inc?.assignmentGroup ?? 'Network Services L2'} · ${inc?.status ?? 'Escalated'}`, state: inc?.status === 'Resolved' ? 'done' : 'current' },
    )
  } else {
    stages.push({ label: 'Resolved, or diagnostic → escalate', detail: 'Depends on Jordan’s answer', state: 'todo' })
  }
  stages.push({ label: 'Interaction summary', detail: fixed ? 'Saved to ServiceNow (no ticket)' : broken ? 'Attached to the incident for Priya' : 'Logged at the end of every interaction', state: fixed || broken ? 'done' : 'todo' })
  return { stages, awaiting, fixed, broken, inc }
}

function usePassword() {
  const chat = useDemo((s) => s.chat)
  const iGate = lastIdx(chat, (m) => m.callout?.title === 'Identity verification gate')
  const iVer = lastIdx(chat, (m) => m.from === 'assistant' && m.text.startsWith('Verified, thanks'))
  const iNo = lastIdx(chat, (m) => m.from === 'assistant' && m.text.includes('verify you here'))
  const gated = iGate >= 0
  const verified = gated && iVer > iGate
  const noPrompt = gated && iNo > iGate
  const pending = gated && !verified && !noPrompt
  const stages: Stage[] = [
    { label: 'Request recognised', detail: 'Locked out; password reset', state: gated ? 'done' : 'current' },
    { label: 'Identity gate: MFA challenge sent', detail: 'Nothing proceeds until identity is verified', state: pending ? 'current' : gated ? 'done' : 'todo' },
    verified
      ? { label: 'Identity verified via MFA', state: 'done' }
      : noPrompt
        ? { label: 'Identity not verified', detail: 'Assistant stopped; routed to human verification', state: 'failed' }
        : { label: 'Identity verified', state: 'todo' },
    verified
      ? { label: 'Reset link sent to registered device', detail: 'Jordan sets the password there. The assistant never sees it.', state: 'done' }
      : noPrompt
        ? { label: 'Service desk callback', detail: 'Verify via number on HR record before any change', state: 'current' }
        : { label: 'Reset link, or human callback', state: 'todo' },
  ]
  return { stages, pending, verified, noPrompt }
}

function useSecurity() {
  const inc = useDemo((s) => s.incidents.find((i) => i.id === 'INC0091802'))
  const done = inc?.status === 'Resolved'
  const stages: Stage[] = [
    { label: 'Report received', detail: 'Unsolicited MFA prompt + FinReport looks different', state: inc ? 'done' : 'current' },
    { label: 'Self-service stopped', detail: 'No troubleshooting attempted', state: inc ? 'failed' : 'todo' },
    { label: `P1 raised: ${inc?.id ?? 'INC0091802'}`, detail: 'Assignment: Security Operations (SOC)', state: inc ? 'done' : 'todo' },
    { label: 'Jordan told what to do now', detail: 'Don’t approve prompts · don’t change FinReport · keep laptop on', state: inc ? 'done' : 'todo' },
  ]
  return { stages: stages.map((s) => (s.state === 'failed' ? { ...s, state: 'warn' as const } : s)), inc, done }
}

const NEXT = [
  { icon: <Bell size={14} />, title: 'SOC on-call paged', when: 'Immediately', owner: 'Automatic' },
  { icon: <Phone size={14} />, title: 'Analyst calls Jordan', when: 'Within 15 minutes', owner: 'SOC analyst' },
  { icon: <ShieldAlert size={14} />, title: 'Sign-ins reviewed; sessions revoked if compromise confirmed', when: 'During the call', owner: 'SOC analyst (human decision)' },
  { icon: <MessageSquare size={14} />, title: 'Jordan updated and incident closed with findings', when: 'When the SOC concludes', owner: 'SOC → Jordan' },
]

function MfaPhone({ pending, verified, noPrompt, send }: { pending: boolean; verified: boolean; noPrompt: boolean; send: (t: string, i?: string) => void }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="mx-auto w-44 shrink-0 rounded-[1.4rem] border-[3px] border-ink-800 bg-slate-50 p-2.5 shadow-card">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-slate-300" />
        <div className="rounded-lg bg-white p-2.5 text-center ring-1 ring-slate-200">
          <p className="flex items-center justify-center gap-1 text-[0.68rem] font-medium uppercase tracking-wide text-slate-500"><Smartphone size={11} /> Authenticator</p>
          <p className="mt-1 text-[0.75rem] text-slate-700">Sign-in request · jordan.taylor</p>
          <p className="mt-1.5 text-[0.68rem] text-slate-500">Enter the number shown</p>
          <p className="text-3xl font-semibold tabular text-ink-900">42</p>
          <p className="mt-1 text-[0.68rem] text-slate-400">Simulated prompt</p>
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        {pending ? (
          <>
            <p className="text-sm text-slate-700">A number-match prompt has gone to Jordan’s registered device. Choose how Jordan responds:</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="primary" onClick={() => send('I approved the prompt', 'pwd-verified')}>Approve (simulated)</Button>
              <Button size="sm" onClick={() => send('I didn’t get a prompt', 'pwd-noprompt')}>I didn’t get a prompt</Button>
            </div>
          </>
        ) : verified ? (
          <Callout tone="ok" title="Verified">Reset link sent to the registered device. The password is set there, never in chat.</Callout>
        ) : noPrompt ? (
          <Callout tone="warn" title="Not verified — handed to a person">The assistant could not verify identity, so it did nothing to the account. The service desk will verify by callback.</Callout>
        ) : (
          <p className="text-sm text-slate-500">The prompt appears here after Jordan asks for help. Use “Run as Jordan”.</p>
        )}
        <Callout tone="neutral" title="There is no skip button">
          The assistant has no path around this gate: no security questions, no “verify later”, no override. If MFA fails, a person verifies identity.
        </Callout>
      </div>
    </div>
  )
}

export function Journey({ scenario, onScenario, onOpenConsole }: { scenario: ScenarioId; onScenario: (s: ScenarioId) => void; onOpenConsole: () => void }) {
  const send = useDemo((s) => s.send)
  const vpn = useVpn()
  const pwd = usePassword()
  const sec = useSecurity()
  const m = META[scenario]
  const stages = scenario === 'vpn' ? vpn.stages : scenario === 'password' ? pwd.stages : sec.stages

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,27rem)]">
      <div className="min-w-0 space-y-4">
        <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Scenario">
          {(Object.keys(META) as ScenarioId[]).map((id) => {
            const s = META[id]
            const active = id === scenario
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => onScenario(id)}
                className={cn('rounded-lg border px-3 py-2.5 text-left transition-colors',
                  active ? 'border-accent-600 bg-accent-50/60 ring-1 ring-accent-600' : 'border-slate-200 bg-white hover:border-slate-300')}
              >
                <span className="flex items-center gap-2">
                  <span className={cn('inline-flex h-6 w-6 items-center justify-center rounded text-[0.75rem] font-semibold', active ? 'bg-accent-600 text-white' : 'bg-slate-100 text-slate-600')}>{s.letter}</span>
                  <span className={cn(active ? 'text-accent-700' : 'text-slate-500')}>{s.icon}</span>
                </span>
                <span className="mt-1.5 block text-sm font-semibold text-ink-900">{s.title}</span>
              </button>
            )
          })}
        </div>

        <Card
          title={<span className="flex items-center gap-2">{m.letter}. {m.title}</span>}
          subtitle={m.summary}
          actions={<Button variant="primary" size="sm" onClick={() => send(RUN[scenario], scenario)}><Play size={13} /> Run as Jordan</Button>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Steps</p>
              <ol className="flex flex-wrap items-center gap-1 text-[0.8rem] text-slate-700">
                {m.steps.map((s, i) => (
                  <li key={s} className="inline-flex items-center gap-1">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5">{s}</span>
                    {i < m.steps.length - 1 && <ArrowRight size={11} className="text-slate-400" />}
                  </li>
                ))}
              </ol>
              <p className="mb-1 mt-3 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Responsible-AI behaviour</p>
              <p className="text-[0.85rem] text-slate-700">{m.rai}</p>
            </div>
            <div>
              <p className="mb-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Controls applied</p>
              <ul className="space-y-1">
                {m.controls.map((c) => (
                  <li key={c} className="flex items-start gap-1.5 text-[0.82rem] text-slate-700"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-accent-600" />{c}</li>
                ))}
              </ul>
              <p className="mb-1.5 mt-3 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Provenance</p>
              <ul className="space-y-1">
                {PROV.map((p) => (
                  <li key={p.label} className="flex flex-wrap items-center justify-between gap-1.5 text-[0.78rem] text-slate-600">{p.label}<Prov kind={p.kind} /></li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Live stage tracker" subtitle="Updates from Jordan’s conversation and the ServiceNow queue">
          <Tracker stages={stages} />

          {scenario === 'vpn' && (
            <div className="mt-4 border-t border-slate-100 pt-3">
              {vpn.awaiting ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[0.8rem] text-slate-600">Choose the outcome:</span>
                  <Button size="sm" variant="success" onClick={() => send('That fixed it', 'vpn-fixed')}>That fixed it</Button>
                  <Button size="sm" onClick={() => send('Still not connecting', 'vpn-broken')}>Still not connecting</Button>
                </div>
              ) : vpn.broken && vpn.inc ? (
                <div className="space-y-2">
                  <Callout tone="warn" title={`${vpn.inc.id} — handed over with full context`}>{vpn.inc.aiSummary}</Callout>
                  <Button size="sm" onClick={onOpenConsole}><Monitor size={13} /> See it in Priya’s queue</Button>
                </div>
              ) : vpn.fixed ? (
                <Callout tone="ok" title="Resolved in self-service">Counted in self-service completion and checked against repeat incidents over 7 days.</Callout>
              ) : (
                <p className="text-[0.8rem] text-slate-500">Use “Run as Jordan” to start. Outcome choices appear once the guided steps are shown.</p>
              )}
            </div>
          )}
        </Card>

        {scenario === 'password' && (
          <Card title="Identity verification gate" subtitle="Simulated MFA number match on Jordan’s registered device" actions={<Badge tone="info">Required</Badge>}>
            <MfaPhone pending={pwd.pending} verified={pwd.verified} noPrompt={pwd.noPrompt} send={send} />
          </Card>
        )}

        {scenario === 'security' && (
          <Card
            title="What happens next"
            subtitle={sec.inc ? `${sec.inc.id} · P1 · ${sec.inc.assignmentGroup} · ${sec.inc.status}` : 'Shown once Jordan reports it'}
            actions={sec.inc ? <Button size="sm" onClick={onOpenConsole}><Monitor size={13} /> Open in console</Button> : undefined}
          >
            <ol className="grid gap-2 sm:grid-cols-2">
              {NEXT.map((n, i) => (
                <li key={n.title} className={cn('rounded-md border px-3 py-2', sec.inc ? 'border-slate-200 bg-white' : 'border-dashed border-slate-200 bg-slate-50')}>
                  <p className="flex items-center gap-1.5 text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">
                    <span className={cn(sec.inc && (i === 0 || sec.done) ? 'text-ok-600' : 'text-accent-600')}>{n.icon}</span> {n.when}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-ink-900">{n.title}</p>
                  <p className="text-[0.75rem] text-slate-500">{n.owner}{sec.inc && i === 0 ? ' · done' : ''}</p>
                </li>
              ))}
            </ol>
            <div className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-[0.82rem] text-slate-700">
              <p className="font-medium text-ink-900">How Jordan tracks it</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                <li>Ask the assistant “Where is my request?” in the portal or Teams</li>
                <li>ServiceNow “My requests” shows the incident and its updates</li>
                <li>The SOC analyst’s call comes from the number on the incident; Jordan does not need to chase</li>
              </ul>
            </div>
          </Card>
        )}
      </div>

      <div className="min-w-0 lg:sticky lg:top-4 lg:self-start">
        <Assistant height="h-[600px]" prompts={PROMPTS[scenario]} title="Assistant — Jordan’s view" />
      </div>
    </div>
  )
}
