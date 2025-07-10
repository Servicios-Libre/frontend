"use client";
import { FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

type Props = {
  author: { name: string; user_pic: string };
  rate: number;
  description: string;
  created_at: string;
};

export default function ReviewItem({ author, rate, description, created_at }: Props) {
  return (
    <li className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow group hover:border-blue-400 transition">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3 font-semibold text-gray-800">
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image
              src={author.user_pic}
              alt={`Foto de ${author.name}`}
              fill
              sizes="32px"
              className="rounded-full object-cover border border-gray-300"
            />
          </div>
          {author.name}
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) =>
            i < rate ? (
              <FaStar key={i} className="text-yellow-400" />
            ) : (
              <FaRegStar key={i} className="text-gray-300" />
            )
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 italic flex items-start gap-2">
        <FaQuoteLeft className="text-amber-400 mt-1" />
        {description}
      </p>
      <div className="text-xs text-gray-400 mt-2">
        {new Date(created_at).toLocaleDateString()}
      </div>
    </li>
  );
}
