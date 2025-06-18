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
          const apiUrl = process.env.NEXT_PUBLIC_API_URL; // <-- Agregado
          const res = await axios.post(`${apiUrl}/auth/google`, {
            name: user.name,
            email: user.email,
            image: user.image,
          });
          token.backendJwt = res.data.token;
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