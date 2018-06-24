import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { findOne } from '../controllers/base';
import { getAllUsers } from '../controllers/user';
import { CONFIG } from '../config/app.config';
import facebookRouter from './facebookRouter';
import googleRouter from './googleRouter';
import twitterRouter from './twitterRouter';

const credentialsPath = 'Credential';

const authRouter = express.Router();

authRouter.post('/', async function(request, response) {
  const { login, password } = request.body;
  const user = await findOne(credentialsPath, 'login', login);

  if (user != null && user.password === password) {
    const payload = {
      user: {
        email: user.email,
        username: user.username,
      },
    };
    const token = jwt.sign(payload, CONFIG.SECRET, { expiresIn: 3000 });
    const respanseMessage = {
      code: 200,
      message: 'OK',
      data: payload,
      token,
    };
    response.send(respanseMessage);
  } else {
    const message = 'Not Found';
    const data = {};
    response.status(404).send({
      code: 404,
      data,
      message,
    });
  }
});

authRouter.post('/users', passport.authenticate('local', { session: false }), getAllUsers);

authRouter.use('/facebook', facebookRouter);
authRouter.use('/google', googleRouter);
authRouter.use('/twitter', twitterRouter);

export default authRouter;
