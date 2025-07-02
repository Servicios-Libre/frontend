/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { Ticket } from "@/types";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
import api from "@/services/axiosConfig";

interface MyUser extends User {
  id: string;
  role: string;
  tickets?: Ticket[];
  image?: string;
}

interface MyJWT extends JWT {
  backendJwt?: string | null;
  id?: string;
  role?: string;
  tickets?: Ticket[];
  name?: string;
  email?: string;
  image?: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await api.post("/auth/signin", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { token } = res.data;
          if (!token) return null;

          const decoded: any = jwtDecode(token);

          return {
            accessToken: token,
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            tickets: decoded.tickets,
          };
        } catch (error) {
          console.error("Error en login:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      const myToken = token as MyJWT;

      if (user) {
        const myUser = user as MyUser;

        myToken.name = myUser.name;
        myToken.email = myUser.email;
        myToken.image = myUser.image;

        if (account?.provider === "google") {
          try {
            const res = await api.post("/auth/google", {
              email: myUser.email,
              name: myUser.name,
              image: myUser.image,
            });

            const backendJwt = res.data.token;
            const decoded: any = jwtDecode(backendJwt);

            myToken.backendJwt = backendJwt;
            myToken.id = decoded.id;
            myToken.role = decoded.role;
            myToken.tickets = decoded.tickets ?? [];
            myToken.name = decoded.name;
            myToken.email = decoded.email;
          } catch (err) {
            console.error("Error al autenticar con Google:", err);
            myToken.backendJwt = null;
          }
        }

        if (account?.provider === "credentials") {
          myToken.backendJwt = (user as any).accessToken;
        }
      }

      return myToken;
    },

    async session({ session, token }) {
      const myToken = token as MyJWT;

      session.backendJwt = myToken.backendJwt ?? null;
      session.user = {
        id: myToken.id ?? "",
        name: myToken.name ?? "",
        email: myToken.email ?? "",
        role: myToken.role ?? "",
        tickets: myToken.tickets,
        image: myToken.image,
      };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
