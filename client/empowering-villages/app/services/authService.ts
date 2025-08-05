import axios from "../lib/axios";

export const register = async(data: { name: string; email: string; password: string }) => {
    const response = await axios.post("/auth/register", data);
  return response.data
};

export const login = async(data: {email: string; password: string }) => {
    const response = await axios.post("/auth/login", data);
  return response.data
};

export const logout = async() => {
    const response = await axios.post("/auth/logout");
  return response.data
};

