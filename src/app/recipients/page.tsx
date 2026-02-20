"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { formatDollars, toTitleCase } from "@/lib/format";
import rawData from "@/../public/data/top-recipients-all.json";

type SortKey = "rank" | "name" | "amount" | "category";
type SortDir = "asc" | "desc";

const healthKeywords = [
  "health", "medicaid", "human services", "social services", "medical assistance",
  "human svc", "family", "temporary", "disability", "cost containment",
];
const defenseKeywords = ["lockheed", "boeing", "electric boat", "leidos", "rockwell collins"];

function categorize(name: string): string {
  const lower = name.toLowerCase();
  if (healthKeywords.some((k) => lower.includes(k))) return "State Health Agency";
  if (defenseKeywords.some((k) => lower.includes(k))) return "Defense Contractor";
  if (lower.includes("unitedhealth") || lower.includes("optum") || lower.includes("triwest") || lower.includes("mckesson"))
    return "Healthcare/Insurance";
  if (lower.includes("commonwealth") || lower.includes("state of")) return "State Government";
  return "Other";
}

const data = rawData.map((d) => ({
  ...d,
  category: categorize(d.name),
}));

const chartData = data.slice(0, 20).map((d) => ({
  name: toTitleCase(d.name).split(",")[0].split(" ").slice(0, 3).join(" "),
  amount: d.amount,
}));

const categoryColors: Record<string, string> = {
  "State Health Agency": "bg-blue-100 text-blue-800",
  "Defense Contractor": "bg-red-100 text-red-800",
  "Healthcare/Insurance": "bg-purple-100 text-purple-800",
  "State Government": "bg-green-100 text-green-800",
  Other: "bg-gray-100 text-gray-700",
};

export default function RecipientsPage() {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "amount" ? "desc" : "asc");
    }
  };

  const sorted = useMemo(() => {
    const arr = [...data];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "rank") cmp = a.rank - b.rank;
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      else if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else cmp = a.category.localeCompare(b.category);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [sortKey, sortDir]);

  const arrow = (key: SortKey) => (sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "");

  const stateHealthTotal = data.filter((d) => d.category === "State Health Agency").reduce((s, d) => s + d.amount, 0);
  const defenseTotal = data.filter((d) => d.category === "Defense Contractor").reduce((s, d) => s + d.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Explore" }, { label: "Top Recipients" }]} />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-2">
            Top 42 Recipients of Federal Money
          </h1>
          <p className="text-gray-500 text-lg max-w-3xl">
            Not just contractors — state Medicaid agencies dominate the list.
          </p>
        </div>
        <ShareButtons title="Top 42 Recipients of Federal Money — OpenSpending" url="https://openspending-app.vercel.app/recipients" />
      </div>

      {/* Key Insight */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg">
        <p className="text-blue-900 font-semibold text-lg mb-1">Key Insight</p>
        <p className="text-blue-800">
          California&apos;s Dept of Health Care Services receives <strong>{formatDollars(data[0].amount)}</strong> — more than
          Lockheed Martin ({formatDollars(48249898507.04 + 21805827836.85)}). State Medicaid agencies account for{" "}
          <strong>{formatDollars(stateHealthTotal)}</strong> of the top spots, dwarfing defense contractors at{" "}
          {formatDollars(defenseTotal)}.
        </p>
      </div>

      {/* Category summary */}
      <div className="grid sm:grid-cols-4 gap-3 mb-10">
        {Object.entries(
          data.reduce<Record<string, { count: number; total: number }>>((acc, d) => {
            if (!acc[d.category]) acc[d.category] = { count: 0, total: 0 };
            acc[d.category].count++;
            acc[d.category].total += d.amount;
            return acc;
          }, {})
        )
          .sort((a, b) => b[1].total - a[1].total)
          .map(([cat, { count, total }]) => (
            <div key={cat} className="bg-white border border-gray-200 rounded-xl p-4">
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${categoryColors[cat]}`}>
                {cat}
              </span>
              <p className="text-2xl font-bold text-gray-900">{formatDollars(total)}</p>
              <p className="text-sm text-gray-500">{count} recipients</p>
            </div>
          ))}
      </div>

      {/* Bar Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top 20 Recipients</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-4 overflow-x-auto">
          <HorizontalBarChart data={chartData} height={600} color="#3b82f6" labelWidth={180} />
        </div>
      </section>

      {/* Sortable Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All 42 Recipients</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-3 px-4 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => toggleSort("rank")}>
                  Rank{arrow("rank")}
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => toggleSort("name")}>
                  Recipient{arrow("name")}
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => toggleSort("category")}>
                  Category{arrow("category")}
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-right cursor-pointer select-none" onClick={() => toggleSort("amount")}>
                  Amount{arrow("amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((d) => (
                <tr key={d.rank} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-500">{d.rank}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{toTitleCase(d.name)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${categoryColors[d.category]}`}>
                      {d.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-gray-700">{formatDollars(d.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cross-links */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Related</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          <Link href="/contractors" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <p className="font-semibold text-indigo-600">Contractors →</p>
            <p className="text-sm text-gray-500">Top 50 federal contractors</p>
          </Link>
          <Link href="/grants" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <p className="font-semibold text-indigo-600">Grants →</p>
            <p className="text-sm text-gray-500">$1.24T to states & orgs</p>
          </Link>
          <Link href="/states" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <p className="font-semibold text-indigo-600">States →</p>
            <p className="text-sm text-gray-500">Spending by state</p>
          </Link>
          <Link href="/healthcare-spending" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <p className="font-semibold text-indigo-600">Healthcare →</p>
            <p className="text-sm text-gray-500">The healthcare machine</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
