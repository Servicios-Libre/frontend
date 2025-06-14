// hooks/useSession.ts
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export function useSession() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    if (token) {
      try {
        const decoded = jwt.decode(token) as JwtPayload;
        setUser(decoded);
      } catch {
        setUser(null);
      }
    }
  }, []);

  return { user };
}
