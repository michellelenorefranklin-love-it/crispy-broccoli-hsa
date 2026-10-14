import { useState } from 'react'
import { Check, Copy, MessageCircleQuestion } from 'lucide-react'
import { Badge, Button, Card, ControlsFootnote, PageHeader, Segmented, Callout } from '../components/ui'
import { assumptions, decisions } from '../data/value'
import type { Decision } from '../types'
import { clientConfig } from '../config/client'
import { cn, copyText } from '../lib/util'

type ItemStatus = 'Open' | 'Agreed' | 'Parked'
interface Row { id: string; text: string; why: string; owner: string; by: string }
interface ItemState { status: ItemStatus; confirmed: boolean }

const toRow = (d: Decision): Row => ({ id: d.id, text: d.decision, why: d.why, owner: d.owner, by: d.by })

const sections: { kind: Decision['kind']; title: string; subtitle: string; extra?: Row[] }[] = [
  { kind: 'Decision', title: `Decisions ${clientConfig.name} must make`, subtitle: 'Only the Client can make these. They shape the design.' },
  {
    kind: 'Assumption to validate', title: 'Assumptions to validate', subtitle: 'What this demo assumes. Each needs confirmation before it becomes design.',
    extra: assumptions.map((a) => ({ id: a.id, text: a.text, why: `${a.area} assumption`, owner: a.validateWith, by: 'Discovery' })),
  },
  { kind: 'Discovery question', title: 'Priority discovery questions', subtitle: 'Ask each one, then follow with: “What makes you believe that?”' },
  { kind: 'Pilot next step', title: 'Recommended pilot next steps', subtitle: 'A small, measurable, controlled path to a pilot.' },
]

export default function Decisions() {
  const [state, setState] = useState<Record<string, ItemState>>({})
  const [copied, setCopied] = useState<'ok' | 'fail' | null>(null)
  const get = (id: string): ItemState => state[id] ?? { status: 'Open', confirmed: false }
  const patch = (id: string, p: Partial<ItemState>) => setState((s) => ({ ...s, [id]: { ...get(id), ...p } }))

  const rowsFor = (sec: (typeof sections)[number]) => [...decisions.filter((d) => d.kind === sec.kind).map(toRow), ...(sec.extra ?? [])]
  const all = sections.flatMap(rowsFor)
  const agreed = all.filter((r) => get(r.id).status === 'Agreed').length
  const confirmed = all.filter((r) => get(r.id).confirmed).length

  const copy = async () => {
    const lines = [`Action list — ${clientConfig.displayName} AI employee experience (suggested owners, to be confirmed)`, '']
    sections.forEach((sec) => {
      lines.push(sec.title.toUpperCase())
      rowsFor(sec).forEach((r) => {
        const st = get(r.id)
        lines.push(`- [${st.status}] ${r.text}`)
        lines.push(`    Owner: ${r.owner}${st.confirmed ? ' (confirmed)' : ' (to confirm)'} | By: ${r.by}`)
      })
      lines.push('')
    })
    const ok = await copyText(lines.join('\n'))
    setCopied(ok ? 'ok' : 'fail')
    window.setTimeout(() => setCopied(null), 2500)
  }

  return (
    <div>
      <PageHeader
        title="Decisions & next steps"
        subtitle="The action items: decisions, assumptions to validate, discovery questions, and a recommended pilot path — each with a suggested owner and timing."
        told={['actions']}
        actions={
          <>
            <span className="text-[0.8rem] text-slate-500 tabular">{agreed} agreed · {confirmed}/{all.length} owners confirmed</span>
            <Button variant="primary" onClick={copy}>{copied === 'ok' ? <Check size={14} /> : <Copy size={14} />}{copied === 'ok' ? 'Copied' : copied === 'fail' ? 'Copy failed' : 'Copy as action list'}</Button>
          </>
        }
      />

      <div className="mb-5">
        <Callout tone="info" title="Suggested owners — to be confirmed with the Client.">
          Set a status for each item as the room agrees it, and tick the owner once they accept it. Close by agreeing owners and dates for the top three decisions.
        </Callout>
      </div>

      <div className="space-y-5">
        {sections.map((sec) => (
          <Card key={sec.kind} title={sec.title} subtitle={sec.subtitle} actions={<Badge>{rowsFor(sec).length}</Badge>}>
            {sec.kind === 'Discovery question' && (
              <div className="mb-3 flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-sm text-ink-900">
                <MessageCircleQuestion size={16} className="text-accent-600" />
                <span className="font-semibold">Follow-up for every answer: “What makes you believe that?”</span>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-[0.83rem]">
                <thead className="text-[0.72rem] uppercase tracking-wide text-slate-500">
                  <tr className="border-b border-slate-200">
                    <th className="w-[40%] px-2 py-2 font-medium">Item</th>
                    <th className="px-2 py-2 font-medium">Suggested owner</th>
                    <th className="px-2 py-2 font-medium">Timing</th>
                    <th className="px-2 py-2 font-medium">Status</th>
                    <th className="px-2 py-2 font-medium">Owner confirmed</th>
                  </tr>
                </thead>
                <tbody>
                  {rowsFor(sec).map((r) => {
                    const st = get(r.id)
                    return (
                      <tr key={r.id} className={cn('border-b border-slate-100 align-top', st.status === 'Parked' && 'opacity-60')}>
                        <td className="px-2 py-2.5">
                          <p className="font-medium text-ink-900">{r.text}</p>
                          <p className="mt-0.5 text-[0.78rem] text-slate-500">{r.why}</p>
                        </td>
                        <td className="px-2 py-2.5 text-slate-700">{r.owner}</td>
                        <td className="whitespace-nowrap px-2 py-2.5 text-slate-700">{r.by}</td>
                        <td className="px-2 py-2.5">
                          <Segmented<ItemStatus> size="sm" value={st.status} onChange={(v) => patch(r.id, { status: v })} options={(['Open', 'Agreed', 'Parked'] as ItemStatus[]).map((o) => ({ id: o, label: <span className={cn(o === st.status && o !== 'Open' && (o === 'Agreed' ? 'text-ok-700' : 'text-warn-700'))}>{o}</span> }))} />
                        </td>
                        <td className="px-2 py-2.5">
                          <label className="inline-flex cursor-pointer items-center gap-2 text-slate-700">
                            <input type="checkbox" className="h-4 w-4 accent-accent-600" checked={st.confirmed} onChange={(e) => patch(r.id, { confirmed: e.target.checked })} />
                            {st.confirmed ? 'Confirmed' : 'To confirm'}
                          </label>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
      <ControlsFootnote />
    </div>
  )
}
