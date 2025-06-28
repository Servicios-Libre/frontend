import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

type Props = {
  params: {
    workerId: string;
  };
};

export default async function WorkerProfilePage({ params }: Props) {
  return (
    <div className="bg-white min-h-screen">
      <WorkerProfileClient id={params.workerId} />
    </div>
  );
}
