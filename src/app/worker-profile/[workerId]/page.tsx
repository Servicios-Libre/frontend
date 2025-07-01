import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkerProfilePage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  const { id } = params;

  return (
    <div className="bg-white min-h-screen">
      <WorkerProfileClient id={id} />
    </div>
  );
}
