/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";

export const useChatSidebar = (token: string, userId: string) => {
  const [chats, setChats] = useState<any[]>([]);
  const [loadingChats, setLoadingChats] = useState(true);

  const fetchChats = async () => {
    if (!token) return;

    setLoadingChats(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/inbox`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setChats(response.data || []);
    } catch (err) {
      console.error("Error al obtener los chats:", err);
      setChats([]);
    } finally {
      setLoadingChats(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [token, userId]);

  return { chats, loadingChats, fetchChats };
};
