const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const { blog } = require("../controllers/blogControllers.js"); // Import the blog controller
const router = express.Router();

router.post("/blog", authenticateToken, blog); // Route to handle blog creation')