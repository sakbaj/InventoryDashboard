import React from 'react';
import { Package, LayoutDashboard, ShoppingCart, Users, Settings, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Inventory', icon: Package, path: '/inventory' },
  { name: 'Orders', icon: ShoppingCart, path: '/orders' },
  { name: 'Customers', icon: Users, path: '/customers' },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-30 w-64 h-screen pt-4 transition-transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0 flex flex-col transition-colors duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Package className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">MetricsDrive</span>
          </div>
          <button 
            onClick={closeSidebar} 
            className="lg:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors group",
                  isActive 
                    ? "bg-primary-50 text-primary-700" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )
              }
              onClick={() => {
                if (window.innerWidth < 1024) closeSidebar();
              }}
            >
              <item.icon className={clsx("w-5 h-5 transition-colors", "group-hover:text-gray-900")} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors group">
            <Settings className="w-5 h-5 group-hover:text-gray-900" />
            Settings
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
