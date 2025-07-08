"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Calendar,
  DollarSign,
  Users,
  PlusCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  properties: {
    total: number;
  };
  bookings: {
    total: number;
    pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
  revenue: {
    total: number;
  };
  recentBookings: Array<{
    id: number;
    checkIn: string;
    checkOut: string;
    status: string;
    totalPrice: number;
    property: {
      title: string;
      slug: string;
    };
    guest: {
      name: string;
      email: string;
    };
  }>;
}

export default function HostDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated or not a host
    if (!authLoading && (!user || user.role !== "HOST")) {
      router.push("/login");
      return;
    }

    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const data = await api.getHostDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.role === "HOST") {
      fetchDashboardStats();
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
          <h1 className="text-3xl font-bold">Host Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Button asChild>
          <Link href="/host/properties/new" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Property
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Home className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">
                {stats?.properties.total || 0}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">
                {stats?.bookings.total || 0}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-yellow-500 mr-2" />
              <div className="text-2xl font-bold">
                ${stats?.revenue.total.toLocaleString() || 0}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-500 mr-2" />
              <div className="text-2xl font-bold">
                {stats?.bookings.pending || 0}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Status Breakdown */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Booking Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Pending</span>
              <span className="text-xl font-semibold">
                {stats?.bookings.pending || 0}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Confirmed</span>
              <span className="text-xl font-semibold">
                {stats?.bookings.confirmed || 0}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Completed</span>
              <span className="text-xl font-semibold">
                {stats?.bookings.completed || 0}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Cancelled</span>
              <span className="text-xl font-semibold">
                {stats?.bookings.cancelled || 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.recentBookings && stats.recentBookings.length > 0 ? (
            <div className="space-y-4">
              {stats.recentBookings.map((booking) => (
                <div key={booking.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{booking.property.title}</h3>
                      <p className="text-sm text-gray-500">
                        {booking.guest.name} • {booking.guest.email}
                      </p>
                      <p className="text-sm">
                        {new Date(booking.checkIn).toLocaleDateString()} to{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                      <p className="font-medium mt-1">
                        ${booking.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                </div>
              ))}
              <div className="text-center mt-4">
                <Button variant="outline" asChild>
                  <Link href="/host/bookings">View All Bookings</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent bookings found
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href="/host/properties">Manage Your Properties</Link>
        </Button>
      </div>
    </div>
  );
}
