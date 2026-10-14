import type { AdoptionMetric, Assumption, BenefitHypothesis, Decision } from '../types'

// Every number here is illustrative. None is a client baseline, product claim, or committed benefit.
export const metrics: AdoptionMetric[] = [
  { id: 'esat', label: 'Employee satisfaction (support)', value: '4.3 / 5', trend: '+0.4', good: 'up', group: 'Experience' },
  { id: 'trust', label: 'Employee trust in assistant', value: '71%', trend: '+9 pts', good: 'up', group: 'Experience' },
  { id: 'selfsvc', label: 'Self-service completion', value: '46%', trend: '+18 pts', good: 'up', balancing: 'repeat', group: 'Efficiency' },
  { id: 'fcr', label: 'First-contact resolution', value: '68%', trend: '+11 pts', good: 'up', balancing: 'quality', group: 'Efficiency' },
  { id: 'mttr', label: 'Median resolution time', value: '3.1 h', trend: '−42%', good: 'down', balancing: 'esat', group: 'Efficiency' },
  { id: 'esc', label: 'Escalation to human', value: '22%', trend: '−6 pts', good: 'down', balancing: 'quality', group: 'Efficiency' },
  { id: 'access', label: 'Access-request cycle time', value: '1.4 days', trend: '−58%', good: 'down', balancing: 'controls', group: 'Efficiency' },
  { id: 'onb', label: 'Onboarding tasks done by day 5', value: '84%', trend: '+21 pts', good: 'up', balancing: 'esat', group: 'Efficiency' },
  { id: 'repeat', label: 'Repeat incidents (7-day)', value: '6.2%', trend: '−0.8 pts', good: 'down', group: 'Quality' },
  { id: 'quality', label: 'AI-resolution quality (sampled)', value: '93%', trend: '+2 pts', good: 'up', group: 'Quality' },
  { id: 'prof', label: 'Training proficiency', value: '88%', trend: '+5 pts', good: 'up', group: 'Adoption' },
  { id: 'adopt', label: 'Active adoption (pilot, 30-day)', value: '62%', trend: '+14 pts', good: 'up', group: 'Adoption' },
  { id: 'compliance', label: 'Workflow compliance', value: '97%', trend: '+3 pts', good: 'up', group: 'Control health' },
  { id: 'owners', label: 'Workflows with named owners', value: '—', trend: 'live', good: 'up', group: 'Control health' },
  { id: 'reviews', label: 'Workflows with completed reviews', value: '—', trend: 'live', good: 'up', group: 'Control health' },
  { id: 'controls', label: 'Access control exceptions', value: '0', trend: 'flat', good: 'down', group: 'Control health' },
]

export interface BenefitInputs {
  annualTickets: number
  pctAutomatable: number
  pctAdoption: number
  minutesSaved: number
  loadedCostPerHour: number
  pctRedeployable: number
  pctCashable: number
}

export const defaultBenefitInputs: BenefitInputs = {
  annualTickets: 300000,
  pctAutomatable: 35,
  pctAdoption: 60,
  minutesSaved: 12,
  loadedCostPerHour: 55,
  pctRedeployable: 50,
  pctCashable: 20,
}

export const rampQuarters = [0.15, 0.35, 0.6, 0.8, 1.0, 1.0, 1.0, 1.0]

export const benefitHypotheses: BenefitHypothesis[] = [
  { id: 'bh1', hypothesis: 'Common IT issues resolve in self-service without a ticket to a person', baseline: 'Volume and resolution time by category (12 months)', target: 'Self-service completion ≥ 40% for in-scope categories', dataSource: 'ServiceNow incident data + assistant logs', owner: 'Head of Service Desk', cadence: 'Monthly', adoptionDependency: 'Employees start with the assistant', balancingMetric: 'Repeat incidents; satisfaction' },
  { id: 'bh2', hypothesis: 'Access requests complete faster without weakening controls', baseline: 'Request-to-provision cycle time; approval wait time', target: '−50% cycle time; zero control exceptions', dataSource: 'IdP + ServiceNow RITM + audit log', owner: 'IAM Lead', cadence: 'Monthly', adoptionDependency: 'Managers approve in Teams', balancingMetric: 'Access control exceptions; UAR findings' },
  { id: 'bh3', hypothesis: 'New hires are productive sooner', baseline: 'Days to full access + equipment; day-30 survey', target: '≥ 85% onboarding tasks done by day 5', dataSource: 'HRIS + onboarding workflow data', owner: 'HR Ops process owner', cadence: 'Quarterly', adoptionDependency: 'Hiring managers complete their steps', balancingMetric: 'New-hire satisfaction' },
  { id: 'bh4', hypothesis: 'Service desk capacity shifts to complex work', baseline: 'Time split by work type (sample)', target: '+25% time on complex/exception work', dataSource: 'Time study + ticket mix', owner: 'Head of Service Desk', cadence: 'Quarterly', adoptionDependency: 'Analysts trust AI summaries', balancingMetric: 'Analyst engagement; quality scores' },
  { id: 'bh5', hypothesis: 'Teams ship workflows faster without bottlenecking central IT', baseline: 'Request-to-release time for new automations', target: 'Fast lane ≤ 3 days; Standard ≤ 10 days', dataSource: 'Platform lifecycle data', owner: 'AI Governance Lead', cadence: 'Monthly', adoptionDependency: 'Builders certified; owners named', balancingMetric: '% workflows with owners and completed reviews' },
]

