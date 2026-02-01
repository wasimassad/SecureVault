// src/services/authService.ts
import { apiClient } from "./apiClient";

const TOKEN_KEY = "token";

export const authService = {
  async login(email: string, password: string) {
    const res = await apiClient.post<any>("/api/auth/login", { email, password });
    localStorage.setItem(TOKEN_KEY, res.data.token);
    return res.data;
  },

  async register(email: string, password: string) {
    const res = await apiClient.post<any>("/api/auth/register", { email, password });
    localStorage.setItem(TOKEN_KEY, res.data.token);
    return res.data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
};
