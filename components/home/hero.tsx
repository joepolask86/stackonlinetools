"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-16 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-1.5 text-sm shadow-sm backdrop-blur-sm">
            <span className="mr-2">✨</span>
            <span className="font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              100+ Free Online Tools
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            All Online Tools in{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              One Box
            </span>
          </h1>

          <p className="mb-10 text-lg text-gray-600 sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            No need to bookmark tools separately.{" "}
            <span className="font-semibold text-gray-900">
              Stack Online Tools
            </span>{" "}
            is your free all-in-one solution for text, code, SEO, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/tools"
              className="flex items-center justify-center w-200 sm:w-auto text-base text-white h-12 px-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all duration-200"
            >
              Explore Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </div>

      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl" />
      </div>
    </section>
  );
}
