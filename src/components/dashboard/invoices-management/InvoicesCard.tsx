// components/dashboard/invoices-management/InvoiceCard.tsx
import Image from "next/image";
import Link from "next/link";

interface InvoiceCardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoice: any;
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
    const { externalReference, amount, createdAt, expiredAt, user, id } = invoice;
    const { name, email, user_pic, address_id } = user;

    return (
        <div className="bg-[#392AA9] text-white rounded-xl px-6 py-4 shadow-md w-full hover:shadow-lg transition flex flex-col gap-3 md:gap-4">
            {/* Encabezado */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                        <Image
                            src={user_pic || "/img/default-user.jpg"}
                            alt={name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <p className="text-base font-semibold leading-4">{name}</p>
                        <p className="text-sm text-indigo-200">{email}</p>
                    </div>
                </div>

                <div className="text-sm text-right md:text-left">
                    <p className="text-indigo-300 font-medium">Referencia</p>
                    <p className="font-mono text-sm">{externalReference}</p>
                </div>
            </div>

            {/* Línea separadora */}
            <div className="border-t border-dashed border-indigo-400" />

            <div className="flex flex-col gap-3 text-sm md:flex-row md:justify-between md:items-start md:gap-6">
                <div className="flex-1 flex md:items-center gap-2">
                    <p className="text-indigo-300 font-medium whitespace-nowrap">Fechas de validez:</p>
                    <p className="break-words">Creada: {createdAt} - Vence: {expiredAt}</p>
                </div>

                <div className="flex-1 flex md:items-center gap-2">
                    <p className="text-indigo-300 font-medium whitespace-nowrap">Dirección:</p>
                    <p className="break-words">
                        {address_id.street} {address_id.house_number}, {address_id.city}
                    </p>
                </div>
            </div>

            {/* Línea separadora */}
            <div className="border-t border-dashed border-indigo-400" />

            {/* Footer con monto y “Premium” */}
            <div className="flex justify-between items-end flex-wrap gap-3">
                <div>
                    <p className="text-indigo-300 font-medium text-sm">Monto total</p>
                    <p className="text-xl font-extrabold text-green-300">${amount} <span className="text-sm">ARS</span></p>
                </div>

                <Link href={`/admin/invoices/${id}`}>
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-yellow-900 font-bold text-sm px-4 py-1.5 rounded-md shadow-md hover:brightness-110 transition cursor-pointer inline-block">
                        Membresía premium
                    </span>
                </Link>
            </div>
        </div>
    );
}