import Link from "next/link";
import { SortableTable } from "@/components/SortableTable";
import { ProgramBarChart } from "@/components/charts/ProgramBarChart";
import { ShareButtons } from "@/components/ShareButtons";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { formatDollars } from "@/lib/format";
import programs from "@/../public/data/federal-programs.json";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

export const metadata = {
  title: "Federal Programs — $1.24T in Grants",
  description:
    "200 federal assistance programs tracked — from Medicaid ($666B) to school lunch. See how $1.24 trillion in federal grants is distributed across programs.",
  openGraph: {
    title: "Federal Programs: Where $1.24 Trillion in Grants Goes",
    description:
      "200 federal assistance programs tracked. Medicaid alone accounts for $666B — more than the next 10 programs combined.",
  },
};

const totalSpending = programs.reduce((s, p) => s + p.amount, 0);

const chartData = programs.slice(0, 20).map((p) => ({
  ...p,
  slug: slugify(p.name),
}));

const columns = [
  { key: "rank", label: "Rank", format: "text" as const, align: "right" as const },
  { key: "name", label: "Program Name", format: "link" as const, linkKey: "href" },
  { key: "amount", label: "Amount", format: "dollars" as const, align: "right" as const },
];

const tableData = programs.map((p) => ({
  rank: p.rank,
  name: p.name,
  amount: p.amount,
  href: `/programs/${slugify(p.name)}`,
}));

export default function ProgramsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "Federal Programs FY2025",
        "description": "Federal assistance programs ranked by total spending",
        "url": "https://www.openspending.us/programs",
        "creator": { "@type": "Organization", "name": "OpenSpending" },
        "distribution": { "@type": "DataDownload", "contentUrl": "https://www.openspending.us/data/federal-programs.json", "encodingFormat": "application/json" }
      }} />
      <Breadcrumbs items={[{ label: "Federal Programs" }]} />

      <h1 className="text-4xl font-serif font-bold text-gray-900 mt-6">
        Federal Programs: Where $1.24 Trillion in Grants Goes
      </h1>
      <p className="text-lg text-gray-600 mt-3 max-w-3xl">
        200 federal assistance programs tracked — from Medicaid to school lunch.
      </p>

      <ShareButtons title="Federal Programs: Where $1.24 Trillion in Grants Goes — OpenSpending" />

      {/* Key Insight */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
        <p className="text-red-900 font-semibold text-lg">
          💡 Medicaid alone accounts for $666B — more than the next 10 programs combined.
        </p>
        <p className="text-red-700 mt-2 text-sm">
          That&apos;s {((666000000000 / totalSpending) * 100).toFixed(0)}% of all federal grant spending in a single program.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-indigo-700">{formatDollars(totalSpending)}</div>
          <div className="text-sm text-gray-500 mt-1">Total Grant Spending</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-indigo-700">200</div>
          <div className="text-sm text-gray-500 mt-1">Programs Tracked</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-indigo-700">{formatDollars(totalSpending / 200)}</div>
          <div className="text-sm text-gray-500 mt-1">Average per Program</div>
        </div>
      </div>

      {/* Top 20 Chart */}
      <section className="mt-12">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Top 20 Federal Programs by Spending</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <ProgramBarChart data={chartData} />
        </div>
      </section>

      {/* Full Table */}
      <section className="mt-12">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">All 200 Federal Programs</h2>
        <SortableTable
          columns={columns}
          data={tableData}
          defaultSortKey="rank"
          defaultSortDir="asc"
        />
      </section>

      {/* Cross-links */}
      <section className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/grants" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <div className="font-semibold text-indigo-700">Grant Recipients →</div>
            <div className="text-sm text-gray-500 mt-1">$1.24T to states & organizations</div>
          </Link>
          <Link href="/agencies" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <div className="font-semibold text-indigo-700">Federal Agencies →</div>
            <div className="text-sm text-gray-500 mt-1">97 agency profiles</div>
          </Link>
          <Link href="/healthcare-spending" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <div className="font-semibold text-indigo-700">Healthcare Spending →</div>
            <div className="text-sm text-gray-500 mt-1">The healthcare machine</div>
          </Link>
        </div>
      </section>
    </main>
  );
}
