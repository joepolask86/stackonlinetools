"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { useAuthGuard } from "@/hooks/use-auth-guard";

export default function ProfilePage() {
  const { user, isRedirecting } = useAuthGuard();

  // Show loading state while redirecting
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Redirecting to login...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {user && <UserDashboard user={user} />}
      </main>
      <Footer />
    </div>
  );
}
