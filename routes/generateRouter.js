import express from 'express';

import { generateData } from '../controllers/generate';

const generateRouter = express.Router();

generateRouter.get('/', generateData);

export default generateRouter;
