"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  ScatterChart, Scatter, CartesianGrid, ZAxis,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

interface StateData {
  state: string;
  name: string;
  received: number;
  paid: number;
  ratio: number;
  net: number;
  net_per_capita: number;
}

interface DepData {
  states: StateData[];
  biggest_taker: { name: string; ratio: number };
  biggest_donor: { name: string; ratio: number };
  takers_count: number;
  donors_count: number;
}

// Rough partisan lean for editorial context
const redStates = new Set(["WV", "MS", "AL", "KY", "AK", "SC", "MT", "AR", "LA", "SD", "ND", "ID", "WY", "TN", "MO", "IN", "OK", "KS", "NE", "UT", "TX", "FL", "OH", "IA", "GA", "NC"]);
const blueStates = new Set(["NJ", "CT", "MA", "NY", "CA", "WA", "MN", "IL", "CO", "OR", "MD", "VA", "NH", "HI", "DE", "RI", "VT", "ME", "NV", "NM"]);

export default function WelfareQueensPage() {
  const [data, setData] = useState<DepData | null>(null);

  useEffect(() => {
    fetch("/data/state-dependency.json").then(r => r.json()).then(setData);
  }, []);

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  const states = data.states;
  const sorted = [...states].sort((a, b) => b.ratio - a.ratio);
  const topTakers = sorted.slice(0, 12).map(s => ({ name: s.name, amount: s.ratio }));
  const topDonors = [...states].sort((a, b) => a.ratio - b.ratio).slice(0, 12).map(s => ({ name: s.name, amount: s.ratio }));

  // Scatter data: ratio vs label
  const scatterData = states.map(s => ({
    name: s.name,
    state: s.state,
    ratio: s.ratio,
    paid: s.paid / 1e9,
    lean: redStates.has(s.state) ? "red" : blueStates.has(s.state) ? "blue" : "swing",
  }));

  const redTakers = sorted.filter(s => redStates.has(s.state) && s.ratio > 1);
  const blueTakers = sorted.filter(s => blueStates.has(s.state) && s.ratio > 1);
  const redDonors = sorted.filter(s => redStates.has(s.state) && s.ratio <= 1);
  const blueDonors = sorted.filter(s => blueStates.has(s.state) && s.ratio <= 1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Investigations", href: "/investigations" }, { label: "Welfare Queens" }]} />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Which States Are Federal Welfare Queens?
        </h1>
        <ShareButtons title="Which States Are Federal Welfare Queens? — OpenSpending" url="https://www.openspending.us/welfare-queens" />
      </div>

      <p className="text-sm text-gray-500 mb-8">Published February 2025 · Editorial Analysis</p>

      {/* Table of Contents */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Table of Contents</h2>
        <ol className="space-y-1 text-sm">
          <li><a href="#the-numbers" className="text-indigo-700 hover:underline">1. The Numbers Don&apos;t Lie</a></li>
          <li><a href="#takers" className="text-indigo-700 hover:underline">2. The Top Takers</a></li>
          <li><a href="#donors" className="text-indigo-700 hover:underline">3. The Top Donors</a></li>
          <li><a href="#partisan" className="text-indigo-700 hover:underline">4. The Partisan Irony</a></li>
          <li><a href="#scatter" className="text-indigo-700 hover:underline">5. The Dependency Scatter</a></li>
          <li><a href="#why" className="text-indigo-700 hover:underline">6. Why This Happens</a></li>
          <li><a href="#editorial" className="text-indigo-700 hover:underline">7. The Real Conversation</a></li>
        </ol>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Americans love to argue about welfare. Who deserves it, who&apos;s gaming the system, who&apos;s a
          &ldquo;taker&rdquo; vs. a &ldquo;maker.&rdquo; But while we debate individual welfare recipients,
          we ignore the biggest welfare question of all: <strong>which states are dependent on federal money
          they didn&apos;t earn?</strong>
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-red-900 mb-2">$4.22 → $0.71</p>
          <p className="text-red-800">
            West Virginia gets <strong>$4.22</strong> back for every $1 it sends to Washington.
            New Jersey gets <strong>$0.71</strong>. Someone&apos;s subsidizing someone.
          </p>
        </div>

        {/* Section 1 */}
        <h2 id="the-numbers" className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. The Numbers Don&apos;t Lie</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The math is simple. Every state sends tax revenue to Washington. Washington sends money back — through
          Social Security, Medicare, Medicaid, military spending, highway funding, food assistance, and
          hundreds of other programs. When a state receives more than it pays, the difference comes from
          other states. Period.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-red-200 p-6">
            <p className="text-sm font-medium text-gray-500">Biggest Taker</p>
            <p className="text-2xl font-bold text-red-700 mt-1">{data.biggest_taker.name}</p>
            <p className="text-xs text-gray-400">${data.biggest_taker.ratio} per $1 paid</p>
          </div>
          <div className="bg-white rounded-xl border border-green-200 p-6">
            <p className="text-sm font-medium text-gray-500">Biggest Donor</p>
            <p className="text-2xl font-bold text-green-700 mt-1">{data.biggest_donor.name}</p>
            <p className="text-xs text-gray-400">${data.biggest_donor.ratio} per $1 paid</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-500">Taker States</p>
            <p className="text-2xl font-bold text-red-700 mt-1">{data.takers_count}</p>
            <p className="text-xs text-gray-400">Get more than they pay</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-500">Donor States</p>
            <p className="text-2xl font-bold text-green-700 mt-1">{data.donors_count}</p>
            <p className="text-xs text-gray-400">Pay more than they get</p>
          </div>
        </div>

        {/* Section 2: Top Takers */}
        <h2 id="takers" className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. The Top Takers</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          These states receive the most federal money relative to what they contribute in taxes.
          For every dollar they send to DC, they get back two, three, or even four:
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 my-8">
          <div style={{ width: "100%", height: 420 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topTakers} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
                <XAxis type="number" tickFormatter={v => `$${v.toFixed(1)}`} fontSize={12} tick={{ fill: "#6b7280" }} />
                <YAxis type="category" dataKey="name" width={140} fontSize={11} tick={{ fill: "#374151" }} />
                <Tooltip formatter={(v) => [`$${Number(v).toFixed(2)} per $1 paid`, "Ratio"]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px" }} />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {topTakers.map((_, i) => (
                    <Cell key={i} fill="#dc2626" fillOpacity={1 - i * 0.05} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">Federal dollars received per $1 in federal taxes paid</p>
        </div>

        {/* Section 3: Top Donors */}
        <h2 id="donors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. The Top Donors</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          And these are the states subsidizing everyone else. They send more to Washington than they
          get back — their taxpayers are, in effect, funding programs in other states:
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 my-8">
          <div style={{ width: "100%", height: 420 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topDonors} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
                <XAxis type="number" tickFormatter={v => `$${v.toFixed(1)}`} fontSize={12} tick={{ fill: "#6b7280" }} />
                <YAxis type="category" dataKey="name" width={140} fontSize={11} tick={{ fill: "#374151" }} />
                <Tooltip formatter={(v) => [`$${Number(v).toFixed(2)} per $1 paid`, "Ratio"]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px" }} />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {topDonors.map((_, i) => (
                    <Cell key={i} fill="#16a34a" fillOpacity={1 - i * 0.05} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">Federal dollars received per $1 in federal taxes paid (lower = bigger donor)</p>
        </div>

        {/* Section 4: Partisan */}
        <h2 id="partisan" className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. The Partisan Irony</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Here&apos;s where it gets uncomfortable for everyone:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-red-800 uppercase">Red States</p>
            <p className="text-red-900 font-bold text-2xl mt-1">{redTakers.length} takers</p>
            <p className="text-sm text-red-700 mt-2">
              {redDonors.length} donors. Many of the loudest voices against &ldquo;big government&rdquo;
              represent states that depend on it most.
            </p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-blue-800 uppercase">Blue States</p>
            <p className="text-blue-900 font-bold text-2xl mt-1">{blueDonors.length} donors</p>
            <p className="text-sm text-blue-700 mt-2">
              {blueTakers.length} takers. Blue states fund much of the transfer, but also push for
              expanding the programs that create dependency.
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>But let&apos;s be honest with both sides.</strong> Yes, many red states rail against federal
          spending while cashing federal checks. That&apos;s hypocritical. But blue states that champion massive
          federal programs are also building the very dependency system they then mock red states for using.
          Both parties are complicit in a system that transfers wealth without accountability.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl my-8">
          <p className="text-amber-900 text-lg">
            <span className="font-bold">This isn&apos;t a partisan argument.</span> It&apos;s a fiscal one.
            The question isn&apos;t which party&apos;s states are worse — it&apos;s why we have a system that
            makes states dependent on transfers rather than building their own economic capacity.
          </p>
        </div>

        {/* Section 5: Scatter */}
        <h2 id="scatter" className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. The Dependency Scatter</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Each dot is a state. The horizontal axis shows how much they pay in federal taxes (a proxy for
          economic output). The vertical axis shows their dependency ratio. The pattern is clear:
          <strong> richer states subsidize poorer ones.</strong>
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 my-8">
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ left: 10, right: 30, top: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" dataKey="paid" name="Taxes Paid" tickFormatter={v => `$${v}B`} fontSize={12} tick={{ fill: "#6b7280" }} label={{ value: "Federal Taxes Paid (Billions)", position: "bottom", fontSize: 11, fill: "#9ca3af" }} />
                <YAxis type="number" dataKey="ratio" name="Ratio" tickFormatter={v => `$${v}`} fontSize={12} tick={{ fill: "#6b7280" }} label={{ value: "$ Received per $1 Paid", angle: -90, position: "insideLeft", fontSize: 11, fill: "#9ca3af" }} />
                <ZAxis range={[40, 40]} />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm">
                        <p className="font-bold">{d.name}</p>
                        <p>Ratio: ${d.ratio} per $1</p>
                        <p>Taxes Paid: ${d.paid.toFixed(0)}B</p>
                        <p>Lean: {d.lean}</p>
                      </div>
                    );
                  }}
                />
                <Scatter data={scatterData.filter(s => s.lean === "red")} fill="#dc2626" name="Red States" />
                <Scatter data={scatterData.filter(s => s.lean === "blue")} fill="#2563eb" name="Blue States" />
                <Scatter data={scatterData.filter(s => s.lean === "swing")} fill="#9ca3af" name="Swing States" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-600 inline-block" /> Red-leaning</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> Blue-leaning</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-400 inline-block" /> Swing</span>
          </div>
        </div>

        {/* Section 6: Why */}
        <h2 id="why" className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Why This Happens</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          State dependency isn&apos;t random. It&apos;s driven by predictable factors:
        </p>

        <div className="space-y-4 my-8">
          {[
            { factor: "Age & Poverty", desc: "States with older, poorer populations draw more Social Security, Medicare, and Medicaid. West Virginia has the second-oldest population and among the lowest incomes.", color: "bg-red-50 border-red-500" },
            { factor: "Military Bases", desc: "Virginia, Alaska, and Hawaii receive massive DOD spending. This inflates their federal receipts regardless of economic need.", color: "bg-blue-50 border-blue-500" },
            { factor: "Federal Land", desc: "Western states (NM, MT, AK) have huge federal landholdings. Managing that land means federal spending.", color: "bg-green-50 border-green-500" },
            { factor: "Income Taxes", desc: "The progressive tax code means high-income states (NY, CA, NJ, CT) pay disproportionately more. The transfers are baked into the structure.", color: "bg-amber-50 border-amber-500" },
          ].map(f => (
            <div key={f.factor} className={`${f.color} border-l-4 p-5 rounded-r-lg`}>
              <h3 className="font-bold text-gray-900">{f.factor}</h3>
              <p className="text-gray-700 text-sm mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Section 7: Editorial */}
        <h2 id="editorial" className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. The Real Conversation</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The point of this analysis isn&apos;t to shame West Virginia or congratulate New Jersey. It&apos;s to
          ask a question that neither party wants to answer: <strong>is permanent fiscal dependency between states
          actually good policy?</strong>
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The current system transfers hundreds of billions from economically productive states to states
          that have been receiving these transfers for <em>decades</em> — with no improvement in their
          underlying economic capacity. West Virginia has been a net federal recipient for as long as
          anyone can remember. Has the money helped? Or has it created a dependency that prevents the
          state from developing its own economic engine?
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The same question applies to individuals, cities, and countries. When transfers become permanent
          rather than transitional, they stop being assistance and start being subsidy. And subsidies, by
          definition, prevent the market signals that would otherwise drive change.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;If your state has been receiving more than it pays for 50 years and still can&apos;t
            balance the books, maybe the transfers aren&apos;t the solution — maybe they&apos;re part
            of the problem.&rdquo;
          </p>
        </blockquote>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Every taxpayer in New Jersey, Connecticut, and Massachusetts should look at these numbers and ask:
          am I okay with my federal taxes permanently subsidizing states that vote against the very programs
          my money funds? And every taxpayer in West Virginia and Mississippi should ask: is my state better
          off after decades of federal dependency, or has the money just masked problems that need real solutions?
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/state-dependency" className="text-indigo-700 underline font-medium">
            See the full state dependency data →
          </Link>
        </p>

        {/* Related Analysis */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/state-dependency" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">State Dependency Data</p>
              <p className="text-sm text-gray-600 mt-1">Full data table: every state&apos;s federal balance</p>
            </Link>
            <Link href="/states" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Federal Spending by State</p>
              <p className="text-sm text-gray-600 mt-1">Contract and grant spending in every state</p>
            </Link>
            <Link href="/your-tax-bill" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Your Tax Bill</p>
              <p className="text-sm text-gray-600 mt-1">$33,135 per taxpayer — where does it go?</p>
            </Link>
            <Link href="/interest" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Interest Time Bomb</p>
              <p className="text-sm text-gray-600 mt-1">$952B in interest — more than defense</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
