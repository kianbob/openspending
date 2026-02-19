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

      {/* The Data */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          The Data
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          All data on this site comes from{" "}
          <a
            href="https://www.usaspending.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            USASpending.gov
          </a>
          , the official source for federal spending data maintained by the U.S.
          Department of the Treasury. It is the most comprehensive public record
          of how the federal government spends taxpayer money.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The data reflects <strong>Fiscal Year 2025</strong> and covers federal
          contracts, grants, agency budgets, and individual award transactions.
          We update our datasets as new data becomes available from the
          USASpending API.
        </p>
      </section>

      {/* Methodology */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Methodology
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We pull data from the USASpending API and pre-process it into static
          JSON files for fast, reliable delivery. No server-side queries or
          database calls — just clean, pre-computed data served directly to your
          browser.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our datasets include:
        </p>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2 mb-4">
          <li>
            <strong>Top 50 contractors</strong> ranked by total contract value in
            FY2025
          </li>
          <li>
            <strong>97 federal agencies</strong> with budget authority,
            obligations, and outlays
          </li>
          <li>
            <strong>100 largest individual contracts</strong> with recipient,
            amount, agency, and description
          </li>
          <li>
            <strong>Top 50 industries</strong> by NAICS code and contract
            spending
          </li>
          <li>
            <strong>Spending by state</strong> — 54 states and territories
          </li>
          <li>
            <strong>Spending by country</strong> — top 50 countries receiving
            federal dollars
          </li>
          <li>
            <strong>Historical trends</strong> for 18 major agencies and 18
            contractors across multiple fiscal years (FY2017–2026)
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          All dollar amounts are nominal (not inflation-adjusted). Rankings are
          based on total obligated amounts unless otherwise noted.
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

      {/* Back to Homepage */}
      <div className="pt-8 border-t border-gray-200">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}
