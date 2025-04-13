const express = require('express');
const router = express.Router();
const { verifyToken, refreshToken } = require('../controllers/tokenControllers.js');
const authenticateToken = require('../middlewares/authMiddleware.js');

router.use(authenticateToken); // Apply authentication middleware to all routes in this file
router.get('/verify-token', verifyToken); // Handle GET requests to /token
router.get('/refresh-token', refreshToken); // Handle GET requests to /token/refresh

module.exports = router;