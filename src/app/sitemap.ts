import { MetadataRoute } from "next";
import agencySpending from "@/../public/data/agency-spending.json";

const BASE_URL = "https://openspending-app.vercel.app";

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

  const agencyPages = agencySpending
    .filter((a) => !!a.slug)
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
