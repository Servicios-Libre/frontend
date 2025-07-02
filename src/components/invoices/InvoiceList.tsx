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

  const [search, setSearch] = useState("");
  const [method, setMethod] = useState<"Todos" | "Stripe" | "MercadoPago">("Todos");
  const [year, setYear] = useState<"Todos" | string>("Todos");
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getInvoices({
          search,
          method: method !== "Todos" ? method : undefined,
          year: year !== "Todos" ? year : undefined,
          page,
          limit,
        });
        setInvoices(response.data);
        setTotal(response.total);
      } catch (err) {
        toast.error("Error al obtener facturas 😕");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, method, year, page]);

  const totalPaid = invoices
    .filter((i) => i.status === "Pagado")
    .reduce((acc, i) => acc + i.amount, 0);

  const uniqueYears = Array.from(new Set(invoices.map((i) => i.date.slice(0, 4))));
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <section className="space-y-10">
      <div className="bg-white border border-blue-100 rounded-xl p-6 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-blue-900">Resumen</h2>
          <p className="text-sm text-blue-700">
            Mostrando {invoices.length} factura{invoices.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm text-blue-800">Total pagado</span>
          <p className="text-2xl font-bold text-blue-900">${totalPaid.toFixed(2)}</p>
        </div>
      </div>

      <div className="text-black flex flex-wrap items-center gap-4 text-sm">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar por servicio, ID o fecha..."
          className="flex-1 min-w-[240px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-100"
        />

        <div className="flex items-center gap-2 flex-wrap">
          {["Todos", "Stripe", "MercadoPago"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMethod(m as typeof method);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-full font-medium transition ${
                method === m
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {m}
            </button>
          ))}

          <span className="border-l border-gray-300 h-5" />

          {["Todos", ...uniqueYears].map((y) => (
            <button
              key={y}
              onClick={() => {
                setYear(y as typeof year);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-full font-medium transition ${
                year === y
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-100 h-[180px] rounded-xl" />
          ))}
        </div>
      ) : invoices.length === 0 ? (
        <p className="text-center text-gray-600 text-sm">No se encontraron resultados 😕</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
            {invoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    pg === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {pg}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
