import { useEffect, useState, type ReactNode, type ButtonHTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Quote, Info, ShieldCheck, Lock } from 'lucide-react'
import { cn } from '../lib/util'
import { useDemo } from '../store/store'
import type { ActionClass, Provenance, RiskTier } from '../types'
import { clientStatements, type StatementId } from '../data/clientStatements'
import { clientConfig, clientPossessive } from '../config/client'

type Tone = 'neutral' | 'accent' | 'ok' | 'warn' | 'bad' | 'info' | 'ink'
const toneCls: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  accent: 'bg-accent-50 text-accent-700 ring-accent-200',
  ok: 'bg-ok-50 text-ok-700 ring-ok-100',
  warn: 'bg-warn-50 text-warn-700 ring-warn-100',
  bad: 'bg-bad-50 text-bad-700 ring-bad-100',
  info: 'bg-info-50 text-info-700 ring-info-100',
  ink: 'bg-ink-800 text-white ring-ink-700',
}

export function Badge({ tone = 'neutral', children, className, icon }: { tone?: Tone; children: ReactNode; className?: string; icon?: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[0.72rem] font-medium ring-1 ring-inset', toneCls[tone], className)}>
      {icon}
      {children}
    </span>
  )
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'; size?: 'sm' | 'md' }
export function Button({ variant = 'secondary', size = 'md', className, ...p }: BtnProps) {
  const v = {
    primary: 'bg-ink-800 text-white hover:bg-ink-700 disabled:bg-slate-300',
    secondary: 'bg-white text-slate-800 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:text-slate-400',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:text-slate-300',
    danger: 'bg-bad-600 text-white hover:bg-bad-700 disabled:bg-slate-300',
    success: 'bg-accent-600 text-white hover:bg-accent-700 disabled:bg-slate-300',
  }[variant]
  const s = size === 'sm' ? 'h-7 px-2.5 text-[0.8rem]' : 'h-9 px-3.5 text-sm'
  return <button type="button" className={cn('inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:cursor-not-allowed', v, s, className)} {...p} />
}

export function Card({ title, subtitle, actions, children, className, bodyClass, id }: { title?: ReactNode; subtitle?: ReactNode; actions?: ReactNode; children?: ReactNode; className?: string; bodyClass?: string; id?: string }) {
  return (
    <section id={id} className={cn('rounded-lg border border-slate-200 bg-white shadow-card', className)}>
      {(title || actions) && (
        <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <div className="min-w-0">
            {title && <h3 className="text-[0.95rem] font-semibold text-ink-900">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-[0.8rem] text-slate-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cn('p-4', bodyClass)}>{children}</div>
    </section>
  )
}

export function Tabs<T extends string>({ tabs, value, onChange, className }: { tabs: { id: T; label: string; badge?: ReactNode }[]; value: T; onChange: (v: T) => void; className?: string }) {
  return (
    <div role="tablist" className={cn('flex flex-wrap gap-1 border-b border-slate-200', className)}>
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            '-mb-px inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors',
            value === t.id ? 'border-accent-600 text-ink-900' : 'border-transparent text-slate-500 hover:text-slate-800',
          )}
        >
          {t.label}
          {t.badge}
        </button>
      ))}
    </div>
  )
}

