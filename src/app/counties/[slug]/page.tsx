import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatDollars, formatDollarsLong, toTitleCase } from "@/lib/format";
import countyData from "@/../public/data/county-spending.json";

type County = { name: string | null; amount: number; code: string | null };

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const counties = (countyData as County[])
  .filter((c): c is County & { name: string } => !!c.name)
  .sort((a, b) => b.amount - a.amount)
  .map((c, i) => ({ ...c, rank: i + 1, slug: slugify(c.name) }));

// Deduplicate by slug (keep highest-spending)
const slugMap = new Map<string, (typeof counties)[number]>();
for (const c of counties) {
  if (!slugMap.has(c.slug)) slugMap.set(c.slug, c);
}

export function generateStaticParams() {
  return Array.from(slugMap.keys()).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const county = slugMap.get(params.slug);
  if (!county) return { title: "County Not Found" };
  const name = toTitleCase(county.name);
  return {
    title: `${name} — Federal Spending | OpenSpending`,
    description: `${name} received ${formatDollars(county.amount)} in federal spending. Ranked #${county.rank} of ${slugMap.size} counties.`,
  };
}

export default function CountyDetailPage({ params }: { params: { slug: string } }) {
  const county = slugMap.get(params.slug);
  if (!county) notFound();

  const name = toTitleCase(county.name);
  const totalCounties = slugMap.size;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Local Spending", href: "/local-spending" },
          { label: name },
        ]}
      />

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        {name}
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Federal Spending
          </p>
          <p className="text-3xl font-bold text-indigo-700 mt-1">
            {formatDollars(county.amount)}
          </p>
          <p className="text-xs text-gray-400 mt-1">{formatDollarsLong(county.amount)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Rank
          </p>
          <p className="text-3xl font-bold text-indigo-700 mt-1">
            #{county.rank}
          </p>
          <p className="text-xs text-gray-400 mt-1">of {totalCounties} counties</p>
        </div>
      </div>

      {/* Context */}
      <section className="prose prose-gray max-w-none mb-8">
        <p>
          {name} received a total of{" "}
          <strong>{formatDollarsLong(county.amount)}</strong> in federal spending,
          ranking <strong>#{county.rank} out of {totalCounties}</strong> counties
          tracked by OpenSpending. Federal dollars flow to counties through a mix
          of direct federal contracts, grants to local governments, healthcare
          reimbursements, infrastructure funding, and defense-related spending.
          The amount each county receives depends on factors like military
          installations, major federal facilities, population, poverty rates, and
          the presence of federal contractors.
        </p>
      </section>

      {/* Related Links */}
      <section className="border-t border-gray-200 pt-6">
        <h2 className="font-serif text-lg font-semibold text-gray-900 mb-3">
          Explore More
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/counties"
            className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors"
          >
            All Counties
          </Link>
          <Link
            href="/local-spending"
            className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors"
          >
            Local Spending
          </Link>
          <Link
            href="/states"
            className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors"
          >
            States
          </Link>
          <Link
            href="/agencies"
            className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors"
          >
            Agencies
          </Link>
        </div>
      </section>
    </main>
  );
}
