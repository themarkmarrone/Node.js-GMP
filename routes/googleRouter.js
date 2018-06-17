import express from 'express';
import passport from 'passport';

import { getAllProducts } from '../controllers/product';

const googleRouter = express.Router();

googleRouter.get('/', passport.authenticate('google', { scope: ['profile'] }));

googleRouter.get('/return', passport.authenticate('google', { failureRedirect: '/auth' }), (getAllProducts));


export default googleRouter;