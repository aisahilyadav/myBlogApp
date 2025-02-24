const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get users for explore page
// @route   GET /api/explore
router.get('/', auth, asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user.id } })
    .select('username bio avatar')
    .limit(10);
  res.json(users);
}));

module.exports = router;