type Props = {
  message?: string;
  error?: string;
};

export default function AlertMessage({ message, error }: Props) {
  if (!message && !error) return null;
  return (
    <>
      {message && (
        <div className="text-green-600 text-sm text-center font-medium mb-2">
          {message}
        </div>
      )}
      {error && (
        <div className="text-red-600 text-sm text-center font-medium mb-2">
          {error}
        </div>
      )}
    </>
  );
}