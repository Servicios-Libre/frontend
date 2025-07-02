import Image from "next/image";
import { FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";

type ReviewCardProps = {
  name: string;
  rating: number;
  comment: string;
  avatarUrl?: string; // el signo de pregunta la vuelve opcional
  createdAt?: string;
};

export default function ReviewCard({
  name,
  rating,
  comment,
  avatarUrl,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow group hover:border-blue-400 transition">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3 font-semibold text-gray-800">
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image
              src={avatarUrl || "/images/default-avatar.png"} // Ruta a tu imagen de fallback
              alt={`Foto de ${name}`}
              fill
              sizes="32px"
              className="rounded-full object-cover border border-gray-300"
            />
          </div>
          {name}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) =>
            i < rating ? (
              <FaStar key={i} className="text-yellow-400" />
            ) : (
              <FaRegStar key={i} className="text-gray-300" />
            )
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 italic flex items-start gap-2">
        <FaQuoteLeft className="text-amber-400 mt-1" />
        {comment}
      </p>

      {createdAt && (
        <div className="text-xs text-gray-400 mt-2">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
