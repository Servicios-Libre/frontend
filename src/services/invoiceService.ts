import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/invoices/worker`;

export const getInvoices = async ({
  provider,
  page,
  limit = 6,
}: {
  search?: string;
  provider?: string;
  page?: number;
  limit?: number;
}) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    params: {
      provider,
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const downloadInvoicePdf = async (invoiceId: string) => {
  const token = localStorage.getItem("token");
  const pdfUrl = `${API_URL}/${invoiceId}/pdf`;

  window.open(`${pdfUrl}?token=${token}`, "_blank");
};

import { useState, useEffect } from 'react';  
import api from '@/services/axiosConfig';  
  
export interface Invoice {  
  id: number;  
  externalReference: string;  
  amount: number;  
  paymentMethod: string;  
  paymentType: string;  
  createdAt: string;  
  expiredAt: string;  
  provider: 'mercado_pago' | 'stripe';  
  user: {  
    id: string;  
    email: string;  
    name: string;  
    premium: boolean;  
    created_at: string;  
  };  
}  
  
export interface InvoicesResponse {  
  invoices: Invoice[];  
  total: number;  
  totalPages: number;  
  currentPage: number;  
  limit: number;  
}  
  
export const useInvoiceData = () => {  
  const [invoices, setInvoices] = useState<Invoice[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  
  useEffect(() => {  
    const loadInvoices = async () => {  
      try {  
        setLoading(true);  
        const response = await api.get('/stripe/invoices?page=1&limit=100');  
        setInvoices(response.data.invoices || []);  
      } catch (err) {  
        setError('Error al cargar facturas');  
        console.error('Error loading invoices:', err);  
        // Datos de ejemplo para desarrollo  
        setInvoices([]);  
      } finally {  
        setLoading(false);  
      }  
    };  
  
    loadInvoices();  
  }, []);  
  
  const processRevenueData = () => {  
    if (!invoices.length) {  
      return {  
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],  
        revenue: [1200, 1900, 3000, 5000, 2000, 3000]  
      };  
    }  
  
    const monthlyRevenue = invoices.reduce((acc, invoice) => {  
      const month = new Date(invoice.createdAt).toLocaleDateString('es-ES', {   
        year: 'numeric',   
        month: 'short'   
      });  
      acc[month] = (acc[month] || 0) + invoice.amount;  
      return acc;  
    }, {} as Record<string, number>);  
  
    return {  
      months: Object.keys(monthlyRevenue),  
      revenue: Object.values(monthlyRevenue)  
    };  
  };  
  
  const processPaymentMethods = () => {  
    if (!invoices.length) {  
      return [  
        { name: 'MercadoPago - Tarjeta', value: 35 },  
        { name: 'Stripe - Tarjeta', value: 25 },  
        { name: 'MercadoPago - Efectivo', value: 20 },  
        { name: 'Stripe - Transferencia', value: 20 }  
      ];  
    }  
  
    const methods = invoices.reduce((acc, invoice) => {  
      const key = `${invoice.provider} - ${invoice.paymentMethod}`;  
      acc[key] = (acc[key] || 0) + 1;  
      return acc;  
    }, {} as Record<string, number>);  
  
    return Object.entries(methods).map(([name, value]) => ({ name, value }));  
  };  
  
  const processPremiumAnalysis = () => {  
    if (!invoices.length) {  
      return { premiumRevenue: 15000, regularRevenue: 8500 };  
    }  
  
    const premiumRevenue = invoices  
      .filter(inv => inv.user.premium)  
      .reduce((sum, inv) => sum + inv.amount, 0);  
      
    const regularRevenue = invoices  
      .filter(inv => !inv.user.premium)  
      .reduce((sum, inv) => sum + inv.amount, 0);  
  
    return { premiumRevenue, regularRevenue };  
  };  
  
  return {   
    invoices,   
    loading,   
    error,  
    processRevenueData,   
    processPaymentMethods,  
    processPremiumAnalysis  
  };  
};