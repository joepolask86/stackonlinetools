import { getToolsByCategory, categories } from "@/lib/tool-registry";
import { ToolCategory } from "@/types/tool";
import { commonMetadata } from "@/lib/metadata";
import { CategoryPageClient } from "./category-page-client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import Link from "next/link";

// Map URL slugs to category IDs
const categorySlugMap: Record<string, ToolCategory> = {
  "text-tools": "text",
  "string-list-tools": "string-list",
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

// Generate static params for all category pages
export async function generateStaticParams() {
  return Object.keys(categorySlugMap).map((category) => ({
    category,
  }));
}

// Enable ISR with revalidation every 12 hours (43200 seconds)
// Category pages may change more frequently due to new tools being added
export const revalidate = 43200;

// Generate metadata for category pages
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryId = categorySlugMap[category];
  
  // If invalid category, return 404 metadata BEFORE notFound() is called
  if (!categoryId) {
    return commonMetadata.notFound;
  }

  const categoryInfo = categories.find((cat) => cat.id === categoryId);
  
  // If category not found, return 404 metadata
  if (!categoryInfo) {
    return commonMetadata.notFound;
  }
  
  // Use predefined metadata from commonMetadata
  const metadataKey = category as keyof typeof commonMetadata;
  const metadata = commonMetadata[metadataKey];

  if (metadata) {
    return metadata;
  }

  // Fallback metadata
  return {
    title: `${category} - Stack Online Tools`,
    description: `Browse our collection of ${category} tools. Free online utilities for developers, designers, and content creators.`,
  };
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// 404 Component
function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16 h-[calc(100vh-100px)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or you entered the wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-md px-6 py-6 rounded-full flex items-center gap-2 hover:-translate-y-0">
                <Home className="h-5 w-5" />
                Go To Home
              </Button>
            </Link>
            
            <Link href="/tools">
              <Button variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-6 rounded-full flex items-center text-md gap-2">
                <Search className="h-5 w-5" />
                Browse Tools
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryId = categorySlugMap[category];
  
 // Render 404 directly instead of calling notFound()
  if (!categoryId) {
    return <NotFoundPage />;
  }

  const categoryInfo = categories.find((cat) => cat.id === categoryId);
  const tools = getToolsByCategory(categoryId);

  if (!categoryInfo) {
    return <NotFoundPage />
  }

  return <CategoryPageClient categoryInfo={categoryInfo} tools={tools} />;
}


