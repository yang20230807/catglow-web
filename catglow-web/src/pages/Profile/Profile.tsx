import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../../store';
import { MapPin, Calendar, LogOut, Heart, MessageCircle, Share2 } from 'lucide-react';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-gray-400 mb-4">请先登录</p>
          <Link to="/login" className="text-pink-500 hover:text-pink-400">
            去登录
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Heart, label: '我的点赞', count: user.id * 12 },
    { icon: MessageCircle, label: '我的评论', count: user.id * 5 },
    { icon: Share2, label: '我的转发', count: user.id * 3 },
  ];

  return (
    <div className="h-full bg-black text-white overflow-auto">
      {/* Header */}
      <div className="relative">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-pink-500 to-purple-600" />
        
        {/* Avatar */}
        <div className="absolute -bottom-12 left-6">
          <img
            src={user.avatar}
            alt={user.nickname}
            className="w-24 h-24 rounded-full border-4 border-black bg-gray-800"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="pt-14 px-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{user.nickname}</h1>
            <p className="text-gray-400 text-sm mt-1">@{user.username}</p>
          </div>
          <button className="px-4 py-1.5 border border-gray-600 rounded-full text-sm hover:border-pink-500 transition-colors">
            编辑资料
          </button>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="mt-4 text-gray-300">{user.bio}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            中国
          </span>
          {user.createdAt && (
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              加入于 {new Date(user.createdAt).toLocaleDateString('zh-CN')}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-6 py-4 border-t border-b border-gray-800">
          <div className="text-center">
            <div className="text-xl font-bold">{user.id * 28}</div>
            <div className="text-gray-400 text-sm">关注</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{user.id * 156}</div>
            <div className="text-gray-400 text-sm">粉丝</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{user.id * 42}</div>
            <div className="text-gray-400 text-sm">获赞</div>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-4 space-y-1">
          {menuItems.map(({ icon: Icon, label, count }) => (
            <button
              key={label}
              className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-gray-400" />
                <span>{label}</span>
              </div>
              <span className="text-gray-400">{count}</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          退出登录
        </button>
      </div>
    </div>
  );
};
