import Link from "next/link";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars } from "@/lib/format";
import noBidData from "@/../public/data/no-bid-contracts.json";

export const metadata = {
  title: "No-Bid Contracts — OpenSpending",
  description:
    "$74 billion in sole-source federal contracts awarded without competition in FY2025. See who got the money.",
};

function toTitleCase(name: string): string {
  return name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

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
      {/* Hero */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        No-Bid Nation: {formatDollars(noBidData.total)} Without Competition
      </h1>
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

      {/* Bottom Links */}
      <div className="mt-12 bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
          Explore More
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          No-bid contracts are one piece of the puzzle. See who else is getting
          your tax dollars.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contractors"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Top Contractors
          </Link>
          <Link
            href="/how-it-works"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            How Contracts Work
          </Link>
          <Link
            href="/agencies"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Agencies
          </Link>
          <Link
            href="/waste"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Federal Waste Problem
          </Link>
        </div>
      </div>
    </div>
  );
}
