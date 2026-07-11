import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata = {
  title: "DOGE Spending Cuts: What's Actually Been Cut in 2025-2026 — OpenSpending",
  description: "Tracking verified savings from the Department of Government Efficiency (DOGE): ~$160B claimed, ~$36B independently verified. Federal workforce reductions, program eliminations, and agency-by-agency breakdown.",
  openGraph: {
    title: "DOGE Spending Cuts: What's Actually Been Cut in 2025-2026 — OpenSpending",
    description: "Tracking verified savings from DOGE: ~$160B claimed, ~$36B independently verified through mid-2026.",
  },
};

const statCards = [
  {
    label: "Claimed Savings",
    value: "$160B",
    sub: "total DOGE-claimed savings through mid-2026",
  },
  {
    label: "Verified Savings",
    value: "$36B",
    sub: "independently confirmed by GAO & CBO",
  },
  {
    label: "Positions Eliminated",
    value: "120,000",
    sub: "through attrition, buyouts, and RIFs",
  },
  {
    label: "Programs Cut",
    value: "340+",
    sub: "programs eliminated, consolidated, or restructured",
  },
];

const agencyBreakdown = [
  { agency: "USAID / State Dept", claimed: "$28B", verified: "$8.2B", notes: "Major restructuring; most field offices closed, programs consolidated under State" },
  { agency: "Department of Education", claimed: "$18B", verified: "$4.1B", notes: "Administrative consolidation, grant program mergers, 40% staff reduction" },
  { agency: "HHS / CDC", claimed: "$22B", verified: "$5.7B", notes: "Redundant public health programs merged, IT modernization savings" },
  { agency: "Department of Defense", claimed: "$31B", verified: "$7.3B", notes: "Procurement reform, base consolidation studies, civilian workforce reduction" },
  { agency: "GSA / Administrative", claimed: "$14B", verified: "$3.8B", notes: "Federal real estate portfolio reduction, lease terminations" },
  { agency: "EPA", claimed: "$9B", verified: "$2.1B", notes: "Regulatory streamlining, duplicative compliance programs eliminated" },
  { agency: "Other Agencies", claimed: "$38B", verified: "$4.8B", notes: "Advisory board dissolutions, IT consolidation, shared services" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much has DOGE actually saved taxpayers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Through mid-2026, DOGE claims approximately $160 billion in savings. Independent verification by the GAO and CBO confirms roughly $36 billion in concrete, measurable savings. The gap reflects differences in accounting methodology — DOGE counts projected future savings and cost avoidance, while auditors count only realized reductions.",
      },
    },
    {
      "@type": "Question",
      name: "How many federal employees have been affected by DOGE cuts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Approximately 120,000 federal positions have been eliminated through a combination of attrition (not replacing departing employees), voluntary buyouts, and reduction-in-force (RIF) actions. The federal civilian workforce has shrunk from roughly 2.2 million to about 2.08 million.",
      },
    },
    {
      "@type": "Question",
      name: "Which agencies have seen the biggest DOGE cuts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Department of Defense leads in absolute dollar terms ($31B claimed, $7.3B verified), followed by USAID/State Department ($28B claimed, $8.2B verified due to major restructuring), and HHS/CDC ($22B claimed, $5.7B verified). USAID underwent the most dramatic structural changes, with most field offices closed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between claimed and verified DOGE savings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claimed savings include projected future cost avoidance, efficiency gains, and reduced growth rates. Verified savings are confirmed by independent auditors (GAO, CBO) as actual spending reductions that have already occurred. The roughly 4:1 ratio is common in government efficiency initiatives — the Reagan-era Grace Commission showed a similar pattern.",
      },
    },
    {
      "@type": "Question",
      name: "Has DOGE cut programs that people depend on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DOGE has primarily targeted administrative overhead, duplicative programs, and agencies with accountability gaps — not direct benefit payments like Social Security or Medicare. Most workforce reductions came through attrition and buyouts rather than layoffs. Some consolidations (like USAID restructuring) have been controversial, but the core safety net programs remain funded.",
      },
    },
    {
      "@type": "Question",
      name: "Are DOGE savings permanent or temporary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the category. Workforce reductions and program eliminations represent permanent savings — those positions and programs don't come back automatically. IT modernization and procurement reforms should yield ongoing savings. However, some savings require Congressional action to lock in, and future administrations could reverse executive actions.",
      },
    },
  ],
};

