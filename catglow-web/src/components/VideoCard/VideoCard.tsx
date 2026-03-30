import { useState } from 'react';
import { Heart, MessageCircle, Share2, User } from 'lucide-react';
import { useUserStore } from '../../store';
import { CommentModal } from '../CommentModal/CommentModal';
import { ShareModal } from '../ShareModal/ShareModal';
import type { Video } from '../../types';

interface VideoCardProps {
  video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const { isLoggedIn } = useUserStore();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likeCount);
  const [showComment, setShowComment] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleLike = () => {
    if (!isLoggedIn) {
      alert('请先登录');
      return;
    }
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = () => {
    if (!isLoggedIn) {
      alert('请先登录');
      return;
    }
    setShowComment(true);
  };

  const handleShare = () => {
    if (!isLoggedIn) {
      alert('请先登录');
      return;
    }
    setShowShare(true);
  };

  // Get first image as cover
  const coverImage = video.images && video.images.length > 0 
    ? video.images[0] 
    : video.coverUrl || 'https://picsum.photos/seed/default/400/600';

  return (
    <>
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
          <p className="text-gray-300 text-sm mb-4">{video.content || video.description}</p>

          {/* Images Grid */}
          {video.images && video.images.length > 0 && (
            <div className={`grid gap-2 mb-4 ${
              video.images.length === 1 ? 'grid-cols-1' : 
              video.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'
            }`}>
              {video.images.slice(0, 4).map((img, idx) => (
                <div 
                  key={idx} 
                  className={`relative overflow-hidden rounded-lg bg-gray-800 ${
                    video.images!.length === 1 ? 'max-h-96' : 'aspect-square'
                  }`}
                >
                  <img
                    src={img}
                    alt={`图片 ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/400/400';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Fallback single image */}
          {!video.images && video.coverUrl && (
            <img
              src={coverImage}
              alt={video.title}
              className="w-full rounded-lg object-cover max-h-64 mb-4"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/400/600';
              }}
            />
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

          <button onClick={handleComment} className="flex flex-col items-center gap-1">
            <MessageCircle size={28} className="text-gray-400" />
            <span className="text-xs text-gray-400">{video.commentCount}</span>
          </button>

          <button onClick={handleShare} className="flex flex-col items-center gap-1">
            <Share2 size={28} className="text-gray-400" />
            <span className="text-xs text-gray-400">{video.shareCount}</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <CommentModal 
        postId={video.id} 
        isOpen={showComment} 
        onClose={() => setShowComment(false)} 
      />
      <ShareModal 
        postId={video.id} 
        isOpen={showShare} 
        onClose={() => setShowShare(false)} 
      />
    </>
  );
};
