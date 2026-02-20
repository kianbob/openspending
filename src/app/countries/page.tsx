"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars, formatDollarsLong, toTitleCase } from "@/lib/format";
import countriesData from "@/../public/data/spending-by-country.json";

type Country = { name: string; code: string; amount: number };
type SortKey = "name" | "amount" | "rank";
type SortDir = "asc" | "desc";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const countries = countriesData as Country[];
const ranked = [...countries].sort((a, b) => b.amount - a.amount).map((c, i) => ({ ...c, rank: i + 1 }));

export default function CountriesPage() {
  const [sortKey, setSortKey] = useState<SortKey>("amount");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    const copy = [...ranked];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      else cmp = a.rank - b.rank;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir(key === "name" ? "asc" : "desc"); }
  }

  const arrow = (key: SortKey) => sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "U.S. Federal Spending by Country FY2025",
        "description": "Foreign aid and federal spending distributed by recipient country",
        "url": "https://www.openspending.us/countries",
        "creator": { "@type": "Organization", "name": "OpenSpending" }
      }} />
      <Breadcrumbs items={[{ label: "Foreign Aid", href: "/foreign-aid" }, { label: "Countries" }]} />

      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
        U.S. Spending by Country
      </h1>
      <p className="text-gray-600 mb-6">
        Federal spending across 50 countries in FY2025. Click any country for details.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 text-sm text-gray-500">
              <th className="py-2 px-3 cursor-pointer hover:text-gray-800 select-none" onClick={() => toggleSort("rank")}>
                Rank{arrow("rank")}
              </th>
              <th className="py-2 px-3 cursor-pointer hover:text-gray-800 select-none" onClick={() => toggleSort("name")}>
                Country{arrow("name")}
              </th>
              <th className="py-2 px-3 cursor-pointer hover:text-gray-800 select-none text-right" onClick={() => toggleSort("amount")}>
                Amount{arrow("amount")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.code} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-3 text-gray-400 text-sm">#{c.rank}</td>
                <td className="py-2 px-3">
                  <Link href={`/countries/${slugify(c.name)}`} className="text-indigo-600 hover:underline font-medium">
                    {toTitleCase(c.name)}
                  </Link>
                </td>
                <td className="py-2 px-3 text-right font-mono text-sm" title={formatDollarsLong(c.amount)}>
                  {formatDollars(c.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <ShareButtons title="U.S. Federal Spending by Country — FY2025" />
      </div>
    </main>
  );
}
