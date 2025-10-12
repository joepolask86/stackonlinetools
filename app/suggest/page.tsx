import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SuggestToolForm } from "@/components/suggest/suggest-tool-form";
import { commonMetadata } from "@/lib/metadata";

export const metadata = commonMetadata.suggest;

export default function SuggestToolPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Suggest a Tool
                </h1>
                <p className="text-xl text-gray-600 max-w-xl mx-auto">
                  Have an idea for a new online tool? We'd love to hear from you! 
                  Help us expand our collection of free utilities.
                </p>
              </div>

              {/* Form Section */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <SuggestToolForm />
              </div>

              {/* Additional Info */}
              <div className="mt-12 text-center">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    What happens next?
                  </h3>
                  <p className="text-blue-700">
                    We review all suggestions and consider them for future development. 
                    If your tool idea is selected, we'll notify you when it's live!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
