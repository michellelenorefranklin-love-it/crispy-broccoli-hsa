import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles, Check, AlertTriangle, MinusCircle, OctagonX, Eye, EyeOff, MessageSquare, Workflow, User, ScrollText } from 'lucide-react'
import { useDemo } from '../store/store'
import { suggestedPrompts } from '../engine/assistant'
import type { ChatMessage, ReasonStep } from '../types'
import { cn } from '../lib/util'
import { ActionBadge, Badge, Prov, RiskBadge, Toggle } from './ui'

function ReasoningStrip({ steps }: { steps: ReasonStep[] }) {
  return (
    <ol className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3 xl:grid-cols-6" aria-label="What the assistant did">
      {steps.map((s, i) => {
        const Icon = s.status === 'done' ? Check : s.status === 'needed' ? AlertTriangle : s.status === 'stopped' ? OctagonX : MinusCircle
        const c = s.status === 'done' ? 'text-ok-600' : s.status === 'needed' ? 'text-warn-600' : s.status === 'stopped' ? 'text-bad-600' : 'text-slate-400'
        return (
          <li key={i} className="rounded border border-slate-200 bg-slate-50 px-1.5 py-1">
            <p className="flex items-center gap-1 text-[0.62rem] font-semibold uppercase tracking-wide text-slate-500">
              <Icon size={10} className={c} /> {s.label}
            </p>
            <p className="mt-0.5 text-[0.72rem] leading-snug text-slate-700">{s.value}</p>
          </li>
        )
      })}
    </ol>
  )
}

