import { model, Schema, Document } from 'mongoose';

export interface IComment extends Document {
  _id?: Schema.Types.ObjectId;
  episode: Schema.Types.ObjectId;
  comment?: string;
  ipAddress?: string;
}

const schema = new Schema<IComment>({
  episode: {
    type: Schema.Types.ObjectId,
    required: [true, 'episode id is required to make a comment'],
  },
  comment: {
    type: String,
    maxlength: [250, 'comments must be at most 250 characters'],
  },
  ipAddress: String,
});

schema.set('timestamps', { createdAt: true });

export const Comment = model<IComment>('Comment', schema);
