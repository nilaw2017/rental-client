"use client";

import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { PropertyDetail } from "@/components/PropertyDetail";

interface Property {
  id: string;
  position: [number, number];
  title: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
  images: string[];
}

const DefaultIcon = L.icon({
  iconUrl: "/marker-icon.svg",
  iconRetinaUrl: "/marker-icon.svg",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [35, 91],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Sample property data
const properties: Property[] = [
  {
    id: "1",
    position: [27.693, 85.281] as [number, number],
    title: "Modern Apartment",
    price: "Nrs.320,000",
    address: "123 Main St, Kathmandu",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq ft",
    description:
      "A beautiful modern apartment in the heart of the city with stunning views and premium amenities. Close to shopping, dining, and public transportation.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    ],
  },
  {
    id: "2",
    position: [27.695, 85.285] as [number, number],
    title: "Family Home with Garden",
    price: "Nrs.450,000",
    address: "456 Park Ave, Kathmandu",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,500 sq ft",
    description:
      "Spacious family home with a beautiful garden in a quiet neighborhood. Features an open floor plan, modern kitchen, and large master suite.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    ],
  },
  {
    id: "3",
    position: [27.69, 85.29] as [number, number],
    title: "Luxury Penthouse",
    price: "Nrs.750,000",
    address: "789 High St, Kathmandu",
    bedrooms: 3,
    bathrooms: 3.5,
    area: "3,000 sq ft",
    description:
      "Stunning penthouse with panoramic city views, featuring high-end finishes, a gourmet kitchen, and a private rooftop terrace perfect for entertaining.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlbnRob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVudGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    ],
  },
];

// Component to move zoom control to bottom right
function CustomZoomControl() {
  const map = useMap();

  useEffect(() => {
    // Remove default zoom control
    map.zoomControl.remove();

    // Add zoom control to bottom right
    const zoomControl = L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(map);

    // Cleanup function to remove the zoom control when the component unmounts
    return () => {
      map.removeControl(zoomControl);
    };
  }, [map]); // Only run this effect when the map changes

  return null;
}

const Map = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <>
      <MapContainer
        bounds={[
          [27.685, 85.275],
          [27.7, 85.295],
        ]}
        className="map h-full w-full z-0"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CustomZoomControl />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={property.position}
            eventHandlers={{
              click: () => handleMarkerClick(property),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-medium">{property.title}</h3>
                <p>{property.price}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <PropertyDetail
        property={selectedProperty}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default Map;
