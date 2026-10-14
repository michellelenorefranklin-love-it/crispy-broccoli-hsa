import type { Incident } from '../types'

export const knowledgeArticles = {
  vpn: {
    id: 'KB0012044', title: 'VPN won’t connect on a managed laptop', lastReviewed: '14 months ago', owner: 'Network Services',
    steps: [
      'Confirm you are on a trusted network (not a captive-portal hotel or café network).',
      'Quit the VPN client fully and reopen it.',
      'Sign out and back in to refresh your device certificate.',
    ],
  },
  password: { id: 'KB0010311', title: 'Reset your password with self-service', lastReviewed: '2 months ago', owner: 'IAM' },
  mfa: { id: 'KB0010987', title: 'Unexpected MFA prompts: what to do', lastReviewed: '3 weeks ago', owner: 'Information Security' },
}

export const seedIncidents: Incident[] = [
  {
    id: 'INC0091688', title: 'Outlook calendar not syncing on mobile', requester: 'R. Patel (Wealth Ops)', priority: 'P4', status: 'In progress',
    assignmentGroup: 'Service Desk L1', channel: 'Teams', opened: '08:41',
    aiSummary: 'Mobile calendar stopped syncing after phone OS update yesterday. Desktop fine. Re-added account once; no change.',
    suggestedArticle: 'KB0011520 — Re-enrol mobile device after OS update', nextStep: 'Guide user through device re-enrolment (≈5 min).',
    escalationReason: 'Self-service steps exhausted', humanReview: 'Priya reviewing', outcome: '—',
  },
  {
    id: 'INC0091702', title: 'Shared drive permission for audit folder', requester: 'M. Chen (Internal Audit)', priority: 'P3', status: 'Awaiting human review',
    assignmentGroup: 'Service Desk L1', channel: 'Portal', opened: '08:57',
    aiSummary: 'Requesting write access to a restricted audit folder. Folder owner is not the requester’s manager. Not an approved self-service pattern.',
    suggestedArticle: 'KB0010440 — Requesting access to restricted shares', nextStep: 'Route to folder owner for approval; do not grant from service desk.',
    escalationReason: 'Access to restricted data — human decision required', humanReview: 'Pending', outcome: '—',
  },
  {
    id: 'INC0091715', title: 'Excel add-in crashes when refreshing FinReport data', requester: 'L. Gomez (Corporate Finance)', priority: 'P3', status: 'New',
    assignmentGroup: 'Finance Systems L2', channel: 'Teams', opened: '09:03',
    aiSummary: '3 similar reports in 24h, all on add-in v4.2. Likely a known defect. Suggest linking to a problem record.',
    suggestedArticle: 'KB0012101 — FinReport Excel add-in known issues', nextStep: 'Link to problem PRB0004410; offer web-report workaround.',
    escalationReason: 'Pattern across multiple users', humanReview: 'Not started', outcome: '—',
  },
  {
    id: 'INC0091721', title: 'Printer on 14th floor offline', requester: 'K. Wright (Legal)', priority: 'P4', status: 'Resolved',
    assignmentGroup: 'Service Desk L1', channel: 'Portal', opened: '09:05',
    aiSummary: 'Resolved in self-service: assistant redirected to nearest available printer and logged a facilities ticket.',
    suggestedArticle: 'KB0009012 — Find a nearby printer', nextStep: 'None — resolved.',
    escalationReason: '—', humanReview: 'Sampled for quality (pass)', outcome: 'Resolved by assistant',
  },
]

export const vpnIncident: Incident = {
  id: 'INC0091734', title: 'VPN fails to connect — device certificate not renewing', requester: 'Jordan Taylor (Corporate Finance)', priority: 'P3', status: 'Escalated',
  assignmentGroup: 'Network Services L2', channel: 'Web portal', opened: '—',
  aiSummary: 'New hire (day 3) on loaner laptop LT-NY-4471. VPN fails at certificate step. KB0012044 steps tried (client restart, sign-out). Safe diagnostic: device certificate expired, auto-renewal failed. No recent password change.',
  suggestedArticle: 'KB0012044 — VPN won’t connect (flagged: last reviewed 14 months ago)', nextStep: 'Re-issue device certificate for LT-NY-4471; confirm loaner is in the correct device group.',
  escalationReason: 'Fix requires device-management rights the assistant does not have', humanReview: 'Assigned to Priya Shah', outcome: '—',
}

export const securityIncident: Incident = {
  id: 'INC0091802', title: 'Possible account compromise — unsolicited MFA prompt + FinReport changes', requester: 'Jordan Taylor (Corporate Finance)', priority: 'P1', status: 'Escalated',
  assignmentGroup: 'Security Operations (SOC)', channel: 'Web portal', opened: '—',
  aiSummary: 'User reports an MFA prompt they did not trigger, followed by FinReport looking different. Self-service stopped. No troubleshooting attempted. User told not to approve further prompts.',
  suggestedArticle: 'KB0010987 — Unexpected MFA prompts', nextStep: 'SOC to review sign-in logs, revoke sessions if confirmed, contact user by phone.',
  escalationReason: 'Possible compromise — security decisions are never self-service', humanReview: 'SOC on-call paged', outcome: '—',
}
