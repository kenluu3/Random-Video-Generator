import express from 'express';
import { favoritesController } from '../controllers';

const router = express.Router();

router.get('/:username', favoritesController.getFavorites);
router.post('/add', favoritesController.addFavorite);
router.delete('/delete', favoritesController.removeFavorite);

export { router as favoritesRouter };