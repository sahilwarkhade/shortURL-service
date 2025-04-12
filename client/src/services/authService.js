// src/services/authService.js
import axios from "axios";

// const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;
const API_URL="http://localhost:5000"

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const { token } = response.data;
  if (token) localStorage.setItem("token", token);
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
