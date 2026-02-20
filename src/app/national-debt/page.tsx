"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";

interface DebtYear {
  fy: number;
  interest: number;
  debt: number;
  per_taxpayer: number;
  per_citizen: number;
  debt_per_citizen: number;
  debt_per_taxpayer: number;
  interest_pct_of_revenue: number;
}

interface DebtData {
  historical: DebtYear[];
  projections: { fy: number; interest: number }[];
  context: {
    defense_budget_fy2025: number;
    medicare_fy2025: number;
    social_security_fy2025: number;
    interest_exceeds_defense: boolean;
    interest_growth_since_2017: number;
  };
}

function AnimatedDebtClock() {
  const [displayValue, setDisplayValue] = useState(36000000000000);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const START = 36000000000000;
  const END = 36200000000000;
  const DURATION = 2000;

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / DURATION, 1);
    // Ease out cubic for smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = START + (END - START) * eased;
    setDisplayValue(Math.round(current));
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  const formatted = `$${displayValue.toLocaleString()}`;

  return (
    <div className="bg-gray-900 rounded-2xl p-8 text-center mb-10">
      <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">
        US National Debt
      </p>
      <p
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          color: "#f59e0b",
          textShadow: "0 0 20px rgba(245, 158, 11, 0.3)",
        }}
      >
        {formatted}
      </p>
      <p className="text-gray-400 text-sm mt-3">
        Growing at ~$63,000 per second
      </p>
    </div>
  );
}

