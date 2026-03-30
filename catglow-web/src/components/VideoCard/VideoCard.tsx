import { useState } from 'react';
import { Heart, MessageCircle, Share2, User } from 'lucide-react';
import type { Video } from '../../types';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likeCount);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="relative w-full h-full bg-gray-900 flex flex-col">
      {/* Author Info */}
      <div className="flex items-center gap-3 p-4">
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
        <div>
          <p className="font-medium text-white">@{video.author.nickname}</p>
          {video.createdAt && (
            <p className="text-xs text-gray-400">
              {new Date(video.createdAt).toLocaleDateString('zh-CN')}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4">
        <h2 className="text-xl font-bold text-white mb-2">{video.title}</h2>
        <p className="text-gray-300 text-sm mb-4">{video.description || video.title}</p>

        {/* Images Grid */}
        {video.coverUrl && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            <img
              src={video.coverUrl}
              alt={video.title}
              className="w-full rounded-lg object-cover max-h-64"
            />
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-around py-4 border-t border-gray-800">
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1"
        >
          <Heart
            size={28}
            className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
          <span className="text-xs text-gray-400">{likeCount}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <MessageCircle size={28} className="text-gray-400" />
          <span className="text-xs text-gray-400">{video.commentCount}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <Share2 size={28} className="text-gray-400" />
          <span className="text-xs text-gray-400">{video.shareCount}</span>
        </button>
      </div>
    </div>
  );
};
