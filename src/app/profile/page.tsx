"use client";

import { useState } from "react";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ProfileInput from "@/components/profile/ProfileInput";
import { updateProfile } from "@/services/profileService";
import Link from "next/link";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    phone: "123456789",
    user_pic: "https://example.com/profile.jpg",
    street: "Main Street",
    house_number: "123",
    city: "New York",
    state: "NY",
    zip_code: "10001",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setUserPic = (url: string) => {
    setFormData((prev) => ({ ...prev, user_pic: url }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };

  const calculateCompletion = () => {
    const values = Object.values(formData);
    const filled = values.filter((v) => v && v !== "").length;
    return Math.floor((filled / values.length) * 100);
  };

  const completion = calculateCompletion();
  const isComplete = completion === 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-24 bg-gradient-to-r from-blue-100 via-purple-100 to-yellow-100 rounded-b-xl shadow-sm" />

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md -mt-16 p-8">
        <div className="flex items-center gap-4 relative">
          <ProfilePhoto
            userPic={formData.user_pic}
            setUserPic={setUserPic}
            editable={editMode}
          />
          <div>
            <p className="text-lg font-semibold">Tu perfil</p>
            <p className="text-gray-500 text-sm">
              Puedes editar tu información
            </p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-sm text-gray-600">{completion}% completo</div>
            <button
              className={`px-4 py-2 rounded-md text-white ${
                isComplete
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isComplete}
            >
              Solicitar ser trabajador
            </button>
            <button
              onClick={editMode ? handleSave : () => setEditMode(true)}
              className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
            >
              {editMode ? "Guardar" : "Editar"}
            </button>
          </div>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {["phone", "street", "house_number", "city", "state", "zip_code"].map(
            (field) => (
              <ProfileInput
                key={field}
                label={field.replace("_", " ").toUpperCase()}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                disabled={!editMode}
              />
            )
          )}
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
