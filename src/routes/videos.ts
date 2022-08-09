import express from 'express';
import { videosController } from '../controllers';

const router = express.Router();

router.get('/', videosController.getVideo);

export { router as videosRouter };