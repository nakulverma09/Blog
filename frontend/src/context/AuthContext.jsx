// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axiosInstance"; // axios with baseURL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.get("https://creative-86-backend.onrender.com/refresh-token", {
        withCredentials: true,
      });
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
    } catch (err) {
      console.log("Not logged in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAccessToken(); // on app load
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
