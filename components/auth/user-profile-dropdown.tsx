"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { LogOut, Lightbulb, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  provider?: 'google' | 'github' | 'twitter' | 'facebook' | 'email';
  providerId?: string;
}

interface UserProfileDropdownProps {
  user: User;
  onLogout: () => void;
}

export function UserProfileDropdown({ user, onLogout }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center h-10 w-10 p-0 rounded-full hover:bg-gray-100"
      >
        <Avatar 
          src={user.image} 
          name={user.name} 
          size="sm"
          alt={`${user.name}'s avatar`}
        />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* User Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar 
                src={user.image} 
                name={user.name} 
                size="lg"
                alt={`${user.name}'s avatar`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-md text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-2">
             <button
               onClick={() => handleNavigation("/profile")}
               className="w-full flex items-center px-3 py-2 text-md text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
             >
               <User className="mr-3 h-5 w-5" />
               Profile
             </button>
            
            <button
              onClick={() => handleNavigation("/suggest")}
              className="w-full flex items-center px-3 py-2 text-md text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Lightbulb className="mr-3 h-5 w-5" />
              Tool Requests
            </button>
            
          </div>

          {/* Settings and Logout */}
          <div className="p-2 border-t border-gray-100">            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-md text-red-600 rounded-md transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
