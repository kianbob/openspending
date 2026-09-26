"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Label,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";

interface DogeData {
  claims: {
    original_target: number;
    revised_target: number;
    final_target: number;
    claimed_savings: number;
  };
  reality: {
    fy2024_spending: number;
    fy2025_spending: number;
    spending_increase: number;
    workforce_cut_pct: number;
    workforce_cut_savings_estimate: number;
    cato_finding: string;
    senate_waste_finding: number;
  };
  context: {
    total_budget_fy2025: number;
    claimed_savings_pct_of_budget: number;
    mandatory_spending_pct: number;
    interest_pct: number;
    discretionary_pct: number;
  };
  program_growth: {
    name: string;
    fy2020: number;
    fy2025: number;
    growth_pct: number;
  }[];
}

interface SpendingYear {
  fy: number;
  total: number;
}

const BUDGET_COLORS = ["#4f46e5", "#f59e0b", "#10b981"]; // indigo, amber, emerald

const shrinkingPromise = [
  { label: "Original Promise", value: 2000000000000, display: "$2 Trillion" },
  { label: "Revised Down", value: 1000000000000, display: "$1 Trillion" },
  { label: "Final Claim (Sunset)", value: 215000000000, display: "$215 Billion" },
  { label: "GAO Verified", value: 36000000000, display: "$36 Billion" },
];

