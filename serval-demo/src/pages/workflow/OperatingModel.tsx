import { useState } from 'react'
import { Badge, Callout, Card, Prov } from '../../components/ui'
import { cn } from '../../lib/util'
import { clientConfig } from '../../config/client'

type RingId = 'central' | 'owners' | 'builders'

const rings: Record<RingId, { title: string; short: string; who: string[]; what: string[]; decides: string[]; note?: string }> = {
  central: {
    title: 'Central platform & AI governance',
    short: 'Guardrails',
    who: ['AI Governance Lead (Elena Novak)', 'Platform team & admins', 'Security/Risk approvers'],
    what: ['Standards and guardrails', 'Reusable components and pre-approved patterns', 'Monitoring and audit', 'Release controls and environments'],
    decides: ['Risk tiers and policy floors', 'Which components are approved for reuse', 'Technical release readiness', 'Enhanced-lane sign-off with Security/Risk'],
  },
  owners: {
    title: 'Business process owners',
    short: 'Business rules',
    who: ['Process owners in HR, Finance, IT, IAM', 'Business line leaders (accountable)'],
    what: ['Business rules', 'Approval paths', 'SLAs', 'Exceptions'],
    decides: ['Standard-lane release approval', 'Business exceptions', 'Who owns each workflow after release'],
    note: `Governance largely owned here, per ${clientConfig.name}.`,
  },
  builders: {
    title: 'Team workflow builders',
    short: 'Configure',
    who: ['Certified builders in each onboarded team (e.g. Sam Rivera, HR Ops)'],
    what: ['Configure workflows for their own team’s services', 'Use approved components', 'Write and run test cases', 'Submit to the right review lane'],
    decides: ['How to configure within assigned permissions', 'Nothing reaches production without the lane’s approval'],
  },
}

const order: RingId[] = ['builders', 'owners', 'central']
const radius: Record<RingId, number> = { builders: 170, owners: 118, central: 64 }

export function OperatingModel() {
  const [sel, setSel] = useState<RingId>('owners')
  const r = rings[sel]
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">Proposed model for discussion</Badge>
        <Prov kind="conceptual" />
        <span className="text-[0.8rem] text-slate-500">Select a ring to see who sits there, what they own, and their decision rights.</span>
      </div>
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <Card bodyClass="flex items-center justify-center p-3">
          <svg viewBox="0 0 360 360" className="h-auto w-full max-w-[360px]" role="img" aria-label="Federated operating model: three concentric rings">
            {order.map((id) => {
              const active = sel === id
              const fill = id === 'central' ? (active ? '#0B1B33' : '#13284A') : id === 'owners' ? (active ? '#0F766E' : '#14958A') : (active ? '#CCF5EC' : '#ECFDF9')
              return (
                <circle
                  key={id}
                  cx={180}
                  cy={180}
                  r={radius[id]}
                  fill={fill}
                  stroke={active ? '#0B1B33' : '#ffffff'}
                  strokeWidth={active ? 3 : 2}
                  className="cursor-pointer transition-colors"
                  onClick={() => setSel(id)}
                >
                  <title>{rings[id].title}</title>
                </circle>
              )
            })}
            <g pointerEvents="none" fontFamily="Inter, system-ui, sans-serif" textAnchor="middle">
              <text x={180} y={30} fontSize={12} fontWeight={600} fill="#0B5C56">Team workflow builders</text>
              <text x={180} y={45} fontSize={10} fill="#0B5C56">configure within permissions</text>
              <text x={180} y={84} fontSize={12} fontWeight={600} fill="#ffffff">Business process owners</text>
              <text x={180} y={99} fontSize={10} fill="#ECFDF9">rules · approvals · SLAs · exceptions</text>
              <text x={180} y={176} fontSize={12} fontWeight={600} fill="#ffffff">Central platform</text>
              <text x={180} y={192} fontSize={12} fontWeight={600} fill="#ffffff">& AI governance</text>
            </g>
          </svg>
        </Card>
        <Card title={r.title} subtitle={r.note} actions={<div className="flex gap-1">{order.slice().reverse().map((id) => (
          <button key={id} onClick={() => setSel(id)} className={cn('rounded px-2 py-0.5 text-[0.75rem] font-medium', sel === id ? 'bg-ink-800 text-white' : 'text-slate-500 hover:bg-slate-100')}>{rings[id].short}</button>
        ))}</div>}>
          <div className="grid gap-4 md:grid-cols-3">
            <List title="Who" items={r.who} />
            <List title="Owns" items={r.what} />
            <List title="Decision rights" items={r.decides} />
          </div>
          {sel === 'owners' && <div className="mt-4"><Callout tone="neutral" title={`What ${clientConfig.name} told us`}>“A lot of the governance is owned by the process teams.” The model keeps it there — the central team sets guardrails, not business rules.</Callout></div>}
        </Card>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Callout tone="info" title="Risk and compliance reviews scale with risk tier">Low-tier workflows on pre-approved patterns pass automated checks; High-tier workflows get Security/Risk and AI Governance review. See Risk tiers and Review lanes.</Callout>
        <Callout tone="info" title="Every workflow has a named owner after release">Ownership transfers from builder to a named process owner at release, with monitoring and a 90-day review. Unowned workflows are flagged on the portfolio strip.</Callout>
      </div>
    </div>
  )
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <ul className="space-y-1.5 text-sm text-slate-700">
        {items.map((i) => <li key={i} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />{i}</li>)}
      </ul>
    </div>
  )
}
