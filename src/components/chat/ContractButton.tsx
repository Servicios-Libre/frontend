'use client';

import { useRouter } from 'next/navigation';
import { UserBasic } from '@/types';

interface ContractButtonProps {
  worker: UserBasic;
}

const ContractButton = ({ worker }: ContractButtonProps) => {
  const router = useRouter();

  const handleContract = () => {
    router.push(`/chat/${worker.id}`);
  };

  return (
    <button
      onClick={handleContract}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
    >
      Contratar Servicio
    </button>
  );
};

export default ContractButton;
