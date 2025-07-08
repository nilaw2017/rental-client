// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  formattedPrice: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  formattedArea: string;
  images: string[];
  amenities: string[];
  propertyType: string;
  hostId: string;
  host?: Host;
  createdAt: string;
  updatedAt: string;
  averageRating?: number;
  reviewsCount?: number;
}

export interface Host {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  isVerified: boolean;
  createdAt: string;
  propertiesCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "HOST" | "GUEST";
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "HOST" | "GUEST";
  phone?: string;
}

export interface BookingData {
  id: string;
  propertyId: string;
  property?: Property;
  guestId: string;
  guest?: User;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
}

export interface HostDashboardData {
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  bookingsByStatus: {
    pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
  recentBookings: BookingData[];
}

export interface GuestDashboardData {
  upcomingBookings: BookingData[];
  wishlist: Property[];
  recentlyViewed: Property[];
}

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || response.statusText);
  }
  return response.json();
};

// API methods
export const api = {
  // Auth
  login: async (
    credentials: LoginCredentials,
  ): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (
    data: RegisterData,
  ): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  checkEmailExists: async (email: string): Promise<{ exists: boolean }> => {
    const response = await fetch(`${API_URL}/auth/check-email/${email}`);
    return handleResponse(response);
  },

  // User
  getCurrentUser: async (token: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  updateUserProfile: async (
    token: string,
    data: Partial<User>,
  ): Promise<User> => {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Properties
  getProperties: async (
    filters?: Record<string, string | number | boolean>,
  ): Promise<Property[]> => {
    const queryParams = filters
      ? new URLSearchParams(
          Object.entries(filters).map(([key, value]) => [key, String(value)]),
        )
      : "";
    const url = `${API_URL}/properties${queryParams ? `?${queryParams}` : ""}`;

    const response = await fetch(url);
    return handleResponse(response);
  },

  getProperty: async (id: string): Promise<Property> => {
    const response = await fetch(`${API_URL}/properties/${id}`);
    return handleResponse(response);
  },

  createProperty: async (
    token: string,
    data: Partial<Property>,
  ): Promise<Property> => {
    const response = await fetch(`${API_URL}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateProperty: async (
    token: string,
    id: string,
    data: Partial<Property>,
  ): Promise<Property> => {
    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteProperty: async (token: string, id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // Bookings
  getHostBookings: async (token: string): Promise<BookingData[]> => {
    const response = await fetch(`${API_URL}/host/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getGuestBookings: async (token: string): Promise<BookingData[]> => {
    const response = await fetch(`${API_URL}/guest/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  createBooking: async (
    token: string,
    data: Partial<BookingData>,
  ): Promise<BookingData> => {
    const response = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateBookingStatus: async (
    token: string,
    id: string,
    status: BookingData["status"],
  ): Promise<BookingData> => {
    const response = await fetch(`${API_URL}/bookings/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  // Dashboard
  getHostDashboardData: async (token: string): Promise<HostDashboardData> => {
    const response = await fetch(`${API_URL}/host/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getGuestDashboardData: async (token: string): Promise<GuestDashboardData> => {
    const response = await fetch(`${API_URL}/guest/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};
