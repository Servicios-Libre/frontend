type Props = {
  message?: string;
};

export default function AlertMessage({ message }: Props) {
  if (!message) return null;
  return (
    <>
      {message && (
        <div
          className={`${
            message.includes("rror") ||
            message.includes("debe") ||
            message.includes("existe") ||
            message.includes("incorrecto")
              ? "text-red-600"
              : "text-green-600"
          } text-sm text-center font-medium mb-2`}
        >
          {message}
        </div>
      )}
    </>
  );
}
