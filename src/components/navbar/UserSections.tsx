'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUser, faFileInvoice, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Crown } from "lucide-react";
import { getProfile } from "@/services/profileService";

interface User {
  id?: string;
  name?: string;
  role?: "user" | "worker" | "admin" | null;
  premium?: boolean;
}

export function UserDropdown({
  user,
  logout,
}: {
  user: User | null;
  logout: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [profilePremium, setProfilePremium] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchProfile = async () => {
      try {
        const { premium } = await getProfile();
        setProfilePremium(premium);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (user) {
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  if (!mounted) return null;

  if (user) {
    return (
      <div className="relative ml-6" ref={dropdownRef}>
        <button
          className={`cursor-pointer ${
            profilePremium
              ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-300"
              : "bg-blue-300 text-white hover:bg-blue-400"
          } font-normal px-4 py-2 rounded transition flex items-center gap-2 hover:shadow-sm`}
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen((open) => !open);
          }}
        >
          {profilePremium && <Crown className="w-6 h-6 text-orange-400" />}
          {user.name ?? "Usuario"}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-xs transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50 border border-blue-100 animate-fade-in">
            <Link
              href="/profile"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded-t transition-colors duration-150 cursor-pointer"
            >
              Perfil
            </Link>
            {user.role === "worker" && user.id && (
              <Link
                href={`/worker-profile/${user.id}`}
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
              >
                Perfil de trabajador
              </Link>
            )}
            {user.role === "admin" && (
              <Link
                href="/dashboard"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
              >
                Panel de administrador
              </Link>
            )}
            <Link
              href="/invoices"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
            >
              Facturas
            </Link>
            <button
              onClick={() => {
                logout();
                setDropdownOpen(false);
                router.push("/landing");
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-600 rounded-b transition-colors duration-150 cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href="/auth"
      className="ml-6 bg-blue-300 hover:bg-blue-400 text-white font-normal px-4 py-2 rounded transition cursor-pointer shadow-sm hover:shadow-md"
    >
      Ingresá
    </Link>
  );
}

export function MobileUserSection({
  user,
  logout,
  setIsOpen,
}: {
  user: User | null;
  logout: () => void;
  setIsOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (user) {
    return (
      <div className="flex flex-col items-start gap-2 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-blue-700">{user.name ?? "Usuario"}</span>
        </div>
        <Link
          href="/profile"
          onClick={() => setIsOpen(false)}
          className="w-full px-4 py-2 rounded-t hover:bg-blue-100 hover:text-blue-700 text-sm flex items-center gap-2 transition-colors duration-150 cursor-pointer"
        >
          <FontAwesomeIcon icon={faUser} className="text-blue-400" />
          <span>Perfil</span>
        </Link>
        {user.role === "worker" && user.id && (
          <Link
            href={`/worker-profile/${user.id}`}
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 hover:bg-blue-100 hover:text-blue-700 text-sm flex items-center gap-2 transition-colors duration-150 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser} className="text-blue-400" />
            <span>Perfil de trabajador</span>
          </Link>
        )}
        {user.role === "admin" && (
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 hover:bg-blue-100 hover:text-blue-700 text-sm flex items-center gap-2 transition-colors duration-150 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser} className="text-blue-400" />
            <span>Panel de administrador</span>
          </Link>
        )}
        <Link
          href="/invoices"
          onClick={() => setIsOpen(false)}
          className="w-full px-4 py-2 hover:bg-blue-100 hover:text-blue-700 text-sm flex items-center gap-2 transition-colors duration-150 cursor-pointer"
        >
          <FontAwesomeIcon icon={faFileInvoice} className="text-blue-400" />
          <span>Facturas</span>
        </Link>
        <button
          onClick={() => {
            logout();
            setIsOpen(false);
            router.push("/landing");
          }}
          className="w-full text-left px-4 py-2 rounded-b hover:bg-red-100 hover:text-red-600 text-sm flex items-center gap-2 transition-colors duration-150 cursor-pointer"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="text-blue-400" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/auth"
      onClick={() => setIsOpen(false)}
      className="inline-block bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition cursor-pointer shadow-sm hover:shadow-lg"
    >
      Iniciar Sesión
    </Link>
  );
}
