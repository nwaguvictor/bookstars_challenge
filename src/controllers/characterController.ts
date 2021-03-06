import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { ICharacter, Character, Episode } from '../models';
import { CustomError, wrapper } from '../utils';

export interface CharacterRequestBody extends Request {
  character?: ICharacter;
}

class CharacterController {
  getAll = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    /** Exclude fields not supported for filtering */
    let queryObj = { ...req.query };
    ['sort', 'page', 'limit', 'fields'].forEach(q => delete queryObj[q]);
    let query = Character.find(queryObj);

    /** Sorting */
    if (req.query.sort) {
      const sortObj = (req.query.sort as string).split(',').join(' ');
      query = query.sort(sortObj);
    }

    const characters = await query;
    res.status(200).json({ success: true, characters });
  });

  get = wrapper(async (req: CharacterRequestBody, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, character: req.character });
  });

  storeCharacter = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const character = await Character.create(req.body);
    res.status(200).json({ success: true, character });
  });

  updateCharacter = wrapper(async (req: CharacterRequestBody, res: Response, next: NextFunction) => {
    const character = await Character.findByIdAndUpdate(req.character?._id, req.body, { new: true });
    res.status(200).json({ success: true, character });
  });

  deleteCharacter = wrapper(async (req: CharacterRequestBody, res: Response, next: NextFunction) => {
    await Character.findByIdAndDelete({ _id: req.character?._id });
    res.status(200).json({ success: true });
  });

  getCharacterEpisodes = wrapper(async (req: CharacterRequestBody, res: Response, next: NextFunction) => {
    const episodes = await Episode.find({ characters: req.character?._id }).select('-characters');
    res.status(200).json({ success: true, episodes });
  });

  foundCharacter = wrapper(async (req: CharacterRequestBody, res: Response, next: NextFunction, val: ObjectId) => {
    const character = await Character.findOne({ _id: req.params.character });
    if (!character) {
      return next(new CustomError(`character with id: ${req.params.character} not found`, 404));
    }
    req.character = character;
    next();
  });
}

export const characterController = new CharacterController();
