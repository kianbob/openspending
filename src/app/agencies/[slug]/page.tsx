import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedPages } from "@/components/RelatedPages";
import { AreaSpendingChart } from "@/components/charts/AreaSpendingChart";
import { AgencyContractorsChart } from "@/components/charts/AgencyContractorsChart";
import { ContractsGrantsDonut } from "@/components/charts/ContractsGrantsDonut";
import { formatDollars, formatPercent, toTitleCase } from "@/lib/format";
import { agencyDescriptionsBySlug, agencyDescriptionsByCode } from "@/data/agency-descriptions";
import agencyTrends from "@/../public/data/agency-trends.json";
import agencySpending from "@/../public/data/agency-spending.json";
import agencyContractorsData from "@/../public/data/agency-contractors.json";
import contractorDetails from "@/../public/data/contractor-details.json";
import agencyGrowth from "@/../public/data/agency-growth.json";

type GrowthEntry = {
  name: string;
  fy2017: number;
  fy2025: number;
  growth_pct: number;
  growth_dollars: number;
};

const growthData = agencyGrowth as GrowthEntry[];
const growthRanked = [...growthData].sort((a, b) => b.growth_pct - a.growth_pct);

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

const contractorSlugs = new Set(Object.keys(contractorDetails as Record<string, unknown>));

function toContractorSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "").replace(/^-+/, "");
}

const SUFFIX_RE = /\b(INC|LLC|CORP|CORPORATION|COMPANY|LTD|LP|L\.P\.|CO)\.?\b/g;
const TRAILING_PUNCT = /[\s,.\-]+$/;

function normalizeContractorName(name: string): string {
  return name.toUpperCase().replace(SUFFIX_RE, "").replace(TRAILING_PUNCT, "").trim();
}

