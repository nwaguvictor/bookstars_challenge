import { Router } from 'express';
import { characterController as ctr } from '../controllers';

const router = Router();

router.param('character', ctr.foundCharacter);
router.route('/characters').get(ctr.getAll).post(ctr.storeCharacter);
router.route('/characters/:character').get(ctr.get).patch(ctr.updateCharacter).delete(ctr.deleteCharacter);
router.get('/characters/:character/episodes', ctr.getCharacterEpisodes);

export { router as characterRoute };
