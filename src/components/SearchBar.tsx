"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for properties..."
          className="pl-10 pr-4 py-2 w-full bg-white shadow-lg rounded-full border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}
