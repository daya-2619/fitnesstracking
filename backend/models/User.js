const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  avatar: {
    type: String,
    default: null
  },
  
  // Personal Information
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    required: [true, 'Gender is required']
  },
  height: {
    value: {
      type: Number,
      required: [true, 'Height is required'],
      min: [50, 'Height must be at least 50 cm'],
      max: [300, 'Height cannot exceed 300 cm']
    },
    unit: {
      type: String,
      enum: ['cm', 'ft'],
      default: 'cm'
    }
  },
  weight: {
    value: {
      type: Number,
      required: [true, 'Weight is required'],
      min: [20, 'Weight must be at least 20 kg'],
      max: [500, 'Weight cannot exceed 500 kg']
    },
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    }
  },
  
  // Fitness Information
  fitnessLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  fitnessGoals: [{
    type: String,
    enum: ['weight-loss', 'muscle-gain', 'endurance', 'flexibility', 'strength', 'general-fitness']
  }],
  activityLevel: {
    type: String,
    enum: ['sedentary', 'lightly-active', 'moderately-active', 'very-active', 'extremely-active'],
    default: 'moderately-active'
  },
  
  // Health Information
  medicalConditions: [{
    condition: String,
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe']
    },
    notes: String
  }],
  allergies: [String],
  medications: [String],
  
  // Preferences
  preferredWorkoutTime: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'night'],
    default: 'morning'
  },
  workoutDuration: {
    type: Number,
    min: [15, 'Workout duration must be at least 15 minutes'],
    max: [300, 'Workout duration cannot exceed 300 minutes'],
    default: 60
  },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    sms: { type: Boolean, default: false }
  },
  
  // Social Features
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  friendRequests: [{
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Statistics
  totalWorkouts: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  totalCaloriesBurned: {
    type: Number,
    default: 0
  },
  totalSteps: {
    type: Number,
    default: 0
  },
  totalDistance: {
    type: Number,
    default: 0
  },
  
  // Achievements
  achievements: [{
    type: {
      type: String,
      enum: ['streak', 'workout', 'goal', 'social', 'special']
    },
    name: String,
    description: String,
    icon: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Points and Gamification
  points: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  
  // Subscription
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'pro'],
      default: 'free'
    },
    startDate: Date,
    endDate: Date,
    autoRenew: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for BMI
userSchema.virtual('bmi').get(function() {
  if (!this.height || !this.weight) return null;
  
  let heightInMeters = this.height.unit === 'cm' ? this.height.value / 100 : this.height.value * 0.3048;
  let weightInKg = this.weight.unit === 'lbs' ? this.weight.value * 0.453592 : this.weight.value;
  
  return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'friends': 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update last active
userSchema.methods.updateLastActive = function() {
  this.lastActive = new Date();
  return this.save();
};

// Method to add friend
userSchema.methods.addFriend = function(friendId) {
  if (!this.friends.includes(friendId)) {
    this.friends.push(friendId);
  }
  return this.save();
};

// Method to remove friend
userSchema.methods.removeFriend = function(friendId) {
  this.friends = this.friends.filter(id => !id.equals(friendId));
  return this.save();
};

// Method to add achievement
userSchema.methods.addAchievement = function(achievement) {
  this.achievements.push(achievement);
  this.points += 10; // Award points for achievements
  
  // Level up logic
  if (this.points >= this.level * 100) {
    this.level += 1;
  }
  
  return this.save();
};

// Method to update workout stats
userSchema.methods.updateWorkoutStats = function(workoutData) {
  this.totalWorkouts += 1;
  this.totalCaloriesBurned += workoutData.caloriesBurned || 0;
  this.totalSteps += workoutData.steps || 0;
  this.totalDistance += workoutData.distance || 0;
  
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