export function Segmented<T extends string>({ options, value, onChange, size = 'md' }: { options: { id: T; label: ReactNode }[]; value: T; onChange: (v: T) => void; size?: 'sm' | 'md' }) {
  return (
    <div className="inline-flex rounded-md bg-slate-100 p-0.5 ring-1 ring-inset ring-slate-200">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={cn(
            'rounded px-2.5 font-medium transition-colors',
            size === 'sm' ? 'py-0.5 text-[0.78rem]' : 'py-1 text-sm',
            value === o.id ? 'bg-white text-ink-900 shadow-card' : 'text-slate-500 hover:text-slate-800',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Toggle({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label?: ReactNode; disabled?: boolean }) {
  return (
    <label className={cn('inline-flex cursor-pointer select-none items-center gap-2 text-sm', disabled && 'cursor-not-allowed opacity-60')}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn('relative h-5 w-9 shrink-0 rounded-full transition-colors', checked ? 'bg-accent-600' : 'bg-slate-300')}
      >
        <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all', checked ? 'left-[1.15rem]' : 'left-0.5')} />
      </button>
      {label && <span className="text-slate-700">{label}</span>}
    </label>
  )
}

export function Drawer({ open, onClose, title, subtitle, children, width = 'max-w-xl' }: { open: boolean; onClose: () => void; title: ReactNode; subtitle?: ReactNode; children: ReactNode; width?: string }) {
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }
    window.addEventListener('keydown', h, true)
    return () => window.removeEventListener('keydown', h, true)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink-900/30" onClick={onClose} />
      <aside role="dialog" aria-modal="true" className={cn('relative flex h-full w-full flex-col bg-white shadow-pop', width)}>
        <header className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close"><X size={16} /></Button>
        </header>
        <div className="scroll-thin flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </aside>
    </div>
  )
}

const provMeta: Record<Provenance, { label: string; tone: Tone; tip: string }> = {
  public: { label: 'Publicly described', tone: 'info', tip: 'Capability described publicly by the vendor. Not verified in the Client’s environment.' },
  conceptual: { label: 'Conceptual', tone: 'neutral', tip: 'Plausible future state for discussion. Not a product claim.' },
  validate: { label: 'Needs validation', tone: 'warn', tip: 'Requires Client or vendor confirmation before it is treated as design.' },
}
export function Prov({ kind, className }: { kind: Provenance; className?: string }) {
  const show = useDemo((s) => s.showProvenance)
  if (!show) return null
  const m = provMeta[kind]
  return (
    <span title={m.tip} className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded border border-dashed px-1.5 py-px text-[0.66rem] font-medium uppercase tracking-wide',
      m.tone === 'info' ? 'border-info-600/40 text-info-700' : m.tone === 'warn' ? 'border-warn-600/50 text-warn-700' : 'border-slate-400 text-slate-500', className)}>
      {m.label}
    </span>
  )
}

