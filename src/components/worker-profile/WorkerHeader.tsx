import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

interface Props {
  user: {
    name: string;
    user_pic: string;
    bio?: string;
    location?: string;
    phone?: string;
    email: string;
    // NO agrego propiedades para redes sociales ni isOnline
  };
}

export default function WorkerHeader({ user }: Props) {
  // Siempre online para no romper lo que tenías
  const online = true;

  return (
    <div className="flex flex-col items-center gap-6 text-left text-blue-100 px-4 sm:px-0 max-w-sm mx-auto">
      {/* Foto */}
      <div
        className={`w-28 h-28 relative rounded-full overflow-hidden border-4 shadow-lg ${
          online ? 'border-green-400' : 'border-gray-400'
        }`}
      >
        <Image
          src={user.user_pic}
          alt={user.name}
          fill
          className="object-cover"
          sizes="112px"
          priority
        />
      </div>

      {/* Estado de conexión */}
      <div className="flex items-center gap-2 text-base sm:text-sm">
        <span
          className={`h-4 w-4 rounded-full ${
            online ? 'bg-green-400' : 'bg-gray-400'
          }`}
          aria-label={online ? 'En línea' : 'Inactivo'}
          role="status"
        />
        <span className="sm:inline">{online ? 'En línea' : 'Inactivo'}</span>
      </div>

      {/* Nombre y correo */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-2xl font-bold text-white">{user.name}</h1>
        <p className="text-base sm:text-sm text-blue-200">{user.email}</p>
      </div>

      {/* Bio */}
      <div className="w-full space-y-4 hidden sm:flex">
        <hr className="border-t border-white/30" />
        <p className="text-base sm:text-sm leading-relaxed text-center text-blue-100">
          Apasionado por el desarrollo web y la tecnología. Me gusta ayudar a otros a crear su presencia digital de forma efectiva y profesional.
        </p>
        <hr className="border-t border-white/30" />
      </div>

      {/* Información adicional */}
      <ul className="text-base sm:text-sm flex flex-col gap-2 w-full max-w-xs mx-auto text-center">
        <li>
          <span className="font-semibold text-white">📍 Ubicación:</span>{" "}
          Córdoba, Argentina
        </li>
        <li>
          <span className="font-semibold text-white">📞 Teléfono:</span>{" "}
          +54 9 351 123-4567
        </li>
      </ul>

      {/* Redes sociales */}
      <div className="w-full max-w-xs mx-auto">
        <h3 className="text-base sm:text-sm font-semibold text-blue-200 mb-2 text-center sm:text-start">
          Redes sociales
        </h3>
        <ul className="flex justify-center sm:flex-col sm:items-start gap-4 sm:gap-2 text-white">
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="xl" />
              <span className="hidden sm:inline">@juanperez</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} size="xl" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} size="xl" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              aria-label="WhatsApp"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="xl" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
