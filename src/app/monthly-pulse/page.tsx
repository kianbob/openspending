"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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

interface MonthlyData {
  aggregated_amount: number;
  time_period: {
    fiscal_year: string;
    month: string;
  };
  Contract_Obligations: number;
  Direct_Obligations: number;
  Grant_Obligations: number;
  Loan_Obligations: number;
  Idv_Obligations: number;
  Other_Obligations: number;
}

function getMonthLabel(month: string, fy: string): string {
  const monthNames = [
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
  const monthIndex = parseInt(month) - 1;
  return `${monthNames[monthIndex]} ${fy.slice(2)}`;
}

export default function MonthlyPulsePage() {
  const [data, setData] = useState<MonthlyData[] | null>(null);

  useEffect(() => {
    fetch("/data/monthly-spending.json")
      .then((r) => r.json())
      .then((data: MonthlyData[]) => setData(data));
  }, []);

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

  // Calculate metrics
  const totalSpending = data.reduce((s, d) => s + d.aggregated_amount, 0);
  const avgMonthly = totalSpending / data.length;
  const perSecond = totalSpending / (data.length * 30 * 24 * 60 * 60);

  // Highest and lowest months
  const sorted = [...data].sort(
    (a, b) => b.aggregated_amount - a.aggregated_amount
  );
  const highestMonth = sorted[0];
  const lowestMonth = sorted[sorted.length - 1];

  // FY2024 vs FY2025 comparison
  const fy2024Data = data.filter((d) => d.time_period.fiscal_year === "2024");
  const fy2025Data = data.filter((d) => d.time_period.fiscal_year === "2025");
  const fy2024Total = fy2024Data.reduce((s, d) => s + d.aggregated_amount, 0);
  const fy2025Total = fy2025Data.reduce((s, d) => s + d.aggregated_amount, 0);
  const fy2024Avg = fy2024Total / fy2024Data.length;
  const fy2025Avg = fy2025Total / fy2025Data.length;
  const yoyChange = ((fy2025Avg - fy2024Avg) / fy2024Avg) * 100;

  // Line chart data - total monthly spending
  const lineChartData = data.map((d) => ({
    month: getMonthLabel(d.time_period.month, d.time_period.fiscal_year),
    total: d.aggregated_amount,
    fy: d.time_period.fiscal_year,
  }));

  // Stacked area chart data - by type
  const stackedData = data.map((d) => ({
    month: getMonthLabel(d.time_period.month, d.time_period.fiscal_year),
    Contracts: d.Contract_Obligations,
    "Direct Payments": d.Direct_Obligations,
    Grants: d.Grant_Obligations,
    "Loans+IDV+Other":
      d.Loan_Obligations + d.Idv_Obligations + d.Other_Obligations,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[{ label: "Analysis" }, { label: "Monthly Spending Pulse" }]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Monthly Spending Pulse
        </h1>
        <ShareButtons
          title="Monthly Spending Pulse: $167K Per Second — OpenSpending"
          url="https://openspending.us/monthly-pulse"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        The federal government spends {formatDollars(perSecond)} every second.
        Track the monthly pulse of federal obligations from October 2023 to
        December 2025 — contracts, grants, and direct payments.
      </p>

      {/* Hero Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Total (24 Months)</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatDollars(totalSpending)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Oct 2023 - Dec 2025
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Average Per Month</p>
          <p className="text-2xl font-bold text-indigo-600">
            {formatDollars(avgMonthly)}
          </p>
          <p className="text-sm text-gray-500 mt-1">{formatDollars(perSecond)}/second</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Highest Month</p>
          <p className="text-2xl font-bold text-red-600">
            {formatDollars(highestMonth.aggregated_amount)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {getMonthLabel(
              highestMonth.time_period.month,
              highestMonth.time_period.fiscal_year
            )}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Lowest Month</p>
          <p className="text-2xl font-bold text-emerald-600">
            {formatDollars(lowestMonth.aggregated_amount)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {getMonthLabel(
              lowestMonth.time_period.month,
              lowestMonth.time_period.fiscal_year
            )}
          </p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          The government spends <strong>{formatDollars(perSecond)}</strong>{" "}
          every second. That&apos;s more than most Americans earn in a year —
          spent <em>every single second</em> of every day. April and October
          spike with grant cycles. December surges with year-end contracting.
          But it never stops.
        </p>
      </div>

      {/* Total Monthly Spending Line Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Total Monthly Obligations
        </h2>
        <p className="text-gray-600 mb-6">
          Federal spending fluctuates month to month — April and October see
          grant spikes, December sees contracting surges. The highest month
          ({getMonthLabel(highestMonth.time_period.month, highestMonth.time_period.fiscal_year)}) hit{" "}
          {formatDollars(highestMonth.aggregated_amount)}.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={lineChartData}
              margin={{ left: 20, right: 20, top: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                fontSize={11}
                tick={{ fill: "#6b7280" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tickFormatter={(v) => formatDollars(v)}
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [
                  formatDollars(Number(value) || 0),
                  "Total",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            24 months of federal obligations. Spikes in April and October
            (grants), December (year-end contracting).
          </p>
        </div>
      </section>

      {/* Stacked Area Chart by Type */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Spending by Type: Contracts, Direct Payments, Grants
        </h2>
        <p className="text-gray-600 mb-6">
          Direct payments (Social Security, Medicare, VA benefits) run like
          clockwork. Grants spike in April and October. Contracts surge in
          December as agencies rush to obligate funds before year-end.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={450}>
            <AreaChart
              data={stackedData}
              margin={{ left: 20, right: 20, top: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                fontSize={11}
                tick={{ fill: "#6b7280" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tickFormatter={(v) => formatDollars(v)}
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => formatDollars(Number(value) || 0)}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="Contracts"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="Direct Payments"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="Grants"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="Loans+IDV+Other"
                stackId="1"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Direct payments (red) are the biggest chunk — Social Security,
            Medicare, VA benefits. Grants (green) spike in April/October.
          </p>
        </div>
      </section>

      {/* FY2024 vs FY2025 Comparison */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          FY2024 vs FY2025: Year-Over-Year Change
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">FY2024 Avg/Month</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatDollars(fy2024Avg)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Total: {formatDollars(fy2024Total)} ({fy2024Data.length} months)
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">FY2025 Avg/Month</p>
            <p className="text-3xl font-bold text-indigo-600">
              {formatDollars(fy2025Avg)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Total: {formatDollars(fy2025Total)} ({fy2025Data.length} months)
            </p>
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mt-6">
          <p className="text-indigo-900">
            <strong>Year-over-year change:</strong> Monthly spending increased{" "}
            <span
              className={yoyChange >= 0 ? "text-red-600" : "text-emerald-600"}
            >
              {yoyChange >= 0 ? "+" : ""}
              {yoyChange.toFixed(1)}%
            </span>{" "}
            from FY2024 to FY2025. That&apos;s an extra{" "}
            {formatDollars(fy2025Avg - fy2024Avg)} per month, every month.
          </p>
        </div>
      </section>

      {/* Bottom Line */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Bottom Line
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            The federal government doesn&apos;t stop spending. October through
            September, rain or shine, boom or bust — the money flows.{" "}
            {formatDollars(perSecond)} every second.
          </p>
          <p className="text-gray-600 mb-3">
            Direct payments (Social Security, Medicare, VA benefits) run on
            autopilot. Grants spike in April and October when agencies push
            money out to states and universities. Contracts surge in December
            as bureaucrats race to obligate funds before the fiscal year ends.
          </p>
          <p className="text-gray-600">
            This is your money. It&apos;s being spent right now — while
            you&apos;re reading this sentence, another ${((perSecond * 5) / 1000).toFixed(0)}K just
            went out the door.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="text-amber-900 text-lg font-medium italic">
            &quot;A billion here, a billion there, and pretty soon
            you&apos;re talking real money.&quot; — Sen. Everett Dirksen
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
            href="/trends"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">📊</p>
            <p className="font-bold text-gray-900">Spending Trends</p>
            <p className="text-sm text-gray-600 mt-1">
              18 agencies tracked yearly from FY2017 to FY2026
            </p>
          </Link>
          <Link
            href="/program-growth"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">💥</p>
            <p className="font-bold text-gray-900">
              The Entitlement Explosion
            </p>
            <p className="text-sm text-gray-600 mt-1">
              23 programs tracked — 13 grew over 100%
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
