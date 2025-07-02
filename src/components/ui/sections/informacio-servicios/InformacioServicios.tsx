import InfoCard from "./InfoCard";
import {
    faGlobe,
    faLock,
    faIdBadge,
    faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";


export default function InformacionServicios() {

    const cards = [
        {
            icon: <FontAwesomeIcon icon={faGlobe} />,
            title: "Visibilidad global",
            description:
                "Tu perfil estará disponible para miles de personas en todo el mundo. Ofrecé tus servicios sin fronteras y conectá con clientes que buscan tu talento.",
        },
        {
            icon: <FontAwesomeIcon icon={faLock} />,
            title: "Seguridad",
            description:
                "Protegemos tu información personal y cada transacción que realices. Nuestra plataforma está diseñada para brindarte tranquilidad.",
        },
        {
            icon: <FontAwesomeIcon icon={faIdBadge} />,
            title: "Perfil profesional",
            description:
                "Mostrá quién sos y qué hacés. Creá un perfil atractivo, con tu experiencia, precios y ejemplos de trabajos anteriores para ganar confianza.",
        },
        {
            icon: <FontAwesomeIcon icon={faClipboardList} />,
            title: "Gestión fácil",
            description:
                "Organizá tus servicios, pedidos y entregas desde un mismo lugar. Todo lo que necesitás para trabajar de forma clara y ordenada.",
        },
    ];

    return (
         <section className="py-16 -mt-10 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Formas geométricas decorativas */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-lg rotate-45"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-200/40 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300/20 rounded-lg rotate-12"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-100/50 rounded-full"></div>

        <div className="px-8 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center mb-16">
            <div className="flex gap-1 items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-bold text-sm mb-6 shadow-lg">
                <FaStar />
               Ventajas exclusivas
            </div>
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">¿Por qué elegirnos?</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <InfoCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}