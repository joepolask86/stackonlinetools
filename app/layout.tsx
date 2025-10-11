import type { Metadata } from "next";
import { Inter, Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { commonMetadata } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = commonMetadata.home;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Stack Online Tools",
    "description": "100+ FREE online utilities for text manipulation, SEO, coding, image processing, and more. Fast, secure, and privacy-first.",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Stack Online Tools Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Stack Online Tools"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}