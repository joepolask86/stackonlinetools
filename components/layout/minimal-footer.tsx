import Link from "next/link";
import { Facebook, Twitter, Github } from "lucide-react";

export function MinimalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
              href="https://twitter.com/stackonlinetools"
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
