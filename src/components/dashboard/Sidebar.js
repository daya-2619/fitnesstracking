import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Users, 
  Heart, 
  Zap,
  Calendar,
  Settings,
  LogOut,
  X,
  Home,
  Dumbbell,
  Utensils,
  Bed,
  BookOpen,
  Trophy,
  Smartphone
} from 'lucide-react';
import AuthContext from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, color: 'text-primary-600' },
    { name: 'Activity Tracking', href: '/activity', icon: Activity, color: 'text-fitness-green' },
    { name: 'Workout Plans', href: '/workouts', icon: Dumbbell, color: 'text-fitness-purple' },
    { name: 'Exercise Library', href: '/exercises', icon: BookOpen, color: 'text-fitness-blue' },
    { name: 'Nutrition Tracking', href: '/nutrition', icon: Utensils, color: 'text-fitness-orange' },
    { name: 'Sleep Tracking', href: '/sleep', icon: Bed, color: 'text-fitness-blue' },
    { name: 'Progress & Goals', href: '/progress', icon: Target, color: 'text-fitness-green' },
    { name: 'Social & Challenges', href: '/social', icon: Users, color: 'text-fitness-purple' },
    { name: 'AI Coaching', href: '/coaching', icon: Zap, color: 'text-fitness-orange' },
    { name: 'Wearable Integration', href: '/wearables', icon: Smartphone, color: 'text-fitness-blue' },
    { name: 'Achievements', href: '/achievements', icon: Trophy, color: 'text-fitness-green' },
    { name: 'Settings', href: '/settings', icon: Settings, color: 'text-gray-600' }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FitTrack Pro</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary-600' : item.color}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt="User avatar"
              className="w-10 h-10 rounded-full border-2 border-primary-200"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3 text-gray-500" />
            Sign Out
          </button>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-gray-200">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FitTrack Pro</span>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary-600' : item.color}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile Section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-4">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                alt="User avatar"
                className="w-10 h-10 rounded-full border-2 border-primary-200"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3 text-gray-500" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
