import Link from "next/link";
import { formatDollars, formatPercent } from "@/lib/format";
import industryList from "@/../public/data/industry-details.json";

type IndustryEntry = {
  code: string;
  name: string;
  slug: string;
  amount: number;
  rank: number;
  pctOfTotal: number;
};

const industries = industryList as IndustryEntry[];

const slugMap = new Map(industries.map((ind) => [ind.slug, ind]));

function getEditorialCallout(rank: number): string | null {
  switch (rank) {
    case 1:
      return "Aircraft manufacturing is the single largest category of federal contract spending. The Pentagon relies on a handful of prime contractors — Lockheed Martin, Boeing, and Northrop Grumman — to build fighters, bombers, tankers, and transport aircraft. These multi-decade programs lock in tens of billions in taxpayer commitments, often with cost overruns that dwarf original estimates.";
    case 2:
      return "Engineering services is a catch-all for the technical brainpower the government outsources — everything from weapons system design to infrastructure planning. Much of this spending flows through large defense contractors and consulting firms, raising questions about whether the government has hollowed out its own internal expertise.";
    case 3:
      return "Health insurance carriers collect massive federal payments through TRICARE (military health), the Federal Employees Health Benefits Program, and Medicare Advantage contracts. Optum and other managed-care giants dominate this space, making healthcare one of the government's biggest line items outside of defense hardware.";
    case 4:
      return "Federal R&D contracts fund everything from next-generation weapons systems to biomedical research. National laboratories, universities, and defense contractors compete for these dollars, which represent the government's bet on future capabilities. The sheer scale — over $46 billion — shows how dependent American science and defense innovation are on federal funding.";
    case 5:
      return "Shipbuilding is dominated by two yards: Huntington Ingalls in Newport News, VA and General Dynamics' Electric Boat in Groton, CT. These near-monopolies build America's aircraft carriers, submarines, and destroyers. With no real competition, costs have spiraled — a single Virginia-class submarine now exceeds $3 billion.";
    case 6:
      return "Facilities support services covers the mundane but expensive work of keeping military bases, federal buildings, and government installations running — maintenance, janitorial, landscaping, and utilities management. This is quintessential outsourced government work, employing hundreds of thousands of contract workers.";
    case 7:
      return "Guided missiles and space vehicles represent the cutting edge of defense spending — from Raytheon's Tomahawk cruise missiles to SpaceX launch contracts. This industry has seen a spending surge as the Pentagon invests in hypersonic weapons and space capabilities to compete with China and Russia.";
    case 8:
      return "Computer systems design is the IT backbone of the federal government. Contractors like Booz Allen Hamilton, Leidos, and SAIC build and maintain the systems that agencies depend on daily. The government's chronic inability to manage its own technology has turned this into a multi-billion dollar industry unto itself.";
    case 9:
      return "Federal construction spending covers military bases, VA hospitals, courthouses, border infrastructure, and embassy compounds worldwide. The Army Corps of Engineers and GSA manage most of these projects, which frequently run over budget and behind schedule.";
    case 10:
      return "This catch-all IT category covers cybersecurity, cloud migration, data analytics, and other tech services that don't fit neatly into programming or systems design. It's one of the fastest-growing areas of federal spending as agencies race to modernize aging infrastructure and defend against cyber threats.";
    default:
      return null;
  }
}

export function generateStaticParams() {
  return industries.map((ind) => ({ code: ind.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const entry = slugMap.get(code);
  const name = entry?.name ?? "Industry";
  const amount = entry ? formatDollars(entry.amount) : "";
  const title = entry
    ? `${name}: ${amount} in Federal Contracts — OpenSpending`
    : `${name} — Federal Spending by Industry — OpenSpending`;
  const description = entry
    ? `${name} (NAICS ${entry.code}) receives ${amount} in federal contracts, ranking #${entry.rank} among all industries. Explore the data.`
    : `Federal contract spending data for ${name}.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const entry = slugMap.get(code);
  if (!entry) return null;

  const { name, code: naicsCode, amount, rank, pctOfTotal } = entry;
  const callout = getEditorialCallout(rank);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/industries"
        className="text-indigo-600 hover:text-indigo-800 text-sm mb-6 inline-block"
      >
        &larr; All Industries
      </Link>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {name}
      </h1>
      <p className="text-gray-500 mb-8">
        NAICS {naicsCode} &middot; Rank #{rank} &middot;{" "}
        {formatPercent(pctOfTotal)} of federal contracts
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Total Contract Value
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatDollars(amount)}
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

      {/* Editorial callout for top 10 */}
      {callout && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Why does this industry get so much federal money?
          </h2>
          <p className="text-gray-700 leading-relaxed">{callout}</p>
        </div>
      )}

      {/* Explore More */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/industries"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-gray-900">All Industries</p>
            <p className="text-sm text-gray-500 mt-1">
              Top 50 industries by federal contract spending
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
    </div>
  );
}
