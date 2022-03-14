import { Request, Response, NextFunction } from 'express';
import { CustomError } from '..//utils';

const mongooseDuplicateError = error => {
  const [key, value] = Object.entries(error.keyValue)[0];
  const message = `${key} with value: '${value}' already exist`;
  return new CustomError(message);
};

const mongooseValidationError = ({ errors }) => {
  let message;
  for (let key in errors) {
    message = errors[key].message;
  }
  return new CustomError(message);
};

const MongooseError = error => {
  console.log(`<:: ${error.name}: ${error.message}`);
  return new CustomError('Internal Server error', 500);
};

const mongooseCastError = ({ path, value }) => {
  const message = `invalid ${path}: ${value}`;

  return new CustomError(message);
};

/** Module Exports */
export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  let err = { ...error };

  if (error.name === 'MongoError') err = mongooseDuplicateError(error);
  if (error.name === 'ValidationError') err = mongooseValidationError(error);
  if (error.name === 'CastError') err = mongooseCastError(error);

  if (!(err instanceof CustomError)) {
    err.statusCode = error.statusCode || 500;
    err.status = 'error';
    err.message = error.message || err.message || 'internal server error, please try again';
  }

  /** return error response data */
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
