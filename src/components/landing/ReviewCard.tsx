import Image from "next/image";

type ReviewCardProps = {
  name: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
};

export default function ReviewCard({ name, rating, comment, avatarUrl }: ReviewCardProps) {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 space-y-2 flex flex-col h-full">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`Foto de ${name}`}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-sm text-gray-900 font-semibold">{name}</p>
          <div className="flex text-sm">{stars}</div>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-normal flex-grow">{comment}</p>
    </div>
  );
}
