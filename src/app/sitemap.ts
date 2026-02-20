import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://plainsight.digital";
  const currentDate = new Date();

  const routes = [
    { path: "", priority: 1, changeFreq: "weekly" as const },
    { path: "/clinics", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/law-firms", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/schools", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/hotels", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/logistics", priority: 0.9, changeFreq: "weekly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));
}
