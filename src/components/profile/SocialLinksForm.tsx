import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

type Props = {
  formData: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  editMode: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SocialLinksForm({ formData, editMode, handleChange }: Props) {
  const inputContainer = "flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500";
  const iconClass = "text-gray-400 text-lg mr-3";
  const inputClass = "w-full outline-none text-base bg-transparent disabled:bg-white";

  return (
    <div className="pt-6 mt-6 border-t border-blue-100">
      <h3 className="text-gray-700 text-xl font-semibold mb-4">
        Redes Sociales <span className="text-sm text-gray-500">(opcional)</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Facebook */}
        <div>
          <label htmlFor="facebook" className="block text-blue-700 font-medium mb-1">Facebook</label>
          <div className={inputContainer}>
            <FontAwesomeIcon icon={faFacebook} className={iconClass} />
            <input
              id="facebook"
              name="facebook"
              type="url"
              placeholder="https://facebook.com/tuPerfil"
              className={inputClass}
              value={formData.facebook || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="linkedin" className="block text-blue-700 font-medium mb-1">LinkedIn</label>
          <div className={inputContainer}>
            <FontAwesomeIcon icon={faLinkedin} className={iconClass} />
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/tuPerfil"
              className={inputClass}
              value={formData.linkedin || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>

        {/* Twitter (X) */}
        <div>
          <label htmlFor="twitter" className="block text-blue-700 font-medium mb-1">X (Twitter)</label>
          <div className={inputContainer}>
            <FontAwesomeIcon icon={faXTwitter} className={iconClass} />
            <input
              id="twitter"
              name="twitter"
              type="url"
              placeholder="https://x.com/tuUsuario"
              className={inputClass}
              value={formData.twitter || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>

        {/* Instagram */}
        <div>
          <label htmlFor="instagram" className="block text-blue-700 font-medium mb-1">Instagram</label>
          <div className={inputContainer}>
            <FontAwesomeIcon icon={faInstagram} className={iconClass} />
            <input
              id="instagram"
              name="instagram"
              type="url"
              placeholder="https://instagram.com/tuUsuario"
              className={inputClass}
              value={formData.instagram || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
