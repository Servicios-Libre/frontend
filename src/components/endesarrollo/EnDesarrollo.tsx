'use client';

import Image from 'next/image';

export const EnDesarrollo = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-100">
      <div className='h-96 w-96'>
        <Image
          src="/img/obras.jpg"
          alt="Página en desarrollo"
          width={550}
          height={550}
          className="rounded-lg mb-6 shadow-lg"
          priority
        />
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Página en Desarrollo 🚧
      </h1>
      <p className="text-gray-600 max-w-md">
        Estamos trabajando para habilitar esta sección muy pronto. ¡Gracias por tu paciencia!
      </p>
    </div>
  );
};
