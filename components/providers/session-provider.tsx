"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { checkSession } = useAuthStore();

  useEffect(() => {
    // Check session on app load
    checkSession();
  }, [checkSession]);

  return <>{children}</>;
}
