export default function InfoCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-blue-500 shadow-lg rounded-xl p-5 text-center transition hover:scale-105">
            <div className="flex justify-between items-start">
                <div className="text-blue-200 text-2xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
            </div>
            <p className="text-gray-100 text-sm">{description}</p>
        </div>
    );
}