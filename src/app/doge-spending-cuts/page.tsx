import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata = {
  title: "DOGE Spending Cuts: Final Scorecard After July 2026 Sunset — OpenSpending",
  description: "The Department of Government Efficiency sunset July 4, 2026 claiming $215B in savings. GAO found $110B unsubstantiated. $36B independently verified. Full breakdown.",
  openGraph: {
    title: "DOGE Spending Cuts: Final Scorecard After July 2026 Sunset — OpenSpending",
    description: "DOGE claimed $215B in savings before sunset. GAO found $110B unsubstantiated. $36B independently verified. The full post-mortem.",
  },
};

const statCards = [
  {
    label: "DOGE Claimed",
    value: "$215B",
    sub: "total savings claimed at July 4 sunset",
  },
  {
    label: "GAO Unsubstantiated",
    value: "$110B",
    sub: "incorrect or lacking evidence per GAO audit",
  },
  {
    label: "Verified Savings",
    value: "$36B",
    sub: "independently confirmed by GAO & CBO",
  },
  {
    label: "Workers Rehired",
    value: "25,000+",
    sub: "reinstated after agencies deemed them essential",
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
        text: "DOGE claimed $215 billion in savings before sunsetting on July 4, 2026. The GAO found $110 billion of those claims were incorrect or unsubstantiated. Independent verification confirms roughly $36 billion in concrete, realized savings. Politico's analysis of $32.7 billion in contract savings verified only $1.4 billion.",
      },
    },
    {
      "@type": "Question",
      name: "How many federal employees have been affected by DOGE cuts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Approximately 120,000 positions were initially targeted, but courts ordered reinstatements at 18 agencies covering over 24,000 workers. By mid-2026, approximately 25,000 fired workers had been rehired after agencies deemed them essential. The net reduction is significantly smaller than initially claimed, and the churn was costly.",
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
          DOGE Spending Cuts: The Final Scorecard
        </h1>
        <ShareButtons title="DOGE Spending Cuts — OpenSpending" url="https://www.openspending.us/doge-spending-cuts" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Updated: September 2026</p>
      <p className="text-gray-500 text-lg mb-10">
        DOGE officially sunset on July 4, 2026. Here&apos;s the final scorecard — what was actually saved,
        what the auditors found, and what happens next.
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
            DOGE officially sunset on July 4, 2026, claiming $215 billion in total savings — but issuing no
            final report. The GAO&apos;s August 2026 audit found that $110 billion of those claimed savings from
            contract, grant, and lease cancellations were either incorrect or lacked supporting evidence.
            Independent verification confirms roughly $36 billion in concrete, realized savings.
          </p>
          <p className="text-gray-600 mb-3">
            Elon Musk departed the initiative eight months before its scheduled end. DOGE&apos;s &quot;wall of
            receipts&quot; acknowledged that posted savings represented only about 30% of their total claims —
            meaning 70% of the $215 billion was never even documented publicly. The Politico analysis of $32.7
            billion in contract savings found only $1.4 billion was verifiable — less than 5% of what was claimed.
          </p>
          <p className="text-gray-600">
            The verified $36 billion still ranks as one of the largest spending reductions in modern federal
            history — more than the annual budget of the Department of Energy. But the gap between $215 billion
            claimed and $36 billion verified tells you everything about the difference between headlines and
            accounting.
          </p>
        </div>
      </section>

      {/* Workforce Right-Sizing */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Workforce Right-Sizing</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            The workforce story became DOGE&apos;s most complicated legacy. Approximately 120,000 positions were
            initially targeted, but the aftermath was messy: courts ordered reinstatements at 18 agencies covering
            over 24,000 workers. By mid-2026, approximately 25,000 fired federal workers had been rehired after
            agencies determined they were essential to operations.
          </p>
          <p className="text-gray-600 mb-3">
            A September 2026 GAO report revealed that federal employees were paid billions through deferred
            resignation programs to not work — and many agencies later had to replace the same workers they
            paid to leave. The Partnership for Public Service identified over 20,000 new hires by June 2026
            in the same types of positions that had been cut.
          </p>
          <p className="text-gray-600">
            The net workforce reduction is real but smaller than advertised, and the churn was expensive. When
            you pay people to leave and then pay different people to do the same jobs, the &quot;savings&quot;
            evaporate. The lesson: blanket workforce cuts without understanding which positions are essential
            creates more waste, not less.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            <span className="font-bold">25,000+</span> workers were rehired or reinstated by court order after
            agencies realized they were essential. The deferred resignation program cost billions — paying
            people to leave, then paying new people to do the same work.
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

      {/* After DOGE */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">After DOGE: What Now?</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            With DOGE sunset, the question is whether any of its structural changes stick. Some will: federal
            real estate consolidation, IT modernization, and procurement reforms have bipartisan support and
            don&apos;t require DOGE to continue. The USAID restructuring under the State Department is likely
            permanent. But without ongoing executive pressure, the natural tendency of government is to grow
            back.
          </p>
          <p className="text-gray-600">
            The <Link href="/federal-budget-2026" className="text-indigo-600 hover:text-indigo-800 underline">FY2026 budget</Link> is
            projected at $7.8 trillion — up from $6.75 trillion in FY2025. Mandatory spending continues growing
            on autopilot. Interest on the debt is approaching $1 trillion. The problems DOGE was created to
            solve are bigger than ever, and they require Congress to address the structural drivers that no
            executive initiative can touch.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            DOGE proved that $36 billion in real waste exists and can be cut. But it also proved that cutting
            headcount without structural reform creates expensive churn. The trillion-dollar problems —
            Social Security solvency, Medicare cost growth, $900+ billion in annual interest — still require
            Congressional action that no executive initiative can substitute for.
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
