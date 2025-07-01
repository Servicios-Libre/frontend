/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import { useAuthUser } from "@/hooks/useAuthUser";

type Review = {
  id: string;
  rate: number;
  comment: string;
  created_at: string;
  author: { name: string };
};

type WorkerReviewsProps = {
  workerId: string;
};

export default function WorkerReviews({ workerId }: WorkerReviewsProps) {
  const { user, token } = useAuthUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [sort, setSort] = useState<"recent" | "best" | "worst" | "oldest">(
    "recent"
  );

  useEffect(() => {
    fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${workerId}?sort=${sort}`
      );
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!token) return;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/new/${workerId}`,
        { comment, rate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      setRate(0);
      setHasReviewed(true);
      fetchReviews();
    } catch (err: any) {
      if (err?.response?.data?.message?.includes("already")) {
        setHasReviewed(true);
      }
      console.error("Error sending review:", err);
    }
  };

  return (
    <div className="mt-10 bg-white rounded-2xl border border-gray-200 shadow-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reseñas de clientes</h2>

      {/* Filtro */}
      <div className="flex gap-3 text-sm text-gray-500 items-center">
        <span>Ordenar por:</span>
        <select
          className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
        >
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguas</option>
          <option value="best">Mejores</option>
          <option value="worst">Peores</option>
        </select>
      </div>

      {/* Lista de reseñas */}
      {loading ? (
        <p className="text-gray-500">Cargando reseñas...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-400 italic">
          Este trabajador aún no tiene reseñas.
        </p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow group hover:border-blue-400 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-gray-800">
                  {r.author.name}
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) =>
                    i < r.rate ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300" />
                    )
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 italic flex items-start gap-2">
                <FaQuoteLeft className="text-amber-400 mt-1" />
                {r.comment}
              </p>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(r.created_at).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Formulario para dejar reseña */}
      {user?.role === "user" && !hasReviewed && (
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Dejá tu reseña
          </h3>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRate(n)}
                className="text-2xl transition"
              >
                {n <= rate ? (
                  <FaStar className="text-yellow-400" />
                ) : (
                  <FaRegStar className="text-gray-300" />
                )}
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Escribí un comentario sobre tu experiencia..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm"
          />

          <button
            onClick={handleSubmit}
            disabled={!rate || !comment.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow disabled:opacity-50"
          >
            Enviar reseña
          </button>
        </div>
      )}

      {hasReviewed && (
        <p className="text-sm text-green-600 font-medium">
          Ya dejaste una reseña para este trabajador.
        </p>
      )}
    </div>
  );
}
