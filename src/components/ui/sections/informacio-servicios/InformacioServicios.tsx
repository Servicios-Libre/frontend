import InfoCard from "./InfoCard";
import {
    faGlobe,
    faLock,
    faIdBadge,
    faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
        <section>
            <div className="px-8 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">¿Por qué elegirnos?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <InfoCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}