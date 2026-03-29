import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Heart, MessageCircle, Share2, User } from 'lucide-react';
import type { Video } from '../../types';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
}

export const VideoCard = ({ video, isActive }: VideoCardProps) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => setLiked(!liked);

  return (
    <div className="relative w-full h-full">
      {/* Video Player */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        {isActive && (
          <div className="w-full h-full">
            <ReactPlayer
              src={video.videoUrl}
              width="100%"
              height="100%"
              playing={isActive}
              muted={false}
              loop
              playsInline
            />
          </div>
        )}
      </div>

      {/* Cover (shown when video not loaded) */}
      {!isActive && (
        <img
          src={video.coverUrl}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-3 mb-2">
          {video.author.avatar ? (
            <img
              src={video.author.avatar}
              alt={video.author.nickname}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User size={20} />
            </div>
          )}
          <span className="font-medium">@{video.author.nickname}</span>
        </div>
        <p className="text-sm line-clamp-2">{video.title}</p>
      </div>

      {/* Right Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1"
        >
          <Heart
            size={32}
            className={liked ? 'fill-red-500 text-red-500' : 'text-white'}
          />
          <span className="text-xs">{video.likeCount}</span>
        </button>

        <div className="flex flex-col items-center gap-1">
          <MessageCircle size={32} className="text-white" />
          <span className="text-xs">{video.commentCount}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Share2 size={32} className="text-white" />
          <span className="text-xs">{video.shareCount}</span>
        </div>
      </div>
    </div>
  );
};
