import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/stripe/invoices/user`;

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
  console.log(token)

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
