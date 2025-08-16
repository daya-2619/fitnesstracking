const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Exercise name cannot exceed 100 characters']
  },
  
  category: {
    type: String,
    required: [true, 'Exercise category is required'],
    enum: ['strength', 'cardio', 'core', 'flexibility', 'balance', 'sports', 'yoga', 'pilates']
  },
  
  difficulty: {
    type: String,
    required: [true, 'Exercise difficulty is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  
  muscleGroups: [{
    type: String,
    required: [true, 'At least one muscle group is required'],
    enum: [
      'chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms',
      'quadriceps', 'hamstrings', 'glutes', 'calves', 'core',
      'full-body', 'cardio', 'flexibility'
    ]
  }],
  
  equipment: {
    type: String,
    required: [true, 'Equipment type is required'],
    enum: ['bodyweight', 'dumbbells', 'barbell', 'kettlebell', 'resistance-bands', 'machine', 'cardio-equipment', 'other']
  },
  
  instructions: [{
    step: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: [true, 'Instruction description is required'],
      maxlength: [500, 'Instruction cannot exceed 500 characters']
    }
  }],
  
  variations: [{
    name: String,
    description: String,
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced']
    }
  }],
  
  tips: [{
    type: String,
    maxlength: [300, 'Tip cannot exceed 300 characters']
  }],
  
  // Media
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  
  videoUrl: String,
  thumbnailUrl: String,
  
  // Metrics
  duration: {
    min: {
      type: Number,
      min: [1, 'Minimum duration must be at least 1 minute']
    },
    max: {
      type: Number,
      min: [1, 'Maximum duration must be at least 1 minute']
    },
    unit: {
      type: String,
      enum: ['minutes', 'seconds'],
      default: 'minutes'
    }
  },
  
  calories: {
    perMinute: {
      type: Number,
      min: [0, 'Calories per minute cannot be negative']
    },
    perRep: {
      type: Number,
      min: [0, 'Calories per rep cannot be negative']
    }
  },
  
  reps: {
    min: {
      type: Number,
      min: [1, 'Minimum reps must be at least 1']
    },
    max: {
      type: Number,
      min: [1, 'Maximum reps must be at least 1']
    }
  },
  
  sets: {
    min: {
      type: Number,
      min: [1, 'Minimum sets must be at least 1']
    },
    max: {
      type: Number,
      min: [1, 'Maximum sets must be at least 1']
    }
  },
  
  restTime: {
    type: Number,
    min: [0, 'Rest time cannot be negative'],
    default: 60
  },
  
  // Safety and modifications
  safetyNotes: [String],
  modifications: [{
    for: String, // e.g., "knee problems", "back pain"
    description: String
  }],
  
  contraindications: [String], // When not to do this exercise
  
  // User ratings and reviews
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    comment: {
      type: String,
      maxlength: [500, 'Review comment cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Usage statistics
  usageCount: {
    type: Number,
    default: 0
  },
  
  // Tags for search
  tags: [String],
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // SEO
  metaDescription: String,
  keywords: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted duration
exerciseSchema.virtual('formattedDuration').get(function() {
  if (!this.duration.min && !this.duration.max) return null;
  
  if (this.duration.min === this.duration.max) {
    return `${this.duration.min} ${this.duration.unit}`;
  }
  
  return `${this.duration.min}-${this.duration.max} ${this.duration.unit}`;
});

// Virtual for formatted reps
exerciseSchema.virtual('formattedReps').get(function() {
  if (!this.reps.min && !this.reps.max) return null;
  
  if (this.reps.min === this.reps.max) {
    return `${this.reps.min} reps`;
  }
  
  return `${this.reps.min}-${this.reps.max} reps`;
});

// Virtual for formatted sets
exerciseSchema.virtual('formattedSets').get(function() {
  if (!this.sets.min && !this.sets.max) return null;
  
  if (this.sets.min === this.sets.max) {
    return `${this.sets.min} sets`;
  }
  
  return `${this.sets.min}-${this.sets.max} sets`;
});

// Indexes for better query performance
exerciseSchema.index({ name: 'text', tags: 'text' });
exerciseSchema.index({ category: 1, difficulty: 1 });
exerciseSchema.index({ muscleGroups: 1 });
exerciseSchema.index({ equipment: 1 });
exerciseSchema.index({ rating: -1 });
exerciseSchema.index({ usageCount: -1 });

// Pre-save middleware to update rating average
exerciseSchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating.average = totalRating / this.reviews.length;
    this.rating.count = this.reviews.length;
  }
  next();
});

// Method to add review
exerciseSchema.methods.addReview = function(userId, rating, comment) {
  // Remove existing review by this user
  this.reviews = this.reviews.filter(review => !review.user.equals(userId));
  
  // Add new review
  this.reviews.push({
    user: userId,
    rating,
    comment
  });
  
  return this.save();
};

// Method to increment usage count
exerciseSchema.methods.incrementUsage = function() {
  this.usageCount += 1;
  return this.save();
};

// Static method to search exercises
exerciseSchema.statics.search = function(query, filters = {}) {
  const searchQuery = {};
  
  // Text search
  if (query) {
    searchQuery.$text = { $search: query };
  }
  
  // Apply filters
  if (filters.category) {
    searchQuery.category = filters.category;
  }
  
  if (filters.difficulty) {
    searchQuery.difficulty = filters.difficulty;
  }
  
  if (filters.muscleGroups && filters.muscleGroups.length > 0) {
    searchQuery.muscleGroups = { $in: filters.muscleGroups };
  }
  
  if (filters.equipment) {
    searchQuery.equipment = filters.equipment;
  }
  
  if (filters.minRating) {
    searchQuery['rating.average'] = { $gte: filters.minRating };
  }
  
  return this.find(searchQuery)
    .sort({ 'rating.average': -1, usageCount: -1 })
    .populate('reviews.user', 'firstName lastName avatar');
};

// Static method to get popular exercises
exerciseSchema.statics.getPopular = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ usageCount: -1, 'rating.average': -1 })
    .limit(limit);
};

// Static method to get exercises by category
exerciseSchema.statics.getByCategory = function(category, limit = 20) {
  return this.find({ 
    category, 
    isActive: true 
  })
    .sort({ 'rating.average': -1 })
    .limit(limit);
};

module.exports = mongoose.model('Exercise', exerciseSchema);
