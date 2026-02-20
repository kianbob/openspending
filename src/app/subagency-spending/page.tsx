"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";

interface SubAgency {
  name: string;
  amount: number;
  id: number;
}

type SortKey = "rank" | "name" | "amount";
type SortDir = "asc" | "desc";

export default function SubAgencySpendingPage() {
  const [data, setData] = useState<SubAgency[] | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  useEffect(() => {
    fetch("/data/subagencies.json")
      .then((r) => r.json())
      .then((d: SubAgency[]) => setData(d));
  }, []);

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const top5 = data.slice(0, 5);
  const top20 = data.slice(0, 20);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const sorted = [...data].sort((a, b) => {
    const rankA = data.indexOf(a);
    const rankB = data.indexOf(b);
    let cmp = 0;
    if (sortKey === "rank") cmp = rankA - rankB;
    else if (sortKey === "name") cmp = a.name.localeCompare(b.name);
    else cmp = a.amount - b.amount;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const sortArrow = (key: SortKey) => {
    if (sortKey !== key) return " ↕";
    return sortDir === "asc" ? " ↑" : " ↓";
  };

  const highlightColors = [
    "text-red-600",
    "text-indigo-700",
    "text-amber-600",
    "text-emerald-600",
    "text-blue-600",
  ];

  const highlightLabels = [
    "Medicare & Medicaid",
    "Social Security",
    "VA Benefits",
    "Department of the Navy",
    "Food & Nutrition",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Analysis" },
          { label: "Sub-Agency Spending" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Sub-Agency Spending: Who REALLY Spends the Money
        </h1>
        <ShareButtons
          title="Sub-Agency Spending: Who REALLY Spends the Money — OpenSpending"
          url="https://openspending.us/subagency-spending"
        />
      </div>
      <p className="text-gray-500 text-lg mb-10">
        Most people think the Pentagon is the biggest spender. It&apos;s
        actually CMS — and most Americans have never heard of it.
      </p>

      {/* Top 5 Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {top5.map((agency, i) => (
          <div key={agency.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              #{i + 1} {highlightLabels[i]}
            </p>
            <p className={`text-2xl font-bold mt-1 ${highlightColors[i]}`}>
              {formatDollars(agency.amount)}
            </p>
            <p className="text-xs text-gray-400 mt-1 truncate">{agency.name}</p>
          </div>
        ))}
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          The Centers for Medicare &amp; Medicaid Services alone spent $1.88
          trillion — more than the entire Department of Defense. When people
          debate &quot;cutting government spending,&quot; they&apos;re usually
          talking about the 15% that&apos;s discretionary. The real money is in
          sub-agencies most taxpayers have never heard of.
        </p>
      </div>

      {/* Bar Chart — Top 20 Sub-Agencies */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 20 Sub-Agencies by Spending
        </h2>
        <p className="text-gray-600 mb-6">
          CMS and Social Security together account for more than half of all
          federal spending. The next 18 combined barely match them.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={Math.max(top20.length * 40, 500)}>
            <BarChart
              data={top20.map((d) => ({
                name: d.name.length > 40 ? d.name.slice(0, 37) + "..." : d.name,
                amount: d.amount,
                fullName: d.name,
              }))}
              layout="vertical"
              margin={{ left: 20, right: 30, top: 5, bottom: 5 }}
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
                width={260}
                fontSize={11}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, _name: any, props: any) => [
                  formatDollars(Number(value) || 0),
                  props.payload.fullName,
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="amount" fill="#4f46e5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Top 20 federal sub-agencies by total spending, FY2025.
          </p>
        </div>
      </section>

      {/* Sortable Table — All 100 Sub-Agencies */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          All 100 Sub-Agencies
        </h2>
        <p className="text-gray-600 mb-6">
          Click any column header to sort. These are the actual spending
          units inside federal departments — where the money is really
          allocated.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th
                  className="text-left py-3 px-4 text-gray-500 font-medium cursor-pointer hover:text-gray-900 select-none whitespace-nowrap"
                  onClick={() => handleSort("rank")}
                >
                  Rank{sortArrow("rank")}
                </th>
                <th
                  className="text-left py-3 px-4 text-gray-500 font-medium cursor-pointer hover:text-gray-900 select-none"
                  onClick={() => handleSort("name")}
                >
                  Sub-Agency{sortArrow("name")}
                </th>
                <th
                  className="text-right py-3 px-4 text-gray-500 font-medium cursor-pointer hover:text-gray-900 select-none whitespace-nowrap"
                  onClick={() => handleSort("amount")}
                >
                  Amount{sortArrow("amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((agency, i) => {
                const originalRank = data.indexOf(agency) + 1;
                return (
                  <tr
                    key={agency.id}
                    className={`border-b border-gray-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="py-2.5 px-4 text-gray-500">
                      {originalRank}
                    </td>
                    <td className="py-2.5 px-4 text-gray-900">
                      {agency.name}
                    </td>
                    <td className="py-2.5 px-4 text-right font-medium text-gray-900">
                      {formatDollars(agency.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Insight */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Takeaway</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            The federal government isn&apos;t one monolithic entity — it&apos;s
            hundreds of sub-agencies, many with budgets larger than Fortune 500
            companies. CMS alone moves more money than Apple, Amazon, and Google
            combined earn in revenue.
          </p>
          <p className="text-gray-600">
            When politicians talk about &quot;cutting waste,&quot; they&apos;re
            usually targeting the small agencies at the bottom of this list.
            The big money — Medicare, Social Security, Defense — stays
            untouchable.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <p className="text-indigo-900 text-lg font-medium italic">
            &quot;You can&apos;t fix a $6 trillion budget by cutting agencies
            that spend $600 million. The math only works at the top of the
            list.&quot;
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Related Analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/agencies"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="font-bold text-gray-900">Agency Budgets</p>
            <p className="text-sm text-gray-600 mt-1">
              All 97 agencies ranked by budget authority
            </p>
          </Link>
          <Link
            href="/spending-analysis"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="font-bold text-gray-900">Spending Analysis</p>
            <p className="text-sm text-gray-600 mt-1">
              Deep-dive into federal spending patterns
            </p>
          </Link>
          <Link
            href="/healthcare-spending"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="font-bold text-gray-900">Healthcare Spending</p>
            <p className="text-sm text-gray-600 mt-1">
              CMS, NIH, and the $2 trillion healthcare machine
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
