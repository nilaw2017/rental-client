"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { PropertyForm } from "@/components/PropertyForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Get token from localStorage
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // For now, we'll mock the API call since we don't have a real API endpoint for file uploads
      // In a real app, you would send the FormData directly to the API

      // Extract basic property data from FormData
      const propertyData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        address: formData.get("address") as string,
        bedrooms: Number(formData.get("bedrooms")),
        bathrooms: Number(formData.get("bathrooms")),
        area: Number(formData.get("area")),
        propertyType: formData.get("propertyType") as string,
        hostId: user?.id,
        // In a real app, you would handle image uploads and get URLs back from the server
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        ],
      };

      // Call API to create property
      await api.createProperty(token, propertyData);

      // Redirect to properties list
      router.push("/host/properties");
    } catch (err) {
      console.error("Error creating property:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create property. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect if not authenticated or not a host
  if (!authLoading && (!user || user.role !== "HOST")) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/host/properties" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add New Property</h1>
        <p className="text-gray-500 mt-1">
          Fill in the details below to list your property on our platform.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <PropertyForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </div>
    </div>
  );
}
