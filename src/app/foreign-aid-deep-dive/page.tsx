"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, CartesianGrid, Legend,
  PieChart, Pie,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

interface CountryRow { name: string; code: string; amount: number }
interface UsaidData {
  topGrants: { recipient: string; amount: number; description: string }[];
  topContracts: { recipient: string; amount: number; description: string }[];
  totalGrants: number;
  totalContracts: number;
}

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#14b8a6"];

const usaidTimeline = [
  { year: "FY2017", budget: 16.7 },
  { year: "FY2018", budget: 15.2 },
  { year: "FY2019", budget: 14.8 },
  { year: "FY2020", budget: 20.5 },
  { year: "FY2021", budget: 22.3 },
  { year: "FY2022", budget: 24.1 },
  { year: "FY2023", budget: 18.9 },
  { year: "FY2024", budget: 14.1 },
  { year: "FY2025", budget: 12.3 },
];

const categoryBreakdown = [
  { name: "Health (HIV/AIDS, Malaria)", value: 42 },
  { name: "Military & Security Aid", value: 22 },
  { name: "Economic Development", value: 16 },
  { name: "Humanitarian / Food Aid", value: 12 },
  { name: "Democracy & Governance", value: 5 },
  { name: "Other", value: 3 },
];

const fmt = (v: number) => {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${v.toLocaleString()}`;
};

export default function ForeignAidDeepDivePage() {
  const [countries, setCountries] = useState<CountryRow[]>([]);
  const [usaid, setUsaid] = useState<UsaidData | null>(null);

  useEffect(() => {
    fetch("/data/spending-by-country.json").then(r => r.json()).then(setCountries);
    fetch("/data/usaid-deep-dive.json").then(r => r.json()).then(setUsaid);
  }, []);

  // Top 15 non-US recipients
  const topRecipients = countries
    .filter(c => c.code !== "USA")
    .slice(0, 15)
    .map(c => ({ name: c.name.replace(/^UNITED /, "U. "), amount: c.amount }));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Investigations", href: "/investigations" }, { label: "Foreign Aid Deep Dive" }]} />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Where Does Foreign Aid Actually Go?
        </h1>
        <ShareButtons title="Where Does Foreign Aid Actually Go? — OpenSpending" url="https://www.openspending.us/foreign-aid-deep-dive" />
      </div>

      <p className="text-sm text-gray-500 mb-8">Published February 2025 · Editorial Investigation</p>

      {/* Table of Contents */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Table of Contents</h2>
        <ol className="space-y-1 text-sm">
          <li><a href="#top-recipients" className="text-indigo-700 hover:underline">1. The Top Recipients</a></li>
          <li><a href="#categories" className="text-indigo-700 hover:underline">2. What Are We Buying?</a></li>
          <li><a href="#usaid-timeline" className="text-indigo-700 hover:underline">3. The USAID Explosion — and Collapse</a></li>
          <li><a href="#biggest-awards" className="text-indigo-700 hover:underline">4. The Biggest Awards</a></li>
          <li><a href="#is-it-working" className="text-indigo-700 hover:underline">5. Is It Working?</a></li>
          <li><a href="#editorial" className="text-indigo-700 hover:underline">6. The Hard Questions</a></li>
        </ol>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The United States spends roughly <strong>$50 billion per year</strong> on foreign aid — a number that sounds enormous
          until you realize it&apos;s about 1% of the federal budget. But &ldquo;only 1%&rdquo; still means real money flowing to
          real places, and the question isn&apos;t just <em>how much</em> — it&apos;s <em>where</em>, <em>why</em>, and whether
          anyone&apos;s checking if it works.
        </p>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-indigo-900 mb-2">~$50 Billion / Year</p>
          <p className="text-indigo-800">
            Total U.S. foreign aid — about 1% of the federal budget, but more than the GDP of most recipient countries.
          </p>
        </div>

        {/* Section 1: Top Recipients */}
        <h2 id="top-recipients" className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. The Top Recipients</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Excluding domestic spending, here are the countries receiving the most U.S. federal dollars. Note: this includes
          <em> all</em> federal spending abroad — military contracts, USAID grants, embassy operations, and more — not just
          traditional &ldquo;aid.&rdquo;
        </p>

        {topRecipients.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 my-8">
            <div style={{ width: "100%", height: 500 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRecipients} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
                  <XAxis type="number" tickFormatter={fmt} fontSize={12} tick={{ fill: "#6b7280" }} />
                  <YAxis type="category" dataKey="name" width={140} fontSize={11} tick={{ fill: "#374151" }} />
                  <Tooltip formatter={(v) => [fmt(Number(v) || 0), "Amount"]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px" }} />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    {topRecipients.map((_, i) => (
                      <Cell key={i} fill="#6366f1" fillOpacity={1 - i * 0.04} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-2">Source: USAspending.gov, FY2025 cumulative obligations</p>
          </div>
        )}

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Japan, Germany, and South Korea top the list — but that&apos;s mostly <strong>military basing costs</strong>,
          not aid. The real foreign aid story starts further down: Kenya, Ukraine, Jordan, Israel, Haiti, South Africa, Ethiopia.
          These are the countries where USAID, PEPFAR, and humanitarian programs concentrate.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl my-8">
          <p className="text-amber-900 text-lg">
            <span className="font-bold">The dirty secret of &ldquo;foreign aid&rdquo; numbers:</span> Much of the spending in allied
            countries like Japan and Germany is actually the cost of maintaining U.S. military bases abroad — not humanitarian
            assistance. The categories blur by design.
          </p>
        </div>

        {/* Section 2: Categories */}
        <h2 id="categories" className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. What Are We Buying?</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Foreign aid isn&apos;t one thing. It&apos;s a grab bag of programs with very different goals — and very
          different track records:
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 my-8">
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={true}
                  fontSize={11}
                >
                  {categoryBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">Approximate category breakdown of U.S. foreign assistance</p>
        </div>

        <div className="space-y-4 my-8">
          {[
            { cat: "Health (42%)", desc: "HIV/AIDS (PEPFAR), malaria, maternal health, vaccines. The strongest track record — PEPFAR alone has saved an estimated 25 million lives.", color: "bg-green-50 border-green-500" },
            { cat: "Military & Security (22%)", desc: "Arms sales, military training, counterterrorism. Goes to allies like Israel, Egypt, Jordan, Ukraine. The most politically contentious category.", color: "bg-red-50 border-red-500" },
            { cat: "Economic Development (16%)", desc: "Infrastructure, agriculture, trade capacity. Mixed results — some programs show strong ROI, others fund consultants writing reports about other consultants.", color: "bg-blue-50 border-blue-500" },
            { cat: "Humanitarian / Food Aid (12%)", desc: "Emergency disaster response, refugee support, food programs. Hard to argue against feeding people in famines — but chronic dependency is a real concern.", color: "bg-amber-50 border-amber-500" },
          ].map(c => (
            <div key={c.cat} className={`${c.color} border-l-4 p-5 rounded-r-lg`}>
              <h3 className="font-bold text-gray-900">{c.cat}</h3>
              <p className="text-gray-700 text-sm mt-1">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Section 3: USAID Timeline */}
        <h2 id="usaid-timeline" className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. The USAID Explosion — and Collapse</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          USAID&apos;s budget tells the story of an agency that ballooned during COVID, then got caught in the
          crosshairs of budget hawks. From $16.7B in FY2017, it surged to $24.1B in FY2022 — a <strong>44% increase</strong> —
          then crashed back to $12.3B in FY2025, a <strong>26% decline</strong> from where it started.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 my-8">
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usaidTimeline} margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" fontSize={12} tick={{ fill: "#6b7280" }} />
                <YAxis tickFormatter={v => `$${v}B`} fontSize={12} tick={{ fill: "#6b7280" }} />
                <Tooltip formatter={(v) => [`$${v}B`, "USAID Budget"]} />
                <Line type="monotone" dataKey="budget" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: "#6366f1" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">Source: agency-growth.json, USAspending.gov</p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The COVID-era surge included pandemic response funding routed through USAID — vaccines for developing countries,
          emergency health support, food security during lockdowns. Some of it was genuinely lifesaving. Some was the kind of
          emergency spending that governments love because it bypasses normal scrutiny.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;USAID&apos;s budget grew 44% in five years, then crashed 49% from its peak. Nobody planned for either.&rdquo;
          </p>
        </blockquote>

        {/* Section 4: Biggest Awards */}
        <h2 id="biggest-awards" className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. The Biggest Awards</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Where does the USAID money actually land? The top contracts and grants reveal familiar patterns:
          a handful of massive implementing partners — Chemonics, FHI 360, Johns Hopkins, JSI, Abt — that function
          as a permanent foreign aid industrial complex.
        </p>

        {usaid && (
          <div className="space-y-3 my-8">
            <h3 className="font-bold text-gray-900">Top USAID Contracts</h3>
            {usaid.topContracts.slice(0, 5).map((c, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <span className="font-medium text-gray-900 text-sm">{c.recipient}</span>
                  <span className="font-bold text-indigo-700">{fmt(c.amount)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.description}</p>
              </div>
            ))}
            <h3 className="font-bold text-gray-900 mt-6">Top USAID Grants</h3>
            {usaid.topGrants.slice(0, 5).map((g, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <span className="font-medium text-gray-900 text-sm">{g.recipient}</span>
                  <span className="font-bold text-green-700">{fmt(g.amount)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{g.description}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The biggest single contract? <strong>Chemonics International</strong> — a DC-based firm most Americans have never
          heard of — holds a $6.7 billion USAID contract for global health supply chain management. That&apos;s one contract,
          one company, nearly $7 billion.
        </p>

        {/* Section 5: Is it working */}
        <h2 id="is-it-working" className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Is It Working?</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The honest answer: <strong>it depends on which program you&apos;re asking about.</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-green-800 uppercase">What Works</p>
            <p className="text-green-900 font-bold mt-1">PEPFAR / Global Health</p>
            <p className="text-sm text-green-700 mt-2">25M+ lives saved. Malaria deaths down 60% in target countries. Vaccination rates up. Clear, measurable outcomes.</p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-red-800 uppercase">What Doesn&apos;t</p>
            <p className="text-red-900 font-bold mt-1">Nation-Building / Governance</p>
            <p className="text-sm text-red-700 mt-2">Afghanistan ($145B), Iraq, Haiti — decades of &ldquo;capacity building&rdquo; with little to show. Corruption eats the funds.</p>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Health programs work because they have clear metrics (people treated, vaccines delivered, deaths prevented)
          and independent monitoring. Economic development and governance programs fail because they&apos;re measured
          by inputs (money spent, workshops held) rather than outcomes (did the economy grow? did corruption decrease?).
        </p>

        {/* Section 6: Editorial */}
        <h2 id="editorial" className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. The Hard Questions</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Foreign aid is the rare issue where left and right should find common ground. Progressives want it to work
          for humanitarian reasons. Fiscal conservatives want to stop wasting money on programs that don&apos;t. Both
          should demand the same thing: <strong>ruthless accountability.</strong>
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Instead, what we get is a binary debate: &ldquo;cut all foreign aid&rdquo; vs. &ldquo;any cuts are heartless.&rdquo;
          Neither position is serious. The serious questions are:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 mb-6">
          <li>Why does USAID fund &ldquo;democracy promotion&rdquo; in countries that have shown zero interest in democracy for decades?</li>
          <li>Why do the same 10 Beltway contractors capture the majority of USAID contracts, year after year?</li>
          <li>Why can&apos;t we scale the programs that work (PEPFAR, vaccines) and cut the ones that don&apos;t (nation-building)?</li>
          <li>Is security aid to Egypt and Jordan actually buying us security, or just subsidizing autocrats?</li>
        </ul>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          A dollar spent on PEPFAR saves lives. A dollar spent on a governance workshop in a failed state buys a
          consultant a plane ticket. Taxpayers deserve to know which dollars are doing which.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;The question isn&apos;t whether to fund foreign aid. It&apos;s why we keep funding the parts
            that don&apos;t work while pretending we can&apos;t afford the parts that do.&rdquo;
          </p>
        </blockquote>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/foreign-aid" className="text-indigo-700 underline font-medium">
            Explore the full foreign aid data table →
          </Link>
        </p>

        {/* Related Analysis */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/foreign-aid" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Foreign Aid Data Table</p>
              <p className="text-sm text-gray-600 mt-1">Country-by-country spending breakdown</p>
            </Link>
            <Link href="/usaid" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">USAID Deep Dive</p>
              <p className="text-sm text-gray-600 mt-1">Grants, contracts, and top recipients</p>
            </Link>
            <Link href="/doge-reality" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">DOGE Reality Check</p>
              <p className="text-sm text-gray-600 mt-1">Claims vs actual spending data</p>
            </Link>
            <Link href="/global-comparison" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">US vs The World</p>
              <p className="text-sm text-gray-600 mt-1">How American spending compares globally</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
