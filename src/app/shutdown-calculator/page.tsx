"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";

const DIRECT_COST_PER_DAY = 400_000_000;
const ECONOMIC_IMPACT_PER_DAY = 300_000_000;
const WORKERS_FURLOUGHED = 800_000;

const historicalShutdowns = [
  {
    year: "2013",
    duration: "16 days",
    days: 16,
    impact: "$24 billion",
    description:
      "Dispute over Affordable Care Act funding. 800,000 federal workers furloughed, national parks closed, CDC stopped disease monitoring.",
  },
  {
    year: "2018–2019",
    duration: "35 days",
    days: 35,
    impact: "$11 billion",
    description:
      "Longest shutdown in U.S. history over border wall funding. 380,000 workers furloughed, 420,000 worked without pay. TSA sickouts caused airport delays nationwide.",
  },
  {
    year: "2023",
    duration: "Averted",
    days: 0,
    impact: "N/A",
    description:
      "Congress passed a last-minute continuing resolution to avoid a shutdown. The threat alone cost planning disruptions across every federal agency.",
  },
];

const delayedServices = [
  {
    icon: "💰",
    label: "Tax Refunds",
    detail: "IRS processing halts — refunds delayed for millions of filers",
  },
  {
    icon: "🛂",
    label: "Passport Processing",
    detail: "New passport applications frozen, renewals delayed weeks",
  },
  {
    icon: "🍔",
    label: "Food Inspections",
    detail: "FDA food safety inspections suspended at processing plants",
  },
  {
    icon: "🏞️",
    label: "National Parks",
    detail: "Parks close or operate without staff, costing local economies millions",
  },
  {
    icon: "📊",
    label: "Economic Data",
    detail: "Census, BLS jobs reports, and GDP data releases halt",
  },
  {
    icon: "🔬",
    label: "Research Grants",
    detail: "NIH, NSF, and other research funding frozen mid-project",
  },
];

