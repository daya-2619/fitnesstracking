const express = require('express');
const router = express.Router();
const Nutrition = require('../models/Nutrition');
const { protect, generalRateLimit } = require('../middleware/auth');

// @desc    Get user's nutrition data
// @route   GET /api/nutrition
// @access  Private
router.get('/', protect, generalRateLimit, async (req, res) => {
  try {
    const { date, meal } = req.query;
    
    let query = { user: req.user._id };
    
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }
    
    if (meal) {
      query.meal = meal;
    }

    const nutritionData = await Nutrition.find(query).sort({ date: -1 });

    res.json({
      success: true,
      data: nutritionData
    });
  } catch (error) {
    console.error('Get nutrition error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching nutrition data'
    });
  }
});

module.exports = router;
