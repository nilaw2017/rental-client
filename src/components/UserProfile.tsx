"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-lg">
        {isLoggedIn ? (
          <>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm flex items-center gap-1"
              onClick={handleAuth}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="text-sm flex items-center gap-1"
            onClick={handleAuth}
          >
            <LogIn className="h-4 w-4" />
            <span>Sign in</span>
          </Button>
        )}
      </div>
    </div>
  );
}
