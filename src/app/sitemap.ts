import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.plainsightdigital.dev";

  return [
    "",
    "/clinics",
    "/law-firms",
    "/schools",
    "/hotels",
    "/logistics",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
