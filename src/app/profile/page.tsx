/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/services/profileService";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileActions from "@/components/profile/ProfileActions";
import { locationOptions, countries } from "@/databauti/locations";

const requiredFields = [
  { key: "phone", label: "Teléfono" },
  { key: "street", label: "Calle" },
  { key: "house_number", label: "Número de casa" },
  { key: "city", label: "Ciudad" },
  { key: "state", label: "Estado" },
  { key: "zip_code", label: "Código postal" },
  { key: "user_pic", label: "Foto de perfil" },
];

type ProfileFormType = {
  phone: string;
  street: string;
  house_number: string;
  city: string;
  state: string;
  zip_code: string;
  user_pic?: string;
};

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<ProfileFormType>({
    phone: "",
    street: "",
    house_number: "",
    city: "",
    state: "",
    zip_code: "",
    user_pic: "",
  });
  const [originalData, setOriginalData] = useState<ProfileFormType | null>(null);
  const [userName, setUserName] = useState<string>("");

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
      return !formData[field.key as keyof ProfileFormType] || formData[field.key as keyof ProfileFormType] === "";
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

  // Opciones de ciudad según país seleccionado
  const countryCities =
    formData.state && locationOptions[formData.state]
      ? locationOptions[formData.state]
      : [];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="text-black max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-20 p-8">
        <ProfileHeader
          userName={userName}
          userPic={formData.user_pic ?? ""}
          setUserPic={setUserPic}
          editMode={editMode}
          setEditMode={setEditMode}
          completion={completion}
          isComplete={isComplete}
          hasUnsavedChanges={hasUnsavedChanges}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
        <ProfileForm
          formData={formData}
          editMode={editMode}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          setUserPic={setUserPic}
          countries={countries}
          countryCities={countryCities}
        />
      </div>

      <div className="px-8">
        <ProfileActions />
      </div>
    </div>
  );
}
