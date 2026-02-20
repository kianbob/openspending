"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";

interface PerAmericanYear {
  fy: number;
  total: number;
  per_person: number;
  per_household: number;
  per_taxpayer: number;
}

interface SpendingYear {
  fy: number;
  total: number;
  agencies: { name: string; amount: number }[];
}

const TAXPAYERS = 161_000_000;

const CATEGORY_COLORS = [
  "#4f46e5", // Social Security - indigo
  "#0891b2", // Medicare - cyan
  "#dc2626", // Interest - red
  "#059669", // Medicaid - emerald
  "#7c3aed", // Defense - violet
  "#d97706", // VA - amber
  "#6366f1", // Other - indigo lighter
];

// Short names for the donut labels
const AGENCY_MAP: { match: string; label: string }[] = [
  { match: "Social Security", label: "Social Security" },
  { match: "Health and Human Services", label: "Medicare & Medicaid" },
  { match: "Defense", label: "Defense" },
  { match: "Veterans Affairs", label: "Veterans Affairs" },
  { match: "Agriculture", label: "Agriculture" },
  { match: "Transportation", label: "Transportation" },
  { match: "Education", label: "Education" },
];

function buildBreakdown(agencies: { name: string; amount: number }[]) {
  // Map FY2025 agency spending to per-taxpayer amounts
  // We'll separate HHS into Medicare (~60%) and Medicaid (~33%) estimates
  const ssa = agencies.find((a) => a.name.includes("Social Security"));
  const hhs = agencies.find((a) => a.name.includes("Health and Human Services"));
  const dod = agencies.find((a) => a.name.includes("Defense"));
  const va = agencies.find((a) => a.name.includes("Veterans Affairs"));

  const ssaPerTaxpayer = ssa ? Math.round(ssa.amount / TAXPAYERS) : 0;
  // HHS is ~$2T: roughly 50% Medicare, 33% Medicaid, 17% other HHS
  const hhsTotal = hhs ? hhs.amount : 0;
  const medicarePerTaxpayer = Math.round((hhsTotal * 0.5) / TAXPAYERS);
  const medicaidPerTaxpayer = Math.round((hhsTotal * 0.33) / TAXPAYERS);
  const defensePerTaxpayer = dod ? Math.round(dod.amount / TAXPAYERS) : 0;
  const vaPerTaxpayer = va ? Math.round(va.amount / TAXPAYERS) : 0;

  // Interest: ~$879B in FY2025 (13% of $6.75T)
  const interestPerTaxpayer = Math.round(879_000_000_000 / TAXPAYERS);

  const allocated =
    ssaPerTaxpayer +
    medicarePerTaxpayer +
    medicaidPerTaxpayer +
    defensePerTaxpayer +
    vaPerTaxpayer +
    interestPerTaxpayer;

  const otherPerTaxpayer = 33135 - allocated;

  return [
    { name: "Social Security", value: ssaPerTaxpayer },
    { name: "Medicare", value: medicarePerTaxpayer },
    { name: "Interest on Debt", value: interestPerTaxpayer },
    { name: "Medicaid", value: medicaidPerTaxpayer },
    { name: "Defense", value: defensePerTaxpayer },
    { name: "Veterans Affairs", value: vaPerTaxpayer },
    { name: "Everything Else", value: Math.max(otherPerTaxpayer, 0) },
  ];
}

