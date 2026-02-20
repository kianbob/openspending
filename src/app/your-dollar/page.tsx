"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { formatDollars, formatDollarsLong } from "@/lib/format";
import { ShareButtons } from "@/components/ShareButtons";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dollarData from "@/../public/data/dollar-breakdown.json";

const data = dollarData as {
  totalBudget: number;
  perTaxpayer: number;
  breakdown: {
    name: string;
    amount: number;
    cents: number;
    pct: string;
    perDollar: string;
    display: string;
  }[];
};

const COLORS = [
  "#4338ca", "#059669", "#dc2626", "#f59e0b", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
  "#14b8a6", "#e11d48", "#a855f7", "#eab308", "#0ea5e9",
  "#d946ef", "#22c55e", "#ef4444",
];

const EMOJIS: Record<string, string> = {
  "Medicare": "🏥",
  "Social Security": "👴",
  "National Defense": "🛡️",
  "Net Interest": "💳",
  "Health": "💊",
  "Income Security": "🛟",
  "General Government": "🏛️",
  "Veterans Benefits and Services": "🎖️",
  "Education, Training, Employment, and Social Services": "🎓",
  "Transportation": "🚛",
  "Natural Resources and Environment": "🌲",
  "Administration of Justice": "⚖️",
  "Community and Regional Development": "🏘️",
  "Commerce and Housing Credit": "🏠",
  "Agriculture": "🌾",
  "International Affairs": "🌍",
  "Energy": "⚡",
  "General Science, Space, and Technology": "🔬",
};

export default function YourDollarPage() {
  const [taxAmount, setTaxAmount] = useState<string>("");
  const taxNum = parseFloat(taxAmount.replace(/[^0-9.]/g, "")) || 0;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Your Dollar", href: "/your-dollar" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3 mt-4">
        Where Does $1 of Federal Spending Go?
      </h1>
      <p className="text-gray-500 text-lg mb-10 max-w-3xl">
        For every dollar the government spends, here&apos;s exactly where it goes.
      </p>

      {/* Visual Dollar Bill — Stacked Horizontal Bar */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Federal Dollar</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex rounded-lg overflow-hidden h-16 mb-4">
            {data.breakdown.map((item, i) => (
              <div
                key={item.name}
                className="relative group h-full"
                style={{
                  width: `${parseFloat(item.pct)}%`,
                  backgroundColor: COLORS[i % COLORS.length],
                  minWidth: parseFloat(item.pct) > 2 ? undefined : "2px",
                }}
                title={`${item.name}: ${item.display}`}
              >
                {parseFloat(item.pct) >= 5 && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                    {item.display}
                  </span>
                )}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
                  {item.name}: {item.display}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {data.breakdown.slice(0, 8).map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {item.name} ({item.display})
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donut Chart */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Spending Breakdown</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <ResponsiveContainer width="100%" height={420}>
            <PieChart>
              <Pie
                data={data.breakdown}
                dataKey="cents"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={160}
                paddingAngle={1}
                label={({ name, cents }) => cents >= 3 ? `${name.split(" ")[0]} ${cents}¢` : ""}
                labelLine={false}
              >
                {data.breakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}¢`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Card Grid */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Every Cent Accounted For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.breakdown.map((item, i) => (
            <div
              key={item.name}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{EMOJIS[item.name] || "📊"}</span>
                <span
                  className="text-2xl font-bold"
                  style={{ color: COLORS[i % COLORS.length] }}
                >
                  {item.display}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h3>
              <p className="text-xs text-gray-500">{formatDollarsLong(item.amount)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Insight */}
      <section className="mb-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-amber-900 mb-2">💡 Key Insight</h3>
          <p className="text-amber-800">
            18¢ of every dollar goes to Medicare. Net Interest (12¢) now costs more than
            Veterans Benefits (4¢) — and it&apos;s the fastest growing category.
          </p>
        </div>
      </section>

      {/* Personal Breakdown Calculator */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your Personal Breakdown</h2>
        <p className="text-gray-500 mb-4">
          If you paid $X in federal taxes last year, here&apos;s where it went:
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <label className="text-sm font-medium text-gray-700">I paid</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="text"
                value={taxAmount}
                onChange={(e) => setTaxAmount(e.target.value)}
                placeholder="10,000"
                className="pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 w-40"
              />
            </div>
            <span className="text-sm text-gray-500">in federal taxes</span>
          </div>
          {taxNum > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.breakdown.map((item, i) => {
                const yourShare = taxNum * parseFloat(item.perDollar);
                return (
                  <div key={item.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">{EMOJIS[item.name] || "📊"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 truncate">{item.name}</p>
                      <p className="text-sm font-bold text-gray-900">${yourShare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {taxNum === 0 && (
            <p className="text-sm text-gray-400 italic">Enter your tax amount above to see your personal breakdown.</p>
          )}
        </div>
      </section>

      {/* Cross-links */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Explore More</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/budget-functions", label: "Budget Functions" },
            { href: "/tax-calculator", label: "Tax Calculator" },
            { href: "/your-tax-bill", label: "Your Tax Bill" },
            { href: "/spending-explosion", label: "Spending Explosion" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </section>

      <ShareButtons
        url="https://openspending-app.vercel.app/your-dollar"
        title="Where Does $1 of Federal Spending Go?"
      />
    </div>
  );
}
