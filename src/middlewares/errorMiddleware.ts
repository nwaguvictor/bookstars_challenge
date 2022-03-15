import { Request, Response, NextFunction } from 'express';
import { CustomError } from '..//utils';

const mongooseValidationError = ({ errors }: { errors: any }) => {
  let message;
  for (let key in errors) {
    message = errors[key].message;
  }
  return new CustomError(message);
};

const MongooseError = (error: any) => {
  console.log(`<:: ${error.name}: ${error.message}`);
  return new CustomError('Internal Server error', 500);
};

const mongooseCastError = ({ path, value }: { path: string; value: string }) => {
  const message = `invalid ${path}: ${value}`;

  return new CustomError(message);
};

/** Module Exports */
export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  let err = { ...error };

  // if (error.name === 'MongoError') err = mongooseDuplicateError(error);
  if (error.name === 'ValidationError') err = mongooseValidationError(error);
  if (error.name === 'CastError') err = mongooseCastError(error);

  if (!(err instanceof CustomError)) {
    err.statusCode = error.statusCode || err.statusCode || 500;
    err.status = 'error';
    err.message = error.message || err.message || 'internal server error, please try again';
  }

  /** return error response data */
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
};
