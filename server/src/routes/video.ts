import express from 'express';
import { videoController } from '../controllers';

const router = express.Router();
router.get('/', videoController.getVideo);

export { router as videoRouter };