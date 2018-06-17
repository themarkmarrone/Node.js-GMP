import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { findAll } from '../controllers/base';
import { getAllUsers } from '../controllers/user';
import { CONFIG } from '../configs/app.config';
import facebookRouter from './facebookRouter';
import googleRouter from './googleRouter';
import twitterRouter from './twitterRouter';

const credentialsPath = './models/credentials.json';

const authRouter = express.Router();

authRouter.post('/', async function(request, response) {
  const { login, password } = request.body;
  const content = await findAll(credentialsPath);
  const user = JSON.parse(content.toString())[login];

  if (user === undefined || user.password !== password) {
    const message = 'Not Found';
    const data = {};
    response.status(404).send({
      code: 404,
      data,
      message,
    });
  } else {
    const payload = {
      user: {
        email: user.email,
        username: user.username,
      },
    };
    const token = jwt.sign(payload, CONFIG.SECRET, { expiresIn: 30 });
    const respanseMessage = {
      code: 200,
      message: 'OK',
      data: payload,
      token,
    };
    response.send(respanseMessage);
  }
});

authRouter.post('/users', passport.authenticate('local', { session: false }), getAllUsers);

authRouter.use('/facebook', facebookRouter);
authRouter.use('/google', googleRouter);
authRouter.use('/twitter', twitterRouter);

export default authRouter;
