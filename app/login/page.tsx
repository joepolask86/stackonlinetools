import { Suspense } from "react";
import { AuthPageLayout } from "@/components/auth/auth-page-layout";
import { commonMetadata } from "@/lib/metadata";

export const metadata = commonMetadata.login;

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageLayout
        title="Log in to your account"
        subtitle="Sign in with your social account to access your personalized dashboard and save your favorite tools."
      />
    </Suspense>
  );
}
