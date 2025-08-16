const express = require('express');
const router = express.Router();
const { protect, generalRateLimit } = require('../middleware/auth');

// @desc    Get user's activities
// @route   GET /api/activities
// @access  Private
router.get('/', protect, generalRateLimit, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Activities route - implementation coming soon',
      data: []
    });
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching activities'
    });
  }
});

module.exports = router;
