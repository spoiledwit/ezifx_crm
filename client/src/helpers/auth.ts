import axios from "axios";
import { useAuthStore } from "store/useAuthStore";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  useAuthStore.getState().setUser(null);
  localStorage.removeItem("token");
};

export const register = async (name:string, email: string, password: string) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URI}/auth/register`,
    {
      name,
      email,
      password,
    }
  );
  return response.data;
};

export const getUserFromLocalStorage = async (token:string) => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};