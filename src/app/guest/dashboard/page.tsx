"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api, Property } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Heart, Search, MapPin, Loader2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface GuestDashboardData {
  bookings: Array<{
    id: number;
    checkIn: string;
    checkOut: string;
    status: string;
    totalPrice: number;
    property: {
      id: number;
      title: string;
      slug: string;
      address: string;
      city: string;
      country: string;
      images: Array<{
        id: number;
        url: string;
        isFeatured: boolean;
      }>;
    };
  }>;
  wishlist: Array<{
    id: number;
    property: Property;
  }>;
  recentlyViewed: Property[];
}

export default function GuestDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<GuestDashboardData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated or not a guest
    if (!authLoading && (!user || user.role !== "GUEST")) {
      router.push("/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch this data from your API
        // For now, we'll use mock data
        const mockData: GuestDashboardData = {
          bookings: [
            {
              id: 1,
              checkIn: "2023-12-20",
              checkOut: "2023-12-27",
              status: "confirmed",
              totalPrice: 1200,
              property: {
                id: 1,
                title: "Modern Apartment",
                slug: "modern-apartment",
                address: "123 Main St",
                city: "Kathmandu",
                country: "Nepal",
                images: [
                  {
                    id: 1,
                    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
                    isFeatured: true,
                  },
                ],
              },
            },
            {
              id: 2,
              checkIn: "2024-01-15",
              checkOut: "2024-01-20",
              status: "pending",
              totalPrice: 850,
              property: {
                id: 2,
                title: "Luxury Villa",
                slug: "luxury-villa",
                address: "456 Park Ave",
                city: "Kathmandu",
                country: "Nepal",
                images: [
                  {
                    id: 2,
                    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
                    isFeatured: true,
                  },
                ],
              },
            },
          ],
          wishlist: [
            {
              id: 1,
              property: {
                id: 3,
                title: "Cozy Cottage",
                slug: "cozy-cottage",
                description: "A beautiful cottage in a peaceful location",
                price: 150,
                listingType: "RENT",
                rentalPeriod: "DAY",
                bedrooms: 2,
                bathrooms: 1,
                area: 800,
                address: "789 Forest Rd",
                city: "Pokhara",
                country: "Nepal",
                latitude: 28.2096,
                longitude: 83.9856,
                isAvailable: true,
                createdAt: "2023-10-15",
                updatedAt: "2023-10-15",
                hostId: 2,
                categoryId: 3,
                propertyTypeId: 4,
                images: [
                  {
                    id: 3,
                    url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dGFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                    isFeatured: true,
                  },
                ],
                averageRating: 4.7,
                reviewsCount: 12,
              },
            },
          ],
          recentlyViewed: [
            {
              id: 4,
              title: "Mountain View Apartment",
              slug: "mountain-view-apartment",
              description: "Stunning views of the Himalayas",
              price: 200,
              listingType: "RENT",
              rentalPeriod: "DAY",
              bedrooms: 3,
              bathrooms: 2,
              area: 1200,
              address: "101 Mountain Rd",
              city: "Pokhara",
              country: "Nepal",
              latitude: 28.2135,
              longitude: 83.9762,
              isAvailable: true,
              createdAt: "2023-09-10",
              updatedAt: "2023-09-10",
              hostId: 3,
              categoryId: 1,
              propertyTypeId: 1,
              images: [
                {
                  id: 4,
                  url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
                  isFeatured: true,
                },
              ],
              averageRating: 4.9,
              reviewsCount: 28,
            },
          ],
        };

        setDashboardData(mockData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.role === "GUEST") {
      fetchDashboardData();
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Guest Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Button asChild>
          <Link href="/map" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Explore Map
          </Link>
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button
          variant="outline"
          className="h-auto py-6 flex flex-col items-center justify-center gap-2"
          asChild
        >
          <Link href="/properties">
            <Search className="h-6 w-6 mb-2" />
            <span className="text-lg font-medium">Find Properties</span>
            <span className="text-sm text-gray-500">
              Browse our selection of properties
            </span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-6 flex flex-col items-center justify-center gap-2"
          asChild
        >
          <Link href="/guest/bookings">
            <Calendar className="h-6 w-6 mb-2" />
            <span className="text-lg font-medium">My Bookings</span>
            <span className="text-sm text-gray-500">
              View and manage your bookings
            </span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-6 flex flex-col items-center justify-center gap-2"
          asChild
        >
          <Link href="/guest/wishlist">
            <Heart className="h-6 w-6 mb-2" />
            <span className="text-lg font-medium">My Wishlist</span>
            <span className="text-sm text-gray-500">
              Properties you've saved
            </span>
          </Link>
        </Button>
      </div>

      {/* Upcoming Bookings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardData?.bookings && dashboardData.bookings.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.bookings.map((booking) => (
                <div key={booking.id}>
                  <div className="flex gap-4">
                    <div className="w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={booking.property.images[0].url}
                        alt={booking.property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{booking.property.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {booking.property.address}, {booking.property.city},{" "}
                        {booking.property.country}
                      </p>
                      <p className="text-sm mt-1">
                        {new Date(booking.checkIn).toLocaleDateString()} to{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                        <span className="font-medium">
                          ${booking.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-3" />
                </div>
              ))}
              <div className="text-center mt-4">
                <Button variant="outline" asChild>
                  <Link href="/guest/bookings">View All Bookings</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No upcoming bookings found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wishlist */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardData?.wishlist && dashboardData.wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.wishlist.map(({ id, property }) => (
                <Link
                  key={id}
                  href={`/properties/${property.slug}`}
                  className="group"
                >
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 relative">
                      <Image
                        src={property.images?.[0]?.url || ""}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium truncate group-hover:text-blue-600">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.city}, {property.country}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm">
                            {property.averageRating} ({property.reviewsCount})
                          </span>
                        </div>
                        <span className="font-medium">
                          ${property.price}/night
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No properties in your wishlist
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recently Viewed */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Viewed</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardData?.recentlyViewed &&
          dashboardData.recentlyViewed.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.recentlyViewed.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.slug}`}
                  className="group"
                >
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 relative">
                      <Image
                        src={property.images?.[0]?.url || ""}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium truncate group-hover:text-blue-600">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.city}, {property.country}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm">
                            {property.averageRating} ({property.reviewsCount})
                          </span>
                        </div>
                        <span className="font-medium">
                          ${property.price}/night
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recently viewed properties
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
