import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShareButtons } from "@/components/ShareButtons";
import countriesData from "@/../public/data/spending-by-country.json";
import { CountriesClient } from "./CountriesClient";

export const metadata: Metadata = {
  title: "U.S. Federal Spending by Country | OpenSpending",
  description: "Explore U.S. federal spending across 50 countries in FY2025. See foreign aid and contract spending by recipient country.",
};

type Country = { name: string; code: string; amount: number };

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const countries = countriesData as Country[];
const ranked = [...countries].sort((a, b) => b.amount - a.amount).map((c, i) => ({
  ...c,
  rank: i + 1,
  slug: slugify(c.name),
}));

export default function CountriesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "U.S. Federal Spending by Country FY2025",
        "description": "Foreign aid and federal spending distributed by recipient country",
        "url": "https://www.openspending.us/countries",
        "creator": { "@type": "Organization", "name": "OpenSpending" }
      }} />
      <Breadcrumbs items={[{ label: "Foreign Aid", href: "/foreign-aid" }, { label: "Countries" }]} />

      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
        U.S. Spending by Country
      </h1>
      <p className="text-gray-600 mb-6">
        Federal spending across 50 countries in FY2025. Click any country for details.
      </p>

      <CountriesClient countries={ranked} />

      <div className="mt-8">
        <ShareButtons title="U.S. Federal Spending by Country — FY2025" />
      </div>
    </main>
  );
}
