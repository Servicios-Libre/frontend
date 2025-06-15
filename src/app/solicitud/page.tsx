import { ServiceForm } from '@/components/solicitudservices/ServiceForm';

const workerId = '90bce984-2800-4975-aff4-2c382d0acdce'; // Simulado

export default function SolicitudPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ServiceForm workerId={workerId} />
    </main>
  );
}
