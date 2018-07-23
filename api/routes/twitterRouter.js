import express from 'express';
import passport from 'passport';

import { getAllProducts } from '../controllers/product';

const twitterRouter = express.Router();

twitterRouter.get('/', passport.authenticate('twitter'));

twitterRouter.get('/return', passport.authenticate('twitter', { failureRedirect: '/auth' }), (getAllProducts));


export default twitterRouter;