"use client";
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";

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
}

interface AuthContextType {
  token: string | null;
  user: JwtPayload | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Aquí la corrección importante:
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('token');
  }
  return null;
};

const getInitialUser = () => {
  const token = getInitialToken();
  if (token) {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }
  return null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(getInitialToken());
  const [user, setUser] = useState<JwtPayload | null>(getInitialUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setTokenState(newToken);
      try {
        const decoded = jwtDecode<JwtPayload>(newToken);
        setUser(decoded);
      } catch (error) {
        console.error('Error al decodificar token:', error);
        setUser(null);
      }
    } else {
      if (token !== null) {
        localStorage.removeItem('token');
        setTokenState(null);
        setUser(null);
      }
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setTokenState(null);
    setUser(null);
    signOut({ callbackUrl: "/landing" });
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}