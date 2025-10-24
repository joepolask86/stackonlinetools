import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authClient } from "@/lib/auth-client";

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string; // Avatar URL from social provider
  provider?: 'google' | 'github' | 'twitter' | 'facebook' | 'email';
  providerId?: string; // ID from the social provider
  emailVerified?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCheckedSession: boolean;
  sessionCheckInterval: NodeJS.Timeout | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  checkSession: () => Promise<void>;
  startSessionRefresh: () => void;
  stopSessionRefresh: () => void;
  forceRefresh: () => void;
  invalidateAllCaches: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      hasCheckedSession: false,
      sessionCheckInterval: null,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      login: (user) => {
        set({ 
          user, 
          isAuthenticated: true,
          isLoading: false 
        });
        // Force immediate refresh and cache invalidation
        const { forceRefresh, invalidateAllCaches } = get();
        forceRefresh();
        invalidateAllCaches();
      },
      
      logout: async () => {
        try {
          // Stop session refresh when logging out
          const { stopSessionRefresh } = get();
          stopSessionRefresh();
          
          await authClient.signOut();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Clear state regardless of server response
          set({ 
            user: null, 
            isAuthenticated: false,
            hasCheckedSession: true 
          });
          // Force immediate refresh and cache invalidation
          const { forceRefresh, invalidateAllCaches } = get();
          forceRefresh();
          invalidateAllCaches();
        }
      },
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      checkSession: async () => {
        try {
          set({ isLoading: true });
          const session = await authClient.getSession();
          
          if (session?.data?.user) {
            const user: User = {
              id: session.data.user.id,
              email: session.data.user.email,
              name: session.data.user.name,
              image: session.data.user.image || undefined,
              provider: 'email', // Default provider, will be updated from accounts
              providerId: undefined,
              emailVerified: session.data.user.emailVerified ? new Date() : undefined,
              createdAt: session.data.user.createdAt,
              updatedAt: session.data.user.updatedAt,
            };
            set({ user, isAuthenticated: true, isLoading: false, hasCheckedSession: true });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false, hasCheckedSession: true });
          }
        } catch (error) {
          console.error('Session check error:', error);
          set({ user: null, isAuthenticated: false, isLoading: false, hasCheckedSession: true });
        }
      },

      startSessionRefresh: () => {
        const { sessionCheckInterval, stopSessionRefresh } = get();
        
        // Clear existing interval if any
        if (sessionCheckInterval) {
          stopSessionRefresh();
        }
        
        // Check session every 30 seconds for immediate updates
        const interval = setInterval(() => {
          const { checkSession } = get();
          checkSession();
        }, 30000);
        
        set({ sessionCheckInterval: interval });
      },

      stopSessionRefresh: () => {
        const { sessionCheckInterval } = get();
        if (sessionCheckInterval) {
          clearInterval(sessionCheckInterval);
          set({ sessionCheckInterval: null });
        }
      },

      forceRefresh: () => {
        // Force immediate re-render by updating a timestamp
        set((state) => ({ ...state, hasCheckedSession: !state.hasCheckedSession }));
        // Dispatch global event for components to refresh
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('authStateChanged'));
        }
      },

      invalidateAllCaches: () => {
        // Clear all browser caches related to user data
        if (typeof window !== 'undefined') {
          // Dispatch events to invalidate all user-related caches
          window.dispatchEvent(new CustomEvent('invalidateUserFavorites'));
          window.dispatchEvent(new CustomEvent('invalidateUserComments'));
          window.dispatchEvent(new CustomEvent('invalidateUserBugReports'));
          window.dispatchEvent(new CustomEvent('invalidateUserToolRequests'));
        }
      },
    }),
    {
      name: "stack-tools-auth",
      // Only persist user data, not loading states
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasCheckedSession: state.hasCheckedSession,
      }),
    }
  )
);

// Selectors for easier access
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
