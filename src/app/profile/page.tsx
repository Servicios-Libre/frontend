"use client";

import { useState, useEffect } from "react";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ProfileInput from "@/components/profile/ProfileInput";
import { getProfile, updateProfile } from "@/services/profileService";
import { UserProfile } from "@/types";
import Link from "next/link";
import { locationOptions, countries } from "@/databauti/locations";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    phone: "",
    user_pic: "",
    address_id: {
      street: "",
      house_number: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
  });
  const [originalData, setOriginalData] = useState<UserProfile | null>(null);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log(data)
        setFormData(data); // ✅ Usar directamente los datos del backend
        setOriginalData(data);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "country") {
      setFormData((prev) => ({ ...prev, country: value, city: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const setUserPic = (url: string) => {
    setFormData((prev) => ({ ...prev, user_pic: url }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setOriginalData(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData);
    }
    setEditMode(false);
  };

  const calculateCompletion = () => {
    const values = Object.values(formData);
    const filled = values.filter((v) => v && v !== "").length;
    return Math.floor((filled / values.length) * 100);
  };

  const completion = calculateCompletion();
  const isComplete = completion === 100;
  const hasUnsavedChanges =
    JSON.stringify(formData) !== JSON.stringify(originalData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-24 bg-gradient-to-r from-blue-100 via-purple-100 to-yellow-100 rounded-b-xl shadow-sm" />

      <div className="text-black max-w-4xl mx-auto bg-white rounded-lg shadow-md -mt-16 p-8">
        <div className="flex items-center gap-4 relative">
          <ProfilePhoto
            userPic={formData.user_pic ?? ""}
            setUserPic={setUserPic}
            editable={editMode}
          />
          <div>
            <p className="text-lg font-semibold">
              Perfil de {formData.name || "usuario"}
            </p>
            <p className="text-gray-500 text-sm">
              Puedes editar tu información
            </p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-sm text-gray-600">{completion}% completo</div>

            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-md text-white ${
                  isComplete && !editMode && !hasUnsavedChanges
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!isComplete || editMode || hasUnsavedChanges}
              >
                Solicitar ser trabajador
              </button>
              {(!isComplete || editMode || hasUnsavedChanges) && (
                <div className="absolute top-full left-0 mt-1 w-56 text-xs text-gray-500 bg-white border rounded p-2 shadow-sm hidden group-hover:block z-10">
                  Completa tu perfil y guarda los cambios para habilitar esta
                  opción.
                </div>
              )}
            </div>

            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Guardar
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
              >
                Editar
              </button>
            )}
          </div>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <ProfileInput
            label="PHONE"
            name="phone"
            value={formData.phone ?? ""}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Ingresa tu teléfono"
          />
          <ProfileInput
            label="STREET"
            name="street"
            value={formData.address_id.street ?? ""}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Ingresa tu calle"
          />
          <ProfileInput
            label="HOUSE NUMBER"
            name="house_number"
            value={formData.address_id.house_number ?? ""}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Número de casa"
          />

          {/* SELECT COUNTRY */}
          <div>
            <label className="text-sm font-medium text-gray-600">COUNTRY</label>
            <select
              name="country"
              value={formData.address_id.country ?? ""}
              onChange={handleSelectChange}
              disabled={!editMode}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona un país</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* SELECT CITY */}
          <div>
            <label className="text-sm font-medium text-gray-600">CITY</label>
            <select
              name="city"
              value={formData.address_id.city ?? ""}
              onChange={handleSelectChange}
              disabled={!editMode || !formData.address_id.city}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">
                {formData.address_id.city ? "Selecciona una ciudad" : "Selecciona un país primero"}
              </option>
              {(locationOptions[formData.address_id.city] || []).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <ProfileInput
            label="STATE"
            name="state"
            value={formData.address_id.state ?? ""}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Provincia o estado"
          />
          <ProfileInput
            label="ZIP CODE"
            name="zip_code"
            value={formData.address_id.zip_code ?? ""}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Código postal"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6 flex flex-col items-start md:items-center md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-black text-lg font-semibold">
            ¿Quieres ofrecer o solicitar un servicio?
          </h2>
          <p className="text-gray-500 text-sm">
            Ingresa para completar el formulario correspondiente
          </p>
        </div>
        <Link href="/solicitud">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors">
            Solicitar / Implementar Servicio
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
