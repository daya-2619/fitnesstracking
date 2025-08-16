import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Play, BookOpen, Target, Clock, TrendingUp, Heart, Dumbbell, Users, Star } from 'lucide-react';
import AuthContext from '../../contexts/AuthContext';

const ExerciseLibrary = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Mock exercise data with real-time updates
  useEffect(() => {
    const mockExercises = [
      {
        id: 1,
        name: 'Push-ups',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'bodyweight',
        duration: '5-10 min',
        calories: 45,
        instructions: [
          'Start in a plank position with hands slightly wider than shoulders',
          'Lower your body until chest nearly touches the floor',
          'Push back up to starting position',
          'Keep your core tight and body in a straight line'
        ],
        videoUrl: 'https://example.com/pushups',
        rating: 4.8,
        reviews: 1247,
        variations: ['Wide push-ups', 'Diamond push-ups', 'Decline push-ups'],
        tips: 'Focus on form over quantity. Start with 5-10 reps and gradually increase.',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Squats',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
        equipment: 'bodyweight',
        duration: '8-12 min',
        calories: 52,
        instructions: [
          'Stand with feet shoulder-width apart',
          'Lower your body as if sitting back into a chair',
          'Keep your chest up and knees behind toes',
          'Return to standing position'
        ],
        videoUrl: 'https://example.com/squats',
        rating: 4.9,
        reviews: 2156,
        variations: ['Jump squats', 'Pistol squats', 'Wall squats'],
        tips: 'Keep your weight in your heels and don\'t let your knees cave inward.',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Plank',
        category: 'core',
        difficulty: 'beginner',
        muscleGroups: ['core', 'shoulders', 'back'],
        equipment: 'bodyweight',
        duration: '3-5 min',
        calories: 25,
        instructions: [
          'Start in a forearm plank position',
          'Keep your body in a straight line from head to heels',
          'Engage your core muscles',
          'Hold the position'
        ],
        videoUrl: 'https://example.com/plank',
        rating: 4.7,
        reviews: 892,
        variations: ['Side plank', 'Plank with leg lift', 'Plank jacks'],
        tips: 'Focus on breathing steadily and maintaining proper form.',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Burpees',
        category: 'cardio',
        difficulty: 'intermediate',
        muscleGroups: ['full body', 'cardio'],
        equipment: 'bodyweight',
        duration: '10-15 min',
        calories: 78,
        instructions: [
          'Start standing, then drop into a squat position',
          'Place hands on ground and kick feet back into plank',
          'Perform a push-up, then jump feet back to squat',
          'Jump up from squatting position'
        ],
        videoUrl: 'https://example.com/burpees',
        rating: 4.6,
        reviews: 1567,
        variations: ['Half burpees', 'Burpee pull-ups', 'Burpee box jumps'],
        tips: 'Start slow and focus on form. This is a high-intensity exercise.',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 5,
        name: 'Pull-ups',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['back', 'biceps', 'shoulders'],
        equipment: 'pull-up bar',
        duration: '8-12 min',
        calories: 65,
        instructions: [
          'Hang from pull-up bar with hands slightly wider than shoulders',
          'Pull your body up until chin is above the bar',
          'Lower yourself back down with control',
          'Repeat the movement'
        ],
        videoUrl: 'https://example.com/pullups',
        rating: 4.9,
        reviews: 2341,
        variations: ['Assisted pull-ups', 'Wide grip pull-ups', 'L-sit pull-ups'],
        tips: 'If you can\'t do a full pull-up, start with assisted variations.',
        lastUpdated: new Date().toISOString()
      }
    ];

    setExercises(mockExercises);
    setFilteredExercises(mockExercises);
  }, []);

  // Real-time filtering
  useEffect(() => {
    let filtered = exercises;
    
    if (searchTerm) {
      filtered = filtered.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.muscleGroups.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(exercise => exercise.difficulty === selectedDifficulty);
    }
    
    setFilteredExercises(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, exercises]);

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(ex => ex.id !== exercise.id);
      return [exercise, ...filtered].slice(0, 5);
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'strength': return <Dumbbell className="w-5 h-5" />;
      case 'cardio': return <Heart className="w-5 h-5" />;
      case 'core': return <Target className="w-5 h-5" />;
      case 'flexibility': return <TrendingUp className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exercise Library</h1>
          <p className="text-gray-600">Discover and learn proper form for hundreds of exercises</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search exercises or muscle groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="core">Core</option>
                <option value="flexibility">Flexibility</option>
              </select>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exercise List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Exercises ({filteredExercises.length})</h2>
              
              <div className="space-y-4">
                {filteredExercises.map((exercise) => (
                  <motion.div
                    key={exercise.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleExerciseClick(exercise)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            {getCategoryIcon(exercise.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{exercise.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                {exercise.difficulty}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {exercise.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="w-4 h-4" />
                                {exercise.calories} cal
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Muscle Groups:</strong> {exercise.muscleGroups.join(', ')}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Equipment:</strong> {exercise.equipment}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            {exercise.rating} ({exercise.reviews} reviews)
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {exercise.variations.length} variations
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <button className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors">
                          <Play className="w-5 h-5" />
                        </button>
                        <span className="text-xs text-gray-500">
                          {new Date(exercise.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Exercise Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedExercise ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6 sticky top-6"
              >
                <h3 className="text-xl font-semibold mb-4">{selectedExercise.name}</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Instructions</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      {selectedExercise.instructions.map((instruction, index) => (
                        <li key={index} className="text-gray-700">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Variations</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedExercise.variations.map((variation, index) => (
                        <li key={index} className="text-gray-700">• {variation}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <h4 className="font-medium mb-2 text-primary-800">Pro Tips</h4>
                    <p className="text-sm text-primary-700">{selectedExercise.tips}</p>
                  </div>
                  
                  <button className="w-full btn-primary">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Select an exercise to view details</p>
                </div>
              </div>
            )}
            
            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h4 className="font-medium mb-3">Recently Viewed</h4>
                <div className="space-y-2">
                  {recentlyViewed.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        {getCategoryIcon(exercise.category)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{exercise.name}</p>
                        <p className="text-xs text-gray-500">{exercise.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseLibrary;
