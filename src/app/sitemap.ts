import { MetadataRoute } from "next";
import agencySpending from "@/../public/data/agency-spending.json";
import agencyTrends from "@/../public/data/agency-trends.json";

const BASE_URL = "https://openspending.info";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/agencies",
    "/contractors",
    "/contracts",
    "/industries",
    "/foreign-aid",
    "/usaid",
    "/covid",
    "/trends",
    "/states",
    "/about",
  ];

  const trends = agencyTrends as Record<string, { years: unknown[] }>;
  const codeToTrendKey: Record<string, string> = {
    DOS: "State",
    TREAS: "Treasury",
    DOC: "Commerce",
  };

  const agencyPages = agencySpending
    .filter((a) => {
      if (!a.slug) return false;
      const trendKey = codeToTrendKey[a.code] ?? a.code;
      const trend = trends[trendKey];
      return trend && Array.isArray(trend.years) && trend.years.length > 0;
    })
    .map((a) => `/agencies/${a.slug}`);

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
  ];
}
