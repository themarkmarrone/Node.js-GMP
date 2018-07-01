import express from 'express';

import * as userController from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', userController.getUser);

userRouter.delete('/:id', userController.deleteUser);

userRouter.post('/', userController.insertUser);

userRouter.put('/:id', userController.updateUser);

export default userRouter;
