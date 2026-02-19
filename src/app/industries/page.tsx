import Link from "next/link";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars } from "@/lib/format";
import industries from "@/../public/data/industry-details.json";

export const metadata = {
  title: "Federal Spending by Industry — OpenSpending",
  description: "Which industries get the most federal contract dollars? Top 50 ranked by NAICS code — dominated by defense and health.",
  openGraph: {
    title: "Federal Spending by Industry — OpenSpending",
    description: "Which industries get the most federal contract dollars? Top 50 ranked by NAICS code — dominated by defense and health.",
  },
};

const top15 = industries.slice(0, 15).map((ind) => ({
  name: ind.name.length > 35 ? ind.name.slice(0, 32) + "..." : ind.name,
  amount: ind.amount,
}));

const top5Total = industries.slice(0, 5).reduce((sum, i) => sum + i.amount, 0);
const allTotal = industries.reduce((sum, i) => sum + i.amount, 0);

const columns = [
  { key: "code", label: "NAICS Code", format: "text" as const },
  { key: "name", label: "Industry", format: "link" as const, linkKey: "href" },
  { key: "amount", label: "Amount", format: "dollars" as const, align: "right" as const },
];

const tableData = industries.map((ind) => ({
  code: ind.code,
  name: ind.name,
  amount: ind.amount,
  href: `/industries/${ind.slug}`,
}));

export default function IndustriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
        Federal Spending by Industry
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        The 50 industries receiving the most federal contract dollars, classified by NAICS code.
      </p>

      {/* Concentration Insight */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-indigo-900 mb-2">
          Defense &amp; Health Dominate
        </h2>
        <p className="text-indigo-800">
          The <span className="font-bold">top 5 industries</span> — aircraft manufacturing,
          engineering services, health insurance, R&amp;D, and shipbuilding — account for{" "}
          <span className="font-bold">{formatDollars(top5Total)}</span> of the{" "}
          <span className="font-bold">{formatDollars(allTotal)}</span> tracked here.
          Federal contracting is heavily concentrated in defense and healthcare,
          meaning a small number of industries capture the vast majority of taxpayer dollars.
        </p>
      </div>

      {/* Bar Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 15 Industries by Contract Value
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart data={top15} height={550} color="#4338ca" labelWidth={200} />
        </div>
      </div>

      {/* Full Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        All 50 Industries
      </h2>
      <SortableTable
        columns={columns}
        data={tableData}
        defaultSortKey="amount"
      />

      {/* Explore More */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/contractors" className="block border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
            <h3 className="font-bold text-gray-900 mb-1">Top Contractors</h3>
            <p className="text-gray-600 text-sm">See which companies dominate federal contracting — and how much they receive.</p>
          </Link>
          <Link href="/no-bid" className="block border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
            <h3 className="font-bold text-gray-900 mb-1">No-Bid Contracts</h3>
            <p className="text-gray-600 text-sm">Billions awarded without competitive bidding. Explore sole-source spending.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
