import { useEffect } from 'react';
import { Feed } from '../../components/Feed/Feed';
import { useRecommendFeed } from '../../hooks/useFeed';
import { useFeedStore } from '../../store';

export const Home = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useRecommendFeed();

  const { setFeedList } = useFeedStore();

  // Flatten pages to video list
  const videos = data?.pages.flatMap((page) => page.list) ?? [];

  // Sync to store on load
  useEffect(() => {
    if (videos.length > 0) {
      setFeedList(videos);
    }
  }, [videos, setFeedList]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <p className="text-gray-400">加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <p className="text-red-500">加载失败，请重试</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Feed
        videos={videos}
        onLoadMore={() => hasNextPage && fetchNextPage()}
        hasMore={hasNextPage && !isFetchingNextPage}
      />
    </div>
  );
};
