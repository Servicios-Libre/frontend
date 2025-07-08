/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import ChatBox from "@/components/chat/ChatBox";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { useParams, useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useChatData } from "@/hooks/useChatData";
import { useChatBackend } from "@/hooks/useChatBackend";
import { useChatSidebar } from "@/hooks/useChatSidebar";
import axios from "axios";
import Image from "next/image";
import { ChatContract, ChatMessage } from "@/types";

export default function ChatDemo() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const router = useRouter();
  const { user, token } = useAuthUser();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contract, setContract] = useState<ChatContract | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContractForm, setShowContractForm] = useState(false);

  const { chats, loadingChats, fetchChats } = useChatSidebar(
    token || "",
    user?.id || ""
  );
  const {
    sendMessageToBackend,
    createContract,
    acceptContract,
    confirmService,
  } = useChatBackend(chatId, token || "", user?.id || "");

  const [user1, setUser1] = useState<any>(null);
  const [user2, setUser2] = useState<any>(null);

  const { trabajador, cliente, userRole } = useChatData(
    user1,
    user2,
    user?.id || ""
  );

  useChatSocket({
    chatId,
    currentUserId: user?.id || "",
    onMessage: (msg) => {
      setMessages((prev) => [...prev, msg]);
      fetchChats();
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/contract`, {
          params: { worker: trabajador.id, client: cliente.id },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setContract(res.data))
        .catch(() => setContract(null));
    },
    onContract: (updated) => {
      setContract(updated);
      setShowContractForm(false);
    },
  });

  useEffect(() => {
    document.title = "Servicio Libre - Chat";

    if (!chatId || !token) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages(res.data.messages || []);
        setUser1(res.data.user1);
        setUser2(res.data.user2);

        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/mark-as-read`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .catch((err) => {
            console.error("Error al marcar como leído:", err);
          });

        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/contract`, {
            params: {
              worker:
                res.data.user1.role === "worker"
                  ? res.data.user1.id
                  : res.data.user2.id,
              client:
                res.data.user1.role === "user"
                  ? res.data.user1.id
                  : res.data.user2.id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => setContract(res.data))
          .catch(() => setContract(null));
      })
      .finally(() => setLoading(false));
  }, [chatId, token]);

  const handleSendMessage = async (text: string): Promise<ChatMessage> => {
    const msg = await sendMessageToBackend(text);
    fetchChats(); // Actualiza la barra lateral
    return msg;
  };

  const handleContractCreate = async (data: ChatContract) => {
    const newContract = await createContract(data, trabajador.id, cliente.id);
    if (newContract) setContract(newContract);
  };

  const handleContractAccept = async () => {
    if (!contract) return;
    const accepted = await acceptContract(contract.id);
    if (accepted) setContract(accepted);
  };

  const handleConfirmService = async () => {
    if (!contract) return;
    const confirmed = await confirmService(
      contract.id,
      cliente.id,
      trabajador.id
    );
    if (confirmed) setContract(confirmed);
  };

  if (!user || loadingChats) return <LoadingScreen />;
  if (!userRole)
    return (
      <p className="text-center text-red-500">
        Error: No se pudo determinar el rol del usuario.
      </p>
    );

  return (
    <div className="min-h-screen flex bg-[#ece5dd] overflow-x-auto overflow-y-hidden">
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
                        chat.otherUserId === trabajador.id &&
                        chat.otherUserPremium
                          ? "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent"
                          : "text-black"
                      } flex-1 min-w-0`}
                    >
                      <div
                        className={`font-semibold truncate ${
                          isUnread ? "text-blue-600" : ""
                        }`}
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

      {/* Panel derecho */}
      <section className="flex-1 flex flex-col h-screen pt-20 overflow-hidden">
        {!loading && user1 && user2 && userRole ? (
          <ChatBox
            chatId={chatId}
            messages={messages}
            onSend={handleSendMessage}
            currentUserId={user.id}
            contract={contract}
            onContractCreate={handleContractCreate}
            onContractAccept={handleContractAccept}
            onConfirmService={handleConfirmService}
            clienteName={cliente.name}
            trabajadorName={trabajador.name}
            userRole={userRole}
            trabajadorId={trabajador.id}
            clienteId={cliente.id}
            showContractForm={showContractForm}
            setShowContractForm={setShowContractForm}
            clientePic={cliente.pic}
            trabajadorPic={trabajador.pic}
            trabajadorPremium={!!trabajador.premium}
          />
        ) : (
          <LoadingScreen />
        )}
      </section>
    </div>
  );
}
