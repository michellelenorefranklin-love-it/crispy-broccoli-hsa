// Deterministic, scripted assistant. No model, no network.
// Free text is matched by keyword to the nearest scripted intent; anything else gets an honest fallback.
import type { BehindScenes, ChatMessage, ReasonStep, ReasonStepStatus } from '../types'
import type { DemoState } from '../store/store'
import { accessTemplates } from '../data/access'
import { knowledgeArticles } from '../data/support'
import { uid } from '../lib/util'

type Get = () => DemoState

export const suggestedPrompts = [
  'Help me get started',
  'I need access to FinReport',
  'My VPN isn’t connecting',
  'What training do I need?',
  'Where is my access request?',
  'Connect me to a human',
]

const R = (
  steps: [string, ReasonStepStatus?][],
): ReasonStep[] => {
  const labels = ['Understood intent', 'Checked knowledge / policy', 'Proposed action', 'Approval needed?', 'Submitted / Escalated', 'Next steps']
  return labels.map((label, i) => ({ label, value: steps[i]?.[0] ?? '—', status: steps[i]?.[1] ?? 'done' }))
}

const msg = (m: Omit<ChatMessage, 'id' | 'from' | 'ts'>, ts: string): ChatMessage => ({ id: uid('m'), from: 'assistant', ts, ...m })

const bs = (b: BehindScenes) => b

export const welcomeMessage = (): ChatMessage => ({
  id: 'm-welcome', from: 'assistant', ts: '09:12', actionClass: 'Inform',
  text: 'Good morning, Jordan. I can help with onboarding, access, IT issues, and training, and I can connect you to a person at any time. What do you need?',
})

const MATCHERS: [string, RegExp][] = [
  ['human', /\b(human|person|someone|agent|real person|talk to|speak to|call me)\b/i],
  ['security', /(mfa prompt|didn.?t trigger|did not trigger|phish|suspicious|compromis|hack|looks different|weird (login|prompt)|not me)/i],
  ['password', /(password|locked out|lock(ed)? out|unlock|can.?t (log|sign) ?in|reset my account)/i],
  ['payments', /(payment|payrelease|release system|treasury)/i],
  ['journal', /(journal|post(ing)? |write access|edit access|quarter.?end close)/i],
  ['status', /(where is|status|track|update on|progress of)/i],
  ['vpn', /(vpn|remote access|can.?t connect|not connecting|network)/i],
  ['finreport', /(finreport|finance report|reporting platform|reporting tool|\baccess\b)/i],
  ['training', /(training|course|module|learn|compliance)/i],
  ['onboarding', /(get started|set ?up|starting|onboard|everything|new here|first week|day one)/i],
  ['laptop', /(laptop|equipment|computer|monitor|device)/i],
  ['thanks', /^(thanks|thank you|great|perfect|ok|okay)\b/i],
]

export const matchIntent = (text: string): string => {
  for (const [k, re] of MATCHERS) if (re.test(text)) return k
  return 'fallback'
}

