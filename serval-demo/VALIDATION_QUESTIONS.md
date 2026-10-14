# Questions to validate with the Client and vendors

Use these in discovery to turn the POC from a visualization into a target-state design. The most useful follow-up to any answer is: **"What makes you believe that?"**

## Opening questions (Why · Who · How)

1. **Why:** Why is this change happening, and what does success look like?
2. **Who:** Who will be most affected by this change, and how?
3. **How:** What will people need to adopt and sustain this change?

## The three critical questions

1. **What work do you intend to automate, and how will that change employees' roles and responsibilities?** This surfaces workforce impacts, process redesign, and likely resistance.
2. **How will ServiceNow and Serval work together in the future-state employee and service desk experience?** This clarifies the user journey, integration points, overlapping capabilities, and changes to support channels.
3. **What decisions will AI be permitted to make independently, and where will human oversight remain mandatory?** This defines training, trust, governance, and accountability requirements.

## Scope

- Is the first phase IT service management only, or are HR onboarding and broader employee services in scope? When do Finance, Procurement, and Legal follow?
- Which business unit or population would make the best controlled pilot?
- Which existing support channels (email, phone, walk-up, local mailboxes) will be retired, and when?

## Serval + ServiceNow integration

- Overlay or consolidated? Which system is the record for incidents, requests, catalog items, and access records, now and in 24 months?
- Which Serval capabilities are licensed or planned (helpdesk agent, workflow builder, access management, access reviews)?
- How will two-way sync work for the Client's ServiceNow instance, and which customisations could affect it?
- Will the assistant be embedded in the ServiceNow portal, Teams, or both? What about Slack and email?
- How does the service desk agent workspace change? Where do analysts work?
- Which connectors exist for the Client's HRIS, identity provider, device management, LMS, and finance applications?
- Where is data processed and stored? What are the residency, retention, and model-training terms?
- How are audit logs exported to the Client's SIEM and GRC tools, and for how long are they kept?

## Identity, access, and controls

- Does a role model exist that can drive birthright access for roles like Financial Analyst?
- Where are segregation-of-duties rules kept, and can a workflow check them at request time?
- Who are the authorised approvers for privileged financial access? Is just-in-time access acceptable to Audit?
- How should access reviews and recertifications work with Serval in the loop?
- What identity-verification standard applies before account-recovery actions?

## Decision rights and federated governance

- What can teams configure themselves, and what must be centrally reviewed, tested, or approved?
- Who owns business rules, approval paths, SLAs, and exceptions for each process?
- How do the illustrative risk tiers map to the Client's formal risk taxonomy and model-risk policy?
- What evidence does Risk need to approve a High-tier workflow? What review SLAs are realistic?
- Who can deploy to production? Which change-control process applies?
- What happens to a workflow when its owner leaves?

## Workforce and change

- How will service desk analysts' responsibilities and performance measures change?
- Which new roles are needed (workflow builders, knowledge owners, AI operations)? Where do they sit?
- How will workforce implications be communicated honestly and early? Who in HR owns this?
- Which groups have lower digital confidence and need extra support?
- Is there an existing champion network to build on?

## Baseline data and value

- What baselines exist for resolution time, first-contact resolution, access-request cycle time, onboarding delays, satisfaction, and repeat incidents?
- Can ticket history be analysed for automation opportunities? How far back, and at what quality?
- Who in the business will validate benefits, and on what cadence?
- Which balancing metrics (quality, repeat incidents, satisfaction, control exceptions) will the steering committee hold the program to?
