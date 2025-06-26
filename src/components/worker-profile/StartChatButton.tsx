/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthUser } from "@/hooks/useAuthUser";

interface StartChatButtonProps {
  otherUserId: string; // ID del trabajador
  label?: string;      // Texto opcional del botón
}

export default function StartChatButton({ otherUserId, label = "Contratar servicio" }: StartChatButtonProps) {
  const router = useRouter();
  const { user, token } = useAuthUser();

  const handleStartChat = async () => {
    if (!user?.id || !token) return alert("Debes estar logueado");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/start`,
        { userId: user.id, otherUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const chatId = res.data.chatId;
      if (chatId) router.push(`/api/chat/${chatId}`);
      else alert("No se pudo iniciar el chat");
    } catch (err) {
      alert("No se pudo iniciar el chat");
    }
  };

  return (
    <button
      onClick={handleStartChat}
      className="cursor-pointer bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold py-2.5 px-6 rounded-full shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
      aria-label={label}
    >
      {label}
    </button>
  );
}
