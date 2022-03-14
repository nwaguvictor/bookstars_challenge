import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { IComment, Comment } from '../models';
import { CustomError, wrapper } from '../utils';

export interface CommentRequestBody extends Request {
  comment?: IComment;
}

class CommentController {
  getAll = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const comments = await Comment.find({});
    res.status(200).json({ success: true, comments });
  });

  get = wrapper(async (req: CommentRequestBody, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, comment: req.comment });
  });

  storeComment = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { episode, comment } = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
    const result = await Comment.create({ episode, comment, ipAddress });

    res.status(200).json({ success: true, comment: result });
  });

  updateComment = wrapper(async (req: CommentRequestBody, res: Response, next: NextFunction) => {
    const comment = await Comment.findByIdAndUpdate(req.comment?._id, req.body, { new: true });
    res.status(200).json({ success: true, comment });
  });

  deleteComment = wrapper(async (req: CommentRequestBody, res: Response, next: NextFunction) => {
    await Comment.findByIdAndDelete({ _id: req.comment?._id });
    res.status(200).json({ success: true });
  });

  foundComment = wrapper(async (req: CommentRequestBody, res: Response, next: NextFunction, val: ObjectId) => {
    const comment = await Comment.findOne({ _id: req.params.comment });
    if (!comment) {
      return next(new CustomError(`comment with id: ${req.params.comment} not found`, 404));
    }
    req.comment = comment;
    next();
  });
}

export const commentController = new CommentController();
