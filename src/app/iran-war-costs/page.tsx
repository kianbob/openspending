import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata = {
  title: "Iran War Costs: $42 Billion and Counting — OpenSpending",
  description: "Total U.S. military spending on the Iran conflict reached $42 billion before the June 2026 peace deal. Plus the $87.6B supplemental request to replenish the Pentagon. Full breakdown by category.",
  openGraph: {
    title: "Iran War Costs: $42 Billion and Counting — OpenSpending",
    description: "Total U.S. military spending on the Iran conflict: $42B+ across naval ops, air strikes, troop deployments, and intelligence operations.",
  },
};

const statCards = [
  {
    label: "Total Iran Conflict Cost",
    value: "$42B+",
    sub: "military spending through June 2026 peace deal",
  },
  {
    label: "Naval Operations",
    value: "$15B",
    sub: "carrier strike groups, Strait of Hormuz patrols",
  },
  {
    label: "Air Strikes",
    value: "$12B",
    sub: "precision munitions, sorties, and air defense",
  },
  {
    label: "Daily Peak Cost",
    value: "$185M",
    sub: "per day at height of operations (Q1 2026)",
  },
];

const costBreakdown = [
  { category: "Naval Operations", amount: "$15B", pct: "36%", detail: "Two carrier strike groups maintained in Persian Gulf for 14 months; Strait of Hormuz patrol operations; mine countermeasures" },
  { category: "Air Strikes & Air Defense", amount: "$12B", pct: "29%", detail: "Precision-guided munitions, B-2 and F-35 sorties, Patriot and THAAD missile defense deployments" },
  { category: "Troop Deployments", amount: "$8B", pct: "19%", detail: "45,000 additional troops to region; base operations in Qatar, Bahrain, UAE; force protection" },
  { category: "Intelligence & Cyber", amount: "$4B", pct: "9%", detail: "Signals intelligence, cyber operations, satellite surveillance, human intelligence networks" },
  { category: "Allied Support & Coalition", amount: "$3B", pct: "7%", detail: "Logistics support to coalition partners; shared intelligence infrastructure; allied base costs" },
];

const comparisons = [
  { conflict: "Iran Conflict (2025-2026)", cost: "$42B", duration: "~14 months", daily: "$100M avg" },
  { conflict: "Afghanistan (first 2 years)", cost: "$57B", duration: "24 months", daily: "$78M avg" },
  { conflict: "Iraq (first 2 years)", cost: "$120B", duration: "24 months", daily: "$164M avg" },
  { conflict: "Libya (2011)", cost: "$1.1B", duration: "7 months", daily: "$5M avg" },
  { conflict: "Syria strikes (2017-2019)", cost: "$3.2B", duration: "~24 months", daily: "$4M avg" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much did the Iran conflict cost U.S. taxpayers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Total military spending on the Iran conflict exceeded $42 billion from the start of operations through the June 2026 peace deal. This includes naval operations ($15B), air strikes ($12B), troop deployments ($8B), intelligence and cyber operations ($4B), and allied support ($3B).",
      },
    },
    {
      "@type": "Question",
      name: "How does the Iran conflict cost compare to other U.S. military operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At $42 billion over roughly 14 months, the Iran conflict was significantly more expensive per month than the early years of Afghanistan but less costly than Iraq. The daily cost at peak operations ($185M/day) exceeded the daily rate of the Afghanistan war at its most expensive period.",
      },
    },
    {
      "@type": "Question",
      name: "What was the most expensive component of the Iran conflict?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Naval operations were the largest cost category at approximately $15 billion (36% of total costs). Maintaining two carrier strike groups in the Persian Gulf for over a year, combined with Strait of Hormuz patrol operations and mine countermeasures, drove the bulk of this spending.",
      },
    },
    {
      "@type": "Question",
      name: "How did the Iran conflict affect the federal deficit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The $42 billion in Iran conflict spending was largely funded through supplemental appropriations, adding directly to the federal deficit. In June 2026, the White House requested an additional $87.6 billion supplemental — $67.1 billion for the DoD — to replenish munitions and rebuild readiness.",
      },
    },
    {
      "@type": "Question",
      name: "What ended the Iran conflict?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A peace deal was reached in June 2026, ending active hostilities. Military costs are now winding down as forces redeploy, though some residual costs for force repositioning and equipment maintenance will continue into FY2027.",
      },
    },
  ],
};

