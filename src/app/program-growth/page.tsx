"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  Legend,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";

interface Program {
  name: string;
  fy2019: number;
  fy2025: number;
  growth_pct: number;
  growth_dollars: number;
}

type SortKey = "name" | "fy2019" | "fy2025" | "growth_pct" | "growth_dollars";
type SortDir = "asc" | "desc";

const MANDATORY_KEYWORDS = [
  "social security",
  "medicare",
  "medicaid",
  "supplemental security income",
  "snap",
  "supplemental nutrition",
  "veterans compensation",
  "survivors insurance",
  "disability insurance",
  "railroad",
  "children's health insurance",
  "temporary assistance",
];

function isMandatory(name: string): boolean {
  const lower = name.toLowerCase();
  return MANDATORY_KEYWORDS.some((kw) => lower.includes(kw));
}

const PIE_COLORS = ["#ef4444", "#3b82f6"];

function shortName(name: string): string {
  const map: Record<string, string> = {
    "Social Security Retirement Insurance": "SS Retirement",
    "Social Security Disability Insurance": "SS Disability",
    "Social Security Survivors Insurance": "SS Survivors",
    "Medicare Supplementary Medical Insurance": "Medicare Part B",
    "Medicare Prescription Drug Coverage": "Medicare Part D",
    "Medicare Hospital Insurance": "Medicare Part A",
    "Grants to States for Medicaid": "Medicaid",
    "Supplemental Nutrition Assistance Program": "SNAP",
    "Veterans Compensation for Service-Connected Disability": "VA Disability",
    "Disaster Grants - Public Assistance (Presidentially Declared Disasters)":
      "FEMA Disaster Grants",
    "Section 8 Housing Choice Vouchers": "Section 8 Vouchers",
    "Project-Based Rental Assistance (PBRA)": "Project-Based Rental",
    "Federal Pell Grant Program": "Pell Grants",
    "National School Lunch Program": "School Lunch",
    "Highway Planning and Construction": "Highway Construction",
    "Supplemental Security Income": "SSI",
    "Title I Grants to Local Educational Agencies": "Title I Education",
    "Special Education Grants to States": "Special Education",
    "Social Insurance for Railroad Workers": "Railroad Insurance",
    "Post-9/11 Veterans Educational Assistance": "Post-9/11 GI Bill",
    "Temporary Assistance for Needy Families": "TANF",
    "Children's Health Insurance Program": "CHIP",
    "Head Start": "Head Start",
  };
  return map[name] || name;
}

