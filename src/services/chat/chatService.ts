// src/services/chatService.ts
import api from "@/services/axiosConfig";

export const fetchUserChats = async () => {
  try {
    const res = await api.get("/api/chat/inbox");
    return res.data;
  } catch (err) {
    console.error("Error al obtener los chats:", err);
    return [];
  }
};
