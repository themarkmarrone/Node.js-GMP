import express from 'express';
import passport from 'passport';

import { getAllProducts, getProduct, getProductReviews, insertProduct } from '../controllers/product';

const facebookRouter = express.Router();

facebookRouter.get('/', passport.authenticate('facebook'));

facebookRouter.get('/return', passport.authenticate('facebook', { failureRedirect: '/auth' }), (getAllProducts));


export default facebookRouter;