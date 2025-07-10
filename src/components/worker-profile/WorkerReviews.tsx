"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewList from "@/components/reviews/ReviewList";

type Review = {
  id: string;
  rate: number;
  description: string;
  created_at: string;
  author: { name: string; user_pic: string };
};

type Props = {
  workerId: string;
};

export default function WorkerReviews({ workerId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<"recent" | "best" | "worst" | "oldest">("recent");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/${workerId}?sort=${sort}`
        );
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Error al obtener reseñas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [workerId, sort]);

  return (
    <div
      id="worker-reviews"
      className="my-10 bg-white rounded-2xl border border-gray-200 shadow-lg p-8 space-y-6"
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Reseñas de clientes</h2>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
          <span className="text-gray-400 font-medium">Ordenar por:</span>
          <select
            disabled={reviews.length === 0}
            className={`font-medium rounded-full px-4 py-1.5 shadow-sm focus:outline-none transition cursor-pointer appearance-none
      ${reviews.length === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white focus:ring-2 focus:ring-blue-400"}
    `}
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
          >
            <option value="recent">Más recientes</option>
            <option value="oldest">Más antiguas</option>
            <option value="best">Mejor - Peor</option>
            <option value="worst">Peor - Mejor</option>
          </select>
        </div>
      </div>

      <ReviewList reviews={reviews} loading={loading} />
    </div>
  );
}
