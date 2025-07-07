import api from "@/services/axiosConfig";
import { ChatMessage } from "@/types";

export const fetchUserChats = async () => {
  try {
    const res = await api.get("/api/chat/inbox");
    return res.data;
  } catch (err) {
    console.error("Error al obtener los chats:", err);
    return [];
  }
};

export const sendMessageToBackend = async (
  chatId: string,
  message: string
): Promise<ChatMessage | null> => {
  try {
    const res = await api.post(`/api/chat/${chatId}/send`, { message });
    return res.data;
  } catch (err) {
    console.error("Error al enviar mensaje:", err);
    return null;
  }
};
