/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { getInvoices } from "@/services/invoiceService";
import { InvoiceCard, Invoice } from "./InvoiceCard";
import toast from "react-hot-toast";

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [provider, setProvider] = useState<undefined | "stripe" | "mercado_pago">(undefined);
  const [page, setPage] = useState(1);
  const [totalPaid, setTotalPaid] = useState<number>(0)
  const limit = 6;

  useEffect(() => {
   const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getInvoices({
          provider,
          page
        });
        setInvoices(response.invoices);
        setTotalPaid(
          Array.isArray(response.invoices)
            ? response.invoices.reduce((acc: number, i: Invoice) => acc + Number(i.amount || 0), 0)
            : 0
        );
        setTotal(response.total);
      } catch (err) {
        toast.error("Error al obtener facturas 😕");
      } finally {
        setLoading(false);
      }
    };
    fetchData()
  }, [provider, page]);


  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <section className="space-y-8 relative">
  {/* Elementos decorativos de fondo */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 -z-10"></div>

  {/* Tarjeta de resumen mejorada */}
  <div className="bg-gradient-to-br from-white to-blue-50/50 border border-blue-200/60 rounded-2xl p-8 flex justify-between items-center shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
    {/* Efecto de brillo sutil */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        <h2 className="text-2xl font-bold text-blue-900">Resumen</h2>
      </div>
      <p className="text-blue-700 font-medium">
        Mostrando {invoices ? invoices.length : "0"} factura{invoices && invoices.length === 1 ? "" : "s"}
      </p>
    </div>

    <div className="text-right relative z-10">
      <div className="flex items-center gap-2 justify-end mb-1">
        <span className="text-blue-800 font-semibold">Total pagado</span>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <p className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">
        ${Number(totalPaid).toFixed(2)}
      </p>
    </div>
  </div>

  {/* Filtros mejorados */}
  <div className="flex flex-wrap items-center gap-4">
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-gray-700 font-semibold text-sm">Filtrar por:</span>
      {["Todos", "Stripe", "Mercado Pago"].map((m, index) => (
        <button
          key={m}
          onClick={() => {
            setProvider(() => {
              if (m === "Todos") {
                return undefined
              } else if (m === "Stripe"){
                return "stripe"
              } else if (m === "Mercado Pago") {
                return "mercado_pago"
              }
            });
            setPage(1);
          }}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
            (provider === undefined && m === "Todos") ||
            (provider === "stripe" && m === "Stripe") ||
            (provider === "mercado_pago" && m === "Mercado Pago")
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-500/25"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {m}
        </button>
      ))}

      {/* Separador decorativo */}
      <div className="flex items-center gap-2 ml-2">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full"></div>
        <span className="text-xs text-gray-500 font-medium">Resultados</span>
      </div>
    </div>
  </div>

  {loading ? (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(limit)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gradient-to-br from-slate-100 to-slate-200 h-[200px] rounded-2xl shadow-lg"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  ) : !invoices ? (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">😕</span>
      </div>
      <p className="text-gray-600 text-lg font-medium">No se encontraron resultados</p>
      <p className="text-gray-500 text-sm mt-2">Intenta ajustar los filtros o verifica tu conexión</p>
    </div>
  ) : (
    <>
      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
        {invoices.map((invoice, index) => (
          <div
            key={invoice.id}
            className="transform transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <InvoiceCard invoice={invoice} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12 pt-8 border-t border-gray-200">
          <span className="text-sm text-gray-600 font-medium mr-4">
            Página {page} de {totalPages}
          </span>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-110 ${
                  pg === page
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md"
                }`}
              >
                {pg}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )}
</section>
  );
};
