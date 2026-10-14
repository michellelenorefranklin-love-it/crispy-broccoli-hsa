import { useSearchParams } from 'react-router-dom'
import { ControlsFootnote, PageHeader, Tabs } from '../components/ui'
import type { StatementId } from '../data/clientStatements'
import type { Provenance } from '../types'
import { PortfolioHealth } from './workflow/PortfolioHealth'
import { OperatingModel } from './workflow/OperatingModel'
import { RolesMatrix } from './workflow/RolesMatrix'
import { TeamOnboarding } from './workflow/TeamOnboarding'
import { Builder } from './workflow/Builder'
import { RiskTiers } from './workflow/RiskTiers'
import { Lanes } from './workflow/Lanes'
import { Lifecycle } from './workflow/Lifecycle'

type TabId = 'model' | 'roles' | 'onboarding' | 'builder' | 'tiers' | 'lanes' | 'lifecycle'

const tabs: { id: TabId; label: string; told: StatementId[]; prov?: Provenance; subtitle: string }[] = [
  { id: 'model', label: 'Operating model', told: ['governance', 'build'], prov: 'conceptual', subtitle: 'Who owns what: central guardrails, business-owned rules, team builders working within assigned permissions.' },
  { id: 'roles', label: 'Teams & roles', told: ['roles', 'access'], subtitle: 'What each role can build, see, approve, and deploy — by team.' },
  { id: 'onboarding', label: 'Team onboarding', told: ['teamOnboarding', 'needs', 'roles'], subtitle: 'Bringing HR Operations onto the platform as a workflow-building team, one gated step at a time.' },
  { id: 'builder', label: 'Workflow builder', told: ['build', 'process'], subtitle: 'Describe a process in plain language; get a deterministic, testable, auditable workflow with controls built in.' },
  { id: 'tiers', label: 'Risk tiers', told: ['governance'], prov: 'validate', subtitle: 'Risk tier sets the review lane, required reviews, and how much the workflow may do on its own.' },
  { id: 'lanes', label: 'Review lanes', told: ['bottlenecks'], subtitle: 'Proportionate review keeps low-risk work moving and concentrates scrutiny where it matters.' },
  { id: 'lifecycle', label: 'Lifecycle', told: ['process'], subtitle: 'From design to recertification — every stage has an accountable person, required evidence, and an exit criterion.' },
]

export default function WorkflowStudio() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('tab') as TabId | null
  const tab: TabId = tabs.some((t) => t.id === raw) ? (raw as TabId) : 'model'
  const meta = tabs.find((t) => t.id === tab)!
  const go = (id: TabId, extra?: Record<string, string>) => setParams({ tab: id, ...extra }, { replace: true })

  return (
    <div>
      <PageHeader title="Workflow & Governance Studio" subtitle={meta.subtitle} told={meta.told} prov={meta.prov} />
      <PortfolioHealth />
      <Tabs className="mb-5 mt-5" tabs={tabs.map(({ id, label }) => ({ id, label }))} value={tab} onChange={(id) => go(id)} />
      {tab === 'model' && <OperatingModel />}
      {tab === 'roles' && <RolesMatrix />}
      {tab === 'onboarding' && <TeamOnboarding />}
      {tab === 'builder' && <Builder key={params.get('wf') ?? 'none'} initialId={params.get('wf')} />}
      {tab === 'tiers' && <RiskTiers />}
      {tab === 'lanes' && <Lanes />}
      {tab === 'lifecycle' && <Lifecycle onOpen={(id) => go('builder', { wf: id })} />}
      <ControlsFootnote />
    </div>
  )
}
