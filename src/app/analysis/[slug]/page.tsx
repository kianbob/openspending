import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars, formatDollarsLong } from "@/lib/format";

/* ────────────────────────────────────────────────────────────────────────────
   ARTICLE REGISTRY
   ──────────────────────────────────────────────────────────────────────────── */

interface Article {
  slug: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  readTime: string;
  metaDescription: string;
  category: string;
}

const articles: Record<string, Article> = {
  "where-your-taxes-go": {
    slug: "where-your-taxes-go",
    title: "Where Your Taxes Actually Go",
    subtitle: "A cent-by-cent breakdown of every dollar Washington spends — and why most Americans have no idea.",
    publishedDate: "2025-03-15",
    readTime: "12 min read",
    metaDescription: "Detailed breakdown of federal spending: Social Security, Medicare, defense, interest on debt. See where every tax dollar goes in FY2025.",
    category: "Budget Breakdown",
  },
  "defense-vs-education": {
    slug: "defense-vs-education",
    title: "Defense vs. Education: America's Spending Priorities",
    subtitle: "We spend 12x more on the military than the Department of Education. Is that the right balance?",
    publishedDate: "2025-03-15",
    readTime: "10 min read",
    metaDescription: "Military spending vs education spending comparison: $886B for defense vs $68B for education. Historical trends and what it means for taxpayers.",
    category: "Spending Comparison",
  },
  "wasteful-spending": {
    slug: "wasteful-spending",
    title: "The $247 Billion Waste Machine",
    subtitle: "Improper payments, fraud, and the GAO's high-risk list — a taxpayer's guide to government waste.",
    publishedDate: "2025-03-15",
    readTime: "14 min read",
    metaDescription: "Federal government wastes $247B/year in improper payments. GAO high-risk list, fraud examples, and why nobody gets fired.",
    category: "Waste & Fraud",
  },
  "national-debt-crisis": {
    slug: "national-debt-crisis",
    title: "The $34 Trillion Time Bomb",
    subtitle: "Interest on the debt now costs more than national defense. Here's how we got here — and where we're headed.",
    publishedDate: "2025-03-15",
    readTime: "13 min read",
    metaDescription: "$34 trillion national debt, $950B+ in annual interest. The debt crisis explained: how we got here, where it's headed, and who pays.",
    category: "National Debt",
  },
  "covid-spending": {
    slug: "covid-spending",
    title: "Where Did $6 Trillion in COVID Money Go?",
    subtitle: "The largest spending spree in American history — PPP fraud, EIDL abuse, and trillions with little oversight.",
    publishedDate: "2025-03-15",
    readTime: "15 min read",
    metaDescription: "$6 trillion in COVID spending: PPP fraud, EIDL abuse, stimulus checks. The biggest spending spree in history, tracked.",
    category: "COVID Spending",
  },
  "earmarks-return": {
    slug: "earmarks-return",
    title: "The Return of Earmarks",
    subtitle: "Congress banned pork barrel spending in 2011. A decade later, it's back — with a new name.",
    publishedDate: "2025-03-15",
    readTime: "11 min read",
    metaDescription: "Congressional earmarks are back as 'Community Project Funding.' $14.6B in FY2024 — bridges to nowhere, pet projects, and bipartisan pork.",
    category: "Congressional Spending",
  },
  "agency-budgets-explained": {
    slug: "agency-budgets-explained",
    title: "How the Federal Budget Actually Works",
    subtitle: "Continuing resolutions, omnibus bills, shutdowns, and the debt ceiling — the messy reality of funding the government.",
    publishedDate: "2025-03-15",
    readTime: "12 min read",
    metaDescription: "How the federal budget process works: continuing resolutions, omnibus bills, government shutdowns, and why Congress can't pass a budget on time.",
    category: "Budget Process",
  },
  "state-federal-funding": {
    slug: "state-federal-funding",
    title: "Which States Get More Than They Pay?",
    subtitle: "Net donor states vs. net recipient states — the surprising geography of federal dependency.",
    publishedDate: "2025-03-15",
    readTime: "11 min read",
    metaDescription: "Which states receive more federal money than they pay in taxes? Net donor vs recipient states, ranked by dependency ratio.",
    category: "State Spending",
  },
  "contractor-spending": {
    slug: "contractor-spending",
    title: "$700 Billion to Private Contractors",
    subtitle: "The federal government outsources everything. Meet the companies that profit most from your tax dollars.",
    publishedDate: "2025-03-15",
    readTime: "13 min read",
    metaDescription: "Federal contractor spending: $700B+ annually to private companies. Top recipients, no-bid contracts, and the revolving door.",
    category: "Contractors",
  },
  "spending-per-capita": {
    slug: "spending-per-capita",
    title: "The Government Spends $20,000+ Per American",
    subtitle: "Federal spending per person has doubled since 2017. Here's what you're paying for — whether you like it or not.",
    publishedDate: "2025-03-15",
    readTime: "10 min read",
    metaDescription: "Federal spending per American: $20,000+ per person, $63,000+ per taxpayer. Breakdown by category and growth over time.",
    category: "Per Capita",
  },
};

