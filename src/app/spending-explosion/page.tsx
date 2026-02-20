"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Label,
  Cell,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";

interface SpendingYear {
  fy: number;
  total: number;
  growth_pct?: number;
  growth_dollars?: number;
}

interface AgencyGrowth {
  name: string;
  fy2017: number;
  fy2025: number;
  growth_pct: number;
  growth_dollars: number;
}

function getGrowthColor(pct: number): string {
  if (pct < 0) return "#ef4444"; // red
  if (pct < 50) return "#3b82f6"; // blue
  if (pct < 100) return "#f59e0b"; // yellow/amber
  return "#10b981"; // green
}

export default function SpendingExplosionPage() {
  const [spendingData, setSpendingData] = useState<SpendingYear[] | null>(null);
  const [agencyData, setAgencyData] = useState<AgencyGrowth[] | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/spending-growth.json").then((r) => r.json()),
      fetch("/data/agency-growth.json").then((r) => r.json()),
    ]).then(([spending, agencies]) => {
      setSpendingData(
        spending.map((y: SpendingYear) => ({
          fy: y.fy,
          total: y.total,
          growth_pct: y.growth_pct,
          growth_dollars: y.growth_dollars,
        }))
      );
      setAgencyData(agencies);
    });
  }, []);

  if (!spendingData || !agencyData) {
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

  const fy2017 = spendingData.find((y) => y.fy === 2017);
  const fy2025 = spendingData.find((y) => y.fy === 2025);
  const fy2020 = spendingData.find((y) => y.fy === 2020);

  const totalGrowthPct = fy2017 && fy2025
    ? (((fy2025.total - fy2017.total) / fy2017.total) * 100).toFixed(0)
    : "63";

  // Top dollar increases for the dollar growth section
  const topDollarGrowth = [...agencyData]
    .sort((a, b) => b.growth_dollars - a.growth_dollars)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Analysis" },
          { label: "The Spending Explosion" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The Spending Explosion
        </h1>
        <ShareButtons
          title="The Spending Explosion: Federal Spending Grew 63% Since 2017 — OpenSpending"
          url="https://openspending-app.vercel.app/spending-explosion"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        Which agencies grew fastest? Federal spending surged {totalGrowthPct}%
        since 2017 — and the COVID spike never came back down.
      </p>

      {/* Hero Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">FY2017 Spending</p>
          <p className="text-2xl font-bold text-gray-900">
            {fy2017 ? formatDollars(fy2017.total) : "$3.3T"}
          </p>
          <p className="text-sm text-gray-500 mt-1">Starting point</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">FY2025 Spending</p>
          <p className="text-2xl font-bold text-red-600">
            {fy2025 ? formatDollars(fy2025.total) : "$5.3T"}
          </p>
          <p className="text-sm text-gray-500 mt-1">Current level</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Total Growth</p>
          <p className="text-2xl font-bold text-amber-600">+{totalGrowthPct}%</p>
          <p className="text-sm text-gray-500 mt-1">In just 8 years</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">COVID Peak (FY2020)</p>
          <p className="text-2xl font-bold text-gray-900">
            {fy2020 ? formatDollars(fy2020.total) : "$5.0T"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            +40.7% in a single year
          </p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          Federal spending hit $5 trillion during COVID and never came back down.
          The &quot;emergency&quot; spending became the new baseline. Every dollar
          of pandemic stimulus that was supposed to be temporary got baked into the
          budget. This is how government grows — crisis by crisis, ratchet by
          ratchet.
        </p>
      </div>

      {/* Year-by-Year Spending Line Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Year-by-Year: The Spending Trajectory
        </h2>
        <p className="text-gray-600 mb-6">
          From $3.3 trillion to over $5.3 trillion. The COVID spike in 2020 was
          supposed to be temporary — spending briefly dipped in 2022 but has been
          climbing ever since.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
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
                  "Total Spending",
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
                name="Total Spending"
              />
              {/* COVID annotation */}
              <ReferenceLine x={2020} stroke="#ef4444" strokeDasharray="4 4">
                <Label
                  value="COVID"
                  position="top"
                  fill="#ef4444"
                  fontSize={12}
                  fontWeight="bold"
                />
              </ReferenceLine>
              {/* DOGE annotation */}
              <ReferenceLine x={2025} stroke="#10b981" strokeDasharray="4 4">
                <Label
                  value="DOGE"
                  position="top"
                  fill="#10b981"
                  fontSize={12}
                  fontWeight="bold"
                />
              </ReferenceLine>
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Federal outlays FY2017–FY2025. COVID-era spending in 2020–2021
            established a new, higher baseline.
          </p>
        </div>
      </section>

      {/* Agency Growth Bar Chart */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Which Agencies Grew Fastest?
        </h2>
        <p className="text-gray-600 mb-4">
          Percentage growth in outlays from FY2017 to FY2025. Color coded:{" "}
          <span className="inline-block w-3 h-3 rounded-sm bg-emerald-500 align-middle" /> &gt;100%{" "}
          <span className="inline-block w-3 h-3 rounded-sm bg-amber-500 align-middle" /> 50–100%{" "}
          <span className="inline-block w-3 h-3 rounded-sm bg-blue-500 align-middle" /> &lt;50%{" "}
          <span className="inline-block w-3 h-3 rounded-sm bg-red-500 align-middle" /> Negative
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={Math.max(agencyData.length * 40, 500)}>
            <BarChart
              data={agencyData}
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
                width={220}
                fontSize={11}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, _name: any, props: any) => [
                  `${value > 0 ? "+" : ""}${value}% (${formatDollars(props.payload.fy2017)} → ${formatDollars(props.payload.fy2025)})`,
                  "Growth FY2017–FY2025",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="growth_pct" radius={[0, 4, 4, 0]}>
                {agencyData.map((agency, index) => (
                  <Cell
                    key={index}
                    fill={getGrowthColor(agency.growth_pct)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Key Insight: Defense Shrinking as Share */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Real Story: Defense Grew, But It&apos;s Shrinking
        </h2>
        <p className="text-gray-600 mb-6">
          Defense spending grew 53% — sounds big. But mandatory programs grew
          even faster. Defense is actually shrinking as a share of the total
          budget. The real spending explosion is in mandatory programs that run
          on autopilot: Social Security, Medicare, Medicaid.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
            <p className="font-bold text-indigo-900 text-lg mb-2">
              Defense: +53% but shrinking share
            </p>
            <p className="text-sm text-indigo-800">
              Department of Defense grew from $328B to $501B — but as a share of
              total spending, it fell from 10.1% to 9.4%. Defense is not driving
              the spending explosion.
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="font-bold text-red-900 text-lg mb-2">
              Mandatory programs: the real driver
            </p>
            <p className="text-sm text-red-800">
              HHS (Medicare/Medicaid) grew 67% (+$810B). Social Security grew
              65% (+$644B). Together, these two agencies account for 70% of all
              federal spending growth since 2017.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mt-6">
          <p className="text-amber-900">
            This is the dirty secret of federal spending: the programs that cost
            the most are the ones no politician wants to touch. Social Security
            and Medicare grow automatically by law. Until Congress reforms the
            formulas, no amount of &quot;efficiency&quot; will bend the curve.
          </p>
        </div>
      </section>

      {/* Dollar Growth Section */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Biggest Dollar Increases Since 2017
        </h2>
        <p className="text-gray-600 mb-6">
          Percentages can be misleading — a small agency growing 150% adds far
          less than a giant agency growing 65%. Here are the agencies that added
          the most dollars.
        </p>
        <div className="space-y-3">
          {topDollarGrowth.map((agency) => {
            const maxDollars = topDollarGrowth[0].growth_dollars;
            const widthPct = Math.max(
              (agency.growth_dollars / maxDollars) * 100,
              3
            );
            return (
              <div key={agency.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">
                    {agency.name}
                  </span>
                  <span className="font-bold text-gray-900">
                    +{formatDollars(agency.growth_dollars)}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-7">
                  <div
                    className="h-7 rounded-full flex items-center justify-end pr-3 bg-indigo-500"
                    style={{ width: `${widthPct}%` }}
                  >
                    {widthPct > 15 && (
                      <span className="text-white text-xs font-medium">
                        +{formatDollars(agency.growth_dollars)}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDollars(agency.fy2017)} → {formatDollars(agency.fy2025)} (+{agency.growth_pct}%)
                </p>
              </div>
            );
          })}
        </div>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mt-6">
          <p className="text-gray-600 text-sm">
            HHS alone added $810 billion — more than the entire Defense
            Department budget. SSA added $644 billion. These two agencies
            account for the vast majority of spending growth, driven by aging
            demographics and statutory benefit increases.
          </p>
        </div>
      </section>

      {/* Key Findings */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Key Findings</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              The COVID Ratchet Effect
            </h3>
            <p className="text-gray-600 text-sm">
              Federal spending jumped 41% in a single year (FY2020). It was
              supposed to be temporary. Five years later, spending is $2 trillion
              higher than 2017 levels. The &quot;emergency&quot; became
              permanent.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Energy &amp; Homeland Security: The Quiet Doublers
            </h3>
            <p className="text-gray-600 text-sm">
              Department of Energy grew 154% ($32B → $81B). Homeland Security
              grew 153% ($29B → $73B). These agencies more than doubled while
              the public debate focused on defense and entitlements.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              USAID: The Only Major Agency That Shrank
            </h3>
            <p className="text-gray-600 text-sm">
              USAID spending fell 27% — the only major agency with negative
              growth. Whether this represents efficiency or neglect of foreign
              policy objectives is a matter of debate, but the numbers are clear.
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
            Federal spending grew 63% in eight years — from $3.3 trillion to
            $5.3 trillion. That&apos;s $2 trillion more per year than in 2017.
            Adjusted for inflation, real spending is still up over 30%.
          </p>
          <p className="text-gray-600 mb-3">
            The growth is overwhelmingly driven by mandatory programs — Social
            Security, Medicare, and Medicaid — that grow automatically. Defense
            spending, the traditional target of budget hawks, is actually
            shrinking as a share of the pie.
          </p>
          <p className="text-gray-600">
            Until Congress is willing to reform the mandatory spending formulas,
            no amount of discretionary cuts, workforce reductions, or efficiency
            programs will meaningfully change the trajectory.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <p className="text-indigo-900 text-lg font-medium italic">
            &quot;Government spending is like a ratchet: it goes up in a crisis
            and never fully comes back down. COVID proved this at a $2 trillion
            scale.&quot;
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Related Analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/doge-reality" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">🔍</p>
            <p className="font-bold text-gray-900">The DOGE Reality Check</p>
            <p className="text-sm text-gray-600 mt-1">DOGE promised $2T in savings. Spending went up.</p>
          </Link>
          <Link href="/interest" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">💣</p>
            <p className="font-bold text-gray-900">The Interest Time Bomb</p>
            <p className="text-sm text-gray-600 mt-1">$952B in interest — larger than the defense budget</p>
          </Link>
          <Link href="/your-tax-bill" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">💰</p>
            <p className="font-bold text-gray-900">Your Tax Bill Breakdown</p>
            <p className="text-sm text-gray-600 mt-1">$33,135 per taxpayer — where every dollar goes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
