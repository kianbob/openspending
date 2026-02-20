"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatDollars, formatDollarsLong } from "@/lib/format";
import agencySpending from "@/../public/data/agency-spending.json";
import agencyTrends from "@/../public/data/agency-trends.json";
import contractorDetails from "@/../public/data/contractor-details.json";
import stats from "@/../public/data/stats.json";
import statesData from "@/../public/data/spending-by-state.json";
import budgetFunctionsData from "@/../public/data/budget-functions.json";
import federalPrograms from "@/../public/data/federal-programs.json";

// ---------- Types ----------

type AgencySpendingEntry = {
  name: string;
  code: string;
  slug: string | null;
  contracts: number;
  grants?: number;
};

type AgencyTrendYear = { fy: number; budget: number; obligated: number; outlays: number };
type AgencyTrendEntry = { code: string; abbr: string; name?: string; years: AgencyTrendYear[] };

type ContractorAgency = { name: string; slug: string; amount: number };
type ContractorTrendYear = { fy: number; amount: number };
type ContractorEntry = {
  name: string;
  slug: string;
  totalAmount: number;
  rank: number;
  subsidiaries: string[];
  agencies: ContractorAgency[];
  trends: ContractorTrendYear[];
};

type StateEntry = { name: string; code: string; amount: number };
type BudgetFunctionEntry = {
  code: string;
  name: string;
  years: Record<string, number>;
  rank: number;
  growth_pct: number;
  growth_dollars: number;
};
type ProgramEntry = { name: string; amount: number; code: string; rank: number };

// ---------- Data prep ----------

const agencyList: AgencySpendingEntry[] = (agencySpending as AgencySpendingEntry[])
  .filter((a) => a.slug)
  .sort((a, b) => (b.contracts + (b.grants ?? 0)) - (a.contracts + (a.grants ?? 0)));

const trendsByAbbr = agencyTrends as Record<string, AgencyTrendEntry>;
const trendsByCode = new Map<string, AgencyTrendEntry>();
for (const [key, entry] of Object.entries(trendsByAbbr)) {
  if (entry.years && entry.years.length > 0) {
    trendsByCode.set(entry.abbr || key, entry);
    trendsByCode.set(entry.code, entry);
  }
}

const contractorList: ContractorEntry[] = Object.values(
  contractorDetails as Record<string, ContractorEntry>
).sort((a, b) => a.rank - b.rank);

const stateList: StateEntry[] = (statesData as StateEntry[]).sort((a, b) => b.amount - a.amount);
const budgetFunctionList: BudgetFunctionEntry[] = (budgetFunctionsData as BudgetFunctionEntry[]).sort((a, b) => a.rank - b.rank);
const programList: ProgramEntry[] = (federalPrograms as ProgramEntry[]).sort((a, b) => a.rank - b.rank);

// US state populations (2024 estimates) for per-capita
const statePopulations: Record<string, number> = {
  AL: 5108468, AK: 733406, AZ: 7431344, AR: 3067732, CA: 38965193, CO: 5877610,
  CT: 3617176, DE: 1031890, DC: 678972, FL: 22610726, GA: 11029227, HI: 1435138,
  ID: 1964726, IL: 12549689, IN: 6862199, IA: 3207004, KS: 2940546, KY: 4526154,
  LA: 4573749, ME: 1395722, MD: 6180253, MA: 7001399, MI: 10037261, MN: 5737915,
  MS: 2939690, MO: 6196156, MT: 1132812, NE: 1978379, NV: 3194176, NH: 1402054,
  NJ: 9290841, NM: 2114371, NY: 19571216, NC: 10835491, ND: 783926, OH: 11785935,
  OK: 4053824, OR: 4233358, PA: 12961683, PR: 3205691, RI: 1095962, SC: 5373555,
  SD: 919318, TN: 7126489, TX: 30503301, UT: 3417734, VT: 647464, VA: 8631393,
  WA: 7812880, WV: 1770071, WI: 5893718, WY: 576851, GU: 153836, VI: 87146,
};

