const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const { blog } = require("../controllers/blogControllers.js"); // Import the blog controller
const router = express.Router();

router.use(authenticateToken); // Apply authentication middleware to all routes in this file
router.post("/blog", blog); // Route to handle blog creation')