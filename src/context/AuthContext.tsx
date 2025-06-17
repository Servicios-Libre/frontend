"use client";
import { createContext, useContext, useState } from 'react';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  name?: string;
  email?: string;
}

interface AuthContextType {
  token: string | null;
  user: JwtPayload | null;
  loading: boolean;
  setToken: (token: string | null, userData?: JwtPayload) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  loading: false,
  setToken: () => { },
  logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

// Funciones para obtener el token y el usuario antes del primer render
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
  const [loading] = useState(false);

  const setToken = (newToken: string | null, userData?: JwtPayload) => {
    console.log()
    if (newToken) {
      localStorage.setItem('token', newToken);
      setTokenState(newToken);
      if (userData) {
        setUser(userData);
      } else {
        setUser(jwtDecode<JwtPayload>(newToken));
      }
    } else {
      localStorage.removeItem('token');
      setTokenState(null);
      setUser(null);
    }
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, user, loading, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}