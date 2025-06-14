import axios from 'axios';


interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export async function loginUser(credentials: Credentials): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, credentials);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error.message;
    } else {
      throw error;
    }
  }
}
