# Research Findings — Federal Spending Deep Dive

## Key Statistics to Feature on Site

### GAO Fraud Estimates (Source: GAO-24-105833)
- **Federal government loses $233B-$521B annually to fraud** (GAO estimate, FY2018-2022)
- That's **3-7% of all federal obligations** lost to fraud
- $2.8 trillion in improper payments since FY2003
- $162 billion in improper payments in FY2024 alone (across 68 programs at 16 agencies)
- 75% of improper payments concentrated in just 5 program areas
- "Not all improper payments are fraud, but all fraudulent payments are improper"

### No-Bid Contract Data (Our Analysis)
- **$74 billion in no-bid (sole source) contracts in FY2025** (top 50 alone)
- Boeing: $31.1B in no-bid contracts (single company)
- Lockheed Martin: $11.2B no-bid
- 33 of top 50 no-bid contracts are DOD
- Only 4 non-DOD agencies appear in top 50 no-bid: VA (4), GSA (4), NASA (2), HHS (3)

### COVID Spending (Our Analysis)
- **$1.46 trillion in COVID emergency spending** (tagged with DEFC codes)
- HHS: $290B, Education: $287B
- Pandemic Oversight (pandemicoversight.gov) — official PRAC watchdog has its own data tools
- PRAC has AI tool for fraud detection in pandemic spending

### Contractor Concentration (Our Analysis)
- Top 10 contractors: ~$150B+ annually
- Lockheed Martin (combined subsidiaries): ~$51B
- Boeing (combined): ~$44B
- These companies also top lobbying spenders (OpenSecrets data, couldn't scrape)

### USAID (Our Analysis)
- Budget: $25.8B (FY2017) → $50.1B (FY2023) — 94% increase
- Top grant: Family Health International $925M, GAVI Alliance $880M
- Top 50 grants total: $18.1B, Top 50 contracts: $31.8B

## Additional Data Sources to Integrate

### Available Now via API
1. **FPDS (Federal Procurement Data System)** — contract-level details including competition type, set-asides, cost overruns
2. **USASpending Subawards** — who the prime contractors subcontract to (follow the money deeper)
3. **USASpending DEFC codes** — COVID-specific spending tagging
4. **Treasury Fiscal Data API** (fiscaldata.treasury.gov) — daily/monthly government spending, debt, revenue

### Available for Download
5. **POGO Federal Contractor Misconduct Database** — tracks contractor fraud, penalties (blocked by Cloudflare, may need manual download)
6. **IT Dashboard** (itdashboard.gov) — federal IT investment health, failed projects
7. **DoD OIG Reports** (dodig.mil) — audit reports on defense contract waste

### For Future Phases
8. **OpenSecrets lobbying data** — connect contractors to their lobbying spend (blocked, may need API key)
9. **Federal Audit Clearinghouse** — audit findings for grant recipients
10. **SAM.gov** — contractor registrations, exclusions, debarments

## Editorial Angles for Site Content

### Tier 1: Build Now (Highest Impact)
1. **"How Government Contracts Actually Work"** — Plain language explainer (already planned)
2. **"No-Bid Nation: $74B Without Competition"** — Data-driven page with our no-bid analysis
3. **"The $233-521 Billion Fraud Problem"** — GAO fraud estimates contextualized
4. **"The Defense Industrial Oligopoly"** — 5 companies get majority of DOD contracts
5. **"COVID: $1.46T in Emergency Spending"** — Already being built by sub-agent

### Tier 2: Build Next Week
6. **"The Consulting Tax: How Booz Allen, Deloitte & Accenture Bill $15B+/Year"** — IT consulting concentration
7. **"USAID: When Foreign Aid Becomes a Blank Check"** — Budget tripled, who benefited
8. **"The Revolving Door"** — DOD officials become contractor lobbyists (needs OpenSecrets data)
9. **"Your State's Federal Spending Report Card"** — Per-capita analysis by state

### Tier 3: Build Later
10. **"The IT Graveyard: Failed Federal Technology Projects"** — IT Dashboard data
11. **"Follow the Subcontract"** — Where prime contractor money actually goes
12. **"The Cost Overrun Hall of Shame"** — Contracts that doubled or tripled in cost
13. **"Pandemic Profiteers: Who Got Rich From COVID Contracts"** — Cross-ref with PRAC data

## Competitor Analysis

### Who else covers this?
- **USASpending.gov** — Raw data, zero editorial. Impenetrable UI.
- **POGO.org** — Project on Government Oversight. Great investigations, no data tools.
- **OpenSecrets.org** — Lobbying/money in politics. Doesn't cover contracts deeply.
- **GovExec / FedScoop / Federal News Network** — News outlets, not data tools.
- **ProPublica** — Great data journalism but not focused on contracts/spending.
- **Pandemic Oversight (PRAC)** — Official oversight body, COVID-only, has good data tools.

### Our Advantage
- **Nobody combines spending data + editorial + searchability** in one place
- USASpending has the data but no narrative
- POGO has investigations but no searchable data tools
- We're the ProPublica of federal spending — data + stories + tools

## Technical Notes
- GAO report GAO-24-105833 is the definitive fraud estimate source
- PRAC at pandemicoversight.gov has downloadable datasets for COVID spending
- IT Dashboard at itdashboard.gov has API endpoints (need to explore)
- Treasury fiscal data API at fiscaldata.treasury.gov looks promising for debt/revenue data
