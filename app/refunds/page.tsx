import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Refund Policy - Stack Online Tools",
  description: "Refund policy for Stack Online Tools. Learn about our refund terms and conditions for premium services and API usage.",
  url: "/refunds",
});

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Refund Policy
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our refund policy for premium services and API usage.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Last updated: December, 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              
              <div className="text-gray-600 dark:text-gray-300 mb-8">
                <p className="mb-6">
                  Thank you for choosing <strong>StackOnlineTools</strong>. We aim to provide powerful, reliable, and easy-to-use online tools and services. 
                  Before making a purchase, please read our refund policy carefully to understand your rights and obligations.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                1. Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                All sales on StackOnlineTools are final due to the digital and instantly accessible nature of our products and services. 
                Once payment is processed and access to a paid tool or feature is granted, we cannot reverse or cancel the transaction.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                2. Eligibility for Refunds
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Refunds may only be issued under limited circumstances as described below:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>If you were charged more than once for the same subscription or product (duplicate billing).</li>
                <li>If the purchased service was unavailable for more than <strong>7 consecutive days</strong> due to a verified technical failure on our side.</li>
                <li>If you made a payment but never received access to the service, and support was unable to resolve it within a reasonable time frame.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Refunds are <strong>not</strong> provided for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
                <li>Change of mind or accidental purchase.</li>
                <li>Failure to understand or properly use the tool or feature.</li>
                <li>Temporary downtime, maintenance, or performance issues not exceeding 7 consecutive days.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                3. Subscription Renewals
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                All subscriptions automatically renew at the end of the billing period unless canceled beforehand. 
                If you no longer wish to continue, please cancel your subscription prior to the next renewal date. 
                Refunds are not available for unused time after renewal.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                4. How to Request a Refund
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you believe you qualify for a refund based on the terms above, please contact our support team at{" "}
                <a href="mailto:support@stackonlinetools.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  support@stackonlinetools.com
                </a>{" "}
                within <strong>7 days</strong> of your payment date.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To process your request faster, include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Your full name and email used for purchase</li>
                <li>Transaction or order ID</li>
                <li>Date and amount of payment</li>
                <li>Brief explanation of the issue</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Once verified, eligible refunds will be processed within <strong>5–10 business days</strong> using the original payment method.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                5. Chargebacks and Disputes
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Initiating a chargeback without first contacting our support team violates this Refund Policy. 
                We encourage you to reach out directly for resolution before filing any disputes with your payment provider.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                6. Policy Changes
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                StackOnlineTools reserves the right to update or modify this Refund Policy at any time without prior notice. 
                The latest version will always be available on this page.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                7. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                For all refund-related inquiries, please contact us at:{" "}
                <a href="mailto:support@stackonlinetools.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  support@stackonlinetools.com
                </a>
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
