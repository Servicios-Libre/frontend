import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import GoogleAuthSync from "@/components/auth/GoogleAuthSync";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Servicio Libre",
  description: "Encuentra a trabajadores cerca tuyo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GoogleAuthSync />
          {children}
          <ToastContainer position="top-right" autoClose={2500} />
        </Providers>
      </body>
    </html>
  );
}
