import productRouter from './productRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';
import { checkTokenMiddleware } from '../middlewares/checkTokenMiddleware';

export const routes = server => {
  server.use('/auth', authRouter);
  server.use('/products', checkTokenMiddleware, productRouter);
  server.use('/users', checkTokenMiddleware, userRouter);
};
