import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, RotateCcw, Scale, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Badge, Button, Callout, Card, Illustrative, PageHeader, Prov, Toggle, inputCls } from '../components/ui'
import { useDemo } from '../store/store'
import { benefitHypotheses, defaultBenefitInputs, metrics, rampQuarters, type BenefitInputs } from '../data/value'
import { lifecycle } from '../data/governance'
import type { AdoptionMetric, WorkflowDefinition } from '../types'
import { cn, fmtMoney, fmtNum } from '../lib/util'

const SEEDED_AUDIT = 4
const groups: AdoptionMetric['group'][] = ['Experience', 'Efficiency', 'Quality', 'Adoption', 'Control health']

/** A workflow counts as "reviewed" once it has passed its required review stages (stage at or beyond Test) or is live in Pilot/Production. */
const reviewed = (w: WorkflowDefinition) =>
  lifecycle.indexOf(w.stage) >= lifecycle.indexOf('Test') || w.releaseStatus === 'Production' || w.releaseStatus === 'Pilot'

const pct = (n: number, d: number) => (d === 0 ? '—' : `${Math.round((n / d) * 100)}%`)

export default function Value() {
  const nav = useNavigate()
  const s = useDemo()
  const [repeatRises, setRepeatRises] = useState(false)

  // ---- Live session strip
  const reqs = s.accessRequests
  const approved = reqs.filter((r) => r.approvals.some((a) => a.status === 'Approved')).length
  const provisioned = reqs.filter((r) => r.status === 'Provisioned').length
  const decided = reqs.flatMap((r) => r.approvals).filter((a) => a.decidedAt).length
  const auditCount = Math.max(0, s.audit.length - SEEDED_AUDIT)
  const jordanIncidents = s.incidents.filter((i) => i.requester.startsWith('Jordan')).length

  const live = [
    { label: 'Access requests submitted', value: reqs.length },
    { label: 'Requests with an approval', value: approved },
    { label: 'Provisioned', value: provisioned },
    { label: 'Approvals decided', value: decided },
    { label: 'Audit events recorded', value: auditCount },
    { label: 'Incidents raised by Jordan', value: jordanIncidents },
    { label: 'Self-service resolutions', value: s.selfServiceResolved },
    { label: 'Human handoffs', value: s.humanHandoffs },
  ]

  // ---- Metrics (two computed live from workflows)
  const wfs = s.workflows
  const metricList = useMemo<AdoptionMetric[]>(() => metrics.map((m) => {
    if (m.id === 'owners') return { ...m, value: pct(wfs.filter((w) => w.owner !== 'Unassigned').length, wfs.length), trend: `live · ${wfs.filter((w) => w.owner !== 'Unassigned').length}/${wfs.length}` }
    if (m.id === 'reviews') return { ...m, value: pct(wfs.filter(reviewed).length, wfs.length), trend: `live · ${wfs.filter(reviewed).length}/${wfs.length}` }
    if (m.id === 'repeat' && repeatRises) return { ...m, value: '9.0%', trend: '+2.0 pts' }
    return m
  }), [wfs, repeatRises])
  const byId = Object.fromEntries(metricList.map((m) => [m.id, m]))
  const worsened = new Set(repeatRises ? ['repeat'] : [])

  return (
    <div>
      <PageHeader
        title="Executive value"
        subtitle="Measured in-platform, validated by the business. Speed and automation only count when quality, experience, and control health hold."
        told={['value']}
        prov="validate"
        actions={<Button variant="primary" onClick={() => nav('/decisions')}>Decisions & next steps <ArrowRight size={14} /></Button>}
      />

      {/* Live strip */}
      <Card
        title={<span className="flex items-center gap-2">From this demo session <Badge tone="accent">Live</Badge></span>}
        subtitle="Counts update as approvals, chats, and incidents happen elsewhere in the demo."
        className="mb-5"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
          {live.map((l) => (
            <div key={l.label} className="rounded-md bg-slate-50 px-3 py-2">
              <p className="text-xl font-semibold tabular text-ink-900">{l.value}</p>
              <p className="mt-0.5 text-[0.72rem] leading-tight text-slate-500">{l.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Balancing banner + integrity check */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3 rounded-lg border border-ink-700/20 bg-ink-800 px-4 py-3 text-white">
        <div className="flex max-w-2xl items-start gap-2.5">
          <Scale size={18} className="mt-0.5 shrink-0 text-accent-200" />
          <div>
            <p className="font-semibold">Balancing metrics rule</p>
            <p className="text-[0.85rem] text-slate-200">A speed or automation gain does not count if resolution quality, repeat incidents, satisfaction, or control health get worse.</p>
          </div>
        </div>
        <div className="rounded-md bg-white/10 px-3 py-2 text-[0.85rem]">
          <p className="mb-1 font-medium text-slate-200">Integrity check</p>
          <label className="flex items-center gap-2">
            <Toggle checked={repeatRises} onChange={setRepeatRises} />
            <span>Simulate: repeat incidents rise to 9%</span>
          </label>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[1.05rem] font-semibold text-ink-900">Scorecard</h2>
        <Illustrative />
      </div>
      <div className="mb-6 space-y-4">
        {groups.map((g) => (
          <div key={g}>
            <p className="mb-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">{g}</p>
            <div className={cn('grid gap-3', g === 'Efficiency' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-4')}>
              {metricList.filter((m) => m.group === g).map((m) => {
                const bal = m.balancing ? byId[m.balancing] : undefined
                const notCounted = bal && worsened.has(bal.id)
                const isWorse = worsened.has(m.id)
                return (
                  <div key={m.id} className={cn('rounded-lg border bg-white px-3.5 py-3 shadow-card', notCounted ? 'border-bad-100' : isWorse ? 'border-warn-100' : 'border-slate-200')}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[0.78rem] font-medium text-slate-500">{m.label}</p>
                      {m.trend.startsWith('live') && <Badge tone="accent">Live</Badge>}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <p className={cn('text-xl font-semibold tabular', notCounted ? 'text-slate-400 line-through' : 'text-ink-900')}>{m.value}</p>
                      <span className={cn('text-[0.75rem] font-medium tabular', isWorse ? 'text-bad-700' : 'text-slate-500')}>{m.trend}</span>
                    </div>
                    {bal && (
                      <div className={cn('mt-2 flex items-center justify-between gap-2 rounded px-2 py-1 text-[0.75rem]', notCounted ? 'bg-bad-50 text-bad-700' : 'bg-slate-50 text-slate-600')}>
                        <span className="flex items-center gap-1"><Scale size={12} /> Balanced by: {bal.label} <span className="font-semibold tabular">{bal.value}</span></span>
                        {notCounted
                          ? <span className="flex items-center gap-1 font-semibold"><AlertTriangle size={12} /> Not counted</span>
                          : <CheckCircle2 size={13} className="text-ok-600" />}
                      </div>
                    )}
                    {isWorse && <p className="mt-2 text-[0.75rem] text-warn-700">Worsened — paired gains are excluded until it recovers.</p>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <p className="text-[0.75rem] text-slate-500">
          <span className="font-medium">Live definitions:</span> “named owners” = workflows whose owner is not Unassigned. “Completed reviews” = workflows past their required review stages (lifecycle stage Test or later) or released to Pilot/Production. Both read from the Workflow Studio, so changes there show here.
        </p>
      </div>

      <BenefitsModel />

      <Card title="Benefits realization plan" subtitle="Each benefit is a hypothesis with a baseline, an owner, and a balancing metric." className="mb-6" actions={<Prov kind="validate" />}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-[0.82rem]">
            <thead className="text-[0.72rem] uppercase tracking-wide text-slate-500">
              <tr className="border-b border-slate-200">
                {['Hypothesis', 'Baseline needed', 'Target', 'Data source', 'Owner', 'Cadence', 'Adoption dependency', 'Balancing metric'].map((h) => <th key={h} className="px-2 py-2 font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {benefitHypotheses.map((b) => (
                <tr key={b.id} className="border-b border-slate-100 align-top">
                  <td className="px-2 py-2 font-medium text-ink-900">{b.hypothesis}</td>
                  <td className="px-2 py-2 text-slate-600">{b.baseline}</td>
                  <td className="px-2 py-2 text-slate-600">{b.target}</td>
                  <td className="px-2 py-2 text-slate-600">{b.dataSource}</td>
                  <td className="px-2 py-2 text-slate-600">{b.owner}</td>
                  <td className="px-2 py-2 text-slate-600">{b.cadence}</td>
                  <td className="px-2 py-2 text-slate-600">{b.adoptionDependency}</td>
                  <td className="px-2 py-2 text-slate-600">{b.balancingMetric}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2"><Illustrative>Targets are illustrative and must be set against a Client baseline.</Illustrative></div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
        <p className="text-sm text-slate-700">Value depends on decisions only the Client can make — integration model, scope, and decision rights.</p>
        <Button variant="primary" onClick={() => nav('/decisions')}>Go to decisions & next steps <ArrowRight size={14} /></Button>
      </div>
    </div>
  )
}

const fields: { key: keyof BenefitInputs; label: string; min: number; max: number; step: number; unit?: string; prefix?: string }[] = [
  { key: 'annualTickets', label: 'Annual tickets in scope', min: 10000, max: 1000000, step: 10000 },
  { key: 'pctAutomatable', label: 'Automatable share', min: 0, max: 100, step: 1, unit: '%' },
  { key: 'pctAdoption', label: 'Adoption (employees use it)', min: 0, max: 100, step: 1, unit: '%' },
  { key: 'minutesSaved', label: 'Minutes saved per ticket', min: 0, max: 120, step: 1, unit: 'min' },
  { key: 'loadedCostPerHour', label: 'Loaded cost per hour', min: 0, max: 300, step: 1, prefix: '$' },
  { key: 'pctRedeployable', label: 'Redeployable share of time', min: 0, max: 100, step: 1, unit: '%' },
  { key: 'pctCashable', label: 'Cashable share of time', min: 0, max: 100, step: 1, unit: '%' },
]

function BenefitsModel() {
  const b = useDemo((s) => s.benefit)
  const setBenefit = useDemo((s) => s.setBenefit)
  const clamp = (k: keyof BenefitInputs, v: number) => {
    const f = fields.find((x) => x.key === k)!
    return Math.min(f.max, Math.max(f.min, Number.isFinite(v) ? v : f.min))
  }

  const tickets = b.annualTickets * (b.pctAutomatable / 100) * (b.pctAdoption / 100)
  const hours = (tickets * b.minutesSaved) / 60
  const redeploy = hours * (b.pctRedeployable / 100)
  const cashableHours = hours * (b.pctCashable / 100)
  const cashable = cashableHours * b.loadedCostPerHour

  const ramp = rampQuarters.map((r, i) => ({ q: `Q${i + 1}`, hours: Math.round((hours / 4) * r) }))

  const stages = [
    { n: 1, title: 'Time released', value: `${fmtNum(hours)} h / yr`, formula: `${fmtNum(b.annualTickets)} tickets × ${b.pctAutomatable}% automatable × ${b.pctAdoption}% adoption × ${b.minutesSaved} min ÷ 60`, note: 'Minutes no longer spent on in-scope tickets at full adoption.' },
    { n: 2, title: 'Capacity redeployable', value: `${fmtNum(redeploy)} h / yr`, formula: `Time released × ${b.pctRedeployable}% redeployable`, note: 'Time that can realistically move to complex or exception work.' },
    { n: 3, title: 'Cashable savings', value: fmtMoney(cashable), formula: `Time released × ${b.pctCashable}% cashable × $${b.loadedCostPerHour}/h loaded cost`, note: 'Only spend that actually stops (e.g. contractor or overtime hours). Not headcount.' },
    { n: 4, title: 'Realized benefit', value: 'Not yet measured', formula: 'Confirmed by the business owner after go-live, against baseline', note: 'Only this stage is reported as achieved value.' },
  ]

  return (
    <Card
      title={<span className="flex items-center gap-2">Benefits model <Prov kind="validate" /></span>}
      subtitle="Editable assumptions. Formulas are shown so the room can challenge every input."
      className="mb-6"
      actions={<Button size="sm" onClick={() => setBenefit({ ...defaultBenefitInputs })}><RotateCcw size={13} /> Reset assumptions</Button>}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.key}>
              <div className="mb-1 flex items-center justify-between gap-2">
                <label htmlFor={`bf-${f.key}`} className="text-[0.78rem] font-medium text-slate-600">{f.label}</label>
                <div className="flex items-center gap-1">
                  {f.prefix && <span className="text-[0.78rem] text-slate-500">{f.prefix}</span>}
                  <input
                    id={`bf-${f.key}`}
                    type="number"
                    className={cn(inputCls, 'h-7 w-24 py-0 text-right tabular')}
                    value={b[f.key]}
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    onChange={(e) => setBenefit({ [f.key]: clamp(f.key, Number(e.target.value)) })}
                  />
                  {f.unit && <span className="w-6 text-[0.78rem] text-slate-500">{f.unit}</span>}
                </div>
              </div>
              <input
                type="range"
                aria-label={f.label}
                className="w-full accent-accent-600"
                min={f.min}
                max={f.max}
                step={f.step}
                value={b[f.key]}
                onChange={(e) => setBenefit({ [f.key]: clamp(f.key, Number(e.target.value)) })}
              />
            </div>
          ))}
          {b.pctCashable > b.pctRedeployable && (
            <Callout tone="warn" title="Check assumption">Cashable share exceeds redeployable share. Most released time is redeployed, not cashed.</Callout>
          )}
        </div>

        <div className="min-w-0 space-y-4">
          <ol className="grid gap-2 sm:grid-cols-2">
            {stages.map((st) => (
              <li key={st.n} className={cn('rounded-lg border px-3 py-2.5', st.n === 4 ? 'border-dashed border-slate-300 bg-slate-50' : 'border-slate-200 bg-white')}>
                <div className="flex items-center justify-between">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">{st.n}. {st.title}</p>
                  {st.n < 4 && <Badge>Illustrative</Badge>}
                </div>
                <p className={cn('mt-1 font-semibold tabular', st.n === 4 ? 'text-base text-slate-500' : 'text-xl text-ink-900')}>{st.value}</p>
                <p className="mt-1 font-mono text-[0.72rem] text-slate-600">= {st.formula}</p>
                <p className="mt-1 text-[0.75rem] text-slate-500">{st.note}</p>
              </li>
            ))}
          </ol>
          <Callout tone="neutral" title="This model does not convert time into headcount.">
            Time released ≠ capacity redeployed ≠ cash saved ≠ realized benefit. Each stage is smaller and needs stronger evidence than the one before.
          </Callout>
          <div>
            <p className="mb-1 text-[0.78rem] font-medium text-slate-600">Adoption ramp — hours released per quarter</p>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ramp} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="q" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tickLine={false} axisLine={false} width={52} tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v: number) => fmtNum(v)} />
                  <Tooltip formatter={(v: number) => [`${fmtNum(v)} h`, 'Time released']} cursor={{ fill: '#F1F5F9' }} />
                  <Bar dataKey="hours" fill="#0F766E" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-1 font-mono text-[0.72rem] text-slate-500">Quarter hours = annual time released ÷ 4 × ramp ({rampQuarters.map((r) => `${Math.round(r * 100)}%`).join(', ')})</p>
          </div>
          <Illustrative />
        </div>
      </div>
    </Card>
  )
}
