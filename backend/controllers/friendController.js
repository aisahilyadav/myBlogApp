const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Send friend request
// @route   POST /api/friends/request/:userId
exports.sendFriendRequest = asyncHandler(async (req, res) => {
  const recipient = await User.findById(req.params.userId);
  if (!recipient.friendRequests.includes(req.user.id)) {
    recipient.friendRequests.push(req.user.id);
    await recipient.save();
  }
  res.json({ message: 'Friend request sent' });
});

// @desc    Accept friend request
// @route   PUT /api/friends/accept/:userId
exports.acceptFriendRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const friend = await User.findById(req.params.userId);

  user.friends.push(friend._id);
  friend.friends.push(user._id);

  user.friendRequests = user.friendRequests.filter(
    (id) => id.toString() !== friend._id.toString()
  );

  await user.save();
  await friend.save();

  res.json({ message: 'Friend request accepted' });
});