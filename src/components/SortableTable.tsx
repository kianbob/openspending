"use client";

import { useState, useMemo } from "react";
import { formatDollars } from "@/lib/format";

interface Column {
  key: string;
  label: string;
  format?: "dollars" | "percent" | "text" | "date";
  align?: "left" | "right";
}

interface SortableTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  defaultSortKey?: string;
  defaultSortDir?: "asc" | "desc";
}

export function SortableTable({
  columns,
  data,
  defaultSortKey,
  defaultSortDir = "desc",
}: SortableTableProps) {
  const [sortKey, setSortKey] = useState(defaultSortKey || columns[0].key);
  const [sortDir, setSortDir] = useState<"asc" | "desc">(defaultSortDir);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(lower)
      )
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal ?? "");
      const bStr = String(bVal ?? "");
      return sortDir === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [filtered, sortKey, sortDir]);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function formatValue(value: unknown, format?: string) {
    if (value == null) return "—";
    if (format === "dollars") return formatDollars(value as number);
    if (format === "percent") return `${(value as number).toFixed(1)}%`;
    if (format === "date") return String(value).slice(0, 10);
    return String(value);
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
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-700 select-none ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1">
                      {sortDir === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sorted.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-indigo-50/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-sm ${
                      col.align === "right"
                        ? "text-right font-mono"
                        : "text-left"
                    } ${
                      col.format === "dollars"
                        ? "text-gray-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {formatValue(row[col.key], col.format)}
                  </td>
                ))}
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
