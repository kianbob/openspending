import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { ContractorTrends } from "@/components/charts/ContractorTrends";
import { ContractorsTable } from "@/components/ContractorsTable";
import { FiscalYearSelector } from "@/components/FiscalYearSelector";
import { formatDollars, formatPercent, toTitleCase } from "@/lib/format";
import contractors from "@/../public/data/top-contractors-deduped.json";
import contractorTrends from "@/../public/data/contractor-trends.json";
import stats from "@/../public/data/stats.json";

export const metadata = {
  title: "Top 50 Federal Contractors — OpenSpending",
  description: "Who gets the most federal contract dollars? The 50 largest contractors ranked, from Lockheed Martin to Booz Allen.",
  openGraph: {
    title: "Top 50 Federal Contractors — OpenSpending",
    description: "Who gets the most federal contract dollars? The 50 largest contractors ranked, from Lockheed Martin to Booz Allen.",
  },
};

const top15 = contractors.slice(0, 15).map((c) => {
  const shortName = toTitleCase(c.name)
    .split(" ")
    .slice(0, 2)
    .join(" ")
    .replace(/,$/g, "");
  return {
    name: c.subsidiaries > 1 ? `${shortName} (${c.subsidiaries})` : shortName,
    amount: c.amount,
  };
});

const top10Total = contractors.slice(0, 10).reduce((sum, c) => sum + c.amount, 0);
const allTotal = contractors.reduce((sum, c) => sum + c.amount, 0);

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const tableData = contractors.map((c) => ({
  name: c.name,
  amount: c.amount,
  subsidiaries: c.subsidiaries,
  slug: toSlug(c.name),
}));

export default function ContractorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "Top Federal Contractors FY2025",
        "description": "Federal contract awards ranked by total obligated amount",
        "url": "https://www.openspending.us/contractors",
        "creator": { "@type": "Organization", "name": "OpenSpending" },
        "distribution": { "@type": "DataDownload", "contentUrl": "https://www.openspending.us/data/top-contractors-deduped.json", "encodingFormat": "application/json" }
      }} />
      <Breadcrumbs items={[{ label: "Contractors" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Top Federal Contractors
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className="text-gray-500 text-lg">
          The 50 companies receiving the most federal contract dollars in FY{stats.fiscalYear}.
        </p>
        <FiscalYearSelector />
      </div>
      <Link
        href="/compare?mode=contractors"
        className="inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-8"
      >
        Compare contractors →
      </Link>

      {/* Concentration Insight */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-indigo-900 mb-2">
          Contractor Concentration
        </h2>
        <p className="text-indigo-800">
          The <span className="font-bold">top 10 contractors</span> receive{" "}
          <span className="font-bold">{formatDollars(top10Total)}</span> —{" "}
          <span className="font-bold">
            {formatPercent((top10Total / stats.totalContracts) * 100)}
          </span>{" "}
          of all federal contracts. The top 50 listed here account for{" "}
          <span className="font-bold">{formatDollars(allTotal)}</span> (
          {formatPercent((allTotal / stats.totalContracts) * 100)}). A handful
          of companies dominate federal procurement, raising questions about
          competition and taxpayer value.
        </p>
      </div>

      {/* Bar Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 15 Contractors by Contract Value
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart data={top15} height={550} color="#4338ca" />
        </div>
      </div>

      {/* Full Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        All 50 Contractors
      </h2>
      <ContractorsTable data={tableData} />

      {/* Contractor Trends */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Contractor Spending Over Time
        </h2>
        <p className="text-gray-500 mb-6">
          Multi-year spending trends for {contractorTrends.length} contractors
          with 3+ years of data. Are the biggest winners growing even bigger?
        </p>
        <ContractorTrends data={contractorTrends} />
      </div>

      {/* Explore More */}
      <div className="mt-12 bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
          Explore More
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Follow the money beyond the top contractors.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/how-it-works"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            How Contracts Work
          </Link>
          <Link
            href="/no-bid"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            No-Bid Contracts
          </Link>
          <Link
            href="/waste"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Federal Waste Problem
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
