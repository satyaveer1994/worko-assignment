// index.js

const express = require('express');
const connectDB = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const authMiddleware = require('./middlewares/auth.middleware');
require('dotenv').config();

const bodyParser = require('body-parser');

const app = express();
connectDB();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Unprotected routes
app.use('/worko/signup', userRoutes);
app.use('/worko/login', userRoutes);

// Protected routes
app.use('/worko/users', authMiddleware, userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
