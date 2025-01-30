"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@repo/db/client";

interface UserSessionContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const UserSessionContext = createContext<UserSessionContextType | undefined>(
  undefined
);

export function UserSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSession = async () => {
    try {
      const response = await axios.get("http://localhost:3000/session-info", {
        withCredentials: true,
      });
      setUser(response.data?.user || null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.warn("User is not authenticated. No active session.");
          return null; // Return null to indicate no session
        } else {
          console.error("Error fetching session:", error);
        }
      } else {
        console.error("Unknown error:", error);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      router.refresh(); // Refresh page to update state everywhere
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <UserSessionContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  const context = useContext(UserSessionContext);
  if (!context) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
}
