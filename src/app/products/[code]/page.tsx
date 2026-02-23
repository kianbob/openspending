import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";
import products from "@/../public/data/product-service-codes.json";

type PSC = { name: string; code: string; amount: number };

const data = (products as PSC[]).map((p, i) => ({ ...p, rank: i + 1 }));

function findByCode(code: string) {
  return data.find((p) => p.code === code);
}

export function generateStaticParams() {
  return data.map((p) => ({ code: p.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const psc = findByCode(code);
  if (!psc) return { title: "Product/Service Not Found — OpenSpending" };
  const title = `${psc.name} (${psc.code}) | Federal Spending | OpenSpending`;
  const description = `${formatDollars(psc.amount)} spent on ${psc.name} — ranked #${psc.rank} of 100 federal product/service categories. See where your tax dollars go.`;
  return { title, description, openGraph: { title, description } };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const psc = findByCode(code);
  if (!psc) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "What They Buy", href: "/what-they-buy" },
          { label: psc.name },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
          {psc.name}
        </h1>
        <ShareButtons
          title={`${psc.name} — ${formatDollars(psc.amount)} in federal spending`}
          url={`https://www.openspending.us/products/${psc.code}`}
        />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Total Spending</p>
          <p className="text-2xl md:text-3xl font-bold text-indigo-700">
            {formatDollars(psc.amount)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Rank</p>
          <p className="text-2xl md:text-3xl font-bold text-indigo-700">
            #{psc.rank} <span className="text-base font-normal text-gray-400">of 100</span>
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">PSC Code</p>
          <p className="text-2xl md:text-3xl font-bold text-indigo-700">
            {psc.code}
          </p>
        </div>
      </div>

      {/* Context */}
      <section className="prose prose-gray max-w-none mb-10">
        <h2>About This Category</h2>
        <p>
          <strong>{psc.name}</strong> (PSC code {psc.code}) is one of the top 100
          federal product and service categories by spending. The U.S. government
          obligated <strong>{formatDollars(psc.amount)}</strong> in this category,
          making it the #{psc.rank} largest area of federal procurement. Product
          Service Codes (PSCs) are used by the federal government to categorize the
          types of products and services purchased, enabling transparency and
          analysis of how taxpayer dollars are spent across thousands of categories.
        </p>
      </section>

      {/* Related Links */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/what-they-buy"
            className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition"
          >
            <p className="font-medium text-indigo-700">What They Buy</p>
            <p className="text-sm text-gray-500">All product &amp; service categories</p>
          </Link>
          <Link
            href="/contractors"
            className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition"
          >
            <p className="font-medium text-indigo-700">Top Contractors</p>
            <p className="text-sm text-gray-500">Who gets the contracts</p>
          </Link>
          <Link
            href="/industries"
            className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition"
          >
            <p className="font-medium text-indigo-700">Industries</p>
            <p className="text-sm text-gray-500">Spending by NAICS sector</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
