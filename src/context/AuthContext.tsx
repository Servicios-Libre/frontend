"use client";
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";

interface JwtPayload {
  name?: string;
  email?: string;
  id?: string;
  role?: string;
  tickets?: [{
    id: string,
    type: string,
    status: string
  }];
}

interface AuthContextType {
  token: string | null;
  user: JwtPayload | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
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

  useEffect(() => {
    setLoading(false);
  }, []);

  const setToken = (newToken: string | null) => {
    console.log('setToken llamado con token:', newToken); // Log para debug
    if (newToken) {
      console.log('Guardando token en localStorage'); // Log para debug
      localStorage.setItem('token', newToken);
      setTokenState(newToken);
      try {
        const decoded = jwtDecode<JwtPayload>(newToken);
        console.log('Token decodificado:', decoded); // Log para debug
        setUser(decoded);
      } catch (error) {
        console.error('Error al decodificar token:', error);
        setUser(null);
      }
    } else {
      // Solo actualizamos el estado si hay cambios
      if (token !== null) {
        console.log('Borrando token del localStorage'); // Log para debug
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
    <AuthContext.Provider value={{ token, user, loading, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}