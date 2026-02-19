import Link from "next/link";
import { TopContractorsChart } from "@/components/charts/TopContractorsChart";
import { formatDollars, formatPercent } from "@/lib/format";
import stats from "@/../public/data/stats.json";
import contractors from "@/../public/data/top-contractors.json";
import agencies from "@/../public/data/agencies.json";
import agencyTrends from "@/../public/data/agency-trends.json";

const topContractors = contractors.slice(0, 10);
const topAgencies = agencies.slice(0, 5);

const usaidTrend = (agencyTrends as Record<string, { years: { fy: number; budget: number }[] }>)["USAID"];
const usaidFirst = usaidTrend?.years?.[0];
const usaidPeak = usaidTrend?.years?.reduce((max, y) => (y.budget > max.budget ? y : max), usaidTrend.years[0]);

const statCards = [
  { label: "Total Federal Budget", value: formatDollars(stats.totalBudget), sub: `FY${stats.fiscalYear}` },
  { label: "Federal Contracts", value: formatDollars(stats.totalContracts), sub: "Awarded this year" },
  { label: "Federal Grants", value: formatDollars(stats.totalGrants), sub: "Distributed to recipients" },
  { label: "Federal Agencies", value: String(stats.agencyCount), sub: "Tracked on this site" },
];

export default function HomePage() {
  const top10Total = topContractors.reduce((sum, c) => sum + c.amount, 0);
  const contractorPct = (top10Total / stats.totalContracts) * 100;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-indigo-200 font-medium text-sm uppercase tracking-widest mb-4">
            Your tax dollars, tracked
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Follow the Money.
            <br />
            <span className="text-indigo-200">
              {formatDollars(stats.totalBudget)}
            </span>{" "}
            in Federal Spending.
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mb-8">
            Independent, data-driven analysis of how the federal government
            spends your money. Every contract. Every grant. Every agency.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contractors"
              className="px-6 py-3 bg-white text-indigo-800 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Top Contractors
            </Link>
            <Link
              href="/agencies"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg border border-indigo-400 hover:bg-indigo-500 transition-colors"
            >
              Browse Agencies
            </Link>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
            >
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top 10 Contractors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Top 10 Federal Contractors
            </h2>
            <p className="text-gray-500 mt-2">
              These 10 companies receive{" "}
              <span className="font-semibold text-indigo-700">
                {formatDollars(top10Total)}
              </span>{" "}
              — {formatPercent(contractorPct)} of all federal contracts.
            </p>
          </div>
          <Link
            href="/contractors"
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-4 md:mt-0"
          >
            View all 50 contractors →
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <TopContractorsChart data={topContractors} />
        </div>
      </section>

      {/* Top 5 Agencies */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Biggest Spenders: Top Agencies
              </h2>
              <p className="text-gray-500 mt-2">
                By budget authority — who controls the most taxpayer money?
              </p>
            </div>
            <Link
              href="/agencies"
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-4 md:mt-0"
            >
              View all {stats.agencyCount} agencies →
            </Link>
          </div>
          <div className="grid gap-4">
            {topAgencies.map((agency, i) => (
              <div
                key={agency.code}
                className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-indigo-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {agency.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {agency.abbreviation} &middot;{" "}
                      {formatPercent(agency.pctOfTotal)} of total budget
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    {formatDollars(agency.budgetAuthority)}
                  </p>
                  <p className="text-xs text-gray-400">Budget Authority</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USAID Editorial Callout */}
      {usaidFirst && usaidPeak && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 md:p-10">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-2xl font-bold text-gray-900">
                USAID: From {formatDollars(usaidFirst.budget)} to{" "}
                {formatDollars(usaidPeak.budget)} in{" "}
                {usaidPeak.fy - usaidFirst.fy} Years
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The U.S. Agency for International Development saw its budget
              authority explode by{" "}
              <span className="font-bold">
                {Math.round(
                  ((usaidPeak.budget - usaidFirst.budget) / usaidFirst.budget) *
                    100
                )}
                %
              </span>{" "}
              between FY{usaidFirst.fy} and FY{usaidPeak.fy}. While foreign aid
              serves diplomatic goals, the pace of growth raises serious
              questions about oversight, accountability, and whether taxpayers
              are getting value for their money.
            </p>
            <p className="text-gray-600 text-sm mb-6">
              This kind of unchecked budget growth — tripling in under a decade
              — is exactly what demands transparency. Where did the money go?
              Who benefited? And who was watching?
            </p>
            <Link
              href="/foreign-aid"
              className="inline-block px-5 py-2.5 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-colors text-sm"
            >
              Explore Foreign Aid Data →
            </Link>
          </div>
        </section>
      )}

      {/* CTA Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore the Data
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: "/contractors",
                title: "Top Contractors",
                desc: "Who gets the biggest checks? Lockheed Martin alone receives $34B/year.",
              },
              {
                href: "/contracts",
                title: "Largest Contracts",
                desc: "The 100 biggest individual contracts — many are no-bid.",
              },
              {
                href: "/industries",
                title: "By Industry",
                desc: "Aircraft manufacturing, engineering, and insurance dominate.",
              },
              {
                href: "/grants",
                title: "Grant Recipients",
                desc: "State health programs receive the most — California alone gets $112B.",
              },
              {
                href: "/foreign-aid",
                title: "Foreign Aid",
                desc: "Billions flow overseas. Japan, Germany, and Canada top the list.",
              },
              {
                href: "/states",
                title: "By State",
                desc: "Virginia leads with $120B — thanks to Pentagon contractors next door.",
              },
            ].map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-2">
                  {cta.title}
                </h3>
                <p className="text-sm text-gray-500">{cta.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
