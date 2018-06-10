import express from 'express';

import { getAllUsers, getUser } from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUser);

export default userRouter;
