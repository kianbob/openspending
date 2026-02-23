"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// National debt as of ~Feb 2026: ~$36.2 trillion
// Growing at roughly $4.6B per day = ~$53,240 per second
const BASE_DEBT = 36_200_000_000_000;
const BASE_DATE = new Date("2026-02-01T00:00:00Z");
const DEBT_PER_SECOND = 53_240;
const US_POPULATION = 336_000_000;
const US_HOUSEHOLDS = 131_000_000;
const US_TAXPAYERS = 150_000_000;

function formatDebt(n: number): string {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function formatTrillion(n: number): string {
  return "$" + (n / 1e12).toFixed(4) + " trillion";
}

export default function DebtClockPage() {
  const [debt, setDebt] = useState(BASE_DEBT);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const elapsed = (Date.now() - BASE_DATE.getTime()) / 1000;
      setDebt(BASE_DEBT + elapsed * DEBT_PER_SECOND);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const perCitizen = debt / US_POPULATION;
  const perHousehold = debt / US_HOUSEHOLDS;
  const perTaxpayer = debt / US_TAXPAYERS;
  const interestPerYear = 952_000_000_000; // ~$952B FY2025

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-red-950 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Breadcrumbs items={[{ label: "Tools", href: "/compare" }, { label: "Debt Clock" }]} />
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            U.S. National Debt Clock
          </h1>
          <p className="text-red-200 text-lg mb-10">
            Growing by {formatDebt(DEBT_PER_SECOND)} every second
          </p>

          {mounted ? (
            <div className="text-5xl md:text-7xl font-mono font-bold tracking-tight tabular-nums text-white drop-shadow-lg">
              {formatTrillion(debt)}
            </div>
          ) : (
            <div className="text-5xl md:text-7xl font-mono font-bold tracking-tight text-white/30">
              Loading...
            </div>
          )}

          <p className="text-red-300 text-sm mt-4">
            Estimated based on CBO projections &middot; Updates in real time
          </p>
        </div>
      </section>

      {/* Per-person breakdown */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Per Citizen" value={formatDebt(Math.round(perCitizen))} sub={`${(US_POPULATION / 1e6).toFixed(0)}M people`} color="border-red-500" />
          <StatCard label="Per Taxpayer" value={formatDebt(Math.round(perTaxpayer))} sub={`${(US_TAXPAYERS / 1e6).toFixed(0)}M taxpayers`} color="border-orange-500" />
          <StatCard label="Per Household" value={formatDebt(Math.round(perHousehold))} sub={`${(US_HOUSEHOLDS / 1e6).toFixed(0)}M households`} color="border-amber-500" />
          <StatCard label="Interest / Year" value={formatDebt(interestPerYear)} sub="More than defense budget" color="border-yellow-500" />
        </div>
      </section>

      {/* Context */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="font-serif text-xl font-bold text-red-900 mb-3">Put It In Perspective</h2>
          <ul className="space-y-3 text-gray-700">
            <li>💰 If you spent <strong>$1 million per day</strong> since the birth of Christ, you&apos;d still not reach $1 trillion — and the debt is over <strong>36× that</strong>.</li>
            <li>📏 $36 trillion in $1 bills laid end-to-end would stretch to the sun and back <strong>18 times</strong>.</li>
            <li>⏰ Interest payments alone cost <strong>$1.8 billion per day</strong> — that&apos;s $75 million per hour, just to service existing debt.</li>
            <li>📈 The debt has grown <strong>+62%</strong> since 2017 (from $22.3T to $36.2T).</li>
            <li>🏠 Every American household&apos;s share: <strong>{formatDebt(Math.round(perHousehold))}</strong>.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/interest" className="text-sm text-red-700 hover:text-red-900 underline">The Interest Time Bomb →</Link>
          <Link href="/trends" className="text-sm text-red-700 hover:text-red-900 underline">Spending Trends →</Link>
          <Link href="/spending-speed" className="text-sm text-red-700 hover:text-red-900 underline">Spending by the Second →</Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className={`bg-white border-t-4 ${color} rounded-xl shadow-sm p-5`}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{sub}</p>
    </div>
  );
}
