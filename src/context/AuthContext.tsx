"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api, User, LoginCredentials, RegisterData } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for token management
const saveToken = (token: string) => {
  localStorage.setItem("auth_token", token);
};

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

const removeToken = () => {
  localStorage.removeItem("auth_token");
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated when the app loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = getToken();
        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        const currentUser = await api.getCurrentUser(token);
        setUser(currentUser);
      } catch (error) {
        // User is not authenticated or token is invalid
        console.error("Authentication error:", error);
        removeToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, token } = await api.login(credentials);

      // Save token and user data
      saveToken(token);
      setUser(user);

      // Redirect based on user role
      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (user.role === "HOST") {
        router.push("/host/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, token } = await api.register(data);

      // Save token and user data
      saveToken(token);
      setUser(user);

      // Redirect to login after successful registration
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // No need to call API for logout with token-based auth
      // Just remove the token from local storage
      removeToken();
      setUser(null);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during logout");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
