import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Clock, TrendingUp, Heart, Activity, Calendar, BarChart3, Target, Zap, Eye, Coffee, Sunrise } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import AuthContext from '../../contexts/AuthContext';

const SleepTracking = () => {
  const { user } = useContext(AuthContext);
  const [sleepData, setSleepData] = useState([]);
  const [currentSleep, setCurrentSleep] = useState(null);
  const [sleepGoals, setSleepGoals] = useState({
    targetHours: 8,
    bedtime: '22:00',
    wakeTime: '06:00'
  });
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [sleepStart, setSleepStart] = useState('');
  const [sleepEnd, setSleepEnd] = useState('');
  const [sleepQuality, setSleepQuality] = useState(5);
  const [sleepNotes, setSleepNotes] = useState('');

  // Mock sleep data with real-time updates
  useEffect(() => {
    const mockSleepData = [
      {
        id: 1,
        date: '2024-01-15',
        startTime: '22:30',
        endTime: '06:45',
        duration: 8.25,
        quality: 8,
        deepSleep: 2.1,
        lightSleep: 4.8,
        remSleep: 1.35,
        awake: 0.2,
        heartRate: { min: 48, avg: 52, max: 78 },
        notes: 'Good sleep, felt refreshed'
      },
      {
        id: 2,
        date: '2024-01-14',
        startTime: '23:15',
        endTime: '07:00',
        duration: 7.75,
        quality: 7,
        deepSleep: 1.8,
        lightSleep: 4.5,
        remSleep: 1.45,
        awake: 0.3,
        heartRate: { min: 50, avg: 54, max: 82 },
        notes: 'Slightly restless, stress from work'
      },
      {
        id: 3,
        date: '2024-01-13',
        startTime: '22:00',
        endTime: '06:30',
        duration: 8.5,
        quality: 9,
        deepSleep: 2.3,
        lightSleep: 4.9,
        remSleep: 1.3,
        awake: 0.1,
        heartRate: { min: 46, avg: 50, max: 75 },
        notes: 'Excellent sleep quality, very rested'
      },
      {
        id: 4,
        date: '2024-01-12',
        startTime: '23:45',
        endTime: '06:15',
        duration: 6.5,
        quality: 5,
        deepSleep: 1.2,
        lightSleep: 3.8,
        remSleep: 1.5,
        awake: 0.8,
        heartRate: { min: 52, avg: 58, max: 85 },
        notes: 'Short sleep, felt tired'
      },
      {
        id: 5,
        date: '2024-01-11',
        startTime: '22:15',
        endTime: '06:45',
        duration: 8.5,
        quality: 8,
        deepSleep: 2.0,
        lightSleep: 4.7,
        remSleep: 1.8,
        awake: 0.2,
        heartRate: { min: 47, avg: 51, max: 76 },
        notes: 'Good sleep, consistent routine'
      }
    ];

    setSleepData(mockSleepData);
  }, []);

  // Calculate sleep statistics
  const sleepStats = {
    averageDuration: sleepData.reduce((acc, sleep) => acc + sleep.duration, 0) / sleepData.length || 0,
    averageQuality: sleepData.reduce((acc, sleep) => acc + sleep.quality, 0) / sleepData.length || 0,
    totalSleep: sleepData.reduce((acc, sleep) => acc + sleep.duration, 0),
    bestSleep: sleepData.reduce((best, sleep) => sleep.quality > best.quality ? sleep : best, { quality: 0 }),
    worstSleep: sleepData.reduce((worst, sleep) => sleep.quality < worst.quality ? sleep : worst, { quality: 10 })
  };

  // Weekly sleep data for charts
  const weeklyData = sleepData.slice(-7).map(sleep => ({
    day: new Date(sleep.date).toLocaleDateString('en-US', { weekday: 'short' }),
    duration: sleep.duration,
    quality: sleep.quality,
    deepSleep: sleep.deepSleep,
    remSleep: sleep.remSleep
  }));

  // Sleep cycle data
  const sleepCycleData = sleepData.length > 0 ? [
    { name: 'Deep Sleep', value: sleepData[0].deepSleep, color: '#3b82f6' },
    { name: 'Light Sleep', value: sleepData[0].lightSleep, color: '#10b981' },
    { name: 'REM Sleep', value: sleepData[0].remSleep, color: '#8b5cf6' },
    { name: 'Awake', value: sleepData[0].awake, color: '#f59e0b' }
  ] : [];

  const startSleepTracking = () => {
    setCurrentSleep({
      startTime: new Date().toISOString(),
      isTracking: true
    });
  };

  const stopSleepTracking = () => {
    if (currentSleep) {
      setSleepEnd(new Date().toISOString());
      setShowSleepModal(true);
    }
  };

  const saveSleepSession = () => {
    if (sleepStart && sleepEnd) {
      const start = new Date(sleepStart);
      const end = new Date(sleepEnd);
      const duration = (end - start) / (1000 * 60 * 60); // hours
      
      const newSleep = {
        id: Date.now(),
        date: start.toISOString().split('T')[0],
        startTime: start.toTimeString().slice(0, 5),
        endTime: end.toTimeString().slice(0, 5),
        duration: Math.round(duration * 100) / 100,
        quality: sleepQuality,
        deepSleep: Math.round(duration * 0.25 * 100) / 100,
        lightSleep: Math.round(duration * 0.55 * 100) / 100,
        remSleep: Math.round(duration * 0.2 * 100) / 100,
        awake: 0,
        heartRate: { min: 45, avg: 50, max: 75 },
        notes: sleepNotes
      };

      setSleepData(prev => [newSleep, ...prev]);
      setCurrentSleep(null);
      setShowSleepModal(false);
      setSleepStart('');
      setSleepEnd('');
      setSleepQuality(5);
      setSleepNotes('');
    }
  };

  const getQualityColor = (quality) => {
    if (quality >= 8) return 'text-green-600 bg-green-100';
    if (quality >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getQualityLabel = (quality) => {
    if (quality >= 8) return 'Excellent';
    if (quality >= 6) return 'Good';
    if (quality >= 4) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sleep Tracking</h1>
          <p className="text-gray-600">Monitor your sleep patterns and improve your rest quality</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sleep Tracking Controls */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Sleep Tracking</h2>
              
              {!currentSleep ? (
                <div className="text-center">
                  <Moon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Ready to track your sleep?</p>
                  <button
                    onClick={startSleepTracking}
                    className="btn-primary flex items-center gap-2 mx-auto"
                  >
                    <Moon className="w-5 h-5" />
                    Start Sleep Tracking
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Moon className="w-8 h-8 text-primary-600" />
                  </div>
                  <p className="text-gray-600 mb-4">Currently tracking sleep...</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Started at: {new Date(currentSleep.startTime).toLocaleTimeString()}
                  </p>
                  <button
                    onClick={stopSleepTracking}
                    className="btn-secondary flex items-center gap-2 mx-auto"
                  >
                    <Clock className="w-5 h-5" />
                    Stop Tracking
                  </button>
                </div>
              )}
            </div>

            {/* Sleep Statistics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Sleep Statistics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {sleepStats.averageDuration.toFixed(1)}h
                  </div>
                  <div className="text-sm text-blue-600">Avg Duration</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {sleepStats.averageQuality.toFixed(1)}
                  </div>
                  <div className="text-sm text-green-600">Avg Quality</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {sleepStats.totalSleep.toFixed(1)}h
                  </div>
                  <div className="text-sm text-purple-600">Total Sleep</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {sleepData.length}
                  </div>
                  <div className="text-sm text-yellow-600">Sessions</div>
                </div>
              </div>

              {/* Sleep Goals */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-3">Sleep Goals</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary-600" />
                    <div>
                      <div className="text-sm font-medium">Target Hours</div>
                      <div className="text-lg font-bold text-primary-600">{sleepGoals.targetHours}h</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-sm font-medium">Bedtime</div>
                      <div className="text-lg font-bold text-purple-600">{sleepGoals.bedtime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Sunrise className="w-5 h-5 text-yellow-600" />
                    <div>
                      <div className="text-sm font-medium">Wake Time</div>
                      <div className="text-lg font-bold text-yellow-600">{sleepGoals.wakeTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Sleep Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Weekly Sleep Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="duration" stroke="#3b82f6" strokeWidth={2} name="Duration (h)" />
                  <Line type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={2} name="Quality" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Sleep Sessions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Sleep Sessions</h2>
              
              <div className="space-y-4">
                {sleepData.slice(0, 5).map((sleep) => (
                  <motion.div
                    key={sleep.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Moon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium">{sleep.date}</div>
                          <div className="text-sm text-gray-600">
                            {sleep.startTime} - {sleep.endTime}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">{sleep.duration}h</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(sleep.quality)}`}>
                          {getQualityLabel(sleep.quality)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Deep Sleep</div>
                        <div className="font-medium">{sleep.deepSleep}h</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Light Sleep</div>
                        <div className="font-medium">{sleep.lightSleep}h</div>
                      </div>
                      <div>
                        <div className="text-gray-600">REM Sleep</div>
                        <div className="font-medium">{sleep.remSleep}h</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Heart Rate</div>
                        <div className="font-medium">{sleep.heartRate.avg} bpm</div>
                      </div>
                    </div>
                    
                    {sleep.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">{sleep.notes}</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sleep Cycle Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Sleep Cycle</h3>
              {sleepCycleData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={sleepCycleData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sleepCycleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-4 space-y-2">
                    {sleepCycleData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}h</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Moon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No sleep data available</p>
                </div>
              )}
            </div>

            {/* Sleep Quality Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Sleep Quality</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quality" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sleep Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Sleep Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p>Maintain a consistent sleep schedule</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p>Avoid screens 1 hour before bedtime</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p>Keep your bedroom cool and dark</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p>Limit caffeine after 2 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sleep Session Modal */}
        {showSleepModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Complete Sleep Session</h3>
                  <button
                    onClick={() => setShowSleepModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sleep Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={sleepStart}
                      onChange={(e) => setSleepStart(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sleep End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={sleepEnd}
                      onChange={(e) => setSleepEnd(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sleep Quality (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={sleepQuality}
                      onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Poor</span>
                      <span>{sleepQuality}/10</span>
                      <span>Excellent</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={sleepNotes}
                      onChange={(e) => setSleepNotes(e.target.value)}
                      placeholder="How did you sleep? Any observations?"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={saveSleepSession}
                    className="w-full btn-primary"
                  >
                    Save Sleep Session
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepTracking;
