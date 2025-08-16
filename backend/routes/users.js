const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, generalRateLimit } = require('../middleware/auth');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, generalRateLimit, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('friends', 'firstName lastName avatar fitnessLevel currentStreak');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

module.exports = router;
