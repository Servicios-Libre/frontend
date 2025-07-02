import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { User } from "@/types";

interface Props {
  user: User;
}

export default function WorkerHeader({ user }: Props) {
  const online = true;

  return (
    <div className="flex flex-col items-center gap-6 text-left text-blue-100 px-4 sm:px-0 max-w-sm mx-auto">
      {/* Foto */}
      <div
        className={`w-28 h-28 relative rounded-full overflow-hidden border-4 shadow-lg ${online ? 'border-green-400' : 'border-gray-400'
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
          className={`h-4 w-4 rounded-full ${online ? 'bg-green-400' : 'bg-gray-400'
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
          {user.description}
        </p>
        <hr className="border-t border-white/30" />
      </div>

      {/* Información adicional */}
      <ul className="text-base sm:text-sm flex flex-col gap-2 w-full max-w-xs mx-auto text-center">
        {user.address && (
          <li>
            <span className="font-semibold text-white">📍 Ubicación:</span>{" "}
            {`${user.address.street} ${user.address.house_number || ""}, ${user.address.city}, ${user.address.state}`}
          </li>
        )}
        <li>
          <span className="font-semibold text-white">📞 Teléfono:</span>{" "}
          {user.phone}
        </li>
      </ul>

      {/* Redes sociales */}
      {user.social && Object.values(user.social).some((v) => v) && (
        <div className="w-full max-w-xs mx-auto">
          <h3 className="text-base sm:text-sm font-semibold text-blue-200 mb-2 text-center sm:text-start">
            Redes sociales
          </h3>
          <ul className="flex justify-center sm:flex-col sm:items-start gap-4 sm:gap-2 text-white">
            {user.social.instagram && (
              <li>
                <a
                  href={user.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all bg-white/10 hover:bg-white/20 text-white"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} size="xl" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>
              </li>
            )}
            {user.social.facebook && (
              <li>
                <a
                  href={user.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all bg-white/10 hover:bg-white/20 text-white"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} size="xl" />
                  <span className="hidden sm:inline">Facebook</span>
                </a>
              </li>
            )}
            {user.social.linkedin && (
              <li>
                <a
                  href={user.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all bg-white/10 hover:bg-white/20 text-white"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="xl" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              </li>
            )}
            {user.social.x && (
              <li>
                <a
                  href={user.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all bg-white/10 hover:bg-white/20 text-white"
                  aria-label="X (Twitter)"
                >
                  <FontAwesomeIcon icon={faXTwitter} size="xl" />
                  <span className="hidden sm:inline">X (Twitter)</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

    </div>
  );
}
