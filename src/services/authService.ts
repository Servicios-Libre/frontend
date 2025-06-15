import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; 

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
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
  phone: number;
  street: string;
  house_number: number; // Nuevo campo
  city: string;
  state: string;
  zip_code: string;     // Nuevo campo
}) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
  return response.data;
};
