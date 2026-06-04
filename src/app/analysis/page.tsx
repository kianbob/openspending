import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Analysis | OpenSpending",
  description: "In-depth analysis of federal spending: where your taxes go, government waste, the national debt crisis, defense vs education, and more.",
  openGraph: {
    title: "Federal Spending Analysis | OpenSpending",
    description: "Data-driven analysis of how the government spends your money. 10 deep-dive articles on taxes, waste, debt, and more.",
    url: "https://www.openspending.us/analysis",
  },
  alternates: { canonical: "https://www.openspending.us/analysis" },
};

const articles = [
  {
    slug: "where-your-taxes-go",
    title: "Where Your Taxes Actually Go",
    description: "A cent-by-cent breakdown of every dollar Washington spends — Medicare, Social Security, defense, interest, and the rest.",
    category: "Budget Breakdown",
    emoji: "💰",
    stat: "$10.1T total",
    color: "border-indigo-500",
  },
  {
    slug: "national-debt-crisis",
    title: "The $34 Trillion Time Bomb",
    description: "Interest on the debt now costs more than national defense. Here's how we got here — and where we're headed.",
    category: "National Debt",
    emoji: "💣",
    stat: "$1.25T in interest",
    color: "border-red-500",
  },
  {
    slug: "wasteful-spending",
    title: "The $247 Billion Waste Machine",
    description: "Improper payments, fraud, and the GAO's high-risk list — a taxpayer's guide to government waste.",
    category: "Waste & Fraud",
    emoji: "🗑️",
    stat: "$247B/year wasted",
    color: "border-red-500",
  },
  {
    slug: "covid-spending",
    title: "Where Did $6 Trillion in COVID Money Go?",
    description: "The largest spending spree in American history — PPP fraud, EIDL abuse, and trillions with little oversight.",
    category: "COVID Spending",
    emoji: "🦠",
    stat: "$400B+ in fraud",
    color: "border-amber-500",
  },
  {
    slug: "defense-vs-education",
    title: "Defense vs. Education",
    description: "We spend 12x more on the military than the Department of Education. Is that the right balance?",
    category: "Spending Comparison",
    emoji: "⚔️",
    stat: "$886B vs $68B",
    color: "border-blue-500",
  },
  {
    slug: "contractor-spending",
    title: "$700 Billion to Private Contractors",
    description: "Meet the companies that profit most from your tax dollars — defense oligopolies, no-bid deals, and the revolving door.",
    category: "Contractors",
    emoji: "🏢",
    stat: "$779B in contracts",
    color: "border-indigo-500",
  },
  {
    slug: "spending-per-capita",
    title: "$20,000+ Per American",
    description: "Federal spending per person has doubled since 2017. Here's what you're paying for.",
    category: "Per Capita",
    emoji: "👤",
    stat: "$63K per taxpayer",
    color: "border-purple-500",
  },
  {
    slug: "state-federal-funding",
    title: "Which States Get More Than They Pay?",
    description: "Net donor states vs. net recipient states — the surprising geography of federal dependency.",
    category: "State Spending",
    emoji: "🗺️",
    stat: "40 of 50 states take more",
    color: "border-green-500",
  },
  {
    slug: "earmarks-return",
    title: "The Return of Earmarks",
    description: "Congress banned pork barrel spending in 2011. A decade later, it's back with a new name.",
    category: "Congressional Spending",
    emoji: "🐷",
    stat: "$14.6B in pork",
    color: "border-purple-500",
  },
  {
    slug: "agency-budgets-explained",
    title: "How the Federal Budget Actually Works",
    description: "Continuing resolutions, omnibus bills, shutdowns, and why Congress hasn't passed a budget on time since 1997.",
    category: "Budget Process",
    emoji: "📋",
    stat: "28 years of dysfunction",
    color: "border-gray-500",
  },
  {
    slug: "federal-spending-trends-2026",
    title: "Federal Spending Trends 2026",
    description: "A $7.2 trillion budget, record interest payments, and an entitlement crisis nobody wants to talk about.",
    category: "Budget Overview",
    emoji: "📈",
    stat: "$7.2T in FY2026",
    color: "border-indigo-500",
  },
  {
    slug: "government-waste-efficiency-2026",
    title: "Government Waste & Efficiency 2026",
    description: "DOGE promised trillions in cuts. Improper payments hit $281B. The Pentagon still can't pass an audit. A 2026 report card.",
    category: "Waste & Accountability",
    emoji: "🔍",
    stat: "$281B wasted",
    color: "border-red-500",
  },
];

export default function AnalysisIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumbs items={[{ label: "Analysis" }]} />
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
            Federal Spending Analysis
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl">
            Data-driven, taxpayer-focused analysis of how Washington spends your money.
            No spin, no partisanship — just the numbers and what they mean.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1 bg-white/10 text-sm px-3 py-1 rounded-full">📊 12 Deep-Dive Articles</span>
            <span className="inline-flex items-center gap-1 bg-white/10 text-sm px-3 py-1 rounded-full">💰 $7.2T Analyzed</span>
            <span className="inline-flex items-center gap-1 bg-white/10 text-sm px-3 py-1 rounded-full">📅 Updated June 2026</span>
          </div>
        </div>
      </header>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Link
          href="/analysis/where-your-taxes-go"
          className="block bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 hover:shadow-xl hover:border-indigo-300 transition-all group"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Featured Analysis</span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 group-hover:text-indigo-700 transition-colors font-[family-name:var(--font-playfair)]">
            Where Your Taxes Actually Go
          </h2>
          <p className="mt-3 text-gray-600 text-lg max-w-2xl">
            A cent-by-cent breakdown of every dollar Washington spends. Medicare, Social Security,
            defense, interest on the debt — and why most Americans have no idea where their money goes.
          </p>
          <span className="inline-block mt-4 text-indigo-600 font-medium group-hover:underline">
            Read the full analysis →
          </span>
        </Link>
      </section>

      {/* All Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">All Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/analysis/${article.slug}`}
              className={`block bg-white rounded-xl border border-gray-200 border-l-4 ${article.color} p-6 hover:shadow-lg hover:border-indigo-300 transition-all group`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{article.category}</span>
                <span className="text-2xl">{article.emoji}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-700 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
                {article.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{article.stat}</span>
                <span className="text-indigo-600 text-sm font-medium group-hover:underline">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">Interactive Tools</h2>
          <p className="mt-2 text-gray-600">Go beyond reading — explore the data yourself.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tools/tax-calculator" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              🧮 Tax Calculator
            </Link>
            <Link href="/tools/agency-compare" className="inline-flex items-center gap-2 bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
              ⚖️ Compare Agencies
            </Link>
            <Link href="/agencies" className="inline-flex items-center gap-2 bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
              🏛️ Browse All Agencies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
