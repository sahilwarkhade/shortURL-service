// src/services/linkService.js
import axios from "axios";
import { getToken } from "./authService";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/shortlink`;

export const createShortLink = async (linkData) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/create`, linkData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchUserLinks = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/user-links`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
