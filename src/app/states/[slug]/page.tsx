import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatDollars, formatPercent, toTitleCase } from "@/lib/format";
import stateDetails from "@/../public/data/state-details.json";
import stateContractors from "@/../public/data/state-contractors.json";
import { StateContractorsChart } from "@/components/charts/StateContractorsChart";

export const dynamicParams = true;

type StateEntry = {
  name: string;
  code: string;
  slug: string;
  totalAmount: number;
  rank: number;
  pctOfTotal: number;
  perCapita: number | null;
};

const details = stateDetails as Record<string, StateEntry>;
const contractors = stateContractors as Record<string, { name: string; amount: number }[]>;

const slugMap = new Map(
  Object.values(details).map((entry) => [entry.slug, entry])
);

function getEditorialCallout(code: string, name: string): string {
  switch (code) {
    case "VA":
      return "Virginia dominates federal contracting thanks to its proximity to the Pentagon and Washington, D.C. Major defense contractors like Northrop Grumman, Booz Allen Hamilton, and Leidos are headquartered here, along with a massive intelligence community presence in Northern Virginia.";
    case "MD":
      return "Maryland's outsized share of federal contracts stems from its proximity to Washington, D.C. The state hosts the National Institutes of Health, NSA headquarters at Fort Meade, and numerous defense and cybersecurity contractors in the Baltimore–Washington corridor.";
    case "DC":
      return "As the seat of the federal government, the District of Columbia is home to agency headquarters, federal offices, and a dense network of government contractors and consulting firms. Virtually every major federal contractor maintains a significant D.C. presence.";
    case "TX":
      return "Texas draws federal contract dollars through a combination of major military installations — Fort Cavazos, Fort Bliss, and Joint Base San Antonio — NASA's Johnson Space Center in Houston, and a booming defense and energy sector across the state.";
    case "CA":
      return "California's federal contract haul reflects its tech industry, major defense presence (Northrop Grumman, Raytheon), and national laboratories like Lawrence Livermore and Sandia. The state also hosts multiple Navy and Air Force installations along its coast.";
    case "CT":
      return "Connecticut punches well above its weight in federal contracting, driven almost entirely by submarine manufacturing at Electric Boat's shipyard in Groton and Pratt & Whitney jet engine production. The state is a cornerstone of the military-industrial supply chain.";
    case "FL":
      return "Florida benefits from Kennedy Space Center, MacDill Air Force Base (home of U.S. Central Command), extensive military training facilities, and a growing defense-tech corridor. The state's year-round weather makes it ideal for military operations.";
    case "AZ":
      return "Arizona's federal contract spending is fueled by defense manufacturing, Luke Air Force Base, Raytheon's missile systems division in Tucson, and the Army's Yuma Proving Ground. The state is a key hub for military testing and aerospace production.";
    case "AL":
      return "Alabama punches above its weight thanks to Redstone Arsenal in Huntsville — home to the Army's missile defense programs — and NASA's Marshall Space Flight Center. Huntsville has become one of the fastest-growing defense and space hubs in the country.";
    default:
      return `Federal contract dollars flow to ${name} through a mix of defense installations, healthcare services, and infrastructure programs.`;
  }
}

export function generateStaticParams() {
  return Object.values(details).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = slugMap.get(slug);
  const name = entry?.name ?? "State";
  const amount = entry ? `$${(entry.totalAmount / 1e9).toFixed(1)}B` : "";
  const title = entry ? `Federal Spending in ${name}: ${amount} — OpenSpending` : `${name} — Federal Spending — OpenSpending`;
  const description = entry
    ? `${name} receives ${amount} in federal contracts, ranking #${entry.rank} nationwide. See why and where the money flows.`
    : `Federal contract spending data for ${name}.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function StateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = slugMap.get(slug);
  if (!entry) return null;

  const { name, code, totalAmount, rank, pctOfTotal } = entry;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "States", href: "/states" }, { label: name }]} />

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {name}
      </h1>
      <p className="text-gray-500 mb-8">
        Rank #{rank} &middot; {formatPercent(pctOfTotal)} of federal contract
        spending
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Total Contract Spending
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatDollars(totalAmount)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            National Rank
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">#{rank}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            % of Total
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {formatPercent(pctOfTotal)}
          </p>
        </div>
      </div>

      {/* Editorial callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Why {name}?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {getEditorialCallout(code, name)}
        </p>
      </div>

      {/* Top Contractors */}
      {(() => {
        const raw = contractors[code];
        if (!raw) return null;
        const filtered = raw.filter((c) => c.name !== "MULTIPLE RECIPIENTS");
        if (filtered.length === 0) return null;
        const top10 = filtered.slice(0, 10);
        const top5 = filtered.slice(0, 5);
        return (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Top Contractors in {name}
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-gray-500 font-medium">Rank</th>
                    <th className="text-left py-2 pr-4 text-gray-500 font-medium">Contractor</th>
                    <th className="text-right py-2 text-gray-500 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {top10.map((c, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                      <td className="py-2 pr-4 text-gray-900">{toTitleCase(c.name)}</td>
                      <td className="py-2 text-right font-medium text-gray-900">{formatDollars(c.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <StateContractorsChart data={top5.map((c) => ({ name: toTitleCase(c.name), amount: c.amount }))} />
          </div>
        );
      })()}

      {/* Explore More */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/states"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-gray-900">All States</p>
            <p className="text-sm text-gray-500 mt-1">
              Federal contract spending by state
            </p>
          </Link>
          <Link
            href="/contractors"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-gray-900">Top Contractors</p>
            <p className="text-sm text-gray-500 mt-1">
              Top 50 federal contractors ranked by spending
            </p>
          </Link>
          <Link
            href="/agencies"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-gray-900">Agencies</p>
            <p className="text-sm text-gray-500 mt-1">
              Federal agency budgets and spending breakdowns
            </p>
          </Link>
        </div>
      </div>

      <Link
        href="/states"
        className="text-indigo-600 hover:text-indigo-800 text-sm"
      >
        &larr; Back to all states
      </Link>
    </div>
  );
}
