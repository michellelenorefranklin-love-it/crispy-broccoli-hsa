# Power First, Then Pre-Lease: Strategic Power Procurement and Commercial Plan for a New Maryland Data Center

**Prepared for:** Chief Executive Officer and Board of Directors
**Prepared by:** Strategy advisory team
**Date:** 29 October 2026
**Status:** Board discussion document. Not investment advice. All figures marked *[E]* are planning estimates that must be replaced by quotes, tariffs and broker opinions before any capital commitment.

---

## How to read this report

Every material statement carries one of four tags:

| Tag | Meaning |
|---|---|
| **[F]** | Verified fact, with a cited public source and date (see Sources, section 13) |
| **[A]** | Working assumption chosen by us for planning; the board can change it |
| **[E]** | Estimate or industry range; directionally useful, not a quote |
| **[D]** | Requires diligence before it can be relied on |

We have **no** information on the project's site, land control, zoning status, utility application, signed electric service agreement, design capacity or capital structure. The report therefore works with three capacity scenarios and treats "do we have a dated, firm utility commitment?" as the gating question for the whole plan. We have not invented customer commitments, utility capacity, approvals or project economics. Named companies in this report are **prospects or counterparties to approach**, not confirmed opportunities.

**Capacity vocabulary used throughout** (these are not interchangeable):

- **Utility service capacity (MVA/MW):** what the utility agrees to deliver at the meter.
- **Total facility power (MW):** IT load plus cooling, electrical losses and building load. Facility power = IT load × PUE.
- **Critical IT capacity / sellable capacity (MW):** what can be leased to customers, after redundancy.
- **Contracted capacity (MW):** what customers have signed for (may ramp over time).
- **Utilized IT load (MW):** what customers actually draw. Typically 50–80% of contracted for enterprise; 70–90% for AI training *[E]*.

---

## 1. Executive summary and recommended strategic direction

### The situation in one paragraph

Mid-Atlantic demand is real and acute: Northern Virginia vacancy was 0.2% in H1 2026, down from 0.7% a year earlier, with asking rents rising in every deal-size band *[F: CBRE, Sep 2026]*. That scarcity is the opportunity. But the binding constraint is **power, not customers**, and Maryland in 2026 is a harder place to energize a data center than it was two years ago. PJM's 2027/28 capacity auction cleared at its $333.44/MW-day cap and fell 6,623 MW short of the reliability requirement, with nearly 5,100 MW of the forecast peak increase attributed to data centers *[F: PJM, Dec 2025]*. Maryland enacted the Next Generation Energy Act (2025) and the Utility RELIEF Act (Chapter 353, 2026), which create a large-load tariff, pass PJM capacity costs to large loads, require PSC registration and energy/water reporting, and (per the enacted bill as reported) lower the large-load threshold to 25 MW and a 60% load factor *[F: Mintz, Oct 2026; D: confirm final text of Ch. 353]*. Utilities filed large-load tariffs by 1 September 2026; the rate design is now being contested at the PSC *[F]*. Maryland commercial electricity prices rose about 19–21% year on year to roughly 16.4–17.1¢/kWh *[F: EIA data via secondary summary, Sep 2026; D: confirm with EIA directly]*. Local politics are volatile: Prince George's County adopted a two-year moratorium (July 2026), Baltimore County has one through at least January 2027, and Frederick County's overlay zone has faced court challenge and an executive freeze *[F]*. A bill to repeal the state's data center sales-and-use-tax exemption (HB 560) was introduced in 2026; we could not confirm its outcome *[D]*.

### What this means

