import jwt from 'jsonwebtoken';

import * as baseControllers from './base';
import { Credential } from '../models/credentials';
import { CONFIG } from '../../config/app.config';

export async function getAuth(request, response) {
  const { login, password } = request.body;
  const user = await baseControllers.findOne(Credential, 'login', login);

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
  } else if (user != null && user.password !== password) {
    const message = 'Wrong password';
    const data = {};
    response.status(404).send({
      code: 404,
      data,
      message,
    });
  } else {
    const message = 'Not Found';
    const data = {};
    response.status(404).send({
      code: 404,
      data,
      message,
    });
  }
}