export default function ProgramGrowthPage() {
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("growth_pct");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    fetch("/data/program-growth.json")
      .then((r) => r.json())
      .then((data: Program[]) => setPrograms(data));
  }, []);

  if (!programs) {
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
  const sorted = [...programs].sort(
    (a, b) => b.growth_pct - a.growth_pct
  );

  const totalFy2019 = programs.reduce((s, p) => s + p.fy2019, 0);
  const totalFy2025 = programs.reduce((s, p) => s + p.fy2025, 0);
  const totalGrowthDollars = totalFy2025 - totalFy2019;
  const totalGrowthPct = ((totalGrowthDollars / totalFy2019) * 100).toFixed(0);
  const programsOver100 = programs.filter((p) => p.growth_pct >= 100).length;

  // Chart data - growth % bar chart (sorted by growth_pct desc)
  const growthPctChart = sorted.map((p) => ({
    name: shortName(p.name),
    growth_pct: p.growth_pct,
    fy2019: p.fy2019,
    fy2025: p.fy2025,
  }));

  // Chart data - grouped bars FY2019 vs FY2025
  const comparisonChart = sorted.map((p) => ({
    name: shortName(p.name),
    FY2019: p.fy2019,
    FY2025: p.fy2025,
  }));

  // Dollar growth chart (sorted by growth_dollars desc)
  const dollarGrowthChart = [...programs]
    .sort((a, b) => b.growth_dollars - a.growth_dollars)
    .map((p) => ({
      name: shortName(p.name),
      growth_dollars: p.growth_dollars,
      fy2019: p.fy2019,
      fy2025: p.fy2025,
    }));

  // Mandatory vs discretionary pie
  const mandatoryTotal = programs
    .filter((p) => isMandatory(p.name))
    .reduce((s, p) => s + p.fy2025, 0);
  const discretionaryTotal = programs
    .filter((p) => !isMandatory(p.name))
    .reduce((s, p) => s + p.fy2025, 0);
  const pieData = [
    { name: "Mandatory", value: mandatoryTotal },
    { name: "Discretionary", value: discretionaryTotal },
  ];

  // Sortable table
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const tableSorted = [...programs].sort((a, b) => {
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
    sortKey === key ? (sortDir === "desc" ? " \u25BC" : " \u25B2") : "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Analysis" },
          { label: "The Entitlement Explosion" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The Entitlement Explosion
        </h1>
        <ShareButtons
          title="The Entitlement Explosion: Programs That Grew 100%+ — OpenSpending"
          url="https://openspending.us/program-growth"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        23 federal programs tracked from FY2019 to FY2025 — {programsOver100}{" "}
        grew over 100%. Total spending on these programs surged{" "}
        {totalGrowthPct}% (+{formatDollars(totalGrowthDollars)}).
      </p>

      {/* Hero Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">FY2019 Total</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatDollars(totalFy2019)}
          </p>
          <p className="text-sm text-gray-500 mt-1">23 programs tracked</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">FY2025 Total</p>
          <p className="text-2xl font-bold text-red-600">
            {formatDollars(totalFy2025)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Current level</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Dollar Growth</p>
          <p className="text-2xl font-bold text-amber-600">
            +{formatDollars(totalGrowthDollars)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Added in 6 years</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Programs 100%+</p>
          <p className="text-2xl font-bold text-emerald-600">
            {programsOver100}
          </p>
          <p className="text-sm text-gray-500 mt-1">More than doubled</p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          These programs grow on autopilot. Nobody votes to increase Social
          Security by $492B — it just happens through demographic math. This is
          why DOGE can&apos;t cut its way to a balanced budget.
        </p>
      </div>

      {/* FY2019 vs FY2025 Grouped Bar Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          FY2019 vs FY2025: Side by Side
        </h2>
        <p className="text-gray-600 mb-6">
          Each program&apos;s spending in FY2019 (blue) compared to FY2025
          (red), sorted by growth rate. Social Security Retirement dominates in
          absolute size — but FEMA disaster grants grew 299%.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
          <ResponsiveContainer
            width="100%"
            height={Math.max(comparisonChart.length * 44, 500)}
          >
            <BarChart
              data={comparisonChart}
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
                width={160}
                fontSize={11}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, name: any) => [
                  formatDollars(Number(value) || 0),
                  name,
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Legend />
              <Bar dataKey="FY2019" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="FY2025" fill="#ef4444" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Sorted by growth percentage (highest first). Programs at top grew
            fastest.
          </p>
        </div>
      </section>

      {/* Dollar Growth Bar Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Biggest Dollar Increases
        </h2>
        <p className="text-gray-600 mb-6">
          Percentages can be misleading. FEMA disaster grants grew 299%, but
          Social Security Retirement added $492B — more than most agencies&apos;
          entire budgets. Here&apos;s where the money actually went.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
          <ResponsiveContainer
            width="100%"
            height={Math.max(dollarGrowthChart.length * 44, 500)}
          >
            <BarChart
              data={dollarGrowthChart}
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
                width={160}
                fontSize={11}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, _name: any, props: any) => [
                  `${Number(value) >= 0 ? "+" : ""}${formatDollars(Number(value) || 0)} (${formatDollars(props.payload.fy2019)} → ${formatDollars(props.payload.fy2025)})`,
                  "Dollar Growth",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="growth_dollars" radius={[0, 4, 4, 0]}>
                {dollarGrowthChart.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.growth_dollars >= 0 ? "#4f46e5" : "#ef4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Social Security Retirement alone added $492B — more than the next
            three programs combined.
          </p>
        </div>
      </section>

      {/* Mandatory vs Discretionary Pie Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Mandatory vs. Discretionary (FY2025)
        </h2>
        <p className="text-gray-600 mb-6">
          Mandatory programs — Social Security, Medicare, Medicaid, VA benefits,
          SNAP — run on autopilot. Congress doesn&apos;t vote on them each year.
          They just grow. Discretionary programs require annual appropriations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [
                    formatDollars(Number(value) || 0),
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
          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="font-bold text-red-900 text-lg mb-1">
                Mandatory: {formatDollars(mandatoryTotal)}
              </p>
              <p className="text-sm text-red-800">
                {((mandatoryTotal / (mandatoryTotal + discretionaryTotal)) * 100).toFixed(0)}%
                of these programs. Grows automatically through demographic
                formulas — no vote required.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <p className="font-bold text-blue-900 text-lg mb-1">
                Discretionary: {formatDollars(discretionaryTotal)}
              </p>
              <p className="text-sm text-blue-800">
                {((discretionaryTotal / (mandatoryTotal + discretionaryTotal)) * 100).toFixed(0)}%
                of these programs. Requires annual Congressional approval —
                these are the only programs DOGE can realistically cut.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sortable Table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          All 23 Programs — Sortable
        </h2>
        <p className="text-gray-600 mb-4">
          Click any column header to sort. Every program tracked from FY2019 to
          FY2025.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th
                  className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("name")}
                >
                  Program{sortArrow("name")}
                </th>
                <th
                  className="text-right py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("fy2019")}
                >
                  FY2019{sortArrow("fy2019")}
                </th>
                <th
                  className="text-right py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("fy2025")}
                >
                  FY2025{sortArrow("fy2025")}
                </th>
                <th
                  className="text-right py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("growth_pct")}
                >
                  Growth %{sortArrow("growth_pct")}
                </th>
                <th
                  className="text-right py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("growth_dollars")}
                >
                  $ Growth{sortArrow("growth_dollars")}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableSorted.map((p, i) => (
                <tr
                  key={p.name}
                  className={`border-b border-gray-100 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } hover:bg-indigo-50/50 transition-colors`}
                >
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {shortName(p.name)}
                    {isMandatory(p.name) && (
                      <span className="ml-2 text-xs text-red-500 font-normal">
                        mandatory
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {formatDollars(p.fy2019)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900 font-medium">
                    {formatDollars(p.fy2025)}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-bold ${
                      p.growth_pct >= 100
                        ? "text-emerald-600"
                        : p.growth_pct >= 50
                          ? "text-amber-600"
                          : p.growth_pct >= 0
                            ? "text-blue-600"
                            : "text-red-600"
                    }`}
                  >
                    {p.growth_pct > 0 ? "+" : ""}
                    {p.growth_pct}%
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-medium ${
                      p.growth_dollars >= 0 ? "text-gray-900" : "text-red-600"
                    }`}
                  >
                    {p.growth_dollars >= 0 ? "+" : ""}
                    {formatDollars(p.growth_dollars)}
                  </td>
                </tr>
              ))}
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
            The biggest federal programs are growing faster than inflation,
            faster than GDP, and faster than tax revenue can keep up. Social
            Security alone added $492B in six years — that&apos;s more than the
            entire Department of Defense spends on contracts.
          </p>
          <p className="text-gray-600 mb-3">
            These aren&apos;t policy choices — they&apos;re demographic
            inevitabilities. 10,000 baby boomers retire every day. Medicare
            costs rise with medical inflation. Medicaid expands as states opt
            in. The math is relentless.
          </p>
          <p className="text-gray-600">
            DOGE can fire bureaucrats and cancel grants, but it can&apos;t
            touch mandatory spending without an act of Congress. And no
            politician wants to be the one who &quot;cut Social Security.&quot;
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <p className="text-indigo-900 text-lg font-medium italic">
            &quot;The programs that cost the most are the ones that grow
            themselves. Until Congress reforms the formulas, the deficit is on
            autopilot.&quot;
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
            href="/doge-reality"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">🔍</p>
            <p className="font-bold text-gray-900">The DOGE Reality Check</p>
            <p className="text-sm text-gray-600 mt-1">
              DOGE promised $2T in savings. Spending went up.
            </p>
          </Link>
          <Link
            href="/interest"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">💣</p>
            <p className="font-bold text-gray-900">The Interest Time Bomb</p>
            <p className="text-sm text-gray-600 mt-1">
              $952B in interest — larger than the defense budget
            </p>
          </Link>
          <Link
            href="/spending-explosion"
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <p className="text-2xl mb-2">📈</p>
            <p className="font-bold text-gray-900">The Spending Explosion</p>
            <p className="text-sm text-gray-600 mt-1">
              Federal spending surged 63% since 2017 — the COVID spike never
              came back down
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
