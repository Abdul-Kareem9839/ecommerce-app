import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);
const TOKEN_KEY = "aurora_admin_token";
const USER_KEY = "aurora_admin_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (data.role !== "admin") {
        throw new Error("This account does not have admin access");
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data));
      setUser(data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
