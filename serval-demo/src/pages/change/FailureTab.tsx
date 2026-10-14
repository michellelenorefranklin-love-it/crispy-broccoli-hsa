import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useDemo } from '../../store/store'
import { Card, ControlsFootnote, Illustrative, Prov, Segmented, Stat } from '../../components/ui'
import { cn } from '../../lib/util'

const WITH = [4, 10, 18, 27, 36, 45, 53, 60, 66, 71, 75, 78]
const WITHOUT = [4, 9, 15, 20, 24, 27, 28, 29, 29, 28, 28, 27]
const data = WITH.map((w, i) => ({ week: `W${i + 1}`, with: w, without: WITHOUT[i] }))

const KPIS = [
  { label: 'Adoption (week 12)', on: '78%', off: '27%' },
  { label: 'Informal access grants / week', on: '6', off: '140' },
  { label: 'Median approval wait', on: '4 hrs', off: '3.5 days' },
  { label: 'Workflows without owners', on: '0', off: '11' },
  { label: '“Where is my request?” calls / week', on: '35', off: '410' },
]

const NARRATIVE = {
  off: [
    'Employees keep messaging colleagues for access (“can you just add me?”) because nobody explained the new route.',
    'Approvals stall in managers’ inboxes. Managers were never briefed and don’t trust the summary they’re shown.',
    'Builders ship workflows without named owners; exceptions have nowhere to go when something breaks.',
    'The service desk still fields “where is my request?” calls. Status is visible, but nobody knows to look.',
    'Adoption plateaus at week 6 and leadership concludes “the tool didn’t work.”',
  ],
  on: [
    'Employees hear what changes and what doesn’t before launch; the assistant becomes the front door.',
    'Managers are briefed and approve in Teams with a clear summary; waits drop from days to hours.',
    'Builders are certified before they get build rights; every workflow ships with an owner and tests.',
    'Champions and office hours catch workarounds early; feedback drives weekly fixes.',
    'Adoption keeps climbing, and benefits can be measured against a baseline.',
  ],
}

export default function FailureTab() {
  const ocmOn = useDemo((s) => s.ocmOn)
  const set = useDemo((s) => s.set)
  const mode = ocmOn ? 'on' : 'off'

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-card">
        <div className="min-w-0">
          <p className="text-[0.72rem] font-medium uppercase tracking-wide text-slate-500">Same launched access workflow</p>
          <p className="mt-0.5 text-xl font-semibold tracking-tight text-ink-900">A workflow can work technically and still fail operationally.</p>
        </div>
        <Segmented
          options={[{ id: 'on', label: 'With OCM' }, { id: 'off', label: 'Without OCM' }]}
          value={mode}
          onChange={(v) => set({ ocmOn: v === 'on' })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-lg border border-ok-100 bg-ok-50 px-3.5 py-3">
          <p className="text-[0.75rem] font-medium text-slate-500">Technical status</p>
          <p className="mt-1 flex items-center gap-1.5 text-base font-semibold text-ok-700"><CheckCircle2 size={17} /> Workflow: working ✓</p>
          <p className="mt-0.5 text-[0.75rem] text-slate-500">Same in both modes</p>
        </div>
        {KPIS.map((k) => (
          <Stat key={k.label} label={k.label} value={ocmOn ? k.on : k.off} tone={ocmOn ? 'ok' : 'bad'} sub={ocmOn ? `Without OCM: ${k.off}` : `With OCM: ${k.on}`} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <Card title="Adoption over 12 weeks" subtitle="% of target population using the new route for access requests" actions={<Prov kind="conceptual" />}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={{ stroke: '#CBD5E1' }} tickLine={false} />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number, n: string) => [`${v}%`, n === 'with' ? 'With OCM' : 'Without OCM']} contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                <Line type="monotone" dataKey="without" stroke={ocmOn ? '#CBD5E1' : '#C0362C'} strokeWidth={ocmOn ? 1.5 : 3} strokeDasharray={ocmOn ? '4 4' : undefined} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="with" stroke={ocmOn ? '#0F766E' : '#CBD5E1'} strokeWidth={ocmOn ? 3 : 1.5} strokeDasharray={ocmOn ? undefined : '4 4'} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-[0.78rem]">
            <span className={cn('inline-flex items-center gap-1.5', ocmOn ? 'font-semibold text-ink-900' : 'text-slate-400')}><span className="h-0.5 w-5 bg-accent-600" /> With OCM</span>
            <span className={cn('inline-flex items-center gap-1.5', !ocmOn ? 'font-semibold text-ink-900' : 'text-slate-400')}><span className="h-0.5 w-5 bg-bad-600" /> Without OCM</span>
          </div>
        </Card>

        <Card
          title={ocmOn ? 'What happens with OCM' : 'What happens without OCM'}
          actions={ocmOn ? undefined : <AlertTriangle size={16} className="text-bad-600" />}
        >
          <ol className="space-y-2.5">
            {NARRATIVE[mode].map((t, i) => (
              <li key={t} className="flex gap-2.5 text-sm text-slate-700">
                <span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.68rem] font-semibold', ocmOn ? 'bg-accent-100 text-accent-700' : 'bg-bad-100 text-bad-700')}>{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Illustrative>Illustrative scenario. Curves and figures are not a client baseline, forecast, or committed benefit.</Illustrative>
      <ControlsFootnote />
    </div>
  )
}
