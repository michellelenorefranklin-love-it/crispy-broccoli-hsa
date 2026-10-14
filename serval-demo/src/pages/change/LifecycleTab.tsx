import { useState } from 'react'
import { programPhases } from '../../data/change'
import { clientConfig } from '../../config/client'
import { Card, Illustrative, Prov } from '../../components/ui'
import { cn } from '../../lib/util'

const REVEALS: Record<string, { reveals: string; value: string }> = {
  Discovery: { reveals: 'Impacted roles, pain points, readiness & concerns', value: 'Avoids designing around untested assumptions' },
  Design: { reveals: 'Journey, ownership, approval boundaries', value: 'Alignment before workflows are embedded' },
  Build: { reveals: 'Emerging impacts, comms needs, role changes', value: 'Change requirements found while they can be addressed' },
  Test: { reveals: 'User scenarios, training gaps, exceptions & escalation', value: 'Surfaces confusion and control weaknesses before launch' },
  Pilot: { reveals: 'Feedback, usage, workarounds', value: 'Targeted fixes before scaling' },
  Launch: { reveals: 'Role-based comms, training, support', value: 'Helps people make the transition' },
  Stabilize: { reveals: 'Adoption, satisfaction, quality, control indicators', value: 'Shows where more support is needed' },
  Optimize: { reveals: 'Benefits realization, continuous improvement', value: 'Sustains adoption and prevents regression' },
}

export default function LifecycleTab() {
  const [active, setActive] = useState('Design')
  const idx = Math.max(0, programPhases.findIndex((p) => p.phase === active))
  const p = programPhases[idx]
  const r = REVEALS[p.phase]

  return (
    <div className="space-y-4">
      <Card
        title="Change early and often"
        subtitle="Change work starts in discovery, not at launch. Select a phase to see the change activities, decisions, and evidence it needs."
        actions={<Prov kind="conceptual" />}
      >
        <div className="overflow-x-auto">
          <div className="flex min-w-[720px] items-stretch">
            {programPhases.map((ph, i) => {
              const on = i === idx
              const past = i < idx
              return (
                <button
                  key={ph.phase}
                  onClick={() => setActive(ph.phase)}
                  aria-pressed={on}
                  className={cn('relative flex-1 border-b-2 px-2 pb-2 pt-1 text-left transition-colors', on ? 'border-accent-600' : past ? 'border-accent-200' : 'border-slate-200 hover:border-slate-300')}
                >
                  <span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-[0.7rem] font-semibold', on ? 'bg-accent-600 text-white' : past ? 'bg-accent-100 text-accent-700' : 'bg-slate-100 text-slate-500')}>{i + 1}</span>
                  <span className={cn('mt-1.5 block text-[0.84rem] font-semibold', on ? 'text-ink-900' : 'text-slate-600')}>{ph.phase}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_300px]">
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {[
              ['Change activities', p.change],
              ['Client decisions', p.decisions],
              ['Stakeholders', p.stakeholders],
              ['Readiness evidence', p.evidence],
              ['Exit criteria', p.exit],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">{k}</dt>
                <dd className="mt-0.5 text-sm text-ink-900">{v}</dd>
              </div>
            ))}
            <div>
              <dt className="text-[0.72rem] font-medium uppercase tracking-wide text-bad-700">Risk if skipped</dt>
              <dd className="mt-0.5 text-sm font-medium text-bad-700">{p.risk}</dd>
            </div>
          </dl>
          <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
            <p className="text-[0.72rem] font-medium uppercase tracking-wide text-accent-700">What the demo reveals</p>
            <p className="mt-1 text-sm text-ink-900">{r.reveals}</p>
            <p className="mt-3 text-[0.72rem] font-medium uppercase tracking-wide text-accent-700">OCM value</p>
            <p className="mt-1 text-sm font-medium text-ink-900">{r.value}</p>
          </div>
        </div>
      </Card>

      <Card title="What the demo reveals, phase by phase" subtitle="Showing working journeys early turns change requirements into design inputs.">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[0.72rem] uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-3 font-medium">Phase</th>
                <th className="py-2 pr-3 font-medium">What the demo reveals</th>
                <th className="py-2 font-medium">OCM value</th>
              </tr>
            </thead>
            <tbody>
              {programPhases.map((ph) => (
                <tr
                  key={ph.phase}
                  onClick={() => setActive(ph.phase)}
                  className={cn('cursor-pointer border-b border-slate-100 last:border-0', ph.phase === p.phase ? 'bg-accent-50' : 'hover:bg-slate-50')}
                >
                  <td className="py-2 pr-3 font-medium text-ink-900">{ph.phase}</td>
                  <td className="py-2 pr-3 text-slate-700">{REVEALS[ph.phase].reveals}</td>
                  <td className="py-2 text-slate-700">{REVEALS[ph.phase].value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3"><Illustrative>Illustrative phase plan — sequencing and exit criteria to be agreed with {clientConfig.name}.</Illustrative></div>
      </Card>
    </div>
  )
}
