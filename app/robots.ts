import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://stackonlinetools.com";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
        ],
        disallow: [
          "/login",
          "/register",
          "/api/",
          "/admin/",
          "/dashboard/",
          "/_next/",
          "/404",
          "/*.json$",
          "/*?*", // Disallow URLs with query parameters
        ],
      },
      // Optimize crawl rate for major search engines
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/404"],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/404"],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}