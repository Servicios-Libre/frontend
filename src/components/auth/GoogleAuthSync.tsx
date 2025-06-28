/* eslint-disable react-hooks/exhaustive-deps */
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
    if (status === "authenticated" && session?.backendJwt) {
      // Solo setear token si todavía no está
      if (auth?.token !== session.backendJwt) {
        localStorage.setItem("token", session.backendJwt);
        auth?.setToken?.(session.backendJwt);
      }
    }

    if (status === "unauthenticated") {
      localStorage.removeItem("token");
      auth?.setToken?.(null);
    }
  }, [status, session?.backendJwt]); // Simplificamos deps

  return null;
}
