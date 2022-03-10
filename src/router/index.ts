import express, { Router } from 'express';
import cors from 'cors';
import { characterRoute } from './characterRoute';
import { commentRoute } from './commentRoute';
import { episodeRoute } from './episodeRoute';
import { locationRoute } from './locationRoute';

const router = Router();

/** Middlewares */
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/', characterRoute).use(commentRoute).use(episodeRoute).use(locationRoute);

export { router as routes };
