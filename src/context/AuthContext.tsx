/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token || !user?.id) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/inbox`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al obtener chats");

        const chats = await res.json();

        const unread = chats.reduce((count: number, chat: any) => {
          if (
            chat.lastMessage &&
            chat.lastMessage.isRead === false &&
            chat.lastMessage.senderId !== user.id
          ) {
            return count + 1;
          }
          return count;
        }, 0);

        setUnreadCount(unread);
      } catch (err) {
        console.error("Error contando mensajes no leídos:", err);
        setUnreadCount(0);
      }
    };

    fetchUnreadMessages();
  }, [token, user]);

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
    <AuthContext.Provider value={{ token, user, loading, setToken, logout, unreadCount }}>
      {children}
    </AuthContext.Provider>
  );
}
