'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noNavbarRoutes = ['/dashboard'];
  const noFooterRoutes = ['/profile']; 

  const shouldShowNavbar = !noNavbarRoutes.some((path) => pathname.startsWith(path));
  const shouldShowFooter = !noFooterRoutes.some((path) => pathname.startsWith(path)); 

  useEffect(() => {
    // ⚠️ Solo para desarrollo: borra el token cada vez que se inicia el frontend
    console.log("Borrando token");
    
  }, []);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
      {shouldShowFooter && <Footer />} 
    </>
  );
}
