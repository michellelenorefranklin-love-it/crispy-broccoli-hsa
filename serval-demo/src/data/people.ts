import type { Persona, PersonaId } from '../types'

// All people are fictional.
export const people: Record<PersonaId, Persona> = {
  jordan: {
    id: 'jordan', name: 'Jordan Taylor', initials: 'JT', title: 'Financial Analyst', department: 'Corporate Finance',
    location: 'New York', managerId: 'alex', day: 3, channels: ['Web portal', 'Microsoft Teams'],
    blurb: 'New hire on day 3. Needs reporting access, training, and a working laptop to do the job.',
  },
  alex: {
    id: 'alex', name: 'Alex Morgan', initials: 'AM', title: 'Finance Manager', department: 'Corporate Finance',
    location: 'New York', channels: ['Microsoft Teams'],
    blurb: "Jordan's manager. Approves access for the team, ideally inside Teams instead of email.",
  },
  dana: {
    id: 'dana', name: 'Dana Brooks', initials: 'DB', title: 'FinReport Application Owner', department: 'Finance Systems',
    location: 'Charlotte', channels: ['Web portal', 'Microsoft Teams'],
    blurb: 'Owns who can do what in FinReport. Approves elevated access and recertifies it.',
  },
  marcus: {
    id: 'marcus', name: 'Marcus Lee', initials: 'ML', title: 'IAM Lead', department: 'Identity & Access Management',
    location: 'New York', channels: ['Web portal'],
    blurb: 'Owns access policy, segregation-of-duties rules, and exception handling.',
  },
  priya: {
    id: 'priya', name: 'Priya Shah', initials: 'PS', title: 'Service Desk Analyst', department: 'IT Service Desk',
    location: 'Jersey City', channels: ['ServiceNow workspace'],
    blurb: 'Handles escalations with full context instead of re-triaging from scratch.',
  },
  sam: {
    id: 'sam', name: 'Sam Rivera', initials: 'SR', title: 'HR Ops Workflow Builder', department: 'HR Operations',
    location: 'Chicago', channels: ['Web portal'],
    blurb: 'Certified team builder for HR Operations. Builds within assigned permissions.',
  },
  elena: {
    id: 'elena', name: 'Elena Novak', initials: 'EN', title: 'AI Governance Lead', department: 'Technology Risk',
    location: 'New York', channels: ['Web portal'],
    blurb: 'Sets guardrails, risk tiers, and release controls for AI workflows.',
  },
  chris: {
    id: 'chris', name: 'Chris Okafor', initials: 'CO', title: 'Chief Information Officer', department: 'Technology',
    location: 'New York', channels: ['Microsoft Teams'],
    blurb: 'Executive sponsor. Cares about adoption, control health, and value the business will sign off on.',
  },
}

export const approverPersonas: PersonaId[] = ['alex', 'dana', 'marcus']