const articleSlugs = Object.keys(articles);

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  return {
    title: `${article.title} | OpenSpending Analysis`,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://www.openspending.us/analysis/${slug}`,
      type: "article",
      publishedTime: article.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
    },
    alternates: {
      canonical: `https://www.openspending.us/analysis/${slug}`,
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────────
   SHARED COMPONENTS
   ──────────────────────────────────────────────────────────────────────────── */

function StatCard({ label, value, sub, color = "indigo" }: { label: string; value: string; sub?: string; color?: string }) {
  const colors: Record<string, string> = {
    indigo: "border-indigo-500 bg-indigo-50",
    red: "border-red-500 bg-red-50",
    green: "border-green-500 bg-green-50",
    amber: "border-amber-500 bg-amber-50",
    blue: "border-blue-500 bg-blue-50",
    purple: "border-purple-500 bg-purple-50",
  };
  return (
    <div className={`rounded-lg border-l-4 ${colors[color] || colors.indigo} p-5`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {headers.map((h, i) => (
              <th key={i} className={`py-3 px-4 text-left font-semibold text-gray-700 ${i > 0 ? "text-right" : ""}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              {row.map((cell, j) => (
                <td key={j} className={`py-3 px-4 ${j > 0 ? "text-right font-mono" : ""}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalloutBox({ emoji, title, children, color = "indigo" }: { emoji: string; title: string; children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    indigo: "border-indigo-500 bg-indigo-50",
    red: "border-red-500 bg-red-50",
    amber: "border-amber-500 bg-amber-50",
    green: "border-green-500 bg-green-50",
  };
  return (
    <div className={`rounded-lg border-l-4 ${colors[color] || colors.indigo} p-6 my-8`}>
      <h4 className="font-bold text-gray-900 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h4>
      <div className="mt-2 text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4 font-[family-name:var(--font-playfair)]">{children}</h2>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">{children}</h3>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-700 leading-relaxed mb-4">{children}</p>;
}

function BarVisual({ label, value, maxValue, amount }: { label: string; value: number; maxValue: number; amount: string }) {
  const pct = Math.round((value / maxValue) * 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-mono text-gray-600">{amount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="bg-indigo-600 h-4 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function RelatedArticles({ current }: { current: string }) {
  const related = articleSlugs.filter((s) => s !== current).slice(0, 4);
  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6">More Analysis</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((slug) => {
          const a = articles[slug];
          return (
            <Link key={slug} href={`/analysis/${slug}`} className="block p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group">
              <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">{a.category}</span>
              <h4 className="font-bold text-gray-900 mt-1 group-hover:text-indigo-700">{a.title}</h4>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{a.subtitle}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <Link href="/analysis" className="text-indigo-600 hover:text-indigo-800 font-medium">View all analysis →</Link>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   ARTICLE CONTENT COMPONENTS
   ──────────────────────────────────────────────────────────────────────────── */

function WhereYourTaxesGo() {
  const breakdown = [
    { name: "Medicare", amount: 1836700000000, pct: 18.1 },
    { name: "Social Security", amount: 1667800000000, pct: 16.5 },
    { name: "National Defense", amount: 1416400000000, pct: 14.0 },
    { name: "Net Interest", amount: 1250800000000, pct: 12.4 },
    { name: "Health (Medicaid, etc.)", amount: 1145500000000, pct: 11.3 },
    { name: "Income Security", amount: 886400000000, pct: 8.8 },
    { name: "Veterans Benefits", amount: 362700000000, pct: 3.6 },
    { name: "Education", amount: 348600000000, pct: 3.4 },
    { name: "Transportation", amount: 176800000000, pct: 1.7 },
    { name: "Everything Else", amount: 1035600000000, pct: 10.2 },
  ];
  const maxVal = breakdown[0].amount;

  return (
    <>
      <Paragraph>
        In FY2025, the federal government will spend approximately <strong>$10.1 trillion</strong>.
        That&apos;s $10,100,000,000,000 — a number so large it&apos;s essentially meaningless. So let&apos;s
        make it meaningful: if you&apos;re an American taxpayer, your share is roughly <strong>$63,296</strong>.
      </Paragraph>

      <Paragraph>
        Where does all that money go? The answer might surprise you. Despite what cable news would have
        you believe, foreign aid is a rounding error. The real money goes to a handful of massive
        programs that run largely on autopilot.
      </Paragraph>

      <SectionHeading>The Big Picture: Every Dollar, Accounted For</SectionHeading>

      <Paragraph>
        Here&apos;s how the federal government spends every dollar it collects — and then some,
        since it borrows roughly 25 cents of every dollar it spends:
      </Paragraph>

      <div className="my-8 space-y-1">
        {breakdown.map((item) => (
          <BarVisual key={item.name} label={item.name} value={item.amount} maxValue={maxVal} amount={`${formatDollars(item.amount)} (${item.pct}%)`} />
        ))}
      </div>

      <CalloutBox emoji="💡" title="The Autopilot Problem" color="amber">
        <p>Over 60% of federal spending is &quot;mandatory&quot; — meaning it happens automatically without
        any annual vote from Congress. Social Security, Medicare, Medicaid, and interest on the debt
        are all on autopilot. Congress only votes on about one-third of total spending each year.</p>
      </CalloutBox>

      <SectionHeading>Medicare: The Biggest Line Item ($1.84T)</SectionHeading>

      <Paragraph>
        Medicare is now the single largest federal program, surpassing Social Security in FY2025.
        It costs <strong>$1.84 trillion</strong> — 18 cents of every federal dollar. That&apos;s
        more than the entire defense budget. The program covers 67 million Americans over 65, but its
        costs have grown 75% since 2017, far outpacing inflation.
      </Paragraph>

      <Paragraph>
        The Medicare trust fund is projected to be insolvent by 2031. Neither party has a plan to fix it.
        Republicans won&apos;t touch it because seniors vote. Democrats won&apos;t touch it because
        they want to expand it. The result: a $1.8 trillion program barreling toward insolvency
        while politicians look the other way.
      </Paragraph>

      <SectionHeading>Social Security: The Third Rail ($1.67T)</SectionHeading>

      <Paragraph>
        Social Security costs <strong>$1.67 trillion</strong> per year and covers 67 million
        beneficiaries. The average retired worker receives about $1,907 per month. It&apos;s the
        largest anti-poverty program in American history — and it&apos;s going broke.
      </Paragraph>

      <Paragraph>
        The Social Security trust fund is projected to be exhausted by 2033. After that, the program
        can only pay about 77% of promised benefits from incoming payroll taxes. That means a 23% cut
        to every retiree&apos;s check unless Congress acts. Given that Congress has known about this
        for 40 years and done nothing, don&apos;t hold your breath.
      </Paragraph>

      <SectionHeading>National Defense: $1.42 Trillion</SectionHeading>

      <Paragraph>
        The defense budget is <strong>$1.42 trillion</strong> when you include all defense-related spending
        (not just the Pentagon&apos;s base budget). This includes the Department of Defense, nuclear weapons
        programs at the Department of Energy, the VA, intelligence agencies, and other defense-related activities.
      </Paragraph>

      <Paragraph>
        The U.S. spends more on defense than the next 10 countries combined. The Pentagon has never passed
        an audit. In 2023, it failed its sixth consecutive audit, with auditors unable to account for over
        60% of its $3.8 trillion in assets. Let that sink in: the world&apos;s largest military can&apos;t
        tell you where its own money goes.
      </Paragraph>

      <SectionHeading>Net Interest: The Silent Budget Killer ($1.25T)</SectionHeading>

      <Paragraph>
        Here&apos;s the most alarming line item: <strong>$1.25 trillion</strong> in interest on the national
        debt. That&apos;s 12.4 cents of every dollar — money that buys absolutely nothing. No roads, no
        schools, no defense. Just servicing past spending.
      </Paragraph>

      <Paragraph>
        Interest costs have nearly tripled since 2017. At the current trajectory, interest will be
        the largest federal expenditure by 2030, surpassing even Social Security. We are literally
        borrowing money to pay interest on money we already borrowed.
      </Paragraph>

      <CalloutBox emoji="🚨" title="The Interest Trap" color="red">
        <p>In FY2025, the federal government will spend more on interest ($1.25T) than on national
        defense ($886B base Pentagon budget). Every percentage point increase in interest rates
        costs taxpayers roughly $300 billion per year.</p>
      </CalloutBox>

      <SectionHeading>What About Foreign Aid?</SectionHeading>

      <Paragraph>
        Americans consistently overestimate foreign aid spending. Polls show the average American
        thinks 25% of the budget goes to foreign aid. The real number? About <strong>1%</strong> — roughly
        $60 billion. It&apos;s a rounding error in a $10 trillion budget.
      </Paragraph>

      <Paragraph>
        That doesn&apos;t mean foreign aid spending shouldn&apos;t be scrutinized — every dollar should be.
        But if you&apos;re looking for the big money, it&apos;s in entitlements, defense, and interest.
        Everything else is a sideshow.
      </Paragraph>

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        The federal budget is dominated by just four things: Medicare, Social Security, defense, and
        interest on the debt. Together, they consume 61% of all spending. Most of it is on autopilot.
        Congress barely controls a third of the budget through annual appropriations.
      </Paragraph>

      <Paragraph>
        Any serious conversation about fiscal responsibility has to start with these programs. Cutting
        foreign aid, eliminating &quot;waste,&quot; or defunding NPR makes for good political theater,
        but it doesn&apos;t move the needle on a $10 trillion budget. The math is the math.
      </Paragraph>

      <DataTable
        headers={["Category", "Amount", "% of Budget", "Per Taxpayer"]}
        rows={[
          ["Medicare", "$1.84T", "18.1%", "$11,481"],
          ["Social Security", "$1.67T", "16.5%", "$10,426"],
          ["National Defense", "$1.42T", "14.0%", "$8,851"],
          ["Net Interest", "$1.25T", "12.4%", "$7,816"],
          ["Health (Medicaid)", "$1.15T", "11.3%", "$7,155"],
          ["Income Security", "$886B", "8.8%", "$5,537"],
          ["Veterans Benefits", "$363B", "3.6%", "$2,266"],
          ["Education", "$349B", "3.4%", "$2,179"],
          ["Transportation", "$177B", "1.7%", "$1,105"],
          ["All Other", "$1.04T", "10.2%", "$6,473"],
        ]}
      />
    </>
  );
}

function DefenseVsEducation() {
  return (
    <>
      <Paragraph>
        In FY2025, the federal government will spend approximately <strong>$1.42 trillion</strong> on
        national defense and <strong>$349 billion</strong> on education — including all federal
        education programs across every agency. That&apos;s a ratio of roughly <strong>4 to 1</strong>.
      </Paragraph>

      <Paragraph>
        If you compare just the Department of Defense ($886 billion base budget) to the Department
        of Education ($68 billion), the ratio jumps to <strong>13 to 1</strong>. America spends more
        on military bands than it does on the National Endowment for the Arts.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <StatCard label="National Defense (Total)" value="$1.42T" sub="14% of federal budget" color="red" />
        <StatCard label="Education (Total)" value="$349B" sub="3.4% of federal budget" color="blue" />
        <StatCard label="Dept. of Defense (Base)" value="$886B" sub="Pentagon budget only" color="red" />
        <StatCard label="Dept. of Education" value="$68B" sub="Entire agency budget" color="blue" />
      </div>

      <SectionHeading>Historical Trends: Guns vs. Books</SectionHeading>

      <Paragraph>
        Defense spending has remained remarkably stable as a share of GDP, hovering around 3.5%.
        Education spending at the federal level has actually grown faster in percentage terms
        since 2017, largely driven by COVID-era relief bills like ESSER funding.
      </Paragraph>

      <DataTable
        headers={["Year", "Defense", "Education", "Ratio"]}
        rows={[
          ["FY2017", "$824B", "$190B", "4.3x"],
          ["FY2019", "$905B", "$209B", "4.3x"],
          ["FY2021", "$1.03T", "$770B*", "1.3x"],
          ["FY2023", "$1.22T", "$372B", "3.3x"],
          ["FY2025", "$1.42T", "$349B", "4.1x"],
        ]}
      />

      <Paragraph>
        *FY2021 education spending includes massive one-time COVID relief (ESSER funds).
        Strip that out and the ratio stays closer to 4-5x throughout the period.
      </Paragraph>

      <SectionHeading>But Wait — Most Education Spending Is Local</SectionHeading>

      <Paragraph>
        Here&apos;s what this comparison misses: <strong>90% of K-12 education funding comes from state
        and local governments</strong>, not the federal government. Total U.S. spending on education
        (all levels of government) is about <strong>$1.1 trillion per year</strong>. The federal
        share is roughly 8-10% of that total.
      </Paragraph>

      <Paragraph>
        So the comparison isn&apos;t quite as stark as it seems. America spends about $1.1 trillion on
        education (all levels) and $1.42 trillion on defense (almost entirely federal). But it does
        raise a question: if education is so important, why is the federal contribution so small?
      </Paragraph>

      <CalloutBox emoji="🤔" title="The Libertarian Perspective" color="amber">
        <p>Many argue this is exactly how it should be. Education is a state and local function under the
        Constitution. The Department of Education didn&apos;t even exist until 1979. Test scores haven&apos;t
        improved despite federal spending tripling since then. Maybe the problem isn&apos;t how much we
        spend — it&apos;s who&apos;s spending it.</p>
      </CalloutBox>

      <SectionHeading>What Does Defense Money Buy?</SectionHeading>

      <Paragraph>
        The $886 billion Pentagon base budget breaks down roughly as follows:
      </Paragraph>

      <DataTable
        headers={["Category", "Amount", "% of Pentagon"]}
        rows={[
          ["Military Personnel", "$178B", "20%"],
          ["Operations & Maintenance", "$315B", "36%"],
          ["Procurement", "$170B", "19%"],
          ["Research & Development", "$146B", "16%"],
          ["Military Construction", "$17B", "2%"],
          ["Other", "$60B", "7%"],
        ]}
      />

      <Paragraph>
        The biggest chunk — Operations & Maintenance — covers everything from fuel and food to
        training exercises and base operations. Procurement is where the big-ticket weapons systems
        live: F-35 fighters ($1.7 trillion lifetime cost), aircraft carriers ($13 billion each),
        and nuclear submarines.
      </Paragraph>

      <SectionHeading>The Audit Problem</SectionHeading>

      <Paragraph>
        The Pentagon has failed every audit since they began in 2018. In its most recent attempt,
        auditors couldn&apos;t account for <strong>over $3.8 trillion in assets</strong>. The
        Department of Defense is the only federal agency that has never passed a clean audit.
      </Paragraph>

      <Paragraph>
        Meanwhile, the Department of Education — for all its flaws — can at least tell you where
        its $68 billion goes. Whether it&apos;s spent effectively is another question, but at
        least the books balance.
      </Paragraph>

      <SectionHeading>International Comparison</SectionHeading>

      <Paragraph>
        The U.S. spends more on defense than the next 10 countries <strong>combined</strong>. As
        a share of GDP, we spend 3.5% on defense — higher than any other NATO country except
        Poland and Greece. In education, the U.S. spends about average for OECD countries
        (about 5% of GDP across all levels of government).
      </Paragraph>

      <DataTable
        headers={["Country", "Defense (% GDP)", "Education (% GDP)"]}
        rows={[
          ["United States", "3.5%", "5.0%"],
          ["China", "1.7%", "3.6%"],
          ["Russia", "4.1%", "3.7%"],
          ["United Kingdom", "2.3%", "5.2%"],
          ["Germany", "1.6%", "4.7%"],
          ["Japan", "1.2%", "3.4%"],
        ]}
      />

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        America&apos;s spending priorities are clear: national defense is the top discretionary priority
        by a wide margin. Whether that&apos;s justified depends on your threat assessment and your
        view of government&apos;s proper role. What&apos;s harder to justify is the Pentagon&apos;s
        inability to account for how it spends nearly a trillion dollars a year.
      </Paragraph>

      <Paragraph>
        If a school district couldn&apos;t pass an audit for six consecutive years, it would be
        taken over. The Pentagon just gets a bigger check.
      </Paragraph>
    </>
  );
}

function WastefulSpending() {
  return (
    <>
      <Paragraph>
        Every year, the federal government makes <strong>$247 billion in improper payments</strong> —
        money sent to the wrong person, in the wrong amount, or for the wrong reason. That&apos;s
        not an estimate from some think tank. It&apos;s the government&apos;s own number.
      </Paragraph>

      <Paragraph>
        To put that in context: $247 billion is more than the entire budget of the Department of
        Veterans Affairs. It&apos;s more than we spend on transportation, education, and science
        combined. And it happens every single year.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <StatCard label="Annual Improper Payments" value="$247B" sub="Government's own estimate" color="red" />
        <StatCard label="Since 2003" value="$2.7T+" sub="Cumulative improper payments" color="red" />
        <StatCard label="Recovery Rate" value="~1%" sub="Of improper payments recovered" color="amber" />
      </div>

      <SectionHeading>The GAO High-Risk List</SectionHeading>

      <Paragraph>
        The Government Accountability Office (GAO) maintains a &quot;High-Risk List&quot; of federal
        programs vulnerable to waste, fraud, abuse, and mismanagement. The 2023 list includes
        <strong> 37 areas</strong> covering hundreds of billions in spending. Some have been on the
        list for over 30 years.
      </Paragraph>

      <DataTable
        headers={["Program", "Years on List", "Est. Waste/Risk"]}
        rows={[
          ["Medicare", "Since 1990", "$46.3B/year in improper payments"],
          ["Medicaid", "Since 2003", "$80.6B/year in improper payments"],
          ["Earned Income Tax Credit", "Since 2002", "$21.9B/year in improper payments"],
          ["DOD Financial Management", "Since 1995", "Cannot pass audit"],
          ["DOD Weapon Systems", "Since 1990", "$2T+ in cost overruns"],
          ["NASA Acquisition", "Since 1990", "Chronic cost overruns"],
          ["IT Acquisitions", "Since 2015", "$100B+/year with poor results"],
          ["VA Health Care", "Since 2015", "Scheduling, access, quality"],
          ["Government-wide Personnel", "Since 2001", "Skills gaps across agencies"],
        ]}
      />

      <CalloutBox emoji="🤯" title="30 Years and Counting" color="red">
        <p>DOD Weapon Systems Acquisition has been on the GAO High-Risk List since <strong>1990</strong>.
        That&apos;s 35 years of being flagged for waste — spanning six presidents, multiple wars, and
        trillions in spending. Nothing has changed.</p>
      </CalloutBox>

      <SectionHeading>The Greatest Hits of Government Waste</SectionHeading>

      <SubHeading>$80.6 Billion: Medicaid Improper Payments</SubHeading>
      <Paragraph>
        Medicaid — the joint federal-state health program for low-income Americans — has an improper
        payment rate of <strong>21.7%</strong>. That means more than one in five dollars is paid
        incorrectly. This includes payments for ineligible people, incorrect amounts, and services
        never rendered. States have little incentive to crack down because the federal government
        picks up 50-90% of the tab.
      </Paragraph>

      <SubHeading>$46.3 Billion: Medicare Improper Payments</SubHeading>
      <Paragraph>
        Medicare&apos;s improper payment rate is lower than Medicaid&apos;s (about 7.7%), but the
        total dollar amount is staggering. Common issues include billing for services not provided,
        upcoding (billing for a more expensive procedure than performed), and payments to deceased
        beneficiaries. Yes, the government sends checks to dead people. A lot of them.
      </Paragraph>

      <SubHeading>$200+ Billion: COVID Relief Fraud</SubHeading>
      <Paragraph>
        The pandemic spending programs were fraud magnets. The Small Business Administration&apos;s
        Inspector General estimated that at least <strong>$200 billion</strong> in PPP and EIDL loans
        were fraudulent. The rush to distribute funds meant virtually no verification. Prisoners,
        identity thieves, and organized crime rings all got checks.
      </Paragraph>

      <SubHeading>Pentagon Spending: Where Audits Go to Die</SubHeading>
      <Paragraph>
        The Department of Defense has never passed an audit. It can&apos;t account for $3.8 trillion
        in assets. In one memorable example, auditors found that the Army made $6.5 trillion in
        accounting adjustments in a single quarter — more than the entire federal budget. These
        weren&apos;t real transactions; they were bookkeeping entries to make the numbers balance.
        The Army was literally making up numbers.
      </Paragraph>

      <SectionHeading>Why Nothing Changes</SectionHeading>

      <Paragraph>
        The obvious question: if we know about $247 billion in improper payments, why don&apos;t we
        stop them? Several reasons:
      </Paragraph>

      <div className="my-6 space-y-4">
        <div className="flex gap-3">
          <span className="text-red-500 font-bold text-lg">1.</span>
          <div>
            <p className="font-bold text-gray-900">Nobody Gets Fired</p>
            <p className="text-sm text-gray-600">Federal employees have near-total job security. In 2023, the federal firing rate was 0.5% — compared to about 3% in the private sector. There are essentially no consequences for waste.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-red-500 font-bold text-lg">2.</span>
          <div>
            <p className="font-bold text-gray-900">Perverse Incentives</p>
            <p className="text-sm text-gray-600">Agencies that don&apos;t spend their full budget get less money next year. This creates a &quot;use it or lose it&quot; culture where waste is rewarded and frugality is punished.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-red-500 font-bold text-lg">3.</span>
          <div>
            <p className="font-bold text-gray-900">Political Cover</p>
            <p className="text-sm text-gray-600">Both parties benefit from spending. Republicans funnel money to defense contractors in their districts. Democrats protect social program budgets. Neither side wants real accountability.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-red-500 font-bold text-lg">4.</span>
          <div>
            <p className="font-bold text-gray-900">Complexity as Shield</p>
            <p className="text-sm text-gray-600">The federal government is so vast that waste hides in complexity. With $10+ trillion flowing through thousands of programs, bad spending is a needle in a haystack of haystacks.</p>
          </div>
        </div>
      </div>

      <SectionHeading>What Would $247 Billion Buy?</SectionHeading>

      <Paragraph>
        If we recovered all improper payments for just one year, we could:
      </Paragraph>

      <DataTable
        headers={["Alternative Use", "Cost"]}
        rows={[
          ["Eliminate all federal student loan interest for 3 years", "$75B/year"],
          ["Double the NIH research budget", "$47B"],
          ["Fund NASA for 10 years", "$25B/year"],
          ["Give every American household $2,000", "$260B"],
          ["Rebuild every structurally deficient bridge in America", "$125B"],
        ]}
      />

      <CalloutBox emoji="💰" title="The Real Question" color="amber">
        <p>Government waste isn&apos;t a bug — it&apos;s a feature of a system with no competition,
        no accountability, and no consequences. The private sector wastes money too, but companies
        that waste enough go bankrupt. The government just borrows more.</p>
      </CalloutBox>

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        The federal government wastes more money every year than the GDP of most countries. The
        GAO identifies the problems. Inspectors general document the fraud. Reports are written,
        hearings are held, and press releases are issued. And then nothing changes. The same
        programs waste the same money year after year, decade after decade.
      </Paragraph>

      <Paragraph>
        If you want to understand why Americans are cynical about government, start here: $247
        billion in known waste, and a recovery rate of about 1%. Your tax dollars, going up in
        smoke, with nobody accountable.
      </Paragraph>
    </>
  );
}

function NationalDebtCrisis() {
  return (
    <>
      <Paragraph>
        The national debt just crossed <strong>$36 trillion</strong>. That&apos;s $36,000,000,000,000 —
        or about <strong>$108,000 per American</strong> and <strong>$270,000 per taxpayer</strong>.
        Every child born today inherits a six-figure debt they never agreed to.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <StatCard label="National Debt" value="$36T+" sub="And growing $1T every 100 days" color="red" />
        <StatCard label="Per Citizen" value="$108,000" sub="Your share of the debt" color="red" />
        <StatCard label="Annual Interest" value="$1.25T" sub="FY2025 — more than defense" color="red" />
        <StatCard label="Debt-to-GDP" value="124%" sub="Highest since WWII" color="amber" />
      </div>

      <SectionHeading>How We Got Here</SectionHeading>

      <Paragraph>
        The debt didn&apos;t happen overnight. It&apos;s the result of decades of bipartisan overspending.
        Both parties talk about fiscal responsibility when they&apos;re out of power and spend freely
        when they&apos;re in charge.
      </Paragraph>

      <DataTable
        headers={["President", "Starting Debt", "Ending Debt", "Added"]}
        rows={[
          ["Reagan (1981-89)", "$998B", "$2.86T", "+$1.86T"],
          ["H.W. Bush (1989-93)", "$2.86T", "$4.41T", "+$1.55T"],
          ["Clinton (1993-01)", "$4.41T", "$5.81T", "+$1.40T"],
          ["W. Bush (2001-09)", "$5.81T", "$11.91T", "+$6.10T"],
          ["Obama (2009-17)", "$11.91T", "$19.95T", "+$8.04T"],
          ["Trump (2017-21)", "$19.95T", "$27.75T", "+$7.80T"],
          ["Biden (2021-25)", "$27.75T", "$36.2T", "+$8.45T"],
        ]}
      />

      <CalloutBox emoji="📊" title="Context Matters" color="amber">
        <p>Raw numbers can be misleading. Obama and Trump both dealt with massive economic crises
        (2008 recession and COVID) that drove spending up. But even in &quot;normal&quot; years, the
        government runs deficits of $500B-$1T. The structural deficit — the gap between what we spend
        and what we collect — persists regardless of the economy.</p>
      </CalloutBox>

      <SectionHeading>The Interest Time Bomb</SectionHeading>

      <Paragraph>
        The most dangerous consequence of the debt isn&apos;t the principal — it&apos;s the interest.
        In FY2025, interest on the debt will cost <strong>$1.25 trillion</strong>. That&apos;s more
        than we spend on the entire Pentagon base budget. It&apos;s more than Medicare Part A.
        And it buys absolutely nothing.
      </Paragraph>

      <Paragraph>
        Here&apos;s the trajectory that should terrify everyone:
      </Paragraph>

      <DataTable
        headers={["Year", "Interest Cost", "% of Revenue"]}
        rows={[
          ["FY2017", "$263B", "7.6%"],
          ["FY2019", "$375B", "10.8%"],
          ["FY2021", "$352B", "8.9%"],
          ["FY2023", "$659B", "14.9%"],
          ["FY2025", "$1,251B", "~25%"],
          ["FY2030 (proj.)", "$1,700B+", "~30%"],
        ]}
      />

      <Paragraph>
        Interest costs have nearly <strong>quintupled</strong> since 2017. A quarter of all federal
        revenue now goes to interest payments. By 2030, it could be a third. We are approaching the
        point where we borrow money to pay interest on money we already borrowed — a debt spiral
        that has destroyed nations throughout history.
      </Paragraph>

      <SectionHeading>What Happens If We Don&apos;t Change Course?</SectionHeading>

      <Paragraph>
        The Congressional Budget Office (CBO) projects the debt will reach <strong>$50 trillion by 2034</strong>.
        At that point, interest payments alone could consume 40% of federal revenue. Here&apos;s what
        that means in practice:
      </Paragraph>

      <div className="my-6 space-y-3">
        <div className="flex gap-3 items-start">
          <span className="text-red-600 text-xl">⚠️</span>
          <p className="text-gray-700"><strong>Crowding Out:</strong> Every dollar spent on interest is a dollar not available for defense, infrastructure, education, or tax cuts. The debt literally eats the budget.</p>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-red-600 text-xl">⚠️</span>
          <p className="text-gray-700"><strong>Higher Taxes:</strong> At some point, the math requires higher taxes. Much higher. CBO estimates a 30%+ income tax increase would be needed to stabilize the debt.</p>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-red-600 text-xl">⚠️</span>
          <p className="text-gray-700"><strong>Inflation Risk:</strong> If the Fed monetizes the debt (prints money to buy government bonds), inflation could spike, effectively taxing everyone through a devalued dollar.</p>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-red-600 text-xl">⚠️</span>
          <p className="text-gray-700"><strong>Credit Downgrade:</strong> The U.S. has already lost its AAA credit rating from two of three major agencies. Further downgrades would raise borrowing costs even more.</p>
        </div>
      </div>

      <SectionHeading>Who Holds the Debt?</SectionHeading>

      <DataTable
        headers={["Holder", "Amount", "% of Total"]}
        rows={[
          ["Federal Reserve", "$5.0T", "14%"],
          ["U.S. Government (trust funds)", "$6.9T", "19%"],
          ["Foreign Governments", "$7.9T", "22%"],
          ["U.S. Investors & Institutions", "$16.2T", "45%"],
        ]}
      />

      <Paragraph>
        Japan and China are the largest foreign holders, with about $1.1 trillion and $770 billion
        respectively. But the biggest holder is us — American investors, pension funds, banks, and
        the government itself (through trust funds like Social Security).
      </Paragraph>

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        The national debt is not a future problem. It&apos;s a current crisis. Interest costs are already
        consuming a quarter of federal revenue and growing fast. Neither party has a credible plan to
        address it. Republicans want to cut taxes (increasing the deficit). Democrats want to increase
        spending (increasing the deficit). Both are right that the other side is irresponsible. Both
        are wrong that their approach will fix it.
      </Paragraph>

      <Paragraph>
        The math is simple and unforgiving: we either spend less, tax more, or face a fiscal reckoning.
        The longer we wait, the more painful the adjustment. And every day, the interest clock keeps ticking.
      </Paragraph>
    </>
  );
}

function CovidSpending() {
  return (
    <>
      <Paragraph>
        Between March 2020 and September 2021, Congress authorized approximately <strong>$6 trillion</strong> in
        COVID-19 relief spending across six major bills. It was the largest peacetime spending surge in
        American history — dwarfing the New Deal, the Great Society, and the 2008 bailouts combined.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <StatCard label="Total COVID Spending" value="$6T+" sub="Six major relief bills" color="red" />
        <StatCard label="Estimated Fraud" value="$400B+" sub="OIG and GAO estimates" color="red" />
        <StatCard label="Per Household" value="$46,000+" sub="Average cost per household" color="amber" />
      </div>

      <SectionHeading>The Six Relief Bills</SectionHeading>

      <DataTable
        headers={["Bill", "Date", "Amount", "President"]}
        rows={[
          ["Coronavirus Preparedness Act", "Mar 2020", "$8.3B", "Trump"],
          ["Families First Act", "Mar 2020", "$192B", "Trump"],
          ["CARES Act", "Mar 2020", "$2.2T", "Trump"],
          ["PPP & Health Care Act", "Apr 2020", "$484B", "Trump"],
          ["Consolidated Appropriations", "Dec 2020", "$900B", "Trump"],
          ["American Rescue Plan", "Mar 2021", "$1.9T", "Biden"],
        ]}
      />

      <SectionHeading>Where Did the Money Go?</SectionHeading>

      <Paragraph>
        The biggest recipients of COVID relief by agency:
      </Paragraph>

      <DataTable
        headers={["Agency", "Amount", "Purpose"]}
        rows={[
          ["HHS", "$290B", "Healthcare, vaccines, testing"],
          ["Education", "$287B", "School reopening (ESSER)"],
          ["Defense", "$278B", "Military operations, production"],
          ["Homeland Security", "$191B", "FEMA disaster relief"],
          ["Energy", "$161B", "National labs, research"],
          ["Transportation", "$111B", "Airlines, transit systems"],
          ["SBA (PPP/EIDL)", "$1.2T+", "Small business loans"],
          ["Treasury (stimulus)", "$800B+", "Direct payments to Americans"],
        ]}
      />

      <SectionHeading>The PPP Fraud Scandal</SectionHeading>

      <Paragraph>
        The Paycheck Protection Program (PPP) was designed to keep small businesses afloat during
        lockdowns. It distributed <strong>$800 billion in forgivable loans</strong>. The problem:
        there was essentially no verification. If you applied, you got money.
      </Paragraph>

      <Paragraph>
        The results were predictable. Studies estimate that <strong>15-25% of PPP loans were
        fraudulent</strong> — between $120-200 billion stolen. The fraud took many forms:
      </Paragraph>

      <div className="my-6 space-y-3">
        <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
          <p className="font-bold text-gray-900">Ghost Employees</p>
          <p className="text-sm text-gray-700">Applicants listed employees who didn&apos;t exist, or businesses that had no employees, to inflate loan amounts.</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
          <p className="font-bold text-gray-900">Identity Theft</p>
          <p className="text-sm text-gray-700">Stolen Social Security numbers were used to apply for loans. Organized crime rings filed thousands of applications.</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
          <p className="font-bold text-gray-900">Double-Dipping</p>
          <p className="text-sm text-gray-700">Businesses applied for multiple loans under different names, receiving far more than they were entitled to.</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
          <p className="font-bold text-gray-900">Luxury Purchases</p>
          <p className="text-sm text-gray-700">PPP money was used to buy Lamborghinis, mansions, and designer goods. One Florida man got $3.9M in PPP loans and bought a Lamborghini Huracán.</p>
        </div>
      </div>

      <SectionHeading>EIDL: The Other Fraud Machine</SectionHeading>

      <Paragraph>
        The Economic Injury Disaster Loan (EIDL) program was even worse. The SBA&apos;s Inspector
        General estimated that <strong>$136 billion</strong> of the $390 billion in EIDL loans went
        to potentially fraudulent applicants. The program used self-certification — applicants
        essentially vouched for themselves.
      </Paragraph>

      <Paragraph>
        In one analysis, 30% of EIDL recipients had no business income on their tax returns. They
        were either lying on their applications or lying on their taxes. Either way, taxpayers
        got fleeced.
      </Paragraph>

      <CalloutBox emoji="⚖️" title="Accountability Update" color="red">
        <p>As of 2025, the DOJ has charged over 3,000 defendants in COVID fraud cases, recovering about
        $2 billion. That sounds impressive until you realize the estimated fraud was $400+ billion.
        The recovery rate is about <strong>0.5%</strong>. Most of the money is gone forever.</p>
      </CalloutBox>

      <SectionHeading>Did the Spending Work?</SectionHeading>

      <Paragraph>
        This is the most important and most contested question. Defenders point to:
      </Paragraph>

      <div className="my-4 space-y-2">
        <p className="text-gray-700">✅ The U.S. recovered faster than most developed nations</p>
        <p className="text-gray-700">✅ Poverty actually decreased in 2020 due to stimulus checks</p>
        <p className="text-gray-700">✅ Mass business closures and unemployment were avoided</p>
      </div>

      <Paragraph>Critics counter:</Paragraph>

      <div className="my-4 space-y-2">
        <p className="text-gray-700">❌ Inflation surged to 9.1% — a 40-year high — largely driven by excessive stimulus</p>
        <p className="text-gray-700">❌ $400+ billion was stolen through fraud</p>
        <p className="text-gray-700">❌ Much of the money went to people and businesses that didn&apos;t need it</p>
        <p className="text-gray-700">❌ The debt increased by $7+ trillion in two years</p>
        <p className="text-gray-700">❌ PPP primarily benefited business owners, not workers (studies show only 25% reached workers)</p>
      </div>

      <SectionHeading>The Inflation Connection</SectionHeading>

      <Paragraph>
        Economists debate how much COVID spending contributed to the 2022 inflation spike. Estimates
        range from &quot;most of it&quot; to &quot;about half.&quot; The Federal Reserve itself acknowledged that
        fiscal policy (government spending) contributed significantly to inflation, alongside supply
        chain disruptions and the war in Ukraine.
      </Paragraph>

      <Paragraph>
        The cumulative price increase from 2020 to 2025 is roughly <strong>25%</strong>. That means
        your dollar buys 25% less than it did before COVID. For many Americans, the inflation
        &quot;tax&quot; — driven partly by $6 trillion in emergency spending — has wiped out any benefit
        they received from stimulus checks.
      </Paragraph>

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        COVID spending was a massive, unprecedented experiment in government intervention. Some of it
        saved lives and livelihoods. A lot of it was wasted, stolen, or poorly targeted. The full
        cost — including inflation, debt, and fraud — will be felt for decades.
      </Paragraph>

      <Paragraph>
        The lesson for next time (and there will be a next time): speed and accountability are not
        mutually exclusive, but Congress treated them that way. When you shovel $6 trillion out
        the door with no verification, don&apos;t act surprised when hundreds of billions disappear.
      </Paragraph>
    </>
  );
}

function EarmarksReturn() {
  return (
    <>
      <Paragraph>
        In 2011, Congress banned earmarks — the practice of individual lawmakers directing federal
        money to specific projects in their districts. It was hailed as a victory for fiscal
        responsibility. A decade later, earmarks are back. They just go by a different name.
      </Paragraph>

      <Paragraph>
        In the House, they&apos;re called &quot;Community Project Funding.&quot; In the Senate,
        &quot;Congressionally Directed Spending.&quot; But a pork barrel by any other name still
        smells like bacon.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <StatCard label="FY2024 Earmarks" value="$14.6B" sub="~8,000 individual earmarks" color="purple" />
        <StatCard label="Average Earmark" value="$1.8M" sub="Per project" color="purple" />
        <StatCard label="Peak (FY2006)" value="$29B" sub="9,963 earmarks" color="amber" />
      </div>

      <SectionHeading>A Brief History of Pork</SectionHeading>

      <DataTable
        headers={["Year", "Total Earmarks", "Count", "Note"]}
        rows={[
          ["2006", "$29.0B", "9,963", "Peak earmarks era"],
          ["2008", "$17.2B", "11,610", "Growing backlash"],
          ["2010", "$16.1B", "9,129", "Last year before ban"],
          ["2011-2020", "$0", "0", "Earmark moratorium"],
          ["2022", "$9.0B", "4,963", "Return under new rules"],
          ["2023", "$12.3B", "6,800", "Rapid growth"],
          ["2024", "$14.6B", "~8,000", "Approaching pre-ban levels"],
        ]}
      />

      <Paragraph>
        The moratorium lasted a decade. When earmarks returned in 2022, Congress added &quot;guardrails&quot;:
        members must publicly disclose their requests, certify they have no financial interest, and
        earmarks can only go to state/local governments or nonprofits (not private companies).
      </Paragraph>

      <Paragraph>
        Whether these guardrails are meaningful depends on your tolerance for creative accounting.
        The total has already grown from $9 billion to $14.6 billion in three years, and the trend
        shows no signs of slowing.
      </Paragraph>

      <SectionHeading>Greatest Hits: Earmarks Hall of Shame</SectionHeading>

      <Paragraph>
        The pre-ban era produced some legendary examples of pork barrel spending:
      </Paragraph>

      <div className="my-6 space-y-4">
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
          <p className="font-bold text-gray-900">The Bridge to Nowhere — $398 Million</p>
          <p className="text-sm text-gray-700">The most infamous earmark: a proposed bridge connecting Ketchikan, Alaska (pop. 8,900) to Gravina Island (pop. 50). It would have been nearly as long as the Golden Gate Bridge. Killed after national outrage.</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
          <p className="font-bold text-gray-900">Teapot Museum — $500,000</p>
          <p className="text-sm text-gray-700">Federal funds for a teapot museum in Sparta, North Carolina. Because nothing says &quot;essential government function&quot; like preserving teapot heritage.</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
          <p className="font-bold text-gray-900">Lobster Institute — $1.5 Million</p>
          <p className="text-sm text-gray-700">Repeated earmarks for the Lobster Institute at the University of Maine. Because lobsters apparently need federal advocacy.</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
          <p className="font-bold text-gray-900">Indoor Rainforest — $50 Million</p>
          <p className="text-sm text-gray-700">An enclosed rainforest in Coralville, Iowa, championed by Sen. Chuck Grassley. Because when you think &quot;tropical rainforest,&quot; you think Iowa. Never completed.</p>
        </div>
      </div>

      <SectionHeading>The New Earmarks: Same Pork, Better Branding</SectionHeading>

      <Paragraph>
        The returned earmarks are smaller on average but growing fast. Current examples include:
      </Paragraph>

      <DataTable
        headers={["Project", "Amount", "State", "Sponsor"]}
        rows={[
          ["Sidewalk improvements, small town", "$3M", "Various", "Various"],
          ["Community center renovations", "$2-5M", "Various", "Various"],
          ["Local park upgrades", "$1-3M", "Various", "Various"],
          ["University research programs", "$2-10M", "Various", "Various"],
          ["Museum and cultural projects", "$500K-2M", "Various", "Various"],
        ]}
      />

      <Paragraph>
        Defenders argue these are legitimate community investments. Critics point out that every
        district thinks its sidewalks and community centers are essential — and that&apos;s how
        you get to $14.6 billion.
      </Paragraph>

      <CalloutBox emoji="🐷" title="The Defense of Earmarks" color="amber">
        <p>Some political scientists actually defend earmarks. Their argument: earmarks give party
        leaders leverage to secure votes for important legislation. Without them, Congress is even
        more dysfunctional. The cost ($14.6B) is a rounding error in a $6.75T budget. The question
        is whether greasing the legislative wheels is worth the price.</p>
      </CalloutBox>

      <SectionHeading>Who Gets the Most Pork?</SectionHeading>

      <Paragraph>
        Earmarks are bipartisan. Both parties participate enthusiastically. However, members of
        the Appropriations Committee consistently secure more earmarks than others — a perk of
        controlling the purse strings. Senior members also tend to get larger and more numerous
        earmarks.
      </Paragraph>

      <Paragraph>
        The geographic distribution mirrors political power, not need. States with senior
        appropriators get more money, regardless of whether they need federal help building
        sidewalks and community centers.
      </Paragraph>

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        Earmarks are back, they&apos;re growing, and they&apos;re not going anywhere. The
        &quot;guardrails&quot; are real but limited. At $14.6 billion, earmarks are indeed a
        small fraction of the budget — but they represent something larger: Congress&apos;s
        inability to resist directing money to pet projects, even when the country is $36
        trillion in debt.
      </Paragraph>

      <Paragraph>
        The best argument for earmarks is that they&apos;re transparent and relatively small.
        The best argument against them is that they reward political connections over merit,
        and they condition lawmakers to see federal spending as a tool for re-election rather
        than a public trust.
      </Paragraph>
    </>
  );
}

function AgencyBudgetsExplained() {
  return (
    <>
      <Paragraph>
        Every year, the federal government is supposed to follow a structured budget process: the
        President proposes, Congress disposes, agencies execute. In practice, the process is a
        rolling disaster of missed deadlines, continuing resolutions, and 11th-hour omnibus bills.
      </Paragraph>

      <Paragraph>
        Congress hasn&apos;t passed all 12 appropriations bills on time since <strong>1997</strong>.
        That&apos;s 28 years of budget dysfunction. The &quot;process&quot; is a fiction. Here&apos;s
        what actually happens.
      </Paragraph>

      <SectionHeading>How It&apos;s Supposed to Work</SectionHeading>

      <div className="my-6 space-y-4">
        <div className="flex gap-4 items-start">
          <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center font-bold text-indigo-700 shrink-0">1</div>
          <div>
            <p className="font-bold text-gray-900">President&apos;s Budget (February)</p>
            <p className="text-sm text-gray-600">The President submits a budget request to Congress. This is a wish list — Congress ignores most of it. Presidents from both parties have called it &quot;dead on arrival.&quot;</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center font-bold text-indigo-700 shrink-0">2</div>
          <div>
            <p className="font-bold text-gray-900">Budget Resolution (April 15)</p>
            <p className="text-sm text-gray-600">Congress is supposed to pass a budget resolution setting overall spending limits. This often doesn&apos;t happen at all.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center font-bold text-indigo-700 shrink-0">3</div>
          <div>
            <p className="font-bold text-gray-900">Appropriations Bills (by October 1)</p>
            <p className="text-sm text-gray-600">12 individual appropriations bills fund different parts of the government. Each is supposed to pass both chambers. This almost never happens on time.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center font-bold text-indigo-700 shrink-0">4</div>
          <div>
            <p className="font-bold text-gray-900">Fiscal Year Begins (October 1)</p>
            <p className="text-sm text-gray-600">The new fiscal year starts. Agencies need funding to operate. If bills haven&apos;t passed, they need a continuing resolution.</p>
          </div>
        </div>
      </div>

      <SectionHeading>How It Actually Works</SectionHeading>

      <Paragraph>
        In reality, the process looks like this:
      </Paragraph>

      <div className="my-6 space-y-3">
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
          <p className="font-bold text-gray-900">February: President submits budget.</p>
          <p className="text-sm text-gray-500">Congress says &quot;that&apos;s nice&quot; and ignores it.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
          <p className="font-bold text-gray-900">March-September: Committees hold hearings.</p>
          <p className="text-sm text-gray-500">Members grandstand. Nothing passes.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
          <p className="font-bold text-gray-900">October 1: Fiscal year begins. No bills passed.</p>
          <p className="text-sm text-gray-500">Congress passes a continuing resolution (CR) to keep the lights on.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
          <p className="font-bold text-gray-900">October-December: More CRs, shutdown threats.</p>
          <p className="text-sm text-gray-500">Political brinksmanship. Cable news goes wall-to-wall.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
          <p className="font-bold text-gray-900">December/January: Omnibus bill.</p>
          <p className="text-sm text-gray-500">Leadership negotiates a massive bill behind closed doors. Members get hours to read a 4,000-page bill. It passes because the alternative is a shutdown.</p>
        </div>
      </div>

      <CalloutBox emoji="📚" title="What's an Omnibus Bill?" color="indigo">
        <p>An omnibus bill bundles all 12 (or most) appropriations bills into a single massive package.
        The FY2023 omnibus was <strong>4,155 pages long</strong> and cost $1.7 trillion. Members had
        about 24 hours to read it before voting. Nobody reads it. They just vote yes to avoid a
        shutdown, then claim credit for whatever goodies their staff inserted.</p>
      </CalloutBox>

      <SectionHeading>Mandatory vs. Discretionary: The Big Divide</SectionHeading>

      <Paragraph>
        Here&apos;s the dirty secret of the budget: Congress only controls about <strong>one-third</strong> of
        total spending through annual appropriations. The rest is &quot;mandatory&quot; — it happens
        automatically.
      </Paragraph>

      <DataTable
        headers={["Type", "Amount", "% of Budget", "Examples"]}
        rows={[
          ["Mandatory", "~$4.5T", "~65%", "Social Security, Medicare, Medicaid"],
          ["Discretionary", "~$1.8T", "~27%", "Defense, education, NASA, FBI"],
          ["Net Interest", "~$1.25T", "~12%", "Interest on the debt"],
        ]}
      />

      <Paragraph>
        This means the entire budget &quot;process&quot; — the hearings, the negotiations, the shutdowns —
        is about less than a third of what the government actually spends. The other two-thirds
        runs on autopilot. To change mandatory spending, Congress would need to change the underlying
        laws (Social Security Act, Medicare Act, etc.), which is politically radioactive.
      </Paragraph>

      <SectionHeading>Government Shutdowns: Political Theater</SectionHeading>

      <Paragraph>
        Since 1976, there have been <strong>22 funding gaps</strong>, including several multi-week
        shutdowns. The longest was 35 days in 2018-2019. Shutdowns furlough &quot;non-essential&quot; federal
        employees, close national parks, delay tax refunds, and create uncertainty — but they don&apos;t
        actually save money. Federal workers get back pay when the shutdown ends, and the disruption
        costs more than it saves.
      </Paragraph>

      <DataTable
        headers={["Shutdown", "Duration", "Workers Furloughed", "Cost"]}
        rows={[
          ["2013 (Obama/GOP)", "16 days", "800,000", "$24B in economic damage"],
          ["2018 (Trump)", "3 days", "Limited", "Minimal"],
          ["2018-19 (Trump)", "35 days", "800,000", "$11B in GDP"],
          ["2023 (avoided)", "0 days", "0", "Hours from shutdown"],
        ]}
      />

      <SectionHeading>The Debt Ceiling: A Separate Crisis</SectionHeading>

      <Paragraph>
        The debt ceiling is a separate statutory limit on how much the government can borrow.
        It&apos;s not about new spending — it&apos;s about paying for spending Congress already
        authorized. Think of it as refusing to pay your credit card bill after you&apos;ve already
        bought the stuff.
      </Paragraph>

      <Paragraph>
        Congress has raised or suspended the debt ceiling <strong>78 times since 1960</strong>.
        It&apos;s always raised eventually, but the brinksmanship causes market jitters, credit
        downgrades, and political chaos every time.
      </Paragraph>

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        The federal budget &quot;process&quot; is broken. Congress hasn&apos;t followed its own rules
        in nearly three decades. The result is governance by crisis: shutdowns, continuing resolutions,
        and omnibus bills that nobody reads. Two-thirds of spending happens on autopilot, and the
        third that Congress controls is subject to political hostage-taking every year.
      </Paragraph>

      <Paragraph>
        If you ran your household finances this way — missing every deadline, refusing to budget,
        then cramming everything into a last-minute emergency — you&apos;d be bankrupt. The government
        avoids that fate only because it can print money and borrow at will. For now.
      </Paragraph>
    </>
  );
}

function StateFederalFunding() {
  const recipientStates = [
    { name: "West Virginia", received: "$38B", paid: "$9B", ratio: "4.22x" },
    { name: "Mississippi", received: "$55B", paid: "$14B", ratio: "3.93x" },
    { name: "New Mexico", received: "$47B", paid: "$12B", ratio: "3.92x" },
    { name: "Alabama", received: "$86B", paid: "$29B", ratio: "2.97x" },
    { name: "Kentucky", received: "$78B", paid: "$28B", ratio: "2.79x" },
  ];

  const donorStates = [
    { name: "New Jersey", received: "$78B", paid: "$120B", ratio: "0.65x" },
    { name: "Connecticut", received: "$35B", paid: "$50B", ratio: "0.70x" },
    { name: "Massachusetts", received: "$73B", paid: "$100B", ratio: "0.73x" },
    { name: "New York", received: "$200B", paid: "$270B", ratio: "0.74x" },
    { name: "California", received: "$350B", paid: "$450B", ratio: "0.78x" },
  ];

  return (
    <>
      <Paragraph>
        Not all states are created equal when it comes to federal money. Some states send far more
        to Washington than they get back. Others receive far more than they contribute. The pattern
        is surprising — and it doesn&apos;t align with the political narratives either side tells.
      </Paragraph>

      <SectionHeading>The Biggest Takers</SectionHeading>

      <Paragraph>
        These states receive the most federal money relative to what their residents pay in federal taxes:
      </Paragraph>

      <DataTable
        headers={["State", "Received", "Paid in Taxes", "Ratio"]}
        rows={recipientStates.map((s) => [s.name, s.received, s.paid, s.ratio])}
      />

      <Paragraph>
        West Virginia receives <strong>$4.22 for every $1</strong> its residents pay in federal taxes.
        Mississippi gets $3.93 back. These are among the poorest states in the country, with high rates
        of Social Security, Medicare, Medicaid, and disability payments.
      </Paragraph>

      <SectionHeading>The Biggest Givers</SectionHeading>

      <DataTable
        headers={["State", "Received", "Paid in Taxes", "Ratio"]}
        rows={donorStates.map((s) => [s.name, s.received, s.paid, s.ratio])}
      />

      <Paragraph>
        New Jersey gets back only <strong>65 cents for every dollar</strong> its residents pay in
        federal taxes. Connecticut, Massachusetts, New York, and California are also major net donors.
        These are wealthy states with high incomes — and therefore high federal tax payments.
      </Paragraph>

      <CalloutBox emoji="🗳️" title="The Political Irony" color="amber">
        <p>Here&apos;s the uncomfortable truth: many of the states that receive the most federal money
        are <strong>red states</strong> that vote for smaller government. Many of the states that
        subsidize them are <strong>blue states</strong> that vote for bigger government. The states
        that complain the loudest about federal spending are often the ones most dependent on it.</p>
      </CalloutBox>

      <SectionHeading>Why the Mismatch?</SectionHeading>

      <Paragraph>
        The gap between donor and recipient states comes down to a few factors:
      </Paragraph>

      <div className="my-6 space-y-3">
        <div className="flex gap-3">
          <span className="font-bold text-indigo-600">1.</span>
          <div>
            <p className="font-bold text-gray-900">Income Inequality Between States</p>
            <p className="text-sm text-gray-600">The federal income tax is progressive. High-income states pay more per capita in taxes. Mississippi&apos;s median household income ($52K) is about half of New Jersey&apos;s ($97K).</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="font-bold text-indigo-600">2.</span>
          <div>
            <p className="font-bold text-gray-900">Entitlement Programs</p>
            <p className="text-sm text-gray-600">Social Security, Medicare, and Medicaid flow disproportionately to poorer, older states. West Virginia has one of the oldest populations and highest disability rates in the country.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="font-bold text-indigo-600">3.</span>
          <div>
            <p className="font-bold text-gray-900">Military Bases</p>
            <p className="text-sm text-gray-600">Southern states host a disproportionate share of military installations. Virginia, home to the Pentagon and dozens of bases, is a major beneficiary of defense spending.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="font-bold text-indigo-600">4.</span>
          <div>
            <p className="font-bold text-gray-900">Federal Land</p>
            <p className="text-sm text-gray-600">Western states (Nevada, Utah, Alaska) have enormous federal land holdings, which come with federal management spending.</p>
          </div>
        </div>
      </div>

      <SectionHeading>The Full Picture</SectionHeading>

      <Paragraph>
        Of the 50 states, approximately <strong>40 receive more than they pay</strong>. Only about
        10 states are net contributors to the federal treasury. This makes the federal tax system
        a massive wealth transfer machine — from rich states to poor states, from urban areas to
        rural areas, from young workers to retirees.
      </Paragraph>

      <Paragraph>
        Whether you see this as a feature or a bug depends on your political philosophy. Progressives
        say it&apos;s the social safety net working as designed. Libertarians say it creates
        dependency and removes incentives for states to improve their own economies. Both have a point.
      </Paragraph>

      <SectionHeading>Per Capita Extremes</SectionHeading>

      <Paragraph>
        On a per-person basis, the differences are even more dramatic. Residents of net-recipient
        states effectively receive a <strong>$5,000-15,000 annual subsidy</strong> from residents
        of net-donor states. A family of four in Mississippi receives roughly $40,000-60,000 more
        in federal benefits than they pay in federal taxes over a decade.
      </Paragraph>

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        The federal government is a giant redistribution machine. Money flows from wealthy coastal
        states to poorer interior states. The irony is that the states most dependent on federal
        money often vote for politicians who promise to cut it. And the states that subsidize the
        system often vote for politicians who want to expand it.
      </Paragraph>

      <Paragraph>
        Neither narrative holds up to scrutiny. Federal dependency isn&apos;t a red-state or
        blue-state problem — it&apos;s a structural feature of a system that taxes based on income
        and spends based on need (and political power). Until those fundamentals change, the
        geography of federal money will remain the same.
      </Paragraph>
    </>
  );
}

function ContractorSpending() {
  return (
    <>
      <Paragraph>
        In FY2025, the federal government will award approximately <strong>$779 billion</strong> in
        contracts to private companies. That&apos;s three-quarters of a trillion dollars flowing
        from taxpayers to corporations — and a handful of companies capture the lion&apos;s share.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <StatCard label="Total Contracts" value="$779B" sub="FY2025" color="indigo" />
        <StatCard label="Top 10 Share" value="~35%" sub="~$270B to just 10 companies" color="indigo" />
        <StatCard label="No-Bid Contracts" value="$74B+" sub="Awarded without competition" color="red" />
      </div>

      <SectionHeading>The Top 10 Federal Contractors</SectionHeading>

      <DataTable
        headers={["Rank", "Company", "Amount", "Primary Work"]}
        rows={[
          ["1", "Lockheed Martin", "$34.1B", "F-35, missiles, space"],
          ["2", "RTX (Raytheon)", "$23.8B", "Missiles, radar, engines"],
          ["3", "General Dynamics", "$19.2B", "Submarines, IT, tanks"],
          ["4", "Boeing", "$15.7B", "Aircraft, satellites, weapons"],
          ["5", "Northrop Grumman", "$14.9B", "B-21 bomber, space, cyber"],
          ["6", "Humana", "$13.2B", "Military healthcare (TRICARE)"],
          ["7", "L3Harris", "$10.8B", "Communications, electronics"],
          ["8", "Leidos", "$9.5B", "IT, defense, intelligence"],
          ["9", "Centene", "$8.9B", "Healthcare management"],
          ["10", "Accenture Federal", "$7.2B", "IT consulting"],
        ]}
      />

      <Paragraph>
        Notice a pattern? Six of the top ten are defense contractors. The military-industrial complex
        that Eisenhower warned about in 1961 is alive and well — and far larger than he imagined.
      </Paragraph>

      <SectionHeading>The Defense Contractor Oligopoly</SectionHeading>

      <Paragraph>
        Since the 1990s, the defense industry has consolidated from over 50 major contractors to
        essentially <strong>5 prime contractors</strong>: Lockheed Martin, RTX (Raytheon), General
        Dynamics, Boeing, and Northrop Grumman. These five companies receive the majority of
        major defense contracts.
      </Paragraph>

      <Paragraph>
        When there are only five companies that can build a fighter jet or a nuclear submarine,
        competition is limited. Cost overruns are routine. The F-35 program alone has a lifetime
        cost of <strong>$1.7 trillion</strong> — making it the most expensive weapons program in
        human history. It&apos;s been plagued by delays, cost increases, and performance issues
        since its inception in 2001.
      </Paragraph>

      <CalloutBox emoji="🔄" title="The Revolving Door" color="red">
        <p>Defense industry executives routinely become Pentagon officials, and Pentagon officials
        routinely become defense industry executives. In 2022, a study found that <strong>672 senior
        officials</strong> moved between the Pentagon and defense contractors over a four-year period.
        When the people awarding contracts used to work for (or will work for) the companies
        receiving them, is anyone surprised costs are out of control?</p>
      </CalloutBox>

      <SectionHeading>No-Bid Contracts: Competition Optional</SectionHeading>

      <Paragraph>
        The federal government awarded <strong>$74 billion in no-bid contracts</strong> — about
        one-third of all large contracts. No-bid (sole-source) contracts are supposed to be
        exceptions for emergencies or situations where only one company can do the work. In
        practice, they&apos;re routine.
      </Paragraph>

      <Paragraph>
        Studies consistently show that no-bid contracts cost <strong>20-30% more</strong> than
        competitively bid contracts for similar work. That suggests taxpayers are overpaying by
        $15-22 billion per year just on the no-bid contracts alone.
      </Paragraph>

      <SectionHeading>IT Contracts: The $100 Billion Money Pit</SectionHeading>

      <Paragraph>
        The federal government spends over <strong>$100 billion per year</strong> on IT — and the
        results are abysmal. The Healthcare.gov launch debacle ($2 billion), the OPM hack (21
        million personnel records stolen), and countless failed modernization projects are symptoms
        of a system that rewards contracts, not results.
      </Paragraph>

      <Paragraph>
        The typical pattern: an agency awards a multi-billion-dollar IT contract to a large
        integrator (Leidos, Accenture, Booz Allen). The project falls behind schedule and over
        budget. The contractor blames changing requirements. The agency is locked in and can&apos;t
        switch. More money is thrown at the problem. Years later, the system is delivered late,
        over budget, and often doesn&apos;t work as intended.
      </Paragraph>

      <SectionHeading>Contractor Workforce: Shadow Government</SectionHeading>

      <Paragraph>
        The federal government employs about <strong>2.2 million civilian workers</strong>. But
        it also employs an estimated <strong>4.4 million private contractors</strong> — twice as
        many. This &quot;shadow workforce&quot; is largely invisible in official headcounts, allowing
        politicians to claim they&apos;re &quot;shrinking government&quot; while spending more
        than ever on contractors who cost 2-3x what a federal employee would.
      </Paragraph>

      <DataTable
        headers={["Metric", "Federal Employees", "Contractors"]}
        rows={[
          ["Headcount", "2.2 million", "~4.4 million (est.)"],
          ["Avg. Cost/Person", "$120K", "$200-350K"],
          ["Accountability", "Subject to federal rules", "Limited oversight"],
          ["Transparency", "Public records", "Often proprietary"],
        ]}
      />

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        Federal contracting is a $779 billion industry dominated by a few massive companies,
        particularly in defense. Competition is limited, the revolving door spins freely, and
        accountability is minimal. No-bid contracts waste billions. IT projects routinely fail.
        And the contractor workforce is twice the size of the federal workforce, at much higher cost.
      </Paragraph>

      <Paragraph>
        The private sector is supposed to be more efficient than government. In many cases, it is.
        But when there are only five companies bidding (or not bidding) for trillion-dollar
        contracts, and the people awarding the contracts will work for those companies next year,
        the market isn&apos;t competitive. It&apos;s captured.
      </Paragraph>
    </>
  );
}

function SpendingPerCapita() {
  return (
    <>
      <Paragraph>
        In FY2025, total federal spending per person is approximately <strong>$20,400</strong>.
        Per taxpayer, it&apos;s <strong>$63,296</strong>. Per household, roughly <strong>$48,000</strong>.
        These numbers have roughly doubled since 2017.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <StatCard label="Per Person" value="$20,400" sub="Every man, woman, child" color="indigo" />
        <StatCard label="Per Taxpayer" value="$63,296" sub="Per federal income tax filer" color="red" />
        <StatCard label="Per Household" value="~$48,000" sub="Average U.S. household" color="amber" />
        <StatCard label="Growth Since 2017" value="+110%" sub="Per person, 8 years" color="red" />
      </div>

      <SectionHeading>The Trajectory</SectionHeading>

      <DataTable
        headers={["Year", "Total Spending", "Per Person", "Per Taxpayer"]}
        rows={[
          ["FY2017", "$3.26T", "$9,725", "$20,235"],
          ["FY2018", "$3.38T", "$10,104", "$21,023"],
          ["FY2019", "$3.56T", "$10,622", "$22,102"],
          ["FY2020", "$5.01T", "$14,945", "$31,097"],
          ["FY2021", "$5.29T", "$15,783", "$32,843"],
          ["FY2022", "$4.44T", "$13,250", "$27,571"],
          ["FY2023", "$4.76T", "$14,202", "$29,551"],
          ["FY2025 (est.)", "$6.75T+", "$20,400+", "$63,296"],
        ]}
      />

      <Paragraph>
        The COVID spike in FY2020-2021 was supposed to be temporary. But spending never returned
        to pre-COVID levels. Instead, it kept growing. The federal government now spends over
        <strong> $6.75 trillion per year</strong> — roughly double what it spent in 2017.
      </Paragraph>

      <CalloutBox emoji="💡" title="Put It In Perspective" color="indigo">
        <p>$63,296 per taxpayer. The median household income in America is about $75,000. That means
        the federal government spends almost as much <strong>per taxpayer</strong> as the median
        household earns in a year. And that&apos;s just federal — it doesn&apos;t include state and
        local spending.</p>
      </CalloutBox>

      <SectionHeading>What&apos;s Your $20,400 Buying?</SectionHeading>

      <Paragraph>
        Here&apos;s how federal spending per person breaks down by category:
      </Paragraph>

      <DataTable
        headers={["Category", "Per Person", "Per Day"]}
        rows={[
          ["Medicare", "$3,700", "$10.14"],
          ["Social Security", "$3,360", "$9.21"],
          ["Defense", "$2,860", "$7.84"],
          ["Interest on Debt", "$2,520", "$6.90"],
          ["Health (Medicaid)", "$2,310", "$6.33"],
          ["Income Security", "$1,790", "$4.90"],
          ["Veterans", "$730", "$2.00"],
          ["Education", "$700", "$1.92"],
          ["Transportation", "$360", "$0.99"],
          ["All Other", "$2,070", "$5.67"],
        ]}
      />

      <Paragraph>
        The government spends <strong>$55.89 per person, per day</strong>. That&apos;s $1,676 per
        person per month, or about the cost of a modest apartment in most American cities. Every
        single day, for every single American — including babies and retirees.
      </Paragraph>

      <SectionHeading>The Growth Problem</SectionHeading>

      <Paragraph>
        Federal spending per person has grown far faster than incomes:
      </Paragraph>

      <div className="my-6 space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700">Federal spending per person growth (2017-2025)</span>
          <span className="font-bold text-red-600">+110%</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700">Median household income growth (2017-2025)</span>
          <span className="font-bold text-green-600">+25%</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700">Inflation (cumulative, 2017-2025)</span>
          <span className="font-bold text-amber-600">+30%</span>
        </div>
      </div>

      <Paragraph>
        Even adjusting for inflation, per-person spending has roughly doubled. Incomes haven&apos;t
        come close to keeping pace. The gap is filled by borrowing — which just passes the bill
        to future taxpayers.
      </Paragraph>

      <SectionHeading>International Comparison</SectionHeading>

      <Paragraph>
        How does U.S. per-capita government spending compare to other countries?
      </Paragraph>

      <DataTable
        headers={["Country", "Govt Spending Per Capita", "% of GDP"]}
        rows={[
          ["United States", "$20,400", "~37%"],
          ["Norway", "$38,000", "~50%"],
          ["Sweden", "$24,000", "~49%"],
          ["Germany", "$21,000", "~48%"],
          ["United Kingdom", "$17,500", "~44%"],
          ["Japan", "$16,000", "~44%"],
          ["South Korea", "$11,000", "~34%"],
        ]}
      />

      <Paragraph>
        The U.S. spends more per capita than most countries but gets less for it — no universal
        healthcare, crumbling infrastructure, and mediocre education outcomes. Scandinavian countries
        spend more and get comprehensive social services. The U.S. seems to have the worst of
        both worlds: high spending with limited results.
      </Paragraph>

      <SectionHeading>The &quot;Where Does It All Go?&quot; Question</SectionHeading>

      <Paragraph>
        Americans are right to ask: if the government spends $20,400 per person — more than most
        countries — why doesn&apos;t it feel like it? Where are the gleaming trains, the free
        healthcare, the well-funded schools?
      </Paragraph>

      <Paragraph>
        The answer is that most federal spending goes to transfer payments (Social Security,
        Medicare, Medicaid) and debt interest — not to visible public services. Unlike European
        countries that spend heavily on public infrastructure and universal programs, the U.S.
        spends heavily on individual benefits and military hardware. You don&apos;t see a new
        train station. You see a Social Security check for grandma and an F-35 for Lockheed Martin.
      </Paragraph>

      <SectionHeading>The Bottom Line</SectionHeading>

      <Paragraph>
        The federal government spends over $20,000 per American, and the number is growing fast.
        Most of it goes to entitlements and interest — not to the public services people can see
        and use. Spending has outpaced income growth by a factor of 4x over the past eight years,
        with the gap funded entirely by debt.
      </Paragraph>

      <Paragraph>
        At $63,296 per taxpayer, the federal government is the single largest expense in most
        Americans&apos; lives — larger than housing, food, or healthcare. The question isn&apos;t
        whether government should spend. It&apos;s whether Americans are getting $63,000 worth
        of value. Most would say no.
      </Paragraph>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   ARTICLE RENDERER
   ──────────────────────────────────────────────────────────────────────────── */

const articleComponents: Record<string, () => React.JSX.Element> = {
  "where-your-taxes-go": WhereYourTaxesGo,
  "defense-vs-education": DefenseVsEducation,
  "wasteful-spending": WastefulSpending,
  "national-debt-crisis": NationalDebtCrisis,
  "covid-spending": CovidSpending,
  "earmarks-return": EarmarksReturn,
  "agency-budgets-explained": AgencyBudgetsExplained,
  "state-federal-funding": StateFederalFunding,
  "contractor-spending": ContractorSpending,
  "spending-per-capita": SpendingPerCapita,
};

export default async function AnalysisArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const Content = articleComponents[slug];
  if (!Content) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumbs items={[{ label: "Analysis", href: "/analysis" }, { label: article.title }]} />
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-900/50 px-3 py-1 rounded-full mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight font-[family-name:var(--font-playfair)]">
            {article.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            {article.subtitle}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
            <span>📅 {new Date(article.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>·</span>
            <span>⏱️ {article.readTime}</span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Content />
        <div className="mt-12">
          <ShareButtons title={article.title} url={`https://www.openspending.us/analysis/${slug}`} />
        </div>
        <RelatedArticles current={slug} />
      </article>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">Explore the Data Yourself</h2>
          <p className="mt-2 text-gray-600">Dive into the raw numbers behind this analysis.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/agencies" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Browse Agencies</Link>
            <Link href="/contractors" className="inline-block bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">View Contractors</Link>
            <Link href="/tools/tax-calculator" className="inline-block bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">Tax Calculator</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
