"use client";

import * as React from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fallbackClassName?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10", 
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const imageSizes = {
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
  xl: { width: 64, height: 64 },
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6", 
  xl: "h-8 w-8",
};

export function Avatar({ 
  src, 
  alt, 
  name, 
  size = "md", 
  className,
  fallbackClassName 
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const shouldShowImage = src && !imageError && imageLoaded;
  const shouldShowInitials = name && !shouldShowImage;
  const shouldShowIcon = !shouldShowImage && !shouldShowInitials;

  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-primary/10 overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      {src && !imageError && (
        <Image
          src={src}
          alt={alt || name || "User avatar"}
          width={imageSizes[size].width}
          height={imageSizes[size].height}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-200",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}
      
      {shouldShowInitials && (
        <span 
          className={cn(
            "font-medium text-primary text-sm",
            size === "sm" && "text-xs",
            size === "lg" && "text-base",
            size === "xl" && "text-lg",
            fallbackClassName
          )}
        >
          {getInitials(name)}
        </span>
      )}
      
      {shouldShowIcon && (
        <User 
          className={cn(
            "text-primary",
            iconSizes[size]
          )} 
        />
      )}
    </div>
  );
}
