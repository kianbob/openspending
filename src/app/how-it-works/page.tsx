import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata = {
  title: "How Government Contracts Actually Work — OpenSpending",
  description: "A plain-English guide to how tax dollars flow from your paycheck to federal contractors — and why the system rarely works.",
  openGraph: {
    title: "How Government Contracts Actually Work — OpenSpending",
    description: "A plain-English guide to how tax dollars flow from your paycheck to federal contractors — and why the system rarely works.",
  },
};

const flowSteps = [
  { label: "Your Paycheck", sub: "Federal taxes withheld" },
  { label: "IRS", sub: "Collects $4.9T/year" },
  { label: "Treasury", sub: "Holds the money" },
  { label: "Congress", sub: "Decides who gets what" },
  { label: "Agencies", sub: "97 federal agencies" },
  { label: "Contractors", sub: "Private companies paid to deliver" },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Editorial" }, { label: "How Government Contracts Actually Work" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          How Government Contracts Actually Work
        </h1>
        <ShareButtons title="How Government Contracts Actually Work — OpenSpending" url="https://www.openspending.us/how-it-works" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        Your money, their contracts.
      </p>

      {/* The Money Flow */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Money Flow</h2>
        <p className="text-gray-600 mb-6">
          Every federal contract starts the same way: with your paycheck. Here is
          the journey your tax dollars take before they land in a contractor&apos;s
          bank account.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center min-w-[120px] shadow-sm">
                <p className="font-bold text-indigo-700 text-sm">{step.label}</p>
                <p className="text-xs text-gray-500 mt-1">{step.sub}</p>
              </div>
              {i < flowSteps.length - 1 && (
                <span className="text-indigo-400 text-xl font-bold mx-2 hidden md:inline">
                  &rarr;
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-4 text-center">
          Six handoffs before a dollar does anything useful. At every step,
          someone takes a cut — administrative overhead, compliance costs, lobbying
          influence.
        </p>
      </section>

      {/* How a Contract Gets Awarded */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          How a Contract Gets Awarded
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">1. The Solicitation</h3>
            <p className="text-gray-600 text-sm mt-1">
              An agency posts a request — &quot;we need X.&quot; This is supposed to be
              public and competitive. In practice, solicitations are often written
              so specifically that only one or two companies could possibly qualify.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">2. The Bidding</h3>
            <p className="text-gray-600 text-sm mt-1">
              Companies submit proposals. Evaluations happen behind closed doors.
              The Government Accountability Office receives thousands of bid
              protests every year from companies who believe the process was rigged.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">3. The Award</h3>
            <p className="text-gray-600 text-sm mt-1">
              A winner is selected. Or, increasingly, the agency skips all of this
              and hands the contract to a single company with no competition at
              all. That is called a{" "}
              <Link
                href="/no-bid"
                className="text-indigo-600 hover:text-indigo-800 underline font-medium"
              >
                sole-source contract
              </Link>
              .
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          In theory, competitive. In practice, the same handful of companies win
          year after year. See the{" "}
          <Link
            href="/contractors"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            top contractors
          </Link>{" "}
          who dominate federal spending.
        </p>
      </section>

      {/* The No-Bid Problem */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The No-Bid Problem
        </h2>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-4">
          <p className="text-amber-900 font-medium">
            Sole-source contracts mean no competition, no price pressure, and no
            reason for the contractor to deliver on time or on budget.
          </p>
        </div>
        <p className="text-gray-600 mb-3">
          The federal government awarded{" "}
          <span className="font-bold">$74 billion</span> in no-bid contracts in
          FY2025 alone. That is $74 billion where nobody had to compete for the
          work, nobody had to offer a better price, and nobody had to prove they
          were the best option.
        </p>
        <p className="text-gray-600">
          There are legitimate reasons for sole-source awards — classified
          programs, genuine emergencies, unique capabilities. But when 66% of the
          largest no-bid contracts go to the Department of Defense, the question is
          whether &quot;national security&quot; has become a blank check.{" "}
          <Link
            href="/no-bid"
            className="text-indigo-600 hover:text-indigo-800 underline font-medium"
          >
            Explore the data &rarr;
          </Link>
        </p>
      </section>

      {/* Cost Overruns */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cost Overruns</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-3">
            A contractor bids $10 billion. The project ends up costing $20 billion.
            In the private sector, this gets you fired. In government contracting,
            it gets you a contract extension.
          </p>
          <p className="text-gray-600 mb-3">
            Cost-plus contracts — where the government pays the contractor&apos;s costs
            plus a guaranteed profit margin — create a perverse incentive: the more
            you spend, the more you earn. There is no penalty for going over
            budget, and there is no reward for coming in under.
          </p>
          <p className="text-gray-600">
            The F-35 Joint Strike Fighter program was estimated at $233 billion. The
            current projection is over $400 billion — and counting. The contractor,{" "}
            <Link
              href="/contractors"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Lockheed Martin
            </Link>
            , remains the government&apos;s largest contractor by a wide margin.
          </p>
        </div>
      </section>

      {/* The Revolving Door */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Revolving Door
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-3">
            Pentagon officials retire on Friday and start as defense company
            lobbyists on Monday. Agency procurement officers who awarded contracts
            leave government to work for the companies they were overseeing.
          </p>
          <p className="text-gray-600 mb-3">
            Cooling-off periods exist on paper, but they are narrow and routinely
            circumvented. The result: the people deciding who gets billions in
            contracts are often the same people who will later profit from those
            decisions.
          </p>
          <p className="text-gray-600">
            This is not a partisan issue. It happens under every administration,
            across every{" "}
            <Link
              href="/agencies"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              agency
            </Link>
            , and it ensures that the contracting system serves insiders first and
            taxpayers second.
          </p>
        </div>
      </section>

      {/* The Concentration Problem */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Concentration Problem
        </h2>
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-xl mb-4">
          <p className="text-indigo-900 font-medium">
            The top 10 federal contractors receive over $150 billion per year.
            That is more than the GDP of 130 countries.
          </p>
        </div>
        <p className="text-gray-600 mb-3">
          Lockheed Martin, Boeing, RTX (Raytheon), Northrop Grumman — the same
          names appear at the top of every spending list, every year, regardless of
          performance. When a handful of companies control most of the market,
          competition is a fiction.
        </p>
        <p className="text-gray-600">
          Small businesses are technically supposed to get a share of federal
          contracts, but the reality is that large primes subcontract the work —
          taking their cut on the way through.{" "}
          <Link
            href="/contractors"
            className="text-indigo-600 hover:text-indigo-800 underline font-medium"
          >
            See the top contractors &rarr;
          </Link>
        </p>
      </section>

      {/* What DOGE Is Trying to Fix */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          What DOGE Is Trying to Fix
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-3">
            The Department of Government Efficiency (DOGE) was created to cut
            waste, reduce redundancy, and hold agencies accountable for how they
            spend taxpayer money. The premise is straightforward: government
            spending should be transparent, efficient, and justified.
          </p>
          <p className="text-gray-600 mb-3">
            Whether DOGE will succeed is an open question. Previous attempts at
            government efficiency — from the Grace Commission in 1984 to the
            Government Performance and Results Act — produced reports, not results.
            Bureaucracies are remarkably good at surviving reform.
          </p>
          <p className="text-gray-600">
            The data on this site is the starting point. Before you can fix
            government spending, you have to see it. That is what{" "}
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              OpenSpending
            </Link>{" "}
            is for — following the money so you do not have to take anyone&apos;s word
            for it.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
          Follow the Money
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Now that you know how the system works, explore the data for yourself.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contractors"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Top Contractors
          </Link>
          <Link
            href="/no-bid"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            No-Bid Contracts
          </Link>
          <Link
            href="/agencies"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Agencies
          </Link>
          <Link
            href="/contracts"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Largest Contracts
          </Link>
          <Link
            href="/waste"
            className="px-5 py-2.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Federal Waste Problem
          </Link>
        </div>
      </div>
    </div>
  );
}
