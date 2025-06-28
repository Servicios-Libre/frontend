/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
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
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
            email: user.email,
            name: user.name,
            image: user.image,
          });

          token.backendJwt = res.data.token;
        } catch (error) {
          console.error("Error al autenticar con Google:", error);
          token.backendJwt = null;
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      session.backendJwt = token.backendJwt ?? null;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
