import { useState, useEffect } from "react";

export const useReviewCheck = (
  contractId: string | undefined,
  completed: boolean,
  userRole: "client" | "worker"
) => {
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      if (contractId && completed && userRole === "client") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/check?contractId=${contractId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await res.json();
          setAlreadyReviewed(data.reviewExists);
        } catch (err) {
          console.error("Error al verificar reseña:", err);
        }
      }
    };

    fetchReview();
  }, [contractId, completed, userRole]);

  return alreadyReviewed;
};
