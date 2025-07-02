/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { useEffect, useState } from "react";
import {
  createSocialLinks,
  getProfile,
  redirectToMercadoPago,
  redirectToStripe,
  updateProfile,
  updateProfileImage,
} from "@/services/profileService";
import { updateSocialLinks } from "@/services/profileService";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileActions from "@/components/profile/ProfileActions";
import { fetchStatesWithCities } from "@/services/profileService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { Crown, Sparkles } from "lucide-react";
import PremiumModal from "@/components/profile/ProfilePremiumModal";

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
  id: string;
  type: string;
  status: string;
  created_at: string;
  userId: string;
};

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
  const [originalData, setOriginalData] = useState<ProfileFormType | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showMissing, setShowMissing] = useState(false);
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [statesData, setStatesData] = useState<
      {
      id: number;
      state: string;
      cities: { id: number; name: string; state: string }[];
    }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);

  const auth = useAuth();
  const user = auth?.user;
  const loading = auth?.loading ?? false;
  const token = auth?.token;
  const router = useRouter();
  const { showToast } = useToast();
  const [userName, setUserName] = useState<string>("");
  const [premium, setPremium] = useState<boolean>(false);

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
    ? statesData
        .find((prov) => prov.state === formData.state)
        ?.cities.map((city) => city.name) || []
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

          setPremium(data.premium);
          const ticketData = data.tickets.find(
            (ticket: Ticket) =>
              ticket.status === "pending" && ticket.type === "to-worker"
          );
          setTicket(ticketData || null);

          const normalize = (input: string) => input.trim().toLowerCase();

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
            facebook: data.social?.facebook ?? "",
            linkedin: data.social?.linkedin ?? "",
            twitter: data.social?.x ?? "", // <- X en el backend, twitter en el front
            instagram: data.social?.instagram ?? "",
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
      showToast(
        "Agrega una descripción a tu perfil antes de solicitar ser trabajador.",
        "error"
      );
      return;
    }

    const socialData = {
      facebook: formData.facebook?.trim(),
      linkedin: formData.linkedin?.trim(),
      twitter: formData.twitter?.trim(),
      instagram: formData.instagram?.trim(),
    };

    const hasSocialData = Object.values(socialData).some(
      (val) => val && val !== ""
    );

    try {
      const dataToSend: any = {
        name: userName,  // <- acá usás el userName actualizado del estado
        phone: formData.phone ? Number(formData.phone) : undefined,
        street: formData.street,
        house_number: formData.house_number
          ? Number(formData.house_number)
          : undefined,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code ? String(formData.zip_code) : undefined,
        description: formData.description,
      };

      await updateProfile(dataToSend);

      if (hasSocialData) {
        const hadSocialBefore =
          originalData &&
          ((originalData.facebook && originalData.facebook.trim() !== "") ||
            (originalData.instagram && originalData.instagram.trim() !== "") ||
            (originalData.linkedin && originalData.linkedin.trim() !== "") ||
            (originalData.twitter && originalData.twitter.trim() !== ""));

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

  const handlePremiumSubscription = () => setModalOpen(true);

  const handleToMercadoPago = async () => {
    if (token) {
      const url = await redirectToMercadoPago();
      window.location.href = url;
    } else {
      router.push("/login");
    }
  };

  const handleToStripe = async () => {
    if (token) {
      const url = await redirectToStripe();
      window.location.href = url;
    } else {
      router.push("/login");
    }
  };

  const getMissingFields = () => {
    return requiredFields.filter((field) => {
      return (
        !formData[field.key as keyof ProfileFormType] ||
        formData[field.key as keyof ProfileFormType] === ""
      );
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
          premium={premium}
        />
        {/* Boton para redireccionar si no es premium */}
        {premium ? (
          <div className="flex justify-center my-6">
            <div className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold text-lg w-full sm:w-auto flex items-center justify-center gap-3 shadow-2xl border-2 border-yellow-300 overflow-hidden group">
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>

              {/* Partículas flotantes */}
              <div className="absolute top-1 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-3 right-6 w-1 h-1 bg-yellow-200 rounded-full animate-ping animation-delay-300"></div>
              <div className="absolute bottom-2 left-8 w-1 h-1 bg-white rounded-full animate-ping animation-delay-700"></div>

              {/* Contenido principal */}
              <svg
                className="w-6 h-6 relative z-10"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="relative z-10 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent font-extrabold">
                ¡Ya eres Premium!
              </span>

              <div className="relative z-10 flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-200 rounded-full animate-bounce animation-delay-150"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-300"></div>
              </div>

              {/* Borde brillante animado */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl blur opacity-75 animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center my-6">
            <button
              className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-white font-bold text-lg transition-all duration-300 w-full sm:w-auto cursor-pointer flex items-center justify-center gap-3 shadow-2xl transform 
              border-2 border-yellow-300"
              onClick={handlePremiumSubscription}
            >
              <Crown className="w-6 h-6" />
              <span className="bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                Suscribirse a Premium
              </span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        )}

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

      <PremiumModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onToMercadoPago={handleToMercadoPago}
        onToStripe={handleToStripe}
      />
    </div>
  );
}
