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
  unreadCount: number;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

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
  const [unreadCount] = useState(0);

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
      // Solo actualizamos el estado si hay cambios
      if (token !== null) {
        localStorage.removeItem('token');
        setTokenState(null);
        setUser(null);
      }
    }
  };

  // Logout global: borra token local y cierra sesión NextAuth
  const logout = useCallback(() => {
    // 1. Limpia el token local SIEMPRE primero
    localStorage.removeItem('token');
    setTokenState(null);
    setUser(null);
    // 2. Luego llama a signOut (esto desmonta el árbol y redirige)
    signOut({ callbackUrl: "/landing" });
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading, setToken, logout, unreadCount }}>
      {children}
    </AuthContext.Provider>
  );
}