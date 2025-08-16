import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Calendar, 
  Clock, 
  Target, 
  Play, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Circle
} from 'lucide-react';
import AuthContext from '../../contexts/AuthContext';
import Sidebar from '../dashboard/Sidebar';

const WorkoutPlans = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock workout plans data
  const [workoutPlans] = useState([
    {
      id: 1,
      name: 'Beginner Strength Training',
      description: 'Perfect for building foundational strength',
      difficulty: 'Beginner',
      duration: '45 min',
      frequency: '3x per week',
      exercises: [
        { id: 1, name: 'Push-ups', sets: 3, reps: 10, completed: false },
        { id: 2, name: 'Squats', sets: 3, reps: 15, completed: false },
        { id: 3, name: 'Planks', sets: 3, duration: '30 sec', completed: false },
        { id: 4, name: 'Lunges', sets: 3, reps: 10, completed: false }
      ],
      category: 'strength',
      calories: 250
    },
    {
      id: 2,
      name: 'Cardio Blast',
      description: 'High-intensity cardio workout for endurance',
      difficulty: 'Intermediate',
      duration: '30 min',
      frequency: '4x per week',
      exercises: [
        { id: 5, name: 'Jumping Jacks', sets: 3, duration: '2 min', completed: false },
        { id: 6, name: 'Burpees', sets: 3, reps: 15, completed: false },
        { id: 7, name: 'Mountain Climbers', sets: 3, duration: '1 min', completed: false },
        { id: 8, name: 'High Knees', sets: 3, duration: '1 min', completed: false }
      ],
      category: 'cardio',
      calories: 400
    },
    {
      id: 3,
      name: 'Yoga Flow',
      description: 'Gentle yoga for flexibility and relaxation',
      difficulty: 'Beginner',
      duration: '60 min',
      frequency: '2x per week',
      exercises: [
        { id: 9, name: 'Sun Salutation', sets: 3, duration: '5 min', completed: false },
        { id: 10, name: 'Warrior Pose', sets: 2, duration: '30 sec each side', completed: false },
        { id: 11, name: 'Tree Pose', sets: 2, duration: '1 min each side', completed: false },
        { id: 12, name: 'Corpse Pose', sets: 1, duration: '5 min', completed: false }
      ],
      category: 'flexibility',
      calories: 150
    }
  ]);

  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [workoutProgress, setWorkoutProgress] = useState({});

  const startWorkout = (plan) => {
    setCurrentWorkout(plan);
    setWorkoutProgress({});
  };

  const completeExercise = (exerciseId) => {
    setWorkoutProgress(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || colors['Beginner'];
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'strength': '🏋️',
      'cardio': '❤️',
      'flexibility': '🧘',
      'balance': '⚖️'
    };
    return icons[category] || '💪';
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
                <Dumbbell className="w-6 h-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-900">Workout Plans</h1>
                <p className="text-sm text-gray-600">Personalized exercise routines for your goals</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Plan
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Current Workout */}
          {currentWorkout && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-gradient-to-r from-fitness-purple to-fitness-blue rounded-2xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Current Workout: {currentWorkout.name}</h2>
                  <p className="text-purple-100">Complete all exercises to finish your workout</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {Object.values(workoutProgress).filter(Boolean).length} / {currentWorkout.exercises.length}
                  </div>
                  <div className="text-purple-100 text-sm">Exercises Completed</div>
                </div>
              </div>

              <div className="space-y-3">
                {currentWorkout.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg"
                  >
                    <div className="flex items-center">
                      <button
                        onClick={() => completeExercise(exercise.id)}
                        className="mr-3"
                      >
                        {workoutProgress[exercise.id] ? (
                          <CheckCircle className="w-6 h-6 text-green-300" />
                        ) : (
                          <Circle className="w-6 h-6 text-white" />
                        )}
                      </button>
                      <div>
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-purple-100">
                          {exercise.sets} sets × {exercise.reps || exercise.duration}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentWorkout(null)}
                      className="px-4 py-2 bg-white text-fitness-purple rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Finish
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Workout Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {workoutPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{getCategoryIcon(plan.category)}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                      {plan.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {plan.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {plan.frequency}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Target className="w-4 h-4 mr-2" />
                      {plan.calories} cal
                    </div>
                    <div className="text-sm text-gray-500">
                      {plan.exercises.length} exercises
                    </div>
                  </div>

                  <div className="space-y-2">
                    {plan.exercises.slice(0, 3).map((exercise) => (
                      <div key={exercise.id} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        {exercise.name}
                      </div>
                    ))}
                    {plan.exercises.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{plan.exercises.length - 3} more exercises
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 mt-6">
                    <button
                      onClick={() => startWorkout(plan)}
                      className="flex-1 btn-primary py-2 text-sm"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Workout
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-fitness-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-8 h-8 text-fitness-green" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">12</h3>
              <p className="text-gray-600">Workouts This Month</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-fitness-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-fitness-blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">8.5</h3>
              <p className="text-gray-600">Avg. Workout Duration (hrs)</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-fitness-purple bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-fitness-purple" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">85%</h3>
              <p className="text-gray-600">Goal Completion Rate</p>
            </div>
          </div>

          {/* Recent Workouts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Workouts</h3>
            <div className="space-y-4">
              {[
                { name: 'Morning Strength', date: 'Today', duration: '45 min', calories: 280, completed: true },
                { name: 'Cardio Blast', date: 'Yesterday', duration: '30 min', calories: 400, completed: true },
                { name: 'Yoga Flow', date: '2 days ago', duration: '60 min', calories: 150, completed: false }
              ].map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${workout.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{workout.name}</h4>
                      <p className="text-sm text-gray-600">{workout.date} • {workout.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{workout.calories} cal</div>
                    <div className="text-sm text-gray-500">{workout.completed ? 'Completed' : 'In Progress'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkoutPlans;
