import axios from 'axios';
import type { ApiResponse, User, LoginRequest, RegisterRequest } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
});

export const userApi = {
  login: async (username: string, password: string): Promise<User> => {
    const res = await api.post<ApiResponse<User>>('/user/login', {
      username,
      password,
    } as LoginRequest);
    if (res.data.code !== 200) {
      throw new Error(res.data.message);
    }
    return res.data.data;
  },

  register: async (username: string, password: string, nickname?: string): Promise<User> => {
    const res = await api.post<ApiResponse<User>>('/user/register', {
      username,
      password,
      nickname,
    } as RegisterRequest);
    if (res.data.code !== 200) {
      throw new Error(res.data.message);
    }
    return res.data.data;
  },

  getUserInfo: async (userId: number): Promise<User> => {
    const res = await api.get<ApiResponse<User>>(`/user/${userId}`);
    return res.data.data;
  },

  getUserByUsername: async (username: string): Promise<User> => {
    const res = await api.get<ApiResponse<User>>(`/user/username/${username}`);
    return res.data.data;
  },
};
