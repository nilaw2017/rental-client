"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  PanelLeftOpen,
  PanelLeftClose,
  BookmarkIcon,
  ClockIcon,
} from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);

  const savedProperties = [
    { id: "1", title: "Modern Apartment in Downtown", price: "Nrs.320,000" },
    { id: "2", title: "Family Home with Garden", price: "Nrs.450,000" },
    { id: "3", title: "Beachfront Condo", price: "Nrs.275,000" },
  ];

  const recentProperties = [
    { id: "4", title: "Penthouse with City View", price: "Nrs.550,000" },
    { id: "5", title: "Renovated Historic Building", price: "Nrs.380,000" },
  ];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="h-screen bg-white shadow-lg relative z-10"
    >
      <div className="flex flex-col h-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full w-8 h-8 p-0 absolute -right-4 top-4 shadow-md bg-white"
          >
            {isOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="flex-1 flex flex-col p-4 w-64">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Real Estate Map</h2>

            {/* Saved Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookmarkIcon className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium">Saved Properties</h3>
              </div>
              <div className="space-y-2">
                {savedProperties.map((property) => (
                  <div
                    key={property.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <p className="font-medium text-sm">{property.title}</p>
                    <p className="text-sm text-gray-500">{property.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium">Recent Searches</h3>
              </div>
              <div className="space-y-2">
                {recentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <p className="font-medium text-sm">{property.title}</p>
                    <p className="text-sm text-gray-500">{property.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
