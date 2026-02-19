import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Healthcare: The Quiet Giant | OpenSpending",
  description:
    "HHS spends $2.6 trillion per year — more than any agency except Treasury. Medicare, Medicaid, improper payments, and why spending more doesn't mean better outcomes.",
};

export default function HealthcareSpendingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-indigo-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Healthcare Spending</span>
      </nav>

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Healthcare: The Quiet Giant
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Published February 2025 · Editorial Analysis
      </p>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          When Americans argue about government spending, they argue about defense. About foreign aid. About
          welfare. They almost never argue about the single largest driver of federal expenditure outside of
          debt service: the <strong>Department of Health and Human Services</strong>.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          HHS spent <strong>$2.6 trillion</strong> in FY2025 — more than the entire Department of Defense and
          Department of Veterans Affairs <em>combined</em>. Yet it operates largely below the political radar,
          processing Medicare claims, funding Medicaid, and administering hundreds of health programs with
          remarkably little public scrutiny.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-blue-900 mb-2">$2.6 Trillion</p>
          <p className="text-blue-800">
            HHS annual spending — the second-largest agency by budget. Larger than the military. Larger
            than the GDP of France.
          </p>
        </div>

        {/* Medicare and Medicaid */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Medicare and Medicaid: The Two Giants Within the Giant</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The vast majority of HHS spending flows through two programs:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-blue-800 uppercase">Medicare</p>
            <p className="text-3xl font-bold text-blue-900">~$900 Billion</p>
            <p className="text-sm text-blue-700 mt-1">
              Health insurance for 65+ million seniors and disabled Americans. Hospital care, physician
              services, prescription drugs.
            </p>
          </div>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-emerald-800 uppercase">Medicaid</p>
            <p className="text-3xl font-bold text-emerald-900">~$600 Billion</p>
            <p className="text-sm text-emerald-700 mt-1">
              Healthcare for low-income Americans. Federal share of a joint federal-state program
              covering 90+ million people.
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Together, Medicare and Medicaid account for roughly $1.5 trillion — about 58% of all HHS spending.
          The remaining $1.1 trillion covers the NIH ($48B), CDC ($18B), the ACA marketplace subsidies,
          children&apos;s health programs (CHIP), substance abuse funding, and hundreds of smaller programs.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          These programs are mandatory spending — they pay out automatically based on eligibility. If more
          people qualify for Medicare (because the population is aging), spending goes up. No vote required.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;Medicare and Medicaid together cover 155 million Americans and spend $1.5 trillion per
            year. That&apos;s nearly $10,000 per enrollee — and the number grows every year.&rdquo;
          </p>
        </blockquote>

        {/* Optum */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Optum: The $22 Billion Healthcare Contractor You&apos;ve Never Heard Of</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          When people think of government contractors, they think of Lockheed Martin building fighter jets.
          They rarely think of <strong>Optum</strong> — a subsidiary of UnitedHealth Group — which receives
          <strong> $22 billion per year</strong> in federal contracts, making it the second-largest government
          contractor in America.
        </p>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-purple-900 mb-2">$22 Billion</p>
          <p className="text-purple-800">
            Optum&apos;s federal contracts — more than Boeing ($13B), more than Raytheon ($17B). The quiet
            giant of government contracting.
          </p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          What does Optum do for $22 billion? It administers portions of Medicare and Medicaid, processes
          claims, manages healthcare data, runs IT systems, and provides analytics for federal health
          programs. It&apos;s the back office of American government healthcare.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The concentration here is striking: UnitedHealth Group — Optum&apos;s parent — is simultaneously
          the nation&apos;s largest health insurer, the largest employer of physicians, and the largest
          government healthcare contractor. That vertical integration gives it extraordinary insight into
          healthcare spending flows and extraordinary influence over how those flows are managed.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/contractors" className="text-indigo-700 underline font-medium">
            See all top federal contractors →
          </Link>
        </p>

        {/* Improper Payments */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">$100+ Billion in Improper Payments</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Every year, the federal government reports &ldquo;improper payments&rdquo; — money sent to the
          wrong person, in the wrong amount, or without proper documentation. Healthcare programs are
          by far the largest source.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-red-900 mb-2">$100+ Billion</p>
          <p className="text-red-800">
            Estimated annual improper payments in Medicare and Medicaid combined. Not all fraud — but
            not all legitimate either.
          </p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Medicare alone reports improper payment rates of 7-8% — roughly $60-70 billion per year. Medicaid
          adds another $40-50 billion. &ldquo;Improper&rdquo; doesn&apos;t always mean fraud — it includes
          billing errors, insufficient documentation, and payments for services that didn&apos;t meet program
          requirements. But some portion is outright fraud: fake clinics billing for phantom patients,
          kickback schemes, and upcoding (billing for more expensive procedures than performed).
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          To put this in perspective: $100 billion in improper payments exceeds the entire budget of the
          Department of Education. We lose more to healthcare billing errors and fraud than we spend
          educating the nation&apos;s children.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/waste" className="text-indigo-700 underline font-medium">
            Read our full analysis of government waste →
          </Link>
        </p>

        {/* COVID */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">COVID: $290 Billion Through HHS</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The COVID-19 pandemic turned HHS into a spending firehose. The department channeled approximately
          <strong> $290 billion</strong> in pandemic-related spending — vaccine procurement, hospital surge
          payments, testing, therapeutics, and the Provider Relief Fund that sent money directly to
          healthcare facilities.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-amber-900 mb-2">$290 Billion</p>
          <p className="text-amber-800">
            COVID spending through HHS — vaccines, hospital payments, testing, therapeutics. Spent in
            roughly two years.
          </p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The speed was necessary — but it came at a cost. Oversight was minimal. The Provider Relief Fund
          distributed $178 billion with limited verification. Billions went to hospitals that didn&apos;t need
          it. Fraud in pandemic healthcare programs is still being uncovered years later.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Perhaps most importantly, the pandemic spending created new baseline expectations. Programs
          expanded, staffing increased, and many of those costs haven&apos;t fully receded. HHS&apos;s budget is
          permanently higher as a result.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/covid" className="text-indigo-700 underline font-medium">
            See our full COVID spending analysis →
          </Link>
        </p>

        {/* Outcomes */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Outcomes Paradox</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The United States spends more on healthcare — both publicly and privately — than any other country
          on Earth. Federal healthcare spending alone exceeds the <em>total</em> healthcare spending of most
          developed nations. And what do we get for it?
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
          <h3 className="font-bold text-gray-900 mb-4">US Healthcare Spending vs. Outcomes</h3>
          <div className="space-y-3">
            {[
              { metric: "Per-capita healthcare spending", us: "#1 ($12,500)", peers: "OECD avg: $5,000" },
              { metric: "Life expectancy", us: "#46 (77.5 years)", peers: "Japan: 84.8, UK: 81.8" },
              { metric: "Infant mortality", us: "#33 (5.4/1,000)", peers: "Japan: 1.8, Sweden: 2.1" },
              { metric: "Preventable deaths", us: "Worst in OECD", peers: "—" },
              { metric: "Diabetes prevalence", us: "#1 in OECD (10.7%)", peers: "OECD avg: 6.9%" },
            ].map((row) => (
              <div key={row.metric} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pb-3 border-b border-gray-200 last:border-0">
                <span className="font-medium text-gray-900 sm:w-48">{row.metric}</span>
                <span className="text-red-700 font-medium sm:w-40">{row.us}</span>
                <span className="text-gray-500 text-sm">{row.peers}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We spend 2.5x the OECD average per person and rank near the bottom on nearly every health outcome
          metric. More money has not produced better health. It has produced a massive healthcare industrial
          complex — insurers, hospital systems, pharmaceutical companies, IT vendors — that extracts
          extraordinary value from the system.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;We spend more than any nation on Earth on healthcare and rank 46th in life expectancy.
            Money in does not equal health out.&rdquo;
          </p>
        </blockquote>

        {/* Editorial */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Money In ≠ Health Out</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The core problem with HHS spending isn&apos;t the total amount — it&apos;s what we get for it.
          $2.6 trillion should buy world-class health outcomes. Instead, it buys a system optimized for
          billing, not healing.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Every dollar that goes to claims processing, administrative overhead, improper payments, and
          fraud is a dollar that doesn&apos;t go to patient care. And the administrative burden is enormous:
          estimates suggest 15-30% of healthcare spending goes to administration — higher than any other
          developed country.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          This isn&apos;t a left-right issue. Progressives want universal coverage; conservatives want market
          competition. Both sides agree the current system is dysfunctional. Neither has been able to fix it,
          because the beneficiaries of dysfunction — the Optums, the hospital chains, the pharmacy benefit
          managers — are powerful enough to block meaningful reform.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The $2.6 trillion will keep growing. Medicare enrollment increases every year as baby boomers age.
          Medicaid expands in more states. Drug costs rise. The question isn&apos;t whether we&apos;ll spend more —
          it&apos;s whether we&apos;ll ever demand results proportional to the investment.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/agencies/department-of-health-and-human-services" className="text-indigo-700 underline font-medium">
            See full HHS budget data →
          </Link>
        </p>

        {/* Related */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <h3 className="font-bold text-gray-900 mb-4">Continue Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/spending-analysis" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Where Does $11.2T Go?</p>
              <p className="text-sm text-gray-600 mt-1">The full federal budget breakdown</p>
            </Link>
            <Link href="/top-10" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">The 10 Companies That Run Government</p>
              <p className="text-sm text-gray-600 mt-1">$145B in contractor concentration</p>
            </Link>
            <Link href="/pentagon-spending" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">The Pentagon: $1.4T and Counting</p>
              <p className="text-sm text-gray-600 mt-1">Defense spending deep dive</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
