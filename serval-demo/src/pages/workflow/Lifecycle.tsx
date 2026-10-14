import { useState } from 'react'
import { AlertTriangle, ChevronRight } from 'lucide-react'
import { Button, Callout, Card, Illustrative } from '../../components/ui'
import { useDemo } from '../../store/store'
import { lifecycle } from '../../data/governance'
import { cn } from '../../lib/util'
import type { LifecycleStage } from '../../types'
import { hasOwner, stageGuide } from './helpers'

export function Lifecycle({ onOpen }: { onOpen: (id: string) => void }) {
  const workflows = useDemo((s) => s.workflows)
  const [stage, setStage] = useState<LifecycleStage>('Security/privacy review')
  const g = stageGuide[stage]
  const stuck = workflows.filter((w) => !hasOwner(w) && w.daysInStage >= 14)

  return (
    <div className="space-y-4">
      {stuck.map((w) => (
        <Callout key={w.id} tone="bad" icon={<AlertTriangle size={14} />} title={`${w.name} has no named owner`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>Stuck {w.daysInStage} days in {w.stage}. With no owner, nobody is accountable for answering the reviewers’ questions.</span>
            <Button size="sm" onClick={() => onOpen(w.id)}>Assign an owner in the builder</Button>
          </div>
        </Callout>
      ))}

      <Card title="Stage track" subtitle="Workflows placed at their current stage. Select a stage for accountability, evidence, and exit criterion." bodyClass="p-0">
        <div className="overflow-x-auto">
          <div className="grid min-w-[1040px] grid-cols-9 divide-x divide-slate-100">
            {lifecycle.map((st, i) => {
              const here = workflows.filter((w) => w.stage === st)
              const active = st === stage
              const conditional = st === 'Security/privacy review'
              return (
                <div key={st} className={cn('flex flex-col', active && 'bg-accent-50/50')}>
                  <button onClick={() => setStage(st)} className={cn('border-b-2 px-2 py-2 text-left', active ? 'border-accent-600' : 'border-slate-200 hover:bg-slate-50')}>
                    <span className="text-[0.68rem] font-semibold text-slate-400 tabular">{i + 1}</span>
                    <span className="block text-[0.78rem] font-semibold leading-tight text-ink-900">{st}</span>
                    {conditional && <span className="text-[0.68rem] text-slate-500">if required</span>}
                  </button>
                  <div className="flex-1 space-y-1.5 p-1.5">
                    {here.map((w) => (
                      <button key={w.id} onClick={() => onOpen(w.id)} title="Open in builder"
                        className={cn('w-full rounded border bg-white px-1.5 py-1 text-left shadow-card hover:border-slate-400', hasOwner(w) ? 'border-slate-200' : 'border-bad-600/60')}>
                        <p className="text-[0.74rem] font-medium leading-tight text-ink-900">{w.name}</p>
                        <p className={cn('mt-0.5 text-[0.68rem]', hasOwner(w) ? 'text-slate-500' : 'font-semibold text-bad-700')}>{w.owner}</p>
                        <p className={cn('text-[0.66rem] tabular', w.daysInStage > 20 ? 'text-bad-700' : 'text-slate-400')}>{w.daysInStage}d in stage</p>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      <Card title={stage} subtitle={stage === 'Security/privacy review' ? 'Required for High tier only' : undefined}
        actions={<div className="flex gap-1">
          <Button size="sm" variant="ghost" disabled={lifecycle.indexOf(stage) === 0} onClick={() => setStage(lifecycle[lifecycle.indexOf(stage) - 1])}>Previous</Button>
          <Button size="sm" variant="ghost" disabled={lifecycle.indexOf(stage) === lifecycle.length - 1} onClick={() => setStage(lifecycle[lifecycle.indexOf(stage) + 1])}>Next <ChevronRight size={14} /></Button>
        </div>}>
        <div className="grid gap-4 md:grid-cols-3">
          <Info k="Accountable" v={g.accountable} />
          <Info k="Evidence required" v={g.evidence} />
          <Info k="Exit criterion" v={g.exit} />
        </div>
      </Card>
      <Illustrative>Stages, days, and owners are illustrative. Days-in-stage come from the demo portfolio.</Illustrative>
    </div>
  )
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">{k}</p>
      <p className="mt-0.5 text-sm text-slate-800">{v}</p>
    </div>
  )
}
