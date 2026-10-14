import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { journeyStages } from '../../data/change'
import { Card, Illustrative, Prov } from '../../components/ui'
import { cn } from '../../lib/util'

const INTERVENTIONS: { label: string; stages: string[] }[] = [
  { label: 'Listening sessions', stages: ['Discover'] },
  { label: 'Journey demos', stages: ['Understand'] },
  { label: 'Manager briefings', stages: ['Understand', 'Prepare'] },
  { label: 'Team onboarding sessions', stages: ['Prepare'] },
  { label: 'Learning paths', stages: ['Prepare', 'Practice'] },
  { label: 'Quick-reference guides', stages: ['Practice'] },
  { label: 'Responsible-AI guidance', stages: ['Practice', 'Adopt'] },
  { label: 'Champion network', stages: ['Adopt'] },
  { label: 'Office hours', stages: ['Adopt'] },
  { label: 'Surveys', stages: ['Discover', 'Reinforce'] },
  { label: 'Reinforcement', stages: ['Reinforce'] },
]

export default function JourneyTab() {
  const [active, setActive] = useState('Prepare')
  const st = journeyStages.find((s) => s.stage === active) ?? journeyStages[0]
  const chips = (stage: string) => INTERVENTIONS.filter((i) => i.stages.includes(stage))

  return (
    <div className="space-y-4">
      <Card
        title="Employee change journey"
        subtitle="Six stages every impacted employee moves through. Select a stage to see what they know, what leaders say, the support available, and how we measure it."
        actions={<Prov kind="conceptual" />}
      >
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
          {journeyStages.map((s, i) => {
            const on = s.stage === active
            return (
              <button
                key={s.stage}
                onClick={() => setActive(s.stage)}
                aria-pressed={on}
                className={cn('flex flex-col rounded-lg border p-3 text-left transition-colors', on ? 'border-accent-600 bg-accent-50 ring-1 ring-accent-600' : 'border-slate-200 bg-white hover:border-slate-300')}
              >
                <span className="flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">
                  Stage {i + 1}
                  {i < journeyStages.length - 1 && <ChevronRight size={12} className="text-slate-300" />}
                </span>
                <span className="mt-1 text-[0.95rem] font-semibold text-ink-900">{s.stage}</span>
                <span className="mt-2 flex flex-wrap gap-1">
                  {chips(s.stage).map((c) => (
                    <span key={c.label} className={cn('rounded-full px-1.5 py-px text-[0.66rem] font-medium ring-1 ring-inset', on ? 'bg-white text-accent-700 ring-accent-200' : 'bg-slate-50 text-slate-600 ring-slate-200')}>
                      {c.label}
                    </span>
                  ))}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ['What employees know / do', st.know],
            ['What leaders say', st.leaders],
            ['Support available', st.support],
            ['How we measure it', st.measure],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">{k}</p>
              <p className="mt-1 text-sm text-ink-900">{v}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Interventions" subtitle="Where each intervention lands on the journey. Click one to jump to its first stage.">
        <div className="flex flex-wrap gap-2">
          {INTERVENTIONS.map((i) => {
            const on = i.stages.includes(active)
            return (
              <button
                key={i.label}
                onClick={() => setActive(i.stages[0])}
                className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.8rem] font-medium ring-1 ring-inset transition-colors', on ? 'bg-accent-600 text-white ring-accent-700' : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-50')}
              >
                {i.label}
                <span className={cn('text-[0.68rem]', on ? 'text-accent-100' : 'text-slate-400')}>{i.stages.join(' · ')}</span>
              </button>
            )
          })}
        </div>
        <div className="mt-3"><Illustrative>Illustrative journey design — to be tailored per wave and audience.</Illustrative></div>
      </Card>
    </div>
  )
}
