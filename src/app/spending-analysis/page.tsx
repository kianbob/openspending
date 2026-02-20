import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Where Does $11.2 Trillion Actually Go? | OpenSpending",
  description:
    "A comprehensive breakdown of the federal budget — mandatory vs discretionary spending, top agencies, contracts vs grants, and what it means per taxpayer.",
};

export default function SpendingAnalysisPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-indigo-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Spending Analysis</span>
      </nav>

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Where Does $11.2 Trillion Actually Go?
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Published February 2025 · Editorial Analysis
      </p>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The federal government spent <strong>$11.2 trillion</strong> in fiscal year 2025. That number
          is so large it&apos;s almost meaningless — until you start breaking it down. Where does it all go?
          Who decides? And is any of it actually accountable?
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We dug into every dollar using data from{" "}
          <a href="https://www.usaspending.gov" target="_blank" rel="noopener noreferrer" className="text-indigo-700 underline">
            USASpending.gov
          </a>
          , the government&apos;s own transparency portal. Here&apos;s what we found.
        </p>

        {/* Key stat callout */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-indigo-900 mb-2">$11.2 Trillion</p>
          <p className="text-indigo-800">
            Total federal spending in FY2025 — across 97 agencies, thousands of programs, and millions of
            individual transactions.
          </p>
        </div>

        {/* Mandatory vs Discretionary */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Mandatory vs. Discretionary: The Split Nobody Talks About</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Here&apos;s the dirty secret of the federal budget: <strong>most of it is on autopilot</strong>.
          Roughly two-thirds of all federal spending is &ldquo;mandatory&rdquo; — programs like Social Security,
          Medicare, and Medicaid that pay out automatically based on eligibility rules set by law. Congress
          doesn&apos;t vote on these amounts each year. They just happen.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The remaining third is &ldquo;discretionary&rdquo; spending — the part Congress actually debates and
          appropriates annually. This includes defense, education, transportation, and everything else people
          usually argue about. But here&apos;s the thing: even &ldquo;discretionary&rdquo; spending barely changes
          year to year. It goes up.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Then there&apos;s interest on the national debt — now exceeding <strong>$900 billion per year</strong>.
          That&apos;s money that buys nothing. No roads, no defense, no healthcare. Just servicing past decisions.
        </p>

        {/* Pull quote */}
        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;Two-thirds of the federal budget runs on autopilot. Congress doesn&apos;t vote on it.
            It just happens.&rdquo;
          </p>
        </blockquote>

        {/* Top 5 Agencies */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Big Five: Where the Money Concentrates</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Five agencies account for the vast majority of federal spending. These aren&apos;t obscure
          bureaucracies — they&apos;re the pillars of the federal apparatus:
        </p>

        <div className="space-y-4 my-8">
          {[
            { agency: "Department of the Treasury", amount: "$3.7 Trillion", desc: "Interest on debt, tax refunds, Social Security payments, and fiscal operations. The government's bank account.", color: "bg-red-50 border-red-500" },
            { agency: "Health and Human Services (HHS)", amount: "$2.6 Trillion", desc: "Medicare, Medicaid, NIH, CDC, and hundreds of health programs. The quiet giant of federal spending.", color: "bg-blue-50 border-blue-500" },
            { agency: "Department of Defense (DOD)", amount: "$1.4 Trillion", desc: "Military operations, weapons systems, personnel, and the world's largest logistics operation.", color: "bg-green-50 border-green-500" },
            { agency: "Department of Veterans Affairs", amount: "$517 Billion", desc: "Healthcare, benefits, and services for 18 million veterans. One of the fastest-growing budgets.", color: "bg-purple-50 border-purple-500" },
            { agency: "Social Security Administration", amount: "$473 Billion", desc: "Retirement, disability, and survivor benefits for 70+ million Americans.", color: "bg-amber-50 border-amber-500" },
          ].map((item) => (
            <div key={item.agency} className={`${item.color} border-l-4 p-5 rounded-r-lg`}>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{item.agency}</h3>
                <span className="font-bold text-lg text-gray-900 whitespace-nowrap ml-4">{item.amount}</span>
              </div>
              <p className="text-gray-700 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Together, these five agencies account for over <strong>$8.7 trillion</strong> — roughly 78% of all
          federal spending. Everything else — Education, Justice, NASA, EPA, State Department — splits the remaining 22%.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/agencies" className="text-indigo-700 underline font-medium">See all 97 agencies ranked by spending →</Link>
        </p>

        {/* Contracts vs Grants */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Contracts vs. Grants: Two Ways to Spend $2 Trillion</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Beyond the big mandatory programs, the government distributes money through two main channels:
          <strong> contracts</strong> (buying goods and services from companies) and <strong>grants</strong> (giving
          money to states, universities, nonprofits, and other organizations).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
            <p className="text-2xl font-bold text-indigo-900">$778 Billion</p>
            <p className="text-indigo-800 font-medium">Federal Contracts</p>
            <p className="text-sm text-indigo-700 mt-2">
              Weapons, IT systems, construction, consulting, healthcare administration
            </p>
          </div>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
            <p className="text-2xl font-bold text-emerald-900">$1.24 Trillion</p>
            <p className="text-emerald-800 font-medium">Federal Grants</p>
            <p className="text-sm text-emerald-700 mt-2">
              Medicaid, highway funding, education, research, housing assistance
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Grants outpace contracts by a wide margin — largely because Medicaid alone sends hundreds of
          billions to states. But contracts are where the real concentration happens: just 10 companies
          receive nearly 19% of all contract dollars.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/contractors" className="text-indigo-700 underline font-medium">See the top 50 federal contractors →</Link>
        </p>

        {/* Defense vs Social vs Interest */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Defense, Social Programs, and the Interest Trap</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The political debate usually frames spending as &ldquo;defense vs. social programs.&rdquo; But that
          framing misses the third player: <strong>interest on the debt</strong>.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Social Programs (SS, Medicare, Medicaid, VA)</span>
              <span className="font-bold">~$5.5T</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full" style={{ width: "49%" }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Defense & Security</span>
              <span className="font-bold">~$1.4T</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: "12.5%" }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Interest on Debt</span>
              <span className="font-bold">~$900B</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-red-500 h-4 rounded-full" style={{ width: "8%" }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Everything Else</span>
              <span className="font-bold">~$3.4T</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-amber-500 h-4 rounded-full" style={{ width: "30%" }}></div>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Interest on the debt is now larger than the entire defense budget was 20 years ago. And unlike
          defense or social programs, cutting it requires paying down the debt — which neither party has
          shown any interest in doing.
        </p>

        {/* Your Share */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Your Share: $34,000 Per Person</h2>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg my-8">
          <p className="text-4xl font-bold text-amber-900 mb-2">~$34,000</p>
          <p className="text-amber-800">
            Your share of the $11.2 trillion federal budget, based on 330 million Americans.
            That&apos;s per person — not per taxpayer, not per household. Per person, including children.
          </p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          For a family of four, that&apos;s <strong>$136,000 per year</strong> in federal spending attributed
          to your household. That number exceeds the median household income in the United States. The
          government spends more per family than most families earn.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Of course, not all of that is funded by current taxes — a significant portion is borrowed. Which
          brings us back to that $900 billion in annual interest payments. We&apos;re spending money we don&apos;t
          have, and paying interest on the difference.
        </p>

        {/* Editorial */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Is This Sustainable?</h2>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;Federal spending keeps growing regardless of which party controls Congress or the White House.
            The question isn&apos;t whether we&apos;re spending too much — it&apos;s whether anyone is even trying to stop.&rdquo;
          </p>
        </blockquote>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Under Republican presidents, spending grows. Under Democratic presidents, spending grows. Under
          unified government, spending grows. Under divided government, spending grows. The trajectory is
          remarkably consistent regardless of who holds power.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The DOGE effort has drawn attention to government waste, and there are real savings to be found
          in fraud, improper payments, and duplicative programs. But trimming around the edges won&apos;t change
          the fundamental math: mandatory spending grows automatically, interest compounds, and no one wants
          to be the politician who cuts Social Security or Medicare.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Until that changes, $11.2 trillion is just the starting point. Next year, it&apos;ll be higher.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/trends" className="text-indigo-700 underline font-medium">See spending trends over the last decade →</Link>
        </p>

        {/* Related Analysis */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/trends" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Spending Trends</p>
              <p className="text-sm text-gray-600 mt-1">How federal spending has changed over the past decade</p>
            </Link>
            <Link href="/agencies" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">All Federal Agencies</p>
              <p className="text-sm text-gray-600 mt-1">Browse spending data for every federal agency</p>
            </Link>
            <Link href="/waste" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Government Waste</p>
              <p className="text-sm text-gray-600 mt-1">The most egregious examples of wasteful spending</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
