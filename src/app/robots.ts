import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.plainsightdigital.dev";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/*", "/admin-login", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
