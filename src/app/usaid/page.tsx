import Link from "next/link";
import { UsaidGrantsChart } from "@/components/charts/UsaidGrantsChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars } from "@/lib/format";
import usaidData from "@/../public/data/usaid-deep-dive.json";

export const metadata = {
  title: "USAID: From $15B to $50B in 6 Years — OpenSpending",
  description: "USAID's budget nearly doubled in six years. See the 100 largest grants and contracts — and who got the money.",
  openGraph: {
    title: "USAID: From $15B to $50B in 6 Years — OpenSpending",
    description: "USAID's budget nearly doubled in six years. See the 100 largest grants and contracts — and who got the money.",
  },
};

const totalAll = usaidData.totalGrants + usaidData.totalContracts;

const top10Grants = usaidData.topGrants.slice(0, 10).map((g) => ({
  name: g.recipient.length > 28 ? g.recipient.slice(0, 28) + "..." : g.recipient,
  amount: g.amount,
}));

const allAwards = [
  ...usaidData.topGrants.map((g) => ({
    recipient: g.recipient,
    amount: g.amount,
    description: g.description
      ? g.description.slice(0, 80) + (g.description.length > 80 ? "..." : "")
      : "—",
    startDate: g.startDate || "—",
    type: "Grant",
  })),
  ...usaidData.topContracts.map((c) => ({
    recipient: c.recipient,
    amount: c.amount,
    description: c.description
      ? c.description.slice(0, 80) + (c.description.length > 80 ? "..." : "")
      : "—",
    startDate: c.startDate || "—",
    type: "Contract",
  })),
].sort((a, b) => b.amount - a.amount);

const columns = [
  { key: "recipient", label: "Recipient", format: "text" as const },
  { key: "amount", label: "Amount", format: "dollars" as const, align: "right" as const },
  { key: "description", label: "Description", format: "text" as const },
  { key: "startDate", label: "Start Date", format: "date" as const },
  { key: "type", label: "Type", format: "text" as const },
];

export default function UsaidPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Where Does Foreign Aid Actually Go?
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        {formatDollars(totalAll)} in USAID awards (FY2020–2025). The 50 largest
        grants and 50 largest contracts — who got the money?
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Total USAID Awards</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatDollars(totalAll)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Grants</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {formatDollars(usaidData.totalGrants)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Contracts</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {formatDollars(usaidData.totalContracts)}
          </p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-amber-900 mb-2">
          The USAID Budget Explosion
        </h2>
        <p className="text-amber-800">
          USAID&apos;s budget went from{" "}
          <span className="font-bold">$25.8 billion in FY2019</span> to{" "}
          <span className="font-bold">$50.1 billion in FY2025</span> — nearly
          doubling in six years. A single grant to GAVI Alliance totals{" "}
          <span className="font-bold">$2.5 billion</span>. Chemonics
          International holds contracts worth{" "}
          <span className="font-bold">$6.7 billion</span>. Many awards go to
          &ldquo;Miscellaneous Foreign Awardees&rdquo; — obscuring who actually
          received the funds. Now DOGE is cutting deep. The question taxpayers
          should ask:{" "}
          <span className="font-bold italic">
            who was watching where $50 billion a year was going?
          </span>
        </p>
      </div>

      {/* Top 10 Grants Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 10 USAID Grants by Value
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <UsaidGrantsChart data={top10Grants} />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Largest individual grant awards from USAID. Source: USASpending.gov
        </p>
      </div>

      {/* Full Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        All 100 Largest USAID Awards
      </h2>
      <p className="text-gray-500 mb-4">
        Combined grants and contracts, sorted by amount. Search by recipient
        name, description, or type.
      </p>
      <SortableTable
        columns={columns}
        data={allAwards}
        defaultSortKey="amount"
      />

      {/* Explore More */}
      <div className="mt-12 bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
          Explore More
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          USAID is one piece of the federal spending puzzle. Dig deeper.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/waste"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Federal Waste Problem
          </Link>
          <Link
            href="/foreign-aid"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Foreign Aid Data
          </Link>
          <Link
            href="/contractors"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Top Contractors
          </Link>
          <Link
            href="/agencies"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Agencies
          </Link>
        </div>
      </div>
    </div>
  );
}
