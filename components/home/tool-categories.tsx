"use client";

import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/tool-registry";
import * as Icons from "lucide-react";
import { LucideIcon, ArrowRight } from "lucide-react";

// Map category IDs to section IDs
const categorySectionMap: Record<string, string> = {
  text: "category-tools-section",
  encoding: "encoding-tools-section",
  json: "json-tools-section",
  code: "code-tools-section",
  seo: "seo-tools-section",
  markdown: "markdown-tools-section",
  image: "image-tools-section",
  pdf: "pdf-tools-section",
  math: "math-tools-section",
  privacy: "privacy-tools-section",
  misc: "misc-tools-section",
};

export function ToolCategories() {
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Grid3x3;
  };

  const scrollToCategory = (categoryId: string) => {
    const sectionId = categorySectionMap[categoryId];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
            Browse by Category
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore our comprehensive collection of online tools organized by
            category for easy access.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = getIcon(category.icon);
            
            return (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="group w-full text-left"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/10 border-gray-200 hover:border-gray-100 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50/50">
                  <CardContent className="flex flex-col items-start gap-4 p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-7 w-7" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="mb-2 font-semibold text-lg group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between w-full">
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold text-blue-600">
                          {category.toolCount}
                        </span>
                        <span className="ml-1">
                          {category.toolCount === 1 ? "tool" : "tools"}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
