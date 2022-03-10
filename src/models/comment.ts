import { model, Schema, Document } from 'mongoose';

export interface IComment extends Document {
  _id?: Schema.Types.ObjectId;
  comment?: string;
  ipAddress?: string;
}

const schema = new Schema<IComment>({
  comment: {
    type: String,
    maxlength: [250, 'comments must be at most 250 characters'],
  },
  ipAddress: String,
});

schema.set('timestamps', { createdAt: true });

export const Comment = model<IComment>('Comment', schema);
