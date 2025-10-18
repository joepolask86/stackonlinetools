"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactSection } from "@/components/layout/contact-section";
import { toolsMetadata } from "@/lib/tool-registry";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight, Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { useAuthStore } from "@/lib/store/auth";

export function ToolsPageClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const toolsPerPage = 12;
  
  // Favorites and auth
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuthStore();

  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Box;
  };

  // Filter tools based on search query and implementation status
  const filteredTools = useMemo(() => {
    // First filter to only show implemented tools
    const implementedTools = toolsMetadata.filter(tool => tool.status === "implemented");
    
    if (!searchQuery.trim()) {
      return implementedTools;
    }
    
    const query = searchQuery.toLowerCase();
    return implementedTools.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);
  const startIndex = (currentPage - 1) * toolsPerPage;
  const endIndex = startIndex + toolsPerPage;
  const currentTools = filteredTools.slice(startIndex, endIndex);

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleFavoriteClick = async (e: React.MouseEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
      window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
      return;
    }
    
    await toggleFavorite(toolId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-blue-50/50 to-indigo-100/50 py-16 tool-pattern-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h1 className="text-4xl text-blue-900 font-bold tracking-tight mb-4">
              All Tools
            </h1>
            <p className="text-lg text-neutral-700 max-w-2xl mb-4">
              Discover {filteredTools.length}+ powerful <strong>free online tools</strong> for text processing, data conversion, SEO analysis, image editing, and web development. Our comprehensive collection includes JSON formatters, base64 encoders, word counters, case converters, and more.
            </p>

            <p className="text-lg text-gray-600 max-w-2xl">
              All tools work instantly in your browser with no downloads required. Find the perfect utility for your project with using the search below.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 pt-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            {/* Breadcrumb Navigation */}
              <nav className="flex items-center space-x-2 text-md text-muted-foreground mb-6" aria-label="Breadcrumb">
                <Link href="/" className="flex items-center hover:text-foreground transition-colors">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">All Tools</span>
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
                        "name": "All Tools",
                        "item": "https://stackonlinetools.com/tools"
                      }
                    ]
                  })
                }}
              />

            {/* Search Input */}
            <div className="mb-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  className="pl-10 h-12 md:text-base lg:text-md"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredTools.length)} of {filteredTools.length} tools
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentTools.map((tool) => {
                const ToolIcon = getIcon(tool.icon);
                return (
                  <Link key={tool.id} href={`/tool/${tool.slug}`} className="group">
                    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/10 border-gray-200/50 hover:border-gray-100 hover:-translate-y-1 bg-white p-0">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 mb-3">
                            <ToolIcon className="h-5 w-5" />
                          </div>
                          <button
                            className={`p-1.5 transition-all duration-200 group/favorite ${
                              isFavorite(tool.id)
                                ? "text-red-500"
                                : "text-gray-300 hover:text-red-500"
                            }`}
                            aria-label={isFavorite(tool.id) ? "Remove from favorites" : "Add to favorites"}
                            title={isFavorite(tool.id) ? "Remove from favorites" : "Add to favorites"}
                            onClick={(e) => handleFavoriteClick(e, tool.id)}
                          >
                            <Heart className={`h-5 w-5 ${isFavorite(tool.id) ? "fill-current" : "group-hover/favorite:fill-current"}`} />
                          </button>
                        </div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {tool.description}
                        </CardDescription>
                        <div className="mt-2 pt-2">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                            {tool.category.charAt(0).toUpperCase() + tool.category.slice(1).replace('-', ' ')} Tools
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1 text-base"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current page
                    const shouldShow = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1);
                    
                    if (!shouldShow) {
                      // Show ellipsis for gaps
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 text-muted-foreground">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(page)}
                        className="w-8 h-8 p-0 text-base"
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1 text-base"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
