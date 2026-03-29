import axios from 'axios';
import type { ApiResponse, FeedResponse, Video } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
});

export const feedApi = {
  getRecommend: async (page = 1, pageSize = 10): Promise<FeedResponse> => {
    const res = await api.get<ApiResponse<FeedResponse>>('/feed/recommend', {
      params: { page, pageSize },
    });
    return res.data.data;
  },

  search: async (keyword: string, page = 1, pageSize = 10): Promise<FeedResponse> => {
    const res = await api.get<ApiResponse<FeedResponse>>('/search', {
      params: { keyword, page, pageSize },
    });
    return res.data.data;
  },

  getVideo: async (id: string): Promise<Video> => {
    const res = await api.get<ApiResponse<Video>>(`/video/${id}`);
    return res.data.data;
  },
};
