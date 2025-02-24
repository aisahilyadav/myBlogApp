require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.route');
const blogRoutes = require('./routes/blog.route');
const profileRoutes = require('./routes/profile.route');
const exploreRoutes = require('./routes/explore.route');
const friendRoutes = require('./routes/friend.route');
const errorHandler = require('./middleware/errorHandler');
const initializeSocket = require('./utils/socket');

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Attach socket.io to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api/friends', friendRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;