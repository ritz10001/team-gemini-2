// src/routes/auth.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const authController = require('../controllers/authController');

// GET /api/auth/profile - Get user profile using Firebase UID
router.get('/profile', authMiddleware, authController.getOrCreateUserProfile);

module.exports = router;