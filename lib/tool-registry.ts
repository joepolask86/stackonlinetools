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
    icon: "Type",
    status: "implemented",
    isTrending: true,
    contentHtml: `
      <h2>What is Online Case Converter?</h2>
      
      <p>
        The Online Case Converter is a <strong>free online tool for converting text to different cases</strong>. 
        It helps you transform text from one case format to another, making it perfect for fixing wrongly 
        formatted text or converting text for specific purposes. This tool is particularly useful for writers, 
        editors, and content creators who need to format text consistently across different platforms and applications.
      </p>
      
      <p>
        The tool supports multiple languages including English, German, French, Spanish, Italian, Dutch, 
        Portuguese, Russian, Turkish, Arabic, Chinese, Japanese, Korean, and many more, making it a 
        versatile solution for international text formatting needs.
      </p>
      
      <h2>How to use Online Case Converter?</h2>
      
      <p>You can convert your text into any case by following these simple steps. Our case converter tool is designed to be intuitive and user-friendly, allowing you to transform text quickly and efficiently.</p>
      
      <ol>
        <li>First, paste your text in the text area you want to convert. You can type directly or paste from any source.</li>
        <li>Select the case from the list you want to convert. The tool converts the text immediately after you select the case. If you modify your text and want to apply the same format again, just use the "Apply" button.</li>
        <li>You can use the "Copy" button to copy the converted text into your clipboard. In addition, you can download the output as a .txt file by using the "Download" button.</li>
      </ol>
      
      <h3>Available Case Types:</h3>
      
      <ul>
        <li><strong>Sentence Case:</strong> First letter of all sentences will be uppercase while remaining will be lowercase. Sentences will be identified with punctuations which ends a sentence such as dot, question mark or exclamation mark.</li>
        <li><strong>Title Case:</strong> First letters of each word are uppercase while remaining will be lowercase.</li>
        <li><strong>Uppercase:</strong> All letters in the text will be uppercase.</li>
        <li><strong>Lowercase:</strong> All letters in the text will be lowercase.</li>
        <li><strong>Mixed Case:</strong> It is a sequence of one letter uppercase, one letter lowercase for each word.</li>
        <li><strong>Inverse Case:</strong> It is a sequence of one letter lowercase, one letter uppercase for each word.</li>
      </ul>
    `
  },
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, paragraphs, and reading time with readability scores",
    category: "text",
    subcategory: "Text Transformation",
    icon: "FileText",
    status: "implemented",
    contentHtml: `
      <h2>What is Online Word Counter?</h2>
      
      <p>
        The Online Word Counter is a <strong>free tool for analyzing text content</strong>. 
        It provides comprehensive statistics about your text including word count, character count, 
        sentence count, paragraph count, and reading time estimates.
      </p>
      
      <p>
        This tool is perfect for writers, students, content creators, and professionals who need 
        to track their writing progress, meet word count requirements, or analyze text statistics 
        for various purposes.
      </p>
      
      <h2>How to use Online Word Counter?</h2>
      
      <p>Simply paste or type your text to get instant statistics about your content.</p>
      
      <ul>
        <li>Paste your text in the input area or start typing</li>
        <li>View real-time statistics including word count, character count, and reading time</li>
        <li>Get insights into your text structure with sentence and paragraph counts</li>
        <li>Use the statistics for writing goals, SEO optimization, or content analysis</li>
      </ul>
      
      <h3>What statistics are provided?</h3>
      
      <ul>
        <li><strong>Character Count:</strong> Total number of characters including spaces</li>
        <li><strong>Character Count (no spaces):</strong> Total characters excluding spaces</li>
        <li><strong>Word Count:</strong> Number of words in your text</li>
        <li><strong>Sentence Count:</strong> Number of sentences</li>
        <li><strong>Paragraph Count:</strong> Number of paragraphs</li>
        <li><strong>Reading Time:</strong> Estimated time to read the text</li>
        <li><strong>Speaking Time:</strong> Estimated time to speak the text</li>
      </ul>
    `
  },
  {
    id: "text-diff",
    slug: "text-diff",
    name: "Text Diff Checker",
    description: "Compare two texts and highlight differences with side-by-side or inline view",
    category: "text",
    subcategory: "Text Transformation",
    icon: "GitCompare",
    status: "planned",
  },
  {
    id: "lorem-ipsum",
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text with custom paragraph and word count",
    category: "text",
    subcategory: "Text Transformation",
    icon: "Paragraph",
    status: "planned",
  },
  
  // String & List Utilities
  {
    id: "list-randomizer",
    slug: "list-randomizer",
    name: "List Randomizer",
    description: "Shuffle list items randomly with weighted randomization and multiple shuffle algorithms",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Shuffle",
    status: "planned",
  },
  {
    id: "list-to-csv",
    slug: "list-to-csv",
    name: "List to Comma Separated",
    description: "Convert list to CSV format with custom delimiters and quote wrapping",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "List",
    status: "planned",
  },
  {
    id: "csv-to-list",
    slug: "csv-to-list",
    name: "Comma to List",
    description: "Convert CSV to list format with auto-detect delimiter and quoted field handling",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "ListOrdered",
    status: "planned",
  },
  {
    id: "number-list-generator",
    slug: "number-list-generator",
    name: "Number List Generator",
    description: "Generate sequential or random numbers with arithmetic/geometric sequences",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Hash",
    status: "planned",
  },
  {
    id: "split-text",
    slug: "split-text",
    name: "Split Text",
    description: "Split text by delimiter or character count with regex splitting and equal chunks",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Scissors",
    status: "planned",
  },
  {
    id: "merge-lists",
    slug: "merge-lists",
    name: "Merge Lists",
    description: "Combine multiple lists with union, intersection, and difference operations",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Merge",
    status: "planned",
  },
  {
    id: "list-item-counter",
    slug: "list-item-counter",
    name: "List Item Counter",
    description: "Count unique items in a list with frequency analysis and visualization",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "ListPlus",
    status: "planned",
  },
  {
    id: "prefix-suffix-tool",
    slug: "prefix-suffix-tool",
    name: "Prefix/Suffix Tool",
    description: "Add text before or after each line with number sequences and conditional prefixes",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Plus",
    status: "planned",
  },
  
  // Encoding Tools
  {
    id: "base64-encoder",
    slug: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings with support for images and files",
    category: "encoding",
    icon: "Binary",
    status: "implemented",
    isTrending: true,
    contentHtml: `
      <h2>What is Base64 Encoder/Decoder?</h2>
      
      <p>
        The Base64 Encoder/Decoder is a <strong>free online tool for encoding and decoding data</strong>. 
        Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
      </p>
      
      <p>
        Base64 encoding is commonly used in web development, email systems, and data transmission 
        where binary data needs to be stored or transferred over text-based protocols. It's widely 
        used for embedding images in HTML/CSS, storing binary data in JSON, and many other applications.
      </p>
      
      <h2>How to use Base64 Encoder/Decoder?</h2>
      
      <p>Convert your data to Base64 format or decode Base64 strings with ease.</p>
      
      <ul>
        <li>Enter your text or data in the input field</li>
        <li>Click "Encode" to convert to Base64 format</li>
        <li>Click "Decode" to convert Base64 back to original text</li>
        <li>Copy the result or download as a file</li>
      </ul>
      
      <h3>Common Use Cases:</h3>
      
      <ul>
        <li><strong>Web Development:</strong> Embed images in HTML/CSS using data URIs</li>
        <li><strong>API Integration:</strong> Encode binary data for JSON transmission</li>
        <li><strong>Email Attachments:</strong> Encode files for email transmission</li>
        <li><strong>Data Storage:</strong> Store binary data in text-based databases</li>
        <li><strong>Configuration Files:</strong> Include binary data in config files</li>
      </ul>
    `
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode URL strings for safe transmission",
    category: "encoding",
    icon: "Link",
    status: "planned",
  },
  {
    id: "html-entity",
    slug: "html-entity",
    name: "HTML Entity Encoder",
    description: "Convert HTML entities for safe display in web pages",
    category: "encoding",
    icon: "Code2",
    status: "planned",
  },
  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and validate JSON Web Tokens with signature verification",
    category: "encoding",
    icon: "Key",
    status: "planned",
  },
  {
    id: "qr-code",
    slug: "qr-code",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs with custom colors and sizes",
    category: "encoding",
    icon: "QrCode",
    status: "planned",
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256, SHA512 hashes from text",
    category: "encoding",
    icon: "Hash",
    status: "planned",
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate v1, v4, and v5 UUIDs with bulk generation support",
    category: "encoding",
    icon: "Fingerprint",
    status: "planned",
  },
  
  // JSON & Data Tools
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON with syntax highlighting",
    category: "json",
    icon: "Braces",
    status: "implemented",
    isTrending: true,
    contentHtml: `
      <h2>What is JSON Formatter?</h2>
      
      <p>
        The JSON Formatter is a <strong>free online tool for formatting, validating, and beautifying JSON data</strong>. 
        It helps you organize and validate JSON strings, making them more readable and ensuring they follow 
        proper JSON syntax standards.
      </p>
      
      <p>
        This tool is essential for developers, data analysts, and anyone working with JSON data. It provides 
        syntax highlighting, error detection, and various formatting options to make your JSON data clean 
        and professional.
      </p>
      
      <h2>How to use JSON Formatter?</h2>
      
      <p>Format and validate your JSON data with our easy-to-use interface.</p>
      
      <ul>
        <li>Paste your JSON data into the input field</li>
        <li>Click "Format" to beautify and validate your JSON</li>
        <li>View formatted output with syntax highlighting</li>
        <li>Copy the formatted JSON or download as a file</li>
        <li>Check for syntax errors and validation issues</li>
      </ul>
      
      <h3>Features:</h3>
      
      <ul>
        <li><strong>JSON Validation:</strong> Check for syntax errors and invalid JSON</li>
        <li><strong>Pretty Print:</strong> Format JSON with proper indentation and line breaks</li>
        <li><strong>Syntax Highlighting:</strong> Color-coded JSON for better readability</li>
        <li><strong>Minify JSON:</strong> Remove unnecessary whitespace to reduce file size</li>
        <li><strong>Error Detection:</strong> Identify and highlight JSON syntax errors</li>
        <li><strong>Copy & Download:</strong> Easy export options for formatted JSON</li>
      </ul>
    `
  },
  {
    id: "json-to-csv",
    slug: "json-to-csv",
    name: "JSON to CSV",
    description: "Convert JSON data to CSV format with custom delimiters",
    category: "json",
    icon: "FileJson",
    status: "planned",
  },
  {
    id: "csv-to-json",
    slug: "csv-to-json",
    name: "CSV to JSON",
    description: "Convert CSV data to JSON format with auto type detection",
    category: "json",
    icon: "Table",
    status: "planned",
  },
  
  // Code Tools
  {
    id: "code-formatter",
    slug: "code-formatter",
    name: "Code Formatter",
    description: "Format HTML, CSS, JavaScript, and JSON code with multiple style guides",
    category: "code",
    icon: "Code",
    status: "planned",
  },
  {
    id: "code-minifier",
    slug: "code-minifier",
    name: "Code Minifier",
    description: "Minify JavaScript, CSS, and HTML to reduce file size",
    category: "code",
    icon: "FileCode",
    status: "planned",
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions with highlighting and explanations",
    category: "code",
    icon: "Search",
    status: "planned",
  },
  {
    id: "color-picker",
    slug: "color-picker",
    name: "Color Picker",
    description: "Pick and convert colors between HEX, RGB, HSL, and CMYK",
    category: "code",
    icon: "Palette",
    status: "planned",
  },
  
  // SEO Tools
  {
    id: "meta-tag-generator",
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate HTML meta tags for SEO and social media",
    category: "seo",
    icon: "Tags",
    status: "planned",
  },
  {
    id: "slug-generator",
    slug: "slug-generator",
    name: "URL Slug Generator",
    description: "Generate SEO-friendly URL slugs from titles",
    category: "seo",
    icon: "Link2",
    status: "planned",
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
    longDescription: "Looking for powerful online text tools? Look no further than Stack Online Tools! Our comprehensive text tools collection is the best on the web and they're all completely free.\n\nWhether you're looking for case conversion, word counting, text formatting, or advanced text manipulation, we've got you covered. Transform your text with our case converter, analyze content with our word counter, and enhance your writing workflow with our professional-grade text utilities. All tools work instantly in your browser with no downloads required.",
    icon: "Type",
    toolCount: toolsMetadata.filter((t) => t.category === "text" && t.status === "implemented").length,
  },
  {
    id: "string-list",
    name: "String & List Utilities",
    description: "Manipulate lists, strings, and data structures",
    longDescription: "Need to work with lists and strings efficiently? Our string and list utilities are the perfect solution for developers, data analysts, and content creators. From randomizing lists and converting between formats to splitting text and merging data structures, our tools handle all your string manipulation needs.\n\nGenerate number sequences, count list items, add prefixes and suffixes, or convert between CSV and list formats with ease. All our string tools are free, fast, and work directly in your browser without any installation required.",
    icon: "List",
    toolCount: toolsMetadata.filter((t) => t.category === "string-list" && t.status === "implemented").length,
  },
  {
    id: "encoding",
    name: "Encoding & Decoding",
    description: "Encode, decode, and hash data",
    longDescription: "Secure your data with our professional encoding and decoding tools! Whether you need Base64 encoding for file transfers, URL encoding for web development, or hash generation for security purposes, our encoding tools have you covered.\n\nGenerate QR codes, decode JWT tokens, create UUIDs, and hash your data with MD5, SHA1, SHA256, and SHA512 algorithms. Our encoding utilities are trusted by developers worldwide and work seamlessly in your browser. All tools are free and require no registration or downloads.",
    icon: "Binary",
    toolCount: toolsMetadata.filter((t) => t.category === "encoding" && t.status === "implemented").length,
  },
  {
    id: "json",
    name: "JSON & Data",
    description: "Format, convert, and validate data",
    longDescription: "Working with JSON and data formats? Our JSON tools make data manipulation effortless! Format and validate JSON with syntax highlighting, convert between JSON and CSV formats, and handle complex data transformations with ease.\n\nWhether you're a developer working with APIs, a data analyst processing information, or a content creator managing structured data, our JSON utilities provide professional-grade functionality. All tools are free, work instantly in your browser, and support large datasets without compromising performance.",
    icon: "Braces",
    toolCount: toolsMetadata.filter((t) => t.category === "json" && t.status === "implemented").length,
  },
  {
    id: "code",
    name: "Code & Developer",
    description: "Format, minify, and test code",
    longDescription: "Boost your development productivity with our comprehensive code tools! Format HTML, CSS, JavaScript, and other programming languages with multiple style guides. Minify your code to reduce file sizes and improve performance.\n\nTest regular expressions with real-time highlighting and explanations. Pick and convert colors between HEX, RGB, HSL, and CMYK formats. Our developer tools are designed by programmers for programmers, offering professional-grade functionality that integrates seamlessly into your workflow. All tools are free and work directly in your browser.",
    icon: "Code",
    toolCount: toolsMetadata.filter((t) => t.category === "code" && t.status === "implemented").length,
  },
  {
    id: "seo",
    name: "SEO & Marketing",
    description: "Optimize content for search engines",
    longDescription: "Optimize your website's search engine performance with our powerful SEO tools! Generate comprehensive meta tags for better social media sharing and search engine visibility. Create SEO-friendly URL slugs that improve your site's ranking potential.\n\nOur SEO utilities help you optimize titles, descriptions, and keywords for maximum search engine impact. Whether you're a blogger, marketer, or business owner, our tools provide the insights you need to boost your online presence. All SEO tools are free, easy to use, and work instantly in your browser.",
    icon: "TrendingUp",
    toolCount: toolsMetadata.filter((t) => t.category === "seo" && t.status === "implemented").length,
  },
  {
    id: "markdown",
    name: "Markdown",
    description: "Edit and convert Markdown",
    longDescription: "Create beautiful documents with our Markdown editing and conversion tools! Whether you're writing documentation, blog posts, or technical content, our Markdown utilities make formatting effortless. Convert Markdown to HTML, preview your content in real-time, and export to various formats.\n\nOur tools support all Markdown features including tables, code blocks, links, and custom styling. Perfect for developers, writers, and content creators who need reliable Markdown processing. All tools are free and work seamlessly in your browser without any setup required.",
    icon: "FileText",
    toolCount: 0,
  },
  {
    id: "image",
    name: "Image Tools",
    description: "Process and convert images",
    longDescription: "Transform your images with our comprehensive image processing tools! Resize, crop, compress, and convert images between different formats including JPEG, PNG, WebP, and more. Generate thumbnails, add watermarks, and optimize images for web performance.\n\nOur image tools support batch processing, maintain quality while reducing file sizes, and work with high-resolution photos.Whether you're a web developer optimizing assets, a designer processing graphics, or a content creator managing media files, our tools provide professional-grade functionality. All image processing is done securely in your browser.",
    icon: "Image",
    toolCount: 0,
  },
  {
    id: "pdf",
    name: "PDF Tools",
    description: "Manipulate PDF documents",
    longDescription: "Handle PDF documents efficiently with our powerful PDF manipulation tools! Merge multiple PDFs into one document, split large PDFs into smaller files, and extract specific pages. Convert PDFs to images, compress PDF files to reduce size, and add watermarks or annotations.\n\nOur PDF tools support password-protected files, maintain document quality, and work with files of any size. Perfect for businesses, students, and professionals who regularly work with PDF documents. All tools are free, secure, and process files directly in your browser without uploading to servers.",
    icon: "FileType",
    toolCount: 0,
  },
  {
    id: "math",
    name: "Math & Calculation",
    description: "Calculate and convert units",
    longDescription: "Solve mathematical problems and convert units with our comprehensive math tools! Perform complex calculations, convert between different unit systems, and solve equations with step-by-step solutions. Our math utilities support basic arithmetic, algebra, geometry, and advanced mathematical functions.\n\nConvert currencies, measurements, temperatures, and more with real-time exchange rates and accurate conversion factors. Whether you're a student, engineer, scientist, or professional, our math tools provide reliable calculations and conversions. All tools are free and work instantly in your browser.",
    icon: "Calculator",
    toolCount: 0,
  },
  {
    id: "privacy",
    name: "Privacy & Security",
    description: "Generate passwords and secure data",
    longDescription: "Protect your digital life with our advanced privacy and security tools! Generate strong, secure passwords with customizable length and character sets. Create secure random numbers, encrypt sensitive data, and generate secure tokens for authentication.\n\nOur privacy tools help you maintain online security with features like password strength analysis, secure data wiping, and privacy-focused utilities. Whether you're securing personal accounts, protecting business data, or maintaining online privacy, our tools provide enterprise-grade security features. All tools are free and process data locally in your browser.",
    icon: "Shield",
    toolCount: 0,
  },
  {
    id: "misc",
    name: "Miscellaneous",
    description: "Other useful utilities",
    longDescription: "Discover a collection of unique and useful utilities that don't fit into other categories! From time zone converters and QR code generators to barcode creators and random generators, our miscellaneous tools cover a wide range of everyday needs.\n\nGenerate random data for testing, convert between different formats, and access specialized utilities for specific tasks. Our miscellaneous collection is constantly growing with new tools based on user feedback and emerging needs. All utilities are free, easy to use, and work directly in your browser without any installation or registration required.",
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
 * Get implemented tools by category
 */
export function getImplementedToolsByCategory(category: ToolCategory): ToolMetadata[] {
  return toolsMetadata.filter((tool) => tool.category === category && tool.status === "implemented");
}

/**
 * Get trending tools
 */
export function getTrendingTools(): ToolMetadata[] {
  return toolsMetadata.filter((tool) => tool.isTrending && tool.status === "implemented");
}

/**
 * Search tools by query
 */
export function searchTools(query: string): ToolMetadata[] {
  const lowercaseQuery = query.toLowerCase();
  return toolsMetadata.filter(
    (tool) =>
      tool.status === "implemented" &&
      (tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery))
  );
}

