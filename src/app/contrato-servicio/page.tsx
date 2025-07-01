"use client"

import ServiceContractForm from "@/components/contrato-servicio/ServiceContractForm";
import { useEffect } from "react";

export default function ContratoServicioPage() {
  useEffect(() => {
    document.title = "Servicio Libre - Contratar servicio"
  }, [])
  return (
    <main className="min-h-screen bg-gray-100 py-20 px-4">
      <ServiceContractForm />
    </main>
  );
}