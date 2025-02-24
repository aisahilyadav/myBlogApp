const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt')
const asyncHandler = require('../utils/asyncHandler.js')

exports.register = asyncHandler(async(req, res) => {
    const {username, email, password } = req.body;

    const exisitngUser = await User.findOne({ $or: [{email}, {username}]});
    if(exisitngUser){
        return res.status(400).json({
            error:'User with this email or username already exists'
        });
    }
    const user = await User.create({username, email, password});

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

    res.status(201).json({
        success: true,
        token,
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
});

exports.login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({
            error:'Invalid credentials'
        });
    }
    //Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
});