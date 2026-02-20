'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// 2024 federal income tax brackets (single filer)
const TAX_BRACKETS = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTION = 14600; // 2024 single filer

// Approximate federal spending breakdown
const SPENDING_CATEGORIES = [
  { name: 'Social Security', pct: 0.21, color: 'bg-indigo-600' },
  { name: 'Medicare', pct: 0.14, color: 'bg-blue-500' },
  { name: 'Defense', pct: 0.13, color: 'bg-red-500' },
  { name: 'Interest on Debt', pct: 0.11, color: 'bg-amber-500' },
  { name: 'Medicaid', pct: 0.09, color: 'bg-green-500' },
  { name: 'Veterans Benefits', pct: 0.05, color: 'bg-purple-500' },
  { name: 'Education', pct: 0.04, color: 'bg-teal-500' },
  { name: 'Transportation', pct: 0.02, color: 'bg-orange-500' },
  { name: 'Science/NASA', pct: 0.01, color: 'bg-cyan-500' },
  { name: 'Other', pct: 0.20, color: 'bg-gray-400' },
];

// Lockheed Martin gets ~28% of DOD contracts
const LOCKHEED_DOD_SHARE = 0.28;

function calculateTax(income: number): number {
  const taxableIncome = Math.max(0, income - STANDARD_DEDUCTION);
  let tax = 0;
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }
  return tax;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatCurrencyWhole(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function TaxCalculatorPage() {
  const [incomeInput, setIncomeInput] = useState('');
  const [copied, setCopied] = useState(false);

  const income = useMemo(() => {
    const cleaned = incomeInput.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  }, [incomeInput]);

  const tax = useMemo(() => calculateTax(income), [income]);

  const breakdown = useMemo(() => {
    return SPENDING_CATEGORIES.map((cat) => ({
      ...cat,
      amount: tax * cat.pct,
    }));
  }, [tax]);

  const defenseDollars = tax * 0.13;
  const lockheedDollars = defenseDollars * LOCKHEED_DOD_SHARE;

  const effectiveRate = income > 0 ? (tax / income) * 100 : 0;

  const handleShare = async () => {
    if (tax <= 0) return;

    const lines = [
      `I earn ${formatCurrencyWhole(income)}/year and pay ${formatCurrency(tax)} in federal income tax.`,
      '',
      'Here\'s where my tax dollars go:',
      ...breakdown.map(
        (cat) => `  ${cat.name}: ${formatCurrency(cat.amount)}`
      ),
      '',
      `I personally paid ${formatCurrency(lockheedDollars)} to Lockheed Martin.`,
      '',
      'Calculate yours: https://www.openspending.us/tax-calculator',
      'via OpenSpending',
    ];

    const text = lines.join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const hasResults = income > 0 && tax > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-indigo-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>Tax Calculator</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Your Tax Dollars
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl">
            Enter your income and see exactly where the federal government spends your money.
            Every dollar tracked.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Income Input */}
        <div className="max-w-xl mx-auto mb-12">
          <label
            htmlFor="income"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Your Annual Income
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">
              $
            </span>
            <input
              id="income"
              type="text"
              inputMode="numeric"
              value={incomeInput}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, '');
                if (raw === '') {
                  setIncomeInput('');
                  return;
                }
                const formatted = parseInt(raw, 10).toLocaleString('en-US');
                setIncomeInput(formatted);
              }}
              placeholder="75,000"
              className="w-full pl-8 pr-4 py-4 text-2xl font-bold text-gray-900 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            2024 brackets, single filer, standard deduction ({formatCurrencyWhole(STANDARD_DEDUCTION)})
          </p>
        </div>

        {hasResults && (
          <>
            {/* Tax Summary */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 md:p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Estimated Federal Tax</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {formatCurrency(tax)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Effective Rate</p>
                    <p className="text-3xl font-bold text-indigo-700 mt-1">
                      {effectiveRate.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 font-medium">Per Month</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatCurrency(tax / 12)}
                  </p>
                </div>
              </div>
            </div>

            {/* Spending Breakdown */}
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Where Your Tax Dollars Go
              </h2>

              {/* Stacked bar */}
              <div className="flex h-8 rounded-lg overflow-hidden mb-8">
                {breakdown.map((cat) => (
                  <div
                    key={cat.name}
                    className={`${cat.color} relative group`}
                    style={{ width: `${cat.pct * 100}%` }}
                    title={`${cat.name}: ${formatCurrency(cat.amount)}`}
                  />
                ))}
              </div>

              {/* Category cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {breakdown.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className={`w-3 h-10 rounded-full ${cat.color} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                      <p className="text-xs text-gray-500">{(cat.pct * 100).toFixed(0)}% of spending</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900 whitespace-nowrap">
                      {formatCurrency(cat.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lockheed Martin callout */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6 md:p-8">
                <p className="text-sm font-semibold text-red-800 uppercase tracking-widest mb-2">
                  Your Defense Dollars
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  You personally paid{' '}
                  <span className="text-red-700">{formatCurrency(lockheedDollars)}</span>{' '}
                  to Lockheed Martin
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lockheed Martin receives roughly 28% of all Department of Defense
                  contract dollars. Of your {formatCurrency(defenseDollars)} in defense
                  spending, {formatCurrency(lockheedDollars)} flows to a single company
                  that reported $71.3 billion in revenue last year.
                </p>
                <Link
                  href="/contractors/lockheed-martin-corporation"
                  className="inline-block mt-4 text-red-700 font-medium text-sm hover:underline"
                >
                  See Lockheed Martin profile →
                </Link>
              </div>
            </div>

            {/* Share */}
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-700 text-white font-semibold rounded-xl hover:bg-indigo-800 transition-colors text-lg"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Your Results
                  </>
                )}
              </button>
              <p className="text-sm text-gray-400 mt-3">
                Copies a shareable text breakdown to your clipboard
              </p>
            </div>

            {/* Bracket detail */}
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                How Your Tax Is Calculated
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Bracket</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-600">Rate</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-600">Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TAX_BRACKETS.map((bracket) => {
                      const taxableIncome = Math.max(0, income - STANDARD_DEDUCTION);
                      if (taxableIncome <= bracket.min) return null;
                      const taxableInBracket =
                        Math.min(taxableIncome, bracket.max) - bracket.min;
                      const bracketTax = taxableInBracket * bracket.rate;
                      return (
                        <tr
                          key={bracket.min}
                          className="border-b border-gray-100"
                        >
                          <td className="px-4 py-3 text-gray-700">
                            {formatCurrencyWhole(bracket.min)}
                            {bracket.max < Infinity
                              ? ` – ${formatCurrencyWhole(bracket.max)}`
                              : '+'}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-700">
                            {(bracket.rate * 100).toFixed(0)}%
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">
                            {formatCurrency(bracketTax)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900" colSpan={2}>
                        Total
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">
                        {formatCurrency(tax)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                This is an estimate for federal income tax only (2024 brackets, single filer,
                standard deduction). Does not include FICA, state, or local taxes.
              </p>
            </div>

            {/* CTA */}
            <div className="max-w-3xl mx-auto text-center pb-4">
              <p className="text-gray-500 mb-4">
                Want to see where ALL federal spending goes?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contractors"
                  className="px-6 py-3 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-colors"
                >
                  Top Contractors
                </Link>
                <Link
                  href="/agencies"
                  className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors"
                >
                  Browse Agencies
                </Link>
              </div>
            </div>
          </>
        )}

        {!hasResults && income > 0 && (
          <div className="max-w-xl mx-auto text-center py-8">
            <p className="text-gray-500">
              With the standard deduction of {formatCurrencyWhole(STANDARD_DEDUCTION)},
              your taxable income is $0. No federal income tax owed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
