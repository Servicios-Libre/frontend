/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthUser } from "@/hooks/useAuthUser";

interface StartChatButtonProps {
  otherUserId: string; // ID del trabajador
}

export default function StartChatButton({ otherUserId }: StartChatButtonProps) {
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
      console.log(res);
      console.log("userID ", user.id, " ", "WorkerID: ", otherUserId);
      const chatId = res.data.chatId;
      if (chatId) router.push(`/chat/${chatId}`);
      else alert("No se pudo iniciar el chat");
    } catch (err) {
      alert("No se pudo iniciar el chat");
    }
  };

  return (
    <button
      onClick={handleStartChat}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
    >
      Iniciar chat
    </button>
  );
}