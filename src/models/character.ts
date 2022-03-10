import { model, Schema, Document } from 'mongoose';
import { IEpisode, ILocation } from '../models';

export interface ICharacter extends Document {
  _id?: Schema.Types.ObjectId;
  firstname: string;
  lastname: string;
  status: string;
  stateOfOrigin?: string;
  gender: string;
  location?: ILocation;
  episodes?: IEpisode;
}

const schema = new Schema<ICharacter>({
  firstname: {
    type: String,
    trim: true,
    required: [true, 'character name is required'],
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, 'character lastname is required'],
  },
  status: {
    type: String,
    required: [true, 'character status is required'],
    enum: {
      values: ['ACTIVE', 'DEAD', 'UNKNOWN'],
      default: 'ACTIVE',
      message: '{VALUE} is not a supported value for status',
    },
  },
  stateOfOrigin: {
    type: String,
  },
  gender: {
    type: String,
    required: [true, 'character gender is required'],
    enum: {
      values: ['MALE', 'FEMALE'],
      message: '{VALUE} is not a supported value for gender',
    },
  },
  location: {
    tyep: Schema.Types.ObjectId,
    ref: 'Location',
  },
  episodes: {
    type: [Schema.Types.ObjectId],
    ref: 'Episode',
  },
});

schema.set('timestamps', { createdAt: true });

export const Character = model<ICharacter>('Character', schema);
