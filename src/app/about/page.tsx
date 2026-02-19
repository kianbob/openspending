import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — OpenSpending",
  description:
    "How we track federal spending, our data sources, methodology, and editorial perspective. Built by TheDataProject.ai.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-12">
        About OpenSpending
      </h1>

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
        <p className="text-gray-700 leading-relaxed">
          Our mission is simple: taxpayers fund the government, and they deserve
          to see exactly where that money goes — without needing a PhD in public
          policy to understand it.
        </p>
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

      {/* What You Can Explore */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          What You Can Explore
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          OpenSpending covers every major angle of federal spending, with
          interactive charts, sortable tables, and editorial analysis across
          dozens of pages.
        </p>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Data Pages</h3>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>
                <Link href="/agencies" className="text-indigo-600 hover:text-indigo-800 underline">Agencies</Link>
                {" "}— 97 federal agencies with budgets, obligations, and outlays
              </li>
              <li>
                <Link href="/contractors" className="text-indigo-600 hover:text-indigo-800 underline">Contractors</Link>
                {" "}— 40+ top federal contractors with detail pages and trend data
              </li>
              <li>
                <Link href="/states" className="text-indigo-600 hover:text-indigo-800 underline">States</Link>
                {" "}— 54 states and territories with contract spending breakdowns
              </li>
              <li>
                <Link href="/industries" className="text-indigo-600 hover:text-indigo-800 underline">Industries</Link>
                {" "}— Top 50 NAICS industries by contract spending with detail pages
              </li>
              <li>
                <Link href="/contracts" className="text-indigo-600 hover:text-indigo-800 underline">Largest Contracts</Link>
                {" "}— The 100 biggest individual federal contract awards
              </li>
              <li>
                <Link href="/foreign-aid" className="text-indigo-600 hover:text-indigo-800 underline">Foreign Aid</Link>
                {" "}— Federal spending by country, with 50+ nations tracked
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Editorial &amp; Deep Dives</h3>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>
                <Link href="/usaid" className="text-indigo-600 hover:text-indigo-800 underline">USAID Deep Dive</Link>
                {" "}— Budget explosion from $15B to $50B and the 100 largest awards
              </li>
              <li>
                <Link href="/covid" className="text-indigo-600 hover:text-indigo-800 underline">COVID Spending</Link>
                {" "}— The pandemic spending tsunami and where the money went
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
                <Link href="/top-10" className="text-indigo-600 hover:text-indigo-800 underline">Top 10 Contractors</Link>
                {" "}— Individual deep dives on the 10 biggest federal contractors
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
                <Link href="/spending-analysis" className="text-indigo-600 hover:text-indigo-800 underline">Spending Analysis</Link>
                {" "}— Overall federal spending patterns and breakdowns
              </li>
              <li>
                <Link href="/how-it-works" className="text-indigo-600 hover:text-indigo-800 underline">How Government Contracts Work</Link>
                {" "}— Explainer on the federal contracting process
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Tools &amp; Analysis</h3>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>
                <Link href="/trends" className="text-indigo-600 hover:text-indigo-800 underline">Spending Trends</Link>
                {" "}— 9 years of budget and contract trend data (FY2017–2026)
              </li>
              <li>
                <Link href="/compare" className="text-indigo-600 hover:text-indigo-800 underline">Compare Tool</Link>
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
            — The primary data source for all spending figures. We pull data via
            the USASpending API and bulk download files maintained by the U.S.
            Department of the Treasury. This includes contracts, grants, agency
            budgets, and individual award transactions.
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
            payments across federal programs. Estimated $236B–$521B in annual
            waste and fraud.
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
            — Supplementary fiscal data from the U.S. Treasury, including
            national debt, revenue, and budget execution data.
          </li>
        </ul>
      </section>

      {/* Data Files */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Data Files
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          All data is pre-processed into static JSON files for fast, reliable
          delivery. The following datasets power the site:
        </p>
        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <table className="text-sm w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="py-2 pr-4 font-semibold text-gray-900">File</th>
                <th className="py-2 font-semibold text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">stats.json</td>
                <td className="py-1.5">Summary totals: budget, contracts, grants, agency count</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">agencies.json</td>
                <td className="py-1.5">97 agencies with budget authority, obligations, outlays</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">agency-spending.json</td>
                <td className="py-1.5">41 agencies with contracts vs. grants breakdown</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">agency-trends.json</td>
                <td className="py-1.5">18 major agencies with yearly budget/obligated/outlays (FY2017–2026)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">agency-contractors.json</td>
                <td className="py-1.5">Top contractors for each agency</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">top-contractors.json</td>
                <td className="py-1.5">Top 50 contractors FY2025 with amounts and identifiers</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">top-contractors-deduped.json</td>
                <td className="py-1.5">Contractors merged by parent company (subsidiaries consolidated)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">contractor-details.json</td>
                <td className="py-1.5">Detailed profiles for individual contractor pages</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">contractor-trends.json</td>
                <td className="py-1.5">18 contractors with multi-year spending trends</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">top-grant-recipients.json</td>
                <td className="py-1.5">Top 50 grant recipients FY2025</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">top-industries.json</td>
                <td className="py-1.5">Top 50 NAICS industries by contract spending</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">industry-details.json</td>
                <td className="py-1.5">Detailed profiles for individual industry pages</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">top-awards.json</td>
                <td className="py-1.5">100 largest individual contracts with descriptions</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">spending-by-state.json</td>
                <td className="py-1.5">54 states/territories with contract amounts</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">state-details.json</td>
                <td className="py-1.5">Detailed profiles for individual state pages</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">state-contractors.json</td>
                <td className="py-1.5">Top contractors per state</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">spending-by-country.json</td>
                <td className="py-1.5">Top 50 countries receiving federal spending</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">usaid-deep-dive.json</td>
                <td className="py-1.5">USAID grants and contracts data for deep dive analysis</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">covid-spending.json</td>
                <td className="py-1.5">COVID-era federal spending breakdown</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono text-xs">no-bid-contracts.json</td>
                <td className="py-1.5">Non-competitive (sole-source) contract data</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-mono text-xs">yearly-contract-trends.json</td>
                <td className="py-1.5">Year-over-year contract spending trends</td>
              </tr>
            </tbody>
          </table>
        </div>
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
