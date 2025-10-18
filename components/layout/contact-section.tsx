import Link from "next/link";

interface ContactSectionProps {
  title?: string;
  description?: string;
  suggestButtonText?: string;
  contactButtonText?: string;
  email?: string;
  suggestHref?: string;
  className?: string;
}

export function ContactSection({
  title = "Get in Touch",
  description = "Have a suggestion for a new tool? Found a bug? Want to collaborate? We'd love to hear from you!",
  suggestButtonText = "Suggest a Tool",
  contactButtonText = "Contact Us",
  email = "support@stackonlinetools.com",
  suggestHref = "/suggest",
  className = "",
}: ContactSectionProps) {
  return (
    <section className={`py-16 md:py-20 bg-gradient-to-r from-blue-800 to-indigo-900 ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={suggestHref}
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full hover:bg-blue-50 transition-colors"
            >
              {suggestButtonText}
            </Link>
            
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center px-6 py-3 border border-blue-200 text-white font-medium rounded-full hover:bg-blue-700/20 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {contactButtonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
