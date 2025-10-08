import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getToolsByCategory, categories } from "@/lib/tool-registry";
import { ToolCategory } from "@/types/tool";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

// Map URL slugs to category IDs
const categorySlugMap: Record<string, ToolCategory> = {
  "text-tools": "text",
  "encoding-tools": "encoding",
  "json-tools": "json",
  "code-tools": "code",
  "markdown-tools": "markdown",
  "seo-tools": "seo",
  "image-tools": "image",
  "pdf-tools": "pdf",
  "math-tools": "math",
  "privacy-tools": "privacy",
  "misc-tools": "misc",
};

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryId = categorySlugMap[categorySlug];

  if (!categoryId) {
    notFound();
  }

  const categoryInfo = categories.find((cat) => cat.id === categoryId);
  const tools = getToolsByCategory(categoryId);

  if (!categoryInfo) {
    notFound();
  }

  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Box;
  };

  const CategoryIcon = getIcon(categoryInfo.icon);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Category Header */}
        <section className="border-b bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CategoryIcon className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {categoryInfo.name}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {categoryInfo.description}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {tools.length} {tools.length === 1 ? "tool" : "tools"} available
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {tools.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No tools available in this category yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.map((tool) => {
                  const ToolIcon = getIcon(tool.icon);
                  return (
                    <Link key={tool.id} href={`/tool/${tool.slug}`} className="group">
                      <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                        <CardHeader>
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white mb-3">
                            <ToolIcon className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {tool.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1">
                            {tool.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryId = categorySlugMap[categorySlug];
  const categoryInfo = categories.find((cat) => cat.id === categoryId);

  if (!categoryInfo) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${categoryInfo.name} - Stack Online Tools`,
    description: categoryInfo.description,
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  return Object.keys(categorySlugMap).map((slug) => ({
    category: slug,
  }));
}

