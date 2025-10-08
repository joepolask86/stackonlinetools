import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/tool-registry";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToolLayout } from "@/components/tools/tool-layout";
import dynamic from "next/dynamic";

// Dynamic imports for tools
const CaseConverter = dynamic(() => import("@/components/tools/case-converter"));
const WordCounter = dynamic(() => import("@/components/tools/word-counter"));
const Base64Tool = dynamic(() => import("@/components/tools/base64-tool"));
const JsonFormatter = dynamic(() => import("@/components/tools/json-formatter"));

const toolComponents: Record<string, React.ComponentType> = {
  "case-converter": CaseConverter,
  "word-counter": WordCounter,
  "base64-encoder": Base64Tool,
  "json-formatter": JsonFormatter,
};

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[slug];

  if (!ToolComponent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <ToolLayout metadata={tool}>
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                This tool is coming soon. Stay tuned!
              </p>
            </div>
          </ToolLayout>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ToolLayout metadata={tool}>
          <ToolComponent />
        </ToolLayout>
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.name} - Stack Online Tools`,
    description: tool.description,
    keywords: tool.tags.join(", "),
  };
}

