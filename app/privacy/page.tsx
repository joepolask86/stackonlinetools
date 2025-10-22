import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { commonMetadata } from "@/lib/metadata";

export const metadata = commonMetadata.privacy;

// Force static generation for maximum performance
export const dynamic = 'force-static';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50/50 to-indigo-100/50 dark:from-slate-900 dark:to-slate-800 py-16 md:py-24 tool-pattern-bg">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
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

                <p>This privacy policy has been compiled to better serve those who are concerned with how their &apos;Personally Identifiable Information&apos; (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.</p>
                <h2 className="text-xl font-semibold mt-8 mb-4">What personal information do we collect from the people that visit our blog, website or app?</h2>
                <p>When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number, credit card information or other details to help you with your experience.</p>
                <h2 className="text-xl font-semibold mt-8 mb-4">When do we collect information?</h2>
                <p>We collect information from you when you place an order or enter information on our site.</p>
                <h2 className="text-xl font-semibold mt-8 mb-4">How do we use your information?</h2>
                <p>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
                    <li>To quickly process your transactions.</li>
                    <li>To send periodic emails regarding your order or other products and services.</li>
                    <li>To follow up with them after correspondence (live chat, email or phone inquiries)</li>
                </ul>
                <h2 className="text-xl font-semibold mt-8 mb-4">How do we protect your information?</h2>
                <p>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. We use regular Malware Scanning.</p>
                <p>Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit
                    information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>
                <p>We implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information.</p>
                <p>All transactions are processed through a gateway provider and are not stored or processed on our servers.</p>
                <h2 className="text-xl font-semibold mt-8 mb-4">Do we use &apos;cookies&apos;?</h2>
                <p>Yes. Cookies are small files that a site or its service provider transfers to your computer&apos;s hard drive through your Web browser (if you allow) that enables the site&apos;s or service provider&apos;s systems to recognize your browser and capture and remember
                    certain information.</p>
                <p>For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services.
                    We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>
                <h2 className="text-xl font-semibold mt-8 mb-4">We use cookies to:</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Help remember and process the items in the shopping cart.</li>
                    <li>Understand and save user&apos;s preferences for future visits.</li>
                    <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.</li>
                </ul>
                <h2 className="text-xl font-semibold mt-8 mb-4">Third-party disclosure</h2>
                <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website,
                    conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it&apos;s release is appropriate to comply with the law, enforce our site policies, or protect
                    ours or others&apos; rights, property or safety.</p>
                <p>However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.</p>
                <h2 className="text-xl font-semibold mt-8 mb-4">Contact Information</h2>
                <p>If you have any questions regarding this privacy policy, you may contact us at <a href="mailto:support@stackonlinetools.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@stackonlinetools.com</a></p>
              

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
