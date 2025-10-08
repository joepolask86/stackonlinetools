import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTrendingTools, toolsMetadata } from "@/lib/tool-registry";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { ArrowRight, Star } from "lucide-react";

export function FeaturedTools() {
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Box;
  };

  const trendingTools = getTrendingTools();
  const featuredTools = toolsMetadata.slice(0, 8);

  return (
    <section className="border-t bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Trending Tools */}
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight">
                🔥 Trending Tools
              </h2>
              <p className="text-muted-foreground">
                Most popular tools used by our community
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingTools.map((tool) => {
              const Icon = getIcon(tool.icon);
              return (
                <Link key={tool.id} href={`/tool/${tool.slug}`} className="group">
                  <Card className="h-full transition-all hover:scale-[1.02] hover:border-primary hover:shadow-md">
                    <CardHeader>
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
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
        </div>

        {/* Featured Tools */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight">
                Featured Tools
              </h2>
              <p className="text-muted-foreground">
                Essential tools for your everyday tasks
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/tools">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => {
              const Icon = getIcon(tool.icon);
              return (
                <Link key={tool.id} href={`/tool/${tool.slug}`} className="group">
                  <Card className="h-full transition-all hover:scale-[1.02] hover:border-primary hover:shadow-md">
                    <CardHeader>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

