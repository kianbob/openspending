import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata = {
  title: "Government Efficiency & Accountability — OpenSpending",
  description: "The case for government efficiency: contractor concentration, no-bid contracts, and runaway spending growth. Data-driven accountability.",
  openGraph: {
    title: "Government Efficiency & Accountability — OpenSpending",
    description: "The case for government efficiency: contractor concentration, no-bid contracts, and runaway spending growth. Data-driven accountability.",
  },
};

const statCards = [
  {
    label: "Top 5 Contractors",
    value: "44%",
    sub: "of all federal contract spending",
  },
  {
    label: "No-Bid Contracts",
    value: "$74B",
    sub: "awarded without competition in FY2025",
  },
  {
    label: "Spending Growth",
    value: "+38%",
    sub: "in federal contract spending since FY2020",
  },
  {
    label: "Improper Payments",
    value: "$162B",
    sub: "in FY2024 alone across 68 programs",
  },
];

export default function EfficiencyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Editorial" }, { label: "Government Efficiency & Accountability" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Government Efficiency &amp; Accountability
        </h1>
        <ShareButtons title="Government Efficiency & Accountability — OpenSpending" url="https://openspending.us/efficiency" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        The data makes the case that the status quo cannot continue.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-indigo-700 mt-1">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Lead Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          The federal government spends $11.2 trillion per year. It cannot tell
          you where hundreds of billions of those dollars go. The Government
          Accountability Office has been documenting these failures for decades.
          The question is not whether efficiency is needed — it is why it took
          this long.
        </p>
      </div>

      {/* The Case for Efficiency */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Case for Efficiency
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            Government efficiency is not a partisan issue — it is a math problem.
            Federal spending has grown relentlessly for decades, through
            administrations of both parties. The budget doubled from $3.5 trillion
            in 2010 to over $6.8 trillion in 2024, while the national debt crossed
            $34 trillion. At some point, the trajectory becomes unsustainable.
          </p>
          <p className="text-gray-600 mb-3">
            The Department of Government Efficiency (DOGE) was created to confront
            this reality. Its mandate is straightforward: audit how the government
            spends money, identify waste and redundancy, and recommend cuts. This is
            not radical — it is what every business does as a matter of course.
            The federal government is the only trillion-dollar organization on
            earth that has never passed a clean financial audit.
          </p>
          <p className="text-gray-600">
            Critics argue that efficiency efforts are cover for cutting programs
            people depend on. That concern deserves a serious answer. But the
            data shows that hundreds of billions are lost every year to fraud,
            improper payments, and duplicated programs — money that never reaches
            anyone. Cutting waste is not the same as cutting services. In fact,
            waste crowds out the services that actually work.
          </p>
        </div>
      </section>

      {/* Contractor Concentration */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Contractor Concentration
        </h2>
        <p className="text-gray-600 mb-6">
          Federal contracting is dominated by a handful of companies. The top five
          contractors — Lockheed Martin, Optum, Electric Boat, TriWest Healthcare,
          and McKesson — receive roughly 44% of all federal contract dollars.
          Lockheed Martin alone received $34 billion in FY2025. When a few
          companies control this much of the pipeline, competition erodes, prices
          inflate, and accountability vanishes.
        </p>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-2">
            The Revolving Door
          </h3>
          <p className="text-indigo-800">
            Many of these contractors employ former government officials who
            previously oversaw the agencies now awarding them contracts. This
            revolving door between government service and private contracting
            creates relationships that prioritize incumbents over competition.
            The result: taxpayers pay more, and new entrants are locked out.
          </p>
        </div>
      </section>

      {/* No-Bid Problem */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The No-Bid Problem
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            In FY2025, $74 billion in federal contracts were awarded through
            sole-source procurement — without competitive bidding. These no-bid
            contracts exist for legitimate reasons: classified programs, genuine
            emergencies, or unique technical capabilities. But when the same
            companies receive billions year after year without competition, the
            exception has become the rule.
          </p>
          <p className="text-gray-600">
            The Department of Defense accounts for the vast majority of no-bid
            spending. &quot;National security&quot; is the justification that
            eliminates the price pressure designed to protect taxpayers. Whether
            that justification holds up to scrutiny — or has become a convenient
            excuse — is exactly the kind of question that efficiency efforts
            should answer.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            <span className="font-bold">$74 billion</span> in contracts awarded
            without competition. That is more than the entire budget of the
            Department of Education.
          </p>
        </div>
      </section>

      {/* Spending Growth */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Spending Never Goes Back Down
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            Federal contract spending has grown 38% since FY2020 — a period that
            includes the COVID emergency surge. But even after the emergency
            ended, spending did not return to pre-pandemic levels. This is the
            ratchet effect: every crisis becomes the new baseline. Emergency
            spending becomes permanent spending. Temporary programs become
            permanent programs. And the budget only moves in one direction.
          </p>
          <p className="text-gray-600">
            USAID&apos;s budget is a case study. It tripled from $15 billion in
            2017 to over $50 billion by 2023 — an extraordinary expansion with
            limited public scrutiny. When DOGE began reviewing the agency,
            questions about where that money went were met with resistance rather
            than transparency. An agency that cannot explain a threefold budget
            increase is an agency that needs oversight, not protection.
          </p>
        </div>
      </section>

      {/* What Accountability Looks Like */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          What Accountability Looks Like
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-3">
            Real accountability starts with transparency. Every dollar the
            government spends should be traceable from appropriation to
            expenditure. Every contract should be searchable by any taxpayer.
            Every agency should pass a financial audit — something most cannot
            do today. The data that powers this site comes from USASpending.gov,
            a step in the right direction. But data availability is not the same
            as accountability.
          </p>
          <p className="text-gray-600 mb-3">
            Accountability means consequences. When an agency reports $162 billion
            in improper payments, someone should be responsible. When a contractor
            receives billions without competition, the justification should be
            public. When spending triples in six years, the results should be
            measurable. The federal government collects $4.9 trillion in taxes
            every year. Taxpayers deserve to know whether that money is being
            spent wisely — and the data suggests it often is not.
          </p>
          <p className="text-gray-600">
            Whether DOGE succeeds or fails, the underlying problem remains: the
            federal government is too large and too opaque to manage without
            structural reform. Efficiency is not about ideology — it is about
            competence. And the numbers speak for themselves.
          </p>
        </div>
      </section>

      {/* Explore More */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
          Explore the Data
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          See the numbers behind the efficiency argument. Every claim on this
          page is backed by federal spending data.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/waste"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Waste &amp; Fraud
          </Link>
          <Link
            href="/no-bid"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            No-Bid Contracts
          </Link>
          <Link
            href="/usaid"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            USAID Deep Dive
          </Link>
          <Link
            href="/contractors"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Top Contractors
          </Link>
          <Link
            href="/trends"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Spending Trends
          </Link>
        </div>
      </div>
    </div>
  );
}
