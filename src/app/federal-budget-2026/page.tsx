import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata = {
  title: "Federal Budget 2026: Where Your Tax Dollars Go — OpenSpending",
  description: "The FY2026 federal budget is $6.9 trillion with a projected deficit of $1.9 trillion. Breakdown by category: Social Security, Medicare, Defense, Interest, and more.",
  openGraph: {
    title: "Federal Budget 2026: Where Your Tax Dollars Go — OpenSpending",
    description: "The FY2026 federal budget: $6.9T in spending, $1.9T deficit. Where every dollar goes, category by category.",
  },
};

const statCards = [
  {
    label: "Total Federal Spending",
    value: "$6.9T",
    sub: "FY2026 projected outlays",
  },
  {
    label: "Federal Revenue",
    value: "$5.0T",
    sub: "taxes, fees, and other income",
  },
  {
    label: "Deficit",
    value: "$1.9T",
    sub: "borrowed to cover the gap",
  },
  {
    label: "Interest on Debt",
    value: "$900B",
    sub: "nearly matching the defense budget",
  },
];

const budgetCategories = [
  { category: "Social Security", fy2026: "$1.50T", fy2025: "$1.42T", change: "+5.6%", pct: "21.7%", notes: "Mandatory; driven by COLA adjustments and retiring baby boomers" },
  { category: "Medicare", fy2026: "$1.00T", fy2025: "$0.94T", change: "+6.4%", pct: "14.5%", notes: "Mandatory; healthcare cost inflation and enrollment growth" },
  { category: "Interest on Debt", fy2026: "$0.90T", fy2025: "$0.82T", change: "+9.8%", pct: "13.0%", notes: "Fastest-growing category; driven by higher rates and growing principal" },
  { category: "Defense", fy2026: "$0.886T", fy2025: "$0.858T", change: "+3.3%", pct: "12.8%", notes: "Excludes supplemental Iran conflict funding (~$42B additional)" },
  { category: "Health/Medicaid", fy2026: "$0.70T", fy2025: "$0.67T", change: "+4.5%", pct: "10.1%", notes: "Federal share of Medicaid, CHIP, ACA subsidies" },
  { category: "Income Security", fy2026: "$0.60T", fy2025: "$0.58T", change: "+3.4%", pct: "8.7%", notes: "SNAP, housing assistance, EITC, unemployment, disability" },
  { category: "Veterans Benefits", fy2026: "$0.35T", fy2025: "$0.33T", change: "+6.1%", pct: "5.1%", notes: "VA healthcare, disability compensation, PACT Act costs rising" },
  { category: "Education", fy2026: "$0.10T", fy2025: "$0.11T", change: "-9.1%", pct: "1.4%", notes: "Reduced by DOGE consolidations; student loan policy changes" },
  { category: "All Other", fy2026: "$0.864T", fy2025: "$0.88T", change: "-1.8%", pct: "12.5%", notes: "Transportation, agriculture, science, environment, foreign affairs, etc." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does the federal government spend in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The federal government is projected to spend approximately $6.9 trillion in FY2026, up from $6.75 trillion in FY2025. Revenue is approximately $5.0 trillion, leaving a deficit of about $1.9 trillion.",
      },
    },
    {
      "@type": "Question",
      name: "What is the biggest category of federal spending?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Social Security is the largest single spending category at approximately $1.5 trillion (21.7% of the budget). Medicare is second at $1.0 trillion. Together, these two programs account for over a third of all federal spending.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the U.S. pay in interest on the national debt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Interest payments on the national debt are projected at approximately $900 billion in FY2026, making it the third-largest spending category — nearly matching the $886 billion defense budget. Interest costs have grown 9.8% from FY2025 and are the fastest-growing budget category.",
      },
    },
    {
      "@type": "Question",
      name: "What is the federal deficit in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The projected federal deficit for FY2026 is approximately $1.9 trillion — the government spends $6.9 trillion but only collects $5.0 trillion in revenue. This deficit adds directly to the national debt, which has crossed $36 trillion.",
      },
    },
    {
      "@type": "Question",
      name: "How has DOGE affected the federal budget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DOGE has contributed to flattening discretionary spending growth — the 'All Other' category actually declined 1.8% and Education fell 9.1%. However, the major budget drivers (Social Security, Medicare, interest) are mandatory spending that DOGE cannot touch through executive action alone. Verified DOGE savings of ~$36 billion represent about 0.5% of the total budget.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the military cost in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The base defense budget is $886 billion. When including supplemental funding for the Iran conflict (~$42 billion), actual military spending exceeds $920 billion — the highest in American history. Defense represents about 12.8% of total federal spending.",
      },
    },
  ],
};

