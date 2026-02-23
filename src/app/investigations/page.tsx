import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: 'Investigations — OpenSpending',
  description: 'In-depth investigations and analysis of federal government spending.',
};

type Article = {
  href: string;
  title: string;
  description: string;
  teaser: string;
  date: string;
  tags: string[];
  readTime: number;
};

const articles: Article[] = [
  {
    href: '/doge-savings-reality',
    title: 'Is DOGE Actually Saving Money? A Data-Driven Reality Check',
    description: 'DOGE claimed $55B in savings. Spending increased $392B. That\'s 0.81% of the budget — like saving $8.10 on a $1,000 grocery bill.',
    teaser: 'We tracked every DOGE claim against actual Treasury data. The results are striking: while headlines trumpet billions in cuts, total federal outlays tell a very different story.',
    date: 'Feb 21, 2026',
    tags: ['DOGE', 'Accountability'],
    readTime: 8,
  },
  {
    href: '/where-tax-dollars-go',
    title: 'Where Do Your Tax Dollars Go in 2025?',
    description: 'Medicare gets 18¢, Defense gets 14¢, Interest gets 12¢ — more than veterans benefits. See every cent of your tax dollar.',
    teaser: 'Every dollar you pay in federal taxes gets split across dozens of programs. We broke it down to the penny so you can see exactly where your money goes.',
    date: 'Feb 19, 2026',
    tags: ['Taxes', 'Healthcare', 'Defense'],
    readTime: 6,
  },
  {
    href: '/biggest-government-contractors-2025',
    title: 'The 10 Companies That Get the Most Government Money in 2025',
    description: 'Lockheed Martin: $58.8B. The top 10 hold 23.5% of all contracts. Who they are and why this concentration matters.',
    teaser: 'A handful of companies receive more federal money than most countries\' entire GDP. We ranked them, traced their subsidiaries, and followed the money.',
    date: 'Feb 17, 2026',
    tags: ['Defense', 'Contractors'],
    readTime: 10,
  },
  {
    href: '/pentagon-deep-dive',
    title: "The Pentagon's Blank Check",
    description: "DOD has never passed an audit. Here's what $501B looks like without accountability.",
    teaser: 'The Department of Defense has failed every audit since they became mandatory in 2018. We dug into the numbers to understand what $501 billion in unauditable spending looks like.',
    date: 'Feb 15, 2026',
    tags: ['Defense', 'Fraud', 'Accountability'],
    readTime: 12,
  },
  {
    href: '/no-bid',
    title: 'No-Bid Nation: When Competition Dies',
    description: 'Billions in contracts awarded without competitive bidding.',
    teaser: 'Sole-source contracts are supposed to be the exception. Instead, they\'ve become the rule in some agencies. We mapped every no-bid contract over $10M.',
    date: 'Feb 13, 2026',
    tags: ['Fraud', 'Contractors'],
    readTime: 9,
  },
  {
    href: '/interest',
    title: 'The Interest Time Bomb',
    description: '$952B in annual interest — now larger than the defense budget.',
    teaser: 'For the first time in history, the federal government spends more on debt interest than on national defense. And it\'s accelerating.',
    date: 'Feb 11, 2026',
    tags: ['Debt', 'Economy'],
    readTime: 7,
  },
  {
    href: '/spending-analysis',
    title: 'Where $11.2 Trillion Really Goes',
    description: 'A comprehensive breakdown of federal spending across all major categories and agencies.',
    teaser: 'We analyzed every dollar of the $11.2 trillion federal budget — mandatory spending, discretionary spending, and everything in between.',
    date: 'Feb 10, 2026',
    tags: ['Analysis', 'Budget'],
    readTime: 15,
  },
  {
    href: '/welfare-queens',
    title: 'Which States Are Federal Welfare Queens?',
    description: 'Red states, blue states — who really depends on federal money?',
    teaser: 'The political rhetoric doesn\'t match the data. We compared every state\'s federal tax contributions to what they receive back. The results defy partisan narratives.',
    date: 'Feb 8, 2026',
    tags: ['States', 'Politics'],
    readTime: 8,
  },
  {
    href: '/spending-explosion',
    title: 'The Spending Explosion',
    description: 'Federal spending grew 63% since 2017.',
    teaser: 'In just eight years, annual federal spending surged from $4T to over $6.5T. We charted the growth across every major category to find out where the money went.',
    date: 'Feb 6, 2026',
    tags: ['Budget', 'Analysis'],
    readTime: 6,
  },
  {
    href: '/contractor-monopoly',
    title: 'The Contractor Monopoly',
    description: '10 companies control 64% of all federal contracts.',
    teaser: 'Market concentration in federal contracting has reached alarming levels. We investigated how a small group of companies came to dominate government spending.',
    date: 'Feb 5, 2026',
    tags: ['Contractors', 'Defense'],
    readTime: 9,
  },
  {
    href: '/your-tax-bill',
    title: 'Your Tax Bill Breakdown',
    description: '$33,135 per taxpayer — where does it all go?',
    teaser: 'If you\'re an average American taxpayer, you paid $33,135 to the federal government last year. Here\'s exactly how Washington spent your money.',
    date: 'Feb 4, 2026',
    tags: ['Taxes', 'Personal Finance'],
    readTime: 5,
  },
  {
    href: '/healthcare-spending',
    title: 'The Healthcare Spending Machine',
    description: 'Medicare, Medicaid, and the growing cost of keeping America healthy.',
    teaser: 'Healthcare is now the single largest category of federal spending. We traced how Medicare and Medicaid grew to consume nearly a quarter of the entire budget.',
    date: 'Feb 3, 2026',
    tags: ['Healthcare', 'Medicare'],
    readTime: 10,
  },
  {
    href: '/foreign-aid-deep-dive',
    title: 'Where Does Foreign Aid Actually Go?',
    description: 'An investigation into where U.S. foreign aid dollars end up.',
    teaser: 'Foreign aid is less than 1% of the budget but dominates political debate. We tracked every dollar to its destination country and purpose.',
    date: 'Feb 2, 2026',
    tags: ['Foreign Aid', 'Global'],
    readTime: 8,
  },
  {
    href: '/doge-reality',
    title: 'The DOGE Reality Check',
    description: 'Claims vs actual spending — DOGE promised $2T in savings while spending increased $392B.',
    teaser: 'A detailed comparison of every public DOGE savings claim against actual Treasury disbursement data.',
    date: 'Feb 1, 2026',
    tags: ['DOGE', 'Accountability'],
    readTime: 7,
  },
  {
    href: '/national-debt',
    title: 'The $36 Trillion Debt Clock',
    description: 'Watch the national debt tick up in real time.',
    teaser: 'The national debt grows by roughly $100,000 every second. Our real-time tracker puts the scale of federal borrowing in perspective.',
    date: 'Feb 1, 2026',
    tags: ['Debt', 'Economy'],
    readTime: 4,
  },
  {
    href: '/pentagon-spending',
    title: "Inside the Pentagon's Budget",
    description: 'How the Department of Defense spends more than most countries earn.',
    teaser: 'The Pentagon\'s budget exceeds the GDP of most nations. We broke it down by service branch, program, and contractor.',
    date: 'Feb 1, 2026',
    tags: ['Defense'],
    readTime: 11,
  },
  {
    href: '/state-dependency',
    title: 'State Dependency: Donors vs Takers',
    description: 'Which states take more federal money than they contribute in taxes?',
    teaser: 'Some states contribute far more in taxes than they receive; others are net beneficiaries. We ranked all 50 states.',
    date: 'Feb 1, 2026',
    tags: ['States'],
    readTime: 7,
  },
  {
    href: '/top-10',
    title: 'The 10 Companies That Run the Government',
    description: 'Meet the contractors who receive billions in taxpayer dollars every year.',
    teaser: 'From Lockheed Martin to McKesson, these ten companies shape how your tax dollars are spent.',
    date: 'Feb 1, 2026',
    tags: ['Contractors', 'Defense'],
    readTime: 8,
  },
  {
    href: '/global-comparison',
    title: 'US vs The World',
    description: 'How American spending compares to other nations.',
    teaser: 'The US spends more on defense than the next 10 countries combined. But that\'s just the beginning of the comparison.',
    date: 'Feb 1, 2026',
    tags: ['Global', 'Analysis'],
    readTime: 6,
  },
  {
    href: '/grants',
    title: 'The Grant Machine',
    description: '$1.24 trillion in federal grants — who gets the money?',
    teaser: 'Federal grants dwarf contracts in total dollars. We mapped every grant to its recipient to reveal where the money actually flows.',
    date: 'Feb 1, 2026',
    tags: ['Grants', 'Analysis'],
    readTime: 9,
  },
  {
    href: '/waste',
    title: 'Waste, Fraud & Abuse',
    description: 'Tracking the GAO and IG reports that expose government waste.',
    teaser: 'Government auditors find billions in waste every year. We compiled their findings into a single, searchable database.',
    date: 'Feb 1, 2026',
    tags: ['Fraud', 'Accountability'],
    readTime: 10,
  },
  {
    href: '/efficiency',
    title: 'Government Efficiency & Accountability',
    description: 'Measuring how well agencies spend taxpayer dollars.',
    teaser: 'Not all agencies are equal when it comes to getting value for money. We ranked them by efficiency metrics.',
    date: 'Feb 1, 2026',
    tags: ['Accountability', 'Analysis'],
    readTime: 7,
  },
  {
    href: '/how-it-works',
    title: 'How Federal Spending Actually Works',
    description: 'From appropriations to outlays — the complete guide to government spending.',
    teaser: 'The federal budget process is deliberately complex. This guide cuts through the jargon to explain how money actually moves through the system.',
    date: 'Feb 1, 2026',
    tags: ['Explainer', 'Budget'],
    readTime: 12,
  },
  {
    href: '/shutdown-calculator',
    title: 'Government Shutdown Calculator',
    description: 'What a shutdown really costs taxpayers.',
    teaser: 'Government shutdowns don\'t save money — they cost it. Our calculator shows the real economic damage in real time.',
    date: 'Feb 1, 2026',
    tags: ['Economy', 'Budget'],
    readTime: 4,
  },
];

