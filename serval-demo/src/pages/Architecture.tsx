import { useState, type ReactNode } from 'react'
import { ArrowDown, BookOpen, FileClock, Activity, Users, HelpCircle } from 'lucide-react'
import { Badge, Card, Callout, ControlsFootnote, PageHeader, Prov, Segmented } from '../components/ui'
import { useDemo, type IntegrationModel } from '../store/store'
import { clientConfig } from '../config/client'
import type { Provenance } from '../types'
import { cn } from '../lib/util'

type BoxId =
  | 'channels' | 'agent' | 'policy' | 'records' | 'connected'
  | 'knowledge' | 'audit' | 'monitoring' | 'humans'

interface BoxInfo { title: string; prov: Provenance; desc: string; items?: string[] }

const boxes = (model: IntegrationModel): Record<BoxId, BoxInfo> => ({
  channels: { title: 'Employee channels', prov: 'public', items: ['Microsoft Teams', 'Employee portal', 'Email'], desc: 'Employees ask for help where they already work. Teams as the primary channel is an assumption to validate.' },
  agent: { title: 'Serval AI agent', prov: 'public', items: ['Understands intent', 'Answers from approved knowledge', 'Initiates workflows'], desc: 'The AI helpdesk agent classifies requests, answers from approved knowledge, and starts deterministic workflows. It never executes an action that a workflow, policy, or approver has not cleared.' },
  policy: { title: 'Policy, identity & approval controls', prov: 'validate', items: ['Identity verification', 'Eligibility + SoD checks', 'Risk tiers', 'Approvals'], desc: `Every action passes identity, policy, and approval checks before execution. How these map to ${clientConfig.name}'s IAM, SoD rules, and risk taxonomy is conceptual until validated.` },
  records: {
    title: model === 'overlay' ? 'Workflows & records — ServiceNow + Serval' : 'Workflows & records — Serval (progressive)',
    prov: model === 'overlay' ? 'public' : 'validate',
    items: model === 'overlay' ? ['ServiceNow: tickets, catalog, access records', 'Serval: workflow automation', 'Two-way sync'] : ['Serval: tickets, catalog, access records', 'ServiceNow: retained capabilities during transition', 'Phased migration'],
    desc: model === 'overlay'
      ? 'ServiceNow stays the system of record. Serval runs as the automation layer and syncs both ways, so agents keep their workspace and reporting stays where it is.'
      : 'Serval progressively becomes the system of record for tickets, catalog, and access records. Requires a migration plan, reporting rebuild, and service desk change.',
  },
  connected: { title: 'Connected systems', prov: 'validate', items: ['HRIS', 'Identity provider', 'FinReport', 'VPN', 'LMS'], desc: `Connectors to ${clientConfig.name}'s systems. Availability, API access, and permissions need confirmation per system.` },
  knowledge: { title: 'Knowledge sources', prov: 'public', desc: 'Approved knowledge articles and policies. Answers are grounded only in owned, reviewed content; stale articles are flagged to owners.' },
  audit: { title: 'Audit logging', prov: 'validate', desc: 'Every AI, human, and system action is logged with actor, object, and system. Retention and export to the Client’s SIEM need validation.' },
  monitoring: { title: 'Monitoring', prov: 'conceptual', desc: 'Quality sampling, drift, escalation rates, and control exceptions feed governance reviews and balancing metrics.' },
  humans: { title: 'Human service teams', prov: 'public', desc: 'Service desk, IAM, HR Ops, and app owners receive handoffs with full context and make every decision AI is not permitted to make.' },
})