export default function FederalBudget2026Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs items={[{ label: "Analysis" }, { label: "Federal Budget 2026" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Federal Budget 2026: Where Your Tax Dollars Go
        </h1>
        <ShareButtons title="Federal Budget 2026 — OpenSpending" url="https://www.openspending.us/federal-budget-2026" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Updated: July 2026</p>
      <p className="text-gray-500 text-lg mb-10">
        $6.9 trillion in spending. $5.0 trillion in revenue. $1.9 trillion in new debt. Here&apos;s where it all goes.
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
          The federal government will borrow $1.9 trillion this year — roughly $5.2 billion every single day.
          Interest on past borrowing now costs $900 billion annually, nearly matching the entire defense budget.
          We are approaching the point where the cost of past spending exceeds the cost of current defense.
          That is not a political talking point. It is a mathematical certainty.
        </p>
      </div>

      {/* Budget Breakdown Table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">FY2026 Budget by Category</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">FY2026</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">FY2025</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Change</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">% of Budget</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Notes</th>
              </tr>
            </thead>
            <tbody>
              {budgetCategories.map((row) => (
                <tr key={row.category} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{row.category}</td>
                  <td className="py-3 px-4 text-right font-semibold text-indigo-700">{row.fy2026}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{row.fy2025}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{row.change}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{row.pct}</td>
                  <td className="py-3 px-4 text-gray-500">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The Interest Time Bomb */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Interest Time Bomb</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            The most alarming number in the FY2026 budget isn&apos;t the deficit — it&apos;s the $900 billion in
            interest payments. This is money that buys nothing: no roads, no defense, no healthcare. It is the cost
            of past borrowing, and it is growing faster than any other budget category at nearly 10% per year.
          </p>
          <p className="text-gray-600 mb-3">
            For the first time in modern history, <Link href="/interest" className="text-indigo-600 hover:text-indigo-800 underline">interest
            on the national debt</Link> is within striking distance of the defense budget. By FY2028, CBO projects
            interest will exceed defense spending — meaning we will pay more for past borrowing than for the entire
            U.S. military. That crossover point is no longer theoretical; it is imminent.
          </p>
          <p className="text-gray-600">
            The driver is straightforward: a $36 trillion debt at ~4.5% average interest rate produces $900 billion
            in annual payments. Every additional trillion borrowed at current rates adds $45 billion per year in
            interest — permanently.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            <span className="font-bold">$900 billion</span> in interest payments — $2.5 billion every single day,
            buying absolutely nothing. This is the price of decades of deficit spending, and it will only get worse
            as long as the government borrows $1.9 trillion per year.
          </p>
        </div>
      </section>

      {/* Mandatory vs Discretionary */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Autopilot Problem</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            Roughly 70% of the federal budget is &quot;mandatory&quot; spending — programs like Social Security,
            Medicare, and Medicaid that run on autopilot without annual Congressional approval. Add interest payments
            (which must be paid), and Congress only has real discretion over about 25% of the budget.
          </p>
          <p className="text-gray-600 mb-3">
            This is why <Link href="/doge-spending-cuts" className="text-indigo-600 hover:text-indigo-800 underline">DOGE efficiency
            efforts</Link>, while valuable, can only address a fraction of the spending problem. The verified $36 billion
            in DOGE savings represents about 0.5% of the total budget. Even the most aggressive executive action
            cannot touch the structural drivers: 75 million baby boomers entering retirement, healthcare costs
            growing above inflation, and compound interest on $36 trillion in debt.
          </p>
          <p className="text-gray-600">
            The math is unforgiving. Social Security and Medicare alone cost $2.5 trillion — more than the
            government collects in individual income taxes. These programs are not wasteful; they are simply enormous,
            and they are growing on autopilot while the revenue base cannot keep up.
          </p>
        </div>
      </section>

      {/* Defense + Iran */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Defense Spending &amp; the Iran Conflict</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            The base defense budget of $886 billion represents a 3.3% increase over FY2025. But that number
            understates actual military spending. The <Link href="/iran-war-costs" className="text-indigo-600 hover:text-indigo-800 underline">Iran
            conflict</Link> added roughly $42 billion through supplemental appropriations, pushing total military
            spending above $920 billion — the highest in American history.
          </p>
          <p className="text-gray-600">
            With the June 2026 peace deal, supplemental war funding will decline. But the base budget continues
            to grow, driven by personnel costs, equipment modernization, and the strategic competition with China
            that both parties agree requires sustained investment. The{" "}
            <Link href="/pentagon-deep-dive" className="text-indigo-600 hover:text-indigo-800 underline">Pentagon deep dive</Link> examines
            where those dollars go in detail.
          </p>
        </div>
      </section>

      {/* Revenue Side */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Revenue Side</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            Federal revenue is projected at $5.0 trillion in FY2026 — a record in dollar terms but insufficient
            to cover $6.9 trillion in spending. The largest revenue sources: individual income taxes (~$2.6T),
            payroll taxes (~$1.7T), corporate taxes (~$0.45T), and excise/customs/other (~$0.25T).
          </p>
          <p className="text-gray-600">
            The structural deficit is not primarily a revenue problem — the government collects more revenue than
            ever. It is a spending problem. Revenue has grown roughly 15% since FY2022, but spending has grown
            faster. Even if revenue increased 20%, the deficit would still exceed $500 billion. The gap is too
            large to tax your way out of.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-2">Your Share</h3>
          <p className="text-indigo-800">
            With approximately 133 million individual income tax returns filed, the FY2026 budget works out to
            roughly $51,900 in spending per taxpayer — but only $37,600 in revenue per taxpayer. The remaining
            $14,300 per taxpayer is borrowed. Use our{" "}
            <Link href="/where-tax-dollars-go" className="text-indigo-600 hover:text-indigo-800 underline">tax dollar calculator</Link> to
            see exactly where your contribution goes.
          </p>
        </div>
      </section>

      {/* What Needs to Change */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What Needs to Change</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-3">
            The <Link href="/national-debt" className="text-indigo-600 hover:text-indigo-800 underline">national debt</Link> is growing
            by $1.9 trillion per year. Interest is consuming $900 billion. Mandatory spending is on autopilot.
            And the deficit is projected to grow, not shrink, over the next decade.
          </p>
          <p className="text-gray-600 mb-3">
            There are only four levers: cut mandatory spending (politically toxic), cut discretionary spending
            (already being squeezed), raise taxes (insufficient alone), or grow the economy faster than spending
            (the optimistic scenario). Realistically, any solution requires a combination of all four — and the
            political will to make choices that every recent Congress and administration has avoided.
          </p>
          <p className="text-gray-600">
            The numbers in this budget are not projections or estimates about some distant future. They are this
            year&apos;s reality. And they will be worse next year.
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/where-tax-dollars-go" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Where Tax Dollars Go</p>
            <p className="text-sm text-gray-600 mt-1">See exactly how your taxes are spent</p>
          </Link>
          <Link href="/doge-spending-cuts" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">DOGE Spending Cuts</p>
            <p className="text-sm text-gray-600 mt-1">$36B in verified savings and counting</p>
          </Link>
          <Link href="/iran-war-costs" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Iran War Costs</p>
            <p className="text-sm text-gray-600 mt-1">$42B military conflict breakdown</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
