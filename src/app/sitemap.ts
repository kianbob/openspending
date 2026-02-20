import { MetadataRoute } from "next";
import agencies from "@/../public/data/agencies.json";
import contractors from "@/../public/data/top-contractors.json";
import states from "@/../public/data/spending-by-state.json";
import industries from "@/../public/data/industry-details.json";
import awards from "@/../public/data/top-awards.json";
import subagencies from "@/../public/data/subagencies.json";
import productCodes from "@/../public/data/product-service-codes.json";
import grantRecipients from "@/../public/data/top-grant-recipients-detailed.json";
import countySpending from "@/../public/data/county-spending.json";
import countriesRaw from "@/../public/data/spending-by-country.json";

const BASE_URL = "https://openspending-app.vercel.app";

function slugifyCounty(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

function slugifyContractor(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/g, "");
}

function slugifySubagency(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

function slugifyState(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\./g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/agencies",
    "/contractors",
    "/states",
    "/contracts",
    "/industries",
    "/foreign-aid",
    "/usaid",
    "/covid",
    "/trends",
    "/about",
    "/search",
    "/compare",
    "/how-it-works",
    "/no-bid",
    "/waste",
    "/downloads",
    "/spending-analysis",
    "/pentagon-spending",
    "/healthcare-spending",
    "/top-10",
    "/doge-reality",
    "/your-tax-bill",
    "/spending-explosion",
    "/global-comparison",
    "/national-debt",
    "/shutdown-calculator",
    "/contractor-monopoly",
    "/interest",
    "/state-dependency",
    "/what-they-buy",
    "/local-spending",
    "/international-spending",
    "/grants",
    "/spending-speed",
    "/program-growth",
    "/federal-accounts",
    "/monthly-pulse",
    "/subagencies",
    "/foreign-aid-deep-dive",
    "/pentagon-deep-dive",
    "/welfare-queens",
    "/efficiency",
    "/industry-trends",
    "/investigations",
    "/countries",
    "/counties",
    "/products",
    "/tax-calculator",
  ];

  const agencyPages = agencies
    .filter((a) => !!a.slug)
    .map((a) => `/agencies/${a.slug}`);

  // Deduplicate contractors by slug (some appear multiple times with different UEIs)
  const contractorSlugs = new Set<string>();
  const contractorPages: string[] = [];
  for (const c of contractors) {
    const slug = slugifyContractor(c.name);
    if (!contractorSlugs.has(slug)) {
      contractorSlugs.add(slug);
      contractorPages.push(`/contractors/${slug}`);
    }
  }

  const statePages = states.map((s) => `/states/${slugifyState(s.name)}`);

  const subagencyPages = subagencies.map(
    (s) => `/subagencies/${slugifySubagency(s.name)}`
  );

  const industryPages = (industries as Array<{ slug: string }>).map(
    (i) => `/industries/${i.slug}`
  );

  const contractPages = (awards as Array<{ awardId: string }>).map((a) => {
    const slug = a.awardId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
    return `/contracts/${slug}`;
  });

  const countySlugs = new Set<string>();
  const countyPages: string[] = [];
  for (const c of (countySpending as Array<{ name: string | null }>)) {
    if (!c.name) continue;
    const slug = slugifyCounty(c.name);
    if (!countySlugs.has(slug)) {
      countySlugs.add(slug);
      countyPages.push(`/counties/${slug}`);
    }
  }

  const productPages = (productCodes as Array<{ code: string }>).map(
    (p) => `/products/${p.code}`
  );

  function slugifyGrantRecipient(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "");
  }

  const grantRecipientPages = (grantRecipients as Array<{ name: string }>).map(
    (r) => `/grants/recipients/${slugifyGrantRecipient(r.name)}`
  );

  const countryPages = (countriesRaw as Array<{ name: string }>).map((c) => {
    const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
    return `/countries/${slug}`;
  });

  return [
    ...staticPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...agencyPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...contractorPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...statePages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...subagencyPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...industryPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...contractPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...countyPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...countryPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...productPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...grantRecipientPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
