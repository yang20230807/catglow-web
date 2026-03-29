import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useSearch } from '../../hooks/useFeed';
import { VideoCard } from '../../components/VideoCard/VideoCard';

export const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [inputValue, setInputValue] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearch(keyword);

  const videos = data?.pages.flatMap((page) => page.list) ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(inputValue.trim());
  };

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-800">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="搜索视频..."
            className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </form>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400">搜索中...</p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="bg-gray-900 rounded-lg overflow-hidden">
                <VideoCard video={video} isActive={false} />
                <div className="p-2">
                  <p className="text-sm line-clamp-2">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : keyword ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400">未找到相关视频</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500">输入关键词搜索</p>
          </div>
        )}

        {/* Load More */}
        {hasNextPage && !isLoading && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50"
            >
              {isFetchingNextPage ? '加载中...' : '加载更多'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
