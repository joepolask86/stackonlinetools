"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface FAQ {
  question: string;
  answer: string | ReactNode;
}

const faqs: FAQ[] = [
  {
    question: "Is Stack Online Tools really free?",
    answer: "Absolutely! All our tools are completely free to use. We believe in providing valuable utilities without any cost barriers. You can use any tool as many times as you need without restrictions."
  },
  {
    question: "How do you keep the tools free?",
    answer: "We maintain our free service through minimal, non-intrusive advertising and optional premium features. Our core mission is to provide free access to essential online tools for everyone."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account required! You can use all our tools immediately without signing up. However, creating a free account allows you to save your work, access history, and enjoy additional features."
  },
  {
    question: "Are my data and files secure?",
    answer: "Yes, we take privacy seriously. All data processing happens in your browser when possible. For server-side processing, we use secure connections and don't store your data longer than necessary."
  },
  {
    question: "Can I suggest new tools?",
    answer: (
      <>
        Absolutely! We love hearing from our users. You can suggest new tools through our{" "}
        <Link href="/suggest" className="text-blue-600 hover:text-blue-800 underline font-medium">
          Suggest a Tool
        </Link>{" "}
        section. We regularly add new utilities based on user feedback and needs
      </>
    )
  },
  {
    question: "What browsers are supported?",
    answer: "Our tools work on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience."
  },
  {
    question: "Can I use these tools commercially?",
    answer: "Yes, you can use our tools for both personal and commercial purposes. We only ask that you don't resell or redistribute our tools as your own product."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-100 mt-8">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <div className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
