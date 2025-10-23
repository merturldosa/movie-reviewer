const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * User Routes
 */

// Register a new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Get user profile
router.get('/:id', userController.getUserProfile);

// Update user profile
router.put('/:id', userController.updateUserProfile);

module.exports = router;
