import { useSearchParams } from 'react-router-dom'
import { ClipboardList, Megaphone, Users, Workflow, GraduationCap, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react'
import { PageHeader, Tabs } from '../components/ui'
import { cn } from '../lib/util'
import ImpactTab from './change/ImpactTab'
import JourneyTab from './change/JourneyTab'
import LifecycleTab from './change/LifecycleTab'
import CommsTab from './change/CommsTab'
import LearningTab from './change/LearningTab'
import FailureTab from './change/FailureTab'

type TabId = 'impact' | 'journey' | 'lifecycle' | 'comms' | 'learning' | 'failure'
const TABS: { id: TabId; label: string }[] = [
  { id: 'impact', label: 'Impact heatmap' },
  { id: 'journey', label: 'Employee journey' },
  { id: 'lifecycle', label: 'Change early & often' },
  { id: 'comms', label: 'Communications' },
  { id: 'learning', label: 'Learning paths' },
  { id: 'failure', label: 'Failure-mode simulator' },
]
const isTab = (v: string | null): v is TabId => !!v && TABS.some((t) => t.id === v)

const WORKSTREAMS: { title: string; desc: string; tab: TabId; icon: typeof Users }[] = [
  { title: 'Impact assessment', desc: 'Who changes, how much, and what they worry about', tab: 'impact', icon: ClipboardList },
  { title: 'Leadership alignment & sponsorship', desc: 'What leaders say at each stage of the journey', tab: 'journey', icon: Users },
  { title: 'Communications & engagement', desc: 'Audience-specific drafts, timing, and feedback loops', tab: 'comms', icon: Megaphone },
  { title: 'Process & operating model', desc: 'Change activities and decisions in every phase', tab: 'lifecycle', icon: Workflow },
  { title: 'Role-based training', desc: 'Learning paths by role; certification gates build rights', tab: 'learning', icon: GraduationCap },
  { title: 'Adoption & benefits realization', desc: 'What happens with and without OCM', tab: 'failure', icon: TrendingUp },
]

export default function Change() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('tab')
  const tab: TabId = isTab(raw) ? raw : 'impact'
  const go = (t: TabId) => setParams({ tab: t }, { replace: true })

  return (
    <div>
      <PageHeader
        title="Change & Adoption"
        subtitle="Change management is embedded in every journey in this demo. This is the consolidated view: who is affected, what they hear, what they learn, and what happens if we skip it."
        told={['comms', 'teamOnboarding']}
        prov="conceptual"
      />

      <section aria-label="OCM workstreams" className="mb-6">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
          {WORKSTREAMS.map((w) => {
            const Icon = w.icon
            const active = tab === w.tab
            return (
              <button
                key={w.title}
                onClick={() => go(w.tab)}
                className={cn(
                  'group flex flex-col rounded-lg border bg-white p-3 text-left shadow-card transition-colors hover:border-accent-500',
                  active ? 'border-accent-600 ring-1 ring-accent-600' : 'border-slate-200',
                )}
              >
                <span className={cn('inline-flex h-7 w-7 items-center justify-center rounded-md', active ? 'bg-accent-600 text-white' : 'bg-slate-100 text-ink-700')}>
                  <Icon size={15} />
                </span>
                <span className="mt-2 text-[0.84rem] font-semibold leading-snug text-ink-900">{w.title}</span>
                <span className="mt-1 flex-1 text-[0.75rem] leading-snug text-slate-500">{w.desc}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-[0.72rem] font-medium text-accent-700 opacity-80 group-hover:opacity-100">
                  Open <ArrowRight size={11} />
                </span>
              </button>
            )
          })}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-ink-800 px-4 py-2.5 text-white">
          <span className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold"><ShieldCheck size={15} /> Responsible AI, risk & governance</span>
          <span className="text-[0.78rem] text-slate-300">Cross-cutting across all six workstreams: action classes, risk tiers, human escalation, and audit evidence are part of every message, path, and gate.</span>
        </div>
      </section>

      <Tabs tabs={TABS} value={tab} onChange={go} className="mb-5" />

      {tab === 'impact' && <ImpactTab />}
      {tab === 'journey' && <JourneyTab />}
      {tab === 'lifecycle' && <LifecycleTab />}
      {tab === 'comms' && <CommsTab />}
      {tab === 'learning' && <LearningTab />}
      {tab === 'failure' && <FailureTab />}
    </div>
  )
}
