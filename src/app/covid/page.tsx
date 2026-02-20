import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars, toTitleCase } from "@/lib/format";
import covidData from "@/../public/data/covid-spending.json";

export const metadata = {
  title: "$1.46 Trillion: The COVID Spending Tsunami — OpenSpending",
  description: "$1.46T in COVID emergency spending — the largest emergency outlay in U.S. history. See which agencies and recipients got the money.",
  openGraph: {
    title: "$1.46 Trillion: The COVID Spending Tsunami — OpenSpending",
    description: "$1.46T in COVID emergency spending — the largest emergency outlay in U.S. history. See which agencies and recipients got the money.",
  },
};

const top10Agencies = covidData.byAgency.slice(0, 10).map((a) => ({
  name: a.code,
  amount: a.amount,
}));

const recipientColumns = [
  { key: "name", label: "Recipient", format: "text" as const },
  {
    key: "amount",
    label: "Amount",
    format: "dollars" as const,
    align: "right" as const,
  },
];

const recipientData = covidData.byRecipient.map((r) => ({
  name:
    r.name.length > 50
      ? r.name.slice(0, 50) + "..."
      : toTitleCase(r.name),
  amount: r.amount,
}));

export default function CovidPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Editorial" }, { label: "The COVID Spending Tsunami" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The COVID Spending Tsunami
        </h1>
        <ShareButtons title="$1.46 Trillion: The COVID Spending Tsunami — OpenSpending" url="https://openspending.us/covid" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-8">
        {formatDollars(covidData.total)} in emergency spending across{" "}
        {covidData.byAgency.length} agencies and {covidData.byRecipient.length}{" "}
        top recipients — the largest emergency outlay in American history.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">
            Total COVID Spending
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatDollars(covidData.total)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Agencies Involved</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {covidData.byAgency.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">
            Top Agency (HHS)
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {formatDollars(covidData.byAgency[0].amount)}
          </p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-amber-900 mb-2">
          $1.46 Trillion — With Minimal Oversight
        </h2>
        <p className="text-amber-800">
          The largest emergency spending in US history was pushed out the door in
          months, not years. HHS, Education, and Defense each received over{" "}
          <span className="font-bold">$275 billion</span>. Billions went to state
          agencies, defense contractors, and pharmaceutical companies. Emergency
          rules meant reduced competition, waived audits, and fast-tracked
          contracts. Years later, the full accounting is still incomplete — and
          fraud estimates run into the{" "}
          <span className="font-bold">hundreds of billions</span>.
        </p>
      </div>

      {/* Agency Bar Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 10 Agencies by COVID Spending
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart
            data={top10Agencies}
            height={400}
            color="#4338ca"
          />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          COVID-related awards by agency. Source: USASpending.gov
        </p>
      </div>

      {/* Second Editorial */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-indigo-900 mb-2">
          Where Did the Money Actually Go?
        </h2>
        <p className="text-indigo-800">
          State education departments received tens of billions each — California
          alone got <span className="font-bold">{formatDollars(covidData.byRecipient[0].amount)}</span>.
          Defense labs like Sandia and Los Alamos pulled in{" "}
          <span className="font-bold">$15B+</span> each. Moderna received nearly{" "}
          <span className="font-bold">$10 billion</span> in federal funds. The MTA
          got <span className="font-bold">$15.2 billion</span>. Emergency spending
          became a firehose — and everyone lined up with a bucket.
        </p>
      </div>

      {/* Recipients Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Top 30 COVID Spending Recipients
      </h2>
      <p className="text-gray-500 mb-4">
        The largest recipients of COVID emergency funds. Search by name.
      </p>
      <SortableTable
        columns={recipientColumns}
        data={recipientData}
        defaultSortKey="amount"
      />

      {/* Related Analysis */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/healthcare-spending" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Healthcare Spending</p>
            <p className="text-sm text-gray-600 mt-1">The $2.6T health budget examined</p>
          </Link>
          <Link href="/waste" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Government Waste</p>
            <p className="text-sm text-gray-600 mt-1">The most egregious examples of wasteful spending</p>
          </Link>
          <Link href="/usaid" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">USAID &amp; Foreign Aid</p>
            <p className="text-sm text-gray-600 mt-1">Budget tripled, then gutted by DOGE</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
