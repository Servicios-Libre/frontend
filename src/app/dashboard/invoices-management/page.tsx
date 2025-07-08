"use client";

import { useEffect, useState } from "react";
import { fetchInvoices } from "@/services/dashboard/invoicesService";
import InvoiceList from "@/components/dashboard/invoices-management/InvoiceList";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { FaTools } from "react-icons/fa";
import Pagination from "@/components/ui/Pagination";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user: authUser } = useAuth();
  const [year, setYear] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const [totalInvoices, setTotalInvoices] = useState(0);

  const isAdmin = authUser?.role === "admin";

  useEffect(() => {
    document.title = "Servicio Libre - Facturas";
  }, []);

  useEffect(() => {
    setPage(1);
  }, [year]);

  useEffect(() => {
    const loadInvoices = async () => {
      setLoading(true);
      try {
        const data = await fetchInvoices({
          provider: undefined,
          year: year || "",
          page,
          limit,
        });
        setInvoices(data.invoices || []);
        setTotalInvoices(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error al obtener facturas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInvoices();
  }, [page, year]);

  if (!authUser) return <LoadingScreen />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-indigo-950">
        <h2>No tienes permiso para acceder a esta página.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#1A1443] text-white">

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

      <main className="flex-1 p-6 sm:p-6 ">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaTools className="text-indigo-400" />
            Gestión de tickets
          </h1>
          <p className="text-indigo-300 mt-1 text-sm font-medium">
            Total de facturas: {totalInvoices}
          </p>
        </div>

        <div className="flex items-center justify-end mb-4">
          <label htmlFor="year" className="mr-2 text-indigo-300 text-sm">
            Filtrar por año:
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            className="bg-indigo-800 text-white border border-indigo-400 rounded px-3 py-1 text-sm focus:outline-none"
          >
            <option value="">-- Selecciona año --</option>
            {[2025, 2024, 2023].map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-[#29226D] rounded-xl p-6 shadow-lg">
          {loading ? (
            <p className="text-indigo-300 text-center">Cargando facturas...</p>
          ) : (
            <>
              <InvoiceList invoices={invoices} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
