import mongoose from 'mongoose';

import { CONFIG } from './config/app.config';

export function connectToMongo() {
  mongoose.connect(
    CONFIG.MONGO.url,
    {},
  );
  mongoose.connection.once('open', () => {
    console.log('connected to mongo');
  });
  mongoose.connection.on('error', err => {
    console.log('DB_ERROR: ', err);
  });
}
