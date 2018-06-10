import productRouter from './productRouter';
import userRouter from './userRouter';

export const routes = server => {
  server.use('/products', productRouter);
  server.use('/users', userRouter);
};
