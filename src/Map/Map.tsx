"use client";

import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useAuth } from "@/context/AuthContext";
import { PropertyDetail } from "@/components/PropertyDetail";
import { UserProfile } from "@/components/UserProfile";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Loader2, AlertCircle } from "lucide-react";

// Convert API Property type to Map Property type
interface MapProperty {
  id: string;
  position: [number, number];
  title: string;
  price: string;
  address: string;
  bedrooms: number | undefined;
  bathrooms: number | undefined;
  area: string;
  description: string;
  images: string[];
  host?: {
    id: string;
    name: string;
    profileImage?: string;
    bio?: string;
    isVerified: boolean;
    createdAt: string;
    propertiesCount: number;
  };
  averageRating?: number;
  reviewsCount?: number;
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

// Component to move zoom control to bottom right
function CustomZoomControl() {
  const map = useMap();

  useEffect(() => {
    // Removes default zoom control
    map.zoomControl.remove();

    // Adds zoom control to bottom right
    const zoomControl = L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(map);

    // Cleanups function to remove the zoom control when the component unmounts
    return () => {
      map.removeControl(zoomControl);
    };
  }, [map]); // Only runs this effect when the map changes

  return null;
}

const Map = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<MapProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapBounds, setMapBounds] = useState<
    [[number, number], [number, number]]
  >([
    [27.685, 85.275],
    [27.7, 85.295],
  ]);

  const handleMarkerClick = (property: MapProperty) => {
    setSelectedProperty(property);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, we would fetch from the API
        // For now, we'll use sample data
        // const data = await api.getProperties();

        // Sample data
        const sampleProperties: MapProperty[] = [
          {
            id: "1",
            position: [27.693, 85.281] as [number, number],
            title: "Modern Apartment",
            price: "$320,000",
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
            host: {
              id: "host1",
              name: "John Smith",
              profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
              bio: "Experienced host with a passion for providing exceptional stays.",
              isVerified: true,
              createdAt: "2020-01-15",
              propertiesCount: 5,
            },
            averageRating: 4.8,
            reviewsCount: 24,
          },
          {
            id: "2",
            position: [27.695, 85.285] as [number, number],
            title: "Family Home with Garden",
            price: "$450,000",
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
            host: {
              id: "host2",
              name: "Sarah Johnson",
              profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
              bio: "I love sharing my beautiful properties with travelers from around the world.",
              isVerified: true,
              createdAt: "2021-03-22",
              propertiesCount: 3,
            },
            averageRating: 4.6,
            reviewsCount: 15,
          },
          {
            id: "3",
            position: [27.69, 85.29] as [number, number],
            title: "Luxury Penthouse",
            price: "$750,000",
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
            host: {
              id: "host3",
              name: "Michael Chen",
              profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
              bio: "Luxury property specialist with an eye for detail and comfort.",
              isVerified: true,
              createdAt: "2019-07-10",
              propertiesCount: 8,
            },
            averageRating: 4.9,
            reviewsCount: 37,
          },
        ];

        setProperties(sampleProperties);

        // Calculate map bounds based on properties
        if (sampleProperties.length > 0) {
          const latitudes = sampleProperties.map((p) => p.position[0]);
          const longitudes = sampleProperties.map((p) => p.position[1]);

          const minLat = Math.min(...latitudes) - 0.01;
          const maxLat = Math.max(...latitudes) + 0.01;
          const minLng = Math.min(...longitudes) - 0.01;
          const maxLng = Math.max(...longitudes) + 0.01;

          setMapBounds([
            [minLat, minLng],
            [maxLat, maxLng],
          ]);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getDashboardLink = () => {
    if (!user) return "/login";

    switch (user.role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "HOST":
        return "/host/dashboard";
      case "GUEST":
        return "/guest/dashboard";
      default:
        return "/";
    }
  };

  return (
    <div className="relative h-screen w-full">
      <SearchBar />
      <UserProfile />

      {/* Dashboard Button */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <Button
          asChild
          className="bg-white text-black hover:bg-gray-100 shadow-lg"
        >
          <Link href={getDashboardLink()} className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            {user ? "Dashboard" : "Sign In"}
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : null}

      {error && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-50 text-red-700 px-4 py-2 rounded-md shadow-md flex items-center z-50">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}

      <MapContainer
        bounds={mapBounds}
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
    </div>
  );
};

export default Map;
