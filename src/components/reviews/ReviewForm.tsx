"use client";

import { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

interface ReviewFormProps {
  workerId: string;
  contractId: string;
  onReviewSubmitted: () => void;
  token: string;
}

const ReviewForm = ({ workerId, contractId, onReviewSubmitted, token }: ReviewFormProps) => {
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${workerId}`,
        { description, rate, contractId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onReviewSubmitted();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al enviar la reseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-xl p-8 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6">¿Cómo fue tu experiencia?</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Tu puntuación:</label>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => {
            const rating = i + 1;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setRate(rating)}
                onMouseEnter={() => setHover(rating)}
                onMouseLeave={() => setHover(0)}
              >
                <FaStar
                  size={28}
                  className={
                    rating <= (hover || rate) ? "text-yellow-400" : "text-gray-300"
                  }
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Comentario:</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
          placeholder="¿Qué te pareció el servicio?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minLength={20}
          maxLength={400}
          required
          rows={5}
        />
        <p className="text-xs text-gray-400 mt-1">Mínimo 20 y máximo 400 caracteres.</p>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading || rate === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Enviando..." : "Enviar Reseña"}
      </button>
    </form>
  );
};

export default ReviewForm;
