import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — OpenSpending",
  description:
    "How we track federal spending, our data sources, methodology, and editorial perspective.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-12">
        About OpenSpending
      </h1>

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
            className="text-indigo-600 hover:text-indigo-800 underline font-medium"
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
