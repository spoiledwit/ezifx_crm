import axios from "axios";
import { useAuthStore } from "store/useAuthStore";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/login`, {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  useAuthStore.getState().setUser(null);
  localStorage.removeItem("token");
};

export const register = async (email: string, password: string) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URI}/register`,
    {
      email,
      password,
    }
  );
  return response.data;
};
