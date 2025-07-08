"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Heart,
  Share2,
  Star,
  Calendar,
  Badge,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Host {
  id: string;
  name: string;
  profileImage?: string;
  bio?: string;
  isVerified: boolean;
  createdAt: string;
  propertiesCount: number;
}

interface PropertyBase {
  id: string;
  title: string;
  price: string;
  address: string;
  description: string;
  images: string[];
  host?: Host;
  averageRating?: number;
  reviewsCount?: number;
}

interface Property extends PropertyBase {
  bedrooms: number | undefined;
  bathrooms: number | undefined;
  area: string;
}

interface PropertyDetailProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PropertyDetail({
  property,
  isOpen,
  onClose,
}: PropertyDetailProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!property) return null;

  // Format date to show how long the host has been on the platform
  const getHostJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const suggestedProperties = [
    {
      id: "prop1",
      title: "Modern Apartment",
      price: "$250,000",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "prop2",
      title: "Luxury Villa",
      price: "$750,000",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "prop3",
      title: "Cozy Cottage",
      price: "$175,000",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dGFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl">{property.title}</SheetTitle>
          <SheetDescription className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {property.address}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="relative rounded-lg overflow-hidden h-64">
            <Image
              src={property.images[activeImage]}
              alt={property.title}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {property.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-2 h-2 rounded-full ${
                    activeImage === idx ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">{property.price}</h3>
              <p className="text-sm text-gray-500">
                {property.bedrooms !== undefined
                  ? `${property.bedrooms} bd | `
                  : ""}
                {property.bathrooms !== undefined
                  ? `${property.bathrooms} ba | `
                  : ""}
                {property.area}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Ratings */}
          {property.averageRating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
              <span className="font-medium">{property.averageRating}</span>
              <span className="text-sm text-gray-500 ml-1">
                ({property.reviewsCount} reviews)
              </span>
            </div>
          )}

          {/* Host Information */}
          {property.host && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  {property.host.profileImage ? (
                    <AvatarImage
                      src={property.host.profileImage}
                      alt={property.host.name}
                    />
                  ) : (
                    <AvatarFallback>
                      {property.host.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{property.host.name}</h4>
                    {property.host.isVerified && (
                      <UIBadge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        <Badge className="h-3 w-3 mr-1" /> Verified
                      </UIBadge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Joined{" "}
                    {getHostJoinDate(property.host.createdAt)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {property.host.propertiesCount} properties
                  </p>
                </div>
              </div>
              {property.host.bio && (
                <p className="text-sm mt-2 text-gray-600">
                  {property.host.bio}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-gray-600">{property.description}</p>
          </div>

          <Separator />

          {/* Contact */}
          <Button className="w-full flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" />
            Contact Host
          </Button>

          {/* Suggested Properties */}
          <div className="pt-6 border-t">
            <h4 className="font-medium mb-3">Similar Properties</h4>
            <div className="grid grid-cols-3 gap-2">
              {suggestedProperties.map((prop) => (
                <Card
                  key={prop.id}
                  className="overflow-hidden border-0 shadow-sm"
                >
                  <div className="h-24 overflow-hidden">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
                    />
                  </div>
                  <CardContent className="p-2">
                    <p className="font-medium text-xs truncate">{prop.title}</p>
                    <p className="text-xs text-gray-600">{prop.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
