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

// ---------- Data prep ----------

const agencyList: AgencySpendingEntry[] = (agencySpending as AgencySpendingEntry[])
  .filter((a) => a.slug)
  .sort((a, b) => (b.contracts + (b.grants ?? 0)) - (a.contracts + (a.grants ?? 0)));

const trendsByAbbr = agencyTrends as Record<string, AgencyTrendEntry>;

// Map agency code -> trend entry (some trend keys are abbreviations like "DOD", "HHS")
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

type Mode = "agencies" | "contractors";

// ---------- Formatters ----------

const dollarTick = (v: number) => formatDollars(v);

const tooltipFormatter = (value: number | undefined) =>
  value != null ? formatDollarsLong(value) : "";

// ---------- Component ----------

export default function ComparePage() {
  const [mode, setMode] = useState<Mode>("agencies");

  // Read ?mode= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("mode");
    if (m === "contractors") setMode("contractors");
  }, []);
  const [agencyA, setAgencyA] = useState("");
  const [agencyB, setAgencyB] = useState("");
  const [contractorA, setContractorA] = useState("");
  const [contractorB, setContractorB] = useState("");

  // Agency data
  const selAgencyA = useMemo(
    () => agencyList.find((a) => a.code === agencyA),
    [agencyA]
  );
  const selAgencyB = useMemo(
    () => agencyList.find((a) => a.code === agencyB),
    [agencyB]
  );

  const agencyTrendA = useMemo(
    () => (agencyA ? trendsByCode.get(agencyA) : undefined),
    [agencyA]
  );
  const agencyTrendB = useMemo(
    () => (agencyB ? trendsByCode.get(agencyB) : undefined),
    [agencyB]
  );

  const bothHaveTrends = agencyTrendA?.years?.length && agencyTrendB?.years?.length;

  const overlaidTrendData = useMemo(() => {
    if (!bothHaveTrends) return [];
    const map = new Map<number, { fy: number; a?: number; b?: number }>();
    for (const y of agencyTrendA!.years) {
      map.set(y.fy, { fy: y.fy, a: y.budget });
    }
    for (const y of agencyTrendB!.years) {
      const existing = map.get(y.fy);
      if (existing) existing.b = y.budget;
      else map.set(y.fy, { fy: y.fy, b: y.budget });
    }
    return Array.from(map.values()).sort((a, b) => a.fy - b.fy);
  }, [bothHaveTrends, agencyTrendA, agencyTrendB]);

  // Contractor data
  const selContractorA = useMemo(
    () => contractorList.find((c) => c.slug === contractorA),
    [contractorA]
  );
  const selContractorB = useMemo(
    () => contractorList.find((c) => c.slug === contractorB),
    [contractorB]
  );

  const bothContractorsHaveTrends =
    selContractorA?.trends?.length && selContractorB?.trends?.length;

  const contractorTrendData = useMemo(() => {
    if (!bothContractorsHaveTrends) return [];
    const map = new Map<number, { fy: number; a?: number; b?: number }>();
    for (const y of selContractorA!.trends) {
      map.set(y.fy, { fy: y.fy, a: y.amount });
    }
    for (const y of selContractorB!.trends) {
      const existing = map.get(y.fy);
      if (existing) existing.b = y.amount;
      else map.set(y.fy, { fy: y.fy, b: y.amount });
    }
    return Array.from(map.values()).sort((a, b) => a.fy - b.fy);
  }, [bothContractorsHaveTrends, selContractorA, selContractorB]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Compare
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Put two agencies or contractors side by side to see how they stack up.
      </p>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setMode("agencies")}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            mode === "agencies"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Compare Agencies
        </button>
        <button
          onClick={() => setMode("contractors")}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            mode === "contractors"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Compare Contractors
        </button>
      </div>

      {/* ---------- AGENCY MODE ---------- */}
      {mode === "agencies" && (
        <>
          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agency A
              </label>
              <select
                value={agencyA}
                onChange={(e) => setAgencyA(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select an agency…</option>
                {agencyList.map((a) => (
                  <option key={a.code} value={a.code} disabled={a.code === agencyB}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agency B
              </label>
              <select
                value={agencyB}
                onChange={(e) => setAgencyB(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select an agency…</option>
                {agencyList.map((a) => (
                  <option key={a.code} value={a.code} disabled={a.code === agencyA}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selAgencyA && selAgencyB && (
            <>
              {/* Side-by-side stat cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <AgencyStatCard agency={selAgencyA} color="indigo" />
                <AgencyStatCard agency={selAgencyB} color="emerald" />
              </div>

              {/* Comparison table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Metric
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-indigo-700">
                        {selAgencyA.name}
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-emerald-700">
                        {selAgencyB.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <CompareRow
                      label="Contracts"
                      a={selAgencyA.contracts}
                      b={selAgencyB.contracts}
                    />
                    <CompareRow
                      label="Grants"
                      a={selAgencyA.grants ?? 0}
                      b={selAgencyB.grants ?? 0}
                    />
                    <CompareRow
                      label="Total (Contracts + Grants)"
                      a={selAgencyA.contracts + (selAgencyA.grants ?? 0)}
                      b={selAgencyB.contracts + (selAgencyB.grants ?? 0)}
                    />
                    {agencyTrendA?.years?.length ? (
                      <CompareRow
                        label={`FY${agencyTrendA.years[agencyTrendA.years.length - 2]?.fy || ""} Budget Authority`}
                        a={agencyTrendA.years[agencyTrendA.years.length - 2]?.budget ?? 0}
                        b={agencyTrendB?.years?.[agencyTrendB.years.length - 2]?.budget ?? 0}
                      />
                    ) : null}
                    {agencyTrendA?.years?.length ? (
                      <CompareRow
                        label={`FY${agencyTrendA.years[agencyTrendA.years.length - 2]?.fy || ""} Obligations`}
                        a={agencyTrendA.years[agencyTrendA.years.length - 2]?.obligated ?? 0}
                        b={agencyTrendB?.years?.[agencyTrendB.years.length - 2]?.obligated ?? 0}
                      />
                    ) : null}
                    {agencyTrendA?.years?.length ? (
                      <CompareRow
                        label={`FY${agencyTrendA.years[agencyTrendA.years.length - 2]?.fy || ""} Outlays`}
                        a={agencyTrendA.years[agencyTrendA.years.length - 2]?.outlays ?? 0}
                        b={agencyTrendB?.years?.[agencyTrendB.years.length - 2]?.outlays ?? 0}
                      />
                    ) : null}
                  </tbody>
                </table>
              </div>

              {/* Overlaid trend chart */}
              {bothHaveTrends && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Budget Authority Over Time
                  </h2>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={overlaidTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="fy"
                          tickFormatter={(v) => `FY${String(v).slice(2)}`}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          tickFormatter={dollarTick}
                          tick={{ fontSize: 12 }}
                          width={70}
                        />
                        <Tooltip
                          formatter={tooltipFormatter}
                          labelFormatter={(v) => `FY ${v}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="a"
                          name={selAgencyA.name}
                          stroke="#4338ca"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="b"
                          name={selAgencyB.name}
                          stroke="#059669"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Links to detail pages */}
              <div className="flex flex-wrap gap-3">
                {selAgencyA.slug && (
                  <Link
                    href={`/agencies/${selAgencyA.slug}`}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View {selAgencyA.name} detail →
                  </Link>
                )}
                {selAgencyB.slug && (
                  <Link
                    href={`/agencies/${selAgencyB.slug}`}
                    className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    View {selAgencyB.name} detail →
                  </Link>
                )}
              </div>
            </>
          )}

          {(!selAgencyA || !selAgencyB) && (
            <EmptyState message="Select two agencies above to compare them side by side." />
          )}
        </>
      )}

      {/* ---------- CONTRACTOR MODE ---------- */}
      {mode === "contractors" && (
        <>
          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contractor A
              </label>
              <select
                value={contractorA}
                onChange={(e) => setContractorA(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a contractor…</option>
                {contractorList.map((c) => (
                  <option key={c.slug} value={c.slug} disabled={c.slug === contractorB}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contractor B
              </label>
              <select
                value={contractorB}
                onChange={(e) => setContractorB(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a contractor…</option>
                {contractorList.map((c) => (
                  <option key={c.slug} value={c.slug} disabled={c.slug === contractorA}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selContractorA && selContractorB && (
            <>
              {/* Side-by-side stat cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <ContractorStatCard contractor={selContractorA} color="indigo" />
                <ContractorStatCard contractor={selContractorB} color="emerald" />
              </div>

              {/* Comparison table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Metric
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-indigo-700">
                        {selContractorA.name}
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-emerald-700">
                        {selContractorB.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <CompareRow
                      label="Total Contract Value"
                      a={selContractorA.totalAmount}
                      b={selContractorB.totalAmount}
                    />
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Rank</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        #{selContractorA.rank}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        #{selContractorB.rank}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Agencies Served</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {selContractorA.agencies.length}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {selContractorB.agencies.length}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">% of All Contracts</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {((selContractorA.totalAmount / stats.totalContracts) * 100).toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {((selContractorB.totalAmount / stats.totalContracts) * 100).toFixed(2)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">Subsidiaries</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {selContractorA.subsidiaries.length}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {selContractorB.subsidiaries.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Trend chart */}
              {bothContractorsHaveTrends && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Contract Spending Over Time
                  </h2>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={contractorTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="fy"
                          tickFormatter={(v) => `FY${String(v).slice(2)}`}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          tickFormatter={dollarTick}
                          tick={{ fontSize: 12 }}
                          width={70}
                        />
                        <Tooltip
                          formatter={tooltipFormatter}
                          labelFormatter={(v) => `FY ${v}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="a"
                          name={selContractorA.name}
                          stroke="#4338ca"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="b"
                          name={selContractorB.name}
                          stroke="#059669"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Links to detail pages */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/contractors/${selContractorA.slug}`}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View {selContractorA.name} detail →
                </Link>
                <Link
                  href={`/contractors/${selContractorB.slug}`}
                  className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  View {selContractorB.name} detail →
                </Link>
              </div>
            </>
          )}

          {(!selContractorA || !selContractorB) && (
            <EmptyState message="Select two contractors above to compare them side by side." />
          )}
        </>
      )}
    </div>
  );
}

// ---------- Sub-components ----------

function AgencyStatCard({
  agency,
  color,
}: {
  agency: AgencySpendingEntry;
  color: "indigo" | "emerald";
}) {
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
        <Stat
          label="Contract Share"
          value={total > 0 ? `${((agency.contracts / total) * 100).toFixed(1)}%` : "—"}
        />
      </div>
    </div>
  );
}

function ContractorStatCard({
  contractor,
  color,
}: {
  contractor: ContractorEntry;
  color: "indigo" | "emerald";
}) {
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
        <Stat
          label="% of All Contracts"
          value={`${((contractor.totalAmount / stats.totalContracts) * 100).toFixed(2)}%`}
        />
        <Stat label="Subsidiaries" value={String(contractor.subsidiaries.length)} />
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
      <td className="px-4 py-3 text-right font-medium text-gray-900">
        {formatDollarsLong(a)}
      </td>
      <td className="px-4 py-3 text-right font-medium text-gray-900">
        {formatDollarsLong(b)}
      </td>
    </tr>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center">
      <svg
        className="w-12 h-12 text-gray-300 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