1. **Maryland is not inherently cheaper, nor does it inherently have more available power than Northern Virginia.** Both states now run large-load tariffs with minimum-charge and collateral features (Virginia's GS-5 class: 14-year contracts, minimum charges of 85% of T&D and 60% of generation costs, from January 2027) *[F]*. Our edge must come from a **dated, firm power commitment and speed**, not from claimed state-level advantages.
2. **The 24-month opening is credible only if the project already holds, or can obtain within ~90 days, a utility commitment with an energization date no later than month 20–22.** If it cannot, the plan must shift to a phased opening backed by on-site bridge power, or the opening date must move. This is the single most important fact for the board to establish.
3. **Customers buy power certainty.** In today's market, the best-credit tenants (hyperscalers, AI clouds) will sign binding pre-leases for capacity that has a credible energization date, and will not sign for capacity that does not.

### Recommended strategic direction

| Dimension | Recommendation |
|---|---|
| **Power strategy** | **Grid-anchored, bridge-protected, carbon-layered.** Firm utility service under the new Maryland large-load tariff as base load; on-site battery storage for peak/capacity-cost management and resilience; low-emission backup generation; a pre-negotiated, permitted **bridge-power option** (fuel cells or gas reciprocating engines) for the first-phase IT load if energization slips; long-term carbon-free supply through a nuclear-backed retail contract plus PJM renewable PPAs. Do not market annual REC matching as 24/7 carbon-free power. |
| **Commercial model** | **Wholesale-led hybrid.** ~80–85% of Phase 1 in 4–12 MW wholesale halls aimed at hyperscale and AI/GPU cloud anchors on 10–15-year terms; ~15–20% in a secure retail/private-suite zone for federal contractors, regulated enterprises and network partners. Design halls for 30–50 kW/rack air-plus-rear-door cooling with **liquid-cooling-ready** (direct-to-chip) blocks at 100–150 kW/rack. |
| **Sequencing** | Secure power commitment → sign one anchor for ≥40–60% of Phase 1 before full notice-to-proceed on fit-out → fill the balance through brokers and named-account sales. |
| **Pre-leasing targets (Phase 1)** | ≥30% under LOI/reservation at T-18 months; ≥50% binding at T-12; ≥70% binding at T-6; ≥85% binding at opening. |
| **Financial guardrail** | Base case breakeven at roughly 60–65% leased *[E]*; every month of delay on a fully pre-leased 24 MW phase costs ≈ $5M in lost rent and carry *[E]*. |

---

## 2. Priority decisions for the CEO

| # | Decision | Recommended choice | Deadline | Why it matters |
|---|---|---|---|---|
| 1 | **Confirm the power position** | Obtain written status from the serving utility: application date, study stage, service capacity, energization date, large-load tariff obligations, required collateral. | Day 30 | Every other decision depends on it. No dated power = no credible 24-month opening. |
| 2 | **Choose the capacity scenario to plan for** | Plan around Scenario B (≈48 MW critical IT, 24 MW Phase 1) unless the utility letter supports more or less. | Day 45 | Sets capex, utility service size, sales targets and financing. |
| 3 | **Commit to the wholesale-led hybrid model** | Approve ~80/20 wholesale/retail mix with liquid-cooling-ready halls. | Day 60 | Determines design, sales team and pricing. |
| 4 | **Fund a bridge-power option** | Authorize up to $1–5M *[E]* for reservation fees, air-permit pre-application and engineering for 24–30 MW of bridge power. | Day 90 | Converts the largest schedule risk into a priced option. |
| 5 | **Appoint a Chief Energy Officer (or equivalent)** | Senior hire reporting to CEO, owning utility, PJM, PSC, MDE and procurement. | Day 30 (interim), Day 90 (permanent) | Power is now a commercial function, not a facilities function. |
| 6 | **Set the anchor-tenant policy** | Accept one anchor of up to 60% of Phase 1 if investment-grade (or with parent guarantee/letter of credit); cap non-IG single tenant at 30–40%. | Day 60 | Balances speed-to-lease against concentration and credit risk. |
| 7 | **Approve the pass-through principle** | All large-load tariff minimum charges, collateral and capacity costs are mirrored in customer contracts (take-or-pay on reserved MW). | Day 60 | Prevents the company from absorbing utility obligations customers do not fund. |
| 8 | **Set the sustainability claim policy** | Publish hourly carbon-free energy (CFE) data; do not claim "100% renewable" on annual REC matching. | Day 90 | Protects credibility with hyperscale buyers and regulators. |
| 9 | **Commit to a community-benefit framework** | Low-water cooling, Tier 4-equivalent or better backup emissions, noise limits, local hiring, transparent reporting. | Day 90 | Moratoria are spreading; local licence-to-operate is now a schedule risk. |

---

## 3. Maryland and Mid-Atlantic market assessment

### 3.1 Demand

| Demand driver | Evidence | Implication for us |
|---|---|---|
| Northern Virginia overflow | NoVA vacancy 0.2% (H1 2026); 467.6 MW net absorption in H1 2026, highest in North America; 2,420 MW under construction, slowing due to land and permitting *[F: CBRE, Sep 2026]* | Tenants priced out of or queued in Ashburn will consider adjacent markets with real power dates. |
| Hyperscale self-build in Maryland | Amazon reportedly plans 258 MW at Quantum Frederick *[F: trade report, Mar 2026; D]*; Amazon signed a 20-year, 690 MW PPA with Constellation for Calvert Cliffs supporting PJM operations, announced 30 Sep 2026 *[F: Maryland Matters]* | Hyperscalers are committed to the Maryland/PJM footprint; they may self-build but also lease when speed matters. |
| AI / GPU cloud | Oracle contracted up to 2.8 GW of Bloom fuel cells (Apr 2026) to get power faster *[F: Bloomberg Law]* | AI buyers will pay for speed-to-power and accept on-site generation. |
| Federal and defense | Fort Meade (NSA, U.S. Cyber Command, DISA), SSA and CMS (Woodlawn), NIH, NIST, FDA, NOAA, Census, NASA Goddard are in Maryland *[F: public agency locations]* | Steady demand for secure, compliant capacity, mainly through contractors and specific programs; long cycles. |
| Enterprise, financial services, healthcare, life sciences | Large Maryland employers in these sectors (see section 5) *[F: public]* | Retail/private-suite demand; moderate density; good credit. |
| Utility large-load pipelines | Exelon (parent of BGE, Pepco, Delmarva) reports a large-load pipeline of over 17 GW company-wide *[F: earnings call; date not shown]*; EEI tracks ~55 GW of announced large-load projects nationally (May 2026) *[F]* | Competing loads are queuing for the same transmission. Speed of utility commitment is a competitive variable. |

**Not verifiable from public sources:** Maryland-specific colocation vacancy, Maryland wholesale lease rates, and a Maryland-only absorption series. We recommend commissioning a broker opinion of value and a datacenterHawk/CBRE submarket pull in the first 30 days *[D]*.

### 3.2 Competitive supply

| Market | Situation | Threat / opportunity |
|---|---|---|
| **Northern Virginia** | Near-zero vacancy; rents up; Dominion GS-5 large-load class from 1 Jan 2027 with 14-year contracts and 85%/60% minimum charges *[F]* | Main source of overflow demand. Unmatched interconnection ecosystem (Ashburn). |
| **Frederick County, MD (Quantum Frederick)** | Aligned's 72 MW building topped out (Mar 2026); TPG sole developer; Rowan approvals; >1 GW utility capacity claimed via Potomac Edison 230 kV *[F: trade listings; D]*; county overlay zone ~2,600 acres faced court ruling and an executive development freeze (July 2026) *[F]* | Direct in-state competitor with scale and an established fiber loop to Ashburn. |
| **Baltimore region** | County moratorium; a 150 MW Woodlawn concept existed but no application pre-pause *[F]* | Limited near-term supply; political risk high. |
| **Prince George's / Southern MD** | Two-year moratorium from July 2026 *[F]*; SMECO briefing counties on data-center load and costs *[F]* | Unavailable for new supply near term. |
| **Pennsylvania** | 66 planned projects totaling ~19.9 GW (tracker, July 2026) *[F]*; Amazon's Susquehanna campus (up to 960 MW) and Homer City discussions *[F]* | Competes for hyperscale and AI anchors with cheaper land and on-site generation stories. |
| **Delaware / New Jersey** | Smaller, active AI-cloud projects (e.g., GPU cloud sites in NJ) *[D]* | Secondary competitor for AI tenants. |

### 3.3 Maryland location advantages and disadvantages

| Factor | Advantage | Disadvantage | Confidence |
|---|---|---|---|
| Fiber and latency | Western/central Maryland sites can be within roughly 50–80 km of Ashburn; at ~5 µs/km, fiber round-trip latency of roughly 0.5–1 ms is achievable on direct routes | Route diversity and dark-fiber pricing vary by site | *[E; D: carrier route quotes]* |
| Customer access | Adjacent to federal and contractor base; Baltimore–Washington enterprise market | — | *[F]* |
| Workforce | Cyber, federal IT and engineering talent pool | Competition with NoVA for data-center technicians | *[A]* |
| Land | Some industrial/brownfield sites | Moratoria and overlay limits in key counties | *[F]* |
| Water | — | Data-center water use is now subject to state reporting; Chesapeake Bay scrutiny | *[F]* |
| Energy | PJM market access; retail choice for commercial supply; nuclear fleet (Calvert Cliffs) | Commercial prices up ~19–21% YoY; capacity at cap; transmission constraints in central Maryland | *[F]* |
| Taxes | 2020 sales-and-use-tax exemption for qualified data centers ($5M investment, 5 jobs; $2M in Tier I areas) *[F]* | 2026 repeal bill (HB 560); outcome unconfirmed *[D]* | Mixed |
| Permitting | 2024 law eased backup-generator CPCN requirements *[F: DCD; D: confirm enacted text]*; state fast-track for energy projects | County-level moratoria; diesel scrutiny | Mixed |

### 3.4 Regulation and incentives to track

| Item | What it does | Action |
|---|---|---|
| Next Generation Energy Act (2025) | Large-load tariff; capacity-cost pass-through; dispatchable generation solicitation (≈3,100 MW in the as-introduced bill) with expedited CPCN *[F]* | Model tariff impact; monitor PSC docket PC 74. |
| Utility RELIEF Act (Ch. 353, 2026) | Lowers large-load threshold (reported 25 MW / 60% LF); PSC registration; energy/water reporting; restricts data centers in certain Baltimore City districts *[F; D: final text]* | Legal review of final chaptered text in first 30 days. |
| PSC large-load regulations | Draft regulations; Office of People's Counsel seeks tighter consumer protections *[F]* | File comments via counsel; design customer contracts to flow obligations through. |
| Data Center Impact Analysis (Ch. 10, 2025) | MDE/MEA/UMD assessment; final report due 1 Sep 2026 *[F]*; publication not confirmed *[D]* | Obtain and brief board; likely to shape the 2027 session. |
| Sales & use tax exemption / HB 560 | Exemption may be repealed or limited *[D]* | Do not include in base case until status confirmed; model as upside. |
| FERC co-location order (Dec 2025) | Directs PJM to create new transmission services for co-located large loads; compliance and paper hearing through 2026 *[F]* | Keep co-location as a later-phase option, not a 24-month dependency. |
| County zoning | Moratoria (Prince George's, Baltimore County); Frederick overlay litigation *[F]* | Confirm site entitlements are vested and not exposed to a moratorium. |

### 3.5 Priority customer segments (ranked)

Scores: 1 (weak) to 5 (strong). Attractiveness weights: commercial value 30%, creditworthiness 25%, fit with facility 20%, sales-cycle speed 15%, density fit 10%.

| Rank | Segment | Commercial value | Credit | Fit | Cycle speed | Density | Weighted | Typical cycle | Typical density *[E]* |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Hyperscale cloud (wholesale / build-to-suit) | 5 | 5 | 4 | 2 | 4 | **4.25** | 9–18 months | 15–50 kW/rack; rising |
| 2 | AI / GPU cloud providers (neoclouds) | 5 | 2 | 4 | 5 | 5 | **4.05** | 3–9 months | 40–130+ kW/rack |
| 3 | Enterprise AI / private AI clusters | 3 | 4 | 4 | 3 | 4 | **3.55** | 6–12 months | 30–80 kW/rack |
| 4 | Regulated enterprise (financial services, healthcare, life sciences) | 3 | 4 | 4 | 3 | 2 | **3.35** | 6–12 months | 8–20 kW/rack; HPC pockets higher |
| 5 | Carriers, CDNs, interconnection platforms | 2 | 4 | 5 | 4 | 1 | **3.30** | 3–9 months | low; strategic value high |
| 6 | Federal contractors and integrators (secure suites) | 3 | 4 | 4 | 2 | 2 | **3.20** | 12–24 months | 8–20 kW/rack |
| 7 | MSPs, private-cloud and system integrators | 2 | 3 | 4 | 4 | 2 | **2.95** | 3–6 months | 8–15 kW/rack |
| 8 | Universities and research HPC | 2 | 4 | 3 | 2 | 4 | **2.90** | 9–18 months | 30–80 kW/rack |
| 9 | Disaster recovery / business continuity | 2 | 3 | 3 | 4 | 1 | **2.65** | 3–6 months | low |

Notes. Carriers rank low on revenue but are **strategically essential**: without on-site carriers and cloud on-ramps, retail and enterprise tenants will not come. DR demand is constrained because a Maryland site 50–80 km from Ashburn shares regional grid, weather and PJM risks; many buyers will need a more distant secondary site.

---

## 4. Alternative power sourcing options and recommended energy portfolio

### 4.1 Roles: do not confuse them

| Role | Definition | Candidate sources |
|---|---|---|
| **Primary (base-load) supply** | Delivers the facility's continuous load, 24×7 | Utility grid; on-site prime generation; co-located plant |
| **Supplemental generation** | Reduces grid draw at peaks or adds capacity | BESS, on-site solar, fuel cells, demand response |
| **Backup power** | Carries load during grid outages; runs rarely | UPS + diesel/HVO or gas generators; batteries |
| **Renewable / clean energy procurement** | Financial or contractual claim to clean energy attributes | VPPAs, RECs, nuclear-backed retail contracts, 24/7 CFE products |

Renewable energy certificates and annual matching **do not** deliver physical power, firm capacity, or 24/7 carbon-free electricity. A VPPA is a financial hedge settled against PJM prices; electrons still come from the grid mix.

### 4.2 Option-by-option assessment

Costs are planning ranges *[E]* unless cited. "Delivered cost" includes energy, capacity, delivery and amortized capital where relevant.

#### (1) Utility grid service

- **Counterparties:** Potomac Edison (FirstEnergy) in western/central MD; BGE (Exelon) in Baltimore region; Pepco (Exelon) in Montgomery/Prince George's; Delmarva (Exelon) on the Eastern Shore; SMECO (cooperative) in Southern MD; municipal utilities (e.g., Hagerstown). RTO: PJM. Regulator: Maryland PSC; FERC for transmission.
- **Availability within 24 months:** Only if a service agreement or study is already well advanced. New ≥25 MW requests now fall under the large-load tariff process *[F; D: utility-specific]*. Transmission-level service (e.g., 115/230 kV) commonly requires new substations; lead times for large power transformers are long *[E]*.
- **Firmness:** Highest, if firm (non-interruptible) service is contracted. Watch for utility proposals for flexible/curtailable service (Maryland IOUs proposed up to ~440 MW of flexible-load programs) *[F]*.
- **Cost:** Maryland commercial average ~16.4¢/kWh (12 months to July 2026); industrial ~11.2¢/kWh per an EIA-citing aggregator (May 2026) *[F; D]*. Large transmission-voltage customers on competitive supply typically pay less than the commercial average. **Planning range: $95–150/MWh all-in; base $115** *[E]*. Capacity component alone at $333.44/MW-day ≈ $122k/MW-year, or ~$16/MWh at an 85% load factor before reserve-obligation scaling *[F price; E conversion]*.
- **Cost uncertainty:** High. PJM capacity at cap through 2027/28; tariff minimum charges; transmission cost allocation under active PSC review.
- **Permitting:** Utility-led substation/line permits; possible CPCN for transmission.
- **Emissions/water:** Grid mix (PJM: gas 43%, nuclear 21%, coal 20% of cleared 2027/28 capacity) *[F]*.
- **Scalability:** Good if the utility plans for the full campus; obtain phased capacity reservations.
- **Risks:** Delay; minimum-charge exposure if tenants under-ramp; collateral.
- **Verdict:** **Base-load backbone.** Non-negotiable for a multi-tenant facility seeking hyperscale and enterprise customers.

#### (2) Renewable PPAs (solar, wind)

- **Form:** Virtual (financial) PPAs in PJM; physical delivery via retail supplier sleeving is possible but rare at this scale.
- **Availability:** 3–12 months to contract; projects take 1–3 years to reach operation. Interconnection queues in PJM remain slow *[E]*.
- **Firmness:** None. Solar capacity factor in Maryland ~16–20%; offshore wind (Maryland projects) has faced delays *[E; D]*.
- **Cost:** Lazard 2025 unsubsidized utility-scale solar $38–78/MWh (national) *[F]*; PJM PPA prices are higher than national LCOE *[E; D: LevelTen or broker quote]*. Federal tax-credit changes since 2025 raise risk *[D]*.
- **Use:** Carbon procurement and price hedge for customers who want it. Offer as an opt-in product passed through to tenants.

#### (3) On-site solar and battery storage

- **Solar:** Roof and car-park solar typically yields only ~1–3 MW on a large campus *[E]*. Contribution <3% of a 60 MW facility load. Value is mainly community and reputational.
- **BESS (2–4 hours):** 12–18 months to deliver; well proven. Uses: (a) reduce PJM capacity tags by discharging during the five coincident peak hours (5CP) that set capacity and transmission obligations, (b) demand-response revenue, (c) ride-through resilience, (d) bridge part of the load during staged energization. Lazard 2025 LCOS for 100 MW/4-hour standalone storage: $115–254/MWh *[F]*; economics for a data center depend on tariff peak-charge design *[D]*.
- **Guardrail:** Never let peak-shaving dispatch erode the UPS/backup reserve required by customer SLAs.
- **Verdict:** **Recommended supplemental resource** (BESS); solar as minor, visible add-on.

#### (4) Long-duration energy storage (LDES)

- **Technologies:** Iron-air (multi-day), flow batteries, thermal storage.
- **Readiness:** Early commercial; few operating projects at scale; limited bankability for a 24-month mission-critical facility *[E]*.
- **Verdict:** Monitor; pilot only in Phase 2+. Not part of the 24-month plan.

#### (5) Fuel cells (solid oxide)

- **Counterparties:** Bloom Energy (leader in data-center SOFC); FuelCell Energy.
- **Availability:** Bloom says systems can be installed rapidly once supply is allocated; Oracle contracted up to 2.8 GW in 2026, AEP up to ~1 GW *[F]*. Supply allocation, gas service and air permits are the real constraints *[D]*.
- **Fuel:** Pipeline natural gas (hydrogen-capable in principle). Requires firm gas service from Washington Gas, BGE Gas or Columbia Gas of Maryland, depending on site *[D]*.
- **Emissions:** CO₂ comparable to or lower than efficient gas generation; very low NOx/SOx; little water use *[E]*.
- **Cost:** No public $/MWh; **planning range $110–170/MWh** under a power-purchase or energy-as-a-service structure *[E; D: vendor quote]*.
- **Firmness:** High with modular redundancy (many small units).
- **Stranded-asset risk:** Moderate; can be redeployed or kept as resilience after grid arrives if contract allows.
- **Verdict:** **Leading bridge-power option**; also credible as permanent supplemental generation.

#### (6) Natural gas generation / CHP

- **Reciprocating engines (Caterpillar, Wärtsilä, INNIO Jenbacher):** 12–24 months to deploy; modular; good part-load efficiency; NOx controls needed.
- **Gas turbines:** Heavy-duty frames booked into ~2028–2030; GE Vernova reported ~100 GW of turbine volume under contract in Q1 2026; average lead times ~5 years *[F: trade reporting]*. Not feasible for a 24-month opening.
- **CHP:** Limited value for data centers (little heat demand; absorption chilling adds complexity).
- **Cost:** At $4–6/MMBtu delivered gas and ~8.5–9.5 MMBtu/MWh heat rate, fuel ≈ $35–57/MWh; plus capital and O&M; **planning range $95–150/MWh** at high utilization with N+1/N+2 redundancy *[E]*.
- **Permitting:** MDE air permit; CPCN or CPCN exemption for on-site generation (the PSC applied a 70 MW exemption limit under PUA § 7-207.1 in the 2023 Aligned case) *[F; D: current law after 2024 changes]*. High community sensitivity; Frederick's 2023 diesel dispute shows how fast this becomes a project-killer *[F]*.
- **Transition risk:** Maryland climate targets and potential future emissions limits *[D]*.
- **Verdict:** **Secondary bridge option** (recips). Not recommended as permanent prime power for a multi-tenant facility in Maryland's current political climate.

#### (7) Nuclear

- **Existing nuclear contracts:** Constellation owns Calvert Cliffs (~1.79 GW) and signed a 20-year, 690 MW PPA with Amazon (Sep 2026) supporting ~190 MW of uprates by 2030–2032; power flows to the grid, not via co-location *[F]*. Retail supply products backed by nuclear attributes are available through Constellation's retail business *[D: terms]*.
- **Firmness:** Contractual/financial in PJM, not physical delivery. Strong carbon claim (hourly matched if structured properly).
- **Cost:** Premium over brown power; **planning range $85–130/MWh** delivered *[E; D]*.
- **SMRs/advanced nuclear:** No realistic delivery within 24 months, or likely before the early 2030s *[E]*. MOUs only.
- **Verdict:** **Long-term clean, price-stable supply** through a nuclear-backed retail or financial contract; not a schedule solution.

#### (8) Geothermal and other emerging technologies

- Maryland lacks conventional hydrothermal resource; enhanced geothermal is not commercially available at scale here *[E]*. Ground-source heat pumps can serve office spaces only.
- **Verdict:** Exclude from power plan.

#### (9) Microgrids, hybrid systems, demand response

- A site **microgrid controller** integrating grid, BESS, backup generation and (if used) bridge generation is good practice and enables islanding.
- **Demand response:** PJM DR and state flexible-load programs pay for curtailment *[F]*; data centers can participate using BESS/generators rather than shedding IT load, subject to MDE rules on generator use for non-emergency purposes *[D]*.
- **Verdict:** **Recommended** as the control layer for resilience and peak-cost management.

#### (10) Direct or co-located generation

- **Framework:** FERC's December 2025 order directs PJM to create new transmission services for co-located loads; compliance proceedings ran through 2026 *[F]*. Amazon's Susquehanna co-location saw earlier FERC rejection *[F]*.
- **Maryland candidates:** Few existing plants with land and willing owners; Calvert Cliffs output now committed to Amazon *[F]*; Talen's Brandon Shores is under a reliability-must-run arrangement *[D]*.
- **Verdict:** **Not achievable within 24 months.** Keep as Phase 3 option after FERC/PJM rules settle.

### 4.3 Weighted decision matrix: physical supply options

Weights: time-to-power within 24 months 20%; firm capacity contribution 20%; delivered cost and predictability 20%; permitting and regulatory risk 15%; carbon and community acceptance 10%; scalability 10%; contract and stranded-asset risk 5%. Scores 1–5 *[E: team judgement; re-score after diligence]*.

| Option | Time | Firm | Cost | Permit | Carbon/community | Scale | Contract risk | **Weighted** | Role |
|---|---|---|---|---|---|---|---|---|---|
| Utility grid (firm service) | 3* | 5 | 3 | 3 | 3 | 4 | 4 | **3.55** | Base load |
| SOFC fuel cells | 4 | 4 | 2 | 3 | 3 | 4 | 3 | **3.30** | Bridge / supplemental |
| Gas reciprocating engines | 4 | 4 | 3 | 2 | 2 | 3 | 3 | **3.15** | Bridge (secondary) |
| On-site solar + BESS | 4 | 1 | 3 | 4 | 5 | 1 | 4 | **3.00** | Supplemental only (fails firm-power test) |
| Co-located existing generation | 2 | 5 | 3 | 1 | 3 | 4 | 2 | **2.95** | Phase 3 option |
| Gas turbines / CHP | 1 | 4 | 3 | 2 | 2 | 4 | 2 | **2.60** | Exclude for 24 months |
| SMR / advanced nuclear | 1 | 5 | 1 | 1 | 4 | 4 | 1 | **2.40** | Long-term MOU only |
| LDES | 2 | 2 | 1 | 3 | 4 | 2 | 1 | **2.10** | Pilot later |
| Geothermal (power) | 1 | 1 | 1 | 2 | 4 | 1 | 1 | **1.45** | Exclude |

\* Grid time score is 3 assuming a utility study is under way; it drops to 1 if no application exists, and rises to 5 if an executed service agreement with a dated energization exists.

**Clean-energy and hedge instruments** (not physical supply) are evaluated separately:

| Instrument | Carbon claim quality | Price hedge | Complexity | Recommendation |
|---|---|---|---|---|
| Unbundled RECs | Low (annual, often not additional) | None | Low | Avoid as headline claim |
| PJM solar/wind VPPA | Medium (additional, annual) | Partial, shaped | Medium–high | Offer as tenant opt-in |
| Nuclear-backed retail / PPA | High (firm, can be hourly) | Good | Medium | **Preferred long-term** |
| 24/7 hourly-matched CFE portfolio | Highest | Good | High | Target by year 3 for hyperscale tenants |
| Fixed-price layered retail supply | None | Good | Low | **Use from day 1** |

### 4.4 Delivered cost by configuration (planning estimates)

| Configuration | Delivered cost $/MWh *[E]* | Firm? | Notes |
|---|---|---|---|
| A. Grid only, competitive retail supply | 95–150 (base 115) | Yes | Dominant cost drivers: PJM capacity, transmission allocation, large-load tariff minimums |
| B. A + BESS for 5CP/peak management | A minus 5–15 net *[D]* | Yes | Depends on tariff peak-charge design and BESS cost |
| C. A + nuclear-backed supply | A plus 0–20 | Yes | Better carbon claim and price stability |
| D. Bridge: SOFC fuel cells (temporary prime) | 110–170 | Yes, with N+1 | Gas supply and air permit critical |
| E. Bridge: gas recips (temporary prime) | 95–150 | Yes, with N+2 | Higher NOx; community risk |
| F. 24/7 CFE premium overlay | +10–40 on top | — | For tenants willing to pay |

**Formula:** Delivered cost ($/MWh) = Energy + Capacity (PLC × capacity price ÷ annual MWh) + Transmission (NSPL × rate ÷ MWh) + Distribution and tariff charges + Taxes/fees + Amortized on-site capital (Capex × capital recovery factor ÷ annual MWh) + Fuel (heat rate × gas price) + O&M.

### 4.5 Recommended energy portfolio

| Strategy | Recommendation | Owner | Timing | Measure of success |
|---|---|---|---|---|
| **Base load** | Firm utility service at the highest available voltage, with dual feeds from diverse substations if possible; competitive retail supply with 3–5 year layered fixed-price hedges | Chief Energy Officer | Service agreement by Month 6–9; energization by Month 20–22 | Executed ESA; energization date; % of load hedged |
| **Peak and resilience** | 2–4 hour BESS sized ~10–20% of facility load; microgrid controller; backup generation N+1 per block using Tier 4-equivalent or better units (gas or HVO-fuelled where permitted) with 24–48 h fuel and fuel-delivery contracts | CTO / Chief Energy Officer | Equipment orders by Month 9 | Capacity-tag reduction; zero SLA breaches |
| **Contingency** | Permitted, contracted bridge-power option for Phase 1 IT (≈24–30 MW facility load), preferring SOFC, with gas recips as fallback; exercise trigger if utility energization date slips past Month 18 | CEO (decision), Chief Energy Officer (execution) | Option executed by Month 6; permit pre-application by Month 4 | Option in place; exercise decision made on time |
| **Long-term pathway** | Nuclear-backed supply contract and PJM renewable PPAs; publish hourly CFE %; evaluate co-location and SMR offtake MOUs after 2028 | Chief Energy Officer / Sustainability lead | Contract by opening; CFE target ≥60% hourly by Year 3 *[A]* | Hourly CFE %; carbon intensity per MWh |

---

## 5. Target customer segments and prioritized prospective accounts

### 5.1 Segment playbooks

| Segment | Value proposition | Decision-makers | Buying criteria | Likely objections | Cycle | Contract structure | Best channels |
|---|---|---|---|---|---|---|---|
| **Hyperscale cloud** | Dated, firm MW near Ashburn; expansion runway; build-to-suit flexibility | Head of data center capacity/site selection, energy procurement, real estate, finance | Energization date, MW block size, expansion rights, price/kW, power cost and carbon, design standard compliance | "We self-build"; "Maryland politics"; "not enough MW" | 9–18 mo | 10–15 yr wholesale or build-to-suit; ramp schedule; ROFR on expansion | Executive outreach; brokers (CBRE, JLL, Cushman & Wakefield, Newmark); utility/economic development introductions |
| **AI / GPU cloud** | Fastest credible power; 100+ kW/rack liquid cooling; bridge power if needed | CEO/CTO, VP infrastructure, CFO, investors/lenders | Speed, density, price, flexibility | Credit-support demands; speed doubts | 3–9 mo | 5–10 yr; LC or parent guarantee; prepayments; take-or-pay | Founder-level outreach; GPU vendors and OEM partners; infrastructure investors |
| **Federal contractors and integrators** | Secure suites near Fort Meade/Baltimore–Washington corridor; SCIF-capable build; compliance documentation | Program managers, CIO, facility security officer, contracts | FedRAMP/CMMC inheritance, physical security, cleared staff, ICD 705 options, US-person operations | Procurement timing; certification gap | 12–24 mo | 3–7 yr retail/private suite | Contractor partner programs; distributors (e.g., Carahsoft); AFCEA chapters |
| **Regulated enterprise** | Proximity, compliance (SOC 2, ISO 27001, PCI DSS, HIPAA), hybrid cloud on-ramps | CIO, CISO, infrastructure director, procurement | Uptime, certifications, on-ramps, price | Cloud-first strategies; migration risk | 6–12 mo | 3–5 yr retail; cages/suites | Account-based marketing; MSP partners; brokers |
| **Enterprise AI / private clusters** | Liquid-cooled suites for 1–10 MW clusters with low latency to enterprise data | CTO, head of AI, CIO | Density, time to deploy, data sovereignty | Uncertain AI demand | 6–12 mo | 3–7 yr | OEM partners (Dell, HPE, Supermicro, NVIDIA partner network) |
| **MSPs / integrators** | Wholesale-to-retail capacity for resale | CEO, VP operations | Price, flexibility, connectivity | Margin squeeze | 3–6 mo | 3–5 yr, smaller blocks | Partner program |
| **Carriers / interconnection** | Anchor connectivity ecosystem; low-cost conduit and meet-me room | VP network planning | Route diversity, rights-of-way, cost | Insufficient density of tenants | 3–9 mo | Free/discounted space for presence; revenue share | Direct |
| **DR / continuity** | Secondary site separated from Ashburn | CISO, BC manager | Distance, independence, cost | Same-region risk | 3–6 mo | 1–3 yr | Partners |

### 5.2 Named prospects (public-evidence based; none confirmed)

| Priority | Prospect | Segment | Public rationale | Status |
|---|---|---|---|---|
| A | Amazon Web Services | Hyperscale | Reported 258 MW plan at Quantum Frederick; Calvert Cliffs PPA for PJM operations *[F]* | Prospect; no engagement |
| A | Microsoft | Hyperscale | Large NoVA footprint facing tight market *[E]* | Prospect |
| A | Oracle (OCI) | Hyperscale / AI | Contracted up to 2.8 GW of Bloom fuel cells for speed-to-power *[F]* — fits a fuel-cell bridge proposition | Prospect |
| A | Google | Hyperscale | Major Loudoun presence *[E]* | Prospect |
| A | CoreWeave | AI cloud | Mid-Atlantic expansion (e.g., Lancaster, PA announced 2025) *[D]* | Prospect |
| A | Lambda, Crusoe, Nebius, Together AI | AI cloud | Active U.S. capacity buyers *[D]* | Prospect; credit review required |
| B | Meta | Hyperscale | Mid-Atlantic presence in Virginia *[E]*; usually self-builds | Opportunistic |
| B | Leidos, Booz Allen Hamilton, Northrop Grumman, Lockheed Martin, General Dynamics IT, CACI, SAIC, Peraton | Federal contractors | Large Maryland/Virginia federal IT presence *[F: public]* | Prospects |
| B | Johns Hopkins (Medicine and APL), University of Maryland Medical System, MedStar, CareFirst | Healthcare / research | Large Maryland operations *[F: public]* | Prospects |
| B | T. Rowe Price, Marriott International, McCormick | Enterprise | Maryland-headquartered *[F: public]* | Prospects |
| B | AstraZeneca (Gaithersburg), GSK (Rockville), Novavax | Life sciences | Maryland R&D presence *[F: public]* | Prospects |
| C | Zayo, Lumen, Verizon, Comcast Business, FiberLight, Cogent | Carriers | Route builders/operators in the corridor *[D: route maps]* | Partners/tenants |
| C | Equinix, Megaport, Console Connect, PacketFabric | Interconnection platforms | Cloud on-ramp and fabric extension to Ashburn *[D]* | Partners |
| C | Rackspace, Kyndryl, IBM Consulting, Iron Bow | MSP / integrators | Hybrid-cloud resellers *[D]* | Channel |

**Prioritization logic:** A-list accounts can fill Phase 1 with one or two transactions; B-list accounts fill the retail zone and diversify credit; C-list accounts make the facility sellable to B-list buyers.

---

## 6. Competitive positioning and customer value proposition

### 6.1 Positioning statement (draft)

> *"Dated, firm power and AI-ready density, one millisecond from Ashburn, in a facility built to earn its community's trust."*

Use this only once the power commitment and latency are verified. Until then, do not publish "power available" claims.

### 6.2 Value proposition pillars and proof points

| Pillar | Claim | Proof required before use |
|---|---|---|
| Power certainty | "X MW energized by [date]" | Executed utility agreement; bridge-power contract |
| Proximity | "<1 ms to Ashburn" | Carrier route test and SLA |
| AI-ready | "Up to 130 kW/rack liquid-cooled" | Engineering basis of design; OEM validation |
| Predictable pricing | "Power cost pass-through with hedged rate options" | Executed retail supply hedge |
| Security and compliance | "SOC 2 Type II, ISO 27001, PCI, HIPAA-ready; SCIF-capable suites" | Audit schedule; design approvals |
| Sustainability | "Hourly carbon-free energy reported per tenant" | Contracted clean supply; metering |
| Community | "Low-water cooling; low-emission backup" | Design data; permits |

### 6.3 Against Northern Virginia and other markets

| Buyer concern | Northern Virginia | Our Maryland site (target) | Message |
|---|---|---|---|
| Power availability | Scarce; new GS-5 obligations from 2027 *[F]* | Depends on our utility commitment *[D]* | Win on **dated** power, not on "Maryland has more power" |
| Price | Rents rising; tight *[F]* | Target discount 5–15% to NoVA equivalent *[A; D: broker]* | Total cost of ownership, not headline rent |
| Power cost | Dominion regulated rates | Maryland commercial prices up ~19–21% YoY *[F]* | Offer hedged power; be transparent |
| Ecosystem | Unrivalled | Must be built via fiber partners | Low latency to Ashburn; on-ramps |
| Risk | Concentration in one market | Geographic diversification within metro | Same metro, different utility and substations |

**Rule:** every comparative claim must be backed by a dated source in sales collateral.

---

## 7. Pre-leasing, sales and marketing strategy

### 7.1 Recommended commercial model

**Wholesale-led hybrid.** Evidence: (1) scarcity in NoVA is greatest in large blocks where rents rose fastest (3–10 MW deals +8.3% in H1 2026 *[F]*); (2) wholesale anchors produce bankable, long-term cash flows that lower financing cost; (3) a small retail zone captures higher per-kW pricing (250–500 kW deals priced at $190–235/kW/month in NoVA *[F]*) and builds an ecosystem; (4) AI-ready density is now a baseline requirement for large buyers, not a niche.

### 7.2 Pre-leasing program

| Step | Instrument | Key terms *[A]* | Purpose |
|---|---|---|---|
| 1. Qualification | NDA + technical questionnaire | Load, density, ramp, credit, timing | Filter tire-kickers |
| 2. Indicative proposal | Term sheet | Price/kW, ramp, delivery date, power pass-through | Price discovery |
| 3. Reservation | Capacity reservation agreement | Fee 1–3 months' rent equivalent; credited to rent; refundable only if we miss the delivery date; 60–120 day exclusivity | Commit customer and fund diligence |
| 4. LOI | Letter of intent | Non-binding except exclusivity and confidentiality | Board/lender visibility |
| 5. Binding pre-lease | Lease / MSA | 10–15 yr (wholesale), 3–7 yr (retail); ramp to 100% within 12–24 months; take-or-pay on reserved MW; delivery date with symmetric liquidated damages capped (e.g., rent abatement); expansion ROFR/ROFO with time limits | Revenue certainty |

**Early-commitment incentives:** price lock for the initial term; 3–7% rent discount for binding signature ≥12 months before ready-for-service; first right to liquid-cooled halls; option to subscribe to nuclear-backed or hourly-matched CFE supply at cost plus a fixed margin.

**Contract terms that protect the company:**

- **Utility obligation flow-through:** mirror large-load tariff minimum charges and collateral in tenant contracts. A tenant that reserves 10 MW pays for the share of minimum charges attributable to that 10 MW, whether or not it ramps.
- **Power pass-through:** metered energy at cost (wholesale) or at a fixed $/kWh with an adjustment clause (retail).
- **Ramp schedule:** minimum committed MW by month; unused reservation lapses after notice.
- **Service levels:** 99.999% power availability (wholesale); credits capped at a percentage of monthly rent.
- **Credit protection:** investment-grade tenant or parent guarantee; otherwise letter of credit or cash deposit of 6–12 months' rent plus pro-rata utility collateral.
- **Concentration limits:** one IG anchor ≤60% of Phase 1; non-IG single tenant ≤30–40%; top three tenants ≤85% of Phase 1.

### 7.3 Facility specification baseline (to validate with customers)

| Requirement | Baseline recommendation *[A]* |
|---|---|
| Density | 30–50 kW/rack air with rear-door heat exchangers; designated liquid-cooled blocks at 100–150 kW/rack |
| Cooling | Closed-loop, low-water (air-cooled chillers / dry coolers) given Maryland water reporting and Bay sensitivity |
| Redundancy | N+1 / distributed redundant for wholesale; 2N option for retail and federal suites |
| Connectivity | Two diverse building entrances; ≥3 carriers at opening; cloud on-ramp via partner fabric |
| Security | Layered perimeter; mantraps; SCIF-capable suite design (ICD 705) with accredited construction option |
| Certifications | SOC 1/2 Type II, ISO 27001, PCI DSS, HIPAA-ready by Month 6 after opening; FedRAMP inheritance via partners |

### 7.4 Sales pipeline math

Target: ≥85% of Phase 1 (24 MW critical IT in Scenario B) contracted by opening = **~20 MW**.

| Stage | Conversion to next stage *[E]* |
|---|---|
| Qualified opportunity → proposal | 50% |
| Proposal → LOI/reservation | 40% |
| LOI → binding lease | 60% |
| **Qualified → signed** | **12%** |

**Required qualified pipeline ≈ 20 MW ÷ 12% ≈ 170 MW (≈7× coverage).** With wholesale deals of 4–12 MW, this is 20–40 qualified opportunities over 18 months. If one anchor signs early, coverage needed for the remainder falls sharply.

---

## 8. Financial scenarios and sensitivity analysis

All figures are illustrative planning estimates *[E]*. They exclude land, utility contribution-in-aid-of-construction (CIAC), bridge power, financing fees and incentives. Replace with quotes before any investment decision.

### 8.1 Capacity scenarios

| Scenario | Critical IT (sellable) | Facility power at design PUE 1.3 | Utility service requested (with ~15% headroom) | Model |
|---|---|---|---|---|
| A. Enterprise/retail | 12 MW | ~16 MW | ~18–20 MW | Retail-heavy |
| **B. Base hybrid** | **48 MW (Phase 1: 24 MW)** | **~62 MW** | **~70–75 MW** | **Wholesale-led hybrid** |
| C. Hyperscale/AI campus | 150 MW | ~195 MW | ~220–230 MW | Wholesale/build-to-suit |

Formula: Facility power = Critical IT × PUE. Utility request = Facility power × (1 + headroom). Annual energy (MWh) = Utilized IT (MW) × PUE (annual average) × 8,760.

### 8.2 Scenario B assumptions

| Variable | Low | Base | High | Basis |
|---|---|---|---|---|
| Development capex per MW critical IT | $14M | $12M | $10.5M | *[E]* industry range; liquid cooling adds $1–3M/MW |
| Wholesale rent ($/kW/month of contracted IT) | $115 | $135 | $160 | *[E]* below CBRE NoVA small-deal range of $190–235 *[F]*; needs broker validation |
| Retail rent ($/kW/month) | $170 | $200 | $230 | *[E]* |
| Mix (wholesale/retail) | 85/15 | 85/15 | 85/15 | *[A]* |
| Stabilized occupancy | 80% | 95% | 98% | *[A]* |
| Opex excl. power ($M/MW-year) | 0.44 | 0.40 | 0.375 | *[E]* staffing, maintenance, insurance, property tax |
| Ancillary revenue (cross-connects etc.) | $2M | $3M | $4M | *[E]* |
| Energy price (delivered) | $150/MWh | $115/MWh | $95/MWh | *[E]* passed through |
| Utilization of contracted IT | 60% | 70% | 80% | *[A]* |
| Utility energization | +9 months | On time | On time | *[A]* |
| Debt | 60% LTC, 7.5%, 20-yr amortization | | | *[A]* |

### 8.3 Stabilized economics (full 48 MW)

| Metric | Low | Base | High | Formula |
|---|---|---|---|---|
| Total capex | $672M | $576M | $504M | Capex/MW × 48 |
| Base rent revenue at occupancy | $56.8M | $79.2M | $96.2M | Σ(MW × rent × 12,000) × occupancy |
| Total revenue excl. power pass-through | $58.8M | $82.2M | $100.2M | + ancillary |
| Opex excl. power | $21.1M | $19.2M | $18.0M | Opex/MW × 48 |
| **EBITDA (excl. power pass-through)** | **$37.7M** | **$63.0M** | **$82.2M** | Revenue − opex |
| Yield on cost | 5.6% | 10.9% | 16.3% | EBITDA ÷ capex |
| Simple unlevered payback (stabilized) | ~18 yrs | ~9 yrs | ~6 yrs | Capex ÷ EBITDA |
| Revenue per committed MW-year (wholesale) | $1.38M | $1.62M | $1.92M | Rent × 12,000 |

**Reading the table:** the base case is attractive *if* the rent assumption holds; the low case is not investable. **The single largest value driver is achieved rent, followed by capex per MW and time to stabilization.** EBITDA margins look high because power is excluded; when power pass-through is booked as revenue, reported margins fall to the 40–60% range common in the sector *[E]*.

### 8.4 Breakeven utilization (base case)

- Fixed costs ≈ 80% of opex ($15.4M) + debt service on $346M at 7.5%, 20 years (annual payment factor 0.0981 ⇒ $33.9M) = **$49.3M/year**
- Contribution per leased MW ≈ $1.74M blended revenue − $0.08M variable opex = **$1.66M**
- **Breakeven leased capacity ≈ 49.3 ÷ 1.66 ≈ 30 MW ≈ 62% of 48 MW** *[E]*

Formula: Breakeven MW = (Fixed opex + Debt service) ÷ (Blended revenue per MW − Variable opex per MW).

### 8.5 Power cost pass-through: the customer's view

For a tenant at 70% utilization and PUE 1.3, each 1 kW of contracted IT consumes 0.7 × 1.3 × 730 ≈ **664 kWh/month**.

- **Every $10/MWh change in delivered power cost ≈ $6.6 per kW per month** of tenant total cost of ownership.
- A PUE improvement from 1.3 to 1.2 saves ≈ 51 kWh/kW-month ≈ **$5.9/kW-month at $115/MWh**.
- Implication: a $20/MWh power-cost disadvantage versus Virginia (≈$13/kW-month) can erase a 10% rent discount. **Power price and efficiency are sales tools, not just operating items.**

### 8.6 Sensitivities (Scenario B, Phase 1 = 24 MW, base assumptions)

| Shock | Impact *[E]* | Mitigation |
|---|---|---|
| Utility energization delayed 6 months | Lost rent ≈ $3.2–3.5M/month + interest carry on ~$300M deployed ≈ $1.9M/month ⇒ **≈ $5M/month, ≈ $30M total**; risk of tenant termination after outside date | Bridge-power option; delivery-date outside dates set with buffer |
| Bridge power used for 6 months | Extra power cost ≈ (bridge − grid) × energy: e.g., $40/MWh × ~16,000 MWh/month (24 MW × 70% × PUE 1.3 × 730 h) ≈ $0.6M/month, plus mobilization *[E]* | Far cheaper than the ≈$5M/month delay cost; pre-agree tenant cost-sharing |
| Construction cost +15% | Base yield 10.9% → ~9.5% | Fixed-price/GMP contracts; early equipment procurement |
| Construction delay 6 months | Same order as energization delay | Schedule float; LDs from contractors |
| Leasing 12 months slower | NPV loss ≈ one year of EBITDA on unleased MW; breakeven pushed out | Anchor-first sequencing; phased fit-out |
| Rent −15% | Base yield → ~8.9% | Pre-lease before fit-out; differentiation |
| Power cost +$30/MWh | Tenant TCO +$20/kW-month; slower leasing at margin | Hedged supply; efficiency; transparent pricing |

### 8.7 Missing inputs needed to finalize the model

Land cost and status; utility service agreement terms; large-load tariff charges, minimum bills and collateral; CIAC for substation/lines; design and engineering cost estimate; equipment lead times; property tax treatment and incentive eligibility; broker rent comps; financing term sheet; insurance quotes; staffing plan.

---

## 9. Implementation roadmap (24 months) and 12-month post-opening plan

**Assumption:** the project has site control and initial zoning but no executed utility service agreement. If an agreement exists, compress Phases 1–3 by up to 3 months; if the site lacks entitlements or sits in a moratorium area, add 6–12 months and revisit the opening date.

### 9.1 Phased roadmap

| Phase | Key activities | Owner | Deliverables | Critical path? | Decision gate |
|---|---|---|---|---|---|
| **Days 0–30** | Power status audit; legal review of Ch. 353 and tariffs; site entitlement check; set up power and commercial workstreams; define ideal customer profile; broker opinion of value | CEO; Chief Energy Officer (interim); CCO; GC | Power status memo; regulatory memo; ICP; market comps | **Yes** (power status) | **Gate 0:** Is a ≤Month 22 energization plausible? |
| **Days 31–90** | Utility and PJM engagement; bridge-power RFIs (Bloom, FuelCell Energy, recip suppliers); retail supply RFP; MDE air pre-application meeting; customer discovery (≥30 interviews); anchor outreach (A-list) | Chief Energy Officer; CCO; Head of Permitting | Utility term sheet/study; bridge RFI responses; 10+ qualified opportunities | Yes | **Gate 1:** Approve power portfolio and bridge-option budget |
| **Months 4–6** | Narrow power options; obtain indicative pricing; customer-specific proposals; first reservation agreements; basis of design frozen for Phase 1 | Chief Energy Officer; CTO; CCO | Bridge option executed; 2–4 proposals; ≥1 reservation | Yes (bridge option, design freeze) | **Gate 2:** ≥30% of Phase 1 under LOI/reservation (at T-18) |
| **Months 7–12** | Execute utility service agreement; order long-lead equipment (transformers, switchgear, generators, chillers, BESS); negotiate anchor lease; build carrier ecosystem; certification planning | CEO; CTO; CCO; CFO | Executed ESA; anchor lease; equipment POs; ≥3 carrier commitments | **Yes** (ESA, long-lead orders) | **Gate 3:** ≥50% binding pre-leased (T-12); full NTP for Phase 1 fit-out |
| **Months 13–18** | Finalize retail supply hedge and clean-energy contracts; convert pipeline; align construction with energization; air permits issued for backup/bridge | Chief Energy Officer; CCO; Construction lead | Hedge executed; ≥70% binding (T-6) | Yes | **Gate 4:** Bridge-power exercise decision (if energization date > Month 20) |
| **Months 19–24** | Energization; integrated systems testing (Level 1–5 commissioning); tenant onboarding; certifications initiated; occupancy ramp | CTO; COO; CCO | Ready-for-service certificate; tenants live | Yes | **Gate 5:** Ready-for-service; ≥85% Phase 1 binding |
| **Months 25–36** | Optimize utilization; expand accounts; Phase 2 pre-leasing; PUE optimization; CFE reporting; SOC 2/ISO audits | COO; CCO; Chief Energy Officer | Phase 2 commitments; audit reports | Phase 2 power | **Gate 6:** Phase 2 NTP when ≥50% pre-leased |

### 9.2 Parallel versus critical-path activities

- **Critical path:** utility study → service agreement → substation construction → energization; long-lead electrical equipment; anchor lease (drives fit-out and financing).
- **Parallel:** marketing, collateral, broker program, carrier negotiations, certifications planning, community engagement, clean-energy procurement.
- **Off-ramp:** if Gate 0 or Gate 1 fails, choose between (a) exercise bridge power for Phase 1, (b) reduce Phase 1 to the confirmed utility capacity, or (c) move the opening date.

### 9.3 Initiative detail (selected)

| Initiative | Owner | Resources / advisers | Deliverable & deadline | Dependencies & risks | Budget category | KPI | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Utility service agreement | Chief Energy Officer | Energy regulatory counsel; interconnection engineer | Executed ESA by Month 9 | Utility study; PSC tariff approval | Pre-development (opex) + CIAC (capex) | Energization date confidence | Any slip >60 days |
| Bridge-power option | Chief Energy Officer | Fuel cell/recip vendors; air-permit consultant; gas LDC | Executed option by Month 6 | Gas service; MDE permit | Option fees (opex) | Option in force | Vendor allocation lost |
| Anchor lease | CCO | Brokers; leasing counsel; credit analyst | Signed by Month 12 | Power date; design | Commissions; legal | MW signed | No LOI by Month 6 |
| Carrier ecosystem | VP Network | Fiber consultants | ≥3 carriers by Month 12 | Rights-of-way | Capex (conduit) | Carriers committed | <2 by Month 12 |
| Community licence | VP Public Affairs | Community engagement firm | Community benefit agreement by Month 9 *[A]* | County politics | Opex | Public support indicators | New moratorium proposed |
| Certifications | CISO | Audit firm | SOC 2 Type I at opening; Type II by Month 30 | Operations readiness | Opex | Audit milestones | Audit findings |

### 9.4 Twelve months after opening

| Quarter | Focus | Targets *[A]* |
|---|---|---|
| Q1 post-opening | Onboarding; stabilize operations; first SLA reporting | Zero critical incidents; Phase 1 ≥85% contracted |
| Q2 | Ramp utilization; launch Phase 2 pre-leasing | Utilized IT ≥50% of contracted |
| Q3 | Certifications; first hourly CFE report | SOC 2 Type II in progress; CFE baseline |
| Q4 | Phase 2 commitment; expansion with anchors | Phase 2 ≥50% pre-leased; churn 0% |

---

## 10. Budget framework, staffing and external advisers

### 10.1 Pre-opening non-construction budget (Scenario B) *[E]*

| Category | 24-month estimate | Notes |
|---|---|---|
| Power, regulatory and permitting diligence | $2–4M | Counsel, engineers, studies |
| Bridge-power option fees and engineering | $1–5M | Credited if exercised |
| Sales and marketing (excluding commissions) | $3–5M | ABM, events, collateral, website, CRM |
| Broker commissions | Market rate; typically tied to lease value | Budget from lease economics *[D]* |
| Legal and credit (leases, financing) | $1.5–3M | |
| Community engagement and public affairs | $0.5–1M | |
| Commercial and energy team salaries | $4–7M | See staffing |
| Contingency | 15% | |

### 10.2 Core team

| Role | Timing | Responsibility |
|---|---|---|
| Chief Energy Officer | Interim Day 1–30; permanent by Day 90 | Utility, PJM, PSC, procurement, bridge power, CFE |
| Chief Commercial Officer | Day 1 | Revenue, pricing, anchor deals |
| VP Hyperscale & AI Sales | Day 60 | A-list accounts |
| Enterprise/Federal Account Executives (2) | Month 3–6 | B-list |
| Solutions Architects (2) | Month 3–6 | Technical sales, design input |
| Director of Marketing | Month 2 | Brand, ABM, events |
| VP Public Affairs & Community | Day 60 | Local and state relations |
| Deal desk (credit, contracts) | Month 4 | Credit review, terms |
| Head of Permitting | Day 30 | MDE, county, state |

### 10.3 External advisers

Energy regulatory counsel (PSC/FERC/PJM); interconnection and power systems engineer; MDE air-permitting consultant; energy procurement adviser; data center design engineer (MEP); cost consultant; data center leasing brokers; tax and incentives adviser; community engagement firm; independent engineer (for lenders); market research (CBRE, JLL, datacenterHawk, 451 Research).

---

## 11. KPI dashboard, decision gates and risk register

### 11.1 CEO dashboard

| Area | KPI | Target *[A]* | Frequency |
|---|---|---|---|
| Power readiness | Utility capacity secured (MW, executed) vs. Phase 1 need | 100% by Month 9 | Monthly |
| | Energization milestones met (study, ESA, substation, energize) | On schedule | Monthly |
| | Firm vs. interruptible share of supply | 100% firm for critical load | Quarterly |
| | Redundancy design achieved (N+1 / 2N) | As designed | At commissioning |
| | Delivered power cost ($/MWh) vs. budget | ±10% | Monthly post-opening |
| | % of expected load under executed supply contracts | ≥70% hedged by opening | Quarterly |
| | Permit and interconnection milestones | On schedule | Monthly |
| | Bridge-power option status | In force | Monthly |
| Commercial | Qualified pipeline (MW and contract value) | ≥7× remaining target | Monthly |
| | Anchor tenants engaged / proposals / LOIs / leases | Per gates | Monthly |
| | Contracted capacity as % of sellable | 30% T-18, 50% T-12, 70% T-6, 85% at opening | Monthly |
| | Customer concentration (top 1 / top 3) | ≤60% / ≤85% | Quarterly |
| | Weighted credit quality (% IG or credit-supported) | ≥80% | Quarterly |
| | Sales cycle duration; conversion rates | Track vs. 12% target | Quarterly |
| | Customer acquisition cost per MW | Track | Quarterly |
| Post-opening | Occupied capacity; utilized IT load; churn | ≥85% occupied, ≥60% utilized by Month 12 | Monthly |
| Financial | Revenue, gross margin, EBITDA; energy cost per sellable kW | Budget | Monthly |
| Sustainability | Hourly CFE %; PUE; WUE | PUE ≤1.3 annual *[A]* | Quarterly |

### 11.2 Decision gates summary

| Gate | Timing | Pass criteria | If failed |
|---|---|---|---|
| 0 | Day 30 | Credible path to ≤Month 22 energization | Re-scope Phase 1, bridge, or move date |
| 1 | Day 90 | Power portfolio approved; ≥10 qualified opportunities | Escalate to board; adjust model |
| 2 | Month 6 | ≥30% LOI/reservation; bridge option executed | Increase incentives; reduce Phase 1 |
| 3 | Month 12 | ESA executed; ≥50% binding | Delay fit-out NTP; board review |
| 4 | Month 18 | Energization ≤ Month 22 confirmed, or bridge exercised | Exercise bridge; notify tenants |
| 5 | Month 24 | Ready-for-service; ≥85% binding | Board-level recovery plan |

### 11.3 Risk register

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| Grid/interconnection delay | High | Very high | Early utility engagement; bridge-power option; phased energization; tenant outside dates with buffer | Chief Energy Officer |
| Power-price volatility (PJM capacity at cap) | High | High | Layered hedges; BESS for peak tags; pass-through contracts | Chief Energy Officer / CFO |
| Large-load tariff minimum charges and collateral | High | High | Contract flow-through; credit support from tenants | CFO / GC |
| Construction cost overrun | Medium | High | GMP contracts; early procurement; contingency | Construction lead |
| Permitting delay (air, county) | Medium | High | Early MDE engagement; low-emission design | Head of Permitting |
| Local moratorium or zoning challenge | Medium–High | Very high | Confirm vested rights; community benefits; transparent reporting | VP Public Affairs / GC |
| Environmental opposition (water, emissions, noise) | Medium | High | Low-water cooling; Tier 4-equivalent backup; noise studies | VP Public Affairs / CTO |
| Loss of tax exemption (HB 560 or successor) | Medium | Medium | Exclude from base case; seek grandfathering | CFO |
| Technology obsolescence (rack density) | Medium | High | Liquid-cooling-ready blocks; modular design | CTO |
| Customer concentration | Medium | High | Limits; credit support; diversified pipeline | CCO / CFO |
| Weak demand / AI cycle downturn | Low–Medium | High | Anchor-first; IG tenants; phased build | CEO |
| Counterparty credit (neoclouds) | Medium | High | LCs, deposits, parent guarantees | CFO |
| Cybersecurity / physical security | Medium | Very high | Security program; certifications; insurance | CISO |
| Competition (Quantum Frederick, PA, NoVA) | High | Medium | Differentiate on dated power, density, service | CCO |
| Bridge-fuel (gas) supply or permit failure | Medium | High | Dual-technology option; early LDC agreements | Chief Energy Officer |

---

## 12. First-90-days action plan

| Week | Action | Owner | Output |
|---|---|---|---|
| 1 | Appoint interim Chief Energy Officer and CCO; set up weekly power and commercial war-rooms | CEO | Charter, RACI |
| 1–2 | Formal request to serving utility for written status, capacity, energization date and large-load tariff obligations | Chief Energy Officer | Utility letter |
| 1–3 | Retain energy regulatory counsel; review Ch. 353, NGEA, PSC draft regulations, tariff filings | GC | Regulatory memo |
| 2–4 | Confirm entitlements, moratorium exposure, overlay status | GC / Head of Permitting | Entitlement memo |
| 2–4 | Commission broker opinion of value and rent comps; datacenterHawk/CBRE submarket data | CCO | Market report |
| 3–4 | **Gate 0** board decision | CEO / Board | Go / re-scope |
| 4–8 | Issue bridge-power RFIs (SOFC and recips), gas LDC inquiries, BESS RFIs | Chief Energy Officer | Responses, indicative pricing |
| 4–8 | Pre-application meeting with MDE on backup/bridge generation | Head of Permitting | Permit pathway |
| 4–10 | 30+ customer discovery interviews across A/B segments | CCO | Requirements matrix |
| 6–10 | Executive outreach to A-list prospects (Amazon, Microsoft, Oracle, Google, CoreWeave, Lambda, Crusoe) | CEO / CCO | 10+ qualified opportunities |
| 6–12 | Retail supply RFP and hedge strategy; nuclear-backed supply discussion with Constellation and others | Chief Energy Officer | Proposals |
| 8–12 | Carrier and interconnection-platform outreach (Zayo, Lumen, Verizon, Equinix, Megaport) | VP Network | Term sheets |
| 8–12 | Community stakeholder mapping; county and state economic development meetings (Maryland Department of Commerce, county EDOs) | VP Public Affairs | Engagement plan |
| 12 | **Gate 1** board decision on power portfolio and bridge budget | CEO / Board | Approved plan |

---

## Answers to the board's three questions

### 1. What should the CEO do first to secure dependable and commercially attractive power?

**Get the utility's commitment in writing, and buy an insurance policy against it slipping.** In the first 30 days, obtain from the serving utility a written statement of service capacity, energization date, study status and large-load tariff obligations (minimum charges, collateral) under Maryland's 2025–26 laws. Appoint a senior Chief Energy Officer. In parallel, within 90 days, secure a priced, permitted-path bridge-power option (solid-oxide fuel cells first, gas reciprocating engines as fallback) sized to Phase 1, and launch a layered retail supply hedge. Add BESS to manage PJM capacity peaks and a nuclear-backed supply contract for long-term price stability and credible carbon claims. Do not depend on SMRs, co-location or long-duration storage for the 24-month opening.

### 2. Which customers should the company pursue first, and how should it win them?

**Pursue one anchor from hyperscale cloud or a creditworthy AI/GPU cloud first, then fill the balance with federal contractors and regulated enterprises.** Win the anchor with a dated, firm power commitment, a credible bridge-power backstop, liquid-cooling-ready density, sub-millisecond connectivity to Ashburn (once verified) and early-commitment pricing locked for the term. Approach through executive-level outreach plus the major brokers, and use reservation agreements to convert interest into commitments. Build the carrier ecosystem early; it is what makes the retail zone sellable.

### 3. What commercial commitments and operational milestones must be achieved before opening?

| Milestone | Required by |
|---|---|
| Written utility capacity commitment with energization date ≤ Month 22 | Month 1–3 |
| Bridge-power option executed and permit path confirmed | Month 6 |
| ≥30% of Phase 1 under LOI/reservation | Month 6 (T-18) |
| Executed utility service agreement; long-lead equipment ordered | Month 9 |
| ≥50% of Phase 1 under binding lease, including one anchor | Month 12 (T-12) |
| ≥3 carriers committed; supply hedge ≥50% executed | Month 12 |
| ≥70% binding; air permits issued; energization confirmed or bridge exercised | Month 18 (T-6) |
| Ready-for-service; ≥85% binding; ≥70% of expected load hedged | Month 24 |

If these are met, base-case returns (yield on cost around 10–11% *[E]*, breakeven at ~62% leased) are realistic. If power is not dated by Month 3 or the anchor is not signed by Month 12, the board should reduce Phase 1 scope or move the opening date rather than build speculatively.

---

## 13. Sources

Accessed October 2026. Dates are publication dates where available.

1. Mintz, "AG Watch: How Maryland Is Meeting the Data Center Age" (5 Oct 2026) — large-load tariff, Utility RELIEF Act thresholds, PSC filing deadline. https://www.mintz.com/sites/default/files/media/documents/2026-10-05/AG-Watch-How-Maryland-Is-Meeting-The-Data-Center-Age_Erek-L.-Barron.pdf
2. Maryland General Assembly, Chapter 353 (HB 1532), 2026 Regular Session — chaptered text. https://mgaleg.maryland.gov/2026RS/Chapters_noln/CH_353_hb1532e.pdf
3. The Daily Record, Maryland energy law, data centers and grid upgrades (15 Jun 2026). https://thedailyrecord.com/2026/06/15/maryland-energy-law-data-centers-grid-upgrades/
4. Maryland Office of People's Counsel, comments on proposed data center consumer-protection regulations (2026). https://content.govdelivery.com/accounts/MDOPC/bulletins/405a950
5. Southern Maryland News Net, SMECO briefing to Calvert County on data center demand (2026). https://smnewsnet.com/?p=559487
6. PJM Inside Lines, "PJM Auction Procures 134,479 MW of Generation Resources" (Dec 2025); Renewable Energy World coverage of 2027/28 BRA. https://insidelines.pjm.com/pjm-auction-procures-134479-mw-of-generation-resources/ ; https://www.renewableenergyworld.com/power-grid/pjm-capacity-auction-hits-price-cap-again-as-region-falls-short-of-reliability-target
7. CBRE, "North American data center demand continues to outpace supply despite record construction" (H1 2026, Sep 2026). https://www.cbre.com/press-releases/north-american-data-center-demand-continues-to-outpace-supply-despite-record-construction
8. CBRE, Global Data Center Trends 2026. https://www.cbre.com/insights/reports/global-data-center-trends-2026
9. Baxtel, Aligned IAD04 Bldg1 / Quantum Frederick listing; Pulse, "Aligned Tops Out Maryland Data Center" (Mar 2026). https://baxtel.com/data-center/aligned-iad04-bldg1 ; https://www.pulse.bot/climatetech/news/aligned-tops-out-maryland-data-center-46d634f6-73c0-4317-b204-5508db68bb9a
10. Department of Legislative Services, Fiscal and Policy Note, HB 560 (2026); MGA bill page. https://mgaleg.maryland.gov/2026RS/fnotes/bil_0000/hb0560.pdf ; https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb0560?ys=2026RS
11. Maryland General Assembly, Chapter 10 (SB 116), 2025 — Data Center Impact Analysis and Report. https://mgaleg.maryland.gov/2025S1/Chapters_noln/Ch_10_sb0116e.pdf
12. DatacenterDynamics, "Maryland governor signs bill easing restrictions around backup generators" (2024); Maryland PSC Order No. 90830 (2023). https://datacenterdynamics.com/en/news/maryland-governor-signs-bill-easing-restrictions-around-backup-generators ; https://www.psc.state.md.us/wp-content/uploads/Order-No.-90830-Provisional-Order-on-Rehearing-ML-302893.pdf
13. Maryland Matters, "Large upgrade planned at Calvert Cliffs after power deal signed with Amazon" (30 Sep 2026). https://marylandmatters.org/2026/09/30/calvert-cliffs-power-purchase-amazon/
14. Sidley Austin, "FERC Charts a New Path for Large Load Co-Location in PJM" (7 Jan 2026); Perkins Coie update on FERC co-location order. https://energyinfrastructurepulse.sidley.com/2026/01/07/ferc-charts-a-new-path-for-large-load-co-location-in-pjm/ ; https://perkinscoie.com/insights/update/ferc-orders-pjm-revise-tariff-accommodate-co-located-load-arrangement
15. Bloomberg Law, "Oracle Agrees to Buy Power From Bloom for AI Data Centers" (Apr 2026). https://news.bloomberglaw.com/esg/oracle-agrees-to-buy-power-from-bloom-for-ai-data-centers
16. WJLA, Prince George's moratorium (Jul 2026); The Banner, Baltimore County moratorium (2026); Bay Journal on Maryland county moratoria (2026). https://wjla.com/news/local/gallery/prince-georges-council-approves-moratorium-on-new-data-center-development ; https://www.thebanner.com/politics-power/local-government/baltimore-county-data-center-moratorium-5336HRIK7JD4RH3D4ZUKSKJRWI/ ; https://www.bayjournal.com/news/energy/maryland-counties-to-data-center-industry-slow-down/article_c8362372-9a29-4ef9-925a-c81840390a95.html
17. WYPR, Frederick County overlay map (24 Dec 2025) and limits on new data center development (2 Jul 2026). https://www.wypr.org/wypr-news/2025-12-24/frederick-county-council-passes-map-for-data-center-development ; https://www.wypr.org/wypr-news/2026-07-02/frederick-county-will-limit-new-data-center-development
18. EIA retail electricity data summarized by startbusinessbystate.com (updated 28 Sep 2026); Maryland PSC note on EIA data correction (Jun 2026). https://startbusinessbystate.com/?p=16487 ; https://psc.maryland.gov/news/2026/u-s-eia-corrects-maryland-electricity-price-data/
19. Lazard, Levelized Cost of Energy+ (Jun 2025). https://lazard.com/media/0sopmth5/lazard-releases-2025-levelized-cost-of-energyplus-report.pdf
20. Maryland PSC, "PSC Seeks Generation Proposals Under Next Gen Energy Act" (30 Sep 2025); docket PC 74. https://psc.maryland.gov/news/2025/psc-seeks-generation-proposals-under-next-gen-energy-act/ ; https://webpscxb.psc.state.md.us/DMS/pc/PC74
21. Inside Climate News, Virginia regulators approve new Dominion rates and GS-5 class (2026); WAVY coverage. https://insideclimatenews.org/news/07012026/virginia-regulators-approve-new-dominion-rates/ ; https://www.wavy.com/news/virginia/state-corporation-commission-approves-new-dominion-rate-changes-for-big-electricity-users/amp/
22. Baxtel, AWS and Homer City (2026); Cleanview Pennsylvania data center tracker (Jul 2026); Inquirer on Amazon Pennsylvania investments (9 Jun 2025). https://baxtel.com/news/aws-eyes-data-center-development-at-4-5gw-gas-plant-in-pennsylvania ; https://www.cleanview.co/data-centers/pennsylvania ; https://www.inquirer.com/business/amazon-data-centers-pennsylvania-20250609.html
23. Power Engineering, GE Vernova orders and turbine slot tightness (2026); Utility Dive on gas equipment bottleneck. https://www.power-eng.com/?p=135748 ; https://www.utilitydive.com/news/natural-gas-equipment-generation-bottleneck-data-centers/812931/
24. Exelon earnings call transcript (large-load pipeline; date not shown in source). https://equibles.com/stocks/exc/documents/f7128d56-f88c-4b89-a891-e8591d7bfea0
25. Edison Electric Institute, List of Large Customer Projects and Tariffs (May 2026). https://www.eei.org/-/media/Project/EEI/Documents/Issues%20and%20Policy/List%20of%20Large%20Customer%20Projects%20and%20Tariffs
26. Pulse, "Maryland Regulators Weigh Investor-Owned Utilities' Flexible Load Proposals" (2026). https://www.pulse.bot/energy/news/maryland-regulators-weigh-investor-owned-utilities-flexible-load-proposals-da1dba1d-a17e-46eb-bb15-2487ea2d76b8/

### Items we could not verify (priority diligence list)

1. Final enacted thresholds and terms of Chapter 353 (2026) and the PSC's final large-load regulations and approved tariffs.
2. Whether HB 560 (2026) passed, and the current status of the sales-and-use-tax exemption.
3. Whether the Data Center Impact Analysis final report (due 1 Sep 2026) has been published, and its findings.
4. Maryland-specific vacancy, absorption and wholesale rents.
5. Current enacted rules on backup-generator CPCN exemptions and MDE emission standards for data-center generators.
6. Status of FERC's final ruling on PJM co-location compliance.
7. Vendor pricing and delivery slots for SOFC fuel cells, reciprocating engines, transformers and switchgear.
8. Latency and route diversity from candidate sites to Ashburn.
9. The project's own utility status, entitlements and site conditions.
