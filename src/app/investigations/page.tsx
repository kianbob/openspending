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
    href: '/top-10',
    title: 'The 10 Companies That Run the Government',
    description: 'Meet the contractors who receive billions in taxpayer dollars every year.',
  },
  {
    href: '/pentagon-spending',
    title: "Inside the Pentagon's Budget",
    description: 'How the Department of Defense spends more than most countries earn.',
  },
  {
    href: '/healthcare-spending',
    title: 'The Healthcare Spending Machine',
    description: 'Medicare, Medicaid, and the growing cost of keeping America healthy.',
  },
  {
    href: '/how-it-works',
    title: 'How Federal Spending Actually Works',
    description: 'From appropriations to outlays — the complete guide to government spending.',
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
