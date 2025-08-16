import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Heart,
  Zap,
  Footprints,
  Calendar,
  BarChart3,
  Play,
  Pause,
  Square,
  RotateCcw,
  Settings,
  Plus
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import AuthContext from '../../contexts/AuthContext';
import Sidebar from '../dashboard/Sidebar';

const ActivityTracking = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('steps');

  // Mock activity data
  const [activityData, setActivityData] = useState({
    steps: 8500,
    distance: 6.2,
    calories: 320,
    activeMinutes: 45,
    heartRate: 72,
    currentTime: 0
  });

  const [goals] = useState({
    dailySteps: 10000,
    dailyDistance: 8.0,
    dailyCalories: 500,
    dailyActiveMinutes: 60
  });

  // Mock historical data
  const weeklyData = [
    { day: 'Mon', steps: 8500, distance: 6.2, calories: 320, activeMinutes: 45 },
    { day: 'Tue', steps: 10200, distance: 7.8, calories: 380, activeMinutes: 52 },
    { day: 'Wed', steps: 7800, distance: 5.9, calories: 290, activeMinutes: 38 },
    { day: 'Thu', steps: 11500, distance: 8.7, calories: 420, activeMinutes: 58 },
    { day: 'Fri', steps: 9200, distance: 7.0, calories: 350, activeMinutes: 44 },
    { day: 'Sat', steps: 6800, distance: 5.2, calories: 250, activeMinutes: 32 },
    { day: 'Sun', steps: 4500, distance: 3.4, calories: 180, activeMinutes: 25 }
  ];

  const monthlyData = [
    { month: 'Jan', steps: 280000, distance: 210, calories: 9800, activeMinutes: 1200 },
    { month: 'Feb', steps: 295000, distance: 225, calories: 10300, activeMinutes: 1350 },
    { month: 'Mar', steps: 310000, distance: 235, calories: 10800, activeMinutes: 1420 },
    { month: 'Apr', steps: 285000, distance: 215, calories: 9900, activeMinutes: 1250 },
    { month: 'May', steps: 320000, distance: 245, calories: 11200, activeMinutes: 1500 },
    { month: 'Jun', steps: 335000, distance: 255, calories: 11800, activeMinutes: 1580 }
  ];

  const activities = [
    { id: 1, name: 'Walking', icon: '🚶', caloriesPerHour: 250, type: 'cardio' },
    { id: 2, name: 'Running', icon: '🏃', caloriesPerHour: 600, type: 'cardio' },
    { id: 3, name: 'Cycling', icon: '🚴', caloriesPerHour: 400, type: 'cardio' },
    { id: 4, name: 'Swimming', icon: '🏊', caloriesPerHour: 500, type: 'cardio' },
    { id: 5, name: 'Weight Training', icon: '🏋️', caloriesPerHour: 300, type: 'strength' },
    { id: 6, name: 'Yoga', icon: '🧘', caloriesPerHour: 200, type: 'flexibility' }
  ];

  useEffect(() => {
    let interval;
    if (isTracking && currentActivity) {
      interval = setInterval(() => {
        setActivityData(prev => ({
          ...prev,
          currentTime: prev.currentTime + 1,
          steps: prev.steps + Math.floor(Math.random() * 10),
          calories: prev.calories + Math.floor(Math.random() * 5),
          distance: prev.distance + (Math.random() * 0.1)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, currentActivity]);

  const startTracking = (activity) => {
    setCurrentActivity(activity);
    setIsTracking(true);
    setActivityData(prev => ({
      ...prev,
      currentTime: 0
    }));
  };

  const pauseTracking = () => {
    setIsTracking(false);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setCurrentActivity(null);
    setActivityData(prev => ({
      ...prev,
      currentTime: 0
    }));
  };

  const resetTracking = () => {
    setActivityData({
      steps: 8500,
      distance: 6.2,
      calories: 320,
      activeMinutes: 45,
      heartRate: 72,
      currentTime: 0
    });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDataByPeriod = () => {
    return selectedPeriod === 'week' ? weeklyData : monthlyData;
  };

  const getMetricKey = () => {
    const metricMap = {
      steps: 'steps',
      distance: 'distance',
      calories: 'calories',
      activeMinutes: 'activeMinutes'
    };
    return metricMap[selectedMetric];
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
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Activity className="w-6 h-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-900">Activity Tracking</h1>
                <p className="text-sm text-gray-600">Monitor your daily fitness activities</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Current Activity Tracking */}
          {currentActivity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Currently Tracking: {currentActivity.name}</h2>
                  <p className="text-primary-100">Keep up the great work!</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{formatTime(activityData.currentTime)}</div>
                  <div className="text-primary-100 text-sm">Duration</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{activityData.steps.toLocaleString()}</div>
                  <div className="text-primary-100 text-sm">Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{activityData.distance.toFixed(1)}</div>
                  <div className="text-primary-100 text-sm">km</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{activityData.calories}</div>
                  <div className="text-primary-100 text-sm">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{activityData.heartRate}</div>
                  <div className="text-primary-100 text-sm">BPM</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                {isTracking ? (
                  <button
                    onClick={pauseTracking}
                    className="flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={() => setIsTracking(true)}
                    className="flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Resume
                  </button>
                )}
                <button
                  onClick={stopTracking}
                  className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop
                </button>
              </div>
            </motion.div>
          )}

          {/* Activity Selection */}
          {!currentActivity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Start New Activity</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {activities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => startTracking(activity)}
                    className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 text-center"
                  >
                    <div className="text-3xl mb-2">{activity.icon}</div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{activity.name}</h3>
                    <p className="text-xs text-gray-600">{activity.caloriesPerHour} cal/hr</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Daily Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-fitness-green bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Footprints className="w-6 h-6 text-fitness-green" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Daily Steps</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{activityData.steps.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-gray-500">/ {goals.dailySteps.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-fitness-green"
                  style={{ width: `${getProgressPercentage(activityData.steps, goals.dailySteps)}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-fitness-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-fitness-blue" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Distance</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{activityData.distance.toFixed(1)}</span>
                  <span className="ml-2 text-sm text-gray-500">/ {goals.dailyDistance} km</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-fitness-blue"
                  style={{ width: `${getProgressPercentage(activityData.distance, goals.dailyDistance)}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-fitness-orange bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-fitness-orange" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Calories</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{activityData.calories}</span>
                  <span className="ml-2 text-sm text-gray-500">/ {goals.dailyCalories}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-fitness-orange"
                  style={{ width: `${getProgressPercentage(activityData.calories, goals.dailyCalories)}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-fitness-purple bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-fitness-purple" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Active Time</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{activityData.activeMinutes}</span>
                  <span className="ml-2 text-sm text-gray-500">/ {goals.dailyActiveMinutes} min</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-fitness-purple"
                  style={{ width: `${getProgressPercentage(activityData.activeMinutes, goals.dailyActiveMinutes)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Activity Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Activity Overview</h3>
                <div className="flex space-x-2">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="steps">Steps</option>
                    <option value="distance">Distance</option>
                    <option value="calories">Calories</option>
                    <option value="activeMinutes">Active Minutes</option>
                  </select>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getDataByPeriod()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey={selectedPeriod === 'week' ? 'day' : 'month'} stroke="#6b7280" />
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
                    dataKey={getMetricKey()}
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Heart Rate Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Heart Rate Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
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
                  <Area
                    type="monotone"
                    dataKey="heartRate"
                    stroke="#ef4444"
                    fill="#fef2f2"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetTracking}
              className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset Data
            </button>
            <button className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivityTracking;
