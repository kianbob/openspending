"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

/* Static agency data — avoids JSON import issues in client component */
const AGENCIES = [
  { name: "Department of Health and Human Services", abbr: "HHS", budget: 1836700000000, employees: 80000, slug: "department-of-health-and-human-services", category: "Healthcare" },
  { name: "Social Security Administration", abbr: "SSA", budget: 1667800000000, employees: 60000, slug: "social-security-administration", category: "Benefits" },
  { name: "Department of Defense", abbr: "DOD", budget: 886000000000, employees: 750000, slug: "department-of-defense", category: "Defense" },
  { name: "Department of the Treasury", abbr: "Treasury", budget: 1250800000000, employees: 87000, slug: "department-of-the-treasury", category: "Finance" },
  { name: "Department of Veterans Affairs", abbr: "VA", budget: 362700000000, employees: 412000, slug: "department-of-veterans-affairs", category: "Veterans" },
  { name: "Department of Education", abbr: "ED", budget: 68000000000, employees: 4400, slug: "department-of-education", category: "Education" },
  { name: "Department of Homeland Security", abbr: "DHS", budget: 97500000000, employees: 240000, slug: "department-of-homeland-security", category: "Security" },
  { name: "Department of Transportation", abbr: "DOT", budget: 176800000000, employees: 55000, slug: "department-of-transportation", category: "Infrastructure" },
  { name: "Department of Justice", abbr: "DOJ", budget: 45300000000, employees: 115000, slug: "department-of-justice", category: "Law Enforcement" },
  { name: "Department of Agriculture", abbr: "USDA", budget: 230000000000, employees: 100000, slug: "department-of-agriculture", category: "Agriculture" },
  { name: "Department of Energy", abbr: "DOE", budget: 52000000000, employees: 14000, slug: "department-of-energy", category: "Energy" },
  { name: "Department of State", abbr: "State", budget: 63500000000, employees: 77000, slug: "department-of-state", category: "Diplomacy" },
  { name: "Department of Housing and Urban Development", abbr: "HUD", budget: 73400000000, employees: 8300, slug: "department-of-housing-and-urban-development", category: "Housing" },
  { name: "Department of the Interior", abbr: "DOI", budget: 19300000000, employees: 70000, slug: "department-of-the-interior", category: "Natural Resources" },
  { name: "Department of Labor", abbr: "DOL", budget: 50700000000, employees: 15000, slug: "department-of-labor", category: "Labor" },
  { name: "NASA", abbr: "NASA", budget: 25000000000, employees: 18000, slug: "national-aeronautics-and-space-administration", category: "Science" },
  { name: "Environmental Protection Agency", abbr: "EPA", budget: 12100000000, employees: 15000, slug: "environmental-protection-agency", category: "Environment" },
  { name: "National Science Foundation", abbr: "NSF", budget: 9900000000, employees: 2100, slug: "national-science-foundation", category: "Science" },
  { name: "Small Business Administration", abbr: "SBA", budget: 1500000000, employees: 5000, slug: "small-business-administration", category: "Business" },
  { name: "Agency for International Development", abbr: "USAID", budget: 32000000000, employees: 4000, slug: "agency-for-international-development", category: "Foreign Aid" },
];

