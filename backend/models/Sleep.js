const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Sleep session details
  startTime: {
    type: Date,
    required: [true, 'Sleep start time is required']
  },
  
  endTime: {
    type: Date,
    required: [true, 'Sleep end time is required']
  },
  
  // Calculated duration
  duration: {
    type: Number, // in hours
    required: true,
    min: [0.1, 'Sleep duration must be at least 0.1 hours'],
    max: [24, 'Sleep duration cannot exceed 24 hours']
  },
  
  // Sleep quality assessment
  quality: {
    type: Number,
    required: [true, 'Sleep quality rating is required'],
    min: [1, 'Sleep quality must be at least 1'],
    max: [10, 'Sleep quality cannot exceed 10']
  },
  
  // Sleep stages (if available from wearable devices)
  sleepStages: {
    deepSleep: {
      duration: {
        type: Number,
        min: [0, 'Deep sleep duration cannot be negative'],
        max: [24, 'Deep sleep duration cannot exceed 24 hours']
      },
      percentage: {
        type: Number,
        min: [0, 'Deep sleep percentage cannot be negative'],
        max: [100, 'Deep sleep percentage cannot exceed 100']
      }
    },
    
    lightSleep: {
      duration: {
        type: Number,
        min: [0, 'Light sleep duration cannot be negative'],
        max: [24, 'Light sleep duration cannot exceed 24 hours']
      },
      percentage: {
        type: Number,
        min: [0, 'Light sleep percentage cannot be negative'],
        max: [100, 'Light sleep percentage cannot exceed 100']
      }
    },
    
    remSleep: {
      duration: {
        type: Number,
        min: [0, 'REM sleep duration cannot be negative'],
        max: [24, 'REM sleep duration cannot exceed 24 hours']
      },
      percentage: {
        type: Number,
        min: [0, 'REM sleep percentage cannot be negative'],
        max: [100, 'REM sleep percentage cannot exceed 100']
      }
    },
    
    awake: {
      duration: {
        type: Number,
        min: [0, 'Awake duration cannot be negative'],
        max: [24, 'Awake duration cannot exceed 24 hours']
      },
      percentage: {
        type: Number,
        min: [0, 'Awake percentage cannot be negative'],
        max: [100, 'Awake percentage cannot exceed 100']
      }
    }
  },
  
  // Heart rate data during sleep
  heartRate: {
    min: {
      type: Number,
      min: [30, 'Minimum heart rate cannot be below 30'],
      max: [200, 'Maximum heart rate cannot exceed 200']
    },
    max: {
      type: Number,
      min: [30, 'Maximum heart rate cannot be below 30'],
      max: [200, 'Maximum heart rate cannot exceed 200']
    },
    average: {
      type: Number,
      min: [30, 'Average heart rate cannot be below 30'],
      max: [200, 'Average heart rate cannot exceed 200']
    },
    resting: {
      type: Number,
      min: [30, 'Resting heart rate cannot be below 30'],
      max: [200, 'Resting heart rate cannot exceed 200']
    }
  },
  
  // Sleep environment factors
  environment: {
    temperature: {
      value: Number,
      unit: {
        type: String,
        enum: ['celsius', 'fahrenheit'],
        default: 'celsius'
      }
    },
    humidity: {
      type: Number,
      min: [0, 'Humidity cannot be negative'],
      max: [100, 'Humidity cannot exceed 100']
    },
    noise: {
      type: String,
      enum: ['quiet', 'moderate', 'loud', 'very-loud']
    },
    light: {
      type: String,
      enum: ['dark', 'dim', 'moderate', 'bright']
    }
  },
  
  // Sleep habits and routine
  routine: {
    bedtime: {
      type: Date
    },
    wakeTime: {
      type: Date
    },
    preSleepActivities: [{
      activity: String,
      duration: Number, // in minutes
      impact: {
        type: String,
        enum: ['positive', 'neutral', 'negative']
      }
    }],
    sleepAids: [{
      type: String,
      enum: ['none', 'melatonin', 'prescription', 'over-the-counter', 'natural', 'other']
    }]
  },
  
  // Sleep disturbances
  disturbances: [{
    type: {
      type: String,
      enum: ['noise', 'light', 'temperature', 'pain', 'anxiety', 'bathroom', 'partner', 'child', 'pet', 'other']
    },
    description: String,
    time: Date,
    duration: Number // in minutes
  }],
  
  // Sleep quality factors
  factors: {
    stress: {
      type: Number,
      min: [1, 'Stress level must be at least 1'],
      max: [10, 'Stress level cannot exceed 10']
    },
    exercise: {
      type: Number,
      min: [1, 'Exercise level must be at least 1'],
      max: [10, 'Exercise level cannot exceed 10']
    },
    caffeine: {
      type: Number,
      min: [0, 'Caffeine consumption cannot be negative'],
      max: [10, 'Caffeine consumption cannot exceed 10']
    },
    alcohol: {
      type: Number,
      min: [0, 'Alcohol consumption cannot be negative'],
      max: [10, 'Alcohol consumption cannot be negative']
    },
    screenTime: {
      type: Number,
      min: [0, 'Screen time cannot be negative'],
      max: [10, 'Screen time cannot exceed 10']
    }
  },
  
  // User notes and observations
  notes: String,
  
  // Sleep goals and targets
  goals: {
    targetDuration: {
      type: Number,
      min: [6, 'Target sleep duration should be at least 6 hours'],
      max: [10, 'Target sleep duration should not exceed 10 hours']
    },
    targetQuality: {
      type: Number,
      min: [7, 'Target sleep quality should be at least 7'],
      max: [10, 'Target sleep quality should not exceed 10']
    },
    achieved: {
      duration: {
        type: Boolean,
        default: false
      },
      quality: {
        type: Boolean,
        default: false
      }
    }
  },
  
  // Tags for categorization
  tags: [String],
  
  // Privacy settings
  isPrivate: {
    type: Boolean,
    default: false
  },
  
  // Data source
  dataSource: {
    type: String,
    enum: ['manual', 'wearable', 'app', 'other'],
    default: 'manual'
  },
  
  // Device information (if from wearable)
  device: {
    name: String,
    model: String,
    manufacturer: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for sleep efficiency
sleepSchema.virtual('sleepEfficiency').get(function() {
  if (!this.sleepStages.deepSleep || !this.sleepStages.lightSleep || !this.sleepStages.remSleep) {
    return null;
  }
  
  const totalSleepTime = this.sleepStages.deepSleep.duration + this.sleepStages.lightSleep.duration + this.sleepStages.remSleep.duration;
  const totalTimeInBed = this.duration;
  
  return totalTimeInBed > 0 ? (totalSleepTime / totalTimeInBed) * 100 : 0;
});

// Virtual for sleep debt
sleepSchema.virtual('sleepDebt').get(function() {
  if (!this.goals.targetDuration) return null;
  
  const debt = this.goals.targetDuration - this.duration;
  return debt > 0 ? debt : 0;
});

// Virtual for sleep score
sleepSchema.virtual('sleepScore').get(function() {
  let score = 0;
  
  // Duration score (40% weight)
  if (this.goals.targetDuration) {
    const durationRatio = Math.min(this.duration / this.goals.targetDuration, 1.2);
    score += durationRatio * 40;
  }
  
  // Quality score (30% weight)
  score += (this.quality / 10) * 30;
  
  // Efficiency score (20% weight)
  if (this.sleepEfficiency) {
    score += (this.sleepEfficiency / 100) * 20;
  }
  
  // Consistency score (10% weight) - would need historical data
  score += 10;
  
  return Math.round(score);
});

// Virtual for sleep category
sleepSchema.virtual('sleepCategory').get(function() {
  if (this.sleepScore >= 90) return 'excellent';
  if (this.sleepScore >= 80) return 'good';
  if (this.sleepScore >= 70) return 'fair';
  if (this.sleepScore >= 60) return 'poor';
  return 'very-poor';
});

// Indexes for better query performance
sleepSchema.index({ user: 1, startTime: -1 });
sleepSchema.index({ user: 1, date: -1 });
sleepSchema.index({ startTime: -1 });
sleepSchema.index({ quality: -1 });

// Pre-save middleware to calculate duration and percentages
sleepSchema.pre('save', function(next) {
  // Calculate duration if not provided
  if (this.startTime && this.endTime && !this.duration) {
    this.duration = (this.endTime - this.startTime) / (1000 * 60 * 60); // Convert to hours
  }
  
  // Calculate sleep stage percentages if durations are provided
  if (this.sleepStages) {
    const stages = ['deepSleep', 'lightSleep', 'remSleep', 'awake'];
    let totalDuration = 0;
    
    stages.forEach(stage => {
      if (this.sleepStages[stage] && this.sleepStages[stage].duration) {
        totalDuration += this.sleepStages[stage].duration;
      }
    });
    
    if (totalDuration > 0) {
      stages.forEach(stage => {
        if (this.sleepStages[stage] && this.sleepStages[stage].duration) {
          this.sleepStages[stage].percentage = (this.sleepStages[stage].duration / totalDuration) * 100;
        }
      });
    }
  }
  
  // Check if goals are achieved
  if (this.goals.targetDuration) {
    this.goals.achieved.duration = this.duration >= this.goals.targetDuration;
  }
  
  if (this.goals.targetQuality) {
    this.goals.achieved.quality = this.quality >= this.goals.targetQuality;
  }
  
  next();
});

// Static method to get sleep summary for a date range
sleepSchema.statics.getSleepSummary = function(userId, startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        startTime: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalSleepSessions: { $sum: 1 },
        averageDuration: { $avg: '$duration' },
        averageQuality: { $avg: '$quality' },
        averageSleepScore: { $avg: '$sleepScore' },
        totalSleepTime: { $sum: '$duration' },
        bestQuality: { $max: '$quality' },
        worstQuality: { $min: '$quality' }
      }
    }
  ]);
};

