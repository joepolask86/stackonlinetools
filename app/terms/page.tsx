import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { commonMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = commonMetadata.terms;

// Force static generation for maximum performance
export const dynamic = 'force-static';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50/50 to-indigo-100/50 dark:from-slate-900 dark:to-slate-800 py-16 md:py-24 tool-pattern-bg">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Please read these terms carefully before using our services.
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
                  Welcome to StackOnlineTools (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using{" "}
                  <a href="https://stackonlinetools.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    https://stackonlinetools.com
                  </a>{" "}
                  (the &quot;Website&quot; or &quot;Service&quot;), you agree to comply with and be bound by these Terms and Conditions (&quot;Terms&quot;). 
                  Please read them carefully before using our Website or any of our tools.
                </p>
                <p className="mb-8">
                  If you do not agree to these Terms, please do not use our Website.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                By accessing or using StackOnlineTools, you confirm that you are at least 18 years old (or have parental consent) 
                and have the legal capacity to enter into a binding agreement. Your continued use of our Website constitutes 
                acceptance of these Terms and any future modifications.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                2. Services Provided
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                StackOnlineTools provides access to various free and premium online tools for text formatting, data processing, 
                file conversion, SEO analysis, and other digital utilities (&quot;Services&quot;).
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">We reserve the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
                <li>Modify, suspend, or discontinue any tool or service without prior notice.</li>
                <li>Restrict access to certain features for security, technical, or business reasons.</li>
                <li>Introduce or remove paid features at any time.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                3. Paid Tools and Subscriptions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Some tools or features may require payment or a subscription. By purchasing or subscribing, you agree to the following terms:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3.1 Payment and Billing
              </h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                <li>All prices are listed in U.S. Dollars (USD) unless stated otherwise.</li>
                <li>Payments are processed through secure third-party payment providers (e.g., Stripe or PayPal).</li>
                <li>You authorize StackOnlineTools to charge your selected payment method for the full amount of your plan, including recurring payments where applicable.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3.2 Subscription Renewals
              </h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                <li>Paid subscriptions automatically renew at the end of each billing period unless canceled prior to renewal.</li>
                <li>You can manage or cancel your subscription anytime via your account dashboard or by contacting support.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3.3 Refund Policy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Due to the digital nature of our products, all sales are final. Refunds may be issued only in cases of:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Duplicate payments, or</li>
                <li>Service unavailability for more than 7 consecutive days.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                To request a refund, contact us at{" "}
                <a href="mailto:support@stackonlinetools.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  support@stackonlinetools.com
                </a>{" "}
                within 7 days of purchase.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3.4 Pricing Changes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We reserve the right to adjust pricing at any time. Any changes to subscription fees will apply upon renewal, 
                and you will be notified in advance.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                4. Acceptable Use
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree to use StackOnlineTools only for lawful and legitimate purposes. You may not:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Reverse-engineer, copy, or resell our code, design, or software.</li>
                <li>Use automated bots, scripts, or scrapers to extract or manipulate data.</li>
                <li>Upload or process unlawful, copyrighted, or malicious content.</li>
                <li>Use our tools to generate spam, phishing content, or for hacking activities.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Violation of these terms may result in suspension or permanent ban from our platform.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                5. User Accounts
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Some features may require registration. By creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Provide accurate and complete information.</li>
                <li>Maintain confidentiality of your credentials.</li>
                <li>Accept full responsibility for all activities under your account.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We reserve the right to suspend or delete accounts for misuse or violation of these Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                6. Intellectual Property Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All content, code, logos, designs, databases, and software on StackOnlineTools are owned or licensed by us. 
                You are granted a limited, non-exclusive, non-transferable license to use our tools for personal or internal business purposes.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">You may not:</p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8">
                <li>Copy, reproduce, host, or redistribute our tools.</li>
                <li>Use our brand, trademarks, or codebase without written permission.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                7. Privacy Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Your use of StackOnlineTools is also governed by our{" "}
                <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
                , which explains how we collect, store, and protect your personal data in compliance with U.S. data protection laws. 
                By using the Website, you consent to such collection and processing.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                8. Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All tools and content are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Accuracy, completeness, or reliability of any results generated.</li>
                <li>Uninterrupted or error-free access.</li>
                <li>Compatibility with all browsers or devices.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                You use StackOnlineTools at your own risk.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To the maximum extent permitted by U.S. law, StackOnlineTools, its owners, employees, or affiliates shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Any indirect, incidental, or consequential damages,</li>
                <li>Any loss of profits, data, or business opportunities,</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                arising out of or related to the use or inability to use our tools. Some jurisdictions do not allow exclusion of certain 
                liabilities, so these limitations may not apply to you.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                10. Third-Party Links
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Our Website may include links to third-party websites or services. We are not responsible for the content, accuracy, 
                or policies of such sites. Visiting external links is at your own risk.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                11. Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may suspend or terminate your access without notice if:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>You breach these Terms,</li>
                <li>We suspect fraudulent or abusive activity, or</li>
                <li>Required by law or regulatory authorities.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Upon termination, your right to use the Website ceases immediately.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                12. Changes to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We may revise these Terms periodically. The most recent version will always be posted on this page with the updated date. 
                Your continued use after changes constitutes acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                13. Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                These Terms shall be governed by and construed in accordance with the laws of the United States, specifically under the 
                jurisdiction of the State of Delaware, without regard to conflict of law principles. Any disputes arising under these Terms 
                shall be resolved exclusively in the state or federal courts located in Delaware, USA.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                14. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you have any questions or concerns about these Terms, please contact us: <a href="mailto:support@stackonlinetools.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@stackonlinetools.com</a>
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
