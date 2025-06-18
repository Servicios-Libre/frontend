import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/signin`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  street: string;
  house_number: number;
  city: string;
  state: string;
  zip_code: string;
}) => {
  const response = await axios.post(`${API_URL}/auth/signup`, data);
  return response.data;
};