// Static method to get weekly sleep trends
sleepSchema.statics.getWeeklyTrends = function(userId, startDate) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);
  
  return this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        startTime: { $gte: startDate, $lt: endDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
        duration: { $avg: '$duration' },
        quality: { $avg: '$quality' },
        sleepScore: { $avg: '$sleepScore' },
        deepSleep: { $avg: '$sleepStages.deepSleep.duration' },
        remSleep: { $avg: '$sleepStages.remSleep.duration' }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);
};

// Static method to get sleep insights
sleepSchema.statics.getSleepInsights = function(userId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        startTime: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        averageSleepScore: { $avg: '$sleepScore' },
        sleepEfficiency: { $avg: '$sleepEfficiency' },
        averageDeepSleep: { $avg: '$sleepStages.deepSleep.duration' },
        averageRemSleep: { $avg: '$sleepStages.remSleep.duration' },
        qualityTrend: { $avg: '$quality' },
        consistency: { $stdDevPop: '$duration' }
      }
    }
  ]);
};

// Method to update sleep stages
sleepSchema.methods.updateSleepStages = function(stagesData) {
  this.sleepStages = { ...this.sleepStages, ...stagesData };
  return this.save();
};

// Method to add disturbance
sleepSchema.methods.addDisturbance = function(disturbanceData) {
  this.disturbances.push(disturbanceData);
  return this.save();
};

// Method to update sleep quality
sleepSchema.methods.updateQuality = function(newQuality, notes = '') {
  this.quality = newQuality;
  if (notes) {
    this.notes = this.notes ? `${this.notes}\n${notes}` : notes;
  }
  return this.save();
};

module.exports = mongoose.model('Sleep', sleepSchema);
