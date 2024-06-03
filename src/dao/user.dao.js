// user.dao.js

const User = require('../models/user.model');

// Create a new user
const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Get all users
const getUsers = async () => {
  return await User.find({ isDeleted: false });
};

// Get a user by ID
const getUserById = async (userId) => {
  return await User.findOne({ _id: userId, isDeleted: false });
};

// Update a user by ID
const updateUser = async (userId, userData) => {
  return await User.findOneAndUpdate({ _id: userId, isDeleted: false }, userData, { new: true });
};

// Soft delete a user by ID
const softDeleteUser = async (userId) => {
  return await User.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true });
};

// Find a user by email for login
const findByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  findByEmail,
};
