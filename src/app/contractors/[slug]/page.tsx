import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedPages } from "@/components/RelatedPages";
import { ContractorAgenciesChart } from "@/components/charts/ContractorAgenciesChart";
import { ContractorSpendingChart } from "@/components/charts/ContractorSpendingChart";
import { formatDollars, formatPercent, toTitleCase } from "@/lib/format";
import contractorDetails from "@/../public/data/contractor-details.json";

export const dynamicParams = true;

type ContractorEntry = {
  name: string;
  slug: string;
  totalAmount: number;
  rank: number;
  subsidiaries: string[];
  agencies: { name: string; slug: string; amount: number }[];
  trends: { fy: number; amount: number }[] | null;
  topContracts: { description: string; amount: number; agency: string }[] | null;
  pctOfTotal: number;
};

const details = contractorDetails as Record<string, ContractorEntry>;

const contractorDescriptions: Record<string, string> = {
  "lockheed-martin-corporation":
    "F-35 program ($1.7T lifetime cost), fighter jets, missile defense — the #1 federal contractor for decades. More revenue from the Pentagon than many countries' entire military budgets.",
  "optum-public-sector-solutions-inc":
    "UnitedHealth subsidiary handling healthcare IT and VA health claims processing. A single company processing billions in veterans' healthcare — what could go wrong?",
  "electric-boat-corporation":
    "General Dynamics subsidiary and sole source for U.S. Navy submarines. No competition means no price pressure — and taxpayers foot the bill.",
  "raytheon-company":
    "Missiles, radar systems, the Patriot missile system. Every conflict drives their stock price up. War is good business.",
  "the-boeing-company":
    "Aircraft, satellites, the Space Launch System (billions over budget and years behind schedule). SpaceX does it cheaper — and on time.",
  "mckesson-corporation":
    "Pharmaceutical distribution for the VA. A middleman taking a cut of the drug supply chain between manufacturers and veterans.",
  "amerisourcebergen-drug-corp":
    "Drug distribution — another pharmaceutical middleman extracting value from the taxpayer-funded supply chain.",
  "rtx-corporation":
    "Parent company of Raytheon and Pratt & Whitney. Defense industry consolidation means fewer competitors and higher prices for taxpayers.",
  "triwest-healthcare-alliance-corp":
    "Military and VA health insurance administrator. Processes claims but doesn't actually provide care — a bureaucratic layer between veterans and their doctors.",
  "humana-government-business-inc":
    "Government healthcare plans for military families and retirees. Profits from managing taxpayer-funded health benefits.",
  "booz-allen-hamilton-inc":
    "The government's favorite consulting firm — $7B+ in contracts for IT, analytics, and defense consulting. When the government can't figure something out, they pay Booz Allen to figure it out for them.",
  "atlantic-diving-supply-inc":
    "Equipment supplier to the military — everything from tactical gear to office supplies. A middleman that's built a $6B business reselling products to the Pentagon at markup.",
  "national-technology-engineering-solutions-of-sandia-llc":
    "Operates Sandia National Laboratories for the DOE. Nuclear weapons maintenance and national security R&D — critical work, but with little competitive pressure on costs.",
  "triad-national-security-llc":
    "Operates Los Alamos National Laboratory. Nuclear weapons design and science research funded by billions in taxpayer dollars with minimal public oversight.",
  "sikorsky-aircraft-corporation":
    "Lockheed Martin subsidiary making Black Hawk helicopters and Marine One. Another defense monopoly where the government has few alternatives.",
  "general-dynamics-information-technology-inc":
    "IT services arm of General Dynamics. $5B+ in contracts for government IT systems — the kind of work Silicon Valley does faster and cheaper.",
  "huntington-ingalls-incorporated":
    "America's largest military shipbuilder — aircraft carriers and destroyers. Sole source for carriers means taxpayers pay whatever they charge.",
  "science-applications-international-corporation":
    "SAIC — defense and government IT services. $4B+ in contracts for systems integration and technical services that could often be done in-house.",
  "accenture-federal-services-llc":
    "Federal consulting arm of Accenture. Billions in IT modernization contracts — because apparently the government needs a consultant to set up a website.",
  "leidos-inc":
    "Defense, intelligence, and health IT. Spun off from SAIC and immediately became another multi-billion dollar government contractor. The defense consulting hydra grows new heads.",
  "space-exploration-technologies-corp":
    "SpaceX — Elon Musk's rocket company. $3B+ in NASA and DOD launch contracts. Actually delivers innovation and lower costs, unlike most defense contractors.",
  "deloitte-consulting-llp":
    "Big Four consulting firm collecting billions from federal agencies for IT and management consulting. The government's dependency on outside consultants is itself a spending problem.",
  "caci-inc-federal":
    "Intelligence and IT services for defense and intelligence agencies. $4B in contracts for the kind of work that's hard to audit and easy to overspend on.",
};

