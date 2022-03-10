import { Router } from 'express';

const router = Router();

router.route('/characters').get(async (req, res) => {
  res.send('Hello Character');
});

export { router as characterRoute };
