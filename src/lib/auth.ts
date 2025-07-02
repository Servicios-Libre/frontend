// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import api from "@/services/axiosConfig";
import { Ticket } from "@/types";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";

interface MyUser extends User {
  id: string;
  role: string;
  tickets?: Ticket[];
  image?: string;
  premium: boolean; // <-- Añadido
}

interface MyJWT extends JWT {
  backendJwt?: string | null;
  id?: string;
  role?: string;
  tickets?: Ticket[];
  name?: string;
  email?: string;
  image?: string;
  premium?: boolean; // <-- Añadido
}

export const authOptions: NextAuthOptions = {
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

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const decoded: any = jwtDecode(token);

          return {
            accessToken: token,
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            tickets: decoded.tickets,
            image: decoded.image,
            premium: decoded.premium, // <-- Añadido aquí
          } as MyUser;
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

        myToken.id = myUser.id;
        myToken.name = myUser.name;
        myToken.email = myUser.email;
        myToken.role = myUser.role;
        myToken.tickets = myUser.tickets;
        myToken.image = myUser.image;
        myToken.premium = myUser.premium; // <-- Añadido aquí

        if (account?.provider === "google") {
          try {
            const res = await api.post("/auth/google", {
              email: myUser.email,
              name: myUser.name,
              image: myUser.image,
            });

            myToken.backendJwt = res.data.token;
            myToken.id = res.data.id;
            myToken.role = res.data.role;
            myToken.tickets = res.data.tickets;
            myToken.premium = res.data.premium; // <-- Añadido aquí
          } catch (err) {
            console.error("Error al autenticar con Google:", err);
            myToken.backendJwt = null;
          }
        }

        if (account?.provider === "credentials") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        premium: myToken.premium ?? false, // <-- Añadido aquí
      };

      return session;
    },
  },
};
