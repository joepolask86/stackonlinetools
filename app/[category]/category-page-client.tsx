"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactSection } from "@/components/layout/contact-section";
import { ShareModal } from "@/components/ui/share-modal";
import { CategoryInfo, ToolMetadata } from "@/types/tool";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { LucideIcon, ArrowRight, Share2, Heart, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { useAuthStore } from "@/lib/store/auth";
import { useRef } from "react";

interface CategoryPageClientProps {
  categoryInfo: CategoryInfo;
  tools: ToolMetadata[];
}

export function CategoryPageClient({ categoryInfo, tools }: CategoryPageClientProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const collectionHeaderRef = useRef<HTMLHeadingElement>(null);
  
  // Favorites and auth
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuthStore();

  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Box;
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

  const handleExploreClick = () => {
    if (collectionHeaderRef.current) {
      collectionHeaderRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-gradient-to-br from-blue-50/50 to-indigo-100/50 py-16 tool-pattern-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h1 className="text-4xl text-blue-900 font-bold tracking-tight mb-4">
              Online {categoryInfo.name} For Free
            </h1>
             {categoryInfo.longDescription.split("\n").map((para: string, i: number) => (
                 para.trim() && (
                   <p key={i} className="text-lg text-gray-600 max-w-2xl mb-3">
                     {para}
                   </p>
                 )
               ))}
            <Button 
              onClick={handleExploreClick}
              className="hidden md:flex px-6 py-6 mt-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:text-white text-md font-medium hover:-translate-y-0">  
                Explore {categoryInfo.name}
                <ArrowRight className="ml-0 h-5 w-5" />
            </Button>
          </div>
        </section>

         {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center space-x-2 text-md text-muted-foreground py-6" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center hover:text-foreground transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{categoryInfo.name}</span>
          </nav>
      </div>

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
                "name": categoryInfo.name,
                "item": `https://stackonlinetools.com/${categoryInfo.id}-tools`
              }
            ]
          })
        }}
      />

        {/* Tools Header */}
        <section ref={collectionHeaderRef} className="py-8 pt-4">

          {/* Breadcrumb Navigation */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl text-blue-900">
                {categoryInfo.name} Collection
              </h2>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center text-md text-gray-600 rounded-full gap-2 border-gray-300 hover:border-gray-300 hover:bg-gray-50 shadow-none"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="p-0 pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {tools.filter(tool => tool.status === "implemented").length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No tools available in this category yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.filter(tool => tool.status === "implemented").map((tool) => {
                  const ToolIcon = getIcon(tool.icon);
                  return (
                    <Link key={tool.id} href={`/tool/${tool.slug}`} className="group">
                      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/10 border-gray-200/50 hover:border-gray-100 hover:-translate-y-1 bg-white">
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
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
      
      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`${categoryInfo.name} Collection - Stack Online Tools`}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        description={`Check out these free ${categoryInfo.name.toLowerCase()} tools!`}
        categoryName={categoryInfo.name}
      />
    </div>
  );
}
