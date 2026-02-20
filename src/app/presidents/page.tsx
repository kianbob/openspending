"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import data from "@/../public/data/president-spending.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";

const presidentColors: Record<string, string> = {
  Obama: "#3b82f6",
  Trump: "#ef4444",
  Biden: "#6366f1",
  "Trump 2nd": "#f97316",
};

function fmtT(n: number): string {
  return `$${(n / 1e12).toFixed(2)}T`;
}

function fmtAxis(n: number): string {
  return `$${(n / 1e12).toFixed(1)}T`;
}

const chartData = data.yearly.map((y) => ({
  fy: y.fy,
  total: y.total,
  president: y.president,
  note: (y as { note?: string }).note,
}));

const timeline = [
  { year: 2009, event: "ARRA Stimulus ($831B)" },
  { year: 2017, event: "Tax Cuts & Jobs Act" },
  { year: 2020, event: "COVID Relief ($4T+)" },
  { year: 2022, event: "Inflation Reduction Act" },
];

export default function PresidentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Investigations" }, { label: "Presidential Spending" }]} />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Spending by President: Obama vs Trump vs Biden
        </h1>
        <ShareButtons
          title="Spending by President — OpenSpending"
          url="https://www.openspending.us/presidents"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        Neither party is fiscally conservative. The data proves it.
      </p>

      {/* Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-10">
        <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
          Federal Spending FY2009–2025
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="fy" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={fmtAxis} tick={{ fontSize: 12 }} />
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [fmtT(Number(value)), "Spending"]}
              labelFormatter={(label) => {
                const item = chartData.find((d) => d.fy === label);
                return `FY${label} (${item?.president})${item?.note ? ` — ${item.note}` : ""}`;
              }}
            />
            <Legend />
            {/* Render separate lines per president for color coding */}
            {["Obama", "Trump", "Biden", "Trump 2nd"].map((pres) => (
              <Line
                key={pres}
                data={chartData.filter((d) => d.president === pres)}
                dataKey="total"
                name={pres}
                stroke={presidentColors[pres]}
                strokeWidth={3}
                dot={{ r: 4 }}
                connectNulls={false}
              />
            ))}
            <ReferenceLine x={2020} stroke="#94a3b8" strokeDasharray="5 5" label={{ value: "COVID", position: "top", fontSize: 11 }} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2">
          Source: USASpending.gov API (FY2017+), Congressional Budget Office (pre-2017)
        </p>
      </div>

      {/* President Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {data.presidents.map((pres) => (
          <div
            key={pres.name}
            className="bg-white border border-gray-200 rounded-xl p-5"
            style={{ borderTopColor: presidentColors[pres.name.includes("Trump") ? "Trump" : pres.name.split(" ")[1] || pres.name], borderTopWidth: 4 }}
          >
            <h3 className="font-bold text-lg text-gray-900">{pres.name}</h3>
            <p className="text-sm text-gray-500 mb-3">
              {pres.party} · {pres.terms}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Spending</span>
                <span className="font-semibold">{fmtT(pres.totalSpending)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Annual</span>
                <span className="font-semibold">{fmtT(pres.avgSpending)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deficit Added</span>
                <span className="font-semibold text-red-600">{fmtT(pres.deficitAdded)}</span>
              </div>
            </div>
            {pres.note && (
              <p className="text-xs text-gray-400 mt-3 italic">{pres.note}</p>
            )}
          </div>
        ))}
      </div>

      {/* Key Insight */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-10">
        <p className="text-lg font-semibold text-amber-900 mb-2">Key Finding</p>
        <p className="text-amber-800">
          Federal spending doubled under Trump (from $4.1T to $6.8T) driven by COVID emergency
          spending — and it <em>never came back down</em> under Biden. Biden&apos;s average annual
          spending ($6.56T) is 82% higher than Obama&apos;s ($3.61T). Both parties spent freely.
          The ratchet only goes one direction.
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-10">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
          Major Spending Events
        </h2>
        <div className="relative border-l-2 border-gray-300 ml-4 space-y-6">
          {timeline.map((t) => (
            <div key={t.year} className="ml-6">
              <div className="absolute -left-[9px] w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
              <div className="text-sm font-bold text-gray-900">{t.year}</div>
              <div className="text-sm text-gray-600">{t.event}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FY Note */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10">
        <h3 className="font-semibold text-gray-900 mb-2">A Note on Fiscal Years</h3>
        <p className="text-sm text-gray-700">
          Federal fiscal years run October 1 through September 30. A president inaugurated in
          January inherits the current fiscal year&apos;s budget from the prior administration.
          Their first &quot;own&quot; budget typically begins the following October. FY2017 and
          FY2021 are transition years — marked accordingly in the chart.
        </p>
      </div>

      {/* Editorial */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
          The Bipartisan Spending Machine
        </h2>
        <p className="text-gray-700 mb-3">
          Republicans campaign on fiscal responsibility. Democrats campaign on smart investments.
          Both deliver the same result: more spending, more debt, higher deficits. Obama added
          $7.5 trillion to the national debt. Trump added $7.8 trillion in half the time. Biden is
          on pace for $6.2 trillion in one term.
        </p>
        <p className="text-gray-700 mb-3">
          The COVID era proved that emergency spending becomes permanent spending. The &quot;temporary&quot;
          surge of 2020 set a new baseline that neither party has any incentive to reduce. Federal
          spending as a share of GDP has permanently ratcheted upward.
        </p>
        <p className="text-gray-700">
          If you&apos;re waiting for &quot;your party&quot; to fix the deficit, the data says
          you&apos;ll be waiting forever. Government grows under everyone.
        </p>
      </div>

      {/* Cross Links */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Related</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/spending-explosion", label: "Spending Explosion", desc: "Which agencies grew fastest" },
            { href: "/national-debt", label: "National Debt", desc: "The $36 trillion tracker" },
            { href: "/interest", label: "Interest Time Bomb", desc: "$952B in debt interest" },
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
