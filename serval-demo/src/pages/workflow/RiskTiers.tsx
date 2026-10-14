import type { ReactNode } from 'react'
import { Badge, Callout, Card, Illustrative, Prov, RiskBadge } from '../../components/ui'
import { useDemo } from '../../store/store'
import { laneForTier, requiredReviewsForTier, tierOrder } from '../../data/governance'
import { clientPossessive } from '../../config/client'
import type { ActionClass, RiskTier } from '../../types'
import { cn } from '../../lib/util'

const tierInfo: Record<RiskTier, { scope: string; covers: string[]; exec: string; actions: ActionClass[] }> = {
  Low: {
    scope: 'Information and approved knowledge',
    covers: ['Answers from approved knowledge', 'Guided troubleshooting', 'Catalogue items on pre-approved patterns'],
    exec: 'Runs automatically within a pre-approved pattern; human on exception or when the employee asks.',
    actions: ['Inform', 'Recommend'],
  },
  Medium: {
    scope: 'Routine requests and policy-based initiation',
    covers: ['Standard access within the role model', 'Employee data changes (non-sensitive)', 'Letters and standard documents'],
    exec: 'Initiates workflows; executes only after policy checks and any required approval.',
    actions: ['Inform', 'Recommend', 'Initiate workflow'],
  },
  High: {
    scope: 'Privileged access, sensitive financial data, security decisions, material business impact',
    covers: ['Privileged or SoD-sensitive access', 'Payments and bank details', 'Security response actions'],
    exec: 'Human approval before every execution; time-bound access; enhanced monitoring and recertification.',
    actions: ['Recommend', 'Initiate workflow', 'Execute approved action'],
  },
}

export function RiskTiers() {
  const workflows = useDemo((s) => s.workflows)
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Illustrative — map to {clientPossessive} risk taxonomy</Badge>
        <Prov kind="validate" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {tierOrder.map((t) => {
          const info = tierInfo[t]
          const ex = workflows.filter((w) => w.riskTier === t)
          return (
            <Card key={t} className={cn('border-t-4', t === 'High' ? 'border-t-bad-600' : t === 'Medium' ? 'border-t-warn-600' : 'border-t-ok-600')}
              title={<span className="flex items-center gap-2">{t} <RiskBadge tier={t} /></span>} subtitle={info.scope}>
              <dl className="space-y-3 text-sm">
                <Item k="Typical scope"><ul className="list-inside list-disc text-slate-700">{info.covers.map((c) => <li key={c}>{c}</li>)}</ul></Item>
                <Item k="Review lane"><span className="font-medium text-ink-900">{laneForTier[t]}</span></Item>
                <Item k="Required reviews"><div className="flex flex-wrap gap-1">{requiredReviewsForTier[t].map((r) => <Badge key={r}>{r}</Badge>)}</div></Item>
                <Item k="Execution mode">{info.exec}</Item>
                <Item k="Assistant may"><div className="flex flex-wrap gap-1">{info.actions.map((a) => <Badge key={a} tone="info">{a}</Badge>)}</div></Item>
                <Item k={`Workflows in this tier (${ex.length})`}>
                  {ex.length ? <ul className="space-y-0.5">{ex.map((w) => <li key={w.id} className="flex justify-between gap-2"><span className="truncate">{w.name}</span><span className="shrink-0 text-[0.75rem] text-slate-500">{w.team}</span></li>)}</ul> : <span className="text-slate-500">None yet</span>}
                </Item>
              </dl>
            </Card>
          )
        })}
      </div>
      <Callout tone="neutral" title="Policy floors">Each workflow carries a policy floor set by its data and actions. Tiers can be raised by builders or owners at any time; they cannot be lowered below the floor.</Callout>
      <Illustrative />
    </div>
  )
}

function Item({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">{k}</dt>
      <dd className="mt-0.5 text-slate-700">{children}</dd>
    </div>
  )
}
