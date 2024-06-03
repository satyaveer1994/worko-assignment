// user.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// User routes
router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.softDeleteUser);

module.exports = router;
