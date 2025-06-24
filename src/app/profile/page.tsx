/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { useEffect, useState } from "react";
import { getProfile, updateProfile, updateProfileImage } from "@/services/profileService";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileActions from "@/components/profile/ProfileActions";
import { locationOptions, countries } from "@/databauti/locations";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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

export type Ticket = {
  id: string,
  type: string,
  status: string,
  created_at: string, 
  userId: string
}

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showMissing, setShowMissing] = useState(false);
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [ticket, setTicket] = useState<Ticket>({
    id: "",
    type: "",
    status: "",
    created_at: "", 
    userId: ""
  });

  const auth = useAuth();
  const user = auth?.user;
  const loading = auth?.loading ?? false;
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirección si no hay usuario autenticado
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  // Cargar perfil al montar o cuando cambia el usuario
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const data = await getProfile();
          const ticketData = data.tickets.find((ticket: Ticket) => ticket.status === "pending" && ticket.type === "to-worker");
          setTicket(ticketData);
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
    }
  }, [user]);

  // Loader pantalla completa mientras no está montado
  if (!mounted) {
    return <LoadingScreen />;
  }

  // Loader pantalla completa mientras carga el usuario
  if (loading || !user) {
    return <LoadingScreen />;
  }

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
      if (dataToSend) {
        await updateProfile(dataToSend);
      }
      if (userImageFile) {
        await updateProfileImage(userImageFile);
      }
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
          setShowMissing={setShowMissing}
          userId={user.id ?? ""}
          setUserImageFile={setUserImageFile}
          ticket={ticket}
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
