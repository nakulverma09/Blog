const express = require('express');
const router = express.Router();
const { verifyToken, refreshToken } = require('../controllers/tokenControllers.js');
const authenticateToken = require('../middlewares/authMiddleware.js');

router.get('/verify-token', authenticateToken , verifyToken); // Handle GET requests to /token
router.get('/refresh-token', refreshToken); // Handle GET requests to /token/refresh