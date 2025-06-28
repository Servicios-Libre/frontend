import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

type WorkerProfilePageProps = {
  params: {
    workerId: string;
  };
};

export default function WorkerProfilePage({ params }: WorkerProfilePageProps) {
  return (
    <div className="bg-white min-h-screen">
      <WorkerProfileClient id={params.workerId} />
    </div>
  );
}