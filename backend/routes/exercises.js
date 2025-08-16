const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const { protect, optionalAuth, generalRateLimit } = require('../middleware/auth');

// @desc    Get all exercises with filtering and search
// @route   GET /api/exercises
// @access  Public
router.get('/', optionalAuth, generalRateLimit, async (req, res) => {
  try {
    const {
      search,
      category,
      difficulty,
      muscleGroups,
      equipment,
      minRating,
      page = 1,
      limit = 20,
      sortBy = 'rating',
      sortOrder = 'desc'
    } = req.query;

    // Build search query
    const searchQuery = {};
    
    if (search) {
      searchQuery.$text = { $search: search };
    }
    
    if (category) {
      searchQuery.category = category;
    }
    
    if (difficulty) {
      searchQuery.difficulty = difficulty;
    }
    
    if (muscleGroups) {
      const groups = muscleGroups.split(',');
      searchQuery.muscleGroups = { $in: groups };
    }
    
    if (equipment) {
      searchQuery.equipment = equipment;
    }
    
    if (minRating) {
      searchQuery['rating.average'] = { $gte: parseFloat(minRating) };
    }

    // Build sort object
    const sortObject = {};
    if (sortBy === 'rating') {
      sortObject['rating.average'] = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'usage') {
      sortObject.usageCount = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'name') {
      sortObject.name = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortObject.createdAt = sortOrder === 'desc' ? -1 : 1;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query
    const exercises = await Exercise.find(searchQuery)
      .sort(sortObject)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('reviews.user', 'firstName lastName avatar');

    // Get total count for pagination
    const total = await Exercise.countDocuments(searchQuery);

    res.json({
      success: true,
      data: exercises,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get exercises error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching exercises',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get exercise by ID
// @route   GET /api/exercises/:id
// @access  Public
router.get('/:id', optionalAuth, generalRateLimit, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id)
      .populate('reviews.user', 'firstName lastName avatar');

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found'
      });
    }

    // Increment usage count if user is authenticated
    if (req.user) {
      await exercise.incrementUsage();
    }

    res.json({
      success: true,
      data: exercise
    });
  } catch (error) {
    console.error('Get exercise error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching exercise',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Create new exercise (Admin only)
// @route   POST /api/exercises
// @access  Private
router.post('/', protect, generalRateLimit, async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Exercise created successfully',
      data: exercise
    });
  } catch (error) {
    console.error('Create exercise error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating exercise',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update exercise (Admin only)
// @route   PUT /api/exercises/:id
// @access  Private
router.put('/:id', protect, generalRateLimit, async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found'
      });
    }

    res.json({
      success: true,
      message: 'Exercise updated successfully',
      data: exercise
    });
  } catch (error) {
    console.error('Update exercise error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating exercise',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Delete exercise (Admin only)
// @route   DELETE /api/exercises/:id
// @access  Private
router.delete('/:id', protect, generalRateLimit, async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found'
      });
    }

    res.json({
      success: true,
      message: 'Exercise deleted successfully'
    });
  } catch (error) {
    console.error('Delete exercise error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting exercise',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Add review to exercise
// @route   POST /api/exercises/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, generalRateLimit, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found'
      });
    }

    // Add review
    await exercise.addReview(req.user._id, rating, comment);

    // Fetch updated exercise
    const updatedExercise = await Exercise.findById(req.params.id)
      .populate('reviews.user', 'firstName lastName avatar');

    res.json({
      success: true,
      message: 'Review added successfully',
      data: updatedExercise
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get popular exercises
// @route   GET /api/exercises/popular
// @access  Public
router.get('/popular', optionalAuth, generalRateLimit, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const exercises = await Exercise.getPopular(parseInt(limit));

    res.json({
      success: true,
      data: exercises
    });
  } catch (error) {
    console.error('Get popular exercises error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching popular exercises',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get exercises by category
// @route   GET /api/exercises/category/:category
// @access  Public
router.get('/category/:category', optionalAuth, generalRateLimit, async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const { category } = req.params;
    
    const exercises = await Exercise.getByCategory(category, parseInt(limit));

    res.json({
      success: true,
      data: exercises
    });
  } catch (error) {
    console.error('Get exercises by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching exercises by category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Search exercises
// @route   GET /api/exercises/search
// @access  Public
router.get('/search', optionalAuth, generalRateLimit, async (req, res) => {
  try {
    const { q, filters } = req.query;
    
    let filterObject = {};
    if (filters) {
      try {
        filterObject = JSON.parse(filters);
      } catch (e) {
        filterObject = {};
      }
    }

    const exercises = await Exercise.search(q, filterObject);

    res.json({
      success: true,
      data: exercises
    });
  } catch (error) {
    console.error('Search exercises error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching exercises',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get exercise categories
// @route   GET /api/exercises/categories
// @access  Public
router.get('/categories', optionalAuth, generalRateLimit, async (req, res) => {
  try {
    const categories = await Exercise.distinct('category');
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get muscle groups
// @route   GET /api/exercises/muscle-groups
// @access  Public
router.get('/muscle-groups', optionalAuth, generalRateLimit, async (req, res) => {
  try {
    const muscleGroups = await Exercise.distinct('muscleGroups');
    
    res.json({
      success: true,
      data: muscleGroups
    });
  } catch (error) {
    console.error('Get muscle groups error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching muscle groups',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
