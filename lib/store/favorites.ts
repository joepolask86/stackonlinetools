import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // Tool IDs
  recentTools: string[]; // Tool IDs in order of recent usage
  addFavorite: (toolId: string) => void;
  removeFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  addRecentTool: (toolId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentTools: [],
      
      addFavorite: (toolId: string) => {
        set((state) => ({
          favorites: [...new Set([...state.favorites, toolId])],
        }));
      },
      
      removeFavorite: (toolId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== toolId),
        }));
      },
      
      isFavorite: (toolId: string) => {
        return get().favorites.includes(toolId);
      },
      
      addRecentTool: (toolId: string) => {
        set((state) => {
          const filtered = state.recentTools.filter((id) => id !== toolId);
          return {
            recentTools: [toolId, ...filtered].slice(0, 10), // Keep last 10
          };
        });
      },
    }),
    {
      name: "stack-tools-favorites",
    }
  )
);

