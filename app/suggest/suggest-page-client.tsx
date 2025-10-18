"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SuggestToolForm } from "@/components/suggest/suggest-tool-form";
import { useAuthStore } from "@/lib/store/auth";
import Link from "next/link";
import { LockIcon } from "lucide-react";

export function SuggestPageClient() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className={`${isAuthenticated ? "bg-gradient-to-br from-blue-50 via-white to-indigo-50" : "bg-gray-50"}`}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto">
            {isAuthenticated ? (
              <>
              {/* Header Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                  Suggest a Tool
                </h1>
                <p className="text-xl text-gray-600 max-w-xl mx-auto">
                  Have an idea for a new online tool? We&apos;d love to hear from you! 
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
                      <h2 className="text-lg font-semibold text-blue-900 mb-2">
                        What happens next?
                      </h2>
                      <p className="text-neutral-600">
                        We review all suggestions and consider them for future development. 
                        If your tool idea is selected, we&apos;ll notify you when it&apos;s live!
                      </p>
                    </div>
                  </div>
                </>
               ) : (
                 /* Not Authenticated Message */
                 <div className="bg-white border border-gray-100 rounded-lg p-8 text-center">
                   <div className="max-w-md mx-auto flex flex-col justify-center items-center">
                    <LockIcon className="h-60 w-60 text-neutral-300 mb-4" />
                      <p className="text-gray-600 text-lg">
                        Please <Link href="/login" className="text-blue-600 font-medium">sign in</Link> to view this page.
                      </p>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
