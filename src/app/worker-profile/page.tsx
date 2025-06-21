import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WorkerProfilePage({ searchParams }: any) {
  if (!searchParams.id) return <div>No se proporcionó ID</div>;
  return <WorkerProfileClient id={searchParams.id} />;
}