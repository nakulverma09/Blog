const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authControllers.js');

// router.get('/', getUsers);
router.post('/signup', signup);
router.post('/login', login); // Add this line to handle login requests
router.post('/logout', logout)

module.exports = router;
