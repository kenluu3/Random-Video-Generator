import express from 'express';
import { accountValidator, favoriteValidator } from '../validators';
import { favoriteController } from '../controllers';

const router = express.Router();
router.get('/:username', accountValidator.getValidation, favoriteController.getFavorite);
router.post('/add', favoriteValidator.addValidation, favoriteController.addFavorite);
router.delete('/delete', favoriteValidator.removeValidation, favoriteController.removeFavorite);

export { router as favoriteRouter };