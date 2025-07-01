import { ServiceForm } from "@/components/solicitudservices/ServiceForm";
import { useEffect } from "react";

export default function SolicitudPage() {
  useEffect(() => {
    document.title = "Servicio Libre - Crear servicio";
  }, []);
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ServiceForm />
    </main>
  );
}
