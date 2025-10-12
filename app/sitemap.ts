import { MetadataRoute } from "next";
import { toolsMetadata, categories } from "@/lib/tool-registry";

// Map category IDs to URL slugs
const categorySlugMap: Record<string, string> = {
  "text": "text-tools",
  "encoding": "encoding-tools", 
  "json": "json-tools",
  "code": "code-tools",
  "markdown": "markdown-tools",
  "seo": "seo-tools",
  "image": "image-tools",
  "pdf": "pdf-tools",
  "math": "math-tools",
  "privacy": "privacy-tools",
  "misc": "misc-tools",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000";
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter(category => category.toolCount > 0) // Only include categories with tools
    .map(category => ({
      url: `${baseUrl}/${categorySlugMap[category.id]}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Individual tool pages
  const toolPages: MetadataRoute.Sitemap = toolsMetadata.map(tool => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
