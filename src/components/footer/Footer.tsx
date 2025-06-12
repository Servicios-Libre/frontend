import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faLinkedin,
    faYoutube,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";


export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-auto w-full max-w-screen-xl px-8 py-6 lg:py-8">
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

                {/* Logo + Topics */}
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <Image width={100} height={100} src="/img/logosl-dark.png" className="h-8 me-3" alt="FlowBite Logo" />
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 font-semibold text-gray-900">Empresa</h2>
                            <ul className="text-gray-500">
                                <li><a href="#" className="hover:underline">Trabaja con nosotros</a></li>
                                <li><a href="#" className="hover:underline">Proyectos</a></li>
                                <li><a href="#" className="hover:underline">Contacto</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 font-semibold text-gray-900">Soporte</h2>
                            <ul className="text-gray-500">
                                <li><a href="#" className="hover:underline">Ayuda</a></li>
                                <li><a href="#" className="hover:underline">Preguntas frecuentes</a></li>
                                <li><a href="#" className="hover:underline">Centro de soporte</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 font-semibold text-gray-900">Legal</h2>
                            <ul className="text-gray-500">
                                <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
                                <li><a href="#" className="hover:underline">Política de privacidad</a></li>
                                <li><a href="#" className="hover:underline">Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

                {/* CopyRight + Enlaces */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2025 <a href="https://flowbite.com/" className="hover:underline">Grupo 4™</a>. Todos los derechos reservados.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="#" className="text-gray-500 hover:text-gray-900" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 ms-5" aria-label="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 ms-5" aria-label="YouTube">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 ms-5" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
