import { useState } from "react";
import { authApi } from "../api/api";
import { AuthContext } from "./AuthContext";

const USER_STORAGE_KEY = "agro_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser =
        localStorage.getItem(USER_STORAGE_KEY) ||
        sessionStorage.getItem(USER_STORAGE_KEY);

      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const u = await authApi.login(email, password);
      setUser(u);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
      sessionStorage.removeItem(USER_STORAGE_KEY);
      return u;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const u = await authApi.register(name, email, password);
      setUser(u);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
      sessionStorage.removeItem(USER_STORAGE_KEY);
      return u;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
