import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata = {
  title: "DOGE Aftermath: What Actually Happened After the Cuts — OpenSpending",
  description:
    "DOGE sunset July 4, 2026. The workforce shrank 12%, the deficit hit $2.1 trillion, and the deferred resignation program cost $6.7 billion. A data-driven post-mortem.",
  openGraph: {
    title:
      "DOGE Aftermath: What Actually Happened After the Cuts — OpenSpending",
    description:
      "271K federal employees gone, $6.7B spent paying people to leave, deficit at $2.1T, national debt past $40T. The full post-mortem.",
  },
};

const timelineEvents = [
  {
    date: "Jan 20, 2025",
    title: "DOGE Created",
    description:
      'Executive order establishes the Department of Government Efficiency as a temporary advisory body. Elon Musk named to lead. Original target: $2 trillion in savings.',
    tone: "neutral" as const,
  },
  {
    date: "Feb 2025",
    title: '"Fork in the Road" Email',
    description:
      "DOGE sends mass email to 2 million federal workers offering deferred resignation — full pay through September 2025 to voluntarily leave. 140,000 accept.",
    tone: "neutral" as const,
  },
  {
    date: "Feb–Jun 2025",
    title: "Mass Firings & Court Orders",
    description:
      "Agencies begin RIFs (reductions in force). Courts order reinstatements at 18+ agencies. Thousands of workers are fired, rehired, and fired again.",
    tone: "negative" as const,
  },
  {
    date: "Aug 2025",
    title: "Politico Investigation",
    description:
      "Politico analyzes $32.7B in claimed contract savings and finds only $1.4B — less than 5% — was real. Much of the rest was double-counted or from contracts that were already ending.",
    tone: "negative" as const,
  },
  {
    date: "Jul 4, 2026",
    title: "DOGE Sunsets",
    description:
      "DOGE officially closes per its executive order mandate, claiming $215 billion in total savings. No final report is published. The Wall of Receipts website remains active.",
    tone: "neutral" as const,
  },
  {
    date: "Aug 6, 2026",
    title: "GAO Audit Released",
    description:
      'The Government Accountability Office finds that $110 billion of DOGE\'s Wall of Receipts savings from contracts, grants, and leases were "incorrect or lack supporting evidence."',
    tone: "negative" as const,
  },
  {
    date: "Sep 2026",
    title: "GAO: Deferred Resignation Cost $6.7B",
    description:
      'A second GAO report finds a 435% increase in administrative leave costs between 2023–2025, with $6.7 billion attributable to DOGE\'s "Fork in the Road" program alone.',
    tone: "negative" as const,
  },
  {
    date: "Sep 30, 2026",
    title: "FY2026 Closes",
    description:
      "FY2026 ends with a ~$2.1 trillion deficit. National debt crosses $40 trillion. Total federal outlays increased despite DOGE. Interest costs exceed $1 trillion for the first time.",
    tone: "negative" as const,
  },
];

const scorecard = [
  {
    metric: "Savings Promised",
    value: "$2 Trillion",
    reality: "Original target; quietly abandoned within months",
  },
  {
    metric: "Savings Claimed",
    value: "$215 Billion",
    reality: "Self-reported at sunset; no final audit published",
  },
  {
    metric: "GAO Verified (Wall of Receipts)",
    value: "~$36 Billion",
    reality: "$110B of $146B in contract/grant/lease claims unsubstantiated",
  },
  {
    metric: "Workforce Reduction",
    value: "271,000 (12%)",
    reality: "Per OPM data; includes voluntary resignations, RIFs, and attrition",
  },
  {
    metric: "Deferred Resignation Cost",
    value: "$6.7 Billion",
    reality: "GAO found 435% increase in admin leave costs, mostly from DOGE",
  },
  {
    metric: "Federal Deficit Change",
    value: "+$200B (to $2.1T)",
    reality: "Deficit grew from ~$1.9T in FY2025 to ~$2.1T in FY2026",
  },
  {
    metric: "National Debt",
    value: "$40+ Trillion",
    reality: "Doubled in 10 years; grew $3.8T since Jan 2025",
  },
  {
    metric: "Interest on Debt",
    value: "$1+ Trillion",
    reality: "Exceeded $1T for the first time in FY2026; now largest after Social Security",
  },
];

