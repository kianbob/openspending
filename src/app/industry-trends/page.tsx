"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";

interface Industry {
  name: string;
  fy2020: number;
  fy2025: number;
  growth_pct: number;
  growth_dollars: number;
}

type SortKey = "name" | "fy2020" | "fy2025" | "growth_pct" | "growth_dollars";
type SortDir = "asc" | "desc";

function shortenName(name: string, maxLen = 30): string {
  if (name.length <= maxLen) return name;
  // Try to cut at a word boundary
  const truncated = name.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 15 ? truncated.slice(0, lastSpace) : truncated) + "...";
}

export default function IndustryTrendsPage() {
  const [data, setData] = useState<Industry[] | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("growth_dollars");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    fetch("/data/industry-growth.json")
      .then((r) => r.json())
      .then((industries: Industry[]) => setData(industries));
  }, []);

  const winners = useMemo(
    () =>
      data
        ?.filter((d) => d.growth_pct > 0)
        .sort((a, b) => b.growth_pct - a.growth_pct)
        .slice(0, 5) ?? [],
    [data]
  );

  const losers = useMemo(
    () =>
      data
        ?.filter((d) => d.growth_pct < 0)
        .sort((a, b) => a.growth_pct - b.growth_pct)
        .slice(0, 5) ?? [],
    [data]
  );

  const chartData = useMemo(
    () =>
      data
        ? [...data]
            .sort(
              (a, b) =>
                Math.abs(b.growth_dollars) - Math.abs(a.growth_dollars)
            )
            .slice(0, 15)
            .map((d) => ({
              name: shortenName(d.name, 28),
              fullName: d.name,
              FY2020: d.fy2020,
              FY2025: d.fy2025,
              isGrowth: d.fy2025 >= d.fy2020,
            }))
        : [],
    [data]
  );

  const sortedData = useMemo(() => {
    if (!data) return [];
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    return sorted;
  }, [data, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  function SortArrow({ column }: { column: SortKey }) {
    if (sortKey !== column) return <span className="text-gray-300 ml-1">&#8597;</span>;
    return <span className="ml-1">{sortDir === "asc" ? "&#9650;" : "&#9660;"}</span>;
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Analysis" },
          { label: "Industry Winners & Losers" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Industry Winners &amp; Losers: How COVID Reshaped Government Contracting
        </h1>
        <ShareButtons
          title="Industry Winners & Losers: How COVID Reshaped Government Contracting — OpenSpending"
          url="https://www.openspending.us/industry-trends"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Updated: May 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        COVID reshaped government spending. Healthcare insurance contracts
        tripled. Meanwhile, the government is buying fewer computers.
      </p>

      {/* Winners Section */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-500" />
          Winners: Industries That Boomed
        </h2>
        <p className="text-gray-600 mb-6">
          These five industries saw the largest percentage growth in federal
          contract spending from FY2020 to FY2025.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {winners.map((w) => (
            <div
              key={w.name}
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-5"
            >
              <p className="text-3xl font-bold text-emerald-700 mb-1">
                +{w.growth_pct.toFixed(0)}%
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-2 leading-tight">
                {w.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatDollars(w.fy2020)} &rarr; {formatDollars(w.fy2025)}
              </p>
              <p className="text-xs text-emerald-600 font-medium mt-1">
                +{formatDollars(w.growth_dollars)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Losers Section */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
          Losers: Industries in Decline
        </h2>
        <p className="text-gray-600 mb-6">
          These five industries saw the steepest declines in federal contract
          spending — some losing more than half their government business.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {losers.map((l) => (
            <div
              key={l.name}
              className="bg-red-50 border border-red-200 rounded-xl p-5"
            >
              <p className="text-3xl font-bold text-red-700 mb-1">
                {l.growth_pct.toFixed(0)}%
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-2 leading-tight">
                {l.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatDollars(l.fy2020)} &rarr; {formatDollars(l.fy2025)}
              </p>
              <p className="text-xs text-red-600 font-medium mt-1">
                {formatDollars(l.growth_dollars)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          Health insurance contracts tripled from $15.8B to $47.6B — the single
          largest growth category in federal contracting. That&apos;s $32 billion
          more per year flowing to insurance carriers. Meanwhile, the government
          is spending $6.7 billion less on aircraft and $3.5 billion less on
          medical supplies. COVID didn&apos;t just change what the government
          buys — it permanently rewired the federal procurement machine.
        </p>
      </div>

      {/* Grouped Bar Chart: Top 15 by absolute growth_dollars */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          FY2020 vs FY2025: Top 15 Industries by Change
        </h2>
        <p className="text-gray-600 mb-6">
          The 15 industries with the largest absolute dollar change — whether up
          or down. Green bars indicate growth; red bars indicate decline.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 10, right: 30, top: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                horizontal={false}
              />
              <XAxis
                type="number"
                tickFormatter={(v) => formatDollars(v)}
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={200}
                fontSize={10}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, name: any) => [
                  formatDollars(Number(value) || 0),
                  name,
                ]}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                labelFormatter={(label: any, payload: any) => {
                  const item = payload?.[0]?.payload;
                  return item?.fullName || label;
                }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                  maxWidth: "350px",
                }}
              />
              <Legend />
              <Bar
                dataKey="FY2020"
                fill="#94a3b8"
                name="FY2020"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="FY2025"
                name="FY2025"
                radius={[0, 4, 4, 0]}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fill="#10b981"
                // Per-bar coloring handled via Cell would lose Legend; use single color instead
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Top 15 industries by absolute dollar change, FY2020–FY2025. Gray =
            FY2020, colored = FY2025.
          </p>
        </div>
      </section>

      {/* Sortable Table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          All 42 Industries: Full Breakdown
        </h2>
        <p className="text-gray-600 mb-6">
          Click any column header to sort. Dollar figures are federal contract
          obligations.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th
                  className="text-left p-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                  onClick={() => handleSort("name")}
                >
                  Industry
                  <SortArrow column="name" />
                </th>
                <th
                  className="text-right p-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none whitespace-nowrap"
                  onClick={() => handleSort("fy2020")}
                >
                  FY2020
                  <SortArrow column="fy2020" />
                </th>
                <th
                  className="text-right p-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none whitespace-nowrap"
                  onClick={() => handleSort("fy2025")}
                >
                  FY2025
                  <SortArrow column="fy2025" />
                </th>
                <th
                  className="text-right p-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none whitespace-nowrap"
                  onClick={() => handleSort("growth_pct")}
                >
                  Growth %
                  <SortArrow column="growth_pct" />
                </th>
                <th
                  className="text-right p-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none whitespace-nowrap"
                  onClick={() => handleSort("growth_dollars")}
                >
                  Growth $
                  <SortArrow column="growth_dollars" />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((industry, i) => (
                <tr
                  key={industry.name}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="p-3 text-gray-900 font-medium max-w-xs">
                    {industry.name}
                  </td>
                  <td className="p-3 text-right text-gray-700 whitespace-nowrap">
                    {formatDollars(industry.fy2020)}
                  </td>
                  <td className="p-3 text-right text-gray-700 whitespace-nowrap">
                    {formatDollars(industry.fy2025)}
                  </td>
                  <td
                    className={`p-3 text-right font-semibold whitespace-nowrap ${
                      industry.growth_pct >= 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {industry.growth_pct >= 0 ? "+" : ""}
                    {industry.growth_pct.toFixed(1)}%
                  </td>
                  <td
                    className={`p-3 text-right font-semibold whitespace-nowrap ${
                      industry.growth_dollars >= 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {industry.growth_dollars >= 0 ? "+" : ""}
                    {formatDollars(industry.growth_dollars)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Related Analysis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/industries"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">&#x1F3ED;</p>
            <p className="font-bold text-gray-900">
              Top Industries by Spending
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Which NAICS industries receive the most federal contract dollars
            </p>
          </Link>
          <Link
            href="/spending-explosion"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">&#x1F4C8;</p>
            <p className="font-bold text-gray-900">The Spending Explosion</p>
            <p className="text-sm text-gray-600 mt-1">
              Federal spending grew 63% since 2017 — and never came back down
            </p>
          </Link>
          <Link
            href="/covid"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">&#x1F9EA;</p>
            <p className="font-bold text-gray-900">COVID Spending Deep Dive</p>
            <p className="text-sm text-gray-600 mt-1">
              How pandemic emergency spending became permanent
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
