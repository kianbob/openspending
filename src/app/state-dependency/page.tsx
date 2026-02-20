import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { SortableTable } from "@/components/SortableTable";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { formatDollars } from "@/lib/format";
import depData from "@/../public/data/state-dependency.json";
import { StateDependencyLookup } from "@/components/StateDependencyLookup";
// metadata moved to layout.tsx
const states = depData.states;
const takers = states.filter((s) => s.ratio > 1).sort((a, b) => b.ratio - a.ratio);
const donors = states.filter((s) => s.ratio <= 1).sort((a, b) => a.ratio - b.ratio);
const top10Takers = takers.slice(0, 10).map((s) => ({
  name: s.name,
  amount: s.ratio,
}));
const top10Donors = donors.slice(0, 10).map((s) => ({
  name: s.name,
  amount: s.ratio,
}));
const tableColumns = [
  { key: "name", label: "State", format: "text" as const },
  { key: "received", label: "Federal $ Received", format: "dollars" as const, align: "right" as const },
  { key: "paid", label: "Federal Taxes Paid", format: "dollars" as const, align: "right" as const },
  { key: "ratio", label: "Ratio ($/$ paid)", format: "text" as const, align: "right" as const },
  { key: "net", label: "Net Balance", format: "dollars" as const, align: "right" as const },
];
const tableRows = states.map((s) => ({
  name: s.name,
  received: s.received,
  paid: s.paid,
  ratio: s.ratio,
  net: s.net,
}));
export default function StateDependencyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Investigations" }, { label: "Federal Dependency by State" }]} />
      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Federal Dependency by State
        </h1>
        <ShareButtons
          title="Federal Dependency by State — OpenSpending"
          url="https://www.openspending.us/state-dependency"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-8">
        For every $1 in federal taxes paid, how much does each state get back?
        The answer might surprise you.
      </p>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <p className="text-sm font-medium text-gray-500">Biggest Taker</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{depData.biggest_taker.name}</p>
          <p className="text-xs text-gray-400">${depData.biggest_taker.ratio} back per $1 paid</p>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-6">
          <p className="text-sm font-medium text-gray-500">Biggest Donor</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{depData.biggest_donor.name}</p>
          <p className="text-xs text-gray-400">${depData.biggest_donor.ratio} back per $1 paid</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Taker States</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{depData.takers_count}</p>
          <p className="text-xs text-gray-400">Receive more than they pay</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Donor States</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{depData.donors_count}</p>
          <p className="text-xs text-gray-400">Pay more than they receive</p>
        </div>
      </div>
      {/* Lookup */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-indigo-900 mb-3">
          🔍 Look Up Your State
        </h2>
        <StateDependencyLookup states={states} />
      </div>
      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-10">
        <p className="text-amber-900 text-lg">
          <span className="font-bold">West Virginia</span> receives{" "}
          <span className="font-bold">$4.22</span> for every $1 it sends to Washington.{" "}
          <span className="font-bold">New Jersey</span> gets back just{" "}
          <span className="font-bold">$0.71</span>.
        </p>
      </div>
      {/* Top Takers Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Top 10 &quot;Taker&quot; States
        </h2>
        <p className="text-gray-500 text-sm mb-4">States that receive the most federal dollars per $1 paid in taxes</p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart
            data={top10Takers}
            height={380}
            color="#dc2626"
            labelWidth={150}
            valueFormat="ratio"
          />
        </div>
      </div>
      {/* Top Donors Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Top 10 &quot;Donor&quot; States
        </h2>
        <p className="text-gray-500 text-sm mb-4">States that pay more in federal taxes than they receive back</p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart
            data={top10Donors}
            height={380}
            color="#16a34a"
            labelWidth={150}
            valueFormat="ratio"
          />
        </div>
      </div>
      {/* Context */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          What Drives These Differences?
        </h2>
        <p className="text-gray-700 mb-3">
          Several factors determine a state&apos;s federal balance: military bases and defense spending,
          the age of the population (Medicare/Social Security), poverty rates (Medicaid, food assistance),
          federal land (western states), and the presence of federal agencies or contractors.
        </p>
        <p className="text-gray-700">
          States with higher incomes pay more in federal taxes. States with older, poorer, or more
          rural populations tend to receive more in federal benefits. The data doesn&apos;t make a political
          argument — it simply shows where the money flows.
        </p>
      </div>
      {/* Full Table */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          All States: Federal Balance Sheet
        </h2>
        <p className="text-gray-500 mb-4">
          Search and sort by any column. Ratio &gt; 1.0 = receives more than it pays.
          Ratio &lt; 1.0 = pays more than it receives.
        </p>
        <SortableTable columns={tableColumns} data={tableRows} defaultSortKey="ratio" />
      </div>
      {/* Related */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/states" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Federal Spending by State</p>
            <p className="text-sm text-gray-600 mt-1">Contract and grant spending in every state</p>
          </Link>
          <Link href="/interest" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">The Interest Time Bomb</p>
            <p className="text-sm text-gray-600 mt-1">$952B in interest — more than the defense budget</p>
          </Link>
          <Link href="/contractor-monopoly" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">The Contractor Monopoly</p>
            <p className="text-sm text-gray-600 mt-1">10 companies control 64% of federal contracts</p>
          </Link>
          <Link href="/tax-calculator" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Tax Calculator</p>
            <p className="text-sm text-gray-600 mt-1">See where your tax dollars go</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
