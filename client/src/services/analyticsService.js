// src/services/analyticsService.js
import axios from "axios";
import { getToken } from "./authService";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/analytics`;

export const getAnalytics = async () => {
  const token = getToken();
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
