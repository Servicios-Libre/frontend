import { InvoiceList } from "@/components/invoices/InvoiceList";
import { HiOutlineDocumentReport } from "react-icons/hi";

const InvoicesPage = () => {
  return (
    <main className="relative min-h-screen pt-32 pb-40 px-6 sm:px-10 lg:px-32 bg-gradient-to-br from-[#eaf2fb] via-white to-[#eaf2fb]">
      {/* Textura decorativa */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_70%)] pointer-events-none opacity-40 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-100 text-blue-700 p-3 rounded-xl shadow-sm">
            <HiOutlineDocumentReport className="text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
              Facturación
            </h1>
            <p className="text-sm text-blue-700">
              Historial completo de tus transacciones dentro de la plataforma.
            </p>
          </div>
        </div>

        <InvoiceList />
      </div>
    </main>
  );
};

export default InvoicesPage;
