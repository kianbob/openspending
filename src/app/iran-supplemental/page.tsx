import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata = {
  title: "$87.6 Billion Supplemental Request: Iran War, Farm Aid & More — OpenSpending",
  description: "The White House requested $87.6 billion in supplemental spending on June 24, 2026 — $67.1B for the Pentagon, $10B for farmers, $1.4B for Ebola, and more. Full breakdown of where the money goes.",
  openGraph: {
    title: "$87.6 Billion Supplemental Request — OpenSpending",
    description: "Breaking down the $87.6B supplemental: $67.1B for DoD (Iran war + readiness), $10B farm aid, $1.4B Ebola response, $1B Penn Station. Follow the money.",
  },
};

const statCards = [
  {
    label: "Total Request",
    value: "$87.6B",
    sub: "submitted to Congress June 24, 2026",
  },
  {
    label: "Department of Defense",
    value: "$67.1B",
    sub: "munitions, readiness, classified programs",
  },
  {
    label: "Direct Iran War Costs",
    value: "~$30B",
    sub: "per OMB Director Russell Vought",
  },
  {
    label: "Non-Defense Spending",
    value: "$20.5B",
    sub: "farm aid, Ebola, infrastructure, energy",
  },
];

const dodLineItems = [
  { item: "Munitions Procurement & Industrial Base", amount: "$21.0B", category: "National Security", detail: "Replenish precision-guided munitions expended during Iran operations; strengthen domestic defense industrial base" },
  { item: "Operational Costs", amount: "$17.3B", category: "Mixed", detail: "Higher operational tempo, equipment replacement, aircraft losses. May include costs from Operation Southern Spear and Absolute Resolve" },
  { item: "Classified Programs", amount: "$15.0B", category: "Mixed", detail: "Intelligence, cyber operations, and other classified national security programs" },
  { item: "Cybersecurity & Autonomy", amount: "$5.0B", category: "National Security", detail: "Advanced cyber defense capabilities and autonomous systems development" },
  { item: "Military Personnel & Readiness", amount: "$4.0B", category: "Iran War", detail: "Costs to mobilize, deploy, and sustain additional forces in the Middle East" },
  { item: "Readiness", amount: "$1.7B", category: "Iran War", detail: "Unit mobilization and deployment to the Middle East theater" },
  { item: "Fuel Costs", amount: "$1.5B", category: "Iran War", detail: "Higher DOD fuel costs due to war-related global energy price impacts" },
  { item: "National Guard Support", amount: "$0.8B", category: "Mixed", detail: "Guard deployments for Iran war, Southwest border, and domestic operations" },
  { item: "Other Defense", amount: "$0.8B", category: "National Security", detail: "Additional defense requirements and support costs" },
];

const nonDefenseItems = [
  { item: "Farm Aid", amount: "$10.0B", detail: "Direct payments to U.S. farmers impacted by trade policies and market disruptions" },
  { item: "Ebola Response", amount: "$1.4B", detail: "Emergency public health funding for Ebola outbreak containment" },
  { item: "Penn Station Renovation", amount: "$1.0B", detail: "Renovation of Penn Station in New York City" },
  { item: "Energy Department (Nuclear & Energy Security)", amount: "$0.768B", detail: "Nuclear security programs and energy infrastructure" },
  { item: "Washington D.C. Restoration & Construction", amount: "$0.5B", detail: "Federal building restoration and construction projects in Washington" },
  { item: "Other Non-Defense", amount: "$6.8B", detail: "Additional domestic priorities across multiple agencies" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the $87.6 billion supplemental spending request?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On June 24, 2026, the White House submitted an $87.6 billion supplemental spending request to Congress. The request is primarily to replenish the Pentagon after the Iran war ($67.1B for DoD), plus funding for farmers ($10B), Ebola response ($1.4B), Penn Station renovation ($1B), and other priorities.",
      },
    },
    {
      "@type": "Question",
      name: "How much of the supplemental is for the Iran war?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "About $30 billion of the $67.1 billion DoD request covers direct Iran war costs, according to OMB Director Russell Vought. The remaining $37 billion funds broader Pentagon priorities including munitions procurement, cybersecurity and autonomy programs, and classified programs for future conflicts.",
      },
    },
    {
      "@type": "Question",
      name: "Why did the Pentagon request less than the $200 billion originally discussed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Defense Secretary Pete Hegseth initially suggested the Pentagon might request $200 billion in March 2026. The final $87.6 billion request was significantly lower, though the administration may submit additional supplemental requests as war costs are fully accounted for.",
      },
    },
    {
      "@type": "Question",
      name: "Does Congress have to approve the supplemental request?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Supplemental spending requests require Congressional appropriation. Congress must pass legislation to provide the funding. The request faces political challenges as Republicans in competitive districts weigh the vote ahead of 2026 midterm elections.",
      },
    },
  ],
};

