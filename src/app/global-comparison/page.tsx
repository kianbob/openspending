"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";

interface Country {
  name: string;
  spending_pct_gdp: number;
  healthcare_per_capita: number;
  defense_pct_gdp: number;
  spending_per_capita: number;
}

interface DefenseEntry {
  name: string;
  amount: number;
}

interface USData {
  spending_total: number;
  spending_pct_gdp: number;
  gdp: number;
  population: number;
  spending_per_capita: number;
  healthcare_spending: number;
  healthcare_per_capita: number;
  defense_spending: number;
  defense_per_capita: number;
  defense_pct_gdp: number;
}

interface GlobalData {
  us: USData;
  countries: Country[];
  defense_comparison: DefenseEntry[];
}

export default function GlobalComparisonPage() {
  const [data, setData] = useState<GlobalData | null>(null);

  useEffect(() => {
    fetch("/data/global-comparison.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const countriesByGDP = [...data.countries].sort(
    (a, b) => b.spending_pct_gdp - a.spending_pct_gdp
  );

  const healthcareData = [...data.countries]
    .sort((a, b) => b.healthcare_per_capita - a.healthcare_per_capita);

  const nonUSDefense = data.defense_comparison
    .filter((d) => d.name !== "United States")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Analysis" },
          { label: "US vs The World" },
        ]}
      />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          US vs The World: How American Spending Compares
        </h1>
        <ShareButtons
          title="US vs The World: How American Spending Compares — OpenSpending"
          url="https://www.openspending.us/global-comparison"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Updated: May 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        America spends less than almost every developed nation as a share of GDP
        — but more on healthcare per person than anyone, and more on defense
        than the next 9 countries combined.
      </p>

      {/* Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Spending as % of GDP</p>
          <p className="text-2xl font-bold text-indigo-600">
            {data.us.spending_pct_gdp}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Lowest among developed nations
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Healthcare Per Person</p>
          <p className="text-2xl font-bold text-red-600">
            ${data.us.healthcare_per_capita.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Highest in the world
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Defense Spending</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatDollars(data.us.defense_spending)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            More than next 9 combined
          </p>
        </div>
      </div>

      {/* Government Spending as % of GDP */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Government Spending as % of GDP
        </h2>
        <p className="text-gray-600 mb-6">
          The US government spends {data.us.spending_pct_gdp}% of GDP —
          significantly less than France ({countriesByGDP[0]?.spending_pct_gdp}%),
          Sweden, Germany, and the UK. The narrative that America is a
          &quot;big spending&quot; country doesn&apos;t hold up internationally.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={countriesByGDP}
              margin={{ left: 10, right: 30, top: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                fontSize={11}
                tick={{ fill: "#6b7280" }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tickFormatter={(v) => `${v}%`}
                fontSize={12}
                tick={{ fill: "#6b7280" }}
                domain={[0, 65]}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [`${value}%`, "Spending % of GDP"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="spending_pct_gdp" radius={[4, 4, 0, 0]}>
                {countriesByGDP.map((country, index) => (
                  <Cell
                    key={index}
                    fill={
                      country.name === "United States" ? "#4f46e5" : "#c7d2fe"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Government spending as percentage of GDP. US highlighted in indigo.
          </p>
        </div>
      </section>

      {/* Defense Comparison */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Defense: More Than the Next 9 Combined
        </h2>
        <p className="text-gray-600 mb-6">
          The US spends {formatDollars(data.us.defense_spending)} on defense —
          more than the next 9 largest military spenders combined (
          {formatDollars(nonUSDefense)}). This isn&apos;t just a gap, it&apos;s
          a chasm.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer
            width="100%"
            height={Math.max(data.defense_comparison.length * 50, 400)}
          >
            <BarChart
              data={data.defense_comparison}
              layout="vertical"
              margin={{ left: 20, right: 30, top: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                horizontal={false}
              />
              <XAxis
                type="number"
                tickFormatter={(v) => formatDollars(v)}
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [
                  formatDollars(Number(value) || 0),
                  "Defense Spending",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                {data.defense_comparison.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.name === "United States" ? "#dc2626" : "#fca5a5"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Military spending by country. US spends more than the next 9
            countries combined.
          </p>
        </div>
      </section>

      {/* Healthcare Paradox */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Healthcare Paradox
        </h2>
        <p className="text-gray-600 mb-6">
          We spend more per person on healthcare than any country in the world —
          and still don&apos;t cover everyone. Switzerland is the only country
          that comes close on per-capita spending, and they achieve universal
          coverage.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={healthcareData}
              margin={{ left: 10, right: 30, top: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                fontSize={11}
                tick={{ fill: "#6b7280" }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}K`}
                fontSize={12}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [
                  `$${Number(value).toLocaleString()}`,
                  "Healthcare Per Capita",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="healthcare_per_capita" radius={[4, 4, 0, 0]}>
                {healthcareData.map((country, index) => (
                  <Cell
                    key={index}
                    fill={
                      country.name === "United States" ? "#dc2626" : "#fecaca"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-400 mt-2">
            Government healthcare spending per capita by country. US highlighted
            in red.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="font-bold text-red-900 text-lg mb-2">
              ${data.us.healthcare_per_capita.toLocaleString()} per person
            </p>
            <p className="text-sm text-red-800">
              The US government spends more per person on healthcare than
              countries with universal coverage like the UK ($4,200), Canada
              ($4,500), and Japan ($3,800).
            </p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
            <p className="font-bold text-indigo-900 text-lg mb-2">
              {formatDollars(data.us.healthcare_spending)} total
            </p>
            <p className="text-sm text-indigo-800">
              Federal healthcare spending alone exceeds the entire GDP of most
              countries. And that&apos;s just the government portion — private
              spending adds another $2 trillion.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          The US isn&apos;t a big-spending country by global standards. The
          question isn&apos;t whether we spend too much — it&apos;s whether
          we&apos;re getting <strong>value</strong> for what we spend. We pay
          more per person for healthcare than anyone and still don&apos;t cover
          everyone. We spend more on defense than the next 9 countries combined.
          The issue isn&apos;t the size of government — it&apos;s the return on
          investment.
        </p>
      </div>

      {/* Key Findings */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              America Is Not a Big-Government Country
            </h3>
            <p className="text-gray-600 text-sm">
              At 24.2% of GDP, US government spending is roughly half of France
              (58.3%) and well below Germany (49.3%), Sweden (49.2%), and the UK
              (44.6%). The &quot;big government&quot; narrative doesn&apos;t
              survive international comparison.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              The Defense Premium
            </h3>
            <p className="text-gray-600 text-sm">
              At 3.4% of GDP, US defense spending is high but not extraordinary
              — Saudi Arabia and South Korea spend comparable shares. The
              difference is that 3.4% of the world&apos;s largest economy
              produces {formatDollars(data.us.defense_spending)}, dwarfing every
              other military.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Healthcare: The $5,373 Question
            </h3>
            <p className="text-gray-600 text-sm">
              The US government spends more per person on healthcare than
              countries that provide universal coverage. The problem isn&apos;t
              underfunding — it&apos;s that the money doesn&apos;t go as far.
              Administrative overhead, drug pricing, and fragmented delivery eat
              into every dollar.
            </p>
          </div>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Related Analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/spending-explosion" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">📈</p>
            <p className="font-bold text-gray-900">The Spending Explosion</p>
            <p className="text-sm text-gray-600 mt-1">Federal spending grew 63% since 2017</p>
          </Link>
          <Link href="/interest" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">💣</p>
            <p className="font-bold text-gray-900">The Interest Time Bomb</p>
            <p className="text-sm text-gray-600 mt-1">$952B in interest — larger than the defense budget</p>
          </Link>
          <Link href="/state-dependency" className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <p className="text-2xl mb-2">🗺️</p>
            <p className="font-bold text-gray-900">Federal Dependency by State</p>
            <p className="text-sm text-gray-600 mt-1">Which states take more than they give?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
