"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Mail, Copy, Check } from "lucide-react";
import Image from "next/image";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
  categoryName?: string;
  modalTitle?: string;
}

export function ShareModal({ isOpen, onClose, title, url, description, categoryName, modalTitle = "Share this Category" }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || '')}%0A%0A${encodeURIComponent(url)}`,
  };

  const socialIcons = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: shareLinks.facebook,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: shareLinks.twitter,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: shareLinks.linkedin,
    },
    {
      name: 'Email',
      icon: Mail,
      href: shareLinks.email,
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-none p-4 top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300 ease-out [&_button[class*='closeBtn']]:hidden [&[data-state=closed]]:!slide-out-to-left-1/2 [&[data-state=closed]]:!slide-out-to-top-[48%] [&[data-state=open]]:!slide-in-from-left-1/2 [&[data-state=open]]:!slide-in-from-top-[48%]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-blue-900">{modalTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2 bg-gray-100 rounded-lg p-3 py-4">
          <div className="text-center mb-2">
              <p className="text-sm text-gray-600 mb-2">You are currently sharing:</p>
              <h3 className="text-xl text-blue-900">{categoryName}</h3>
          </div>

          <div className="flex justify-center py-2 text-center">
             <Image
                src="/assets/img/system-solid-1-share-hover-pinch-2.apng" 
                alt={categoryName || ''} width={60} height={60}
              />
          </div>

          {/* Social Media Icons */}
          <div className="space-x-2 flex justify-center mb-2">
            {socialIcons.map((social) => {
              const IconComponent = social.icon;
              return (
                <Button
                  key={social.name}
                  size="sm"
                  className={`flex flex-col items-center h-12 w-12 border-none hover:bg-blue-700 hover:text-white transition-all duration-200 rounded-full [&_svg]:size-6`}
                  onClick={() => window.open(social.href, '_blank', 'width=600,height=400')}
                >
                  <IconComponent className="w-6 h-6" />
                </Button>
              );
            })}
            <Button
              className="flex items-center gap-3 h-12 w-12 border-none hover:bg-blue-700 rounded-full [&_svg]:size-6"
              onClick={handleCopy}
            >
              {copied ? (
                  <Check className="h-6 w-6 text-white" />
              ) : (
                  <Copy className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* URL Display */}
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Link to share:</p>
            <p className="text-sm text-gray-700 break-all">{url}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
