"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatDollars, toTitleCase } from "@/lib/format";
import countyData from "@/../public/data/county-spending.json";

type County = { name: string | null; amount: number; code: string | null };

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const counties = (countyData as County[])
  .filter((c): c is County & { name: string } => !!c.name)
  .sort((a, b) => b.amount - a.amount)
  .map((c, i) => ({ ...c, rank: i + 1, slug: slugify(c.name) }));

// Deduplicate by slug
const seen = new Set<string>();
const deduped = counties.filter((c) => {
  if (seen.has(c.slug)) return false;
  seen.add(c.slug);
  return true;
});

type SortKey = "rank" | "name" | "amount";

export default function CountiesListingPage() {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = useMemo(() => {
    const arr = [...deduped];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      else cmp = a.rank - b.rank;
      return sortAsc ? cmp : -cmp;
    });
    return arr;
  }, [sortKey, sortAsc]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((v) => !v);
    else { setSortKey(key); setSortAsc(key === "name"); }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return <span className="ml-1">{sortAsc ? "↑" : "↓"}</span>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Counties" }]} />

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Federal Spending by County
      </h1>
      <p className="text-gray-600 mb-6">
        Explore federal spending across {deduped.length} counties. Click any county for a detailed breakdown.
      </p>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-600 cursor-pointer select-none"
                onClick={() => handleSort("rank")}
              >
                Rank<SortIcon col="rank" />
              </th>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-600 cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                County<SortIcon col="name" />
              </th>
              <th
                className="px-4 py-3 text-right font-semibold text-gray-600 cursor-pointer select-none"
                onClick={() => handleSort("amount")}
              >
                Federal Spending<SortIcon col="amount" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((c) => (
              <tr key={c.slug} className="hover:bg-indigo-50/50 transition-colors">
                <td className="px-4 py-3 text-gray-500 tabular-nums">
                  {c.rank}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/counties/${c.slug}`}
                    className="text-indigo-700 font-medium hover:underline"
                  >
                    {toTitleCase(c.name)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-medium text-gray-900">
                  {formatDollars(c.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
