import { useSearchParams } from 'react-router-dom'
import { Badge, ControlsFootnote, PageHeader, Tabs } from '../components/ui'
import { useDemo } from '../store/store'
import { Journey, type ScenarioId } from './support/Journey'
import { Console } from './support/Console'

type View = 'journey' | 'console'

const isScenario = (v: string | null): v is ScenarioId => v === 'vpn' || v === 'password' || v === 'security'

export default function Support() {
  const [params, setParams] = useSearchParams()
  const scenario: ScenarioId = isScenario(params.get('scenario')) ? (params.get('scenario') as ScenarioId) : 'vpn'
  const view: View = params.get('view') === 'console' ? 'console' : 'journey'
  const awaiting = useDemo((s) => s.incidents.filter((i) => i.status !== 'Resolved').length)

  const update = (patch: { scenario?: ScenarioId; view?: View }) =>
    setParams({ scenario: patch.scenario ?? scenario, view: patch.view ?? view }, { replace: true })

  return (
    <div>
      <PageHeader
        title="IT support"
        subtitle="Jordan gets help in the flow of work; Priya’s service desk handles what genuinely needs a person. Three scenarios show where the assistant resolves, where it stops, and how escalation carries full context into ServiceNow."
        told={['process']}
        prov="public"
      />

      <Tabs<View>
        className="mb-5"
        value={view}
        onChange={(v) => update({ view: v })}
        tabs={[
          { id: 'journey', label: 'Employee journey (Jordan)' },
          { id: 'console', label: 'Service desk console (Priya)', badge: <Badge tone="accent">{awaiting} open</Badge> },
        ]}
      />

      {view === 'journey' ? (
        <Journey scenario={scenario} onScenario={(s) => update({ scenario: s })} onOpenConsole={() => update({ view: 'console' })} />
      ) : (
        <Console scenario={scenario} onBack={() => update({ view: 'journey' })} />
      )}

      <ControlsFootnote />
    </div>
  )
}
