"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

interface AuthPageLayoutProps {
  children?: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthPageLayout({ children, title, subtitle }: AuthPageLayoutProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const handleSocialLogin = async (provider: string) => {
    try {
      // Get redirect URL from query params, default to profile
      const redirectUrl = searchParams.get('redirect') || '/profile';
      
      // Use Better-Auth client for social login
      await authClient.signIn.social({
        provider: provider as 'google' | 'github' | 'twitter' | 'facebook',
        callbackURL: redirectUrl,
      });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      toast({
        title: "Error",
        description: `Failed to sign in with ${provider}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Design */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-24 text-white">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">
              Welcome to Stack Online Tools
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Access 100+ free online utilities for text manipulation, SEO, coding, 
              image processing, and more. All tools work directly in your browser.
            </p>
            
            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span className="text-blue-100">Save your favorite tools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span className="text-blue-100">Comment and share feedback</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span className="text-blue-100">Request new tools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span className="text-blue-100">Report bugs and issues</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Right Side - Authentication */}
      <div className="w-full lg:w-1/2 bg-gray-100 flex flex-col justify-center items-center px-8 py-12">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600">
              {subtitle}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-2 mb-8 flex flex-col items-center">
            <Button
              variant="outline"
              className="w-72 h-12 text-md font-normal justify-start hover:bg-white shadow-none border-gray-200 hover:border-gray-300"
              onClick={() => handleSocialLogin("google")}
            >
              <Image 
                src="/assets/providers/google.svg" 
                alt="Google" 
                width={24} 
                height={24} 
                className="mr-5" 
              />
              Continue with Google
            </Button>
            
            <Button
              variant="outline"
              className="w-72 h-12 text-md font-normal justify-start hover:bg-white shadow-none border-gray-200 hover:border-gray-300"
              onClick={() => handleSocialLogin("github")}
            >
              <Image 
                src="/assets/providers/github.svg" 
                alt="GitHub" 
                width={24} 
                height={24} 
                className="mr-5" 
              />
              Continue with GitHub
            </Button>
            
            <Button
              variant="outline"
              className="w-72 h-12 text-md font-normal justify-start hover:bg-white shadow-none border-gray-200 hover:border-gray-300"
              onClick={() => handleSocialLogin("twitter")}
            >
              <Image 
                src="/assets/providers/twitter.svg" 
                alt="Twitter" 
                width={24} 
                height={24} 
                className="mr-5" 
              />
              Continue with Twitter
            </Button>
            
            <Button
              variant="outline"
              className="w-72 h-12 text-md font-normal justify-start hover:bg-white shadow-none border-gray-200 hover:border-gray-300"
              onClick={() => handleSocialLogin("facebook")}
            >
              <Image 
                src="/assets/providers/facebook.svg" 
                alt="Facebook" 
                width={24} 
                height={24} 
                className="mr-5" 
              />
              Continue with Facebook
            </Button>
          </div>

          {/* Additional Content */}
          {children}

          {/* Terms */}
          <p className="text-sm text-gray-500 text-center mt-8">
          By signing in or create an account, you agree with our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          
          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link 
              href="/" 
              className="text-sm text-orange-600 hover:text-gray-800 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
