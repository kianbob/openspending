import Link from "next/link";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars } from "@/lib/format";
import allCountries from "@/../public/data/spending-by-country.json";

export const metadata = {
  title: "U.S. Foreign Aid by Country | OpenSpending",
  description: "Billions sent abroad yearly as USAID's budget tripled to $50B. See the top 50 countries receiving your tax dollars.",
  openGraph: {
    title: "U.S. Foreign Aid by Country | OpenSpending",
    description: "Billions sent abroad yearly as USAID's budget tripled to $50B. See the top 50 countries receiving your tax dollars.",
  },
};

function titleCase(str: string): string {
  return str
    .split(/([,]\s*)/)
    .map((segment) =>
      segment.includes(",")
        ? segment
        : segment
            .split(/\s+/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ")
    )
    .join("");
}

const countries = allCountries.filter((c) => c.name !== "UNITED STATES");

const top20 = countries.slice(0, 20).map((c) => ({
  name: titleCase(c.name),
  amount: c.amount,
}));

const foreignTotal = countries.reduce((sum, c) => sum + c.amount, 0);

const columns = [
  { key: "name", label: "Country", format: "text" as const },
  { key: "code", label: "Code", format: "text" as const },
  { key: "amount", label: "Amount", format: "dollars" as const, align: "right" as const },
];

const tableData = countries.map((c) => ({
  name: titleCase(c.name),
  code: c.code,
  amount: c.amount,
}));

export default function ForeignAidPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
        Where U.S. Tax Dollars Go Abroad
      </h1>
      <p className="text-sm text-gray-500 mb-2">Updated: May 2025</p>
      <p className="text-gray-500 text-lg mb-8">
        {formatDollars(foreignTotal)} in federal spending flows to foreign countries.
        Here&apos;s where your money goes.
      </p>

      {/* USAID Callout */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-amber-900 mb-2">
          The USAID Question
        </h2>
        <p className="text-amber-800">
          USAID&apos;s budget <span className="font-bold">tripled from $15B to $50B</span> between
          2017 and 2023 — an extraordinary expansion with limited public scrutiny. Where did the
          money go? Who was watching? The agency is now facing deep cuts from the DOGE efficiency
          effort, which argues much of the spending lacked measurable outcomes.
          The data below covers all federal international spending, not just USAID,
          but the pattern is clear: billions flow abroad with little transparency for taxpayers.
        </p>
      </div>

      {/* Bar Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 20 Countries by Federal Spending
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart data={top20} height={650} color="#4338ca" labelWidth={140} />
        </div>
      </div>

      {/* Full Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        All Countries
      </h2>
      <SortableTable
        columns={columns}
        data={tableData}
        defaultSortKey="amount"
      />

      {/* Cross-link */}
      <div className="mt-10 bg-indigo-50 border border-indigo-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold text-indigo-900">USAID Deep Dive</p>
          <p className="text-indigo-800 text-sm">
            See the 100 largest USAID grants and contracts — and the budget explosion from $15B to $50B.
          </p>
        </div>
        <Link
          href="/usaid"
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
        >
          Explore USAID →
        </Link>
      </div>
    </div>
  );
}