export function generateStaticParams() {
  return Object.keys(details).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = details[slug];
  const name = entry?.name ?? "Contractor";
  const amount = entry ? `$${(entry.totalAmount / 1e9).toFixed(1)}B` : "";
  const title = entry ? `${name}: ${amount} in Federal Contracts — OpenSpending` : `${name} — Federal Contractor — OpenSpending`;
  const description = entry
    ? `${name} received ${amount} in federal contracts (rank #${entry.rank}). See agencies served, spending trends, and largest contracts.`
    : `Federal contract spending data for ${name}.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ContractorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = details[slug];
  if (!entry) notFound();

  const {
    name,
    totalAmount,
    rank,
    subsidiaries,
    agencies,
    trends,
    topContracts,
    pctOfTotal,
  } = entry;

  const topAgencies = agencies.slice(0, 10);
  const topContractsList = topContracts?.slice(0, 10) ?? null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Contractors", href: "/contractors" }, { label: toTitleCase(name) }]} />

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {toTitleCase(name)}
      </h1>
      <p className="text-gray-500 mb-4">
        Rank #{rank} federal contractor &middot; {formatPercent(pctOfTotal)} of
        all federal contracts
      </p>

      {contractorDescriptions[slug] && (
        <p className="text-gray-500 mb-8">{contractorDescriptions[slug]}</p>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Total Amount
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatDollars(totalAmount)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Number of Agencies
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {agencies.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Subsidiaries
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {subsidiaries.length}
          </p>
        </div>
      </div>

      {/* Subsidiaries */}
      {subsidiaries.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Also operates as:
          </h2>
          <div className="flex flex-wrap gap-2">
            {subsidiaries.map((sub) => (
              <span
                key={sub}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
              >
                {toTitleCase(sub)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Agencies Served */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Agencies Served
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6">
          <ContractorAgenciesChart data={topAgencies} />
        </div>
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  #
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Agency
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((a, i) => (
                <tr
                  key={a.slug}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-2.5 text-gray-400 font-medium">
                    {i + 1}
                  </td>
                  <td className="px-4 py-2.5 text-gray-900">
                    <Link
                      href={`/agencies/${a.slug}`}
                      className="text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      {a.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-700 font-medium">
                    {formatDollars(a.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spending Over Time */}
      {trends && trends.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Spending Over Time
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <ContractorSpendingChart data={trends} />
          </div>
        </div>
      )}

      {/* Largest Contracts */}
      {topContractsList && topContractsList.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Largest Contracts
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    #
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Agency
                  </th>
                </tr>
              </thead>
              <tbody>
                {topContractsList.map((c, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2.5 text-gray-400 font-medium">
                      {i + 1}
                    </td>
                    <td className="px-4 py-2.5 text-gray-900 max-w-md truncate">
                      {c.description.includes("TAS::") ? "Contract details unavailable" : c.description}
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-700 font-medium whitespace-nowrap">
                      {formatDollars(c.amount)}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">
                      {c.agency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <RelatedPages items={[
        { href: "/contractor-monopoly", title: "Contractor Monopoly", description: "How a handful of companies dominate federal contracting." },
        { href: "/no-bid", title: "No-Bid Contracts", description: "Sole-source contracts awarded without competition." },
        { href: "/small-business", title: "Small Business", description: "How small businesses fare in federal contracting." },
        { href: "/industries", title: "Industries", description: "Top industries by federal contract spending." },
      ]} />

      <Link
        href="/contractors"
        className="text-indigo-600 hover:text-indigo-800 text-sm"
      >
        &larr; Back to all contractors
      </Link>
    </div>
  );
}
