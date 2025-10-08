import type { Metadata } from "next";
import { Inter, Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  title: "Stack Online Tools - 100+ Free Online Utilities",
  description: "All-in-one online toolbox with 100+ free utilities for text manipulation, SEO, coding, image processing, and more. Fast, secure, and privacy-first.",
  keywords: "online tools, text converter, base64, json formatter, image tools, seo tools, developer tools",
  authors: [{ name: "Joseph Twumasi" }],
  icons: {
    icon: [
      { url: "/assets/img/favicon.ico" },
      { url: "/assets/img/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/assets/img/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Stack Online Tools - 100+ Free Online Utilities",
    description: "Swiss Army knife for digital professionals. 100+ tools across 10+ categories.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
