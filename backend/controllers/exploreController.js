const User = require('../models/User');

// @desc    Discover users
// @route   GET /api/explore/users
exports.discoverUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user.id } })
    .select('-password')
    .limit(10);
  res.json(users);
});