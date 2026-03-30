import { Feed } from '../../components/Feed/Feed';
import { useRecommendFeed } from '../../hooks/useFeed';

export const Home = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useRecommendFeed();

  // Flatten pages to video list
  const videos = data?.pages.flatMap((page) => page.list) ?? [];

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-black text-white">
        <div className="text-2xl mb-4">🎬 CatGlow</div>
        <div className="text-gray-400">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <p className="text-red-500">加载失败: {error.message}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-black text-white">
        <p className="text-gray-400">暂无视频</p>
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
