import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars, toTitleCase } from "@/lib/format";
import concentrationData from "@/../public/data/contractor-concentration.json";
import contractorDetails from "@/../public/data/contractor-details.json";

export const metadata = {
  title: "The Contractor Monopoly: How 10 Companies Control Federal Spending — OpenSpending",
  description:
    "The top 10 federal contractors hold 64% of all contract dollars. Exposed: the HHI index, agency dependency, and why competition is broken.",
  keywords: "federal contractor monopoly, government contractor concentration, federal spending",
  openGraph: {
    title: "The Contractor Monopoly: How 10 Companies Control Federal Spending",
    description:
      "The top 10 federal contractors hold 64% of all contract dollars. See who they are and why it matters.",
  },
};

const top10 = concentrationData.topContractorsShare.slice(0, 10).map((c) => ({
  name: toTitleCase(c.name).slice(0, 30),
  amount: c.amount,
}));

const top10Total = concentrationData.topContractorsShare
  .slice(0, 10)
  .reduce((sum, c) => sum + c.amount, 0);

const top10Pct = concentrationData.topContractorsShare
  .slice(0, 10)
  .reduce((sum, c) => sum + c.pctOfTotal, 0);

// Agency concentration table
const byAgency = concentrationData.byAgency as Record<
  string,
  {
    agencyName: string;
    top5Contractors: { name: string; amount: number; pct: number }[];
    top5ConcentrationPct: number;
    totalContractSpending: number;
  }
>;

const agencyRows = Object.values(byAgency)
  .map((a) => ({
    agency: a.agencyName,
    topContractor: toTitleCase(a.top5Contractors[0].name).slice(0, 30),
    topContractorPct: a.top5Contractors[0].pct,
    top5Pct: a.top5ConcentrationPct,
    totalSpending: a.totalContractSpending,
  }))
  .sort((a, b) => b.top5Pct - a.top5Pct);

const agencyColumns = [
  { key: "agency", label: "Agency", format: "text" as const },
  { key: "topContractor", label: "Top Contractor", format: "text" as const },
  { key: "topContractorPct", label: "Top Contractor %", format: "percent" as const, align: "right" as const },
  { key: "top5Pct", label: "Top 5 %", format: "percent" as const, align: "right" as const },
  { key: "totalSpending", label: "Total Contracts", format: "dollars" as const, align: "right" as const },
];

// Category breakdown from contractor-details
const details = contractorDetails as Record<
  string,
  { name: string; totalAmount: number; category?: string }
>;

const categoryTotals: Record<string, number> = {};
Object.values(details).forEach((c) => {
  const cat = c.category || "Other";
  categoryTotals[cat] = (categoryTotals[cat] || 0) + c.totalAmount;
});

const categoryData = Object.entries(categoryTotals)
  .map(([name, amount]) => ({ name, amount }))
  .sort((a, b) => b.amount - a.amount);

// GDP comparisons for the "country" visualization
const gdpComparisons = [
  { name: "Top 10 US Contractors", amount: top10Total },
  { name: "New Zealand (GDP)", amount: 252_000_000_000 },
  { name: "Ukraine (GDP)", amount: 178_000_000_000 },
  { name: "Hungary (GDP)", amount: 188_000_000_000 },
  { name: "Kenya (GDP)", amount: 113_000_000_000 },
];

