import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Apple, Target, TrendingUp, Clock, Calendar, BarChart3, Utensils, Scale, Zap, Heart, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import AuthContext from '../../contexts/AuthContext';

const NutritionTracking = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [showAddFood, setShowAddFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [dailyNutrition, setDailyNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0
  });
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });
  const [weeklyData, setWeeklyData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Mock food database
  const foodDatabase = [
    { id: 1, name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, serving: '100g' },
    { id: 2, name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, sugar: 0.4, serving: '100g' },
    { id: 3, name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, sugar: 1.5, serving: '100g' },
    { id: 4, name: 'Salmon', calories: 208, protein: 25, carbs: 0, fat: 12, fiber: 0, sugar: 0, serving: '100g' },
    { id: 5, name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, sugar: 4.2, serving: '100g' },
    { id: 6, name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, sugar: 3.2, serving: '100g' },
    { id: 7, name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12, serving: '100g' },
    { id: 8, name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5, sugar: 4.8, serving: '100g' }
  ];

  // Mock weekly nutrition data
  useEffect(() => {
    const mockWeeklyData = [
      { day: 'Mon', calories: 1850, protein: 120, carbs: 180, fat: 65 },
      { day: 'Tue', calories: 1920, protein: 125, carbs: 190, fat: 68 },
      { day: 'Wed', calories: 1780, protein: 115, carbs: 170, fat: 62 },
      { day: 'Thu', calories: 1950, protein: 130, carbs: 195, fat: 70 },
      { day: 'Fri', calories: 1880, protein: 122, carbs: 185, fat: 66 },
      { day: 'Sat', calories: 2100, protein: 140, carbs: 210, fat: 75 },
      { day: 'Sun', calories: 1820, protein: 118, carbs: 175, fat: 63 }
    ];
    setWeeklyData(mockWeeklyData);
  }, []);

  // Calculate daily totals
  useEffect(() => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 };
    
    Object.values(meals).forEach(meal => {
      meal.forEach(food => {
        totals.calories += food.calories;
        totals.protein += food.protein;
        totals.carbs += food.carbs;
        totals.fat += food.fat;
        totals.fiber += food.fiber;
        totals.sugar += food.sugar;
      });
    });
    
    setDailyNutrition(totals);
  }, [meals]);

  // Search food database
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 2) {
      const results = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Add food to meal
  const addFoodToMeal = (food, quantity = 1) => {
    const adjustedFood = {
      ...food,
      calories: Math.round(food.calories * quantity),
      protein: Math.round(food.protein * quantity * 10) / 10,
      carbs: Math.round(food.carbs * quantity * 10) / 10,
      fat: Math.round(food.fat * quantity * 10) / 10,
      fiber: Math.round(food.fiber * quantity * 10) / 10,
      sugar: Math.round(food.sugar * quantity * 10) / 10,
      quantity: quantity
    };

    setMeals(prev => ({
      ...prev,
      [selectedMeal]: [...prev[selectedMeal], adjustedFood]
    }));

    setShowAddFood(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  // Remove food from meal
  const removeFoodFromMeal = (mealType, foodIndex) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter((_, index) => index !== foodIndex)
    }));
  };

  // Calculate daily goals (based on user weight and activity)
  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    fiber: 25,
    sugar: 50
  };

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getProgressBarColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const nutritionChartData = [
    { name: 'Protein', value: dailyNutrition.protein, color: '#3b82f6' },
    { name: 'Carbs', value: dailyNutrition.carbs, color: '#10b981' },
    { name: 'Fat', value: dailyNutrition.fat, color: '#f59e0b' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrition Tracking</h1>
          <p className="text-gray-600">Track your daily nutrition and maintain a balanced diet</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Today's Nutrition</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{dailyNutrition.calories}</div>
                  <div className="text-sm text-blue-600">Calories</div>
                  <div className="text-xs text-gray-500">Goal: {dailyGoals.calories}</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{dailyNutrition.protein}g</div>
                  <div className="text-sm text-green-600">Protein</div>
                  <div className="text-xs text-gray-500">Goal: {dailyGoals.protein}g</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{dailyNutrition.carbs}g</div>
                  <div className="text-sm text-yellow-600">Carbs</div>
                  <div className="text-xs text-gray-500">Goal: {dailyGoals.carbs}g</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3">
                {Object.entries(dailyNutrition).map(([nutrient, value]) => (
                  <div key={nutrient} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{nutrient}</span>
                      <span className={getProgressColor(value, dailyGoals[nutrient])}>
                        {value}g / {dailyGoals[nutrient]}g
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressBarColor(value, dailyGoals[nutrient])}`}
                        style={{ width: `${Math.min((value / dailyGoals[nutrient]) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meal Planning */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Meal Planning</h2>
                <button
                  onClick={() => setShowAddFood(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Food
                </button>
              </div>

              {/* Meal Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                {['breakfast', 'lunch', 'dinner', 'snacks'].map((meal) => (
                  <button
                    key={meal}
                    onClick={() => setSelectedMeal(meal)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      selectedMeal === meal
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </button>
                ))}
              </div>

              {/* Meal Content */}
              <div className="space-y-3">
                {meals[selectedMeal].length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Utensils className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No foods added to {selectedMeal} yet</p>
                    <button
                      onClick={() => setShowAddFood(true)}
                      className="text-primary-600 hover:text-primary-700 mt-2"
                    >
                      Add your first food item
                    </button>
                  </div>
                ) : (
                  meals[selectedMeal].map((food, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Apple className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium">{food.name}</div>
                          <div className="text-sm text-gray-600">
                            {food.quantity}x {food.serving} • {food.calories} cal
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div className="font-medium">{food.protein}g protein</div>
                          <div className="text-gray-600">{food.carbs}g carbs</div>
                        </div>
                        <button
                          onClick={() => removeFoodFromMeal(selectedMeal, index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          ×
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Weekly Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Weekly Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="protein" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="carbs" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Nutrition Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Macro Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={nutritionChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {nutritionChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {nutritionChartData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}g</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add Foods */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Add</h3>
              <div className="space-y-2">
                {foodDatabase.slice(0, 5).map((food) => (
                  <button
                    key={food.id}
                    onClick={() => addFoodToMeal(food)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    <div className="font-medium">{food.name}</div>
                    <div className="text-sm text-gray-600">{food.calories} cal • {food.serving}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Goals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Daily Goals</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Calories</span>
                  <span className="text-sm font-medium">{dailyNutrition.calories}/{dailyGoals.calories}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Protein</span>
                  <span className="text-sm font-medium">{dailyNutrition.protein}g/{dailyGoals.protein}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Carbs</span>
                  <span className="text-sm font-medium">{dailyNutrition.carbs}g/{dailyGoals.carbs}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fat</span>
                  <span className="text-sm font-medium">{dailyNutrition.fat}g/{dailyGoals.fat}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Food Modal */}
        {showAddFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Add Food</h3>
                  <button
                    onClick={() => setShowAddFood(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Food
                    </label>
                    <input
                      type="text"
                      placeholder="Search for foods..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {searchResults.length > 0 && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {searchResults.map((food) => (
                        <div
                          key={food.id}
                          className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 cursor-pointer"
                          onClick={() => addFoodToMeal(food)}
                        >
                          <div className="font-medium">{food.name}</div>
                          <div className="text-sm text-gray-600">
                            {food.calories} cal • {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionTracking;
