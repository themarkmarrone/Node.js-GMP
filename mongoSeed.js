import { streamToMongoDB } from 'stream-to-mongo-db';
import JSONStream from 'JSONStream';
import fs from 'fs';
import mongodb from 'mongodb';

import { CONFIG } from './config/app.config';

const citiesPath = './data/cities.json';
const credentialsPath = './data/credentials.json';

const cityCollection = 'cities';
const credentialsCollection = 'credentials';

const MongoClient = mongodb.MongoClient;

MongoClient.connect(
  CONFIG.MONGO.url,
  { useNewUrlParser: true },
)
  .then(db => {
    console.log('Connected to database');
    const dbo = db.db(CONFIG.MONGO.db);
    dbo.listCollections({}, { nameOnly: true }).toArray(function(err, collections) {
      const cities = collections.find(collection => collection.name === cityCollection);
      const credentials = collections.find(collection => collection.name === credentialsCollection);
      if (cities != null) {
        console.log('Collection "cities" is already exists');
      } else {
        console.log('Start cities transfer');
        const outputDBConfig = { dbURL: CONFIG.MONGO.url, collection: cityCollection };
        const writableStream = streamToMongoDB(outputDBConfig);
        fs.createReadStream(citiesPath)
          .pipe(JSONStream.parse('*'))
          .pipe(writableStream)
          .on('finish', () => {
            console.log('Transfer ciites is complete.');
          });
      }
      if (credentials != null) {
        console.log('Collection "credentials" is already exists');
      } else {
        console.log('Start credentials transfer');
        const outputDBConfig = { dbURL: CONFIG.MONGO.url, collection: credentialsCollection };
        const writableStream = streamToMongoDB(outputDBConfig);
        fs.createReadStream(credentialsPath)
          .pipe(JSONStream.parse('*'))
          .pipe(writableStream)
          .on('finish', () => {
            console.log('Transfer credentials is complete.');
          });
      }
    });
  })
  .catch(error => {
    console.error(error);
  });
