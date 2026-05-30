import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TopContractorsChart } from "@/components/charts/TopContractorsChart";
import { formatDollars, formatPercent } from "@/lib/format";
import stats from "@/../public/data/stats.json";
import contractors from "@/../public/data/top-contractors-deduped.json";
import agencies from "@/../public/data/agencies.json";
import stateDetailsData from "@/../public/data/state-details.json";

export const metadata: Metadata = {
  title: "US Federal Spending — $11.2 Trillion Breakdown",
  description: "97 agencies. 50 top government contractors. $233–521B wasted yearly. Search contracts, track grants, and see exactly where your tax dollars end up.",
  openGraph: {
    title: "Where Does $11.2 Trillion in Federal Spending Go? | OpenSpending",
    description: "97 agencies. 50 top government contractors. $233–521B wasted yearly. Search contracts, track grants, and see exactly where your tax dollars end up.",
    url: "https://www.openspending.us",
  },
  twitter: {
    card: "summary_large_image",
    title: "Where Does $11.2 Trillion in Federal Spending Go? | OpenSpending",
    description: "97 agencies. 50 top government contractors. $233–521B wasted yearly. Search contracts, track grants, and see exactly where your tax dollars end up.",
  },
};

const topContractors = contractors.slice(0, 10);
const topAgencies = agencies.slice(0, 5);
const top10Total = topContractors.reduce((sum, c) => sum + c.amount, 0);
const contractorPct = (top10Total / stats.totalContracts) * 100;

const topStates = Object.values(stateDetailsData as Record<string, { name: string; slug: string; totalAmount: number; rank: number; pctOfTotal: number; perCapita: number | null }>)
  .sort((a, b) => b.totalAmount - a.totalAmount)
  .slice(0, 5);

const statCards = [
  { label: "Total Federal Budget", value: formatDollars(stats.totalBudget), sub: `FY${stats.fiscalYear}`, href: "/spending-analysis" },
  { label: "Federal Contracts", value: formatDollars(stats.totalContracts), sub: "Awarded this year", href: "/contractors" },
  { label: "Federal Grants", value: formatDollars(stats.totalGrants), sub: "Distributed to recipients", href: "/grants" },
  { label: "Federal Agencies", value: String(agencies.length), sub: "Tracked on this site", href: "/agencies" },
];

const bigPictureCards = [
  {
    title: `10 Companies, ${formatDollars(top10Total)}`,
    description: "A handful of defense contractors capture the majority of federal contract dollars.",
    href: "/contractors",
    borderColor: "border-indigo-500",
  },
  {
    title: "No-Bid Nation: $74B Without Competition",
    description: "One in three large contracts is awarded without competitive bidding.",
    href: "/no-bid",
    borderColor: "border-indigo-500",
  },
  {
    title: "USAID: Budget Tripled, Then Gutted",
    description: "From $15B to $50B in six years. Now DOGE is cutting it back.",
    href: "/usaid",
    borderColor: "border-indigo-500",
  },
];

const interactiveTools = [
  { emoji: "\u{1F9EE}", title: "Tax Calculator", href: "/tax-calculator", description: "See exactly where your federal taxes go" },
  { emoji: "\u{1F50C}", title: "Shutdown Calculator", href: "/shutdown-calculator", description: "What happens when the government shuts down?" },
  { emoji: "\u2696\uFE0F", title: "Compare", href: "/compare", description: "Compare agencies, contractors, and states side by side" },
  { emoji: "\u{1F50D}", title: "Search", href: "/search", description: "Search all federal spending data" },
  { emoji: "\u{1F4E5}", title: "Downloads", href: "/downloads", description: "Download raw data and spreadsheets" },
];

const deepDiveCards = [
  { emoji: "\u{1F50D}", title: "DOGE Reality Check", href: "/doge-reality", description: "What DOGE actually cut vs. what they claimed" },
  { emoji: "\u{1F5FA}\uFE0F", title: "State Dependency", href: "/state-dependency", description: "Which states take more than they give?" },
  { emoji: "\u{1F4A3}", title: "Interest Time Bomb", href: "/interest", description: "$952B in interest \u2014 now larger than defense" },
  { emoji: "\u{1F3E2}", title: "Contractor Monopoly", href: "/contractor-monopoly", description: "10 companies hold 64% of all contracts" },
  { emoji: "✈️", title: "Pentagon Deep Dive", href: "/pentagon-deep-dive", description: "The Pentagon's blank check — never audited" },
  { emoji: "🌍", title: "Foreign Aid Deep Dive", href: "/foreign-aid-deep-dive", description: "Where does foreign aid actually go?" },
  { emoji: "🤝", title: "Welfare Queens", href: "/welfare-queens", description: "Red states, blue states — who really depends on federal money?" },
  { emoji: "\u{1F4B0}", title: "Your Dollar", href: "/your-tax-bill", description: "Personalized breakdown of your tax dollars" },
];


