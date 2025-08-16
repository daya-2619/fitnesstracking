import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Users, 
  Heart, 
  Zap,
  ArrowRight,
  Play
} from 'lucide-react';

const Welcome = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const motivationalQuotes = [
    {
      text: "The only bad workout is the one that didn't happen.",
      author: "Unknown"
    },
    {
      text: "Your body can stand almost anything. It's your mind you have to convince.",
      author: "Unknown"
    },
    {
      text: "The difference between try and triumph is just a little umph!",
      author: "Marvin Phillips"
    },
    {
      text: "Take care of your body. It's the only place you have to live.",
      author: "Jim Rohn"
    },
    {
      text: "Strength does not come from the physical capacity. It comes from an indomitable will.",
      author: "Mahatma Gandhi"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Activity className="w-8 h-8 text-fitness-green" />,
      title: "Activity Tracking",
      description: "Track steps, distance, calories, and more with precision"
    },
    {
      icon: <Target className="w-8 h-8 text-fitness-blue" />,
      title: "Goal Setting",
      description: "Set personalized fitness goals and track your progress"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-fitness-purple" />,
      title: "Progress Monitoring",
      description: "Visual charts and insights to keep you motivated"
    },
    {
      icon: <Users className="w-8 h-8 text-fitness-orange" />,
      title: "Social Features",
      description: "Connect with friends and share your fitness journey"
    },
    {
      icon: <Heart className="w-8 h-8 text-fitness-red" />,
      title: "Health Insights",
      description: "Comprehensive health tracking and recommendations"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-500" />,
      title: "AI Coaching",
      description: "Personalized workout plans and guidance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 transform -skew-y-6 origin-top-left"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              FitTrack Pro
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your comprehensive fitness companion for tracking, planning, and achieving your health goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Motivational Quote */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
              "{motivationalQuotes[currentQuote].text}"
            </blockquote>
            <cite className="text-lg text-gray-600">
              — {motivationalQuotes[currentQuote].author}
            </cite>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Fitness Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tracking your daily activities to personalized workout plans, we've got you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="fitness-card text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-gray-100 rounded-full group-hover:bg-primary-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of users who have already achieved their fitness goals with FitTrack Pro
            </p>
            <Link
              to="/signup"
              className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Your Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FitTrack Pro</h3>
              <p className="text-gray-400">
                Your comprehensive fitness companion for tracking, planning, and achieving your health goals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Activity Tracking</li>
                <li>Workout Plans</li>
                <li>Nutrition Tracking</li>
                <li>Sleep Monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Community</li>
                <li>Blog</li>
                <li>Social Media</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FitTrack Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
