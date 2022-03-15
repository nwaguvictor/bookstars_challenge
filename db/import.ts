import fs from 'fs';
import { db, MONGO_URI } from '../src/config';
import { Character, Episode, Location, Comment } from '../src/models';

/** Read Data */
const characters = JSON.parse(fs.readFileSync(`${__dirname}/characters.json`, 'utf-8'));
const comments = JSON.parse(fs.readFileSync(`${__dirname}/comments.json`, 'utf-8'));
const locations = JSON.parse(fs.readFileSync(`${__dirname}/locations.json`, 'utf-8'));
const episodes = JSON.parse(fs.readFileSync(`${__dirname}/episodes.json`, 'utf-8'));

const populateDB = async () => {
  try {
    /** Connect to database */
    await db.connect(MONGO_URI);

    /** populate database */
    await Location.create(locations);
    await Character.create(characters);
    await Episode.create(episodes);
    await Comment.create(comments);

    console.log('Database population completed');
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(1);
  }
};

if (process.argv[2] == '--import') {
  populateDB();
}
