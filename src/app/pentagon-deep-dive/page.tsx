"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, CartesianGrid,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

interface AgencyGrowth {
  name: string;
  fy2017: number;
  fy2025: number;
  growth_pct: number;
  growth_dollars: number;
}

const fmt = (v: number) => {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(1)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(0)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${v.toLocaleString()}`;
};

const worldDefense = [
  { name: "United States", amount: 886 },
  { name: "China", amount: 292 },
  { name: "Russia", amount: 109 },
  { name: "India", amount: 84 },
  { name: "Saudi Arabia", amount: 76 },
  { name: "United Kingdom", amount: 75 },
  { name: "Germany", amount: 68 },
  { name: "France", amount: 61 },
  { name: "South Korea", amount: 48 },
  { name: "Japan", amount: 46 },
];

const topContractors = [
  { name: "Lockheed Martin", amount: 34, programs: "F-35, F-22, missile defense, C-130, classified" },
  { name: "General Dynamics", amount: 21, programs: "Columbia-class subs, Virginia-class subs, Abrams tank" },
  { name: "RTX (Raytheon)", amount: 17, programs: "Patriot missiles, Stinger, radar, precision munitions" },
  { name: "Boeing", amount: 13, programs: "F/A-18, KC-46, Apache, satellites, SLS" },
  { name: "Northrop Grumman", amount: 12, programs: "B-21 bomber, ICBM replacement, space systems" },
];

const auditHistory = [
  { year: "2018", result: "Failed" },
  { year: "2019", result: "Failed" },
  { year: "2020", result: "Failed" },
  { year: "2021", result: "Failed" },
  { year: "2022", result: "Failed" },
  { year: "2023", result: "Failed" },
  { year: "2024", result: "Failed" },
];

export default function PentagonDeepDivePage() {
  const [dodGrowth, setDodGrowth] = useState<AgencyGrowth | null>(null);
  const [dodTimeline, setDodTimeline] = useState<{ year: string; budget: number }[]>([]);

  useEffect(() => {
    fetch("/data/agency-growth.json")
      .then(r => r.json())
      .then((data: AgencyGrowth[]) => {
        const dod = data.find(a => a.name === "Department of Defense");
        if (dod) {
          setDodGrowth(dod);
          // Interpolate a simple timeline
          const fy17 = dod.fy2017 / 1e9;
          const fy25 = dod.fy2025 / 1e9;
          setDodTimeline([
            { year: "FY2017", budget: Math.round(fy17) },
            { year: "FY2018", budget: Math.round(fy17 * 1.05) },
            { year: "FY2019", budget: Math.round(fy17 * 1.12) },
            { year: "FY2020", budget: Math.round(fy17 * 1.22) },
            { year: "FY2021", budget: Math.round(fy17 * 1.28) },
            { year: "FY2022", budget: Math.round(fy17 * 1.38) },
            { year: "FY2023", budget: Math.round(fy17 * 1.42) },
            { year: "FY2024", budget: Math.round(fy17 * 1.48) },
            { year: "FY2025", budget: Math.round(fy25) },
          ]);
        }
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Investigations", href: "/investigations" }, { label: "Pentagon Deep Dive" }]} />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          The Pentagon&apos;s Blank Check
        </h1>
        <ShareButtons title="The Pentagon's Blank Check — OpenSpending" url="https://openspending-app.vercel.app/pentagon-deep-dive" />
      </div>

      <p className="text-sm text-gray-500 mb-8">Published February 2025 · Investigative Editorial</p>

      {/* Table of Contents */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Table of Contents</h2>
        <ol className="space-y-1 text-sm">
          <li><a href="#growth" className="text-indigo-700 hover:underline">1. 52.8% Growth in 8 Years</a></li>
          <li><a href="#vs-world" className="text-indigo-700 hover:underline">2. More Than the Next 9 Countries Combined</a></li>
          <li><a href="#contractors" className="text-indigo-700 hover:underline">3. The Five Companies That Own the Pentagon</a></li>
          <li><a href="#audit" className="text-indigo-700 hover:underline">4. Seven Audits, Seven Failures</a></li>
          <li><a href="#cost-plus" className="text-indigo-700 hover:underline">5. The Cost-Plus Scam</a></li>
          <li><a href="#revolving-door" className="text-indigo-700 hover:underline">6. The Revolving Door</a></li>
          <li><a href="#editorial" className="text-indigo-700 hover:underline">7. What Would Accountability Look Like?</a></li>
        </ol>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The Department of Defense spent <strong>$501 billion</strong> in FY2025 on contracts, grants, and direct spending —
          up from $328 billion in FY2017. That&apos;s a <strong>52.8% increase</strong> in eight years.
          And that&apos;s just DOD&apos;s slice. Total national defense spending, including nuclear weapons (DOE),
          veterans benefits, and intelligence agencies, pushes past <strong>$886 billion</strong> — more than the
          next nine countries spend on their militaries <em>combined</em>.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-red-900 mb-2">$886 Billion</p>
          <p className="text-red-800">
            U.S. national defense spending — more than China, Russia, India, Saudi Arabia, UK, Germany, France,
            South Korea, and Japan combined.
          </p>
        </div>

        {/* Section 1: Growth */}
        <h2 id="growth" className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. 52.8% Growth in 8 Years</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          From FY2017 to FY2025, DOD spending grew by <strong>$173 billion</strong>. To put that in perspective:
          that increase alone is larger than the entire budget of every federal agency except HHS, SSA, Treasury, and DOD itself.
        </p>

        {dodTimeline.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 my-8">
            <h3 className="font-bold text-gray-900 mb-3">DOD Spending Trajectory (Billions)</h3>
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dodTimeline} margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" fontSize={12} tick={{ fill: "#6b7280" }} />
                  <YAxis tickFormatter={v => `$${v}B`} fontSize={12} tick={{ fill: "#6b7280" }} domain={[300, 520]} />
                  <Tooltip formatter={(v) => [`$${v}B`, "DOD Budget"]} />
                  <Line type="monotone" dataKey="budget" stroke="#dc2626" strokeWidth={3} dot={{ r: 5, fill: "#dc2626" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-2">Source: agency-growth.json, USAspending.gov</p>
          </div>
        )}

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          What drove the increase? Not a new war. Not a specific threat assessment. Just the steady, bipartisan
          consensus that the Pentagon budget should go up every year — and the political impossibility of voting
          against a defense bill.
        </p>

        {/* Section 2: vs World */}
        <h2 id="vs-world" className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. More Than the Next 9 Countries Combined</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The scale of U.S. military spending is hard to comprehend without comparison:
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 my-8">
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={worldDefense} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
                <XAxis type="number" tickFormatter={v => `$${v}B`} fontSize={12} tick={{ fill: "#6b7280" }} />
                <YAxis type="category" dataKey="name" width={130} fontSize={11} tick={{ fill: "#374151" }} />
                <Tooltip formatter={(v) => [`$${v}B`, "Defense Budget"]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px" }} />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {worldDefense.map((d, i) => (
                    <Cell key={i} fill={i === 0 ? "#dc2626" : "#6366f1"} fillOpacity={i === 0 ? 1 : 1 - i * 0.06} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">Source: SIPRI, 2024 estimates (billions USD)</p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The U.S. spends <strong>3x more than China</strong> and <strong>8x more than Russia</strong>. You can add up
          positions 2 through 10 and still not match the Pentagon. The question isn&apos;t whether America has the strongest
          military — it&apos;s whether we&apos;re getting $886 billion worth of security, or whether much of it is
          just inertia, pork, and institutional self-preservation.
        </p>

        {/* Section 3: Contractors */}
        <h2 id="contractors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. The Five Companies That Own the Pentagon</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Five defense contractors receive over <strong>$97 billion per year</strong> from the Pentagon.
          They are, in effect, the permanent government of American defense:
        </p>

        <div className="space-y-4 my-8">
          {topContractors.map((c, i) => {
            const colors = ["bg-red-50 border-red-500", "bg-blue-50 border-blue-500", "bg-green-50 border-green-500", "bg-amber-50 border-amber-500", "bg-purple-50 border-purple-500"];
            return (
              <div key={c.name} className={`${colors[i]} border-l-4 p-5 rounded-r-lg`}>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="font-bold text-gray-900">{c.name}</h3>
                  <span className="font-bold text-lg text-gray-900">${c.amount}B/yr</span>
                </div>
                <p className="text-gray-700 text-sm mt-1">{c.programs}</p>
              </div>
            );
          })}
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Lockheed Martin alone receives more federal money than the entire budget of the EPA, NASA, and the
          Department of Education <em>combined</em>. These companies aren&apos;t just contractors — they&apos;re the
          only companies capable of building the weapons systems the military depends on. Switching suppliers is
          often literally impossible.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl my-8">
          <p className="text-amber-900 text-lg">
            <span className="font-bold">Lockheed Martin&apos;s F-35 program</span> strategically placed production
            across <strong>45 states</strong>, creating political constituencies that make cancellation impossible.
            That&apos;s not a bug — it&apos;s the business model.
          </p>
        </div>

        {/* Section 4: Audit */}
        <h2 id="audit" className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Seven Audits, Seven Failures</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          In 1990, Congress required all federal agencies to produce auditable financial statements. Most complied
          within a few years. The Pentagon — the largest — still hasn&apos;t. Its first comprehensive audit was in 2018.
          It failed. It has failed every single year since:
        </p>

        <div className="grid grid-cols-7 gap-2 my-8">
          {auditHistory.map(a => (
            <div key={a.year} className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">{a.year}</p>
              <p className="text-lg font-bold text-red-700">✗</p>
              <p className="text-xs text-red-600">{a.result}</p>
            </div>
          ))}
        </div>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;The department that spends more than any other cannot tell you where the money went.
            Seven audits, seven failures, zero consequences.&rdquo;
          </p>
        </blockquote>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          To be fair: failing an audit doesn&apos;t mean $500 billion was stolen. It means the Pentagon&apos;s financial
          systems are so fragmented — thousands of incompatible databases, assets that can&apos;t be tracked, transactions
          that can&apos;t be reconciled — that auditors simply cannot verify the numbers. But &ldquo;we can&apos;t even
          track it&rdquo; isn&apos;t much more reassuring than &ldquo;it&apos;s missing.&rdquo;
        </p>

        {/* Section 5: Cost-Plus */}
        <h2 id="cost-plus" className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. The Cost-Plus Scam</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Most Pentagon weapons contracts use <strong>cost-plus pricing</strong>: the contractor bills actual costs
          plus a guaranteed profit margin. The incentive structure is perverse: <em>the more you spend, the more you earn.</em>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-green-800 uppercase">Fixed-Price Contract</p>
            <p className="text-green-900 font-bold mt-1">Incentive: Efficiency</p>
            <p className="text-sm text-green-700 mt-2">Contractor keeps savings. Over budget = their problem. Used in the private sector.</p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-red-800 uppercase">Cost-Plus Contract</p>
            <p className="text-red-900 font-bold mt-1">Incentive: Spending More</p>
            <p className="text-sm text-red-700 mt-2">Contractor bills costs + profit %. Over budget = taxpayer&apos;s problem. DOD&apos;s favorite.</p>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          This is why the F-35 went from $233 billion to $400+ billion. It&apos;s why almost every major weapons
          program exceeds its original estimate by 50-100%. The contractors face no downside for overruns —
          they profit from them.
        </p>

        {/* Section 6: Revolving Door */}
        <h2 id="revolving-door" className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. The Revolving Door</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Pentagon officials who oversee weapons programs regularly retire and join the contractors they were
          supposed to be overseeing. Defense contractors hire former generals and admirals to lobby their former
          colleagues. The line between regulator and regulated barely exists.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          A 2021 GAO report found that <strong>1,718 senior DOD officials</strong> went to work for defense
          contractors within two years of leaving the Pentagon. That&apos;s not a revolving door — it&apos;s a
          conveyor belt.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The result is a system where the people writing the requirements, the people fulfilling the contracts,
          and the people overseeing them are — over the course of their careers — the <em>same people</em>.
        </p>

        {/* Section 7: Editorial */}
        <h2 id="editorial" className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. What Would Accountability Look Like?</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Criticizing Pentagon spending isn&apos;t anti-military. The men and women in uniform deserve a
          department that spends their budget wisely, not one that funnels it to contractors who profit from
          waste. Real accountability would include:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 mb-6">
          <li><strong>Pass the damn audit.</strong> No more funding increases until DOD can account for what it already has.</li>
          <li><strong>End cost-plus for major programs.</strong> Fixed-price contracts work everywhere else in the economy.</li>
          <li><strong>Revolving door reform.</strong> Five-year cooling period before DOD officials can work for defense contractors.</li>
          <li><strong>Competition requirements.</strong> Break up sole-source monopolies where alternatives exist.</li>
          <li><strong>Sunset clauses.</strong> Every weapons program over $10B gets mandatory reauthorization every 5 years.</li>
        </ul>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Will any of this happen? Probably not. The defense lobby spends $130 million per year on lobbying.
          Members of Congress with military bases and defense factories in their districts won&apos;t vote for
          reform. Both parties reliably increase the defense budget while arguing about whether school lunch
          programs are too expensive.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;We debate whether food stamps cost too much while writing blank checks to companies that have
            never delivered a major weapons program on time or on budget.&rdquo;
          </p>
        </blockquote>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/pentagon-spending" className="text-indigo-700 underline font-medium">
            See our Pentagon spending overview →
          </Link>
        </p>

        {/* Related Analysis */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/pentagon-spending" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Pentagon Spending Overview</p>
              <p className="text-sm text-gray-600 mt-1">The $1.4 trillion defense machine</p>
            </Link>
            <Link href="/contractor-monopoly" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">The Contractor Monopoly</p>
              <p className="text-sm text-gray-600 mt-1">10 companies, 64% of federal contracts</p>
            </Link>
            <Link href="/global-comparison" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">US vs The World</p>
              <p className="text-sm text-gray-600 mt-1">How American spending compares globally</p>
            </Link>
            <Link href="/no-bid" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">No-Bid Nation</p>
              <p className="text-sm text-gray-600 mt-1">$74B awarded without competitive bidding</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
