import express from 'express';

import {
  getAllProducts,
  getProduct,
  getProductReviews,
  insertProduct
} from '../controllers/product';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProduct);

productRouter.get('/:id/reviews', getProductReviews);

productRouter.post('/', insertProduct);

export default productRouter;
