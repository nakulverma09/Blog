const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authControllers.js');

// router.get('/', getUsers);
router.post('/signup', signup);

module.exports = router;
