import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Pentagon: $1.4 Trillion and Counting | OpenSpending",
  description:
    "Deep dive into Department of Defense spending — budget trajectory, top contractors, the F-35 cost explosion, no-bid contracts, and why DOD has never passed an audit.",
};

export default function PentagonSpendingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-indigo-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Pentagon Spending</span>
      </nav>

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        The Pentagon: $1.4 Trillion and Counting
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Published February 2025 · Editorial Analysis
      </p>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The Department of Defense commands <strong>$1.4 trillion</strong> in annual spending — making it
          the third-largest line item in the federal budget, behind only the Treasury (which handles debt
          payments) and Health and Human Services. It is, by far, the world&apos;s largest military budget,
          exceeding the next 10 countries combined.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          And yet, the Pentagon has <strong>never passed a comprehensive audit</strong>. Not once. The
          department that manages $1.4 trillion cannot fully account for where the money goes.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-red-900 mb-2">$1.4 Trillion</p>
          <p className="text-red-800">
            DOD annual spending — more than the GDP of Australia, and the department has never passed a
            full financial audit.
          </p>
        </div>

        {/* Budget Trajectory */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Budget Trajectory: Always Up</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Over the past decade, DOD spending has followed a dramatic arc:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
          <div className="space-y-4">
            {[
              { year: "FY2017", amount: "$1.2T", note: "Late Obama / early Trump era" },
              { year: "FY2020", amount: "$1.6T", note: "Pre-COVID defense buildup" },
              { year: "FY2022", amount: "$2.2T", note: "Peak — includes COVID-era supplementals" },
              { year: "FY2024", amount: "$1.5T", note: "Normalization begins" },
              { year: "FY2025", amount: "$1.4T", note: "Current year" },
            ].map((row) => (
              <div key={row.year} className="flex items-center gap-4">
                <span className="font-mono text-sm text-gray-500 w-16">{row.year}</span>
                <span className="font-bold text-gray-900 w-16">{row.amount}</span>
                <span className="text-sm text-gray-600">{row.note}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The $2.2 trillion peak in FY2022 included massive supplemental appropriations. But even the
          &ldquo;normalized&rdquo; $1.4 trillion represents significant growth from a decade ago. Adjusted
          for inflation, real defense spending has increased roughly 20% since 2017.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/agencies/department-of-defense" className="text-indigo-700 underline font-medium">
            See full DOD budget data →
          </Link>
        </p>

        {/* Top DOD Contractors */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Pentagon&apos;s Favorite Companies</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Four companies dominate DOD contract spending. Together, they receive over <strong>$85 billion</strong> per
          year from the Pentagon alone:
        </p>

        <div className="space-y-4 my-8">
          {[
            { name: "Lockheed Martin", amount: "$34B", what: "F-35 fighter jet, F-22, missile defense, C-130 transport, classified programs", color: "bg-red-50 border-red-500" },
            { name: "Electric Boat (General Dynamics)", amount: "$21B", what: "Columbia-class ballistic missile submarines, Virginia-class attack submarines", color: "bg-blue-50 border-blue-500" },
            { name: "RTX (Raytheon)", amount: "$17B", what: "Patriot missiles, Stinger missiles, radar systems, precision-guided munitions", color: "bg-green-50 border-green-500" },
            { name: "Boeing", amount: "$13B", what: "F/A-18, KC-46 tanker, Apache helicopters, satellites, Space Launch System", color: "bg-amber-50 border-amber-500" },
          ].map((c) => (
            <div key={c.name} className={`${c.color} border-l-4 p-5 rounded-r-lg`}>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h3 className="font-bold text-gray-900">{c.name}</h3>
                <span className="font-bold text-lg text-gray-900">{c.amount}</span>
              </div>
              <p className="text-gray-700 text-sm mt-1">{c.what}</p>
            </div>
          ))}
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          These aren&apos;t interchangeable suppliers. Each company has built unique capabilities over
          decades, often as the sole source for critical weapons systems. The government can&apos;t just
          switch to a competitor — in many cases, there isn&apos;t one.
        </p>

        {/* F-35 */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The F-35: A Case Study in Cost Explosion</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          No program better illustrates the dynamics of Pentagon spending than the F-35 Joint Strike Fighter.
          It was supposed to be the affordable, multi-role fighter that would serve the Air Force, Navy, and
          Marines.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-green-800 uppercase">Original Estimate</p>
            <p className="text-3xl font-bold text-green-900">$233 Billion</p>
            <p className="text-sm text-green-700 mt-1">What Lockheed said it would cost</p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <p className="text-sm font-medium text-red-800 uppercase">Current Estimate</p>
            <p className="text-3xl font-bold text-red-900">$400+ Billion</p>
            <p className="text-sm text-red-700 mt-1">And still climbing — lifetime cost: $1.7T</p>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The acquisition cost alone has nearly doubled from original estimates. But the real number is
          the lifetime cost — operation, maintenance, upgrades, and fuel over the program&apos;s 60+ year
          lifespan: an estimated <strong>$1.7 trillion</strong>. That&apos;s a single weapons program costing
          more than the entire annual defense budget.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;The F-35&apos;s lifetime cost of $1.7 trillion exceeds the entire annual defense budget.
            One program. One company. Decades of cost overruns.&rdquo;
          </p>
        </blockquote>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Could the program have been canceled when costs began spiraling? In theory. In practice, Lockheed
          strategically placed F-35 production across 45 states, creating jobs — and political constituencies —
          that make cancellation politically impossible. This is known as &ldquo;political engineering,&rdquo;
          and it&apos;s just as sophisticated as the aerospace engineering.
        </p>

        {/* No-Bid */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">No-Bid Nation: DOD Edition</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Sole-source (no-bid) contracts are supposed to be exceptions — used only when there&apos;s a single
          qualified supplier or an urgent need. But at the Pentagon, they&apos;re closer to the norm.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-amber-900 mb-2">66%</p>
          <p className="text-amber-800">
            of the 50 largest no-bid contracts go to the Department of Defense. Two-thirds of the
            biggest sole-source awards flow through the Pentagon.
          </p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The justification is usually &ldquo;only one responsible source&rdquo; — meaning only one company
          can do the work. That&apos;s often true for follow-on contracts (maintaining systems that company
          built) and for classified programs. But it creates a self-reinforcing cycle: the company that
          wins the original contract becomes the only company that can win future contracts.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/no-bid" className="text-indigo-700 underline font-medium">
            Explore our full no-bid contracts analysis →
          </Link>
        </p>

        {/* Audit */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Audit That Never Passes</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          In 1990, Congress passed the Chief Financial Officers Act, requiring all federal agencies to
          produce auditable financial statements. Most agencies complied within a few years. The Department
          of Defense — the largest — still hasn&apos;t.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The Pentagon&apos;s first-ever comprehensive audit was in 2018, and it failed. It failed again in
          2019, 2020, 2021, 2022, 2023, and 2024. Each year, the department acknowledges the failure and
          pledges improvement. Each year, the same result.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          To be clear: this doesn&apos;t mean $1.4 trillion is being stolen. It means the Pentagon&apos;s
          financial systems are so fragmented, outdated, and poorly integrated that auditors cannot verify
          where all the money went. There are thousands of systems that don&apos;t talk to each other, assets
          that can&apos;t be tracked, and transactions that can&apos;t be reconciled.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;Every other federal agency can pass a financial audit. The Pentagon — the one that
            spends $1.4 trillion — cannot. It has failed every year since its first attempt in 2018.&rdquo;
          </p>
        </blockquote>

        {/* Editorial */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Accountability Is Not Partisan</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Here&apos;s the uncomfortable truth: defense spending increases under both parties. Republicans
          campaign on a strong military and vote for larger defense budgets. Democrats occasionally push
          back but ultimately approve similar numbers — often adding their own priorities to the
          appropriations bills.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Under Obama, the base defense budget rose from $513B to $585B. Under Trump&apos;s first term, it
          went from $585B to $740B. Under Biden, it continued to $886B. The trajectory doesn&apos;t change
          with elections — it just accelerates or decelerates slightly.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Neither party has made DOD pass an audit. Neither party has seriously addressed the industrial
          base concentration. Neither party has reformed the acquisition process in a way that actually
          prevents cost overruns. The bipartisan consensus is: spend more on defense, ask fewer questions.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Demanding accountability from the Pentagon isn&apos;t anti-military. It&apos;s pro-taxpayer. A
          department that can&apos;t account for $1.4 trillion shouldn&apos;t be immune from the same scrutiny
          applied to every other agency.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/contractors" className="text-indigo-700 underline font-medium">
            See all federal contractor data →
          </Link>
        </p>

        {/* Related Analysis */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/top-10" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Top 10 Contractors</p>
              <p className="text-sm text-gray-600 mt-1">The companies capturing the most federal dollars</p>
            </Link>
            <Link href="/no-bid" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">No-Bid Contracts</p>
              <p className="text-sm text-gray-600 mt-1">$74B awarded without competitive bidding</p>
            </Link>
            <Link href="/efficiency" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Government Efficiency</p>
              <p className="text-sm text-gray-600 mt-1">What works, what doesn&apos;t, and what DOGE gets wrong</p>
            </Link>
            <Link href="/contractors" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Top Federal Contractors</p>
              <p className="text-sm text-gray-600 mt-1">The companies that dominate government contracts</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
