"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, LogIn, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { MobileNav } from "./mobile-nav";
import { SearchModal, useSearchModal } from "@/components/search/search-modal";
import { categories } from "@/lib/tool-registry";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { open, setOpen } = useSearchModal();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Box;
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCategoriesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setCategoriesOpen(false);
    }, 150); // 150ms delay
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Map category IDs to URL slugs
  const categoryUrlMap: Record<string, string> = {
    text: "text-tools",
    "string-list": "string-list-tools",
    encoding: "encoding-tools",
    json: "json-tools",
    code: "code-tools",
    markdown: "markdown-tools",
    seo: "seo-tools",
    image: "image-tools",
    pdf: "pdf-tools",
    math: "math-tools",
    privacy: "privacy-tools",
    misc: "misc-tools",
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm shadow-indigo-200">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/assets/img/logo-620x180.png" alt="Stack Online Tools Logo" width={140} height={36} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-md">
            <Link
              href="/tools"
              className="transition-colors py-2 hover:text-primary text-foreground/90"
            >
              All Tools
            </Link>
            
            
            {/* Categories Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center py-4 gap-1 transition-colors hover:text-primary text-foreground/90"
              >
                Categories
                <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 ease-in-out ${
                categoriesOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}>
                <div className="p-0 overflow-hidden rounded-lg">
                    {categories.map((category, index) => {
                      const Icon = getIcon(category.icon);
                      const categoryUrl = categoryUrlMap[category.id] || `${category.id}-tools`;
                      const isLast = index === categories.length - 1;
                      const isFirst = index === 0;
                      
                      return (
                        <Link
                          key={category.id}
                          href={`/${categoryUrl}`}
                          className={`flex items-center gap-3 px-3 py-2 border-gray-100 hover:bg-gray-50 hover:text-blue-600 transition-colors ${!isLast ? 'border-b' : ''} ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''}`}
                        >
                          <div className="flex h-8 w-8 items-center justify-center text-blue-600">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{category.name}</div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
            
            <Link
              href="/suggest"
              className="transition-colors text-orange-600 hover:text-indigo-600"
            >
              Suggest a Tool
            </Link>
            <button
              onClick={() => scrollToSection('faq-section')}
              className="transition-colors hover:text-indigo-600 text-foreground/90"
            >
              FAQs
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              className="hidden md:inline-flex p-3 py-2 bg-gray-100 w-2xs border-none rounded-md invert-shadow text-sm text-foreground/60 flex items-center"
              onClick={() => setOpen(true)}
            >
              <Search className="h-4 w-4 text-foreground/60 mr-1" /> Search Tools
              <kbd className="hidden sm:inline-flex select-none items-center gap-1 py-0.5 px-1 font-mono text-[20px] font-medium text-sm border border-gray-200 rounded-xs bg-white text-foreground/80 rounded-sm ml-12">
                <span className="text-xs">CtrlK</span>
              </kbd>
            </button>
          
            <Link href="/login">
              <Button
                size="lg"
                className="hidden md:inline-flex text-md rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-10 px-6"
              >
                Sign in
              </Button>
            </Link>
            
            <Link 
              href="#"
              className="md:hidden flex items-center justify-center" 
              aria-label="Search"
              onClick={() => setOpen(true)}
            >
              <Search className="h-6 w-6 text-gray-800" />
            </Link>
            
            <Link 
              href="/login"
              className="md:hidden h-8 w-8 flex items-center justify-center ml-0" 
              aria-label="Sign in"
            >
              <LogIn className="h-6 w-6 text-gray-800" />
            </Link>

            <Link 
               href="#"
               className="md:hidden h-8 w-8 p-0" 
               onClick={() => setMobileNavOpen(true)}
               aria-label="Menu"
               >
              <Menu className="h-8 w-8 text-gray-800" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
      <SearchModal open={open} onOpenChange={setOpen} />
    </>
  );
}
