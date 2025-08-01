// types/next-auth.d.ts
import { Ticket } from "@/types";

declare module "next-auth" {
  interface Session {
    backendJwt?: string | null;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string;
      premium: boolean;
      tickets?: Ticket[];
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
    premium: boolean;
    tickets?: Ticket[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendJwt?: string | null;
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    premium?: boolean;
    image?: string;
    tickets?: Ticket[];
  }
}
