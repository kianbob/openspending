import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { SourceCitation } from "@/components/SourceCitation";
import { formatDollars } from "@/lib/format";
import dollarData from "@/../public/data/dollar-breakdown.json";

export const metadata = {
  title: "Where Do Your Tax Dollars Go in 2025? A Complete Breakdown — OpenSpending",
  description:
    "See exactly where every dollar of federal tax money goes in 2025. Medicare gets 18¢, Social Security 16¢, Defense 14¢, and Interest 12¢ of every dollar. Personalized breakdown included.",
  keywords: "where do my tax dollars go, where do tax dollars go 2025, federal tax breakdown, tax dollar breakdown, federal budget breakdown 2025",
  openGraph: {
    title: "Where Do Your Tax Dollars Go in 2025? A Complete Breakdown",
    description:
      "Medicare gets 18¢ of every dollar. Interest on debt gets 12¢ — more than veterans benefits. See the full breakdown.",
    type: "article",
  },
};

const breakdown = dollarData.breakdown;
const totalBudget = dollarData.totalBudget;
const perTaxpayer = dollarData.perTaxpayer;

// For a $75K earner, effective federal tax rate ~22% = ~$16,500
const sampleIncome = 75000;
const sampleTax = 16500;

const colorMap: Record<string, string> = {
  "Medicare": "#ef4444",
  "Social Security": "#f97316",
  "National Defense": "#3b82f6",
  "Net Interest": "#a855f7",
  "Health": "#10b981",
  "Income Security": "#eab308",
  "General Government": "#6b7280",
  "Veterans Benefits and Services": "#14b8a6",
};

export default function WhereTaxDollarsGoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Investigations", href: "/investigations" }, { label: "Where Tax Dollars Go" }]} />

      <div className="flex items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Where Do Your Tax Dollars Go in 2025?
        </h1>
        <ShareButtons title="Where Do Your Tax Dollars Go in 2025?" />
      </div>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        The federal government spent <strong>{formatDollars(totalBudget)}</strong> in FY2025 —
        that&apos;s <strong>${perTaxpayer.toLocaleString()}</strong> per taxpayer. But where does it
        actually go? Here&apos;s every cent of your tax dollar, broken down.
      </p>

      {/* The Dollar Breakdown */}
      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Every Cent of Your Tax Dollar</h2>
        <div className="space-y-3">
          {breakdown.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="w-20 text-right font-mono font-bold text-lg" style={{ color: colorMap[item.name] || "#6b7280" }}>
                {item.display}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-sm text-gray-500">{formatDollars(item.amount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${item.cents}%`,
                      backgroundColor: colorMap[item.name] || "#6b7280",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Breakdown */}
      <div className="bg-indigo-50 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          If You Earn ${sampleIncome.toLocaleString()}, Here&apos;s Where Your Taxes Go
        </h2>
        <p className="text-gray-600 mb-4">
          At an effective federal tax rate of ~22%, you pay roughly <strong>${sampleTax.toLocaleString()}</strong> in
          federal taxes. Here&apos;s exactly where that money goes:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-indigo-200">
                <th className="text-left py-2 font-semibold text-gray-900">Category</th>
                <th className="text-right py-2 font-semibold text-gray-900">Your Share</th>
                <th className="text-right py-2 font-semibold text-gray-900">Per Dollar</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.slice(0, 10).map((item) => (
                <tr key={item.name} className="border-b border-indigo-100">
                  <td className="py-2 text-gray-800">{item.name}</td>
                  <td className="text-right py-2 font-mono text-gray-900">
                    ${Math.round(sampleTax * parseFloat(item.perDollar)).toLocaleString()}
                  </td>
                  <td className="text-right py-2 text-gray-500">{item.display}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Want your exact number? Try the <Link href="/tax-calculator" className="text-indigo-600 hover:underline">Tax Calculator</Link> or
          see the interactive <Link href="/your-dollar" className="text-indigo-600 hover:underline">Your Dollar</Link> breakdown.
        </p>
      </div>

      {/* Interest > Veterans */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-10">
        <h2 className="text-xl font-bold text-red-900 mb-2">
          Interest on Debt Now Exceeds Veterans Benefits
        </h2>
        <p className="text-gray-800 leading-relaxed">
          The federal government spends <strong>{formatDollars(breakdown.find(b => b.name === "Net Interest")?.amount || 0)}</strong> per
          year just on interest — <strong>12¢ of every dollar</strong>. That&apos;s more than three times
          what we spend on <Link href="/agencies/department-of-veterans-affairs" className="text-indigo-600 hover:underline">veterans
          benefits</Link> ({formatDollars(breakdown.find(b => b.name === "Veterans Benefits and Services")?.amount || 0)}, just 4¢).
          We&apos;re paying more to service past debt than to serve the people who defended the country.
        </p>
        <p className="text-gray-700 mt-3">
          And it&apos;s getting worse. Interest costs have <Link href="/interest" className="text-indigo-600 hover:underline">more than
          doubled since 2020</Link>, now exceeding the entire defense budget.
        </p>
      </div>

      {/* The Big Picture */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Big Picture</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Nearly two-thirds of federal spending is on autopilot. Medicare, Social Security, and interest
          payments are <strong>mandatory</strong> — Congress doesn&apos;t vote on them each year. They just grow.
          The &ldquo;discretionary&rdquo; spending that Congress actually debates — defense, education,
          infrastructure — is only about a quarter of the total.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          This means that most of the political debate about &ldquo;cutting spending&rdquo; focuses on
          the smallest slice of the pie. Even eliminating the entire discretionary budget wouldn&apos;t
          balance the books — mandatory programs and interest alone exceed total tax revenue.
        </p>
        <p className="text-gray-700 leading-relaxed">
          For a deeper dive, see the <Link href="/spending-analysis" className="text-indigo-600 hover:underline">full spending
          analysis</Link> or explore the <Link href="/spending-explosion" className="text-indigo-600 hover:underline">spending
          explosion since 2017</Link>.
        </p>
      </div>

      {/* Related */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/tax-calculator" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Tax Calculator</p>
            <p className="text-sm text-gray-600 mt-1">See exactly where your taxes go based on your income</p>
          </Link>
          <Link href="/your-dollar" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Your Dollar</p>
            <p className="text-sm text-gray-600 mt-1">Interactive breakdown of every federal dollar</p>
          </Link>
          <Link href="/interest" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">The Interest Time Bomb</p>
            <p className="text-sm text-gray-600 mt-1">$1.25T in interest — now larger than the defense budget</p>
          </Link>
          <Link href="/spending-analysis" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Full Spending Analysis</p>
            <p className="text-sm text-gray-600 mt-1">Where $10.1 trillion really goes</p>
          </Link>
        </div>
      </div>

      <SourceCitation />
    </div>
  );
}
