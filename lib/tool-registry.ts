import { ToolMetadata, CategoryInfo, ToolCategory } from "@/types/tool";

/**
 * Tool registry - Central source of truth for all tools
 */
export const toolsMetadata: ToolMetadata[] = [
  // Text Tools
  {
    id: "case-converter",
    slug: "case-converter",
    name: "Case Converter",
    description: "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, and more",
    category: "text",
    subcategory: "Text Transformation",
    tags: ["text", "convert", "case", "uppercase", "lowercase"],
    icon: "Type",
    isTrending: true,
  },
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, paragraphs, and reading time with readability scores",
    category: "text",
    subcategory: "Text Transformation",
    tags: ["word", "count", "character", "reading time"],
    icon: "FileText",
  },
  {
    id: "text-diff",
    slug: "text-diff",
    name: "Text Diff Checker",
    description: "Compare two texts and highlight differences with side-by-side or inline view",
    category: "text",
    subcategory: "Text Transformation",
    tags: ["diff", "compare", "difference", "merge"],
    icon: "GitCompare",
  },
  {
    id: "lorem-ipsum",
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text with custom paragraph and word count",
    category: "text",
    subcategory: "Text Transformation",
    tags: ["lorem", "ipsum", "placeholder", "dummy text"],
    icon: "Paragraph",
  },
  
  // Encoding Tools
  {
    id: "base64-encoder",
    slug: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings with support for images and files",
    category: "encoding",
    tags: ["base64", "encode", "decode", "encryption"],
    icon: "Binary",
    isTrending: true,
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode URL strings for safe transmission",
    category: "encoding",
    tags: ["url", "encode", "decode", "percent"],
    icon: "Link",
  },
  {
    id: "html-entity",
    slug: "html-entity",
    name: "HTML Entity Encoder",
    description: "Convert HTML entities for safe display in web pages",
    category: "encoding",
    tags: ["html", "entity", "encode", "escape"],
    icon: "Code2",
  },
  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and validate JSON Web Tokens with signature verification",
    category: "encoding",
    tags: ["jwt", "token", "decode", "auth"],
    icon: "Key",
  },
  {
    id: "qr-code",
    slug: "qr-code",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs with custom colors and sizes",
    category: "encoding",
    tags: ["qr", "code", "generate", "barcode"],
    icon: "QrCode",
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256, SHA512 hashes from text",
    category: "encoding",
    tags: ["hash", "md5", "sha", "checksum"],
    icon: "Hash",
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate v1, v4, and v5 UUIDs with bulk generation support",
    category: "encoding",
    tags: ["uuid", "guid", "generate", "unique"],
    icon: "Fingerprint",
  },
  
  // JSON & Data Tools
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON with syntax highlighting",
    category: "json",
    tags: ["json", "format", "validate", "beautify"],
    icon: "Braces",
    isTrending: true,
  },
  {
    id: "json-to-csv",
    slug: "json-to-csv",
    name: "JSON to CSV",
    description: "Convert JSON data to CSV format with custom delimiters",
    category: "json",
    tags: ["json", "csv", "convert", "export"],
    icon: "FileJson",
  },
  {
    id: "csv-to-json",
    slug: "csv-to-json",
    name: "CSV to JSON",
    description: "Convert CSV data to JSON format with auto type detection",
    category: "json",
    tags: ["csv", "json", "convert", "import"],
    icon: "Table",
  },
  
  // Code Tools
  {
    id: "code-formatter",
    slug: "code-formatter",
    name: "Code Formatter",
    description: "Format HTML, CSS, JavaScript, and JSON code with multiple style guides",
    category: "code",
    tags: ["code", "format", "beautify", "prettier"],
    icon: "Code",
  },
  {
    id: "code-minifier",
    slug: "code-minifier",
    name: "Code Minifier",
    description: "Minify JavaScript, CSS, and HTML to reduce file size",
    category: "code",
    tags: ["minify", "compress", "optimize"],
    icon: "FileCode",
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions with highlighting and explanations",
    category: "code",
    tags: ["regex", "test", "pattern", "match"],
    icon: "Search",
  },
  {
    id: "color-picker",
    slug: "color-picker",
    name: "Color Picker",
    description: "Pick and convert colors between HEX, RGB, HSL, and CMYK",
    category: "code",
    tags: ["color", "picker", "hex", "rgb"],
    icon: "Palette",
  },
  
  // SEO Tools
  {
    id: "meta-tag-generator",
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate HTML meta tags for SEO and social media",
    category: "seo",
    tags: ["meta", "seo", "og", "twitter"],
    icon: "Tags",
  },
  {
    id: "slug-generator",
    slug: "slug-generator",
    name: "URL Slug Generator",
    description: "Generate SEO-friendly URL slugs from titles",
    category: "seo",
    tags: ["slug", "url", "seo", "permalink"],
    icon: "Link2",
  },
];

/**
 * Category information
 */
export const categories: CategoryInfo[] = [
  {
    id: "text",
    name: "Text Tools",
    description: "Transform, analyze, and manipulate text",
    icon: "Type",
    toolCount: toolsMetadata.filter((t) => t.category === "text").length,
  },
  {
    id: "encoding",
    name: "Encoding & Decoding",
    description: "Encode, decode, and hash data",
    icon: "Binary",
    toolCount: toolsMetadata.filter((t) => t.category === "encoding").length,
  },
  {
    id: "json",
    name: "JSON & Data",
    description: "Format, convert, and validate data",
    icon: "Braces",
    toolCount: toolsMetadata.filter((t) => t.category === "json").length,
  },
  {
    id: "code",
    name: "Code & Developer",
    description: "Format, minify, and test code",
    icon: "Code",
    toolCount: toolsMetadata.filter((t) => t.category === "code").length,
  },
  {
    id: "seo",
    name: "SEO & Marketing",
    description: "Optimize content for search engines",
    icon: "TrendingUp",
    toolCount: toolsMetadata.filter((t) => t.category === "seo").length,
  },
  {
    id: "markdown",
    name: "Markdown",
    description: "Edit and convert Markdown",
    icon: "FileText",
    toolCount: 0,
  },
  {
    id: "image",
    name: "Image Tools",
    description: "Process and convert images",
    icon: "Image",
    toolCount: 0,
  },
  {
    id: "pdf",
    name: "PDF Tools",
    description: "Manipulate PDF documents",
    icon: "FileType",
    toolCount: 0,
  },
  {
    id: "math",
    name: "Math & Calculation",
    description: "Calculate and convert units",
    icon: "Calculator",
    toolCount: 0,
  },
  {
    id: "privacy",
    name: "Privacy & Security",
    description: "Generate passwords and secure data",
    icon: "Shield",
    toolCount: 0,
  },
  {
    id: "misc",
    name: "Miscellaneous",
    description: "Other useful utilities",
    icon: "Grid3x3",
    toolCount: 0,
  },
];

/**
 * Get tool by slug
 */
export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return toolsMetadata.find((tool) => tool.slug === slug);
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: ToolCategory): ToolMetadata[] {
  return toolsMetadata.filter((tool) => tool.category === category);
}

/**
 * Get trending tools
 */
export function getTrendingTools(): ToolMetadata[] {
  return toolsMetadata.filter((tool) => tool.isTrending);
}

/**
 * Search tools by query
 */
export function searchTools(query: string): ToolMetadata[] {
  const lowercaseQuery = query.toLowerCase();
  return toolsMetadata.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}

