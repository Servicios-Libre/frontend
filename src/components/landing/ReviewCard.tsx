// src/components/landing/ReviewCard.tsx
type ReviewCardProps = {
  name: string;
  rating: number;
  comment: string;
};

export default function ReviewCard({ name, rating, comment }: ReviewCardProps) {
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
    <div className="bg-white rounded-xl shadow-lg p-5 space-y-2 flex flex-col h-full"> {/* Reducido padding */}
      <div className="flex justify-start text-lg"> {/* Reducido texto */}
        {stars}
      </div>
      <p className="text-sm text-gray-700 flex-grow leading-normal">{comment}</p> {/* Reducido texto y leading */}
      <p className="text-gray-900 font-semibold mt-2 border-t pt-2 border-gray-100">– {name}</p> {/* Reducido pt */}
    </div>
  );
}