import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from './contexts/AuthContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import ActivityTracking from './components/activity/ActivityTracking';
import WorkoutPlans from './components/workouts/WorkoutPlans';
import ExerciseLibrary from './components/exercises/ExerciseLibrary';
import NutritionTracking from './components/nutrition/NutritionTracking';
import SleepTracking from './components/sleep/SleepTracking';
import Profile from './components/profile/Profile';
import Social from './components/social/Social';
import Settings from './components/settings/Settings';
import Welcome from './components/welcome/Welcome';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (localStorage or session)
    const savedUser = localStorage.getItem('fitnessUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('fitnessUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitnessUser');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-semibold">Loading FitTrack Pro...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="App">
          <AnimatePresence mode="wait">
            <Routes>
              {!user ? (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/" element={<Welcome />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/activity" element={<ActivityTracking />} />
                  <Route path="/workouts" element={<WorkoutPlans />} />
                  <Route path="/exercises" element={<ExerciseLibrary />} />
                  <Route path="/nutrition" element={<NutritionTracking />} />
                  <Route path="/sleep" element={<SleepTracking />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/social" element={<Social />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </>
              )}
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