const ownership: Record<IntegrationModel, { obj: string; owner: string }[]> = {
  overlay: [
    { obj: 'Tickets (incidents, requests)', owner: 'ServiceNow' },
    { obj: 'Service catalog', owner: 'ServiceNow' },
    { obj: 'Access records (RITM)', owner: 'ServiceNow' },
    { obj: 'Automated workflows', owner: 'Serval' },
    { obj: 'Conversations', owner: 'Serval' },
  ],
  consolidated: [
    { obj: 'Tickets (incidents, requests)', owner: 'Serval' },
    { obj: 'Service catalog', owner: 'Serval' },
    { obj: 'Access records (RITM)', owner: 'Serval' },
    { obj: 'Automated workflows', owner: 'Serval' },
    { obj: 'Conversations', owner: 'Serval' },
  ],
}

const implications: Record<IntegrationModel, { area: string; text: string }[]> = {
  overlay: [
    { area: 'Licensing', text: 'Both platforms licensed in parallel; ServiceNow fulfiller licences remain.' },
    { area: 'Reporting', text: 'Existing ServiceNow reporting and SLAs keep working; AI metrics come from Serval.' },
    { area: 'Agent workspace', text: 'Service desk stays in ServiceNow; lowest change for analysts.' },
    { area: 'Migration', text: 'No record migration. Sync design and conflict handling become critical.' },
    { area: 'Change impact', text: 'Low for service desk; medium for employees (new front door).' },
  ],
  consolidated: [
    { area: 'Licensing', text: 'Potential to reduce overlap over time; timing depends on contracts.' },
    { area: 'Reporting', text: 'Reports, SLAs, and regulatory evidence must be rebuilt and re-validated.' },
    { area: 'Agent workspace', text: 'Analysts move to a new workspace; retraining and new procedures.' },
    { area: 'Migration', text: 'Phased migration of tickets, catalog, and access history; customisations re-assessed.' },
    { area: 'Change impact', text: 'High for service desk and platform team; requires a sustained OCM plan.' },
  ],
}

const questions = [
  'Integration pattern: which objects sync, in which direction, and who wins on conflict?',
  'Data residency: where are conversations, records, and logs stored and processed?',
  'Connector availability for HRIS, IdP, FinReport, VPN, and LMS — and the permissions each needs.',
  'Identity integration: SSO, step-up verification, and how the agent acts on behalf of a user.',
  'Audit log retention, immutability, and export to the Client’s SIEM.',
  'Which Serval features are licensed (helpdesk agent, workflow builder, access management, reviews)?',
  'Which ServiceNow customisations must be preserved, rebuilt, or retired?',
]

