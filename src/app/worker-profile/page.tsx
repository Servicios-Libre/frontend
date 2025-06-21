import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

interface Props {
  searchParams: { id?: string };
}

export default function WorkerProfilePage({ searchParams }: Props) {
  if (!searchParams.id) return <div>No se proporcionó ID</div>;
  return <WorkerProfileClient id={searchParams.id} />;
}