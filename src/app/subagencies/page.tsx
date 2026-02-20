import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";
import { SortableTable } from "@/components/SortableTable";
import { SubAgencyBarChart } from "@/components/charts/SubAgencyBarChart";
import subagencies from "@/../public/data/subagencies.json";

export const metadata: Metadata = {
  title: "Where the Money Really Goes: Sub-Agency Spending | OpenSpending",
  description:
    "Parent agencies get the headlines. These are the offices actually writing the checks. Explore spending across 100+ federal sub-agencies.",
};

const sorted = [...subagencies].sort((a, b) => b.amount - a.amount);
const top20 = sorted.slice(0, 20).map((s) => ({
  name: s.name.length > 40 ? s.name.slice(0, 37) + "…" : s.name,
  amount: s.amount,
}));

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const tableData = sorted.map((s, i) => ({
  rank: i + 1,
  name: s.name,
  href: `/subagencies/${slugify(s.name)}`,
  amount: s.amount,
}));

const cmsAmount = sorted[0]?.amount ?? 0;
const next5Sum = sorted.slice(1, 6).reduce((s, a) => s + a.amount, 0);

const columns = [
  { key: "rank", label: "#", align: "right" as const },
  { key: "name", label: "Sub-Agency", format: "link" as const, linkKey: "href" },
  { key: "amount", label: "Spending", format: "dollars" as const, align: "right" as const },
];

export default function SubAgenciesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "Federal Sub-Agency Spending FY2025",
        "description": "Spending data for federal sub-agencies and bureaus",
        "url": "https://www.openspending.us/subagencies",
        "creator": { "@type": "Organization", "name": "OpenSpending" },
        "distribution": { "@type": "DataDownload", "contentUrl": "https://www.openspending.us/data/subagencies.json", "encodingFormat": "application/json" }
      }} />
      <Breadcrumbs items={[{ label: "Sub-Agencies" }]} />

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        Where the Money Really Goes: Sub-Agency Spending
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Parent agencies get the headlines. These are the offices actually writing the checks.
      </p>

      <ShareButtons
        url="https://www.openspending.us/subagencies"
        title="Where the Money Really Goes: Sub-Agency Spending"
      />

      {/* Key Insight */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg my-10">
        <p className="text-2xl font-bold text-indigo-900 mb-2">
          {formatDollars(cmsAmount)}
        </p>
        <p className="text-indigo-800">
          CMS alone accounts for more spending than the next 5 sub-agencies combined
          (which total {formatDollars(next5Sum)}).
        </p>
      </div>

      {/* Top 20 Bar Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top 20 Sub-Agencies by Spending</h2>
        <SubAgencyBarChart data={top20} />
      </section>

      {/* Full Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Sub-Agencies</h2>
        <SortableTable
          columns={columns}
          data={tableData}
          defaultSortKey="amount"
          defaultSortDir="desc"
        />
      </section>

      {/* Cross-links */}
      <section className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/agencies"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition"
          >
            <p className="font-semibold text-indigo-700">Agencies →</p>
            <p className="text-sm text-gray-600">Parent agency profiles</p>
          </Link>
          <Link
            href="/contractors"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition"
          >
            <p className="font-semibold text-indigo-700">Contractors →</p>
            <p className="text-sm text-gray-600">Top federal contractors</p>
          </Link>
          <Link
            href="/healthcare-spending"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition"
          >
            <p className="font-semibold text-indigo-700">Healthcare Spending →</p>
            <p className="text-sm text-gray-600">The healthcare machine</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
