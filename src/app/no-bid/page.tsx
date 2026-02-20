import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars, toTitleCase } from "@/lib/format";
import noBidData from "@/../public/data/no-bid-contracts.json";

export const metadata = {
  title: "No-Bid Nation: $74B Without Competition — OpenSpending",
  description: "$74B in sole-source federal contracts awarded without competitive bidding in FY2025. See who got the money.",
  openGraph: {
    title: "No-Bid Nation: $74B Without Competition — OpenSpending",
    description: "$74B in sole-source federal contracts awarded without competitive bidding in FY2025. See who got the money.",
  },
};

const top10Recipients = noBidData.byRecipient.slice(0, 10).map((r) => ({
  name: toTitleCase(r.name).slice(0, 30),
  amount: r.total,
}));

const agencyData = noBidData.byAgency.map((a) => ({
  name: a.name.replace("Department of ", ""),
  amount: a.total,
}));

const dodCount = noBidData.byAgency.find(
  (a) => a.name === "Department of Defense"
)?.count ?? 0;

const contractColumns = [
  { key: "recipient", label: "Recipient", format: "text" as const },
  {
    key: "amount",
    label: "Amount",
    format: "dollars" as const,
    align: "right" as const,
  },
  { key: "agency", label: "Agency", format: "text" as const },
  { key: "description", label: "Description", format: "text" as const },
];

const contractRows = noBidData.contracts.map((c) => ({
  recipient: toTitleCase(c.recipient),
  amount: c.amount,
  agency: c.agency.replace("Department of ", ""),
  description:
    c.description.length > 80
      ? c.description.slice(0, 80) + "..."
      : c.description,
}));

export default function NoBidPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Editorial" }, { label: "No-Bid Nation" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          No-Bid Nation: {formatDollars(noBidData.total)} Without Competition
        </h1>
        <ShareButtons title="No-Bid Nation: $74B Without Competition — OpenSpending" url="https://openspending.us/no-bid" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-8">
        The 50 largest sole-source federal contracts in FY2025 — awarded without
        competitive bidding.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">
            Total No-Bid Value
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatDollars(noBidData.total)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Contracts</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {noBidData.count}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">
            Top Recipient (Boeing)
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {formatDollars(noBidData.byRecipient[0].total)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">% from DOD</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {dodCount}/{noBidData.count} ({Math.round((dodCount / noBidData.count) * 100)}%)
          </p>
        </div>
      </div>

      {/* Editorial Callout 1 */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-10">
        <p className="text-amber-900">
          <span className="font-bold">Boeing</span> received{" "}
          <span className="font-bold">{formatDollars(noBidData.byRecipient[0].total)}</span>{" "}
          in contracts without competing for them. That is more than the GDP of
          most countries.
        </p>
      </div>

      {/* Top 10 Recipients Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 10 No-Bid Recipients
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart
            data={top10Recipients}
            height={420}
            color="#4338ca"
            labelWidth={170}
          />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Largest sole-source contract recipients by total value, FY2025. Source:
          USASpending.gov
        </p>
      </div>

      {/* Editorial Callout 2 */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-10">
        <p className="text-amber-900">
          <span className="font-bold">{dodCount} of the {noBidData.count}</span>{" "}
          largest no-bid contracts went to the Department of Defense. When
          &quot;national security&quot; is the justification, competition becomes
          optional.
        </p>
      </div>

      {/* By Agency Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          No-Bid Contracts by Agency
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart
            data={agencyData}
            height={350}
            color="#6366f1"
            labelWidth={200}
          />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Sole-source contract value by awarding agency, FY2025. Source:
          USASpending.gov
        </p>
      </div>

      {/* Context Section */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-indigo-900 mb-2">
          Why Does This Happen?
        </h2>
        <p className="text-indigo-800">
          Sole-source contracts exist for legitimate reasons: classified programs,
          genuine emergencies, or when only one company has the required
          capability. But when the same companies receive billions year after year
          without competition, the exception has become the rule. No-bid contracts
          eliminate the price pressure that protects taxpayers — and the companies
          know it.{" "}
          <Link
            href="/how-it-works"
            className="text-indigo-600 hover:text-indigo-800 underline font-medium"
          >
            Learn how contracting works &rarr;
          </Link>
        </p>
      </div>

      {/* All Contracts Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        All 50 Largest No-Bid Contracts (FY2025)
      </h2>
      <p className="text-gray-500 mb-4">
        The 50 largest sole-source contracts awarded in FY2025. Search by
        recipient, agency, or description.
      </p>
      <SortableTable
        columns={contractColumns}
        data={contractRows}
        defaultSortKey="amount"
      />

      {/* Related Analysis */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/top-10" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Top 10 Contractors</p>
            <p className="text-sm text-gray-600 mt-1">The companies capturing the most federal dollars</p>
          </Link>
          <Link href="/contractors" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Top Federal Contractors</p>
            <p className="text-sm text-gray-600 mt-1">The companies that dominate government contracts</p>
          </Link>
          <Link href="/waste" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Government Waste</p>
            <p className="text-sm text-gray-600 mt-1">The most egregious examples of wasteful spending</p>
          </Link>
          <Link href="/efficiency" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Government Efficiency</p>
            <p className="text-sm text-gray-600 mt-1">What works, what doesn&apos;t, and what DOGE gets wrong</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
