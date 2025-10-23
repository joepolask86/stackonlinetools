import { NextResponse } from "next/server";
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

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  // Static pages
  const staticPages = [
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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refunds`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/suggest`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Category pages
  const categoryPages = categories
    .filter(category => category.toolCount > 0)
    .map(category => ({
      url: `${baseUrl}/${categorySlugMap[category.id]}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Individual tool pages (only implemented tools)
  const toolPages = toolsMetadata
    .filter(tool => tool.status === "implemented")
    .map(tool => ({
      url: `${baseUrl}/tool/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const allPages = [...staticPages, ...categoryPages, ...toolPages];

  // Generate XML sitemap with XSL stylesheet reference
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => {
  const date = page.lastModified.toISOString().replace(/\.\d{3}Z$/, '+00:00');
  return `    <url>
        <loc>${page.url}</loc>
        <lastmod>${date}</lastmod>
        <changefreq>${page.changeFrequency}</changefreq>
        <priority>${page.priority}</priority>
    </url>`;
}).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
