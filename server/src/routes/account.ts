import express from 'express';
import passport from 'passport';
import { accountController } from '../controllers';
import { accountValidator } from '../validators';

const router = express.Router();
router.get('/:username', accountValidator.getValidation, accountController.getAccount);
router.post('/register', accountValidator.registerValidation, accountController.registerAccount);
router.post('/update', accountValidator.updateValidation, passport.authenticate('jwt', { session: false}), accountController.updateAccount);
router.post('/login', accountValidator.loginValidation, accountController.loginAccount);

export { router as accountRouter };