type Mode = "agencies" | "contractors" | "states" | "budget" | "programs";

// ---------- Formatters ----------

const dollarTick = (v: number) => formatDollars(v);
const tooltipFormatter = (value: number | undefined) =>
  value != null ? formatDollarsLong(value) : "";

// ---------- Component ----------

export default function ComparePage() {
  const [mode, setMode] = useState<Mode>("agencies");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("mode");
    if (m === "contractors") setMode("contractors");
    else if (m === "states") setMode("states");
    else if (m === "budget") setMode("budget");
    else if (m === "programs") setMode("programs");
  }, []);

  const [agencyA, setAgencyA] = useState("");
  const [agencyB, setAgencyB] = useState("");
  const [contractorA, setContractorA] = useState("");
  const [contractorB, setContractorB] = useState("");
  const [stateA, setStateA] = useState("");
  const [stateB, setStateB] = useState("");
  const [budgetA, setBudgetA] = useState("");
  const [budgetB, setBudgetB] = useState("");
  const [programA, setProgramA] = useState("");
  const [programB, setProgramB] = useState("");

  // Agency data
  const selAgencyA = useMemo(() => agencyList.find((a) => a.code === agencyA), [agencyA]);
  const selAgencyB = useMemo(() => agencyList.find((a) => a.code === agencyB), [agencyB]);
  const agencyTrendA = useMemo(() => (agencyA ? trendsByCode.get(agencyA) : undefined), [agencyA]);
  const agencyTrendB = useMemo(() => (agencyB ? trendsByCode.get(agencyB) : undefined), [agencyB]);
  const bothHaveTrends = agencyTrendA?.years?.length && agencyTrendB?.years?.length;
  const overlaidTrendData = useMemo(() => {
    if (!bothHaveTrends) return [];
    const map = new Map<number, { fy: number; a?: number; b?: number }>();
    for (const y of agencyTrendA!.years) map.set(y.fy, { fy: y.fy, a: y.budget });
    for (const y of agencyTrendB!.years) {
      const existing = map.get(y.fy);
      if (existing) existing.b = y.budget;
      else map.set(y.fy, { fy: y.fy, b: y.budget });
    }
    return Array.from(map.values()).sort((a, b) => a.fy - b.fy);
  }, [bothHaveTrends, agencyTrendA, agencyTrendB]);

  // Contractor data
  const selContractorA = useMemo(() => contractorList.find((c) => c.slug === contractorA), [contractorA]);
  const selContractorB = useMemo(() => contractorList.find((c) => c.slug === contractorB), [contractorB]);
  const bothContractorsHaveTrends = selContractorA?.trends?.length && selContractorB?.trends?.length;
  const contractorTrendData = useMemo(() => {
    if (!bothContractorsHaveTrends) return [];
    const map = new Map<number, { fy: number; a?: number; b?: number }>();
    for (const y of selContractorA!.trends) map.set(y.fy, { fy: y.fy, a: y.amount });
    for (const y of selContractorB!.trends) {
      const existing = map.get(y.fy);
      if (existing) existing.b = y.amount;
      else map.set(y.fy, { fy: y.fy, b: y.amount });
    }
    return Array.from(map.values()).sort((a, b) => a.fy - b.fy);
  }, [bothContractorsHaveTrends, selContractorA, selContractorB]);

  // State data
  const selStateA = useMemo(() => stateList.find((s) => s.code === stateA), [stateA]);
  const selStateB = useMemo(() => stateList.find((s) => s.code === stateB), [stateB]);

  // Budget function data
  const selBudgetA = useMemo(() => budgetFunctionList.find((b) => b.code === budgetA), [budgetA]);
  const selBudgetB = useMemo(() => budgetFunctionList.find((b) => b.code === budgetB), [budgetB]);
  const budgetTrendData = useMemo(() => {
    if (!selBudgetA || !selBudgetB) return [];
    const fyKeys = Object.keys(selBudgetA.years).sort();
    return fyKeys.map((fy) => ({
      fy: fy.replace("fy", "FY"),
      a: selBudgetA.years[fy] ?? 0,
      b: selBudgetB.years[fy] ?? 0,
    }));
  }, [selBudgetA, selBudgetB]);

  // Program data
  const selProgramA = useMemo(() => programList.find((p) => p.code === programA), [programA]);
  const selProgramB = useMemo(() => programList.find((p) => p.code === programB), [programB]);

  const modes: { key: Mode; label: string }[] = [
    { key: "agencies", label: "Agencies" },
    { key: "contractors", label: "Contractors" },
    { key: "states", label: "States" },
    { key: "budget", label: "Budget Categories" },
    { key: "programs", label: "Programs" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Compare
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Put two items side by side to see how they stack up.
      </p>

      {/* Mode Toggle */}
      <div className="flex flex-wrap gap-2 mb-8">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ---------- AGENCY MODE ---------- */}
      {mode === "agencies" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agency A</label>
              <select value={agencyA} onChange={(e) => setAgencyA(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select an agency…</option>
                {agencyList.map((a) => (
                  <option key={a.code} value={a.code} disabled={a.code === agencyB}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agency B</label>
              <select value={agencyB} onChange={(e) => setAgencyB(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select an agency…</option>
                {agencyList.map((a) => (
                  <option key={a.code} value={a.code} disabled={a.code === agencyA}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>
          {selAgencyA && selAgencyB ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <AgencyStatCard agency={selAgencyA} color="indigo" />
                <AgencyStatCard agency={selAgencyB} color="emerald" />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Metric</th>
                      <th className="text-right px-4 py-3 font-semibold text-indigo-700">{selAgencyA.name}</th>
                      <th className="text-right px-4 py-3 font-semibold text-emerald-700">{selAgencyB.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <CompareRow label="Contracts" a={selAgencyA.contracts} b={selAgencyB.contracts} />
                    <CompareRow label="Grants" a={selAgencyA.grants ?? 0} b={selAgencyB.grants ?? 0} />
                    <CompareRow label="Total (Contracts + Grants)" a={selAgencyA.contracts + (selAgencyA.grants ?? 0)} b={selAgencyB.contracts + (selAgencyB.grants ?? 0)} />
                    {agencyTrendA?.years?.length ? (
                      <>
                        <CompareRow label={`FY${agencyTrendA.years[agencyTrendA.years.length - 2]?.fy || ""} Budget Authority`} a={agencyTrendA.years[agencyTrendA.years.length - 2]?.budget ?? 0} b={agencyTrendB?.years?.[agencyTrendB.years.length - 2]?.budget ?? 0} />
                        <CompareRow label={`FY${agencyTrendA.years[agencyTrendA.years.length - 2]?.fy || ""} Obligations`} a={agencyTrendA.years[agencyTrendA.years.length - 2]?.obligated ?? 0} b={agencyTrendB?.years?.[agencyTrendB.years.length - 2]?.obligated ?? 0} />
                        <CompareRow label={`FY${agencyTrendA.years[agencyTrendA.years.length - 2]?.fy || ""} Outlays`} a={agencyTrendA.years[agencyTrendA.years.length - 2]?.outlays ?? 0} b={agencyTrendB?.years?.[agencyTrendB.years.length - 2]?.outlays ?? 0} />
                      </>
                    ) : null}
                  </tbody>
                </table>
              </div>
              {bothHaveTrends && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Authority Over Time</h2>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={overlaidTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="fy" tickFormatter={(v) => `FY${String(v).slice(2)}`} tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={dollarTick} tick={{ fontSize: 12 }} width={70} />
                        <Tooltip formatter={tooltipFormatter} labelFormatter={(v) => `FY ${v}`} />
                        <Legend />
                        <Line type="monotone" dataKey="a" name={selAgencyA.name} stroke="#4338ca" strokeWidth={2} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="b" name={selAgencyB.name} stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                {selAgencyA.slug && <Link href={`/agencies/${selAgencyA.slug}`} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View {selAgencyA.name} detail →</Link>}
                {selAgencyB.slug && <Link href={`/agencies/${selAgencyB.slug}`} className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">View {selAgencyB.name} detail →</Link>}
              </div>
            </>
          ) : (
            <EmptyState message="Select two agencies above to compare them side by side." />
          )}
        </>
      )}

      {/* ---------- CONTRACTOR MODE ---------- */}
      {mode === "contractors" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor A</label>
              <select value={contractorA} onChange={(e) => setContractorA(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select a contractor…</option>
                {contractorList.map((c) => (
                  <option key={c.slug} value={c.slug} disabled={c.slug === contractorB}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor B</label>
              <select value={contractorB} onChange={(e) => setContractorB(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select a contractor…</option>
                {contractorList.map((c) => (
                  <option key={c.slug} value={c.slug} disabled={c.slug === contractorA}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          {selContractorA && selContractorB ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <ContractorStatCard contractor={selContractorA} color="indigo" />
                <ContractorStatCard contractor={selContractorB} color="emerald" />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Metric</th>
                      <th className="text-right px-4 py-3 font-semibold text-indigo-700">{selContractorA.name}</th>
                      <th className="text-right px-4 py-3 font-semibold text-emerald-700">{selContractorB.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <CompareRow label="Total Contract Value" a={selContractorA.totalAmount} b={selContractorB.totalAmount} />
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Rank</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">#{selContractorA.rank}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">#{selContractorB.rank}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Agencies Served</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{selContractorA.agencies.length}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{selContractorB.agencies.length}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">% of All Contracts</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{((selContractorA.totalAmount / stats.totalContracts) * 100).toFixed(2)}%</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{((selContractorB.totalAmount / stats.totalContracts) * 100).toFixed(2)}%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Subsidiaries</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{selContractorA.subsidiaries.length}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{selContractorB.subsidiaries.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {bothContractorsHaveTrends && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Contract Spending Over Time</h2>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={contractorTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="fy" tickFormatter={(v) => `FY${String(v).slice(2)}`} tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={dollarTick} tick={{ fontSize: 12 }} width={70} />
                        <Tooltip formatter={tooltipFormatter} labelFormatter={(v) => `FY ${v}`} />
                        <Legend />
                        <Line type="monotone" dataKey="a" name={selContractorA.name} stroke="#4338ca" strokeWidth={2} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="b" name={selContractorB.name} stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Link href={`/contractors/${selContractorA.slug}`} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View {selContractorA.name} detail →</Link>
                <Link href={`/contractors/${selContractorB.slug}`} className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">View {selContractorB.name} detail →</Link>
              </div>
            </>
          ) : (
            <EmptyState message="Select two contractors above to compare them side by side." />
          )}
        </>
      )}

      {/* ---------- STATE MODE ---------- */}
      {mode === "states" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State A</label>
              <select value={stateA} onChange={(e) => setStateA(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select a state…</option>
                {stateList.map((s) => (
                  <option key={s.code} value={s.code} disabled={s.code === stateB}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State B</label>
              <select value={stateB} onChange={(e) => setStateB(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select a state…</option>
                {stateList.map((s) => (
                  <option key={s.code} value={s.code} disabled={s.code === stateA}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
          {selStateA && selStateB ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <StateStatCard state={selStateA} color="indigo" />
                <StateStatCard state={selStateB} color="emerald" />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Metric</th>
                      <th className="text-right px-4 py-3 font-semibold text-indigo-700">{selStateA.name}</th>
                      <th className="text-right px-4 py-3 font-semibold text-emerald-700">{selStateB.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <CompareRow label="Total Federal Spending" a={selStateA.amount} b={selStateB.amount} />
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Per Capita Spending</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {formatDollarsLong(Math.round(selStateA.amount / (statePopulations[selStateA.code] || 1)))}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {formatDollarsLong(Math.round(selStateB.amount / (statePopulations[selStateB.code] || 1)))}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Population (est.)</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{(statePopulations[selStateA.code] || 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{(statePopulations[selStateB.code] || 0).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Rank by Spending</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">#{stateList.findIndex((s) => s.code === selStateA.code) + 1}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">#{stateList.findIndex((s) => s.code === selStateB.code) + 1}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Visual bar comparison */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Spending Comparison</h2>
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                  {[
                    { label: "Total Spending", a: selStateA.amount, b: selStateB.amount, nameA: selStateA.name, nameB: selStateB.name },
                    { label: "Per Capita", a: selStateA.amount / (statePopulations[selStateA.code] || 1), b: selStateB.amount / (statePopulations[selStateB.code] || 1), nameA: selStateA.name, nameB: selStateB.name },
                  ].map((item) => {
                    const max = Math.max(item.a, item.b);
                    return (
                      <div key={item.label}>
                        <p className="text-sm font-medium text-gray-600 mb-2">{item.label}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-20 truncate">{item.nameA}</span>
                            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(item.a / max) * 100}%` }} />
                            </div>
                            <span className="text-xs font-medium text-gray-700 w-24 text-right">{formatDollars(item.a)}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-20 truncate">{item.nameB}</span>
                            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(item.b / max) * 100}%` }} />
                            </div>
                            <span className="text-xs font-medium text-gray-700 w-24 text-right">{formatDollars(item.b)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/states/${selStateA.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View {selStateA.name} detail →</Link>
                <Link href={`/states/${selStateB.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`} className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">View {selStateB.name} detail →</Link>
              </div>
            </>
          ) : (
            <EmptyState message="Select two states above to compare them side by side." />
          )}
        </>
      )}

      {/* ---------- BUDGET FUNCTION MODE ---------- */}
      {mode === "budget" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget Category A</label>
              <select value={budgetA} onChange={(e) => setBudgetA(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select a category…</option>
                {budgetFunctionList.map((b) => (
                  <option key={b.code} value={b.code} disabled={b.code === budgetB}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget Category B</label>
              <select value={budgetB} onChange={(e) => setBudgetB(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select a category…</option>
                {budgetFunctionList.map((b) => (
                  <option key={b.code} value={b.code} disabled={b.code === budgetA}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>
          {selBudgetA && selBudgetB ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <BudgetStatCard budget={selBudgetA} color="indigo" />
                <BudgetStatCard budget={selBudgetB} color="emerald" />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Metric</th>
                      <th className="text-right px-4 py-3 font-semibold text-indigo-700">{selBudgetA.name}</th>
                      <th className="text-right px-4 py-3 font-semibold text-emerald-700">{selBudgetB.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <CompareRow label="FY2025 Amount" a={selBudgetA.years.fy2025 ?? 0} b={selBudgetB.years.fy2025 ?? 0} />
                    <CompareRow label="FY2017 Amount" a={selBudgetA.years.fy2017 ?? 0} b={selBudgetB.years.fy2017 ?? 0} />
                    <CompareRow label="Growth ($)" a={selBudgetA.growth_dollars} b={selBudgetB.growth_dollars} />
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Growth (%)</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{selBudgetA.growth_pct.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{selBudgetB.growth_pct.toFixed(1)}%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Rank</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">#{selBudgetA.rank}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">#{selBudgetB.rank}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Trend chart */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Spending Trend (FY2017–FY2025)</h2>
                <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={budgetTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="fy" tick={{ fontSize: 12 }} />
                      <YAxis tickFormatter={dollarTick} tick={{ fontSize: 12 }} width={70} />
                      <Tooltip formatter={tooltipFormatter} />
                      <Legend />
                      <Line type="monotone" dataKey="a" name={selBudgetA.name} stroke="#4338ca" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="b" name={selBudgetB.name} stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/budget-functions/${selBudgetA.code}`} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View {selBudgetA.name} detail →</Link>
                <Link href={`/budget-functions/${selBudgetB.code}`} className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">View {selBudgetB.name} detail →</Link>
              </div>
            </>
          ) : (
            <EmptyState message="Select two budget categories above to compare them side by side." />
          )}
        </>
      )}

      {/* ---------- PROGRAM MODE ---------- */}
      {mode === "programs" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program A</label>
              <select value={programA} onChange={(e) => setProgramA(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select a program…</option>
                {programList.map((p) => (
                  <option key={p.code} value={p.code} disabled={p.code === programB}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program B</label>
              <select value={programB} onChange={(e) => setProgramB(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select a program…</option>
                {programList.map((p) => (
                  <option key={p.code} value={p.code} disabled={p.code === programA}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
          {selProgramA && selProgramB ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <ProgramStatCard program={selProgramA} color="indigo" />
                <ProgramStatCard program={selProgramB} color="emerald" />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Metric</th>
                      <th className="text-right px-4 py-3 font-semibold text-indigo-700">{selProgramA.name}</th>
                      <th className="text-right px-4 py-3 font-semibold text-emerald-700">{selProgramB.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <CompareRow label="Amount" a={selProgramA.amount} b={selProgramB.amount} />
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Rank</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">#{selProgramA.rank}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">#{selProgramB.rank}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Program Code</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{selProgramA.code}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{selProgramB.code}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Visual bar comparison */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amount Comparison</h2>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="space-y-3">
                    {(() => {
                      const max = Math.max(selProgramA.amount, selProgramB.amount);
                      return [
                        { name: selProgramA.name, amount: selProgramA.amount, color: "bg-indigo-500" },
                        { name: selProgramB.name, amount: selProgramB.amount, color: "bg-emerald-500" },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-32 truncate">{item.name}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                            <div className={`${item.color} h-full rounded-full flex items-center justify-end pr-2`} style={{ width: `${(item.amount / max) * 100}%` }}>
                              <span className="text-xs font-medium text-white">{formatDollars(item.amount)}</span>
                            </div>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/programs/${selProgramA.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "")}`} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View {selProgramA.name} detail →</Link>
                <Link href={`/programs/${selProgramB.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "")}`} className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">View {selProgramB.name} detail →</Link>
              </div>
            </>
          ) : (
            <EmptyState message="Select two programs above to compare them side by side." />
          )}
        </>
      )}
    </div>
  );
}

// ---------- Sub-components ----------

function AgencyStatCard({ agency, color }: { agency: AgencySpendingEntry; color: "indigo" | "emerald" }) {
  const total = agency.contracts + (agency.grants ?? 0);
  const border = color === "indigo" ? "border-indigo-200" : "border-emerald-200";
  const bg = color === "indigo" ? "bg-indigo-50" : "bg-emerald-50";
  const accent = color === "indigo" ? "text-indigo-700" : "text-emerald-700";
  return (
    <div className={`rounded-xl border ${border} ${bg} p-6`}>
      <h3 className={`font-semibold text-lg ${accent} mb-4`}>{agency.name}</h3>
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Contracts" value={formatDollars(agency.contracts)} />
        <Stat label="Grants" value={formatDollars(agency.grants ?? 0)} />
        <Stat label="Total" value={formatDollars(total)} />
        <Stat label="Contract Share" value={total > 0 ? `${((agency.contracts / total) * 100).toFixed(1)}%` : "—"} />
      </div>
    </div>
  );
}

function ContractorStatCard({ contractor, color }: { contractor: ContractorEntry; color: "indigo" | "emerald" }) {
  const border = color === "indigo" ? "border-indigo-200" : "border-emerald-200";
  const bg = color === "indigo" ? "bg-indigo-50" : "bg-emerald-50";
  const accent = color === "indigo" ? "text-indigo-700" : "text-emerald-700";
  return (
    <div className={`rounded-xl border ${border} ${bg} p-6`}>
      <h3 className={`font-semibold text-lg ${accent} mb-1`}>{contractor.name}</h3>
      <p className="text-xs text-gray-500 mb-4">Rank #{contractor.rank}</p>
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Total Amount" value={formatDollars(contractor.totalAmount)} />
        <Stat label="Agencies" value={String(contractor.agencies.length)} />
        <Stat label="% of All Contracts" value={`${((contractor.totalAmount / stats.totalContracts) * 100).toFixed(2)}%`} />
        <Stat label="Subsidiaries" value={String(contractor.subsidiaries.length)} />
      </div>
    </div>
  );
}

function StateStatCard({ state, color }: { state: StateEntry; color: "indigo" | "emerald" }) {
  const border = color === "indigo" ? "border-indigo-200" : "border-emerald-200";
  const bg = color === "indigo" ? "bg-indigo-50" : "bg-emerald-50";
  const accent = color === "indigo" ? "text-indigo-700" : "text-emerald-700";
  const pop = statePopulations[state.code] || 1;
  const perCapita = state.amount / pop;
  return (
    <div className={`rounded-xl border ${border} ${bg} p-6`}>
      <h3 className={`font-semibold text-lg ${accent} mb-4`}>{state.name}</h3>
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Total Spending" value={formatDollars(state.amount)} />
        <Stat label="Per Capita" value={formatDollars(perCapita)} />
        <Stat label="Population" value={(pop).toLocaleString()} />
        <Stat label="State Code" value={state.code} />
      </div>
    </div>
  );
}

function BudgetStatCard({ budget, color }: { budget: BudgetFunctionEntry; color: "indigo" | "emerald" }) {
  const border = color === "indigo" ? "border-indigo-200" : "border-emerald-200";
  const bg = color === "indigo" ? "bg-indigo-50" : "bg-emerald-50";
  const accent = color === "indigo" ? "text-indigo-700" : "text-emerald-700";
  return (
    <div className={`rounded-xl border ${border} ${bg} p-6`}>
      <h3 className={`font-semibold text-lg ${accent} mb-1`}>{budget.name}</h3>
      <p className="text-xs text-gray-500 mb-4">Rank #{budget.rank}</p>
      <div className="grid grid-cols-2 gap-4">
        <Stat label="FY2025" value={formatDollars(budget.years.fy2025 ?? 0)} />
        <Stat label="FY2017" value={formatDollars(budget.years.fy2017 ?? 0)} />
        <Stat label="Growth" value={`${budget.growth_pct.toFixed(1)}%`} />
        <Stat label="Growth ($)" value={formatDollars(budget.growth_dollars)} />
      </div>
    </div>
  );
}

function ProgramStatCard({ program, color }: { program: ProgramEntry; color: "indigo" | "emerald" }) {
  const border = color === "indigo" ? "border-indigo-200" : "border-emerald-200";
  const bg = color === "indigo" ? "bg-indigo-50" : "bg-emerald-50";
  const accent = color === "indigo" ? "text-indigo-700" : "text-emerald-700";
  return (
    <div className={`rounded-xl border ${border} ${bg} p-6`}>
      <h3 className={`font-semibold text-lg ${accent} mb-1`}>{program.name}</h3>
      <p className="text-xs text-gray-500 mb-4">Rank #{program.rank} • Code: {program.code}</p>
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Amount" value={formatDollars(program.amount)} />
        <Stat label="Rank" value={`#${program.rank}`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

function CompareRow({ label, a, b }: { label: string; a: number; b: number }) {
  return (
    <tr>
      <td className="px-4 py-3 text-gray-600">{label}</td>
      <td className="px-4 py-3 text-right font-medium text-gray-900">{formatDollarsLong(a)}</td>
      <td className="px-4 py-3 text-right font-medium text-gray-900">{formatDollarsLong(b)}</td>
    </tr>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center">
      <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
