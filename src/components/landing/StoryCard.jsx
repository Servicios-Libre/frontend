export default function StoryCard({ imageSrc, alt, text }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
      <img src={imageSrc} alt={alt} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-gray-700 text-sm">{text}</p>
      </div>
    </div>
  );
}
