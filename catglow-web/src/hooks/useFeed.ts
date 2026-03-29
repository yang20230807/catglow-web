import { useInfiniteQuery } from '@tanstack/react-query';
import { mockApi } from '../api/mock';

export const useRecommendFeed = () => {
  return useInfiniteQuery({
    queryKey: ['feed', 'recommend'],
    queryFn: ({ pageParam = 1 }) => mockApi.getRecommend(pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
  });
};

export const useSearch = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: ['search', keyword],
    queryFn: ({ pageParam = 1 }) => mockApi.search(keyword, pageParam, 10),
    initialPageParam: 1,
    enabled: !!keyword,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
  });
};
