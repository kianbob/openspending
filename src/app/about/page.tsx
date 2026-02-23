import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About | OpenSpending",
  description:
    "See how we track $11.2T in federal spending across 60+ pages. Data sources, methodology, and our taxpayer accountability mission.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Breadcrumbs items={[{ label: "About" }]} />
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-12">
        About OpenSpending
      </h1>

      {/* Why This Exists */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why This Exists</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">The federal government spends over $11 trillion every year. That&apos;s $34,000 for every man, woman, and child in America — more than most families earn. Yet most Americans have no idea where it goes.</p>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">We built OpenSpending because we believe transparency isn&apos;t optional — it&apos;s the foundation of accountability. The data is all public, published by the government itself on USASpending.gov. But it&apos;s buried in spreadsheets, hidden behind jargon, and scattered across dozens of agencies.</p>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">We took that data and made it accessible. Every chart, every table, every analysis on this site exists for one reason: so you can see exactly where your tax dollars go, and decide for yourself whether it&apos;s money well spent.</p>
          <p className="text-gray-700 leading-relaxed text-lg font-medium text-indigo-900">This is your money. You deserve to see it.</p>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-12">
        <p className="text-gray-700 leading-relaxed mb-4 text-lg">
          OpenSpending is an independent, data-driven site tracking federal
          government spending. We use{" "}
          <a
            href="https://www.usaspending.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline font-semibold"
          >
            USASpending.gov
          </a>{" "}
          as our primary data source — the U.S. Treasury&apos;s official record of
          federal spending — to bring transparency to how $11.2 trillion in
          taxpayer money is spent each year. With{" "}
          <strong>60+ pages of analysis, tools, and data</strong>, we cover
          everything from individual contractor deep dives to county-level
          spending breakdowns, international spending by country, product &amp;
          service categories, grant recipients, and interactive tax calculators.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our mission is simple: taxpayers fund the government, and they deserve
          to see exactly where that money goes — without needing a PhD in public
          policy to understand it.
        </p>
      </section>

      {/* Who Built This */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Who Built This
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          OpenSpending is built by{" "}
          <a
            href="https://thedataproject.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline font-semibold"
          >
            TheDataProject.ai
          </a>{" "}
          — an AI-powered data journalism initiative focused on making public
          data accessible, understandable, and actionable. We use AI tools to
          process, analyze, and present large government datasets that would
          otherwise require teams of analysts to parse.
        </p>
      </section>

      {/* What You'll Find */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          What You&apos;ll Find
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          OpenSpending covers every major angle of federal spending across 60+
          pages of interactive charts, sortable tables, and editorial analysis.
        </p>
        <div className="space-y-4">
          {/* Interactive Tools */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Interactive Tools</h3>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>
                <Link href="/tax-calculator" className="text-indigo-600 hover:text-indigo-800 underline">Tax Calculator</Link>
                {" "}— See exactly where your tax dollars go
              </li>
              <li>
                <Link href="/shutdown-calculator" className="text-indigo-600 hover:text-indigo-800 underline">Shutdown Calculator</Link>
                {" "}— What a government shutdown costs per day
              </li>
              <li>
                <Link href="/compare" className="text-indigo-600 hover:text-indigo-800 underline">Compare</Link>
                {" "}— Side-by-side comparison of agencies, contractors, and states
              </li>
              <li>
                <Link href="/search" className="text-indigo-600 hover:text-indigo-800 underline">Search</Link>
                {" "}— Search across all agencies, contractors, states, and industries
              </li>
              <li>
                <Link href="/downloads" className="text-indigo-600 hover:text-indigo-800 underline">Data Downloads</Link>
                {" "}— Download all datasets in JSON format for your own research
              </li>
            </ul>
          </div>

          {/* Deep Dives & Investigations */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Deep Dives &amp; Investigations</h3>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>
                <Link href="/doge-reality" className="text-indigo-600 hover:text-indigo-800 underline">DOGE Reality Check</Link>
                {" "}— Are DOGE cuts delivering real savings?
              </li>
              <li>
                <Link href="/contractor-monopoly" className="text-indigo-600 hover:text-indigo-800 underline">Contractor Monopoly</Link>
                {" "}— How a handful of companies dominate federal contracts
              </li>
              <li>
                <Link href="/interest" className="text-indigo-600 hover:text-indigo-800 underline">Interest Time Bomb</Link>
                {" "}— The growing cost of interest on the national debt
              </li>
              <li>
                <Link href="/state-dependency" className="text-indigo-600 hover:text-indigo-800 underline">State Dependency</Link>
                {" "}— Which states depend most on federal spending
              </li>
              <li>
                <Link href="/spending-explosion" className="text-indigo-600 hover:text-indigo-800 underline">Spending Explosion</Link>
                {" "}— Federal spending growth over the past decade
              </li>
              <li>
                <Link href="/your-tax-bill" className="text-indigo-600 hover:text-indigo-800 underline">Your Tax Bill</Link>
                {" "}— What the average taxpayer funds
              </li>
              <li>
                <Link href="/global-comparison" className="text-indigo-600 hover:text-indigo-800 underline">US vs. World</Link>
                {" "}— How US spending compares globally
              </li>
              <li>
                <Link href="/national-debt" className="text-indigo-600 hover:text-indigo-800 underline">National Debt</Link>
                {" "}— Debt clock, trends, and projections
              </li>
              <li>
                <Link href="/pentagon-spending" className="text-indigo-600 hover:text-indigo-800 underline">Pentagon Spending</Link>
                {" "}— Defense Department spending analysis
              </li>
              <li>
                <Link href="/healthcare-spending" className="text-indigo-600 hover:text-indigo-800 underline">Healthcare Spending</Link>
                {" "}— Federal healthcare spending analysis
              </li>
              <li>
                <Link href="/no-bid" className="text-indigo-600 hover:text-indigo-800 underline">No-Bid Nation</Link>
                {" "}— $74B+ in contracts awarded without competitive bidding
              </li>
              <li>
                <Link href="/waste" className="text-indigo-600 hover:text-indigo-800 underline">Waste &amp; Fraud</Link>
                {" "}— $233–521B per year lost to fraud and improper payments
              </li>
              <li>
                <Link href="/covid" className="text-indigo-600 hover:text-indigo-800 underline">COVID Spending</Link>
                {" "}— The pandemic spending tsunami and where the money went
              </li>
              <li>
                <Link href="/usaid" className="text-indigo-600 hover:text-indigo-800 underline">USAID</Link>
                {" "}— Budget explosion from $15B to $50B and the 100 largest awards
              </li>
              <li>
                <Link href="/foreign-aid" className="text-indigo-600 hover:text-indigo-800 underline">Foreign Aid</Link>
                {" "}— Federal spending by country, with 50+ nations tracked
              </li>
              <li>
                <Link href="/efficiency" className="text-indigo-600 hover:text-indigo-800 underline">Efficiency</Link>
                {" "}— Government efficiency metrics and benchmarks
              </li>
            </ul>
          </div>

          {/* The Data */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">The Data</h3>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>
                <Link href="/spending-analysis" className="text-indigo-600 hover:text-indigo-800 underline">Federal Spending Analysis</Link>
                {" "}— Overall federal spending patterns and breakdowns
              </li>
              <li>
                <Link href="/top-10" className="text-indigo-600 hover:text-indigo-800 underline">Top 10 Contractors</Link>
                {" "}— Individual deep dives on the 10 biggest federal contractors
              </li>
              <li>
                <Link href="/trends" className="text-indigo-600 hover:text-indigo-800 underline">Spending Trends</Link>
                {" "}— 9 years of budget and contract trend data (FY2017–2026)
              </li>
              <li>
                <Link href="/how-it-works" className="text-indigo-600 hover:text-indigo-800 underline">How Contracts Work</Link>
                {" "}— Explainer on the federal contracting process
              </li>
              <li>
                <Link href="/agencies" className="text-indigo-600 hover:text-indigo-800 underline">All Agencies</Link>
                {" "}— 97 federal agencies with budgets, obligations, and outlays
              </li>
              <li>
                <Link href="/contractors" className="text-indigo-600 hover:text-indigo-800 underline">All Contractors</Link>
                {" "}— 40+ top federal contractors with detail pages and trend data
              </li>
              <li>
                <Link href="/industries" className="text-indigo-600 hover:text-indigo-800 underline">All Industries</Link>
                {" "}— Top 50 NAICS industries by contract spending with detail pages
              </li>
              <li>
                <Link href="/states" className="text-indigo-600 hover:text-indigo-800 underline">States</Link>
                {" "}— 54 states and territories with contract spending breakdowns
              </li>
              <li>
                <Link href="/contracts" className="text-indigo-600 hover:text-indigo-800 underline">Largest Contracts</Link>
                {" "}— The 100 biggest individual federal contract awards
              </li>
              <li>
                <Link href="/counties" className="text-indigo-600 hover:text-indigo-800 underline">Counties</Link>
                {" "}— Federal spending flowing to counties across America
              </li>
              <li>
                <Link href="/countries" className="text-indigo-600 hover:text-indigo-800 underline">Countries</Link>
                {" "}— International federal spending across 50+ countries
              </li>
              <li>
                <Link href="/products" className="text-indigo-600 hover:text-indigo-800 underline">Products &amp; Services</Link>
                {" "}— Federal procurement by product and service category
              </li>
              <li>
                <Link href="/grants" className="text-indigo-600 hover:text-indigo-800 underline">Grant Recipients</Link>
                {" "}— Top federal grant recipients with detail pages
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Editorial Perspective */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Editorial Perspective
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          OpenSpending takes a <strong>libertarian lens</strong> on federal
          spending. We believe taxpayers deserve full transparency into how their
          money is spent — and we&apos;re skeptical that bigger budgets
          automatically mean better outcomes.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          We support efforts like DOGE (the Department of Government Efficiency)
          to bring accountability and transparency to federal spending. When
          budgets triple in under a decade, when ten companies capture the
          majority of federal contract dollars, when billions flow overseas with
          minimal oversight — those are stories worth telling.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          We let the data speak for itself, but we don&apos;t shy from calling
          out waste when we see it. Our goal isn&apos;t partisan — it&apos;s
          accountability. The numbers don&apos;t belong to any party. They belong
          to you.
        </p>
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mt-6">
          <p className="text-indigo-900 font-medium text-lg leading-relaxed">
            &ldquo;Built for taxpayers who want to know where their money
            goes.&rdquo;
          </p>
        </div>
      </section>

      {/* Sister Sites */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Sister Sites
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          OpenSpending is part of a family of public data transparency projects
          by TheDataProject.ai.
        </p>
        <div className="space-y-3">
          <a
            href="https://openfeds.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-indigo-600">OpenFeds</span>
            <span className="text-gray-700"> — Federal employee directory and agency explorer</span>
          </a>
          <a
            href="https://openmedicaid.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-indigo-600">OpenMedicaid</span>
            <span className="text-gray-700"> — Medicaid spending transparency</span>
          </a>
        </div>
      </section>

      {/* Data Sources */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Data Sources
        </h2>
        <ul className="space-y-4">
          <li className="text-gray-700 leading-relaxed">
            <strong>
              <a
                href="https://www.usaspending.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                USASpending.gov
              </a>
            </strong>{" "}
            — Our primary data source for all spending figures. We pull data via
            the USASpending API and bulk download files maintained by the U.S.
            Department of the Treasury. This includes contracts, grants, agency
            budgets, and individual award transactions.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong>
              <a
                href="https://www.bea.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Bureau of Economic Analysis (BEA)
              </a>
            </strong>{" "}
            — GDP data and economic context for spending-as-percentage-of-GDP
            comparisons and global benchmarking.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong>
              <a
                href="https://www.census.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                U.S. Census Bureau
              </a>
            </strong>{" "}
            — Population data and state-level demographics for per-capita
            spending calculations.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong>
              <a
                href="https://www.cbo.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Congressional Budget Office (CBO)
              </a>
            </strong>{" "}
            — Budget projections, debt forecasts, and fiscal analysis used in
            our national debt and interest coverage.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong>
              <a
                href="https://fiscaldata.treasury.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Treasury Fiscal Data
              </a>
            </strong>{" "}
            — National debt, revenue, and budget execution data from the U.S.
            Treasury.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong>
              <a
                href="https://www.gao.gov/products/gao-24-105833"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                GAO Report GAO-24-105833
              </a>
            </strong>{" "}
            — Government Accountability Office report on fraud and improper
            payments across federal programs.
          </li>
        </ul>
      </section>

      {/* Methodology */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Methodology
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We pull data from the{" "}
          <strong>USASpending API</strong> and pre-process it into static JSON
          files for fast, reliable delivery. No server-side queries or database
          calls — just clean, pre-computed data served directly to your browser.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Fiscal Year 2025</strong> runs from October 1, 2024 through
          September 30, 2025. Most figures reflect obligations (legally binding
          commitments to spend) rather than actual cash outlays, as obligations
          are the most current measure of spending activity.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Contractor deduplication:</strong> Many large contractors
          operate through subsidiaries that appear as separate entities in
          federal data. For example, Lockheed Martin, Sikorsky Aircraft, and
          Rotary Wing all roll up to the same parent company. Our deduplicated
          dataset merges subsidiaries under their parent company using
          USASpending&apos;s UEI (Unique Entity Identifier) hierarchy to give a
          more accurate picture of contractor concentration.
        </p>
        <p className="text-gray-700 leading-relaxed">
          All dollar amounts are nominal (not inflation-adjusted). Rankings are
          based on total obligated amounts unless otherwise noted.
        </p>
      </section>

      {/* Open Source */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Open Source
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          OpenSpending is built with{" "}
          <strong>Next.js</strong>, <strong>TypeScript</strong>, and{" "}
          <strong>Tailwind CSS</strong>, with interactive charts powered by
          Recharts. The site is deployed on Vercel.
        </p>
        <p className="text-gray-700 leading-relaxed">
          All underlying data is public and sourced from USASpending.gov. We
          believe government spending data should be easy to access, easy to
          understand, and impossible to ignore.
        </p>
      </section>

      {/* Download the Data */}
      <section className="mb-12">
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-2">
            Download the Data
          </h2>
          <p className="text-indigo-800 leading-relaxed mb-4">
            All of our datasets are available for free download in JSON format.
            Use them for your own research, journalism, or analysis.
          </p>
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            Browse All Datasets &rarr;
          </Link>
        </div>
      </section>

      {/* Update Frequency */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Update Frequency</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Data is refreshed periodically from USASpending.gov. Federal spending data is updated daily by the Treasury Department, but we typically refresh our datasets monthly to ensure stability and accuracy. Major updates coincide with fiscal year milestones (quarterly and year-end).</p>
        <p className="text-gray-700 leading-relaxed">Current data reflects <strong>Fiscal Year 2025</strong> (October 2024 – September 2025). Historical trends cover FY2017–FY2025.</p>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Contact
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          OpenSpending is a project of{" "}
          <a
            href="https://thedataproject.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline font-semibold"
          >
            TheDataProject.ai
          </a>
          . For questions, corrections, media inquiries, or partnership
          opportunities, reach out through our main site.
        </p>
        <a
          href="https://thedataproject.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          Visit TheDataProject.ai &rarr;
        </a>
      </section>

      {/* Back to Homepage */}
      <div className="pt-8 border-t border-gray-200">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          &larr; Back to Homepage
        </Link>
      </div>
    </div>
  );
}
