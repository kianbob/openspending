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

interface FederalAccount {
  name: string;
  amount: number;
}

type SortKey = "name" | "amount";
type SortDir = "asc" | "desc";

function shortName(name: string): string {
  // Extract the first part before commas for cleaner display
  const parts = name.split(",");
  if (parts.length >= 2) {
    return parts[0].trim();
  }
  return name;
}

export default function FederalAccountsPage() {
  const [accounts, setAccounts] = useState<FederalAccount[] | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("amount");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    fetch("/data/federal-accounts.json")
      .then((r) => r.json())
      .then((data: FederalAccount[]) => setAccounts(data));
  }, []);

  if (!accounts) {
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

  // Derived data
  const totalAmount = accounts.reduce((s, a) => s + a.amount, 0);
  const top4 = accounts.slice(0, 4);
  const top4Total = top4.reduce((s, a) => s + a.amount, 0);
  const top4Pct = ((top4Total / totalAmount) * 100).toFixed(1);

  // Top 20 for chart
  const chartData = accounts.slice(0, 20).map((a) => ({
    name: shortName(a.name),
    amount: a.amount,
    fullName: a.name,
  }));

  // Sortable table
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir(key === "amount" ? "desc" : "asc");
    }
  };

  const tableSorted = [...accounts].sort((a, b) => {
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

  const sortArrow = (key: SortKey) =>
    sortKey === key ? (sortDir === "desc" ? " ▼" : " ▲") : "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Analysis" },
          { label: "Where Your Money Actually Goes" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Where Your Money Actually Goes: Federal Accounts
        </h1>
        <ShareButtons
          title="Where Your Money Actually Goes: Federal Accounts — OpenSpending"
          url="https://www.openspending.us/federal-accounts"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        You think money flows to agencies. It doesn&apos;t. It flows to{" "}
        <em>accounts</em> — and 4 accounts control $3.1 trillion.
      </p>

      {/* Hero Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Total (50 Accounts)</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatDollars(totalAmount)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Tracked accounts</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Top 4 Accounts</p>
          <p className="text-2xl font-bold text-red-600">
            {formatDollars(top4Total)}
          </p>
          <p className="text-sm text-gray-500 mt-1">{top4Pct}% of total</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">#1 Account</p>
          <p className="text-2xl font-bold text-indigo-600">
            {formatDollars(accounts[0].amount)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Social Security Trust</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Medicare Accounts</p>
          <p className="text-2xl font-bold text-emerald-600">
            {formatDollars(accounts[1].amount + accounts[2].amount + accounts[3].amount + accounts[4].amount)}
          </p>
          <p className="text-sm text-gray-500 mt-1">4 separate trust funds</p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          When you hear &quot;Department of Health and Human Services spent
          $1.2 trillion,&quot; that&apos;s a lie. HHS doesn&apos;t spend
          anything. Money flows to <strong>federal accounts</strong> like the
          Medicare Trust Fund or Medicaid Grants to States. These accounts are
          autopilot ATMs — Congress doesn&apos;t vote on them each year.
          They just run. This is how $3.1 trillion vanishes into 4 accounts
          before anyone even asks a question.
        </p>
      </div>

      {/* Top 20 Accounts Bar Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 20 Federal Accounts
        </h2>
        <p className="text-gray-600 mb-6">
          Social Security and Medicare trust funds dominate. These aren&apos;t
          discretionary budgets — they&apos;re statutory obligations that grow
          on autopilot.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
          <ResponsiveContainer
            width="100%"
            height={Math.max(chartData.length * 44, 500)}
          >
            <BarChart
              data={chartData}
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
                width={180}
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
            The top 4 accounts — all Social Security and Medicare trust funds —
            total $3.1T, or {top4Pct}% of all tracked spending.
          </p>
        </div>
      </section>

      {/* The Big Four Callout */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Big Four: $3.1 Trillion in 4 Accounts
        </h2>
        <p className="text-gray-600 mb-6">
          These aren&apos;t line items buried in an appropriations bill.
          They&apos;re massive, self-executing trust funds that run on
          autopilot. No annual vote. No oversight hearings. Just automatic
          transfers based on demographic formulas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {top4.map((account, i) => (
            <div
              key={account.name}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <p className="text-sm text-gray-500 mb-1">#{i + 1}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {formatDollars(account.amount)}
              </p>
              <p className="text-sm text-gray-700 font-medium">
                {account.name}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mt-6">
          <p className="text-indigo-900">
            These 4 accounts represent{" "}
            <strong>{top4Pct}% of all tracked spending</strong>. DOGE can&apos;t
            touch them without changing the laws that created them — which means
            Congress, not bureaucrats, controls the purse strings.
          </p>
        </div>
      </section>

      {/* Sortable Table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          All 50 Federal Accounts — Sortable
        </h2>
        <p className="text-gray-600 mb-4">
          Click any column header to sort. This is where your tax dollars
          actually go — not to agencies, but to accounts.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th
                  className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("name")}
                >
                  Federal Account{sortArrow("name")}
                </th>
                <th
                  className="text-right py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("amount")}
                >
                  Amount{sortArrow("amount")}
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody>
              {tableSorted.map((a, i) => {
                const pct = ((a.amount / totalAmount) * 100).toFixed(2);
                return (
                  <tr
                    key={a.name}
                    className={`border-b border-gray-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    } hover:bg-indigo-50/50 transition-colors`}
                  >
                    <td className="py-3 px-4 text-gray-900 font-medium text-xs">
                      {a.name}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900 font-medium">
                      {formatDollars(a.amount)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Line */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Bottom Line
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            Federal spending doesn&apos;t flow through agencies the way most
            people imagine. It flows through <strong>federal accounts</strong>{" "}
            — trust funds, grant programs, and entitlement systems that operate
            on autopilot.
          </p>
          <p className="text-gray-600 mb-3">
            The top 4 accounts alone — Social Security Retirement, Medicaid
            Grants, Medicare Part B, and Medicare Part A — control $3.1
            trillion. That&apos;s {top4Pct}% of all tracked federal spending,
            and Congress doesn&apos;t vote on it annually. It just happens.
          </p>
          <p className="text-gray-600">
            When politicians promise to &quot;cut government waste,&quot;
            they&apos;re talking about the margins. The core of federal
            spending runs on demographic formulas that no efficiency commission
            can touch.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <p className="text-indigo-900 text-lg font-medium italic">
            &quot;Follow the money to the accounts, not the agencies. That&apos;s
            where the real power lies.&quot;
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Related Analysis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/spending-explosion"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">📈</p>
            <p className="font-bold text-gray-900">The Spending Explosion</p>
            <p className="text-sm text-gray-600 mt-1">
              Federal spending surged 63% since 2017
            </p>
          </Link>
          <Link
            href="/healthcare-spending"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">🏥</p>
            <p className="font-bold text-gray-900">Healthcare Spending</p>
            <p className="text-sm text-gray-600 mt-1">
              Medicare and Medicaid dominate the budget
            </p>
          </Link>
          <Link
            href="/your-tax-bill"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">💰</p>
            <p className="font-bold text-gray-900">Your Tax Bill</p>
            <p className="text-sm text-gray-600 mt-1">
              $33,135 per taxpayer — where every dollar goes
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
