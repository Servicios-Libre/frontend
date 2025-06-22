// src/components/landing/StoryCard.tsx
import Image from "next/image";

type StoryCardProps = {
  imageSrc: string;
  alt: string;
  text: string;
};

export default function StoryCard({ imageSrc, alt, text }: StoryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-5 gap-5"> {/* Reducido padding y gap */}
      <div className="relative w-full md:w-1/3 h-40 md:h-auto md:aspect-square flex-shrink-0"> {/* Reducido h */}
        <Image
          src={imageSrc}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="rounded-lg shadow-md"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <p className="text-base text-gray-700 leading-relaxed italic">{text}</p> {/* Reducido texto */}
      </div>
    </div>
  );
}