import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WorkerProfilePage({ params }: any) {
  return <WorkerProfileClient id={params.workerId} />;
}