export default function IranWarCostsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs items={[{ label: "Investigations" }, { label: "Iran War Costs" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Iran War Costs: $42 Billion and Counting
        </h1>
        <ShareButtons title="Iran War Costs — OpenSpending" url="https://www.openspending.us/iran-war-costs" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Updated: July 2026</p>
      <p className="text-gray-500 text-lg mb-10">
        The full cost of the Iran conflict — from the first carrier deployment to the June 2026 peace deal.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-indigo-700 mt-1">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Lead Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          Wars are easy to start and expensive to fight. The Iran conflict cost American taxpayers $42 billion in
          14 months — roughly $100 million every single day. That money came from supplemental appropriations,
          meaning it was borrowed. The interest on that borrowing will cost taxpayers for decades to come.
        </p>
      </div>

      {/* Cost Breakdown */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Where the Money Went</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Cost</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Share</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Details</th>
              </tr>
            </thead>
            <tbody>
              {costBreakdown.map((row) => (
                <tr key={row.category} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{row.category}</td>
                  <td className="py-3 px-4 text-right font-semibold text-indigo-700">{row.amount}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{row.pct}</td>
                  <td className="py-3 px-4 text-gray-500">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-2">The Munitions Cost</h3>
          <p className="text-indigo-800">
            Precision-guided munitions are staggeringly expensive: a single Tomahawk cruise missile costs $2 million.
            JDAM-guided bombs run $25,000-$40,000 each. The U.S. expended thousands of these weapons during air
            operations, and restocking the arsenal will cost billions more over the next several years. The munitions
            bill doesn&apos;t end when the fighting stops.
          </p>
        </div>
      </section>

      {/* Naval Operations */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Naval Operations: The Biggest Bill</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            Maintaining carrier strike groups is the most expensive thing the U.S. military does. A single Nimitz-class
            carrier strike group costs approximately $6-7 million per day to operate — covering the carrier itself, its
            air wing, escort destroyers and cruisers, submarine support, and logistics ships. With two groups deployed
            to the Persian Gulf for most of the conflict, naval costs dominated the overall bill.
          </p>
          <p className="text-gray-600">
            Beyond the carrier groups, the Navy conducted extensive mine countermeasure operations in the Strait of
            Hormuz and maintained a continuous presence to protect commercial shipping. These operations, while less
            dramatic than air strikes, were essential to preventing Iran from choking off 20% of the world&apos;s
            oil supply.
          </p>
        </div>
      </section>

      {/* Historical Comparison */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How It Compares</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Conflict</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Cost</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Duration</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Daily Cost</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr key={row.conflict} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{row.conflict}</td>
                  <td className="py-3 px-4 text-right font-semibold text-indigo-700">{row.cost}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{row.duration}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{row.daily}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            On a per-day basis, the Iran conflict was more expensive than the early years of Afghanistan. The
            difference: it ended after 14 months instead of 20 years. The total cost — $42 billion — is a fraction
            of the $2.3 trillion spent in Afghanistan or $1.9 trillion in Iraq. The peace deal, whatever its
            terms, saved taxpayers from a far larger bill.
          </p>
        </div>
      </section>

      {/* Impact on Defense Budget */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Impact on the Defense Budget</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            The <Link href="/pentagon-deep-dive" className="text-indigo-600 hover:text-indigo-800 underline">FY2026 defense budget</Link> was
            already $886 billion before supplemental war funding. Iran conflict costs pushed actual military spending
            over $950 billion — making it the most expensive year for defense in American history.
          </p>
          <p className="text-gray-600 mb-3">
            On June 24, 2026, the White House submitted an{" "}
            <Link href="/iran-supplemental" className="text-indigo-600 hover:text-indigo-800 underline">$87.6 billion supplemental
            request</Link> to Congress. Of that, $67.1 billion is earmarked for the DoD — covering munitions
            procurement ($21B), operational readiness, classified programs, fuel costs ($1.5B), and National Guard
            support. OMB Director Russell Vought estimated that about $30 billion covers direct Iran war costs;
            the rest funds broader Pentagon priorities for future conflicts.
          </p>
          <p className="text-gray-600">
            Supplemental war funding sits outside the normal budget process, bypassing the usual budget caps.
            With the peace deal in place, direct war costs are winding down. But restocking depleted munitions
            and rebuilding readiness will cost billions more through FY2027.
          </p>
        </div>
      </section>

      {/* Deficit Impact */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Adding to the Deficit</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-3">
            The $42 billion in war costs was entirely deficit-financed. At current interest rates (~4.5% on new
            Treasury issuance), that borrowing will cost taxpayers roughly $1.9 billion per year in interest — every
            year, until the principal is repaid. Over 30 years, the interest alone could exceed the original cost
            of the conflict.
          </p>
          <p className="text-gray-600">
            This is the hidden cost of war spending that rarely makes headlines. The{" "}
            <Link href="/national-debt" className="text-indigo-600 hover:text-indigo-800 underline">national debt</Link> crossed $36
            trillion in 2026, and <Link href="/interest" className="text-indigo-600 hover:text-indigo-800 underline">interest payments</Link> now
            consume $900 billion per year — nearly as much as the entire defense budget. Every billion added through
            supplemental spending makes that burden worse.
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/pentagon-deep-dive" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Pentagon Deep Dive</p>
            <p className="text-sm text-gray-600 mt-1">Inside the $886B defense budget</p>
          </Link>
          <Link href="/national-debt" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">National Debt</p>
            <p className="text-sm text-gray-600 mt-1">$36 trillion and growing</p>
          </Link>
          <Link href="/iran-supplemental" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">$87.6B Supplemental Request</p>
            <p className="text-sm text-gray-600 mt-1">War costs, farm aid, Ebola — full breakdown</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
