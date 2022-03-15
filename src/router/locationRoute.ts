import { Router } from 'express';
import { locationController as ctr } from '../controllers';

const router = Router();

router.param('location', ctr.foundLocation);
router.route('/locations').get(ctr.getAll).post(ctr.storeLocation);
router.route('/locations/:location').get(ctr.get).patch(ctr.updateLocation).delete(ctr.deleteLocation);

export { router as locationRoute };
