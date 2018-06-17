import express from 'express';
import passport from 'passport';
import session from 'express-session';

import { cookieParserMiddleware } from './middlewares/cookieParserMiddleware';
import { queryParserMiddleware } from './middlewares/queryParserMiddleware';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { routes } from './routes/routes';
import { Local, Facebook, Google, Twitter } from './strategies';

const app = express();

app.use(express.json());
app.use(cookieParserMiddleware);
app.use(queryParserMiddleware);

passport.use(Local);
passport.use(Facebook);
passport.use(Google);
passport.use(Twitter);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());

routes(app);

app.use(errorMiddleware);

export default app;