function fmt(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1e12) return `$${(abs / 1e12).toFixed(1)}T`;
  if (abs >= 1e9) return `$${(abs / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `$${(abs / 1e6).toFixed(1)}M`;
  return `$${abs.toLocaleString()}`;
}

function fmtNum(n: number): string {
  return n.toLocaleString();
}

function AgencySelector({ label, value, onChange, exclude }: { label: string; value: string; onChange: (v: string) => void; exclude: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
        <option value="">Select an agency...</option>
        {AGENCIES.filter((a) => a.abbr !== exclude).map((a) => (
          <option key={a.abbr} value={a.abbr}>{a.name} ({a.abbr})</option>
        ))}
      </select>
    </div>
  );
}

function ComparisonBar({ labelA, labelB, valueA, valueB, format = "dollars" }: { labelA: string; labelB: string; valueA: number; valueB: number; format?: string }) {
  const max = Math.max(valueA, valueB);
  const pctA = max > 0 ? (valueA / max) * 100 : 0;
  const pctB = max > 0 ? (valueB / max) * 100 : 0;
  const ratio = valueB > 0 ? (valueA / valueB).toFixed(1) : "∞";
  const display = format === "dollars" ? fmt : fmtNum;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{labelA}: <strong className="text-gray-900">{display(valueA)}</strong></span>
        <span className="text-xs text-gray-400">{ratio}x</span>
        <span>{labelB}: <strong className="text-gray-900">{display(valueB)}</strong></span>
      </div>
      <div className="flex gap-1 h-8">
        <div className="bg-indigo-500 rounded-l-lg transition-all flex items-center justify-center text-white text-xs font-bold" style={{ width: `${pctA}%`, minWidth: pctA > 0 ? "2rem" : "0" }}>
          {pctA > 15 && display(valueA)}
        </div>
        <div className="bg-amber-500 rounded-r-lg transition-all flex items-center justify-center text-white text-xs font-bold" style={{ width: `${pctB}%`, minWidth: pctB > 0 ? "2rem" : "0" }}>
          {pctB > 15 && display(valueB)}
        </div>
      </div>
    </div>
  );
}

export default function AgencyComparePage() {
  const [agencyA, setAgencyA] = useState("DOD");
  const [agencyB, setAgencyB] = useState("ED");

  const a = useMemo(() => AGENCIES.find((x) => x.abbr === agencyA), [agencyA]);
  const b = useMemo(() => AGENCIES.find((x) => x.abbr === agencyB), [agencyB]);

  const perEmployee = (agency: typeof AGENCIES[0]) => agency.employees > 0 ? agency.budget / agency.employees : 0;
  const US_POP = 335000000;

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools/agency-compare" }, { label: "Compare Agencies" }]} />
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
            Compare Agency Budgets
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Put two agencies side by side to see how they stack up — budget, employees, spending per capita, and more.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
            <AgencySelector label="Agency A" value={agencyA} onChange={setAgencyA} exclude={agencyB} />
            {a && (
              <div className="mt-4">
                <p className="text-3xl font-bold text-indigo-700">{fmt(a.budget)}</p>
                <p className="text-sm text-gray-600">{a.category} · {fmtNum(a.employees)} employees</p>
              </div>
            )}
          </div>
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <AgencySelector label="Agency B" value={agencyB} onChange={setAgencyB} exclude={agencyA} />
            {b && (
              <div className="mt-4">
                <p className="text-3xl font-bold text-amber-700">{fmt(b.budget)}</p>
                <p className="text-sm text-gray-600">{b.category} · {fmtNum(b.employees)} employees</p>
              </div>
            )}
          </div>
        </div>

        {a && b && (
          <>
            {/* Comparison */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-playfair)]">
              {a.abbr} vs. {b.abbr}
            </h2>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-2">
              <h3 className="font-bold text-gray-900 mb-4">Total Budget</h3>
              <ComparisonBar labelA={a.abbr} labelB={b.abbr} valueA={a.budget} valueB={b.budget} />

              <h3 className="font-bold text-gray-900 mb-4 mt-8">Employees</h3>
              <ComparisonBar labelA={a.abbr} labelB={b.abbr} valueA={a.employees} valueB={b.employees} format="number" />

              <h3 className="font-bold text-gray-900 mb-4 mt-8">Budget per Employee</h3>
              <ComparisonBar labelA={a.abbr} labelB={b.abbr} valueA={perEmployee(a)} valueB={perEmployee(b)} />

              <h3 className="font-bold text-gray-900 mb-4 mt-8">Cost per American</h3>
              <ComparisonBar labelA={a.abbr} labelB={b.abbr} valueA={a.budget / US_POP} valueB={b.budget / US_POP} />
            </div>

            {/* Summary Table */}
            <div className="mt-12 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Metric</th>
                    <th className="py-3 px-4 text-right font-semibold text-indigo-700">{a.abbr}</th>
                    <th className="py-3 px-4 text-right font-semibold text-amber-700">{b.abbr}</th>
                    <th className="py-3 px-4 text-right font-semibold text-gray-500">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Total Budget", vA: a.budget, vB: b.budget, f: fmt },
                    { label: "Employees", vA: a.employees, vB: b.employees, f: fmtNum },
                    { label: "Budget per Employee", vA: perEmployee(a), vB: perEmployee(b), f: fmt },
                    { label: "Cost per American", vA: a.budget / US_POP, vB: b.budget / US_POP, f: fmt },
                    { label: "Cost per Taxpayer", vA: a.budget / 160000000, vB: b.budget / 160000000, f: fmt },
                    { label: "% of Federal Budget", vA: (a.budget / 10127000000000) * 100, vB: (b.budget / 10127000000000) * 100, f: (n: number) => `${n.toFixed(2)}%` },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-3 px-4 font-medium">{row.label}</td>
                      <td className="py-3 px-4 text-right font-mono text-indigo-700">{row.f(row.vA)}</td>
                      <td className="py-3 px-4 text-right font-mono text-amber-700">{row.f(row.vB)}</td>
                      <td className="py-3 px-4 text-right font-mono text-gray-500">{row.vB > 0 ? `${(row.vA / row.vB).toFixed(1)}x` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Insight */}
            <div className="mt-8 bg-indigo-50 rounded-xl p-6 border-l-4 border-indigo-500">
              <h3 className="font-bold text-gray-900">💡 Quick Insight</h3>
              <p className="mt-2 text-sm text-gray-700">
                {a.budget > b.budget
                  ? `${a.name} (${a.abbr}) has a budget ${(a.budget / b.budget).toFixed(1)}x larger than ${b.name} (${b.abbr}). Every American pays ${fmt(a.budget / US_POP)} per year for ${a.abbr} vs ${fmt(b.budget / US_POP)} for ${b.abbr}.`
                  : `${b.name} (${b.abbr}) has a budget ${(b.budget / a.budget).toFixed(1)}x larger than ${a.name} (${a.abbr}). Every American pays ${fmt(b.budget / US_POP)} per year for ${b.abbr} vs ${fmt(a.budget / US_POP)} for ${a.abbr}.`}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[a, b].map((agency) => (
                <Link
                  key={agency.abbr}
                  href={`/agencies/${agency.slug}`}
                  className="inline-block bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
                >
                  View {agency.abbr} Details →
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <ShareButtons title={`${a.abbr} (${fmt(a.budget)}) vs ${b.abbr} (${fmt(b.budget)}) — Compare federal agency budgets on OpenSpending`} />
            </div>
          </>
        )}

        {/* Popular Comparisons */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Comparisons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { a: "DOD", b: "ED", label: "Defense vs Education" },
              { a: "HHS", b: "DOD", label: "HHS vs Defense" },
              { a: "NASA", b: "EPA", label: "NASA vs EPA" },
              { a: "VA", b: "DOD", label: "Veterans vs Defense" },
              { a: "USAID", b: "SBA", label: "Foreign Aid vs Small Business" },
              { a: "DOE", b: "NSF", label: "Energy vs Science Foundation" },
            ].map((comp) => (
              <button
                key={comp.label}
                onClick={() => { setAgencyA(comp.a); setAgencyB(comp.b); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-left p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all text-sm"
              >
                <span className="font-medium text-gray-900">{comp.label}</span>
                <span className="text-gray-400 ml-2">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
