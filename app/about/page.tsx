import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactSection } from "@/components/layout/contact-section";
import { commonMetadata } from "@/lib/metadata";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export const metadata = commonMetadata.about;

// Force static generation for maximum performance
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50/50 to-indigo-100/50 dark:from-slate-900 dark:to-slate-800 py-16 md:py-20 tool-pattern-bg">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6">
                About Stack Online Tools
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Your trusted source for free, fast, and secure online utilities. 
                Built for developers, designers, and content creators worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20 pt-0 md:pt-0">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Breadcrumb Navigation */}
              <nav className="flex items-center space-x-2 text-md text-muted-foreground pt-6 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="flex items-center hover:text-foreground transition-colors">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">About</span>
              </nav>

              {/* Structured Data for Breadcrumbs */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://stackonlinetools.com"
                      },
                      {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "About",
                        "item": "https://stackonlinetools.com/about"
                      }
                    ]
                  })
                }}
              />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  We believe that powerful tools should be accessible to everyone, 
                  regardless of budget or technical expertise. Stack Online Tools 
                  democratizes access to essential utilities that professionals 
                  use daily.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Our platform consolidates over 100 carefully curated tools 
                  into one fast, secure, and privacy-first experience. Most tools 
                  are completely free, with some premium tools requiring third-party 
                  APIs for advanced functionality.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <div className="text-lg opacity-90">Free Tools</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="text-4xl font-bold mb-2">&lt;1s</div>
                  <div className="text-lg opacity-90">Load Time</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-lg opacity-90">Privacy First</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20 bg-gray-100 dark:bg-slate-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                These principles guide everything we build and every decision we make.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 border-none text-center shadow-lg\40 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Speed & Performance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every tool is optimized for lightning-fast performance with 
                  sub-1-second load times and real-time processing.
                </p>
              </Card>

              <Card className="p-8 border-none text-center shadow-lg\40 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Privacy & Transparency
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                We securely collect minimal data on sign-in; most processing happens client-side to protect your privacy.
                </p>
              </Card>

              <Card className="p-8 border-none text-center shadow-lg\40 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Mostly Free
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Most tools are completely free forever. Premium tools with 
                  third-party API integration may have usage limits or costs in the future.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Tool Categories Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Comprehensive Tool Categories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                From basic utilities to advanced tools, we cover all your digital needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Text & String Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Case converters, word counters, text formatters, and string manipulation utilities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Code & Developer Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  JSON formatters, code minifiers, syntax validators, and developer utilities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Encoding & Security
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Base64 encoders, hash generators, password tools, and security utilities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  SEO & Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Meta tag generators, keyword analyzers, and SEO optimization tools.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Image & Media Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Image compressors, format converters, and media processing utilities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Premium Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced tools powered by third-party APIs for enhanced functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-20 bg-gray-100 dark:bg-slate-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Meet the Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A passionate group of developers and designers working to make 
                online tools accessible to everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-none text-center shadow-lg\40 hover:shadow-md text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">JT</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Joseph Twumasi
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  Product Owner & Founder
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Visionary leader focused on creating tools that empower 
                  developers and content creators worldwide.
                </p>
              </Card>

              <Card className="p-8 border-none text-center shadow-lg\40 hover:shadow-md text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">SOT</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Stack Online Tools Team
                </h3>
                <p className="text-green-600 dark:text-green-400 font-medium mb-4">
                  Development Team
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Dedicated developers and designers working tirelessly to 
                  build and maintain our growing collection of tools.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
