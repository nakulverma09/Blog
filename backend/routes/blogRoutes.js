const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/blog", authenticateToken, blog); // Route to handle blog creation')