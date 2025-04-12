const express = require('express');
const router = express.Router();

router.get('/', getUsers);
router.post('/signup', createUser);

module.exports = router;
