import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import countyData from "@/../public/data/county-spending.json";
import { CountiesClient } from "./CountiesClient";

export const metadata: Metadata = {
  title: "Federal Spending by County | OpenSpending",
  description: "Explore federal contract spending across U.S. counties. See which counties receive the most federal dollars in FY2025.",
};

type County = { name: string | null; amount: number; code: string | null };

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const counties = (countyData as County[])
  .filter((c): c is County & { name: string } => !!c.name)
  .sort((a, b) => b.amount - a.amount)
  .map((c, i) => ({ ...c, rank: i + 1, slug: slugify(c.name) }));

const seen = new Set<string>();
const deduped = counties.filter((c) => {
  if (seen.has(c.slug)) return false;
  seen.add(c.slug);
  return true;
});

export default function CountiesListingPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "Federal Spending by County FY2025",
        "description": "Federal contract spending distributed by U.S. county",
        "url": "https://www.openspending.us/counties",
        "creator": { "@type": "Organization", "name": "OpenSpending" }
      }} />
      <Breadcrumbs items={[{ label: "Counties" }]} />

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Federal Spending by County
      </h1>
      <p className="text-gray-600 mb-6">
        Explore federal spending across {deduped.length} counties. Click any county for a detailed breakdown.
      </p>

      <CountiesClient counties={deduped.map(c => ({ name: c.name, amount: c.amount, rank: c.rank, slug: c.slug }))} />
    </main>
  );
}
