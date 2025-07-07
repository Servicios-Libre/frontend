import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

type Props = {
    params: Promise<{ workerId: string }>;
};

export default async function WorkerProfilePage({ params }: Props) {
  
  const { workerId } = await params;

  return (
    <div className="bg-white min-h-screen">
      <WorkerProfileClient id={workerId} />
    </div>
  );
}