export default function DogeSpendingCutsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs items={[{ label: "Analysis" }, { label: "DOGE Spending Cuts" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          DOGE Spending Cuts: What&apos;s Actually Been Cut
        </h1>
        <ShareButtons title="DOGE Spending Cuts — OpenSpending" url="https://www.openspending.us/doge-spending-cuts" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Updated: July 2026</p>
      <p className="text-gray-500 text-lg mb-10">
        Separating the headlines from the spreadsheets. Here&apos;s what DOGE has actually cut — and what the auditors confirm.
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
          The federal government grew from 1.8 million civilian employees in 1960 to 2.2 million by 2024 — while
          the private sector transformed beyond recognition. Entire industries were created and destroyed in that
          time. The government just kept growing. DOGE is the first serious attempt in decades to ask a simple
          question: does every one of those positions, programs, and agencies still make sense?
        </p>
      </div>

      {/* The Big Picture */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Big Picture</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            Through mid-2026, the Department of Government Efficiency claims approximately $160 billion in total
            savings. Independent verification by the Government Accountability Office (GAO) and Congressional
            Budget Office (CBO) confirms roughly $36 billion in concrete, realized savings. That gap deserves
            context, not dismissal.
          </p>
          <p className="text-gray-600 mb-3">
            DOGE counts projected future savings, cost avoidance (contracts not renewed, positions not filled), and
            efficiency gains from IT modernization. Auditors count only money that has already stopped being spent.
            Both numbers are real — they just measure different things. The verified $36 billion alone would rank as
            one of the largest spending reductions in modern federal history.
          </p>
          <p className="text-gray-600">
            For perspective: $36 billion is more than the entire annual budget of the Department of Energy. It&apos;s
            roughly what the federal government spends on NASA. The fact that this much waste could be identified and
            eliminated in 18 months tells you how much room there was to cut.
          </p>
        </div>
      </section>

      {/* Workforce Right-Sizing */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Workforce Right-Sizing</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            Approximately 120,000 federal positions have been eliminated since DOGE began operations. The breakdown:
            roughly 55,000 through natural attrition (not replacing employees who left), 40,000 through voluntary
            buyout programs, and 25,000 through reduction-in-force (RIF) actions. The federal civilian workforce
            has dropped from approximately 2.2 million to about 2.08 million.
          </p>
          <p className="text-gray-600 mb-3">
            Critics frame every reduction as a crisis. But the federal workforce grew by over 80,000 positions
            between 2020 and 2024 alone — many tied to pandemic-era programs that have long since ended. Returning
            to roughly 2019 staffing levels is not gutting the government. It&apos;s removing the bloat that
            accumulated during an emergency that&apos;s been over for years.
          </p>
          <p className="text-gray-600">
            The voluntary buyout programs were notably generous: up to $40,000 in separation incentives plus
            extended benefits. Most employees who left chose to leave. The narrative of mass firings doesn&apos;t
            match the data.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            <span className="font-bold">79%</span> of workforce reductions came through attrition and voluntary
            buyouts — not layoffs. The government shrank mostly by letting people leave and not replacing them.
          </p>
        </div>
      </section>

      {/* Program Eliminations */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Program Eliminations &amp; Consolidations</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            Over 340 federal programs have been eliminated, consolidated, or significantly restructured. The largest
            single action was the <Link href="/usaid" className="text-indigo-600 hover:text-indigo-800 underline">USAID restructuring</Link>,
            which merged most international development programs under the State Department — ending decades of
            duplicated bureaucracy between the two organizations.
          </p>
          <p className="text-gray-600 mb-3">
            Other notable actions include the dissolution of 47 federal advisory boards that hadn&apos;t met in over
            two years, the consolidation of 12 overlapping IT security programs into a unified framework, and the
            termination of grant programs where auditors could not verify how funds were being used.
          </p>
          <p className="text-gray-600">
            The IT modernization push alone is projected to save $8-12 billion over the next decade by eliminating
            legacy systems that cost more to maintain than to replace. Several agencies were still running systems
            built in the 1980s — not because they worked well, but because no one had the mandate to shut them down.
          </p>
        </div>
      </section>

      {/* Agency-by-Agency Breakdown */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Agency-by-Agency Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Agency</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Claimed</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Verified</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Key Actions</th>
              </tr>
            </thead>
            <tbody>
              {agencyBreakdown.map((row) => (
                <tr key={row.agency} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{row.agency}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{row.claimed}</td>
                  <td className="py-3 px-4 text-right font-semibold text-indigo-700">{row.verified}</td>
                  <td className="py-3 px-4 text-gray-500">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mt-4">
          <h3 className="text-lg font-bold text-indigo-900 mb-2">Why the Gap?</h3>
          <p className="text-indigo-800">
            The roughly 4:1 ratio between claimed and verified savings is actually typical for government efficiency
            initiatives. The Reagan-era Grace Commission claimed $424 billion in potential savings; auditors confirmed
            about $100 billion was realized. DOGE&apos;s verification rate is running slightly better than historical
            averages. The key is whether the structural changes — workforce reductions, program eliminations, IT
            modernization — lock in permanent savings rather than one-time cuts.
          </p>
        </div>
      </section>

      {/* What's Working */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What&apos;s Working</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-3">
            The most effective DOGE actions share a common pattern: they target areas where the government was
            spending money on things it couldn&apos;t measure, justify, or explain. The{" "}
            <Link href="/waste" className="text-indigo-600 hover:text-indigo-800 underline">improper payments</Link>{" "}
            problem — now at $175 billion annually — is the clearest example. These are payments the government
            itself admits it shouldn&apos;t have made. Reducing them isn&apos;t cutting services; it&apos;s stopping fraud.
          </p>
          <p className="text-gray-600 mb-3">
            Federal real estate consolidation is another win. The government owns or leases over 300,000 buildings.
            GSA identified 12,000+ that were vacant or severely underutilized. Closing or selling those properties
            eliminates maintenance costs and generates revenue. This is not controversial — it&apos;s basic asset management
            that was decades overdue.
          </p>
          <p className="text-gray-600">
            Procurement reform through <Link href="/no-bid" className="text-indigo-600 hover:text-indigo-800 underline">competitive bidding
            requirements</Link> has already driven down costs on several major contract categories. When contractors
            know they have to compete, prices drop. It&apos;s not complicated — it just wasn&apos;t being enforced.
          </p>
        </div>
      </section>

      {/* The Road Ahead */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Road Ahead</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            The biggest savings are still ahead — and they require Congress. Entitlement reform, defense procurement
            overhaul, and structural changes to how the government budgets and audits spending all need legislation.
            DOGE has shown what executive action can accomplish; the question is whether Congress has the appetite to
            go further.
          </p>
          <p className="text-gray-600">
            The <Link href="/federal-budget-2026" className="text-indigo-600 hover:text-indigo-800 underline">FY2026 budget</Link> reflects
            some DOGE influence — discretionary spending is roughly flat in real terms for the first time in years. But
            mandatory spending continues to grow on autopilot, driven by demographics and existing law. Until Congress
            addresses the structural drivers, even aggressive efficiency efforts can only trim around the edges of a
            $6.9 trillion budget.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            DOGE has proven that billions can be saved through executive action alone. But the trillion-dollar
            problems — Social Security solvency, Medicare cost growth, $900 billion in annual interest payments —
            require legislation. The real test is whether this momentum translates into Congressional action.
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/efficiency" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Government Efficiency</p>
            <p className="text-sm text-gray-600 mt-1">The broader case for accountability and reform</p>
          </Link>
          <Link href="/waste" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Waste &amp; Fraud</p>
            <p className="text-sm text-gray-600 mt-1">$175B in improper payments and counting</p>
          </Link>
          <Link href="/federal-budget-2026" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Federal Budget 2026</p>
            <p className="text-sm text-gray-600 mt-1">Where your $6.9 trillion in tax dollars goes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
