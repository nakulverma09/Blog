const express = require("express")
const router = express.Router();
const { userProfileId } = require("../controllers/userControllers")

router.get("/user/profile/:id", userProfileId);

module.exports = router;