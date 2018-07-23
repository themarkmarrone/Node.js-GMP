import productRouter from './productRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';
import cityRouter from './cityRouter';

export const routes = server => {
  server.use('/auth', authRouter);
  server.use('/products', productRouter);
  server.use('/users', userRouter);
  server.use('/cities', cityRouter);
};
