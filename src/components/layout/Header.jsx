import React from 'react';
import { Menu, Search, Bell, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Header = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 w-full h-16 flex items-center justify-between px-4 lg:px-8 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded p-1"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Global Search - Desktop */}
        <div className="hidden md:flex relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
            placeholder="Search across inventory, orders..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button 
          onClick={toggleTheme}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 relative focus:outline-none transition-colors">
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800" />
          <Bell className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Saksham Bajpai</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Admin</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center border border-primary-200">
            <User className="h-5 w-5 text-primary-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
