import Link from "next/link";
import { TopContractorsChart } from "@/components/charts/TopContractorsChart";
import { SearchBar } from "@/components/SearchBar";
import { formatDollars, formatPercent } from "@/lib/format";
import stats from "@/../public/data/stats.json";
import contractors from "@/../public/data/top-contractors-deduped.json";
import agencies from "@/../public/data/agencies.json";
import stateDetailsData from "@/../public/data/state-details.json";

const topContractors = contractors.slice(0, 10);
const topAgencies = agencies.slice(0, 5);
const top10Total = topContractors.reduce((sum, c) => sum + c.amount, 0);
const contractorPct = (top10Total / stats.totalContracts) * 100;

const topStates = Object.values(stateDetailsData as Record<string, { name: string; slug: string; totalAmount: number; rank: number; pctOfTotal: number; perCapita: number | null }>)
  .sort((a, b) => b.totalAmount - a.totalAmount)
  .slice(0, 5);

const statCards = [
  { label: "Total Federal Budget", value: formatDollars(stats.totalBudget), sub: `FY${stats.fiscalYear}` },
  { label: "Federal Contracts", value: formatDollars(stats.totalContracts), sub: "Awarded this year" },
  { label: "Federal Grants", value: formatDollars(stats.totalGrants), sub: "Distributed to recipients" },
  { label: "Federal Agencies", value: String(agencies.length), sub: "Tracked on this site" },
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
  { emoji: "\u{1F3E2}", title: "Contractor Monopoly", href: "/contractor-monopoly", description: "10 companies hold 64% of all contracts" },
  { emoji: "\u{1F4A3}", title: "Interest Time Bomb", href: "/interest", description: "$952B in interest \u2014 now larger than defense" },
  { emoji: "\u{1F5FA}\uFE0F", title: "State Dependency", href: "/state-dependency", description: "Which states take more than they give?" },
  { emoji: "\u{1F4C8}", title: "Spending Explosion", href: "/spending-explosion", description: "Federal spending growth since 2015" },
  { emoji: "\u{1F4B0}", title: "Your Tax Bill", href: "/your-tax-bill", description: "Personalized breakdown of your tax dollars" },
  { emoji: "\u{1F30D}", title: "US vs World", href: "/global-comparison", description: "How US spending compares globally" },
  { emoji: "\u{1F4B3}", title: "National Debt", href: "/national-debt", description: "The $36 trillion debt clock" },
  { emoji: "\u{1F396}\uFE0F", title: "Pentagon Spending", href: "/pentagon-spending", description: "Inside the $886B defense budget" },
  { emoji: "\u{1F3E5}", title: "Healthcare Spending", href: "/healthcare-spending", description: "Medicare, Medicaid & the $1.8T health budget" },
  { emoji: "\u{1F6AB}", title: "No-Bid Nation", href: "/no-bid", description: "33% of large contracts awarded without competition" },
  { emoji: "\u{1F534}", title: "Waste & Fraud", href: "/waste", description: "$233\u2013521B lost to waste every year" },
  { emoji: "\u{1F30A}", title: "COVID Spending", href: "/covid", description: "The $5.2 trillion emergency spending tsunami" },
  { emoji: "\u{1F310}", title: "USAID", href: "/usaid", description: "Budget tripled, then gutted by DOGE" },
  { emoji: "\u2708\uFE0F", title: "Foreign Aid", href: "/foreign-aid", description: "US foreign assistance spending breakdown" },
  { emoji: "\u26A1", title: "Efficiency", href: "/efficiency", description: "Agency efficiency and performance metrics" },
  { emoji: "🏛️", title: "Sub-Agencies", href: "/subagencies", description: "Where the money really goes — 100 offices writing the checks" },
  { emoji: "🌍", title: "Foreign Aid Deep Dive", href: "/foreign-aid-deep-dive", description: "Where does foreign aid actually go?" },
  { emoji: "✈️", title: "Pentagon Deep Dive", href: "/pentagon-deep-dive", description: "The Pentagon's blank check — never audited" },
  { emoji: "🤝", title: "Welfare Queens", href: "/welfare-queens", description: "Which states take more than they give?" },
  { emoji: "🏭", title: "Products & Services", href: "/products", description: "What the government actually buys" },
  { emoji: "🏘️", title: "Counties", href: "/counties", description: "Federal spending by county" },
  { emoji: "🌐", title: "Countries", href: "/countries", description: "Where U.S. dollars go abroad" },
  { emoji: "🎓", title: "Grant Recipients", href: "/grants/recipients", description: "$1.24T in grants — who gets the money" },
  { emoji: "⏱️", title: "Spending Speed", href: "/spending-speed", description: "$169K every second — watch it tick" },
  { emoji: "📈", title: "Entitlement Explosion", href: "/program-growth", description: "Programs that grew 100%+" },
  { emoji: "🏦", title: "Federal Accounts", href: "/federal-accounts", description: "Where your money actually sits" },
  { emoji: "📊", title: "Monthly Pulse", href: "/monthly-pulse", description: "Real-time spending dashboard" },
  { emoji: "🏭", title: "Industry Breakdown", href: "/industries", description: "Federal contracts by NAICS sector" },
];

const dataPages = [
  { emoji: "\u{1F4CA}", title: "Federal Spending Analysis", href: "/spending-analysis" },
  { emoji: "\u{1F3C6}", title: "Top 10 Contractors", href: "/top-10" },
  { emoji: "\u{1F4C8}", title: "Spending Trends", href: "/trends" },
  { emoji: "\u{1F4CB}", title: "How Contracts Work", href: "/how-it-works" },
  { emoji: "\u{1F3DB}\uFE0F", title: "All Agencies", href: "/agencies" },
  { emoji: "\u{1F5C2}\uFE0F", title: "All Industries", href: "/industries" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-indigo-200 font-medium text-sm uppercase tracking-widest mb-4">
            Your tax dollars, tracked
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Follow the Money.
            <br />
            <span className="text-indigo-200">
              {formatDollars(stats.totalBudget)}
            </span>{" "}
            in Federal Spending.
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mb-4">
            Independent, data-driven analysis of how the federal government
            spends your money. Every contract. Every grant. Every agency.
          </p>
          <p className="text-indigo-200 text-base max-w-2xl mb-8">
            10 companies receive {formatDollars(top10Total)} in federal contracts — more than the GDP of 130 countries.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/contractors"
              className="px-6 py-3 bg-white text-indigo-800 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Explore Contractors
            </Link>
            <Link
              href="/agencies"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg border border-indigo-400 hover:bg-indigo-500 transition-colors"
            >
              Browse Agencies
            </Link>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Stat Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
            >
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
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
          <Link href="/trends" className="text-indigo-700 hover:text-indigo-900 font-medium">
            7 deep-dive articles
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
        </div>
      </section>

      {/* The Data */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          The Data
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {dataPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="block bg-white rounded-xl shadow border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-300 transition-all group"
            >
              <span className="text-2xl">{page.emoji}</span>
              <h3 className="font-bold text-gray-900 mt-3 group-hover:text-indigo-700 transition-colors">
                {page.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
