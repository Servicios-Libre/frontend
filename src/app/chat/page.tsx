"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthUser } from "@/hooks/useAuthUser";
import axios from "axios";
import { FaRegComments } from "react-icons/fa";
import Image from "next/image";
import { Crown } from "lucide-react";
import LoadingScreen from "@/components/loading-screen/LoadingScreen"; // Asegúrate de tener este componente

export default function ChatInboxPage() {
  const { user, token } = useAuthUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.title = "Servicio Libre - Tus chats";
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user?.id || !token) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/inbox`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const chatsData = Array.isArray(res.data) ? res.data : [];
        setChats(chatsData);
      })
      .catch((error) => {
        console.error(
          "Error fetching chats:",
          error.response?.data || error.message
        );
        setChats([]);
      })
      .finally(() => setLoading(false));
  }, [user, token]);

  if (!mounted || loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-32 pb-16">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-800">
          <FaRegComments /> Mis chats
        </h1>
        {chats.length === 0 ? (
          <p className="text-gray-500 text-center bg-gray-50 rounded-lg py-8 shadow-inner">
            No tienes chats activos.
          </p>
        ) : (
          <ul className="space-y-4">
            {chats.map((chat) => {
              const isUnread =
                chat.lastMessage &&
                !chat.lastMessage.isRead &&
                chat.lastMessage.senderId !== user.id;

              return (
                <li
                  key={chat.id}
                  className={`rounded-xl shadow flex items-center justify-between p-4 transition group border 
                    ${
                      isUnread
                        ? "bg-amber-50 border-blue-400"
                        : "bg-gray-50 border-gray-100"
                    }
                    hover:shadow-lg hover:border-blue-500`}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar con inicial */}
                    <div className="relative w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-200">
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
                    <div>
                      <div
                        className={`font-semibold text-lg transition flex items-center gap-1 ${
                          isUnread && "text-blue-600"
                        } ${
                          chat.otherUserPremium
                            ? "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent"
                            : "text-black"
                        }`}
                      >
                        {chat.otherUserPremium && <Crown className="w-4 h-4  text-amber-500"/>}
                        {chat.otherUsername}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs ">
                        {chat.lastMessage?.message || (
                          <span className="italic text-gray-400">
                            Sin mensajes aún
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link href={`/chat/${chat.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition font-medium">
                      Abrir chat
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
