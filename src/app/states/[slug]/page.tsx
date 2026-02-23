import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedPages } from "@/components/RelatedPages";
import { SourceCitation } from "@/components/SourceCitation";
import { formatDollars, formatPercent, toTitleCase } from "@/lib/format";
import stateDetails from "@/../public/data/state-details.json";
import stateContractors from "@/../public/data/state-contractors.json";
import stateEnriched from "@/../public/data/state-spending-enriched.json";
import { StateContractorsChart } from "@/components/charts/StateContractorsChart";

export const dynamicParams = true;

const statePopulations: Record<string, number> = {
  "California": 39.5, "Texas": 30.0, "Florida": 22.2, "New York": 19.7,
  "Pennsylvania": 13.0, "Illinois": 12.6, "Ohio": 11.8, "Georgia": 10.9,
  "Virginia": 8.6, "Maryland": 6.2, "District of Columbia": 0.7,
  "Washington": 7.7, "Massachusetts": 7.0, "Arizona": 7.4, "Colorado": 5.8,
  "Minnesota": 5.7, "Wisconsin": 5.9, "Missouri": 6.2, "Indiana": 6.8,
  "Tennessee": 7.1, "North Carolina": 10.7, "Michigan": 10.0,
  "New Jersey": 9.3, "South Carolina": 5.3, "Alabama": 5.1, "Louisiana": 4.6,
  "Kentucky": 4.5, "Oregon": 4.2, "Oklahoma": 4.0, "Connecticut": 3.6,
  "Utah": 3.4, "Iowa": 3.2, "Nevada": 3.2, "Arkansas": 3.0,
  "Mississippi": 2.9, "Kansas": 2.9, "New Mexico": 2.1, "Nebraska": 2.0,
  "Idaho": 1.9, "West Virginia": 1.8, "Hawaii": 1.4, "New Hampshire": 1.4,
  "Maine": 1.4, "Montana": 1.1, "Rhode Island": 1.1, "Delaware": 1.0,
  "South Dakota": 0.9, "North Dakota": 0.8, "Alaska": 0.7, "Vermont": 0.6,
  "Wyoming": 0.6,
};

type StateEntry = {
  name: string;
  code: string;
  slug: string;
  totalAmount: number;
  rank: number;
  pctOfTotal: number;
  perCapita: number | null;
};

type EnrichedEntry = {
  name: string;
  amount: number;
  code: string;
  population: number | null;
  per_capita: number | null;
  rank_total: number;
  rank_per_capita: number | null;
};

const details = stateDetails as Record<string, StateEntry>;
const contractors = stateContractors as Record<string, { name: string; amount: number }[]>;
const enrichedByCode = new Map(
  (stateEnriched as EnrichedEntry[]).map((e) => [e.code, e])
);

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
  const title = entry ? `${name}: ${amount} in Federal Contracts | OpenSpending` : `${name} Federal Spending | OpenSpending`;
  const description = entry
    ? `${name} ranks #${entry.rank} with ${amount} in federal contracts. See top contractors, per-capita spending, and where the money goes.`
    : `Federal contract spending data for ${name}. Follow the money.`;
  return {
    title,
    description,
    alternates: { canonical: `https://www.openspending.us/states/${slug}` },
    openGraph: { title, description, url: `https://www.openspending.us/states/${slug}` },
  };
}

export default async function StateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = slugMap.get(slug);
  if (!entry) notFound();

  const { name, code, totalAmount, rank, pctOfTotal } = entry;
  const populationM = statePopulations[name];
  const perCapita = populationM ? Math.round(totalAmount / (populationM * 1e6)) : null;
  const enriched = enrichedByCode.get(code);
  const perCapitaRank = enriched?.rank_per_capita ?? null;

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
      <div className={`grid grid-cols-1 gap-4 mb-10 ${perCapita ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
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
        {perCapita && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Per Capita
            </p>
            <p className="text-2xl font-bold text-indigo-700 mt-1">
              ${perCapita.toLocaleString()} per resident
            </p>
            {perCapitaRank && (
              <p className="text-xs text-gray-500 mt-1">
                <span className="inline-flex items-center bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  #{perCapitaRank}
                </span>
                {" "}in per-capita spending
              </p>
            )}
          </div>
        )}
      </div>

      {/* Per capita rank callout */}
      {perCapitaRank && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-10">
          <p className="text-indigo-900 font-medium">
            Ranked <span className="font-bold">#{perCapitaRank}</span> in per-capita federal spending among all states and territories.
          </p>
        </div>
      )}

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

      <RelatedPages items={[
        { href: "/state-dependency", title: "State Dependency", description: "Which states depend most on federal spending." },
        { href: "/counties", title: "Counties", description: "Federal spending at the county level across America." },
        { href: "/welfare-queens", title: "Welfare Queens", description: "Which states receive more federal money than they pay in taxes." },
        { href: "/tax-calculator", title: "Tax Calculator", description: "See exactly where your federal tax dollars go." },
      ]} />

      <Link
        href="/states"
        className="text-indigo-600 hover:text-indigo-800 text-sm"
      >
        &larr; Back to all states
      </Link>

      <SourceCitation />
    </div>
  );
}
