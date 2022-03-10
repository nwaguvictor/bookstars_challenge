import { NextFunction, Request, Response } from 'express';
import { ILocation, Location } from '../models';
import { wrapper } from '../utils';

class LocationController {
  getAll = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const locations = await Location.find({});
    res.status(200).json({
      success: true,
      data: { locations },
    });
  });

  get = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const locations = await Location.findOne({ _id: req.params.location });
    res.status(200).json({
      success: true,
      data: { locations },
    });
  });
}

export const locationController = new LocationController();
