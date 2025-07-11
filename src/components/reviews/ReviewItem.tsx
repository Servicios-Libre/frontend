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
        <li className="bg-gray-50 p-4 sm:p-5 rounded-xl border border-gray-100 shadow group hover:border-blue-400 transition">
            <div className="flex justify-between items-start gap-3 mb-2">
                {/* Izquierda: avatar + nombre + fecha */}
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 relative flex-shrink-0">
                            <Image
                                src={author.user_pic}
                                alt={`Foto de ${author.name}`}
                                fill
                                sizes="36px"
                                className="rounded-full object-cover border border-gray-300"
                            />
                        </div>
                        <span className="text-base font-semibold text-gray-800">
                            {author.name}
                        </span>
                    </div>
                    <div className="text-xs text-gray-400 sm:ml-4 pl-12 sm:pl-0">
                        {new Date(created_at).toLocaleDateString()}
                    </div>
                </div>

                {/* Derecha: estrellas */}
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) =>
                        i < rate ? (
                            <FaStar key={i} className="text-yellow-400 text-sm" />
                        ) : (
                            <FaRegStar key={i} className="text-gray-300 text-sm" />
                        )
                    )}
                </div>
            </div>

            <p className="text-sm text-gray-600 italic flex items-start gap-2 leading-relaxed">
                <FaQuoteLeft className="text-amber-400 mt-1 shrink-0" />
                {description}
            </p>
        </li>
    );
}
