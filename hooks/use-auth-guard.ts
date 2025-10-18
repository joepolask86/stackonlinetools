"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";

/**
 * Custom hook for protecting routes that require authentication
 * Automatically redirects unauthenticated users to login with current URL as redirect parameter
 * 
 * @param redirectTo - Optional custom redirect URL after login (defaults to current pathname)
 * @returns Object with authentication state and loading status
 */
export function useAuthGuard(redirectTo?: string) {
  const { user, isAuthenticated, isLoading, hasCheckedSession } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we've checked the session, not loading, and not authenticated
    if (hasCheckedSession && !isLoading && !isAuthenticated) {
      const redirectUrl = redirectTo || pathname;
      const encodedRedirect = encodeURIComponent(redirectUrl);
      router.replace(`/login?redirect=${encodedRedirect}`);
    }
  }, [isAuthenticated, isLoading, hasCheckedSession, router, pathname, redirectTo]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isRedirecting: hasCheckedSession && !isLoading && !isAuthenticated,
  };
}
