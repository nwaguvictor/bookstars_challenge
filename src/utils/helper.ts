import { Request, Response, NextFunction } from 'express';

export const wrapper = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
