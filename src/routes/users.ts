import express from 'express';
import passport from 'passport';
import { usersController } from '../controllers';

const router = express.Router();

router.get('/:username', usersController.getUser);
router.put('/:username', passport.authenticate('jwt', { session: false }), usersController.updateUser);
router.post('/login', usersController.loginUser);
router.post('/register', usersController.registerUser);

export { router as usersRouter };