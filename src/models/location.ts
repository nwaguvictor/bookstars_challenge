import { model, Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  location?: { type: string; coordinates: string[] };
}

const schema = new Schema<ILocation>({
  name: {
    type: String,
    required: [true, 'location name is required'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      message: '{VALUE} is not a supported type for location type',
    },
    coordinates: {
      type: [String],
      required: [true, 'location coordinates are required in the order longitude, latitude'],
    },
  },
});

schema.index({ location: '2dsphere' });
schema.set('timestamps', { createdAt: true });

export const Location = model<ILocation>('Location', schema);
