const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password')
    .populate('friends', 'username avatar');
    
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { bio } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { bio },
    { new: true }
  ).select('-password');
  
  res.json(user);
});