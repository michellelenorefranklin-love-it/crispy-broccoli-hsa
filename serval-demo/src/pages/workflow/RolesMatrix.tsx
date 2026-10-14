import { useState, type ReactNode } from 'react'
import { Badge, Card, Prov } from '../../components/ui'
import { permissionMatrix, roles, teams } from '../../data/governance'
import { cn } from '../../lib/util'
import type { Permission } from '../../types'

const levelTone: Record<Permission['level'], 'neutral' | 'info' | 'accent' | 'ink' | 'warn'> = {
  None: 'neutral', Use: 'neutral', 'Build (sandbox)': 'info', 'Build + submit': 'accent', Approve: 'warn', Administer: 'ink',
}

export function RolesMatrix() {
  const [roleId, setRoleId] = useState('builder')
  const role = roles.find((r) => r.id === roleId)!
  const level = (r: string, t: string) => permissionMatrix.find((p) => p.roleId === r && p.teamId === t)?.level ?? 'None'

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <Card title="Permission matrix" subtitle="Roles × teams. Select a role for its full definition." actions={<Prov kind="validate" />} bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[0.72rem] uppercase tracking-wide text-slate-500">
                <th className="px-4 py-2 font-medium">Role</th>
                {teams.map((t) => <th key={t.id} className="px-2 py-2 font-medium">{t.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setRoleId(r.id)}
                  className={cn('cursor-pointer border-b border-slate-100 last:border-0', roleId === r.id ? 'bg-accent-50/60' : 'hover:bg-slate-50')}
                >
                  <td className="px-4 py-2.5 font-medium text-ink-900">
                    <span className={cn('border-l-2 pl-2', roleId === r.id ? 'border-accent-600' : 'border-transparent')}>{r.name}</span>
                  </td>
                  {teams.map((t) => {
                    const l = level(r.id, t.id)
                    return <td key={t.id} className="px-2 py-2.5">{l === 'None' ? <span className="text-slate-300">—</span> : <Badge tone={levelTone[l]}>{l}</Badge>}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-100 px-4 py-2.5 text-[0.75rem] text-slate-500">
          <span>Build rights require builder certification.</span>
          <span>Approve = release approval for that team’s lane.</span>
          <span>Administer = configuration, not business data.</span>
        </div>
      </Card>

      <Card title={role.name} subtitle={role.purpose}>
        <dl className="space-y-3 text-sm">
          <Row k="Permitted activities"><ul className="list-inside list-disc space-y-0.5">{role.permitted.map((p) => <li key={p}>{p}</li>)}</ul></Row>
          <Row k="Build permissions">{role.buildPermissions}</Row>
          <Row k="Data boundaries">{role.dataBoundaries}</Row>
          <Row k="Approval authority">{role.approvalAuthority}</Row>
          <Row k="Production deploy">{role.productionDeploy}</Row>
          <Row k="Required training">{role.requiredTraining}</Row>
          <Row k="Accountable owner">{role.accountableOwner}</Row>
          <Row k="Escalation path">{role.escalation}</Row>
        </dl>
      </Card>
    </div>
  )
}

function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">{k}</dt>
      <dd className="mt-0.5 text-slate-800">{children}</dd>
    </div>
  )
}
