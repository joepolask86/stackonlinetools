import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toolsMetadata } from "@/lib/tool-registry";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const metadata = {
  title: "All Tools - Stack Online Tools",
  description: "Browse all 100+ free online tools for text, code, SEO, images, and more.",
};

export default function AllToolsPage() {
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Box;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b bg-gradient-to-b from-primary/5 to-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              All Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse our complete collection of {toolsMetadata.length}+ free online tools.
              Use the search below to find exactly what you need.
            </p>
            
            {/* Search Input */}
            <div className="mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {toolsMetadata.map((tool) => {
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