const tagColors: Record<string, string> = {
  'DOGE': 'bg-amber-100 text-amber-800',
  'Defense': 'bg-red-100 text-red-800',
  'Healthcare': 'bg-blue-100 text-blue-800',
  'Medicare': 'bg-blue-100 text-blue-800',
  'Fraud': 'bg-rose-100 text-rose-800',
  'Foreign Aid': 'bg-purple-100 text-purple-800',
  'Contractors': 'bg-orange-100 text-orange-800',
  'Taxes': 'bg-green-100 text-green-800',
  'Debt': 'bg-red-100 text-red-800',
  'Economy': 'bg-emerald-100 text-emerald-800',
  'States': 'bg-sky-100 text-sky-800',
  'Budget': 'bg-indigo-100 text-indigo-800',
  'Analysis': 'bg-gray-100 text-gray-700',
  'Accountability': 'bg-yellow-100 text-yellow-800',
  'Global': 'bg-teal-100 text-teal-800',
  'Grants': 'bg-violet-100 text-violet-800',
  'Explainer': 'bg-cyan-100 text-cyan-800',
  'Politics': 'bg-fuchsia-100 text-fuchsia-800',
  'Personal Finance': 'bg-lime-100 text-lime-800',
};

export default function InvestigationsPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Breadcrumbs items={[{ label: "Investigations" }]} />
      </div>
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Investigations
          </h1>
          <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
            In-depth analysis and editorial coverage of federal spending patterns, waste, and accountability.
          </p>
          <p className="mt-2 text-sm text-indigo-300">{articles.length} investigations • Updated February 2026</p>
        </div>
      </section>

      {/* Featured Investigation */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <Link
          href={featured.href}
          className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 overflow-hidden"
        >
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Featured</span>
              <span className="text-sm text-gray-400">{featured.date}</span>
              <span className="text-sm text-gray-400">• {featured.readTime} min read</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {featured.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-4 max-w-3xl">
              {featured.teaser}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {featured.tags.map((tag) => (
                <span key={tag} className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-700'}`}>
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-indigo-600 font-semibold">
              Read the full investigation →
            </span>
          </div>
        </Link>
      </section>

      {/* Rest of investigations */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">{article.date}</span>
                  <span className="text-xs text-gray-400">{article.readTime} min</span>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-700 transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {article.teaser}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {article.tags.map((tag) => (
                    <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-700'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-indigo-600 font-medium text-sm">
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