function Message({ m, behind, onChip }: { m: ChatMessage; behind: boolean; onChip: (label: string, send?: string, intent?: string) => void }) {
  if (m.from === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-lg rounded-br-sm bg-ink-800 px-3 py-2 text-sm text-white">{m.text}</div>
      </div>
    )
  }
  const isSys = m.from === 'system'
  return (
    <div className="flex gap-2">
      <span className={cn('mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full', isSys ? 'bg-slate-200 text-slate-600' : 'bg-accent-600 text-white')}>
        {isSys ? <Workflow size={14} /> : <Sparkles size={14} />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[0.72rem] text-slate-500">
          <span className="font-medium text-slate-700">{isSys ? 'Workflow update' : 'Assistant'}</span>
          <span className="tabular">{m.ts}</span>
          {m.actionClass && <ActionBadge a={m.actionClass} />}
          {m.rai && <Badge tone="info" className="!text-[0.66rem]">Responsible AI: {m.rai}</Badge>}
        </div>
        <div className={cn('rounded-lg rounded-tl-sm border px-3 py-2 text-sm', isSys ? 'border-slate-200 bg-slate-50' : 'border-slate-200 bg-white')}>
          <p className="text-slate-800">{m.text}</p>
          {m.bullets && (
            <ul className="mt-1.5 space-y-1">
              {m.bullets.map((b, i) => <li key={i} className="text-[0.85rem] text-slate-700">{b.match(/^[✓⚠→]/) ? b : `• ${b}`}</li>)}
            </ul>
          )}
          {m.callout && (
            <div className={cn('mt-2 rounded-md border px-2.5 py-1.5', {
              'border-info-100 bg-info-50': m.callout.tone === 'info',
              'border-warn-100 bg-warn-50': m.callout.tone === 'warn',
              'border-bad-100 bg-bad-50': m.callout.tone === 'bad',
              'border-ok-100 bg-ok-50': m.callout.tone === 'ok',
            })}>
              <p className={cn('text-[0.8rem] font-semibold', {
                'text-info-700': m.callout.tone === 'info', 'text-warn-700': m.callout.tone === 'warn', 'text-bad-700': m.callout.tone === 'bad', 'text-ok-700': m.callout.tone === 'ok',
              })}>{m.callout.title}</p>
              <p className="mt-0.5 text-[0.8rem] text-slate-700">{m.callout.body}</p>
            </div>
          )}
          {m.reasoning && <ReasoningStrip steps={m.reasoning} />}
          {behind && m.behind && (
            <div className="mt-2 rounded-md border border-dashed border-ink-600/40 bg-ink-900/[0.03] p-2.5 text-[0.78rem]">
              <p className="mb-1 flex items-center gap-1.5 font-semibold text-ink-800"><Eye size={12} /> Behind the scenes <Prov kind="conceptual" /></p>
              <dl className="grid grid-cols-[7.5rem_1fr] gap-x-2 gap-y-0.5">
                <dt className="text-slate-500">Workflow</dt><dd className="text-slate-800">{m.behind.workflow}</dd>
                <dt className="text-slate-500">Owner</dt><dd className="text-slate-800">{m.behind.owner}</dd>
                <dt className="text-slate-500">Risk tier</dt><dd><RiskBadge tier={m.behind.riskTier} /></dd>
                <dt className="text-slate-500">Approvals</dt><dd className="text-slate-800">{m.behind.approvals.length ? m.behind.approvals.join(' · ') : 'None required'}</dd>
                <dt className="text-slate-500">ServiceNow record</dt><dd className="font-mono text-[0.75rem] text-slate-800">{m.behind.record}</dd>
                <dt className="text-slate-500">Audit events</dt><dd className="text-slate-800">{m.behind.auditEvents.join(' → ')}</dd>
              </dl>
            </div>
          )}
        </div>
        {m.chips && m.chips.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {m.chips.map((c) => (
              <button key={c.label} onClick={() => onChip(c.label, c.send, c.intent)} className="rounded-full border border-accent-200 bg-white px-2.5 py-0.5 text-[0.78rem] font-medium text-accent-700 hover:bg-accent-50">
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Assistant({ className, height = 'h-[560px]', compactPrompts = false, prompts = suggestedPrompts, title = 'Assistant' }: { className?: string; height?: string; compactPrompts?: boolean; prompts?: string[]; title?: string }) {
  const chat = useDemo((s) => s.chat)
  const send = useDemo((s) => s.send)
  const behind = useDemo((s) => s.behindScenes)
  const setS = useDemo((s) => s.set)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [chat.length, behind])

  const go = (t: string, intent?: string) => {
    if (!t.trim() || typing) return
    setTyping(true)
    // Short, deterministic "working" state so the audience sees a processing step without waiting.
    window.setTimeout(() => {
      send(t.trim(), intent)
      setTyping(false)
    }, 450)
    setText('')
  }

  return (
    <div className={cn('flex flex-col rounded-lg border border-slate-200 bg-white shadow-card', height, className)}>
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent-600 text-white"><Sparkles size={14} /></span>
          <div>
            <p className="text-sm font-semibold text-ink-900">{title}</p>
            <p className="flex items-center gap-1 text-[0.72rem] text-slate-500"><MessageSquare size={11} /> Web portal · Also available in Microsoft Teams</p>
          </div>
          <Prov kind="public" />
        </div>
        <Toggle checked={behind} onChange={(v) => setS({ behindScenes: v })} label={<span className="inline-flex items-center gap-1 text-[0.8rem]">{behind ? <Eye size={13} /> : <EyeOff size={13} />} Behind the scenes</span>} />
      </header>

      <div className="scroll-thin flex-1 space-y-3 overflow-y-auto px-4 py-3" aria-live="polite">
        {chat.map((m) => <Message key={m.id} m={m} behind={behind} onChip={(label, s, i) => go(s ?? label, i)} />)}
        {typing && (
          <div className="flex items-center gap-2 text-[0.8rem] text-slate-500">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-600 text-white"><Sparkles size={14} /></span>
            Checking knowledge and policy…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-slate-100 px-3 py-2.5">
        <div className={cn('mb-2 flex gap-1.5', compactPrompts ? 'scroll-thin overflow-x-auto pb-1' : 'flex-wrap')}>
          {prompts.map((p) => (
            <button key={p} onClick={() => go(p)} disabled={typing} className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[0.78rem] text-slate-700 hover:bg-slate-200 disabled:opacity-50">
              {p}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); go(text) }} className="flex items-center gap-2">
          <span className="text-slate-400"><User size={16} /></span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask anything — e.g. “I got a weird MFA prompt I didn’t trigger”"
            className="h-9 flex-1 rounded-md border border-slate-300 px-3 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
            aria-label="Message the assistant"
          />
          <button type="submit" disabled={!text.trim() || typing} className="inline-flex h-9 items-center gap-1 rounded-md bg-ink-800 px-3 text-sm font-medium text-white hover:bg-ink-700 disabled:bg-slate-300">
            <Send size={14} /> Send
          </button>
        </form>
        <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] text-slate-400"><ScrollText size={11} /> Scripted responses. Simulated environment. No data leaves this laptop.</p>
      </div>
    </div>
  )
}

export function AuditTrail({ filter, limit = 12, className }: { filter?: (o: string) => boolean; limit?: number; className?: string }) {
  const audit = useDemo((s) => s.audit)
  const rows = (filter ? audit.filter((a) => filter(a.object) || filter(a.action)) : audit).slice(0, limit)
  return (
    <div className={cn('overflow-hidden rounded-md border border-slate-200', className)}>
      <table className="w-full text-left text-[0.78rem]">
        <thead className="bg-slate-50 text-[0.68rem] uppercase tracking-wide text-slate-500">
          <tr><th className="px-2.5 py-1.5">Time</th><th className="px-2.5 py-1.5">Actor</th><th className="px-2.5 py-1.5">Event</th><th className="px-2.5 py-1.5">System</th></tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={4} className="px-2.5 py-3 text-center text-slate-400">No audit events yet. Submit a request to see them appear.</td></tr>}
          {rows.map((a) => (
            <tr key={a.id} className="border-t border-slate-100 align-top">
              <td className="whitespace-nowrap px-2.5 py-1.5 tabular text-slate-500">{a.ts}</td>
              <td className="px-2.5 py-1.5">
                <span className="text-slate-800">{a.actor}</span>
                <span className={cn('ml-1 rounded px-1 text-[0.62rem] font-semibold uppercase', a.actorType === 'AI agent' ? 'bg-accent-50 text-accent-700' : a.actorType === 'Human' ? 'bg-info-50 text-info-700' : 'bg-slate-100 text-slate-500')}>{a.actorType}</span>
              </td>
              <td className="px-2.5 py-1.5 text-slate-700">{a.action} <span className="font-mono text-[0.7rem] text-slate-400">{a.object}</span></td>
              <td className="whitespace-nowrap px-2.5 py-1.5 text-slate-500">{a.system}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
