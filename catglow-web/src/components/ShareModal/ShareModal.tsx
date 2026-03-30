import { useState, useEffect } from 'react';
import { X, Share2, Check, UserPlus, UserCheck } from 'lucide-react';
import { useUserStore } from '../../store';
import type { Friend } from '../../types';

interface ShareModalProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal = ({ postId, isOpen, onClose }: ShareModalProps) => {
  const { user, isLoggedIn } = useUserStore();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'friends' | 'followers'>('friends');

  useEffect(() => {
    if (isOpen && isLoggedIn) {
      fetchFriends();
    }
  }, [isOpen, isLoggedIn]);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      // Mock friends data - in real app would call API
      // For now, we have the mock users from the system
      const mockFriends: Friend[] = [
        { id: 1, username: 'user1', nickname: '摄影达人小王', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1', isFollowing: true },
        { id: 2, username: 'user2', nickname: '旅行爱好者', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2', isFollowing: true },
        { id: 3, username: 'user3', nickname: '美食家小李', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3', isFollowing: false },
        { id: 4, username: 'user4', nickname: '科技发烧友', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4', isFollowing: true },
        { id: 5, username: 'user5', nickname: '时尚博主Amy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user5', isFollowing: false },
      ];
      setFriends(mockFriends);
    } catch (err) {
      console.error('Failed to fetch friends:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShareToFriend = async (_friendId: number) => {
    if (!user) return;
    
    setSharing(true);
    try {
      const res = await fetch(`http://localhost:8080/api/share?userId=${user.id}&postId=${postId}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.code === 200) {
        setShareSuccess(true);
        setTimeout(() => {
          setShareSuccess(false);
          onClose();
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to share:', err);
    } finally {
      setSharing(false);
    }
  };

  const handleFollow = (friendId: number) => {
    setFriends(friends.map(f => 
      f.id === friendId ? { ...f, isFollowing: !f.isFollowing } : f
    ));
  };

  const handlePublicShare = async () => {
    await handleShareToFriend(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70">
      <div className="w-full max-w-lg bg-gray-900 rounded-t-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Share2 size={20} />
            分享
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Success Message */}
        {shareSuccess && (
          <div className="p-4 bg-green-500/20 border-b border-green-500 flex items-center gap-3">
            <Check className="text-green-500" size={20} />
            <span className="text-green-400">分享成功！</span>
          </div>
        )}

        {/* Public Share */}
        <div className="p-4 border-b border-gray-800">
          <button
            onClick={handlePublicShare}
            disabled={sharing || !isLoggedIn}
            className="w-full py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Share2 size={20} />
            {sharing ? '分享中...' : '分享到动态'}
          </button>
        </div>

        {/* Friends Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'friends' 
                ? 'text-white border-b-2 border-pink-500' 
                : 'text-gray-400'
            }`}
          >
            好友
          </button>
          <button
            onClick={() => setActiveTab('followers')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'followers' 
                ? 'text-white border-b-2 border-pink-500' 
                : 'text-gray-400'
            }`}
          >
            关注
          </button>
        </div>

        {/* Friends List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!isLoggedIn ? (
            <div className="text-center text-gray-400 py-8">
              请先登录后再分享
            </div>
          ) : loading ? (
            <div className="text-center text-gray-400 py-8">加载中...</div>
          ) : friends.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              {activeTab === 'friends' ? '暂无好友' : '暂无关注'}
            </div>
          ) : (
            friends
              .filter(f => activeTab === 'friends' ? f.isFollowing : !f.isFollowing)
              .map((friend) => (
                <div key={friend.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <img
                    src={friend.avatar}
                    alt={friend.nickname}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{friend.nickname}</p>
                    <p className="text-gray-400 text-sm">@{friend.username}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFollow(friend.id)}
                      className={`p-2 rounded-full ${
                        friend.isFollowing 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-pink-500 text-white'
                      }`}
                    >
                      {friend.isFollowing ? <UserCheck size={18} /> : <UserPlus size={18} />}
                    </button>
                    <button
                      onClick={() => handleShareToFriend(friend.id)}
                      disabled={sharing}
                      className="p-2 bg-pink-500 text-white rounded-full disabled:opacity-50"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};
