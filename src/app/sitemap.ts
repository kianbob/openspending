import { MetadataRoute } from "next";
import agencies from "@/../public/data/agencies.json";
import contractors from "@/../public/data/top-contractors.json";
import states from "@/../public/data/spending-by-state.json";
import industries from "@/../public/data/industry-details.json";

const BASE_URL = "https://openspending-app.vercel.app";

function slugifyContractor(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/g, "");
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

  const industryPages = (industries as Array<{ slug: string }>).map(
    (i) => `/industries/${i.slug}`
  );

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
    ...industryPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
