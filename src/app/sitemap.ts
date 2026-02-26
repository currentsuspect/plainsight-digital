import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.plainsightdigital.dev";
  const currentDate = new Date();

  const routes = [
    { path: "", priority: 1, changeFreq: "weekly" as const },
    { path: "/clinics", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/law-firms", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/schools", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/hotels", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/logistics", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/audit", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/promise", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/blog/website-cost-kenya", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/blog/mpesa-cart-abandonment", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/blog/patient-journey-kenya", priority: 0.9, changeFreq: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));
}
