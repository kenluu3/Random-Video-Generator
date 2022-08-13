import express from 'express';
import passport from 'passport';
import { accountValidator, favoriteValidator } from '../validators';
import { favoriteController } from '../controllers';

const router = express.Router();
router.get('/:username', accountValidator.getValidation, favoriteController.getFavorite);
router.post('/add', favoriteValidator.addValidation, passport.authenticate('jwt', { session: false }), favoriteController.addFavorite);
router.delete('/remove', favoriteValidator.removeValidation, passport.authenticate('jwt', { session: false }), favoriteController.removeFavorite);

export { router as favoriteRouter };