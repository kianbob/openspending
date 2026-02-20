import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedPages } from "@/components/RelatedPages";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";
import industries from "@/../public/data/industry-details.json";

type Industry = {
  code: string;
  name: string;
  slug: string;
  amount: number;
  rank: number;
  pctOfTotal: number;
};

const data = industries as Industry[];
const top10 = data.slice(0, 10);

function findBySlug(slug: string): Industry | undefined {
  return data.find((i) => i.slug === slug);
}

export function generateStaticParams() {
  return data.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = findBySlug(slug);
  if (!ind) return { title: "Industry Not Found — OpenSpending" };
  const title = `${ind.name} — Federal Spending by Industry | OpenSpending`;
  const description = `The federal government spent ${formatDollars(ind.amount)} on ${ind.name} contracts, ranking #${ind.rank} of the top 50 industries (${ind.pctOfTotal}% of total).`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = findBySlug(slug);
  if (!ind) notFound();

  const isInTop10 = ind.rank <= 10;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Industries", href: "/industries" },
          { label: ind.name },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
          {ind.name}
        </h1>
        <ShareButtons
          title={`${ind.name} — ${formatDollars(ind.amount)} in federal contracts`}
          url={`https://www.openspending.us/industries/${ind.slug}`}
        />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Total Contract Value</p>
          <p className="text-2xl md:text-3xl font-bold text-indigo-700">
            {formatDollars(ind.amount)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Rank</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            #{ind.rank} <span className="text-base font-normal text-gray-500">of 50</span>
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">% of Total Contracts</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {ind.pctOfTotal}%
          </p>
        </div>
      </div>

      {/* NAICS Code */}
      <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full mb-10">
        <span>NAICS Code:</span>
        <span className="font-mono font-bold">{ind.code}</span>
      </div>

      {/* Context */}
      <div className="prose prose-gray max-w-none mb-10">
        <p>
          <strong>{ind.name}</strong> (NAICS {ind.code}) ranks{" "}
          <strong>#{ind.rank} out of 50</strong> industries by federal contract
          spending, accounting for <strong>{ind.pctOfTotal}%</strong> of the
          total contract dollars tracked on OpenSpending. The federal government
          has directed <strong>{formatDollars(ind.amount)}</strong> to this
          industry through contracts recorded in USAspending.gov data.
          {ind.rank <= 5
            ? " As one of the top 5 industries, it represents a massive concentration of taxpayer money — the kind of spending that deserves close public scrutiny."
            : ind.rank <= 15
              ? " This places it among the most significant recipients of federal contract dollars, reflecting sustained government demand in this sector."
              : " While not in the very top tier, this level of spending still represents billions in taxpayer funds flowing to a single industry."}
        </p>
      </div>

      {/* How This Industry Ranks */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-serif">
          How This Industry Ranks
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-100">
            {top10.map((t) => {
              const isThis = t.slug === ind.slug;
              const barWidth = Math.max(
                (t.amount / top10[0].amount) * 100,
                2
              );
              return (
                <div
                  key={t.slug}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    isThis
                      ? "bg-indigo-50 border-l-4 border-indigo-500"
                      : ""
                  }`}
                >
                  <span className="text-sm font-bold text-gray-500 w-8 text-right shrink-0">
                    #{t.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-medium truncate ${
                          isThis ? "text-indigo-700 font-bold" : "text-gray-800"
                        }`}
                      >
                        {t.name}
                        {isThis && " ← this industry"}
                      </span>
                      <span className="text-sm text-gray-500 ml-2 shrink-0">
                        {formatDollars(t.amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          isThis ? "bg-indigo-500" : "bg-gray-300"
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            {!isInTop10 && (
              <>
                <div className="px-4 py-2 text-center text-xs text-gray-400">
                  ···
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 border-l-4 border-indigo-500">
                  <span className="text-sm font-bold text-gray-500 w-8 text-right shrink-0">
                    #{ind.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-indigo-700 truncate">
                        {ind.name} ← this industry
                      </span>
                      <span className="text-sm text-gray-500 ml-2 shrink-0">
                        {formatDollars(ind.amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-indigo-500"
                        style={{
                          width: `${Math.max(
                            (ind.amount / top10[0].amount) * 100,
                            2
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <RelatedPages items={[
        { href: "/industries", title: "All Industries", description: "Compare 50+ industries by federal contract spending." },
        { href: "/contractors", title: "Top Contractors", description: "Which companies dominate federal contracting dollars." },
        { href: "/products", title: "Products & Services", description: "What the government actually buys with your tax dollars." },
        { href: "/what-they-buy", title: "What They Buy", description: "The surprising things the federal government purchases." },
      ]} />
    </div>
  );
}
