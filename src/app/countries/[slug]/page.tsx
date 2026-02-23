import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedPages } from "@/components/RelatedPages";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars, formatDollarsLong, toTitleCase } from "@/lib/format";
import countriesData from "@/../public/data/spending-by-country.json";

type Country = { name: string; code: string; amount: number };

const countries = countriesData as Country[];

// Sort by amount descending for ranking
const ranked = [...countries].sort((a, b) => b.amount - a.amount);
const rankMap = new Map(ranked.map((c, i) => [c.code, i + 1]));

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const slugMap = new Map(countries.map((c) => [slugify(c.name), c]));

export function generateStaticParams() {
  return countries.map((c) => ({ slug: slugify(c.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = slugMap.get(slug);
  if (!country) return {};
  const name = toTitleCase(country.name);
  return {
    title: `U.S. Spending in ${name} FY2025 | OpenSpending`,
    description: `${formatDollars(country.amount)} in U.S. tax dollars sent to ${name} in FY2025. See the full breakdown of contracts, grants, and foreign aid.`,
    openGraph: {
      title: `U.S. Spending in ${name} | OpenSpending`,
      description: `${formatDollars(country.amount)} in federal spending to ${name} in FY2025.`,
    },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = slugMap.get(slug);
  if (!country) notFound();

  const name = toTitleCase(country.name);
  const rank = rankMap.get(country.code) ?? 0;
  const totalAll = ranked.reduce((s, c) => s + c.amount, 0);
  const pct = ((country.amount / totalAll) * 100).toFixed(2);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Foreign Aid", href: "/foreign-aid" },
          { label: "Countries", href: "/countries" },
          { label: name },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">
        U.S. Spending in {name}
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total U.S. Spending</p>
          <p className="text-2xl font-bold text-indigo-600">{formatDollars(country.amount)}</p>
          <p className="text-xs text-gray-400 mt-1">{formatDollarsLong(country.amount)}</p>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Rank</p>
          <p className="text-2xl font-bold text-indigo-600">#{rank} <span className="text-sm font-normal text-gray-500">of 50 countries</span></p>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Share of Total</p>
          <p className="text-2xl font-bold text-indigo-600">{pct}%</p>
        </div>
      </div>

      {/* Context */}
      <div className="bg-gray-50 border rounded-lg p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          The United States directed <strong>{formatDollarsLong(country.amount)}</strong> in federal
          spending to {name} in FY2025, making it the <strong>#{rank}</strong> largest recipient of
          U.S. government funds among the top 50 countries tracked.
        </p>
      </div>

      <RelatedPages items={[
        { href: "/foreign-aid", title: "Foreign Aid Overview", description: "Where U.S. foreign aid dollars go around the world." },
        { href: "/foreign-aid-deep-dive", title: "Foreign Aid Deep Dive", description: "Detailed analysis of U.S. foreign assistance programs." },
        { href: "/international-spending", title: "International Spending", description: "All federal spending on international affairs." },
        { href: "/usaid", title: "USAID", description: "The U.S. Agency for International Development's budget and programs." },
      ]} />

      <ShareButtons title={`U.S. Spending in ${name} — ${formatDollars(country.amount)} in FY2025`} />
    </main>
  );
}
