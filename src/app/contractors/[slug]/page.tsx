import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
  if (!entry) return null;

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
      <p className="text-gray-500 mb-8">
        Rank #{rank} federal contractor &middot; {formatPercent(pctOfTotal)} of
        all federal contracts
      </p>

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
                      {c.description}
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

      {/* Explore More */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/contractors"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-gray-900">All Contractors</p>
            <p className="text-sm text-gray-500 mt-1">
              Top 50 federal contractors ranked by spending
            </p>
          </Link>
          <Link
            href="/no-bid"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-gray-900">No-Bid Contracts</p>
            <p className="text-sm text-gray-500 mt-1">
              Sole-source contracts and contractor concentration
            </p>
          </Link>
          <Link
            href="/industries"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-gray-900">Industries</p>
            <p className="text-sm text-gray-500 mt-1">
              Top industries by federal contract spending
            </p>
          </Link>
        </div>
      </div>

      <Link
        href="/contractors"
        className="text-indigo-600 hover:text-indigo-800 text-sm"
      >
        &larr; Back to all contractors
      </Link>
    </div>
  );
}
