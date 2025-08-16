const express = require('express');
const router = express.Router();
const { protect, generalRateLimit } = require('../middleware/auth');

// @desc    Get user's goals
// @route   GET /api/goals
// @access  Private
router.get('/', protect, generalRateLimit, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Goals route - implementation coming soon',
      data: []
    });
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching goals'
    });
  }
});

module.exports = router;
