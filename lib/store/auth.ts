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
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      hasCheckedSession: false,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      login: (user) => set({ 
        user, 
        isAuthenticated: true,
        isLoading: false 
      }),
      
      logout: async () => {
        try {
          await authClient.signOut();
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          });
        } catch (error) {
          console.error('Logout error:', error);
          // Still clear local state even if server logout fails
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          });
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
