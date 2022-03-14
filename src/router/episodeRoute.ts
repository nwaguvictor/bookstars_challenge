import { Router } from 'express';
import { episodeController as ctr } from '../controllers';

const router = Router();

router.param('episode', ctr.foundEpisode);
router.route('/episodes').get(ctr.getAll).post(ctr.storeEpisode);
router.route('/episodes/:episode').get(ctr.get).patch(ctr.updateEpisode).delete(ctr.deleteEpisode);

export { router as episodeRoute };
