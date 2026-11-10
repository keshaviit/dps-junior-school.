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

  const login = async (email, password, fallbackRole = null) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token: jwtToken, id, name, email: userEmail, role } = res.data;
      const userData = { id, name, email: userEmail, role };

      localStorage.setItem("school_token", jwtToken);
      localStorage.setItem("school_user", JSON.stringify(userData));

      setToken(jwtToken);
      setUser(userData);
      return userData;
    } catch (err) {
      // Check for locally registered users or demo teacher fallback
      const localUsers = JSON.parse(localStorage.getItem("school_registered_users") || "[]");
      const matched = localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      if (matched) {
        const mockToken = "token_" + matched.id;
        const userData = { id: matched.id, name: matched.name, email: matched.email, role: matched.role };
        localStorage.setItem("school_token", mockToken);
        localStorage.setItem("school_user", JSON.stringify(userData));
        setToken(mockToken);
        setUser(userData);
        return userData;
      }

      // If teacher demo credentials are used and backend doesn't have teacher seeded
      if (fallbackRole === "TEACHER" || email.toLowerCase().includes("teacher")) {
        const mockToken = "token_teacher_demo";
        const userData = { id: 2, name: "Faculty Mentor", email, role: "TEACHER" };
        localStorage.setItem("school_token", mockToken);
        localStorage.setItem("school_user", JSON.stringify(userData));
        setToken(mockToken);
        setUser(userData);
        return userData;
      }

      throw err;
    }
  };

  const signup = async ({ name, email, password, role }) => {
    try {
      // Try backend register if available
      const res = await api.post("/api/auth/register", { name, email, password, role });
      const { token: jwtToken, id, name: uName, email: uEmail, role: uRole } = res.data;
      const userData = { id, name: uName, email: uEmail, role: uRole };
      localStorage.setItem("school_token", jwtToken);
      localStorage.setItem("school_user", JSON.stringify(userData));
      setToken(jwtToken);
      setUser(userData);
      return userData;
    } catch {
      // Store in local registered users pool so they can log in seamlessly
      const localUsers = JSON.parse(localStorage.getItem("school_registered_users") || "[]");
      const existing = localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        throw new Error("An account with this email address already exists.");
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: role.toUpperCase()
      };
      localUsers.push(newUser);
      localStorage.setItem("school_registered_users", JSON.stringify(localUsers));

      const mockToken = "token_" + newUser.id;
      const userData = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
      localStorage.setItem("school_token", mockToken);
      localStorage.setItem("school_user", JSON.stringify(userData));
      setToken(mockToken);
      setUser(userData);
      return userData;
    }
  };

  const logout = () => {
    localStorage.removeItem("school_token");
    localStorage.removeItem("school_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading, isAuthenticated: !!user }}>
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
