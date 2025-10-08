"use client";

import Link from "next/link";
import { X, Twitter } from "lucide-react";
import { useEffect } from "react";


interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop with dark blue background */}
      <div
        className="fixed inset-0 bg-blue-900/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => onOpenChange(false)}
      />

      {/* Full Screen White Panel - slides in from right */}
      <div className={`fixed inset-0 transform transition-transform duration-300 ease-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/*  close button */}
        <div className="flex items-center justify-end p-6">
          <Link
              href="#"
              className="text-xl font-bold text-white transition-colors"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-8 w-8 text-white" strokeWidth={2.5} />
            </Link>
        </div>

        {/* Centered Navigation Menu */}
        <div className="flex items-center justify-center h-full -mt-20">
          <nav className="flex flex-col items-center space-y-4">
            {/* Login/Register */}
            <Link
              href="/login"
              className="text-xl font-bold text-white transition-colors"
            >
              Login / Register
            </Link>

            {/* Favorites */}
            <Link
              href="/favorites"
              className="text-xl font-bold text-white transition-colors"
            >
              Favorites
            </Link>

            {/* About */}
            <Link
              href="/about"
              className="text-xl font-bold text-white transition-colors"
            >
              About
            </Link>

            {/* Terms of Use */}
            <Link
              href="/terms"
              className="text-xl font-bold text-white transition-colors"
            >
              Terms of Use
            </Link>

            {/* Privacy Policy */}
            <Link
              href="/privacy"
              className="text-xl font-bold text-white transition-colors"
            >
              Privacy Policy
            </Link>

            {/* Contact */}
            <Link
              href="mailto:support@stackonlinetools.com"
              className="text-xl font-bold text-white transition-colors"
            >
              Contact
            </Link>

            {/* Follow on X */}
            <Link
              href="https://twitter.com/stackonlinetools"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xl font-bold text-white transition-colors"
            >
              <Twitter className="h-5 w-5 mr-2" /> Follow on X
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

