import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { ILocation, Location } from '../models';
import { CustomError, wrapper } from '../utils';

export interface LocationRequestBody extends Request {
  location?: ILocation;
}

class LocationController {
  getAll = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const locations = await Location.find({});
    res.status(200).json({ success: true, locations });
  });

  get = wrapper(async (req: LocationRequestBody, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, location: req.location });
  });

  storeLocation = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { name, coordinates } = req.body;
    const result = await Location.create({
      name,
      location: { coordinates: [parseFloat(coordinates[1]), parseFloat(coordinates[0])] },
    });

    res.status(200).json({ success: true, location: result });
  });

  updateLocation = wrapper(async (req: LocationRequestBody, res: Response, next: NextFunction) => {
    const location = await Location.findById(req.location?._id);
    if (location) {
      location.name = req.body.name ?? location.name;
      location.location!.coordinates = req.body.coordinates ?? location.location?.coordinates;

      await location.save();
    }

    res.status(200).json({ success: true, location });
  });

  deleteLocation = wrapper(async (req: LocationRequestBody, res: Response, next: NextFunction) => {
    await Location.findByIdAndDelete({ _id: req.location?._id });
    res.status(200).json({
      success: true,
    });
  });

  foundLocation = wrapper(async (req: LocationRequestBody, res: Response, next: NextFunction, val: ObjectId) => {
    const location = await Location.findOne({ _id: req.params.location });
    if (!location) {
      return next(new CustomError(`location with id: ${req.params.location} not found`, 404));
    }
    req.location = location;
    next();
  });
}

export const locationController = new LocationController();
