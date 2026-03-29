import { useEffect, useRef, useCallback } from 'react';
import { VideoCard } from '../VideoCard/VideoCard';
import { useFeedStore } from '../../store';
import type { Video } from '../../types';

interface FeedProps {
  videos: Video[];
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const Feed = ({ videos, onLoadMore, hasMore }: FeedProps) => {
  const { currentIndex, setCurrentIndex, appendFeed } = useFeedStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Sync videos to store
  useEffect(() => {
    if (videos.length > 0) {
      appendFeed(videos);
    }
  }, [videos, appendFeed]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newIndex = Math.round(scrollTop / itemHeight);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < videos.length) {
      setCurrentIndex(newIndex);

      // Load more when near end
      if (hasMore && newIndex >= videos.length - 3) {
        onLoadMore?.();
      }
    }

    lastScrollY.current = scrollTop;
  }, [currentIndex, setCurrentIndex, videos.length, hasMore, onLoadMore]);

  // Touch/drag handling for mobile
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const container = containerRef.current;
    if (!container) return;

    const itemHeight = container.clientHeight;
    const scrollThreshold = itemHeight * 0.3;

    if (Math.abs(deltaY) > scrollThreshold) {
      if (deltaY > 0 && currentIndex < videos.length - 1) {
        // Swipe up - next video
        container.scrollTo({
          top: (currentIndex + 1) * itemHeight,
          behavior: 'smooth',
        });
      } else if (deltaY < 0 && currentIndex > 0) {
        // Swipe down - previous video
        container.scrollTo({
          top: (currentIndex - 1) * itemHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory"
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="h-full w-full flex-shrink-0 snap-center"
        >
          <VideoCard video={video} isActive={index === currentIndex} />
        </div>
      ))}

      {hasMore && (
        <div className="h-full w-full flex items-center justify-center bg-black">
          <p className="text-gray-400">加载中...</p>
        </div>
      )}
    </div>
  );
};
