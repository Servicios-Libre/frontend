"use client";

import ChatBox from "@/components/chat/ChatBox";
import { ChatMessage, ChatContract } from "@/types";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAuthUser } from "@/hooks/useAuthUser";

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
    if (!chatId || !token) return;
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages(res.data.messages);

        const { user1, user2 } = res.data;

        if (!user1 || !user2) return;

        if (user1.role === "worker" && user2.role === "user") {
          setTrabajadorName(user1.name);
          setClienteName(user2.name);
        } else if (user2.role === "worker" && user1.role === "user") {
          setTrabajadorName(user2.name);
          setClienteName(user1.name);
        } else {
          setTrabajadorName("Trabajador");
          setClienteName("Cliente");
        }
      })
      .finally(() => setLoading(false));
  }, [chatId, token]);

  const handleSendMessage = async (text: string) => {
    if (!user?.id || !token) return;

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

    return response.data;
  };

  const handleContractCreate = (contractData: ChatContract) => {
    setContract(contractData);
  };
  const handleContractAccept = () => {
    if (contract) setContract((prev) => prev && { ...prev, accepted: true });
  };

  if (!user)
    return (
      <div className="pt-24 text-center">
        Debes iniciar sesión para ver tus chats.
      </div>
    );

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
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50 transition
                    ${chat.id === chatId ? "bg-blue-100/60" : ""}`}
                  onClick={() => router.push(`/chat/${chat.id}`)}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-200">
                    {chat.otherUsername?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="text-black flex-1 min-w-0">
                    <div className="font-semibold truncate">
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
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Panel derecho (chat principal) */}
      <section className="flex-1 flex flex-col h-screen pt-20 overflow-hidden">
        {!loading && (
          <ChatBox
            messages={messages}
            onSend={handleSendMessage}
            currentUserId={user.id}
            contract={contract}
            onContractCreate={handleContractCreate}
            onContractAccept={handleContractAccept}
            clienteName={clienteName}
            trabajadorName={trabajadorName}
          />
        )}
      </section>
    </div>
  );
}
