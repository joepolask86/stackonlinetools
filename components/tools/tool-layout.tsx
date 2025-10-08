"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Share2 } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useToast } from "@/hooks/use-toast";
import { ToolMetadata } from "@/types/tool";

interface ToolLayoutProps {
  metadata: ToolMetadata;
  children: ReactNode;
}

export function ToolLayout({ metadata, children }: ToolLayoutProps) {
  const { isFavorite, addFavorite, removeFavorite, addRecentTool } = useFavoritesStore();
  const { toast } = useToast();
  const favorite = isFavorite(metadata.id);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(metadata.id);
      toast({
        title: "Removed from favorites",
        description: `${metadata.name} has been removed from your favorites.`,
      });
    } else {
      addFavorite(metadata.id);
      toast({
        title: "Added to favorites",
        description: `${metadata.name} has been added to your favorites.`,
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: metadata.name,
          text: metadata.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy link
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    }
  };

  // Track as recent tool
  React.useEffect(() => {
    addRecentTool(metadata.id);
  }, [metadata.id, addRecentTool]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">{metadata.name}</CardTitle>
              <CardDescription className="mt-2 text-base">
                {metadata.description}
              </CardDescription>
              <div className="mt-4 flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleFavorite}
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star
                  className={`h-4 w-4 ${
                    favorite ? "fill-yellow-400 text-yellow-400" : ""
                  }`}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                aria-label="Share tool"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

// Import React for useEffect
import React from "react";

