// services/invoiceService.ts
import axiosConfig from "@/services/axiosConfig";

export const fetchInvoices = async (params: {
  provider: string | undefined;
  year: string;
  page: number;
  limit: number;
}) => {
  const { provider, year, page, limit } = params;

  const response = await axiosConfig.get("/stripe/invoices", {
    params: {
      provider,
      year,
      page,
      limit,
    },
  });

  return response.data;
};
