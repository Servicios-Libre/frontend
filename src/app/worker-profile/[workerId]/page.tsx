import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

interface Props {
  params: { workerId: string };
}

export default function WorkerProfilePage({ params }: Props) {
  return <WorkerProfileClient id={params.workerId} />;
}
