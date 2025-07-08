"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Real Estate Rental System
        </h1>
        <p className="text-lg mb-8">
          Find your perfect home, apartment, or vacation rental
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  Welcome back, {user.name}!
                </h2>
                <p className="mb-4">You are logged in as: {user.role}</p>

                <div className="flex flex-col gap-2">
                  {user.role === "ADMIN" && (
                    <Button asChild>
                      <Link href="/admin/dashboard">Go to Admin Dashboard</Link>
                    </Button>
                  )}

                  {user.role === "HOST" && (
                    <Button asChild>
                      <Link href="/host/dashboard">Manage Your Properties</Link>
                    </Button>
                  )}

                  <Button asChild>
                    <Link href="/properties">Browse Properties</Link>
                  </Button>

                  <Button variant="outline" onClick={logout}>
                    Sign Out
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Button asChild size="lg" className="px-8">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8">
                <Link href="/register">Create Account</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
