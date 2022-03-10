import { Router } from 'express';
import { locationController as ctr } from '../controllers';

const router = Router();

router.route('/locations').get(ctr.getAll);

export { router as locationRoute };