function dedupeContractors(
  contractors: { name: string; amount: number }[]
): { name: string; amount: number }[] {
  const groups = new Map<
    string,
    { total: number; nameCounts: Map<string, number> }
  >();
  for (const c of contractors) {
    const key = normalizeContractorName(c.name);
    let group = groups.get(key);
    if (!group) {
      group = { total: 0, nameCounts: new Map() };
      groups.set(key, group);
    }
    group.total += c.amount;
    group.nameCounts.set(c.name, (group.nameCounts.get(c.name) ?? 0) + 1);
  }
  return Array.from(groups.values())
    .map((g) => {
      let bestName = "";
      let bestCount = 0;
      for (const [name, count] of g.nameCounts) {
        if (count > bestCount) {
          bestCount = count;
          bestName = name;
        }
      }
      return { name: bestName, amount: g.total };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 20);
}

export function generateStaticParams() {
  return allAgencies.map((a) => ({ slug: a.spending.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = slugMap.get(slug);
  const name = entry?.spending.name ?? "Agency";
  const contracts = entry?.spending.contracts ?? 0;
  const grants = entry && "grants" in entry.spending ? (entry.spending.grants ?? 0) : 0;
  const total = contracts + grants;
  const amount = total > 0 ? `$${(total / 1e9).toFixed(1)}B` : "";
  const title = amount ? `${name}: ${amount} in Spending — OpenSpending` : `${name} — OpenSpending`;
  const description = amount
    ? `${name} spends ${amount} across contracts and grants. Budget trends, top contractors, and spending breakdowns.`
    : `Budget trends, contracts, and grants for ${name}.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function AgencyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = slugMap.get(slug);
  if (!entry) notFound();

  const { spending, trend } = entry;
  const years = trend?.years ?? null;
  const latest = years ? years[years.length - 1] : null;
  const contracts = spending.contracts || 0;
  const grants = "grants" in spending ? (spending.grants ?? 0) : 0;
  const budget = latest ? latest.budget : contracts + grants;

  // Growth data
  const growth = growthData.find((g) => g.name === spending.name) ?? null;
  const growthRank = growth
    ? growthRanked.findIndex((g) => g.name === spending.name) + 1
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Agencies", href: "/agencies" }, { label: spending.name }]} />

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {spending.name}
      </h1>
      <p className="text-gray-500 mb-4">
        <span className="font-medium text-indigo-700">{spending.code}</span>
        {years && latest
          ? ` · FY${years[0].fy}\u2013FY${latest.fy} budget trends`
          : " · FY2025 spending data"}
      </p>

      {agencyDescriptionsByCode[spending.code] && (
        <>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-3xl">
            {agencyDescriptionsByCode[spending.code].description}
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 max-w-3xl">
            <h2 className="text-sm font-bold text-gray-900 mb-1">💰 Taxpayer Accountability</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {agencyDescriptionsByCode[spending.code].accountability}
            </p>
          </div>
        </>
      )}

      {/* Stat cards */}
      <div className={`grid grid-cols-1 ${growth ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"} gap-4 mb-10`}>
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
        {growth && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Budget Growth (FY17→25)
            </p>
            <p className={`text-2xl font-bold mt-1 ${growth.growth_pct >= 0 ? "text-red-600" : "text-emerald-600"}`}>
              {growth.growth_pct >= 0 ? "+" : ""}{formatPercent(growth.growth_pct)}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              {growth.growth_dollars >= 0 ? "+" : ""}{formatDollars(growth.growth_dollars)}
            </p>
          </div>
        )}
      </div>

      {/* Contracts vs Grants donut */}
      {contracts > 0 && grants > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Contracts vs Grants
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <ContractsGrantsDonut contracts={contracts} grants={grants} />
          </div>
        </div>
      )}

      {/* Budget trend chart */}
      {years ? (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Trend</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <AreaSpendingChart data={years} />
          </div>
        </div>
      ) : (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Spending Breakdown</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Contracts</p>
                <p className="text-2xl font-bold text-indigo-700">{formatDollars(contracts)}</p>
                {contracts + grants > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formatPercent((contracts / (contracts + grants)) * 100)} of total spending
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Grants</p>
                <p className="text-2xl font-bold text-emerald-700">{formatDollars(grants)}</p>
                {contracts + grants > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formatPercent((grants / (contracts + grants)) * 100)} of total spending
                  </p>
                )}
              </div>
            </div>
            {contracts + grants > 0 && (
              <div className="mt-5">
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-indigo-500 h-full"
                    style={{ width: `${(contracts / (contracts + grants)) * 100}%` }}
                  />
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${(grants / (contracts + grants)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                  <span>Contracts</span>
                  <span>Grants</span>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-4">
              Historical budget trend data is not available for this agency. FY2025 contract and grant totals shown.
            </p>
          </div>
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

      {/* Growth Comparison */}
      {growth && growthRank && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How This Agency&apos;s Growth Compares
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
            <p className="text-gray-700">
              <span className="font-bold text-gray-900">{spending.name}</span> grew{" "}
              <span className={`font-bold ${growth.growth_pct >= 0 ? "text-red-600" : "text-emerald-600"}`}>
                {growth.growth_pct >= 0 ? "+" : ""}{formatPercent(growth.growth_pct)}
              </span>{" "}
              from FY2017 to FY2025 —{" "}
              <span className="font-bold text-indigo-700">
                #{growthRank} {growthRank === 1 ? "fastest" : growthRank <= 3 ? "fastest" : ""} growing
              </span>{" "}
              of {growthRanked.length} major agencies.
            </p>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Agency</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Growth %</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Growth $</th>
                </tr>
              </thead>
              <tbody>
                {growthRanked.map((g, i) => (
                  <tr
                    key={g.name}
                    className={`border-b border-gray-100 ${g.name === spending.name ? "bg-indigo-50 font-semibold" : "hover:bg-gray-50"}`}
                  >
                    <td className="px-4 py-2.5 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2.5 text-gray-900">
                      {g.name === spending.name ? `→ ${g.name}` : g.name}
                    </td>
                    <td className={`px-4 py-2.5 text-right ${g.growth_pct >= 0 ? "text-red-600" : "text-emerald-600"}`}>
                      {g.growth_pct >= 0 ? "+" : ""}{formatPercent(g.growth_pct)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-700">
                      {g.growth_dollars >= 0 ? "+" : ""}{formatDollars(g.growth_dollars)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Contractors */}
      {agencyContractors[slug] && (() => {
        const dedupedContractors = dedupeContractors(agencyContractors[slug]);
        return (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Top Contractors
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6">
              <AgencyContractorsChart data={dedupedContractors} />
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
                  {dedupedContractors.map((c, i) => {
                    const cSlug = toContractorSlug(c.name);
                    const hasPage = contractorSlugs.has(cSlug);
                    return (
                      <tr
                        key={`${c.name}-${i}`}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-4 py-2.5 text-gray-400 font-medium">
                          {i + 1}
                        </td>
                        <td className="px-4 py-2.5 text-gray-900">
                          {hasPage ? (
                            <Link href={`/contractors/${cSlug}`} className="text-indigo-600 hover:text-indigo-800 hover:underline">
                              {toTitleCase(c.name)}
                            </Link>
                          ) : (
                            toTitleCase(c.name)
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-right text-gray-700 font-medium">
                          {formatDollars(c.amount)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {/* Related Agencies */}
      {agencyDescriptionsByCode[spending.code]?.relatedSlugs?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Agencies</h2>
          <div className="flex flex-wrap gap-3">
            {agencyDescriptionsByCode[spending.code].relatedSlugs
              .filter((rs) => slugMap.has(rs))
              .map((rs) => (
                <Link
                  key={rs}
                  href={`/agencies/${rs}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  {slugMap.get(rs)!.spending.name}
                </Link>
              ))}
          </div>
        </div>
      )}

      <RelatedPages items={[
        { href: "/budget-functions", title: "Budget Functions", description: "How federal spending is categorized by purpose and function." },
        { href: "/contractors", title: "Top Contractors", description: "Which companies receive the most federal contract dollars." },
        { href: "/spending-explosion", title: "Spending Explosion", description: "How federal spending has grown dramatically since 2017." },
        { href: "/subagencies", title: "Sub-Agencies", description: "Detailed spending by sub-agencies and bureaus." },
      ]} />

      <div className="flex items-center justify-between mt-4">
        <Link
          href="/agencies"
          className="text-indigo-600 hover:text-indigo-800 text-sm"
        >
          &larr; Back to all agencies
        </Link>
        <a
          href={`https://www.usaspending.gov/agency/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-indigo-600 text-sm transition-colors"
        >
          View on USASpending.gov &rarr;
        </a>
      </div>
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
