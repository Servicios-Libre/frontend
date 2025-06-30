import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

interface WorkerProfilePageProps {
  params: { workerId: string };
}

export default function WorkerProfilePage({ params }: WorkerProfilePageProps) {
  const { workerId } = params;


  return (
    <div className="bg-white min-h-screen">
      <WorkerProfileClient id={workerId} />
    </div>
  );
}
