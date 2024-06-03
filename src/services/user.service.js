// user.service.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userDAO = require('../dao/user.dao');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user
const createUser = async (userData) => {
  const { email, password } = userData;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    ...userData,
    password: hashedPassword, // Save the hashed password
  });

  return await user.save();
};

// Login user
const loginUser = async (email, password) => {
  const user = await userDAO.findByEmail(email);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });

  return { token, user };
};

const getUsers = async () => {
  return await userDAO.getUsers();
};

const getUserById = async (userId) => {
  return await userDAO.getUserById(userId);
};

const updateUser = async (userId, userData) => {
  return await userDAO.updateUser(userId, userData);
};

const softDeleteUser = async (userId) => {
  return await userDAO.softDeleteUser(userId);
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  softDeleteUser,
};
