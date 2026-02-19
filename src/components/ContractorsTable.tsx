"use client";

import { useState, useMemo } from "react";
import { formatDollars } from "@/lib/format";

interface Contractor {
  name: string;
  amount: number;
  subsidiaries: number;
}

export function ContractorsTable({ data }: { data: Contractor[] }) {
  const [sortKey, setSortKey] = useState<"name" | "amount">("amount");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter((row) => row.name.toLowerCase().includes(lower));
  }, [data, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortKey === "amount") {
        return sortDir === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      return sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }, [filtered, sortKey, sortDir]);

  function handleSort(key: "name" | "amount") {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "amount" ? "desc" : "asc");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">
                #
              </th>
              <th
                onClick={() => handleSort("name")}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-700 select-none"
              >
                Contractor
                {sortKey === "name" && (
                  <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
              <th
                onClick={() => handleSort("amount")}
                className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-700 select-none"
              >
                Amount
                {sortKey === "amount" && (
                  <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sorted.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-indigo-50/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <span className="flex items-center gap-2">
                    {row.name}
                    {row.subsidiaries > 1 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                        {row.subsidiaries} entities merged
                      </span>
                    )}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right font-mono text-gray-900 font-medium">
                  {formatDollars(row.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-400">
        Showing {sorted.length} of {data.length} results
      </p>
    </div>
  );
}