export default function ShutdownCalculatorPage() {
  const [daysInput, setDaysInput] = useState("30");

  const days = useMemo(() => {
    const parsed = parseInt(daysInput, 10);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [daysInput]);

  const directCost = days * DIRECT_COST_PER_DAY;
  const economicImpact = days * ECONOMIC_IMPACT_PER_DAY;
  const totalCost = directCost + economicImpact;

  const shareText = `A ${days}-day shutdown would cost taxpayers ${formatDollars(totalCost)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tax-calculator" },
          { label: "Shutdown Calculator" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Government Shutdown Cost Calculator
        </h1>
        <ShareButtons
          title="Government Shutdown Cost Calculator — OpenSpending"
          url="https://openspending-app.vercel.app/shutdown-calculator"
        />
      </div>
      <p className="text-gray-500 text-lg mb-10">
        Government shutdowns cost taxpayers real money. Calculate the price of
        congressional dysfunction — in dollars, delayed services, and economic damage.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Direct Cost</p>
          <p className="text-2xl font-bold text-red-600">$400M/day</p>
          <p className="text-sm text-gray-500 mt-1">
            Government operations halted
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Workers Furloughed</p>
          <p className="text-2xl font-bold text-gray-900">800,000</p>
          <p className="text-sm text-gray-500 mt-1">
            Federal employees sent home
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Longest Shutdown</p>
          <p className="text-2xl font-bold text-indigo-700">35 days</p>
          <p className="text-sm text-gray-500 mt-1">
            December 2018 – January 2019
          </p>
        </div>
      </div>

      {/* Calculator */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Calculate the Cost
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <label
            htmlFor="shutdown-days"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Number of Days
          </label>
          <div className="flex items-center gap-4 mb-6">
            <input
              id="shutdown-days"
              type="number"
              min="1"
              max="365"
              value={daysInput}
              onChange={(e) => setDaysInput(e.target.value)}
              className="w-32 px-4 py-3 text-2xl font-bold text-gray-900 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-center"
            />
            <span className="text-gray-500 text-lg">days</span>
          </div>

          {days > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700 font-medium mb-1">
                  Direct Cost
                </p>
                <p className="text-2xl font-bold text-red-900">
                  {formatDollars(directCost)}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  {days} days &times; $400M/day
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-700 font-medium mb-1">
                  Economic Impact
                </p>
                <p className="text-2xl font-bold text-amber-900">
                  {formatDollars(economicImpact)}
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  Broader GDP damage
                </p>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-indigo-700 font-medium mb-1">
                  Total Cost
                </p>
                <p className="text-2xl font-bold text-indigo-900">
                  {formatDollars(totalCost)}
                </p>
                <p className="text-xs text-indigo-600 mt-1">
                  Direct + economic damage
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Workers Furloughed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ~{WORKERS_FURLOUGHED.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Federal employees without pay
                </p>
              </div>
            </div>
          )}

          {days > 0 && (
            <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-4">
              <p className="text-gray-700 font-medium">
                A {days}-day shutdown would cost taxpayers{" "}
                <span className="text-red-600 font-bold">
                  {formatDollars(totalCost)}
                </span>{" "}
                and furlough {WORKERS_FURLOUGHED.toLocaleString()} federal workers.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Delayed Services */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          What Stops During a Shutdown
        </h2>
        <p className="text-gray-600 mb-6">
          When the government shuts down, it&apos;s not just politicians missing
          paychecks. Essential services that affect millions of Americans grind to a
          halt.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {delayedServices.map((service) => (
            <div
              key={service.label}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{service.icon}</div>
              <p className="font-semibold text-gray-900 mb-1">
                {service.label}
              </p>
              <p className="text-sm text-gray-600">{service.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Historical Shutdowns */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Historical Shutdowns
        </h2>
        <p className="text-gray-600 mb-6">
          Government shutdowns are a uniquely American phenomenon. No other major
          democracy routinely threatens to stop paying its own workers as a
          negotiating tactic.
        </p>
        <div className="space-y-4">
          {historicalShutdowns.map((shutdown) => (
            <div
              key={shutdown.year}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="font-bold text-gray-900 text-lg">
                  {shutdown.year}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {shutdown.duration}
                  </span>
                  {shutdown.impact !== "N/A" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      {shutdown.impact} impact
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm">{shutdown.description}</p>
              {shutdown.days > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{
                        width: `${Math.min((shutdown.days / 35) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {shutdown.days} of 35 days (longest shutdown)
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-14">
        <p className="text-indigo-900 text-lg font-medium italic">
          &quot;The last 35-day shutdown cost more than DOGE claims to have saved
          in its first month.&quot;
        </p>
      </div>

      {/* Editorial Box */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <h3 className="font-bold text-amber-900 mb-2">
          The Bottom Line
        </h3>
        <p className="text-amber-900">
          Government shutdowns cost taxpayers real money while accomplishing
          nothing. They don&apos;t reduce the deficit, don&apos;t cut spending,
          and don&apos;t resolve the policy disagreements that caused them.
          Workers go unpaid, services stop, and the economy takes a hit — then
          Congress eventually passes a deal it could have passed before the
          shutdown started. It&apos;s dysfunction theater, and taxpayers foot the
          bill every time.
        </p>
      </div>

      {/* Shareable Result */}
      {days > 0 && (
        <div className="text-center mb-14">
          <div className="bg-white rounded-xl border border-gray-200 p-6 inline-block max-w-lg">
            <p className="text-gray-900 font-bold text-lg mb-3">
              {shareText}
            </p>
            <p className="text-sm text-gray-500">
              Share this with your representatives.
            </p>
          </div>
        </div>
      )}

      {/* Related Analysis */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/waste"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">The Federal Waste Problem</p>
            <p className="text-sm text-gray-600 mt-1">
              $233–521B lost to fraud annually
            </p>
          </Link>
          <Link
            href="/doge-reality"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">DOGE Reality Check</p>
            <p className="text-sm text-gray-600 mt-1">
              Claims vs actual spending data
            </p>
          </Link>
          <Link
            href="/national-debt"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">National Debt Clock</p>
            <p className="text-sm text-gray-600 mt-1">
              The $36 trillion debt tracker
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
