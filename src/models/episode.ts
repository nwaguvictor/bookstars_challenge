import { model, Schema, Document } from 'mongoose';

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
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment',
  },
});

schema.set('timestamps', { createdAt: true });

export const Episode = model<IEpisode>('Episode', schema);