export default function ContractorMonopolyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Investigations" }, { label: "The Contractor Monopoly" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The Contractor Monopoly
        </h1>
        <ShareButtons
          title="The Contractor Monopoly — OpenSpending"
          url="https://openspending.us/contractor-monopoly"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-8">
        Just 10 companies capture {Math.round(top10Pct)}% of every federal contract dollar.
        Here&apos;s how concentration, lobbying, and no-bid deals created a government contracting cartel.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Top 10 Share</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round(top10Pct)}%</p>
          <p className="text-xs text-gray-400">of all federal contracts</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Top 10 Total</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">{formatDollars(top10Total)}</p>
          <p className="text-xs text-gray-400">per year</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">HHI Index</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">{Math.round(concentrationData.hhiIndex)}</p>
          <p className="text-xs text-gray-400">{concentrationData.hhiInterpretation}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">#1: Lockheed Martin</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {formatDollars(concentrationData.topContractorsShare[0].amount)}
          </p>
          <p className="text-xs text-gray-400">{concentrationData.topContractorsShare[0].pctOfTotal}% alone</p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-10">
        <p className="text-amber-900 text-lg">
          <span className="font-bold">Lockheed Martin</span> receives{" "}
          <span className="font-bold">{formatDollars(concentrationData.topContractorsShare[0].amount)}/year</span>{" "}
          in federal contracts — more than the GDP of 100+ countries.
        </p>
      </div>

      {/* Top 10 Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 10 Federal Contractors by Contract Value
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart data={top10} height={420} color="#4338ca" labelWidth={170} />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Contract dollars awarded in FY2025. Source: USASpending.gov
        </p>
      </div>

      {/* HHI Explainer */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-indigo-900 mb-3">
          What Is the HHI Index?
        </h2>
        <p className="text-indigo-800 mb-3">
          The <strong>Herfindahl-Hirschman Index (HHI)</strong> measures market concentration.
          It&apos;s calculated by squaring each company&apos;s market share and summing the results.
          The DOJ uses it to evaluate mergers — an HHI below 1,500 means &quot;unconcentrated,&quot;
          1,500–2,500 is &quot;moderately concentrated,&quot; and above 2,500 is &quot;highly concentrated.&quot;
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-indigo-700">719</p>
            <p className="text-xs text-gray-500">Federal Contracting</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-red-600">~2,500</p>
            <p className="text-xs text-gray-500">Airlines</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-red-600">~2,700</p>
            <p className="text-xs text-gray-500">Beer Industry</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-red-600">~2,800</p>
            <p className="text-xs text-gray-500">Wireless Carriers</p>
          </div>
        </div>
        <p className="text-indigo-800 mt-3 text-sm">
          At 719, the federal contracting market <em>looks</em> competitive overall.
          But zoom into individual agencies and the picture changes dramatically —
          DOD&apos;s top 5 contractors control over 70% of its spending.
        </p>
      </div>

      {/* GDP Comparison */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          If the Top 10 Were a Country...
        </h2>
        <p className="text-gray-600 mb-4">
          The combined contract revenue of the top 10 contractors ({formatDollars(top10Total)})
          would make them larger than the economies of most nations.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart data={gdpComparisons} height={250} color="#6366f1" labelWidth={200} />
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Contractor Categories: Defense vs IT vs Healthcare
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart data={categoryData} height={250} color="#8b5cf6" labelWidth={140} />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Total contract value by contractor category. Source: USASpending.gov
        </p>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-10">
        <p className="text-amber-900 text-lg">
          Competition is supposed to drive down costs. So why does{" "}
          <Link href="/no-bid" className="text-amber-700 underline font-bold hover:text-amber-900">
            one-third of federal contracting happen without competitive bidding
          </Link>?
        </p>
      </div>

      {/* Agency Dependency Table */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Agency Dependency: Who Relies Most on a Single Contractor?
        </h2>
        <p className="text-gray-500 mb-4">
          Some agencies are deeply dependent on just a few companies.
          When the top 5 contractors control 84% of an agency&apos;s spending, that&apos;s not a market — it&apos;s a dependency.
        </p>
        <SortableTable columns={agencyColumns} data={agencyRows} defaultSortKey="top5Pct" />
      </div>

      {/* Related */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/no-bid" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">No-Bid Nation</p>
            <p className="text-sm text-gray-600 mt-1">$74B in contracts awarded without competition</p>
          </Link>
          <Link href="/top-10" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Top 10 Contractors</p>
            <p className="text-sm text-gray-600 mt-1">Deep dive into the companies that run the government</p>
          </Link>
          <Link href="/interest" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">The Interest Time Bomb</p>
            <p className="text-sm text-gray-600 mt-1">$952B in interest — more than the defense budget</p>
          </Link>
          <Link href="/state-dependency" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Federal Dependency by State</p>
            <p className="text-sm text-gray-600 mt-1">Which states take more than they give?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
