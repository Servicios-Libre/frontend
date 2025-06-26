"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthUser } from "@/hooks/useAuthUser";
import axios from "axios";
import { FaRegComments } from "react-icons/fa";

export default function ChatInboxPage() {
  const { user, token } = useAuthUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id || !token) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/inbox`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setChats(res.data))
      .finally(() => setLoading(false));
  }, [user, token]);

  if (!user) return <div className="pt-24 text-center">Debes iniciar sesión para ver tus chats.</div>;
  if (loading) return <div className="pt-24 text-center">Cargando chats...</div>;

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
            {chats.map(chat => (
              <li
                key={chat.id}
                className="bg-gray-50 rounded-xl shadow flex items-center justify-between p-4 hover:shadow-lg transition group border border-gray-100 hover:border-blue-400"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar con inicial */}
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-200">
                    {chat.otherUserName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <div className="font-semibold text-lg group-hover:text-blue-600 transition">
                      {chat.otherUserName}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {chat.lastMessage?.message || <span className="italic text-gray-400">Sin mensajes aún</span>}
                    </div>
                  </div>
                </div>
                <Link href={`/chat/${chat.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition font-medium">
                    Abrir chat
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}