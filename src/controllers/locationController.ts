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
    res.status(200).json({
      success: true,
      data: { locations },
    });
  });

  get = wrapper(async (req: LocationRequestBody, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      data: { location: req.location },
    });
  });

  storeLocation = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { name, location } = req.body;
    const newLocation = await Location.create({ name, location });

    res.status(200).json({
      success: true,
      data: { location: newLocation },
    });
  });

  updateLocation = wrapper(async (req: LocationRequestBody, res: Response, next: NextFunction) => {
    const updatedLocation = await Location.findByIdAndUpdate(req.location?._id, req.body, { new: true });
    res.status(200).json({
      success: true,
      data: { location: updatedLocation },
    });
  });

  deleteLocation = wrapper(async (req: LocationRequestBody, res: Response, next: NextFunction) => {
    await Location.findByIdAndDelete({ _id: req.location?._id });
    res.status(200).json({
      success: true,
      data: null,
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