export default function IranSupplementalPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs items={[{ label: "Investigations" }, { label: "$87.6B Supplemental Request" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The $87.6 Billion Supplemental: Where It All Goes
        </h1>
        <ShareButtons title="$87.6B Supplemental Request — OpenSpending" url="https://www.openspending.us/iran-supplemental" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: July 2026 | Data as of June 24, 2026</p>
      <p className="text-gray-500 text-lg mb-10">
        On June 24, the White House asked Congress for $87.6 billion in supplemental spending — mostly to replenish
        the Pentagon after the Iran war, but also for farmers, Ebola, and infrastructure. Here&apos;s the full breakdown.
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
          Defense Secretary Hegseth floated $200 billion in March. The actual ask came in at $87.6 billion — less
          than half, but still roughly equivalent to the entire annual budget of the Department of Education,
          Department of Energy, and NASA combined. About one-third covers direct war costs. The rest? Pentagon
          wish-list items that failed to make it into the regular budget, farm bailouts, and what budget hawks call
          &quot;Christmas ornaments&quot; — agencies hitching a ride on emergency spending.
        </p>
      </div>

      {/* DoD Breakdown */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Department of Defense: $67.1 Billion</h2>
        <p className="text-gray-600 mb-4">
          The DoD request covers 10 line items, but the transmittal letter lacks the detailed justifications provided
          for other departments. OMB Director Vought told Congress on June 30 that the Iran war itself cost about $30
          billion — roughly half the DoD request. The rest funds future readiness and classified programs.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Line Item</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Details</th>
              </tr>
            </thead>
            <tbody>
              {dodLineItems.map((row) => (
                <tr key={row.item} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{row.item}</td>
                  <td className="py-3 px-4 text-right font-semibold text-indigo-700">{row.amount}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      row.category === "Iran War" ? "bg-red-100 text-red-800" :
                      row.category === "Mixed" ? "bg-amber-100 text-amber-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-2">War Cost vs. Wish List</h3>
          <p className="text-indigo-800">
            The $21 billion munitions line item is the largest single request — and it&apos;s not just about Iran.
            It includes funding to &quot;strengthen the U.S. industrial base,&quot; meaning investments in domestic
            weapons manufacturing capacity. Some of the operational costs may also cover{" "}
            <Link href="/iran-war-costs" className="text-indigo-600 hover:text-indigo-800 underline">Operations Southern Spear
            and Absolute Resolve</Link> — separate military operations. The line between &quot;war cost&quot; and
            &quot;defense modernization&quot; is deliberately blurry.
          </p>
        </div>
      </section>

      {/* Non-Defense */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Non-Defense: $20.5 Billion</h2>
        <p className="text-gray-600 mb-4">
          The supplemental isn&apos;t just about the Pentagon. The White House bundled in farm aid, public health
          funding, and infrastructure projects — a common strategy to build broader Congressional support for the package.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Item</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Details</th>
              </tr>
            </thead>
            <tbody>
              {nonDefenseItems.map((row) => (
                <tr key={row.item} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{row.item}</td>
                  <td className="py-3 px-4 text-right font-semibold text-indigo-700">{row.amount}</td>
                  <td className="py-3 px-4 text-gray-500">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            The $10 billion for farmers is the most politically interesting item. U.S. agriculture has been battered
            by trade policies and tariff retaliations. Bundling farm aid into a war supplemental gives rural-district
            Republicans cover to vote yes — they&apos;re not just funding the war, they&apos;re helping farmers back home.
            It&apos;s how the sausage gets made.
          </p>
        </div>
      </section>

      {/* Political Dynamics */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Political Math</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-3">
            The supplemental arrives at a politically awkward time. With 2026 midterm elections approaching,
            Republicans in competitive districts face a tough vote: support an unpopular war&apos;s price tag or
            break with the White House. Democrats have already opposed it, with Sen. Patty Murray calling it
            a request to &quot;pick up the tab&quot; for a war Congress never authorized.
          </p>
          <p className="text-gray-600 mb-3">
            Murray also pointed out that the Pentagon &quot;sits on over $100 billion in unspent funding&quot;
            from the One Big Beautiful Bill — raising questions about whether supplemental funding is truly
            necessary or whether the DoD is simply avoiding the political cost of reprogramming existing funds.
          </p>
          <p className="text-gray-600">
            The initial $200 billion ask from Hegseth in March may have been strategic anchoring — making
            $87.6 billion feel reasonable by comparison. Whether Congress approves the full amount, negotiates
            it down, or splits it into pieces will depend on how many &quot;Christmas ornaments&quot; the
            leadership can attach to buy enough votes.
          </p>
        </div>
      </section>

      {/* Deficit Impact */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Deficit Impact</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-3">
            If fully approved, the $87.6 billion supplemental would be entirely deficit-financed — adding to
            the projected{" "}
            <Link href="/federal-budget-2026" className="text-indigo-600 hover:text-indigo-800 underline">$1.8 trillion
            FY2026 deficit</Link>. At current interest rates (~4.5%), borrowing this amount adds roughly $3.9
            billion in annual interest costs — every year, until the principal is repaid.
          </p>
          <p className="text-gray-600">
            That&apos;s in addition to the{" "}
            <Link href="/interest" className="text-indigo-600 hover:text-indigo-800 underline">$900 billion
            in interest</Link> the government is already paying annually on the{" "}
            <Link href="/national-debt" className="text-indigo-600 hover:text-indigo-800 underline">$36 trillion
            national debt</Link>. Supplemental spending is, by definition, spending that wasn&apos;t budgeted for.
            It goes straight to the deficit, and the interest bill follows it forever.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Timeline</h2>
        <div className="space-y-4">
          {[
            { date: "Feb 28, 2025", event: "Iran conflict begins; U.S. military operations commence" },
            { date: "Mar 19, 2026", event: "Defense Secretary Hegseth suggests Pentagon may request $200B" },
            { date: "Jun 2026", event: "Peace deal reached, ending active hostilities" },
            { date: "Jun 24, 2026", event: "White House submits $87.6B supplemental request to Congress" },
            { date: "Jun 30, 2026", event: "OMB Director Vought tells Congress Iran war cost ~$30B" },
            { date: "Jul 2026", event: "Congressional debate ongoing; midterm politics complicate passage" },
          ].map((item) => (
            <div key={item.date} className="flex gap-4">
              <div className="w-32 flex-shrink-0 text-sm font-semibold text-indigo-700">{item.date}</div>
              <div className="text-gray-600 text-sm">{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Analysis */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/iran-war-costs" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Iran War Costs</p>
            <p className="text-sm text-gray-600 mt-1">$42B+ total military conflict breakdown</p>
          </Link>
          <Link href="/federal-budget-2026" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Federal Budget 2026</p>
            <p className="text-sm text-gray-600 mt-1">$7.7 trillion in spending, category by category</p>
          </Link>
          <Link href="/pentagon-deep-dive" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Pentagon Deep Dive</p>
            <p className="text-sm text-gray-600 mt-1">Inside the $886B defense budget</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
