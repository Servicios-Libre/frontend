/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account && user) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          console.log({
            email: user.email,
            password: "Google@Auth",
            Image: user.image,
            name: user.name,
          }); // <-- Agrega este log
          const res = await axios.post(`${apiUrl}/auth/google`, {
            email: user.email,
            password: "Google@Auth", // Valor fijo para login social
            Image: user.image,       // "Image" con mayúscula
            name: user.name,         // <-- Agregado el nombre
          });
          token.backendJwt = res.data.token;
          console.log(res.data.token);
          // localStorage.setItem("token", res.data.token); // <-- Elimina o comenta esta línea
        } catch (e) {
          console.error("Error al registrar usuario con Google:", e);
          token.backendJwt = null;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.backendJwt = token.backendJwt;
      return session;
    },
  },
});

export { handler as GET, handler as POST };