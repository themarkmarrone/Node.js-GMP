import jwt from 'jsonwebtoken';

import { CONFIG } from '../configs/app.config';

export function checkTokenMiddleware(request, response, next) {
  const token = request.headers['x-access-token'];

  if (token) {
    jwt.verify(token, CONFIG.SECRET, (error, decoded) => {
      if (error) {
        const data = {
          code: 403,
          message: 'Failed to authenticate token',
        };
        response.status(403).json(data);
      } else {
        next();
      }
    });
  } else {
    const data = {
      code: 403,
      message: 'No token provided',
    };
    response.status(403).json(data);
  }
}
