# OpenSpending — Federal Spending Tracker

## Project Overview
A data journalism site tracking federal government spending using USASpending.gov data. Focus on government waste, contractor concentration, USAID spending explosion, and the DOGE efficiency effort. Libertarian editorial lens — skeptical of big government, bureaucratic bloat, and wasteful spending.

## Tech Stack
- Next.js 14 (App Router, TypeScript, Tailwind CSS)
- Recharts for interactive charts
- Static site deployed to Vercel

## Design
- **Light theme** like FedTracker — clean, professional, data journalism feel
- Playfair Display serif font for h1 headings (import from Google Fonts)
- Indigo/blue accent colors
- Responsive, mobile-first
- Cards with subtle borders, hover effects

## Data Files (in `public/data/`)
All pre-processed JSON, import directly:
- `stats.json` — Summary: $11.2T budget, $779B contracts, $1.24T grants, 97 agencies
- `agencies.json` — 97 agencies with budgetAuthority, obligated, outlays, pctOfTotal
- `top-contractors.json` — Top 50 contractors FY2025 (name, amount, uei)
- `top-grant-recipients.json` — Top 50 grant recipients FY2025
- `top-industries.json` — Top 50 NAICS industries by contract spending
- `top-awards.json` — 100 largest individual contracts (awardId, recipient, amount, agency, description, startDate)
- `agency-spending.json` — 41 agencies with contracts + grants breakdown
- `agency-trends.json` — 18 major agencies with yearly budget/obligated/outlays (FY2017-2026)
- `contractor-trends.json` — 18 contractors appearing 3+ years with yearly amounts
- `spending-by-state.json` — 54 states/territories with contract amounts
- `spending-by-country.json` — Top 50 countries receiving federal spending (foreign aid angle)

## Key Narratives / Angles
1. **Who Gets the Money** — Top contractors (Lockheed $34B, Optum $22B, Electric Boat $21B). 10 companies get majority of contract dollars.
2. **The USAID Story** — Budget tripled from $15B (2017) to $50B (2023), now being gutted by DOGE. Where did the money go?
3. **No-Bid Nation** — Sole-source contracts, contractor concentration
4. **Foreign Aid Trail** — $X billion sent to which countries
5. **Agency Budgets** — Who spends what, budget vs actual spending (obligations vs outlays)
6. **Industry Breakdown** — Aircraft manufacturing, engineering, health insurance dominate
7. **State by State** — Where federal contract dollars flow
8. **The Biggest Deals** — Individual contracts worth $30B+ to single companies

## Pages to Build

### Homepage (`/`)
- Hero: "Follow the Money. $11.2 Trillion in Federal Spending." 
- Key stat cards: Total Budget, Contracts, Grants, Agencies
- Top 10 contractors bar chart
- Top agencies by spending bar chart
- Featured sections linking to key pages
- "Built for taxpayers who want to know where their money goes"

### Top Contractors (`/contractors`)
- Sortable table of top 50 contractors
- Bar chart of top 15
- Each contractor shows: total amount, % of all contracts
- Contractor trends over time (multi-year chart for top ones)

### Agencies (`/agencies`)
- All 97 agencies sorted by budget
- Each shows: budget authority, obligated, outlays, contracts vs grants split
- Bar chart of top 15

### Agency Detail (`/agencies/[slug]`)
- Budget trend chart (FY2017-2026) 
- Contracts vs grants breakdown
- Year-over-year changes
- Only for the 18 agencies with trend data

### Largest Contracts (`/contracts`)
- Table of 100 biggest individual contracts
- Filterable by agency
- Shows: award ID, recipient, amount, agency, description, start date

### Industries (`/industries`)  
- Top 50 NAICS industries by contract spending
- Treemap or bar chart showing concentration

### Foreign Spending (`/foreign-aid`)
- Where US money goes internationally
- Top countries by amount
- Tie to USAID narrative

### States (`/states`)
- Map or bar chart of federal contract dollars by state
- Which states benefit most from federal spending

### About (`/about`)
- Data source: USASpending.gov
- Methodology
- Editorial perspective: taxpayer accountability

## Editorial Tone
- Libertarian lens: question whether spending is necessary, highlight waste
- "Your tax dollars at work" framing
- Data-driven but skeptical of government expansion
- Frame DOGE positively as accountability effort
- Don't be partisan — let the data speak, but don't shy from calling out waste
- Examples: "10 companies receive X% of all federal contracts", "USAID's budget tripled in 6 years — who was watching?"

## Constraints
- NO CSS-only opacity/fade animations (breaks SSR)
- Keep builds under Vercel limits
- Break Claude Code tasks into 2-3 items max (OOM on 16GB Mac)
- Use `--dangerously-skip-permissions` flag with Claude Code
- Recharts components must be client components ("use client")
- Don't export constants from "use client" components for server component use
