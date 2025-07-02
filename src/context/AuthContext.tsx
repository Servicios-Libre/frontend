/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession, signOut } from "next-auth/react";
import { fetchUserChats } from "@/services/chat/chatService";

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
  userName: string;                     // 👈 NUEVO
  setUserName: (name: string) => void; // 👈 NUEVO
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
  const [userName, setUserName] = useState<string>(""); // 👈 NUEVO
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const logout = useCallback(() => {
    setTokenState(null);
    setUser(null);
    setUserName(""); // 👈 Limpiar nombre también al salir
    signOut({ callbackUrl: "/landing" });
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user && session.backendJwt) {
      setUser(session.user as JwtPayload);
      setTokenState(session.backendJwt);
      setUserName(session.user.name ?? ""); // 👈 Asignar nombre del token
    } else {
      setUser(null);
      setTokenState(null);
      setUserName(""); // 👈 Reiniciar si no hay sesión

      if (status === "authenticated") {
        logout();
      }
    }

    setLoading(false);
  }, [session, status, logout]);

  useEffect(() => {
    if (!token || !user?.id) return;

    const fetchUnreadMessages = async () => {
      try {
        const chats = await fetchUserChats();

        if (!Array.isArray(chats)) {
          setUnreadCount(0);
          return;
        }

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
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        setToken,
        logout,
        unreadCount,
        userName,     // 👈 Exportar el nombre
        setUserName,  // 👈 Exportar setter
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
