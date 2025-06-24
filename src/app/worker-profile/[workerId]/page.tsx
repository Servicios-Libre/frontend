import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

interface PageProps {
  params: {
    workerId: string;
  };
}

export default async function WorkerProfilePage({ params }: PageProps) {
  const { workerId } = params;

  return (
    <div className="bg-white min-h-screen">
      <WorkerProfileClient id={workerId} />
    </div>
  );
}