export default function NationalDebtPage() {
  const [data, setData] = useState<DebtData | null>(null);

  useEffect(() => {
    fetch("/data/interest-debt.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-40 bg-gray-200 rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const latest = data.historical[data.historical.length - 1];
  const earliest = data.historical[0];

  // Combine historical interest with projections for the interest chart
  const interestChartData = [
    ...data.historical.map((y) => ({
      fy: y.fy,
      interest: y.interest,
      type: "historical",
    })),
    ...data.projections.map((y) => ({
      fy: y.fy,
      interest: y.interest,
      type: "projected",
    })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Analysis" },
          { label: "The $36 Trillion Debt Clock" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The $36 Trillion Debt Clock
        </h1>
        <ShareButtons
          title="The $36 Trillion Debt Clock — OpenSpending"
          url="https://www.openspending.us/national-debt"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        The national debt has nearly doubled since 2017. Interest payments now
        exceed the defense budget. Here&apos;s how we got here — and why the
        math is getting dangerous.
      </p>

      {/* Animated Debt Clock */}
      <AnimatedDebtClock />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Per Citizen</p>
          <p className="text-2xl font-bold text-gray-900">
            ${latest.debt_per_citizen.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Every man, woman, and child
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Per Taxpayer</p>
          <p className="text-2xl font-bold text-red-600">
            ${latest.debt_per_taxpayer.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Your share of the bill
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Growth Rate</p>
          <p className="text-2xl font-bold text-amber-600">~$63,000/sec</p>
          <p className="text-sm text-gray-500 mt-1">$5.5 billion per day</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Interest (FY2025)</p>
          <p className="text-2xl font-bold text-red-600">
            {formatDollars(latest.interest)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Now exceeds defense budget
          </p>
        </div>
      </div>

      {/* Context Callout */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-14">
        <p className="text-gray-700 text-lg font-medium mb-2">
          It took 230 years to accumulate the first $10 trillion in debt.
        </p>
        <p className="text-gray-600">
          It took just 8 years to add the next $16 trillion. The debt went from
          ${(earliest.debt / 1e12).toFixed(1)}T in FY{earliest.fy} to $
          {(latest.debt / 1e12).toFixed(1)}T in FY{latest.fy} — a{" "}
          {(((latest.debt - earliest.debt) / earliest.debt) * 100).toFixed(0)}%
          increase.
        </p>
      </div>

      {/* Historical Debt Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Debt Trajectory: FY2017–FY2025
        </h2>
        <p className="text-gray-600 mb-6">
          The national debt nearly doubled in 8 years, driven by COVID stimulus,
          tax cuts, and persistent deficits. There&apos;s no sign of the curve
          bending.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={data.historical}
              margin={{ left: 10, right: 30, top: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="debtGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="fy"
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis
                tickFormatter={(v) => `$${(v / 1e12).toFixed(0)}T`}
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [
                  `$${(Number(value) / 1e12).toFixed(1)}T`,
                  "National Debt",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Area
                type="monotone"
                dataKey="debt"
                stroke="#dc2626"
                strokeWidth={3}
                fill="url(#debtGradient)"
                dot={{ r: 5, fill: "#dc2626" }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Total national debt FY2017–FY2025. COVID-era borrowing in 2020–2021
            accelerated the trajectory.
          </p>
        </div>
      </section>

      {/* Interest Payments Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Interest Payments: The Fastest-Growing &quot;Program&quot;
        </h2>
        <p className="text-gray-600 mb-6">
          Interest on the debt grew{" "}
          {data.context.interest_growth_since_2017.toFixed(0)}% since 2017 —
          from {formatDollars(earliest.interest)} to{" "}
          {formatDollars(latest.interest)}. By 2030, projections show interest
          exceeding {formatDollars(data.projections[data.projections.length - 1].interest)}{" "}
          per year.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={interestChartData}
              margin={{ left: 10, right: 30, top: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="fy"
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis
                tickFormatter={(v) => formatDollars(v)}
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, _name: any, props: any) => [
                  formatDollars(Number(value) || 0),
                  props.payload.type === "projected"
                    ? "Projected Interest"
                    : "Interest Payments",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="interest" radius={[4, 4, 0, 0]}>
                {interestChartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.type === "projected" ? "#fbbf24" : "#dc2626"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Annual interest payments on the national debt.{" "}
            <span className="text-red-500">Red</span> = historical,{" "}
            <span className="text-amber-500">amber</span> = projected.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="font-bold text-red-900 text-lg mb-2">
              Interest &gt; Defense
            </p>
            <p className="text-sm text-red-800">
              In FY2025, interest payments ({formatDollars(latest.interest)})
              exceed the entire defense budget (
              {formatDollars(data.context.defense_budget_fy2025)}). We now spend
              more servicing past debt than protecting the country.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="font-bold text-amber-900 text-lg mb-2">
              {latest.interest_pct_of_revenue}% of Revenue
            </p>
            <p className="text-sm text-amber-800">
              Interest now consumes {latest.interest_pct_of_revenue}% of all
              federal revenue — up from {earliest.interest_pct_of_revenue}% in
              FY{earliest.fy}. That&apos;s money that can&apos;t fund roads,
              schools, or defense.
            </p>
          </div>
        </div>
      </section>

      {/* Scale Comparison */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Putting $36 Trillion in Perspective
        </h2>
        <div className="space-y-3">
          {[
            {
              label: "Combined GDP of Japan, Germany, UK, France & India",
              value: "~$36T",
              description:
                "The US national debt roughly equals the combined economic output of 5 major economies",
            },
            {
              label: "Per taxpayer burden",
              value: `$${latest.debt_per_taxpayer.toLocaleString()}`,
              description:
                "Every federal income taxpayer's share of the debt",
            },
            {
              label: "Per citizen burden",
              value: `$${latest.debt_per_citizen.toLocaleString()}`,
              description:
                "Every American's share — including children and retirees",
            },
            {
              label: "Daily interest cost",
              value: "~$5.5B",
              description:
                "The federal government pays roughly $5.5 billion per day just in interest",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <div>
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <p className="text-xl font-bold text-red-600 whitespace-nowrap">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          Debt itself isn&apos;t always bad — governments borrow to invest, to
          fight wars, to respond to crises. But when interest payments exceed
          the defense budget, when they consume over 20% of revenue, and when
          there&apos;s no plan to bend the curve — the math stops working. Every
          dollar spent on interest is a dollar that can&apos;t build a road,
          fund a school, or strengthen the military.
        </p>
      </div>

      {/* Debt Per Citizen Over Time */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Your Share of the Debt: FY2017–FY2025
        </h2>
        <p className="text-gray-600 mb-6">
          The debt per citizen grew from ${earliest.debt_per_citizen.toLocaleString()}{" "}
          to ${latest.debt_per_citizen.toLocaleString()} — a{" "}
          {(
            ((latest.debt_per_citizen - earliest.debt_per_citizen) /
              earliest.debt_per_citizen) *
            100
          ).toFixed(0)}
          % increase in 8 years.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={data.historical}
              margin={{ left: 10, right: 30, top: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="fy"
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis
                tickFormatter={(v) =>
                  `$${(v / 1000).toFixed(0)}K`
                }
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [
                  `$${Number(value).toLocaleString()}`,
                  "Debt Per Citizen",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar
                dataKey="debt_per_citizen"
                radius={[4, 4, 0, 0]}
                fill="#4f46e5"
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            National debt per citizen FY2017–FY2025.
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/interest"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">Interest on the Debt</p>
            <p className="text-sm text-gray-600 mt-1">
              Deep dive into interest costs and projections
            </p>
          </Link>
          <Link
            href="/spending-explosion"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">The Spending Explosion</p>
            <p className="text-sm text-gray-600 mt-1">
              Federal spending grew 63% since 2017
            </p>
          </Link>
          <Link
            href="/your-tax-bill"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
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
