import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useDemo } from '../../store/store'
import { stakeholders, useCases } from '../../data/change'
import type { ChangeDegree, ChangeImpact } from '../../types'
import { Card, Drawer, Field, Illustrative, Prov, Select, YouToldUs, inputCls, Badge } from '../../components/ui'
import { cn } from '../../lib/util'

const degreeCls: Record<ChangeDegree, string> = {
  Low: 'bg-slate-50 text-slate-600 ring-slate-200',
  Medium: 'bg-accent-100 text-accent-700 ring-accent-200',
  High: 'bg-accent-600 text-white ring-accent-700',
}
const DEGREES: ChangeDegree[] = ['Low', 'Medium', 'High']

export default function ImpactTab() {
  const impacts = useDemo((s) => s.impacts)
  const updateImpact = useDemo((s) => s.updateImpact)
  const [sel, setSel] = useState<{ sid: string; uc: ChangeImpact['useCase'] } | null>(null)

  const find = (sid: string, uc: ChangeImpact['useCase']) => impacts.find((i) => i.stakeholderId === sid && i.useCase === uc)
  const highCount = (sid: string) => impacts.filter((i) => i.stakeholderId === sid && i.degree === 'High').length
  const score = (sid: string) => impacts.filter((i) => i.stakeholderId === sid).reduce((a, i) => a + (i.degree === 'High' ? 3 : i.degree === 'Medium' ? 2 : 1), 0)

  const ranked = [...stakeholders].sort((a, b) => highCount(b.id) - highCount(a.id) || score(b.id) - score(a.id)).slice(0, 4)
  const totalHigh = impacts.filter((i) => i.degree === 'High').length
  const cur = sel ? find(sel.sid, sel.uc) : undefined
  const curName = sel ? stakeholders.find((s) => s.id === sel.sid)?.name : ''
  const patch = (p: Partial<ChangeImpact>) => sel && updateImpact(sel.sid, sel.uc, p)

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <Card
        title="Change impact heatmap"
        subtitle="12 stakeholder groups × 4 use cases. Click any cell to edit the impact; use it live to capture the room’s view."
        actions={<Prov kind="validate" />}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <YouToldUs ids={['needs']} />
          <div className="flex items-center gap-1.5 text-[0.75rem] text-slate-500">
            Degree of change:
            {DEGREES.map((d) => (
              <span key={d} className={cn('rounded px-1.5 py-0.5 text-[0.7rem] font-medium ring-1 ring-inset', degreeCls[d])}>{d}</span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-1 text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">Stakeholder group</th>
                {useCases.map((u) => (
                  <th key={u} className="px-2 py-1 text-center text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">{u}</th>
                ))}
                <th className="px-2 py-1 text-center text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">High</th>
              </tr>
            </thead>
            <tbody>
              {stakeholders.map((s) => (
                <tr key={s.id}>
                  <td className="whitespace-nowrap px-2 py-1">
                    <span className="font-medium text-ink-900">{s.name}</span>
                    <span className="ml-1.5 text-[0.72rem] text-slate-400">{s.group}</span>
                  </td>
                  {useCases.map((u) => {
                    const c = find(s.id, u)
                    if (!c) return <td key={u} />
                    return (
                      <td key={u} className="p-0">
                        <button
                          onClick={() => setSel({ sid: s.id, uc: u })}
                          aria-label={`${s.name}, ${u}: ${c.degree} impact. Edit`}
                          className={cn('h-9 w-full rounded text-[0.78rem] font-medium ring-1 ring-inset transition hover:ring-2 hover:ring-ink-600', degreeCls[c.degree])}
                        >
                          {c.degree}
                        </button>
                      </td>
                    )
                  })}
                  <td className="text-center font-semibold tabular text-ink-900">{highCount(s.id)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} className="px-2 pt-2">
                  <div className="flex items-center gap-2 rounded border border-dashed border-slate-300 px-3 py-2 text-[0.8rem] text-slate-500">
                    <Plus size={13} />
                    <span><span className="font-medium text-slate-700">Knowledge & content owners</span> — stakeholder group to add and assess in discovery (they own the answers the assistant gives).</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3"><Illustrative>Illustrative starting view — to be validated with stakeholders in discovery.</Illustrative></div>
      </Card>

      <div className="space-y-4">
        <Card title="Most-impacted groups">
          <ol className="space-y-2.5">
            {ranked.map((s, i) => (
              <li key={s.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-4 text-[0.75rem] text-slate-400 tabular">{i + 1}</span>
                  <span className="font-medium text-ink-900">{s.name}</span>
                </span>
                <Badge tone="accent">{highCount(s.id)} High</Badge>
              </li>
            ))}
          </ol>
          <p className="mt-3 border-t border-slate-100 pt-3 text-[0.8rem] text-slate-500">
            <span className="font-semibold tabular text-ink-900">{totalHigh}</span> of {impacts.length} cells rated High. High cells get a role-based learning path and a targeted briefing.
          </p>
        </Card>
        <Card title="How to use it">
          <ul className="list-disc space-y-1.5 pl-4 text-[0.8rem] text-slate-600">
            <li>Degree drives the intervention: Low = awareness, Medium = briefing, High = learning path + named owner.</li>
            <li>Every concern is captured in the group’s own words and answered in comms.</li>
            <li>Edits update this session only.</li>
          </ul>
        </Card>
      </div>

      <Drawer open={!!cur} onClose={() => setSel(null)} title={curName ?? ''} subtitle={cur ? `${cur.useCase} — change impact` : undefined}>
        {cur && (
          <div className="space-y-4">
            <Field label="Degree of change">
              <Select value={cur.degree} onChange={(v) => patch({ degree: v })} options={DEGREES} className="w-40" />
            </Field>
            <Field label="Behavior / responsibility change">
              <textarea className={cn(inputCls, 'min-h-[72px]')} value={cur.behaviorChange} onChange={(e) => patch({ behaviorChange: e.target.value })} />
            </Field>
            <Field label="Likely concern">
              <input className={inputCls} value={cur.concern} onChange={(e) => patch({ concern: e.target.value })} />
            </Field>
            <Field label="Communications">
              <input className={inputCls} value={cur.comms} onChange={(e) => patch({ comms: e.target.value })} />
            </Field>
            <Field label="Training">
              <input className={inputCls} value={cur.training} onChange={(e) => patch({ training: e.target.value })} />
            </Field>
            <Field label="Owner">
              <input className={inputCls} value={cur.owner} onChange={(e) => patch({ owner: e.target.value })} />
            </Field>
            <Illustrative>Changes save automatically to this demo session.</Illustrative>
          </div>
        )}
      </Drawer>
    </div>
  )
}
