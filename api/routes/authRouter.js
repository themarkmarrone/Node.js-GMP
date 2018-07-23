import express from 'express';

import * as authController from '../controllers/auth';

const authRouter = express.Router();

authRouter.post('/', authController.getAuth);

export default authRouter;
