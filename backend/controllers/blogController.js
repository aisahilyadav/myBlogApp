const Blog = require('../models/blog.model');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Create a blog
// @route   POST /api/blogs
exports.createBlog = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const blog = await Blog.create({
    title,
    content,
    tags,
    author: req.user.id,
  });
  res.status(201).json(blog);
});

// @desc    Get all blogs
// @route   GET /api/blogs
exports.getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate('author', 'username');
  res.json(blogs);
});

// @desc    Like a blog
// @route   PUT /api/blogs/:id/like
exports.likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog.likes.includes(req.user.id)) {
    blog.likes.push(req.user.id);
    await blog.save();
  }
  res.json(blog);
});