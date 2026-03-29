import { Home, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/search', icon: Search, label: '搜索' },
  ];

  return (
    <div className="h-full flex flex-col bg-black">
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
