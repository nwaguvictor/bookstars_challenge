import { model, Schema, Document } from 'mongoose';
import { ICharacter, IComment } from '../models';

export interface IEpisode extends Document {
  _id?: Schema.Types.ObjectId;
  name?: string;
  releaseDate?: Date;
  episodeCode?: string;
  comments?: IComment;
  characters?: ICharacter;
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
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment',
  },
});

schema.set('timestamps', { createdAt: true });

export const Episode = model<IEpisode>('Episode', schema);
