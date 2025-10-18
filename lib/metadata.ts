import { Metadata } from "next";

interface MetadataConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description,
    url,
    image = "/assets/img/stackonlinetools-og-card.png",
    noIndex = false,
  } = config;

  const baseUrl = "http://localhost:3000";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    authors: [{ name: "Stack Online Tools Team" }],
    creator: "Stack Online Tools",
    publisher: "Stack Online Tools",
    robots: {
      index: !noIndex,
      follow: !noIndex
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: fullUrl,
      siteName: "Stack Online Tools",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 620,
          height: 180,
          alt: `${title} - Stack Online Tools`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@stackonlinetools",
      creator: "@stackonlinetools",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
    icons: {
      icon: [
        { url: "/assets/img/icon-192x192.png", sizes: "192x192", rel: "icon" },
        { url: "/assets/img/icon-180x180.png", sizes: "180x180", rel: "apple-touch-icon" },
      ]
    },
  };
}

// Predefined metadata for common pages
export const commonMetadata = {
  home: generateMetadata({
    title: "Stack Online Tools - 100+ Free Online Utilities",
    description: "All-in-one online toolbox with 100+ free utilities for text manipulation, SEO, coding, image processing, and more. Fast, secure, and privacy-first.",
    url: "/",
  }),
  
  tools: generateMetadata({
    title: "All Free Online Tools - Stack Online Tools",
    description: "Browse our complete collection of 100+ free online tools for text manipulation, encoding, JSON formatting, code tools, and SEO utilities.",
    url: "/tools",
  }),
  
  about: generateMetadata({
    title: "About - Stack Online Tools",
    description: "Learn about Stack Online Tools - your trusted source for free, fast, and secure online utilities. Built for developers, designers, and content creators.",
    url: "/about",
  }),
  
  privacy: generateMetadata({
    title: "Privacy Policy - Stack Online Tools",
    description: "Privacy policy for Stack Online Tools. Learn how we protect your data and respect your privacy while providing free online utilities.",
    url: "/privacy",
  }),
  
  terms: generateMetadata({
    title: "Terms of Service - Stack Online Tools",
    description: "Terms of service for Stack Online Tools. Read our terms and conditions for using our free online utilities and tools.",
    url: "/terms",
  }),

  refunds: generateMetadata({
    title: "Refund Policy - Stack Online Tools",
    description: "Refund policy for Stack Online Tools. Learn about our refund terms and conditions for premium services and API usage.",
    url: "/refunds",
  }),
  
  suggest: generateMetadata({
    title: "Suggest a Tool - Stack Online Tools",
    description: "Submit your tool suggestions to Stack Online Tools. Help us build the ultimate collection of free online utilities for developers, designers.",
    url: "/suggest",
  }),

  login: generateMetadata({
    title: "Sign In - Stack Online Tools",
    description: "Sign in to your account to access your personalized dashboard and save your favorite tools.",
    url: "/login",
    noIndex: true,
  }),

  profile: generateMetadata({
    title: "User Profile - Stack Online Tools",
    description: "Manage your favorite tools, comments, tool requests, and bug reports on Stack Online Tools.",
    url: "/profile",
  }),

  notFound: generateMetadata({
    title: "Page Not Found - Stack Online Tools",
    description: "The page you're looking for doesn't exist. Return to our homepage or browse our collection of 100+ free online tools.",
    url: "/404",
    noIndex: true,
  }),

  // Tool Metadata
  "case-converter": generateMetadata({
    title: "Case Converter Tool - Stack Online Tools",
    description: "Convert text between uppercase, lowercase, title case, sentence case, and more. Free online text case converter tool.",
    url: "/tool/case-converter",
  }),

  "word-counter": generateMetadata({
    title: "Word Counter - Stack Online Tools",
    description: "Count words, characters, sentences, paragraphs, and reading time. Free online word counter with detailed statistics.",
    url: "/tool/word-counter",
  }),

  "base64-encoder": generateMetadata({
    title: "Base64 Encoder/Decoder - Stack Online Tools",
    description: "Encode and decode Base64 strings with support for images and files. Free online Base64 converter tool.",
    url: "/tool/base64-encoder",
  }),

  "json-formatter": generateMetadata({
    title: "JSON Formatter - Stack Online Tools",
    description: "Format, validate, and beautify JSON with syntax highlighting. Free online JSON formatter and validator.",
    url: "/tool/json-formatter",
  }),

  // Category Metadata
  "text-tools": generateMetadata({
    title: "Text Tools - Stack Online Tools",
    description: "Transform, analyze, and manipulate text with our free online text tools. Case converter, word counter, and more.",
    url: "/text-tools",
  }),

  "encoding-tools": generateMetadata({
    title: "Encoding & Decoding Tools - Stack Online Tools",
    description: "Encode, decode, and hash data with our free online encoding tools. Base64, URL, HTML entity encoders and more.",
    url: "/encoding-tools",
  }),

  "json-tools": generateMetadata({
    title: "JSON & Data Tools - Stack Online Tools",
    description: "Format, convert, and validate JSON data with our free online JSON tools. JSON formatter, validator, and converter.",
    url: "/json-tools",
  }),

  "code-tools": generateMetadata({
    title: "Code & Developer Tools - Stack Online Tools",
    description: "Format, minify, and test code with our free online developer tools. Code formatter, minifier, and regex tester.",
    url: "/code-tools",
  }),

  "seo-tools": generateMetadata({
    title: "SEO & Marketing Tools - Stack Online Tools",
    description: "Optimize content for search engines with our free online SEO tools. Meta tag generator, URL slug creator, and more.",
    url: "/seo-tools",
  }),

  "string-list-tools": generateMetadata({
    title: "String & List Utilities - Stack Online Tools",
    description: "Manipulate lists, strings, and data structures with our free online string tools. List randomizer, CSV converter, and more.",
    url: "/string-list-tools",
  }),

  "markdown-tools": generateMetadata({
    title: "Markdown Tools - Stack Online Tools",
    description: "Edit and convert Markdown with our free online Markdown tools. Markdown editor, converter, and preview tool.",
    url: "/markdown-tools",
  }),

  "image-tools": generateMetadata({
    title: "Image Tools - Stack Online Tools",
    description: "Process and convert images with our free online image tools. Resize, crop, compress, and convert image formats.",
    url: "/image-tools",
  }),

  "pdf-tools": generateMetadata({
    title: "PDF Tools - Stack Online Tools",
    description: "Manipulate PDF documents with our free online PDF tools. Merge, split, compress, and convert PDF files.",
    url: "/pdf-tools",
  }),

  "math-tools": generateMetadata({
    title: "Math & Calculation Tools - Stack Online Tools",
    description: "Calculate and convert units with our free online math tools. Calculator, unit converter, and mathematical utilities.",
    url: "/math-tools",
  }),

  "privacy-tools": generateMetadata({
    title: "Privacy & Security Tools - Stack Online Tools",
    description: "Generate passwords and secure data with our free online privacy tools. Password generator, hash creator, and more.",
    url: "/privacy-tools",
  }),

  "misc-tools": generateMetadata({
    title: "Miscellaneous Tools - Stack Online Tools",
    description: "Discover useful utilities with our free online miscellaneous tools. Random generators, converters, and specialized utilities.",
    url: "/misc-tools",
  }),
};
