const express = require('express');
const router = express.Router();
const { protect, generalRateLimit } = require('../middleware/auth');

// @desc    Get user's social data
// @route   GET /api/social
// @access  Private
router.get('/', protect, generalRateLimit, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Social route - implementation coming soon',
      data: []
    });
  } catch (error) {
    console.error('Get social error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching social data'
    });
  }
});

module.exports = router;
