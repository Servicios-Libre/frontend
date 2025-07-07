/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

interface ChatUser {
  name: string;
  id: string;
  pic: string;
  premium?: boolean;
}

interface ChatRoles {
  trabajador: ChatUser;
  cliente: ChatUser;
  userRole: "client" | "worker" | null;
}

export const useChatData = (
  user1: any,
  user2: any,
  currentUserId: string
): ChatRoles => {
  const [roles, setRoles] = useState<ChatRoles>({
    trabajador: { name: "", id: "", pic: "", premium: false },
    cliente: { name: "", id: "", pic: "" },
    userRole: null,
  });

  useEffect(() => {
    if (!user1 || !user2 || !currentUserId) return;

    let trabajador, cliente;

    if (user1.role === "worker" && user2.role === "user") {
      trabajador = user1;
      cliente = user2;
    } else if (user2.role === "worker" && user1.role === "user") {
      trabajador = user2;
      cliente = user1;
    } else {
      // Si no está claro
      return;
    }

    const userRole =
      currentUserId === cliente.id
        ? "client"
        : currentUserId === trabajador.id
        ? "worker"
        : null;

    setRoles({
      trabajador: {
        name: trabajador.name,
        id: trabajador.id,
        pic: trabajador.user_pic || "",
        premium: trabajador.premium || false,
      },
      cliente: {
        name: cliente.name,
        id: cliente.id,
        pic: cliente.user_pic || "",
      },
      userRole,
    });
  }, [user1, user2, currentUserId]);

  return roles;
};