export default function HomePage() {
  return (
    <div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "OpenSpending",
        "url": "https://www.openspending.us",
        "description": "Track $11.2 trillion in federal spending"
      }} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-2xl">
              <p className="text-indigo-300 font-medium text-sm uppercase tracking-widest mb-3">
                Your tax dollars, tracked
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Follow the Money.
                <br />
                <span className="text-indigo-200">
                  {formatDollars(stats.totalBudget)}
                </span>{" "}
                in Federal Spending.
              </h1>
              <p className="text-lg text-indigo-100 mb-6">
                Independent, data-driven analysis of how the federal government
                spends your money. Every contract. Every grant. Every agency.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <Link
                  href="/tax-calculator"
                  className="px-6 py-3 bg-white text-indigo-800 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Where Do Your Tax Dollars Go? →
                </Link>
                <Link
                  href="/agencies"
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg border border-indigo-400 hover:bg-indigo-500 transition-colors"
                >
                  Explore Agencies
                </Link>
              </div>
              <p className="text-xs text-indigo-300 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 inline flex-shrink-0">
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
                No ads. No government funding. Built entirely on public data. · Data current as of FY2025 · Updated May 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="block bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:border-indigo-300 transition-all"
            >
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Data at a Glance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-indigo-50 rounded-lg px-6 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/agencies" className="text-indigo-700 hover:text-indigo-900 font-medium">
            40 agency profiles
          </Link>
          <span className="text-indigo-300 hidden sm:inline">|</span>
          <Link href="/contractors" className="text-indigo-700 hover:text-indigo-900 font-medium">
            40 contractor profiles
          </Link>
          <span className="text-indigo-300 hidden sm:inline">|</span>
          <Link href="/states" className="text-indigo-700 hover:text-indigo-900 font-medium">
            54 state profiles
          </Link>
          <span className="text-indigo-300 hidden sm:inline">|</span>
          <Link href="/investigations" className="text-indigo-700 hover:text-indigo-900 font-medium">
            21+ investigations
          </Link>
        </div>
      </section>

      {/* Tax Calculator CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Link
          href="/tax-calculator"
          className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 rounded-xl p-8 md:p-10 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-800 transition-all group"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                Where Do YOUR Tax Dollars Go?
              </h2>
              <p className="text-purple-100 text-base md:text-lg">
                Enter your income and see exactly how much you pay to Lockheed Martin, Social Security, and more
              </p>
            </div>
            <span className="inline-flex items-center px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg group-hover:bg-indigo-50 transition-colors whitespace-nowrap">
              Try the Calculator →
            </span>
          </div>
        </Link>
      </section>

      {/* Fraud Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Link
          href="/waste"
          className="block bg-gradient-to-r from-red-700 to-red-600 rounded-xl p-6 md:p-8 hover:from-red-800 hover:to-red-700 transition-all group"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-red-200 text-sm font-medium uppercase tracking-widest mb-1">
                Government Accountability Office
              </p>
              <p className="text-white text-xl md:text-2xl font-bold">
                The government loses $233–521 billion per year to fraud.
              </p>
              <p className="text-red-100 text-sm mt-1">
                3–7% of all federal spending. That is more than the entire education budget.
              </p>
            </div>
            <span className="text-white font-semibold text-sm whitespace-nowrap group-hover:underline">
              Read the full breakdown →
            </span>
          </div>
        </Link>
      </section>

      {/* The Big Picture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          The Big Picture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bigPictureCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`block bg-white rounded-lg border border-gray-200 border-l-4 ${card.borderColor} p-6 hover:shadow-lg transition-shadow group`}
            >
              <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {card.description}
              </p>
              <span className="text-indigo-600 text-sm font-medium group-hover:underline">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Analysis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              📊 Analysis &amp; Deep Dives
            </h2>
            <p className="text-gray-500 mt-2">
              Data-driven analysis of where your tax dollars go — and where they&apos;re wasted.
            </p>
          </div>
          <Link href="/analysis" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-4 md:mt-0">
            View all analysis →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { slug: "where-your-taxes-go", emoji: "💰", title: "Where Your Taxes Go", stat: "$10.1T", desc: "Cent-by-cent breakdown of every federal dollar", color: "border-indigo-500" },
            { slug: "national-debt-crisis", emoji: "💣", title: "The $34T Time Bomb", stat: "$1.25T interest", desc: "Interest on the debt now exceeds the defense budget", color: "border-red-500" },
            { slug: "wasteful-spending", emoji: "🗑️", title: "$247B Waste Machine", stat: "1% recovered", desc: "Improper payments, fraud, and zero accountability", color: "border-red-500" },
            { slug: "covid-spending", emoji: "🦠", title: "$6T COVID Spending", stat: "$400B+ fraud", desc: "PPP fraud, EIDL abuse, and trillions in waste", color: "border-amber-500" },
            { slug: "contractor-spending", emoji: "🏢", title: "$700B to Contractors", stat: "5 companies", desc: "Defense oligopoly, no-bid deals, revolving door", color: "border-indigo-500" },
            { slug: "spending-per-capita", emoji: "👤", title: "$20K+ Per American", stat: "+110% since 2017", desc: "Federal spending per person has doubled", color: "border-purple-500" },
          ].map((a) => (
            <Link key={a.slug} href={`/analysis/${a.slug}`} className={`block bg-white rounded-xl border border-gray-200 border-l-4 ${a.color} p-6 hover:shadow-lg transition-all group`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{a.emoji}</span>
                <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{a.stat}</span>
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-700">{a.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{a.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Top 10 Contractors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Top 10 Federal Contractors
            </h2>
            <p className="text-gray-500 mt-2">
              These 10 companies receive{" "}
              <span className="font-semibold text-indigo-700">
                {formatDollars(top10Total)}
              </span>{" "}
              — {formatPercent(contractorPct)} of all federal contracts.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <TopContractorsChart data={topContractors} />
        </div>
        <div className="mt-4">
          <Link
            href="/contractors"
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
          >
            View all contractors →
          </Link>
        </div>
      </section>

      {/* Top 5 Agencies */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Biggest Spenders: Top Agencies
              </h2>
              <p className="text-gray-500 mt-2">
                By budget authority — who controls the most taxpayer money?
              </p>
            </div>
            <Link
              href="/agencies"
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-4 md:mt-0"
            >
              View all {stats.agencyCount} agencies →
            </Link>
          </div>
          <div className="grid gap-3">
            {topAgencies.map((agency, i) => (
              <Link
                key={agency.code}
                href={`/agencies/${agency.slug}`}
                className="block bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-lg hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-indigo-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {agency.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {agency.abbreviation} &middot;{" "}
                      {formatPercent(agency.pctOfTotal)} of total budget
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    {formatDollars(agency.budgetAuthority)}
                  </p>
                  <p className="text-xs text-gray-400">Budget Authority</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top States by Federal Spending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Top States by Federal Spending
            </h2>
            <p className="text-gray-500 mt-2">
              Where do federal contract dollars flow?
            </p>
          </div>
          <Link
            href="/states"
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-4 md:mt-0"
          >
            View all states →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {topStates.map((state, i) => (
            <Link
              key={state.slug}
              href={`/states/${state.slug}`}
              className="block bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg hover:border-indigo-300 transition-all group"
            >
              <span className="text-sm font-bold text-indigo-400">#{i + 1}</span>
              <h3 className="font-semibold text-gray-900 mt-1">{state.name}</h3>
              <p className="text-xl font-bold text-gray-900 mt-2">
                {formatDollars(state.totalAmount)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {state.pctOfTotal}% of all contracts
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Interactive Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {interactiveTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block bg-white rounded-xl shadow border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-300 transition-all group"
            >
              <span className="text-2xl">{tool.emoji}</span>
              <h3 className="font-bold text-gray-900 mt-3 group-hover:text-indigo-700 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Deep Dives & Investigations */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Deep Dives &amp; Investigations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {deepDiveCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="block bg-white rounded-xl shadow border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-300 transition-all group"
              >
                <span className="text-2xl">{card.emoji}</span>
                <h3 className="font-bold text-gray-900 mt-3 group-hover:text-indigo-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/investigations" className="text-blue-600 hover:text-blue-800 font-medium">
              View all investigations →
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much does the US federal government spend?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `The US federal government spent ${formatDollars(stats.totalBudget)} in FY2025 across 97 agencies. This includes contracts, grants, Social Security, Medicare, defense, and interest on the national debt.`,
                },
              },
              {
                "@type": "Question",
                name: "Who are the biggest government contractors?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `The top 10 federal contractors receive ${formatDollars(top10Total)} — ${formatPercent(contractorPct)} of all federal contracts. Lockheed Martin leads at approximately $34B, followed by Optum ($22B) and General Dynamics ($21B).`,
                },
              },
              {
                "@type": "Question",
                name: "How much federal spending is wasted?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "According to the Government Accountability Office, the federal government loses $233\u2013521 billion per year to improper payments and fraud \u2014 that's 3\u20137% of all federal spending, more than the entire education budget.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
