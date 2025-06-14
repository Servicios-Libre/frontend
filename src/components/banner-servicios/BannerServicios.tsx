import Image from 'next/image'
import React from 'react'

const BannerServicios = () => {
    return (
        <>
            <div className="relative w-full h-[400px]">
                <Image
                    fill
                    src="/img/banner-servicios.jpg"
                    alt="Personas trabajando"
                    className="absolute inset-0 w-full h-full object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-20" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 pt-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Buscá trabajadores cerca tuyo
                    </h1>
                    <p className="text-base md:text-lg mb-6 hidden md:flex">
                        Filtrá por rubro, zona o reputación y encontrá a la persona ideal.
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-semibold">
                        Publicar un trabajo
                    </button>
                </div>
            </div>
        </>
    )
}

export default BannerServicios
