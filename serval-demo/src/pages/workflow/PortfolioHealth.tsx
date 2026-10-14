import { useDemo } from '../../store/store'
import { tierOrder } from '../../data/governance'
import { cn } from '../../lib/util'
import { hasOwner, reviewsComplete } from './helpers'

export function PortfolioHealth() {
  const workflows = useDemo((s) => s.workflows)
  const n = workflows.length || 1
  const owned = workflows.filter(hasOwner).length
  const reviewed = workflows.filter(reviewsComplete).length
  const pct = (v: number) => Math.round((v / n) * 100)
  const byTier = tierOrder.map((t) => ({ t, c: workflows.filter((w) => w.riskTier === t).length }))
  const unowned = workflows.length - owned
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-card">
      <span className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Portfolio health</span>
      <Metric label="Named owner" value={`${pct(owned)}%`} sub={`${owned}/${workflows.length}`} tone={unowned ? 'warn' : 'ok'} />
      <Metric label="Required reviews complete" value={`${pct(reviewed)}%`} sub={`${reviewed}/${workflows.length}`} />
      <div className="flex items-center gap-2">
        <span className="text-slate-500">By tier</span>
        {byTier.map(({ t, c }) => (
          <span key={t} className="inline-flex items-center gap-1 tabular">
            <span className={cn('h-2 w-2 rounded-full', t === 'High' ? 'bg-bad-600' : t === 'Medium' ? 'bg-warn-600' : 'bg-ok-600')} />
            <span className="text-slate-600">{t}</span>
            <span className="font-semibold text-ink-900">{c}</span>
          </span>
        ))}
      </div>
      <span className="ml-auto text-[0.72rem] text-slate-400">Live from the demo portfolio · illustrative</span>
    </div>
  )
}

function Metric({ label, value, sub, tone }: { label: string; value: string; sub: string; tone?: 'warn' | 'ok' }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-slate-500">{label}</span>
      <span className={cn('font-semibold tabular', tone === 'warn' ? 'text-warn-700' : tone === 'ok' ? 'text-ok-700' : 'text-ink-900')}>{value}</span>
      <span className="text-[0.75rem] text-slate-400 tabular">({sub})</span>
    </span>
  )
}
