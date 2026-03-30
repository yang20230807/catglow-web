import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { FeedResponse } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
});

export const useRecommendFeed = () => {
  return useInfiniteQuery({
    queryKey: ['feed', 'recommend'],
    queryFn: async ({ pageParam = 1 }): Promise<FeedResponse> => {
      const res = await api.get('/feed/recommend', {
        params: { page: pageParam, pageSize: 10 },
      });
      return res.data.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
  });
};

export const useSearch = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: ['search', keyword],
    queryFn: async ({ pageParam = 1 }): Promise<FeedResponse> => {
      const res = await api.get('/feed/search', {
        params: { keyword, page: pageParam, pageSize: 10 },
      });
      return res.data.data;
    },
    initialPageParam: 1,
    enabled: !!keyword,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
  });
};
