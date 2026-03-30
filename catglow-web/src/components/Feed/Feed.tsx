import { useEffect, useRef, useCallback, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync videos to store
  useEffect(() => {
    if (videos.length > 0) {
      appendFeed(videos);
    }
  }, [videos, appendFeed]);

  // Handle scroll for desktop (vertical scroll)
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

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
  }, [currentIndex, setCurrentIndex, videos.length, hasMore, onLoadMore, isMobile]);

  // Touch/drag handling for mobile (swipe up/down)
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const container = containerRef.current;
    if (!container) return;

    const itemHeight = container.clientHeight;
    const scrollThreshold = itemHeight * 0.3;

    if (Math.abs(deltaY) > scrollThreshold) {
      if (deltaY > 0 && currentIndex < videos.length - 1) {
        // Swipe up - next
        container.scrollTo({
          top: (currentIndex + 1) * itemHeight,
          behavior: 'smooth',
        });
        setCurrentIndex(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Swipe down - previous
        container.scrollTo({
          top: (currentIndex - 1) * itemHeight,
          behavior: 'smooth',
        });
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  if (isMobile) {
    // Mobile: Full-screen card list
    return (
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="h-full w-full flex-shrink-0 snap-center"
          >
            <VideoCard video={video} />
          </div>
        ))}

        {hasMore && (
          <div className="h-full w-full flex items-center justify-center bg-gray-900 snap-center">
            <p className="text-gray-400">加载中...</p>
          </div>
        )}
      </div>
    );
  }

  // Desktop: Scrollable list
  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-y-auto"
      onScroll={handleScroll}
    >
      <div className="flex flex-col">
        {videos.map((video) => (
          <div
            key={video.id}
            className="h-[calc(100vh-7rem)] w-full flex-shrink-0 border-b border-gray-800"
          >
            <VideoCard video={video} />
          </div>
        ))}

        {hasMore && (
          <div className="h-32 flex items-center justify-center bg-gray-900">
            <p className="text-gray-400">加载中...</p>
          </div>
        )}
      </div>
    </div>
  );
};
