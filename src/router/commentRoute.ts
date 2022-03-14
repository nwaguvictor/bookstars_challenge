import { Router } from 'express';
import { commentController as ctr } from '../controllers';

const router = Router();

router.param('comment', ctr.foundComment);
router.route('/comments').get(ctr.getAll).post(ctr.storeComment);
router.route('/comments/:comment').get(ctr.get).patch(ctr.updateComment).delete(ctr.deleteComment);

export { router as commentRoute };
