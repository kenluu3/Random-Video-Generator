import express from 'express';
import passport from 'passport';
import { accountController } from '../controllers';
import { accountValidator } from '../validators';

const router = express.Router();
router.get('/:username', accountValidator.getValidation, accountController.getAccount);
router.post('/register', accountValidator.registerValidation, accountController.registerAccount);
router.patch('/update', accountValidator.updateValidation, passport.authenticate('jwt', { session: false}), accountController.updateAccount);
router.post('/login', accountValidator.loginValidation, accountController.loginAccount);
router.delete('/logout', accountController.logoutAccount);

export { router as accountRouter };