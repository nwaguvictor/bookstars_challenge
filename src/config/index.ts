import dotenv from 'dotenv';
dotenv.config();

export { db } from './db';
export const APP_NAME = process.env.APP_NAME || 'Bookstars';
export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const BCRYPT_SALT = Number(process.env.BCRYPT_SALT) || 10;
