import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

interface DecodedUser {
  id: string;
  name?: string;
  email?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function useAuthUser() {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwtDecode(storedToken);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
        });
      } catch {
        setUser(null);
      }
    }
  }, []);

  return { user, token };
}