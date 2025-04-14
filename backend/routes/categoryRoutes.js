const express = require('express');
const router = express.Router();
const { technology, educationAndLearning, lifestyle, finance, entertainment, newsAndCurrentAffairs, 
    inspirationAndPersonalDevelopment,cultureAndHistory, codingAndProjects, miscellaneous
 } = require('../controllers/categoryControllers')

const authenticateToken = require("../middlewares/authMiddleware"); // Import the authentication middleware

router.use(authenticateToken); // Apply authentication middleware to all routes in this file
router.get('/technology', technology);
router.get('/education-and-learning', educationAndLearning);
router.get('/lifestyle', lifestyle);
router.get('/finance', finance)
router.get('/entertainment', entertainment)
router.get('/news-and-current-affairs', newsAndCurrentAffairs)
router.get('/inspiration-and-personal-development', inspirationAndPersonalDevelopment)
router.get('/culture-and-history',cultureAndHistory)
router.get('/coding-and-projects',codingAndProjects)
router.get('/miscellaneous',miscellaneous)

module.exports = router;