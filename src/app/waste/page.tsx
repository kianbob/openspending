import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata = {
  title: "The Federal Waste Problem: $233-521B/Year — OpenSpending",
  description: "The GAO says the government loses $233-521B/year to fraud. $2.8T in improper payments since 2003. The data speaks for itself.",
  openGraph: {
    title: "The Federal Waste Problem: $233-521B/Year — OpenSpending",
    description: "The GAO says the government loses $233-521B/year to fraud. $2.8T in improper payments since 2003. The data speaks for itself.",
  },
};

const statCards = [
  {
    label: "$233–521B Lost to Fraud Annually",
    sub: "GAO estimate, 3–7% of federal obligations",
  },
  {
    label: "$2.8T in Improper Payments",
    sub: "Cumulative since FY2003",
  },
  {
    label: "$162B in Improper Payments FY2024",
    sub: "68 programs across 16 agencies",
  },
  {
    label: "75% Concentrated in 5 Programs",
    sub: "Medicare, Medicaid, EITC, SNAP, Unemployment",
  },
];

const top5Programs = [
  { name: "Medicare", note: "Fee-for-Service and Advantage" },
  { name: "Medicaid", note: "Federal and state jointly administered" },
  { name: "Earned Income Tax Credit", note: "EITC — IRS-administered" },
  { name: "Supplemental Nutrition (SNAP)", note: "Formerly food stamps" },
  { name: "Unemployment Insurance", note: "State-administered, federally funded" },
];

