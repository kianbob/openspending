import Link from "next/link";
import { AreaSpendingChart } from "@/components/charts/AreaSpendingChart";
import { AgencyContractorsChart } from "@/components/charts/AgencyContractorsChart";
import { ContractsGrantsDonut } from "@/components/charts/ContractsGrantsDonut";
import { formatDollars, formatPercent } from "@/lib/format";
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

const agencyDescriptions: Record<string, string> = {
  DOD: "The Pentagon commands nearly half a trillion dollars in contracts alone — more than the next ten agencies combined. Defense spending has grown steadily regardless of which party controls Congress, raising questions about contractor dependency and whether the military-industrial complex is serving taxpayers or the other way around.",
  HHS: "Health and Human Services is the single largest grant-making agency in the federal government, funneling over $825 billion to hospitals, insurers, and state health programs. The sheer scale of HHS spending makes meaningful oversight nearly impossible, and waste in Medicare and Medicaid remains a perennial concern.",
  VA: "The Department of Veterans Affairs spends $78 billion in contracts, much of it on healthcare services and IT modernization projects with a troubled track record. The VA's electronic health records overhaul alone has cost billions more than projected, with persistent delays and functionality issues.",
  TREAS: "The Treasury Department manages the nation's finances but its own spending footprint is relatively modest. Still, with $8.5 billion in contracts, Treasury's role in IRS enforcement expansion and financial surveillance infrastructure deserves closer taxpayer scrutiny.",
  DOE: "The Department of Energy splits nearly equally between contracts ($48B) and grants ($29B), driven by nuclear weapons maintenance, national labs, and a growing portfolio of green energy subsidies. Whether billions in clean energy grants are producing results or lining the pockets of politically connected firms is an open question.",
  DHS: "Created after 9/11, Homeland Security has become a $61 billion spending behemoth encompassing border security, FEMA, TSA, and cybersecurity. The department's rapid growth and sprawling mission have made it a magnet for contractor spending with limited accountability.",
  USDA: "The Department of Agriculture spends $57 billion in grants — mostly food assistance and farm subsidies — dwarfing its $9.6 billion contract portfolio. Decades of farm subsidies have primarily benefited large agribusiness operations, not the small family farms politicians love to invoke.",
  DOT: "Transportation commands $124 billion in grants to states and localities for roads, bridges, and transit, plus $9 billion in contracts. The Infrastructure Investment and Jobs Act supercharged this spending, but whether the money reaches actual infrastructure or gets consumed by bureaucratic overhead remains to be seen.",
  NASA: "NASA's $15.8 billion in contracts flows heavily to legacy aerospace giants like Boeing and Lockheed Martin. While SpaceX has demonstrated that space access can be dramatically cheaper, NASA continues to pour billions into the over-budget, behind-schedule Space Launch System.",
  DOS: "The State Department's $9.8 billion contract portfolio funds embassy operations, diplomatic security, and overseas construction. Its spending is modest by federal standards but notoriously difficult to audit given its global footprint.",
  DOI: "Interior manages federal lands and natural resources with a relatively balanced $6.4B contracts / $7.7B grants split. Land management costs continue rising while the department sits on trillions in untapped energy resources that could generate revenue instead of consuming tax dollars.",
  EPA: "The EPA's $25.6 billion in grants dwarfs its $1.7 billion contract budget, with most grant money flowing to state environmental programs and Superfund cleanups. Critics question whether the agency's ever-expanding regulatory reach delivers environmental results proportional to its cost.",
  GSA: "The General Services Administration is the government's landlord and procurement arm, spending $24 billion in contracts on buildings, technology, and supplies. GSA's massive purchasing power should drive efficiency, but government procurement remains legendarily slow and expensive.",
  HUD: "Housing and Urban Development distributes $28 billion almost entirely through grants to local housing authorities and community development programs. Despite decades of spending, homelessness and housing affordability have only worsened, raising fundamental questions about whether HUD's approach works.",
  DOJ: "The Justice Department's $8.5 billion in contracts covers everything from prison operations to IT systems and forensic services. Federal prison costs alone consume billions, yet recidivism rates suggest the system isn't delivering on rehabilitation.",
  ED: "The Department of Education hands out $51 billion in grants while spending $2.5 billion on contracts. Created in 1979, the department has presided over stagnant test scores and soaring college costs, leading many to question whether federal education spending improves outcomes at all.",
  DOL: "The Department of Labor distributes $9.8 billion in grants for workforce development and unemployment programs, plus $1.8 billion in contracts. Job training programs have been repeatedly found to produce minimal long-term earnings gains for participants — a poor return on taxpayer investment.",
  SBA: "The Small Business Administration's combined spending is modest at $325 million, but its loan guarantee programs expose taxpayers to billions in potential losses. The PPP debacle during COVID — rife with fraud — showed what happens when SBA scales up without adequate controls.",
  SSA: "Social Security Administration spends $1.7 billion on contracts to administer the nation's largest entitlement program. With the trust fund projected to be depleted by the mid-2030s, every dollar spent on administration rather than benefits draws increasing scrutiny.",
  USAID: "USAID's budget tripled from $15 billion to $50 billion between 2017 and 2023 — an explosion in spending with questionable oversight. DOGE has now targeted the agency for dramatic cuts, and early audits have revealed grants to organizations with little connection to American foreign policy interests.",
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
      <p className="text-gray-500 mb-4">
        <span className="font-medium text-indigo-700">{spending.code}</span>
        {years && latest
          ? ` · FY${years[0].fy}\u2013FY${latest.fy} budget trends`
          : " · FY2025 spending data"}
      </p>

      {agencyDescriptions[spending.code] && (
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-3xl">
          {agencyDescriptions[spending.code]}
        </p>
      )}

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
                  {dedupedContractors.map((c, i) => (
                    <tr
                      key={`${c.name}-${i}`}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2.5 text-gray-400 font-medium">
                        {i + 1}
                      </td>
                      <td className="px-4 py-2.5 text-gray-900">{c.name}</td>
                      <td className="px-4 py-2.5 text-right text-gray-700 font-medium">
                        {formatDollars(c.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

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
