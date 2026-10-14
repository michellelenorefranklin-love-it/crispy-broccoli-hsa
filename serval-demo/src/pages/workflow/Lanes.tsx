import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertTriangle } from 'lucide-react'
import { Callout, Card, Illustrative, RiskBadge } from '../../components/ui'
import { useDemo } from '../../store/store'
import { bottleneckRadar, laneStats } from '../../data/governance'
import { cn } from '../../lib/util'
import type { ReviewLane } from '../../types'
import { hasOwner } from './helpers'

const lanes: ReviewLane[] = ['Fast lane', 'Standard', 'Enhanced']
const HOT = 'Security/privacy review'

export function Lanes() {
  const workflows = useDemo((s) => s.workflows)
  const hot = bottleneckRadar.find((b) => b.stage === HOT)!

  return (
    <div className="space-y-4">
      <Callout tone="info" title="Proportionate, not uniform">
        Governance reduces bottlenecks through clear decision rights, reusable patterns, and proportionate review — not by removing controls.
      </Callout>

      <div className="grid gap-4 lg:grid-cols-3">
        {lanes.map((l) => {
          const st = laneStats[l]
          const inLane = workflows.filter((w) => w.lane === l)
          const overTarget = l === 'Enhanced'
          return (
            <Card key={l} title={l} subtitle={st.reviewers}>
              <div className="grid grid-cols-3 gap-2 text-center">
                <Kpi label="Median cycle" value={st.median} tone={overTarget ? 'warn' : undefined} />
                <Kpi label="Target" value={st.target} />
                <Kpi label="Queued" value={String(st.queued)} />
              </div>
              <p className="mt-3 text-[0.82rem] text-slate-600">{st.desc}</p>
              <p className="mb-1.5 mt-3 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Workflows in lane ({inLane.length})</p>
              <ul className="space-y-1.5">
                {inLane.map((w) => (
                  <li key={w.id} className="flex items-start justify-between gap-2 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink-900">{w.name}</p>
                      <p className="text-[0.75rem] text-slate-500">{w.stage} · <span className={cn(!hasOwner(w) && 'font-semibold text-bad-700')}>{w.owner}</span></p>
                    </div>
                    <RiskBadge tier={w.riskTier} />
                  </li>
                ))}
                {!inLane.length && <li className="text-sm text-slate-500">None</li>}
              </ul>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Card title="Bottleneck radar" subtitle="Average days waiting at each review stage (bar) and items queued (label).">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bottleneckRadar} layout="vertical" margin={{ top: 4, right: 48, bottom: 4, left: 8 }}>
                <CartesianGrid horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="d" />
                <YAxis type="category" dataKey="stage" width={160} tick={{ fontSize: 12, fill: '#334155' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F1F5F9' }} formatter={(v: number, k: string) => [k === 'avgDays' ? `${v} days` : v, k === 'avgDays' ? 'Avg wait' : 'Queued']} />
                <Bar dataKey="avgDays" radius={[0, 3, 3, 0]} barSize={18}>
                  {bottleneckRadar.map((b) => <Cell key={b.stage} fill={b.stage === HOT ? '#C0362C' : '#2B4A7A'} />)}
                  <LabelList dataKey="queued" position="right" formatter={(v: number) => `${v} queued`} style={{ fontSize: 11, fill: '#64748B' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Illustrative>Illustrative labels and values — not a client baseline.</Illustrative>
        </Card>
        <Card title={<span className="flex items-center gap-1.5"><AlertTriangle size={15} className="text-bad-600" /> Hotspot: {HOT}</span>} subtitle={`${hot.queued} queued · ~${hot.avgDays} days average wait (illustrative)`}>
          <p className="text-sm text-slate-700">Work queues here because every sensitive workflow is reviewed from scratch and decision rights between Security, Privacy, and the process owner are unclear.</p>
          <p className="mb-1.5 mt-3 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Suggested remedy</p>
          <ul className="space-y-1.5 text-sm text-slate-700">
            <li><span className="font-medium text-ink-900">Reusable pre-approved patterns.</span> Review the pattern once; workflows that use it inherit the controls.</li>
            <li><span className="font-medium text-ink-900">Clear decision rights.</span> Security decides on controls; the process owner decides on business rules.</li>
            <li><span className="font-medium text-ink-900">Review SLAs.</span> Published targets per lane, with escalation to the AI Governance Lead when breached.</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: 'warn' }) {
  return (
    <div className="rounded-md bg-slate-50 px-2 py-2">
      <p className="text-[0.68rem] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={cn('mt-0.5 text-sm font-semibold tabular', tone === 'warn' ? 'text-warn-700' : 'text-ink-900')}>{value}</p>
    </div>
  )
}