export default function DogeRealityPage() {
  const [mounted, setMounted] = useState(false);
  const [dogeData, setDogeData] = useState<DogeData | null>(null);
  const [spendingData, setSpendingData] = useState<SpendingYear[] | null>(null);

  useEffect(() => {
    setMounted(true);
    Promise.all([
      fetch("/data/doge-reality.json").then((r) => r.json()),
      fetch("/data/spending-growth.json").then((r) => r.json()),
    ]).then(([doge, spending]) => {
      setDogeData(doge);
      setSpendingData(
        spending.map((y: SpendingYear & { agencies?: unknown }) => ({
          fy: y.fy,
          total: y.total,
        }))
      );
    });
  }, []);

  if (!dogeData || !spendingData) {
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

  const budgetBreakdown = [
    {
      name: "Mandatory Spending",
      value: dogeData.context.mandatory_spending_pct,
    },
    { name: "Interest on Debt", value: dogeData.context.interest_pct },
    { name: "Discretionary", value: dogeData.context.discretionary_pct },
  ];

  const programGrowth = dogeData.program_growth.map((p) => ({
    name: p.name,
    growth: p.growth_pct,
    fy2020: p.fy2020,
    fy2025: p.fy2025,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Editorial" },
          { label: "The DOGE Reality Check" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The DOGE Reality Check
        </h1>
        <ShareButtons
          title="The DOGE Reality Check: Spending Increased $390B Despite Cuts — OpenSpending"
          url="https://www.openspending.us/doge-reality"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Updated: September 2026</p>
      <p className="text-gray-500 text-lg mb-10">
        DOGE promised $2 trillion in savings, sunset on July 4, 2026 claiming
        $215 billion. GAO found $110 billion unsubstantiated. Federal spending
        increased. The data tells the full story.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">DOGE Promised</p>
          <p className="text-2xl font-bold text-gray-900">$2 Trillion</p>
          <p className="text-sm text-gray-500 mt-1">Original savings target</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Final Claim</p>
          <p className="text-2xl font-bold text-amber-600">$215 Billion</p>
          <p className="text-sm text-gray-500 mt-1">
            Claimed at July 4 sunset — no final report
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">GAO Audit</p>
          <p className="text-2xl font-bold text-red-600">$110B Unverified</p>
          <p className="text-sm text-gray-500 mt-1">
            Incorrect or lacking supporting evidence
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Verified Savings</p>
          <p className="text-2xl font-bold text-emerald-600">$36 Billion</p>
          <p className="text-sm text-gray-500 mt-1">
            Independently confirmed by GAO &amp; CBO
          </p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          We wanted DOGE to work. The federal government wastes hundreds of
          billions per year. But wanting something to work and it actually working
          are two different things. The spending data tells a clear story: despite
          the rhetoric, federal outlays went up, not down.
        </p>
      </div>

      {/* The Shrinking Promise */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Shrinking Promise
        </h2>
        <p className="text-gray-600 mb-6">
          DOGE&apos;s savings targets shrank dramatically from announcement to
          sunset. From $2 trillion promised to $215 billion claimed at shutdown —
          and the GAO found $110 billion of that was unsubstantiated. Only $36
          billion survived independent verification.
        </p>
        <div className="space-y-3 mb-6">
          {shrinkingPromise.map((item, i) => {
            const widthPct = Math.max(
              (item.value / shrinkingPromise[0].value) * 100,
              8
            );
            const isLast = i === shrinkingPromise.length - 1;
            return (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span
                    className={`font-bold ${isLast ? "text-red-600" : "text-gray-900"}`}
                  >
                    {item.display}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-8">
                  <div
                    className={`h-8 rounded-full flex items-center justify-end pr-3 ${
                      isLast ? "bg-red-500" : "bg-indigo-500"
                    }`}
                    style={{ width: `${widthPct}%` }}
                  >
                    <span className="text-white text-xs font-medium">
                      {item.display}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">
            The original $2T target was never realistic. For context, total
            discretionary spending — everything Congress votes on annually — is
            about $1.7T. DOGE promised to cut more than the entire discretionary
            budget. The math never worked.
          </p>
        </div>
      </section>

      {/* Spending Trajectory Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Federal Spending: The Trajectory DOGE Can&apos;t Bend
        </h2>
        <p className="text-gray-600 mb-6">
          Federal outlays grew from $3.3 trillion in FY2017 to $5.3 trillion in
          FY2025 and are projected at $7.8 trillion for FY2026. DOGE&apos;s verified
          $36B in savings is invisible against this backdrop.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={spendingData}
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
                  formatter={(value: any) => [
                    formatDollars(Number(value) || 0),
                    "Total Outlays",
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
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#4f46e5" }}
                  name="Total Outlays"
                />
                {/* DOGE claimed savings annotation */}
                <ReferenceLine
                  y={dogeData.reality.fy2025_spending - dogeData.claims.claimed_savings}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                >
                  <Label
                    value="DOGE verified $36B (0.5%)"
                    position="insideBottomRight"
                    fill="#ef4444"
                    fontSize={11}
                  />
                </ReferenceLine>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ width: "100%", height: 400 }} />
          )}
          <p className="text-center text-xs text-gray-400 mt-2">
            The red dashed line shows where spending would be with DOGE&apos;s
            verified $36B in savings — barely visible against trillions in total
            outlays.
          </p>
        </div>
      </section>

      {/* What DOGE Can't Touch */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          What DOGE Can&apos;t Touch
        </h2>
        <p className="text-gray-600 mb-6">
          76% of the federal budget is on autopilot. Social Security, Medicare,
          Medicaid, and interest on the debt are mandatory — they grow
          automatically by law. DOGE can only touch the remaining 24%
          discretionary slice.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {budgetBreakdown.map((_, index) => (
                      <Cell key={index} fill={BUDGET_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any, name: any) => [
                      `${value}%`,
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
            ) : (
              <div style={{ width: "100%", height: 300 }} />
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="font-bold text-indigo-900">
                63% — Mandatory Spending
              </p>
              <p className="text-sm text-indigo-800 mt-1">
                Social Security, Medicare, Medicaid, VA benefits. These grow
                automatically. Congress would have to change the law to cut them.
                DOGE has no authority here.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-bold text-amber-900">
                13% — Interest on the Debt
              </p>
              <p className="text-sm text-amber-800 mt-1">
                $879 billion in FY2025. This is the cost of past borrowing. It
                cannot be cut — it can only be reduced by paying down the debt
                or getting lower interest rates.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="font-bold text-emerald-900">
                24% — Discretionary Spending
              </p>
              <p className="text-sm text-emerald-800 mt-1">
                Defense, education, infrastructure, federal agencies. This is
                the only slice DOGE can realistically target — about $1.6
                trillion. And half of that is defense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Spending Drivers */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Real Spending Drivers
        </h2>
        <p className="text-gray-600 mb-6">
          These five programs grew by a combined $770 billion between FY2020 and
          FY2025. DOGE fired interns and canceled subscriptions. The math
          doesn&apos;t work.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={programGrowth}
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
                  tickFormatter={(v) => `${v}%`}
                  fontSize={12}
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={180}
                  fontSize={12}
                  tick={{ fill: "#6b7280" }}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, _name: any, props: any) => [
                    `+${value}% (${formatDollars(props.payload.fy2020)} → ${formatDollars(props.payload.fy2025)})`,
                    "Growth FY2020–FY2025",
                  ]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="growth" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ width: "100%", height: 350 }} />
          )}
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mt-4">
          <p className="text-amber-900">
            VA Disability grew 85%. Medicare prescriptions grew 82%. Social
            Security grew 52%. These are driven by demographics, inflation, and
            statutory formulas — not by the number of federal employees or how
            many government subscriptions get canceled.
          </p>
        </div>
      </section>

      {/* Key Findings */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Key Findings</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Workforce Cut 9% — Spending Went Up
            </h3>
            <p className="text-gray-600 text-sm">
              DOGE cut approximately 9% of the federal workforce, saving an
              estimated $40 billion in personnel costs. But total federal
              outlays increased $392 billion — nearly 10x the savings. Cutting
              staff without cutting programs just means the same programs run
              with fewer people to oversee them.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              GAO: $110 Billion in Claims Were Unsubstantiated
            </h3>
            <p className="text-gray-600 text-sm">
              The Government Accountability Office&apos;s August 2026 audit found
              that $110 billion of DOGE&apos;s claimed savings from contracts,
              grants, and leases were either incorrect or lacked supporting
              evidence. Politico independently found that of $32.7 billion in
              contract savings they could verify, only $1.4 billion — less than
              5% — was real.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Senate Found $21.7B in Waste Caused by DOGE
            </h3>
            <p className="text-gray-600 text-sm">
              The Senate identified $21.7 billion in waste, contract
              cancellation penalties, litigation costs, and disruption caused by
              DOGE&apos;s own actions. When your efficiency effort creates $21.7
              billion in new waste, you&apos;re not cutting spending — you&apos;re
              adding to it.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              25,000+ Workers Rehired After Being Cut
            </h3>
            <p className="text-gray-600 text-sm">
              Courts ordered reinstatements at 18 agencies. By mid-2026,
              approximately 25,000 fired federal workers had been rehired as
              essential. Agencies paid billions through deferred resignation
              programs, then hired replacements for the same roles. The
              workforce churn may have cost more than it saved.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Line */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Bottom Line
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            The federal spending problem is real. The government wastes hundreds
            of billions per year. We document that extensively on this site. The
            problem deserves serious, structural reform.
          </p>
          <p className="text-gray-600 mb-3">
            DOGE&apos;s approach — cutting headcount, canceling grants,
            generating headlines — did not bend the spending trajectory. The
            mandatory programs that drive 76% of the budget continued growing on
            autopilot. Interest on the debt kept compounding. And many workforce
            cuts boomeranged: courts reinstated 24,000+ workers, agencies rehired
            25,000+, and the deferred resignation program cost billions paying
            people to leave — only for agencies to hire replacements.
          </p>
          <p className="text-gray-600">
            Credit where due: DOGE identified $36 billion in real, verifiable waste
            and raised public awareness of government inefficiency. But the $215
            billion headline was inflated — the GAO confirmed $110 billion was
            unsubstantiated — and the workforce churn created new costs.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <p className="text-indigo-900 text-lg font-medium italic">
            &quot;Cutting headcount without cutting programs is like rearranging
            deck chairs on the Titanic. The ship is still sinking — just with
            fewer people watching.&quot;
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/waste"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">The Federal Waste Problem</p>
            <p className="text-sm text-gray-600 mt-1">
              $233–521B lost to fraud annually
            </p>
          </Link>
          <Link
            href="/doge-aftermath"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">DOGE Aftermath</p>
            <p className="text-sm text-gray-600 mt-1">
              271K workers cut, $6.7B to pay them to leave
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
