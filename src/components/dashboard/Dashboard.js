import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Users, 
  Heart, 
  Zap,
  Calendar,
  Clock,
  Flame,
  Footprints,
  Dumbbell,
  Bed,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AuthContext from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import ActivityCard from './ActivityCard';
import ProgressChart from './ProgressChart';
import QuickActions from './QuickActions';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for charts and metrics
  const weeklyData = [
    { day: 'Mon', steps: 8500, calories: 320, workouts: 1, sleep: 7.5 },
    { day: 'Tue', steps: 10200, calories: 380, workouts: 0, sleep: 8.2 },
    { day: 'Wed', steps: 7800, calories: 290, workouts: 1, sleep: 6.8 },
    { day: 'Thu', steps: 11500, calories: 420, workouts: 1, sleep: 7.9 },
    { day: 'Fri', steps: 9200, calories: 350, workouts: 0, sleep: 8.1 },
    { day: 'Sat', steps: 6800, calories: 250, workouts: 1, sleep: 9.2 },
    { day: 'Sun', steps: 4500, calories: 180, workouts: 0, sleep: 8.5 }
  ];

  const monthlyProgress = [
    { month: 'Jan', weight: 80, bodyFat: 22, muscle: 45 },
    { month: 'Feb', weight: 79, bodyFat: 21.5, muscle: 46 },
    { month: 'Mar', weight: 78.5, bodyFat: 21, muscle: 46.5 },
    { month: 'Apr', weight: 78, bodyFat: 20.5, muscle: 47 },
    { month: 'May', weight: 77.5, bodyFat: 20, muscle: 47.5 },
    { month: 'Jun', weight: 77, bodyFat: 19.5, muscle: 48 }
  ];

  const nutritionData = [
    { name: 'Protein', value: 120, color: '#3b82f6' },
    { name: 'Carbs', value: 200, color: '#10b981' },
    { name: 'Fat', value: 65, color: '#f59e0b' },
    { name: 'Fiber', value: 25, color: '#8b5cf6' }
  ];

  const todayStats = {
    steps: 8500,
    calories: 320,
    distance: 6.2,
    activeMinutes: 45,
    workouts: 1,
    sleep: 7.5,
    water: 2.1
  };

  const goals = {
    dailySteps: 10000,
    weeklyWorkouts: 4,
    dailyCalories: 500,
    weeklyWeight: 0.5
  };

  const achievements = [
    { id: 1, title: '7 Day Streak', description: 'Completed workouts for 7 consecutive days', icon: '🔥', color: 'bg-orange-100 text-orange-600' },
    { id: 2, title: 'Step Master', description: 'Achieved daily step goal 5 times this week', icon: '👟', color: 'bg-blue-100 text-blue-600' },
    { id: 3, title: 'Early Bird', description: 'Completed morning workout 3 times this week', icon: '🌅', color: 'bg-yellow-100 text-yellow-600' }
  ];

  const recentActivities = [
    { id: 1, type: 'workout', title: 'Morning Cardio', duration: '30 min', calories: 280, time: '2 hours ago' },
    { id: 2, type: 'meal', title: 'Protein Shake', calories: 180, time: '4 hours ago' },
    { id: 3, type: 'sleep', title: 'Sleep Recorded', duration: '7.5 hours', quality: 'Good', time: '8 hours ago' }
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">{formatDate(currentDate)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border-2 border-primary-200"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.firstName || user?.name}!</h2>
                  <p className="text-primary-100">Keep up the great work on your fitness journey</p>
                </div>
                <div className="hidden md:block">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{todayStats.steps.toLocaleString()}</div>
                    <div className="text-primary-100 text-sm">Today's Steps</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ActivityCard
              title="Daily Steps"
              value={todayStats.steps.toLocaleString()}
              target={goals.dailySteps.toLocaleString()}
              progress={getProgressPercentage(todayStats.steps, goals.dailySteps)}
              icon={<Footprints className="w-6 h-6" />}
              color="text-fitness-green"
              bgColor="bg-fitness-green"
            />
            <ActivityCard
              title="Calories Burned"
              value={todayStats.calories}
              target={goals.dailyCalories}
              progress={getProgressPercentage(todayStats.calories, goals.dailyCalories)}
              icon={<Flame className="w-6 h-6" />}
              color="text-fitness-orange"
              bgColor="bg-fitness-orange"
            />
            <ActivityCard
              title="Active Minutes"
              value={todayStats.activeMinutes}
              target={60}
              progress={getProgressPercentage(todayStats.activeMinutes, 60)}
              icon={<Clock className="w-6 h-6" />}
              color="text-fitness-blue"
              bgColor="bg-fitness-blue"
            />
            <ActivityCard
              title="Workouts"
              value={todayStats.workouts}
              target={1}
              progress={getProgressPercentage(todayStats.workouts, 1)}
              icon={<Dumbbell className="w-6 h-6" />}
              color="text-fitness-purple"
              bgColor="bg-fitness-purple"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Activity Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="steps"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#fef2f2"
                  />
                  <Area
                    type="monotone"
                    dataKey="muscle"
                    stackId="1"
                    stroke="#10b981"
                    fill="#f0fdf4"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Nutrition and Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Nutrition Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Nutrition</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={nutritionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {nutritionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {nutritionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}g</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="text-center p-4 rounded-lg border border-gray-100">
                    <div className={`text-3xl mb-2 ${achievement.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto`}>
                      {achievement.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activities and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      activity.type === 'workout' ? 'bg-fitness-purple text-white' :
                      activity.type === 'meal' ? 'bg-fitness-green text-white' :
                      'bg-fitness-blue text-white'
                    }`}>
                      {activity.type === 'workout' ? <Dumbbell className="w-5 h-5" /> :
                       activity.type === 'meal' ? <Flame className="w-5 h-5" /> :
                       <Bed className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {activity.duration && <span>{activity.duration}</span>}
                        {activity.calories && <span>{activity.calories} cal</span>}
                        {activity.quality && <span>Quality: {activity.quality}</span>}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
