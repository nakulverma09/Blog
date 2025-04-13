const express = require('express');
const router = express.Router();
const { subscribe, contact } = require('../controllers/subsControllers.js');

router.post('/subscribe', subscribe); // Handle POST requests to /subscribe
router.post('/contact', contact); // Handle POST requests to /contact

module.exports = router;