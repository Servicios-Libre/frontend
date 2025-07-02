import { X } from "lucide-react"; // Icono de cerrar
import * as mp from "../../../public/svg/mp.svg";
import * as stripe from "../../../public/img/stripe.jpeg";
import Image from "next/image";

// Iconos mejorados con mejor diseño

export default function PremiumModal({
  open,
  onClose,
  onToStripe,
  onToMercadoPago,
}: {
  open: boolean;
  onClose: () => void;
  onToStripe: () => void;
  onToMercadoPago: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-blue-100 transform animate-in zoom-in-95 duration-300">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Hazte Premium!
          </h2>
          <p className="text-gray-600">Elige tu método de pago preferido</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Botón MercadoPago */}
          <button
            className="group flex items-center gap-4 px-6 py-5 rounded-xl border-2 border-blue-200 hover:border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            onClick={onToMercadoPago}
          >
            {/* Contenedor del icono con tamaño fijo */}
            <div className="flex items-center justify-center w-12 h-12 bg-[#129ee8] rounded-lg shadow-sm border border-blue-100 transform group-hover:scale-110 transition-transform duration-200">
              <Image
                className="w-8 h-8 object-contain transform scale-240 mt-6" // ← Scale manual
                src={mp || "/placeholder.svg"}
                alt="MercadoPago"
                width={32}
                height={32}
              />
            </div>

            <div className="flex-1 text-left">
              <span className="font-bold text-lg text-[#009ee3] block">
                Mercado Pago
              </span>
              <span className="text-sm text-gray-600">
                Pago seguro y rápido
              </span>
            </div>

            <div className="w-3 h-3 bg-[#009ee3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </button>

          {/* Botón Stripe */}
          <button
            className="group flex items-center gap-4 px-6 py-5 rounded-xl border-2 border-purple-200 hover:border-purple-400 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            onClick={onToStripe}
          >
            {/* Contenedor del icono con tamaño fijo */}
            <div className="flex items-center justify-center w-12 h-12 bg-[#635aff] rounded-lg shadow-sm border border-purple-100 transform group-hover:scale-110 transition-transform duration-200">
              <Image
                className="w-8 h-8 object-cover rounded-md"
                src={stripe || "/placeholder.svg"}
                alt="Stripe"
                width={32}
                height={32}
              />
            </div>

            <div className="flex-1 text-left">
              <span className="font-bold text-lg text-[#635bff] block">
                Stripe
              </span>
              <span className="text-sm text-gray-600">
                Tarjeta de crédito/débito
              </span>
            </div>

            <div className="w-3 h-3 bg-[#635bff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Pago 100% seguro y encriptado
          </p>
        </div>
      </div>
    </div>
  );
}
