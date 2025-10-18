import { getToolBySlug } from "@/lib/tool-registry";
import { ToolDocsLayout } from "@/components/tools/tool-docs-layout";
import { commonMetadata } from "@/lib/metadata";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import Link from "next/link";

// Dynamic imports for tools
const toolComponents: Record<string, React.ComponentType> = {
  "case-converter": dynamic(() => import("@/components/tools/case-converter")),
  "word-counter": dynamic(() => import("@/components/tools/word-counter")),
  "base64-encoder": dynamic(() => import("@/components/tools/base64-tool")),
  "json-formatter": dynamic(() => import("@/components/tools/json-formatter")),
};

interface ToolPageProps {
  params: Promise<{
    slug: string;
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
            Tool Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            Sorry, we couldn&apos;t find the tool you&apos;re looking for. The tool might have been moved, renamed, or doesn&apos;t exist.
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

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

   // Render 404 directly instead of calling notFound()
   if (!tool) {
    return <NotFoundPage />;
  }

  const ToolComponent = toolComponents[slug];

  if (!ToolComponent) {
    return (
      <ToolDocsLayout metadata={tool}>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            This tool is coming soon. Stay tuned!
          </p>
        </div>
      </ToolDocsLayout>
    );
  }

  return (
    <ToolDocsLayout metadata={tool}>
      <ToolComponent />
    </ToolDocsLayout>
  );
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return commonMetadata.notFound;
  }

  // Use predefined metadata from commonMetadata
  const metadataKey = slug as keyof typeof commonMetadata;
  const metadata = commonMetadata[metadataKey];

  if (metadata) {
    return metadata;
  }

  // Fallback to dynamic metadata if not found in predefined
  return {
    title: `${tool.name} - Stack Online Tools`,
    description: tool.description,
    keywords: `${tool.name}, ${tool.category}, online tool`,
  };
}

