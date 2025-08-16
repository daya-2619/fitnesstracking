import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Camera, 
  Target, 
  BookOpen, 
  Utensils, 
  Bed,
  TrendingUp,
  Users
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Start Workout',
      description: 'Begin a new training session',
      icon: <Plus className="w-5 h-5" />,
      color: 'bg-fitness-purple',
      textColor: 'text-fitness-purple',
      action: () => console.log('Start workout')
    },
    {
      title: 'Log Meal',
      description: 'Record your food intake',
      icon: <Utensils className="w-5 h-5" />,
      color: 'bg-fitness-green',
      textColor: 'text-fitness-green',
      action: () => console.log('Log meal')
    },
    {
      title: 'Set Goal',
      description: 'Create new fitness objectives',
      icon: <Target className="w-5 h-5" />,
      color: 'bg-fitness-blue',
      textColor: 'text-fitness-blue',
      action: () => console.log('Set goal')
    },
    {
      title: 'Track Sleep',
      description: 'Record your sleep quality',
      icon: <Bed className="w-5 h-5" />,
      color: 'bg-fitness-blue',
      textColor: 'text-fitness-blue',
      action: () => console.log('Track sleep')
    },
    {
      title: 'View Progress',
      description: 'Check your achievements',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-fitness-green',
      textColor: 'text-fitness-green',
      action: () => console.log('View progress')
    },
    {
      title: 'Join Challenge',
      description: 'Participate in fitness challenges',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-fitness-orange',
      textColor: 'text-fitness-orange',
      action: () => console.log('Join challenge')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={action.action}
            className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200 text-left"
          >
            <div className={`w-10 h-10 ${action.color} bg-opacity-10 rounded-lg flex items-center justify-center mr-3`}>
              <div className={action.textColor}>
                {action.icon}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
              <p className="text-xs text-gray-600">{action.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
