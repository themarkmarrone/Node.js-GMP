import mongodb from 'mongodb';

import { CONFIG } from '../../config/app.config';
import { City } from '../models/city';
import * as baseControllers from './base';

const MongoClient = mongodb.MongoClient;

export async function getRandomCity(request, response) {
  MongoClient.connect(
    CONFIG.MONGO.url,
    { useNewUrlParser: true },
  )
    .then(db => {
      console.log('Connected to database');
      const dbo = db.db(CONFIG.MONGO.db);
      dbo
        .collection('cities')
        .aggregate([{ $sample: { size: 1 } }])
        .toArray((error, result) => {
          if (error) {
            response.status(404);
            response.send(`Something went wrong`);
          } else {
            response.json(result[0]);
          }
        });
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getMongooseRandomCity(request, response) {
  let result;
  try {
    result = await City.aggregate([{ $sample: { size: 1 } }]);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.json(result[0]);
  }
}

export async function getAllCities(request, response) {
  let result;
  try {
    result = await baseControllers.findAll(City);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.json(result);
  }
}

export async function getCity(request, response) {
  const id = request.params.id;
  let result;
  try {
    result = await baseControllers.findById(City, id);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`No city with id = ${id}`);
  } else {
    response.json(result);
  }
}

export async function insertCity(request, response) {
  const city = request.body;
  let cityDocument;
  try {
    cityDocument = await City.findOne().sort('-id');
  } catch (error) {
    console.error(error);
  }
  let cityId = city.id || cityDocument ? cityDocument.id : 0;
  const newCity = new City({
    ...city,
    id: ++cityId,
  });
  newCity.update();
  let result;
  try {
    result = await newCity.save();
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.json(result);
  }
}

export async function updateCity(request, response) {
  const id = request.params.id;
  const city = request.body;
  const newCity = new City({
    ...city,
  });
  newCity.update();
  const updateData = newCity.toObject();
  delete updateData._id;
  let result;

  try {
    result = await baseControllers.updateOne(City, id, updateData);
  } catch (error) {
    console.error(error);
  }

  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.json(result);
  }
}

export async function deleteCity(request, response) {
  const id = request.params.id;
  let result;
  try {
    result = await baseControllers.deleteById(City, id);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.send(`City with id ${id} was deleted`);
  }
}
