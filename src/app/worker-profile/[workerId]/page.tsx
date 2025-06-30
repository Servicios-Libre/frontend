import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

export default async function WorkerProfilePage({
  params,
}: {
  params: Promise<{ workerId: string }>;
}) {
  const { workerId } = await params;
  return (
    <div className="bg-white min-h-screen">
      <WorkerProfileClient id={workerId} />
    </div>
  );
}