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
    image = "/assets/img/logo-620x180.png",
    noIndex = false,
  } = config;

  const baseUrl = "https://stackonlinetools.com";
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
        { url: "/assets/img/favicon.ico", rel: "icon" },
        { url: "/assets/img/icon-192x192.png", sizes: "192x192", rel: "icon" },
        { url: "/assets/img/icon-180x180.png", sizes: "180x180", rel: "apple-touch-icon" },
      ],
      apple: [
        { url: "/assets/img/icon-180x180.png", sizes: "180x180", rel: "apple-touch-icon" },
      ],
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
    title: "All Tools - Stack Online Tools",
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
  
  suggest: generateMetadata({
    title: "Suggest a Tool - Stack Online Tools",
    description: "Submit your tool suggestions to Stack Online Tools. Help us build the ultimate collection of free online utilities for developers, designers, and content creators.",
    url: "/suggest",
  }),
};
