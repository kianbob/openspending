"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { formatDollars, toTitleCase } from "@/lib/format";
import data from "@/../public/data/small-business-top.json";

const chartData = data.map((d) => ({
  name: toTitleCase(d.name).split(",")[0].split(" ").slice(0, 3).join(" "),
  amount: d.amount,
}));

export default function SmallBusinessPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Investigations" }, { label: "Small Business Winners" }]} />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-2">
            Small Business Winners: Who Gets the Contracts?
          </h1>
          <p className="text-gray-500 text-lg max-w-3xl">
            The federal government is required to set aside contracts for small businesses. Here&apos;s who benefits.
          </p>
        </div>
        <ShareButtons title="Small Business Winners: Who Gets the Contracts? — OpenSpending" url="https://openspending-app.vercel.app/small-business" />
      </div>

      {/* Key Insight */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg">
        <p className="text-amber-900 font-semibold text-lg mb-1">Key Insight</p>
        <p className="text-amber-800">
          Atlantic Diving Supply leads with <strong>{formatDollars(data[0].amount)}</strong> — supplying military equipment.
          Many top &quot;small businesses&quot; are subsidiaries of larger companies or Alaska Native Corporations that receive
          sole-source contracts through the SBA 8(a) program.
        </p>
      </div>

      {/* Editorial */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Are These Really &quot;Small&quot; Businesses?</h2>
        <p className="text-gray-700 mb-3">
          The federal small business set-aside program was designed to help mom-and-pop shops compete for government work.
          But the reality looks different. Several of the top recipients are Alaska Native Corporations (ANCs) — entities that
          can receive unlimited sole-source contracts regardless of size, thanks to SBA 8(a) exemptions.
        </p>
        <p className="text-gray-700 mb-3">
          Companies like Akima, Alutiiq, Chenega, and Chugach are subsidiaries of billion-dollar ANCs. Atlantic Diving Supply,
          while technically independent, is a major military supplier doing $6 billion in business — hardly what most people
          picture when they hear &quot;small business.&quot;
        </p>
        <p className="text-gray-700">
          The program channels billions to a small number of sophisticated contractors who know how to navigate the system,
          while truly small businesses struggle to compete.
        </p>
      </div>

      {/* Bar Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top 20 Small Business Recipients</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-4 overflow-x-auto">
          <HorizontalBarChart data={chartData} height={600} color="#f59e0b" labelWidth={180} />
        </div>
      </section>

      {/* Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All 20 Recipients</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-3 px-4 font-semibold text-gray-600">Rank</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Recipient</th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.rank} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-500">{d.rank}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{toTitleCase(d.name)}</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-700">{formatDollars(d.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cross-links */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Related</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/contractors" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <p className="font-semibold text-indigo-600">Top Contractors →</p>
            <p className="text-sm text-gray-500">The 50 largest federal contractors</p>
          </Link>
          <Link href="/no-bid" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <p className="font-semibold text-indigo-600">No-Bid Contracts →</p>
            <p className="text-sm text-gray-500">When competition dies</p>
          </Link>
          <Link href="/contractor-monopoly" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <p className="font-semibold text-indigo-600">Contractor Monopoly →</p>
            <p className="text-sm text-gray-500">10 companies, 64% of contracts</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
