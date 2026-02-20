import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars, formatDollarsLong } from "@/lib/format";
import subagencies from "@/../public/data/subagencies.json";

const TOTAL_FEDERAL = 11200000000000;

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const sorted = [...subagencies].sort((a, b) => b.amount - a.amount);
const bySlug = new Map(sorted.map((s, i) => [slugify(s.name), { ...s, rank: i + 1 }]));

export function generateStaticParams() {
  return sorted.map((s) => ({ slug: slugify(s.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug.get(slug);
  if (!entry) return { title: "Not Found" };
  return {
    title: `${entry.name} – ${formatDollars(entry.amount)} in Federal Spending | OpenSpending`,
    description: `${entry.name} received ${formatDollars(entry.amount)} in federal spending in FY2025, ranking #${entry.rank} among all sub-agencies tracked.`,
  };
}

export default async function SubAgencyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug.get(slug);
  if (!entry) notFound();

  const pct = (entry.amount / TOTAL_FEDERAL) * 100;
  const pageUrl = `https://openspending-app.vercel.app/subagencies/${slug}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Sub-Agencies", href: "/subagencies" },
          { label: entry.name },
        ]}
      />

      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        {entry.name}
      </h1>

      {/* Big stat card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mb-8 text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
          Total Federal Spending
        </p>
        <p className="text-5xl sm:text-6xl font-bold text-indigo-700 mb-4">
          {formatDollars(entry.amount)}
        </p>
        <p className="text-gray-600">{formatDollarsLong(entry.amount)}</p>
      </div>

      {/* Rank and percentage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-gray-900">#{entry.rank}</p>
          <p className="text-sm text-gray-500 mt-1">of {sorted.length} sub-agencies by spending</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-gray-900">{pct < 0.1 ? pct.toFixed(3) : pct.toFixed(1)}%</p>
          <p className="text-sm text-gray-500 mt-1">of total federal spending</p>
        </div>
      </div>

      {/* Context paragraph */}
      <p className="text-lg text-gray-700 mb-10 leading-relaxed">
        {entry.name} received {formatDollars(entry.amount)} in federal spending in FY2025,
        ranking #{entry.rank} among all sub-agencies tracked.
      </p>

      <ShareButtons url={pageUrl} title={`${entry.name} – ${formatDollars(entry.amount)} in Federal Spending`} />

      {/* Explore More */}
      <section className="border-t border-gray-200 pt-8 mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/subagencies" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition">
            <p className="font-semibold text-indigo-700">Sub-Agencies →</p>
            <p className="text-sm text-gray-600">All sub-agency spending</p>
          </Link>
          <Link href="/agencies" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition">
            <p className="font-semibold text-indigo-700">Agencies →</p>
            <p className="text-sm text-gray-600">Parent agency profiles</p>
          </Link>
          <Link href="/contractors" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition">
            <p className="font-semibold text-indigo-700">Contractors →</p>
            <p className="text-sm text-gray-600">Top federal contractors</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
