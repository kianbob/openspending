import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { SourceCitation } from "@/components/SourceCitation";
import { formatDollars } from "@/lib/format";
import dogeData from "@/../public/data/doge-reality.json";

export const metadata = {
  title: "Is DOGE Actually Saving Money? A Data-Driven Reality Check — OpenSpending",
  description:
    "DOGE claimed $55 billion in savings. Federal spending increased $392 billion. That's 0.81% of the budget. Here's what the data actually shows.",
  keywords: "DOGE savings real, DOGE government savings, has DOGE saved money, DOGE cuts 2025, DOGE spending cuts",
  openGraph: {
    title: "Is DOGE Actually Saving Money? A Data-Driven Reality Check",
    description:
      "DOGE claimed $55B in savings while spending increased $392B. The data tells a different story.",
    type: "article",
  },
};

const { claims, reality, context, program_growth } = dogeData;

export default function DogeSavingsRealityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Investigations", href: "/investigations" }, { label: "DOGE Savings Reality Check" }]} />

      <div className="flex items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Is DOGE Actually Saving Money?
        </h1>
        <ShareButtons title="Is DOGE Actually Saving Money?" />
      </div>

      <p className="text-xl text-gray-600 mb-2 font-medium">A Data-Driven Reality Check</p>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        The Department of Government Efficiency (DOGE) was created with a bold promise: cut{" "}
        <strong>{formatDollars(claims.original_target)}</strong> in government waste. That target was
        later revised to {formatDollars(claims.revised_target)}, then {formatDollars(claims.final_target)}.
        Ultimately, DOGE claimed <strong>{formatDollars(claims.claimed_savings)}</strong> in savings.
        But did federal spending actually go down? Let&apos;s look at the data.
      </p>

      {/* The Big Number */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-10">
        <h2 className="text-2xl font-bold text-red-900 mb-3">The Bottom Line</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-600 uppercase tracking-wide">DOGE Claimed Savings</p>
            <p className="text-3xl font-extrabold text-green-700">{formatDollars(claims.claimed_savings)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 uppercase tracking-wide">Actual Spending Increase</p>
            <p className="text-3xl font-extrabold text-red-700">+{formatDollars(reality.spending_increase)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 uppercase tracking-wide">Savings as % of Budget</p>
            <p className="text-3xl font-extrabold text-gray-700">{context.claimed_savings_pct_of_budget}%</p>
          </div>
        </div>
        <p className="text-gray-700 mt-4 text-center">
          Federal spending went from {formatDollars(reality.fy2024_spending)} in FY2024
          to <strong>{formatDollars(reality.fy2025_spending)}</strong> in FY2025.
        </p>
      </div>

      {/* The Grocery Analogy */}
      <div className="bg-amber-50 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Put It In Perspective</h2>
        <p className="text-gray-800 leading-relaxed text-lg">
          Imagine your monthly grocery bill is <strong>$1,000</strong>. DOGE is like clipping coupons
          to save <strong>$8.10</strong> — while your bill goes up to <strong>$1,390</strong>. You saved
          0.81% and spent 39% more.
        </p>
        <p className="text-gray-700 mt-3">
          That&apos;s not a spending cut. That&apos;s a rounding error on a spending increase.
        </p>
      </div>

      {/* The Moving Target */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Incredible Shrinking Target</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 font-semibold text-gray-900">Promise</th>
                <th className="text-right py-2 font-semibold text-gray-900">Amount</th>
                <th className="text-right py-2 font-semibold text-gray-900">vs. Original</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 text-gray-800">Original Target</td>
                <td className="text-right py-2 font-mono">{formatDollars(claims.original_target)}</td>
                <td className="text-right py-2 text-gray-500">—</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 text-gray-800">Revised Target</td>
                <td className="text-right py-2 font-mono">{formatDollars(claims.revised_target)}</td>
                <td className="text-right py-2 text-red-600">-50%</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 text-gray-800">Final Target</td>
                <td className="text-right py-2 font-mono">{formatDollars(claims.final_target)}</td>
                <td className="text-right py-2 text-red-600">-92.5%</td>
              </tr>
              <tr className="border-b border-gray-200 bg-green-50">
                <td className="py-2 text-gray-800 font-medium">Claimed Savings</td>
                <td className="text-right py-2 font-mono font-bold">{formatDollars(claims.claimed_savings)}</td>
                <td className="text-right py-2 text-red-600 font-bold">-97.3%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          From $2 trillion to $55 billion — the target shrank 97% before DOGE declared victory.
        </p>
      </div>

      {/* Why Spending Keeps Growing */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Spending Keeps Growing (No Matter Who&apos;s in Charge)</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The uncomfortable truth is that <strong>{context.mandatory_spending_pct}%</strong> of the federal budget
          is mandatory spending — programs like Social Security, Medicare, and Medicaid that grow automatically.
          Another <strong>{context.interest_pct}%</strong> goes to interest on the debt. That leaves
          just <strong>{context.discretionary_pct}%</strong> that Congress (or DOGE) can actually cut.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s how the big mandatory programs grew — all on autopilot, all untouched by DOGE:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 font-semibold text-gray-900">Program</th>
                <th className="text-right py-2 font-semibold text-gray-900">FY2020</th>
                <th className="text-right py-2 font-semibold text-gray-900">FY2025</th>
                <th className="text-right py-2 font-semibold text-gray-900">Growth</th>
              </tr>
            </thead>
            <tbody>
              {program_growth.map((p) => (
                <tr key={p.name} className="border-b border-gray-200">
                  <td className="py-2 text-gray-800">{p.name}</td>
                  <td className="text-right py-2 font-mono">{formatDollars(p.fy2020)}</td>
                  <td className="text-right py-2 font-mono">{formatDollars(p.fy2025)}</td>
                  <td className="text-right py-2 text-red-600 font-bold">+{p.growth_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* What DOGE Actually Did */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What DOGE Actually Did</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          DOGE cut roughly <strong>{reality.workforce_cut_pct}%</strong> of the federal workforce, saving
          an estimated {formatDollars(reality.workforce_cut_savings_estimate)} in personnel costs. The Cato Institute —
          a libertarian think tank sympathetic to cutting government — concluded: &ldquo;{reality.cato_finding}.&rdquo;
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Senate found approximately {formatDollars(reality.senate_waste_finding)} in identifiable waste reductions.
          That&apos;s real money — but it&apos;s 0.3% of the federal budget and was dwarfed by automatic
          spending growth in mandatory programs.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The lesson isn&apos;t that efficiency is impossible. It&apos;s that you can&apos;t solve a $6.75 trillion
          spending problem by firing some bureaucrats and cutting foreign aid. The math doesn&apos;t work
          unless you address mandatory spending — and no one wants to touch Social Security or Medicare.
        </p>
      </div>

      {/* CTA */}
      <div className="bg-indigo-50 rounded-xl p-6 mb-10 text-center">
        <p className="text-lg text-gray-900 font-medium mb-3">
          Explore the full interactive DOGE reality check with charts and agency-level data.
        </p>
        <Link
          href="/doge-reality"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
        >
          View Interactive DOGE Dashboard →
        </Link>
      </div>

      {/* Related */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/doge-reality" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">DOGE Reality Dashboard</p>
            <p className="text-sm text-gray-600 mt-1">Interactive charts on DOGE claims vs. actual spending</p>
          </Link>
          <Link href="/spending-explosion" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">The Spending Explosion</p>
            <p className="text-sm text-gray-600 mt-1">Federal spending grew 63% since 2017</p>
          </Link>
          <Link href="/interest" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">The Interest Time Bomb</p>
            <p className="text-sm text-gray-600 mt-1">$1.25T in interest — more than the defense budget</p>
          </Link>
          <Link href="/where-tax-dollars-go" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Where Tax Dollars Go</p>
            <p className="text-sm text-gray-600 mt-1">Every cent of your tax dollar, broken down</p>
          </Link>
        </div>
      </div>

      <SourceCitation />
    </div>
  );
}
