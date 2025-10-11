"use client";

import { Button } from "@/components/ui/button";
import { PackageOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SuggestToolSection() {
  return (
    <section className="py-8 bg-gradient-to-r from-blue-800 to-indigo-900">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center">
              <PackageOpen className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Can&apos;t Find Your Tool?
          </h2>
          
          <p className="text-lg text-white mb-12 max-w-2xl mx-auto">
            We&apos;re constantly adding new tools to help you work smarter. Submit your tool suggestion and we&apos;ll build it for the community.
          </p>
          
          <Button asChild
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Link href="/suggest">
              Suggest a Tool
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
