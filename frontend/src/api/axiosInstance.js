// src/api/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://creative-86-backend.onrender.com", // Change this to your backend
  withCredentials: true, // Send cookies
});

// Auto attach accessToken to requests
instance.interceptors.request.use((config) => {
  const token = window.accessToken; // fallback if you're storing it globally
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
