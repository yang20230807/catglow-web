import { Home, Search, User as UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../../store';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, isLoggedIn } = useUserStore();

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/search', icon: Search, label: '搜索' },
  ];

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-4 bg-black border-b border-gray-800">
        <Link to="/" className="text-xl font-bold text-white">
          CatGlow
        </Link>
        
        <Link
          to={isLoggedIn ? '/profile' : '/login'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
        >
          {isLoggedIn && user ? (
            <>
              <img
                src={user.avatar}
                alt={user.nickname}
                className="w-7 h-7 rounded-full"
              />
              <span className="text-sm text-gray-300 hidden sm:inline">
                {user.nickname}
              </span>
            </>
          ) : (
            <>
              <UserIcon size={20} className="text-gray-400" />
              <span className="text-sm text-gray-400">登录</span>
            </>
          )}
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Bottom Navigation */}
      <nav className="flex justify-around items-center h-14 bg-black border-t border-gray-800">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              location.pathname === path ? 'text-white' : 'text-gray-500'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
