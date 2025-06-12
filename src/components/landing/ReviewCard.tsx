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
    <div className="bg-white rounded-lg shadow-md p-6 text-sm space-y-2">
      <div className="text-yellow-500 text-lg">{stars}</div>
      <p className="text-gray-700 italic">`{comment}`</p>
      <p className="text-gray-900 font-semibold mt-2">– {name}</p>
    </div>
  );
}
