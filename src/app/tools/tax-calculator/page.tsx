"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

/* Federal income tax brackets 2025 (single filer) */
const BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const BRACKETS_MARRIED = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTION = { single: 14600, married: 29200 };

/* Where the money goes (% of total budget) */
const SPENDING_CATEGORIES = [
  { name: "Medicare", pct: 18.1, emoji: "🏥", color: "bg-blue-500", description: "Health insurance for 67M seniors" },
  { name: "Social Security", pct: 16.5, emoji: "👴", color: "bg-green-500", description: "Retirement & disability for 67M Americans" },
  { name: "National Defense", pct: 14.0, emoji: "🛡️", color: "bg-red-500", description: "Military, weapons, intelligence" },
  { name: "Interest on Debt", pct: 12.4, emoji: "💸", color: "bg-gray-500", description: "Servicing $36T national debt — buys nothing" },
  { name: "Health (Medicaid)", pct: 11.3, emoji: "💊", color: "bg-teal-500", description: "Healthcare for low-income Americans" },
  { name: "Income Security", pct: 8.8, emoji: "🏠", color: "bg-amber-500", description: "Food stamps, housing, unemployment" },
  { name: "Veterans Benefits", pct: 3.6, emoji: "🎖️", color: "bg-purple-500", description: "VA healthcare & benefits" },
  { name: "Education", pct: 3.4, emoji: "📚", color: "bg-indigo-500", description: "Federal education programs" },
  { name: "Transportation", pct: 1.7, emoji: "🛣️", color: "bg-orange-500", description: "Highways, airports, transit" },
  { name: "Science & Space", pct: 0.8, emoji: "🚀", color: "bg-cyan-500", description: "NASA, NSF, research" },
  { name: "Foreign Aid", pct: 0.6, emoji: "🌍", color: "bg-lime-500", description: "International assistance" },
  { name: "Everything Else", pct: 8.8, emoji: "📦", color: "bg-gray-400", description: "Agriculture, justice, energy, etc." },
];

function calcTax(income: number, brackets: typeof BRACKETS_SINGLE): number {
  let tax = 0;
  for (const b of brackets) {
    if (income <= b.min) break;
    const taxable = Math.min(income, b.max) - b.min;
    tax += taxable * b.rate;
  }
  return tax;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

function formatCents(n: number): string {
  if (n >= 1) return formatCurrency(n);
  return `${(n * 100).toFixed(1)}¢`;
}

export default function TaxCalculatorPage() {
  const [income, setIncome] = useState<string>("75000");
  const [filing, setFiling] = useState<"single" | "married">("single");

  const results = useMemo(() => {
    const gross = parseFloat(income.replace(/,/g, "")) || 0;
    const deduction = STANDARD_DEDUCTION[filing];
    const taxable = Math.max(0, gross - deduction);
    const brackets = filing === "single" ? BRACKETS_SINGLE : BRACKETS_MARRIED;
    const federalTax = calcTax(taxable, brackets);
    const fica = gross * 0.0765; // Social Security + Medicare tax
    const totalFederal = federalTax + fica;
    const effectiveRate = gross > 0 ? (totalFederal / gross) * 100 : 0;

    const breakdown = SPENDING_CATEGORIES.map((cat) => ({
      ...cat,
      amount: totalFederal * (cat.pct / 100),
      perDay: (totalFederal * (cat.pct / 100)) / 365,
      perMonth: (totalFederal * (cat.pct / 100)) / 12,
    }));

    return { gross, taxable, federalTax, fica, totalFederal, effectiveRate, breakdown };
  }, [income, filing]);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools/tax-calculator" }, { label: "Tax Calculator" }]} />
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
            Where Does YOUR Tax Money Go?
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Enter your income and see exactly how much you pay — and where every dollar goes.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Input Section */}
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                <input
                  type="text"
                  value={income}
                  onChange={(e) => setIncome(e.target.value.replace(/[^0-9,]/g, ""))}
                  className="w-full pl-8 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="75,000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filing Status</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setFiling("single")}
                  className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${filing === "single" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"}`}
                >
                  Single
                </button>
                <button
                  onClick={() => setFiling("married")}
                  className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${filing === "married" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"}`}
                >
                  Married Filing Jointly
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        {results.gross > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                <p className="text-xs font-medium text-gray-600">Federal Income Tax</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.federalTax)}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-xs font-medium text-gray-600">FICA (SS + Medicare)</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.fica)}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                <p className="text-xs font-medium text-gray-600">Total Federal Taxes</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.totalFederal)}</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                <p className="text-xs font-medium text-gray-600">Effective Rate</p>
                <p className="text-xl font-bold text-gray-900">{results.effectiveRate.toFixed(1)}%</p>
              </div>
            </div>

            {/* Spending Breakdown */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-playfair)]">
              Where Your {formatCurrency(results.totalFederal)} Goes
            </h2>
            <p className="text-gray-600 mb-8">Here&apos;s how the government spends every dollar of your federal taxes.</p>

            <div className="space-y-4">
              {results.breakdown.map((cat) => (
                <div key={cat.name} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.emoji}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{cat.name}</h3>
                        <p className="text-xs text-gray-500">{cat.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 font-mono">{formatCurrency(cat.amount)}</p>
                      <p className="text-xs text-gray-500">{cat.pct}% of your taxes</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className={`${cat.color} h-3 rounded-full transition-all`} style={{ width: `${(cat.pct / 18.1) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{formatCurrency(cat.perMonth)}/month</span>
                    <span>{formatCurrency(cat.perDay)}/day</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Insight */}
            <div className="mt-12 bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span>💡</span> The Interest Problem
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Of your {formatCurrency(results.totalFederal)} in federal taxes, <strong>{formatCurrency(results.breakdown[3].amount)}</strong> goes
                to interest on the national debt. That money buys absolutely nothing — no roads, no healthcare,
                no defense. It just services past spending. And it&apos;s growing every year.
              </p>
            </div>

            {/* Daily Breakdown */}
            <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Your Taxes by the Day</h3>
              <p className="text-gray-600 mb-4">
                Every day, you pay <strong>{formatCurrency(results.totalFederal / 365)}</strong> in federal taxes. Here&apos;s how it breaks down:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {results.breakdown.slice(0, 9).map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2 text-sm">
                    <span>{cat.emoji}</span>
                    <span className="text-gray-700">{cat.name}:</span>
                    <span className="font-mono font-bold">{formatCurrency(cat.perDay)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <ShareButtons title={`I pay ${formatCurrency(results.totalFederal)} in federal taxes. Here's where it goes:`} />
            </div>
          </>
        )}

        {/* Methodology */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Methodology</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            This calculator uses 2025 federal income tax brackets and standard deduction.
            FICA taxes include Social Security (6.2%) and Medicare (1.45%). Spending percentages
            are based on FY2025 budget function data from USASpending.gov. This is an estimate —
            your actual tax situation may differ based on deductions, credits, state taxes, and other factors.
            Additional Medicare tax (0.9%) on high earners is not included.
          </p>
        </div>

        {/* Related */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/analysis/where-your-taxes-go" className="block p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900">Where Your Taxes Actually Go</h4>
              <p className="text-sm text-gray-500 mt-1">Full breakdown of $10.1 trillion in federal spending</p>
            </Link>
            <Link href="/analysis/spending-per-capita" className="block p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900">$20,000+ Per American</h4>
              <p className="text-sm text-gray-500 mt-1">Federal spending per person has doubled since 2017</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
