import ReviewForm from "@/components/reviews/ReviewForm";

interface Props {
  contractId: string;
  trabajadorId: string;
  alreadyReviewed: boolean;
  setAlreadyReviewed: React.Dispatch<React.SetStateAction<boolean>>;
  userRole: "client" | "worker";
}

const ReviewSection = ({
  contractId,
  trabajadorId,
  alreadyReviewed,
  setAlreadyReviewed,
  userRole,
}: Props) => {
  if (userRole !== "client") return null;

  return !alreadyReviewed ? (
    <ReviewForm
      contractId={contractId}
      workerId={trabajadorId}
      token={localStorage.getItem("token") || ""}
      onReviewSubmitted={() => setAlreadyReviewed(true)}
    />
  ) : null;
};

export default ReviewSection;
