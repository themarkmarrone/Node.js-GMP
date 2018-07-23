import express from 'express';

import * as productController from '../controllers/product';

const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);

productRouter.get('/:id', productController.getProduct);

productRouter.delete('/:id', productController.deleteProduct);

productRouter.get('/:id/reviews', productController.getProductReviews);

productRouter.post('/', productController.insertProduct);

productRouter.put('/:id', productController.updateProduct);

export default productRouter;
