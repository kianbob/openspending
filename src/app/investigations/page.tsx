import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investigations — OpenSpending',
  description: 'In-depth investigations and analysis of federal government spending.',
};

const articles = [
  {
    href: '/spending-analysis',
    title: 'Where $11.2 Trillion Really Goes',
    description: 'A comprehensive breakdown of federal spending across all major categories and agencies.',
  },
  {
    href: '/spending-explosion',
    title: 'The Spending Explosion',
    description: 'Federal spending grew 63% since 2017.',
  },
  {
    href: '/your-tax-bill',
    title: 'Your Tax Bill Breakdown',
    description: '$33,135 per taxpayer — where does it all go?',
  },
  {
    href: '/doge-reality',
    title: 'The DOGE Reality Check',
    description: 'Claims vs actual spending — DOGE promised $2T in savings while spending increased $392B.',
  },
  {
    href: '/contractor-monopoly',
    title: 'The Contractor Monopoly',
    description: '10 companies control 64% of all federal contracts.',
  },
  {
    href: '/top-10',
    title: 'The 10 Companies That Run the Government',
    description: 'Meet the contractors who receive billions in taxpayer dollars every year.',
  },
  {
    href: '/interest',
    title: 'The Interest Time Bomb',
    description: '$952B in annual interest — now larger than the defense budget.',
  },
  {
    href: '/national-debt',
    title: 'The $36 Trillion Debt Clock',
    description: 'Watch the national debt tick up in real time.',
  },
  {
    href: '/pentagon-spending',
    title: "Inside the Pentagon's Budget",
    description: 'How the Department of Defense spends more than most countries earn.',
  },
  {
    href: '/pentagon-deep-dive',
    title: "The Pentagon's Blank Check",
    description: "DOD has never passed an audit. Here's what $501B looks like without accountability.",
  },
  {
    href: '/healthcare-spending',
    title: 'The Healthcare Spending Machine',
    description: 'Medicare, Medicaid, and the growing cost of keeping America healthy.',
  },
  {
    href: '/state-dependency',
    title: 'State Dependency: Donors vs Takers',
    description: 'Which states take more federal money than they contribute in taxes?',
  },
  {
    href: '/welfare-queens',
    title: 'Which States Are Federal Welfare Queens?',
    description: 'Red states, blue states — who really depends on federal money?',
  },
  {
    href: '/foreign-aid-deep-dive',
    title: 'Where Does Foreign Aid Actually Go?',
    description: 'An investigation into where U.S. foreign aid dollars end up.',
  },
  {
    href: '/global-comparison',
    title: 'US vs The World',
    description: 'How American spending compares to other nations.',
  },
  {
    href: '/grants',
    title: 'The Grant Machine',
    description: '$1.24 trillion in federal grants — who gets the money?',
  },
  {
    href: '/no-bid',
    title: 'No-Bid Nation: When Competition Dies',
    description: 'Billions in contracts awarded without competitive bidding.',
  },
  {
    href: '/waste',
    title: 'Waste, Fraud & Abuse',
    description: 'Tracking the GAO and IG reports that expose government waste.',
  },
  {
    href: '/efficiency',
    title: 'Government Efficiency & Accountability',
    description: 'Measuring how well agencies spend taxpayer dollars.',
  },
  {
    href: '/how-it-works',
    title: 'How Federal Spending Actually Works',
    description: 'From appropriations to outlays — the complete guide to government spending.',
  },
  {
    href: '/shutdown-calculator',
    title: 'Government Shutdown Calculator',
    description: 'What a shutdown really costs taxpayers.',
  },
];

export default function InvestigationsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Investigations
          </h1>
          <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
            In-depth analysis and editorial coverage of federal spending patterns, waste, and accountability.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="block bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {article.description}
                </p>
                <span className="text-indigo-600 font-medium mt-4 inline-block">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
