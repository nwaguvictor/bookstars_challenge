import { model, Schema, Document } from 'mongoose';

export interface ICharacter extends Document {
  _id?: Schema.Types.ObjectId;
  firstname: string;
  lastname: string;
  status: string;
  stateOfOrigin?: string;
  gender: string;
  location?: Schema.Types.ObjectId;
  episodes?: Schema.Types.ObjectId;
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
    enum: {
      values: ['ACTIVE', 'DEAD', 'UNKNOWN'],
      message: '{VALUE} is not a supported value for status',
    },
    default: 'ACTIVE',
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
    type: Schema.Types.ObjectId,
    ref: 'Location',
  },
  episodes: {
    type: [Schema.Types.ObjectId],
    ref: 'Episode',
  },
});

schema.pre(/^find/, function (next) {
  this.populate({
    path: 'location',
    select: { location: 1, name: 1 },
  });
  next();
});

schema.set('timestamps', { createdAt: true });

export const Character = model<ICharacter>('Character', schema);
