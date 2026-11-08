import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("school_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("school_token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAutoLogout = () => {
      logout();
    };

    window.addEventListener("auth:logout", handleAutoLogout);
    setLoading(false);
    return () => window.removeEventListener("auth:logout", handleAutoLogout);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token: jwtToken, id, name, email: userEmail, role } = res.data;
    const userData = { id, name, email: userEmail, role };

    localStorage.setItem("school_token", jwtToken);
    localStorage.setItem("school_user", JSON.stringify(userData));

    setToken(jwtToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("school_token");
    localStorage.removeItem("school_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

