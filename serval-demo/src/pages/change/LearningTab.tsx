import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Clock, ArrowRight } from 'lucide-react'
import { learningPaths } from '../../data/change'
import { Badge, Card, Illustrative, Prov } from '../../components/ui'
import { cn } from '../../lib/util'

const total = (m: { minutes: number }[]) => m.reduce((a, x) => a + x.minutes, 0)

export default function LearningTab() {
  const [id, setId] = useState('lp-wb')
  const p = learningPaths.find((x) => x.id === id) ?? learningPaths[0]
  const builder = learningPaths.find((x) => x.gatesBuildRights)
  const bTotal = builder ? total(builder.modules) : 0
  const navMin = builder?.modules.find((m) => /navigation/i.test(m.title))?.minutes ?? 0

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <Card title="Role paths" bodyClass="p-2">
          <ul className="space-y-0.5">
            {learningPaths.map((x) => (
              <li key={x.id}>
                <button
                  onClick={() => setId(x.id)}
                  className={cn('flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left transition-colors', x.id === p.id ? 'bg-accent-50 ring-1 ring-inset ring-accent-200' : 'hover:bg-slate-50')}
                >
                  <span className="text-sm font-medium text-ink-900">{x.audience}</span>
                  <span className="flex items-center gap-1.5">
                    {x.gatesBuildRights && <Lock size={12} className="text-accent-700" aria-label="Gates build rights" />}
                    <span className="text-[0.75rem] tabular text-slate-500">{total(x.modules)}m</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title={`${p.audience} learning path`}
          subtitle={<span className="inline-flex items-center gap-1"><Clock size={12} /> {total(p.modules)} minutes total · {p.modules.length} modules</span>}
          actions={
            <>
              {p.gatesBuildRights && (
                <Link to="/workflow?tab=onboarding">
                  <Badge tone="ink" icon={<Lock size={11} />}>Gates build rights <ArrowRight size={11} /></Badge>
                </Link>
              )}
              <Prov kind="conceptual" />
            </>
          }
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">Objectives</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm text-ink-900">
                {p.objectives.map((o) => <li key={o}>{o}</li>)}
              </ul>
              <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">Practice</p>
              <p className="mt-1 text-sm text-ink-900">{p.practice}</p>
              <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">Proficiency check</p>
              <p className="mt-1 text-sm text-ink-900">{p.proficiency}</p>
              <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">Resources</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">{p.resources.map((r) => <Badge key={r}>{r}</Badge>)}</div>
            </div>
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">Modules</p>
              <ol className="mt-1.5 divide-y divide-slate-100 rounded-md border border-slate-200">
                {p.modules.map((m, i) => (
                  <li key={m.title} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-4 text-[0.75rem] tabular text-slate-400">{i + 1}</span>
                      <span className="text-ink-900">{m.title}</span>
                    </span>
                    <span className="tabular text-slate-500">{m.minutes} min</span>
                  </li>
                ))}
                <li className="flex items-center justify-between bg-slate-50 px-3 py-2 text-sm font-semibold text-ink-900">
                  <span>Total</span><span className="tabular">{total(p.modules)} min</span>
                </li>
              </ol>
            </div>
          </div>
        </Card>
      </div>

      {builder && (
        <Card
          title="Builders learn to design processes, not just navigate a tool"
          subtitle="Workflow builders must cover process design, data permissions, testing, exceptions, approval boundaries, and ownership before they get build rights."
          actions={<Link to="/workflow?tab=onboarding" className="inline-flex items-center gap-1 text-[0.8rem] font-medium text-accent-700 hover:underline">Team onboarding <ArrowRight size={12} /></Link>}
        >
          <div className="flex h-8 w-full overflow-hidden rounded-md ring-1 ring-slate-200" role="img" aria-label={`Builder curriculum: ${bTotal} minutes, of which tool navigation is ${navMin} minutes`}>
            {builder.modules.map((m) => {
              const nav = /navigation/i.test(m.title)
              return (
                <div
                  key={m.title}
                  title={`${m.title}: ${m.minutes} min`}
                  style={{ width: `${(m.minutes / bTotal) * 100}%` }}
                  className={cn('flex items-center justify-center border-r border-white/60 text-[0.68rem] font-medium last:border-0', nav ? 'bg-slate-200 text-slate-600' : 'bg-accent-600 text-white')}
                >
                  {m.minutes}m
                </div>
              )
            })}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-slate-600">
            {builder.modules.map((m) => (
              <span key={m.title} className="inline-flex items-center gap-1.5">
                <span className={cn('h-2.5 w-2.5 rounded-sm', /navigation/i.test(m.title) ? 'bg-slate-300' : 'bg-accent-600')} />
                {m.title}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink-900">
            Tool navigation is <span className="font-semibold tabular">{Math.round((navMin / bTotal) * 100)}%</span> of the {bTotal}-minute curriculum. The rest is the judgement that keeps federated building safe.
          </p>
          <div className="mt-2"><Illustrative>Illustrative curriculum and durations.</Illustrative></div>
        </Card>
      )}
    </div>
  )
}