export default function YourTaxBillPage() {
  const [perAmericanData, setPerAmericanData] = useState<
    PerAmericanYear[] | null
  >(null);
  const [breakdown, setBreakdown] = useState<
    { name: string; value: number }[] | null
  >(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/spending-per-american.json").then((r) => r.json()),
      fetch("/data/spending-growth.json").then((r) => r.json()),
    ]).then(([perAmerican, spendingGrowth]) => {
      setPerAmericanData(perAmerican);
      const fy2025 = spendingGrowth.find(
        (y: SpendingYear) => y.fy === 2025
      );
      if (fy2025) {
        setBreakdown(buildBreakdown(fy2025.agencies));
      }
    });
  }, []);

  if (!perAmericanData || !breakdown) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const fy2017 = perAmericanData.find((y) => y.fy === 2017);
  const fy2025 = perAmericanData.find((y) => y.fy === 2025);
  const growthPct = fy2017 && fy2025
    ? Math.round(
        ((fy2025.per_taxpayer - fy2017.per_taxpayer) / fy2017.per_taxpayer) *
          100
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Editorial" },
          { label: "Your Tax Bill" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Your Tax Bill: Where Every Dollar Goes
        </h1>
        <ShareButtons
          title="Your Tax Bill: $33,135 Per Taxpayer in FY2025 — OpenSpending"
          url="https://openspending.us/your-tax-bill"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        The federal government spent $5.3 trillion in FY2025. Here&apos;s what
        that means for you personally.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Per Taxpayer</p>
          <p className="text-3xl font-bold text-indigo-600">$33,135</p>
          <p className="text-sm text-gray-500 mt-1">
            Based on ~161M federal tax filers
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Per Person</p>
          <p className="text-3xl font-bold text-gray-900">$15,925</p>
          <p className="text-sm text-gray-500 mt-1">
            Every man, woman, and child
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Per Household</p>
          <p className="text-3xl font-bold text-gray-900">$40,723</p>
          <p className="text-sm text-gray-500 mt-1">
            ~131M US households
          </p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          This is not what you pay in taxes — it&apos;s what the government
          spends on your behalf. The difference is covered by borrowing. In
          FY2025, the deficit was roughly $1.8 trillion — about $11,180 per
          taxpayer added to the national debt.
        </p>
      </div>

      {/* Historical Cost Per Taxpayer */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Your Share Has Grown {growthPct}% in 8 Years
        </h2>
        <p className="text-gray-600 mb-6">
          In FY2017, federal spending per taxpayer was $20,235. By FY2025, it
          reached $33,135. That&apos;s an increase of $12,900 per taxpayer —
          driven by COVID stimulus, rising entitlement costs, and ballooning
          interest payments.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={perAmericanData}
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
                formatter={(value: any, name: any) => {
                  const labels: Record<string, string> = {
                    per_taxpayer: "Per Taxpayer",
                    per_person: "Per Person",
                    per_household: "Per Household",
                  };
                  return [
                    `$${Number(value).toLocaleString()}`,
                    labels[String(name)] || name,
                  ];
                }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Line
                type="monotone"
                dataKey="per_taxpayer"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 5, fill: "#4f46e5" }}
                name="per_taxpayer"
              />
              <Line
                type="monotone"
                dataKey="per_person"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 4, fill: "#059669" }}
                name="per_person"
              />
              <Line
                type="monotone"
                dataKey="per_household"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4, fill: "#f59e0b" }}
                name="per_household"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
              <span className="text-gray-600">Per Taxpayer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
              <span className="text-gray-600">Per Person</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="text-gray-600">Per Household</span>
            </div>
          </div>
        </div>
      </section>

      {/* Breakdown Donut */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Where Your $33,135 Goes
        </h2>
        <p className="text-gray-600 mb-6">
          If you split the entire federal budget evenly across all 161 million
          taxpayers, here&apos;s roughly where your share goes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {breakdown.map((_, index) => (
                    <Cell key={index} fill={CATEGORY_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, name: any) => [
                    `$${Number(value).toLocaleString()}`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {breakdown.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full inline-block flex-shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[i] }}
                  />
                  <span className="text-gray-900 font-medium">
                    {item.name}
                  </span>
                </div>
                <span className="text-gray-900 font-bold">
                  ${item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FY2017 vs FY2025 */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          FY2017 vs. FY2025: Your Share Grew {growthPct}%
        </h2>
        <p className="text-gray-600 mb-6">
          In just eight years, the cost per taxpayer increased by nearly
          $13,000. That&apos;s not all inflation — real spending grew
          significantly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-2">FY2017</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Per Taxpayer</span>
                <span className="font-bold text-gray-900">
                  ${fy2017?.per_taxpayer.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Per Person</span>
                <span className="font-bold text-gray-900">
                  ${fy2017?.per_person.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Per Household</span>
                <span className="font-bold text-gray-900">
                  ${fy2017?.per_household.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2">
                <span className="text-gray-600">Total Spending</span>
                <span className="font-bold text-gray-900">
                  {fy2017 ? formatDollars(fy2017.total) : "—"}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6">
            <p className="text-sm text-indigo-600 mb-2">FY2025</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-indigo-800">Per Taxpayer</span>
                <span className="font-bold text-indigo-900">
                  ${fy2025?.per_taxpayer.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-800">Per Person</span>
                <span className="font-bold text-indigo-900">
                  ${fy2025?.per_person.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-800">Per Household</span>
                <span className="font-bold text-indigo-900">
                  ${fy2025?.per_household.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t border-indigo-100 pt-2">
                <span className="text-indigo-800">Total Spending</span>
                <span className="font-bold text-indigo-900">
                  {fy2025 ? formatDollars(fy2025.total) : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mt-4">
          <p className="text-amber-900">
            In 2017, the government spent $3.3 trillion. By 2025, it spent $5.3
            trillion — a 64% increase. Population grew about 5%. Inflation
            accounts for some, but not all, of the growth. Your share of
            government spending is growing faster than your income.
          </p>
        </div>
      </section>

      {/* Note about Tax Calculator */}
      <section className="mb-14">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-2">
            This Is Not Your Actual Tax Bill
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            These numbers divide total federal spending evenly across all
            taxpayers. Your actual tax burden depends on your income, filing
            status, deductions, and credits. The government also borrows
            heavily — so spending exceeds tax revenue by about $1.8 trillion
            per year.
          </p>
          <p className="text-gray-600 text-sm">
            Want to see where your actual taxes go based on your income? Try
            our{" "}
            <Link
              href="/tax-calculator"
              className="text-indigo-600 hover:text-indigo-800 underline font-medium"
            >
              Tax Calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Related Analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/interest" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">💣</p>
            <p className="font-bold text-gray-900">The Interest Time Bomb</p>
            <p className="text-sm text-gray-600 mt-1">$952B in interest — larger than the defense budget</p>
          </Link>
          <Link href="/spending-explosion" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">📈</p>
            <p className="font-bold text-gray-900">The Spending Explosion</p>
            <p className="text-sm text-gray-600 mt-1">Federal spending grew 63% since 2017</p>
          </Link>
          <Link href="/tax-calculator" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">🧮</p>
            <p className="font-bold text-gray-900">Tax Calculator</p>
            <p className="text-sm text-gray-600 mt-1">See where your actual taxes go based on your income</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
