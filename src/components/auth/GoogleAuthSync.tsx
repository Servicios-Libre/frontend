"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

type SessionWithBackendJwt = {
  backendJwt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default function GoogleAuthSync() {
  const { data: sessionRaw, status } = useSession();
  const session = sessionRaw as SessionWithBackendJwt;
  const auth = useAuth();

  useEffect(() => {
    // Si la sesión está autenticada y hay backendJwt, setea el token
    if (
      status === "authenticated" &&
      session?.backendJwt &&
      auth?.token !== session.backendJwt
    ) {
      localStorage.setItem("token", session.backendJwt);
      if (auth && auth.setToken) {
        auth.setToken(session.backendJwt);
      }
    }

    // Solo borramos el token si:
    // 1. La sesión está NO autenticada
    // 2. Y el token actual es un token de Google (tiene backendJwt)
    if (status === "unauthenticated" && session?.backendJwt) {
      localStorage.removeItem("token");
      if (auth && auth.setToken) {
        auth.setToken(null);
      }
    }
  }, [session?.backendJwt, status, auth?.token, auth]);

  return null;
}