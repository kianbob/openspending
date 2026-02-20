"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import data from "@/../public/data/earmarks.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

function fmtB(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
}

// Fill in ban years
const allYears: { year: number; total: number; count: number; banned: boolean; note?: string }[] = [];
for (let y = 2006; y <= 2024; y++) {
  const found = data.historical.find((h) => h.year === y);
  if (found) {
    allYears.push({ ...found, banned: found.total === 0 && y >= 2011 && y <= 2020 });
  } else if (y >= 2011 && y <= 2020) {
    allYears.push({ year: y, total: 0, count: 0, banned: true });
  }
}

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#ef4444", "#f97316", "#eab308", "#6b7280"];

export default function EarmarksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Investigations" }, { label: "Earmarks Tracker" }]} />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The Return of Earmarks: $14.6 Billion and Counting
        </h1>
        <ShareButtons
          title="The Return of Earmarks — OpenSpending"
          url="https://www.openspending.us/earmarks"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        Banned in 2011, back in 2021. Congressional pork is alive and well.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "FY2024 Total", value: fmtB(data.overview.total_fy2024) },
          { label: "Total Earmarks", value: data.overview.total_earmarks.toLocaleString() },
          { label: "Average Earmark", value: fmtB(data.overview.avg_earmark) },
          { label: "Ban Duration", value: "2011–2020" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Timeline Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-10">
        <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
          Earmarks by Year (2006–2024)
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={allYears} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v: number) => `$${(v / 1e9).toFixed(0)}B`} tick={{ fontSize: 12 }} />
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [fmtB(Number(value ?? 0)), "Total"]}
              labelFormatter={(label) => {
                const item = allYears.find((d) => d.year === label);
                if (item?.banned) return `${label} — Earmark Ban`;
                return `${label}`;
              }}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]}>
              {allYears.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.banned ? "#e5e7eb" : entry.year >= 2021 ? "#ef4444" : "#3b82f6"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-500 inline-block" /> Pre-ban
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-gray-300 inline-block" /> Ban period
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-500 inline-block" /> Post-ban
          </span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
            Where Earmarks Go (FY2024)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.topCategories}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }: { name?: string; percent?: number }) => `${(name ?? "").split(" ")[0]} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {data.topCategories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => fmtB(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
            Top Categories
          </h2>
          <div className="space-y-3">
            {data.topCategories.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{cat.name}</span>
                    <span className="font-semibold">{fmtB(cat.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${cat.pct}%`, backgroundColor: COLORS[i % COLORS.length] }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-10">
        <p className="text-lg font-semibold text-amber-900 mb-2">Key Finding</p>
        <p className="text-amber-800">
          8,000 earmarks in FY2024 — and they&apos;re growing. The earmark ban lasted exactly
          one decade (2011–2020). When they returned, they came back under new names:
          &quot;Community Project Funding&quot; in the House and &quot;Congressionally Directed
          Spending&quot; in the Senate. Different label, same pork.
        </p>
      </div>

      {/* Greatest Hits */}
      <div className="mb-10">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
          Greatest Hits: Earmark Hall of Shame
        </h2>
        <div className="space-y-3">
          {data.controversies.map((c, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3"
            >
              <span className="text-2xl">🐷</span>
              <p className="text-gray-700 text-sm">{c}</p>
            </div>
          ))}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
            <span className="text-2xl">🐷</span>
            <p className="text-gray-700 text-sm">
              Indoor rainforest (Iowa) — $50M for a climate-controlled tropical forest in a
              state with winters below zero
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
            <span className="text-2xl">🐷</span>
            <p className="text-gray-700 text-sm">
              Woodstock Museum (New York) — $1M to commemorate the 1969 music festival (requested
              by Hillary Clinton, blocked by John McCain)
            </p>
          </div>
        </div>
      </div>

      {/* Editorial */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
          Accountability or Corruption?
        </h2>
        <p className="text-gray-700 mb-3">
          Defenders of earmarks argue they provide transparency — at least you know who requested
          the spending. Without earmarks, the same money gets spent anyway through agency
          discretion, just with less visibility. There&apos;s some truth to that.
        </p>
        <p className="text-gray-700 mb-3">
          But critics have a point too: earmarks are how Congress buys votes. A bridge here, a
          museum there — it&apos;s horse-trading with taxpayer money. The system incentivizes
          lawmakers to bring home the bacon rather than cut the budget. Every earmark is a
          politician saying &quot;I spent your money in my district&quot; and calling it a win.
        </p>
        <p className="text-gray-700">
          The real question isn&apos;t whether earmarks are transparent — it&apos;s whether $14.6
          billion in congressionally directed pet projects is the best use of limited resources.
          When the national debt exceeds $36 trillion, the answer should be obvious.
        </p>
      </div>

      {/* Source */}
      <p className="text-xs text-gray-400 mb-8">
        Source: {data.source}
      </p>

      {/* Cross Links */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Related</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/waste", label: "Waste & Fraud", desc: "$233-521B lost annually" },
            { href: "/no-bid", label: "No-Bid Contracts", desc: "When competition dies" },
            { href: "/programs", label: "Federal Programs", desc: "200 assistance programs ranked" },
            { href: "/budget-functions", label: "Budget Functions", desc: "18 major spending categories" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="font-medium text-blue-600">{link.label}</div>
              <div className="text-xs text-gray-500 mt-1">{link.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
