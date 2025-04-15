const express = require('express');
const router = express.Router();
const { subscribe, contact } = require('../controllers/subsControllers.js');
const sendVerificationEmail = require('../utils/mail.js'); // Import the email utility

router.post('/subscribe', subscribe); // Handle POST requests to /subscribe
router.post('/contact', contact); // Handle POST requests to /contact
router.get("/test-email", async (req, res) => {
    try {
      await sendVerificationEmail("a04544868@gmail.com", "a04544868***");
      res.send("Email sent!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Email failed.");
    }
  });
  

module.exports = router;