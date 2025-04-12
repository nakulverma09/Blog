import express from 'express';

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', createUser);

export default router;
