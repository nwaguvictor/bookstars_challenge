import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { IEpisode, Episode } from '../models';
import { CustomError, wrapper } from '../utils';

export interface EpisodeRequestBody extends Request {
  episode?: IEpisode;
}

class EpisodeController {
  getAll = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const episodes = await Episode.find({});
    res.status(200).json({ success: true, episodes });
  });

  get = wrapper(async (req: EpisodeRequestBody, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, episode: req.episode });
  });

  storeEpisode = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { name, episodeCode } = req.body;
    const episode = await Episode.create({ name, episodeCode });

    res.status(200).json({ success: true, episode });
  });

  updateEpisode = wrapper(async (req: EpisodeRequestBody, res: Response, next: NextFunction) => {
    const episode = await Episode.findByIdAndUpdate(req.episode?._id, req.body, { new: true });
    res.status(200).json({ success: true, episode });
  });

  deleteEpisode = wrapper(async (req: EpisodeRequestBody, res: Response, next: NextFunction) => {
    await Episode.findByIdAndDelete({ _id: req.episode?._id });
    res.status(200).json({ success: true });
  });

  foundEpisode = wrapper(async (req: EpisodeRequestBody, res: Response, next: NextFunction, val: ObjectId) => {
    const episode = await Episode.findOne({ _id: req.params.episode });
    if (!episode) {
      return next(new CustomError(`episode with id: ${req.params.episode} not found`, 404));
    }
    req.episode = episode;
    next();
  });
}

export const episodeController = new EpisodeController();
