import { Router } from 'express';

const router = Router();

router.route('/comments').get((req, res) => {
  res.send('Hi comment');
});

export { router as commentRoute };
