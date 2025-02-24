const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

router.post('/', auth, blogController.createBlog);
router.get('/', blogController.getBlogs);
router.put('/:id/like', auth, blogController.likeBlog);

module.exports = router;