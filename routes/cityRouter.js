import express from 'express';

import * as cityController from '../controllers/city';

const cityRouter = express.Router();

cityRouter.get('/random', cityController.getMongooseRandomCity);

cityRouter.get('/', cityController.getAllCities);

cityRouter.get('/:id', cityController.getCity);

cityRouter.post('/', cityController.insertCity);

cityRouter.put('/:id', cityController.updateCity);

cityRouter.delete('/:id', cityController.deleteCity);

export default cityRouter;