export const assumptions: Assumption[] = [
  { id: 'a1', text: 'Serval will initially run as an automation layer over ServiceNow, with ServiceNow as system of record.', area: 'Architecture', validateWith: 'Client architecture + Serval' },
  { id: 'a2', text: 'Microsoft Teams is the primary employee channel.', area: 'Channels', validateWith: 'Client EUC / collaboration team' },
  { id: 'a3', text: 'An HRIS hire event can trigger onboarding workflows.', area: 'Integration', validateWith: 'HR technology team' },
  { id: 'a4', text: 'A role model exists for Corporate Finance analysts that can drive birthright access.', area: 'Identity', validateWith: 'IAM' },
  { id: 'a5', text: 'SoD rules are maintained in a form that a workflow can check at request time.', area: 'Controls', validateWith: 'IAM + Risk' },
  { id: 'a6', text: 'Three risk tiers can be mapped to the client’s formal risk taxonomy.', area: 'Governance', validateWith: 'Technology Risk' },
  { id: 'a7', text: 'Ticket history is available for automation-opportunity analysis.', area: 'Data', validateWith: 'ServiceNow platform owner' },
  { id: 'a8', text: 'Scope will expand from IT/Security to HR, then Finance and Operations.', area: 'Scope', validateWith: 'Executive sponsors' },
]

export const decisions: Decision[] = [
  { id: 'd1', kind: 'Decision', decision: 'Integration model: overlay on ServiceNow, or progressive consolidation?', why: 'Determines system of record, channel strategy, and licensing', owner: 'CIO + Head of Service Management', by: 'End of discovery' },
  { id: 'd2', kind: 'Decision', decision: 'Initial scope: IT service desk only, or IT + HR onboarding (and later Finance, Procurement)?', why: 'Changes stakeholder impacts, OCM plan, and pilot design', owner: 'Executive sponsors', by: 'End of discovery' },
  { id: 'd3', kind: 'Decision', decision: 'What may AI do independently, and where is human oversight mandatory?', why: 'Sets decision rights, risk tiers, and the training/trust plan', owner: 'AI Governance Lead + CISO/CRO delegates', by: 'Design phase' },
  { id: 'd4', kind: 'Decision', decision: 'Federated governance: what can teams configure themselves vs. what is centrally reviewed?', why: 'Limits bottlenecks while keeping control', owner: 'AI Governance Lead + process owners', by: 'Design phase' },
  { id: 'd5', kind: 'Decision', decision: 'Which existing support channels are retired, and when?', why: 'Without a plan, old channels persist and adoption stalls', owner: 'Head of Service Management + Change lead', by: 'Before pilot' },
  { id: 'a-1', kind: 'Assumption to validate', decision: 'Teams is the primary employee channel', why: 'Shapes design, comms, and training', owner: 'EUC lead', by: 'Discovery' },
  { id: 'a-2', kind: 'Assumption to validate', decision: 'SoD rules can be checked at request time', why: 'Core to the access use case', owner: 'IAM Lead', by: 'Discovery' },
  { id: 'a-3', kind: 'Assumption to validate', decision: 'Baseline data exists for resolution time, access cycle time, onboarding delays, satisfaction', why: 'Value can’t be shown without baselines', owner: 'Service Management analytics', by: 'Discovery' },
  { id: 'q-1', kind: 'Discovery question', decision: 'What work do you intend to automate, and how will that change roles and responsibilities?', why: 'Surfaces workforce impacts, process redesign, and resistance', owner: 'Sponsor + HR', by: 'Week 1' },
  { id: 'q-2', kind: 'Discovery question', decision: 'How will ServiceNow and Serval work together in the future employee and service desk experience?', why: 'Clarifies journeys, integration points, overlap, and channel changes', owner: 'IT leadership', by: 'Week 1' },
  { id: 'q-3', kind: 'Discovery question', decision: 'Why is this change happening, what does success look like — and what makes you believe that?', why: 'Grounds the business case in evidence, not assumption', owner: 'Executive sponsors', by: 'Week 1' },
  { id: 'n-1', kind: 'Pilot next step', decision: 'Run a 2-week discovery: baselines, journeys, stakeholder map, decision rights', why: 'Turns this POC from a visualisation into a target-state design', owner: 'Consulting team + Client PMO', by: 'Next 2 weeks' },
  { id: 'n-2', kind: 'Pilot next step', decision: 'Select a pilot: one business unit (e.g., Corporate Finance) for onboarding + access + top IT issues', why: 'Small, measurable, controlled', owner: 'Sponsor + Change lead', by: 'Week 4' },
  { id: 'n-3', kind: 'Pilot next step', decision: 'Onboard HR Ops as the first federated builder team', why: 'Tests the operating model, not just the tool', owner: 'AI Governance Lead + HR Ops lead', by: 'Week 6' },
]