export default function WastePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Editorial" }, { label: "The Federal Waste Problem" }]} />

      {/* Hero */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          The Federal Waste Problem
        </h1>
        <ShareButtons title="The Federal Waste Problem: $233-521B/Year — OpenSpending" url="https://openspending-app.vercel.app/waste" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        These are not our estimates — this is the government&apos;s own auditor
        saying this.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <p className="text-lg font-bold text-gray-900">{card.label}</p>
            <p className="text-sm text-gray-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Lead Editorial Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-14">
        <p className="text-amber-900">
          The federal government cannot account for where hundreds of billions
          of your tax dollars go each year. This is not a partisan talking point
          — it is the conclusion of the Government Accountability Office, the
          government&apos;s own auditor, in report after report, year after year.
        </p>
      </div>

      {/* Fraud vs Waste vs Abuse */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Fraud vs. Waste vs. Abuse
        </h2>
        <p className="text-gray-600 mb-6">
          These terms get thrown around interchangeably, but they mean different
          things. Understanding the distinction matters because the solutions are
          different for each.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Fraud</h3>
            <p className="text-gray-600 text-sm">
              Intentional deception or misrepresentation to obtain an
              unauthorized benefit. Someone knowingly lies to get money they
              are not entitled to — a contractor billing for work never
              performed, a recipient faking eligibility. This is criminal.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Improper Payments
            </h3>
            <p className="text-gray-600 text-sm">
              Any payment made in the wrong amount, to the wrong recipient, or
              without proper documentation. Not all improper payments are fraud
              — many are bureaucratic errors, duplicate payments, or
              documentation failures. But the money is still gone.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Waste</h3>
            <p className="text-gray-600 text-sm">
              Unnecessary spending that could have been avoided with better
              management. No one committed a crime — the system just spent more
              than it needed to. Overpaying for services, duplicating programs
              across agencies, or buying things nobody uses.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Abuse</h3>
            <p className="text-gray-600 text-sm">
              Behavior that is deficient or improper when compared with what a
              reasonable person would consider acceptable. Using government
              resources for personal benefit, exploiting authority to bend rules
              — not technically illegal, but a misuse of the public trust.
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Definitions based on GAO standards and the{" "}
          <em>Standards for Internal Control in the Federal Government</em>.
        </p>
      </section>

      {/* The Scale of the Problem */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          The Scale of the Problem
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            In 2024, the GAO published{" "}
            <a
              href="https://www.gao.gov/products/gao-24-105833"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline font-medium"
            >
              GAO-24-105833
            </a>
            , a comprehensive assessment of fraud risks across the federal
            government. The headline finding:{" "}
            <span className="font-bold">
              3–7% of total federal obligations are lost to fraud each year
            </span>
            .
          </p>
          <p className="text-gray-600 mb-3">
            Applied to the current federal budget, that translates to{" "}
            <span className="font-bold">$233 billion to $521 billion</span>{" "}
            lost annually. Not misallocated. Not debatable. Lost — to
            fraudulent claims, fake recipients, and payments that should never
            have been made.
          </p>
          <p className="text-gray-600">
            The GAO has maintained a &quot;High Risk List&quot; of federal
            programs vulnerable to waste, fraud, and abuse since 1990. The list
            currently includes 37 areas. Some have been on the list for over 30
            years — the problems are identified, documented, and then ignored.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            <span className="font-bold">$233–521 billion per year.</span> That
            is more than the entire federal education budget. More than the
            Department of Homeland Security, the State Department, and NASA
            combined. And it happens every single year.
          </p>
        </div>
      </section>

      {/* Improper Payments Exposed */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Improper Payments Exposed
        </h2>
        <p className="text-gray-600 mb-6">
          In FY2024, the federal government reported{" "}
          <span className="font-bold">$162 billion in improper payments</span>{" "}
          across 68 programs at 16 agencies. Three-quarters of that total is
          concentrated in just five program areas.
        </p>
        <div className="space-y-3 mb-6">
          {top5Programs.map((prog, i) => (
            <div
              key={prog.name}
              className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4"
            >
              <span className="text-2xl font-bold text-indigo-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">{prog.name}</h3>
                <p className="text-sm text-gray-500">{prog.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-2">
            $2.8 Trillion Since 2003
          </h3>
          <p className="text-indigo-800">
            The federal government has reported{" "}
            <span className="font-bold">$2.8 trillion</span> in cumulative
            improper payments since agencies were first required to track them
            in FY2003. That number only includes what agencies self-report —
            the actual total is almost certainly higher. These are not rounding
            errors. This is a structural failure of financial management at the
            largest scale imaginable.
          </p>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Why This Matters
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-600 mb-3">
            This is why efficiency efforts exist. When the government loses
            hundreds of billions per year to fraud, waste, and improper payments,
            every conversation about federal spending is incomplete without
            acknowledging the money that simply disappears.
          </p>
          <p className="text-gray-600 mb-3">
            The Department of Government Efficiency (DOGE) was created to
            address exactly this problem — to audit, cut, and hold agencies
            accountable. Whether it succeeds depends on political will, but the
            data is clear: the status quo is indefensible.
          </p>
          <p className="text-gray-600">
            Every dollar lost to fraud is a dollar that could have funded
            schools, repaired infrastructure, or been left in taxpayers&apos;
            pockets. The question is not whether we can afford accountability —
            it is whether we can afford to keep ignoring{" "}
            <span className="font-bold">half a trillion dollars</span> in
            annual losses.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
          <p className="text-amber-900">
            The government&apos;s own auditors have been documenting these
            failures for decades. The numbers are public. The reports are
            published. The question has never been whether the waste exists —
            it is why nothing changes.
          </p>
        </div>
      </section>

      {/* Related Analysis */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/no-bid" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">No-Bid Contracts</p>
            <p className="text-sm text-gray-600 mt-1">$74B awarded without competitive bidding</p>
          </Link>
          <Link href="/efficiency" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Government Efficiency</p>
            <p className="text-sm text-gray-600 mt-1">What works, what doesn&apos;t, and what DOGE gets wrong</p>
          </Link>
          <Link href="/spending-analysis" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Full Budget Breakdown</p>
            <p className="text-sm text-gray-600 mt-1">Where $11.2 trillion in federal spending goes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
