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
        // Datos de ejemplo para desarrollo si falla la API  
        setInvoices([  
          {  
            id: 1,  
            externalReference: 'INV-001',  
            amount: 2500,  
            paymentMethod: 'tarjeta',  
            paymentType: 'credit',  
            createdAt: '2024-01-15T10:30:00Z',  
            expiredAt: '2024-02-15T10:30:00Z',  
            provider: 'stripe',  
            user: {  
              id: 'user1',  
              email: 'user@example.com',  
              name: 'Usuario Ejemplo',  
              premium: true,  
              created_at: '2024-01-01T00:00:00Z'  
            }  
          },  
          {  
            id: 2,  
            externalReference: 'INV-002',  
            amount: 1800,  
            paymentMethod: 'efectivo',  
            paymentType: 'cash',  
            createdAt: '2024-02-10T14:20:00Z',  
            expiredAt: '2024-03-10T14:20:00Z',  
            provider: 'mercado_pago',  
            user: {  
              id: 'user2',  
              email: 'user2@example.com',  
              name: 'Usuario Regular',  
              premium: false,  
              created_at: '2024-01-15T00:00:00Z'  
            }  
          }  
        ]);  
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