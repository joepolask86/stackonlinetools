import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { FeaturedIn } from "@/components/home/featured-in";
import { CategoryToolsSection } from "@/components/home/category-tools-section";
import { ToolCategories } from "@/components/home/tool-categories";
import { FAQSection } from "@/components/home/faq-section";
import { SuggestToolSection } from "@/components/home/suggest-tool-section";
import { Footer } from "@/components/layout/footer";
import { getToolsByCategory } from "@/lib/tool-registry";
import { commonMetadata } from "@/lib/metadata";

export const metadata = commonMetadata.home;

// Force static generation for maximum performance
export const dynamic = 'force-static';

export default function HomePage() {
  const textTools = getToolsByCategory("text");
  const encodingTools = getToolsByCategory("encoding");
  const jsonTools = getToolsByCategory("json");
  const codeTools = getToolsByCategory("code");
  const seoTools = getToolsByCategory("seo");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedIn />

        {/* Browse by Category Section */}
        <div id="tool-categories-section">
          <ToolCategories />
        </div>
        
        {/* Text Tools Section */}
        {textTools.length > 0 && (
          <div id="category-tools-section">
            <CategoryToolsSection
              title="Text Tools"
              description="Transform, analyze, and manipulate text"
              icon="Type"
              tools={textTools}
              categorySlug="text-tools"
            />
          </div>
        )}

        {/* Encoding Tools Section */}
        {encodingTools.length > 0 && (
          <div id="encoding-tools-section">
            <CategoryToolsSection
              title="Encoding & Decoding"
              description="Encode, decode, and hash data securely"
              icon="Binary"
              tools={encodingTools}
              categorySlug="encoding-tools"
            />
          </div>
        )}

        {/* JSON & Data Tools Section */}
        {jsonTools.length > 0 && (
          <div id="json-tools-section">
            <CategoryToolsSection
              title="JSON & Data Tools"
              description="Format, convert, and validate data"
              icon="Braces"
              tools={jsonTools}
              categorySlug="json-tools"
            />
          </div>
        )}

        {/* Code Tools Section */}
        {codeTools.length > 0 && (
          <div id="code-tools-section">
            <CategoryToolsSection
              title="Code & Developer Tools"
              description="Format, minify, and test code"
              icon="Code"
              tools={codeTools}
              categorySlug="code-tools"
            />
          </div>
        )}

        {/* SEO Tools Section */}
        {seoTools.length > 0 && (
          <div id="seo-tools-section">
            <CategoryToolsSection
              title="SEO & Marketing Tools"
              description="Optimize content for search engines"
              icon="TrendingUp"
              tools={seoTools}
              categorySlug="seo-tools"
            />
          </div>
        )}

        {/* FAQ Section */}
        <div id="faq-section">
          <FAQSection />
        </div>
        
        {/* Suggest a Tool Section */}
        <SuggestToolSection />
        
      </main>
      <Footer />
    </div>
  );
}
