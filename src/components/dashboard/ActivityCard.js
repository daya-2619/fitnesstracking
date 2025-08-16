import React from 'react';
import { motion } from 'framer-motion';

const ActivityCard = ({ title, value, target, progress, icon, color, bgColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} bg-opacity-10 rounded-lg flex items-center justify-center`}>
          <div className={color}>
            {icon}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-600">{title}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {target && (
            <span className="ml-2 text-sm text-gray-500">/ {target}</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-2 rounded-full ${bgColor}`}
        />
      </div>
      
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
