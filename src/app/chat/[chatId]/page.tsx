"use client";

import ChatBox from "@/components/chat/ChatBox";
import { ChatMessage, ChatContract } from "@/types";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getSocket } from "@/services/chat/socket";
import Image from "next/image";

export default function ChatDemo() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const { user, token } = useAuthUser();
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contract, setContract] = useState<ChatContract | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chats, setChats] = useState<any[]>([]);
  const [loadingChats, setLoadingChats] = useState(true);

  const [clienteName, setClienteName] = useState("Cliente");
  const [trabajadorName, setTrabajadorName] = useState("Trabajador");
  const [trabajadorId, setTrabajadorId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [clientePic, setClientePic] = useState<string>("");
  const [trabajadorPic, setTrabajadorPic] = useState<string>("");
  const [showContractForm, setShowContractForm] = useState(false);
  const [trabajadorPremium, setTrabajadorPremium] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Servicio Libre - Chat";
  }, []);

  useEffect(() => {
    if (!user?.id || !token) return;
    setLoadingChats(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/inbox`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChats(res.data))
      .finally(() => setLoadingChats(false));
  }, [user, token]);

  useEffect(() => {
    const socket = getSocket();

    if (!chatId) return;

    socket.emit("joinChat", { chatRoom: `chat_${chatId}` });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleNewMessage = (msg: any) => {
      const formatted: ChatMessage = {
        id: msg.id,
        message: msg.message ?? msg.content ?? "", // fallback por si el backend devuelve "message" o "content"
        senderId: msg.senderId ?? msg.sender,
        timestamp: msg.timestamp ?? msg.createdAt ?? new Date().toISOString(),
      };

      setMessages((prev) => {
        const exists = prev.some((m) => m.id === formatted.id);
        return exists ? prev : [...prev, formatted];
      });
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/contract`, {
          params: {
            worker: trabajadorId,
            client: clienteId,
          },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setContract(res.data))
        .catch(() => setContract(null));

      // Refrescar lista de chats lateral
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/inbox`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setChats(res.data));
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("newContract", (updatedContract) => {
      console.log("🧾 Contrato recibido vía socket:", updatedContract);
      setContract(updatedContract);
      setShowContractForm(false);
    });

    socket.on("contractUpdated", (updatedContract) => {
      console.log("📡 Contrato actualizado vía socket:", updatedContract);
      setContract(updatedContract);
    });

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("newContract");
      socket.off("contractUpdated");
      socket.emit("leaveChat", { chatRoom: `chat_${chatId}` });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, token]);

  useEffect(() => {
    if (!chatId || !token) return;
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages(res.data.messages);

        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/mark-as-read`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .catch((err) => {
            console.error("Error al marcar como leídos:", err);
          });

        const { user1, user2 } = res.data;

        if (!user1 || !user2) return;

        if (user1.role === "worker" && user2.role === "user") {
          setTrabajadorName(user1.name);
          setClienteName(user2.name);
          setTrabajadorId(user1.id);
          setClienteId(user2.id);
          setTrabajadorPic(user1.user_pic || "");
          setClientePic(user2.user_pic || "");
          setTrabajadorPremium(!!user1.premium);
        } else if (user2.role === "worker" && user1.role === "user") {
          setTrabajadorName(user2.name);
          setClienteName(user1.name);
          setTrabajadorId(user2.id);
          setClienteId(user1.id);
          setTrabajadorPic(user2.user_pic || "");
          setClientePic(user1.user_pic || "");
          setTrabajadorPremium(!!user2.premium);
        }
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/contract`, {
            params: {
              worker: user1.role === "worker" ? user1.id : user2.id,
              client: user1.role === "user" ? user1.id : user2.id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => setContract(res.data))
          .catch((err) => {
            console.log(
              "ℹ️ No hay contrato activo:",
              err?.response?.data?.message || err.message
            );
          });
      })
      .finally(() => setLoading(false));
  }, [chatId, token]);

  const handleSendMessage = async (text: string): Promise<ChatMessage> => {
    if (!user?.id || !token) {
      throw new Error("Usuario no autenticado.");
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/messages`,
      {
        senderId: user.id,
        message: text,
        timestamp: new Date().toISOString(),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const newMsg: ChatMessage = {
      id: response.data.id,
      message: response.data.message ?? text,
      senderId: response.data.senderId ?? user.id,
      timestamp: response.data.timestamp ?? new Date().toISOString(),
    };

    const socket = getSocket();
    socket.emit("sendMessage", {
      id: newMsg.id,
      content: newMsg.message,
      sender: newMsg.senderId,
      chatId,
      createdAt: newMsg.timestamp,
    });

    // Actualizar lista de chats lateral
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/inbox`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChats(res.data));

    return newMsg;
  };

  const handleContractCreate = async (contractData: ChatContract) => {
    if (!token) return;

    const body = {
      ...contractData,
      chatId,
      workerId: trabajadorId,
      clientId: clienteId,
    };

    console.log("🛰 Enviando contrato al backend:", body);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/contract`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContract(response.data);
    } catch (error) {
      console.error("❌ Error al crear contrato:", error);
    }
  };

  const handleContractAccept = async () => {
    if (!contract || !token) return;

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/contract/${contract.id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContract(response.data);
    } catch (error) {
      console.error("❌ Error al aceptar el contrato:", error);
    }
  };

  const handleConfirmService = async () => {
    if (!contract || !token || !user) return;

    try {
      const role = user.id === clienteId ? "user" : "worker";

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/contract/${contract.id}/confirm`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setContract(response.data);
    } catch (error) {
      console.error("Error al confirmar servicio:", error);
    }
  };

  if (!user)
    return (
      <div className="pt-24 text-center">
        Debes iniciar sesión para ver tus chats.
      </div>
    );

  const userRole =
    user.id === clienteId
      ? "client"
      : user.id === trabajadorId
      ? "worker"
      : null;

  if (!userRole) {
    return (
      <p className="text-center text-red-500">
        Error: No se pudo determinar el rol del usuario.
      </p>
    );
  }

  console.log(chats);

  return (
    <div className="min-h-screen flex bg-[#ece5dd] overflow-x-auto overflow-y-hidden">
      {/* Fondo decorativo tipo WhatsApp */}
      <div className="fixed inset-0 z-0 bg-repeat opacity-20 pointer-events-none" />

      {/* Panel izquierdo */}
      <aside className="hidden md:flex flex-col w-full max-w-xs h-screen pt-20 bg-white/80 border-r border-gray-200 z-10 overflow-y-auto">
        <div className="p-4 border-b bg-white/90">
          <h2 className="text-lg font-bold text-gray-700 mb-2">Chats</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loadingChats ? (
            <div className="text-center py-8 text-gray-500">
              Cargando chats...
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No tienes chats activos.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {chats.map((chat) => {
                const isUnread =
                  chat.lastMessage &&
                  !chat.lastMessage.isRead &&
                  chat.lastMessage.senderId !== user.id;

                return (
                  <li
                    key={chat.id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition 
                ${
                  chat.id === chatId
                    ? "bg-blue-100/60"
                    : isUnread
                    ? "bg-amber-50"
                    : ""
                } 
                hover:bg-blue-50`}
                    onClick={() => router.push(`/chat/${chat.id}`)}
                  >
                    <div className="relative w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-200">
                      {chat.otherUserPic ? (
                        <Image
                          src={chat.otherUserPic}
                          alt="avatar"
                          width={40}
                          height={40}
                          className="object-cover w-10 h-10 rounded-full"
                        />
                      ) : (
                        chat.otherUsername?.[0]?.toUpperCase() || "?"
                      )}
                      {isUnread && (
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white shadow-sm animate-pulse"></span>
                      )}
                    </div>

                    <div
                      className={`${
                        chat.otherUserId === trabajadorId &&
                        chat.otherUserPremium
                          ? "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent"
                          : "text-black"
                      } flex-1 min-w-0`}
                    >
                      <div
                        className={`font-semibold truncate ${
                          isUnread ? "text-blue-600" : ""
                        } `}
                      >
                        {chat.otherUsername}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {chat.lastMessage?.message || (
                          <span className="italic text-gray-400">
                            Sin mensajes aún
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* Panel derecho (chat principal) */}
      <section className="flex-1 flex flex-col h-screen pt-20 overflow-hidden">
        {!loading && (
          <ChatBox
            chatId={chatId}
            messages={messages}
            onSend={handleSendMessage}
            currentUserId={user.id}
            contract={contract}
            onContractCreate={handleContractCreate}
            onContractAccept={handleContractAccept}
            onConfirmService={handleConfirmService}
            clienteName={clienteName}
            trabajadorName={trabajadorName}
            userRole={userRole}
            trabajadorId={trabajadorId}
            clienteId={clienteId}
            showContractForm={showContractForm}
            setShowContractForm={setShowContractForm}
            clientePic={clientePic}
            trabajadorPic={trabajadorPic}
            trabajadorPremium={trabajadorPremium}
          />
        )}
      </section>
    </div>
  );
}
