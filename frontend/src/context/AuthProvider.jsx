import { useState } from "react";
import { authApi } from "../api/api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("agro_user")) || null;
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
      sessionStorage.setItem("agro_user", JSON.stringify(u));
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
      sessionStorage.setItem("agro_user", JSON.stringify(u));
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
    sessionStorage.removeItem("agro_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
