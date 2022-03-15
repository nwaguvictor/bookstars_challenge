import { model, Schema, Document } from 'mongoose';
import { codeGenerator } from '../utils';

export interface IEpisode extends Document {
  _id?: Schema.Types.ObjectId;
  name?: string;
  releaseDate?: Date;
  episodeCode?: string;
  comments?: Schema.Types.ObjectId[];
  characters?: Schema.Types.ObjectId[];
}

const schema = new Schema<IEpisode>({
  name: String,
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  episodeCode: String,
  characters: {
    type: [Schema.Types.ObjectId],
    ref: 'Character',
  },
});

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'episode',
  count: true,
});

schema.pre(/^find/, function (next) {
  this.populate({
    path: 'characters',
    select: { location: 0 },
  });

  this.populate({
    path: 'comments',
    select: { comment: 1, ipAddress: 1 },
  });

  next();
});

schema.pre('save', function (next) {
  if (!this.isNew) return next();
  this.episodeCode = codeGenerator(6);

  next();
});

schema.set('timestamps', { createdAt: true });
schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

export const Episode = model<IEpisode>('Episode', schema);
