// components/dashboard/invoices-management/InvoiceList.tsx
import InvoiceCard from "./InvoicesCard";

interface InvoiceListProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoices: any[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
    if (!invoices || invoices.length === 0) {
        return (
            <p className="text-center text-indigo-200 py-8">
                No hay facturas disponibles.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {invoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
        </div>
    );
}
