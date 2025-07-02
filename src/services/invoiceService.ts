import axios from "axios";
import { Invoice } from "@/components/invoices/InvoiceCard";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/invoices`;

export const getInvoices = async ({
  search,
  method,
  year,
  page,
  limit = 6,
}: {
  search?: string;
  method?: string;
  year?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: Invoice[]; total: number }> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    params: {
      search,
      method,
      year,
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
