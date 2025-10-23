import Link from "next/link";
import { Facebook, Twitter, Github } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 pb-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image src="/assets/img/logo-620x180.png" alt="Stack Online Tools Logo" width={140} height={36} />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your all-in-one online toolbox. 100+ free tools for developers, marketers, and creators.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Tools</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/text-tools" className="text-muted-foreground hover:text-primary transition-colors">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link href="/encoding-tools" className="text-muted-foreground hover:text-primary transition-colors">
                  Encoding Tools
                </Link>
              </li>
              <li>
                <Link href="/json-tools" className="text-muted-foreground hover:text-primary transition-colors">
                  JSON Tools
                </Link>
              </li>
              <li>
                <Link href="/code-tools" className="text-muted-foreground hover:text-primary transition-colors">
                  Developer Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
             <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="mailto:support@stackonlinetools.com" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} <strong>Stack Online Tools</strong>. All rights reserved.
          </p>

          <div className="flex items-center space-x-2">
            <Link
              href="https://facebook.com/stackonlinetools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/stackonlinetool"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/joepolask86"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
