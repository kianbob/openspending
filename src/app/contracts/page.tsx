import Link from "next/link";
import { SortableTable } from "@/components/SortableTable";
import awards from "@/../public/data/top-awards.json";

export const metadata = {
  title: "100 Largest Federal Contracts | OpenSpending",
  description: "The 100 biggest federal contracts, many worth $30B+. See who got billions in no-bid, sole-source deals from your taxes.",
};

const columns = [
  { key: "recipient", label: "Recipient", format: "text" as const },
  { key: "amount", label: "Amount", format: "dollars" as const, align: "right" as const },
  { key: "agency", label: "Agency", format: "text" as const },
  { key: "description", label: "Description", format: "link" as const, linkKey: "href" },
  { key: "startDate", label: "Start Date", format: "date" as const },
];

function slugify(awardId: string): string {
  return awardId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const tableData = awards.map((a) => ({
  recipient: a.recipient,
  amount: a.amount,
  agency: a.agency,
  description: a.description,
  startDate: a.startDate,
  href: `/contracts/${slugify(a.awardId)}`,
}));

export default function ContractsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        100 Largest Federal Contracts
      </h1>
      <p className="text-gray-500 text-lg mb-4">
        The biggest individual contract awards in the federal system. Sort by
        amount, recipient, or agency.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <p className="text-amber-900 text-sm">
          <span className="font-bold">Worth noting:</span> Many of the largest
          contracts are sole-source or no-bid awards — meaning the government
          chose a single vendor without competitive bidding. This reduces price
          competition and can lead to inflated costs for taxpayers.
        </p>
      </div>

      <SortableTable
        columns={columns}
        data={tableData}
        defaultSortKey="amount"
      />

      {/* Explore More */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/no-bid" className="block border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
            <h3 className="font-bold text-gray-900 mb-1">No-Bid Contracts</h3>
            <p className="text-gray-600 text-sm">Billions in sole-source awards with no competitive bidding. Who benefits?</p>
          </Link>
          <Link href="/contractors" className="block border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
            <h3 className="font-bold text-gray-900 mb-1">Top Contractors</h3>
            <p className="text-gray-600 text-sm">A handful of companies capture the lion&apos;s share of federal contracts.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
