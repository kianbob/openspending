import Link from "next/link";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { NaicsDonutChart } from "@/components/charts/NaicsDonutChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars } from "@/lib/format";
import pscData from "@/../public/data/product-service-codes.json";
import naicsData from "@/../public/data/naics-detailed.json";

export const metadata = {
  title: "What Does the Government Buy? | OpenSpending",
  description:
    "Fighter jets, healthcare, IT contracts — see exactly what the feds spend hundreds of billions on, broken down by product and industry.",
  openGraph: {
    title: "What Does the Government Buy? | OpenSpending",
    description:
      "Fighter jets, healthcare, IT contracts — see exactly what the feds spend hundreds of billions on, broken down by product and industry.",
  },
};

// --- PSC Category grouping ---
const categoryKeywords: Record<string, string[]> = {
  "Weapons & Defense": [
    "AIRCRAFT",
    "COMBAT",
    "GUIDED MISSILE",
    "BOMBS",
    "AMMUNITION",
    "WEAPON",
    "MARINE",
    "RADAR",
    "COUNTERMEASURES",
    "UNMANNED",
    "LAUNCHERS",
    "NUCLEAR",
  ],
  Healthcare: ["MEDICAL", "HEALTH", "DRUGS", "BIOLOGICALS"],
  "IT & Software": ["IT AND TELECOM", "SOFTWARE", "COMPUTER"],
  Construction: [
    "CONSTRUCTION",
    "MAINTENANCE",
    "REPAIR",
    "BUILDING",
    "OPERATION OF",
  ],
  "Professional Services": [
    "SUPPORT-",
    "ARCHITECT",
    "ENGINEERING",
    "HOUSEKEEPING",
    "ENVIRONMENTAL",
    "GUARD",
    "ADVERTISING",
  ],
  Research: ["R&D", "RESEARCH", "OPER OF GOVT R&D"],
};

function categorize(name: string): string {
  const upper = name.toUpperCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => upper.includes(kw))) {
      return category;
    }
  }
  return "Other";
}

const categoryTotals: Record<string, number> = {};
for (const item of pscData) {
  const cat = categorize(item.name);
  categoryTotals[cat] = (categoryTotals[cat] || 0) + item.amount;
}

const categoryColors: Record<string, string> = {
  "Weapons & Defense": "bg-red-50 border-red-200 text-red-900",
  Healthcare: "bg-emerald-50 border-emerald-200 text-emerald-900",
  "IT & Software": "bg-blue-50 border-blue-200 text-blue-900",
  Construction: "bg-orange-50 border-orange-200 text-orange-900",
  "Professional Services": "bg-violet-50 border-violet-200 text-violet-900",
  Research: "bg-cyan-50 border-cyan-200 text-cyan-900",
  Other: "bg-gray-50 border-gray-200 text-gray-900",
};

const sortedCategories = Object.entries(categoryTotals).sort(
  (a, b) => b[1] - a[1]
);

// --- Top 20 PSCs for bar chart ---
const top20 = pscData.slice(0, 20).map((item) => ({
  name: item.name.length > 30 ? item.name.slice(0, 30) + "..." : item.name,
  amount: item.amount,
}));

// --- NAICS sector grouping ---
function naicsSector(code: string | null): string {
  if (!code) return "Other";
  const prefix = code.slice(0, 2);
  switch (prefix) {
    case "33":
      return "Manufacturing";
    case "54":
      return "Professional/Scientific/Technical";
    case "23":
      return "Construction";
    case "52":
    case "62":
      return "Healthcare/Insurance";
    case "56":
      return "Administrative/Waste";
    case "48":
    case "49":
      return "Transportation";
    default:
      return "Other";
  }
}

const sectorTotals: Record<string, number> = {};
for (const item of naicsData) {
  const sector = naicsSector(item.code);
  sectorTotals[sector] = (sectorTotals[sector] || 0) + item.amount;
}

const sectors = Object.entries(sectorTotals)
  .sort((a, b) => b[1] - a[1])
  .map(([name, value]) => ({ name, value }));

// --- Table data ---
const columns = [
  { key: "name", label: "Product / Service", format: "text" as const },
  { key: "code", label: "Code", format: "text" as const },
  {
    key: "amount",
    label: "Amount",
    format: "dollars" as const,
    align: "right" as const,
  },
];

const tableData = pscData.map((item) => ({
  name: item.name,
  code: item.code,
  amount: item.amount,
}));

export default function WhatTheyBuyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
        What Does the Government Buy?
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        A breakdown of federal procurement by product codes and industry
        sectors.
      </p>

      {/* Editorial callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-amber-900 mb-2">
          Follow the Money
        </h2>
        <p className="text-amber-800">
          The government spends{" "}
          <span className="font-bold">$42B on aircraft</span> and{" "}
          <span className="font-bold">$38B on managed healthcare</span>. Where
          does <span className="font-bold">YOUR</span> money go?
        </p>
      </div>

      {/* Category cards */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Spending by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedCategories.map(([category, total]) => (
            <div
              key={category}
              className={`rounded-xl border p-4 ${categoryColors[category] || categoryColors.Other}`}
            >
              <p className="text-sm font-medium opacity-80">{category}</p>
              <p className="text-xl font-bold mt-1">{formatDollars(total)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 20 Product &amp; Service Codes
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart
            data={top20}
            height={700}
            color="#4338ca"
            labelWidth={180}
          />
        </div>
      </div>

      {/* NAICS Donut */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Industry Sectors (NAICS)
        </h2>
        <p className="text-gray-500 mb-6">
          Federal contract spending grouped by NAICS industry sector.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <NaicsDonutChart sectors={sectors} />
        </div>
      </div>

      {/* Full Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        All 100 Product &amp; Service Codes
      </h2>
      <SortableTable
        columns={columns}
        data={tableData}
        defaultSortKey="amount"
      />

      {/* Cross-links */}
      <div className="mt-12 bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
          Explore More
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          See who gets the contracts and which agencies are spending the most.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contractors"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Top Contractors
          </Link>
          <Link
            href="/pentagon-spending"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Pentagon Spending
          </Link>
          <Link
            href="/healthcare-spending"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Healthcare Spending
          </Link>
        </div>
      </div>
    </div>
  );
}
