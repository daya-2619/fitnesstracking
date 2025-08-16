const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  meal: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'snacks', 'pre-workout', 'post-workout']
  },
  
  foods: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    
    quantity: {
      type: Number,
      required: true,
      min: [0.1, 'Quantity must be at least 0.1']
    },
    
    unit: {
      type: String,
      required: true,
      enum: ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'piece', 'slice', 'serving']
    },
    
    // Nutritional values per unit
    calories: {
      type: Number,
      required: true,
      min: [0, 'Calories cannot be negative']
    },
    
    protein: {
      type: Number,
      required: true,
      min: [0, 'Protein cannot be negative']
    },
    
    carbs: {
      type: Number,
      required: true,
      min: [0, 'Carbs cannot be negative']
    },
    
    fat: {
      type: Number,
      required: true,
      min: [0, 'Fat cannot be negative']
    },
    
    fiber: {
      type: Number,
      default: 0,
      min: [0, 'Fiber cannot be negative']
    },
    
    sugar: {
      type: Number,
      default: 0,
      min: [0, 'Sugar cannot be negative']
    },
    
    sodium: {
      type: Number,
      default: 0,
      min: [0, 'Sodium cannot be negative']
    },
    
    cholesterol: {
      type: Number,
      default: 0,
      min: [0, 'Cholesterol cannot be negative']
    },
    
    // Additional nutrients
    vitamins: {
      vitaminA: { type: Number, default: 0 },
      vitaminC: { type: Number, default: 0 },
      vitaminD: { type: Number, default: 0 },
      vitaminE: { type: Number, default: 0 },
      vitaminK: { type: Number, default: 0 },
      vitaminB1: { type: Number, default: 0 },
      vitaminB2: { type: Number, default: 0 },
      vitaminB3: { type: Number, default: 0 },
      vitaminB6: { type: Number, default: 0 },
      vitaminB12: { type: Number, default: 0 }
    },
    
    minerals: {
      calcium: { type: Number, default: 0 },
      iron: { type: Number, default: 0 },
      magnesium: { type: Number, default: 0 },
      phosphorus: { type: Number, default: 0 },
      potassium: { type: Number, default: 0 },
      zinc: { type: Number, default: 0 }
    },
    
    // Food source information
    brand: String,
    barcode: String,
    foodDatabaseId: String, // Reference to external food database
    
    // User notes
    notes: String,
    
    // Calculated totals for this food item
    totalCalories: {
      type: Number,
      required: true
    },
    
    totalProtein: {
      type: Number,
      required: true
    },
    
    totalCarbs: {
      type: Number,
      required: true
    },
    
    totalFat: {
      type: Number,
      required: true
    },
    
    totalFiber: {
      type: Number,
      default: 0
    },
    
    totalSugar: {
      type: Number,
      default: 0
    }
  }],
  
  // Meal totals (calculated)
  totalCalories: {
    type: Number,
    default: 0
  },
  
  totalProtein: {
    type: Number,
    default: 0
  },
  
  totalCarbs: {
    type: Number,
    default: 0
  },
  
  totalFat: {
    type: Number,
    default: 0
  },
  
  totalFiber: {
    type: Number,
    default: 0
  },
  
  totalSugar: {
    type: Number,
    default: 0
  },
  
  totalSodium: {
    type: Number,
    default: 0
  },
  
  totalCholesterol: {
    type: Number,
    default: 0
  },
  
  // Meal information
  mealTime: {
    type: Date,
    default: Date.now
  },
  
  location: String, // e.g., "home", "work", "restaurant"
  
  mood: {
    type: String,
    enum: ['great', 'good', 'okay', 'bad', 'terrible']
  },
  
  hungerLevel: {
    type: Number,
    min: [1, 'Hunger level must be at least 1'],
    max: [10, 'Hunger level cannot exceed 10']
  },
  
  fullnessLevel: {
    type: Number,
    min: [1, 'Fullness level must be at least 1'],
    max: [10, 'Fullness level cannot exceed 10']
  },
  
  // Photos
  photos: [{
    url: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // User notes
  notes: String,
  
  // Tags for categorization
  tags: [String],
  
  // Privacy settings
  isPrivate: {
    type: Boolean,
    default: false
  },
  
  // Sharing
  sharedWith: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permission: {
      type: String,
      enum: ['view', 'comment', 'edit'],
      default: 'view'
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for meal time of day
nutritionSchema.virtual('mealTimeOfDay').get(function() {
  if (!this.mealTime) return null;
  
  const hour = this.mealTime.getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
});

// Virtual for total vitamins
nutritionSchema.virtual('totalVitamins').get(function() {
  const totals = {};
  const vitaminKeys = ['vitaminA', 'vitaminC', 'vitaminD', 'vitaminE', 'vitaminK', 'vitaminB1', 'vitaminB2', 'vitaminB3', 'vitaminB6', 'vitaminB12'];
  
  vitaminKeys.forEach(vitamin => {
    totals[vitamin] = this.foods.reduce((sum, food) => {
      return sum + (food.vitamins[vitamin] || 0);
    }, 0);
  });
  
  return totals;
});

// Virtual for total minerals
nutritionSchema.virtual('totalMinerals').get(function() {
  const totals = {};
  const mineralKeys = ['calcium', 'iron', 'magnesium', 'phosphorus', 'potassium', 'zinc'];
  
  mineralKeys.forEach(mineral => {
    totals[mineral] = this.foods.reduce((sum, food) => {
      return sum + (food.minerals[mineral] || 0);
    }, 0);
  });
  
  return totals;
});

// Indexes for better query performance
nutritionSchema.index({ user: 1, date: -1 });
nutritionSchema.index({ user: 1, meal: 1, date: -1 });
nutritionSchema.index({ date: -1 });
nutritionSchema.index({ 'foods.name': 'text', notes: 'text' });

// Pre-save middleware to calculate totals
nutritionSchema.pre('save', function(next) {
  // Calculate totals for each food item
  this.foods.forEach(food => {
    food.totalCalories = food.calories * food.quantity;
    food.totalProtein = food.protein * food.quantity;
    food.totalCarbs = food.carbs * food.quantity;
    food.totalFat = food.fat * food.quantity;
    food.totalFiber = food.fiber * food.quantity;
    food.totalSugar = food.sugar * food.quantity;
  });
  
  // Calculate meal totals
  this.totalCalories = this.foods.reduce((sum, food) => sum + food.totalCalories, 0);
  this.totalProtein = this.foods.reduce((sum, food) => sum + food.totalProtein, 0);
  this.totalCarbs = this.foods.reduce((sum, food) => sum + food.totalCarbs, 0);
  this.totalFat = this.foods.reduce((sum, food) => sum + food.totalFat, 0);
  this.totalFiber = this.foods.reduce((sum, food) => sum + food.totalFiber, 0);
  this.totalSugar = this.foods.reduce((sum, food) => sum + food.totalSugar, 0);
  this.totalSodium = this.foods.reduce((sum, food) => sum + (food.sodium * food.quantity), 0);
  this.totalCholesterol = this.foods.reduce((sum, food) => sum + (food.cholesterol * food.quantity), 0);
  
  next();
});

// Static method to get daily nutrition summary
nutritionSchema.statics.getDailySummary = function(userId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        date: { $gte: startOfDay, $lte: endOfDay }
      }
    },
    {
      $group: {
        _id: null,
        totalCalories: { $sum: '$totalCalories' },
        totalProtein: { $sum: '$totalProtein' },
        totalCarbs: { $sum: '$totalCarbs' },
        totalFat: { $sum: '$totalFat' },
        totalFiber: { $sum: '$totalFiber' },
        totalSugar: { $sum: '$totalSugar' },
        mealCount: { $sum: 1 }
      }
    }
  ]);
};

// Static method to get weekly nutrition trends
nutritionSchema.statics.getWeeklyTrends = function(userId, startDate) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);
  
  return this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        date: { $gte: startDate, $lt: endDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        totalCalories: { $sum: '$totalCalories' },
        totalProtein: { $sum: '$totalProtein' },
        totalCarbs: { $sum: '$totalCarbs' },
        totalFat: { $sum: '$totalFat' }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);
};

// Method to add food to meal
nutritionSchema.methods.addFood = function(foodData) {
  this.foods.push(foodData);
  return this.save();
};

// Method to remove food from meal
nutritionSchema.methods.removeFood = function(foodIndex) {
  if (foodIndex >= 0 && foodIndex < this.foods.length) {
    this.foods.splice(foodIndex, 1);
    return this.save();
  }
  return Promise.reject(new Error('Invalid food index'));
};

// Method to update food quantity
nutritionSchema.methods.updateFoodQuantity = function(foodIndex, newQuantity) {
  if (foodIndex >= 0 && foodIndex < this.foods.length) {
    this.foods[foodIndex].quantity = newQuantity;
    return this.save();
  }
  return Promise.reject(new Error('Invalid food index'));
};

module.exports = mongoose.model('Nutrition', nutritionSchema);
