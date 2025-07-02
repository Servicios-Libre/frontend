import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { User } from "@/types";
import { Crown, Star } from "lucide-react";

interface Props {
  user: User;
}

export default function WorkerHeader({ user }: Props) {
  console.log(user.address)
  return (
    <div className="flex flex-col items-center gap-6 text-left text-blue-100 px-4 sm:px-0 max-w-sm mx-auto">
      {/* Foto */}
      <div
        className={`w-28 h-28 relative rounded-full ${
          user.premium && "border-amber-200"
        } overflow-hidden border-4 shadow-lg`}
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

      <div
        className={`inline-flex items-center gap-2 ${
          user.premium
            ? "bg-white/10 backdrop-blur-sm border-white/20 "
            : "bg-amber-400 text-orange-300"
        }  rounded-lg px-3 py-2 border`}
      >
        <Star className="w-4 h-4 fill-yellow-400 text-amber-950" />
        <span
          className={`font-bold ${
            user.premium ? "text-black" : "text-white"
          } text-sm`}
        >
          {Math.round(user.rate!)}
        </span>
      </div>

      {/* Nombre y correo */}
      <div className="text-center">
        <h1
          className={`text-3xl sm:text-2xl font-bold ${
            user.premium ? "text-amber-950" : "text-white"
          }  flex gap-0.5`}
        >
          {user.premium && <Crown />}
          {user.name}
        </h1>
        <p
          className={`text-base sm:text-sm ${
            user.premium ? "text-amber-900" : "text-blue-200"
          }`}
        >
          {user.email}
        </p>
      </div>

      {/* Bio */}
      <div className="w-full space-y-4 hidden sm:flex">
        <hr className="border-t border-white/30" />
        <p
          className={`text-base sm:text-sm leading-relaxed text-center ${
            user.premium ? "text-amber-900" : "text-blue-200"
          }`}
        >
          {user.description}
        </p>
        <hr className="border-t border-white/30" />
      </div>

      {/* Información adicional */}
      <ul className="text-base sm:text-sm flex flex-col gap-2 w-full max-w-xs mx-auto text-center">
        {user.address && (
          <li
            className={`font-normal ${
              user.premium ? "text-amber-900" : "text-white"
            }`}
          >
            <span
              className={`font-semibold ${
                user.premium ? "text-amber-950" : "text-white"
              }`}
            >
              📍 Ubicación:
            </span>{" "}
            {`${user.address.street} ${user.address.house_number || ""}, ${
              user.address.city
            }, ${user.address.state}`}
          </li>
        )}
        <li
          className={`font-normal ${
            user.premium ? "text-amber-900" : "text-white"
          }`}
        >
          <span
            className={`font-semibold ${
              user.premium ? "text-amber-950" : "text-white"
            }`}
          >
            📞 Teléfono:
          </span>{" "}
          {user.phone}
        </li>
      </ul>

      {/* Redes sociales */}
      {user.social && Object.values(user.social).some((v) => v) && (
        <div className="w-full max-w-xs mx-auto">
          <h3
            className={`text-base sm:text-sm font-semibold ${
              user.premium ? "text-amber-950" : "text-blue-200"
            } mb-2 text-center sm:text-start`}
          >
            Redes sociales
          </h3>
          <ul
            className={`flex justify-center sm:flex-col sm:items-start gap-4 sm:gap-2 ${
              user.premium ? "text-amber-950" : "text-white"
            }`}
          >
            {user.social.instagram && (
              <li>
                <a
                  href={user.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all  ${
                    user.premium ? "text-amber-900 bg-white/20 hover:bg-white/30" : "text-white bg-white/10 hover:bg-white/20"
                  } `}
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all  ${
                    user.premium ? "text-amber-900 bg-white/20 hover:bg-white/30" : "text-white bg-white/10 hover:bg-white/20"
                  } `}
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all  ${
                    user.premium ? "text-amber-900 bg-white/20 hover:bg-white/30" : "text-white bg-white/10 hover:bg-white/20"
                  } `}
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all  ${
                    user.premium ? "text-amber-900 bg-white/20 hover:bg-white/30" : "text-white bg-white/10 hover:bg-white/20"
                  } `}
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
