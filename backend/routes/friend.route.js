const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendFriendRequest, acceptFriendRequest } = require('../controllers/friendController');

router.post('/request/:userId', auth, sendFriendRequest);
router.put('/accept/:userId', auth, acceptFriendRequest);

module.exports = router;