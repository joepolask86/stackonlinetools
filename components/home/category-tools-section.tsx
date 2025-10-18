"use client";

import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolMetadata } from "@/types/tool";
import * as Icons from "lucide-react";
import { LucideIcon, ArrowRight, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useAuthStore } from "@/lib/store/auth";

interface CategoryToolsSectionProps {
  title: string;
  description: string;
  icon: string;
  tools: ToolMetadata[];
  categorySlug: string;
}

export function CategoryToolsSection({
  title,
  description,
  icon,
  tools,
  categorySlug,
}: CategoryToolsSectionProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuthStore();
  
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Box;
  };

  const Icon = getIcon(icon);
  const displayTools = tools.slice(0, 6);

  return (
    <section className="py-12 odd:bg-white even:bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Link href={`/${categorySlug}`}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayTools.map((tool) => {
            const ToolIcon = getIcon(tool.icon);
            return (
              <Link key={tool.id} href={`/tool/${tool.slug}`} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/10 border-gray-200 hover:border-gray-100 hover:-translate-y-1 bg-white">
                  <CardHeader className="pb-3">
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
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          
                          if (!isAuthenticated) {
                            const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
                            window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
                            return;
                          }
                          
                          await toggleFavorite(tool.id);
                        }}
                      >
                        <Heart className={`h-5 w-5 ${isFavorite(tool.id) ? "fill-current" : "group-hover/favorite:fill-current"}`} />
                      </button>
                    </div>
                    <CardTitle className="text-base mt-3 group-hover:text-blue-600 transition-colors">{tool.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm text-gray-600">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 flex justify-center md:hidden">
          <Button asChild variant="outline">
            <Link href={`/${categorySlug}`}>
              View All {title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

