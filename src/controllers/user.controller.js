// user.controller.js

const userService = require('../services/user.service');
const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  city: Joi.string().required(),
  zipCode: Joi.string().pattern(/^[0-9]{5}(?:-[0-9]{4})?$/).required(),
  password: Joi.string().min(6).required(), // Add password validation
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const idSchema = Joi.string().hex().length(24);

const validateRequest = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

const createUser = async (req, res) => {
  try {
    validateRequest(userSchema, req.body);
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    validateRequest(loginSchema, req.body);
    const { email, password } = req.body;
    const { token, user } = await userService.loginUser(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    validateRequest(idSchema, req.params.userId);
    const user = await userService.getUserById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    validateRequest(idSchema, req.params.userId);
    validateRequest(userSchema, req.body);
    const user = await userService.updateUser(req.params.userId, req.body);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const softDeleteUser = async (req, res) => {
  try {
    validateRequest(idSchema, req.params.userId);
    const user = await userService.softDeleteUser(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  updateUser,
  softDeleteUser,
};
