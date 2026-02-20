import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { SortableTable } from "@/components/SortableTable";
import { FiscalYearSelector } from "@/components/FiscalYearSelector";
import { formatDollars } from "@/lib/format";
import agencies from "@/../public/data/agencies.json";
import agencySpending from "@/../public/data/agency-spending.json";

export const metadata = {
  title: "Federal Agencies — OpenSpending",
  description: "All 97 federal agencies ranked by budget authority, obligations, and outlays.",
  openGraph: {
    title: "Federal Agencies — OpenSpending",
    description: "All 97 federal agencies ranked by budget authority, obligations, and outlays.",
  },
};

const top15 = agencies.slice(0, 15).map((a) => ({
  name: a.abbreviation || a.name.split(" ").slice(0, 2).join(" "),
  amount: a.budgetAuthority,
}));

// Build a lookup from agency slug to spending data
const spendingBySlug = new Map(
  agencySpending
    .filter((a): a is typeof a & { slug: string } => a.slug != null)
    .map((a) => [a.slug, a])
);

const columns = [
  { key: "name", label: "Agency", format: "link" as const, linkKey: "href" },
  { key: "abbreviation", label: "Abbr", format: "text" as const },
  { key: "budgetAuthority", label: "Budget Authority", format: "dollars" as const, align: "right" as const },
  { key: "obligated", label: "Obligated", format: "dollars" as const, align: "right" as const },
  { key: "outlays", label: "Outlays", format: "dollars" as const, align: "right" as const },
  { key: "contracts", label: "Contracts", format: "dollars" as const, align: "right" as const },
  { key: "grants", label: "Grants", format: "dollars" as const, align: "right" as const },
  { key: "pctOfTotal", label: "% of Total", format: "percent" as const, align: "right" as const },
];

const tableData = agencies.map((a) => {
  const spending = spendingBySlug.get(a.slug);
  return {
    name: a.name,
    href: `/agencies/${a.slug}`,
    abbreviation: a.abbreviation,
    budgetAuthority: a.budgetAuthority,
    obligated: a.obligated,
    outlays: a.outlays,
    contracts: spending?.contracts ?? null,
    grants: spending && "grants" in spending ? spending.grants ?? null : null,
    pctOfTotal: a.pctOfTotal,
  };
});

export default function AgenciesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "Federal Agency Spending FY2025",
        "description": "Budget authority, obligations, and outlays for 97 federal agencies",
        "url": "https://openspending-app.vercel.app/agencies",
        "creator": { "@type": "Organization", "name": "OpenSpending" },
        "distribution": { "@type": "DataDownload", "contentUrl": "https://openspending-app.vercel.app/data/agencies.json", "encodingFormat": "application/json" }
      }} />
      <Breadcrumbs items={[{ label: "Agencies" }]} />
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Federal Agencies
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className="text-gray-500 text-lg">
          All {agencies.length} federal agencies, ranked by budget authority. Sort
          by any column. Search by name or abbreviation.
        </p>
        <FiscalYearSelector />
      </div>
      <Link
        href="/compare?mode=agencies"
        className="inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-8"
      >
        Compare agencies →
      </Link>

      {/* Top 15 Bar Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 15 Agencies by Budget Authority
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart data={top15} height={550} color="#4338ca" labelWidth={80} />
        </div>
      </div>

      {/* Contracts vs Grants Breakdown */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Contracts vs. Grants by Agency
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          How each agency splits its spending between contracts and grants.
          Some agencies are contract-heavy (DOD), while others distribute
          mostly through grants (HHS, DOT).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agencySpending
            .filter((a) => a.slug && (a.contracts > 0 || (a.grants && a.grants > 0)))
            .slice(0, 21)
            .map((a) => {
              const contracts = a.contracts || 0;
              const grants = a.grants || 0;
              const total = contracts + grants;
              const contractPct = total > 0 ? (contracts / total) * 100 : 0;
              const grantPct = total > 0 ? (grants / total) * 100 : 0;

              return (
                <Link
                  key={a.code}
                  href={`/agencies/${a.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:border-indigo-300 hover:shadow-sm transition-colors"
                >
                  <h3 className="text-sm font-semibold text-gray-900 truncate mb-2">
                    {a.name}
                  </h3>
                  <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-gray-100 mb-2">
                    {contractPct > 0 && (
                      <div
                        className="bg-indigo-600 rounded-l-full"
                        style={{ width: `${contractPct}%` }}
                      />
                    )}
                    {grantPct > 0 && (
                      <div
                        className="bg-emerald-500 rounded-r-full"
                        style={{ width: `${grantPct}%` }}
                      />
                    )}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 mr-1" />
                      Contracts {formatDollars(contracts)}
                    </span>
                    {grants > 0 && (
                      <span>
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />
                        Grants {formatDollars(grants)}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      {/* Full Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        All {agencies.length} Agencies
      </h2>
      <SortableTable
        columns={columns}
        data={tableData}
        defaultSortKey="budgetAuthority"
      />
    </div>
  );
}
