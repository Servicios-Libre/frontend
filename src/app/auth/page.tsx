"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useEffect } from "react";

export default function AuthPage() {
  useEffect(() => {
    document.title = "Servicio Libre - Login"
    return () => {
      document.title = "Servicio Libre"
    }
  }, [])
  return <AuthForm />;
}
