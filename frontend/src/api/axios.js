import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;
const baseUrl = rawBaseUrl
  ? rawBaseUrl.replace(/\/$/, "")
  : "http://localhost:5000/api";
const api = axios.create({
  baseURL: baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aurora_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
