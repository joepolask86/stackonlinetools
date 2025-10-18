"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/lib/store/auth";
import { useToast } from "@/hooks/use-toast";

interface UseFavoritesReturn {
  favorites: string[];
  isLoading: boolean;
  isFavorite: (toolId: string) => boolean;
  toggleFavorite: (toolId: string) => Promise<void>;
  addFavorite: (toolId: string) => Promise<void>;
  removeFavorite: (toolId: string) => Promise<void>;
}

export function useFavorites(): UseFavoritesReturn {
  const { user, isAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's favorites
  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setFavorites([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/favorites");
      
      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites || []);
      } else if (response.status === 401) {
        // User not authenticated, clear favorites
        setFavorites([]);
      } else {
        throw new Error("Failed to fetch favorites");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast({
        title: "Error",
        description: "Failed to load favorites",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, toast]);

  // Add a tool to favorites
  const addFavorite = useCallback(async (toolId: string) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Login Required",
        description: "Please log in to add tools to your favorites",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toolId }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Only add to local state if it was actually added (not already favorited)
        if (data.message === "Added to favorites") {
          setFavorites(prev => [...prev, toolId]);
          // toast({
          //   title: "Added to Favorites",
          //   description: "Tool has been added to your favorites",
          // });
        } else if (data.message === "Already favorited") {
          // Tool is already favorited, no need to show toast or update state
          // This shouldn't happen in normal flow since toggleFavorite checks isFavorite first
          console.log("Tool already favorited");
        }
      } else if (response.status === 401) {
        toast({
          title: "Login Required",
          description: "Please log in to add tools to your favorites",
          variant: "destructive",
        });
      } else {
        throw new Error("Failed to add favorite");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, toast]);

  // Remove a tool from favorites
  const removeFavorite = useCallback(async (toolId: string) => {
    if (!isAuthenticated || !user) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/favorites?toolId=${toolId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavorites(prev => prev.filter(id => id !== toolId));
        // toast({
        //   title: "Removed from Favorites",
        //   description: "Tool has been removed from your favorites",
        // });
      } else {
        throw new Error("Failed to remove favorite");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, toast]);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (toolId: string) => {
    // Check current state directly from the favorites array
    const currentlyFavorited = favorites.includes(toolId);
    
    if (currentlyFavorited) {
      await removeFavorite(toolId);
    } else {
      await addFavorite(toolId);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Check if a tool is favorited
  const isFavorite = useCallback((toolId: string) => {
    return favorites.includes(toolId);
  }, [favorites]);

  // Fetch favorites when user changes
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  };
}
