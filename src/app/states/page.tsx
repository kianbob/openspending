import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars } from "@/lib/format";
import states from "@/../public/data/spending-by-state.json";
import StateHeatmap from "@/components/charts/StateHeatmapWrapper";

export const metadata = {
  title: "Federal Spending by State: All 50 States Ranked (2025) | OpenSpending",
  description: "Virginia leads with $83B+ in contracts — thanks to the Pentagon next door. California, Texas, and D.C. round out the top. See all 50 states ranked with heatmap.",
  openGraph: {
    title: "Federal Spending by State: Who Gets the Most? | OpenSpending",
    description: "Virginia leads with $83B+ in contracts — thanks to the Pentagon next door. California, Texas, and D.C. round out the top. See all 50 states ranked with heatmap.",
    url: "https://www.openspending.us/states",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Federal Spending by State: All 50 States Ranked (2025) | OpenSpending",
    description: "Virginia leads with $83B+ in contracts — thanks to the Pentagon next door. California, Texas, and D.C. round out the top. See all 50 states ranked with heatmap.",
  },
};

const top20 = states.slice(0, 20).map((s) => ({
  name: s.name,
  amount: s.amount,
}));

const allTotal = states.reduce((sum, s) => sum + s.amount, 0);

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const columns = [
  { key: "name", label: "State", format: "link" as const, linkKey: "href" },
  { key: "code", label: "Code", format: "text" as const },
  { key: "amount", label: "Amount", format: "dollars" as const, align: "right" as const },
];

const tableData = states.map((s) => ({
  name: s.name,
  code: s.code,
  amount: s.amount,
  href: `/states/${toSlug(s.name)}`,
}));

export default function StatesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "license": "https://creativecommons.org/publicdomain/zero/1.0/",
        "name": "Federal Contract Spending by State FY2025",
        "description": "Federal contract spending distributed across all 50 states and territories",
        "url": "https://www.openspending.us/states",
        "creator": { "@type": "Organization", "name": "OpenSpending" },
        "distribution": { "@type": "DataDownload", "contentUrl": "https://www.openspending.us/data/spending-by-state.json", "encodingFormat": "application/json" }
      }} />
      <Breadcrumbs items={[{ label: "States" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
        Federal Contract Spending by State
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        {formatDollars(allTotal)} in federal contracts distributed across all 50 states and territories.
      </p>

      {/* Virginia Insight */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-indigo-900 mb-2">
          Why Virginia Leads
        </h2>
        <p className="text-indigo-800">
          Virginia receives <span className="font-bold">{formatDollars(states[0]?.amount ?? 0)}</span> in
          federal contracts — more than any other state. The reason: proximity to the Pentagon.
          Northern Virginia is home to the headquarters of major defense contractors, military
          installations, and the intelligence community. The D.C. metro area (Virginia, Maryland,
          and D.C. combined) captures over{" "}
          <span className="font-bold">
            {formatDollars((states[0]?.amount ?? 0) + (states[3]?.amount ?? 0) + (states[6]?.amount ?? 0))}
          </span>{" "}
          in contracts — a concentration that raises questions about whether federal
          spending truly benefits the broader country.
        </p>
      </div>

      {/* Spending Heatmap */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          State Spending Heatmap
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Sized by total contract spending. Darker colors indicate higher spending.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <StateHeatmap />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 20 States by Contract Value
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart data={top20} height={650} color="#4338ca" />
        </div>
      </div>

      {/* Full Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        All States &amp; Territories
      </h2>
      <SortableTable
        columns={columns}
        data={tableData}
        defaultSortKey="amount"
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which state receives the most federal contract spending?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Virginia receives the most federal contract spending, largely due to its proximity to the Pentagon and the concentration of defense contractors and military installations in Northern Virginia.",
                },
              },
              {
                "@type": "Question",
                name: "How much does the federal government spend on contracts by state?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `The federal government distributed ${formatDollars(allTotal)} in contracts across all 50 states and territories in FY2025. The D.C. metro area (Virginia, Maryland, and D.C.) captures a disproportionate share due to proximity to federal agencies.`,
                },
              },
            ],
          }),
        }}
      />

      {/* Explore More */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/agencies" className="block border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
            <h3 className="font-bold text-gray-900 mb-1">Agency Budgets</h3>
            <p className="text-gray-600 text-sm">See how 97 federal agencies spend their budgets — from Defense to Education.</p>
          </Link>
          <Link href="/contractors" className="block border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
            <h3 className="font-bold text-gray-900 mb-1">Top Contractors</h3>
            <p className="text-gray-600 text-sm">The 50 companies receiving the most federal contract dollars.</p>
          </Link>
          <Link href="/state-dependency" className="block border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
            <h3 className="font-bold text-gray-900 mb-1">State Dependency</h3>
            <p className="text-gray-600 text-sm">Which states take more from the feds than they give back?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
