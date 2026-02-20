import type { Metadata } from "next";
import Link from "next/link";
import { toTitleCase } from "@/lib/format";

export const metadata: Metadata = {
  title: "The 10 Companies That Run the Government | OpenSpending",
  description:
    "Just 10 companies receive $145 billion — 18.7% of all federal contracts. Who they are, what they do, and why this concentration persists.",
};

export default function Top10Page() {
  const contractors = [
    { rank: 1, name: "Lockheed Martin", amount: "$34B", role: "Fighter jets (F-35), missile defense, space systems", color: "bg-red-50 border-red-500" },
    { rank: 2, name: "Optum / UnitedHealth", amount: "$22B", role: "Healthcare IT, Medicare/Medicaid administration, data analytics", color: "bg-blue-50 border-blue-500" },
    { rank: 3, name: "Electric Boat (General Dynamics)", amount: "$21B", role: "Nuclear submarines — Columbia and Virginia class", color: "bg-green-50 border-green-500" },
    { rank: 4, name: "RTX (Raytheon)", amount: "$17B", role: "Missiles, radar systems, air defense (Patriot, Stinger)", color: "bg-purple-50 border-purple-500" },
    { rank: 5, name: "Boeing", amount: "$13B", role: "Military aircraft, tankers, satellites, Space Launch System", color: "bg-amber-50 border-amber-500" },
    { rank: 6, name: "Leidos", amount: "$10B", role: "IT services, cybersecurity, defense analytics", color: "bg-cyan-50 border-cyan-500" },
    { rank: 7, name: "Humana", amount: "$9B", role: "TRICARE military healthcare, Medicare Advantage plans", color: "bg-pink-50 border-pink-500" },
    { rank: 8, name: "Booz Allen Hamilton", amount: "$8B", role: "Management consulting, intelligence analysis, IT modernization", color: "bg-indigo-50 border-indigo-500" },
    { rank: 9, name: "L3Harris Technologies", amount: "$7B", role: "Communication systems, electronic warfare, night vision", color: "bg-teal-50 border-teal-500" },
    { rank: 10, name: "General Dynamics IT", amount: "$4B", role: "Defense IT infrastructure, cloud services, help desks", color: "bg-orange-50 border-orange-500" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-indigo-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Top 10 Contractors</span>
      </nav>

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        The 10 Companies That Run the Government
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Published February 2025 · Editorial Analysis
      </p>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The federal government awards roughly <strong>$778 billion</strong> in contracts every year. You might
          imagine that money is spread across thousands of companies competing fiercely for taxpayer dollars. You&apos;d
          be wrong.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Just <strong>10 companies</strong> receive $145 billion — <strong>18.7% of all federal contracts</strong>.
          These aren&apos;t random winners of competitive bidding. They&apos;re the same names that have dominated
          government contracting for decades. Many of them are the only companies capable of doing what
          the government needs. And that&apos;s exactly the problem.
        </p>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg my-8">
          <p className="text-3xl font-bold text-indigo-900 mb-2">$145 Billion</p>
          <p className="text-indigo-800">
            Combined contract value for just 10 companies — 18.7% of all $778B in federal contracts.
            One in five contract dollars flows to these firms.
          </p>
        </div>

        {/* The List */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The List</h2>

        <div className="space-y-4 my-8">
          {contractors.map((c) => (
            <div key={c.rank} className={`${c.color} border-l-4 p-5 rounded-r-lg`}>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-gray-400 leading-none">#{c.rank}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h3 className="font-bold text-gray-900">{toTitleCase(c.name)}</h3>
                    <span className="font-bold text-lg text-gray-900">{c.amount}</span>
                  </div>
                  <p className="text-gray-700 text-sm mt-1">{c.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/contractors" className="text-indigo-700 underline font-medium">See the full top 50 contractors list →</Link>
        </p>

        {/* What stands out */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Stands Out</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Seven of the ten are defense contractors. That&apos;s not surprising — the Department of Defense is
          by far the largest buyer of goods and services in the federal government. But it means that the
          concentration problem is really a <em>defense</em> concentration problem.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The two healthcare companies — Optum and Humana — are notable exceptions. Optum&apos;s $22 billion
          makes it the second-largest federal contractor, larger than Boeing or Raytheon. Healthcare
          contracting is a quieter but equally massive industry, largely invisible to the public debate
          about government spending.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;Lockheed Martin receives more federal contract money than the entire budget of the
            Department of Education.&rdquo;
          </p>
        </blockquote>

        {/* GDP comparison */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bigger Than Countries</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          To put $145 billion in perspective: that&apos;s larger than the GDP of over 130 countries. The
          combined federal contract revenue of these 10 companies exceeds the entire economic output of:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {[
              { country: "Hungary", gdp: "$188B" },
              { country: "Kuwait", gdp: "$136B" },
              { country: "Morocco", gdp: "$134B" },
              { country: "Ecuador", gdp: "$115B" },
              { country: "Iceland", gdp: "$28B" },
              { country: "Cambodia", gdp: "$30B" },
            ].map((c) => (
              <div key={c.country} className="flex justify-between">
                <span className="text-gray-700">{c.country}</span>
                <span className="font-medium text-gray-900">{c.gdp}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">GDP figures approximate, World Bank data</p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Lockheed Martin alone, at $34 billion in federal contracts, has government revenue exceeding
          the GDP of Iceland, Bahamas, and Bermuda combined.
        </p>

        {/* Revolving Door */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Revolving Door</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Why do the same companies win decade after decade? Part of the answer is technical: building
          nuclear submarines and fighter jets requires specialized expertise that only a handful of firms
          possess. But that&apos;s only part of the story.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The revolving door between the Pentagon and defense contractors is well-documented. Senior
          military officers retire and join contractor boards. Contractor executives take senior positions
          at the Department of Defense. The relationships are deep, personal, and persistent.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          These companies also spend heavily on lobbying — collectively over <strong>$100 million per year</strong>.
          That&apos;s a rounding error compared to the contracts they receive, making it one of the highest-return
          investments in the private sector.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;For every dollar these companies spend on lobbying, they receive roughly $1,400 in
            federal contracts. That&apos;s a 140,000% return.&rdquo;
          </p>
        </blockquote>

        {/* Why Competition Fails */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Competition Doesn&apos;t Work</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          In theory, government contracting is competitive. In practice, the defense industrial base has
          consolidated to the point where many programs have only one or two possible suppliers.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Consider the F-35 fighter jet. Lockheed Martin won the contract in 2001. Twenty-four years later,
          there is no alternative. Switching to a different aircraft would cost hundreds of billions and
          take a decade. Lockheed has a monopoly — not because they cheated, but because the economics of
          advanced weapons systems naturally create monopolies.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Nuclear submarines? Only Electric Boat (General Dynamics) and Huntington Ingalls can build them.
          Advanced missiles? Raytheon and Lockheed. Military satellites? A handful of companies. The barriers
          to entry aren&apos;t just financial — they&apos;re security clearances, specialized facilities, and decades
          of institutional knowledge.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/no-bid" className="text-indigo-700 underline font-medium">Read more about no-bid contracts →</Link>
        </p>

        {/* DOGE */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Can DOGE Break the Concentration?</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The Department of Government Efficiency has targeted waste across federal agencies, and there
          are real savings to be found in bloated IT contracts, redundant consulting engagements, and
          unnecessary middlemen. Booz Allen&apos;s $8 billion in consulting contracts is a reasonable place to ask
          hard questions.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          But the core concentration — Lockheed, Raytheon, Electric Boat — exists because the government
          needs what only they can build. You can&apos;t DOGE your way out of needing nuclear submarines. You
          can negotiate harder, demand better cost controls, and reduce scope creep. But the fundamental
          structure of defense procurement creates oligopolies by design.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The real opportunity for efficiency isn&apos;t in the top 10 — it&apos;s in the long tail of contracts
          where thousands of smaller firms compete (or don&apos;t compete) for hundreds of billions in IT,
          consulting, and services work.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <Link href="/how-it-works" className="text-indigo-700 underline font-medium">Learn how federal contracting works →</Link>
        </p>

        {/* Decade After Decade */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Same Names, Decade After Decade</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Pull the top 10 contractor list from 2005, 2010, 2015, or 2020. You&apos;ll see the same names —
          sometimes in a different order, sometimes after a merger or acquisition, but fundamentally the
          same companies.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Lockheed Martin merged with Martin Marietta in 1995. Raytheon merged with United Technologies in
          2020 to form RTX. General Dynamics acquired CSRA. The names change but the concentration doesn&apos;t —
          it actually increases with each merger.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          In the 1990s, then-Defense Secretary Les Aspin encouraged defense industry consolidation — the
          so-called &ldquo;Last Supper&rdquo; — to reduce overcapacity after the Cold War. Three decades later,
          we have fewer competitors, less price pressure, and programs that routinely exceed their budgets
          by 50-100%.
        </p>

        <blockquote className="border-l-4 border-amber-400 pl-6 my-8">
          <p className="text-xl italic text-gray-800">
            &ldquo;We engineered this concentration. The government encouraged defense mergers in the 1990s.
            Now we complain about the lack of competition we created.&rdquo;
          </p>
        </blockquote>

        {/* Related Analysis */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/contractors" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Top Federal Contractors</p>
              <p className="text-sm text-gray-600 mt-1">The companies that dominate government contracts</p>
            </Link>
            <Link href="/no-bid" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">No-Bid Contracts</p>
              <p className="text-sm text-gray-600 mt-1">$74B awarded without competitive bidding</p>
            </Link>
            <Link href="/pentagon-spending" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-gray-900">Pentagon Spending</p>
              <p className="text-sm text-gray-600 mt-1">Deep dive into $1.4T in defense spending</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
