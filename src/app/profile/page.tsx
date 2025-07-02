/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { useEffect, useState } from "react";
import { createSocialLinks, getProfile, redirectToPayment, updateProfile, updateProfileImage } from "@/services/profileService";
import { updateSocialLinks } from "@/services/profileService"
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileActions from "@/components/profile/ProfileActions";
import { fetchStatesWithCities } from "@/services/profileService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

const requiredFields = [
  { key: "phone", label: "Teléfono" },
  { key: "street", label: "Calle" },
  { key: "house_number", label: "Número de casa" },
  { key: "city", label: "Ciudad" },
  { key: "state", label: "Estado" },
  { key: "zip_code", label: "Código postal" },
  { key: "user_pic", label: "Foto de perfil" },
  { key: "description", label: "Descripción" },
];

type ProfileFormType = {
  phone: string;
  street: string;
  house_number: string;
  city: string;
  state: string;
  zip_code: string;
  user_pic?: string;
  description: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
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
    description: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });
  const [originalData, setOriginalData] = useState<ProfileFormType | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showMissing, setShowMissing] = useState(false);
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [statesData, setStatesData] = useState<
    { id: number; state: string; cities: { id: number; name: string; state: string }[] }[]
  >([]);

  const auth = useAuth();
  const user = auth?.user;
  const loading = auth?.loading ?? false;
  const token = auth?.token;
  const router = useRouter();
  const { showToast } = useToast();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    document.title = "Servicio Libre - Mi Perfil";
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const data = await fetchStatesWithCities();
        setStatesData(data);
      } catch (error) {
        console.error("Error al cargar provincias:", error);
      }
    };

    loadStates();
  }, []);

  const provincias = statesData.map((item) => item.state);

  const ciudades = formData.state
    ? statesData.find((prov) => prov.state === formData.state)?.cities.map((city) => city.name) || []
    : [];

  // Redirección si no hay usuario autenticado
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  // Cargar perfil al montar o cuando cambia el usuario o cambia statesData
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const data = await getProfile();
          const ticketData = data.tickets.find(
            (ticket: Ticket) =>
              ticket.status === "pending" && ticket.type === "to-worker"
          );
          setTicket(ticketData || null);

          const normalize = (input: string) =>
            input.trim().toLowerCase();

          const provinciaEncontrada =
            statesData.find(
              (prov) =>
                normalize(prov.state) ===
                normalize(data.address_id?.state ?? "")
            )?.state ?? "";

          const ciudadEncontrada =
            statesData
              .find(
                (prov) =>
                  normalize(prov.state) === normalize(provinciaEncontrada)
              )
              ?.cities.find(
                (city) =>
                  normalize(city.name) ===
                  normalize(data.address_id?.city ?? "")
              )?.name ?? "";

          const baseForm = {
            phone: data.phone?.toString() ?? "",
            street: data.address_id?.street ?? "",
            house_number: data.address_id?.house_number?.toString() ?? "",
            city: ciudadEncontrada,
            state: provinciaEncontrada,
            zip_code: data.address_id?.zip_code?.toString() ?? "",
            user_pic: data.user_pic ?? "",
            description: data.description ?? "",
            facebook: data.facebook ?? "",
            linkedin: data.linkedin ?? "",
            twitter: data.twitter ?? "",
            instagram: data.instagram ?? "",
          };

          setFormData(baseForm);
          setOriginalData(baseForm);
          setUserName(data.name || data.username || "Usuario");
        } catch (error) {
          console.error("Error al obtener perfil:", error);
        }
      };
      fetchProfile();
    }
  }, [user, token, statesData]);

  if (!mounted) {
    return <LoadingScreen />;
  }

  if (loading || !user) {
    return <LoadingScreen />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    if (!formData.description || formData.description.trim() === "") {
      showToast("Agrega una descripción a tu perfil antes de solicitar ser trabajador.", "error");
      return;
    }

    const socialData = {
      facebook: formData.facebook?.trim(),
      linkedin: formData.linkedin?.trim(),
      twitter: formData.twitter?.trim(),
      instagram: formData.instagram?.trim(),
    };

    const hasSocialData = Object.values(socialData).some((val) => val && val !== "");

    try {
      const dataToSend: any = {
        name: userName,  // <- acá usás el userName actualizado del estado
        phone: formData.phone ? Number(formData.phone) : undefined,
        street: formData.street,
        house_number: formData.house_number ? Number(formData.house_number) : undefined,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code ? String(formData.zip_code) : undefined,
        description: formData.description,
      };

      await updateProfile(dataToSend);

      if (hasSocialData) {
        const hadSocialBefore = originalData && (
          (originalData.facebook && originalData.facebook.trim() !== "") ||
          (originalData.instagram && originalData.instagram.trim() !== "") ||
          (originalData.linkedin && originalData.linkedin.trim() !== "") ||
          (originalData.twitter && originalData.twitter.trim() !== "")
        );

        if (hadSocialBefore) {
          await updateSocialLinks(socialData);
        } else {
          await createSocialLinks(socialData);
        }
      }

      if (userImageFile) {
        await updateProfileImage(userImageFile);
      }

      setOriginalData(formData);
      setEditMode(false);
      showToast("Perfil actualizado correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      showToast("Hubo un error al actualizar el perfil", "error");
    }
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData);
    }
    setEditMode(false);
  };

  const handlePremiumSubscription = async () => {
    if (token) {
      const url = await redirectToPayment();
      window.location.href = url
  }
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
          setUserName={setUserName}
          handlePremiumSubscription={handlePremiumSubscription}
        />
        <ProfileForm
          formData={formData}
          editMode={editMode}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          setUserPic={setUserPic}
          countries={provincias}
          countryCities={ciudades}
          isWorker={user?.role === "worker"}
        />
      </div>

      <div className="px-8">
        <ProfileActions />
      </div>
    </div>
  );
}
