import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = async (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.code || 500).json({
    success: false,
    code: error.code || 500,
    message: error.message || 'Server Error',
  });
};