export function YouToldUs({ ids }: { ids: StatementId[] }) {
  const [open, setOpen] = useState<StatementId | null>(null)
  const nav = useNavigate()
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {ids.map((id) => (
        <div key={id} className="relative">
          <button
            onClick={() => setOpen(open === id ? null : id)}
            className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2 py-0.5 text-[0.72rem] font-medium text-accent-700 ring-1 ring-inset ring-accent-200 hover:bg-accent-100"
          >
            <Quote size={11} /> You told us
          </button>
          {open === id && (
            <div className="absolute left-0 top-7 z-30 w-72 rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-pop">
              <p className="font-medium italic text-ink-900">“{clientStatements[id].quote}”</p>
              <p className="mt-1.5 text-[0.8rem] text-slate-500">Addressed in: {clientStatements[id].where}</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => { setOpen(null); nav(clientStatements[id].route) }}>Go there</Button>
                <Button size="sm" variant="ghost" onClick={() => setOpen(null)}>Close</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function PageHeader({ title, subtitle, told, prov, actions }: { title: string; subtitle?: ReactNode; told?: StatementId[]; prov?: Provenance; actions?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-[1.45rem] font-semibold tracking-tight text-ink-900">{title}</h1>
          {prov && <Prov kind={prov} />}
        </div>
        {subtitle && <p className="mt-1 max-w-3xl text-[0.92rem] text-slate-600">{subtitle}</p>}
        {told && told.length > 0 && <div className="mt-2"><YouToldUs ids={told} /></div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function ControlsFootnote() {
  return (
    <p className="mt-6 flex items-start gap-2 border-t border-slate-200 pt-3 text-[0.78rem] text-slate-500">
      <ShieldCheck size={14} className="mt-0.5 shrink-0" />
      Final policy decisions, regulatory interpretation, control design, and risk acceptance remain with authorized stakeholders at {clientConfig.name}. Rules shown are illustrative and subject to {clientPossessive} security and compliance policies.
    </p>
  )
}

export function Illustrative({ children = 'Illustrative — not a client baseline, product claim, or committed benefit.' }: { children?: ReactNode }) {
  return <p className="inline-flex items-center gap-1 text-[0.75rem] text-slate-500"><Info size={12} /> {children}</p>
}

const actionTone: Record<ActionClass, Tone> = { Inform: 'neutral', Recommend: 'info', 'Initiate workflow': 'accent', 'Execute approved action': 'ink' }
export function ActionBadge({ a }: { a: ActionClass }) {
  return <Badge tone={actionTone[a]}>{a}</Badge>
}

export function RiskBadge({ tier }: { tier: RiskTier }) {
  return <Badge tone={tier === 'High' ? 'bad' : tier === 'Medium' ? 'warn' : 'ok'}>{tier} risk</Badge>
}

export function statusTone(s: string): Tone {
  if (/done|approved|provisioned|resolved|passed|production|complete|live/i.test(s)) return 'ok'
  if (/blocked|rejected|failed|p1|escalated/i.test(s)) return 'bad'
  if (/delayed|pending|info|waiting|review|progress|awaiting/i.test(s)) return 'warn'
  return 'neutral'
}
export function Status({ s }: { s: string }) {
  return <Badge tone={statusTone(s)}>{s}</Badge>
}

export function Locked({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-1 text-[0.78rem] text-slate-500"><Lock size={12} /> {children}</span>
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.75rem] font-medium uppercase tracking-wide text-slate-500">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[0.75rem] text-slate-500">{hint}</span>}
    </label>
  )
}

export const inputCls = 'w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500'

export function Select<T extends string>({ value, onChange, options, className }: { value: T; onChange: (v: T) => void; options: (T | { value: T; label: string })[]; className?: string }) {
  return (
    <select className={cn(inputCls, 'h-8 py-0', className)} value={value} onChange={(e) => onChange(e.target.value as T)}>
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value
        const l = typeof o === 'string' ? o : o.label
        return <option key={v} value={v}>{l}</option>
      })}
    </select>
  )
}

export function Stat({ label, value, sub, tone = 'neutral' }: { label: string; value: ReactNode; sub?: ReactNode; tone?: Tone }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-3">
      <p className="text-[0.75rem] font-medium text-slate-500">{label}</p>
      <p className={cn('mt-1 text-xl font-semibold tabular', tone === 'bad' ? 'text-bad-700' : tone === 'ok' ? 'text-ok-700' : tone === 'warn' ? 'text-warn-700' : 'text-ink-900')}>{value}</p>
      {sub && <p className="mt-0.5 text-[0.75rem] text-slate-500">{sub}</p>}
    </div>
  )
}

export function Avatar({ initials, size = 'md', className }: { initials: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const s = size === 'sm' ? 'h-6 w-6 text-[0.65rem]' : size === 'lg' ? 'h-12 w-12 text-base' : 'h-8 w-8 text-xs'
  return <span className={cn('inline-flex shrink-0 items-center justify-center rounded-full bg-ink-700 font-semibold text-white', s, className)}>{initials}</span>
}

export function Callout({ tone = 'info', title, children, icon }: { tone?: 'info' | 'warn' | 'bad' | 'ok' | 'neutral'; title?: ReactNode; children?: ReactNode; icon?: ReactNode }) {
  const c = {
    info: 'border-info-100 bg-info-50 text-info-700',
    warn: 'border-warn-100 bg-warn-50 text-warn-700',
    bad: 'border-bad-100 bg-bad-50 text-bad-700',
    ok: 'border-ok-100 bg-ok-50 text-ok-700',
    neutral: 'border-slate-200 bg-slate-50 text-slate-700',
  }[tone]
  return (
    <div className={cn('rounded-md border px-3 py-2 text-sm', c)}>
      {title && <p className="flex items-center gap-1.5 font-semibold">{icon}{title}</p>}
      {children && <div className={cn('text-[0.85rem] text-slate-700', title && 'mt-0.5')}>{children}</div>}
    </div>
  )
}
