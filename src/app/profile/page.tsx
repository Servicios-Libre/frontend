/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/services/profileService";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ProfileInput from "@/components/profile/ProfileInput";
import Link from "next/link";
import { locationOptions, countries } from "@/databauti/locations";

const requiredFields = [
  { key: "phone", label: "Teléfono" },
  { key: "street", label: "Calle" },
  { key: "house_number", label: "Número de casa" },
  { key: "city", label: "Ciudad" },
  { key: "state", label: "Estado" }, // Ahora "state" es el país
  { key: "zip_code", label: "Código postal" },
];

type ProfileForm = {
  phone: string;
  street: string;
  house_number: string;
  city: string;
  state: string; // Aquí se guarda el país seleccionado
  zip_code: string;
  user_pic?: string;
};

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<ProfileForm>({
    phone: "",
    street: "",
    house_number: "",
    city: "",
    state: "",
    zip_code: "",
    user_pic: "",
  });
  const [originalData, setOriginalData] = useState<ProfileForm | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [showMissing, setShowMissing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setFormData({
          phone: data.phone?.toString() ?? "",
          street: data.address_id?.street ?? "",
          house_number: data.address_id?.house_number?.toString() ?? "",
          city: data.address_id?.city ?? "",
          state: data.address_id?.state
            ? data.address_id.state.trim().charAt(0).toUpperCase() + data.address_id.state.trim().slice(1).toLowerCase()
            : "",
          zip_code: data.address_id?.zip_code?.toString() ?? "",
          user_pic: data.user_pic ?? "",
        });
        setOriginalData({
          phone: data.phone?.toString() ?? "",
          street: data.address_id?.street ?? "",
          house_number: data.address_id?.house_number?.toString() ?? "",
          city: data.address_id?.city ?? "",
          state: data.address_id?.state
            ? data.address_id.state.trim().charAt(0).toUpperCase() + data.address_id.state.trim().slice(1).toLowerCase()
            : "",
          zip_code: data.address_id?.zip_code?.toString() ?? "",
          user_pic: data.user_pic ?? "",
        });
        setUserName(data.name || data.username || "Usuario");
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const setUserPic = (url: string) => {
    setFormData((prev) => ({ ...prev, user_pic: url }));
  };

  const handleSave = async () => {
    try {
      const dataToSend: any = {
        phone: formData.phone ? Number(formData.phone) : undefined,
        street: formData.street,
        house_number: formData.house_number ? Number(formData.house_number) : undefined,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code ? String(formData.zip_code) : undefined,
      };
      await updateProfile(dataToSend);
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

  const getMissingFields = () => {
    return requiredFields.filter((field) => {
      return !formData[field.key as keyof ProfileForm] || formData[field.key as keyof ProfileForm] === "";
    });
  };

  const calculateCompletion = () => {
    const total = requiredFields.length;
    const filled = total - getMissingFields().length;
    return Math.floor((filled / total) * 100);
  };

  const completion = calculateCompletion();
  const isComplete = completion === 100;
  const hasUnsavedChanges =
    JSON.stringify(formData) !== JSON.stringify(originalData);
  const missingFields = getMissingFields();

  // Opciones de ciudad según país seleccionado
  const countryCities =
    formData.state && locationOptions[formData.state]
      ? locationOptions[formData.state]
      : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal de campos faltantes */}
      {showMissing && !isComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-gray-800 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowMissing(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="mb-2 font-semibold text-lg">Debes completar tu perfil:</div>
            <ul className="list-disc pl-5 mb-4">
              {missingFields.map((f) => (
                <li key={f.key}>{f.label}</li>
              ))}
            </ul>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              onClick={() => setShowMissing(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Botón para volver a la landing */}
      <div className="max-w-4xl mx-auto pt-6 pb-2 flex">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
             Volver a la landing
          </button>
        </Link>
      </div>

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
              Perfil de usuario: <span className="font-normal">{userName}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Puedes editar tu información
            </p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-sm text-gray-600">{completion}% completo</div>

            {/* Botón "Solicitar ser trabajador" */}
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-md text-white ${
                  !editMode && !hasUnsavedChanges
                    ? isComplete
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-300 hover:bg-gray-400"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={editMode || hasUnsavedChanges}
                onClick={() => {
                  if (!isComplete) setShowMissing(true);
                  // Aquí puedes agregar la acción normal si el perfil está completo
                }}
              >
                Solicitar ser trabajador
              </button>
            </div>

            {editMode ? (
              <>
                <button
                  className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Guardar
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => setEditMode(true)}
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
            value={formData.street ?? ""}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Ingresa tu calle"
          />
          <ProfileInput
            label="HOUSE NUMBER"
            name="house_number"
            value={formData.house_number ?? ""}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Número de casa"
          />

          {/* SELECT STATE (país) */}
          <div>
            <label className="text-sm font-medium text-gray-600">STATE</label>
            <select
              name="state"
              value={formData.state ?? ""}
              onChange={handleSelectChange}
              disabled={!editMode}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
            >
              {!formData.state && (
                <option value="">Selecciona un país primero</option>
              )}
              {/* Si el valor guardado no está en countries, lo agregamos como opción */}
              {formData.state && !countries.includes(formData.state) && (
                <option value={formData.state}>{formData.state}</option>
              )}
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* SELECT CITY */}
          <div>
            <label className="text-sm font-medium text-gray-600">CITY</label>
            <select
              name="city"
              value={formData.city ?? ""}
              onChange={handleSelectChange}
              disabled={!editMode || !formData.state}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
            >
              {!formData.city && (
                <option value="">Selecciona una ciudad</option>
              )}
              {/* Si el valor guardado no está en countryCities, lo agregamos como opción */}
              {formData.city && !countryCities.includes(formData.city) && (
                <option value={formData.city}>{formData.city}</option>
              )}
              {countryCities.map((city: string) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Elimina el input de provincia o estado */}
          <ProfileInput
            label="ZIP CODE"
            name="zip_code"
            value={formData.zip_code ?? ""}
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
