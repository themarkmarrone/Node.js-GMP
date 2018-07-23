import express from 'express';
import session from 'express-session';
import SwaggerExpress from 'swagger-express-mw';
import swaggerUi from 'swagger-ui-express';

import { cookieParserMiddleware } from './middlewares/cookieParserMiddleware';
import { queryParserMiddleware } from './middlewares/queryParserMiddleware';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { routes } from './api/routes/routes';
import { connectToMongo } from './mongo';

const app = express();

connectToMongo();

app.use(express.json());
app.use(cookieParserMiddleware);
app.use(queryParserMiddleware);

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

routes(app);

app.use(errorMiddleware);

const config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerExpress.runner.swagger, true));

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log(`Server start http://127.0.0.1:${port}`);
});

export default app;
