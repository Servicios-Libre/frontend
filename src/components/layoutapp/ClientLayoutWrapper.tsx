'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noNavbarRoutes = ['/dashboard', '/profile'];
  const shouldShowNavbar = !noNavbarRoutes.some((path) => pathname.startsWith(path));

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
      <Footer />
    </>
  );
}
