"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession, signOut } from "next-auth/react";

type UserRole = "user" | "worker" | "admin" | null;

interface JwtPayload {
  name?: string;
  email?: string;
  id?: string;
  role?: UserRole;
  tickets?: Array<{
    id: string;
    type: string;
    status: string;
  }>;
  image?: string;
}

interface AuthContextType {
  token: string | null;
  user: JwtPayload | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
  unreadCount: number;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount] = useState(0);

  const logout = useCallback(() => {
    setTokenState(null);
    setUser(null);
    signOut({ callbackUrl: "/landing" });
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user && session.backendJwt) {
      setUser(session.user as JwtPayload);
      setTokenState(session.backendJwt);
    } else {
      setUser(null);
      setTokenState(null);

      if (status === "authenticated") {
        logout();
      }
    }

    setLoading(false);
  }, [session, status, logout]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loading, setToken, logout, unreadCount }}
    >
      {children}
    </AuthContext.Provider>
  );
}
