import { useEffect, useState } from 'react'
import { Check, Copy, AlertTriangle } from 'lucide-react'
import { useDemo } from '../../store/store'
import type { Communication } from '../../types'
import { Button, Callout, Card, Field, Prov, YouToldUs, inputCls } from '../../components/ui'
import { cn, copyText } from '../../lib/util'
import { clientConfig } from '../../config/client'

const META: { key: keyof Communication; label: string; multi?: boolean }[] = [
  { key: 'audience', label: 'Audience' },
  { key: 'timing', label: 'Timing' },
  { key: 'sender', label: 'Sender' },
  { key: 'objective', label: 'Objective' },
  { key: 'keyMessage', label: 'Key message', multi: true },
  { key: 'cta', label: 'Call to action' },
  { key: 'feedback', label: 'Feedback mechanism' },
]

const toText = (c: Communication) =>
  [
    c.title,
    '',
    ...META.map((m) => `${m.label}: ${c[m.key]}`),
    '',
    c.body,
    '',
    `[Illustrative draft — requires review by ${clientConfig.name}]`,
  ].join('\n')

export default function CommsTab() {
  const comms = useDemo((s) => s.comms)
  const updateComm = useDemo((s) => s.updateComm)
  const [id, setId] = useState(comms[0]?.id ?? '')
  const [copied, setCopied] = useState<'ok' | 'fail' | null>(null)
  const c = comms.find((x) => x.id === id) ?? comms[0]

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(null), 1800)
    return () => clearTimeout(t)
  }, [copied])

  if (!c) return null
  const patch = (p: Partial<Communication>) => updateComm(c.id, p)

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <Card title="Drafts" subtitle={`${comms.length} audience-specific messages`} bodyClass="p-2">
        <ul className="space-y-0.5">
          {comms.map((x) => (
            <li key={x.id}>
              <button
                onClick={() => setId(x.id)}
                className={cn('w-full rounded-md px-3 py-2 text-left transition-colors', x.id === c.id ? 'bg-accent-50 ring-1 ring-inset ring-accent-200' : 'hover:bg-slate-50')}
              >
                <span className="block text-sm font-medium text-ink-900">{x.title}</span>
                <span className="block text-[0.75rem] text-slate-500">{x.audience} · {x.timing}</span>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Card
        title={<input aria-label="Title" className="w-full rounded border border-transparent bg-transparent px-1 -mx-1 font-semibold text-ink-900 hover:border-slate-200 focus:border-accent-500 focus:outline-none" value={c.title} onChange={(e) => patch({ title: e.target.value })} />}
        subtitle="All fields are editable. Edits save to this session."
        actions={
          <>
            <Prov kind="validate" />
            <Button
              size="sm"
              variant={copied === 'ok' ? 'success' : 'secondary'}
              onClick={async () => setCopied((await copyText(toText(c))) ? 'ok' : 'fail')}
            >
              {copied === 'ok' ? <><Check size={13} /> Copied</> : copied === 'fail' ? 'Copy failed' : <><Copy size={13} /> Copy draft</>}
            </Button>
          </>
        }
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <Callout tone="warn" title="Illustrative draft — requires client review." icon={<AlertTriangle size={14} />} />
          <YouToldUs ids={['comms']} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {META.map((m) => (
            <div key={m.key} className={m.multi ? 'sm:col-span-2' : undefined}>
              <Field label={m.label}>
                <input className={inputCls} value={c[m.key]} onChange={(e) => patch({ [m.key]: e.target.value })} />
              </Field>
            </div>
          ))}
          <div className="sm:col-span-2">
            <Field label="Message body">
              <textarea className={cn(inputCls, 'min-h-[200px] leading-relaxed')} value={c.body} onChange={(e) => patch({ body: e.target.value })} />
            </Field>
          </div>
        </div>
      </Card>
    </div>
  )
}
