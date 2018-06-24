import TwitterStrategy from 'passport-twitter';

import { CONFIG } from '../config/app.config';

export const Twitter = new TwitterStrategy(
  {
    consumerKey: CONFIG.TWITTER.consumerKey,
    consumerSecret: CONFIG.TWITTER.consumerSecret,
    callbackURL: CONFIG.TWITTER.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  },
);
