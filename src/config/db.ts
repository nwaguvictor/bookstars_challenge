import mongoose from 'mongoose';
import { MONGO_URI, ENVIRONMENT } from './index';

/** MongoDB connection options */
const defaultOptions = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (ENVIRONMENT === 'production') {
  defaultOptions.autoIndex = false;
}

/** DB class */
class DB {
  public async connect(url: string, options: any = {}) {
    try {
      await mongoose.connect(url, { ...defaultOptions, ...options });
      console.log('😎 Database connected successfully');
    } catch (error: any) {
      console.log(`😥 Database Error: ${error.message}`);
    }

    mongoose.connection.on('error', error => {
      console.log(`🤔 Database Error: ${error.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('😏 Database disconnected successfully');
    });
  }
}

export const db = new DB();
