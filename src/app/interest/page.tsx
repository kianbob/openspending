import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { InterestLineChart } from "@/components/charts/InterestLineChart";
import { formatDollars } from "@/lib/format";
import interestData from "@/../public/data/interest-debt.json";

export const metadata = {
  title: "$952B in Interest: The Debt Time Bomb | OpenSpending",
  description:
    "Interest on the national debt hit $952B in FY2025 — now larger than the entire defense budget. See the trajectory and what it costs every taxpayer.",
  keywords: "interest on national debt, national debt interest payments, federal debt cost",
  openGraph: {
    title: "$952B in Interest: The Debt Time Bomb | OpenSpending",
    description:
      "Interest on the national debt hit $952B in FY2025 — now larger than the entire defense budget.",
    url: "https://www.openspending.us/interest",
  },
  twitter: {
    card: "summary_large_image",
    title: "$952B in Interest: The Debt Time Bomb | OpenSpending",
    description:
      "Interest on the national debt hit $952B in FY2025 — now larger than the entire defense budget.",
  },
};

const historical = interestData.historical;
const context = interestData.context;

const fy2025 = historical.find((h) => h.fy === 2025)!;
const fy2017 = historical.find((h) => h.fy === 2017)!;

// Prepare chart data with actual vs projected split
const projections = interestData.projections;
const chartData = [
  ...historical.map((h) => ({
    fy: h.fy,
    actual: h.fy <= 2025 ? h.interest : null,
    projected: h.fy >= 2025 ? h.interest : null,
  })),
  ...projections
    .filter((p) => p.fy > 2025)
    .map((p) => ({
      fy: p.fy,
      actual: null,
      projected: p.interest,
    })),
];

// Comparison bars
const comparisonData = [
  { name: "Social Security", amount: context.social_security_fy2025 },
  { name: "Medicare", amount: context.medicare_fy2025 },
  { name: "Interest on Debt", amount: fy2025.interest },
  { name: "Defense", amount: context.defense_budget_fy2025 },
  { name: "Education (est.)", amount: 102_000_000_000 },
];

export default function InterestPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Investigations" }, { label: "The Interest Time Bomb" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The Interest Time Bomb
        </h1>
        <ShareButtons
          title="The Interest Time Bomb — OpenSpending"
          url="https://www.openspending.us/interest"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-8">
        Interest on the national debt hit <strong className="text-gray-900">{formatDollars(fy2025.interest)}</strong> in
        FY2025 — now <strong className="text-gray-900">larger than the entire defense budget</strong>.
        This is the compounding cost of decades of borrowing.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <p className="text-sm font-medium text-gray-500">Interest (FY2025)</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{formatDollars(fy2025.interest)}</p>
          <p className="text-xs text-gray-400">Larger than defense budget</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Growth Since 2017</p>
          <p className="text-2xl font-bold text-red-700 mt-1">+262%</p>
          <p className="text-xs text-gray-400">{formatDollars(fy2017.interest)} → {formatDollars(fy2025.interest)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Per Taxpayer</p>
          <p className="text-2xl font-bold text-red-700 mt-1">${fy2025.per_taxpayer.toLocaleString()}/yr</p>
          <p className="text-xs text-gray-400">Just in interest payments</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">CBO Projection (2030)</p>
          <p className="text-2xl font-bold text-red-700 mt-1">$1.35T</p>
          <p className="text-xs text-gray-400">42% higher than today</p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl mb-10">
        <p className="text-red-900 text-lg">
          Every dollar spent on interest is a dollar that can&apos;t build roads, fund schools, or defend the nation.
        </p>
      </div>

      {/* Historical Line Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Interest Payments: 2017–2030
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <InterestLineChart data={chartData} />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Solid line = actual payments. Dashed line = CBO projections. Source: Treasury, CBO
        </p>
      </div>

      {/* Comparison */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          How Interest Compares to Major Programs
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart data={comparisonData} height={280} color="#dc2626" labelWidth={160} />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          FY2025 budget comparison. Interest now exceeds defense spending.
        </p>
      </div>

      {/* Debt Stats */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">The Debt Behind the Interest</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">National Debt</p>
            <p className="text-2xl font-bold text-gray-900">{formatDollars(fy2025.debt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Interest % of Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{fy2025.interest_pct_of_revenue}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Debt Per Citizen</p>
            <p className="text-2xl font-bold text-gray-900">${fy2025.debt_per_citizen.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Debt Per Taxpayer</p>
            <p className="text-2xl font-bold text-gray-900">${fy2025.debt_per_taxpayer.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Historical Table */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-indigo-900 mb-3">
          This Is the Real Crisis
        </h2>
        <p className="text-indigo-800">
          The national conversation focuses on headline spending — defense, entitlements, foreign aid.
          But the compounding cost of <em>past</em> borrowing is quietly becoming the largest line item
          in the budget. Interest doesn&apos;t build anything. It doesn&apos;t protect anyone. It doesn&apos;t
          educate a single child. It&apos;s the price of putting off hard choices — and it grows every year
          whether we like it or not.
        </p>
      </div>

      {/* Year-by-Year */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Year-by-Year Interest Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-medium text-gray-500">Fiscal Year</th>
                <th className="text-right py-2 px-3 font-medium text-gray-500">Interest</th>
                <th className="text-right py-2 px-3 font-medium text-gray-500">Per Taxpayer</th>
                <th className="text-right py-2 px-3 font-medium text-gray-500">% of Revenue</th>
                <th className="text-left py-2 px-3 font-medium text-gray-500">Type</th>
              </tr>
            </thead>
            <tbody>
              {historical.map((h) => (
                <tr key={h.fy} className={`border-b border-gray-100 ${h.fy > 2025 ? "text-gray-400 italic" : ""}`}>
                  <td className="py-2 px-3 font-medium">{h.fy}</td>
                  <td className="py-2 px-3 text-right">{formatDollars(h.interest)}</td>
                  <td className="py-2 px-3 text-right">
                    {h.per_taxpayer ? `$${h.per_taxpayer.toLocaleString()}` : "—"}
                  </td>
                  <td className="py-2 px-3 text-right">
                    {h.interest_pct_of_revenue ? `${h.interest_pct_of_revenue}%` : "—"}
                  </td>
                  <td className="py-2 px-3">{h.fy <= 2025 ? "Actual" : "Projected"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Related Analysis */}
      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Related Analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/national-debt" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">💳</p>
            <p className="font-bold text-gray-900">The $36T Debt Clock</p>
            <p className="text-sm text-gray-600 mt-1">$108,060 per citizen and climbing</p>
          </Link>
          <Link href="/spending-explosion" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">📈</p>
            <p className="font-bold text-gray-900">The Spending Explosion</p>
            <p className="text-sm text-gray-600 mt-1">Federal spending grew 63% since 2017</p>
          </Link>
          <Link href="/doge-reality" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">🔍</p>
            <p className="font-bold text-gray-900">The DOGE Reality Check</p>
            <p className="text-sm text-gray-600 mt-1">Spending increased $392B despite promised cuts</p>
          </Link>
          <Link href="/your-tax-bill" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">💰</p>
            <p className="font-bold text-gray-900">Your Tax Bill Breakdown</p>
            <p className="text-sm text-gray-600 mt-1">$33,135 per taxpayer — where every dollar goes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