export default function DogeAftermathPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[{ label: "Analysis" }, { label: "DOGE Aftermath" }]}
      />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          DOGE Aftermath: What Actually Happened
        </h1>
        <ShareButtons
          title="DOGE Aftermath — OpenSpending"
          url="https://www.openspending.us/doge-aftermath"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Updated: September 2026</p>
      <p className="text-gray-500 text-lg mb-10">
        The Department of Government Efficiency sunset on July 4, 2026. The federal workforce
        is 12% smaller. The deficit is $2.1 trillion. The national debt passed $40 trillion.
        Here&apos;s the full accounting of what DOGE actually accomplished — and what it cost.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Workers Who Left</p>
          <p className="text-2xl font-bold text-gray-900">271,000</p>
          <p className="text-sm text-gray-500 mt-1">12% of the federal workforce</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Cost to Pay Them to Leave</p>
          <p className="text-2xl font-bold text-red-600">$6.7 Billion</p>
          <p className="text-sm text-gray-500 mt-1">Deferred resignation + admin leave</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">FY2026 Deficit</p>
          <p className="text-2xl font-bold text-red-600">~$2.1 Trillion</p>
          <p className="text-sm text-gray-500 mt-1">Up from $1.9T in FY2025</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">National Debt</p>
          <p className="text-2xl font-bold text-red-600">$40+ Trillion</p>
          <p className="text-sm text-gray-500 mt-1">+$3.8T since Jan 2025</p>
        </div>
      </div>

      {/* Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          Government right-sizing is a legitimate goal. The federal workforce grew 15% between 2019 and 2024,
          and plenty of positions exist that serve bureaucratic inertia more than taxpayers. But the way DOGE
          executed — mass firings followed by court-ordered rehires, billions spent on deferred resignations,
          and inflated savings claims — turned a reform opportunity into an expensive object lesson in how
          not to shrink government. The spending trajectory didn&apos;t bend. It got worse.
        </p>
      </div>

      {/* Final Scorecard */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Final Scorecard</h2>
        <p className="text-gray-600 mb-6">
          Comparing what DOGE promised, what it claimed, and what independent auditors found.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Metric</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Reality</th>
              </tr>
            </thead>
            <tbody>
              {scorecard.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{row.metric}</td>
                  <td className="py-3 px-4 text-right font-semibold text-indigo-700">{row.value}</td>
                  <td className="py-3 px-4 text-gray-600">{row.reality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The $6.7 Billion "Fork in the Road" */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The $6.7 Billion &quot;Fork in the Road&quot;
        </h2>
        <p className="text-gray-600 mb-4">
          In February 2025, DOGE sent a mass email to 2 million federal workers offering &quot;deferred
          resignation&quot; — leave the government voluntarily and keep receiving your salary through September.
          About 140,000 employees took the deal. A September 2026 GAO report found the program drove a
          435% increase in administrative leave costs across the federal government, totaling $9.5 billion —
          with $6.7 billion directly attributable to DOGE&apos;s program.
        </p>
        <p className="text-gray-600 mb-4">
          OPM Director Scott Kupor defended the program, arguing that removing 270,000 employees from
          the payroll saves $40 billion per year going forward — a &quot;400% return on investment.&quot; That
          math assumes every eliminated position stays eliminated and was genuinely unnecessary.
          History suggests otherwise: after every previous federal RIF, Congress eventually authorized
          replacement hiring.
        </p>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">
            <strong>The counterargument:</strong> Personnel costs are only 5.5% of the federal budget.
            Even if you fired every federal employee, you&apos;d save roughly $370 billion — nowhere
            near enough to close a $2.1 trillion deficit. The spending problem is structural:
            Social Security, Medicare, and interest on the debt grow automatically by law.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">DOGE Timeline: Start to Sunset</h2>
        <p className="text-gray-600 mb-6">
          From January 2025 to September 2026 — the full arc of DOGE&apos;s existence.
        </p>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-6">
            {timelineEvents.map((event, i) => (
              <div key={i} className="relative pl-10">
                <div
                  className={`absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-white ${
                    event.tone === "negative"
                      ? "bg-red-500"
                      : "bg-indigo-500"
                  }`}
                />
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {event.date}
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Bigger Picture */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Bigger Picture</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Interest Costs Crossed $1 Trillion
            </h3>
            <p className="text-gray-600 text-sm">
              Through August 2026, gross interest payments on federal debt hit $1.267 trillion — a record
              pace. Interest is now the second-largest line item in the federal budget after Social Security,
              surpassing defense and Medicare. Every dollar spent on interest is a dollar unavailable for
              everything else. DOGE never addressed this.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              The Tariff Refund Problem
            </h3>
            <p className="text-gray-600 text-sm">
              After the Supreme Court ruled in February 2026 that the president lacked authority to impose
              certain tariffs unilaterally, the Treasury had to refund approximately $125 billion in
              previously collected tariff revenue. This single event added more to the FY2026 deficit
              than DOGE&apos;s entire verified savings of $36 billion.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Deficit Grew Despite &quot;Efficiency&quot;
            </h3>
            <p className="text-gray-600 text-sm">
              The FY2026 deficit is tracking to approximately $2.1 trillion — up from $1.9 trillion
              in FY2025. The CBO projected a $1.9T deficit in February; tariff refunds and interest
              growth pushed it higher. Over 98% of federal revenue now goes to mandatory spending
              plus interest, meaning Congress borrows for virtually all discretionary programs.
            </p>
          </div>
        </div>
      </section>

      {/* What Would Actually Work */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          What Would Actually Bend the Curve
        </h2>
        <p className="text-gray-600 mb-4">
          DOGE targeted the wrong slice of the budget. If the goal is fiscal sustainability,
          here&apos;s what the math actually requires:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <p className="font-bold text-indigo-900">Entitlement Reform</p>
            <p className="text-sm text-indigo-800 mt-1">
              Social Security and Medicare alone cost $2.5+ trillion. No amount of firing bureaucrats
              changes this. Means-testing, raising eligibility ages, or adjusting COLA formulas would.
              Congress won&apos;t touch it.
            </p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <p className="font-bold text-indigo-900">Interest Rate Reduction</p>
            <p className="text-sm text-indigo-800 mt-1">
              Interest costs are on autopilot. The only levers: reduce the debt (requires surpluses)
              or get lower rates (requires Fed policy). Neither is in DOGE&apos;s toolkit.
            </p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <p className="font-bold text-indigo-900">Revenue Growth</p>
            <p className="text-sm text-indigo-800 mt-1">
              Revenue of $5.2+ trillion is at record levels, but spending still outpaces it.
              Revenue grew ~15% since FY2022; spending grew ~30%. The gap is structural.
            </p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <p className="font-bold text-indigo-900">Defense Accountability</p>
            <p className="text-sm text-indigo-800 mt-1">
              The Pentagon has never passed a full audit. Defense spending exceeds $950 billion
              including supplementals. DOGE conspicuously avoided touching defense.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Line */}
      <section className="mb-14">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">The Bottom Line</h2>
          <p className="text-gray-600 mb-3">
            DOGE accomplished three things: it raised public awareness of government waste, it
            identified $36 billion in genuinely wasteful spending, and it demonstrated that
            you cannot solve a $2.1 trillion deficit by firing mid-level bureaucrats.
          </p>
          <p className="text-gray-600 mb-3">
            The 271,000 workforce reduction is real and will save money if those positions stay
            eliminated. But the execution was chaotic — court-ordered rehires, $6.7 billion in
            deferred resignation costs, and agencies left understaffed in critical functions.
            The claimed $215 billion in savings was substantially inflated per the GAO.
          </p>
          <p className="text-gray-600">
            The federal spending problem isn&apos;t about headcount or canceled subscriptions.
            It&apos;s about $2.5 trillion in entitlements that grow automatically, $1+ trillion in
            interest that compounds daily, and a political system that won&apos;t touch either one.
            Until that changes, the deficit will keep growing — no matter how many efficiency
            commissions we create.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <p className="text-indigo-900 text-lg font-medium italic">
            &quot;You can&apos;t efficiency your way out of a structural deficit.
            The math requires choices no one in Washington wants to make.&quot;
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sources</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• GAO-26-108615: &quot;DOGE Wall of Receipts&quot; audit (August 6, 2026)</li>
          <li>• GAO-26-108477: Federal administrative leave / deferred resignation costs (September 2026)</li>
          <li>• OPM workforce data: data.opm.gov (271,000 separations since Jan 2025)</li>
          <li>• CBO Monthly Budget Review, August 2026</li>
          <li>• Politico: $32.7B contract savings analysis (August 2025)</li>
          <li>• Treasury fiscal data: fiscaldata.treasury.gov</li>
          <li>• Peter G. Peterson Foundation deficit tracker</li>
        </ul>
      </section>

      {/* Related */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/doge-reality"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">DOGE Reality Check</p>
            <p className="text-sm text-gray-600 mt-1">
              $215B claimed, $36B verified — the data breakdown
            </p>
          </Link>
          <Link
            href="/interest"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">Interest Time Bomb</p>
            <p className="text-sm text-gray-600 mt-1">
              $1T+ in interest — now larger than defense
            </p>
          </Link>
          <Link
            href="/national-debt"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <p className="font-bold text-gray-900">National Debt</p>
            <p className="text-sm text-gray-600 mt-1">
              $40+ trillion and growing
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
