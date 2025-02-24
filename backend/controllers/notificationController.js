const Notification = require('../models/notification.model');
const asyncHandler = require('../utils/asyncHandler');

exports.createNotification = asyncHandler(async (data) => {
  const notification = await Notification.create(data);
  
  // Emit socket event
  req.io.to(data.recipient.toString()).emit('notification', notification);
  
  return notification;
});

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user.id })
    .populate('sender', 'username avatar')
    .sort('-createdAt');
  
  res.json(notifications);
});

exports.markAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user.id },
    { read: true }
  );
  
  res.json({ message: 'All notifications marked as read' });
}); 