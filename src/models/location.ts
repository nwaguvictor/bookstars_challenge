import { model, Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  _id?: Schema.Types.ObjectId;
  name: string;
  latitude: number;
  longitude: number;
}

const schema = new Schema<ILocation>({
  name: {
    type: String,
    required: [true, 'location name is required'],
  },
  longitude: {
    type: Number,
    required: [true, 'location longitude is required'],
  },
  latitude: {
    type: Number,
    required: [true, 'location latitude is required'],
  },
});

schema.set('timestamps', { createdAt: true });

export const Location = model<ILocation>('Location', schema);
