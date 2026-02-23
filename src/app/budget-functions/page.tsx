import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShareButtons } from "@/components/ShareButtons";
import { BudgetFunctionBarChart } from "@/components/charts/BudgetFunctionBarChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars } from "@/lib/format";
import budgetFunctions from "@/../public/data/budget-functions.json";

export const metadata = {
  title: "Budget Functions | Where $10.3T Goes | OpenSpending",
  description:
    "18 categories control $10.3T. Net Interest up 166%, Energy up 342%. See which budget functions are growing fastest.",
  openGraph: {
    title: "Budget Functions | Where $10.3T Goes | OpenSpending",
    description:
      "18 categories control $10.3T. Net Interest up 166%, Energy up 342%. See which budget functions are growing fastest.",
  },
};

const sorted = [...budgetFunctions].sort(
  (a, b) => b.years.fy2025 - a.years.fy2025
);

const chartData = sorted.map((f) => ({
  name: f.name,
  amount: f.years.fy2025,
}));

const columns = [
  { key: "rank", label: "Rank", format: "text" as const },
  { key: "name", label: "Budget Function", format: "link" as const, linkKey: "href" },
  { key: "fy2025", label: "FY2025 Spending", format: "dollars" as const, align: "right" as const },
  { key: "growth_pct", label: "Growth Since 2017", format: "percent" as const, align: "right" as const },
];

const tableData = sorted.map((f) => ({
  rank: f.rank,
  name: f.name,
  href: `/budget-functions/${f.code}`,
  fy2025: f.years.fy2025,
  growth_pct: f.growth_pct,
}));

export default function BudgetFunctionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "Federal Budget Functions FY2025",
        "description": "Federal spending organized by budget function categories",
        "url": "https://www.openspending.us/budget-functions",
        "creator": { "@type": "Organization", "name": "OpenSpending" },
        "distribution": { "@type": "DataDownload", "contentUrl": "https://www.openspending.us/data/budget-functions.json", "encodingFormat": "application/json" }
      }} />
      <Breadcrumbs items={[{ label: "Budget Functions" }]} />

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Where Your Money Goes: Budget Functions
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The federal budget is organized into 18 major categories. Here&apos;s how $10.3
        trillion breaks down.
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          All 18 Budget Functions by FY2025 Spending
        </h2>
        <BudgetFunctionBarChart data={chartData} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Budget Functions at a Glance
        </h2>
        <SortableTable
          columns={columns}
          data={tableData}
          defaultSortKey="fy2025"
          defaultSortDir="desc"
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-amber-900 mb-2">Key Insight</h2>
        <p className="text-amber-800">
          Medicare grew 75% since 2017. Net Interest grew 166% — the fastest-growing
          major category. Meanwhile, Agriculture (+318%) and Energy (+342%) saw the
          largest percentage jumps among smaller categories.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {sorted.slice(0, 6).map((f) => (
          <Link
            key={f.code}
            href={`/budget-functions/${f.code}`}
            className="block bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-500 mb-1">#{f.rank}</p>
            <h3 className="font-semibold text-gray-900 mb-2">{f.name}</h3>
            <p className="text-2xl font-bold text-indigo-600">
              {formatDollars(f.years.fy2025)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {f.growth_pct >= 0 ? "+" : ""}
              {f.growth_pct.toFixed(1)}% since 2017
            </p>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Related Analysis</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/agencies"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Federal Agencies →
          </Link>
          <Link
            href="/spending-explosion"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Spending Explosion →
          </Link>
          <Link
            href="/interest"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Interest Time Bomb →
          </Link>
          <Link
            href="/program-growth"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Entitlement Explosion →
          </Link>
        </div>
      </div>

      <ShareButtons title="Where Your Money Goes: Budget Functions — OpenSpending" />
    </div>
  );
}
