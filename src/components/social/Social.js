import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Target, TrendingUp, Heart, MessageCircle, Plus, Search, Calendar, Award, Star, Zap, UserPlus, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import AuthContext from '../../contexts/AuthContext';

const Social = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('friends');
  const [notifications, setNotifications] = useState([]);

  // Mock social data with real-time updates
  useEffect(() => {
    const mockFriends = [
      {
        id: 1,
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        status: 'online',
        lastActive: '2 min ago',
        fitnessLevel: 'intermediate',
        currentStreak: 12,
        totalWorkouts: 156,
        achievements: 8,
        mutualFriends: 3,
        isOnline: true
      },
      {
        id: 2,
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        status: 'offline',
        lastActive: '1 hour ago',
        fitnessLevel: 'advanced',
        currentStreak: 25,
        totalWorkouts: 289,
        achievements: 15,
        mutualFriends: 5,
        isOnline: false
      },
      {
        id: 3,
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        status: 'online',
        lastActive: '5 min ago',
        fitnessLevel: 'beginner',
        currentStreak: 7,
        totalWorkouts: 89,
        achievements: 4,
        mutualFriends: 2,
        isOnline: true
      },
      {
        id: 4,
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        status: 'away',
        lastActive: '30 min ago',
        fitnessLevel: 'intermediate',
        currentStreak: 18,
        totalWorkouts: 203,
        achievements: 11,
        mutualFriends: 4,
        isOnline: false
      }
    ];

    const mockChallenges = [
      {
        id: 1,
        title: '30-Day Fitness Challenge',
        description: 'Complete 30 days of consistent workouts',
        type: 'streak',
        duration: 30,
        participants: 45,
        maxParticipants: 100,
        startDate: '2024-01-01',
        endDate: '2024-01-30',
        reward: 'Exclusive Badge + 500 Points',
        difficulty: 'intermediate',
        progress: 15,
        target: 30,
        isActive: true,
        leader: 'Sarah Johnson',
        leaderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 2,
        title: 'Step Count Marathon',
        description: 'Achieve 10,000 steps daily for a week',
        type: 'daily',
        duration: 7,
        participants: 23,
        maxParticipants: 50,
        startDate: '2024-01-15',
        endDate: '2024-01-21',
        reward: 'Marathon Runner Badge + 300 Points',
        difficulty: 'beginner',
        progress: 5,
        target: 7,
        isActive: true,
        leader: 'Mike Chen',
        leaderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 3,
        title: 'Strength Building Challenge',
        description: 'Increase your max weight in key lifts by 20%',
        type: 'progressive',
        duration: 21,
        participants: 18,
        maxParticipants: 30,
        startDate: '2024-01-10',
        endDate: '2024-01-31',
        reward: 'Strength Master Badge + 750 Points',
        difficulty: 'advanced',
        progress: 8,
        target: 21,
        isActive: true,
        leader: 'Alex Rodriguez',
        leaderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    ];

    const mockNotifications = [
      {
        id: 1,
        type: 'challenge',
        message: 'Sarah completed the 30-Day Fitness Challenge!',
        time: '5 min ago',
        isRead: false,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 2,
        type: 'friend',
        message: 'Mike sent you a workout invitation',
        time: '1 hour ago',
        isRead: false,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 3,
        type: 'achievement',
        message: 'Congratulations! You earned the "Consistency King" badge',
        time: '2 hours ago',
        isRead: true,
        avatar: null
      }
    ];

    setFriends(mockFriends);
    setChallenges(mockChallenges);
    setActiveChallenges(mockChallenges.filter(c => c.isActive));
    setNotifications(mockNotifications);
  }, []);

  // Friend activity data for charts
  const friendActivityData = friends.map(friend => ({
    name: friend.name.split(' ')[0],
    workouts: friend.totalWorkouts,
    streak: friend.currentStreak,
    achievements: friend.achievements
  }));

  // Challenge participation data
  const challengeData = challenges.map(challenge => ({
    name: challenge.title.split(' ')[0],
    participants: challenge.participants,
    progress: (challenge.progress / challenge.target) * 100
  }));

  const addFriend = (friendId) => {
    // Mock adding friend
    setFriends(prev => prev.map(friend => 
      friend.id === friendId ? { ...friend, isFriend: true } : friend
    ));
  };

  const joinChallenge = (challengeId) => {
    // Mock joining challenge
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, participants: challenge.participants + 1, isJoined: true }
        : challenge
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getChallengeTypeIcon = (type) => {
    switch (type) {
      case 'streak': return <TrendingUp className="w-5 h-5" />;
      case 'daily': return <Calendar className="w-5 h-5" />;
      case 'progressive': return <Target className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Social & Challenges</h1>
          <p className="text-gray-600">Connect with friends and participate in fitness challenges</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setSelectedTab('friends')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'friends'
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Friends ({friends.length})
          </button>
          <button
            onClick={() => setSelectedTab('challenges')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'challenges'
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Trophy className="w-4 h-4 inline mr-2" />
            Challenges ({challenges.length})
          </button>
          <button
            onClick={() => setSelectedTab('notifications')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'notifications'
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            Notifications ({notifications.filter(n => !n.isRead).length})
          </button>
        </div>

        {/* Friends Tab */}
        {selectedTab === 'friends' && (
          <div className="space-y-6">
            {/* Add Friend */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Friends</h2>
                <button
                  onClick={() => setShowAddFriend(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Friend
                </button>
              </div>

              {/* Search Friends */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Friends Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {friends.map((friend) => (
                  <motion.div
                    key={friend.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(friend.status)}`}></div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                          <span className="text-xs text-gray-500">{friend.lastActive}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(friend.fitnessLevel)}`}>
                          {friend.fitnessLevel}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{friend.currentStreak}</div>
                        <div className="text-xs text-blue-600">Day Streak</div>
                      </div>
                      <div className="p-2 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{friend.totalWorkouts}</div>
                        <div className="text-xs text-green-600">Workouts</div>
                      </div>
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{friend.achievements}</div>
                        <div className="text-xs text-purple-600">Badges</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 btn-secondary text-sm py-2">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </button>
                      <button className="flex-1 btn-primary text-sm py-2">
                        <Heart className="w-4 h-4 mr-1" />
                        Cheer
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Friend Activity Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Friend Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={friendActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="workouts" fill="#3b82f6" name="Total Workouts" />
                  <Bar dataKey="streak" fill="#10b981" name="Current Streak" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {selectedTab === 'challenges' && (
          <div className="space-y-6">
            {/* Create Challenge */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Active Challenges</h2>
                <button
                  onClick={() => setShowCreateChallenge(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Challenge
                </button>
              </div>

              {/* Challenges Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary-100 rounded-lg">
                          {getChallengeTypeIcon(challenge.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{challenge.title}</h3>
                          <p className="text-sm text-gray-600">{challenge.description}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-medium">{challenge.duration} days</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Participants</div>
                        <div className="font-medium">{challenge.participants}/{challenge.maxParticipants}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Progress</div>
                        <div className="font-medium">{challenge.progress}/{challenge.target}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Reward</div>
                        <div className="font-medium text-sm">{challenge.reward}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{Math.round((challenge.progress / challenge.target) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Leader */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={challenge.leaderAvatar}
                          alt={challenge.leader}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-600">Leader: {challenge.leader}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(challenge.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    <button
                      onClick={() => joinChallenge(challenge.id)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        challenge.isJoined
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : 'btn-primary'
                      }`}
                      disabled={challenge.isJoined}
                    >
                      {challenge.isJoined ? 'Joined ✓' : 'Join Challenge'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Challenge Statistics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Challenge Participation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={challengeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="participants" fill="#8b5cf6" name="Participants" />
                  <Bar dataKey="progress" fill="#f59e0b" name="Progress %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {selectedTab === 'notifications' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            
            <div className="space-y-3">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    notification.isRead ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  {notification.avatar ? (
                    <img
                      src={notification.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary-600" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add Friend</h3>
                <button
                  onClick={() => setShowAddFriend(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Friend's Email or Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter email or username..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button className="w-full btn-primary">
                  Send Friend Request
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Challenge Modal */}
      {showCreateChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Create Challenge</h3>
                <button
                  onClick={() => setShowCreateChallenge(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Challenge Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter challenge title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe your challenge..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="1000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <button className="w-full btn-primary">
                  Create Challenge
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Social;
