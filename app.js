import express from 'express';

import { cookieParserMiddleware } from './middlewares/cookieParserMiddleware';
import { queryParserMiddleware } from './middlewares/queryParserMiddleware';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { routes } from './routes/routes';

const app = express();

app.use(express.json());
app.use(cookieParserMiddleware);
app.use(queryParserMiddleware);

routes(app);

app.use(errorMiddleware);

export default app;
