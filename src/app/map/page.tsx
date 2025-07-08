"use client";

import dynamic from "next/dynamic";

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import("@/Map/Map"), { ssr: false });

export default function MapPage() {
  return (
    <div className="h-screen w-screen">
      <Map />
    </div>
  );
}
