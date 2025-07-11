"use client";
import NoResults from "../ui/no-results/NoResults";
import ReviewItem from "./ReviewItem";

type Review = {
  id: string;
  rate: number;
  description: string;
  created_at: string;
  author: { name: string; user_pic: string };
};

type Props = {
  loading: boolean;
  reviews: Review[];
};

export default function ReviewList({ loading, reviews }: Props) {
  if (loading) return <p className="text-gray-500">Cargando reseñas...</p>;

  if (reviews.length === 0) {
    return (
        <NoResults mensaje="Este trabajador aún no tiene reseñas." />
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <ReviewItem key={r.id} {...r} />
      ))}
    </ul>
  );
}
