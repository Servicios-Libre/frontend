import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import WorkerProfileClient from "@/components/worker-profile/WorkerProfileClient";
import { JSX } from "react";

type Props = {
  params: {
    id: string;
  };
};

// ✅ Solución: tipado explícito para componente async
export default async function WorkerProfilePage({ params }: Props): Promise<JSX.Element> {
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
