const express = require('express');
const router = express.Router();
const Sleep = require('../models/Sleep');
const { protect, generalRateLimit } = require('../middleware/auth');

// @desc    Get user's sleep data
// @route   GET /api/sleep
// @access  Private
router.get('/', protect, generalRateLimit, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = { user: req.user._id };
    
    if (startDate && endDate) {
      query.startTime = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const sleepData = await Sleep.find(query).sort({ startTime: -1 });

    res.json({
      success: true,
      data: sleepData
    });
  } catch (error) {
    console.error('Get sleep error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sleep data'
    });
  }
});

module.exports = router;
