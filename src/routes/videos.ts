import express from 'express';
import * as videosController from '../controllers/videos';

const router = express.Router();

router.get('/', videosController.getVideo);

export default router;