export function respond(input: { text: string; intent?: string }, get: Get): ChatMessage[] {
  const intent = input.intent ?? matchIntent(input.text)
  const ts = get().now()
  const s = get()

  if (intent.startsWith('info:')) {
    const id = intent.slice(5)
    s.provideInfo(id)
    const req = get().accessRequests.find((r) => r.id === id)
    return [msg({
      actionClass: 'Initiate workflow',
      text: `Thanks. I've added that to ${req?.ritm ?? 'your request'} and sent it back to ${req?.nextOwner ?? 'the approver'}. You don't need to resubmit.`,
      reasoning: R([['Provide requested info'], ['Approver asked for entities + duration'], ['Update justification'], ['Yes — returned to approver', 'needed'], ['Updated ' + (req?.ritm ?? '')], ['Wait for decision']]),
    }, ts)]
  }

  switch (intent) {
    case 'onboarding': {
      s.setTask('ob-needs', { status: 'Done' })
      const req = s.submitAccess('standard', 'assistant')
      s.log({ actor: 'Serval assistant', actorType: 'AI agent', action: 'Generated personalised onboarding checklist from role + worker record', object: 'Jordan Taylor', system: 'Serval' })
      s.log({ actor: 'Serval assistant', actorType: 'AI agent', action: 'Flagged bottleneck: equipment back-ordered; notified End User Services', object: 'REQ0031877', system: 'ServiceNow' })
      return [msg({
        actionClass: 'Initiate workflow',
        text: 'Here’s your personalised checklist for a Financial Analyst in Corporate Finance. I’ve started what I can. Anything involving access waits for the right person to approve.',
        bullets: [
          '✓ Email, Teams, and single sign-on: done (Day 1)',
          '⚠ Laptop: back-ordered at the New York depot. You’re on a loaner; revised date is Day 5. I’ve flagged it to End User Services.',
          `→ FinReport (read-only): your role is eligible. I’ve submitted ${req.ritm}; Alex Morgan needs to approve before anything is provisioned.`,
          '→ Training: Information Security Essentials in progress; Market Abuse & Insider Information due Day 10.',
          '→ Week-1 check-in with Alex: I’ve suggested Thursday 10:00 in Teams.',
        ],
        reasoning: R([['Onboarding help, Corporate Finance'], ['Role model + worker record + onboarding policy'], ['Checklist; start eligible items'], ['Yes — manager for FinReport', 'needed'], [`Submitted ${req.ritm}`], ['Alex approves; laptop Day 5']]),
        chips: [
          { label: 'Where is my access request?', send: 'Where is my access request?' },
          { label: 'What training do I need?', send: 'What training do I need?' },
          { label: 'Connect me to a human', send: 'Connect me to a human' },
        ],
        behind: bs({
          workflow: 'New-hire onboarding orchestration + FinReport read-only access', owner: 'Sam Rivera (HR Ops) / Marcus Lee (IAM)', riskTier: 'Medium',
          approvals: ['Manager (Alex Morgan) for FinReport'], record: `${req.ritm} created · REQ0031877 updated`,
          auditEvents: ['Checklist generated', 'Access request classified + policy-checked', 'Routed to manager', 'Equipment bottleneck flagged'],
        }),
      }, ts)]
    }

    case 'finreport': {
      const existing = get().accessRequests.find((r) => r.scenario === 'standard')
      if (existing) {
        return [msg({
          actionClass: 'Inform',
          text: `You already have a FinReport read-only request (${existing.ritm}). Status: ${existing.status}. Next: ${existing.nextOwner}. Do you also need to post journals?`,
          reasoning: R([['FinReport access'], ['Found existing request'], ['Avoid duplicate'], ['—', 'skipped'], ['Nothing new submitted', 'skipped'], ['Confirm if more is needed']]),
          chips: [{ label: 'Yes — journal posting for quarter-end', intent: 'journal' }, { label: 'No, that’s all', intent: 'thanks' }],
        }, ts)]
      }
      return [msg({
        actionClass: 'Recommend', rai: 'Insufficient information → clarifying question',
        text: 'I can help with FinReport. To request the minimum access you need: what will you use it for?',
        reasoning: R([['FinReport access'], ['Two roles possible; need purpose', 'needed'], ['Ask one clarifying question'], ['Depends on role', 'needed'], ['Not yet — waiting for you', 'skipped'], ['Choose an option below']]),
        chips: [
          { label: 'Running reports (read-only)', intent: 'finreport-ro' },
          { label: 'Posting journals for quarter-end', intent: 'journal' },
        ],
      }, ts)]
    }

    case 'finreport-ro': {
      const req = s.submitAccess('standard', 'assistant')
      const t = accessTemplates.standard
      return [msg({
        actionClass: 'Initiate workflow',
        text: `Done — I've submitted ${req.ritm} for ${t.app} ${t.role}. ${t.policyPlain} Alex Morgan will get an approval card in Teams. Nothing is provisioned until Alex approves.`,
        reasoning: R([['FinReport read-only'], ['Eligible; SoD clear; training OK'], ['Submit request'], ['Yes — Alex Morgan (manager)', 'needed'], [`Submitted ${req.ritm}`], ['You’ll get an update here']]),
        behind: bs({ workflow: 'FinReport read-only access', owner: 'Marcus Lee (IAM)', riskTier: 'Medium', approvals: ['Manager'], record: `${req.ritm} (ServiceNow RITM)`, auditEvents: ['Classified', 'Policy + SoD checked', 'Routed to manager'] }),
        chips: [{ label: 'Where is my access request?', send: 'Where is my access request?' }],
      }, ts)]
    }

    case 'journal': {
      const req = s.submitAccess('elevated', 'assistant')
      return [msg({
        actionClass: 'Initiate workflow', rai: 'Conflicting policies → stop, explain, route',
        text: `Posting journals is privileged financial access, so I've submitted ${req.ritm} with ${req.timeBound} rather than standing access. Three people decide: Alex Morgan (manager), Dana Brooks (FinReport owner), and Marcus Lee (IAM).`,
        callout: { tone: 'warn', title: 'Two policies point different ways — I haven’t resolved this myself', body: 'The quarter-end access policy allows time-bound journal posting for analysts. The training policy expects Market Abuse & Insider Information to be complete first (yours is due Day 10). I’ve flagged this for the approvers to decide.' },
        reasoning: R([['Journal posting (write)'], ['Privileged; policy conflict on training', 'needed'], [`Time-bound ${req.timeBound}`], ['Yes — manager + app owner + IAM', 'needed'], [`Submitted ${req.ritm} (flagged)`], ['Approvers decide; you’re updated here']]),
        behind: bs({ workflow: 'FinReport journal posting (JIT)', owner: 'Dana Brooks (app owner)', riskTier: 'High', approvals: ['Manager', 'App owner', 'IAM'], record: `${req.ritm} (ServiceNow RITM)`, auditEvents: ['Classified as privileged', 'Policy conflict flagged', 'Sequenced routing started'] }),
      }, ts)]
    }

    case 'payments': {
      const req = s.submitAccess('blocked', 'assistant')
      const t = accessTemplates.blocked
      return [msg({
        actionClass: 'Recommend', rai: 'Unauthorized access request → decline, explain, offer a path',
        text: `I can't request this for you. ${t.policyPlain}`,
        callout: { tone: 'bad', title: 'Segregation-of-duties conflict', body: `Your role includes journal posting in FinReport. Payment release is restricted to Treasury Operations. I've sent the details to IAM (${req.ritm}) so a person can review. Nothing has been granted.` },
        bullets: t.alternatives,
        reasoning: R([['Payments release access'], ['SoD rule: journal posting + payment release', 'stopped'], ['Decline; offer alternatives'], ['Only IAM can consider an exception', 'needed'], [`Routed to IAM (${req.ritm})`], ['Use an alternative below']]),
        behind: bs({ workflow: 'Access request — SoD check', owner: 'Marcus Lee (IAM)', riskTier: 'High', approvals: ['IAM review (exception path only)'], record: `${req.ritm} — blocked, routed to IAM`, auditEvents: ['Classified', 'SoD check FAILED', 'Stopped before provisioning', 'Routed to IAM'] }),
        chips: [{ label: 'Connect me to a human', send: 'Connect me to a human' }],
      }, ts)]
    }

    case 'status': {
      const reqs = get().accessRequests.filter((r) => r.requesterId === 'jordan')
      const incs = get().incidents.filter((i) => i.requester.startsWith('Jordan'))
      if (!reqs.length && !incs.length) {
        return [msg({
          actionClass: 'Inform',
          text: 'You don’t have any open access requests yet. Your laptop request (REQ0031877) is back-ordered, with a revised date of Day 5.',
          reasoning: R([['Request status'], ['Checked ServiceNow records'], ['Report status'], ['—', 'skipped'], ['—', 'skipped'], ['Want me to request access?']]),
          chips: [{ label: 'I need access to FinReport', send: 'I need access to FinReport' }],
        }, ts)]
      }
      return [msg({
        actionClass: 'Inform',
        text: 'Here’s where things stand, live from the request records:',
        bullets: [
          ...reqs.map((r) => `${r.ritm} · ${r.app} ${r.role}: ${r.status}. Next: ${r.nextAction} (${r.nextOwner}).`),
          ...incs.map((i) => `${i.id} · ${i.title}: ${i.status} — ${i.assignmentGroup}.`),
          'REQ0031877 · Laptop: back-ordered; revised Day 5.',
        ],
        reasoning: R([['Request status'], ['Read ServiceNow RITM/INC records'], ['Report status + who’s next'], ['—', 'skipped'], ['—', 'skipped'], ['Nudge approver if overdue']]),
        behind: bs({ workflow: 'Status lookup (read-only)', owner: 'Service Management', riskTier: 'Low', approvals: [], record: 'Read only — no records changed', auditEvents: ['Status read'] }),
      }, ts)]
    }

    case 'vpn': {
      const kb = knowledgeArticles.vpn
      s.log({ actor: 'Serval assistant', actorType: 'AI agent', action: `Retrieved ${kb.id} (flagged: last reviewed ${kb.lastReviewed})`, object: 'VPN troubleshooting', system: 'Serval' })
      return [msg({
        actionClass: 'Recommend', rai: 'Possibly outdated knowledge → flag article age, offer human',
        text: 'Let’s fix that. I can see you’re on loaner laptop LT-NY-4471 in New York, and there were no password changes in the last 24 hours. Try these steps:',
        bullets: kb.steps,
        callout: { tone: 'warn', title: `Heads up: ${kb.id} was last reviewed ${kb.lastReviewed}`, body: 'The steps are still standard, but the article may be out of date. I’ve flagged it to its owner (Network Services). You can ask for a person at any time.' },
        reasoning: R([['VPN not connecting'], [`Device context + ${kb.id}`], ['Guided steps (safe)'], ['No — informational', 'skipped'], ['Not yet', 'skipped'], ['Tell me if it worked']]),
        behind: bs({ workflow: 'VPN guided troubleshooting', owner: 'Priya Shah (Service Desk)', riskTier: 'Low', approvals: [], record: 'No record yet — created only if escalation is needed', auditEvents: ['Device context read (read-only)', 'Knowledge retrieved; staleness flagged'] }),
        chips: [
          { label: 'That fixed it', intent: 'vpn-fixed' },
          { label: 'Still not connecting', intent: 'vpn-broken' },
          { label: 'Connect me to a human', send: 'Connect me to a human' },
        ],
      }, ts)]
    }

    case 'vpn-fixed': {
      s.set({ selfServiceResolved: get().selfServiceResolved + 1 })
      s.log({ actor: 'Serval assistant', actorType: 'AI agent', action: 'Resolved in self-service; interaction summary logged', object: 'VPN troubleshooting', system: 'ServiceNow' })
      return [msg({
        actionClass: 'Inform',
        text: 'Great, you’re connected. I’ve logged a short summary so the service desk can see what worked. If it drops again, just tell me and I’ll pick up where we left off.',
        callout: { tone: 'ok', title: 'Resolved in self-service', body: 'Interaction summary saved to ServiceNow (no incident needed). Counted in self-service completion, and checked against repeat incidents over the next 7 days.' },
        reasoning: R([['Confirmation'], ['—', 'skipped'], ['Close the interaction'], ['—', 'skipped'], ['Summary logged'], ['Repeat-incident check in 7 days']]),
      }, ts)]
    }

    case 'vpn-broken': {
      s.log({ actor: 'Serval assistant', actorType: 'AI agent', action: 'Ran safe read-only diagnostic: device certificate expired', object: 'LT-NY-4471', system: 'Device management' })
      s.log({ actor: 'Certificate renewal workflow', actorType: 'System', action: 'FAILED: renewal request timed out (simulated)', object: 'LT-NY-4471', system: 'Device management' })
      const inc = s.openIncident('vpn')
      return [msg({
        actionClass: 'Initiate workflow', rai: 'Workflow failure → tell the employee, create incident, no silent failure',
        text: `I ran a safe, read-only diagnostic: your laptop's device certificate has expired. I tried the automatic renewal, but that workflow failed. I've escalated to Network Services with everything we've tried, so you won't need to repeat yourself.`,
        callout: { tone: 'warn', title: `Incident ${inc.id} created`, body: `Priority P3 · Network Services L2 · Priya Shah reviewing. Typical response: within 2 business hours. Meanwhile, FinReport web is available on the office network.` },
        reasoning: R([['VPN still failing'], ['Diagnostic: certificate expired', 'done'], ['Attempt auto-renewal → failed', 'stopped'], ['No — but needs device-admin rights', 'needed'], [`Escalated ${inc.id}`], ['Priya contacts you']]),
        behind: bs({ workflow: 'VPN guided troubleshooting → escalation', owner: 'Priya Shah (Service Desk)', riskTier: 'Low', approvals: [], record: `${inc.id} (ServiceNow incident)`, auditEvents: ['Read-only diagnostic', 'Renewal workflow failed (logged)', 'Incident created with full context'] }),
        chips: [{ label: 'Where is my request?', send: 'Where is my access request?' }],
      }, ts)]
    }

    case 'password': {
      s.log({ actor: 'Serval assistant', actorType: 'AI agent', action: 'Identity verification required before account action; MFA challenge sent (simulated)', object: 'jordan.taylor', system: 'IdP' })
      return [msg({
        actionClass: 'Recommend',
        text: 'I can help, but first I need to confirm it’s you. I’ve sent a verification prompt to your registered device (simulated). I won’t do anything with your account until it’s approved.',
        callout: { tone: 'info', title: 'Identity verification gate', body: 'No passwords are ever shown or typed into chat. MFA cannot be skipped by the assistant.' },
        reasoning: R([['Password / account help'], ['Account actions need verified identity', 'needed'], ['Send MFA challenge'], ['Yes — you, via MFA', 'needed'], ['Waiting for verification', 'skipped'], ['Approve the prompt on your phone']]),
        chips: [{ label: 'I approved the prompt', intent: 'pwd-verified' }, { label: 'I didn’t get a prompt', intent: 'pwd-noprompt' }],
      }, ts)]
    }
    case 'pwd-verified': {
      s.log({ actor: 'Identity provider', actorType: 'System', action: 'MFA verified', object: 'jordan.taylor', system: 'IdP' })
      s.log({ actor: 'Serval assistant', actorType: 'AI agent', action: 'Sent self-service reset link (approved action under policy)', object: 'jordan.taylor', system: 'IdP' })
      s.set({ selfServiceResolved: get().selfServiceResolved + 1 })
      return [msg({
        actionClass: 'Execute approved action',
        text: 'Verified, thanks. I’ve sent a secure reset link to your registered device. You’ll set the new password there. I never see it.',
        reasoning: R([['Password reset'], ['MFA verified'], ['Send reset link'], ['Pre-approved under policy after MFA'], ['Link sent'], ['Set password on device']]),
        behind: bs({ workflow: 'Self-service password reset', owner: 'Marcus Lee (IAM)', riskTier: 'Medium', approvals: ['Identity verification (MFA)'], record: 'Interaction logged; no ticket needed', auditEvents: ['MFA challenge', 'MFA verified', 'Reset link issued'] }),
      }, ts)]
    }
    case 'pwd-noprompt': {
      const inc = s.openIncident('handoff', 'Employee needs account help but did not receive MFA prompt. Identity NOT verified. Verify by callback to number on HR record before any account action.')
      return [msg({
        actionClass: 'Initiate workflow',
        text: `No problem. Since I can't verify you here, I've passed this to the service desk (${inc.id}). They'll call you back on the number in your HR record to verify you before changing anything.`,
        reasoning: R([['Password help, no MFA'], ['Cannot verify identity', 'stopped'], ['Route to human verification'], ['Yes — service desk verifies', 'needed'], [`Handed off (${inc.id})`], ['Expect a callback']]),
      }, ts)]
    }

    case 'security': {
      const inc = s.openIncident('security')
      return [msg({
        actionClass: 'Initiate workflow', rai: 'Sensitive / high-risk → escalate, no self-service',
        text: 'Thanks for telling me. This could be someone trying to get into your account, so I’ve stopped self-service and sent it straight to Security Operations as a priority.',
        callout: { tone: 'bad', title: `Security incident ${inc.id} · P1 · Security Operations`, body: 'Right now: don’t approve any more prompts, and don’t change anything in FinReport. Keep your laptop on. A security analyst will call you within 15 minutes on the number in your HR record. You can track it here.' },
        reasoning: R([['Possible account compromise'], ['Security policy: no self-service', 'stopped'], ['Escalate immediately'], ['Security decides', 'needed'], [`P1 raised ${inc.id}`], ['SOC calls you within 15 min']]),
        behind: bs({ workflow: 'Security incident intake', owner: 'Information Security (SOC)', riskTier: 'High', approvals: ['SOC analyst decides all actions'], record: `${inc.id} (ServiceNow security incident, P1)`, auditEvents: ['Self-service halted', 'P1 incident created', 'SOC paged'] }),
      }, ts)]
    }

    case 'training': {
      return [msg({
        actionClass: 'Inform',
        text: 'You have three mandatory modules from the Learning system:',
        bullets: [
          '✓ Code of Conduct: complete',
          '→ Information Security Essentials: in progress (40 min left), due Day 7',
          '→ Market Abuse & Insider Information: not started, due Day 10. This one matters for your role: it’s a prerequisite for privileged FinReport access.',
        ],
        reasoning: R([['Training requirements'], ['LMS assignments for role'], ['List with deadlines + why'], ['—', 'skipped'], ['—', 'skipped'], ['Start the next module']]),
        chips: [{ label: 'Why do I need Market Abuse training?', intent: 'training-why' }],
      }, ts)]
    }
    case 'training-why':
      return [msg({
        actionClass: 'Inform',
        text: 'As a Corporate Finance analyst you may see price-sensitive information before it’s public. The module covers what counts as inside information and how to handle it. The firm needs it complete before granting privileged finance access.',
        reasoning: R([['Training rationale'], ['Approved knowledge (Compliance)'], ['Explain'], ['—', 'skipped'], ['—', 'skipped'], ['Due Day 10']]),
      }, ts)]

    case 'laptop':
      return [msg({
        actionClass: 'Inform',
        text: 'Your standard finance laptop (REQ0031877) is back-ordered at the New York depot. Revised date: Day 5. Your loaner has the same security controls. I’ll message you when it ships.',
        reasoning: R([['Equipment status'], ['ServiceNow REQ0031877'], ['Report + revised date'], ['—', 'skipped'], ['—', 'skipped'], ['Notify on dispatch']]),
      }, ts)]

    case 'human': {
      const last = [...get().chat].reverse().find((m) => m.from === 'user' && !/human|person/i.test(m.text))
      const inc = s.openIncident('handoff', `Employee asked for a person. Last topic: “${last?.text ?? 'general help'}”. Day-3 new hire, Corporate Finance, NY. Open items: ${get().accessRequests.map((r) => r.ritm).join(', ') || 'none'}.`)
      return [msg({
        actionClass: 'Initiate workflow', rai: '“Talk to a human” → honoured immediately with context handoff',
        text: `Of course. I've connected you to the Service Desk (${inc.id}). Priya Shah has a summary of our conversation, so you won't have to repeat yourself.`,
        callout: { tone: 'info', title: 'Handoff summary sent', body: inc.aiSummary },
        reasoning: R([['Wants a person'], ['Honour immediately — no deflection'], ['Hand off with context'], ['—', 'skipped'], [`Handed off (${inc.id})`], ['Priya joins shortly']]),
        behind: bs({ workflow: 'Human handoff', owner: 'Service Desk', riskTier: 'Low', approvals: [], record: `${inc.id} (ServiceNow interaction)`, auditEvents: ['Handoff requested', 'Summary attached', 'Assigned to Service Desk L1'] }),
      }, ts)]
    }

    case 'thanks':
      return [msg({ actionClass: 'Inform', text: 'You’re welcome. I’m here if you need anything else.' }, ts)]

    default: {
      s.log({ actor: 'Serval assistant', actorType: 'AI agent', action: 'Unrecognised request; offered human routing', object: input.text.slice(0, 40), system: 'Serval' })
      return [msg({
        actionClass: 'Recommend',
        text: `I'm not confident I can help with that yet, and I'd rather not guess. I can route that to a person with what you've told me.`,
        reasoning: R([['Unclear intent', 'needed'], ['No approved knowledge match', 'stopped'], ['Offer a person'], ['—', 'skipped'], ['Not submitted', 'skipped'], ['Choose below']]),
        chips: [{ label: 'Connect me to a human', send: 'Connect me to a human' }, ...suggestedPrompts.slice(0, 3).map((p) => ({ label: p, send: p }))],
      }, ts)]
    }
  }
}

