import Link from "next/link";
import { TopContractorsChart } from "@/components/charts/TopContractorsChart";
import { ContractTrendsAreaChart } from "@/components/charts/ContractTrendsAreaChart";
import { SearchBar } from "@/components/SearchBar";
import { formatDollars, formatPercent } from "@/lib/format";
import stats from "@/../public/data/stats.json";
import contractors from "@/../public/data/top-contractors.json";
import agencies from "@/../public/data/agencies.json";
import agencyTrends from "@/../public/data/agency-trends.json";
import contractTrends from "@/../public/data/yearly-contract-trends.json";

const topContractors = contractors.slice(0, 10);
const topAgencies = agencies.slice(0, 5);

const usaidTrend = (agencyTrends as Record<string, { years: { fy: number; budget: number }[] }>)["USAID"];
const usaidFirst = usaidTrend?.years?.[0];
const usaidPeak = usaidTrend?.years?.reduce((max, y) => (y.budget > max.budget ? y : max), usaidTrend.years[0]);

const miniTrendData = contractTrends.map((y) => ({
  fy: y.fy,
  totalContracts: y.totalContracts,
}));

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
          <div className="flex flex-wrap gap-3 mb-8">
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
          <SearchBar />
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

      {/* Fraud Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Link
          href="/waste"
          className="block bg-gradient-to-r from-red-700 to-red-600 rounded-xl p-6 md:p-8 hover:from-red-800 hover:to-red-700 transition-all group"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-red-200 text-sm font-medium uppercase tracking-widest mb-1">
                Government Accountability Office
              </p>
              <p className="text-white text-xl md:text-2xl font-bold">
                The government loses $233–521 billion per year to fraud.
              </p>
              <p className="text-red-100 text-sm mt-1">
                3–7% of all federal spending. That is more than the entire education budget.
              </p>
            </div>
            <span className="text-white font-semibold text-sm whitespace-nowrap group-hover:underline">
              Read the full breakdown →
            </span>
          </div>
        </Link>
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

      {/* Spending Trends Mini Chart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Spending Trends
            </h2>
            <p className="text-gray-500 mt-2">
              Federal contract spending FY2017–FY2025 — up{" "}
              {Math.round(
                ((contractTrends[contractTrends.length - 1].totalContracts -
                  contractTrends[0].totalContracts) /
                  contractTrends[0].totalContracts) *
                  100
              )}
              % in nine years.
            </p>
          </div>
          <Link
            href="/trends"
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-4 md:mt-0"
          >
            Full trends analysis →
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <ContractTrendsAreaChart
            data={miniTrendData}
            height={280}
            showCovidLine={true}
          />
        </div>
      </section>

      {/* COVID Spending Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">&#x1F4B8;</span>
              <h2 className="text-2xl font-bold text-gray-900">
                $1.46 Trillion in COVID Spending
              </h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              The pandemic triggered the largest emergency spending surge in
              history. Trillions flowed through HHS, Education, Defense, and
              Homeland Security — much of it bypassing competitive bidding.
              Where did the money go?
            </p>
          </div>
          <Link
            href="/covid"
            className="inline-block px-5 py-2.5 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors text-sm whitespace-nowrap"
          >
            Explore COVID Spending →
          </Link>
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

      {/* Key Findings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Key Findings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "10 companies control the majority of contract dollars",
              body: `The top 10 federal contractors receive ${formatDollars(topContractors.reduce((s, c) => s + c.amount, 0))} — that's ${formatPercent((topContractors.reduce((s, c) => s + c.amount, 0) / stats.totalContracts) * 100)} of all contracts flowing to just a handful of firms.`,
            },
            {
              title: "USAID's budget tripled in under a decade",
              body: "From $25.8B in FY2017 to a peak of $50.1B in FY2023 — with minimal public scrutiny. Now DOGE is cutting it back. The question: who was watching while it grew?",
            },
            {
              title: "COVID spending never fully unwound",
              body: "Emergency pandemic spending pushed contract levels to new highs. Even after the crisis passed, spending didn't return to pre-COVID baselines — the ratchet effect in action.",
            },
            {
              title: "Virginia gets more federal contracts than any other state",
              body: "Pentagon-adjacent contractors in Northern Virginia pull in over $120B in federal contracts annually — more than California and Texas combined.",
            },
          ].map((finding) => (
            <div
              key={finding.title}
              className="bg-indigo-50 border border-indigo-100 rounded-xl p-6"
            >
              <h3 className="font-bold text-gray-900 mb-2">{finding.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {finding.body}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
