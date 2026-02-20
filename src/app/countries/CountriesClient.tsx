"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { formatDollars, formatDollarsLong, toTitleCase } from "@/lib/format";

type CountryRow = { name: string; code: string; amount: number; rank: number; slug: string };
type SortKey = "name" | "amount" | "rank";
type SortDir = "asc" | "desc";

export function CountriesClient({ countries }: { countries: CountryRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("amount");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    const copy = [...countries];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      else cmp = a.rank - b.rank;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [countries, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir(key === "name" ? "asc" : "desc"); }
  }

  const arrow = (key: SortKey) => sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  return (
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
                <Link href={`/countries/${c.slug}`} className="text-indigo-600 hover:underline font-medium">
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
  );
}
