import Link from "next/link";
import { AreaSpendingChart } from "@/components/charts/AreaSpendingChart";
import { AgencyContractorsChart } from "@/components/charts/AgencyContractorsChart";
import { formatDollars, formatDollarsLong, formatPercent } from "@/lib/format";
import agencyTrends from "@/../public/data/agency-trends.json";
import agencySpending from "@/../public/data/agency-spending.json";
import agencyContractorsData from "@/../public/data/agency-contractors.json";

export const dynamicParams = true;

const agencyContractors = agencyContractorsData as Record<
  string,
  { name: string; amount: number }[]
>;

type TrendEntry = {
  code: string;
  abbr: string;
  name?: string;
  years: { fy: number; budget: number; obligated: number; outlays: number }[];
};

const trends = agencyTrends as Record<string, TrendEntry>;

// Map agency-spending codes to agency-trends keys where they differ
const codeToTrendKey: Record<string, string> = {
  DOS: "State",
  TREAS: "Treasury",
  DOC: "Commerce",
};

// Build list of ALL agencies with slugs
const allAgencies = agencySpending
  .filter((a): a is typeof a & { slug: string } => a.slug != null)
  .map((a) => {
    const trendKey = codeToTrendKey[a.code] ?? a.code;
    const trend = trends[trendKey];
    const hasTrend = trend && trend.years.length > 0;
    return { spending: a, trend: hasTrend ? trend : null };
  });

const slugMap = new Map(allAgencies.map((a) => [a.spending.slug, a]));

export function generateStaticParams() {
  return allAgencies.map((a) => ({ slug: a.spending.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = slugMap.get(params.slug);
  const name = entry?.spending.name ?? "Agency";
  return {
    title: `${name} — OpenSpending`,
    description: `Budget trends, contracts, and grants for ${name}.`,
  };
}

export default function AgencyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = slugMap.get(params.slug);
  if (!entry) return null;

  const { spending, trend } = entry;
  const years = trend?.years ?? null;
  const latest = years ? years[years.length - 1] : null;
  const contracts = spending.contracts || 0;
  const grants = "grants" in spending ? (spending.grants ?? 0) : 0;
  const budget = latest ? latest.budget : contracts + grants;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/agencies"
        className="text-indigo-600 hover:text-indigo-800 text-sm mb-6 inline-block"
      >
        &larr; All Agencies
      </Link>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {spending.name}
      </h1>
      <p className="text-gray-500 mb-8">
        <span className="font-medium text-indigo-700">{spending.code}</span>
        {years && latest
          ? ` · FY${years[0].fy}\u2013FY${latest.fy} budget trends`
          : " · FY2025 spending data"}
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {latest ? `Budget Authority (FY${latest.fy})` : "Total Spending"}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatDollars(budget)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Total Contracts
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {formatDollars(contracts)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Total Grants
          </p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {formatDollars(grants)}
          </p>
        </div>
      </div>

      {/* Budget trend chart */}
      {years ? (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Trend</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <AreaSpendingChart data={years} />
          </div>
        </div>
      ) : (
        <div className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center text-gray-500">
          Historical trend data not available for this agency.
        </div>
      )}

      {/* Year-over-year table */}
      {years && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Year-over-Year Changes
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    FY
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    YoY
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Obligated
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    YoY
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Outlays
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    YoY
                  </th>
                </tr>
              </thead>
              <tbody>
                {years.map((yr, i) => {
                  const prev = i > 0 ? years[i - 1] : null;
                  const budgetChg = prev
                    ? ((yr.budget - prev.budget) / prev.budget) * 100
                    : null;
                  const obligatedChg = prev
                    ? ((yr.obligated - prev.obligated) / prev.obligated) * 100
                    : null;
                  const outlaysChg = prev
                    ? ((yr.outlays - prev.outlays) / prev.outlays) * 100
                    : null;

                  return (
                    <tr
                      key={yr.fy}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2.5 font-medium text-gray-900">
                        {yr.fy}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-700">
                        {formatDollars(yr.budget)}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <YoyBadge value={budgetChg} />
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-700">
                        {formatDollars(yr.obligated)}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <YoyBadge value={obligatedChg} />
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-700">
                        {formatDollars(yr.outlays)}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <YoyBadge value={outlaysChg} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Contractors */}
      {agencyContractors[params.slug] && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Top Contractors
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6">
            <AgencyContractorsChart data={agencyContractors[params.slug]} />
          </div>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    #
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Contractor
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {agencyContractors[params.slug].map((c, i) => (
                  <tr
                    key={`${c.name}-${i}`}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2.5 text-gray-400 font-medium">
                      {i + 1}
                    </td>
                    <td className="px-4 py-2.5 text-gray-900">{c.name}</td>
                    <td className="px-4 py-2.5 text-right text-gray-700 font-medium">
                      {formatDollarsLong(c.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Link
        href="/agencies"
        className="text-indigo-600 hover:text-indigo-800 text-sm"
      >
        &larr; Back to all agencies
      </Link>
    </div>
  );
}

function YoyBadge({ value }: { value: number | null }) {
  if (value === null) return <span className="text-gray-300">&mdash;</span>;
  const positive = value >= 0;
  return (
    <span
      className={
        positive ? "text-red-600 font-medium" : "text-emerald-600 font-medium"
      }
    >
      {positive ? "+" : ""}
      {formatPercent(value)}
    </span>
  );
}