export default function Architecture() {
  const model = useDemo((s) => s.integrationModel)
  const set = useDemo((s) => s.set)
  const [sel, setSel] = useState<BoxId>('agent')
  const info = boxes(model)
  const recordsOwner = model === 'overlay' ? 'ServiceNow' : 'Serval'

  const Layer = ({ id, highlight, children }: { id: BoxId; highlight?: boolean; children?: ReactNode }) => {
    const b = info[id]
    return (
      <button
        type="button"
        onClick={() => setSel(id)}
        aria-pressed={sel === id}
        className={cn(
          'w-full rounded-lg border px-4 py-3 text-left transition-colors',
          sel === id ? 'border-accent-600 ring-1 ring-accent-600' : 'border-slate-200 hover:border-slate-300',
          highlight ? 'bg-accent-50' : 'bg-white',
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold text-ink-900">{b.title}</p>
          <Prov kind={b.prov} />
        </div>
        {b.items && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {b.items.map((i) => <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-[0.75rem] text-slate-700">{i}</span>)}
          </div>
        )}
        {children}
      </button>
    )
  }
  const Arrow = () => <div className="flex justify-center py-1 text-slate-400"><ArrowDown size={16} /></div>
  const Side = ({ id, icon }: { id: BoxId; icon: ReactNode }) => (
    <button
      type="button"
      onClick={() => setSel(id)}
      aria-pressed={sel === id}
      className={cn('flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2.5 text-left text-sm transition-colors',
        sel === id ? 'border-accent-600 ring-1 ring-accent-600' : 'border-slate-200 hover:border-slate-300')}
    >
      <span className="flex items-center gap-2 font-medium text-ink-900">{icon}{info[id].title}</span>
      <Prov kind={info[id].prov} />
    </button>
  )

  return (
    <div>
      <PageHeader
        title="Target architecture"
        subtitle="How Serval and ServiceNow could fit together. The integration model is a decision for the Client, informed by discovery."
        told={['process']}
        prov="validate"
        actions={
          <Segmented<IntegrationModel>
            value={model}
            onChange={(v) => set({ integrationModel: v })}
            options={[{ id: 'overlay', label: 'Overlay on ServiceNow' }, { id: 'consolidated', label: 'Progressive consolidation' }]}
          />
        }
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card title="Layered view" subtitle="Select any component for detail.">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div>
              <Layer id="channels" />
              <Arrow />
              <Layer id="agent" />
              <Arrow />
              <Layer id="policy" />
              <Arrow />
              <Layer id="records" highlight>
                <p className="mt-2 text-[0.75rem] text-accent-700">System of record for tickets, catalog, and access: <span className="font-semibold">{recordsOwner}</span></p>
              </Layer>
              <Arrow />
              <Layer id="connected" />
            </div>
            <div className="space-y-2">
              <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">Cross-cutting</p>
              <Side id="knowledge" icon={<BookOpen size={14} className="text-slate-500" />} />
              <Side id="audit" icon={<FileClock size={14} className="text-slate-500" />} />
              <Side id="monitoring" icon={<Activity size={14} className="text-slate-500" />} />
              <Side id="humans" icon={<Users size={14} className="text-slate-500" />} />
              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-ink-900">{info[sel].title}</p>
                  <Prov kind={info[sel].prov} />
                </div>
                <p className="mt-1 text-[0.82rem] text-slate-600">{info[sel].desc}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-5">
          <Card title="Who owns what" subtitle={model === 'overlay' ? 'Overlay: Serval automates; ServiceNow records.' : 'Consolidated: Serval progressively records.'}>
            <table className="w-full text-[0.82rem]">
              <tbody>
                {ownership[model].map((r) => (
                  <tr key={r.obj} className="border-b border-slate-100 last:border-0">
                    <td className="py-1.5 pr-2 text-slate-600">{r.obj}</td>
                    <td className="py-1.5 text-right"><Badge tone={r.owner === 'Serval' ? 'accent' : 'info'}>{r.owner}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card title={<span className="flex items-center gap-2"><HelpCircle size={15} /> Questions to validate</span>} actions={<Prov kind="validate" />}>
            <ol className="list-decimal space-y-1.5 pl-4 text-[0.82rem] text-slate-700">
              {questions.map((q) => <li key={q}>{q}</li>)}
            </ol>
          </Card>
        </div>
      </div>

      <Card title="Implications — the tension, not the answer" subtitle="Both models are viable. The trade-offs differ." className="mt-5">
        <div className="grid gap-4 md:grid-cols-2">
          {(['overlay', 'consolidated'] as IntegrationModel[]).map((m) => (
            <div key={m} className={cn('rounded-lg border p-3', m === model ? 'border-accent-600 bg-accent-50/40' : 'border-slate-200')}>
              <p className="mb-2 flex items-center gap-2 font-semibold text-ink-900">
                {m === 'overlay' ? 'Overlay on ServiceNow' : 'Progressive consolidation'}
                {m === model && <Badge tone="accent">Selected</Badge>}
              </p>
              <dl className="space-y-1.5 text-[0.82rem]">
                {implications[m].map((i) => (
                  <div key={i.area} className="grid grid-cols-[110px_minmax(0,1fr)] gap-2">
                    <dt className="font-medium text-slate-500">{i.area}</dt>
                    <dd className="text-slate-700">{i.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Callout tone="neutral">Not resolved today. This is decision D1 on the decisions list — owned by the CIO and Head of Service Management, informed by discovery.</Callout>
        </div>
      </Card>
      <ControlsFootnote />
    </div>
  )
}
