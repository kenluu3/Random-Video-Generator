import express from 'express';
import * as usersController from '../controllers/users';

const router = express.Router();

router.get('/:username', usersController.getUsername)
router.post('/register', usersController.registerUser);

export default router;